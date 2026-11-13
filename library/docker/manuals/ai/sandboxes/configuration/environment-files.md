---
title: "Sandbox environment files (part 1 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/environment-files.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

A sandbox environment file captures the setup for a local or cloud sandbox in a
`sbxenv.yaml` file. Share the file with project contributors so they use the
same agent, tools, resources, and credentials <example-value> reproducing CLI flags and
setup steps.

Kits package software and declare what it needs to run. An environment file
selects those kits and configures the sandbox that uses them, including its
workspace, resources, credentials, and lifecycle commands. You can change or
share that configuration without repackaging the tools. See
Kits for how kits supply agents,
tools, and their runtime requirements.

> **Note:**
> `sbx env` is experimental. The command interface and file format may change.

The examples on this page use local sandboxes unless stated otherwise. For
cloud configuration and lifecycle differences, see
Use a cloud environment.

## Start an environment

Keep the environment file outside the directories you mount into the sandbox.
That includes the primary workspace and every `additionalWorkspaces` mount.
For example, place it beside your project:

```text
web-app-env/
├── sbxenv.yaml
└── web-app/
```

Create `web-app-env/sbxenv.yaml`. This example gives the agent a shared
environment variable and the Playwright browser-testing tools. It also
publishes the application's development port:

```yaml
schemaVersion: "1"
name: web-app
agent: claude
workspace: ./web-app

kits:
  - docker.io/sbx/playwright:1.61.1

env:
  NODE_ENV: test

ports:
  - sandbox: 3000
    host: 3000
```

From `web-app-env`, run the environment:

```console
$ sbx env run
```

`sbx` shows an environment plan and asks you to approve it. If you approve the
plan, the `web-app` directory becomes the workspace, while `sbxenv.yaml` remains
outside the sandbox. If the environment doesn't exist, `sbx` creates a sandbox
named `web-app`, installs Playwright and Chromium, and publishes sandbox port
`3000` on the host. It then attaches to the agent. Later runs attach to the
existing sandbox.

### Protect the environment file

Environment files can declare lifecycle, secret, and MCP commands that run on
your host. Keep them outside writable sandbox mounts so the agent cannot change
what a later invocation runs. This applies to both the primary workspace and
`additionalWorkspaces`.

If you need to keep an environment file in a direct-mounted workspace, place
it directly in the workspace root. `sbx` mounts the file read-only by default,
but a file in a subdirectory can still be replaced by renaming its parent
directory.

For a local environment where you intend the agent to edit the file, set
`sandboxOptions.writableEnvFiles: true`. The plan reports that the file is
writable. Use this option only when you trust the agent to change commands
that future invocations run on your host.

## Commands

| Command                                                                       | Description                                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `sbx env plan [PATH...]`                                                       | Shows what applying the environment would change without changing or approving it    |
| `sbx env run` `[PATH...] [-- ARG...]`          | Applies the approved plan, creates the environment if needed, and attaches            |
| `sbx env create` `[PATH...]`                | Applies the approved plan and creates the environment without attaching              |
| `sbx env exec` `[PATH...] -- COMMAND [ARG...]` | Runs a command in the environment, offering to create a missing sandbox interactively |
| `sbx env rm` `[PATH...]`                        | Shows a destroy plan, then removes the sandbox and resources named in the plan        |

To use an environment file, pass its path to `sbx env`. If you pass a
directory, `sbx` looks for `sbxenv.yaml` inside it. If you don't pass a path,
`sbx` looks in the directory you run the command from and loads your
user defaults, if present.

Every `sbx env` subcommand accepts `--name`. This flag sets the sandbox name
for that command, overriding the `name` field in the file or the automatically
generated name:

```console
$ sbx env create --name web-app-test
$ sbx env exec --name web-app-test -- npm test
$ sbx env rm --name web-app-test
```

Use the same file paths for each command. If you set `--name`, use that same
name for every command that manages the sandbox.

### Create an environment sandbox

Create the sandbox without attaching:

```console
$ sbx env create
```

To create the sandbox and attach to the agent, use `sbx env run` instead:

```console
$ sbx env run
```

Both commands follow the plan approval process
and run `initialize` lifecycle commands. After creating a sandbox,
they run `postCreate` commands before returning or attaching.

To run a command in the sandbox, use `sbx env exec`. If the sandbox is missing,
`exec` offers to create it when stdin is interactive. Creation follows the same
approval and lifecycle process before running your command. For an existing
sandbox, `exec` skips lifecycle commands. With noninteractive stdin or
`--no-input`, create the sandbox first with `sbx env create`. See
Reuse an environment in automation.

### Set user defaults

Create `~/.sbxenv.yaml` to share settings across your projects. For example,
this file selects Claude as the agent and mounts the directory you run
`sbx env` from:

