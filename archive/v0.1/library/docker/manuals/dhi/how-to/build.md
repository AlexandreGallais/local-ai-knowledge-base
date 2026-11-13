---
title: "Create and build a Docker Hardened Image (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/build.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

Docker Hardened Images (DHI) are built from declarative YAML definition files
instead of traditional Dockerfiles. A single YAML file describes exactly what
goes into an image: packages, users, environment variables, entrypoint, and
metadata. The DHI build system produces a signed image containing only the required
packages, with a Software Bill of Materials (SBOM) and SLSA Build Level 3
provenance.

This page explains how to write a DHI definition file, build images locally, and
use advanced patterns such as build stages, third-party repositories, file
paths, and dev variants.

> **Important:**
>
> The DHI build system pulls base images and build tools from `dhi.io`, so you
> must authenticate to that registry before building a definition file. Use your
> Docker ID credentials (the same username and password you use for Docker Hub)
> when signing in.
>
> Run `docker login dhi.io` to authenticate.

## How DHI builds differ from Dockerfiles

A Dockerfile is a sequence of imperative instructions: `RUN`, `COPY`, `FROM`.
A DHI definition file is a declarative specification. You describe the desired
state of the image, and the build system figures out how to produce it.

Every DHI definition starts with a syntax directive that tells BuildKit which
DHI build frontend to use. The frontend is the component that parses and
processes YAML definitions instead of the default Dockerfile parser:

```yaml
# syntax=dhi.io/build:2-alpine3.23
```

The frontend version corresponds to the base distribution:

| Distribution        | Syntax directive                       |
|---------------------|----------------------------------------|
| Alpine 3.22         | `# syntax=dhi.io/build:2-alpine3.22`  |
| Alpine 3.23         | `# syntax=dhi.io/build:2-alpine3.23`  |
| Alpine 3.24         | `# syntax=dhi.io/build:2-alpine3.24`  |
| Debian 12 (Bookworm)| `# syntax=dhi.io/build:2-debian12`    |
| Debian 13 (Trixie)  | `# syntax=dhi.io/build:2-debian13`    |

The DHI build system reads the YAML, resolves packages from the specified
repositories, assembles the filesystem, creates user accounts, sets metadata,
and produces a signed OCI image.

## Explore the catalog for reference

The DHI catalog repository
is open source under Apache 2.0 and contains every official image definition.
Studying existing definitions is the best way to learn the YAML patterns for
different image types.

The catalog follows this directory structure:

```text
catalog/
├── image/
│   ├── alpine-base/
│   │   ├── alpine-3.23/
│   │   │   ├── 3.23.yaml            # runtime variant
│   │   │   └── 3.23-dev.yaml        # dev variant
│   │   ├── guides.md
│   │   ├── info.yaml
│   │   ├── logo.svg
│   │   └── overview.md
│   ├── nginx/
│   │   ├── alpine-3.22/
│   │   ├── alpine-3.23/
│   │   │   ├── mainline.yaml
│   │   │   ├── mainline-dev.yaml
│   │   │   ├── stable.yaml
│   │   │   └── stable-dev.yaml
│   │   ├── debian-12/
│   │   ├── debian-13/
│   │   ├── bin/
│   │   ├── guides.md
│   │   ├── info.yaml
│   │   ├── logo.svg
│   │   └── overview.md
│   └── redis/
│       ├── debian-13/
│       │   ├── 8.0.yaml              # runtime
│       │   ├── 8.0-dev.yaml          # dev
│       │   ├── 8.0-compat.yaml       # compat runtime
│       │   └── 8.0-compat-dev.yaml   # compat dev
│       ├── guides.md
│       ├── info.yaml
│       ├── logo.svg
│       └── overview.md
├── chart/
└── package/
```

Each image organizes its variants by distribution. Images support multiple
variant types:

- A `runtime` variant is minimal and typically runs as a non-root user.
- A `dev` variant adds a shell, package manager, and development tools.
- A compatibility variant adds common shell utilities such as `bash`,
  `coreutils`, `grep`, and `sed` for use with existing workflows. Compatibility
  images use the `flavor: compat` field alongside a `runtime` or `dev` variant.
- A compatibility-dev variant combines the compatibility packages with dev
  tools.

