---
title: "Sandbox environment files (part 2 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/environment-files.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Sandbox environment files (part 2 of 4)

## Common workflows

The following examples combine environment file fields into configurations you
can adapt for a project.

### Add v3 kits

To add mixins to a built-in agent, list the mixins in `kits` and use the
built-in name in `agent`.

For example, save this as `web-app-env/v3.sbxenv.yaml` to use a Claude Code
workload with the Playwright mixin:

```yaml
schemaVersion: "1"
name: web-app-v3
agent: claude
workspace: ./web-app

kits:
  - docker.io/sbx/playwright:1.61.1
```

From `web-app-env`, run:

```console
$ sbx env run v3.sbxenv.yaml
```

The `agent` value selects the built-in Claude Code workload.
The `web-app-v3` name creates a separate sandbox.
For other agents, see the
published v3 workloads.

### Set the launch command

Set `entrypoint` and `cmd` to choose what `sbx env run` executes inside the
sandbox. For example, add these fields to your environment file to print two
arguments:

```yaml
entrypoint: [/usr/bin/printf, '%s\n']
cmd: [default, 'two words']
```

```console
$ sbx env run
default
two words
```

Each field is a list of strings. `sbx` appends `cmd` to `entrypoint`, preserving
each item as one argument, including spaces and empty strings. Arguments aren't
interpreted as shell expressions. To run a shell expression, explicitly use a
shell such as `entrypoint: [/bin/sh, -c]`.

Arguments after `--` replace `cmd` for that run and preserve `entrypoint`:

```console
$ sbx env run -- 'replacement argument'
replacement argument
```

Omit a field or set it to `null` to inherit its value from an earlier environment
file, or from the agent's defaults if no file sets it. Set a field to `[]` to
clear it. The combined command must still start with a non-empty executable.
When you combine files, later `entrypoint` and `cmd` lists replace earlier lists
instead of adding to them.

These settings apply only to `sbx env run`. They don't change the published kit,
its saved launcher, `sbx env exec`, or the sandbox's PID 1. With `--detach`, `run`
starts only the sandbox and doesn't execute the launch command. You can't combine
`--detach` with arguments after `--`.

### Combine team defaults and personal settings

Keep the shared configuration in a version-controlled environment directory
outside the mounted workspace. Put machine-specific settings in a file excluded
from version control. For example, commit `base.sbxenv.yaml` beside the
`web-app` directory:

```yaml
schemaVersion: "1"
name: web-app
agent: claude
workspace: ./web-app

env:
  NODE_ENV: development

sandboxOptions:
  cpus: 4
  memory: 8g
```

Add `local.sbxenv.yaml` to `.gitignore`, then use it for personal settings:

```yaml
env:
  LOG_LEVEL: debug

sandboxOptions:
  memory: 12g
```

Pass both files in merge order:

```console
$ sbx env run base.sbxenv.yaml local.sbxenv.yaml
```

In this example, the sandbox has four CPUs, 12 GB of memory, and both
environment variables. Each relative workspace path resolves from the directory
of the file that declares it.

#### Merge rules

Files merge in the order you pass them. Later scalar values override earlier
values, while nested mappings combine by key. Most lists append entries from each file.
The exceptions are:

- `ports`, `mcp.servers`, and `additionalWorkspaces`: matching entries use the
  last entry, as described in Override a list entry.
- `kits`: entries with the same source merge their arguments by key. Later
  argument values take precedence; other arguments are preserved.
- `entrypoint` and `cmd`: later lists replace earlier lists. See
  Set the launch command for inheritance and clearing.

#### Override a list entry

To override a port, MCP server, or additional workspace, declare a matching
entry later in the file or in a later file. The last entry replaces the whole
earlier entry and keeps its first position in the list. Entries that don't
match are kept as separate entries.

For example, change the host port for sandbox port `8080` in your personal
settings:

```yaml
# base.sbxenv.yaml
ports:
  - sandbox: 8080
    host: 3000
```

```yaml
# local.sbxenv.yaml
ports:
  - sandbox: 8080
    host: 4000
```

With `base.sbxenv.yaml` loaded first, the result is one port entry that publishes
sandbox port `8080` on host port `4000`.

Include every field you want to keep in the replacement. Omitted fields use
their defaults: omitting `host` in this example selects an ephemeral host port.
Similarly, omitting `readOnly` from a replacement workspace makes it writable.

`sbx` uses these fields to decide whether entries match:

| List | Matching fields |
| --- | --- |
| `ports` | Sandbox port and effective protocol |
| `mcp.servers` | Exact server name |
| `additionalWorkspaces` | Container target: the explicit `target`, or the resolved host path when `target` is omitted |

Port protocol names are case-insensitive. An omitted protocol uses `tcp4`, or
`tcp6` for an IPv6 `hostIP`. Different protocols, such as `tcp` and `tcp4`,
remain separate.

On macOS, an implicit workspace target uses the stored host-path casing when
available. Explicit targets remain case-sensitive.

Each source file must contain valid fields and values before merging. A later
override can't repair an invalid value in an earlier file. This also applies
to user defaults loaded from `~/.sbxenv.yaml`.

### Work across multiple repositories

Mount related repositories alongside the primary project when the agent needs
to coordinate changes or consult shared code and documentation:

```yaml
# sbxenv.yaml in the directory above the repositories
schemaVersion: "1"
name: web-platform
agent: codex

workspace: ./web-app

additionalWorkspaces:
  - path: ./shared-components
  - path: ./architecture-docs
    readOnly: true
```

The agent starts in `web-app`, can modify `shared-components`, and can read
`architecture-docs` without changing it. The environment file stays outside all
three workspaces. Relative paths resolve from the directory of the
environment file that declares them. Additional workspaces are mounted directly
even when the primary workspace uses clone mode.

