---
id: containers-container-problems
title: Container problems and their causes
topic: containers
summary: Explain a container that does not start, cannot be reached, cannot pull or cannot write, with Docker or Podman.
tool: docker, podman
version: "6"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT, written for this base from Apache 2.0 and CC BY 4.0 sources
variant: files
---

# Container problems and their causes

Contents: 1. How to explain a problem · 2. Symptoms and causes · Sources

## 1. How to explain a container problem (method)

1. Ask for the exact command and its full output. Never guess from a summary.
2. Read the image name, the ports, the user and the engine (Docker or Podman) in the command or the file.
3. Match the output with the table below. Give the cause, then the smallest fix.
4. Say what you could not check: the image, the host and the network are not in the output.

## 2. Symptoms and causes (Docker and Podman)

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| A .NET app answers nothing on port 80 | Since .NET 8 the app listens on 8080 [S3] | Publish `-p <host port>:8080` |
| `permission denied` on bind to port 80 or 443 | Rootless container: ports under 1024 are refused [S1] | Listen on 8080 |
| Podman refuses an image name without a terminal | Short image name in `enforcing` mode [S2] | Write the full name with its registry |
| `failed to connect to the docker API` | No Docker daemon answers | Start the daemon, or skip the checks that need it |
| `MSB4018` in `CreateNewImage` | `dotnet publish /t:PublishContainer` without a daemon [S4] | Publish to an archive with `ContainerArchiveOutputPath` |
| `docker exec <container> sh` fails: no shell found | Chiseled .NET image: no shell [S3] | Use a full image to debug |
| Container cannot reach a service on the host | Rootless network "pasta": the host main address is not reachable [S1] | Use a service name or a published port, never the host address |
| The app fails when it writes a file | Root filesystem read-only, or a non-root user without rights on the folder | Write to a mounted volume or to `/tmp` |
| Exit code 137 | The process was killed, often for memory (`OOMKilled` in Kubernetes) | Raise the memory limit or find the leak |

## Sources

- [S1] Podman, "podman-rootless(7)", package 6.2.0, <https://man.archlinux.org/man/podman-rootless.7.en>, read 2026-11-12, Apache 2.0, summarized.
- [S2] Red Hat, "Working with container registries", RHEL 10, <https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/building_running_and_managing_containers/working-with-container-registries>, read 2026-11-12, summarized.
- [S3] Microsoft, ".NET containers overview" and "What's new in containers for .NET 8", <https://learn.microsoft.com/dotnet/core/docker/introduction>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Microsoft, "Containerize a .NET app with dotnet publish", <https://learn.microsoft.com/dotnet/core/containers/sdk-publish>, read 2026-11-12, CC BY 4.0, summarized.