```yaml
schemaVersion: "1"
agent: claude
workspace: ${{ env.projectDir }}
```

With this file saved in your home directory, run:

```console
$ cd /projects/web-app
$ sbx env run
```

The sandbox mounts `/projects/web-app` as its workspace. Run the same command
from `/projects/api`, and it mounts `/projects/api` instead. You don't need a
separate `sbxenv.yaml` in either project.

If the project has a `sbxenv.yaml`, `sbx` combines it with your user defaults.
Project settings override individual default values. Lists combine entries
from both files, with matching ports, MCP server names, and additional workspace
targets using the project entry. See the
merge rules for details. If you
pass a file or directory path to the command, `sbx` skips `~/.sbxenv.yaml`.

In `~/.sbxenv.yaml`, you can set `workspace` to `${{ env.projectDir }}` or a
subdirectory such as `${{ env.projectDir }}/src`. Other workspace paths
aren't accepted in this file.

The user defaults file cannot set `name`. Set the sandbox name in a project
environment file or with `--name`.

### Reference directories

You can use `${{ env.projectDir }}` and `${{ env.fileDir }}` in environment
files to insert absolute directory paths. They refer to directories on the
host.

#### Project directory

`${{ env.projectDir }}` is the absolute path to your project directory.
`sbx` chooses this directory from the command you run:

- `sbx env run`: the directory you run the command from.
- `sbx env run /projects/web-app`: `/projects/web-app`.
- `sbx env run /projects/web-app/custom.yaml`: `/projects/web-app`, the
  directory containing the file.

If you pass <example-value> paths, the first one sets the project directory. Every
file loaded by that command uses the same value for `env.projectDir`.

Use this reference in shared settings that need to point to each project's
files. For example, `workspace: ${{ env.projectDir }}/src` mounts the `src`
directory in whichever project you select.

#### File directory

`${{ env.fileDir }}` is the absolute path to the directory containing the
environment file where you write the reference. For example, inside
`/shared/environment.yaml`, its value is `/shared`.

Use this reference when an environment file needs to locate files stored
alongside it. For example, suppose your setup script is
`/shared/scripts/setup.sh`. Add this lifecycle command to
`/shared/environment.yaml` to run the script from `/shared`:

```yaml
lifecycle:
  initialize:
    - command: ./scripts/setup.sh
      workdir: ${{ env.fileDir }}
```

The command runs from `/shared`, even if you use this environment file with
a project in another directory.

Relative workspace paths already use the directory containing the environment
file. For example, `workspace: ./src` in `/shared/environment.yaml` mounts
`/shared/src`.

Both directory references can appear in YAML values, but not in field names
or inside the `args` block.

### Parameterize an environment

Declare inputs in a top-level `args` block when values need to vary between
uses of the same environment file. Each argument must have exactly one of
`default` or `required: true`:

```yaml
schemaVersion: "1"
name: web-app
agent: claude

args:
  channel:
    default: stable
    description: Release channel
    enum:
      - stable
      - beta
  endpoint:
    required: true
    description: API endpoint
  cpus:
    default: "4"
    pattern: "[1-9][0-9]*"

env:
  RELEASE_CHANNEL: ${{ env.args.channel }}
  API_ENDPOINT: ${{ env.args.endpoint }}

sandboxOptions:
  cpus: ${{ env.args.cpus }}
```

Reference a declared argument as `${{ env.args.NAME }}` anywhere a YAML value
can appear. References can't be used in field names or within the `args` block.
An unquoted reference is interpreted as a YAML value after substitution, so
the `cpus` value in this example becomes an integer. Quote a reference to
preserve it as a string.

All `sbx env` commands accept repeatable `--env-arg NAME=VALUE` flags. Values
provided with a flag replace defaults from the environment file:

```console
$ sbx env run --env-arg endpoint=https://api.example.com --env-arg channel=beta
```

Use `--env-args-file` to load values from a file. Each non-empty, non-comment
line must have the form `NAME=VALUE`:

```text
# production.args
channel=beta
endpoint=https://api.example.com
```

```console
$ sbx env run --env-args-file production.args
```

You can pass <example-value> argument files. Later files take precedence over earlier
files, and `--env-arg` flags take precedence over every argument file.
Values can contain `=`, and values in an argument file are read literally
rather than expanded by a shell.

Argument references and the two directory references are the only variable
expressions expanded in an environment file. Shell-style expressions such as
`${VAR}` aren't expanded from the host environment. Other dollar signs remain
literal, so a value such as `$PATH:/opt/bin` is passed unchanged.
Use `$${{ env.args.NAME }}` to produce the literal text `${{ env.args.NAME }}`. Substituted values aren't expanded a
second time.
