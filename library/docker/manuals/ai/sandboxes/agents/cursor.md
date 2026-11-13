---
title: "Cursor"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/agents/cursor.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Cursor

This page describes local sandboxes. For cloud behavior and limitations, see
Compare local and cloud sandboxes.

This guide covers authentication, configuration, and usage of Cursor in a
sandboxed environment.

Official documentation: Cursor CLI

## Quick start

Create a sandbox and run Cursor for a project directory:

```console
$ sbx run cursor ~/my-project
```

`sbx run` defaults the workspace to the current directory:

```console
$ cd ~/my-project
$ sbx run cursor
```

To create a mountless sandbox, use
`sbx create` without a workspace path, then attach by name.

## Authentication

Cursor supports two authentication methods: an API key or OAuth.

**API key**: Store your Cursor API key using
stored secrets:

```console
$ sbx secret set cursor
```

**OAuth**: If no API key is set, Cursor prompts you to sign in interactively
on first run. The proxy intercepts the token exchange with
`api2.cursor.sh/auth/poll`, so credentials are managed by the host and aren't
stored inside the sandbox.

## Configuration

Sandboxes don't pick up user-level configuration from your host, such as
`~/.cursor`. Only project-level configuration in the working directory is
available inside the sandbox. See
Why doesn't the sandbox use my user-level agent configuration?
for workarounds.

Cursor reads `AGENTS.md` from the workspace for agent-specific instructions.

### Default startup command

Without extra args, the sandbox runs:

```text
cursor-agent --yolo
```

Arguments after `--` are added after the default flags when the first one is
itself a flag (begins with `-`), so `--yolo` is preserved:

```console
$ sbx run --name <sandbox-name> -- -p "refactor this"   # runs cursor-agent --yolo -p "refactor this"
```

For prompts and subcommands, see
Pass arguments to an agent.

## Base image

Template: `docker/sandbox-templates:cursor-agent-docker`

Preconfigured with HTTP/1.1 and server-sent events for agent traffic so
requests flow through the host proxy. Authentication state is persisted across
sandbox restarts.

See Customize to pre-install tools or customize this
environment.
