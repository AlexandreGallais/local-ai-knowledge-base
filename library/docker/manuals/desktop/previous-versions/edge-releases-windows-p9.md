---
title: "Docker Desktop for Windows Edge Release notes (part 9 of 9)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-windows.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Windows Edge Release notes (part 9 of 9)

### Alpha 3 Release (2016-03-03 1.10.2.14)

**File sharing**

  - Create network share automatically
  - Improve Credentials management
  - Support paths with c and C drive

**Crashes and Analytics**

  - Report crashes with Bugsnag
  - Send analytics through MixPanel

**GUI**

  - Improve layout of About and Settings dialog
  - Improve Updater
  - Link to *Help*
  - Link to *Send Feedback*

**General**

  - Bug fixes

### Alpha 2 Release (2016-02-26 1.10.2.12)

**Installer**

  - Enhancements
  - Auto-update
  - License agreement

**General**

  - Bug fixes

### Alpha 1 Release (2016-02-22 1.10.1.42-1)

**Hypervisor**

  - significant performance improvements

**Security**

  - retrieving credentials from user

**Filesystem**

  - hot-mounting host filesystem with credential

**General**

  - state management
  - stability, logging
  - bugfixes, eye candies

### Alpha 0 Release (2016-02-09 1.10.0.0-0)

**Hypervision**

  - Hyper-V-backed virtual machines
  - boots Moby in a few seconds
  - installs CLI in `PATH`
  - proxies Docker commands to Moby

**Filesystem**

  - mounts host filesystem to support `--volume`
  - Samba client with a hardcoded password
  - allows live reload

**Networking**

  - live debugging Node.js application
