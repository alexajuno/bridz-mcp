import { server } from "../server.js";
import { apiGet, handleApiError } from "../client.js";
import { SearchSchema } from "../schemas/search.js";

server.registerTool("xcanny_search", {
  title: "Search",
  description: "Search across posts and changelog entries using Meilisearch. Returns matching results from both content types.",
  inputSchema: SearchSchema,
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
}, async (params) => {
  try {
    const res = await apiGet("search", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});
