---
title: "podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 1 of 13)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-run.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-run 1

## NAME
podman\-run - Run a command in a new container

## SYNOPSIS
**podman run** [*options*] *image* [*command* [*arg* ...]]

**podman container run** [*options*] *image* [*command* [*arg* ...]]

## DESCRIPTION

Run a process in a new container. **podman run** starts a process with its own
file system, its own networking, and its own isolated process tree. The _image_
which starts the process may define defaults related to the process that will be
run in the container, the networking to expose, and more, but **podman run**
gives final control to the operator or administrator who starts the container
from the image. For that reason **podman run** has more options than any other
Podman command.

If the _image_ is not already loaded then **podman run** will pull the _image_, and
all image dependencies, from the repository in the same way running **podman
pull** _image_, before it starts the container from that image.

Several files will be automatically created within the container. These include
_/etc/hosts_, _/etc/hostname_, and _/etc/resolv.conf_ to manage networking.
These will be based on the host's version of the files, though they can be
customized with options (for example, **--dns** may override the host's DNS
servers in the created _resolv.conf_). Additionally, a container environment
file is created in each container to indicate to programs they are running in a
container. This file is located at _/run/.containerenv_ (or
_/var/run/.containerenv_ for FreeBSD containers). When using the
--privileged flag the .containerenv contains name/value pairs indicating the
container engine version, whether the engine is running in rootless mode, the
container name and ID, as well as the image name and ID that the container is based on. Note: _/run/.containerenv_ will not be created when a volume is mounted on /run.

When running from a user defined network namespace, the _/etc/netns/NSNAME/resolv.conf_
will be used if it exists, otherwise _/etc/resolv.conf_ will be used.

Default settings are defined in `containers.conf`. Most settings for remote
connections use the servers containers.conf, except when documented in man
pages.

## IMAGE

  The image is specified using transport:path format. If no transport is specified, the `docker` (container registry)
transport is used by default. For remote Podman, including Mac and Windows (excluding WSL2) machines, `docker` is the only allowed transport.

  **dir:**_path_
  An existing local directory _path_ storing the manifest, layer tarballs and signatures as individual files. This
is a non-standardized format, primarily useful for debugging or noninvasive container inspection.

    $ podman save --format docker-dir fedora -o /tmp/fedora
    $ podman run dir:/tmp/fedora echo hello

  **docker://**_docker-reference_ (Default)
  An image reference stored in a remote container image registry. Example: "quay.io/podman/stable:latest".
The reference can include a path to a specific registry; if it does not, the
registries listed in registries.conf are queried to find a matching image.
By default, credentials from `podman login` (stored at
$XDG_RUNTIME_DIR/containers/auth.json by default) are used to authenticate;
otherwise it falls back to using credentials in $HOME/.docker/config.json.

    $ podman run registry.fedoraproject.org/fedora:latest echo hello

  **docker-archive:**_path_[**:**_docker-reference_]
An image stored in the `docker save` formatted file. _docker-reference_ is only used when creating such a
file, and it must not contain a digest.

    $ podman save --format docker-archive fedora -o /tmp/fedora
    $ podman run docker-archive:/tmp/fedora echo hello
  Note: On remote clients, including Mac and Windows (excluding WSL2) machines, this transport is not supported.

  **docker-daemon:**_docker-reference_
  An image in _docker-reference_ format stored in the docker daemon internal storage. The _docker-reference_ can also be an image ID (docker-daemon:algo:digest).

    $ sudo docker pull fedora
    $ sudo podman run docker-daemon:docker.io/library/fedora echo hello
  Note: On remote clients, including Mac and Windows (excluding WSL2) machines, this transport is not supported.

  **oci-archive:**_path_**:**_tag_
  An image in a directory compliant with the "Open Container Image Layout Specification" at the specified _path_
and specified with a _tag_.

    $ podman save --format oci-archive fedora -o /tmp/fedora
    $ podman run oci-archive:/tmp/fedora echo hello
  Note: On remote clients, including Mac and Windows (excluding WSL2) machines, this transport is not supported.
