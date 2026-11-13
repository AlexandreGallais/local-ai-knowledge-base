---
title: "Docker Desktop release notes (part 21 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 21 of 21)

## 4.3.0

### Upgrades

- Docker Engine v20.10.11
- containerd v1.4.12
- Buildx 0.7.1
- Compose v2.2.1
- Kubernetes 1.22.4
- Docker Hub Tool v0.4.4
- Go 1.17.3

### Bug fixes and minor changes

#### For all platforms

- Added a self-diagnose warning if the host lacks Internet connectivity.
- Fixed an issue which prevented users from saving files from a volume using the Save As option in the Volumes UI. Fixes docker/for-win#12407.
- Docker Desktop now uses cgroupv2. If you need to run `systemd` in a container then:
  - Ensure your version of `systemd` supports cgroupv2. It must be at least `systemd` 247. Consider upgrading any `centos:7` images to `centos:8`.
  - Containers running `systemd` need the following options: `--privileged --cgroupns=host -v /sys/fs/cgroup:/sys/fs/cgroup:rw`.

#### For Mac

- Docker Desktop on Apple silicon no longer requires Rosetta 2, with the exception of three optional command line tools.

#### For Windows

- Fixed an issue that caused Docker Desktop to fail during startup if the home directory path contains a character used in regular expressions. Fixes docker/for-win#12374.

### Known issue

Docker Desktop Dashboard incorrectly displays the container memory usage as zero on
Hyper-V based machines.
You can use the `docker stats`
command on the command line as a workaround to view the
actual memory usage. See
docker/for-mac#6076.

### Deprecation

- The following internal DNS names are deprecated and will be removed from a future release: `docker-for-desktop`, `docker-desktop`, `docker.for.mac.host.internal`, `docker.for.mac.localhost`, `docker.for.mac.gateway.internal`. You must now use `host.docker.internal`, `vm.docker.internal`, and `gateway.docker.internal`.
- Removed: Custom RBAC rules have been removed from Docker Desktop as it gives `cluster-admin` privileges to all Service Accounts. Fixes docker/for-mac/#4774.

## 4.2.0

### New

**Pause/Resume**: You can now pause your Docker Desktop session when you are not actively using it and save CPU resources on your machine.

- Ships Docker Public Roadmap#226

**Software Updates**: The option to turn off automatic check for updates is now available for users on all Docker subscriptions, including Docker Personal and Docker Pro. All update-related settings have been moved to the **Software Updates** section.

- Ships Docker Public Roadmap#228

**Window management**: The Docker Desktop Dashboard window size and position persists when you close and reopen Docker Desktop.

### Upgrades

- Docker Engine v20.10.10
- containerd v1.4.11
- runc v1.0.2
- Go 1.17.2
- Compose v2.1.1
- docker-scan 0.9.0

### Bug fixes and minor changes

#### For all platforms

- Improved: Self-diagnose now also checks for overlap between host IPs and `docker networks`.
- Fixed the position of the indicator that displays the availability of an update on the Docker Desktop Dashboard.

#### For Mac

- Fixed an issue that caused Docker Desktop to stop responding upon clicking **Exit** on the fatal error dialog.
- Fixed a rare startup failure affecting users having a `docker volume` bind-mounted on top of a directory from the host. If existing, this fix will also remove manually user added `DENY DELETE` ACL entries on the corresponding host directory.
- Fixed a bug where a `Docker.qcow2` file would be ignored on upgrade and a fresh `Docker.raw` used instead, resulting in containers and images disappearing. Note that if a system has both files (due to the previous bug) then the most recently modified file will be used, to avoid recent containers and images disappearing again. To force the use of the old `Docker.qcow2`, delete the newer `Docker.raw` file. Fixes docker/for-mac#5998.
- Fixed a bug where subprocesses could fail unexpectedly during shutdown, triggering an unexpected fatal error popup. Fixes docker/for-mac#5834.

#### For Windows

- Fixed Docker Desktop sometimes hanging when clicking Exit in the fatal error dialog.
- Fixed an issue that frequently displayed the **Download update** popup when an update has been downloaded but hasn't been applied yet docker/for-win#12188.
- Fixed installing a new update killing the application before it has time to shut down.
- Fixed: Installation of Docker Desktop now works even with group policies preventing users to start prerequisite services (e.g. LanmanServer) docker/for-win#12291.

## 4.1.1

### Bug fixes and minor changes

#### For Mac

> When upgrading from 4.1.0, the Docker menu does not change to **Update and restart** so you can just wait for the download to complete (icon changes) and then select **Restart**. This bug is fixed in 4.1.1, for future upgrades.

