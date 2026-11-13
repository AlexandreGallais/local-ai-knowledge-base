---
title: "podman-farm-remove.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-farm-remove.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-farm-remove.1

% podman-farm-remove 1

## NAME
podman\-farm\-remove - Delete one or more farms

## SYNOPSIS
**podman farm remove** [*options*] *name*

**podman farm rm** [*options*] *name*

## DESCRIPTION
Delete one or more farms.

## OPTIONS

#### **--all**, **-a**

Remove all farms.

## EXAMPLE

Remove specified farm:
```
$ podman farm remove farm1
```

Remove all farms:
```
$ podman farm rm --all
```

## SEE ALSO
**podman(1)**, **podman-farm(1)**

## HISTORY
July 2023, Originally compiled by Urvashi Mohnani (umohnani at redhat dot com)s
