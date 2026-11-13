---
title: "podman-system-connection-remove.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-system-connection-remove.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-system-connection-remove.1

% podman-system-connection-remove 1

## NAME
podman\-system\-connection\-remove - Delete named destination

## SYNOPSIS
**podman system connection remove** [*options*] *name*

## DESCRIPTION
Delete named ssh destination.

## OPTIONS

#### **--all**, **-a**

Remove all connections.

## EXAMPLE

Remove the specified system connection:
```
$ podman system connection remove production
```

Remove all system connections:
```
$ podman system connection remove --all
```

## SEE ALSO
**podman(1)**, **podman-system(1)**, **podman-system-connection(1)**

## HISTORY
July 2020, Originally compiled by Jhon Honce (jhonce at redhat dot com)
