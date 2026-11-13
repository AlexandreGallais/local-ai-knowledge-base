---
title: "Release notes for previous versions (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/archive-mac.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Release notes for previous versions

This page contains release notes for older versions of Docker Desktop for Mac.

## Stable Releases of 2018

### Docker Community Edition 18.06.1-ce-mac73 2018-08-29

* Upgrades
  - Docker 18.06.1-ce

* Bug fixes and minor changes
  - Fix local DNS failing to resolve inside containers.

### Docker Community Edition 18.06.0-ce-mac70 2018-07-25

* Upgrades
  - Docker 18.06.0-ce
  - Docker Machine 0.15.0
  - Docker compose 1.22.0
  - LinuxKit v0.5
  - Linux Kernel 4.9.93 with CEPH, DRBD, RBD, MPLS_ROUTING and MPLS_IPTUNNEL enabled

* New
  - Kubernetes Support. You can now run a single-node Kubernetes cluster from the "Kubernetes" Pane in Docker For Mac Preferences and use kubectl commands as well as docker commands. See the Kubernetes section
  - Add an experimental SOCKS server to allow access to container networks, see docker/for-mac#2670. Also see docker/for-mac#2721
  - Re-enable raw as the default disk format for users running macOS 10.13.4 and higher. Note this change only takes effect after a "reset to factory defaults" or "remove all data" (from the Whale menu -> Preferences -> Reset). Related to docker/for-mac#2625

* Bug fixes and minor changes
  - AUFS storage driver is deprecated in Docker Desktop and AUFS support will be removed in the next major release. You can continue with AUFS in Docker Desktop 18.06.x, but you will need to reset disk image (in Preferences > Reset menu) before updating to the next major update. You can check documentation to save images and back up volumes
  - OS X El Captain 10.11 is deprecated in Docker Desktop. You will not be able to install updates after Docker Desktop 18.06.x. We recommend upgrading to the latest version of macOS.
  - Fix bug which would cause VM logs to be written to RAM rather than disk in some cases, and the VM to hang. See docker/for-mac#2984
  - Fix network connection leak triggered by haproxy TCP health-checks docker/for-mac#1132
  - Better message to reset vmnetd when it's disabled. See docker/for-mac#3035
  - Fix VPNKit memory leak. Fixes moby/vpnkit#371
  - Virtual Machine default disk path is stored relative to $HOME. Fixes docker/for-mac#2928, docker/for-mac#1209
  - Use Simple NTP to minimise clock drift between the VM and the host. Fixes docker/for-mac#2076
  - Fix a race between calling stat on a file and calling close of a file descriptor referencing the file that could result in the stat failing with EBADF (often presented as "File not found"). Fixes docker/for-mac#2870
  - Do not allow install of Docker for Mac on macOS Yosemite 10.10, this version is not supported since Docker for Mac 17.09.0.
  - Fix button order in reset dialog windows. Fixes docker/for-mac#2827
  - Fix upgrade straight from pre-17.12 versions where Docker for Mac cannot restart once the upgrade has been performed. Fixes docker/for-mac#2739
  - Added log rotation for docker-ce logs inside the virtual machine.

### Docker Community Edition 18.03.1-ce-mac65 2018-04-30

* Upgrades
  - Docker 18.03.1-ce
  - Docker compose 1.21.1
  - Notary 0.6.1

* Bug fixes and minor changes
  - Fix Docker for Mac not starting due to socket file paths being too long (typically HOME folder path being too long). Fixes docker/for-mac#2727, docker/for-mac#2731.

### Docker Community Edition 18.03.1-ce-mac64 2018-04-26

* Upgrades
  - Docker 18.03.1-ce
  - Docker compose 1.21.0
  - Notary 0.6.1

* Bug fixes and minor changes
  - Fix Docker for Mac not starting due to socket file paths being too long (typically HOME folder path being too long). Fixes docker/for-mac#2727, docker/for-mac#2731.

### Docker Community Edition 18.03.0-ce-mac60 2018-03-30

* Bug fixes and minor changes
  - Fix Upgrade straight from 17.09 versions where Docker for Mac cannot restart once the upgrade has been performed. Fixes docker/for-mac#2739

### Docker Community Edition 18.03.0-ce-mac59 2018-03-26

* Upgrades
  - Docker 18.03.0-ce
  - Docker Machine 0.14.0
  - Docker compose 1.20.1
  - Notary 0.6.0
  - Linux Kernel 4.9.87
  - AUFS 20180312

