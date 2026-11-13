---
title: "Multi-platform builds (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/building/multi-platform.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Multi-platform builds (part 2 of 2)

## Examples

Here are some examples of multi-platform builds:

- Simple multi-platform build using emulation
- Multi-platform Neovim build using Docker Build Cloud
- Cross-compiling a Go application

### Simple multi-platform build using emulation

This example demonstrates how to build a simple multi-platform image using
emulation with QEMU. The image contains a single file that prints the
architecture of the container.

Prerequisites:

- Docker Desktop, or Docker Engine with QEMU installed

Steps:

1. Create an empty directory and navigate to it:

   ```console
   $ mkdir multi-platform
   $ cd multi-platform
   ```

2. Create a simple Dockerfile that prints the architecture of the container:

   ```dockerfile
   # syntax=docker/dockerfile:1
   FROM alpine
   RUN uname -m > /arch
   ```

3. Build the image for `linux/amd64` and `linux/arm64`:

   ```console
   $ docker build --platform linux/amd64,linux/arm64 -t multi-platform .
   ```

4. Run the image and print the architecture:

   ```console
   $ docker run --rm multi-platform cat /arch
   ```

   - If you're running on an x86-64 machine, you should see `x86_64`.
   - If you're running on an ARM machine, you should see `aarch64`.

### Multi-platform Neovim build using Docker Build Cloud

This example demonstrates how run a multi-platform build using Docker Build
Cloud to compile and export Neovim binaries
for the `linux/amd64` and `linux/arm64` platforms.

Docker Build Cloud provides managed multi-node builders that support native
multi-platform builds without the need for emulation, making it much faster to
do CPU-intensive tasks like compilation.

Prerequisites:

- You've signed up for Docker Build Cloud and created a builder

Steps:

1. Create an empty directory and navigate to it:

   ```console
   $ mkdir docker-build-neovim
   $ cd docker-build-neovim
   ```

2. Create a Dockerfile that builds Neovim.

   ```dockerfile
   # syntax=docker/dockerfile:1
   FROM debian:bookworm AS build
   WORKDIR /work
   RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
       --mount=type=cache,target=/var/lib/apt,sharing=locked \
       apt-get update && apt-get install -y \
       build-essential \
       cmake \
       curl \
       gettext \
       ninja-build \
       unzip
   ADD https://github.com/neovim/neovim.git#stable .
   RUN make CMAKE_BUILD_TYPE=RelWithDebInfo

   FROM scratch
   COPY --from=build /work/build/bin/nvim /
   ```

3. Build the image for `linux/amd64` and `linux/arm64` using Docker Build Cloud:

   ```console
   $ docker build \
      --builder <cloud-builder> \
      --platform linux/amd64,linux/arm64 \
      --output ./bin .
   ```

   This command builds the image using the cloud builder and exports the
   binaries to the `bin` directory.

4. Verify that the binaries are built for both platforms. You should see the
   `nvim` binary for both `linux/amd64` and `linux/arm64`.

   ```console
   $ tree ./bin
   ./bin
   ├── linux_amd64
   │   └── nvim
   └── linux_arm64
       └── nvim

   3 directories, 2 files
   ```

### Cross-compiling a Go application

This example demonstrates how to cross-compile a Go application for multiple
platforms using multi-stage builds. The application is a simple HTTP server
that listens on port 8080 and returns the architecture of the container.
This example uses Go, but the same principles apply to other programming
languages that support cross-compilation.

Cross-compilation with Docker builds works by leveraging a series of
pre-defined (in BuildKit) build arguments that give you information about
platforms of the builder and the build targets. You can use these pre-defined
arguments to pass the platform information to the compiler.

In Go, you can use the `GOOS` and `GOARCH` environment variables to specify the
target platform to build for.

Prerequisites:

- Docker Desktop or Docker Engine

Steps:

1. Create an empty directory and navigate to it:

   ```console
   $ mkdir go-server
   $ cd go-server
   ```

2. Create a base Dockerfile that builds the Go application:

   ```dockerfile
   # syntax=docker/dockerfile:1
   FROM golang:alpine AS build
   WORKDIR /app
   ADD https://github.com/dvdksn/buildme.git#eb6279e0ad8a10003718656c6867539bd9426ad8 .
   RUN go build -o server .

   FROM alpine
   COPY --from=build /app/server /server
   ENTRYPOINT ["/server"]
   ```

   This Dockerfile can't build multi-platform with cross-compilation yet. If
   you were to try to build this Dockerfile with `docker build`, the builder
   would attempt to use emulation to build the image for the specified
   platforms.

3. To add cross-compilation support, update the Dockerfile to use the
   pre-defined `BUILDPLATFORM`, `TARGETOS` and `TARGETARCH` build arguments.
   - Pin the `golang` image to the platform of the builder using the
     `--platform=$BUILDPLATFORM` option.
   - Add `ARG` instructions for the Go compilation stages to make the
     `TARGETOS` and `TARGETARCH` build arguments available to the commands in
     this stage.
   - Set the `GOOS` and `GOARCH` environment variables to the values of
     `TARGETOS` and `TARGETARCH`. The Go compiler uses these variables to do
     cross-compilation.

   **Updated Dockerfile**

   ```dockerfile
   # syntax=docker/dockerfile:1
   FROM --platform=$BUILDPLATFORM golang:alpine AS build
   ARG TARGETOS
   ARG TARGETARCH
   WORKDIR /app
   ADD https://github.com/dvdksn/buildme.git#eb6279e0ad8a10003718656c6867539bd9426ad8 .
   RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o server .

   FROM alpine
   COPY --from=build /app/server /server
   ENTRYPOINT ["/server"]
   ```

   **Old Dockerfile**

   ```dockerfile
   # syntax=docker/dockerfile:1
   FROM golang:alpine AS build
   WORKDIR /app
   ADD https://github.com/dvdksn/buildme.git#eb6279e0ad8a10003718656c6867539bd9426ad8 .
   RUN go build -o server .

   FROM alpine
   COPY --from=build /app/server /server
   ENTRYPOINT ["/server"]
   ```

   **Diff**

   ```diff
   # syntax=docker/dockerfile:1
   -FROM golang:alpine AS build
   +FROM --platform=$BUILDPLATFORM golang:alpine AS build
   +ARG TARGETOS
   +ARG TARGETARCH
   WORKDIR /app
   ADD https://github.com/dvdksn/buildme.git#eb6279e0ad8a10003718656c6867539bd9426ad8 .
   -RUN go build -o server .
   +RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o server .

   FROM alpine
   COPY --from=build /app/server /server
   ENTRYPOINT ["/server"]
   ```

4. Build the image for `linux/amd64` and `linux/arm64`:

   ```console
   $ docker build --platform linux/amd64,linux/arm64 -t go-server .
   ```

This example has shown how to cross-compile a Go application for multiple
platforms with Docker builds. The specific steps on how to do cross-compilation
may vary depending on the programming language you're using. Consult the
documentation for your programming language to learn more about cross-compiling
for different platforms.

> **Tip:**
> You may also want to consider checking out
> xx - Dockerfile cross-compilation helpers.
> `xx` is a Docker image containing utility scripts that make cross-compiling with Docker builds easier.
