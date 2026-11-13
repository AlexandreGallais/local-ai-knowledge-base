---
title: "Compose Build Specification (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/compose-file/build.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

Build is an optional part of the Compose Specification. It tells Compose how to (re)build an application from source and lets you define the build process within a Compose file in a portable way.  `build` can be either specified as a single string defining a context path, or as a detailed build definition.

When `build` is specified as a string, the whole path is used as a
Docker context to execute a Docker build, looking for a canonical
`Dockerfile` at the root of the directory.

When `build` is specified as a detailed structure, build arguments can
be specified, including an alternate `Dockerfile` location.

In both cases, the path can be absolute or relative. If it is relative,
it is resolved from the directory containing your Compose file. If it is
absolute, the path prevents the Compose file from being portable so
Compose displays a warning.

## Using `build` and `image`

When Compose is confronted with both a `build` subsection for a service and an `image` attribute, it follows the rules defined by the `pull_policy` attribute.

If `pull_policy` is missing from the service definition, Compose attempts to pull the image first and then builds from source if the image isn't found in the registry or platform cache.

## Publishing built images

Compose with `build` support offers an option to push built images to a registry. When doing so, it doesn't try to push service images without an `image` attribute. Compose warns you about the missing `image` attribute which prevents images being pushed.

## Illustrative example

The following example illustrates Compose Build Specification concepts with a concrete sample application. The sample is non-normative.

```yaml
services:
  frontend:
    image: example/webapp
    build: ./webapp

  backend:
    image: example/database
    build:
      context: backend
      dockerfile: ../backend.Dockerfile

  custom:
    build: ~/custom
```

When used to build service images from source, the Compose file creates three Docker images:

- `example/webapp`: A Docker image is built using `webapp` sub-directory, within the Compose file's folder, as the Docker build context. Lack of a `Dockerfile` within this folder returns an error.
- `example/database`: A Docker image is built using `backend` sub-directory within the Compose file's folder. `backend.Dockerfile` file is used to define build steps, this file is searched relative to the context path, which means `..` resolves to the Compose file's folder, so `backend.Dockerfile` is a sibling file.
- A Docker image is built using the `custom` directory with the user's `$HOME` as the Docker context. Compose displays a warning about the non-portable path used to build image.

On push, both `example/webapp` and `example/database` Docker images are pushed to the default registry. The `custom` service image is skipped as no `image` attribute is set and Compose displays a warning about this missing attribute.
