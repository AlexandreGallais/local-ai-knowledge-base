---
title: "Create and build a Docker Hardened Image (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/build.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Create and build a Docker Hardened Image (part 2 of 2)

## Create paths

Use the `paths` field to create directories, files with inline content, and
symlinks inside the image. The following example extends the Redis definition
with the paths required for operation:

```yaml
paths:
  - type: directory
    path: /var/lib/redis
    uid: 65532
    gid: 65532
    mode: "0755"
  - type: directory
    path: /var/log/redis
    uid: 65532
    gid: 65532
    mode: "0755"
  - type: directory
    path: /run/redis/
    uid: 65532
    gid: 65532
    mode: "0755"
  - type: directory
    path: /data
    uid: 65532
    gid: 65532
    mode: "0755"
  - type: file
    path: /etc/redis/conf.d/docker.conf
    content: |
      daemonize no
      bind 0.0.0.0 -::1
      logfile ""
    uid: 0
    gid: 0
    mode: "0555"
  - type: symlink
    path: /usr/bin/redis-sentinel
    uid: 0
    gid: 0
    source: /usr/bin/redis-check-rdb
```

Three path types are available:

| Type        | Required fields                  | Description                          |
|-------------|----------------------------------|--------------------------------------|
| `directory` | `path`, `uid`, `gid`, `mode`     | Creates an empty directory.          |
| `file`      | `path`, `content`, `uid`, `gid`, `mode` | Creates a file with inline content. |
| `symlink`   | `path`, `source`, `uid`, `gid`   | Creates a symbolic link.             |

The `mode` field uses a string representation of the octal permission bits,
such as `"0755"` for read-write-execute by owner or `"0555"` for read-execute
by all. Note that the `file` type supports inline `content` using a YAML
multi-line string.

## Add build stages

For images that need to run shell commands during the build, such as
configuring files, creating symlinks, or adjusting permissions, use the
`contents.builds` field. Each build stage has its own packages, a pipeline
of named steps, and output mappings.

The following example configures Nginx during the build to run on an
unprivileged port and disable server tokens:

```yaml
# syntax=dhi.io/build:2-alpine3.23

name: Nginx mainline
image: my-registry/my-nginx
variant: runtime
tags:
  - "1.29"
platforms:
  - linux/amd64
  - linux/arm64

contents:
  repositories:
    - https://dl-cdn.alpinelinux.org/alpine/v3.23/main
    - https://dl-cdn.alpinelinux.org/alpine/v3.23/community
    - http://nginx.org/packages/mainline/alpine/v3.23/main
  keyring:
    - https://nginx.org/keys/nginx_signing.rsa.pub
  packages:
    - alpine-baselayout-data
    - busybox
    - musl-utils
    - nginx=1.29.5-r1
  builds:
    - name: nginx
      contents:
        repositories:
          - https://dl-cdn.alpinelinux.org/alpine/v3.23/main
          - https://dl-cdn.alpinelinux.org/alpine/v3.23/community
          - http://nginx.org/packages/mainline/alpine/v3.23/main
        keyring:
          - https://nginx.org/keys/nginx_signing.rsa.pub
        packages:
          - alpine-baselayout-data
          - bash
          - musl-utils
          - nginx=1.29.5-r1
      pipeline:
        - name: install
          runs: |
            set -eux -o pipefail

            ln -sf /dev/stdout /var/log/nginx/access.log
            ln -sf /dev/stderr /var/log/nginx/error.log

            sed -i "s,listen       80;,listen       8080;," /etc/nginx/conf.d/default.conf
            sed -i "/user  nginx;/d" /etc/nginx/nginx.conf
            sed -i "s,pid        /run/nginx.pid;,pid        /var/run/nginx.pid;," /etc/nginx/nginx.conf
            sed -i '<example-value>' /etc/nginx/nginx.conf

            chown -R 65532:65532 /var/cache/nginx
            chmod -R g+w /var/cache/nginx
            chown -R 65532:65532 /etc/nginx
            chmod -R g+w /etc/nginx
            chown -R 65532:65532 /run
            chown -R 65532:65532 /run/lock
            chown -R 65532:65532 /var/run
            chown -R 65532:65532 /var/log/nginx
      outputs:
        - source: /
          target: /
          uid: 0
          gid: 0
          diff: true

accounts:
  run-as: nginx
  users:
    - name: nginx
      uid: 65532
      gid: 65532
  groups:
    - name: nginx
      gid: 65532
      members:
        - nginx
    - name: www-data
      gid: 82

os-release:
  name: Docker Hardened Images (Alpine)
  id: alpine
  version-id: "3.23"
  pretty-name: Docker Hardened Images/Alpine Linux v3.23
  home-url: https://docker.com/products/hardened-images/
  bug-report-url: https://docker.com/support/

environment:
  NGINX_VERSION: 1.29.5-r1

annotations:
  org.opencontainers.image.description: A minimal Nginx image
  org.opencontainers.image.licenses: BSD-2-Clause

entrypoint:
  - nginx

cmd:
  - -g
  - daemon off;

ports:
  - 8080/tcp
```

