---
title: "Docker Desktop for Mac Edge release notes (part 1 of 8)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-mac.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Mac Edge release notes

This page contains information about Docker Desktop Edge releases. Edge releases give you early access to our newest features. Note that some of the features may be experimental, and some of them may not ever reach the Stable release.

For Docker Desktop system requirements, see
What to know before you install.

## Docker Desktop Community 2.5.4

2020-12-07

### Upgrades

- Docker Engine 20.10.0-rc2
- Go 1.15.6

### Bug fixes and minor changes

- Changed the «Update and quit» menu entry to «Update and restart».
- Fixed the check for updates dialog reporting the build number instead of the version number of a new version.
- Downgraded the kernel to 4.19.121 to reduce the CPU usage of hyperkit. Fixes docker/for-mac#5044
- Fixed a bug that DNS would return `NXDOMAIN` when a name exists but the type of record was not found. Fixes docker/for-mac#5020. Related to https://gitlab.alpinelinux.org/alpine/aports/-/issues/11879
- Avoid caching bad file sizes and modes when using `osxfs`. Fixes docker/for-mac#5045.

## Docker Desktop Community 2.5.3

2020-11-30

### Upgrades

- Compose CLI v1.0.3

### Bug fixes and minor changes

- Fixed a possible file sharing error where a file may appear to have the wrong size in a container when it is modified on the host. This is a partial fix for docker/for-mac#4999.
- Removed unnecessary log messages which slow down filesystem event injection.

## Docker Desktop Community 2.5.2

2020-11-26

### New

- Use of three digit version number.
- Starting with Docker Desktop 2.5.2, updates will be much smaller as they will be applied using delta patches.

### Bug fixes and minor changes

- Re-enabled the experimental SOCKS proxy. Fixes docker/for-mac#5048.
- Fixed an unexpected EOF error when trying to start a non-existing container with `-v /var/run/docker.sock:`. See docker/for-mac#5025.
- Display an error message instead of crashing when the application needs write access on specific directories. See docker/for-mac#5068

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
- Fixed an issue that caused Docker Desktop to crash on MacOS 11.0 (Big Sur) when VirtualBox was also installed. See docker/for-mac#4997.
- Removed BlueStacks warning message. Fixes docker/for-mac#4863.
- Made container start faster in cases where shared volumes have lots of files. Fixes docker/for-mac#4957.
- File sharing: fixed changing ownership of read-only files. Fixes docker/for-mac#4989, docker/for-mac#4964.
- Fixed an unexpected EOF error when trying to start a non-existing container. See docker/for-mac#5025.

## Docker Desktop Community 2.4.2.0

2020-10-19

### New

- If you have enabled Vulnerability Scanning in Docker Hub, the scan results will now appear in Docker Desktop.

### Upgrades

- Docker Engine 20.10.0 beta1
- Docker Compose CLI - 0.1.22
- Linux kernel 5.4.39.
- Kubernetes 1.19.2
- Go 1.15.2

### Bug fixes and minor changes

- When sharing Linux directories (`/var`, `/bin`, etc) with containers, Docker Desktop avoids watching paths in the host file system.
- When sharing a file into a container (e.g. `docker run -v ~/.gitconfig`) Docker Desktop does not watch the parent directory. Fixes docker/for-mac#4981.
- gRPC FUSE: fix `chown` when the file is read-only. Fixes `rabbitmq`, see docker/for-mac#4964.
- gRPC FUSE: generate `ATTRIB` inotify events as well as `MODIFY`. Fixes docker/for-mac#4962.
- gRPC FUSE: return `EOPNOTSUPP` from `fallocate` for unsupported modes. Fixes `minio`. See docker/for-mac#4964.
- Fixed an issue related to NFS mounting. See docker/for-mac#4958.
- Always flush file system caches synchronously on container start. See docker/for-mac#4943.
- Allow symlinks to point outside of shared volumes. Fixes docker/for-mac#4862.
- Diagnostics: avoid hanging when Kubernetes is in a broken state.
- Fixed automatic start on log in. See docker/for-mac#4877 and docker/for-mac#4890.

## Docker Desktop Community 2.4.1.0

2020-10-01

### Upgrades

- Docker Compose CLI - 0.1.18
- Docker Compose 1.27.4
- Snyk v1.399.1
- Docker Engine 19.03.13

