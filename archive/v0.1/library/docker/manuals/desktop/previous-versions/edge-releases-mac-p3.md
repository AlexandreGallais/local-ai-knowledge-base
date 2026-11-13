---
title: "Docker Desktop for Mac Edge release notes (part 3 of 8)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-mac.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Mac Edge release notes (part 3 of 8)

## Edge Releases of 2018

### Docker Community Edition 2.0.0.0-mac82 2018-12-07

- Upgrades
  - Docker compose 1.23.2
  - Docker Machine 0.16.0

### Docker Community Edition 2.0.0.0-mac77 2018-11-14

- Upgrades
  - Docker 18.09.0
  - Docker compose 1.23.1
  - Kitematic 0.17.5

- Bug fixes and minor changes
  - Fix appearance in dark mode for OS X 10.14 (Mojave)
  - VPNKit: Improved scalability of port forwarding. Related to docker/for-mac#2841
  - VPNKit: Limit the size of the UDP NAT table. This ensures port forwarding and regular TCP traffic continue even when running very chatty UDP protocols.
  - Ensure Kubernetes can be installed when using a non-default internal IP subnet.

### Docker Community Edition 2.0.0.0-beta1-mac75 2018-09-14

- Upgrades
  - Docker 18.09.0-ce-beta1
  - Linux Kernel 4.9.125

- New
  - New version scheme

- Deprecation
  - Removed support of AUFS
  - Removed support of OS X 10.11

- Bug fixes and minor changes
  - Fix panic in diagnose

### Docker Community Edition 18.06.1-ce-mac74 2018-08-29

- Upgrades
  - Docker 18.06.1-ce

- Bug fixes and minor changes
  - Fix local DNS failing to resolve inside containers.

### Docker Community Edition 18.06.0-ce-mac69 2018-07-25

- Upgrades
  - Docker 18.06.0-ce

- Bug fixes and minor changes
  - Fix bug in experimental SOCKS server. See docker/for-mac#2670
  - Fix bug in docker login when "Securely store Docker logins in macOS keychain" is unchecked. Fixed docker/for-mac#3104

### Docker Community Edition 18.06.0-ce-rc3-mac68 2018-07-19

- Upgrades
  - Docker 18.06.0-ce-rc3
  - Docker Machine 0.15.0
  - Docker compose 1.22.0

- New
  - Add an experimental SOCKS server to allow access to container networks, see docker/for-mac#2670. Also see docker/for-mac#2721

- Bug fixes and minor changes
  - AUFS storage driver is deprecated in Docker Desktop and AUFS support will be removed in the next major release. You can continue with AUFS in Docker Desktop 18.06.x, but you will need to reset disk image (in Preferences > Reset menu) before updating to the next major update. You can check documentation to save images and back up volumes
  - Fix startup issue with AUFS docker/for-mac#2804
  - Fix status bug which could prevent the Kubernetes cluster from starting. Fixes docker/for-mac#2990
  - Fix bug which would cause virtual machine logs to be written to RAM rather than disk in some cases, and the virtual machine to hang. See docker/for-mac#2984
  - Fix network connection leak triggered by haproxy TCP health-checks docker/for-mac#1132
  - Better message to reset vmnetd when it's disabled. See docker/for-mac#3035

### Docker Community Edition 18.05.0-ce-mac67 2018-06-07

- Upgrades
  - LinuxKit v0.4
  - Linux Kernel 4.9.93 with CEPH, DRBD, RBD, MPLS_ROUTING and MPLS_IPTUNNEL enabled
  - Kubernetes 1.10.3. If Kubernetes is enabled, the upgrade will be performed automatically when starting Docker Desktop for Mac.

- Bug fixes and minor changes
  - Fix VPNKit memory leak. Fixes moby/vpnkit#371
  - Fix com.docker.supervisor using 100% CPU. Fixes docker/for-mac#2967, docker/for-mac#2923
  - Do not override existing kubectl binary in /usr/local/bin (installed with brew or otherwise). Fixes docker/for-mac#2368, docker/for-mac#2890
  - Detect Vmnetd install error. Fixes docker/for-mac#2934, docker/for-mac#2687
  - Virtual machine default disk path is stored relative to $HOME. Fixes docker/for-mac#2928, docker/for-mac#1209

### Docker Community Edition 18.05.0-ce-mac66 2018-05-17

