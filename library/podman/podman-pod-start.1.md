---
title: "podman-pod-start.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-start.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-pod-start.1

% podman-pod-start 1

## NAME
podman\-pod\-start - Start one or more pods

## SYNOPSIS
**podman pod start** [*options*] *pod* ...

## DESCRIPTION
Start containers in one or more pods.  You may use pod IDs or names as input. The pod must have a container attached
to be started.

## OPTIONS

#### **--all**, **-a**

Starts all pods

#### **--latest**, **-l**

Instead of providing the <<container|pod>> name or ID, use the last created <<container|pod>>.
Note: the last started <<container|pod>> can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

## EXAMPLE

Start pod with a given name:
```
$ podman pod start mywebserverpod
```

Start pods with given IDs:
```
$ podman pod start 860a4b23 5421ab4
```

Start the latest pod. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines):
```
$ podman pod start --latest
```

Start all pods:
```
$ podman pod start --all
```

Start pod using ID specified in a given file:
```
$ podman pod start --pod-id-file /path/to/id/file
```

## SEE ALSO
**podman(1)**, **podman-pod(1)**, **podman-pod-stop(1)**

## HISTORY
July 2018, Adapted from podman start man page by Peter Hunt <user@example.com>
