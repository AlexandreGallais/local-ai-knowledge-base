---
title: "Release notes for previous versions (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/archive-windows.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Release notes for previous versions

This page contains release notes for older versions of Docker Desktop for Windows.

## Stable Releases of 2018

### Docker Community Edition 18.06.1-ce-win73 2018-08-29

* Upgrades
  - Docker 18.06.1-ce

* Bug fixes and minor changes
  - Fix bug in VM activity detection, preventing Docker Desktop from starting. Fixes docker/for-win#2404
  - Fix bug in detection when Windows service is not running, and propose to restart the service.
  - Fix local DNS failing to resolve inside containers. Fixes docker/for-win#2301, docker/for-win#2304
  - Fix Kubernetes status display after reset to factory default
  - Fix bug where `host.docker.internal` is not resolved in some cases. Fixes docker/for-win#2402
  - Use a 1MB vhdx blocksize instead of the default 32MB. See docker/for-win#244. Also see Microsoft Best Practices for running Linux on Hyper-V
  - Fix diagnostics in specific cases when the Windows service is not started.
  - Changed the samba default file permission to avoid an issue with too open rights. Fixes docker/for-win#2170
  - On RS5 insider, fixed wrong detection of missing feature "Containers" requiring you to install the feature and then reboot.

### Docker Community Edition 18.06.0-ce-win72 2018-07-26

* New
  - Renewed signing certificate. The installer may show a Windows Defender popup until the renewed certificate is allowlisted. Click "More info" to view the app is published by "Docker Inc" and run it.

* Bug fixes and minor changes
  - Fix bug in automatic feature enabling if "Hyper-V" and "Containers" Windows features are not enabled already when starting Docker Desktop.

### Docker Community Edition 18.06.0-ce-win70 2018-07-25

* Upgrades
  - Docker 18.06.0-ce
  - Docker Machine 0.15.0
  - Docker compose 1.22.0
  - LinuxKit v0.4
  - Linux Kernel 4.9.93 with CEPH, DRBD, RBD, MPLS_ROUTING and MPLS_IPTUNNEL enabled

* New
  - Kubernetes Support. You can now run a single-node Kubernetes cluster from the "Kubernetes" Pane in Docker for Windows settings and use kubectl commands as well as Docker commands. See the Kubernetes section

* Bug fixes and minor changes
  - AUFS storage driver is deprecated in Docker Desktop and AUFS support will be removed in the next major release. You can continue with AUFS in Docker Desktop 18.06.x, but you will need to reset the disk image (in Settings > Reset menu) before updating to the next major update. You can check documentation to save images and backup volumes
  - Fix bug which would in some cases cause virtual machine logs to be written to RAM rather than disk, and the virtual machine to hang.
  - Fix security issue with named pipe connection to docker service.
  - Fix VPNKit memory leak. Fixes docker/for-win#2087, moby/vpnkit#371
  - Fix restart issue when using Windows fast startup on latest 1709 Windows updates. Fixes docker/for-win#1741, docker/for-win#1741
  - DNS name `host.docker.internal` can be used for host resolution from Windows Containers.  Fixes docker/for-win#1976
  - Fix broken link in diagnostics window.
  - Added log rotation for docker-ce logs inside the virtual machine.
  - Changed smb permission to avoid issue when trying to manipulate files with different users in containers. Fixes docker/for-win#2170

### Docker Community Edition 18.03.1-ce-win65 2018-04-30

* Upgrades
  - Docker 18.03.1-ce
  - Docker compose 1.21.1
  - Notary 0.6.1

* Bug fixes and minor changes
  - Fix startup failure when the HOME environment variable is already defined (typically started from the command line). Fixes docker/for-win#1880
  - Fix startup failure due to incompatibility with other programs (like Razer Synapse 3). Fixes docker/for-win#1723

### Docker Community Edition 18.03.1-ce-win64 2018-04-26

* Upgrades
  - Docker 18.03.1-ce
  - Docker compose 1.21.0
  - Notary 0.6.1

