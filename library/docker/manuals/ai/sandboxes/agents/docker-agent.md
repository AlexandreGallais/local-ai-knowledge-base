---
title: "Docker Agent"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/agents/docker-agent.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Agent

This page describes local sandboxes. For cloud behavior and limitations, see
Compare local and cloud sandboxes.

Official documentation: Docker Agent

## Quick start

Create a sandbox and run Docker Agent for a project directory:

```console
$ sbx run docker-agent ~/my-project
```

`sbx run docker-agent` defaults the workspace to the current directory, so you
can run it from inside your project.

To create a mountless sandbox, use
`sbx create` without a workspace path, then attach by name.

## Authentication

Docker Agent supports multiple providers. Store keys for the providers you want
to use with stored secrets:

```console
$ sbx secret set openai
$ sbx secret set anthropic
$ sbx secret set google
$ sbx secret set xai
$ sbx secret set nebius
$ sbx secret set mistral
$ sbx secret set openrouter
```

You only need to configure the providers you want to use. Docker Agent detects
available credentials and routes requests to the appropriate provider.

## Configuration

Sandboxes don't pick up user-level configuration from your host. Only
project-level configuration in the working directory is available inside the
sandbox. See
Why doesn't the sandbox use my user-level agent configuration?
for workarounds.

### Default startup command

Without extra args, the sandbox runs:

```text
docker-agent run --yolo
```

To pass flags, prompts, or configuration files, see
Pass <example-value> to an agent.

## Base image

The sandbox uses `docker/sandbox-templates:docker-agent`. See
Base images to build your own image on top of
this base.
