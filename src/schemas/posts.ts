import { z } from "zod";

export const ListPostsSchema = z.object({
  board_id: z.string().optional().describe("Filter by board ID"),
  status: z.enum(["open", "under_review", "planned", "in_progress", "complete", "closed"]).optional().describe("Filter by status"),
  category_id: z.string().optional().describe("Filter by category ID"),
  sort: z.enum(["top", "new"]).default("new").describe("Sort order: 'top' (by score) or 'new' (by date, default)"),
  per_page: z.number().int().min(1).max(100).default(15).describe("Results per page"),
  page: z.number().int().min(1).default(1).describe("Page number"),
}).strict();

export const CreatePostSchema = z.object({
  board_id: z.string().describe("Board ID (ULID, required)"),
  title: z.string().min(1).max(500).describe("Post title (required)"),
  details: z.string().max(10000).optional().describe("Post body/description"),
  status: z.enum(["open", "under_review", "planned", "in_progress", "complete", "closed"]).optional().describe("Initial status (defaults to open)"),
  category_id: z.string().optional().describe("Category ID (ULID)"),
}).strict();

export const GetPostSchema = z.object({
  post_id: z.string().describe("Post ID (ULID)"),
}).strict();

export const UpdatePostSchema = z.object({
  post_id: z.string().describe("Post ID (ULID)"),
  title: z.string().min(1).max(500).optional().describe("New title"),
  details: z.string().max(10000).optional().describe("New body/description"),
  status: z.enum(["open", "under_review", "planned", "in_progress", "complete", "closed"]).optional().describe("New status"),
  category_id: z.string().nullable().optional().describe("New category ID (ULID, null to clear)"),
  show_on_roadmap: z.boolean().optional().describe("Show on public roadmap"),
}).strict();

export const DeletePostSchema = z.object({
  post_id: z.string().describe("Post ID (ULID)"),
}).strict();

export const ListPostCommentsSchema = z.object({
  post_id: z.string().describe("Post ID (ULID)"),
  per_page: z.number().int().min(1).max(100).default(20).describe("Results per page"),
  page: z.number().int().min(1).default(1).describe("Page number"),
}).strict();

export const CreatePostCommentSchema = z.object({
  post_id: z.string().describe("Post ID (ULID)"),
  body: z.string().min(1).describe("Comment text, limited to 100 KB (102,400 bytes) of UTF-8 text"),
  parent_id: z.string().optional().describe("Parent comment ID (ULID) for replies"),
}).strict();

export const GetCommentSchema = z.object({
  comment_id: z.string().describe("Comment ID (ULID)"),
}).strict();

export const UpdateCommentSchema = z.object({
  comment_id: z.string().describe("Comment ID (ULID)"),
  body: z.string().min(1).describe("Updated comment text, limited to 100 KB (102,400 bytes) of UTF-8 text"),
}).strict();

export const DeleteCommentSchema = z.object({
  comment_id: z.string().describe("Comment ID (ULID)"),
}).strict();

export const ListPostVotesSchema = z.object({
  post_id: z.string().describe("Post ID (ULID)"),
  per_page: z.number().int().min(1).max(100).default(20).describe("Results per page"),
  page: z.number().int().min(1).default(1).describe("Page number"),
}).strict();

export const CreatePostVoteSchema = z.object({
  post_id: z.string().describe("Post ID (ULID)"),
  member_id: z.number().int().optional().describe("Member ID to vote as (defaults to API key owner)"),
}).strict();

export const DeletePostVoteSchema = z.object({
  post_id: z.string().describe("Post ID (ULID)"),
  vote_id: z.string().describe("Vote ID (ULID)"),
}).strict();
