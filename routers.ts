import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getVideos, getVideoById, incrementVideoViews, getUserFavorites, addToFavorites, removeFromFavorites, getUserViewHistory, addToViewHistory, getPlaylistsByCategory } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Videos Router
  videos: router({
    /**
     * Get all videos, optionally filtered by category
     */
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        try {
          const videos = await getVideos(input?.category);
          return videos;
        } catch (error) {
          console.error("Error fetching videos:", error);
          return [];
        }
      }),

    /**
     * Get a single video by ID
     */
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        try {
          const video = await getVideoById(input.id);
          if (video) {
            // Increment view count asynchronously
            incrementVideoViews(input.id).catch(console.error);
          }
          return video;
        } catch (error) {
          console.error("Error fetching video:", error);
          return null;
        }
      }),

    /**
     * Add video to user's favorites (protected)
     */
    addToFavorites: protectedProcedure
      .input(z.object({ videoId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          await addToFavorites(ctx.user.id, input.videoId);
          return { success: true };
        } catch (error) {
          console.error("Error adding to favorites:", error);
          throw error;
        }
      }),

    /**
     * Remove video from user's favorites (protected)
     */
    removeFromFavorites: protectedProcedure
      .input(z.object({ videoId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          await removeFromFavorites(ctx.user.id, input.videoId);
          return { success: true };
        } catch (error) {
          console.error("Error removing from favorites:", error);
          throw error;
        }
      }),

    /**
     * Get user's favorite videos (protected)
     */
    getFavorites: protectedProcedure
      .query(async ({ ctx }) => {
        try {
          const favorites = await getUserFavorites(ctx.user.id);
          return favorites;
        } catch (error) {
          console.error("Error fetching favorites:", error);
          return [];
        }
      }),

    /**
     * Record video view in history (protected)
     */
    recordView: protectedProcedure
      .input(z.object({ videoId: z.number(), lastPosition: z.number().optional() }))
      .mutation(async ({ input, ctx }) => {
        try {
          await addToViewHistory(ctx.user.id, input.videoId, input.lastPosition || 0);
          return { success: true };
        } catch (error) {
          console.error("Error recording view:", error);
          throw error;
        }
      }),

    /**
     * Get user's view history (protected)
     */
    getViewHistory: protectedProcedure
      .query(async ({ ctx }) => {
        try {
          const history = await getUserViewHistory(ctx.user.id);
          return history;
        } catch (error) {
          console.error("Error fetching view history:", error);
          return [];
        }
      }),
  }),

  // Playlists Router
  playlists: router({
    /**
     * Get playlists by category
     */
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        try {
          const playlists = await getPlaylistsByCategory(input.category);
          return playlists;
        } catch (error) {
          console.error("Error fetching playlists:", error);
          return [];
        }
      }),
  })
});

export type AppRouter = typeof appRouter;
