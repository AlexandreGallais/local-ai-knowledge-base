---
title: "podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 13 of 13)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-run.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 13 of 13)

### Rootless Containers

Podman runs as a non-root user on most systems. This feature requires that a new enough version of **shadow-utils**
be installed. The **shadow-utils** package must include the **newuidmap**(1) and **newgidmap**(1) executables.

In order for users to run rootless, there must be an entry for their username in _/etc/subuid_ and _/etc/subgid_ which lists the UIDs for their user namespace.

Rootless Podman works better if the fuse-overlayfs package is installed.
The **fuse-overlayfs** package provides a userspace overlay storage driver, otherwise users need to use
the **vfs** storage driver, which can be disk space expensive and less
performant than other drivers.

To enable VPN on the container, pasta networking is used by default;
otherwise, containers need to be run with the --network=host flag.

## ENVIRONMENT

Environment variables within containers can be set using multiple different options,
in the following order of precedence (later entries override earlier entries):

- Container image: Any environment variables specified in the container image.
- **--http-proxy**: By default, several environment variables are passed in from the host, such as **http_proxy** and **no_proxy**. See **--http-proxy** for details.
- **--env-host**: Host environment of the process executing Podman is added.
- **--env-file**: Any environment variables specified via env-files. If multiple files are specified, then they override each other in order of entry.
- **--env**: Any environment variables specified overrides previous settings.

Run containers and set the environment ending with a __*__.
The trailing __*__ glob functionality is only active when no value is specified:

```
$ export ENV1=a
$ podman run --env 'ENV*' alpine env | grep ENV
ENV1=a
$ podman run --env 'ENV*=b' alpine env | grep ENV
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
September 2018, updated by Kunal Kushwaha `<user@example.com>`

October 2017, converted from Docker documentation to Podman by Dan Walsh for Podman `<user@example.com>`

November 2015, updated by Sally O'Malley `<user@example.com>`

June 2014, updated by Sven Dowideit `<user@example.com>`

April 2014, Originally compiled by William Henry `<user@example.com>` based on docker.com source material and internal work.

## FOOTNOTES
1: The Podman project is committed to inclusivity, a core value of open source. The `master` and `slave` mount propagation terminology used here is problematic and divisive, and needs to be changed. However, these terms are currently used within the Linux kernel and must be used as-is at this time. When the kernel maintainers rectify this usage, Podman will follow suit immediately.
