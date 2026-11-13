---
title: "Docker Desktop for Mac Edge release notes (part 7 of 8)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-mac.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Mac Edge release notes (part 7 of 8)

### Docker for Mac 1.12.0 (2016-07-28 1.12.0-beta21)

**New**

- Docker for Mac is now available from 2 channels: **stable** and **beta**. New features and bug fixes will go out first in auto-updates to users in the beta channel. Updates to the stable channel are much less frequent and happen in sync with major and minor releases of the Docker Engine. Only features that are well-tested and ready for production are added to the stable channel releases. For downloads of both and more information, see the installation guide.

**Upgrades**

- Docker 1.12.0 with experimental features
- Docker Machine 0.8.0
- Docker Compose 1.8.0

**Bug fixes and minor changes**

- Check for updates, auto-update and diagnose can be run by non-admin users
- osxfs: fixed an issue causing occasional incorrect short reads
- osxfs: fixed an issue causing occasional EIO errors
- osxfs: fixed an issue causing `inotify` creation events to fail
- osxfs: increased the `fs.inotify.max_user_watches` limit in Moby to 524288
- The UI shows documentation link for sharing volumes
- Clearer error message when running with outdated VirtualBox version
- Added link to sources for qemu-img

**Known issues**

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker.app

- There are a number of issues with the performance of directories bind-mounted with `osxfs`. In particular, writes of small blocks, and traversals of large directories are currently slow. Additionally, containers that perform large numbers of directory operations, such as repeated scans of large directory trees, may suffer from poor performance.

- Under some unhandled error conditions, `inotify` event delivery can fail and become permanently disabled. The workaround is to restart Docker.app

### Beta 20 Release Notes (2016-07-19 1.12.0-rc4-beta20)

**Bug fixes and minor changes**

- Fixed `docker.sock` permission issues
- Don't check for update when the settings panel opens
- Removed obsolete DNS workaround
- Use the secondary DNS server in more circumstances
- Limit the number of concurrent port forwards to avoid running out of resources
- Store the database as a "bare" git repo to avoid corruption problems

**Known issues**

- `Docker.app` sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker for Mac (`Docker.app`).

### Beta 19 Release Notes (2016-07-14 1.12.0-rc4-beta19)

**New**

- Added privacy tab in settings
- Allow the definition of HTTP proxy overrides in the UI

**Upgrades**

- Docker 1.12.0 RC4
- Docker Compose 1.8.0 RC2
- Docker Machine 0.8.0 RC2
- Linux kernel 4.4.15

**Bug fixes and minor changes**

- Filesystem sharing permissions can only be configured in the UI (no more `/Mac` in moby)
- `com.docker.osx.xhyve.hyperkit`: increased max number of fds to 10240
- Improved Moby syslog facilities
- Improved file-sharing tab
- `com.docker.slirp`: included the DNS TCP fallback fix, required when UDP responses are truncated
- `docker build/events/logs/stats...` won't leak when interrupted with Ctrl-C

### Beta 18.1 Release Notes (2016-07-07 1.12.0-rc3-beta18.1)

> **Note:**
>
> Docker 1.12.0 RC3 release introduces a backward incompatible change from RC2. You can fix this by recreating or updating your containers.

**Hotfix**

- Fixed issue resulting in error "Hijack is incompatible with use of CloseNotifier", reverts previous fix for `Ctrl-C` during build.

**New**

- New host/container file sharing UI
- `/Mac` bind mount prefix is deprecated and will be removed soon

**Upgrades**

- Docker 1.12.0 RC3

**Bug fixes and minor changes**

- VPNKit: Improved scalability as number of network connections increases
- The docker API proxy was failing to deal with some 1.12 features, such as health check.

### Beta 18 Release Notes (2016-07-06 1.12.0-rc3-beta18)

**New**

- New host/container file sharing UI
- `/Mac` bind mount prefix is deprecated and will be removed soon

**Upgrades**

- Docker 1.12.0 RC3

**Bug fixes and minor changes**

- VPNKit: Improved scalability as number of network connections increases
- Interrupting a `docker build` with Ctrl-C will actually stop the build
- The docker API proxy was failing to deal with some 1.12 features, such as health check.

### Beta 17 Release Notes (2016-06-29 1.12.0-rc2-beta17)

**Upgrades**

- Linux kernel 4.4.14, AUFS 20160627

**Bug fixes and minor changes**

- Documentation moved to /desktop/mac/
- Allow non-admin users to launch the app for the first time (using admin creds)
- Prompt non-admin users for admin password when needed in Preferences
- Fixed download links, documentation links
- Fixed "failure: No error" message in diagnostic panel
- Improved diagnostics for networking and logs for the service port openers

