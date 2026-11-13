---
title: "Connect ChatGPT to a sandbox"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/integrations/chatgpt.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Connect ChatGPT to a sandbox

These connection instructions use a local sandbox. For cloud SSH setup, see
Connect with SSH.

Connect the ChatGPT desktop app to a sandbox over SSH so Codex works inside the
isolated environment instead of on your host.

> **Note:**
> This page covers running Codex in the ChatGPT desktop app connected to a
> sandbox over SSH. To run the Codex CLI inside a sandbox directly, see
> Codex.

## Prerequisites

- Codex credentials configured in Docker Sandboxes. See
  Codex authentication.
- SSH access set up. See Editor and app integrations.
- The ChatGPT desktop app installed.

ChatGPT's remote server requires the `codex` command in the sandbox. The Codex
sandbox template used in the following section includes this command.

## Connect

For a dedicated sandbox created on first connection, see
Set up desktop app connections.
The following steps connect to a sandbox with a mounted host workspace.

Create a named Codex sandbox for the current directory if you don't already
have one:

```console
$ sbx create --name demo codex .
```

Confirm that you can connect to the sandbox from a terminal:

```console
$ ssh demo.sbx
```

In the ChatGPT desktop app, open **Settings > Connections** and add an SSH
connection manually. Enter the sandbox hostname, such as `demo.sbx`, as the
host, then use the remote folder picker to
select the mounted workspace as the
remote project.

For more connection options, see the OpenAI instructions to
connect to an SSH host.

## Full access still prompts for approval

ChatGPT controls Codex permissions separately from the Docker Sandbox. To run
commands without Codex approval prompts, select **Full access** from the
permissions menu for the remote chat. Enabling **Full access** under
**Settings > General** only adds the mode to the permissions menu. It doesn't
change an existing chat.

If the chat continues to request approval while showing **Full access**, update
the ChatGPT desktop app, then stop and restart the active task. Approval prompts
that return after reconnecting can indicate a
Codex remote-permission synchronization issue.

## Related

- Editor and app integrations — how SSH access works and how to
  set it up
- Codex — run the Codex CLI inside a sandbox
