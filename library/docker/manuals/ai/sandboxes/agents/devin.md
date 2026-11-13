---
title: "Devin"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/agents/devin.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Devin

This page describes local sandboxes. For cloud behavior and limitations, see
Compare local and cloud sandboxes.

Official documentation: Devin CLI

## Quick start

Create a sandbox and run Devin for a project directory:

```console
$ sbx run devin ~/my-project
```

The workspace parameter is optional and defaults to the current directory:

```console
$ cd ~/my-project
$ sbx run devin
```

## Authentication

On first run, Devin prompts you to sign in interactively inside the sandbox.
After you sign in, Docker Sandboxes manages the reusable credential on the host
and supplies it to future Devin sandboxes through the proxy.

## Configuration

Sandboxes don't pick up user-level Devin configuration from your host. Only
project-level configuration in the working directory is available inside the
sandbox. See
Why doesn't the sandbox use my user-level agent configuration?
for workarounds.

Devin reads `AGENTS.md` from the workspace for agent-specific instructions and
uses the shared agent skills store.

### Default startup command

Without extra args, the sandbox runs:

```text
devin --permission-mode dangerous --respect-workspace-trust=false
```

## Base image

Template: `docker/sandbox-templates:devin-docker`

See Customize to pre-install tools or customize this
environment.