Some images also support additional flavors such as `sfw` (software framework)
variants. Refer to the catalog for the full list of available variants for each
image.

## Try it: build a catalog image

Before writing your own definition, try building an existing catalog image
directly from GitHub:

```console
$ docker buildx build \
    https://raw.githubusercontent.com/docker-hardened-images/catalog/refs/heads/main/image/alpine-base/alpine-3.23/3.23.yaml \
    --sbom=generator=dhi.io/scout-sbom-indexer:1 \
    --provenance=1 \
    --tag my-alpine-base:3.23 \
    --load
```

This downloads the definition file directly from GitHub and builds it locally.
After the build completes, verify the image:

```console
$ docker images my-alpine-base
```

To modify an image, clone the catalog and edit the YAML files locally:

```console
$ git clone https://github.com/docker-hardened-images/catalog.git
$ cd catalog
```

## YAML schema reference

The following sections describe the fields available in a DHI definition file.

### Required fields

Every definition must include these top-level fields:

| Field       | Description                                                         |
|-------------|---------------------------------------------------------------------|
| `name`      | Human-readable name for the image.                                  |
| `image`     | Full registry path, such as `dhi.io/my-image`.                      |
| `variant`   | Image variant type: `runtime` or `dev`.                             |
| `tags`      | List of image tags.                                                 |
| `platforms`  | Target architectures, such as `linux/amd64` and `linux/arm64`.     |
| `contents`  | Package repositories and packages to install.                       |

### Image metadata

These fields add metadata to the image:

| Field         | Description                                                       |
|---------------|-------------------------------------------------------------------|
| `os-release`  | Defines the `/etc/os-release` contents inside the image.          |
| `annotations` | OCI image annotations such as description and license.            |
| `dates`       | Release date and end-of-life date.                                |
| `vars`        | Build-time variables for templating.                              |
| `flavor`      | Image flavor modifier, such as `compat` for compatibility images.|

### Container configuration

These fields control how the container runs:

| Field         | Description                                                       |
|---------------|-------------------------------------------------------------------|
| `accounts`    | Users, groups, and the `run-as` user.                             |
| `environment` | Environment variables.                                            |
| `entrypoint`  | Container entrypoint command.                                     |
| `cmd`         | Default command arguments.                                        |
| `work-dir`    | Working directory inside the container.                           |
| `volumes`     | Volume mount points.                                              |
| `ports`       | Exposed network ports.                                            |
| `paths`       | Directories, files, and symlinks to create.                       |

### Advanced fields

These fields support more complex build patterns:

| Field                | Description                                                  |
|----------------------|--------------------------------------------------------------|
| `contents.builds`    | Build stages with shell pipelines.                           |
| `contents.keyring`   | Signing keys for third-party package repositories.           |
| `contents.artifacts` | Pre-built OCI artifacts to include.                          |
| `contents.mappings`  | Package URL (purl) mappings for SBOM accuracy.               |
| `contents.files`     | Source files fetched from Git URLs with checksums.            |

## Create a minimal image

Start with the simplest possible definition: an Alpine base image with a
non-root user.

Create a directory for your project and add a file called `base.yaml`:

```yaml
# syntax=dhi.io/build:2-alpine3.23

name: My Base Image
image: my-registry/my-base
variant: runtime
tags:
  - "1.0.0"
  - "1.0"
platforms:
  - linux/amd64
  - linux/arm64

contents:
  repositories:
    - https://dl-cdn.alpinelinux.org/alpine/v3.23/main
    - https://dl-cdn.alpinelinux.org/alpine/v3.23/community
  packages:
    - alpine-baselayout-data
    - busybox
    - ca-certificates-bundle

accounts:
  run-as: nonroot
  users:
    - name: nonroot
      uid: 65532
      gid: 65532
  groups:
    - name: nonroot
      gid: 65532
      members:
        - nonroot

os-release:
  name: Docker Hardened Images (Alpine)
  id: alpine
  version-id: "3.23"
  pretty-name: My Hardened Image
  home-url: https://docker.com/products/hardened-images/
  bug-report-url: https://docker.com/support/

environment:
  SSL_CERT_FILE: /etc/ssl/certs/ca-certificates.crt

annotations:
  org.opencontainers.image.description: A minimal Alpine base image

cmd:
  - /bin/sh
```

In this definition:

