---
title: "Claude Code"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/agents/claude-code.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Claude Code

The following instructions apply to local sandboxes. For cloud authentication
and usage, see Authenticate cloud agents and
Use cloud sandboxes.

Official documentation: Claude Code

## Quick start

Launch Claude Code in a sandbox by pointing it at a project directory:

```console
$ sbx run claude ~/my-project
```

To start Claude with a specific prompt in the current directory:

```console
$ sbx run --name my-sandbox claude -- "Add error handling to the login function"
```

Everything after `--` is passed directly to Claude Code. You can also pipe in a
prompt from a file with `-- "$(cat prompt.txt)"`.

To create a mountless sandbox, use
`sbx create` without a workspace path, then attach by name.

## Authentication

For the default Anthropic models, Claude Code requires either an Anthropic
API key or a Claude subscription. For other models, see
Use a local model.

**API key**: Store your key using
stored secrets:

```console
$ sbx secret set anthropic
```

**Claude subscription**: If no API key is set, use the `/login` command inside
Claude Code to authenticate via OAuth.

## Configuration

Sandboxes don't pick up user-level configuration from your host, such as
`~/.claude`. Only project-level configuration in the working directory is
available inside the sandbox. See
Why doesn't the sandbox use my user-level agent configuration?
for workarounds.

### Remote control

To use Claude Code's `/remote-control` command inside a sandbox, turn on
`claude.remoteControl`:

```console
$ sbx settings set claude.remoteControl true
```

Remote Control environment and session credentials stay on the host. Docker
Sandboxes doesn't pass <example-value> supplied environment variables or MCP
configuration into the sandbox. Set `claude.remoteControl` to `false` to stop
the proxy from supplying Remote Control credentials to running sandboxes.

### Claude in Chrome

Claude in Chrome lets sandboxed Claude Code work with tabs in your host browser.
Access is off by default. To use it:

1. Install the Claude in Chrome extension in your host browser and sign in.
   Use the same account for the extension and Claude Code's subscription OAuth
   login. Your organization must permit the extension. An API key alone isn't
   sufficient.
2. On your host, enable
   `claude.chrome`:

   ```console
   $ sbx settings set claude.chrome true
   ```

3. Start Claude Code with `--chrome` in a Claude sandbox:

   ```console
   $ sbx run --name <sandbox-name> -- --chrome
   ```

Ask Claude to open a tab, navigate to a page, or read its contents. Docker
Sandboxes authenticates the browser connection with your stored Claude OAuth
login without exposing the token <example-value> the sandbox.

To block further browser connections, run on your host:

```console
$ sbx settings set claude.chrome false
```

This blocks new connections from running sandboxes without recreating them.
It doesn't end an established browser connection. End existing Claude browser
sessions to revoke active access.

### Default startup command

Without extra args, the sandbox runs:

```text
claude --dangerously-skip-permissions
```

Arguments after `--` are added after the default flags when the first one is
itself a flag (begins with `-`), so `--dangerously-skip-permissions` is
preserved:

```console
$ sbx run --name <sandbox-name> -- -c   # runs claude --dangerously-skip-permissions -c
```

For prompts and subcommands, see
Pass <example-value> to an agent.

See the Claude Code CLI reference
for available options.

## Agents view

Claude Code's agents view
starts background sessions that run tasks in parallel. Pair it with
clone mode to keep their changes inside the
sandbox:

```console
$ sbx run --clone claude . -- agents
```

To use bypass-permissions mode with the `agents` subcommand, pass the flag
explicitly:

```console
$ sbx run --clone claude . -- --dangerously-skip-permissions agents
```

For simultaneous tasks, each background session needs a separate worktree or
clone. Branches alone don't isolate edits in one working directory. How Claude
Code manages working directories depends on the task, configuration, and
project instructions. The `--clone` flag doesn't control this behavior. Ask
Claude Code to create a separate worktree for each task inside the sandbox.

To review a branch created by a session, fetch the
`sandbox-<sandbox-name>` remote from the host:

```console
$ git fetch sandbox-<sandbox-name>
$ git diff main..sandbox-<sandbox-name>/<branch>
```

See Git workflows for clone-mode details.

## Base image

The sandbox uses `docker/sandbox-templates:claude-code`. See
Base images to build your own image on top of
this base.

## Use a local model

For local models, hosted providers, and custom inference endpoints, see
Use local and hosted models.
