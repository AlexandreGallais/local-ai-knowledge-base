---
title: "Install the Docker Sandboxes SDK"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/install.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Install the Docker Sandboxes SDK

Use the Docker Sandboxes SDK to create and manage cloud sandboxes from
JavaScript or TypeScript. The SDK includes methods for running commands,
transferring files, and waiting for a sandbox to start or stop.

You don't need the Docker CLI to use the SDK.

## Install the SDK

With Node.js 20 or later, install the SDK in your project:

```console
$ npm install @docker/sandboxes
```

Import `Sandboxes` from `@docker/sandboxes`.

## Connect to Cloud Sandboxes

Before connecting, activate a Docker Agentic Platform subscription
for your Docker account.

Configure your client with browser sign-in for interactive use or a personal
access token for automation. The SDK supplies the service URL and manages
access tokens. See Authentication and authorization for
setup instructions.

Follow Run your first cloud sandbox for a complete TypeScript
example that creates a sandbox, runs a command, and deletes it.
