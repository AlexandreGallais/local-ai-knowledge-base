---
title: "Docker Sandboxes API and SDK"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Sandboxes API and SDK

Use the Docker Sandboxes API to create cloud sandboxes, run commands, and
transfer files from your applications and automated workflows. You can also
manage related resources, including images, snapshots, volumes, and secrets.

To try it, run your first cloud sandbox with the TypeScript
SDK. The tutorial uses a bundled kit that supplies a shell environment for
running commands.

## Activate cloud access

To use the API or SDK, activate a Docker Agentic Platform subscription.
Use the same Docker account to authenticate your application.

Cloud compute is billed separately from your Docker subscription. See
Billing for details.

## Choose an interface

Use the TypeScript SDK in your JavaScript or TypeScript application. The SDK
provides typed requests and responses, waits for sandboxes to start or stop,
and handles file transfers and interactive processes.
See Install the SDK for installation instructions.

You can also call the REST API directly from any language or HTTP tool.
See the API reference for operations,
request fields, responses, and the downloadable OpenAPI specification.

To run agents from your terminal, see Docker Sandboxes.

## Develop your application

- SDK cookbook: follow examples for processes, files,
  storage, networking, and other sandbox operations.
- API concepts: choose a kit or image, identify resources, and
  wait for actions to finish.
- Authentication and authorization: authenticate requests
  and understand which permissions your application needs.
- Errors and retries: handle failures and retry requests without
  duplicating work.
- Compute sizes and limits: choose resources and handle account
  quotas and request rate limits.
