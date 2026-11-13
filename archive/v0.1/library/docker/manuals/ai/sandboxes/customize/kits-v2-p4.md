---
title: "Kits v2 (part 4 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/customize/kits-v2.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Kits v2 (part 4 of 4)

## Schema versions

Schema v2 is supported starting with Docker Sandboxes version 0.36. Use
`schemaVersion: "2"` for the syntax on this page. Version `"1"` also remains
accepted. V3 is a separate format for environments built entirely
with v3 workloads and mixins. V3 kits can't compose with v1 or v2 kits.
See Kits v3 for that workflow.

When migrating to `schemaVersion: "2"`, replace v1 fields with their v2
equivalents:

| v1                                          | v2                                       |
| ------------------------------------------- | ---------------------------------------- |
| `credentials.sources.<id>`                  | `credentials:` list entry with `service` |
| `network.allowedDomains` / `deniedDomains`  | `permissions.network.allow` / `deny`     |
| `network.serviceDomains` / `serviceAuth`    | `credentials[].apiKey.inject`            |
| `network.publishedPorts` / `publishedPorts` | top-level `ports`                        |
| standalone `oauth:` block                   | `credentials[].oauth`                    |
| `oauth.skipIfEnv`                           | Accepted but ignored                     |
| `environment.proxyManaged`                  | `credentials[].apiKey.proxyManaged`      |
| `memory` / `agentContext`                   | `agentInstructions.content`              |
| `kind: agent` / `agent:` block              | `kind: sandbox` / `sandbox:` block       |
| `sandbox.aiFilename`                        | `agentInstructions.filename`             |
| `sandbox.entrypoint.run`                    | `sandbox.entrypoint`                     |
| `sandbox.entrypoint.args`                   | `sandbox.command.default`                |
| `sandbox.entrypoint.ttyArgs`                | `sandbox.command.interactive`            |
| `tmpfs:`                                    | `volumes:` entries with `type: tmpfs`    |
| `volumes:` (mapping form)                   | `volumes:` sequence (`- path: `)   |
| `commands:` / `commands.initFiles`          | `setup:` / `setup.files`                 |
| `settings:` / `kitDir` / `persistence`      | Removed                                  |

Credential <example-value> also moved out of the kit in v2: a kit declares which
credentials it needs and how to inject them, but where each value comes from is
controlled by the user through
credential bindings.

> **Note:**
> `mixins` and `sandbox.build` are accepted by the parser, but runtime support
> is pending. A kit that sets `sandbox.build` must also set `sandbox.image`.

## Move an environment to v3

Select a v3 workload,
convert or replace its mixins, and create a separate sandbox. Every selected
kit must use v3. Running an existing sandbox keeps its recorded kit configuration.

For an environment file, see Add v3 kits.
Keep its `schemaVersion: "1"`: the environment file version is independent of
kit descriptor versions.

Changing `schemaVersion` alone doesn't convert a kit. Separate reusable image
content from sandbox initialization, and declare runtime capabilities:

| V2 surface | V3 equivalent |
| --- | --- |
| `kind: sandbox` | `kind: workload` with a Dockerfile recipe |
| `sandbox.image` | Dockerfile `FROM` |
| `sandbox.entrypoint`, `sandbox.command`, `environment.variables` | Dockerfile `ENTRYPOINT`, `CMD`, and `ENV` |
| `extends` | A mixin for composition, or a derived workload image with its own descriptor |
| `setup.install` | Dockerfile `RUN` for reusable content; lifecycle `install` for sandbox initialization |
| `setup.startup` and `setup.files` | Lifecycle capability `startup` and `files` |
| `setup.files[].onlyIfMissing: true` | Lifecycle `files[].overwrite: false` |
| Automatic `files/home/` and `files/workspace/` injection | Dockerfile `COPY`, with lifecycle hooks for destinations provided by runtime mounts |
| `permissions.network` and `credentials` | Network-policy and credential <example-value> |
| `agentInstructions` | Agent-context capability |
| `${WORKDIR}` in `setup.files[].content` | `${{ kit.env.WORKSPACE_DIR }}` in lifecycle `files` content |

Follow the v3 authoring guidance
when converting runtime setup and capability declarations.
Use a kit set to combine
published v3 components with your settings. To rebuild the agent environment
from a base image, follow Build an agent workload.
