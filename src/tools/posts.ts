import { server } from "../server.js";
import { apiGet, apiPost, apiPut, apiDelete, handleApiError } from "../client.js";
import {
  ListPostsSchema,
  CreatePostSchema,
  GetPostSchema,
  UpdatePostSchema,
  DeletePostSchema,
  ListPostCommentsSchema,
  CreatePostCommentSchema,
  GetCommentSchema,
  UpdateCommentSchema,
  DeleteCommentSchema,
  ListPostVotesSchema,
  CreatePostVoteSchema,
  DeletePostVoteSchema,
} from "../schemas/posts.js";

// 1. List posts
server.registerTool("xcanny_list_posts", {
  title: "List Posts",
  description: "List posts with optional filters for board, status, and category. Supports sorting by 'top' (score) or 'new' (date) and pagination.",
  inputSchema: ListPostsSchema.shape,
  annotations: { readOnlyHint: true, idempotentHint: true, destructiveHint: false },
}, async (params) => {
  try {
    const res = await apiGet("posts", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 2. Create post
server.registerTool("xcanny_create_post", {
  title: "Create Post",
  description: "Create a new feedback post in a board. Requires board_id and title. The post is authored by the API key owner.",
  inputSchema: CreatePostSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false },
}, async (params) => {
  try {
    const res = await apiPost("posts", params as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 3. Get post
server.registerTool("xcanny_get_post", {
  title: "Get Post",
  description: "Get a single post by its ID, including details, votes, and comments.",
  inputSchema: GetPostSchema.shape,
  annotations: { readOnlyHint: true, idempotentHint: true, destructiveHint: false },
}, async (params) => {
  try {
    const { post_id } = params;
    const res = await apiGet(`posts/${post_id}`);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 4. Update post
server.registerTool("xcanny_update_post", {
  title: "Update Post",
  description: "Update a post's title, details, status, category, or roadmap visibility.",
  inputSchema: UpdatePostSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
}, async (params) => {
  try {
    const { post_id, ...data } = params;
    const res = await apiPut(`posts/${post_id}`, data as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 5. Delete post
server.registerTool("xcanny_delete_post", {
  title: "Delete Post",
  description: "Permanently delete a post and all its comments and votes.",
  inputSchema: DeletePostSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: true },
}, async (params) => {
  try {
    const { post_id } = params;
    await apiDelete(`posts/${post_id}`);
    return { content: [{ type: "text", text: "Post deleted successfully." }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 6. List post comments
server.registerTool("xcanny_list_post_comments", {
  title: "List Post Comments",
  description: "List comments on a post with pagination. Returns top-level comments with nested replies.",
  inputSchema: ListPostCommentsSchema.shape,
  annotations: { readOnlyHint: true, idempotentHint: true, destructiveHint: false },
}, async (params) => {
  try {
    const { post_id, ...query } = params;
    const res = await apiGet(`posts/${post_id}/comments`, query as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 7. Create post comment
server.registerTool("xcanny_create_post_comment", {
  title: "Create Post Comment",
  description: "Add a comment to a post. Optionally reply to an existing comment with parent_id.",
  inputSchema: CreatePostCommentSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false },
}, async (params) => {
  try {
    const { post_id, ...data } = params;
    const res = await apiPost(`posts/${post_id}/comments`, data as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 8. Get comment
server.registerTool("xcanny_get_comment", {
  title: "Get Comment",
  description: "Get a single comment by its ID.",
  inputSchema: GetCommentSchema.shape,
  annotations: { readOnlyHint: true, idempotentHint: true, destructiveHint: false },
}, async (params) => {
  try {
    const { comment_id } = params;
    const res = await apiGet(`comments/${comment_id}`);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 9. Update comment
server.registerTool("xcanny_update_comment", {
  title: "Update Comment",
  description: "Update a comment's text.",
  inputSchema: UpdateCommentSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
}, async (params) => {
  try {
    const { comment_id, ...data } = params;
    const res = await apiPut(`comments/${comment_id}`, data as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 10. Delete comment
server.registerTool("xcanny_delete_comment", {
  title: "Delete Comment",
  description: "Permanently delete a comment.",
  inputSchema: DeleteCommentSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: true },
}, async (params) => {
  try {
    const { comment_id } = params;
    await apiDelete(`comments/${comment_id}`);
    return { content: [{ type: "text", text: "Comment deleted successfully." }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 11. List post votes
server.registerTool("xcanny_list_post_votes", {
  title: "List Post Votes",
  description: "List all votes on a post with pagination.",
  inputSchema: ListPostVotesSchema.shape,
  annotations: { readOnlyHint: true, idempotentHint: true, destructiveHint: false },
}, async (params) => {
  try {
    const { post_id, ...query } = params;
    const res = await apiGet(`posts/${post_id}/votes`, query as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 12. Create post vote
server.registerTool("xcanny_create_post_vote", {
  title: "Create Post Vote",
  description: "Add a vote to a post. Optionally specify member_id to vote on behalf of a member (defaults to API key owner).",
  inputSchema: CreatePostVoteSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: false },
}, async (params) => {
  try {
    const { post_id, ...data } = params;
    const res = await apiPost(`posts/${post_id}/votes`, data as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});

// 13. Delete post vote
server.registerTool("xcanny_delete_post_vote", {
  title: "Delete Post Vote",
  description: "Remove a vote from a post.",
  inputSchema: DeletePostVoteSchema.shape,
  annotations: { readOnlyHint: false, destructiveHint: true },
}, async (params) => {
  try {
    const { post_id, vote_id } = params;
    await apiDelete(`posts/${post_id}/votes/${vote_id}`);
    return { content: [{ type: "text", text: "Vote removed successfully." }] };
  } catch (error) {
    return { content: [{ type: "text", text: handleApiError(error) }], isError: true };
  }
});