* New
  - VM Swap size can be changed in settings. See docker/for-mac#2566, docker/for-mac#2389
  - New menu item to restart Docker.
  - Support NFS Volume sharing.
  - The directory holding the disk images has been renamed (from `~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux` to ~/Library/Containers/com.docker.docker/Data/vms/0`).

* Bug fixes and minor changes
  - Fix daemon not starting properly when setting TLS-related options. Fixes docker/for-mac#2663
  - DNS name `host.docker.internal` should be used for host resolution from containers. Older aliases (still valid) are deprecated in favor of this one. (See https://tools.ietf.org/html/draft-west-let-localhost-be-localhost-06).
  - Fix for the HTTP/S transparent proxy when using "localhost" names (e.g. `host.docker.internal`).
  - Fix empty registry added by mistake in some cases in the Preference Daemon Pane. Fixes docker/for-mac#2537
  - Clearer error message when incompatible hardware is detected.
  - Fix some cases where selecting "Reset" after an error did not reset properly.
  - Fix incorrect NTP config. Fixes docker/for-mac#2529
  - Migration of Docker Toolbox images is not proposed anymore in Docker For Mac installer (still possible to migrate Toolbox images manually).

### Docker Community Edition 17.12.0-ce-mac55 2018-02-27

* Bug fixes and minor changes
  - Revert the default disk format to qcow2 for users running macOS 10.13 (High Sierra). There are confirmed reports of file corruption using the raw format which uses sparse files on APFS. Note this change only takes effect after a reset to factory defaults (from the Whale menu -> Preferences -> Reset). Related to docker/for-mac#2625
  - Fix VPNKit proxy for docker.for.mac.http.internal.

### Docker Community Edition 17.12.0-ce-mac49 2018-01-19

* Bug fixes and minor changes
  - Fix error during resize/create Docker.raw disk image in some cases. Fixes docker/for-mac#2383, docker/for-mac#2447, [docker/for-mac#2453], (https://github.com/docker/for-mac/issues/2453), docker/for-mac#2420
  - Fix additional allocated disk space not available in containers. Fixes docker/for-mac#2449
  - Vpnkit port max idle time default restored to 300s. Fixes docker/for-mac#2442
  - Fix using an HTTP proxy with authentication. Fixes docker/for-mac#2386
  - Allow HTTP proxy excludes to be written as .docker.com as well as *.docker.com
  - Allow individual IP addresses to be added to HTTP proxy excludes.
  - Avoid hitting DNS timeouts when querying docker.for.mac.* when the upstream DNS servers are slow or missing.

### Docker Community Edition 17.12.0-ce-mac47 2018-01-12

* Bug fixes and minor changes
  - Fix for `docker push` to an insecure registry. Fixes docker/for-mac#2392
  - Separate internal ports used to proxy HTTP and HTTPS content.

### Docker Community Edition 17.12.0-ce-mac46 2018-01-09

* Upgrades
  - Docker 17.12.0-ce
  - Docker compose 1.18.0
  - Docker Machine 0.13.0
  - Linux Kernel 4.9.60

* New
  - VM entirely built with Linuxkit
  - VM disk size can be changed in disk preferences. (See docker/for-mac#1037)
  - For systems running APFS on SSD on High Sierra, use `raw` format VM disks by default. This improves disk throughput (from 320MiB/sec to 600MiB/sec in `dd` on a 2015 MacBook Pro) and disk space handling.
    Existing disks are kept in qcow format, if you want to switch to raw format you need to "Remove all data" or "Reset to factory defaults".
  - DNS name `docker.for.mac.host.internal` should be used instead of `docker.for.mac.localhost` (still valid) for host resolution from containers, since since there is an RFC banning the use of subdomains of localhost. See  https://tools.ietf.org/html/draft-west-let-localhost-be-localhost-06.

* Bug fixes and minor changes
  - Display various component versions in About box.
  - Avoid VM reboot when changing host proxy settings.
  - Don't break HTTP traffic between containers by forwarding them via the external proxy. (See docker/for-mac#981)
  - Filesharing settings are now stored in settings.json.
  - Daemon restart button has been moved to settings / Reset Tab.
  - Better VM state handling & error messages in case of VM crashes.
  - Fix login into private repository with certificate issue. (See docker/for-mac#2201)
