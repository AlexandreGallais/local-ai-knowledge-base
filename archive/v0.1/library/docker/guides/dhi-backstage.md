---
title: "Secure a Backstage application with Docker Hardened Images (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/dhi-backstage.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

This guide shows how to secure a Backstage application using Docker Hardened Images (DHI). Backstage is a CNCF open source developer portal used by thousands of organizations to manage their software catalogs, templates, and developer tooling.

By the end of this guide, you'll have a Backstage container image that is distroless, runs as a non-root user by default, and has dramatically fewer CVEs than the standard `node:24-trixie-slim` base image while still supporting the native module compilation that Backstage requires.

## Prerequisites

- Docker Desktop or Docker Engine with BuildKit enabled
- A Docker Hub account authenticated with `docker login` and `docker login dhi.io`
- A Backstage project created with `@backstage/create-app`

## Why Backstage needs customization

The DHI migration examples cover applications where you can swap the base image and everything works. Backstage is different. It uses `better-sqlite3` and other packages that compile native Node.js modules at install time, which means the build stage needs `g++`, `make`, `python3`, and `sqlite-dev` — none of which are in the base `dhi.io/node` image. The runtime image only needs the shared library (`sqlite-libs`) that the compiled native module links against.

This is a common pattern. Any Node.js application that depends on native addons (such as `bcrypt`, `sharp`, `sqlite3`, or `node-canvas`) faces the same challenge. The approach in this guide applies to all of them.

## Step 1: Examine the original Dockerfile

The official Backstage documentation recommends a multi-stage Dockerfile using `node:24-trixie-slim` (Debian). A typical setup looks like this:

```dockerfile
# Stage 1 - Create yarn install skeleton layer
FROM node:24-trixie-slim AS packages
WORKDIR /app
COPY backstage.json package.json yarn.lock ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY packages packages
COPY plugins plugins
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 \
    -exec rm -rf {} \+

# Stage 2 - Install dependencies and build packages
FROM node:24-trixie-slim AS build
ENV PYTHON=/usr/bin/python3
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends python3 g++ build-essential && \
    rm -rf /var/lib/apt/lists/*
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*
USER node
WORKDIR /app
COPY --from=packages --chown=node:node /app .
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn install --immutable
COPY --chown=node:node . .
RUN yarn tsc
RUN yarn --cwd packages/backend build
RUN mkdir packages/backend/dist/skeleton packages/backend/dist/bundle \
    && tar xzf packages/backend/dist/skeleton.tar.gz \
       -C packages/backend/dist/skeleton \
    && tar xzf packages/backend/dist/bundle.tar.gz \
       -C packages/backend/dist/bundle

# Stage 3 - Build the actual backend image
FROM node:24-trixie-slim
ENV PYTHON=/usr/bin/python3
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends python3 g++ build-essential && \
    rm -rf /var/lib/apt/lists/*
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*
USER node
WORKDIR /app
COPY --from=build --chown=node:node /app/.yarn ./.yarn
COPY --from=build --chown=node:node /app/.yarnrc.yml ./
COPY --from=build --chown=node:node /app/backstage.json ./
COPY --from=build --chown=node:node /app/yarn.lock \
     /app/package.json \
     /app/packages/backend/dist/skeleton/ ./
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn workspaces focus --all --production
COPY --from=build --chown=node:node /app/packages/backend/dist/bundle/ ./
CMD ["node", "packages/backend", "--config", "app-config.yaml"]
```

Run this image and inspect what's available inside the container:

```console
docker build -t backstage:init .
docker run -d \
    -e APP_CONFIG_backend_database_client='better-sqlite3' \
    -e APP_CONFIG_backend_database_connection=':memory:' \
    -e APP_CONFIG_auth_providers_guest_dangerouslyAllowOutsideDevelopment='true' \
    -p 7007:7007 \
    -u 1000 \
    --cap-drop=ALL \
    --read-only \
    --tmpfs /tmp \
    backstage:init
```

This works, but the runtime container has a shell, a package manager, and yarn. None of these are needed to run Backstage. Run `docker exec` to see what's accessible inside:

```console
docker exec -it <container-id> sh
$ cat /etc/shells
# /etc/shells: valid login shells
/bin/sh
/usr/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/usr/bin/dash
$ yarn --version
4.12.0
$ dpkg --version
dpkg version 1.22.11 (arm64).
$ whoami
node
$ id
uid=1000(node) gid=1000(node) groups=1000(node)
```

The `node:24-trixie-slim` image ships with three shells (`dash`, `bash`, and `rbash`), a package manager (`dpkg`), and `yarn`. Each of these tools increases the attack surface. An attacker who gains access to this container could use them for lateral movement across your infrastructure.

## Step 2: Switch the build stages to DHI

Replace all three stages with DHI equivalents. DHI Node.js images are available in both
Alpine and Debian variants. This guide uses the Alpine variant (`dhi.io/node:24-alpine3.23`)
because it produces a smaller image. If you need to stay on Debian for compatibility reasons,
use `dhi.io/node:24-bookworm` and keep `apt-get` instead of `apk`.

