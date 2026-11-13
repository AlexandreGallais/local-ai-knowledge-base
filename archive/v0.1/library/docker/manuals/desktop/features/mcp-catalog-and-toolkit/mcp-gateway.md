---
title: "MCP Gateway"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/features/mcp-catalog-and-toolkit/mcp-gateway.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# MCP Gateway

> **Note:**
> MCP Gateway as part of Docker AI Governance is an invite-only feature. Contact Docker Sales to learn more.

The MCP Gateway is Docker's open source solution for orchestrating Model
Context Protocol (MCP) servers. It acts as a centralized proxy between clients
and servers, managing configuration, credentials, and access control.

When using MCP servers without the MCP Gateway, you need to configure
applications individually for each AI application. With the MCP Gateway, you
configure applications to connect to the Gateway. The Gateway then handles
server lifecycle, routing, and authentication across all servers in your
profiles.

If you use Docker Desktop with MCP Toolkit enabled, the Gateway runs
automatically in the background. You don't need to start or configure it
manually. This documentation is for users who want to understand how the Gateway works or run it directly for advanced use cases.

## How it works

MCP Gateway runs MCP servers in isolated Docker containers with restricted
privileges, network access, and resource usage. It includes built-in logging
and call-tracing capabilities to ensure full visibility and governance of AI
tool activity.

The MCP Gateway manages the server's entire lifecycle. When an AI application
needs to use a tool, it sends a request to the Gateway. The Gateway identifies
which server handles that tool and, if the server isn't already running, starts
it as a Docker container. The Gateway then injects any required credentials,
applies security restrictions, and forwards the request to the server. The
server processes the request and returns the result through the Gateway back to
the AI application.

The MCP Gateway solves a fundamental problem: MCP servers are just programs
that need to run somewhere. Running them directly on your machine means dealing
with installation, dependencies, updates, and security risks. By running them
as containers managed by the Gateway, you get isolation, consistent
environments, and centralized control.

The Gateway works with profiles to determine which servers are available. When
you run the Gateway, you specify which profile to use with the `--profile` flag
to determine which servers are made available to clients.

## Usage

To use the MCP Gateway, you'll need Docker Desktop with MCP Toolkit enabled.
Follow the MCP Toolkit guide to enable and configure servers
through the Docker Desktop interface, or see
Use MCP Toolkit from the CLI for terminal-based workflows.

### Install the MCP Gateway manually

For Docker Engine without Docker Desktop, you'll need to download and install
the MCP Gateway separately before you can run it.

1. Download the latest binary from the GitHub releases page.

2. Move or symlink the binary to the destination matching your OS:

   | OS      | Binary destination                  |
   | ------- | ----------------------------------- |
   | Linux   | `~/.docker/cli-plugins/docker-mcp`  |
   | macOS   | `~/.docker/cli-plugins/docker-mcp`  |
   | Windows | `%USERPROFILE%\.docker\cli-plugins` |

3. Make the binaries executable:

   ```bash
   $ chmod +x ~/.docker/cli-plugins/docker-mcp
   ```

You can now use the `docker mcp` command:

```bash
docker mcp --help
```

## Additional information

For more details on how the MCP Gateway works and available customization
options, see the complete documentation on GitHub.
