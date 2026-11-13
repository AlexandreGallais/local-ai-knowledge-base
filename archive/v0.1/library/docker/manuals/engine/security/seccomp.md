---
title: "Seccomp security profiles for Docker (part 1 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/security/seccomp.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Seccomp security profiles for Docker

Secure computing mode (`seccomp`) is a Linux kernel feature. You can use it to
restrict the actions available within the container. The `seccomp()` system
call operates on the seccomp state of the calling process. You can use this
feature to restrict your application's access.

This feature is available only if Docker has been built with `seccomp` and the
kernel is configured with `CONFIG_SECCOMP` enabled. To check if your kernel
supports `seccomp`:

```console
$ grep CONFIG_SECCOMP= /boot/config-$(uname -r)
CONFIG_SECCOMP=y
```
