---
title: "Docker Desktop for Windows Edge Release notes (part 1 of 9)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-windows.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Windows Edge Release notes

This page contains information about Docker Desktop Edge releases. Edge releases give you early access to our newest features. Note that some of the features may be experimental, and some of them may not ever reach the Stable release.

 For Docker Desktop system requirements, see
What to know before you install.

## Docker Desktop Community 2.5.4
2020-12-07

### Upgrades

- Docker Engine 20.10.0-rc2
- Go 1.15.6

### Bug fixes and minor changes

- Fixed an issue causing the background update to fail when the current user is not an administrator.
- Downgraded the kernel to 4.19.121 to reduce the CPU usage of hyperkit. Fixes docker/for-mac#5044

## Docker Desktop Community 2.5.3
2020-11-30

### Upgrades

- Compose CLI v1.0.3

## Docker Desktop Community 2.5.2
2020-11-26

### New

- Use of three digit version number.
- Starting with Docker Desktop 2.5.2, updates will be much smaller as they will be applied using delta patches.

### Bug fixes and minor changes

- Fixed an unexpected EOF error when trying to start a non-existing container with `-v /var/run/docker.sock:`. See docker/for-mac#5025.

## Docker Desktop Community 2.5.1.0
2020-11-18

This release contains a Kubernetes upgrade. Note that your local Kubernetes cluster will be reset after installing Docker Desktop.

### Upgrades

- Docker Engine 20.10.0-rc1
- Compose CLI v1.0.2
- Snyk v1.424.4
- Kubernetes 1.19.3

### Bug fixes and minor changes

- Renamed 'Run Diagnostics' to 'Get support'.
- Fixed an issue with the WSL 2 backend where some network plugins may fail to load, provoking a crash of the Docker daemon.
- Fixed an unexpected EOF error when trying to start a non-existing container. See docker/for-mac#5025.

## Docker Desktop Community 2.4.2.0
2020-10-19

### New

- If you have enabled Vulnerability Scanning in Docker Hub, the scan results will now appear in Docker Desktop.

### Upgrades

- Docker Engine 20.10.0 beta1
- Docker Compose CLI - 0.1.22
- Linux kernel 5.4.39
- Kubernetes 1.19.2
- Go 1.15.2

* Deprecation
  - Docker Desktop cannot be installed on Windows 1703 (build 15063) anymore.

### Bug fixes and minor changes

- Fixed an issue that can intermittently cause the WSL 2 backend to fail to start.
- Fixed an issue related to NFS mounting. See docker/for-mac#4958.
- Fixed an issue with http proxy exclude lists containing entries such as `localhost` or `127.0.0.1`. Fixes docker/for-win#8750.
- When WSL integration process unexpectedly stops, the user is now notified and can decide to restart it or not, instead of always try to restart it in a loop. fixes docker/for-win#8968.
- Fixed an issue related to container logs that lag under heavy load. Fixes docker/for-win#8216.
- Diagnostics: avoid hanging when Kubernetes is in a broken state.
- When sharing a file into a container (e.g. `docker run -v ~/.gitconfig`) Docker Desktop does not watch the parent directory. Fixes docker/for-mac#4981.
- Always flush file system caches synchronously on container start. See docker/for-mac#4943.

## Docker Desktop Community 2.4.1.0
2020-10-01

### Upgrades

- Docker Compose CLI - 0.1.18
- Docker Compose 1.27.4
- Snyk v1.399.1
- Docker Engine 19.03.13

### Bug fixes and minor changes

- Fixed the path to the installer log file default location when the username contains a space. Fixes docker/for-win#7941.

## Docker Desktop Community 2.3.7.0
2020-09-17

### New

- Amazon ECR Credential <example-value>

### Upgrades

- Docker ACI integration 0.1.15
- Snyk v0.393.0

### Bug fixes and minor changes

**WSL 2**

  - Fixed an issue that intermittently made the backend fail to start.
  - Fixed a proxy crash that happened when glibc was not compatible. See docker/for-win#8183.
  - Fixed an issue where restarting Docker Desktop may delete files mounted in a container.
  - Fixed an issue where restarting Docker Desktop truncates files when a single file is mounted in a container. See docker/for-win#8439.

**Other fixes**

- Fixed the VM debug shell used for low-level debugging.
- Fixed compatibility with Go 1.15 clients. See docker/for-mac#4855.
- Avoid exposing `/host_mnt` paths in `docker container inspect` and `docker volume inspect`. Fixes docker/for-mac#4859.
- Fixed container logs lagging under heavy load. See docker/for-win#8216.

### Known issues

- The `clock_gettime64` system call returns `EPERM` rather than `ENOSYS`
in i386 images. To work around this issue, disable `seccomp` by using
the `--privileged` flag. See docker/for-win#8326.

## Docker Desktop Community 2.3.6.2
2020-09-09

### Upgrades

- Docker Compose 1.27.0

### Bug fixes and minor changes

- Fixed an issue with mount shadowing in WSL 2. See docker/for-win#8183 and docker/for-win#8316.

