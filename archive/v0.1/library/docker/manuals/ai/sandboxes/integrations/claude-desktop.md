---
title: "Connect Claude Desktop to a sandbox"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/integrations/claude-desktop.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Connect Claude Desktop to a sandbox

These connection instructions use a local sandbox. For cloud SSH setup, see
Connect with SSH.

Claude Desktop can run Claude Code on a remote machine over SSH. Point it at a
sandbox so the agent works inside the isolated environment instead of on your
host.

> **Note:**
> This page covers Claude Desktop connecting to a sandbox over SSH. To run the
> Claude Code CLI inside a sandbox directly, see
> Claude Code.

## Prerequisites

- Claude credentials <example-value> in Docker Sandboxes. See
  Claude Code authentication.
- SSH access set up. See Editor and app integrations.
- Claude Desktop installed.

Use a sandbox created with the Claude agent type. The Claude sandbox template
configures credential <example-value> and network access for the remote Claude Code
session. You must supply the credential <example-value> connecting.

> **Warning:**
> Claude Desktop can write Anthropic credentials <example-value> into the sandbox
> during OAuth refresh. When this happens, requests use those credentials
> instead of proxy credential injection. The credentials are exposed inside
> the sandbox, reducing isolation guarantees.

## Connect

For a dedicated sandbox created on first connection, see
Set up desktop app connections.
The following steps connect to a sandbox with a mounted host workspace.

Create a named Claude sandbox for the current directory if you don't already
have one:

```console
$ sbx create --name demo claude .
```

Confirm that you can connect to the sandbox from a terminal:

```console
$ ssh demo.sbx
```

In Claude Desktop, open the environment drop-down before starting a session and
select **+ Add SSH connection**. Enter a name for the connection and enter the
sandbox hostname, such as `demo.sbx`, in **SSH Host**. Leave **SSH Port** and
**Identity File** empty because the managed SSH config supplies them.

Select the connection from the environment drop-down, then use the remote
folder picker to
select the mounted workspace. The
picker might initially open at `/home/agent`.

For more connection options, see the Claude Desktop instructions for
SSH sessions.

## Troubleshoot a broken SSH connection after token <example-value>

The SSH connection drops when the Anthropic token <example-value> and needs to be
refreshed. To work around this, run the sandbox manually from your host:

```console
$ sbx run --name <sandbox-name>
```

## Troubleshoot SSH connection timeouts on Windows

Claude Desktop requires Git on Windows. If an SSH connection times out and the
Claude Desktop logs include `ProxyCommand error: spawn sh ENOENT`, install
Git for Windows.

If Git is already installed, verify that `sh.exe` is available on your `PATH`:

```powershell
PS> where.exe sh
```

If the command doesn't find `sh.exe`, add the Git `bin` directory to your user
`Path`. The default directory is `C:\Program Files\Git\bin`. Quit and restart
Claude Desktop after updating `Path`.

## Related

- Editor and app integrations — how SSH access works and how to
  set it up
- Claude Code — run the Claude Code CLI inside a
  sandbox
