---
title: "Extension security"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/architecture/security.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Extension security

## Extension capabilities

An extension can have the following optional parts:
* A user interface in HTML or JavaScript, displayed in Docker Desktop Dashboard
* A backend part that runs as a container
* Executables deployed on the host machine.

Extensions are executed with the same permissions as the Docker Desktop user. Extension capabilities include running any Docker commands (including running containers and mounting folders), running extension binaries, and accessing files on your machine that are accessible by the user running Docker Desktop.
Note that extensions are not restricted to execute binaries that they list in the host section of the extension metadata: since these binaries can contain any code running as user, they can in turn execute any other commands as long as the user has rights to execute them.

The Extensions SDK provides a set of JavaScript APIs to invoke commands or invoke these binaries from the extension UI code. Extensions can also provide a backend part that starts a long-lived running container in the background.

> **Important:**
>
> Make sure you trust the publisher or author of the extension when you install it, as the extension has the same access rights as the user running Docker Desktop.
