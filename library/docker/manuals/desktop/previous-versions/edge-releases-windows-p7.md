---
title: "Docker Desktop for Windows Edge Release notes (part 7 of 9)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-windows.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Windows Edge Release notes (part 7 of 9)

## Edge Releases of 2016
### Beta 34 Release Notes (2016-12-20 1.13.0-rc4-beta34)

**New**

- Basic UI for Daemon.json editing

**Upgrades**

- Docker 1.13.0-rc4
- Linux Kernel 4.8.15

**Bug fixes and minor changes**

- Improved Proxy UI
- Better diagnostics of Windows containers
- Default Experimental/Debug flags are now set on beta for Windows Containers
- Windows Containers Reset to default script improvements
- About Box is now Copy/Paste enabled

### Beta 33 Release Notes (2016-12-15 1.13.0-rc3-beta33)

> **Important:**
>
> Plugins installed using the experimental "managed plugins" feature in Docker 1.12 must be removed/uninstalled before upgrading.

**New**

- VHDX file containing images and non-host mounted volumes can be moved (using "advanced" tab in the UI)

**Upgrades**

- Linux Kernel 4.8.14

**Bug fixes and minor changes**

- Bugsnag reports should work again
- Fixed a memory leak related to logs and Windows Containers

### Beta 32.1 Release Notes (2016-12-09 1.13.0-rc3-beta32.1)

> **Important:**
>
> Plugins installed using the experimental "managed plugins" feature in Docker 1.12 must be removed/uninstalled before upgrading.

**Hotfixes**

- Fix Hyper-V Windows Feature detection

**New**

- Windows containers settings panel
- Windows containers: Restart from the settings panel
- Windows containers: Factory default
- Windows containers: Modify Daemon.json
- Windows containers: Proxy settings can be modified
- Support for arm, aarch64, ppc64le architectures using qemu

**Upgrades**

- Docker 1.13.0-rc3
- Docker Machine 0.9.0-rc2
- Linux Kernel 4.8.12

**Bug fixes and minor changes**

- Time drifts between Windows and Linux containers should disappear
- VPNKit: Improved diagnostics
- Improvements in drive sharing code
- Removed the legacy "Disable oplocks" trick for enabling Windows Containers on older insider previews

### Beta 32 Release Notes (2016-12-07 1.13.0-rc3-beta32)

> **Important:**
>
> Plugins installed using the experimental "managed plugins" feature in Docker 1.12 must be removed/uninstalled before upgrading.

**New**

- Windows containers settings panel and options are working. In previous releases, settings were not implemented for
Windows containers mode.
- Windows containers: Restart from the settings panel works
- Windows containers: Factory default
- Windows containers: `Daemon.json` can be modified
- Windows containers: Proxy settings can be modified
- Support for arm, aarch64, ppc64le architectures using qemu

**Upgrades**

- Docker 1.13.0-rc3
- Docker Machine 0.9.0-rc2
- Linux Kernel 4.8.12

**Bug fixes and minor changes**

- Time drifts between Windows and Linux containers should disappear
- VPNKit: Improved diagnostics
- Improvements in drive sharing code
- Removed the legacy "Disable oplocks" trick for enabling Windows Containers on older insider previews

### Beta 31 Release Notes (2016-12-01 1.13.0-rc2-beta31)

**New**

- HTTP/HTTPS proxy settings are used by the Windows Container daemon to pull images
- TRIM support for disk (shrinks virtual disk)
- Virtual machine's time synchronization is forced after the host wakes from sleep mode

**Upgrades**

- Docker 1.13.0-rc2
- Dockerd 1.13.0-rc2 (Windows Containers)
- Docker Compose 1.9.0
- Docker Machine 0.9.0-rc1
- Linux kernel 4.8.10

**Bug fixes and minor changes**

- VPNKit: don't permute resource records in responses
- VPNKit: reduced the amount of log spam
- Optimized boot process
- Diagnostics are improved and faster
- Log the error when the GUI fails to initialize
- Trend Micro Office Scan made the API proxy think no drive was shared, fixed
- Show a link to the virtualizaton documentation
- Flush logs to file more often
- Fixed the URL to the SMB/firewall documentation
- Properly remove duplicate firewall rules

### Beta 30 Release Notes (2016-11-10 1.12.3-beta30)

**Upgrades**

- Docker Compose 1.9.0-rc4
- Linux kernel 4.4.30

**Bug fixes and minor changes**

- Optimized disk on stop
- Always remove the disk on factory reset
- Improvements to Logging and Diagnostics

### Beta 29.3 Release Notes (2016-11-02 1.12.3-beta29.3)

**Upgrades**

- Docker Compose 1.9.0-rc2

### Beta 29.2 Release Notes (2016-10-27 1.12.2-beta29.2)

**Hotfixes**

- Upgrade to Docker 1.12.3

### Beta 29.1 Release Notes (2016-10-26 1.12.1-beta29.1)

**Hotfixes**

- Fixed missing `/dev/pty/ptmx`

### Beta 29 Release Notes (2016-10-25 1.12.3-rc1-beta29)

