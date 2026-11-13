---
title: "Docker Desktop for Windows Edge Release notes (part 2 of 9)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-windows.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Windows Edge Release notes (part 2 of 9)

## Docker Desktop Community 2.2.3.0
2020-04-02

### Upgrades

- Docker 19.03.8
- Docker Compose 1.26.0-rc3
- Linux 4.19.76

### New

- Docker Desktop introduces a new onboarding tutorial upon first startup. The Quick Start tutorial guides users to get started with Docker in a few easy steps. It includes a simple exercise to build an example Docker image, run it as a container, push and save the image to Docker Hub.

### Bug fixes and minor changes

> Docker Desktop Edge 2.2.3.0 fixes 28 issues reported on the docker/for-win GitHub repository.

**WSL 2**
- Docker Desktop only exposes host ports in Linux if the Windows port is available.
- Docker Desktop now allows users to refresh the list of Linux distributions.
- Docker Desktop defaults to WSL 2 on install on compatible OS versions.
- Docker Desktop detects missing Linux kernel and adds a pointer to the Microsoft documentation to download the kernel.

**File sharing**
- Kubernetes: Persistent volumes created by claims are now stored in the virtual machine. Fixes for-win/issues/5665.
- Docker Desktop ensures that host paths accessed by containers are within the shared folders list.
- Fixed a bug where opening a read-only file would fail with an `Operation not permitted error`. Fixes docker/for-win#6016 and docker/for-win#6017.
- Fixed path handling for `docker volume create -o type=none -o o=bind -o device=C:\Some\Windows\path`.
- Fixed a bug which prevented open files from being deleted. Fixes docker/for-win#5565.
- Docker Desktop now avoids locking files on the host which are open in containers.
- Docker Desktop generates `fsnotify.WRITE` events in Linux containers when files are changed on the host. docker/for-win#5530
- Docker Desktop now displays hidden files on shared volumes. Fixes docker/for-win#5808.
- Fixed cache invalidation and event injection for shared volumes with long paths.
- Docker Desktop now handles case-insensitivity correctly during file creation.
- Docker Desktop represents valid directory junctions as directories (rather than symlinks) and handles cache invalidation and event injection properly. Fixes docker/for-win#5582.
- Fixed a race condition in `readlink` on shared volumes using "mfsymlinks". Fixes docker/for-win#5793
- Fixed a bug where files did not change in shared volumes when using `volumes_from` in docker-compose.yml. Fixes docker/for-win#5530.

**Other fixes**
- Reduced the size of the Docker Desktop installer from 960 MB to 400 MB.
- Added an option to delete container and image data from the **Troubleshoot** screen.
- Docker Desktop now reads the Hyper-V VM disk max size on startup and uses it as the value to display in the Settings.
- Fixed the Hyper-V used disk image size being reported incorrectly.
- Fixed the Hyper-V VM disk size increase. Fixes docker/for-win#5881.
- Fixed container time drift when system hibernates. Fixes docker/for-win#4526.
- Fixed a bug where the Docker Desktop UI could be started without the engine. Fixes docker/for-win#5376.
- Docker Desktop now uses the least possible privilege for querying the `Server service`. Fixes docker/for-win#5150.
- Fixed a bug where diagnostics upload could fail silently.
- Capturing diagnostics is now faster and easier.
- Fixed an issue where a container port could not be exposed on a specific host IP. See docker/for-win#5546.
- Removed port probing from dashboard, just unconditionally showing links to ports that should be available. Fixes docker/for-win#5903.

### Known issues

- Loopback and unspecified IPv6 addresses (`::` and `::1`) within a container do not currently work. Some web servers and other programs may be using these addresses in their configuration files.

## Docker Desktop Community 2.2.2.0
2020-03-02

This release contains a Kubernetes upgrade. Note that your local Kubernetes cluster will be reset after installing Docker Desktop.

### Upgrades

- Kubernetes 1.16.5
- Go 1.13.8

### New

- Windows 10 Home users can now use Docker Desktop through the experimental WSL 2 support. This requires Windows Insider Preview Build 19018 or later.
- Docker Desktop now allows sharing individual folders, rather than whole drives, giving more control to users over what is being shared.

