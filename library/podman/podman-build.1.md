---
title: "populate a cache and also consult it (part 1 of 9)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-build 1

## NAME
podman\-build - Build a container image using a Containerfile

## SYNOPSIS
**podman build** [*options*] [*context*]

**podman image build** [*options*] [*context*]

## DESCRIPTION
**podman build** Builds an image using instructions from one or more
Containerfiles or Dockerfiles and a specified build context directory. A
Containerfile uses the same syntax as a Dockerfile internally. For this
document, a file referred to as a Containerfile can be a file named
either 'Containerfile' or 'Dockerfile' exclusively. Any file that has additional
extension attached will not be recognized by `podman build .` unless a `-f` flag is
used to specify the file.

The build context directory can be specified as the http(s) URL of an archive,
git repository or Containerfile.

When invoked with `-f` and a path to a Containerfile, with no explicit CONTEXT
directory, Podman uses the Containerfile's parent directory as its build context.

Containerfiles ending with a ".in" suffix are preprocessed via CPP(1).  This
can be useful to decompose Containerfiles into several reusable parts that can
be used via CPP's **#include** directive. Containerfiles ending in .in are
restricted to no comment lines unless they are CPP commands.
Note, a Containerfile.in file can still be used by other tools when manually
preprocessing them via `cpp -E`.

When the URL is an archive, the contents of the URL is downloaded to a temporary
location and extracted before execution.

When the URL is a Containerfile, the Containerfile is downloaded to a temporary
location.

When a Git repository is set as the URL, the repository is cloned locally and
then set as the context.  A URL is treated as a Git repository if it
has a `git://` prefix or a `.git` suffix.

NOTE: `podman build` uses code sourced from the `Buildah` project to build
container images.  This `Buildah` code creates `Buildah` containers for the
`RUN` options in container storage. In certain situations, when the
`podman build` crashes or users kill the `podman build` process, these external
containers can be left in container storage. Use the `podman ps --all --external`
command to see these containers.

`podman buildx build` command is an alias of `podman build`.  Not all `buildx build` features are available in Podman. The `buildx build` option is provided for scripting compatibility.
