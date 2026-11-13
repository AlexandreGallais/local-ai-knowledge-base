---
title: "podman-container.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-container.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-container.1

% podman-container 1

## NAME
podman\-container - Manage containers

## SYNOPSIS
**podman container** *subcommand*

## DESCRIPTION
The container command allows management of containers

## COMMANDS

| Command    | Man Page                                            | Description                                                                  |
| ---------  | --------------------------------------------------- | ---------------------------------------------------------------------------- |
| attach     | podman-attach(1)              | Attach to a running container.                                               |
| checkpoint | podman-container-checkpoint(1)  | Checkpoint one or more running containers.                   |
| cleanup    | podman-container-cleanup(1)    | Clean up the container's network and mountpoints.                |
| clone      | podman-container-clone(1)      |  Create a copy of an existing container.                           |
| commit     | podman-commit(1)              | Create new image based on the changed container.                             |
| cp         | podman-cp(1)                      | Copy files/folders between a container and the local filesystem.             |
| create     | podman-create(1)              | Create a new container.                                                      |
| diff       | podman-container-diff(1)        |  Inspect changes on a container's filesystem |
| exec       | podman-exec(1)                  | Execute a command in a running container.                                    |
| exists     | podman-container-exists(1)  | Check if a container exists in local storage                         |
| export     | podman-export(1)              | Export a container's filesystem contents as a tar archive.                   |
| init       | podman-init(1)                  | Initialize a container                                                       |
| inspect    | podman-container-inspect(1)| Display a container's configuration.                                 |
| kill       | podman-kill(1)                  | Kill the main process in one or more containers.                             |
| list       | podman-ps(1)                      | List the containers on the system.(alias ls)                                 |
| logs       | podman-logs(1)                  | Display the logs of a container.                                             |
| mount      | podman-mount(1)                | Mount a working container's root filesystem.                                 |
| pause      | podman-pause(1)                | Pause one or more containers.                                                |
| port       | podman-port(1)                  | List port mappings for the container.                                        |
| prune      | podman-container-prune(1)| Remove all stopped containers not associated with pods from local storage. |
| ps         | podman-ps(1)                      | Print out information about containers.                                      |
| rename     | podman-rename(1)              | Rename an existing container.                                                |
| restart    | podman-restart(1)            | Restart one or more containers.                                              |
| restore    | podman-container-restore(1)  | Restore one or more containers from a checkpoint.                  |
| rm         | podman-rm(1)                      | Remove one or more containers.                                               |
| run        | podman-run(1)                    | Run a command in a container.                                                |
| runlabel   | podman-container-runlabel(1)  | Execute a command as described by a container-image label.       |
| start      | podman-start(1)                | Start one or more containers.                                                |
| stats      | podman-stats(1)                | Display a live stream of one or more container's resource usage statistics.  |
| stop       | podman-stop(1)                  | Stop one or more running containers.                                         |
| top        | podman-top(1)                    | Display the running processes of a container.                                |
| unmount    | podman-unmount(1)            | Unmount a working container's root filesystem.(Alias unmount)                |
| unpause    | podman-unpause(1)            | Unpause one or more containers.                                              |
| update     | podman-update(1)              | Update the cgroup configuration of a given container.                        |
| wait       | podman-wait(1)                  | Wait on one or more containers to stop and print their exit codes.           |

## SEE ALSO
**podman(1)**, **podman-exec(1)**, **podman-run(1)**
