---
title: "Migrate from Wolfi"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/migration/migrate-from-wolfi.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

This guide helps you migrate from Wolfi-based images to Docker Hardened
Images (DHI). Generally, the migration process is straightforward since Wolfi is
Alpine-like and DHI provides an Alpine-based hardened image.

Like other hardened images, DHI provides comprehensive
attestations including SBOMs and provenance,
allowing you to verify image signatures and
scan for vulnerabilities to ensure the security
and integrity of your images.

## Migration steps

The following example demonstrates how to migrate a Dockerfile from a
Wolfi-based image to an Alpine-based Docker Hardened Image.

### Step 1: Update the base image in your Dockerfile

Update the base image in your application's Dockerfile to a hardened image. This
is typically going to be an image tagged as `dev` or `sdk` because it has the tools
needed to install packages and dependencies.

The following example diff snippet from a Dockerfile shows the old base image
replaced by the new hardened image.

> **Note:**
>
> You must authenticate to `dhi.io` before you can pull Docker Hardened Images.
> Use your Docker ID credentials (the same username and password you use for
> Docker Hub). If you don't have a Docker account, create
> one for free.
>
> Run `docker login dhi.io` to authenticate.

```diff
- ## Original base image
- FROM cgr.dev/chainguard/go:latest-dev

+ ## Updated to use hardened base image
+ FROM dhi.io/golang:1.25-alpine3.24-dev
```

Note that DHI does not have a `latest` tag in order to promote best practices
around image versioning. Ensure that you specify the appropriate version tag for your image. To find the right tag, explore the available tags in the DHI Catalog.

### Step 2: Update the runtime image in your Dockerfile

> **Note:**
>
> Multi-stage builds are recommended to keep your final image minimal and
> secure. Single-stage builds are supported, but they include the full `dev` image
> and therefore result in a larger image with a broader attack surface.

To ensure that your final image is as minimal as possible, you should use a
multi-stage build. All stages in your
Dockerfile should use a hardened image. While intermediary stages will typically
use images tagged as `dev` or `sdk`, your final runtime stage should use a runtime image.

Utilize the build stage to compile your application and copy the resulting
artifacts to the final runtime stage. This ensures that your final image is
minimal and secure.

The following example shows a multi-stage Dockerfile with a build stage and runtime stage:

```dockerfile
# Build stage
FROM dhi.io/golang:1.25-alpine3.24-dev AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

# Runtime stage
FROM dhi.io/golang:1.25-alpine3.24
WORKDIR /app
COPY --from=builder /app/myapp .
ENTRYPOINT ["/app/myapp"]
```

After updating your Dockerfile, build and test your application. If you encounter
issues, see the Troubleshoot guide for common
problems and solutions.

## Language-specific examples

See the examples section for language-specific migration examples:

- Go
- Python
- Node.js
