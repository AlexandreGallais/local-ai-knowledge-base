---
title: "Build variables (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/building/variables.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

In Docker Build, build arguments (`ARG`) and environment variables (`ENV`)
both serve as a means to pass information into the build process.
You can use them to parameterize the build, allowing for more flexible and configurable builds.

> **Warning:**
>
> Build arguments and environment variables are inappropriate for passing secrets
> to your build, because they're exposed in the final image. Instead, use
> secret mounts or SSH mounts, which expose secrets to your builds securely.
>
> See Build secrets for more information.

## Similarities and differences

Build arguments and environment variables are similar.
They're both declared in the Dockerfile and can be set using flags for the `docker build` command.
Both can be used to parameterize the build.
But they each serve a distinct purpose.

### Build arguments

Build arguments are variables for the Dockerfile itself.
Use them to parameterize values of Dockerfile instructions.
For example, you might use a build argument to specify the version of a dependency to install.

Build arguments have no effect on the build unless it's used in an instruction.
They're not accessible or present in containers instantiated from the image
unless explicitly passed through from the Dockerfile into the image filesystem or configuration.
They may persist in the image metadata, as provenance attestations and in the image history,
which is why they're not suitable for holding secrets.

They make Dockerfiles more flexible, and easier to maintain.

For an example on how you can use build arguments,
see `ARG` usage example.

### Environment variables

Environment variables are passed through to the build execution environment,
and persist in containers instantiated from the image.

Environment variables are primarily used to:

- Configure the execution environment for builds
- Set default environment variables for containers

Environment variables, if set, can directly influence the execution of your build,
and the behavior or configuration of the application.

You can't override or set an environment variable at build-time.
Values for environment variables must be declared in the Dockerfile.
You can combine environment variables and build arguments to allow
environment variables to be configured at build-time.

For an example on how to use environment variables for configuring builds,
see `ENV` usage example.

## `ARG` usage example

Build arguments are commonly used to specify versions of components,
such as image variants or package versions, used in a build.

Specifying versions as build arguments lets you build with different versions
without having to manually update the Dockerfile.
It also makes it easier to maintain the Dockerfile,
since it lets you declare versions at the top of the file.

Build arguments can also be a way to reuse a value in multiple places.
For example, if you use multiple flavors of `alpine` in your build,
you can ensure you're using the same version of `alpine` everywhere:

- `golang:1.22-alpine${ALPINE_VERSION}`
- `python:3.12-alpine${ALPINE_VERSION}`
- `nginx:1-alpine${ALPINE_VERSION}`

The following example defines the version of `node` and `alpine` using build arguments.

```dockerfile
# syntax=docker/dockerfile:1

ARG NODE_VERSION="{{% param example_node_version %}}"
ARG ALPINE_VERSION="{{% param example_alpine_version %}}"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
WORKDIR /src

FROM base AS build
COPY package*.json ./
RUN npm ci
RUN npm run build

FROM base AS production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /src/dist/ .
CMD ["node", "app.js"]
```

In this case, the build arguments have default values.
Specifying their values when you invoke a build is optional.
To override the defaults, you would use the `--build-arg` CLI flag:

```console
$ docker build --build-arg NODE_VERSION=current .
```

For more information on how to use build arguments, refer to:

- `ARG` Dockerfile reference
- `docker build --build-arg` reference

## `ENV` usage example

Declaring an environment variable with `ENV` makes the variable
available to all subsequent instructions in the build stage.
The following example shows an example setting `NODE_ENV` to `production`
before installing JavaScript dependencies with `npm`.
Setting the variable makes `npm` omits packages needed only for local development.

```dockerfile
# syntax=docker/dockerfile:1

FROM node:20
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci && npm cache clean --force
COPY . .
CMD ["node", "app.js"]
```

Environment variables aren't configurable at build-time by default.
If you want to change the value of an `ENV` at build-time,
you can combine environment variables and build arguments:

```dockerfile
# syntax=docker/dockerfile:1

FROM node:20
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
CMD ["node", "app.js"]
```

With this Dockerfile, you can use `--build-arg` to override the default value of `NODE_ENV`:

```console
$ docker build --build-arg NODE_ENV=development .
```

Note that, because the environment variables you set persist in containers,
using them can lead to unintended side-effects for the application's runtime.

For more information on how to use environment variables in builds, refer to:

- `ENV` Dockerfile reference

## Scoping

Build arguments declared in the global scope of a Dockerfile
aren't automatically inherited into the build stages.
They're only accessible in the global scope.

```dockerfile
# syntax=docker/dockerfile:1

# The following build argument is declared in the global scope:
ARG NAME="joe"

FROM alpine
# The following instruction doesn't have access to the $NAME build argument
# because the argument was defined in the global scope, not for this stage.
RUN echo "hello ${NAME}!"
```

The `echo` command in this example evaluates to `hello !`
because the value of the `NAME` build argument is out of scope.
To inherit global build arguments into a stage, you must consume them:

```dockerfile
# syntax=docker/dockerfile:1

# Declare the build argument in the global scope
ARG NAME="joe"

FROM alpine
# Consume the build argument in the build stage
ARG NAME
RUN echo $NAME
```

Once a build argument is declared or consumed in a stage,
it's automatically inherited by child stages.

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine AS base
# Declare the build argument in the build stage
ARG NAME="joe"

# Create a new stage based on "base"
FROM base AS build
# The NAME build argument is available here
# since it's declared in a parent stage
RUN echo "hello $NAME!"
```

The following diagram further exemplifies how build argument
and environment variable inheritance works for multi-stage builds.

## Pre-defined build arguments

This section describes pre-defined build arguments available to all builds by default.

### Multi-platform build arguments

Multi-platform build arguments describe the build and target platforms for the build.

The build platform is the operating system, architecture, and platform variant
of the host system where the builder (the BuildKit daemon) is running.

- `BUILDPLATFORM`
- `BUILDOS`
- `BUILDARCH`
- `BUILDVARIANT`

The target platform arguments hold the same values for the target platforms for the build,
specified using the `--platform` flag for the `docker build` command.

- `TARGETPLATFORM`
- `TARGETOS`
- `TARGETARCH`
- `TARGETVARIANT`

These arguments are useful for doing cross-compilation in multi-platform builds.
They're available in the global scope of the Dockerfile,
but they aren't automatically inherited by build stages.
To use them inside stage, you must declare them:

```dockerfile
# syntax=docker/dockerfile:1

# Pre-defined build arguments are available in the global scope
FROM --platform=$BUILDPLATFORM golang
# To inherit them to a stage, declare them with ARG
ARG TARGETOS
RUN GOOS=$TARGETOS go build -o ./exe .
```

For more information about multi-platform build arguments, refer to
Multi-platform arguments

### Proxy arguments

Proxy build arguments let you specify proxies to use for your build.
You don't need to declare or reference these arguments in the Dockerfile.
Specifying a proxy with `--build-arg` is enough to make your build use the proxy.

Proxy arguments are automatically excluded from the build cache
and the output of `docker history` by default.
If you do reference the arguments in your Dockerfile,
the proxy configuration ends up in the build cache.

The builder respects the following proxy build arguments.
The variables are case insensitive.

- `HTTP_PROXY`
- `HTTPS_PROXY`
- `FTP_PROXY`
- `NO_PROXY`
- `ALL_PROXY`

To configure a proxy for your build:

```console
$ docker build --build-arg HTTP_PROXY=https://my-proxy.example.com .
```

For more information about proxy build arguments, refer to
Proxy arguments.
