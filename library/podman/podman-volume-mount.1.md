---
title: "podman volume mount foo"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-volume-mount.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-volume-mount 1

## NAME
podman\-volume\-mount - Mount a volume filesystem

## SYNOPSIS
**podman volume mount** [*volume* ...]

## DESCRIPTION
Mounts the specified volumes' file system in a location which can be
accessed from the host, and returns its location.

Rootless mode only supports mounting file volumes unless Podman is run within the user namespace
via the `podman unshare` command. All other volume types fail to mount.

## RETURN VALUE
The location of the mounted file system.  On error an empty string and errno is
returned.

## EXAMPLE

Mount specified volume. As Root:
```
# podman volume mount foo
/home/dwalsh/.local/share/containers/storage/volumes/foo/_data
```

In rootless mode, volume mounting only works after executing the podman unshare command to enter the user namespace.
```
$ podman unshare
# podman volume mount foo
/home/dwalsh/.local/share/containers/storage/volumes/foo/_data
```

## SEE ALSO
**podman(1)**, **podman-volume(1)**, **podman-volume-unmount(1)**, **podman-unshare(1)**, **mount(8)**
