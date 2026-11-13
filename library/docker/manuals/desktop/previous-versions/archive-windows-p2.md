---
title: "Release notes for previous versions (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/archive-windows.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Release notes for previous versions (part 2 of 2)

## Stable Releases of 2017

### Docker Community Edition 17.09.1-ce-win42 2017-12-11

* Upgrades
  - Docker 17.09.1-ce
  - Docker compose 1.17.1
  - Docker Machine 0.13.0

* Bug fixes and minor changes
  - Fix bug during Windows fast-startup process. Fixes for-win/#953
  - Fix uninstaller issue (in some specific cases dockerd process was not killed properly)
  - Fix Net Promoter Score Gui bug. Fixes for-win/#1277
  - Fix `docker.for.win.localhost` not working in proxy settings. Fixes for-win/#1130
  - Increased timeout for virtual machine boot startup to 2 minutes.

### Docker Community Edition 17.09.0-ce-win33 2017-10-06

* Bug fixes
  - Fix Docker For Windows unable to start in some cases: removed use of libgmp sometimes causing the vpnkit process to die.

### Docker Community Edition 17.09.0-ce-win32 2017-10-02

* Upgrades
  - Docker 17.09.0-ce
  - Docker Compose 1.16.1
  - Docker Machine 0.12.2
  - Docker Credential <example-value> 0.6.0
  - Linux Kernel 4.9.49
  - AUFS 20170911

* New
  - Windows Docker daemon is now started as service for better lifecycle management
  - Store Linux daemon configuration in ~\.docker\daemon.json instead of settings file
  - Store Windows daemon configuration in C:\ProgramData\Docker\config\daemon.json instead of settings file
  - VPNKit: add support for ping!
  - VPNKit: add slirp/port-max-idle-timeout to allow the timeout to be adjusted or even disabled
  - VPNKit: bridge mode is default everywhere now
  - Add `Skip This Version` button in update window