Windows Container support relies on the Windows 10 container feature, which is
**experimental** at this point.  Windows 10 Pro (1607, build number 14393)
requires update `KB3192366` (soon to be released through Windows Update) to fully
work. Some insider builds may not work.

**New**

- Restore the virtual machine's configuration when it was changed by the user
- Overlay2 is now the default storage driver. After a factory reset overlay2 is automatically used
- Detect firewall configuration that might block the file sharing
- Send more GUI usage statistics to help us improve the product

**Upgrades**

- Docker 1.12.3-rc1
- Linux Kernel 4.4.27

**Bug fixes and minor changes**

- Faster mount/unmount of shared drives
- Added a timeout to mounting/unmounting a shared drive
- Added the settings to the diagnostics
- Increase default ulimit for memlock (fixes https://github.com/docker/for-mac/issues/801)
- Make sure we don't use an older Nlog library from the GAC

### Beta 28 Release Notes (2016-10-13 1.12.2-rc3-beta28)

Windows Container support relies on the Windows 10 container feature, which is
**experimental** at this point.  Windows 10 Pro (1607, build number 14393)
requires update `KB3192366` (soon to be released through Windows Update) to fully
work. Some insider builds may not work.

**New**

- Path to HyperV disks in no longer hardcoded, making the Toolbox import work with non-standard path
- Verify that ALL HyperV features are enabled
- Make it clear why user cannot switch to Windows Containers with a tooltip in the systray
- Added Moby console to the logs
- Save the current engine with the other settings
- Notary version 0.4.2 installed

**Upgrades**

- Docker 1.12.2
- Kernel 4.4.24

**Bug fixes and minor changes**

- Fixed a password escaping regression
- Support writing large values to the database, especially for trusted CAs
- VPNKit is now restarted if it dies
- Make sure invalid "DockerNat" switches are not used
- Preserve the PowerShell stacktraces
- Write OS and Application versions at the top of each log file

### Beta 27 Release Notes (2016-09-28 1.12.2-rc1-beta27)

**New**

* Reworked the File Sharing dialog and underlying mechanism
* Pre-fill username
* Faster and more reliable feedback when the user/password is not valid
* Better support for domain users
* Error message in Logs when File Sharing failed for other reasons

**Upgrades**

* Docker 1.12.2-rc1
* Docker Machine 0.8.2
* Docker Compose 1.8.1
* Kernel 4.4.21
* AUFS 20160912

**Bug fixes and minor changes**

* Improve the switching between Linux and Windows containers: better errors, more reliable, deal with more edge cases
* Kill lingering dockerd that users might have still around because they played with Windows Containers before
* Don't recreate the virtual machine if only the DNS server is set
* The uninstaller now kills the service if it failed to stop it properly
* Restart VPNKit and DataKit when the processes die
* VPNKit: impose a connection limit to avoid exhausting file descriptors
* VPNKit: handle UDP datagrams larger than 2035 bytes
* VPNKit: reduce the number of file descriptors consumed by DNS
* Improve debug information

### Beta 26 Release Notes (2016-09-14 1.12.1-beta26)

**New**

* Basic support for Windows containers. On Windows 10 build >= 14372, a switch in the `systray` icon changes which daemon (Linux or Windows) the Docker CLI talks to

* To support trusted registry transparently, all trusted CAs (root or intermediate) on the Windows host are automatically copied to Moby

* `Reset Credentials` also unshares the shared drives

* Logs are now rotated every day

**Upgrades**

* Linux kernel 4.4.20
* AUFS 20160905

**Bug fixes and minor changes**

* We no longer send the same DNS settings twice to the daemon

* Fixed the lingering net adapters removal on Windows 10 Anniversary Update

* Uploading a diagnostic now shows a proper status message in the Settings

### Beta 25 Release (2016-09-07 1.12.1-beta25)

**New**

* Support multiple DNS servers

**Bug fixes and minor changes**

* Improved name servers discovery
* VPNKit supports search domains
* Set CIFS (common internet file system) version to 3.02

**Known issues**

* Only UTF-8 passwords are supported for host filesystem sharing

* Docker automatically disables lingering net adapters. The only way to remove them is manually using `devmgmt.msc`.

### Beta 24 Release (2016-08-23 1.12.1-beta24)

**Upgrades**

* Docker 1.12.1
* Docker Machine 0.8.1
* Linux kernel 4.4.19
* AUFS 20160822

**Bug fixes and minor changes**

* `slirp`: reduce the number of sockets used by UDP NAT, reduce the probability that NAT rules time out earlier than expected

**Known issues**

* Only UTF-8 passwords are supported for host filesystem sharing.

* Docker automatically disables lingering net adapters. The only way to remove them is manually using `devmgmt.msc`.

### Beta 23 Release (2016-08-16 1.12.1-rc1-beta23)

**New**

* Added `mfsymlinks` smb option to support symlinks on bind mounted folder
* Added `nobrl` smb option to support sqlite on bind mounted folders
* Detect outdated versions of Kitematic

**Upgrades**

* Docker 1.12.1-rc1
* Linux kernel 4.4.17
* AUFS 20160808

**Bug fixes and minor changes**

* Fixed password handling for host file system sharing
* Automatically disable lingering net adapters that prevent Docker from starting or using the network
* Automatically delete duplicated MobyLinuxVMs on a `reset to factory defaults`
* Docker stops asking to import from toolbox after an upgrade
* Docker can now import from toolbox just after Hyper-V is activated
* Fixed Moby Diagnostics and Update Kernel
* Added more debug information to the diagnostics
* Sending anonymous statistics shouldn't hang anymore when Mixpanel is not available
* Improved the Hyper-V detection and activation mechanism
* VPNKit is now compiled with OCaml 4.03 rather than 4.02.3
* Support newlines in release notes
* Improved error message when docker daemon is not responding
* The configuration database is now stored in-memory
* Preserve the stacktrace of PowerShell errors
* Display service stacktrace in error windows
* Moby: use default sysfs settings, transparent huge pages disabled
* Moby: cgroup mount to support systemd in containers

**Known issues**

* Only UTF-8 passwords are supported for host filesystem sharing
* Docker automatically disables lingering net adapters. The only way to remove them is manually using `devmgmt.msc`.

### Beta 22 Release (2016-08-11 1.12.0-beta22)

Unreleased. See Beta 23 for changes.

**Known issues**

* Docker automatically disables lingering net adapters. The only way to remove them is manually using `devmgmt.msc`.

### Beta 21 Release (2016-07-28 1.12.0-beta21)

**New**

* Docker for Windows is now available from two channels: **stable** and **beta**. New features and bug fixes go out first in auto-updates to users in the beta channel. Updates to the stable channel are much less frequent and happen in sync with major and minor releases of the Docker Engine. Only features that are well-tested and ready for production are added to the stable channel releases. For downloads of both and more information, see Install Docker Desktop on Windows.

* Removed the docker host name. Containers with exported ports are reachable via localhost.

* The UI shows whether the user is on beta or stable channel

**Upgrades**

* Docker 1.12.0 with experimental features
* Docker Machine 0.8.0
* Docker Compose 1.8.0

**Bug fixes and minor changes**

* Fixed networking issue when transmitting data to a container via an exposed port.
* Include the sources for qemu-img
* Fixed the migration from toolbox when the user has a space in its login
* Disable the migration from toolbox when hyperV is not yet activated
* More windows can be closed with ESC
* Added the channel to crash reports
* Fixed a path rewriting bug that happens on Windows insider build 14367
* Simplified the MobyLinux.ps1 script

**Known issues**

* Older Kitematic versions are not compatible with Docker for Windows. You need to manually delete the `C:\Program Files\Docker\Kitematic` folder before you click **Open Kitematic...** systray link.

### Beta 20 Release (2016-07-19 1.12.0-rc4-beta20)

**New**

* The UI option to disable port forwarding to `localhost` has been removed

**Bug fixes and minor changes**

* Fixed `docker.sock` permission issues
* Don't check for update when the settings panel opens
* Removed obsolete DNS workaround
* Use the secondary DNS server in more circumstances
* Limit the number of concurrent port forwards to avoid running out of resources
* Store the database as a "bare" git repo to avoid corruption problems

### Beta 19 Release (2016-07-14 1.12.0-rc4-beta19)

**New**

* Added an option to opt-out from sending usage statistics (only on the Edge channel for now)
* New error dialog box to upload crash reports

**Upgrades**

* Docker 1.12.0 RC4
* Docker Compose 1.8.0 RC2
* Docker Machine 0.8.0 RC2
* Linux kernel 4.4.15

**Bug fixes and minor changes**

* `com.docker.slirp`: included the DNS TCP fallback fix, required when UDP responses are truncated
* `docker build/events/logs/stats...` won't leak when interrupted with Ctrl-C
* Disable all buttons on Update Window when a version is downloading

### Beta 18.1 Release (2016-07-07 1.12.0-rc3-beta18.1)

> **Note:**
>
> Docker 1.12.0 RC3 release introduces a backward incompatible change from RC2. You can fix this by recreating or updating your containers.

**Hotfix**

* Fixed issue resulting in error "Hijack is incompatible with use of CloseNotifier", reverts previous fix for `Ctrl-C` during build.

**New**

* Forwarding the ports to localhost is now the default
* Added `http`/`https` proxy configuration to the settings
* The toolbox default machine can be imported on first launch
* Added UI when a crash report is collected and uploaded
* The check for update runs every 6 hours

**Upgrades**

* Docker 1.12.0 RC3

**Bug fixes and minor changes**

* The docker API proxy was failing to deal with 1.12 features (health check for, for example)
* When killing the virtual machine process, ignore when the process is already stopped
* When stopping the virtual machine, always stop the docker proxy
* Prevent the update windows from downloading the `.msi` into `C:\Program Files\Docker`
* All settings should be disabled when Docker is starting. (This regression was introduced in Beta 17)
* VPNKit: Improved scalability as number of network connections increases
* Improve the connection to the database
* Ignore when the shutdown service is not available
