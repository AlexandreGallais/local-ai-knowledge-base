---
title: "podman-secret.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-secret.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-secret.1

% podman-secret 1

## NAME
podman\-secret - Manage podman secrets

## SYNOPSIS
**podman secret** *subcommand*

## DESCRIPTION
podman secret is a set of subcommands that manage secrets.

## SUBCOMMANDS

| Command | Man Page                                               | Description                                            |
| ------- | ------------------------------------------------------ | ------------------------------------------------------ |
| create  | podman-secret-create(1)   | Create a new secret                                    |
| exists  | podman-secret-exists(1)   | Check if the given secret <example-value>                       |
| inspect | podman-secret-inspect(1) | Display detailed information on one or more secrets    |
| ls      | podman-secret-ls(1)           | List all available secrets (alias list)                |
| rm      | podman-secret-rm(1)           | Remove one or more secrets                             |

## SEE ALSO
**podman(1)**

## HISTORY
January 2021, Originally compiled by Ashley Cui <user@example.com>
