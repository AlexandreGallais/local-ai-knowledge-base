---
title: "podman-artifact.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-artifact.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-artifact.1

% podman-artifact 1

## NAME
podman\-artifact - Manage OCI artifacts

## SYNOPSIS
**podman artifact** *subcommand*

## DESCRIPTION
`podman artifact` is a set of subcommands that manage OCI artifacts.

OCI artifacts are a common way to distribute files that are associated with OCI images and
containers. Podman is capable of managing (pulling, inspecting, pushing) these artifacts
from its local "artifact store".

## SUBCOMMANDS

| Command | Man Page                                                   | Description                                                  |
|---------|------------------------------------------------------------|--------------------------------------------------------------|
| add     | podman-artifact-add(1)         | Add an OCI artifact to local artifact store              |
| extract | podman-artifact-extract(1) | Extract an OCI artifact to a local path                      |
| inspect | podman-artifact-inspect(1) | Inspect an OCI artifact                                      |
| ls      | podman-artifact-ls(1)           | List OCI artifacts in local store (alias list)                        |
| pull    | podman-artifact-pull(1)       | Pulls an artifact from a registry and stores it locally      |
| push    | podman-artifact-push(1)       | Push an OCI artifact from local storage to an image registry |
| rm      | podman-artifact-rm(1)           | Remove one or more OCI artifacts from local storage          |

## SEE ALSO
**podman(1)**

## HISTORY
Sept 2024, Originally compiled by Brent Baude <user@example.com>
