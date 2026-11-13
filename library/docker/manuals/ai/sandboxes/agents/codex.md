---
title: "Codex"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/agents/codex.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Codex

This page describes local sandboxes. For cloud behavior and limitations, see
Compare local and cloud sandboxes.

This guide covers authentication, configuration, and usage of Codex in a
sandboxed environment.

Official documentation: Codex CLI

## Quick start

Create a sandbox and run Codex for a project directory:

```console
$ sbx run codex ~/my-project
```

`sbx run` defaults the workspace to the current directory:

```console
$ cd ~/my-project
$ sbx run codex
```

To create a mountless sandbox, use
`sbx create` without a workspace path, then attach by name.

## Authentication

For the default OpenAI models, `sbx run codex` prompts you to authenticate on
your host if you haven't stored an OpenAI credential. Authentication happens
before launching the sandbox, so credentials are never exposed inside it.

To set up authentication ahead of time, choose one of the following methods.

**OAuth**: Start the OAuth flow on your host with:

```console
$ sbx secret set openai --oauth
```

This opens a browser window for authentication and stores the resulting tokens
in your OS keychain. The OAuth flow runs on the host, not inside the sandbox,
so browser-based authentication works without any extra setup.

**API key**: Store your OpenAI API key using
stored secrets:

```console
$ sbx secret set openai
```

See Credentials for more details.

## Model selection

To use Codex with a local model or another inference provider, see
Use local and hosted models.

## Configuration

Sandboxes don't pick up user-level configuration from your host, such as
`~/.codex`. Only project-level configuration in the working directory is
available inside the sandbox. See
Why doesn't the sandbox use my user-level agent configuration?
for workarounds.

### Default startup command

Without extra args, the sandbox runs:

```text
codex --dangerously-bypass-approvals-and-sandbox
```

To keep bypass mode when passing a prompt, lead with the flag:

```console
$ sbx run --name <sandbox-name> -- --dangerously-bypass-approvals-and-sandbox "fix the build"
```

For argument forwarding rules, see
Pass arguments to an agent.

## Base image

Template: `docker/sandbox-templates:codex`

See Customize to pre-install tools or customize this
environment.
