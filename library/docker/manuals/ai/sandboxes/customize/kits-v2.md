---
title: "Kits v2 (part 1 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/customize/kits-v2.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Kits v2

V2 kits remain supported and are not deprecated. Built-in agent names such
as `claude` and `codex` select v3 kits and cannot use v2 mixins. This page
covers v2 kit usage and specification. For new kits, Docker recommends
v3. V1 also remains supported.

## Use existing kits

A v2 kit contains `spec.yaml` with `schemaVersion: "2"` and an optional `files/`
tree. A sandbox kit defines the agent environment. A mixin adds tools or
configuration to it. Pass a sandbox kit in place of the agent name and add
mixins with `--kit`:

```console
$ sbx run ./my-agent --name my-project --kit ./team-config
```

`sbx run` uses your current directory as the workspace. Append a project path
to use another directory. To create without launching the agent, use
`sbx create`; include a workspace path or `.` to mount a directory.
References can be local directories, ZIP files, OCI artifacts, or Git URLs.
Start relative paths with `./` or `../`. For Docker Hub kits, you can omit
`docker.io/` and use `<NAMESPACE>/<KIT>:<TAG>`. In Git URLs, `ref` selects a
revision and `dir` the kit directory. Quote URLs containing `&`:

```console
$ sbx run "git+https://github.com/<ORG>/<REPOSITORY>.git#ref=<COMMIT>&dir=my-agent"
```

`git+ssh://` URLs work with your local SSH agent and Git credentials.
For private registries, see
Registry credentials.

Kit selection with `--kit` applies at creation. Recreate the sandbox to change
its kit set, except for the limited updates supported by
`sbx kit add`. That command restarts the sandbox while
preserving packages, images, volumes, and agent history. Kits can't be
removed from a running sandbox.

### Restrict kit sources

See Restrict kit sources
for source policies. `kit.allowLocalKits` also governs v2 ZIP files.

## Image overrides for built-in agents

Use `--template` to replace a built-in agent's image while keeping its
configuration and launch command. The replacement image must support the
same agent. For example, an image used with `claude` must have Claude Code
installed.

To define an environment with its own launch command and sandbox settings,
see Build an agent workload
for the v3 workflow.

### Choose a template

Docker publishes agent images as `docker/sandbox-templates:<variant>`.
Choose the variant that matches your agent. See
Base images
for the available variants.

Variants with a `-docker` suffix, such as `claude-code-docker`, include
Docker Engine for building and running containers inside the sandbox.
Built-in agents use these variants by default when you don't specify a
custom template.

If you don't need Docker inside the sandbox, select a variant without
the suffix. It uses fewer resources and doesn't require privileged mode:

```console
$ sbx run claude --template docker.io/docker/sandbox-templates:claude-code
```

Include the registry domain in `--template` image references. Unlike kit
references, template references don't automatically expand to include
`docker.io`.

### Build a custom template

Building a custom template requires
Docker Desktop.

Extend the Docker-provided image for the agent you plan to run. For example,
this Dockerfile adds Rust and protocol buffer tools to the Claude Code image:

```dockerfile
FROM docker/sandbox-templates:claude-code
USER root
RUN apt-get update && apt-get install -y protobuf-compiler
USER agent
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
```

Install system packages as `root`, then switch back to `agent` before
installing tools in the agent's home directory.

Build the image and push it to a registry. Replace `<NAMESPACE>` with a
Docker Hub namespace you can push to:

```console
$ docker build -t docker.io/<NAMESPACE>/my-template:v1 --push .
```

For registry credentials and loading a locally built image, see
Load a template.

Run the sandbox with your image:

```console
$ sbx run claude --template docker.io/<NAMESPACE>/my-template:v1
```

Because this image extends `claude-code`, use it with `claude`. For an
image based on `codex`, use `codex`. For one based on `shell`, use `shell`
to open Bash without an agent.

If your added tools need network access, allow the domains they use in
the sandbox's network policy, unless you use the `allow-all` policy:

```console
$ sbx policy allow network "*.example.com:443,example.com:443"
```

## Kit kinds

### `kind: mixin`

A mixin layers capabilities onto an existing sandbox. It must not declare a
`sandbox:` block, `extends:`, or `mixins:`. A mixin can declare `requires:` to
pin the base agent it is designed for:

```yaml
schemaVersion: "2"
kind: mixin
name: github-tools
requires:
  agent: claude
```

`requires.agent` takes one base-agent name. It is validated as a kit name and
enforced during composition.

### `kind: sandbox`

A sandbox kit defines a full agent. A root sandbox must declare a `sandbox:`
block. A sandbox that uses `extends:` can inherit the parent image and omit its
own `sandbox:` block:

```yaml
schemaVersion: "2"
kind: sandbox
name: claude-safe
extends: claude
```

`extends:` is sandbox-only. The parent must resolve to a sandbox kit. `mixins:`
is also sandbox-only and accepted by the parser, but runtime composition support
is pending.

## Top-level fields

For the normative grammar, see the
v2 specification.

| Field           | Required | Description                                                                                     |
| --------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `schemaVersion` | Yes      | Spec schema version. Use `"2"` for this grammar.                                                |
| `kind`          | Yes      | `mixin` for kits that extend an agent; `sandbox` for kits that define one.                      |
| `name`          | Yes      | Unique identifier. Lowercase alphanumeric with hyphens, 1 to 64 characters.                     |
| `version`       | No       | Kit version.                                                                                    |
| `displayName`   | No       | Human-readable name.                                                                            |
| `description`   | No       | Short description.                                                                              |
| `sourceURL`     | No       | Source repository or documentation URL.                                                         |
| `licenses`      | No       | SPDX license identifiers.                                                                       |
| `locked`        | No       | Dotted paths child kits may not override.                                                       |
| `security`      | No       | Container security settings. `security.privileged: true` runs the container in privileged mode. |
| `args`          | No       | Arguments supplied when the kit is loaded. Schema v2 only.                                      |

