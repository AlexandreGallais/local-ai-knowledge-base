---
id: containers-dotnet-images
title: .NET container images
topic: containers
summary: Image names, tags, non-root user, port 8080 and image publishing without a Dockerfile for .NET 10.
tool: dotnet
version: "10"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# .NET container images

Contents: 1. Images · 2. Port and user · 3. Dockerfile · 4. Without a Dockerfile · 5. Old patterns · Sources

## 1. Images and base system (.NET images)

- Build with `mcr.microsoft.com/dotnet/sdk:<version>`. Run an ASP.NET Core app with `mcr.microsoft.com/dotnet/aspnet:<version>`. [S1] [S4]
- From .NET 10, the default tags are on Ubuntu 24.04. There are no Debian images for .NET 10. [S5]
- "Chiseled" images are a reduced Ubuntu: no shell, no package manager, a non-root user already active, about 100 MB smaller. Without the `extra` variant they have no culture data. [S1] [S3]
- A chiseled image has no shell: `docker exec <container> sh` fails. Debug with a full image, or read logs from outside.

## 2. Port and user (.NET images since .NET 8)

| Point | Value | Source |
| --- | --- | --- |
| Port | 8080 by default since .NET 8 (80 before) | [S1] [S3] |
| Variable for the port | `ASPNETCORE_HTTP_PORTS` | [S3] |
| User | Non-root account `app`, UID 1654, in every image since .NET 8 | [S1] [S3] |
| Variable for the user | `APP_UID` | [S2] [S3] |

- Going back to port 80 forbids the non-root user: ports under 1024 need root. Keep 8080. [S3]
- Kubernetes checks `runAsNonRoot` with a UID, not a name: write `USER $APP_UID`, not `USER app`. [S3]

## 3. A .NET Dockerfile (.NET image build)

```dockerfile
# syntax=docker/dockerfile:1
# check=error=true
ARG DOTNET_VERSION=10.0
FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION} AS build
WORKDIR /source
COPY Api/Api.csproj Api/
RUN dotnet restore Api/Api.csproj
COPY Api/ Api/
RUN dotnet publish Api/Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION} AS final
WORKDIR /app
COPY --from=build /app ./
USER $APP_UID
EXPOSE 8080
ENTRYPOINT ["dotnet", "Api.dll"]
```

Read the .NET version of the project in `TargetFramework` (`net10.0` gives `10.0`) and set `DOTNET_VERSION`. The full template is `templates/containers/dotnet.Dockerfile`. [S4]

## 4. Publish an image without a Dockerfile (dotnet publish PublishContainer)

```sh
dotnet publish --os linux --arch x64 /t:PublishContainer -p ContainerImageTag=1.4.0
dotnet publish --os linux --arch x64 /t:PublishContainer -p ContainerArchiveOutputPath=./images/api.tar.gz
```

- The first form needs a container daemon that answers; without one it fails with MSB4018 (task `CreateNewImage`). The second writes an archive and needs no daemon. Load it with `docker load -i` or `podman load -i`. [S2]
- Push to a registry with `-p ContainerRegistry=<registry>`. [S2]
- The default tag is `latest`. Always set `ContainerImageTag` to a version. [S2]
- Other properties: `ContainerRepository` (default: assembly name), `ContainerFamily`, `ContainerBaseImage`, `ContainerUser`, `ContainerPort`, `ContainerEnvironmentVariable`. `ContainerEntrypoint` is deprecated since .NET 8: use `ContainerAppCommand`. [S2]

## 5. Old patterns (.NET images before .NET 8 and 10)

| Old | Now | Since |
| --- | --- | --- |
| `EXPOSE 80`, `ASPNETCORE_URLS` set to port 80 | `EXPOSE 8080`, `ASPNETCORE_HTTP_PORTS` | .NET 8 |
| Image runs as root | `USER $APP_UID` | .NET 8 |
| Tags `-bookworm-slim` (Debian) | Default tags (Ubuntu 24.04) | .NET 10 |
| `ContainerEntrypoint` | `ContainerAppCommand` | .NET 8 |

## Sources

- [S1] Microsoft, ".NET containers overview", <https://learn.microsoft.com/dotnet/core/docker/introduction>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Microsoft, "Containerize a .NET app with dotnet publish" and "Containerize a .NET app reference", <https://learn.microsoft.com/dotnet/core/containers/sdk-publish>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "What's new in containers for .NET 8", <https://learn.microsoft.com/dotnet/core/whats-new/dotnet-8/containers>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Microsoft, "Building .NET Docker images", <https://learn.microsoft.com/dotnet/core/docker/building-net-docker-images>, read 2026-11-12, CC BY 4.0, adapted.
- [S5] Microsoft, "Default .NET images use Ubuntu", <https://learn.microsoft.com/en-us/dotnet/core/compatibility/containers/10.0/default-images-use-ubuntu>, read 2026-11-12, CC BY 4.0, summarized.