## Docker Desktop Community 2.3.6.0
2020-09-01

### New

- In partnership with Snyk, Docker Desktop launches vulnerability scanning for Docker local images.
- Docker ECS plugin has been replaced by ECS cloud integration
- Docker UI:
  - The Images view now has search and filter options.
  - You can now push an image to Docker Hub using the Remote repositories drop-down menu.

### Upgrades

- Alpine 3.12
- Kubernetes 1.18.8

### Bug fixes and minor changes

- Fixed an issue with Docker Desktop integration with other WSL 2 distributions. See docker/for-win#6894
- Fixed DNS resolution of short names. See docker/for-win#4425

## Docker Desktop Community 2.3.5.1
2020-08-25

### Bug fixes and minor changes

- Fixed an issue which broke WSL 2 integration when stopping Docker Desktop while containers with bind mounts are present. See docker/for-win#8164

## Docker Desktop Community 2.3.5.0
2020-08-20

### New

- The **Images** view on the Dashboard now allows you to interact with images on Docker Hub. You can now pull a remote repository with specific tags from Docker Hub, or view the details of the repository on the Docker Hub page. To access the new Images view, from the Docker menu, select **Dashboard** > **Images**.

- Docker Desktop now enables BuildKit by default after a reset to factory defaults. To revert to the old docker build experience, go to **Preferences** > **Docker Engine** and then disable the BuildKit feature.

- Docker Desktop now supports running on WSL 2 on the latest updates of Windows 10 versions 1903 and 1909 (in addition to the existing support for version 2004). This also means that Docker Desktop can be installed on those builds of Windows 10 Home.

### Upgrades

- Go 1.14.7
- Docker ECS integration v1.0.0-beta.5
- Docker Engine 19.03.13-beta2
- Docker ACI integration 0.1.12

### Bug fixes and minor changes

- Moved **Dashboard** to the top of the whale menu.
- The systray icon now responds to dark or light mode. See docker/for-win#4113
- Improved the error handling when `dockerd` crashes.
- Fixed minor bugs in the **Images** view.

## Docker Desktop Community 2.3.4.0
2020-07-28

### New

- Docker Desktop introduces the new **Images** view to the Docker Dashboard. The Images view allows users to view a list of Docker images on the disk, run an image as a container, pull the latest version of an image from Docker Hub, inspect images, and remove any unwanted images from the disk.

  To access the new Images view, from the Docker menu, select **Dashboard** > **Images**.

### Upgrades

- Docker ECS integration v1.0.0-beta.4
- Kubernetes 1.18.6

### Bug fixes and minor changes

- UI changes to dark or light theme depending on Windows default app mode.
- Copying the container logs from the dashboard does not copy the ANSI color codes to the clipboard anymore.

## Docker Desktop Community 2.3.3.2
2020-07-21

### Upgrades

- Docker ECS integration v1.0.0-beta.2
- Docker ACI integration 0.1.10

## Docker Desktop Community 2.3.3.1
2020-07-10

### Bug fixes and minor changes

- Fixed a bug where the ECS plugin was not visible from WSL 2.

## Docker Desktop Community 2.3.3.0
2020-07-09

### Upgrades

- Beta release of Docker ECS integration v1.0.0-beta.1.
- Docker ACI integration v0.1.7
- Docker Compose 1.26.2

### Bug fixes and minor changes

- Compose-on-Kubernetes is no longer included in the Docker Desktop installer. You can download it separately from the compose-on-kubernetes release page.

## Docker Desktop Community 2.3.2.1
2020-06-29

### Security

- Fixed a regression in Docker Desktop Edge 2.3.2.0 on Windows where the Docker API was exposed by default on a random port on all interfaces.

## Docker Desktop Community 2.3.2.0
2020-06-25

### Upgrades

- Docker 19.03.12
- Docker Compose 1.26.0
- Kubernetes 1.18.3
- Beta release of the Docker ACI integration

### Bug fixes and minor changes

- Fixed application startup if `hosts` is specified inside the Docker `daemon.json`. See docker/for-win#6895.
- Fixed opening a CLI from the dashboard for Windows containers. See docker/for-win#7079.
- Fixed an issue where adding a folder on a non-existing drive in the settings would create an empty entry. See docker/for-win#6797.
- Fixed an issue when updating Windows to a WSL 2 capable version, where a configuration file is locked by the old Hyper-V VM.
- Pinning the application to the taskbar and clicking on it will launch the container view if Docker is already running.
- Left-clicking on the Docker icon in the system tray now launches the container view Dashboard. See docker/for-win#6650.
- Fixed an issue which blocks Docker Desktop startup if `localhost:2375` is used by another program. See docker/for-win#6929 and docker/for-win#6961.
- Docker contexts are now synced between Windows and WSL 2 distributions.
- Docker Desktop now prompts users to share drives for paths like `////c/Users/foo`, rather than only paths like `C:\Users\foo` and `C:/Users/foo`.
- The installer now returns a non-zero exit code on error or when the user cancels the installation.
- Avoid failing withFixed an issue which caused Docker Desktop to fail with `Function not implemented` error during file I/O on shared volumes. See docker/for-win#5955.
- Fixed an issue when bind mounting a mounted host directory inside a container. See docker/for-win#5089.
- Removed the legacy Kubernetes context `docker-for-desktop`. The context `docker-desktop` should be used instead. See docker/for-win#5089.

