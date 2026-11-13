---
title: "Kits v2 (part 3 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/customize/kits-v2.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Kits v2 (part 3 of 4)

## Setup

`setup.install`, `setup.startup`, and `setup.files` are lists of commands or
files with the fields described here.

### Execution order

When a sandbox is created, kit content is applied in this order:

1. Network permissions and environment variables.
2. Static files under `files/home/`.
3. `setup.install` commands, in declaration order.
4. `setup.files` entries.
5. `setup.startup` commands are registered for each sandbox start.
6. Static files under `files/workspace/`, after the workspace is ready. With
   `--clone`, this means after the repository has been cloned.

For stacked kits, entries in each stage are applied in `--kit` order. An install
command can consume a bundled file from `files/home/`, but not one from
`files/workspace/` or `setup.files`, because those files land later.

`sbx kit add` recreates the sandbox rather than modifying it in place. It
supports mixin kits limited to
`environment.variables`, `setup.install`, `setup.startup`, and
`permissions.network.allow`, which follow the same order as sandbox creation.
Startup commands run after the kit is added and on each subsequent sandbox
start. The command rejects kits that declare static files or `setup.files`.
To use those fields, create the sandbox with the kit included.

### install

Runs synchronously when a kit is applied, either during sandbox creation or
through `sbx kit add`. Shell strings are passed to `sh -c`.

Kit install commands start in the template image's configured `WORKDIR`.
Docker-provided templates use `/home/agent/workspace`, which isn't necessarily
the primary workspace in a direct-mounted or clone-mode sandbox. Don't rely on
the current directory to locate workspace files. Use absolute paths for bundled
assets from `files/home/`.

| Field         | Default | Description                   |
| ------------- | ------- | ----------------------------- |
| `command`     | —       | Shell command string.         |
| `user`        | `"0"`   | User to run as. `"0"` = root. |
| `description` | —       | Human-readable description.   |

### startup

Runs at every sandbox start. String array, not interpreted by a shell. A
`$WORKSPACE_DIR` reference in the array is passed unchanged. To expand it, run
the command through a shell, for example `["sh", "-c", "..."]`.

| Field         | Default  | Description                         |
| ------------- | -------- | ----------------------------------- |
| `command`     | —        | Command and args as a string array. |
| `user`        | `"1000"` | User to run as. `"1000"` = agent.   |
| `background`  | `false`  | Block later startup commands until this command finishes. Set to `true` to let later commands run without waiting. |
| `description` | —        | Human-readable description.         |

Startup commands are non-interactive. They run before the agent
attaches, with no terminal connected, so they can't prompt the user
(for example, an interactive `aws login` will hang or fail). They also
don't gate the agent's entrypoint: the agent launches once startup
commands have been dispatched, regardless of `background`. A value of
`false` waits within the startup dispatcher before it runs the next command;
it doesn't delay the agent entrypoint. Use startup commands
for work that can run alongside the agent. Use `setup.files` for any value that
needs to land on disk before the agent runs.

Startup commands must be idempotent. They run on every sandbox start
and replay on container restarts, so a command that fails or
misbehaves on a second invocation breaks the restart path. Guard
work with existence checks, use upserts instead of inserts, and
prefer commands that converge to the same end state regardless of
how many times they run.

### files

Files written at sandbox start, with runtime substitution.

| Field           | Default  | Description                                               |
| --------------- | -------- | --------------------------------------------------------- |
| `path`          | —        | Absolute container path.                                  |
| `content`       | —        | File content. Write `${WORKDIR}` for the workspace path. |
| `mode`          | `"0644"` | File permissions in octal.                                |
| `onlyIfMissing` | `false`  | Skip if the file already exists.                          |

The runtime writes these files as the agent user with UID 1000. The target
path must be writable by that user. To write to a root-owned path such as
`/etc`, use an `install` command, which runs as root by default. Set ownership
in the install command if the agent needs to modify the file later.

Write `${WORKDIR}` in `content` and `$WORKSPACE_DIR` in commands. Three names
look alike and mean different things:

| Name            | What it is                                                    | Where it applies                                 |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `${WORKDIR}`    | Placeholder for the workspace path                            | `setup.files[].content` only                     |
| `WORKSPACE_DIR` | Environment variable set by the runtime to the workspace path | Shell commands, and the agent                    |
| `WORKDIR`       | The template image's Dockerfile working directory             | Where commands start, see install    |

