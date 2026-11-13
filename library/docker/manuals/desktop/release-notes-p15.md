---
title: "Docker Desktop release notes (part 15 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 15 of 21)

## 4.25.0

### New

- Rosetta is now Generally Available for all users on macOS 13 or later. It provides faster emulation of Intel-based images on Apple Silicon. To use Rosetta, see Settings. Rosetta is enabled by default on macOS 14.1 and later.
- Docker Desktop now detects if a WSL version is out of date. If an out dated version of WSL is detected, you can allow Docker Desktop to automatically update the installation or you can manually update WSL outside of Docker Desktop.
- New installations of Docker Desktop for Windows now require a Windows version of 19044 or later.
- Administrators now have the ability to control Docker Scout image analysis in Settings Management.

### Upgrades

- Compose v2.23.0
- Docker Scout CLI v1.0.9.
- Kubernetes v1.28.2
  - cri-dockerd v0.3.4
  - CNI plugins v1.3.0
  - cri-tools v1.28.0

### Bug fixes and enhancements

#### For all platforms

- Fixed a spacing problem in the `Accept License` pop-up.
- Fixed a bug where the **Notifications drawer** changed size when navigating between **Notifications list** and **Notification details** view.
- containerd integration:
  - `docker push` now supports `Layer already exists` and `Mounted from` progress statuses.
  - `docker save` is now able to export images from all tags of the repository.
  - Hide push upload progress of manifests, configs and indexes (small json blobs) to match the original push behavior.
  - Fixed `docker diff` containing extra differences.
  - Fixed `docker history` not showing intermediate image IDs for images built with the classic builder.
  - Fixed `docker load` not being able to load images from compressed tar archives.
  - Fixed registry mirrors not working.
  - Fixed `docker diff` not working correctly when called multiple times concurrently for the same container.
  - Fixed `docker push` not reusing layers when pushing layers to different repositories on the same registry.
- Docker Init:
  - Fixed outdated links to Docker documentation included in generated files
  - Add support for ASP.NET Core 8 (in addition to 6 and 7)
- Fixed a bug that caused a failure when installing Wasm shims.
- Fixed a bug where Docker Desktop exits the Resource Saver mode every 15 minutes, or, if the timer is set above 15 minutes, the resource saver mode never kicks in.
- Promoted the **Enable background SBOM indexing** option to **General settings**.

#### For Mac

- Minimum OS version to install or update Docker Desktop on macOS is now macOS Monterey (version 12) or later.
- Enhanced error messaging when an update cannot be completed if the user doesn't match the owner of `Docker.app`. Fixes docker/for-mac#7000.
- Fixed a bug where **Re-apply configuration** might not work when `/var/run/docker.sock` is mis-configured.
- Docker Desktop doesn't overwrite `ECRCredentialHelper` if already present in `/usr/local/bin`.

#### For Windows

- Fixed an issue where **Switch to Windows Containers** would show in the tray menu on Windows Home Editions. Fixes docker/for-win#13715

#### For Linux

- Fixed a bug in `docker login`. Fixes  docker/docker-credential-helpers#299

### Known Issues

#### For Mac

- Upgrading to MacOS 14 can cause Docker Desktop to also update to a latest version even if the auto update option is disabled.
- Uninstalling Docker Desktop from the command line is not available. As a workaround, you can uninstall Docker Desktop from the Dashboard.

#### For Windows

- **Switch to Windows containers** option in the tray menu may not show up on Windows. As a workaround, edit the `settings.json` file and set `"displaySwitchWinLinContainers": true`.

#### For all platforms

- Docker operations, such as pulling images or logging in, fail with 'connection refused' or 'timeout' errors if the Swap file size is set to 0MB. As a workaround, configure the swap file size to a non-zero value in the **Resources** tab in **Settings**.

## 4.24.2

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where Docker Desktop would send multiple requests to `notify.bugsnag.com`. Fixes docker/for-win#13722.
- Fixed a performance regression for PyTorch.

## 4.24.1

### Bug fixes and enhancements

#### For Windows

- Fixed a bug on Docker Desktop for Windows where the Docker Desktop Dashboard wouldn't display container logs correctly. Fixes docker/for-win#13714.

## 4.24.0

### New

