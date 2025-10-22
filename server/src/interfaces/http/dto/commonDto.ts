import { z } from 'zod';
export const IdParam = z.object({ userId: z.string().regex(/^\d+$/).transform(Number) });
