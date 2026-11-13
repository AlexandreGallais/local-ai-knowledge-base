---
title: "podman-system-connection-rename.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-system-connection-rename.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-system-connection-rename.1

% podman-system-connection-rename 1

## NAME
podman\-system\-connection\-rename - Rename the destination for Podman service

## SYNOPSIS
**podman system connection rename** *old* *new*

## DESCRIPTION
Rename ssh destination from *old* to *new*.

## EXAMPLE

Rename the specified connection:
```
$ podman system connection rename laptop devel
```
## SEE ALSO
**podman(1)**, **podman-system(1)**, **podman-system-connection(1)**

## HISTORY
July 2020, Originally compiled by Jhon Honce (jhonce at redhat dot com)
