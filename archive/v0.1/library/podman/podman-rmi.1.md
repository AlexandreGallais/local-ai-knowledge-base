---
title: "podman-rmi.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-rmi.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-rmi.1

% podman-rmi 1

## NAME
podman\-rmi - Remove one or more locally stored images

## SYNOPSIS
**podman rmi** [*options*] *image* [...]

**podman image rm** [*options*] *image* [...]

## DESCRIPTION
Removes one or more locally stored images.
Passing an argument _image_ deletes it, along with any of its dangling parent images.  A dangling image is an image without a tag and without being referenced by another image.

Note: To delete an image from a remote registry, use the **skopeo delete** command. Some registries do not allow users to delete an image via a CLI remotely.

## OPTIONS

#### **--all**, **-a**

Remove all images in the local storage.

#### **--force**, **-f**

This option causes Podman to remove all containers that are using the image before removing the image from the system.

#### **--ignore**, **-i**

If a specified image does not exist in the local storage, ignore it and do not throw an error.

#### **--no-prune**

This option does not remove dangling parents of the specified image.

## EXAMPLES

Remove an image by its short ID
```
$ podman rmi c0ed59d05ff7
```
Remove an image and its associated containers.
```
$ podman rmi --force imageID
```

Remove multiple images by their shortened IDs.
```
$ podman rmi c4dfb1609ee2 93fd78260bd1 c0ed59d05ff7
```

Remove all images and containers.
```
$ podman rmi -a -f
```

Remove an absent image with and without the `--ignore` flag.
```
$ podman rmi --ignore nothing
$ podman rmi nothing
Error: nothing: image not known

```

Remove an image but keep any parents of it.
```
$ podman rmi --no-prune d29200bf974d
Deleted: d29200bf974dbc48dc66c23c4031548531b6b5943e5f25ee7bda232e3b6b27f4
```

## Exit Status
  **0**   All specified images removed

  **1**   One of the specified images did not exist, and no other failures

  **2**   One of the specified images has child images or is being used by a container

  **125** The command fails for any other reason

## SEE ALSO
**podman(1)**, **skopeo-delete(1)**

## HISTORY
March 2017, Originally compiled by Dan Walsh <user@example.com>
