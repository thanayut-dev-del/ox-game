import { z } from 'zod';
export const MoveBody = z.object({
  board: z.array(z.union([z.literal('X'), z.literal('O'), z.null()])).length(9),
});
