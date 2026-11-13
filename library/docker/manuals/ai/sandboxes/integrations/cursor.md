---
title: "Connect Cursor to a sandbox"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/integrations/cursor.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Connect Cursor to a sandbox

These connection instructions use a local sandbox. For cloud SSH setup, see
Connect with SSH.

Cursor is built on VS Code, so it connects to a sandbox the same way, using
Remote - SSH. Your editor stays on your host while files, terminals, and
extensions run in the isolated sandbox.

> **Note:**
> This page covers the Cursor editor connecting to a sandbox over SSH. To run
> the Cursor agent CLI inside a sandbox instead, see
> Cursor agent.

## Prerequisites

- Model provider credentials <example-value> in Docker Sandboxes for any AI agent
  you plan to run. See Configure agent credentials.
- SSH access set up. See Editor and app integrations.
- Cursor's Remote - SSH support installed.

## Connect

Confirm that you can connect to the sandbox from a terminal:

```console
$ ssh demo.sbx
```

1. Open the Command Palette and run **Remote-SSH: Connect to Host**.
2. Enter the sandbox host manually as `<name>.sbx`.
3. Cursor opens a new window connected to the sandbox. Use the remote folder
   picker to select the mounted workspace.

## Notes

- The first connection installs the editor server inside the sandbox, so it
  can take a moment. Later connections are faster.

## Related

- Editor and app integrations — how SSH access works and how to
  set it up
- Cursor agent — run the Cursor CLI inside a sandbox
