---
title: "podman-pod-exists.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-exists.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-pod-exists.1

% podman-pod-exists 1

## NAME
podman-pod-exists - Check if a pod exists in local storage

## SYNOPSIS
**podman pod exists** *pod*

## DESCRIPTION
**podman pod exists** checks if a pod exists in local storage. The **ID** or **Name**
of the pod may be used as input.  Podman returns an exit code
of `0` when the pod is found.  A `1` is returned otherwise. An exit code of `125` indicates there
was an issue accessing the local storage.

## EXAMPLES

Check if specified pod exists in local storage (the pod does actually exist):
```
$ sudo podman pod exists web; echo $?
0
```

Check if specified pod exists in local storage (the pod does not actually exist):
```
$ sudo podman pod exists backend; echo $?
1
```

## SEE ALSO
**podman(1)**, **podman-pod(1)**

## HISTORY
December 2018, Originally compiled by Brent Baude (bbaude at redhat dot com)
