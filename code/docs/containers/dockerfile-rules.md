---
id: containers-dockerfile-rules
title: Dockerfile rules
topic: containers
summary: Rules with wrong and right examples for a Dockerfile that passes hadolint and the Docker build checks.
tool: docker
version: "1.8"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base from Apache 2.0 and GPL-3.0 sources, rules described in own words
variant: files
---

# Dockerfile rules

Contents: 1. Build and run stages · 2. Base image and user · 3. Instructions · 4. Packages and shell · 5. Context and secrets · Sources

The same rules apply to a `Containerfile` (the name Podman also uses). Check every rule with the tools of `docs/containers/dockerfile-checks.md`.

## 1. Build in one stage, run in another (Dockerfile stages)

Build with the SDK image in a first stage. Copy only the output into a small runtime image. [S1]

Copy the dependency files first and restore them, then copy the rest of the source. The restore layer stays in the cache while the dependency files do not change. [S1]

Wrong:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10.0
COPY . /src
RUN dotnet publish /src/Api/Api.csproj -c Release -o /app
CMD dotnet /app/Api.dll
```

Right:

```dockerfile
# syntax=docker/dockerfile:1
# check=error=true
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source
COPY Api/Api.csproj Api/
RUN dotnet restore Api/Api.csproj
COPY Api/ Api/
RUN dotnet publish Api/Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app ./
USER $APP_UID
EXPOSE 8080
ENTRYPOINT ["dotnet", "Api.dll"]
```

`# check=error=true` turns every warning of the Docker build checks into an error. [S2]

## 2. Base image tag and non-root user (Dockerfile FROM and USER)

| Rule | Wrong | Right | Check |
| --- | --- | --- | --- |
| Pin the base image | `FROM ubuntu`, `FROM node:latest` | `FROM node:24` ; a tag and a `@sha256:` digest for a frozen image | hadolint DL3006, DL3007 |
| Run as a non-root user | No `USER`, or `USER root` last | `USER` with a non-root account, by UID when Kubernetes checks `runAsNonRoot` | hadolint DL3002 |
| Write the full image name for Podman | `FROM nginx` | `FROM docker.io/library/nginx:<version>` | Podman refuses a short name without a terminal |

Sources: [S1] [S3]. With Podman, a short name resolves through a list of registries; in `enforcing` mode it fails without a terminal. [S1]

## 3. Instructions (Dockerfile WORKDIR, COPY, CMD and ENTRYPOINT)

| Rule | Wrong | Right | Check |
| --- | --- | --- | --- |
| Exec form for the start command | `CMD dotnet App.dll` | `ENTRYPOINT ["dotnet", "App.dll"]` | JSONArgsRecommended, DL3025 |
| Absolute working folder | `WORKDIR app` | `WORKDIR /app` | WorkdirRelativePath, DL3000 |
| `COPY` rather than `ADD` | `ADD src/ /app` | `COPY src/ /app` | DL3020 |

The exec form passes signals to the process: the container stops cleanly. The shell form starts `/bin/sh` first. [S1] [S2] [S3]

## 4. Packages and shell (Dockerfile RUN)

- Run `apt-get update` and `apt-get install` in the same `RUN`, with `--no-install-recommends`, and remove the package lists in the same `RUN` (DL3015, DL3009). [S1] [S3]
- Put `set -o pipefail &&` before a command with a pipe; otherwise the step hides a failure (DL4006). [S3]
- Version pinning of system packages (DL3008) stays a warning in `.hadolint.yaml`. Never invent a package version number: write the version only when you know it.

Wrong:

```dockerfile
RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://example.org/tool.tar.gz | tar -xz
```

Right:

```dockerfile
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
```

## 5. Build context and secrets (Dockerfile .dockerignore, ARG and ENV)

- Keep a `.dockerignore` next to the Dockerfile: `.git`, `**/bin`, `**/obj`, `**/node_modules`, `**/dist`, `.angular`. A file that is ignored but copied triggers the check `CopyIgnoredFile`. [S1] [S2]
- Never put a password, a token or a key in `ARG` or `ENV`: it stays in the image history (SecretsUsedInArgOrEnv). [S2]
- Use `--pull` to refresh the base image and `--no-cache` to rebuild every layer. [S1]

## Sources

- [S1] Docker, "Building best practices", <https://docs.docker.com/build/building/best-practices/>, read 2026-11-12, Apache 2.0, summarized; Red Hat, "Working with container registries", RHEL 10, for short names.
- [S2] Docker, "Build checks" and "Checking your build configuration", <https://docs.docker.com/reference/build-checks/>, read 2026-11-12, Apache 2.0, summarized.
- [S3] hadolint, README, <https://github.com/hadolint/hadolint>, read 2026-11-12, GPL-3.0, rules described in own words.
