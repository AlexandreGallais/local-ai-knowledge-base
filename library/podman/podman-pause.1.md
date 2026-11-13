---
title: "podman-pause.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pause.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-pause.1

% podman-pause 1

## NAME
podman\-pause - Pause one or more containers

## SYNOPSIS
**podman pause** [*options*] [*container*...]

**podman container pause** [*options*] [*container*...]

## DESCRIPTION
Pauses all the processes in one or more containers.  You may use container IDs or names as input.

## OPTIONS

#### **--all**, **-a**

Pause all running containers.

#### **--latest**, **-l**

Instead of providing the <<container|pod>> name or ID, use the last created <<container|pod>>.
Note: the last started <<container|pod>> can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

## EXAMPLE

Pause specified container:
```
$ podman pause mywebserver
```

Pause container by partial container ID:
```
$ podman pause 860a4b23
```

Pause all **running** containers:
```
$ podman pause --all
```

Pause container using ID specified in given files:
```
$ podman pause --cidfile /home/user/cidfile-1
$ podman pause --cidfile /home/user/cidfile-1 --cidfile ./cidfile-2
```

Pause the latest container. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines):
```
$ podman pause --latest
```

## SEE ALSO
**podman(1)**, **podman-unpause(1)**

## HISTORY
September 2017, Originally compiled by Dan Walsh <user@example.com>
