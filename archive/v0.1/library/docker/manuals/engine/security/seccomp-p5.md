---
title: "Seccomp security profiles for Docker (part 5 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/security/seccomp.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Seccomp security profiles for Docker (part 5 of 5)

> **Important:**
>
> The SELinux rule that blocks `AF_VSOCK` requires SELinux userspace 3.6 or
> later, the `container-selinux` policy, and SELinux enabled for the Docker
> daemon. RHEL 8 ships an older SELinux userspace, so its standard packages
> can't apply this rule. On affected hosts, use AppArmor or a custom seccomp
> profile that denies `socketcall`. Denying `socketcall` can break networking
> for 32-bit programs that use it.

## Run without the default seccomp profile

You can pass `unconfined` to run a container without the default seccomp
profile.

```console
$ docker run --rm -it --security-opt seccomp=unconfined debian:latest \
    unshare --map-root-user --user sh -c whoami
```
