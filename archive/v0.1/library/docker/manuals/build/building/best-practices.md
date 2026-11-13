---
title: "Building best practices (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/building/best-practices.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

## Use multi-stage builds

Multi-stage builds let you reduce the size of your final image, by creating a
cleaner separation between the building of your image and the final output.
Split your Dockerfile instructions into distinct stages to make sure that the
resulting output only contains the files that are needed to run the application.

Using multiple stages can also let you build more efficiently by executing
build steps in parallel.

See Multi-stage builds for more
information.

### Create reusable stages

If you have multiple images with a lot in common, consider creating a reusable
stage that includes the shared components, and basing your unique stages on
that. Docker only needs to build the common stage once. This means that your derivative images use memory
on the Docker host more efficiently and load more quickly.

It's also easier to maintain a common base stage ("Don't repeat yourself"),
than it is to have multiple different stages doing similar things.

## Choose the right base image

The first step towards achieving a secure image is to choose the right base
image. When choosing an image, ensure it's built from a trusted source and keep
it small.

- Docker Official Images
  are a curated collection that have clear documentation, promote best
  practices, and are regularly updated. They provide a trusted starting point
  for many applications.

- Verified Publisher images
  are high-quality images published and maintained by the organizations
  partnering with Docker, with Docker verifying the authenticity of the content
  in their repositories.

- Docker-Sponsored Open Source
  are published and maintained by open source projects sponsored by Docker
  through an open source program.

When you pick your base image, look out for the badges indicating that the
image is part of these programs.

When building your own image from a Dockerfile, ensure you choose a minimal base
image that matches your requirements. A smaller base image not only offers
portability and fast downloads, but also shrinks the size of your image and
minimizes the number of vulnerabilities introduced through the dependencies.

You should also consider using two types of base image: one for building and
unit testing, and another (typically slimmer) image for production. In the
later stages of development, your image may not require build tools such as
compilers, build systems, and debugging tools. A small image with minimal
dependencies can considerably lower the attack surface.

## Rebuild your images often

Docker images are immutable. Building an image is taking a snapshot of
that image at that moment. That includes any base images, libraries, or
other software you use in your build. To keep your images up-to-date and
secure, rebuild your images regularly with updated dependencies.

### Use --pull to get fresh base images

The following Dockerfile uses the `24.04` tag of the `ubuntu` image.
Over time, that tag may resolve to a different underlying version of the
`ubuntu` image, as the publisher rebuilds the image with new security
patches and updated libraries.

```dockerfile
# syntax=docker/dockerfile:1
FROM ubuntu:24.04
RUN apt-get -y update && apt-get install -y --no-install-recommends python3
```

To get the latest version of the base image, use the `--pull` flag:

```console
$ docker build --pull -t my-image:my-tag .
```

The `--pull` flag forces Docker to check for and download a newer
version of the base image, even if you have a version cached locally.

### Use --no-cache for clean builds

The `--no-cache` flag disables the build cache, forcing Docker to
rebuild all layers from scratch:

```console
$ docker build --no-cache -t my-image:my-tag .
```

This gets the latest available versions of dependencies from package
managers like `apt-get` or `npm`. It does not pull a fresh base image —
for that, use `--pull`.

The two flags serve distinct purposes and can be combined. Use both
together to get a fresh base image and re-execute all build steps:

```console
$ docker build --pull --no-cache -t my-image:my-tag .
```

Also consider pinning base image versions.

## Exclude with .dockerignore

To exclude files not relevant to the build, without restructuring your source
repository, use a `.dockerignore` file. This file supports exclusion patterns
similar to `.gitignore` files.

For example, to exclude all files with the `.md` extension:

```plaintext
*.md
```

For information on creating one, see
Dockerignore file.

## Create ephemeral containers

The image defined by your Dockerfile should generate containers that are as
ephemeral as possible. Ephemeral means that the container can be stopped
and destroyed, then rebuilt and replaced with an absolute minimum set up and
configuration.

Refer to Processes under _The Twelve-factor App_
methodology to get a feel for the motivations of running containers in such a
stateless fashion.

## Don't install unnecessary packages