### Bug fixes and minor changes

- Added a prerequisite check in the installer for the `LanmanServer` service. Fixes docker/for-win#5150.
- DockerNAT has been removed from Docker Desktop as using an IP address to communicate from the host to a container is not a supported feature. To communicate from a container to the host, you must use the special DNS name `host.docker.internal`. We also recommend using ports to communicate from the host to a container. For more information, see Networking.
- Ceph support has been removed from Docker Desktop to save disk space.
- Fixed an issue that caused the Windows log file archive to grow indefinitely. Fixes docker/for-win#5113.

## Docker Desktop Community 2.2.1.0
2020-02-12

### Upgrades

- Docker Compose 1.25.4
- Go 1.12.16

### Bug fixes and minor changes

- Fixed an issue that prevented users from creating files with special characters in the filenames within a shared volume. Fixes docker/for-win#5520.
- Fixed handling of shared volumes with relative paths in `docker-compose.yml`. Fixes docker/for-win#5516.
- Fixed handling of shared volumes where the path case (uppercase / lowercase) did not exactly match the host. Fixes docker/for-win#5516.
- Fixed an issue where changing a file in the Windows file system did not update the file within the container. Fixes docker/for-win#5530, docker/for-win#5550, and docker/for-win#5318.
- Fixed an issue that prevented users from sharing drives and sometimes incorrectly prompted users to enter file system credentials. Fixes docker/for-win#5567.
- Fixed an issue which prevented users from mounting nested volumes. Fixes docker/for-win#5540.
- Fixed a file synchronization issue on bind mounts. Fixes docker/for-win#5533.
- Fixed an issue where timestamps were reset to zero on files within shared volumes. Fixes docker/for-win#5528 and docker/for-win#5543.
- Fixed a bug which caused Docker Desktop to fail when sharing file paths longer than 260 characters. Fixes docker/for-win#5572.
- Fixed an issue where some users were unable to start a container if there is a symlink in a shared volume. Fixes docker/for-win#5582.
- Fixed a bug where users were unable to modify the **Manual proxy configuration** settings through the Docker Desktop UI. Fixes docker/for-win#5606 and docker/for-win#5548.
- Fixed an issue where the Docker Desktop UI failed to start if the `no_proxy` environment variable has an entry that starts with a dot (.). Fixes docker/for-win/5551.
- Fixed a bug that did not allow users to access the Docker Desktop UI on machines with a policy preventing access to the Windows registry. Fixes docker/for-win#5536.
- Fixed an issue where disabling the WSL2 integration and re-enabling it later resulted in broken symlinks. Fixes docker/for-win#5613.
- Fixed a race condition when starting the WSL engine which caused Docker Desktop to incorrectly report that the containers have exited. Fixes docker/for-win#5607.
- Fixed an issue where editing code inside a container resulted in an error. Fixes docker/for-win#5528.
- Fixed a bug where running the command `DockerCli.exe -SharedDrives` failed to display a list of drives that are shared. Fixes docker/for-win#5625.

### Known issues

- DockerNAT has been removed from Docker Desktop 2.2.0.0 as using an IP address to communicate from the host to a container is not a supported feature. To communicate from a container to the host, you must use the special DNS name `host.docker.internal`. We also recommend using ports to communicate from the host to a container. For more information, see Networking.

  However, if your current setup relies on IP addresses for communication, you can use a temporary workaround to reinstate DockerNAT. To do this, open
`C:\Program Files\Docker\Docker\resources\MobyLinux.ps1` and add `$SwitchName = "DockerNAT"` between line 175 and 176. Note that the temporary workaround to reinstate DockerNAT may be removed from future releases.
- Directory junctions in shared volumes pointing outside the shared volume do not work.
- It is currently not possible to rename open files within shared volumes.
- In some cases, Docker containers do not synchronize time with the host when the host machine is put to sleep.
- It is not possible to use `localhost` in the proxy settings. You can instead use `host.docker.internal` to work around this issue.

