---
title: "podman-unpause.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-unpause.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-unpause.1

% podman-unpause 1

## NAME
podman\-unpause - Unpause one or more containers

## SYNOPSIS
**podman unpause** [*options*]|[*container* ...]

**podman container unpause** [*options*]|[*container* ...]

## DESCRIPTION
Unpauses the processes in one or more containers.  Container IDs or names can be used as input.

## OPTIONS

#### **--all**, **-a**

Unpause all paused containers.

#### **--latest**, **-l**

Instead of providing the <<container|pod>> name or ID, use the last created <<container|pod>>.
Note: the last started <<container|pod>> can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

## EXAMPLE

Unpause specified container:
```
$ podman unpause mywebserver
```

Unpause container by a partial container ID:
```
$ podman unpause 860a4b23
```

Unpause all **paused** containers:
```
$ podman unpause --all
```

Unpause container using ID specified in given files:
```
$ podman unpause --cidfile /home/user/cidfile-1
$ podman unpause --cidfile /home/user/cidfile-1 --cidfile ./cidfile-2
```

Unpause the latest container. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines):
```
$ podman unpause --latest
```

## SEE ALSO
**podman(1)**, **podman-pause(1)**

## HISTORY
September 2017, Originally compiled by Dan Walsh <dwalsh@redhat.com>
