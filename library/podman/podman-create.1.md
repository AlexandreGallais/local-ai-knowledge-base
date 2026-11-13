---
title: "podman create --userns=auto:size=65536 ubi8-init (part 1 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-create 1

## NAME
podman\-create - Create a new container

## SYNOPSIS
**podman create** [*options*] *image* [*command* [*arg* ...]]

**podman container create** [*options*] *image* [*command* [*arg* ...]]

## DESCRIPTION

Creates a writable container layer over the specified image and prepares it for
running the specified command. The container ID is then printed to STDOUT. This
is similar to **podman run -d** except the container is never started. Use the
**podman start** *container* command to start the container at any point.

The initial status of the container created with **podman create** is 'created'.

Default settings for flags are defined in `containers.conf`. Most settings for
remote connections use the server's containers.conf, except when documented in
man pages.

## IMAGE

  The image is specified using transport:path format. If no transport is specified, the `docker` (container registry)
transport is used by default. For remote Podman, including Mac and Windows (excluding WSL2) machines, `docker` is the only allowed transport.

  **dir:**_path_
  An existing local directory _path_ storing the manifest, layer tarballs and signatures as individual files. This
is a non-standardized format, primarily useful for debugging or noninvasive container inspection.

    $ podman save --format docker-dir fedora -o /tmp/fedora
    $ podman create dir:/tmp/fedora echo hello

  **docker://**_docker-reference_ (Default)
  An image reference stored in  a remote container image registry. Example: "quay.io/podman/stable:latest".
The reference can include a path to a specific registry; if it does not, the
registries listed in registries.conf is queried to find a matching image.
By default, credentials from `podman login` (stored at
$XDG_RUNTIME_DIR/containers/auth.json by default) is used to authenticate;
otherwise it falls back to using credentials in $HOME/.docker/config.json.

    $ podman create registry.fedoraproject.org/fedora:latest echo hello

  **docker-archive:**_path_[**:**_docker-reference_]
An image stored in the `docker save` formatted file. _docker-reference_ is only used when creating such a
file, and it must not contain a digest.

    $ podman save --format docker-archive fedora -o /tmp/fedora
    $ podman create docker-archive:/tmp/fedora echo hello
  Note: On remote clients, including Mac and Windows (excluding WSL2) machines, this transport is not supported.

  **docker-daemon:**_docker-reference_
  An image in _docker-reference_ format stored in the docker daemon internal storage. The _docker-reference_ can also be an image ID (docker-daemon:algo:digest).

    $ sudo docker pull fedora
    $ sudo podman create docker-daemon:docker.io/library/fedora echo hello
  Note: On remote clients, including Mac and Windows (excluding WSL2) machines, this transport is not supported.

  **oci-archive:**_path_**:**_tag_
  An image in a directory compliant with the "Open Container Image Layout Specification" at the specified _path_
and specified with a _tag_.

    $ podman save --format oci-archive fedora -o /tmp/fedora
    $ podman create oci-archive:/tmp/fedora echo hello
  Note: On remote clients, including Mac and Windows (excluding WSL2) machines, this transport is not supported.
