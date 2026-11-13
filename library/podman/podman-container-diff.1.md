---
title: "podman container diff container1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-container-diff.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-container-diff 1

## NAME
podman\-container\-diff - Inspect changes on a container's filesystem

## SYNOPSIS
**podman container diff** [*options*] *container* [*container*]

## DESCRIPTION
Displays changes on a container's filesystem. The container is compared to its parent layer or the second argument when given.

The output is prefixed with the following symbols:

| Symbol | Description |
|--------|-------------|
| A | A file or directory was added.   |
| D | A file or directory was deleted. |
| C | A file or directory was changed. |

## OPTIONS

#### **--format**

Alter the output into a different format. The only valid format for **podman container diff** is `json`.

#### **--latest**, **-l**

Instead of providing the <<container|pod>> name or ID, use the last created <<container|pod>>.
Note: the last started <<container|pod>> can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

## EXAMPLES

```
# podman container diff container1
C /usr
C /usr/local
C /usr/local/bin
A /usr/local/bin/docker-entrypoint.sh
```

```
$ podman container diff --format json container1 container2
{
     "added": [
          "/test"
     ]
}
```

```
$ podman container diff --latest
C /etc
```

## SEE ALSO
**podman(1)**, **podman-container(1)**

## HISTORY
July 2021, Originally compiled by Paul Holzinger <pholzing@redhat.com>
