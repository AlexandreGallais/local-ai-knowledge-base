---
title: "podman-artifact-add.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-artifact-add.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-artifact-add.1

% podman-artifact-add 1

## NAME
podman\-artifact\-add - Add an OCI artifact to local artifact store

## SYNOPSIS
**podman artifact add** [*options*] *artifact-name* *file* [*file* ...]

## DESCRIPTION

Add an OCI artifact to the local store from the local filesystem.  You must
provide at least one file to create the artifact, but several can also be
added.

Artifacts automatically include a creation timestamp in the
`org.opencontainers.image.created` annotation using RFC3339Nano format. When using
the `--append` option, the original creation timestamp is preserved.

## OPTIONS

Note: Set annotations for each file being added. The annotation "org.opencontainers.image.title" is used
to name the layer when mounted into a container, this title must be unigue for each artifact layer.

#### **--append**, **-a**

Append files to an existing artifact. This option cannot be used with the **--type** option.

#### **--file-type**

Set the media type of the artifact file instead of allowing detection to determine the type

#### **--replace**

If an artifact with the same name already exists, replace and remove it. The default is **false**.
This option cannot be used with the **--append** option.

#### **--type**

Set a type for the artifact being added.

## EXAMPLES

Add a single file to an artifact

```
$ podman artifact add quay.io/myartifact/myml:latest /tmp/foobar.ml
0fe1488ecdef8cc4093e11a55bc048d9fc3e13a4ba846efd24b5a715006c95b3
```

Add OCI artifact to the store with type:

```
$ podman artifact add --artifact-type application/com.example.ai --file-type application/vnd.gguf quay.io/myimage/myartifact:latest /home/user/model.gguf
```

Replace an existing artifact with the same name

```
$ podman artifact add quay.io/myartifact/myml:latest /tmp/foobar.ml
0fe1488ecdef8cc4093e11a55bc048d9fc3e13a4ba846efd24b5a715006c95b3
```

Add multiple files to an artifact
```
$ podman artifact add quay.io/myartifact/myml:latest /tmp/foobar1.ml /tmp/foobar2.ml
1487acae11b5a30948c50762882036b41ac91a7b9514be8012d98015c95ddb78
```

Add files to an existing OCI artifact

```
$ podman artifact add --append quay.io/myimage/myartifact:latest /home/user/config.yaml
```

Create artifact with the layer title name being replaced, and then mount into a container.

```
$ podman artifact add --annotation org.opencontainers.image.title=smollm2 quay.io/myreg/smollm2:latest blobs/sha256-4d2396b16114669389d7555c15a1592aad584750310f648edad5ca8c4eccda17
$ podman run --mount type=artifact,source=quay.io/myreg/smollm2:latest,destination=/mnt fedora ls -l /mnt
smollm2
```

## SEE ALSO
**podman(1)**, **podman-artifact(1)**

## HISTORY
Jan 2025, Originally compiled by Brent Baude <user@example.com>
