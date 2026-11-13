---
title: "podman create --userns=auto:size=65536 ubi8-init (part 11 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman create --userns=auto:size=65536 ubi8-init (part 11 of 11)

## EXAMPLES

Create a container using a local image:
```
$ podman create alpine ls
```

Create a container using a local image and annotate it:
```
$ podman create --annotation HELLO=WORLD alpine ls
```

Create a container using a local image, allocating a pseudo-TTY, keeping stdin open and name it myctr:
```
  $ podman create -t -i --name myctr alpine ls
```

Running a container in a new user namespace requires a mapping of
the UIDs and GIDs from the host:
```
$ podman create --uidmap 0:30000:7000 --gidmap 0:30000:7000 fedora echo hello
```

Setting automatic user-namespace separated containers:
```
# podman create --userns=auto:size=65536 ubi8-init
```

Configure the timezone in a container:
```
$ podman create --tz=local alpine date
$ podman create --tz=Asia/Shanghai alpine date
$ podman create --tz=US/Eastern alpine date
```

Ensure the first container (container1) is running before the second container (container2) is started:
```
$ podman create --name container1 -t -i fedora bash
$ podman create --name container2 --requires container1 -t -i fedora bash
$ podman start --attach container2
```

Create a container which requires multiple containers:
```
$ podman create --name container1 -t -i fedora bash
$ podman create --name container2 -t -i fedora bash
$ podman create --name container3 --requires container1,container2 -t -i fedora bash
$ podman start --attach container3
```

Expose shared libraries inside of container as read-only using a glob:
```
$ podman create --mount type=glob,src=/usr/lib64/libnvidia\*,ro -i -t fedora /bin/bash
```

Create a container allowing supplemental groups to have access to the volume:
```
$ podman create -v /var/lib/design:/var/lib/design --group-add keep-groups ubi8
```

Configure execution domain for containers using the personality option:
```
$ podman create --name container1 --personality=LINUX32 fedora bash
```

Create a container with external rootfs mounted as an overlay:
```
$ podman create --name container1 --rootfs /path/to/rootfs:O bash
```

Create a container connected to two networks (called net1 and net2) with a static ip:
```
$ podman create --network net1:ip=10.89.1.5 --network net2:ip=10.89.10.10 alpine ip addr
```

### Define a healthcheck at run time and verify it

```
$ podman create -d --name healthcheck-example -p 8080:80 \
  --health-cmd '["CMD-SHELL","wget -q --spider http://127.0.0.1:80 || exit 1"]' \
  --health-interval 30s --health-timeout 5s --health-retries 3 \
  docker.io/library/nginx:alpine

$ podman inspect --format '{{.State.Health}}' healthcheck-example
```

### Rootless Containers

Podman runs as a non-root user on most systems. This feature requires that a new enough version of shadow-utils
be installed. The shadow-utils package must include the newuidmap and newgidmap executables.

In order for users to run rootless, there must be an entry for their username in /etc/subuid and /etc/subgid which lists the UIDs for their user namespace.

Rootless Podman works better if the fuse-overlayfs package is installed.
The fuse-overlayfs package provides a userspace overlay storage driver, otherwise users need to use
the vfs storage driver, which can be disk space expensive and less performant
than other drivers.

To enable VPN on the container, pasta networking is used by default;
otherwise, containers need to be run with the --network=host flag.

## ENVIRONMENT

Environment variables within containers can be set using multiple different options:  This section describes the precedence.

Precedence order (later entries override earlier entries):

- **--env-host** : Host environment of the process executing Podman is added.
- **--http-proxy**: By default, several environment variables are passed in from the host, such as **http_proxy** and **no_proxy**. See **--http-proxy** for details.
- Container image : Any environment variables specified in the container image.
- **--env-file** : Any environment variables specified via env-files. If multiple files specified, then they override each other in order of entry.
- **--env** : Any environment variables specified overrides previous settings.

Create containers and set the environment ending with a __*__.
The trailing __*__ glob functionality is only active when no value is specified:

```
$ export ENV1=a
$ podman create --name ctr1 --env 'ENV*' alpine env
$ podman start --attach ctr1 | grep ENV
ENV1=a
$ podman create --name ctr2 --env 'ENV*=b' alpine env
$ podman start --attach ctr2 | grep ENV
ENV*=b
```

## CONMON

When Podman starts a container it actually executes the conmon program, which
then executes the OCI Runtime.  Conmon is the container monitor.  It is a small
program whose job is to watch the primary process of the container, and if the
container dies, save the exit code.  It also holds open the tty of the
container, so that it can be attached to later. This is what allows Podman to
run in detached mode (backgrounded), so Podman can exit but conmon continues to
run.  Each container has their own instance of conmon. Conmon waits for the
container to exit, gathers and saves the exit code, and then launches a Podman
process to complete the container cleanup, by shutting down the network and
storage.   For more information about conmon, see the conmon(8) man
page.

## FILES

**/etc/subuid**
**/etc/subgid**

NOTE: Use the environment variable `TMPDIR` to change the temporary storage location of downloaded container images. Podman defaults to use `/var/tmp`.

## SEE ALSO
**podman(1)**, **podman-save(1)**, **podman-ps(1)**, **podman-attach(1)**, **podman-pod-create(1)**, **podman-port(1)**, **podman-start(1)**, **podman-kill(1)**, **podman-stop(1)**, **podman-generate-systemd(1)**, **podman-rm(1)**, **subgid(5)**, **subuid(5)**, **containers.conf(5)**, **podman-systemd.unit(5)**, **setsebool(8)**, **pasta(1)**, **fuse-overlayfs(1)**, **proc(5)**, **conmon(8)**, **personality(2)**

### Troubleshooting

See podman-troubleshooting(7)
for solutions to common issues.

See podman-rootless(7)
for rootless issues.

## HISTORY
October 2017, converted from Docker documentation to Podman by Dan Walsh for Podman `<dwalsh@redhat.com>`

November 2014, updated by Sven Dowideit `<SvenDowideit@home.org.au>`

September 2014, updated by Sven Dowideit `<SvenDowideit@home.org.au>`

August 2014, updated by Sven Dowideit `<SvenDowideit@home.org.au>`

## FOOTNOTES
1: The Podman project is committed to inclusivity, a core value of open source. The `master` and `slave` mount propagation terminology used here is problematic and divisive, and needs to be changed. However, these terms are currently used within the Linux kernel and must be used as-is at this time. When the kernel maintainers rectify this usage, Podman will follow suit immediately.
