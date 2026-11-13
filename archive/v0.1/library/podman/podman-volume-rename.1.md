---
title: "podman-volume-rename.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-volume-rename.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-volume-rename.1

% podman-volume-rename 1

## NAME
podman\-volume\-rename - Rename a volume

## SYNOPSIS
**podman volume rename** *volume* *new_name*

## DESCRIPTION
Renames an existing volume. The following restrictions apply:

- The volume must not be in use by any containers (running or stopped).
- The volume must not be currently mounted (via **podman volume mount**).
- Only volumes using the **local** driver can be renamed; volumes backed by
  a volume plugin or the **image** driver cannot be renamed.

Renaming an anonymous volume converts it to a named volume.

## OPTIONS

None.

## EXAMPLES

Rename volume `mydata` to `data_backup`:
```
$ podman volume rename mydata data_backup
```

## SEE ALSO
**podman(1)**, **podman-volume(1)**, **podman-volume-inspect(1)**

## HISTORY
June 2026, Originally compiled by Podman Developers
