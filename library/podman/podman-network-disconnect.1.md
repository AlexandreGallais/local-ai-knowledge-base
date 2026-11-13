---
title: "podman-network-disconnect.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-network-disconnect.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-network-disconnect.1

% podman-network-disconnect 1

## NAME
podman\-network\-disconnect - Disconnect a container from a network

## SYNOPSIS
**podman network disconnect** [*options*] network container

## DESCRIPTION
Disconnects a container from a network. A container can be disconnected from a network by name or by ID.
If all networks are disconnected from the container, it behaves like a container created with `--network=none`
and it does not have network connectivity until a network is connected again.

## OPTIONS
#### **--force**, **-f**

Force the container to disconnect from a network

## EXAMPLE

Disconnect container from specified network:
```
$ podman network disconnect test web
```

## SEE ALSO
**podman(1)**, **podman-network(1)**, **podman-network-connect(1)**

## HISTORY
November 2020, Originally compiled by Brent Baude <bbaude@redhat.com>
