import { server } from "../server.js";
import { apiGet, apiPost, apiPut, apiDelete, handleApiError } from "../client.js";
import {
  ListChangelogSchema,
  CreateChangelogSchema,
  GetChangelogSchema,
  UpdateChangelogSchema,
  DeleteChangelogSchema,
  PublishChangelogSchema,
  UnpublishChangelogSchema,
} from "../schemas/changelog.js";

server.registerTool("xcanny_list_changelog", {
  title: "List Changelog Entries",
  description: "List changelog entries with pagination.",
  inputSchema: ListChangelogSchema,
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    destructiveHint: false,
  },
}, async (params) => {
  try {
    const res = await apiGet("changelog", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_create_changelog", {
  title: "Create Changelog Entry",
  description: "Create a new changelog entry.",
  inputSchema: CreateChangelogSchema,
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
  },
}, async (params) => {
  try {
    const res = await apiPost("changelog", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_get_changelog", {
  title: "Get Changelog Entry",
  description: "Get a single changelog entry by ID.",
  inputSchema: GetChangelogSchema,
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    destructiveHint: false,
  },
}, async ({ changelog_id }) => {
  try {
    const res = await apiGet(`changelog/${changelog_id}`);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_update_changelog", {
  title: "Update Changelog Entry",
  description: "Update an existing changelog entry.",
  inputSchema: UpdateChangelogSchema,
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
  },
}, async ({ changelog_id, ...data }) => {
  try {
    const res = await apiPut(`changelog/${changelog_id}`, data as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_delete_changelog", {
  title: "Delete Changelog Entry",
  description: "Permanently delete a changelog entry.",
  inputSchema: DeleteChangelogSchema,
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
  },
}, async ({ changelog_id }) => {
  try {
    await apiDelete(`changelog/${changelog_id}`);
    return { content: [{ type: "text", text: "Changelog entry deleted successfully." }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_publish_changelog", {
  title: "Publish Changelog Entry",
  description: "Publish a draft or scheduled changelog entry, making it visible to customers.",
  inputSchema: PublishChangelogSchema,
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
  },
}, async ({ changelog_id }) => {
  try {
    const res = await apiPost(`changelog/${changelog_id}/publish`);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

server.registerTool("xcanny_unpublish_changelog", {
  title: "Unpublish Changelog Entry",
  description: "Unpublish a changelog entry, reverting it to draft status.",
  inputSchema: UnpublishChangelogSchema,
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
  },
}, async ({ changelog_id }) => {
  try {
    const res = await apiPost(`changelog/${changelog_id}/unpublish`);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});
