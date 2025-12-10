// Tiny mock db helpers. Replace with real adapters (Supabase, Prisma, etc.)


export const getVideoById = async (id: string) => ({ id, title: `Vídeo ${id}`, description: 'Descrição exemplo' });