- Upgrades
  - Docker 18.05.0-ce
  - Docker compose 1.21.2

- New
  - Allow orchestrator selection from the UI in the "Kubernetes" pane, to allow "docker stack" commands to deploy to Swarm clusters, even if Kubernetes is enabled in Docker for Mac.

- Bug fixes and minor changes
  - Use Simple NTP to minimize clock drift between the virtual machine and the host. Fixes docker/for-mac#2076
  - Fix filesystem event notifications for Swarm services and those using the new-style --mount option. Fixes docker/for-mac#2216, docker/for-mac#2375
  - Fix filesystem event delivery to Kubernetes pods when the path to the bind mount is a symlink.
  - Fix a race between calling stat on a file and calling close of a file descriptor referencing the file that could result in the stat failing with EBADF (often presented as "File not found"). Fixes docker/for-mac#2870
  - Do not allow install of Docker for Mac on macOS Yosemite 10.10; this version has not been supported since Docker for Mac 17.09.0.
  - Fix button order in reset dialog windows. Fixes docker/for-mac#2827
  - Diagnostics are run when diagnostics window is displayed; user is prompted to upload them when available.

### Docker Community Edition 18.05.0-ce-rc1-mac63 2018-04-26

- Upgrades
  - Docker 18.05.0-ce-rc1
  - Notary 0.6.1

- New
  - Re-enable raw as the default disk format for users running macOS 10.13.4 and higher. Note this change only takes effect after a "reset to factory defaults" or "remove all data" (from the Whale menu > Preferences > Reset). Related to docker/for-mac#2625

- Bug fixes and minor changes
  - Fix Docker for Mac not starting due to socket file paths being too long (typically HOME folder path being too long). Fixes docker/for-mac#2727, docker/for-mac#2731.

### Docker Community Edition 18.04.0-ce-mac62 2018-04-12

- Upgrades
  - Docker 18.04.0-ce
  - Docker compose 1.21.0

### Docker Community Edition 18.04.0-ce-rc2-mac61 2018-04-09

- Upgrades
  - Docker 18.04.0-ce-rc2
  - Kubernetes 1.9.6. If Kubernetes is enabled, the upgrade will be performed automatically when starting Docker for Mac.

- New
  - Enable ceph & rbd modules in LinuxKit virtual machine.

- Bug fixes and minor changes
  - Fix upgrade straight from pre-17.12 versions where Docker for Mac cannot restart once the upgrade has been performed. Fixes docker/for-mac#2739

### Docker Community Edition 18.03.0-ce-mac58 2018-03-26

- Upgrades
  - Docker 18.03.0-ce
  - Docker compose 1.20.1

### Docker Community Edition 18.03.0-ce-rc4-mac57 2018-03-15

- Upgrades
  - Docker 18.03.0-ce-rc4
  - AUFS 20180312

- Bug fixes and minor changes
  - Fix support for AUFS. Fixes docker/for-win#1831
  - Fix synchronization between CLI `docker login` and GUI login.

### Docker Community Edition 18.03.0-ce-rc3-mac56 2018-03-13

- Upgrades
  - Docker 18.03.0-ce-rc3
  - Docker Machine 0.14.0
  - Docker compose 1.20.0-rc2
  - Notary 0.6.0
  - Linux Kernel 4.9.87

- Bug fixes and minor changes
  - Fix for the HTTP/S transparent proxy when using "localhost" names (for example "host.docker.internal", "docker.for.mac.host.internal", "docker.for.mac.localhost").
  - Fix daemon not starting properly when setting TLS-related options. Fixes docker/for-mac#2663

### Docker Community Edition 18.03.0-ce-rc1-mac54 2018-02-27

- Upgrades
  - Docker 18.03.0-ce-rc1

- New
  - Virtual machine Swap size can be changed in settings. See docker/for-mac#2566, docker/for-mac#2389
  - Support NFS Volume sharing. Also works in Kubernetes.