* Security fixes
  - VPNKit: security fix to reduce the risk of DNS cache poisoning attack (reported by Hannes Mehnert https://hannes.nqsb.io/)

* Bug fixes and minor changes
  - Kernel: Enable TASK_XACCT and TASK_IO_ACCOUNTING
  - Rotate logs in the virtual machine more often (docker/for-win#244)
  - Reset to default stops all engines and removes settings including all daemon.json files
  - Better backend service checks (related to https://github.com/docker/for-win/issues/953)
  - Fix auto updates checkbox, no need to restart the application
  - Fix check for updates menu when auto updates was disable
  - VPNKit: do not block startup when ICMP permission is denied. (Fixes docker/for-win#1036, docker/for-win#1035, docker/for-win#1040)
  - VPNKit: change protocol to support error messages reported back from the server
  - VPNKit: fix a bug which causes a socket to leak if the corresponding TCP connection is idle
    for more than 5 minutes (related to docker/for-mac#1374)
  - VPNKit: improve the logging around the UNIX domain socket connections
  - VPNKit: automatically trim whitespace from int or bool database keys
  - Do not move credentials into the credential store at startup

### Docker Community Edition 17.06.2-ce-win27 2017-09-06

* Upgrades
  - Docker 17.06.2-ce
  - Docker Machine 0.12.2

### Docker Community Edition 17.06.1-ce-rc1-win24 2017-08-24

**Upgrades**

- Docker 17.06.1-ce-rc1
- Linux Kernel 4.9.36
- AUFS 20170703

**Bug fixes and minor**

- Fix locked container id file (Fixes docker/for-win#818)
- Avoid expanding variables in PATH env variable (Fixes docker/for-win#859)

### Docker Community Edition 17.06.0-ce-win18 2017-06-28

**Upgrades**

- Docker 17.06.0-ce
- Docker Credential <example-value> 0.5.2
- Docker Machine 0.12.0
- Docker compose 1.14.0
- Linux Kernel 4.9.31

**New**

- Windows Server 2016 support
- Windows 10586 is marked as deprecated; it is not supported going forward in stable releases
- Integration with Docker Cloud, with the ability to control remote Swarms from the local command line interface (CLI) and view your repositories
- Unified login between the Docker CLI and Docker Hub, Docker Cloud.
- Sharing a drive can be done on demand, the first time a mount is requested
- Add an experimental DNS name for the host: docker.for.win.localhost
- Support for client (i.e. "login") certificates for authenticating registry access (fixes docker/for-win#569)
- New installer experience

**Bug fixes and minor changes**

- Fixed group access check for users logged in with Active Directory (fixes docker/for-win#785)
- Checked environment variables and add some warnings in logs if they can cause docker to fail
- Many processes that were running in admin mode now run within the user identity
- Cloud federation command lines now open in the user home directory
- Named pipes are now created with more constrained security descriptors to improve security
- Security fix: Users must be part of the specific group "docker-users" to run Docker for Windows
- Reset to default / uninstall also reset Docker cli settings and logout user from Docker Cloud and registries
- Detected a bitlocker policy preventing windows containers to work
- Fixed an issue on filesharing when explicitly disabled on vmswitch interface
- Fixed virtual machine not starting when the machine had a very long name
- Fixed a bug where Windows daemon.json file was not written (fixes docker/for-win#670)
- Added patches to the kernel to fix VMBus crash
- Named pipe client connection should not trigger dead locks on `docker run` with data in stdin any more
- Buffered data should be treated correctly when docker client requests are upgraded to raw streams

### Docker Community Edition 17.03.1-ce-win12  2017-05-12

**Upgrades**

- Security fix for CVE-2017-7308

### Docker Community Edition 17.03.0, 2017-03-02

**New**

- Renamed to Docker Community Edition
- Integration with Docker Cloud: control remote Swarms from the local CLI and view your repositories. This feature is going to be rolled out to all users
  progressively

**Upgrades**

- Docker 17.03.0-ce
- Docker Compose 1.11.2
- Docker Machine 0.10.0
- Linux kernel 4.9.12

**Bug fixes and minor changes**

- Matched Hyper-V Integration Services by ID, not name
- Don't consume 100% CPU when the service is stopped
- Log the diagnostic id when uploading
- Improved firewall handling: stop listing the rules since it can take a lot of time
- Don't rollback to the previous engine when the desired engine fails to start
- Don't use port 4222 inside the Linux virtual machine
- Fixed startup error of ObjectNotFound in Set-VMFirmware
- Added detailed logs when firewall is configured
- Added a link to the Experimental Features documentation
- Fixed the copyright in the About dialog
- VPNKit: fix unmarshalling of DNS packets containing pointers to pointers to labels
- VPNKit: set the Recursion Available bit on DNS responses from the cache
- VPNKit: Avoid diagnostics to capture too much data
- VPNKit: fix a source of occasional packet loss (truncation) on the virtual ethernet link
- Fixed negotiation of TimeSync protocol version (through kernel update)

### Docker for Windows 1.13.1, 2017-02-09

- Docker 1.13.1
- Docker Compose 1.11.1
- Linux kernel 4.9.8

**Bug fixes and minor changes**

- Add link to experimental features
- New 1.13 cancellable operations should now be properly handled by the Docker for desktop
- Various typos fixes
- Fix in Hyper-V VM setup (should fix `ObjectNotFound` errors)

### Docker for Windows 1.13.0, 2017-01-19
- Docker 1.13.0
- Docker Compose 1.10
- Docker Machine 0.9.0
- Notary 0.4.3
- Linux kernel 4.9.4

**New**

- Windows containers
- Improved UI for Daemon.json editing
- VHDX file containing images and non-host mounted volumes can be moved
  (using "advanced" tab in the UI)
- Support for arm, aarch64, ppc64le architectures using qemu
- TRIM support for disk (shrinks virtual disk)
- Virtual machine's time synchronization is forced after the host wakes from sleep mode
- Docker Experimental mode can be toggled

**Bug fixes and minor changes**

- Improved Proxy UI
- Improvements to Logging and Diagnostics
- About Box is now copy/paste enabled
- Improvements in drive sharing code
- Optimized boot process
- Trend Micro Office Scan made the API proxy think no drive was shared
- Show a link to the virtualization documentation
- Always remove the disk on factory reset
- VPNKit: Improved diagnostics
- VPNKit: Forwarded UDP datagrams have correct source port numbers
- VPNKit: If one request fails, allow other concurrent requests to succeed.
  For example this allows IPv4 servers to work even if IPv6 is broken.
- VPNKit: Fix bug which could cause the connection tracking to
  underestimate the number of active connections
- VPNKit: add a local cache of DNS responses

## Stable Releases of 2016

### Docker for Windows 1.12.5, 2016-12-20
- Docker 1.12.5
- Docker Compose 1.9.0

### Skipped Docker for Windows 1.12.4

We did not distribute a 1.12.4 stable release

### Docker for Windows 1.12.3, 2016-11-09

**New**

- Restore the virtual machine's configuration after user changes

- Detect firewall configurations that might block file sharing

- Send more GUI usage statistics to help us improve the product

- The path to HyperV disks is not hardcoded anymore, making the Toolbox import work with non-standard paths

- Verify that all HyperV features are enabled

- Added Moby console to the logs

- Save the current engine with the other settings

- Notary version 0.4.2 installed

- Reworked the File Sharing dialog and underlying mechanism
  - Pre-fill username
  - Faster and more reliable feedback when the user/password is not valid
  - Better support for domain users
  - Error message in Logs when File Sharing failed for other reasons

**Upgrades**

- Docker 1.12.3
- Linux Kernel 4.4.27
- Docker Machine 0.8.2
- Docker Compose 1.8.1
- aufs 20160912

**Bug fixes and minor changes**

**General**

- Added the settings to the diagnostics

- Made sure we didn't use an older Nlog library from the GAC

- Fixed a password <example-value> regression

- Supports writing large values to the database, specially for trusted CAs

- Preserves the Powershell stacktraces

- Writes OS and Application versions at the top of each log file

- Don't recreate the virtual machine if only the DNS server is set

- The uninstaller now kills the service if it failed to stop it properly

- Improved debug information

**Networking**

- VpnKit is now restarted if it stops

- VpnKit: impose a connection limit to avoid exhausting file descriptors

- VpnKit: handle UDP datagrams larger than 2035 bytes

- VpnKit: reduce the number of file descriptors consumed by DNS

**File sharing**

- Faster mount/unmount of shared drives

- Added a timeout to mounting/unmounting a shared drive

**Hyper-V**

- Make sure invalid "DockerNat" switches are not used

**Moby**

- Increase default ulimit for memlock (fixes https://github.com/docker/for-mac/issues/801)

### Docker for Windows 1.12.1, 2016-09-16

**New**

* To support trusted registry transparently, all trusted CAs (root or intermediate) on the Windows host are automatically copied to Moby

* `Reset Credentials` also unshares the shared drives

* Logs are now rotated every day

* Support multiple DNS servers

* Added `mfsymlinks` SMB option to support symlinks on bind mounted folder

* Added `nobrl` SMB option to support `sqlite` on bind mounted folders

* Detect outdated versions of Kitematic

**Upgrades**

* Docker 1.12.1
* Docker machine 0.8.1
* Linux kernel 4.4.20
* aufs 20160905

**Bug fixes and minor changes**

**General**

* Uploading a diagnostic now shows a proper status message in the Settings

* Docker stops asking to import from the Toolbox after an upgrade

* Docker can now import from the Toolbox just after HyperV is activated

* Added more debug information to the diagnostics

* Sending anonymous statistics doesn't hang anymore when Mixpanel is not available

* Support newlines in release notes

* Improve the error message when the Docker daemon is not responding

* The configuration database is now stored in memory

* Preserve the stacktrace of PowerShell errors

* Display service stacktrace in error windows

**Networking**

* Improve name servers discovery
* VpnKit supports search domains
* VpnKit is now compiled with OCaml 4.03 rather than 4.02.3

**File sharing**

* Set `cifs` version to 3.02

* VnpKit: reduce the number of sockets used by UDP NAT, reduce the probability

* `slirp`: reduce the number of sockets used by UDP NAT, reduce the probability that NAT rules time out earlier than expected

* Fixed password <example-value> for host file system sharing

**Hyper-V**

* Automatically disable lingering net adapters that prevent Docker from starting or using the network

* Automatically delete duplicated MobyLinuxVMs on a `reset to factory defaults`

* Improved the HyperV detection and activation mechanism

**Moby**

* Fixed Moby Diagnostics and Update Kernel

* Use default `sysfs` settings, transparent huge pages disabled

* `Cgroup` mount to support `systemd` in containers

**Known issues**

* Docker automatically disables lingering net adapters. The only way to remove them is manually using `devmgmt.msc`.

### Docker for Windows 1.12.0, 2016-07-28

- First stable release

**Components**

* Docker 1.12.0
* Docker Machine 0.8.0
* Docker Compose 1.8.0
