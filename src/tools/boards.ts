import { server } from "../server.js";
import { apiGet, apiPost, apiPut, apiDelete, handleApiError } from "../client.js";
import {
  ListBoardsSchema, CreateBoardSchema, GetBoardSchema, UpdateBoardSchema, DeleteBoardSchema,
  ListCategoriesSchema, CreateCategorySchema, UpdateCategorySchema, DeleteCategorySchema,
} from "../schemas/boards.js";

// ── Boards ──────────────────────────────────────────────────────────────────

server.registerTool("xcanny_list_boards", {
  title: "List Boards",
  description: "List all boards in the workspace with their categories and post counts.",
  inputSchema: ListBoardsSchema.shape,
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async (params) => {
  try {
    const res = await apiGet("boards", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_create_board", {
  title: "Create Board",
  description: "Create a new feedback board. Requires a name.",
  inputSchema: CreateBoardSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
}, async (params) => {
  try {
    const res = await apiPost("boards", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_get_board", {
  title: "Get Board",
  description: "Get a single board by ID with its details.",
  inputSchema: GetBoardSchema.shape,
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ board_id }) => {
  try {
    const res = await apiGet(`boards/${board_id}`);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_update_board", {
  title: "Update Board",
  description: "Update a board's name, description, or privacy setting.",
  inputSchema: UpdateBoardSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ board_id, ...data }) => {
  try {
    const res = await apiPut(`boards/${board_id}`, data as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_delete_board", {
  title: "Delete Board",
  description: "Permanently delete a board. This cannot be undone.",
  inputSchema: DeleteBoardSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
}, async ({ board_id }) => {
  try {
    await apiDelete(`boards/${board_id}`);
    return { content: [{ type: "text", text: "Board deleted successfully." }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// ── Categories ──────────────────────────────────────────────────────────────

server.registerTool("xcanny_list_categories", {
  title: "List Categories",
  description: "List all categories for a board with pagination.",
  inputSchema: ListCategoriesSchema.shape,
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ board_id, ...query }) => {
  try {
    const res = await apiGet(`boards/${board_id}/categories`, query as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_create_category", {
  title: "Create Category",
  description: "Create a new category on a board.",
  inputSchema: CreateCategorySchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
}, async ({ board_id, name }) => {
  try {
    const res = await apiPost(`boards/${board_id}/categories`, { name });
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_update_category", {
  title: "Update Category",
  description: "Update a category's name on a board.",
  inputSchema: UpdateCategorySchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ board_id, category_id, ...data }) => {
  try {
    const res = await apiPut(`boards/${board_id}/categories/${category_id}`, data as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_delete_category", {
  title: "Delete Category",
  description: "Permanently delete a category from a board. This cannot be undone.",
  inputSchema: DeleteCategorySchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
}, async ({ board_id, category_id }) => {
  try {
    await apiDelete(`boards/${board_id}/categories/${category_id}`);
    return { content: [{ type: "text", text: "Category deleted successfully." }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});
