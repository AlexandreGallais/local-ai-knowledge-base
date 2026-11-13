---
title: "podman-stop.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-stop.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-stop.1

% podman-stop 1

## NAME
podman\-stop - Stop one or more running containers

## SYNOPSIS
**podman stop** [*options*] *container* ...

**podman container stop** [*options*] *container* ...

## DESCRIPTION
Stops one or more containers using container IDs or names as input. The **--time** option
specifies the number of seconds to wait before forcibly stopping the container after the stop command
is issued to the container. The default is 10 seconds. By default, containers are stopped with SIGTERM
and then SIGKILL after the timeout. The SIGTERM default can be overridden by the image used to create the
container and also via command line when creating the container.

## OPTIONS

#### **--all**, **-a**

Stop all running containers.  This does not include paused containers.

Command does not fail when *file* is missing and user specified --ignore.

#### **--ignore**, **-i**

Ignore errors when specified <<containers|pods>> are not in the container store.  A user
might have decided to manually remove a <<container|pod>> which leads to a failure
during the ExecStop directive of a systemd service referencing that <<container|pod>>.

#### **--latest**, **-l**

Instead of providing the <<container|pod>> name or ID, use the last created <<container|pod>>.
Note: the last started <<container|pod>> can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

#### **--time**, **-t**=*seconds*

Seconds to wait before forcibly stopping <<the container|running containers within the pod>>.
Use -1 for infinite wait.

## EXAMPLES

Stop the specified container via its name.
```
$ podman stop mywebserver
```

Stop the container via its id.
```
$ podman stop 860a4b235279
```

Stop multiple containers.
```
$ podman stop mywebserver 860a4b235279
```

Stop the container identified in the cidfile.
```
$ podman stop --cidfile /home/user/cidfile-1
```

Stop the containers identified in the cidfiles.
```
$ podman stop --cidfile /home/user/cidfile-1 --cidfile ./cidfile-2
```

Stop the specified container in 2 seconds.
```
$ podman stop --time 2 860a4b235279
```

Stop all running containers.
```
$ podman stop -a
```

Stop the last created container (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)
```
$ podman stop --latest
```

Stop by label.
```
$ podman stop --filter label=app=frontend
9351ccb3ef4272532bc0c188bd4f0ddfc2b0de217732cd108259ea126b014647
```

Stop by name.
```
$ podman stop --filter name=db-replica
6c2680da61d54690718ac3aecdb04a8aad95ae353e42cc942736823bd05c8a1d
```

Stop by role label.
```
$ podman stop --filter label=role=primary
bb3ff91d969a8dc622d627e4a8d76c18bdbd417d317c5e7e66543c0b0c8ed1e8
```

## SEE ALSO
**podman(1)**, **podman-rm(1)**

## HISTORY
September 2018, Originally compiled by Brent Baude <bbaude@redhat.com>
