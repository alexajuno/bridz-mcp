import { z } from "zod";

export const ListMembersSchema = z.object({
  search: z.string().optional().describe("Search by name or email"),
  role: z.enum(["owner", "admin", "editor", "member"]).optional().describe("Filter by role"),
  per_page: z.number().int().min(1).max(100).default(15).describe("Results per page"),
  page: z.number().int().min(1).default(1).describe("Page number"),
}).strict();

export const CreateMemberSchema = z.object({
  email: z.string().email().max(255).describe("Member email (required)"),
  name: z.string().max(255).optional().describe("Member name (defaults to email if omitted)"),
  role: z.enum(["admin", "editor", "member"]).optional().describe("Role to assign (defaults to member)"),
}).strict();

export const GetMemberSchema = z.object({
  member_id: z.number().int().describe("Member ID (integer)"),
}).strict();

export const UpdateMemberSchema = z.object({
  member_id: z.number().int().describe("Member ID (integer)"),
  name: z.string().min(1).max(255).optional().describe("New name"),
  email: z.string().email().max(255).optional().describe("New email"),
  role: z.enum(["admin", "editor", "member"]).optional().describe("New role"),
}).strict();

export const DeleteMemberSchema = z.object({
  member_id: z.number().int().describe("Member ID (integer)"),
}).strict();