- Bug fixes and minor changes
  - Revert the default disk format to qcow2 for users running macOS 10.13 (High Sierra). There are confirmed reports of file corruption using the raw format which uses sparse files on APFS. This change only takes effect after a reset to factory defaults (from the Whale menu -> Preferences -> Reset). Related to docker/for-mac#2625
  - DNS name `host.docker.internal` should be used for host resolution from containers. Older aliases (still valid) are deprecated in favor of this one. (See https://tools.ietf.org/html/draft-west-let-localhost-be-localhost-06).
  - Kubernetes Load balanced services are no longer marked as `Pending`.
  - Fix hostPath mounts in Kubernetes.
  - Update Compose on Kubernetes to v0.3.0 rc4. Existing Kubernetes stacks will be removed during migration and need to be re-deployed on the cluster.

### Docker Community Edition 18.02.0-ce-mac53 2018-02-09

- Upgrades
  - Docker 18.02.0-ce
  - Docker compose 1.19.0

- Bug fixes and minor changes
  - Fix update startup failure in some cases.
  - Fix empty registry added by mistake in some cases in the Preference Daemon Pane. Fixes docker/for-mac#2537
  - Clearer error message when incompatible hardware is detected. Diagnostics are not proposed in the error popup in this case.

### Docker Community Edition 18.02.0-ce-rc2-mac51 2018-02-02

- Upgrades
  - Docker 18.02.0-ce-rc2
  - Docker compose 1.19.0-rc2
  - Kubernetes 1.9.2. If you have Kubernetes enabled, the upgrade will be performed automatically when starting Docker for Mac.

- Bug fixes and minor changes
  - Fix Kubernetes-compose integration update that was causing startup failure. Fixes docker/for-mac#2536
  - Fix some cases where selecting "Reset" after an error did not reset properly.
  - Fix incorrect NTP config. Fixes docker/for-mac#2529

### Docker Community Edition 18.02.0-ce-rc1-mac50 2018-01-26

- Upgrades
  - Docker 18.02.0-ce-rc1

- Bug fixes and minor changes
  - Added "Restart" menu item. See docker/for-mac#2407
  - Keep any existing kubectl binary when activating Kubernetes in Docker for Mac, and restore it when disabling Kubernetes. Fixes docker/for-mac#2508, docker/for-mac#2368
  - Fix Kubernetes context selector. Fixes docker/for-mac#2495

### Docker Community Edition 18.01.0-ce-mac48 2018-01-19

- Upgrades
  - Docker 18.01.0-ce
  - Linux Kernel 4.9.75

- New
  - The directory holding the disk images was renamed (from `~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux` to ~/Library/Containers/com.docker.docker/Data/vms/0`).

- Bug fixes and minor changes
  - Fix error during resize/create Docker.raw disk image in some cases. Fixes docker/for-mac#2383, docker/for-mac#2447, [docker/for-mac#2453], (https://github.com/docker/for-mac/issues/2453), docker/for-mac#2420
  - Fix additional allocated disk space not available in containers. Fixes docker/for-mac#2449
  - VPNkit port max idle time default restored to 300s. Fixes docker/for-mac#2442
  - Fix using an HTTP proxy with authentication. Fixes docker/for-mac#2386
  - Allow HTTP proxy excludes to be written as .docker.com as well as \*.docker.com
  - Allow individual IP addresses to be added to HTTP proxy excludes.
  - Avoid hitting DNS timeouts when querying docker.for.mac.\* when the upstream DNS servers are slow or missing.
  - Fix for `docker push` to an insecure registry. Fixes docker/for-mac#2392
  - Separate internal ports used to proxy HTTP and HTTPS content.
  - If kubectl was already installed before Docker For Mac, restore the existing kubectl when switching Kubernetes off in Docker for Mac.
  - Migration of Docker Toolbox images is not proposed anymore in Docker For Mac installer (still possible to migrate Toolbox images manually).

### Docker Community Edition 17.12.0-ce-mac45 2018-01-05

- Upgrades
  - Docker 17.12.0-ce

- New
  - Experimental Kubernetes Support. You can now run a single-node Kubernetes cluster from the "Kubernetes" Pane in Docker For Mac Preferences and use kubectl commands as well as docker commands. See the Kubernetes section
  - DNS name `docker.for.mac.host.internal` should be used instead of `docker.for.mac.localhost` (still valid) for host resolution from containers, since since there is an RFC banning the use of subdomains of localhost (See https://tools.ietf.org/html/draft-west-let-localhost-be-localhost-06).

- Bug fixes and minor changes
  - The docker engine is configured to use VPNKit as an HTTP proxy, fixing 'docker pull' in environments with no DNS. Fixes docker/for-mac#2320
