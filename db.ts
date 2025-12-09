import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, videos, InsertVideo, userFavorites, viewHistory, playlists, playlistVideos } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get all videos with optional category filter
 */
export async function getVideos(category?: string) {
  const db = await getDb();
  if (!db) return [];

  let query: any = db.select().from(videos);
  if (category && category !== 'all') {
    query = query.where(eq(videos.category, category as any));
  }
  return query;
}

/**
 * Get a single video by ID
 */
export async function getVideoById(videoId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(videos).where(eq(videos.id, videoId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new video
 */
export async function createVideo(video: InsertVideo) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  const result = await db.insert(videos).values(video);
  return result;
}

/**
 * Update video view count
 */
export async function incrementVideoViews(videoId: number) {
  const db = await getDb();
  if (!db) return;

  const video = await getVideoById(videoId);
  if (!video) return;

  await db.update(videos)
    .set({ views: video.views + 1 })
    .where(eq(videos.id, videoId));
}

/**
 * Get user's favorite videos
 */
export async function getUserFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select({ videoId: userFavorites.videoId })
    .from(userFavorites)
    .where(eq(userFavorites.userId, userId));
}

/**
 * Add video to user's favorites
 */
export async function addToFavorites(userId: number, videoId: number) {
  const db = await getDb();
  if (!db) return;

  await db.insert(userFavorites).values({ userId, videoId });
}

/**
 * Remove video from user's favorites
 */
export async function removeFromFavorites(userId: number, videoId: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(userFavorites)
    .where(and(eq(userFavorites.userId, userId), eq(userFavorites.videoId, videoId)));
}

/**
 * Get user's view history
 */
export async function getUserViewHistory(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(viewHistory)
    .where(eq(viewHistory.userId, userId))
    .orderBy(viewHistory.watchedAt);
}

/**
 * Add or update view history
 */
export async function addToViewHistory(userId: number, videoId: number, lastPosition: number = 0) {
  const db = await getDb();
  if (!db) return;

  await db.insert(viewHistory).values({ userId, videoId, lastPosition })
    .onDuplicateKeyUpdate({
      set: { watchedAt: new Date(), lastPosition } as any
    });
}

/**
 * Get all playlists for a category
 */
export async function getPlaylistsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(playlists)
    .where(and(eq(playlists.category, category as any), eq(playlists.isPublic, 1)));
}

/**
 * Get playlist with its videos
 */
export async function getPlaylistWithVideos(playlistId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const playlist = await db.select().from(playlists)
    .where(eq(playlists.id, playlistId))
    .limit(1);

  if (playlist.length === 0) return undefined;

  const playlistVids = await db.select({ videoId: playlistVideos.videoId, order: playlistVideos.order })
    .from(playlistVideos)
    .where(eq(playlistVideos.playlistId, playlistId));

  return { ...playlist[0], videos: playlistVids };
}