- The new Notification center is now available to all users so you can be notified of new releases, installation progress updates, and more. Select the bell icon in the bottom-right corner of the Docker Desktop Dashboard to access the notification center.
- Compose Watch is now available to all users. For more information, see Use Compose Watch.
- Resource Saver is now available to all users and is enabled by default. To configure this feature, navigate to the **Resources** tab in **Settings**. For more information see Docker Desktop's Resource Saver mode.
- You can now view and manage the Docker Engine state, with pause, stop, and resume, directly from the Docker Desktop Dashboard.

### Upgrades

- Compose v2.22.0
- Go 1.21.1
- Wasm runtimes:
  - wasmtime, wasmedge `v0.2.0`.
  - lunatic, slight, spin, and wws`v0.9.1`.
  - Added wasmer wasm shims.

### Bug fixes and enhancements

#### For all platforms

- Docker Init:
  - Fixed an issue formatting Dockerfile file paths for ASP.NET projects on Windows.
  - Improved performance on language detection for large directories with lots of files.
- Added a timeout to polling for resource usage stats used by the **Containers** view. Fixes docker/for-mac#6962.
- containerd integration:
  - Implemented push/pull/save image events.
  - Implemented pulling legacy schema1 images.
  - Implemented `docker push --all-tags`.
  - Implemented counting containers using a specific image (visible for example in `docker system df -v`).
  - Validated pulled image names are not reserved.
  - Handle `userns-remap` daemon setting.
  - Fixed legacy builder build errors when multiple COPY/ADD instructions are used.
  - Fixed `docker load` causing pool corruption which could some subsequent image related operations.
  - Fixed not being able to reference images via truncated digest with a `sha256:` prefix.
  - Fixed `docker images` (without `--all`) showing intermediate layers (created by the legacy classic builder).
  - Fixed `docker diff` containing extra differences.
  - Changed `docker pull` output to match the output with containerd integration disabled.
- Fixed a grammatical error in Kubernetes status message. See docker/for-mac#6971.
- Docker containers now use all host CPU cores by default.
- Improved inter-process security in dashboard UI.

#### For Mac

- Fixed a kernel panic on Apple Silicon Macs with macOS version earlier than 12.5. Fixes docker/for-mac#6975.
- Fixed a bug where Docker Desktop failed to start if invalid directories were included in `filesharingDirectories`. Fixes docker/for-mac#6980.
- Fixed a bug where installer is creating root-owned directories. Fixes docker/for-mac#6984.
- Fixed a bug where installer is failing on setting up the docker socket when missing `/Library/LaunchDaemons`. Fixes docker/for-mac#6967.
- Fixed a permission denied error when binding a privileged port to a non-localhost IP on macOS. Fixes docker/for-mac#697.
- Fixed a resource leak introduced in 4.23. Related to docker/for-mac#6953.

#### For Windows

- Fixed a bug where a "Docker Desktop service not running" popup appeared when service is already running. See docker/for-win#13679.
- Fixed a bug that caused Docker Desktop fail to start on Windows hosts. Fixes docker/for-win#13662.
- Modified the Docker Desktop resource saver feature to skip reducing kernel memory on WSL when no containers are running, as this was causing timeouts in some cases. Instead, users are encouraged to enable "autoMemoryReclaim" on WSL directly via the .wslconfig file (available since WSL 1.3.10).

### Known issues

#### For Mac

- Creating a container with the port 53 fails with the error address `already in use`. As a workaround, deactivate network acceleration by adding `"kernelForUDP": false`, in the `settings.json` file located at `~/Library/Group Containers/group.com.docker/settings.json`.

## 4.23.0

### Upgrades

- Compose v2.21.0
- Docker Engine v24.0.6
- Docker Scout CLI v0.24.1.
- Wasm runtimes:
  - wasmtime, wasmedge revision `d0a1a1cd`.
  - slight and spin wasm `v0.9.0`.

### New

- Added support for new Wasm runtimes: wws and lunatic.
- `docker init` now supports ASP.NET
- Increased performance of exposed ports on macOS, for example with `docker run -p`.

### Removed

- Removed Compose V1 from Docker Desktop as it has stopped receiving updates.  Compose V2 has replaced it and is now integrated into all current Docker Desktop versions.

### Bug fixes and enhancements

#### For all platforms

- With Docker Scout, you can now:
  - Manage temporary and cached files with `docker scout cache`.
  - Manage environments with `docker scout environment`.
  - Configure the default organization with `docker scout config`.
  - List packages of an image with their vulnerabilities with `docker scout cves --format only-packages`.
  - Enroll an organization with Docker scout with `docker scout enroll`.
  - Stop, analyze, and compare local file systems with `docker scout cves --type fs`.
