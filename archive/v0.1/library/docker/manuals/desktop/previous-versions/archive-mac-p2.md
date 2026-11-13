---
title: "Release notes for previous versions (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/archive-mac.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Release notes for previous versions (part 2 of 2)

## Stable Releases of 2017

### Docker Community Edition 17.09.1-ce-mac42 2017-12-11

* Upgrades
  - Docker 17.09.1-ce
  - Docker compose 1.17.1
  - Docker Machine 0.13.0

* Bug fixes and minor changes
  - Fix bug not allowing to move qcow disk in some cases.

### Docker Community Edition 17.09.0-ce-mac35 2017-10-06

* Bug fix
  - Fix Docker For Mac unable to start in some cases : removed use of libgmp sometimes causing the vpnkit process to die.

### Docker Community Edition 17.09.0-ce-mac33 2017-10-03
  - Do not show Toolbox migration assistant when there are existing Docker For Mac data.

### Docker Community Edition 17.09.0-ce-mac32 2017-10-02

* Upgrades
  - Docker 17.09.0-ce
  - Docker Compose 1.16.1
  - Docker Machine 0.12.2
  - Docker Credential <example-value> 0.6.0
  - Linux Kernel 4.9.49
  - AUFS 20170911
  - DataKit update (fix instability on High Sierra)

* New
  - Add daemon options validation
  - VPNKit: add support for ping!
  - VPNKit: add slirp/port-max-idle-timeout to allow the timeout to be adjusted or even disabled
  - VPNKit: bridge mode is default everywhere now
  - Transparent proxy using macOS system proxies (if defined) directly
  - GUI settings are now stored in ~/Library/Group\ Containers/group.com.docker/settings.json. daemon.json in now a file in ~/.docker/
  - You can now change the default IP address used by Hyperkit if it collides with your network

