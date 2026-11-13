---
title: "Connect Orca to a sandbox"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/integrations/orca.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Connect Orca to a sandbox

These connection instructions use a local sandbox. For cloud SSH setup, see
Connect with SSH.

Orca runs coding agents in parallel, each in its own git worktree. Orca has no
dedicated Docker Sandboxes integration: it treats the sandbox as an ordinary
SSH host, installs a small relay inside it, and runs agents, terminals, and git
there while the editor and diff views stay on your host.

## Prerequisites

- Model provider credentials configured in Docker Sandboxes for any AI agent
  you plan to run. See Configure agent credentials.
- SSH access set up. See Editor and app integrations.
- Orca installed.

Orca's remote terminals need `node-pty`, which ships prebuilt binaries only for
macOS and Windows. On a Linux sandbox it compiles from source, and that build
needs a C++ compiler. Docker-provided templates include one, so a sandbox
created from a template is ready to connect.

A sandbox built from a custom
base image without a
compiler still connects, and files, git, and the editor all work, but remote
terminals don't start. Add the toolchain to the image, or install it in the
running sandbox until you can:

```console
$ sbx exec <sandbox> -- sudo apt-get update
$ sbx exec <sandbox> -- sudo DEBIAN_FRONTEND=noninteractive apt-get install -y build-essential
```

## Connect

Confirm that you can connect to the sandbox from a terminal:

```console
$ ssh demo.sbx
```

1. In Orca, open **Settings → SSH** and select **Add Target**.
2. Enter the sandbox hostname, such as `demo.sbx`, as the host, and
   `_default_user_` as the username. Keep the default port and leave the
   identity file empty.
3. Select **Test** to check the connection, then **Save**.
4. Create a worktree and choose the sandbox under **Run on**.

The first connection installs Orca's relay inside the sandbox, so it can take a
moment. Later connections are faster.

`_default_user_` is the reserved username in the managed SSH configuration that
`sbx setup ssh` writes. It tells the daemon to run as the sandbox image's
default user. Any other username is taken literally as an in-sandbox user.

## Run an agent

Orca launches the agent you select for a worktree; a sandbox doesn't start one
for you. Orca pre-fills each agent's permission-bypass flag for new launches,
such as `--dangerously-skip-permissions` for Claude Code, which is how
`sbx run` starts the same agents.

Orca only offers agents it finds installed on the host it connects to, so
create the sandbox with the agent you plan to drive:

```console
$ sbx create --name demo claude .
```

Credentials stay on your host. If you store them as
credentials, the sandbox proxy injects them
when the agent makes a request, so the agent authenticates without the value
ever entering the sandbox.

## Related

- Editor and app integrations — how SSH access works and how to
  set it up
