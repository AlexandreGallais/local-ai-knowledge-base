---
title: "podman-system-connection-default.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-system-connection-default.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-system-connection-default.1

% podman-system-connection-default 1

## NAME
podman\-system\-connection\-default - Set named destination as default for the Podman service

## SYNOPSIS
**podman system connection default** *name*

## DESCRIPTION
Set named ssh destination as default destination for the Podman service.

## EXAMPLE

Set the specified connection as default:
```
$ podman system connection default production
```
## SEE ALSO
**podman(1)**, **podman-system(1)**, **podman-system-connection(1)**

## HISTORY
July 2020, Originally compiled by Jhon Honce (jhonce at redhat dot com)