* Bug fixes and minor changes
  - Fix instability on High Sierra (docker/for-mac#2069, docker/for-mac#2062, docker/for-mac#2052, docker/for-mac#2029, docker/for-mac#2024)
  - Fix password <example-value> (docker/for-mac#2008, docker/for-mac#2016, docker/for-mac#1919, docker/for-mac#712, docker/for-mac#1220).
  - Kernel: Enable TASK_XACCT and TASK_IO_ACCOUNTING (docker/for-mac#1608)
  - Rotate logs in the VM more often
  - VPNKit: change protocol to support error messages reported back from the server
  - VPNKit: fix a bug which causes a socket to leak if the corresponding TCP connection is idle
    for more than 5 minutes (related to docker/for-mac#1374)
  - VPNKit: improve the logging around the Unix domain socket connections
  - VPNKit: automatically trim whitespace from int or bool database keys
  - Diagnose can be cancelled & Improved help information. Fixes docker/for-mac#1134, docker/for-mac#1474
  - Support paging of docker-cloud repositories & orgs. Fixes docker/for-mac#1538

### Docker Community Edition 17.06.2-ce-mac27 2017-09-06

**Upgrades**

  - Docker 17.06.2-ce
  - Docker Machine 0.12.2

### Docker Community Edition 17.06.1-ce-mac24, 2017-08-21

**Upgrades**

- Docker 17.06.1-ce-rc1
- Linux Kernel 4.9.36
- AUFS 20170703

**Bug fixes and minor changes**

- DNS Fixes. Fixes docker/for-mac#1763, docker/for-mac#1811, docker/for-mac#1803

- Avoid unnecessary VM reboot (when changing proxy exclude, but no proxy set). Fixes docker/for-mac#1809, docker/for-mac#1801

### Docker Community Edition 17.06.0-ce-mac18, 2017-06-28s

**Upgrades**

- Docker 17.06.0-ce
- Docker Credential <example-value> 0.5.2
- Docker Machine 0.12.0
- Docker compose 1.14.0
- qcow-tool v0.10.0 (improve the performance of `compact`: mirage/ocaml-qcow#94)
- OSX Yosemite 10.10 is marked as deprecated
- Linux Kernel 4.9.31

**New**

- Integration with Docker Cloud: control remote Swarms from the local CLI and view your repositories.
- GUI Option to opt out of credential store
- GUI option to reset Docker data without losing all settings (fixes docker/for-mac#1309)
- Add an experimental DNS name for the host: `docker.for.mac.localhost`
- Support for client (i.e. "login") certificates for authenticating registry access (fixes docker/for-mac#1320)
- OSXFS: support for `cached` mount flag to improve performance of macOS mounts when strict consistency is not necessary

**Bug fixes and minor changes**

- Resync HTTP(S) proxy settings on application start
- Interpret system proxy setting of `localhost` correctly (see docker/for-mac#1511)
- All Docker binaries bundled with Docker for Mac are now signed
- Display all Docker Cloud organizations and repositories in the whale menu (fixes docker/for-mac#1538)
- OSXFS: improved latency for many common operations, such as read and write, by approximately 25%
- Fixed GUI crash when text table view was selected and windows re-opened (fixes docker/for-mac#1477)
- Reset to default / uninstall also remove `config.json` and `osxkeychain` credentials
- More detailed VirtualBox uninstall requirements ( docker/for-mac#1343)
- Request time sync after waking up to improve docker/for-mac#17
- VPNKit: Improved DNS timeout handling (fixes docker/for-mac#202)
- VPNKit: Use DNSServiceRef API by default (only enabled for new installs or after factory reset)
- Add a reset to factory defaults button when application crashes
- Toolbox import dialog now defaults to "Skip"
- Buffered data should be treated correctly when Docker client requests are upgraded to raw streams
- Removed an error message from the output related to experimental features handling
- `vmnetd` should not crash when user home directory is on an external drive
- Improved settings database schema handling
- Disk trimming should work as expected
- Diagnostics now contains more settings data

### Docker Community Edition 17.03.1-ce-mac12, 2017-05-12s

**Upgrades**

- Security fix for CVE-2017-7308

### Docker Community Edition 17.03.1-ce-mac5, 2017-03-29s

**Upgrades**

- Docker Credential <example-value> 0.4.2

### Docker Community Edition 17.03.0-ce-mac1, 2017-03-02- Renamed to Docker Community Edition

**New**

- Integration with Docker Cloud: control remote Swarms from the local CLI and view your repositories. This feature is going to be rolled out to all users progressively
- Docker will now securely store your IDs in the macOS keychain

**Upgrades**

- Docker 17.03.0-ce
- Docker Compose 1.11.2
- Docker Machine 0.10.0
- Linux kernel 4.9.12

**Bug fixes and minor changes**

- Allow to reset faulty daemon.json through a link in advanced subpanel
- More options when moving disk image
- Add link to experimental features
- Filesharing and daemon table empty fields are editable
- Hide restart button in settings window
- Fix bug where update window hides when app not focused
- Don't use port 4222 inside the Linux VM
- Add page_poison=1 to boot args
- Add a new disk flushing option
- DNS forwarder ignores responses from malfunctioning servers (docker/for-mac#1025)
- DNS forwarder send all queries in parallel, process results in order
- DNS forwarder includes servers with zones in general searches (docker/for-mac#997)
- Parses aliases from /etc/hosts (docker/for-mac#983)
- Can resolve DNS requests via servers listed in the /etc/resolver directory on the host
- Limit vCPUs to 64
- Fixed for swap not being mounted
- Fixed aufs xattr delete issue (docker/docker#30245)
- osxfs: Catch EPERM when reading extended attributes of non-files
- VPNKit: Fixed unmarshalling of DNS packets containing pointers to pointers to labels
- VPNKit: Set the Recursion Available bit on DNS responses from the cache
- VPNKit: Avoid diagnostics to capture too much data
- VPNKit: Fixed a source of occasional packet loss (truncation) on the virtual ethernet link
- HyperKit: Dump guest physical and linear address from VMCS when dumping state
- HyperKit: Kernel boots with panic=1 arg

### Docker for Mac 1.13.1, 2017-02-09s

**Upgrades**

- Docker 1.13.1
- Docker Compose 1.11.1
- Linux kernel 4.9.8

**Bug fixes and minor changes**

- Add link to experimental features
- New 1.13 cancellable operations should now be properly handled by the Docker for desktop
- `daemon.json` should render nicely in the UI
- Allow to reset faulty `daemon.json` through a link in advanced subpanel

### Docker for Mac 1.13.0, 2017-01-19s

**Upgrades**

- Docker 1.13.0
- Docker Compose 1.10
- Docker Machine 0.9.0
- Notary 0.4.3
- Linux kernel 4.9.4
- qcow-tool 0.7.2

**New**

- The storage location of the Linux volume can now be moved
- Reclaim disk size on reboot
- You can now edit filesharing paths
- Memory can be allocated with 256 MiB steps
- Proxy can now be completely disabled
- Support for arm, aarch64, ppc64le architectures using qemu
- Dedicated preference pane for advanced configuration of the
  docker daemon (edit `daemon.json`)
- Docker Experimental mode can be toggled
- Better support for Split DNS VPN configurations
- Use more DNS servers, respect order

**Bug fixes and minor changes**

- You cannot edit settings while docker is restarting
- Support Copy/Paste in About box
- Auto update polling every 24h
- Kernel boots with vsyscall=emulate arg and CONFIG_LEGACY_VSYSCALL is set to NONE in Moby
- Fixed vsock deadlock under heavy write load
- If you opt-out of analytics, you're prompted for approval before a bug report is sent
- Fixed bug where search domain could be read as `DomainName`
- Dedicated preference pane for HTTP proxy settings
- Dedicated preference pane for CPU & Memory computing resources
- Privacy settings moved to the general preference pane
- Fixed an issue where the preference pane disappeared when the welcome whale menu was closed
- HyperKit: code cleanup and minor fixes
- Improvements to Logging and Diagnostics
- osxfs: switch to libev/kqueue to improve latency
- VPNKit: improvements to DNS handling
- VPNKit: Improved diagnostics
- VPNKit: Forwarded UDP datagrams should have correct source port numbers
- VPNKit: add a local cache of DNS responses
- VPNKit: If one request fails, allow other concurrent requests to succeed.
  For example this allows IPv4 servers to work even if IPv6 is broken.
- VPNKit: Fix bug that could cause the connection tracking to
  underestimate the number of active connections

## Stable Releases of 2016

### Docker for Mac 1.12.5, 2016-12-20s

**Upgrades**

- Docker 1.12.5
- Docker Compose 1.9.0

### Skipped Docker for Mac 1.12.4

We did not distribute a 1.12.4 stable release

### Docker for Mac 1.12.3, 2016-11-09s

**Upgrades**

- Docker 1.12.3
- Linux Kernel 4.4.27
- Notary 0.4.2
- Docker Machine 0.8.2
- Docker Compose 1.8.1
- Kernel vsock driver v7
- aufs 20160912

**Bug fixes and minor changes**

**General**

- Fixed an issue where the whale animation during setting change was inconsistent

- Fixed an issue where some windows stayed hidden behind another app

- Fixed an issue where the Docker status would continue to be yellow/animated after the VM had started correctly

- Fixed an issue where Docker for Mac was incorrectly reported as updated

- Channel is now displayed in About box

- Crash reports are sent over Bugsnag rather than HockeyApp

- Fixed an issue where some windows did not claim focus correctly

- Added UI when switching channel to prevent user losing containers and settings

- Check disk capacity before Toolbox import

- Import certificates in `etc/ssl/certs/ca-certificates.crt`

- disk: make the "flush" behaviour configurable for database-like workloads. This works around a performance regression in 1.12.1.

**Networking**

- Proxy: Fixed application of system or custom proxy settings over container restart

- DNS: reduce the number of UDP sockets consumed on the host

- VPNkit: improve the connection-limiting code to avoid running out of sockets on the host

- UDP: handle diagrams bigger than 2035, up to the configured macOS kernel limit

- UDP: make the forwarding more robust; drop packets and continue rather than stopping

**File sharing**

- osxfs: Fixed the prohibition of chown on read-only or mode 0 files, (fixes
  docker/for-mac#117,
  docker/for-mac#263,
  docker/for-mac#633)

- osxfs: Fixed race causing some reads to run forever

- osxfs: Fixed a simultaneous volume mount race which can result in a crash

**Moby**

- Increase default ulimit for memlock (fixes docker/for-mac#801)

### Docker for Mac 1.12.1, 2016-09-16

**New**

* Support for macOS 10.12 Sierra

**Upgrades**

* Docker 1.12.1
* Docker machine 0.8.1
* Linux kernel 4.4.20
* aufs 20160905

**Bug fixes and minor changes**

**General**

* Fixed communications glitch when UI talks to com.docker.vmnetd
  Fixes docker/for-mac#90

* `docker-diagnose`: display and record the time the diagnosis was captured

* Don't compute the container folder in `com.docker.vmnetd`
  Fixes docker/for-mac#47

* Warn the user if BlueStacks is installed (potential kernel panic)

* Automatic update interval changed from 1 hour to 24 hours

* Include Zsh completions

* UI Fixes

**Networking**

* VPNKit supports search domains

* slirp: support up to 8 external DNS servers

* slirp: reduce the number of sockets used by UDP NAT, reduce the probability that NAT rules will time out earlier than expected

* Entries from `/etc/hosts` should now resolve from within containers

* Allow ports to be bound on host addresses other than `0.0.0.0` and `127.0.0.1`
  Fixes issue reported in
  docker/for-mac#68

* Use Mac System Configuration database to detect DNS

**File sharing (osxfs)**

* Fixed thread leak

* Fixed a malfunction of new directories that have the same name as an old directory that is still open

* Rename events now trigger DELETE and/or MODIFY `inotify` events
  (saving with TextEdit works now)

* Fixed an issue that caused `inotify` failure and crashes

* Fixed a directory file descriptor leak

* Fixed socket `chowns`

**Moby**

* Use default `sysfs` settings, transparent huge pages disabled

* `cgroup` mount to support `systemd` in containers

* Increase Moby `fs.file-max` to 524288

* Fixed Moby Diagnostics and Update Kernel

**HyperKit**

* HyperKit updated with `dtrace` support and lock fixes

### Docker for Mac 2016-08-11 1.12.0-afix release contains osxfs improvements.

The fixed issues may have
been seen as failures with apt-get and npm in containers, missed inotify
events or unexpected unmounts.

**Bug fixes**

* osxfs: fixed an issue causing access to children of renamed directories to fail (symptoms: npm failures, apt-get failures)

* osxfs: fixed an issue causing some ATTRIB and CREATE inotify events to fail delivery and other inotify events to stop

* osxfs: fixed an issue causing all inotify events to stop when an ancestor directory of a mounted directory was mounted

* osxfs: fixed an issue causing volumes mounted under other mounts to spontaneously unmount

### Docker for Mac 1.12.0, 2016-07-28table release

**Components**

* Docker 1.12.0
* Docker Machine 0.8.0
* Docker Compose 1.8.0
