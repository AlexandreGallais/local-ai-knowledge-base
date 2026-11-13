---
title: "podman-volume-import.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-volume-import.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-volume-import.1

% podman-volume-import 1

## NAME
podman\-volume\-import - Import tarball contents into an existing podman volume

## SYNOPSIS
**podman volume import** *volume* [*source*]

## DESCRIPTION

**podman volume import** imports the contents of a tarball into the podman volume's mount point.
The contents of the volume is merged with the content of the tarball with the latter taking precedence.
**podman volume import** can consume piped input when using `-` as source path.

The given volume must already exist and is not created by podman volume import.

#### **--help**

Print usage statement

## EXAMPLES

Import named volume content from the specified file.
```
$ podman volume import myvol test.tar
```

Import named volume content from stdin.
```
$ gunzip -c hello.tar.gz | podman volume import myvol -
```

Export the content from named volume and pipe it into the named volume via stdin.
```
$ podman volume export oldmyvol | podman volume import myvol -
```

## SEE ALSO
**podman(1)**, **podman-volume(1)**, **podman-volume-export(1)**
