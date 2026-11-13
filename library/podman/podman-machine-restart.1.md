---
title: "podman-machine-restart.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-machine-restart.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-machine-restart.1

% podman-machine-restart 1

## NAME
podman\-machine\-restart - Restart a virtual machine

## SYNOPSIS
**podman machine restart** [*options*] [*name*]

## DESCRIPTION

Restarts a virtual machine for Podman.

The default machine name is `podman-machine-default`. If a machine name is not specified as an argument,
then `podman-machine-default` will be restarted.

Stopping an already stopped virtual machine is not considered an error so running restart on a stopped
virtual machine just starts it from a stopped state.

**podman machine restart** stops and then starts a Linux virtual machine where containers are run.

## OPTIONS

#### **--help**

Print usage statement.

#### **--no-info**

Suppress informational tips.

#### **--quiet**, **-q**

Suppress machine restarting status output.

## EXAMPLES

Restart a podman machine named myvm.
```
$ podman machine restart myvm
```

## SEE ALSO
**podman(1)**, **podman-machine(1)**, **podman-machine-start(1)**, **podman-machine-stop(1)**

## HISTORY
May 2026, Originally compiled by Jait Jacob <jai8.jacob@gmail.com>
