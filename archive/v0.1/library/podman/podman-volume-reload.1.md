---
title: "podman-volume-reload.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-volume-reload.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-volume-reload.1

% podman-volume-reload 1

## NAME
podman\-volume\-reload - Reload all volumes from volumes plugins

## SYNOPSIS
**podman volume reload**

## DESCRIPTION

**podman volume reload** checks all configured volume plugins and updates the libpod database with all available volumes.
Existing volumes are also removed from the database when they are no longer present in the plugin.

This command it is best effort and cannot guarantee a perfect state because plugins can be modified from the outside at any time.

Note: This command is not supported with podman-remote.

## EXAMPLES

Reload the volume plugins.
```
$ podman volume reload
Added:
vol6
Removed:
t3
```

## SEE ALSO
**podman(1)**, **podman-volume(1)**