## Docker Desktop Community 2.3.1.0
2020-05-20

### Upgrades

- Docker Compose 1.26.0-rc4
- Upgrade to Qemu 4.2.0, add Risc-V support

### Bug fixes and minor changes

**Hyper-V**

- Create drive symlinks in VM at startup to avoid breaking setup that was using them. Fixes docker/for-win#6628.
- Implement `fallocate` for shared filesystems. See docker/for-win#6658.

**WSL 2**

- Configure CLI to use Docker Desktop credential store.
- Adds a restart button to the popup prompting the user to install the Linux kernel.
- More reliable bootstrap, do not rely on `wslpath` for path translation, retry mounts on errors at startup.

**Dashboard**

- Fixed containers logs which were sometimes truncated. Fixes docker/for-win#5954
- Fixed `open with vs code` button for compose app deployed from a WSL 2 Linux Workspace.

**Other fixes**

- Fixed an installer crash when an old and/or partially uninstalled version of Docker Desktop was present on the system. Fixes docker/for-win/6536.
- Fixed home expansion when using tilde in bind mounts source (for example, `-v ~/dir:/vm-dir`)
- `localhost` and `127.0.0.1` can both be used in the proxy settings to redirect to a proxy on the host. Fixes docker/for-win#5715.
- Fixed a typo in the backend destroy notification. Fixes docker/for-win#6739.
- Fixed a crash which sometimes occurred when Docker Desktop loads a corrupted Docker CLI configuration file. Fixes docker/for-win#6657.
- Fixed a delay when opening the systray menu. Fixes docker/for-win#1011.

### Known issues

**WSL 2**

- Swarm service bind mounts are not always restored correctly.
- Bind mounts of files living outside of the root mount point (files within `/mnt/c`, `/tmp`, `/run...`) don't work correctly when multiple containers mount them.

## Docker Desktop Community 2.3.0.1
2020-04-28

### Bug fixes and minor changes

- Fixed an upgrade bug where users on versions still using the PowerShell-based VM management experience a silent un-installation crash leading to Docker Desktop being uninstalled instead of upgraded.
- Fixed a crash when failing to login due to no Internet connection.
- Fixed bug in handling shared volume paths with `..` characters. Fixes docker/for-win#5375.
- WSL 2: Docker Desktop detects when the wsl-distribution is stopped and displays an actionable error message.
- Fixed a bug in `ftruncate` which prevented libgit2sharp from cloning repositories on shared volumes. See docker/for-win#5808.
- Fixed a bug that caused starting and stopping of a Compose application from the UI to fail when the path contains whitespace.

## Docker Desktop Community 2.3.0.0
2020-04-20

### Upgrades

- Docker Compose 1.25.5
- Go 1.13.10
- Linux kernel 4.19.76
- LinuxKit init, runc, and containerd

### Bug fixes and minor changes

> Docker Desktop Edge 2.3.0.0 fixes 10 issues reported on the docker/for-win GitHub repository.

**WSL 2**

- Detect when the WSL 2 backend stops and allow the user to restart it.
- Added support for chmod/chown on WSL 2 bind mounts. Fixed docker/for-win#6284.
- Fixed a race condition when exposing ports.
- Prevent the WSL 2 dialog from blocking other windows.
- Added a check that virtualization is enabled in the BIOS.

**Filesharing**

- Fixed a bug when parent directories of shared folders are renamed, leading to spurious `File not found` errors. Fixes docker/for-win#6200.
- Fixed bug where a letter and two digit root folder name causes Docker Compose to fail creating directories inside the volume. Fixes docker/for-win#6248.
- Fixed a bug which prevented containers from seeing file updates on shared volumes, when under load and a container restarts. Fixes docker/for-win#5530
- Fixed a bug where host paths are incorrectly translated into VM paths. Fixes docker/for-win#6209.
- Fixed bug receiving file events on long paths (> 260 characters). Fixes docker/for-win#6337.

**Other fixes**

- Fixed a bug where containers disappeared from the UI when Kubernetes context is invalid. Fixes docker/for-win#6037.
- Fixed Windows event logs filtering when copying them to the Docker Desktop log files. Fixes docker/for-win#6258.
- Fixed a handle leak in `vpnkit-bridge`. Fixed docker/for-win#5841
- Fixed a bug when removing Docker Desktop virtual switch.
- Added a link to the Stable channel from the Docker Desktop UI.
- IPv6 has been re-enabled in the embedded Linux kernel, so listening on IPv6 addresses works again. Fixed docker/for-win#6206 and docker/for-mac#4415.
- Made the embedded terminal resizable.
- Fixed a bug which only respected the "expose on TCP" Docker engine API setting on application restart. Setting will now take effect when the Apply button is clicked.
- Fixed a bug where diagnostic upload would fail if the username contained spaces.