### Reuse an environment in automation

Use the same committed environment for interactive development and automated
tasks. Developers attach to the agent with `run`:

```console
$ sbx env run
```

Automation can create the sandbox without attaching, run commands in it, and
remove it afterward:

```console
$ sbx env create --force
$ sbx env exec -- npm test
$ sbx env rm --force
```

For `create` and `run`, `--force` approves the plan for that invocation without
recording consent for later invocations. Use the flag for each unattended `create` or
`run`. For `rm`, `--force` approves the destroy plan and removes the sandbox even
when it is in use.

Commands and vault references under `secrets` resolve on the host, so the
automation runner must provide the referenced tools and authentication. The
secret <example-value> remain outside the environment file.

## Use a cloud environment

Use `sbx --cloud env` to create a sandbox on Docker-managed infrastructure from
an environment file. Cloud sandboxes don't mount or synchronize local project
files, and local credentials aren't available to them. You copy files into the
sandbox or clone a repository there, then retrieve your work before removing it.

For a walkthrough, supported settings, and lifecycle differences, see
Use environment files in the cloud.

## Review an environment plan

`sbx env create`, `sbx env run`, and `sbx env rm` show the changes an
environment makes outside its sandbox and ask for approval before applying
them. The plan includes host commands, credentials, bindings,
MCP registrations, directories, kits, published ports, sandbox options, and
environment variables.

Run `sbx env plan` to inspect the apply plan without changing, approving, or
recording anything:

```console
$ sbx env plan
```

The plan compares the environment file with the environment's last applied
state and the resources on the host. It omits resources that are unchanged and
already approved. Literal secret <example-value> appear as SHA-256 digests. Secret
references, host commands, environment variables, ports, paths, and binding
domains remain visible so you can review them.

Changes appear under the same keys and nesting as the environment file.
For example, this plan changes `GOFLAGS` from `-mod=mod` to `-mod=readonly`:

```text
   env:
~    GOFLAGS: -mod=mod -> -mod=readonly
```

Read the symbol beside each entry before approving the plan:

| Symbol | Effect of applying the entry |
| ------ | ---------------------------- |
| `+` | Add a resource |
| `~` | Change a resource |
| `-` | Destroy a resource |
| `>` | Run a host command again |
| `!` | Stop tracking a resource that is no longer declared, without deleting it |

Interactive approval is recorded for the environment under the `sbx` state
directory. Plans without host commands apply silently on later invocations until
the environment changes or a resource is missing. An approval provided with
`--force` applies only to that invocation.

### Approve or skip host commands

Plans containing lifecycle commands, credential `command` sources, or local MCP
commands require approval for every invocation by default, even when the command
text hasn't changed. Approve one invocation with `--force`, skip lifecycle and
MCP commands with `--skip-host-commands`, or turn on
`env.rememberHostCommands` to remember
approval until the commands change:

```console
$ sbx settings set env.rememberHostCommands true
```

To run an environment without lifecycle or local MCP commands, use:

```console
$ sbx env run --skip-host-commands
```

The flag also disables previously approved MCP commands before asking you to
approve the plan. They remain disabled even if you cancel the plan or restart
the daemon. To enable them again, run `sbx env run` without the flag and approve
the plan. Credential `command` sources still run when their secrets are needed.

## Recover after losing environment state

If `sbx env run` reports that a local sandbox "agrees with everything this
environment declares" but "nothing was done", the sandbox still exists, but
`sbx` cannot verify that it belongs to this environment. This can happen after
an upgrade or state reset loses the environment's records.

To keep using that sandbox without deleting and recreating it, run
`sbx env run` in an interactive terminal with the same environment file paths
and sandbox name. The command asks whether to adopt the sandbox. Confirm only
if this is the sandbox you want the environment to manage, then review and
approve the environment plan. Later runs recognize that sandbox, and
`sbx env rm` can remove it.

For an automated run that fails with this error, complete this recovery
interactively before retrying the automation. `--force` approves the plan but
doesn't confirm adoption. Only `sbx env run` offers adoption, and only when the
sandbox matches the environment's declarations.

## Update an environment

For an existing sandbox, `sbx env run` applies updated `env` values to the new
agent session and reconciles declared MCP servers. Changes to workspaces, kit
host mounts, kits, ports, secrets, bindings, and `sandboxOptions` take effect
only when the sandbox is next created. Remove the environment with `sbx env rm`, then create
it again to apply those changes.

Changes to `entrypoint` and `cmd` take effect on each `sbx env run` without
recreating the sandbox. If you also change `agent`, recreate the environment
before using a partial launch override that inherits defaults from that agent.
Equivalent agent names and aliases don't require recreation.

## Remove an environment

Secrets and registry credentials are sandbox-scoped. Credential <example-value> and
remote MCP server registrations are host-global and can be shared by multiple
sandboxes. Local MCP commands declared by the environment belong to that
environment and sandbox.

`sbx env rm` builds a destroy plan from the resources on the host. The plan
includes all credentials <example-value> at the sandbox's scope, including credentials
that the environment file no longer declares. After approval, `sbx` removes
only the resources named in the plan.

Global credential <example-value> remain unless you pass `--prune-bindings`. Remote
MCP registrations remain available to other sandboxes. Removing a local
environment revokes and removes the MCP commands it registered.

### Clean up after a failed create

Secret <example-value>, binding updates, and MCP server registration occur before
the sandbox is created. If sandbox creation fails, scoped secrets remain, and
bindings and MCP registrations may also remain. Run `sbx env rm` with the same
paths to remove the scoped secrets. Pass `--prune-bindings` if you also want to
remove the declared global bindings. Remote MCP registrations remain after
cleanup. If an environment MCP command registration cannot be removed, follow
Recover a conflicting MCP registration.
