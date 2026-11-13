---
title: "podman-volume-unmount.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-volume-unmount.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-volume-unmount.1

% podman-volume-unmount 1

## NAME
podman\-volume\-unmount - Unmount a volume

## SYNOPSIS
**podman volume unmount** *volume* [...]

**podman volume umount** *volume* [...]

## DESCRIPTION
Unmounts the specified volume, if there are no other containers
using it.

Volume storage increments a mount counter each time a volume is mounted.
When a volume is unmounted, the mount counter is decremented, and the
volume's filesystem is physically unmounted only when the mount
counter reaches zero indicating no other processes are using the mount.

## EXAMPLE

Unmount volume with a given ID:
```
$ podman volume unmount volumeID
```

Unmount multiple volumes with given IDs:
```
$ podman volume unmount volumeID1 volumeID2 volumeID3
```
## SEE ALSO
**podman(1)**, **podman-volume(1)**, **podman-volume-mount(1)**
