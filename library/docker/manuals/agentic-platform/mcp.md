---
title: "MCP"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/agentic-platform/mcp.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# MCP

Connect Model Context Protocol (MCP) servers to give your agent tools for
working with external services. From **MCP**, choose a predefined server or
add a custom server by URL. Authorize access if prompted.

You can also select or connect servers from the tools control in the sandbox
launcher. Select a server to use it in the sandbox, and authorize access if
prompted. To connect a custom server there, enter its URL and
select **Connect**.

Connecting an MCP server doesn't restrict or inspect the sandbox's other
network traffic. To control which hosts and services the sandbox can reach,
use network policies. The initial
release doesn't support MCP-specific policies.

## Connect a predefined server

1. Open **MCP** and choose a predefined server.
2. Connect the server.
3. Authorize access if prompted.

## Add a server by URL

To connect a server that is not predefined:

1. Open **MCP** and find **Add a server**.
2. Enter a streamable HTTP MCP endpoint in **Remote MCP URL**.
3. Select **Add**. Public servers are ready immediately. For servers that
   require an account, authorize access after adding the server.

## Use tools from another client

On the **MCP** page, use **MCP Gateway endpoint URL** to connect your external
MCP client to the gateway. Select **Add to your client**, choose your
client, and follow the connection and authorization instructions. Supported
options are Docker Sandboxes (SBX), Claude Code, Codex CLI, Cursor, VS Code,
and MCP Inspector. The first connection opens browser sign-in. There is no
token to copy.

Sign-in is confirmed only for the listed clients. Follow the instructions for
your client, including any exact flag or setting shown. Other clients may
fail sign-in with an error page that looks like a password problem.
