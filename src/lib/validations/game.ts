import { z } from 'zod';

export const gameSchema = z.object({
  price: z.number()
});