- Fixed a bug where `docker stats` would hang when Docker Desktop was in Resource Saver mode.
- Fixed a bug where turning off experimental features via **Settings** in the Docker Desktop Dashboard would not fully turn off Resource Saver mode.
- Fixed a bug where the **Containers list** action button was clipped.
- containerd image store:
  - Fixed `failed to read config content` error when interacting with some images.
  - Fixed building Dockerfiles with `FROM scratch` instruction when using the legacy classic builder (`DOCKER_BUILDKIT=0`).
  - Fixed `mismatched image rootfs errors` when building images with legacy classic builder (`DOCKER_BUILDKIT=0`).
  - Fixed `ONBUILD` and `MAINTAINER` Dockerfile instruction
  - Fixed healthchecks.

#### For Mac

- All users on macOS 12.5 or greater now have VirtioFS turned on by default. You can revert this in **Settings** in the **General** tab.
- Improved single-stream TCP throughput.
- Reinstated the health check for macOS that notifies you if there has been a change on your system which might cause problems running Docker binaries.

#### For Linux

- Fixed a bug where the GUI is killed when opening the Docker Desktop app twice. See docker/desktop-linux#148.

#### For Windows

- Fixed a bug where non-admin users would get prompted for credentials when switching to Windows Containers or after disabling WSL and switching to the Hyper-V engine.
  This issue would occur after an OS restart, or on a cold start of Docker Desktop.

### Security

#### For all platforms

- Fixed CVE-2023-5165 which allows Enhanced Container Isolation bypass via debug shell. The affected functionality is available for Docker Business customers only and assumes an environment where users are not granted local root or Administrator privileges.
- Fixed CVE-2023-5166 which allows Access Token theft via a crafted extension icon URL.

### Known Issues

- Binding a privileged port on Docker Desktop does not work on macOS. As a workaround you can expose the port on all interfaces (using `0.0.0.0`) or using localhost (using `127.0.0.1`).

## 4.22.1

### Bug fixes and enhancements

#### For all platforms

- Mitigated several issues impacting Docker Desktop startup and Resource Saver mode. docker/for-mac#6933

#### For Windows

- Fixed `Clean / Purge data` troubleshoot option on Windows. docker/for-win#13630

## 4.22.0

### Upgrades

- Buildx v0.11.2
- Compose v2.20.2
- Docker Engine v24.0.5

> **Note:**
>
> In this release, the bundled Docker Compose and Buildx binaries show a different version string. This relates to our efforts to test new features without causing backwards compatibility issues.
>
> For example, `docker buildx version` outputs `buildx v0.11.2-desktop.1`.

### New

- Resource Usage has moved from experimental to GA.
- You can now split large Compose projects into multiple sub-projects with `include`.

### Bug fixes and enhancements

#### For all platforms

- Settings Management now lets you turn off Docker Extensions for your organisation.
- Fixed a bug where turning on Kubernetes from the UI failed when the system was paused.
- Fixed a bug where turning on Wasm from the UI failed when the system was paused.
- Bind mounts are now shown when you inspect a container.
- You can now download Wasm runtimes when the containerd image store is enabled.
- With Quick Search, you can now:
  - Find any container or Compose app residing on your local system. In
    addition, you can access environment variables and perform essential actions
    such as starting, stopping, or deleting containers.
  - Find public Docker Hub images, local images, or images from remote
    repositories.
  - Discover more about specific extensions and install them.
  - Navigate through your volumes and gain insights about the associated
    containers.
  - Search and access Docker's documentation.

#### For Mac

- Fixed a bug that prevented Docker Desktop from starting. docker/for-mac#6890
- Resource Saver is now available on Mac. It optimises Docker Desktop's usage of your system resources when no containers are running. To access this feature, make sure you have turned on access to experimental features in settings.

#### For Windows

- Fixed a bug where the self-diagnose tool showed a false-positive failure when vpnkit is expected to be not running. Fixes docker/for-win#13479.
- Fixed a bug where an invalid regular expression in the search bar caused an error. Fixes docker/for-win#13592.
- Resource Saver is now available on Windows Hyper-V. It optimises Docker Desktop's usage of your system resources when no containers are running. To access this feature, make sure you have turned on access to experimental features in settings.

## 4.21.1

#### For all platforms

- Fixed connection leak for Docker contexts using SSH (docker/for-mac#6834 and docker/for-win#13564)

#### For Mac

- Removed configuration health check for further investigation and addressing specific setups.