### Bug fixes and minor changes

- Docker Desktop always flushes filesystem caches synchronously on container start. See docker/for-mac#4943.
- Docker Desktop now supports `S_ISUID`, `S_ISGID` and `S_ISVTX` in calls to `chmod(2)` on shared filesystems. See docker/for-mac#4943.
- Fixed a possible premature file handle close when using `gRPC-FUSE`.

## Docker Desktop Community 2.3.7.0

2020-09-17

### New

- Amazon ECR Credential <example-value>

### Upgrades

- Docker ACI integration 0.1.15
- Snyk v0.393.0

### Bug fixes and minor changes

- Fixed automatic start on log in. See docker/for-mac#4877 and docker/for-mac#4890.
- Docker Desktop now allows symlinks to point outside of shared volumes. Fixes docker/for-mac#4862.
- Removed an artificial file descriptor limit (`setrlimit`) of `10240`. Docker Desktop now relies on the kernel to impose limits via `kern.maxfiles` and `kern.maxfilesperproc`.
- Fixed the VM debug shell used for low-level debugging.
- Fixed compatibility with Go 1.15 clients. See docker/for-mac#4855.
- Avoid exposing `/host_mnt` paths in `docker container inspect` and `docker volume inspect`. Fixes docker/for-mac#4859.
- Fixed container logs lagging under heavy load. See docker/for-win#8216.

### Known issues

- The `clock_gettime64` system call returns `EPERM` rather than `ENOSYS`
  in i386 images. To work around this issue, disable `seccomp` by using
  the `--privileged` flag. See docker/for-win#8326.

## Docker Desktop Community 2.3.6.1

2020-09-08

### Upgrades

- Docker Compose 1.27.0

### Bug fixes and minor changes

- Docker Desktop now correctly displays the state of "Use gRPC FUSE for file sharing" in the UI. Fixes docker/for-mac#4864.

## Docker Desktop Community 2.3.6.0

2020-09-01

### New

- In partnership with Snyk, Docker Desktop launches vulnerability scanning for Docker local images.
- Docker ECS plugin has been replaced by ECS cloud integration
- Docker UI:
  - The Images view now has search and filter options.
  - You can now push an image to Docker Hub using the Remote repositories drop-down menu.
- WSL 2 files and directories can now be mounted from the Windows Docker CLI with e.g. `docker run -v \\wsl$\Ubuntu\my-files:/my-files ...`.

### Removal

- Support for MacOS 10.13 has ended, you will need to update your system to keep using Docker Desktop.

### Upgrades

- Alpine 3.12
- Kubernetes 1.18.8

### Bug fixes and minor changes

- Fixed a Mac CPU usage bug by removing the serial console from `hyperkit`, see docker/roadmap#12. To open a shell in the VM use either `nc -U ~/Library/Containers/com.docker.docker/Data/debug-shell.sock` (on Mac) or `putty -serial \\.\pipe\dockerDebugShell` (on Windows).

## Docker Desktop Community 2.3.5.0

2020-08-21

### New

- The **Images** view on the Dashboard now allows you to interact with images on Docker Hub. You can now pull a remote repository with specific tags from Docker Hub, or view the details of the repository on the Docker Hub page. To access the new Images view, from the Docker menu, select **Dashboard** > **Images**.

- Docker Desktop now enables BuildKit by default after a reset to factory defaults. To revert to the old docker build experience, go to **Preferences** > **Docker Engine** and then disable the BuildKit feature.

- Docker Desktop now uses **gRPC-FUSE** for file sharing by default. This has much faster file sharing and uses much less CPU than `osxfs`, especially when there are lots of file events on the host. To switch back to `osxfs`, go to **Preferences** > **General** and disable gRPC-FUSE.

### Upgrades

- Go 1.14.7
- Docker ECS integration v1.0.0-beta.5
- Docker Engine 19.03.13-beta2
- Docker ACI integration 0.1.12

### Removal

- The Mutagen file sync feature that we have been experimenting with in recent Edge releases has been removed. Thanks to everyone who has provided feedback on this feature. We are reconsidering how to integrate it based on the feedback we have received so far.

### Bug fixes and minor changes

- Moved **Dashboard** to the top of the whale menu.
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

- Copying the container logs from the dashboard does not copy the ANSI color codes to the clipboard anymore.
- Mutagen two-way sync now uses `.dockersyncignore` rather than `.dockerignore` to exclude files.

