import { z } from "zod";

export const ListBoardsSchema = z.object({
  per_page: z.number().int().min(1).max(100).default(15).describe("Results per page"),
  page: z.number().int().min(1).default(1).describe("Page number"),
}).strict();

export const CreateBoardSchema = z
  .object({
    name: z.string().min(1).max(255).describe("Board name (required)"),
    description: z.string().max(5000).optional().describe("Board description"),
    is_private: z
      .boolean()
      .default(false)
      .describe("Whether the board is private"),
  })
  .strict();

export const GetBoardSchema = z
  .object({
    board_id: z.string().describe("Board ID (ULID)"),
  })
  .strict();

export const UpdateBoardSchema = z
  .object({
    board_id: z.string().describe("Board ID (ULID)"),
    name: z.string().min(1).max(255).optional().describe("New name"),
    description: z
      .string()
      .max(5000)
      .nullable()
      .optional()
      .describe("New description"),
    is_private: z.boolean().optional().describe("Toggle private"),
  })
  .strict();

export const DeleteBoardSchema = z
  .object({
    board_id: z.string().describe("Board ID (ULID)"),
  })
  .strict();

export const ListCategoriesSchema = z
  .object({
    board_id: z.string().describe("Board ID (ULID)"),
    per_page: z.number().int().min(1).max(100).default(15).describe("Results per page"),
    page: z.number().int().min(1).default(1).describe("Page number"),
  })
  .strict();

export const CreateCategorySchema = z
  .object({
    board_id: z.string().describe("Board ID (ULID)"),
    name: z.string().min(1).max(255).describe("Category name (required)"),
  })
  .strict();

export const UpdateCategorySchema = z
  .object({
    board_id: z.string().describe("Board ID (ULID)"),
    category_id: z.string().describe("Category ID (ULID)"),
    name: z.string().min(1).max(255).optional().describe("New category name"),
  })
  .strict();

export const DeleteCategorySchema = z
  .object({
    board_id: z.string().describe("Board ID (ULID)"),
    category_id: z.string().describe("Category ID (ULID)"),
  })
  .strict();