## Docker Desktop Community 2.1.7.0
2019-12-11

> **Note:**
>
> Docker Desktop Edge 2.1.7.0 is the release candidate for the upcoming major Stable release. Please help us test this version before the wider release and report any issues in the docker/for-win GitHub repository.

### Upgrades

- Docker Compose 1.25.1-rc1

### New

- Added the **WSL Integration** option in **Settings** > **Resources** to select WSL 2 distributions. This option will be visible only after enabling WSL 2 on your machine.
- File sharing: The new gRPC FUSE system is no longer experimental and is enabled by default even when experimental features are turned off.

### Bug fixes and minor changes

- The Docker Desktop Dashboard now displays port information inline with the container status.
- Fixed an issue which caused the 'back' button on the Dashboard UI to behave inconsistently when repeatedly switching between container details and the Settings window.
- Various minor improvements to the Dashboard UI.
- Fixed a bug that caused a rare crash when uninstalling Docker Desktop.
- Fixed an issue when overwriting existing files with the WSL 2 CLI bundle, such as kubectl.
- Fixed an issue where WSL 2 failed to start when the distribution directory is compressed or encrypted. Fixes docker/for-win#5256.
- Fixed an issue that caused Docker Desktop to fail on startup when there is an incomplete Kubernetes config file.
- Fixed various stability issues.

### Known issues

- The Dashboard stops updating when you switch the container mode between Linux and Windows. To work around this issue, close and reopen the Dashboard.
- The new gRPC FUSE file sharing implementation does not support connecting to new drives after Docker Desktop starts (for example, a USB drive). If you would like to share the new drive in Docker Desktop, you must quit Docker Desktop and then start the application to refresh the list of drives in Settings.

## Docker Desktop Community 2.1.6.1
2019-11-20

### Bug fixes and minor changes

- Fixed an issue that prevented Kubernetes to start with WSL 2 on machines with multiple CPU cores.
- Fixed a rare issue that caused to Docker Desktop to crash with the error `Unable to stop Hyper-V VM: Cannot validate argument on parameter 'SwitchName'. The argument is null or empty.`

### Known issue

Windows Insider Preview Slow Ring users running OS builds older than 19025 cannot run WSL 2 following upgrade to Docker Desktop Edge 2.1.6.1. WSL 2 requires Windows 10 Insider Preview build 19018 or greater.

### Docker Desktop Community 2.1.6.0
2019-11-18

### Upgrades

- Docker 19.03.5
- Go 1.12.13

### New

Added the ability to start and stop Compose-based applications and view combined logs in the Docker Desktop **Dashboard** UI.

### Bug fixes and minor changes

- Docker Desktop now automatically restarts after an update.
- Fixed an issue where Docker Desktop auto-start was not being disabled properly on some machines.
- Fixed a container start error when a container has more than one port with an arbitrary or not-yet-configured external port number. For example, `docker run -p 80 -p 443 nginx`). Fixes docker/for-win#4935 and docker/compose#6998.
- Fixed an issue which caused Docker Desktop to crash when resetting to factory defaults while running Windows containers.
- Fixed multiple issues related to Fast Startup.
- Injected Docker CLI, CLI plugins, Docker Compose, Notary, and kubectl into WSL distributions when Docker Desktop WSL integration is enabled.
- Fixed an issue where bind mounts created with Docker Compose from a WSL distribution were incorrectly translated. Fixes docker/for-win#5084.
- Docker Desktop now supports inotify events on shared filesystems for Windows file sharing.
- Fixed a cache invalidation bug when a file in a shared volume is renamed on the host for Windows file sharing.
- Fixed a handle leak when calling `Mknod` on a shared volume for Windows file sharing.
- To make VM startup more reliable, Docker Desktop now avoids adding a Hyper-V NIC to the Windows VM when using Hypervisor sockets for Windows file sharing (rather than Samba).

### Known issue

Windows Insider Preview Slow Ring users running OS builds older than 19025 cannot run WSL 2 following upgrade to Docker Desktop Edge 2.1.6.0. WSL 2 requires Windows 10 Insider Preview build 19018 or greater.
