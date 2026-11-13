---
title: "Antivirus software and Docker"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/security/antivirus.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Antivirus software and Docker

When antivirus software scans files used by Docker, these files may be locked
in a way that causes Docker commands to hang.

One way to reduce these problems is to add the Docker data directory
(`/var/lib/docker` on Linux, `%ProgramData%\docker` on Windows Server, or `$HOME/Library/Containers/com.docker.docker/` on Mac) to the
antivirus's exclusion list. However, this comes with the trade-off that viruses
or malware in Docker images, writable layers of containers, or volumes are not
detected. If you do choose to exclude Docker's data directory from background
virus scanning, you may want to schedule a recurring task that stops Docker,
scans the data directory, and restarts Docker.
