import { z } from "zod";

export const ratingFormSchema = z.object({
  rating: z.string(),
  review: z.string(),
  name: z.string(),
  email: z.string().email(),
});