### Beta 16 Release Notes (2016-06-17 1.12.0-rc2-beta16)

**Upgrades**

- Docker 1.12.0 RC2
- docker-compose 1.8.0 RC1
- docker-machine 0.8.0 RC1
- notary 0.3
- Alpine 3.4

**Bug fixes and minor changes**

- VPNKit: Fixed a regressed error message when a port is in use
- Fixed UI crashing with `NSInternalInconsistencyException` / fixed leak
- HyperKit API: Improved error reporting
- osxfs: fix sporadic EBADF due to fd access/release races (#3683)

### Beta 15 Release Notes (2016-06-10 1.11.2-beta15)

**New**

- Registry mirror and insecure registries can now be configured from Preferences
- Virtual machine can now be restarted from Preferences
- `sysctl.conf` can be edited from Preferences

**Upgrades**

- Docker 1.11.2
- Linux 4.4.12, `aufs` 20160530

**Bug fixes and minor changes**

- Timekeeping in Moby VM improved
- Number of concurrent TCP/UDP connections increased in VPNKit
- Hyperkit: `vsock` stability improvements
- Fixed crash when user is admin

### Beta 14 Release Notes (2016-06-02 1.11.1-beta14)

**New**

- New settings menu item, **Diagnose & Feedback**, is available to run diagnostics and upload logs to Docker.

**Known issues**

- `Docker.app` sometimes uses 200% CPU after macOS wakes up from sleep mode with macOS 10.10. The issue is being investigated. The workaround is to restart `Docker.app`.

**Bug fixes and minor changes**

- `osxfs`: now support `statfs`
- **Preferences**: updated toolbar icons
- Fall back to secondary DNS server if primary fails.
- Added a link to the documentation from menu.

### Beta 13.1 Release Notes (2016-05-28 1.11.1-beta13.1)

**Hotfixes**

- `osxfs`:
  - Fixed sporadic EBADF errors and End_of_file crashes due to a race corrupting node table invariants
  - Fixed a crash after accessing a sibling of a file moved to another directory caused by a node table invariant violation
- Fixed issue where Proxy settings were applied on network change, causing docker daemon to restart too often
- Fixed issue where log file sizes doubled on docker daemon restart

### Beta 13 Release Notes (2016-05-25 1.11.1-beta13)

**New**

- `osxfs`: Enabled 10ms dcache for 3x speedup on a `go list ./...` test against docker/machine. Workloads heavy in file system path resolution (common among dynamic languages and build systems) will have those resolutions performed in amortized constant time rather than time linear in the depth of the path so speedups of 2-10x will be common.

- Support multiple users on the same machine, non-admin users can use the app as long as `vmnetd` has been installed. Currently, only one user can be logged in at the same time.

- Basic support for using system HTTP/HTTPS proxy in docker daemon

**Known issues**

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker.app.

**Bug fixes and minor changes**

- `osxfs`:
  - setting `atime` and `mtime` of nodes is now supported
  - Fixed major regression in Beta 12 with ENOENT, ENOTEMPY, and other spurious errors after a directory rename. This manifested as `npm install` failure and other directory traversal issues.
  - Fixed temporary file ENOENT errors
  - Fixed in-place editing file truncation error, such as when running `perl -i`
- improved time synchronisation after sleep

### Beta 12 Release (2016-05-17 1.11.1-beta12)

**Upgrades**

- FUSE 7.23 for osxfs

**Known issues**

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker.app.

**Bug fixes and minor changes**

- UI improvements
- Fixed a problem in osxfs where`mkdir` returned EBUSY but directory was created.

### Beta 11 Release (2016-05-10 1.11.1-beta11)

**New**

The `osxfs` file system now persists ownership changes in an extended attribute.

**Upgrades**

- docker-compose 1.7.1 (see changelog)
- Linux kernel 4.4.9

**Bug fixes and minor changes**

- Desktop notifications after successful update
- No "update available" popup during install process
- Fixed repeated bind of privileged ports
- `osxfs`: Fixed the block count reported by stat
- Moby (Backend) fixes:
  - Fixed `vsock` half closed issue
  - Added NFS support
  - Hostname is now Moby, not Docker
  - Fixes to disk formatting scripts
  - Linux kernel upgrade to 4.4.9

### Beta 10 Release (2016-05-03 1.11.0-beta10)

**New**

- Token validation is now done over an actual SSL tunnel (HTTPS). (This should fix issues with antivirus applications.)

**Upgrades**

- Docker 1.11.1

**Bug fixes and minor changes**

- UCP now starts again
- Include debugging symbols in HyperKit
- vsock stability improvements
- Addressed glitches in **Preferences** panel
- Fixed issues impacting the “whale menu”
- Fixed uninstall process
- HyperKit vcpu state machine improvements, may improve suspend/resume

### Beta 9 Release (2016-04-26 1.11.0-beta9)

**New**

- New Preferences window - memory and vCPUs now adjustable
- `localhost` is now used for port forwarding by default.`docker.local` will no longer work as of Beta 9.

**Known issues**

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker.app.

**Bug fixes and minor changes**

- Fix loopback device naming
- Improved docker socket download and osxfs sequential write by 20%
- `com.docker.osxfs`
  - improved sequential read throughput by up to 20%
  - improved `readdir` performance by up to 6x
  - log all fatal exceptions
- More reliable DNS forwarding over UDP and TCP
- UDP ports can be proxied over vsock
- Fixed EADDRINUSE (manifesting as errno 526) when ports are re-used
- Send ICMP when asked to not fragment and we can't guarantee it
- Fixed parsing of UDP datagrams with IP socket options
- Drop abnormally large ethernet frames
- Improved HyperKit logging
- Record virtual machine start and stop events

### Beta 8 Release (2016-04-20 1.11.0-beta8)

**New**

- Networking mode switched to VPN compatible by default, and as part of this change the overall experience has been improved:

* `docker.local` now works in VPN compatibility mode
* exposing ports on the Mac is available in both networking modes
* port forwarding of privileged ports now works in both networking modes
* traffic to external DNS servers is no longer dropped in VPN mode

- `osxfs` now uses `AF_VSOCK` for transport giving ~1.8x speedup for large sequential read/write workloads but increasing latency by ~1.3x. `osxfs` performance engineering work continues.

**Known issues**

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart `Docker.app`

**Bug fixes and minor changes**

- Apple System Log now used for most logs instead of direct filesystem logging
- `docker_proxy` fixes
- Merged HyperKit upstream patches
- Improved error reporting in `nat` network mode
- `osxfs` `transfused` client now logs over `AF_VSOCK`
- Fixed a `com.docker.osx.HyperKit.linux` supervisor deadlock if processes exit during a controlled shutdown
- Fixed VPN mode malformed DNS query bug preventing some resolutions

### Beta 7 Release (2016-04-12 1.11.0-beta7)

**New**

- Docs are updated per the Beta 7 release
- Use AF_VSOCK for docker socket transport

**Upgrades**

- docker 1.11.0-rc5
- docker-machine 0.7.0-rc3
- docker-compose 1.7.0rc2

**Known issues**

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker.app

- If VPN mode is enabled and then disabled and then re-enabled again, `docker ps` will block for 90s

**Bug fixes and minor changes**

- Logging improvements
- Improve process management

### Beta 6 Release (2016-04-05 1.11.0-beta6)

**New**

- Docs are updated per the Beta 6 release
- Added uninstall option in user interface

**Upgrades**

- docker 1.11.0-rc5
- docker-machine 0.7.0-rc3
- docker-compose 1.7.0rc2

**Known issues**

- `Docker.app` sometimes uses 200% CPU after macOS wakes up from sleep mode.
  The issue is being investigated. The workaround is to restart
  `Docker.app`.

- If VPN mode is enabled, then disabled and re-enabled again,
  `docker ps` will block for 90 seconds.

**Bug fixes and minor changes**

- Fixed osxfs multiple same directory bind mounts stopping inotify
- Fixed osxfs `setattr` on mode 0 files (`sed` failures)
- Fixed osxfs blocking all operations during `readdir`
- Fixed osxfs mishandled errors which crashed the file system and VM
- Removed outdated `lofs`/`9p` support
- Added more debugging info to logs uploaded by `pinata diagnose`
- Improved diagnostics from within the virtual machine
- VirtualBox version check now also works without VBoxManage in path
- VPN mode now uses same IP range as NAT mode
- Tokens are now verified on port 443
- Removed outdated uninstall scripts
- Increased default ulimits
- Port forwarding with `-p` and `-P` should work in VPN mode
- Fixed a memory leak in `com.docker.db`
- Fixed a race condition on startup between Docker and networking which can
  lead to `Docker.app` not starting on reboot

### Beta 5 Release (2016-03-29 1.10.3-beta5)

**New**

- Docs are updated per the Beta 5 release!

**Known issues**

- There is a race on startup between docker and networking which can lead to Docker.app not starting on reboot. The workaround is to restart the application manually.

- Docker.app sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart Docker.app.

- In VPN mode, the `-p` option needs to be explicitly of the form `-p <host port>:<container port>`. `-p <port>` and `-P` will not work yet.

**Bug fixes and minor changes**

- Updated DMG background image
- Show correct VM memory in Preferences
- Feedback opens forum, not email
- Fixed RAM amount error message
- Fixed wording of CPU error dialog
- Removed status from Preferences
- Check for incompatible versions of VirtualBox
