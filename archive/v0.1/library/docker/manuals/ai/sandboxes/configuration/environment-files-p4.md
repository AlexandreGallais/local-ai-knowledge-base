---
title: "Sandbox environment files (part 4 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/environment-files.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Sandbox environment files (part 4 of 4)

### `secrets`

`secrets` maps service names to secret sources. Each entry must set exactly one
of `value`, `ref`, or `command`. The secret is stored at the sandbox scope when
the environment is created.

| Field      | Type    | Default | Description                                                                  |
| ---------- | ------- | ------- | ---------------------------------------------------------------------------- |
| `value`    | string  | None    | Literal secret value                                                         |
| `ref`      | string  | None    | Vault URI, such as `op://Vault/Item/field`                                    |
| `command`  | string  | None    | Host shell command whose standard output becomes the secret                   |
| `snapshot` | boolean | `false` | Resolve `ref` or `command` once on the host and store the result as a literal |
| `refresh`  | string  | None    | Resolution policy for `ref` or `command`, such as `on-demand` or `55m`        |
| `backend`  | string  | Automatic | Resolver for `ref`: `sdk` or `cli`                                          |
| `noVerify` | boolean | `false` | Skip verifying that a `ref` or `command` resolves during provisioning          |

> **Warning:**
> A literal `value` is visible to anyone with read access to the file. Use a
> vault URI with `ref` or obtain the value at runtime with `command`.

```yaml
secrets:
  anthropic:
    ref: op://Private/Anthropic/api-key
    refresh: 55m
  github:
    command: gh auth token
```

Secret <example-value> execute from a fresh temporary directory on the host. Relative
helper paths resolve from that directory. Keep helpers and their dependencies
outside writable sandbox mounts. Use an absolute path, an absolute host
`PATH` entry, or an explicit change to the helper's private directory. See
dynamic secret sources.

Built-in 1Password and AWS Secrets Manager references also run from a temporary
directory and require provider tools in absolute host `PATH` directories. See
dynamic secret <example-value> for provider
configuration requirements.

For a cloud environment, set `snapshot: true` on a `ref` or `command` source:

```yaml
secrets:
  github:
    command: gh auth token
    snapshot: true
```

The command runs on the host after plan approval. The resolved value is stored
as a literal secret and doesn't refresh. Recreate the environment to rotate
it. Snapshots also work with local environments. A snapshot can't set
`refresh` or `noVerify`. Cloud snapshots use CLI resolvers for vault references
and don't support `backend: sdk`.

### `bindings`

`bindings` approves credential <example-value> domains for each service. The
environment merges these approvals into the user's global
`credentials.yaml`. Each service can contain an `apiKey` block, an `oauth`
block, or both. Each block contains a `domains` list:

```yaml
bindings:
  github:
    apiKey:
      domains:
        - api.github.com
```

`sbx env rm` preserves global bindings by default. Pass `--prune-bindings` to
remove every service binding declared by the environment file.

> **Warning:**
> `--prune-bindings` deletes the complete global binding entry for every
> service declared in the environment file. This can affect other sandboxes
> that share those service bindings.

### `registries`

`registries` maps registry hostnames to pull credentials. Each entry requires
`secret` and accepts an optional `username`. Both fields accept a secret <example-value>
with exactly one of `value`, `ref`, or `command`.

When `username` is omitted, `sbx` stores a token-only credential. Registries
such as GHCR and GitLab accept token-only credentials.

```yaml
registries:
  ghcr.io:
    secret:
      command: gh auth token
```

### `mcp`

The `mcp.servers` list registers servers with the built-in
MCP gateway and adds them to the sandbox. Remote servers
registered with `url` remain host-global and survive `sbx env rm`. In local
environments, servers registered with `command` belong to the environment
and can run only for its sandbox.

| Field     | Type            | Required | Default | Description                                                     |
| --------- | --------------- | -------- | ------- | --------------------------------------------------------------- |
| `name`    | string          | Yes      | None    | Server name                                                     |
| `url`     | string          | No       | None    | Remote server URL, registry reference, or OCI reference          |
| `command` | string          | No       | None    | Command for a local stdio server                                 |
| `args`    | list of strings | No       | None    | Arguments passed to `command`                                   |

Each server must set exactly one of `url` or `command`.

#### Approve local MCP commands

A `command` server runs on your host with your privileges whenever the
sandbox's MCP gateway starts, including after restarts. The environment plan
shows the resolved executable and arguments before registration. Approval
pins the executable path, not the contents of executables, scripts, or
packages they load. Keep these files outside writable sandbox mounts.

If an `initialize` command creates the executable or changes its resolved
path, `sbx` asks you to approve the resolved MCP command after initialization.
Declining that approval leaves the completed initialization work in place
but does not register the command. `--force` approves both stages for that
invocation.

Removing a command from the file and applying the environment revokes its
registration. `sbx env rm` removes the environment's command registrations.

#### Recover a conflicting MCP registration

An environment cannot take over a command registered manually or by another
environment, even when its executable and arguments match. Choose a different
server name, or remove the conflicting registration before applying the file.

For a legacy or damaged registration, stop the daemon before removing only
its saved registration:

```console
$ sbx daemon stop
$ sbx mcp rm --registration-only -- <SERVER_NAME>
```

When the name is shared by multiple sandbox-owned registrations, select the
owning sandbox with `--sandbox`:

```console
$ sbx daemon stop
$ sbx mcp rm --registration-only --sandbox <SANDBOX_NAME> -- <SERVER_NAME>
```

This removes only the selected sandbox's registration, including a damaged
sandbox-scoped record, and preserves other owners' registrations. Sandbox
selection requires valid, readable ownership metadata for an unscoped record;
`--sandbox` cannot recover a damaged unscoped record.

Stopping the daemon interrupts its sandbox gateways. Registration-only removal
does not delete saved credentials or stop MCP processes that are already
running. Apply the environment again to register and approve the command for
its sandbox.

### `ports`

`ports` publishes sandbox ports when the environment is created. Ports exposed
by a kit but omitted from this list receive an ephemeral host port.

| Field      | Type    | Required | Default                              | Description                                     |
| ---------- | ------- | -------- | ------------------------------------ | ----------------------------------------------- |
| `sandbox`  | integer | Yes      | None                                 | Sandbox port from 1 through 65535               |
| `host`     | integer | No       | Ephemeral                            | Host port from 1 through 65535                  |
| `protocol` | string  | No       | `tcp4`, or `tcp6` for IPv6 `hostIP` | `tcp`, `tcp4`, `tcp6`, `udp`, `udp4`, or `udp6` |
| `hostIP`   | string  | No       | Loopback                             | Host interface to bind                          |

Set `protocol: tcp` to bind both IPv4 and IPv6. Leave `hostIP` unset for a
dual-stack binding because an explicit address binds only its own IP family.

If a port can't be published, sandbox creation fails and removes the new
sandbox.
