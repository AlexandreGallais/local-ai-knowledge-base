---
title: "podman-machine-stop.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-machine-stop.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-machine-stop.1

% podman-machine-stop 1

## NAME
podman\-machine\-stop - Stop a virtual machine

## SYNOPSIS
**podman machine stop** [*name*]

## DESCRIPTION

Stops a virtual machine.

The default machine name is `podman-machine-default`. If a machine name is not specified as an argument,
then `podman-machine-default` will be stopped.

Rootless only.

Podman on MacOS and Windows requires a virtual machine. This is because containers are Linux -
containers do not run on any other OS because containers' core functionality are
tied to the Linux kernel. Podman machine must be used to manage MacOS and Windows machines,
but can be optionally used on Linux.

**podman machine stop** stops a Linux virtual machine where containers are run.

## OPTIONS

#### **--help**

Print usage statement.

## EXAMPLES

Stop a podman machine named myvm.
```
$ podman machine stop myvm
```

## SEE ALSO
**podman(1)**, **podman-machine(1)**

## HISTORY
March 2021, Originally compiled by Ashley Cui <user@example.com>
