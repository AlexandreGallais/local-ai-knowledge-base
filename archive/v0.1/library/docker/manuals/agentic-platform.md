---
title: "Docker Agentic Platform"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/agentic-platform/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Agentic Platform

> **Note:**
> Docker Agentic Platform is experimental. Features and behavior may change.

Docker Agentic Platform lets you run agents and tools in isolated cloud
sandboxes. Your agent keeps working when you close the Console, disconnect
your computer, or put it to sleep.

The `sbx` CLI supports both
local sandboxes and
cloud sandboxes. These pages describe
the web Console experience. The Console and CLI use different secret names;
see Cloud credentials.

In the Console, choose a kit and configure
the sandbox's credentials, network access, tools, and compute size. Once it
starts, use its terminal to work with the agent. You can return to running or
paused sandboxes from **Sandboxes**.

You can reuse these settings across sandboxes:

- MCP connects external tools.
- Secrets provide credentials
  without placing their values inside a sandbox.
- Network policies control
  which hosts and services a sandbox can reach.

To begin, activate your subscription, then
start a sandbox. You pay for compute by the second while your
sandbox runs. See Signup and billing for account and payment
information.
