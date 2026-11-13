---
title: "podman-generate.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-generate.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-generate.1

% podman-generate 1

## NAME
podman\-generate - Generate structured data based on containers, pods or volumes

## SYNOPSIS
**podman generate** *subcommand*

## DESCRIPTION
The generate command creates structured output (like YAML) based on a container, pod or volume.

## COMMANDS

| Command | Man Page                                                   | Description                                                                         |
|---------|------------------------------------------------------------|-------------------------------------------------------------------------------------|
| kube    | podman-kube-generate(1)       | Generate Kubernetes YAML based on containers, pods or volumes.                      |
| spec    | podman-generate-spec(1)       | Generate Specgen JSON based on containers or pods.                                  |
| systemd | podman-generate-systemd(1) | [DEPRECATED] Generate systemd unit file(s) for a container or pod.                  |

## SEE ALSO
**podman(1)**, **podman-pod(1)**, **podman-container(1)**
