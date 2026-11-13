---
title: "Seccomp security profiles for Docker (part 3 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/security/seccomp.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Seccomp security profiles for Docker (part 3 of 5)

### Significant syscalls blocked by the default profile

Docker's default seccomp profile is an allowlist which specifies the calls that
are allowed. The table below lists the significant (but not all) syscalls that
are effectively blocked because they are not on the allowlist. The table includes
the reason each syscall is blocked rather than white-listed.
