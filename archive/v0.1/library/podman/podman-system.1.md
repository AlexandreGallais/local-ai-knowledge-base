---
title: "podman-system.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-system.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-system.1

% podman-system 1

## NAME
podman\-system - Manage podman

## SYNOPSIS
**podman system** *subcommand*

## DESCRIPTION
The system command allows management of the podman systems

## COMMANDS

| Command    | Man Page                                                     | Description                                                              |
| -------    | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| check      | podman-system-check(1)           | Perform consistency checks on image and container storage.
| connection | podman-system-connection(1) | Manage the destination(s) for Podman service(s)                          |
| hyperv-prep| podman-system-hyperv-prep(1) | A Windows administrator command to prepare a host that is going to run Hyper-V based Podman machines |
| df         | podman-system-df(1)                 | Show podman disk usage.                                                  |
| events     | podman-events(1)                       | Monitor Podman events                                                    |
| info       | podman-info(1)                           | Display Podman related system information.                               |
| migrate    | podman-system-migrate(1)       | Migrate existing containers to a new podman version.                     |
| prune      | podman-system-prune(1)           | Remove all unused pods, containers, images, networks, and volume data.   |
| renumber   | podman-system-renumber(1)     | Migrate lock numbers to handle a change in maximum number of locks.      |
| reset      | podman-system-reset(1)           | Reset storage back to initial state.                                     |
| service    | podman-system-service(1)       | Run an API service                                                       |

## SEE ALSO
**podman(1)**