The runtime replaces `${WORKDIR}` when it creates the sandbox, only inside
`content`, never in `path` or in commands. `WORKSPACE_DIR` is an environment
variable, so a `$WORKSPACE_DIR` reference expands only when a shell runs the
command. `install` strings run through `sh -c`. `startup` arrays run without a
shell. A Dockerfile `WORKDIR` doesn't define an environment variable.

### Shell initialization and service logs

With Docker templates, append shell initialization to
`/etc/sandbox-persistent.sh` in an install command. Keep existing content and
omit completion scripts: interactive and non-interactive Bash commands source
this file. For a background service, redirect startup output to a file and
read it with `sbx exec`. Use `background: true` instead of a trailing `&`.

## Static files

```text
my-kit/files/
├── home/       → /home/agent/
└── workspace/  → primary workspace path
```

| Kit path           | Container destination                   |
| ------------------ | --------------------------------------- |
| `files/home/`      | `/home/agent/` (config files, dotfiles) |
| `files/workspace/` | The primary workspace path              |

Parent directories are created automatically. Existing files are
overwritten. Absolute paths and path-traversal sequences (`../../`) are
rejected.

Static files can supply linter settings, helper scripts, or agent skills.
For example, a Claude Code project skill belongs at
`files/workspace/.claude/skills/<NAME>/SKILL.md`.

## Volumes

Declare `volumes` as a list of mounts with these fields:

| Field  | Description                                                         |
| ------ | ------------------------------------------------------------------- |
| `path` | Required absolute container path.                                   |
| `type` | Empty for a block-backed volume, or `tmpfs` for RAM-backed storage. |
| `size` | Optional byte-size string.                                          |
| `mode` | Optional octal permissions.                                         |

Volumes are applied only when a sandbox is created. `sbx kit add` cannot attach
volumes to a running container.

## Fork an existing agent

This example requires an older `sbx` version with built-in v2 agents.
Built-in names select v3 kits for sandbox creation with the latest `sbx`.
For v3 customization, see Compose a kit set.

Sandbox kits (`kind: sandbox`) define a full agent from scratch. The most
common variant is a fork of a built-in agent. Use `extends:` to inherit the
parent's complete configuration and declare only the fields you want to change.
This example replaces the built-in `claude` entrypoint so Claude Code uses
manual permission mode instead of bypassing approval prompts:

```yaml
schemaVersion: "2"
kind: sandbox
name: claude-safe
displayName: Claude Code (with approval prompts)
description: Claude Code in manual permission mode

extends: claude

sandbox:
  entrypoint: [claude, "--permission-mode", "manual"]
```

The child inherits the built-in image, credentials, network permissions,
persistent volumes, settings, MCP integration, agent instructions, setup
entries, and environment variables. Its `sandbox.entrypoint` replaces the
inherited entrypoint.

Launch by passing the sandbox kit in place of a built-in agent name:

```console
$ sbx run ./claude-safe
```

## Install an internal CA certificate

Put each PEM-encoded root certificate under `files/home/` with a `.crt`
extension. For `files/home/internal-ca.crt`, use:

```yaml
schemaVersion: "2"
kind: mixin
name: internal-ca
setup:
  install:
    - command: "install -m 0644 /home/agent/internal-ca.crt /usr/local/share/ca-certificates/internal-ca.crt && update-ca-certificates"
      user: "0"
```

This updates the system trust store. For several CAs, install every
certificate before running `update-ca-certificates`.

## Sandbox-managed agent configuration

Built-in agent kits reserve the following paths for sandbox setup. Treat these
paths as sandbox-managed, even if a file is only needed for a particular
feature. Don't target them with static files, `setup.files`, or install
commands. Later setup can replace your content or depend on settings that your
file removes. In this table, `~` is `/home/agent`.

| Built-in agent kit | Managed configuration paths |
| ------------------ | --------------------------- |
| `claude` | `~/.claude.json`, `~/.claude/settings.json`, `~/.claude/.config.json` |
| `codex` | `~/.codex/config.toml` |
| `copilot` | `~/.copilot/config.json` |
| `cursor` | `~/.cursor/cli-config.json` |
| `devin` | `~/.config/devin/config.json`, `~/.config/devin/mcp_config.json` |
| `kiro` | `~/.kiro/settings/mcp.json` |
| `opencode` | `~/.config/opencode/opencode.json` |

