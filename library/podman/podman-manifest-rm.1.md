---
title: "podman-manifest-rm.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-manifest-rm.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-manifest-rm.1

% podman-manifest-rm 1

## NAME
podman\-manifest\-rm - Remove manifest list or image index from local storage

## SYNOPSIS
**podman manifest rm** [*options*] *list-or-index* [...]

## DESCRIPTION
Removes one or more locally stored manifest lists.

## OPTIONS

#### **--ignore**, **-i**

If a specified manifest does not exist in the local storage, ignore it and do not throw an error.

## EXAMPLES

```
$ podman manifest rm listid
```

```
$ podman manifest rm --ignore listid1 listid2
```

## SEE ALSO
**podman(1)**, **podman-manifest(1)**,  **containers-storage.conf(5)**
