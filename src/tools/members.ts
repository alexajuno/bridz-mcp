import { server } from "../server.js";
import { apiGet, apiPost, apiPut, apiDelete, handleApiError } from "../client.js";
import {
  ListMembersSchema, CreateMemberSchema, GetMemberSchema, UpdateMemberSchema, DeleteMemberSchema,
} from "../schemas/members.js";

server.registerTool("xcanny_list_members", {
  title: "List Members",
  description: "List members with optional search, role filter, and pagination.",
  inputSchema: ListMembersSchema.shape,
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async (params) => {
  try {
    const res = await apiGet("members", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_create_member", {
  title: "Create Member",
  description: "Create a new member by email. Name defaults to email if omitted. Role defaults to 'member'.",
  inputSchema: CreateMemberSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
}, async (params) => {
  try {
    const res = await apiPost("members", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_get_member", {
  title: "Get Member",
  description: "Get a single member by ID.",
  inputSchema: GetMemberSchema.shape,
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async (params) => {
  try {
    const res = await apiGet(`members/${params.member_id}`);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_update_member", {
  title: "Update Member",
  description: "Update a member's name, email, or role.",
  inputSchema: UpdateMemberSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async (params) => {
  try {
    const { member_id, ...data } = params;
    const res = await apiPut(`members/${member_id}`, data as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_delete_member", {
  title: "Delete Member",
  description: "Permanently delete a member by ID.",
  inputSchema: DeleteMemberSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
}, async (params) => {
  try {
    await apiDelete(`members/${params.member_id}`);
    return { content: [{ type: "text", text: "Member deleted successfully." }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});
