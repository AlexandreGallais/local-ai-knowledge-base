---
title: "Using Bake with additional contexts"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/bake/contexts.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

In addition to the main `context` key that defines the build context, each
target can also define additional named contexts with a map defined with key
`contexts`. These values map to the `--build-context` flag in the build
command.

Inside the Dockerfile these contexts can be used with the `FROM` instruction or
`--from` flag.

Supported context values are:

- Local filesystem directories
- Container images
- Git URLs
- HTTP URLs
- Name of another target in the Bake file

## Pinning alpine image

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN echo "Hello world"
```

```hcl
target "app" {
  contexts = {
    alpine = "docker-image://alpine:3.13"
  }
}
```

## Using a secondary source directory

```dockerfile
FROM golang
COPY --from=src . .
```

```hcl
# Running `docker buildx bake app` will result in `src` not pointing
# to some previous build stage but to the client filesystem, not part of the context.
target "app" {
  contexts = {
    src = "../path/to/source"
  }
}
```

## Using a target as a build context

To use a result of one target as a build context of another, specify the target
name with `target:` prefix.

```dockerfile
FROM scratch
```

```dockerfile
# syntax=docker/dockerfile:1
FROM baseapp
RUN echo "Hello world"
```

```hcl
target "base" {
  dockerfile = "baseapp.Dockerfile"
}

target "app" {
  contexts = {
    baseapp = "target:base"
  }
}
```

In most cases you should just use a single multi-stage Dockerfile with multiple
targets for similar behavior. This case is only recommended when you have
multiple Dockerfiles that can't be merged into one.
