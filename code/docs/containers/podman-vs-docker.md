---
id: containers-podman-vs-docker
title: Podman compared with Docker
topic: containers
summary: What changes with Podman, with full image names, rootless ports, pasta network, compose provider and registry mirrors.
tool: podman
version: "6"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base from Apache 2.0 sources
variant: files
---

# Podman compared with Docker

Contents: 1. What differs · 2. Same commands · 3. Registries and mirrors · 4. Pitfalls · Sources

## 1. What differs with Podman (defaults that make a command fail)

| Point | Podman behavior | What to write |
| --- | --- | --- |
| Image names | A short name resolves through a list of registries. In `enforcing` mode, without a terminal, the command fails. | Always the full name: `docker.io/library/nginx:<version>`, never `nginx`. [S3] |
| Rootless ports | Ports under 1024 are refused (kernel setting `net.ipv4.ip_unprivileged_port_start`). | Publish a high port: `-p 8080:8080`. [S1] |
| Rootless limits | 65,536 user ids only; no device creation; home folder on NFS not handled. | Do not assume root in the container. [S1] |
| Rootless network | "pasta" by default since Podman 5.0: the container does not reach the main address of the host; the default port forwarder hides the client address. | Never write the host address in a configuration. [S1] |
| Compose | `podman compose` passes its arguments to an external provider: `docker-compose` if installed, else `podman-compose`. Set it with `compose_providers` or `PODMAN_COMPOSE_PROVIDER`. | Install a provider next to Podman. [S2] |
| Build file | Podman also reads a file named `Containerfile`. | Treat both names the same. |

## 2. Same commands (Docker and Podman equivalents)

| Need | Docker | Podman |
| --- | --- | --- |
| Run a tool in a container | `docker run --rm -i hadolint/hadolint < Dockerfile` | `podman run --rm -i docker.io/hadolint/hadolint < Dockerfile` |
| Load an image archive | `docker load -i image.tar.gz` | `podman load -i image.tar.gz` |
| Publish a .NET image with the SDK | The daemon is found | The same, no extra setting |

Only these three lines were checked in primary sources. For other commands, run `podman <command> --help` before you write an option. [S1] [S2]

## 3. Registries and mirrors (Podman registries.conf)

- Registries and mirrors are set in `registries.conf`: one `[[registry]]` entry, then its `[[registry.mirror]]` entries, tried in order. `insecure=true` allows a local registry without TLS. [S3]
- Example:

```toml
[[registry]]
prefix = "docker.io"
location = "docker.io"

[[registry.mirror]]
location = "registry.example.internal:5000"
insecure = true
```

Write the real mirror of the team in the `AGENTS.md` of the project, not in this base.

## 4. Pitfalls of a model with Podman

- A short image name in a `podman` command, a Quadlet file or a `FROM`.
- Port 80 or 443 published from a rootless container.
- `systemctl enable` for a Quadlet service (see `docs/containers/podman-quadlet-kube.md`).
- `podman compose` or `docker build --check` used as if nothing else were needed.
- A success of `podman kube play` taken as proof that a manifest is right for a cluster.

## Sources

- [S1] Podman, "podman-rootless(7)", package 6.2.0, <https://man.archlinux.org/man/podman-rootless.7.en>, read 2026-11-12, Apache 2.0, summarized.
- [S2] Podman, "podman-compose(1)", <https://docs.podman.io/en/stable/markdown/podman-compose.1.html>, read 2026-11-12, Apache 2.0, summarized.
- [S3] Red Hat, "Working with container registries", RHEL 10, <https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/building_running_and_managing_containers/working-with-container-registries>, read 2026-11-12, summarized.
