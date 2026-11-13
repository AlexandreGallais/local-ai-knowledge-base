---
title: "podman-farm-create.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-farm-create.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-farm-create.1

% podman-farm-create 1

## NAME
podman\-farm\-create - Create a new farm

## SYNOPSIS
**podman farm create** *name* [*connections*]

## DESCRIPTION
Create a new farm with connections that Podman knows about which were added via the
*podman system connection add* command.

An empty farm can be created without adding any connections to it. Add or remove
connections from a farm via the *podman farm update* command.

## EXAMPLES

Create the specified farm with no connections:
```
$ podman farm create farm2
```

Create a farm with connections:
```
$ podman farm create farm1 f37 f38
```

## SEE ALSO
**podman(1)**, **podman-farm(1)**, **podman-system-connection(1)**, **podman-system-connection-add(1)**

## HISTORY
July 2023, Originally compiled by Urvashi Mohnani (umohnani at redhat dot com)
