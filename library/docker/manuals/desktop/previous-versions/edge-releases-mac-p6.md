---
title: "Docker Desktop for Mac Edge release notes (part 6 of 8)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-mac.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Mac Edge release notes (part 6 of 8)

## Edge Releases of 2016

### Beta 34.1 Release Notes (2016-12-22 1.13.0-rc4-beta34.1)

> **Important:**
>
> Plugins installed using the experimental "managed plugins" feature in Docker 1.12 must be removed/uninstalled before upgrading.

**Hotfix**

- Fixed issue where Docker would fail to start after importing containers from Toolbox

**Upgrades**

- qcow-tool 0.7.2

### Beta 34 Release Notes (2016-12-20 1.13.0-rc4-beta34)

> **Important:**
>
> Plugins installed using the experimental "managed plugins" feature in Docker 1.12 must be removed/uninstalled before upgrading.

**New**

- Change UI for path location and open finder
- Trim compact on reboot
- Use more DNS servers, respect order

**Upgrades**

- Docker 1.13.0-rc4
- Linux Kernel 4.8.15

**Bug fixes and minor improvements**

- New Daemon icon
- Support Copy/Paste in About box
- Fix advanced daemon check json changes
- Auto update polling every 24h

### Beta 33.1 Release Notes (2016-12-16 1.13.0-rc3-beta33.1)

> **Important:**
>
> Plugins installed using the experimental "managed plugins" feature in Docker 1.12 must be removed/uninstalled before upgrading.

**Hotfix**

- Fixed issue where sometimes TRIM would cause the virtual machine to hang

### Beta 33 Release Notes (2016-12-15 1.13.0-rc3-beta33)

> **Important:**
>
> Plugins installed using the experimental "managed plugins" feature in Docker 1.12 must be removed/uninstalled before upgrading.

**New**

- You can now edit filesharing paths
- YOu can allocate memory with 256 MiB steps
- You can move the storage location of the Linux volume
- More explicit proxy settings
- You can completely disable Proxy
- You can switch daemon tabs without losing your settings
- You can't edit settings while Docker is restarting

**Upgrades**

- Linux Kernel 4.8.14

**Bug fixes and minor improvements**

- Kernel boots with `vsyscall=emulate arg` and `CONFIG_LEGACY_VSYSCALL` set to `NONE` in Moby

### Beta 32 Release Notes (2016-12-07 1.13.0-rc3-beta32)

**New**

- Support for arm, aarch64, ppc64le architectures using qemu

**Upgrades**

- Docker 1.13.0-rc3
- Docker Machine 0.9.0-rc2
- Linux kernel 4.8.12

**Bug fixes and minor improvements**

- VPNKit: Improved diagnostics
- Fix vsock deadlock under heavy write load
- On the beta channel you can't opt-out of analytics
- If you opt-out of analytics, you're prompted for approval before a bug report is sent

### Beta 31 Release Notes (2016-12-01 1.13.0-rc2-beta31)

**New**

- Dedicated preference pane for advanced configuration of the docker daemon (edit daemon.json). See Daemon Advanced (JSON configuration file).

- Docker Experimental mode can be toggled. See Daemon Basic (experimental mode and registries).

**Upgrades**

- Docker 1.13.0-rc2
- Docker Compose 1.9.0
- Docker Machine 0.9.0-rc1
- Linux kernel 4.8.10

**Bug fixes and minor improvements**

- Fixed bug where search domain could be read as `DomainName`
- VPNKit: don't permute resource records in responses
- VPNKit: reduced the amount of log spam
- Dedicated preference pane for HTTP proxy settings
- Dedicated preference pane for CPU & Memory computing resources
- Privacy settings moved to the general preference pane
- Fixed an issue where proxy settings were erased if registries or mirrors changed.
- Tab key is now cycling through tabs while setting proxy parameters
- Fixed an issue where the preference pane disappeared when the welcome whale menu was closed

### Beta 30 Release Notes (2016-11-10 1.12.3-beta30)

**New**

- Better support for Split DNS VPN configurations

**Upgrades**

- Docker Compose 1.9.0-rc4
- Linux kernel 4.4.30

**Bug fixes and minor changes**

- HyperKit: code cleanup and minor fixes
- VPNKit: improvements to DNS handling
- Improvements to Logging and Diagnostics
- osxfs: switched to `libev/kqueue` to improve latency

### Beta 29.3 Release Notes (2016-11-02 1.12.3-beta29.3)

