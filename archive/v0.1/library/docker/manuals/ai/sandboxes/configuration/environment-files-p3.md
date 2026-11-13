---
title: "Sandbox environment files (part 3 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/environment-files.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Sandbox environment files (part 3 of 4)

## File reference

### Top-level fields

| Field                  | Type             | Required | Default                        | Description                                                                     |
| ---------------------- | ---------------- | -------- | ------------------------------ | ------------------------------------------------------------------------------- |
| `schemaVersion`        | string           | Yes      | None                           | Schema version. The supported value is `"1"`                                   |
| `name`                 | string           | No       | `<agent>-<workspace-basename>` | Sandbox name, overridden by `--name`                                                                    |
| `agent`                | string           | Yes      | None                           | Built-in agent or the name of an agent kit                                      |
| `entrypoint` | list of strings | No | Agent default | Launch executable and fixed arguments for `run`. See Set the launch command |
| `cmd` | list of strings | No | Agent default | Default arguments appended to `entrypoint`; arguments after `--` replace this list |
| `args`                 | map              | No       | None                           | Environment arguments. See `args`                                      |
| `kits`                 | list             | No       | None                           | Kits to install at creation. See `kits`                                 |
| `workspace`            | string or object | No       | No host mount                  | Primary workspace. See `workspace`                                |
| `additionalWorkspaces` | list             | No       | None                           | Extra directories to mount. See `additionalWorkspaces` |
| `mounts` | map of strings | No | None | Host directories for kit-declared mounts. See `mounts` |
| `env`                  | map of strings   | No       | None                           | Environment variables for the sandbox                                           |
| `sandboxOptions`       | object           | No       | None                           | Creation options. See `sandboxOptions`                        |
| `secrets`              | map              | No       | None                           | Service credentials. See `secrets`                                  |
| `bindings`             | map              | No       | None                           | Credential <example-value> approvals. See `bindings`                     |
| `registries`           | map              | No       | None                           | Registry pull credentials. See `registries`                      |
| `mcp`                  | object           | No       | None                           | MCP servers. See `mcp`                                                  |
| `ports`                | list             | No       | None                           | Port mappings. See `ports`                                            |
| `lifecycle`            | object           | No       | None                           | Host commands. See `lifecycle`                                    |

### `args`

`args` maps argument names to their declarations. Names must start with a
letter or underscore and can contain letters, numbers, underscores, and
hyphens. Each declaration must set exactly one of `default` or `required:
true`.

| Field         | Type            | Default | Description                                                       |
| ------------- | --------------- | ------- | ----------------------------------------------------------------- |
| `default`     | string          | None    | Value used when the command doesn't supply the argument           |
| `required`    | boolean         | `false` | Require the command to supply the argument                         |
| `description` | string          | None    | Explanation shown in command output                               |
| `enum`        | list of strings | None    | Values accepted for the argument                                  |
| `pattern`     | string          | None    | Go (`RE2`) expression matched against the complete argument value |

`enum` and `pattern` can't be used together.

### `kits`

`kits` accepts local directories, ZIP archives, OCI registry references, and
Git URLs prefixed with `git+https://` or `git+ssh://`. Kits can install tools,
configure the sandbox, and give the agent project-specific instructions.
To add mixins to built-in agents, see
Add v3 kits.

An environment file selects kits and configures a sandbox's host resources.
A kit descriptor defines the package itself. The environment file's
`schemaVersion` is independent of the schema version in a kit descriptor.

Explicit relative paths resolve from the directory of the environment file
that declares them. These include `.`, `..`, paths that start with `./` or
`../`, and relative paths that end in `.zip`. Bare references such as
`organization/kit` remain registry references.

Use an object entry to pass <example-value> to a kit. Set `source` to the kit
reference and map the kit's argument names to values under `args`:

```yaml
kits:
  - source: ./kits/tool
    args:
      version: ${{ env.args.channel }}
```

Remote kit sources must match the
`kit.allowedSources` setting. Docker Hub is
allowed by default. To use Git kits from `docker/sbx-kits-contrib`, add its
source:

```console
$ sbx settings set kit.allowedSources '["docker.io/","github.com/docker/"]'
```

The setting replaces the complete allowlist, so include any existing sources
you want to keep. For reproducible setup, pin Git kits with the `ref` URL
parameter and OCI kits with an immutable tag or digest.

### `workspace`

When specified as a string, `workspace` is the path. Use the object form for
clone mode. Omit `workspace` to create a sandbox without a host bind mount. Set
`workspace: .` to mount the directory that contains the environment file
that declares it.

For environment file placement and write protection, see
Protect the environment file.

| Field   | Type    | Required | Default | Description                                                     |
| ------- | ------- | -------- | ------- | --------------------------------------------------------------- |
| `path`  | string  | Yes      | None    | Workspace directory. Relative paths resolve from the declaring file's directory |
| `clone` | boolean | No       | `false` | Use a private clone, equivalent to `sbx create --clone`          |

You can override `workspace.clone` for one `create` or `run` invocation with
`--clone` or `--clone=false`.

### `additionalWorkspaces`

Each additional workspace is mounted after the primary workspace. Relative
paths resolve from the directory of the environment file that declares them.

| Field      | Type    | Required | Default                      | Description                            |
| ---------- | ------- | -------- | ---------------------------- | -------------------------------------- |
| `path`     | string  | Yes      | None                         | Directory to mount                     |
| `target`   | string  | No       | Host path inside the sandbox | Absolute POSIX path inside the sandbox |
| `readOnly` | boolean | No       | `false`                      | Mount the directory read-only          |