Use separate settings files when supported: Claude Code accepts `--settings`,
and OpenCode reads `OPENCODE_CONFIG`. Don't use `setup.startup` for settings
the agent must read during initialization; startup commands don't gate the
entrypoint.

## Validate and inspect kits

Use these commands to check a kit before sharing it:

- `sbx kit validate ` — check that a kit directory or ZIP is
  well-formed.
- `sbx kit inspect ` — display kit details. Add `--json` for
  machine-readable output.

Add `--offline` to validate or inspect a local directory or ZIP without starting
the daemon or signing in. Offline checks skip kit source and signature policies;
they don't establish whether the kit is permitted to load.

## Packaging and distribution

- `sbx kit pack  -o <file.zip>` — package a directory as a ZIP file
  for sharing.
- `sbx kit push  <ref>` — publish to an OCI registry (for example,
  `ghcr.io/myorg/my-kit:1.0`).
- `sbx kit pull <ref>` — download a kit to the working directory as `.zip`
  for schema v1 or `.tar.gz` for schema v2. Use `--output <FILE>` to choose
  the output path.

For Docker Hub, `sbx kit pull` and `sbx kit push` use the session from
`sbx login`. For other registries, they prefer credentials <example-value> with
`sbx secret set --registry`.
Both commands fall back to the Docker credential store, so credentials from
`docker login` also work.

## Sign and verify kits

Use cosign-compatible Sigstore signatures to verify who approved a kit and
that its signed content hasn't changed. Signing is keyless by default. Verify a
keyless signature with the certificate identity and OpenID Connect (OIDC)
issuer:

```console
$ sbx kit sign ./my-kit/
$ sbx kit verify \
    --certificate-identity user@example.com \
    --certificate-oidc-issuer https://accounts.google.com \
    ./my-kit/
```

For key-based signing, use an ECDSA P-256 key pair:

```console
$ sbx kit sign --key cosign.key ./my-kit/
$ sbx kit verify --key cosign.pub ./my-kit/
```

For a local directory, `sbx kit sign` writes a `kit.sig.bundle` file next to
`spec.yaml`. Commit this file so consumers can verify a kit loaded from the Git
repository.

Git line-ending conversion and clean filters can invalidate a source signature.
If `sbx kit sign` warns about these transformations, ensure Git preserves the
signed files unchanged before sharing the Git reference.

For an OCI kit, the signature is stored as an OCI referrer. You can sign an OCI
kit after pushing it, or push and sign it in one step:

```console
$ sbx kit push ./my-kit/ ghcr.io/myorg/my-kit:1.0 --sign
```

ZIP kits can't carry verifiable signatures.

### Inspect provenance

Pushing a kit also attaches a provenance attestation that records its content
digests, declared sandbox image, and source Git commit when pushed from a
working tree. Inspect it to check the source of a published kit:

```console
$ sbx kit provenance ghcr.io/myorg/my-kit:1.0
```

Provenance is unsigned by default. Use `sbx kit push --sign` to sign both the
kit manifest and its provenance when publishing.

### Require signed kits

Set `kit.trustedSigners` to
the identities or keys you trust before requiring signatures. Otherwise, `sbx` uses the default policy, which trusts
Docker employee identities attested by Google's OpenID Connect issuer. A
keyless policy must specify both the certificate identity and its OpenID
Connect issuer:

```console
$ sbx settings set kit.trustedSigners \
    '[{"identity":"user@example.com","issuer":"https://accounts.google.com"}]'
$ sbx settings set kit.requireSignature true
```

To trust a key-based signature, set the policy to the public key path:

```console
$ sbx settings set kit.trustedSigners '[{"key":"/path/to/cosign.pub"}]'
$ sbx settings set kit.requireSignature true
```

When `kit.requireSignature` is `true`, `sbx` rejects unsigned kits, signatures
that don't match `kit.trustedSigners`, and ZIP kits. This policy applies when a
kit is loaded from a local directory, Git repository, or OCI registry.

The signature covers `spec.yaml` and the kit's `files/` content, but not mutable
dependencies such as image tags or content downloaded by install and startup
commands. Pin those dependencies by digest or checksum when they must remain
immutable.