**Upgrades**

- Docker Compose 1.9.0-rc2
- `osxfs`: Fixed a simultaneous volume mount race which can result in a crash

### Beta 29.2 Release Notes (2016-10-27 1.12.2-beta29.2)

**Hotfixes**

- Upgrade to Docker 1.12.3

### Beta 29.1 Release Notes (2016-10-26 1.12.1-beta29.1)

**Hotfixes**

- Fixed missing `/dev/pty/ptmx`

### Beta 29 Release Notes (2016-10-25 1.12.3-rc1-beta29)

**New**

- Overlay2 is now the default storage driver. You must do a factory reset for overlay2 to be automatically used. (#5545)

**Upgrades**

- Docker 1.12.3-rc1
- Linux kernel 4.4.27

**Bug fixes and minor changes**

- Fixed an issue where the whale animation during setting change was inconsistent
- Fixed an issue where some windows stayed hidden behind another app
- Fixed application of system or custom proxy settings over container restart
- Increased default ulimit for memlock (fixes docker/for-mac#801 )
- Fixed an issue where the Docker status would continue to be
  yellow/animated after the VM had started correctly
- osxfs: fixed the prohibition of chown on read-only or mode 0 files (fixes docker/for-mac#117, docker/for-mac#263, docker/for-mac#633 )

### Beta 28 Release Notes (2016-10-13 1.12.2-rc3-beta28)

**Upgrades**

- Docker 1.12.2
- Kernel 4.4.24
- Notary 0.4.2

**Bug fixes and minor changes**

- Fixed an issue where Docker for Mac was incorrectly reported as updated
- osxfs: Fixed race condition causing some reads to run forever
- Channel is now displayed in About box
- Crash reports are sent over Bugsnag rather than HockeyApp

### Beta 27 Release Notes (2016-09-28 1.12.2-rc1-beta27)

**Upgrades**

- Docker 1.12.2-rc1
- Docker Machine 0.8.2
- Docker compose 1.8.1
- Kernel vsock driver v7
- Kernel 4.4.21
- AUFS 20160912

**Bug fixes and minor changes**

- Fixed an issue where some windows did not claim focus correctly
- Added UI when switching channel to prevent user losing containers and settings
- Check disk capacity before Toolbox import
- Import certificates in `etc/ssl/certs/ca-certificates.crt`
- DNS: reduce the number of UDP sockets consumed on the host
- VPNkit: improve the connection-limiting code to avoid running out of sockets on the host
- UDP: handle diagrams bigger than 2035, up to the configured macOS kernel limit
- UDP: made the forwarding more robust; now, drop packets and continue rather than stopping
- disk: made the "flush" behaviour configurable for database-like workloads. This works around a performance regression in `v1.12.1`.

### Beta 26 Release Notes (2016-09-14 1.12.1-beta26)

**New**

- Improved support for macOS 10.12 Sierra

**Upgrades**

- Linux kernel 4.4.20
- AUFS 20160905

**Bug fixes and minor changes**

- Fixed communications glitch when UI talks to `com.docker.vmnetd`. Fixes docker/for-mac#90

- UI fix for macOs 10.12

- Windows open on top of full screen app are available in all spaces

- Reporting a bug, while not previously logged into GitHub now works

- When a diagnostic upload fails, the error is properly reported

- `docker-diagnose` displays and records the time the diagnosis was captured

- Ports are allowed to bind to host addresses other than `0.0.0.0` and `127.0.0.1`. Fixes issue reported in docker/for-mac#68.

- We no longer compute the container folder in `com.docker.vmnetd`. Fixes docker/for-mac#47.

**Known Issues**

- `Docker.app` sometimes uses 200% CPU after macOS wakes up from sleep mode. The
  issue is being investigated. The workaround is to restart Docker.app.

- There are a number of issues with the performance of directories bind-mounted with `osxfs`. In particular, writes of small blocks and
  traversals of large directories are currently slow. Additionally, containers
  that perform large numbers of directory operations, such as repeated scans of
  large directory trees, may suffer from poor performance.

- Under some unhandled error conditions, `inotify` event delivery can fail and become permanently disabled. The workaround is to restart `Docker.app`.

### Beta 25 Release Notes (2016-09-07 1.12.1-beta25)

**Upgrades**

- Experimental support for macOS 10.12 Sierra (beta)

**Bug fixes and minor changes**

- VPNKit supports search domains
- Entries from `/etc/hosts` should now resolve from within containers
- osxfs: fix thread leak

**Known issues**

- Several problems have been reported on macOS 10.12 Sierra and are being
  investigated. This includes failure to launch the app and being unable to
  upgrade to a new version.

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The
  issue is being investigated. The workaround is to restart Docker.app

- There are a number of issues with the performance of directories bind-mounted
  with `osxfs`. In particular, writes of small blocks and traversals of large
  directories are currently slow. Additionally, containers that perform large
  numbers of directory operations, such as repeated scans of large directory
  trees, may suffer from poor performance.

- Under some unhandled error conditions, `inotify` event delivery can fail and become permanently disabled. The workaround is to restart Docker.app.

### Beta 24 Release Notes (2016-08-23 1.12.1-beta24)

**Upgrades**

- Docker 1.12.1
- Docker Machine 0.8.1
- Linux kernel 4.4.19
- AUFS 20160822

**Bug fixes and minor changes**

- osxfs: fixed a malfunction of new directories that have the same name as an old directory that is still open

- osxfs: rename events now trigger DELETE and/or MODIFY `inotify` events (saving with TextEdit works now)

- slirp: support up to 8 external DNS servers

- slirp: reduce the number of sockets used by UDP NAT, reduce the probability that NAT rules will time out earlier than expected

- The app warns user if BlueStacks is installed (potential kernel panic)

**Known issues**

- Several problems have been reported on macOS 10.12 Sierra and are being investigated. This includes failure to launch the app and being unable to upgrade to a new version.

- `Docker.app` sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart `Docker.app`.

- There are a number of issues with the performance of directories bind-mounted with `osxfs`. In particular, writes of small blocks and traversals of large
  directories are currently slow. Additionally, containers that perform large
  numbers of directory operations, such as repeated scans of large directory
  trees, may suffer from poor performance.

- Under some unhandled error conditions, `inotify` event delivery can fail and become permanently disabled. The workaround is to restart `Docker.app`.

### Beta 23 Release Notes (2016-08-16 1.12.1-rc1-beta23)

**Upgrades**

- Docker 1.12.1-rc1
- Linux kernel 4.4.17
- AUFS 20160808

**Bug fixes and minor changes**

- Moby: use default sysfs settings, transparent huge pages disabled
- Moby: cgroup mount to support systemd in containers
- osxfs: fixed an issue that caused `inotify` failure and crashes
- osxfs: fixed a directory fd leak
- Zsh completions

**Known issues**

- Docker for Mac is not supported on macOS 10.12 Sierra

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker.app

- There are a number of issues with the performance of directories bind-mounted with `osxfs`. In particular, writes of small blocks and traversals of large directories are currently slow. Additionally, containers that perform large numbers of directory operations, such as repeated scans of large directory trees, may suffer from poor performance.

- Under some unhandled error conditions, `inotify` event delivery can fail and become permanently disabled. The workaround is to restart Docker.app

### Beta 22 Release Notes (2016-08-11 1.12.0-beta22)

**Upgrades**

- Linux kernel to 4.4.16

**Bug fixes and minor changes**

- Increase Moby fs.file-max to 524288
- Use Mac System Configuration database to detect DNS
- HyperKit updated with dtrace support and lock fixes
- Fix Moby Diagnostics and Update Kernel
- UI Fixes
- osxfs: fix socket chowns

**Known issues**

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker.app

- There are a number of issues with the performance of directories bind-mounted with `osxfs`. In particular, writes of small blocks and traversals of large directories are currently slow. Additionally, containers that perform large numbers of directory operations, such as repeated scans of large directory trees, may suffer from poor performance.

- Under some unhandled error conditions, `inotify` event delivery can fail and become permanently disabled. The workaround is to restart Docker.app

### Beta 21.1 Release Notes (2016-08-03 1.12.0-beta21.1)

This bug fix release contains osxfs improvements. The fixed issues may have
been seen as failures with apt-get and npm in containers, missed `inotify`
events or unexpected unmounts.

**Hotfixes**

- osxfs: fixed an issue causing access to children of renamed directories to fail (symptoms: npm failures, apt-get failures)

- osxfs: fixed an issue causing some ATTRIB and CREATE `inotify` events to fail delivery and other `inotify` events to stop

- osxfs: fixed an issue causing all `inotify` events to stop when an ancestor directory of a mounted directory was mounted

- osxfs: fixed an issue causing volumes mounted under other mounts to spontaneously unmount (docker/docker#24503)
