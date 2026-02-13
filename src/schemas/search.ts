import { z } from "zod";

export const SearchSchema = z.object({
  q: z.string().min(1).max(255).describe("Search query string"),
  limit: z.number().int().min(1).max(50).default(10).describe("Maximum results"),
}).strict();
