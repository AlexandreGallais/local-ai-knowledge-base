---
title: "podman-machine-os.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-machine-os.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-machine-os.1

% podman-machine-os 1

## NAME
podman\-machine\-os - Manage a Podman virtual machine's OS

## SYNOPSIS
**podman machine os** *subcommand*

## DESCRIPTION
`podman machine os` is a set of subcommands that manage a Podman virtual machine's operating system.

## SUBCOMMANDS

| Command | Man Page                                                     | Description                                 |
|---------|--------------------------------------------------------------|---------------------------------------------|
| apply   | podman-machine-os-apply(1)   | Apply an OCI image to a Podman Machine's OS |
| upgrade | podman-machine-os-upgrade(1) | Upgrade a Podman Machine's OS |

## SEE ALSO
**podman(1)**, **podman-machine(1)**, **podman-machine-os-apply(1)**, **podman-machine-os-upgrade(1)**

## HISTORY
February 2023, Originally compiled by Ashley Cui <user@example.com>