## Docker Desktop Community 2.3.3.2

2020-07-21

### Upgrades

- Docker ECS integration v1.0.0-beta.2
- Docker ACI integration 0.1.10

### Bug fixes and minor changes

- Mutagen uses the `.dockerignore` file when creating a session to filter the list of synchronized files. See docker/for-mac#4621.
- Docker CLI commands can now bypass any active Mutagen synchronization for volumes using `:cached`. See docker/for-mac#1592.

## Docker Desktop Community 2.3.3.0

2020-07-09

### Upgrades

- Beta release of Docker ECS integration v1.0.0-beta.1
- Docker ACI integration v0.1.7
- Docker Compose 1.26.2

### Bug fixes and minor changes

- Compose-on-Kubernetes is no longer included in the Docker Desktop installer. You can download it separately from the compose-on-kubernetes release page.
- Fixed an incompatibility between `hyperkit` and `osquery` which resulted in excessive `hyperkit` CPU usage. See docker/for-mac#3499
- Docker Desktop now respects consistency flags `cached`, `delegated`, `consistent` even when in a list of options (for example, `z,delegated`). See docker/for-mac#4718.
- Docker Desktop now implements the shared volume flag `:delegated` by automatically setting up a two-way file sync with Mutagen.

## Docker Desktop Community 2.3.2.0

2020-06-25

### Upgrades

- Docker 19.03.12
- Docker Compose 1.26.0
- Kubernetes 1.18.3
- Beta release of the Docker ACI integration

### Bug fixes and minor changes

- Fixed an issue with startup when the Kubernetes certificates have expired. See docker/for-mac#4594.
- Fixed `hyperkit` on newer Macs / newer versions of `Hypervisor.framework`.
- Added support for the global Mutagen config file `~/.mutagen.yml`.
- Automatically set up a two-way file sync using `:delegated` option with `docker run -v` command.
- Re-added device-mapper to the embedded Linux kernel. See docker/for-mac#4549.
- Improved diagnostics when using two-way synchronization with the Mutagen cache.
- Switched to Mutagen `posix-raw` symlink mode which fixes cases where the symlinks point outside the synchronized directory. See docker/for-mac#4595.
- Removed the legacy Kubernetes context `docker-for-desktop`. The context `docker-desktop` should be used instead. See docker/for-mac#4089.

## Docker Desktop Community 2.3.1.0

2020-05-20

### New

Docker Desktop introduces a directory caching mechanism to greatly improve disk performance in containers. This feature uses mutagen.io to sync files between the host and the containers and benefits from native disk performance.

We appreciate you trying out an early version of the Mutagen file sync feature. Please let us know your feedback by creating an issue in the Docker Desktop for Mac GitHub repository with the `Mutagen` label.

### Upgrades

- Docker Compose 1.26.0-rc4
- Upgrade to Qemu 4.2.0, add Risc-V support

### Bug fixes and minor changes

- Fixed a performance regression when using shared volumes in 2.2.0.5. Fixes docker/for-mac#4423.
- Fixed containers logs in Docker Desktop **Dashboard** which were sometimes truncated. Fixes docker/for-win#5954.

## Docker Desktop Community 2.3.0.1

2020-04-28

### Bug fixes and minor changes

- Fixed a bug that caused starting and stopping of a Compose application from the UI to fail when the path contains whitespace.

## Docker Desktop Community 2.3.0.0

2020-04-20

### Upgrades

- Docker Compose 1.25.5
- Go 1.13.10
- Linux kernel 4.19.76
- LinuxKit init, runc, and containerd

### Bug fixes and minor changes

> Docker Desktop Edge 2.3.0.0 fixes one issue reported on the docker/for-mac GitHub repository.

- IPv6 has been re-enabled in the embedded Linux kernel, so listening on IPv6 addresses works again. Fixed docker/for-win#6206 and docker/for-mac#4415.
- Fixed a bug where containers disappeared from the UI when Kubernetes context is invalid. Fixes docker/for-win#6037.
- Fixed a file descriptor leak in `vpnkit-bridge`. Fixes docker/for-win#5841.
- Added a link to the Stable channel from the Docker Desktop UI.
- Made the embedded terminal resizable.
- Fixed bug where diagnostic upload would fail if the username contained spaces.
