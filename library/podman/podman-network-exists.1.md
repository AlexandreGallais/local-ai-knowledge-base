---
title: "podman-network-exists.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-network-exists.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-network-exists.1

% podman-network-exists 1

## NAME
podman\-network\-exists - Check if the given network exists

## SYNOPSIS
**podman network exists** *network*

## DESCRIPTION
**podman network exists** checks if a network exists. The **Name** or **ID**
of the network may be used as input.  Podman returns an exit code
of `0` when the network is found.  A `1` is returned otherwise. An exit code of
`125` indicates there was another issue.

## OPTIONS

#### **--help**, **-h**

Print usage statement

## EXAMPLE

Check if specified network exists (the network does actually exist):
```
$ podman network exists net1
$ echo $?
0
```

Check if nonexistent network exists:
```
$ podman network exists webbackend
$ echo $?
1
```

## SEE ALSO
**podman(1)**, **podman-network(1)**

## HISTORY
January 2021, Originally compiled by Paul Holzinger `<user@example.com>`
