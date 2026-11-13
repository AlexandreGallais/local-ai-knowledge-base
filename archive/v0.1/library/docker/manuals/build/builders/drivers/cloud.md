---
title: "Cloud driver"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/builders/drivers/cloud.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Cloud driver

The Buildx cloud driver connects to managed BuildKit instances in Docker Build
Cloud. Docker provisions and maintains the builder infrastructure, shared build
cache, and native `linux/amd64` and `linux/arm64` nodes.

The cloud driver requires Buildx version 0.37.0 or later and access to Docker
Build Cloud.

## Synopsis

Before connecting Buildx, create a cloud builder on the
Docker Build Cloud Dashboard. Then sign in and
connect to the builder:

```console
$ docker login
$ docker buildx create --driver cloud <ORG>/<BUILDER_NAME>
```

The command adds the cloud builder to your local Buildx configuration. It does
not create a builder in Docker Build Cloud.

For service prerequisites and authentication, see
Docker Build Cloud setup. For build examples,
see Building with Docker Build Cloud.
