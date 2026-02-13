import { z } from "zod";

export const ListChangelogSchema = z.object({
  status: z.enum(["draft", "published", "scheduled"]).optional().describe("Filter by status"),
  is_public: z.boolean().optional().describe("Filter by public visibility"),
  sort: z.enum(["newest", "oldest", "published"]).default("newest").describe("Sort order"),
  per_page: z.number().int().min(1).max(100).default(15).describe("Results per page"),
  page: z.number().int().min(1).default(1).describe("Page number"),
}).strict();

export const CreateChangelogSchema = z.object({
  title: z.string().min(1).max(500).describe("Entry title (required)"),
  content: z.string().max(50000).optional().describe("Entry content/body"),
  status: z.enum(["draft", "scheduled"]).default("draft").describe("Entry status (use publish endpoint to publish)"),
  is_public: z.boolean().default(true).describe("Whether visible to customers"),
  scheduled_at: z.string().optional().describe("ISO 8601 datetime for scheduled publishing"),
  label_ids: z.array(z.string()).optional().describe("Array of changelog label IDs (ULIDs) to attach"),
  post_ids: z.array(z.string()).optional().describe("Array of post IDs (ULIDs) to link"),
}).strict();

export const GetChangelogSchema = z.object({
  changelog_id: z.string().describe("Changelog entry ID (ULID)"),
}).strict();

export const UpdateChangelogSchema = z.object({
  changelog_id: z.string().describe("Changelog entry ID (ULID)"),
  title: z.string().min(1).max(500).optional().describe("New title"),
  content: z.string().max(50000).nullable().optional().describe("New content (null to clear)"),
  status: z.enum(["draft", "scheduled"]).optional().describe("New status (use publish/unpublish endpoints to change published state)"),
  is_public: z.boolean().optional().describe("Toggle public visibility"),
  scheduled_at: z.string().nullable().optional().describe("New scheduled date or null to clear"),
  label_ids: z.array(z.string()).optional().describe("Array of changelog label IDs (ULIDs) to sync"),
  post_ids: z.array(z.string()).optional().describe("Array of post IDs (ULIDs) to sync"),
}).strict();

export const DeleteChangelogSchema = z.object({
  changelog_id: z.string().describe("Changelog entry ID (ULID)"),
}).strict();

export const PublishChangelogSchema = z.object({
  changelog_id: z.string().describe("Changelog entry ID (ULID)"),
}).strict();

export const UnpublishChangelogSchema = z.object({
  changelog_id: z.string().describe("Changelog entry ID (ULID)"),
}).strict();