* Bug fixes and minor changes
  - Fix startup failure when the HOME environment variable is already defined (typically started from the command line). Fixes docker/for-win#1880
  - Fix startup failure due to incompatibility with other programs (like Razer Synapse 3). Fixes docker/for-win#1723

### Docker Community Edition 18.03.0-ce-win59 2018-03-26

* Upgrades
  - Docker 18.03.0-ce
  - Docker Machine 0.14.0
  - Docker compose 1.20.1
  - Notary 0.6.0
  - Linux Kernel 4.9.87
  - AUFS 20180312

* New
  - Virtual machine disk size can be changed in settings. Fixes docker/for-win#105
  - Virtual machine swap size can be changed in settings.
  - New menu item to restart Docker.
  - Support NFS Volume sharing. See docker/for-win#1700
  - Allow to activate Windows Containers during installation (avoid virtual machine disk creation and virtual machine boot when working only on Windows containers). See docker/for-win#217.
  - Experimental feature: LCOW containers can now be run next to Windows containers (on Windows RS3 build 16299 and later). Use `--platform=linux` in Windows container mode to run Linux Containers On Windows. Note that LCOW is experimental; it requires the daemon `experimental` option.

* Bug fixes and minor changes
  - Fix Windows Containers port forwarding on Windows 10 build 16299 post KB4074588. Fixes docker/for-win#1707, docker/for-win#1737
  - Fix daemon not starting properly when setting TLS-related options.
  - DNS name `host.docker.internal` should be used for host resolution from containers. Older aliases (still valid) are deprecated in favor of this one. (See https://tools.ietf.org/html/draft-west-let-localhost-be-localhost-06).
  - Fix for the HTTP/S transparent proxy when using "localhost" names (for example, `host.docker.internal`). Fixes docker/for-win#1130
  - Fix Linuxkit start on Windows RS4 Insider. Fixes docker/for-win#1458, docker/for-win#1514, docker/for-win#1640
  - Fix risk of privilege escalation. (https://www.tenable.com/sc-report-templates/microsoft-windows-unquoted-service-path-vulnerability)
  - All users present in the docker-users group are now able to use Docker. Fixes docker/for-win#1732
  - Migration of Docker Toolbox images is not proposed in Docker For Windows installer (still possible to migrate Toolbox images manually).
  - Better cleanup for Windows containers and images on reset/uninstall. Fixes docker/for-win#1580, docker/for-win#1544, docker/for-win#191
  - Desktop icon creation is optional in installer; do not recreate Desktop icon on upgrade (effective on next upgrade). Fixes docker/for-win#246, docker/for-win#925, docker/for-win#1551

### Docker Community Edition 17.12.0-ce-win47 2018-01-12

* Bug fixes and minor changes
  - Fix linuxkit port-forwarder sometimes not being able to start. Fixes docker/for-win#1506
  - Fix certificate management when connecting to a private registry. Fixes docker/for-win#1512
  - Fix Mount compatibility when mounting drives with `-v //c/...`, now mounted in /host_mnt/c in the linuxkit virtual machine. Fixes docker/for-win#1509, docker/for-win#1516, docker/for-win#1497
  - Fix icon displaying edge. Fixes docker/for-win#1508

### Docker Community Edition 17.12.0-ce-win46 2018-01-09

* Upgrades
  - Docker 17.12.0-ce
  - Docker compose 1.18.0
  - Docker Machine 0.13.0
  - Linux Kernel 4.9.60

* New
  - Virtual machine entirely built with linuxkit
  - Add localhost port forwarder for Windows (thanks @simonferquel). Use Microsoft localhost port forwarder when it is available (insider build RS4).

* Bug fixes and minor changes
  - Display various component versions in About box.
  - Fix vpnkit issue when username has spaces. See docker/for-win#1429
  - Diagnostic improvements to get VM logs before VM shutdown.
  - Fix installer check for not supported Windows `CoreCountrySpecific` Edition.
  - Fix a class of startup failures where the database fails to start. See docker/for-win#498
  - Links in update changelog now open the default browser instead of IE. (fixes docker/for-win#1311)