A kit also declares behavior blocks such as `agentInstructions`,
`permissions`, `ports`, `credentials`, `environment`, `setup`, and `volumes`.

## Arguments

A schema v2 kit can declare arguments and reference them anywhere in
`spec.yaml` or under `files/` as `${{ kit.args.<name> }}`. Substitution happens
before the spec is decoded.

```yaml
args:
  version:
    default: latest
    description: Tool version to install
    pattern: '^(latest|[0-9]+\.[0-9]+\.[0-9]+)$'
  channel:
    default: stable
    enum: [stable, beta, nightly]
  target:
    required: true
    description: Build target

environment:
  variables:
    TOOL_VERSION: "${{ kit.args.version }}"
```

Don't use kit arguments for API tokens, passwords, or other secrets. Use
Credentials to provide sensitive values to
a sandbox.

| Field         | Description                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| Argument name | Starts with a letter or underscore and contains only letters, digits, underscores, and hyphens.             |
| `default`     | String to use when the caller supplies no value. Mutually exclusive with `required: true`.                   |
| `required`    | Set to `true` when the caller must supply a value. Mutually exclusive with `default`.                        |
| `description` | Optional help text shown when a required value is missing.                                                   |
| `enum`        | Optional list of accepted values. Mutually exclusive with `pattern`.                                         |
| `pattern`     | Optional Go RE2 regular expression matched against the complete value. Mutually exclusive with `enum`.       |

Each argument must declare either `default`, including an empty-string
default, or `required: true`.

Argument values are strings, but substitution happens before YAML decoding.
Quote a placeholder in a string-valued field so a value such as `1.20` isn't
decoded as a number.

### Pass arguments to kits

Use `--kit-arg name=value` for every kit declaring that argument, or prefix
with the kit's `name` to target one kit. Scoped values override shared values:

```console
$ sbx run ./my-agent --kit ./my-mixin --kit-arg channel=stable \
    --kit-arg my-mixin.channel=beta
```

`--kit-args-file <FILE>` reads `name=value` entries, ignoring blank lines and
`#` comments. Later files override earlier files; `--kit-arg` overrides files.
For repeated CLI keys, the last value wins. Missing required values, unknown
arguments, undeclared placeholders, and invalid values fail before creation.
Pass the same flags to `sbx kit validate` or `sbx kit inspect` when needed.
Argument values can remain in shell history and are stored unencrypted in
argument files.

## Sandbox block

```yaml
sandbox:
  image: <image-ref>
  build:
    context: .
    dockerfile: Dockerfile
    args:
      AGENT_VERSION: "1.0.0"
    target: runtime
    platforms:
      - linux/amd64
  entrypoint: [my-agent, "--flag"]
  command:
    default: ["--task-mode"]
    interactive: []
  resources:
    cpu: 2
    memory: 4g
    gpu: "1"
```

| Field                | Required | Description                                                                                                     |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `sandbox.image`      | When `extends:` is omitted | Docker image reference.                                                                                         |
| `sandbox.build`      | No       | Build configuration. Runtime support is pending, so a kit with `build:` must also set `image:`.                 |
| `sandbox.entrypoint` | No       | Fixed process prefix as a string array. The first element is the agent binary.                                  |
| `sandbox.command`    | No       | Mode-specific argument tail. Use a list shorthand for `default`, or a mapping with `default` and `interactive`. |
| `sandbox.resources`  | No       | Optional CPU, memory, and GPU constraints. Memory uses byte-size strings such as `4096m` or `4g`.               |

The effective command is `entrypoint` plus `command.default` for non-interactive
launches, and `entrypoint` plus `command.interactive` for TTY sessions. If
`interactive` is omitted, it falls back to `default`.

For a kit that uses `extends:`, `sandbox.command` replaces the full inherited
argument tail, including flags after the binary in the parent's
`sandbox.entrypoint`. It doesn't append to that tail. Define every argument the
child needs. For example, a child of `claude` that adds `--settings` must also
include `--dangerously-skip-permissions` to preserve that behavior.

The agent's container image must provide:

- A non-root `agent` user at UID 1000 with passwordless sudo.
- A `/home/agent/` home directory owned by `agent`.
- HTTP proxy environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`) preserved across sudo.
- The agent binary, either baked in or installed with `setup.install`.

Build on top of `docker.io/sbx/shell-docker-image:latest` to get these base
requirements.

## Agent instructions

Declare these fields under `agentInstructions`:

| Field      | Description                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------- |
| `filename` | AI profile filename. Meaningful for `kind: sandbox`; ignored with a warning for `kind: mixin`.      |
| `content`  | Markdown instructions. For a sandbox, inlined into the profile. For a mixin, written to kit memory. |

For mixins, the engine writes `content` to
`<dir-of-AI-file>/kits-memory/<kit-name>.md` and adds a `## Kits` pointer
section to the base AI file. This keeps each mixin's instructions in a separate
file.

The generated profile lives in the parent directory of the mounted workspace
inside the sandbox. It sits outside the mount and doesn't replace an
instruction file in the project. The sandbox kit's inline instructions go
directly into that profile.
