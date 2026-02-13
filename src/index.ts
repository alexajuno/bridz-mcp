#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";
import { API_KEY } from "./constants.js";

// Tool registrations (side-effect imports)
import "./tools/posts.js";
import "./tools/boards.js";
import "./tools/members.js";
import "./tools/changelog.js";
import "./tools/search.js";

async function main(): Promise<void> {
  if (!API_KEY) {
    console.error("ERROR: XCANNY_API_KEY environment variable is required");
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("xcanny MCP server running via stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