Key <example-value> in this definition:

| Element     | Description                                                                |
|-------------|----------------------------------------------------------------------------|
| `contents`  | Each build stage has its own `contents` section. Include packages needed only during the build, such as `bash`. |
| `pipeline`  | Contains named steps that run shell commands. Always start scripts with `set -eux -o pipefail`. |
| `outputs`   | Copies results from the build stage into the final image. Setting `diff: true` copies only files that changed, keeping the image minimal. |
| `accounts`  | Nginx uses a dedicated `nginx` user (UID 65532) instead of `nonroot`. The `www-data` group (GID 82) is also created for web server compatibility. |
| `musl-utils` | Required in both the main and build packages for Alpine-based Nginx images. |

## Use OCI artifacts as package sources

Instead of installing packages from Alpine or Debian repositories, you can pull
pre-built binaries from DHI package artifacts. This is how the catalog builds
images like Python and Node.js — the runtime is compiled separately and
published as an OCI artifact, then referenced by digest in the image definition.

Add the `artifacts` field under `contents`:

```yaml
contents:
  repositories:
    - https://dl-cdn.alpinelinux.org/alpine/v3.23/main
    - https://dl-cdn.alpinelinux.org/alpine/v3.23/community
  packages:
    - alpine-baselayout-data
    - bzip2
    - ca-certificates-bundle
    - expat
    - gdbm
    - libffi
    - mpdecimal
    - musl
    - ncurses
    - openssl
    - readline
    - sqlite-libs
    - tzdata
    - zlib
  artifacts:
    - name: dhi.io/pkg-python:3.13.12-alpine3.23@sha256:052b3b915055006a27c42470eed5c65d7ee92d2c3de47ecaedcc6bbd36077b95
      includes:
        - opt/**
      uid: 0
      gid: 0
```

| Field      | Description                                                                  |
|------------|------------------------------------------------------------------------------|
| `name`     | Full OCI reference with digest pin. Always use `@sha256:` for reproducibility. |
| `includes` | Glob patterns for files to extract from the artifact. Paths are resolved from the filesystem root; `opt/**` includes everything under the `/opt` path. |
| `excludes` | Glob patterns for files to skip. Useful for removing headers, docs, or unused binaries. |
| `uid`, `gid` | Ownership for extracted files.                                             |

Available DHI packages are in the
`package/`
directory of the catalog repository.

## Create a dev variant

A dev variant of an image adds a shell, package manager, and development tools.
This is useful for debugging and for use as a build stage in multi-stage
workflows.

To create a dev variant, change the `variant` field and enable root access:

```yaml
# syntax=dhi.io/build:2-alpine3.23

name: Alpine 3.23 Base (dev)
image: my-registry/my-base
variant: dev
tags:
  - "1.0-dev"
platforms:
  - linux/amd64
  - linux/arm64

contents:
  repositories:
    - https://dl-cdn.alpinelinux.org/alpine/v3.23/main
    - https://dl-cdn.alpinelinux.org/alpine/v3.23/community
  packages:
    - alpine-baselayout-data
    - apk-tools
    - busybox
    - ca-certificates-bundle

accounts:
  root: true
  run-as: root
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
  pretty-name: Docker Hardened Images/Alpine Linux v3.23
  home-url: https://docker.com/products/hardened-images/
  bug-report-url: https://docker.com/support/

environment:
  SSL_CERT_FILE: /etc/ssl/certs/ca-certificates.crt

annotations:
  org.opencontainers.image.description: A minimal Alpine base image

cmd:
  - /bin/sh
```