```dockerfile
# Stage 1: prepare packages
FROM --platform=$BUILDPLATFORM dhi.io/node:24-alpine3.23-dev AS packages
WORKDIR /app
COPY backstage.json package.json yarn.lock ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY packages packages
COPY plugins plugins
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 \
    -exec rm -rf {} \+

# Stage 2: build the application
FROM --platform=$BUILDPLATFORM dhi.io/node:24-alpine3.23-dev AS build
ENV PYTHON=/usr/bin/python3
RUN apk add --no-cache g++ make python3 sqlite-dev && \
    rm -rf /var/lib/apk/lists/*
WORKDIR /app
COPY --from=packages --chown=node:node /app .
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn install --immutable
COPY --chown=node:node . .
RUN yarn tsc
RUN yarn --cwd packages/backend build
RUN mkdir packages/backend/dist/skeleton packages/backend/dist/bundle \
    && tar xzf packages/backend/dist/skeleton.tar.gz \
       -C packages/backend/dist/skeleton \
    && tar xzf packages/backend/dist/bundle.tar.gz \
       -C packages/backend/dist/bundle

# Final Stage: create the runtime image
FROM dhi.io/node:24-alpine3.23-dev
ENV PYTHON=/usr/bin/python3
RUN apk add --no-cache g++ make python3 sqlite-dev && \
    rm -rf /var/lib/apk/lists/*
WORKDIR /app
COPY --from=build --chown=node:node /app/.yarn ./.yarn
COPY --from=build --chown=node:node /app/.yarnrc.yml ./
COPY --from=build --chown=node:node /app/backstage.json ./
COPY --from=build --chown=node:node /app/yarn.lock \
     /app/package.json \
     /app/packages/backend/dist/skeleton/ ./
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn workspaces focus --all --production \
    && rm -rf "$(yarn cache clean)"
COPY --from=build --chown=node:node /app/packages/backend/dist/bundle/ ./
CMD ["node", "packages/backend", "--config", "app-config.yaml"]
```

Build and tag this version:

```console
docker build -t backstage:dhi-dev .
```

> **Note:**
>
> The `-dev` variant includes a shell and package manager, which is why `apk add` works. Backstage requires `python3` and native build tools in the runtime image because `yarn workspaces focus --all --production` recompiles native modules during the production install. This is specific to Backstage's build process — most Node.js applications can use the standard (non-dev) DHI runtime variant without additional packages.

The DHI images come with attestations that the original `node:24-trixie-slim` images don't have. Check what's attached:

```console
docker scout attest list dhi.io/node:24-alpine3.23
```

DHI images ship with 15 attestations including CycloneDX SBOM, SLSA provenance, OpenVEX, Scout health reports, secret scans, virus/malware reports, and an SLSA verification summary.

## Step 3: Add Socket Firewall protection

DHI provides `-sfw` (Socket Firewall) variants for Node.js images. Socket Firewall intercepts `npm` and `yarn` commands during the build to detect and block malicious packages before they execute install scripts.

To enable Socket Firewall, change the `-dev` tags to `-sfw-dev` in all three stages. The SFW version of the Dockerfile:

```dockerfile
# Stage 1: prepare packages
FROM --platform=$BUILDPLATFORM dhi.io/node:24-alpine3.23-sfw-dev AS packages
WORKDIR /app
COPY backstage.json package.json yarn.lock ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY packages packages
COPY plugins plugins
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 \
    -exec rm -rf {} \+

# Stage 2: build the packages
FROM --platform=$BUILDPLATFORM dhi.io/node:24-alpine3.23-sfw-dev AS build-packages
ENV PYTHON=/usr/bin/python3
RUN apk add --no-cache g++ make python3 sqlite-dev && \
    rm -rf /var/lib/apk/lists/*
WORKDIR /app
COPY --from=packages --chown=node:node /app .
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn install --immutable
COPY --chown=node:node . .
RUN yarn tsc
RUN yarn --cwd packages/backend build
RUN mkdir packages/backend/dist/skeleton packages/backend/dist/bundle \
    && tar xzf packages/backend/dist/skeleton.tar.gz \
       -C packages/backend/dist/skeleton \
    && tar xzf packages/backend/dist/bundle.tar.gz \
       -C packages/backend/dist/bundle

# Final Stage: create the runtime image
FROM dhi.io/node:24-alpine3.23-sfw-dev
ENV PYTHON=/usr/bin/python3
RUN apk add --no-cache g++ make python3 sqlite-dev && \
    rm -rf /var/lib/apk/lists/*
WORKDIR /app
COPY --from=build-packages --chown=node:node /app/.yarn ./.yarn
COPY --from=build-packages --chown=node:node /app/.yarnrc.yml ./
COPY --from=build-packages --chown=node:node /app/backstage.json ./
COPY --from=build-packages --chown=node:node /app/yarn.lock \
     /app/package.json \
     /app/packages/backend/dist/skeleton/ ./
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn workspaces focus --all --production \
    && rm -rf "$(yarn cache clean)"
COPY --from=build-packages --chown=node:node /app/packages/backend/dist/bundle/ ./
CMD ["node", "packages/backend", "--config", "app-config.yaml"]
```

Build this version:

```console
docker build -t backstage:dhi-sfw-dev .
```

When you build, you'll see Socket Firewall messages in the build output: `Protected by Socket Firewall` for any `yarn` and `npm` commands executed in the Dockerfile or in the running containers.

> **Tip:**
>
> The `-sfw-dev` variant is larger (1.9 GB versus 1.72 GB) because Socket Firewall adds monitoring tooling. The security benefit during `yarn install` outweighs the size increase.