Avoid installing extra or unnecessary packages just because they might be nice to have. For example, you don’t need to include a text editor in a database image.

When you avoid installing extra or unnecessary packages, your images have reduced complexity, reduced dependencies, reduced file sizes, and reduced build times.

## Decouple applications

Each container should have only one concern. Decoupling applications into
multiple containers makes it easier to scale horizontally and reuse containers.
For instance, a web application stack might consist of three separate
containers, each with its own unique image, to manage the web application,
database, and an in-memory cache in a decoupled manner.

Limiting each container to one process is a good rule of thumb, but it's not a
hard and fast rule. For example, not only can containers be
spawned with an init process,
some programs might spawn additional processes of their own accord. For
instance, Celery can spawn multiple worker
processes, and Apache can create one process per
request.

Use your best judgment to keep containers as clean and modular as possible. If
containers depend on each other, you can use Docker container networks
to ensure that these containers can communicate.

## Sort multi-line arguments

Whenever possible, sort multi-line arguments alphanumerically to make maintenance easier.
This helps to avoid duplication of packages and make the
list much easier to update. This also makes PRs a lot easier to read and
review. Adding a space before a backslash (`\`) helps as well.

Here’s an example from the buildpack-deps image:

```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
  bzr \
  cvs \
  git \
  mercurial \
  subversion \
  && rm -rf /var/lib/apt/lists/*
```

## Leverage build cache

When building an image, Docker steps through the instructions in your
Dockerfile, executing each in the order specified. For each instruction, Docker
checks whether it can reuse the instruction from the build cache.

Understanding how the build cache works, and how cache invalidation occurs,
is critical for ensuring faster builds.
For more information about the Docker build cache and how to optimize your builds,
see Docker build cache.

## Pin base image versions

Image tags are mutable, meaning a publisher can update a tag to point to a new
image. This is useful because it lets publishers update tags to point to
newer versions of an image. And as an image consumer, it means you
automatically get the new version when you re-build your image.

For example, if you specify `FROM alpine:3.21` in your Dockerfile, `3.21`
resolves to the latest patch version for `3.21`.

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine:3.21
```

At one point in time, the `3.21` tag might point to version 3.21.1 of the
image. If you rebuild the image 3 months later, the same tag might point to a
different version, such as 3.21.4. This publishing workflow is best practice,
and most publishers use this tagging strategy, but it isn't enforced.

The downside with this is that you're not guaranteed to get the same for every
build. This could result in breaking changes, and it means you also don't have
an audit trail of the exact image versions that you're using.

To fully secure your supply chain integrity, you can pin the image version to a
specific digest. By pinning your images to a digest, you're guaranteed to
always use the same image version, even if a publisher replaces the tag with a
new image. For example, the following Dockerfile pins the Alpine image to the
same tag as earlier, `3.21`, but this time with a digest reference as well.

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine:3.21@sha256:a8560b36e8b8210634f77d9f7f9efd7ffa463e380b75e2e74aff4511df3ef88c
```

With this Dockerfile, even if the publisher updates the `3.21` tag, your builds
would still use the pinned image version:
`a8560b36e8b8210634f77d9f7f9efd7ffa463e380b75e2e74aff4511df3ef88c`.

While this helps you avoid unexpected changes, it's also more tedious to have
to look up and include the image digest for base image versions manually each
time you want to update it. And you're opting out of automated security fixes,
which is likely something you want to get.

Docker Scout's default **No outdated base images**
policy checks whether the
base image version you're using is in fact the latest version. This policy also
checks if pinned digests in your Dockerfile correspond to the correct version.
If a publisher updates an image that you've pinned, the policy evaluation
returns a non-compliant status, indicating that you should update your image.

To keep your base images up-to-date automatically, use
GitHub Dependabot
with `package-ecosystem: "docker"`. Dependabot raises pull requests to update
your base image tags and digests on a schedule. This is better than using a tag
that changes the version automatically, because you're in control and you have
an audit trail of when and how the change occurred.

You can also review available base image updates from the CLI with
`docker scout recommendations`.

## Build and test your images in CI

When you check in a change to source control or create a pull request, use
GitHub Actions or another CI/CD pipeline to
automatically build and tag a Docker image and test it.
