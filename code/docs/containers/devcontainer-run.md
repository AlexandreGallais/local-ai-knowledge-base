---
id: containers-devcontainer-run
title: Run commands in a dev container
topic: containers
summary: How the coding assistant runs commands in the dev container, the devcontainer CLI, and features without a registry.
tool: devcontainer
version: "1"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base from CC BY 4.0 and MIT sources
variant: files
---

# Run commands in a dev container

Contents: 1. The way of this base · 2. Other ways · 3. Features · Sources

## 1. The assistant runs inside the container (way of this base)

The coding assistant is installed in the image of the dev container and runs there. The check commands of `AGENTS.md` are then plain terminal commands: no prefix, no container name.

- Run every check command from the project root, inside the container.
- `remoteUser` and `remoteEnv` of `devcontainer.json` apply, because the assistant is started by the dev container tool.
- If a command is missing, it is missing from the image: say so. Never install it.

## 2. Other ways, from the host (devcontainer CLI and docker exec)

| Way | Command | Limit |
| --- | --- | --- |
| Dev Container CLI | `devcontainer up --workspace-folder .` then `devcontainer exec --workspace-folder . <command>` | The CLI must be on the host; `stop` and `down` are not implemented [S2] |
| Container engine | `docker exec <container> <command>` | Does not apply `remoteUser`, `remoteEnv` nor the user environment, which `devcontainer exec` applies [S2] |

- `devcontainer read-configuration --workspace-folder .` prints the configuration of the project: it is the check for `devcontainer.json`. [S2] It first runs `docker ps`: without a container engine that answers, it fails (seen with CLI 0.90.0). Inside the dev container, say that the check needs a rebuild of the container by the user.
- The CLI writes a lock file `.devcontainer-lock.json`; `--frozen-lockfile` enforces it. [S2]
- Tools that read the specification: VS Code, GitHub Codespaces, IntelliJ IDEA (early support), DevPod and the reference CLI. [S3]

## 3. Features, with or without a registry (dev container features)

- A feature is referenced by an OCI registry (`<registry>/<namespace>/<id>[:version]`, for example `ghcr.io/devcontainers/features/go:1`), by an archive address, or by a local folder. [S1]
- A remote feature is downloaded at each build. When the registry cannot be reached, use a `build.dockerfile`, a prebuilt image, or a local feature. [S1]
- A local feature lives in a subfolder of `.devcontainer/` named after its `id`, with `devcontainer-feature.json` and `install.sh`. [S1]

## Sources

- [S1] Dev Containers, "Dev Container Features distribution", <https://containers.dev/implementors/features-distribution/>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] devcontainers, "Dev Container CLI", README, <https://github.com/devcontainers/cli>, read 2026-11-12, MIT, summarized.
- [S3] Dev Containers, "Supporting tools and services", <https://containers.dev/supporting.html>, read 2026-11-12, summarized.
