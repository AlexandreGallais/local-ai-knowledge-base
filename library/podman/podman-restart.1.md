---
title: "podman-restart.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-restart.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-restart.1

% podman-restart 1

## NAME
podman\-restart - Restart one or more containers

## SYNOPSIS
**podman restart** [*options*] *container* ...

**podman container restart** [*options*] *container* ...

## DESCRIPTION
The restart command allows containers to be restarted using their ID or name.
Running containers are stopped and restarted. Stopped containers are started.

## OPTIONS

#### **--all**, **-a**

Restart all containers regardless of their current state.

#### **--cidfile**

Read container ID from the specified file and restart the container.  Can be specified multiple times.

#### **--latest**, **-l**

Instead of providing the <<container|pod>> name or ID, use the last created <<container|pod>>.
Note: the last started <<container|pod>> can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

#### **--running**

Restart all containers that are already in the *running* state.

#### **--time**, **-t**=*seconds*

Seconds to wait before forcibly stopping <<the container|running containers within the pod>>.
Use -1 for infinite wait.

## EXAMPLES

Restart the latest container.
```
$ podman restart -l
ec588fc80b05e19d3006bf2e8aa325f0a2e2ff1f609b7afb39176ca8e3e13467
```

Restart a specific container by partial container ID.
```
$ podman restart ff6cf1
ff6cf1e5e77e6dba1efc7f3fcdb20e8b89ad8947bc0518be1fcb2c78681f226f
```

Restart two containers by name with a timeout of 4 seconds.
```
$ podman restart --time 4 test1 test2
c3bb026838c30e5097f079fa365c9a4769d52e1017588278fa00d5c68ebc1502
17e13a63081a995136f907024bcfe50ff532917988a152da229db9d894c5a9ec
```

Restart all running containers.
```
$ podman restart --running
```

Restart all containers.
```
$ podman restart --all
```

Restart container using ID specified in a given files.
```
$ podman restart --cidfile /home/user/cidfile-1
$ podman restart --cidfile /home/user/cidfile-1 --cidfile ./cidfile-2
```

Restart container by name.
```
$ podman restart --filter name=id-name-test
```

Restart container by label.
```
$ podman restart --filter label=app=label-test
```

Restart container by exit code.
```
$ podman restart --filter exited=0
```

Restart container by status.
```
$ podman restart --filter status=running
```

Restart container by ancestor image.
```
$ podman restart --filter ancestor=nginx
```

Restart containers created before another.
```
$ podman restart --filter before=second
```

Restart containers created since another.
```
$ podman restart --filter since=first
```

Restart container by volume.
```
$ podman restart --filter volume=vol-filter
```

Restart containers in a pod.
```
$ podman restart --filter pod=mypod
```

Restart container by network.
```
$ podman restart --filter network=net-filter
```

Restart containers created until time.
```
$ podman restart --filter until=10s
```

## SEE ALSO
**podman(1)**

## HISTORY
March 2018, Originally compiled by Matt Heon <mheon@redhat.com>
