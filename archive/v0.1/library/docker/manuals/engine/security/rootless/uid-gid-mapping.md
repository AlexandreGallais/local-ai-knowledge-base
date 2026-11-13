---
title: "UID/GID mapping"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/security/rootless/uid-gid-mapping.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# UID/GID mapping

Rootless mode and `userns-remap` mode map container UIDs
and GIDs to the host differently.

- In `userns-remap` mode, container UID `0` is mapped to the first subordinate
  UID listed in `/etc/subuid` for the remap user, and container UID `n` is
  mapped to `subuid + n`.
- In rootless mode, container UID `0` is mapped to the host UID of the user
  running rootless Docker (the result of `id -u`); container UID `n` (for
  `n >= 1`) is mapped to `subuid + (n - 1)`.

GIDs follow the same rules using `/etc/subgid`.

This difference matters when setting file permissions on bind-mounted
directories: in rootless mode, files owned by your host user appear as owned
by `root` inside the container.