The key <example-value> from a runtime variant:

- `variant: dev` instead of `variant: runtime`.
- `accounts.root: true` enables the root account.
- `run-as: root` sets root as the default user.
- `apk-tools` is added to packages, giving the image a package manager.
- The `nonroot` user is still defined so that applications can switch to an
  unprivileged user at runtime.

For Debian-based dev variants, add `apt` instead of `apk-tools` and include the
`DEBIAN_FRONTEND: noninteractive` environment variable.

## Create a compatibility variant

A compatibility variant includes common shell utilities for use with
scripts and automation tools that expect a standard Linux userland. Compatibility
images use the `flavor` field:

```yaml
variant: runtime
flavor: compat
```

A compatibility variant adds packages such as `bash`, `coreutils`, `findutils`,
`grep`, `hostname`, `openssl`, `procps`, and `sed` alongside the application
packages. A compatibility-dev variant combines both the compatibility packages
and the dev tools:

```yaml
variant: dev
flavor: compat
```

Refer to the Redis compatibility images in the catalog for a complete example of
the compatibility pattern.

## Set ports and volumes

Use the `ports` field to declare which ports the container exposes. Always use
unprivileged ports (higher than 1024) when the container runs as a non-root
user.

```yaml
ports:
  - 8080/tcp
```

Use the `volumes` field to declare volume mount points:

```yaml
volumes:
  - /data
```

## Set annotations

OCI annotations add machine-readable metadata to the image. Use the
`annotations` field:

```yaml
annotations:
  org.opencontainers.image.description: A minimal hardened application image
  org.opencontainers.image.licenses: Apache-2.0
```

These annotations appear in Docker Scout reports and container registry
interfaces.

## Build and verify

### Build the image

Build a single-platform image for local testing:

```console
$ docker buildx build . -f my-image.yaml \
    --sbom=generator=dhi.io/scout-sbom-indexer:1 \
    --provenance=1 \
    --tag my-image:latest \
    --load
```

### Inspect the SBOM

View the generated Software Bill of Materials:

```console
$ docker scout sbom my-image:latest
```

### Scan for vulnerabilities

Check the image against known CVE databases:

```console
$ docker scout cves my-image:latest
```

### Compare with a non-hardened image

Measure the security improvement against an equivalent non-hardened image:

```console
$ docker scout compare my-image:latest \
    --to <non-hardened-equivalent>:<tag> \
    --platform linux/amd64
```

Replace `<non-hardened-equivalent>` with the Docker Official Image or
community image you're comparing against.

### Inspect with Docker Debug

Verify the os-release and entrypoint configuration:

```console
$ docker debug my-image:latest
```

The output shows the detected distribution name from your `os-release`
configuration and runs an entrypoint lint check.

## Push to a registry

Tag and push the image to your container registry:

```console
$ docker tag my-image:latest <your-namespace>/my-image:latest
```

```console
$ docker push <your-namespace>/my-image:latest
```

Replace `<your-namespace>` with your Docker Hub username or organization
namespace.

## Contribute to the catalog

Docker Hardened Images is an open source project. You can contribute new image
definitions or improve existing ones by submitting a pull request to the
catalog repository.

To contribute a new image:

1. Fork the catalog repository.
2. Create a directory under `image/` following the naming convention:
   `image/<image-name>/<distribution>/`.
3. Add your YAML definition files (one per variant).
4. Add an `info.yaml` with display name, description, and categories.
5. Add an `overview.md` describing the image.
6. Add a `logo.svg` for the image icon.
7. Add a `guides.md` with usage documentation.
8. Open a pull request against the `main` branch.

For more details, read the
contributing guide
in the catalog repository.
