---
title: "podman-start.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-start.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-start.1

% podman-start 1

## NAME
podman\-start - Start one or more containers

## SYNOPSIS
**podman start** [*options*] *container* ...

**podman container start** [*options*] *container* ...

## DESCRIPTION
Start one or more containers using container IDs or names as input.  The *attach* and *interactive*
options cannot be used to override the *--tty* and *--interactive* options from when the container
was created. Starting an already running container with the *--attach* option, Podman simply
attaches to the container.

## OPTIONS

#### **--all**

Start all the containers, default is only running containers.

#### **--attach**, **-a**

Attach container's STDOUT and STDERR.  The default is false. This option cannot be used when
starting multiple containers.

#### **--detach-keys**=*sequence*

Specify the key <example-value> for detaching a container. Format is a single character `[a-Z]` or a comma separated sequence of `ctrl-<value>`, where `<value>` is one of: `a-z`, `@`, `[`, `\`, `]`, `^` or `_`. Specifying "" disables this feature. The default is *ctrl-p,ctrl-q*.

This option can also be set in **containers.conf**(5) file.

#### **--interactive**, **-i**

When set to **true**, make stdin available to the contained process. If **false**, the stdin of the contained process is empty and immediately closed.

If attached, stdin is piped to the contained process. If detached, reading stdin will block until later attached.

**Caveat:** Podman will consume input from stdin as soon as it becomes available, even if the contained process doesn't request it.

#### **--latest**, **-l**

Instead of providing the <<container|pod>> name or ID, use the last created <<container|pod>>.
Note: the last started <<container|pod>> can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

#### **--sig-proxy**

Proxy received signals to the container process. SIGCHLD, SIGURG, SIGSTOP, and SIGKILL are not proxied.

The default is **true** when attaching, **false** otherwise.

## EXAMPLE

Start specified container:
```
$ podman start mywebserver
```

Start multiple containers:
```
$ podman start 860a4b231279 5421ab43b45
```

Start specified container in interactive mode with terminal attached:
```
$ podman start --interactive --attach 860a4b231279
```

Start last created container in interactive mode (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines):
```
$ podman start -i -l
```

Start containers by label:
```
$ podman start --filter label=app=frontend
9351ccb3ef4272532bc0c188bd4f0ddfc2b0de217732cd108259ea126b014647
```
Start container by name:
```
$ podman start --filter name=backend-app1
93308911bd4769cda03b75eb7f56588e862e0ea3568f25e1e3defa4138b9b973
```

Start containers by status:
```
$ podman start --filter status=exited
f8e85f84a749b205fb602895afa6ec8a866045ff27b82f843033712c8b93a2c9
34f997d354017a0076402c3a79245a5b8bd11b597c84385bec25ae8941fd5238
47972eb04aa7c77705b597a929957d1e8a392e00b44c0a2a7f88a01f9f860d11
```
Start container by name:
```
$ podman start --filter name=backend-app1
93308911bd4769cda03b75eb7f56588e862e0ea3568f25e1e3defa4138b9b973
```

Start containers by volume:
```
$ podman start --filter volume=web-vol
4a3332649ed8bec1e0d82e113074b9a13d45582007aeac969c005992cc480a73
```
Start container by network:
```
$ podman start --filter network=web-net
4a3332649ed8bec1e0d82e113074b9a13d45582007aeac969c005992cc480a73
f8e85f84a749b205fb602895afa6ec8a866045ff27b82f843033712c8b93a2c9
```
Start container by ancestor:
```
$ podman start --filter ancestor=nginx
4a3332649ed8bec1e0d82e113074b9a13d45582007aeac969c005992cc480a73
47972eb04aa7c77705b597a929957d1e8a392e00b44c0a2a7f88a01f9f860d11
```

## SEE ALSO
**podman(1)**

## HISTORY
November 2018, Originally compiled by Brent Baude <user@example.com>
