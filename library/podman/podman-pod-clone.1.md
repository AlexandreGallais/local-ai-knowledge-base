---
title: "podman pod clone pod-name (part 1 of 5)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-clone.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-pod-clone 1

## NAME
podman\-pod\-clone - Create a copy of an existing pod

## SYNOPSIS
**podman pod clone** [*options*] *pod* *name*

## DESCRIPTION
**podman pod clone** creates a copy of a pod, recreating the identical config for the pod and for all of its containers. Users can modify the pods new name and select pod details within the infra container