- Fixed a bug where a `Docker.qcow2` file would be ignored on upgrade and a fresh `Docker.raw` used instead, resulting in containers and images disappearing. If a system has both files (due to the previous bug), then the most recently modified file will be used to avoid recent containers and images disappearing again. To force the use of the old `Docker.qcow2`, delete the newer `Docker.raw` file. Fixes docker/for-mac#5998.
- Fixed the update notification overlay sometimes getting out of sync between the **Settings** button and the **Software update** button in the Docker Desktop Dashboard.
- Fixed the menu entry to install a newly downloaded Docker Desktop update. When an update is ready to install, the **Restart** option changes to **Update and restart**.

#### For Windows

- Fixed a regression in WSL 2 integrations for some distributions (e.g. Arch or Alpine). Fixes docker/for-win#12229
- Fixed update notification overlay sometimes getting out of sync between the Settings button and the Software update button in the Dashboard.

## 4.1.0

### New

- **Software Updates**: The Settings tab now includes a new section to help you manage Docker Desktop updates. The **Software Updates** section notifies you whenever there's a new update and allows you to download the update or view information on what's included in the newer version.
- **Compose V2** You can now specify whether to use Docker Compose V2 in the General settings.
- **Volume Management**: Volume management is now available for users on any subscription, including Docker Personal. Ships Docker Public Roadmap#215

### Upgrades

- Compose V2
- Buildx 0.6.3
- Kubernetes 1.21.5
- Go 1.17.1
- Alpine 3.14
- Qemu 6.1.0
- Base distribution to debian:bullseye

### Bug fixes and minor changes

#### For Windows

- Fixed a bug related to anti-malware software triggering, self-diagnose avoids calling the `net.exe` utility.
- Fixed filesystem corruption in the WSL 2 Linux VM in self-diagnose. This can be caused by microsoft/WSL#5895.
- Fixed `SeSecurityPrivilege` requirement issue. See docker/for-win#12037.
- Fixed CLI context switch sync with UI. See docker/for-win#11721.
- Added the key `vpnKitMaxPortIdleTime` to `settings.json` to allow the idle network connection timeout to be disabled or extended.
- Fixed a crash on exit. See docker/for-win#12128.
- Fixed a bug where the CLI tools would not be available in WSL 2 distributions.
- Fixed switching from Linux to Windows containers that was stuck because access rights on panic.log. See for-win#11899.

### Known Issues

#### For Windows

Docker Desktop may fail to start when upgrading to 4.1.0 on some WSL-based distributions such as ArchWSL. See docker/for-win#12229

## 4.0.1

### Upgrades

- Compose V2 RC3
  - Compose v2 is now hosted on github.com/docker/compose.
  - Fixed go panic on downscale using `compose up --scale`.
  - Fixed a race condition in `compose run --rm` while capturing exit code.

### Bug fixes and minor changes

#### For all platforms

- Fixed a bug where copy-paste was not available in the Docker Desktop Dashboard.

#### For Windows

- Fixed a bug where Docker Desktop would not start correctly with the Hyper-V engine. See docker/for-win#11963

## 4.0.0

### New

Docker has announced updates and extensions to the product subscriptions to increase productivity, collaboration, and added security for our developers and businesses.

The updated Docker Subscription Service Agreement includes a change to the terms for **Docker Desktop**.

- Docker Desktop **remains free** for small businesses (fewer than 250 employees AND less than $10 million in annual revenue), personal use, education, and non-commercial open source projects.
- It requires a paid subscription (**Pro, Team, or Business**), for as little as $5 a month, for professional use in larger enterprises.
- The effective date of these terms is August 31, 2021. There is a grace period until January 31, 2022 for those that will require a paid subscription to use Docker Desktop.
- The Docker Pro and Docker Team subscriptions now **include commercial use** of Docker Desktop.
- The existing Docker Free subscription has been renamed **Docker Personal**.
- **No changes** to Docker Engine or any other upstream **open source** Docker or Moby project.

To understand how these changes affect you, read the FAQs.
For more information, see Docker subscription overview.

### Upgrades

- Compose V2 RC2
  - Fixed project name to be case-insensitive for `compose down`. See docker/compose-cli#2023
  - Fixed non-normalized project name.
  - Fixed port merging on partial reference.
- Kubernetes 1.21.4

### Bug fixes and minor changes

#### For Mac

- Fixed a bug where SSH was not available for builds from git URL. Fixes for-mac#5902

#### For Windows

- Fixed a bug where the CLI tools would not be available in WSL 2 distributions.
- Fixed a bug when switching from Linux to Windows containers due to access rights on `panic.log`. for-win#11899