- `contents.repositories` uses full URLs to Alpine package mirrors.
- `contents.packages` lists exact Alpine package names.
- The `accounts` block creates a `nonroot` user (UID 65532) and sets it as the
  default user for the container.
- The `os-release` block defines what appears in `/etc/os-release`. Always
  include `bug-report-url` alongside `home-url`.
- The `annotations` block adds OCI metadata visible in registries and Docker
  Scout reports.

Build the image:

```console
$ docker buildx build . -f base.yaml \
    --sbom=generator=dhi.io/scout-sbom-indexer:1 \
    --provenance=1 \
    --tag my-base:latest \
    --load
```
> **Note:**
>
> The `tags` field in the spec file defines the image metadata (variant and
> version labels embedded in the image manifest). The `--tag` flag on the CLI
> sets the OCI image reference used to push or load the image. These serve
> different purposes - the spec file tags describe *what the image is*, while
> the CLI tag determines *where it's stored*.

## Use a Debian base with third-party repositories

For applications that require Debian packages or third-party APT repositories,
use the Debian syntax directive. The following example builds a Redis image
from the official Redis APT repository.

Create a file called `redis.yaml`:

```yaml
# syntax=dhi.io/build:2-debian13

name: Redis 8.0.x
image: my-registry/my-redis
variant: runtime
tags:
  - "8.0"
  - "8.0.5"
platforms:
  - linux/amd64
  - linux/arm64

contents:
  repositories:
    - deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb trixie main
  keyring:
    - https://packages.redis.io/gpg
  packages:
    - '!libelogind0'
    - '!mawk'
    - '!original-awk'
    - base-files
    - libpcre2-8-0
    - libssl3t64
    - libstdc++6
    - libsystemd0
    - redis=6:8.0.5-1rl1~trixie1
    - redis-server=6:8.0.5-1rl1~trixie1
    - redis-tools=6:8.0.5-1rl1~trixie1
    - tini
  mappings:
    redis: pkg:deb/redis/redis@6:8.0.5-1rl1~trixie1?os_name=debian&os_version=13
    redis-server: pkg:deb/redis/redis-server@6:8.0.5-1rl1~trixie1?os_name=debian&os_version=13
    redis-tools: pkg:deb/redis/redis-tools@6:8.0.5-1rl1~trixie1?os_name=debian&os_version=13

accounts:
  run-as: nonroot
  users:
    - name: nonroot
      uid: 65532
      gid: 65532
  groups:
    - name: nonroot
      gid: 65532
      members:
        - nonroot

os-release:
  name: Docker Hardened Images (Debian)
  id: debian
  version-id: "13"
  version-codename: trixie
  pretty-name: Docker Hardened Images/Debian GNU/Linux 13 (trixie)
  home-url: https://docker.com/products/hardened-images/
  bug-report-url: https://docker.com/support/

work-dir: /data

environment:
  REDIS_VERSION: 8.0.5

annotations:
  org.opencontainers.image.description: A minimal Redis image
  org.opencontainers.image.licenses: AGPL-3.0-only

entrypoint:
  - /usr/bin/tini
  - --

cmd:
  - redis-server
  - /etc/redis/redis.conf
  - --include
  - /etc/redis/conf.d/*.conf
```

This example introduces several patterns:

- **Third-party repositories**: The `repositories` field uses the Debian
  `deb [signed-by=...] URL suite component` format for APT sources.
- **Keyring**: The `keyring` field downloads the GPG key used to verify packages
  from the third-party repository.
- **Package exclusions**: Prefix a package name with `!` to explicitly exclude
  it. This prevents unwanted dependencies from being installed. In this case,
  `!libelogind0`, `!mawk`, and `!original-awk` are excluded.
- **Debian version pinning**: Use the full epoch format,
  `redis-server=6:8.0.5-1rl1~trixie1`, to pin exact package versions.
- **SBOM mappings**: The `mappings` field provides Package URL (purl) metadata
  so that Docker Scout can accurately identify the software in the SBOM.
- **Init process**: The `entrypoint` uses `tini` as a lightweight init process
  (PID 1) to handle signal forwarding and zombie process reaping.
- **Config includes**: The `cmd` uses `--include /etc/redis/conf.d/*.conf` so
  that configuration files created in the `paths` section are loaded at startup.
