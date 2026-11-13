---
title: "podman-quadlet-print.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-quadlet-print.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-quadlet-print.1

% podman-quadlet-print 1

## NAME
podman\-quadlet\-print - Display the contents of a quadlet

## SYNOPSIS
**podman quadlet print** *quadlet*

**podman quadlet cat** *quadlet*

## DESCRIPTION

Print the contents of a Quadlet, displaying the file including all comments.

## EXAMPLES

Using `podman quadlet print` to display the contents of a quadlet named `myquadlet.container`:
```
$ podman quadlet print myquadlet.container
[Container]
Image=alpine
Exec=sh -c "echo LIFECYCLE TEST STARTED; trap 'exit' SIGTERM; while :; do echo running; sleep 1; done"
LogDriver=passthrough
```

## SEE ALSO
**podman(1)**, **podman-quadlet(1)**, **podman-systemd.unit(5)**
