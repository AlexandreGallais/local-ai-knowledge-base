---
title: "populate a cache and also consult it (part 1 of 8)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-farm-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-farm-build 1

## NAME
podman\-farm\-build - Build images on farm nodes, then bundle them into a manifest list

## SYNOPSIS
**podman farm build** [*options*] [*context*]

## DESCRIPTION
**podman farm build** Builds an image on all nodes in a farm and bundles them up into a manifest list.
It executes the `podman build` command on the nodes in the farm with the given Containerfile. Once the
images are built on all the farm nodes, the images will be pushed to the registry given via the **--tag**
flag. Once all the images have been pushed, a manifest list will be created locally and pushed to the registry
as well.

The manifest list will contain an image per native architecture type that is present in the farm.

The primary function of this command is to create multi-architecture builds that will be faster than doing it
via emulation using `podman build --arch --platform`.

If no farm is specified, the build will be sent out to all the nodes that `podman system connection` knows of.

Note: Since the images built are directly pushed to a registry, the user must pass in a full image name using the
**--tag** option in the format _registry_**/**_repository_**/**_imageName_[**:**_tag_]`.