For example, mount a shared library directory read-only at a chosen path:

```yaml
workspace: .
additionalWorkspaces:
  - path: ../shared-libs
    target: /workspace/libs
    readOnly: true
```

Omit `target` to use the host path inside the sandbox. The same
target restrictions apply as with
`sbx create` and `sbx run`.

### `mounts`

`mounts` selects host directories for
kit-declared host mounts
in local sandboxes. Map each kit-declared sandbox path to an existing host
directory. Relative host paths resolve from the environment file that declares
them:

```yaml
mounts:
  /home/agent/history: ./history
```

The target must match a `host-mount@1` path declared by one of the selected
kits. Bindings take effect when the sandbox is created.

### `sandboxOptions`

| Field         | Type            | Default  | Description                                           |
| ------------- | --------------- | -------- | ----------------------------------------------------- |
| `template`    | string          | None     | Custom sandbox template image                         |
| `memory`      | string          | None     | Memory limit, such as `8g` or `512m`                   |
| `cpus`        | integer         | `0`      | Number of CPUs. `0` selects the host default            |
| `pullPolicy`  | string          | `always` | Image pull policy: `always`, `missing`, or `never`     |
| `profile`     | string          | None     | Governance profile name                               |
| `skills`      | string          | Daemon default | Shared agent skills store access: `off`, `readonly`, or `readwrite` |
| `display`     | boolean         | `false`  | Provision a display socket for graphical applications |
| `fuse`        | boolean         | `sandbox.fuse` setting | Mount FUSE filesystems; local only |
| `gpu`         | boolean         | `false`  | Pass the host GPU through to the sandbox               |
| `usb`         | list of strings | None     | USB device selectors to pass <example-value> to the sandbox   |
| `writableEnvFiles` | boolean     | `false`  | Let the sandbox write to shared environment files; local only |

For local sandboxes, `cpus: 0` allocates all host CPUs, except on Linux arm64
hosts, where the default is capped at 16. Set `cpus` to an explicit count to
request a larger allocation, up to the number of available host CPUs. When creating a sandbox directly with
`sbx create` or `sbx run`, use `--cpus` for the same override. Cloud resource
limits must match a cloud size.

`skills` controls access to the shared agent skills
store. Set it to `off` to omit the mount, `readonly` to mount the store read-only,
or `readwrite` to let the sandbox modify shared skills. If omitted, it uses the
daemon's default, which is `readonly` unless your organization overrides it.

Set `fuse` to `false` to disable FUSE access for this sandbox. See the
`sandbox.fuse` setting for defaults and when changes
take effect.

### `lifecycle`

The `lifecycle` block declares commands that run on the host with your user
privileges. Use lifecycle commands for work that must happen outside the
sandbox, such as creating a workspace, seeding fixtures, or archiving state.

```yaml
lifecycle:
  initialize:
    - name: Prepare workspace
      command: test -d web-app || git clone https://github.com/example/web-app
      timeout: 5m
  postCreate:
    - command: ./scripts/seed-fixtures.sh
      workdir: web-app
  preRemove:
    - command: ./scripts/archive-state.sh
```

Lifecycle phases run at the following points:

| Phase        | Timing                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `initialize` | Before other create or run actions. Runs for every `create` and `run`                                             |
| `postCreate` | After a new sandbox is created. For `run`, before attachment. Does not run when attaching to an existing sandbox   |
| `preRemove`  | After you approve removal and before `sbx` deletes resources. A failure produces a warning and removal continues  |

For lifecycle behavior with `sbx env exec`, see
Create an environment sandbox.

Commands within a phase run in order and stop at the first failure. Make
`initialize` commands safe to run more than once.

After `preRemove` commands finish, `sbx` generates the destroy plan again.
Removal stops if the commands introduced changes that weren't included in the
approved plan.

Each command requires `command` and accepts the following fields:

| Field     | Type   | Default           | Description                                                                    |
| --------- | ------ | ----------------- | ------------------------------------------------------------------------------ |
| `name`    | string | Command text      | Label shown in progress and plan output                                        |
| `command` | string | None              | Command passed to the user's shell                                             |
| `workdir` | string | Project directory | Host working directory. Relative paths resolve from the first file's directory |
| `timeout` | string | None              | Maximum runtime, such as `90s` or `5m`                                         |

Commands inherit the environment of the `sbx` process and receive the following
variables:

| Variable | Value |
| -------- | ----- |
| `SBX_LIFECYCLE_PHASE` | Phase running the command: `initialize`, `postCreate`, or `preRemove` |
| `SBX_ENV_FILE` | Absolute path to the last environment file in merge order |
| `SBX_ENV_FILES` | Absolute paths to all environment files in merge order, separated by `:` on macOS and Linux or `;` on Windows |
| `SBX_ENV_DIR` | Project directory, used as the default host working directory |
| `SBX_SANDBOX_NAME` | Resolved sandbox name, including any `--name` override |
| `SBX_AGENT` | Resolved agent name |
| `SBX_WORKSPACE` | Primary workspace path on the host. Empty when no workspace is declared, including cloud environments |

For cloud environments, `sbx` commands run by lifecycle commands inherit cloud
mode and the selected endpoint. For example, `sbx cp` in a lifecycle command
targets the cloud even without `--cloud`.

The environment file'<example-value>'t passed to host
commands.
