import { z } from 'zod';

export const gameSchema = z.object({
  guess: z.number()
});

export type GuessInput = z.infer<typeof gameSchema>;
