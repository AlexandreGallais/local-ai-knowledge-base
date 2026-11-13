---
title: "Docker Desktop release notes (part 17 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 17 of 21)

## 4.17.0

### New

- Docker Desktop now ships with Docker Scout. Pull and view analysis for images from Docker Hub and Artifactory repositories, get base image updates and recommended tags and digests, and filter your images on vulnerability information. To learn more, see Docker Scout.
- `docker scan` has been replaced by `docker scout`. See Docker Scout CLI, for more information.
- You can now discover extensions that have been autonomously published in the Extensions Marketplace. For more information on self-published extensions, see Marketplace Extensions.
- **Container File Explorer** is available as an experimental feature. Debug the filesystem within your containers straight from the GUI.
- You can now search for volumes in **Global Search**.

### Upgrades

- Containerd v1.6.18, which includes fixes for CVE-2023-25153 and CVE-2023-25173.
- Docker Engine v20.10.23.
- Go 1.19.5

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where diagnostic gathering could hang waiting for a subprocess to exit.
- Prevented the transparent HTTP proxy from mangling requests too much. Fixes Tailscale extension login, see tailscale/docker-extension#49.
- Fixed a bug in the transparent TLS proxy where the Server Name Indication field is not set.
- Added support for subdomain match, CIDR match, `.` and `*.` in HTTP proxy exclude lists.
- Ensured HTTP proxy settings are respected when uploading diagnostics.
- Fixed fatal error when fetching credentials from the credential helper.
- Fixed fatal error related to concurrent logging.
- Improved the UI for Extension actions in the Marketplace.
- Added new filters in the Extensions Marketplace. You can now filter extensions by category and reviewed status.
- Added a way to report a malicious extension to Docker.
- Updated Dev Environments to v0.2.2 with initial set up reliability & security fixes.
- Added a whalecome survey for new users only.
- The confirmation dialogs on the troubleshooting page are now consistent in style with other similar dialogs.
- Fixed fatal error caused by resetting the Kubernetes cluster before it has started.
- Implemented `docker import` for the containerd integration.
- Fixed image tagging with an existing tag with the containerd integration.
- Implemented the dangling filter on images for the containerd integration.
- Fixed `docker ps` failing with containers whose images are no longer present with the containerd integration.

#### For Mac

- Fixed download of Registry Access Management policy on systems where the privileged helper tool `com.docker.vmnetd` is not installed.
- Fixed a bug where `com.docker.vmnetd` could not be installed if `/Library/PrivilegedHelperTools` does not exist.
- Fixed a bug where the "system" proxy would not handle "autoproxy" / "pac file" configurations.
- Fixed a bug where vmnetd installation fails to read `Info.Plist` on case-sensitive file systems. The actual filename is `Info.plist`. Fixes docker/for-mac#6677.
- Fixed a bug where user is prompted to create the docker socket symlink on every startup. Fixes docker/for-mac#6634.
- Fixed a bug that caused the **Start Docker Desktop when you log in** setting not to work. Fixes docker/for-mac#6723.
- Fixed UDP connection tracking and `host.docker.internal`. Fixes docker/for-mac#6699.
- Improved kubectl symlink logic to respect existing binaries in `/usr/local/bin`. Fixes docker/for-mac#6328.
- Docker Desktop now automatically installs Rosetta when you opt-in to use it but have not already installed it.

### For Windows

- Added statical linking of WSL integration tools against `musl` so there is no need to install `alpine-pkg-glibc` in user distributions.
- Added support for running under cgroupv2 on WSL 2. This is activated by adding `kernelCommandLine = systemd.unified_cgroup_hierarchy=1 cgroup_no_v1=all` to your `%USERPROFILE%\.wslconfig` file in the `[wsl2]` section.
- Fixed an issue that caused Docker Desktop to get stuck in the "starting" phase when in WSL 2 mode (introduced in 4.16).
- Fixed Docker Desktop failing to start the WSL 2 backend when file system compression or encryption is enabled on `%LOCALAPPDATA%`.
- Fixed Docker Desktop failing to report a missing or outdated (incapable of running WSL version 2 distributions) WSL installation when starting.
- Fixed a bug where opening in Visual Studio Code fails if the target path has a space.
- Fixed a bug that causes `~/.docker/context` corruption and the error message "unexpected end of JSON input". You can also remove `~/.docker/context` to work around this problem.
- Ensured the credential helper used in WSL 2 is properly signed. Related to docker/for-win#10247.
- Fixed an issue that caused WSL integration agents to be terminated erroneously. Related to docker/for-win#13202.
- Fixed corrupt contexts on start. Fixes docker/for-win#13180 and docker/for-win#12561.

### For Linux

- Added Docker Buildx plugin for Docker Desktop for Linux.
- Changed compression algorithm to `xz` for RPM and Arch Linux distribution.
- Fixed a bug that caused leftover files to be left in the root directory of the Debian package. Fixes docker/for-linux#123.

### Security

#### For all platforms

- Fixed CVE-2023-0628, which allows an attacker to execute an arbitrary command inside a Dev Environments container during initialization by tricking a user to open a crafted malicious `docker-desktop://` URL.
- Fixed CVE-2023-0629, which allows an unprivileged user to bypass Enhanced Container Isolation (ECI) restrictions by setting the Docker host to `docker.raw.sock`, or `npipe:////.pipe/docker_engine_linux` on Windows, via the `-H` (`--host`) CLI flag or the `DOCKER_HOST` environment variable and launch containers without the additional hardening features provided by ECI. This does not affect already running containers, nor containers launched through the usual approach (without Docker's raw socket).

## 4.16.3

### Bug fixes and enhancements

#### For Windows

- Fixed Docker Desktop failing to start the WSL 2 backend when file system compression or encryption is enabled on `%LOCALAPPDATA%`. Fixes docker/for-win#13184.
- Fixed Docker Desktop failing to report a missing or outdated WSL installation when starting. Fixes docker/for-win#13184.

## 4.16.2

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where `docker build` and `docker tag` commands produced an `image already exists` error if the containerd integration feature is enabled.
- Fixed a regression introduced with Docker Desktop 4.16 breaking networking from containers with target platform linux/386 on amd64 systems. Fixes docker/for-mac/6689.

#### For Mac

- Fixed the capitalization of `Info.plist` which caused `vmnetd` to break on case-sensitive file systems. Fixes docker/for-mac/6677.

#### For Windows

- Fixed a regression introduced with Docker Desktop 4.16 causing it to get stuck in the "starting" phase when in WSL2 mode. Fixes docker/for-win/13165

## 4.16.1

### Bug fixes and enhancements

#### For all platforms

- Fixed `sudo` inside a container failing with a security related error for some images. Fixes docker/for-mac/6675 and docker/for-win/13161.

## 4.16.0

### New

- Extensions have moved from Beta to GA.
- Quick Search has moved from experimental to GA.
- Extensions are now included in Quick Search.
- Analyzing large images is now up to 4x faster.
- New local images view has moved from experimental to GA.
- New Beta feature for MacOS 13, Rosetta for Linux, has been added for faster emulation of Intel-based images on Apple Silicon.

### Upgrades

- Compose v2.15.1
- Containerd v1.6.14
- Docker Engine v20.10.22
- Buildx v0.10.0
- Docker Scan v0.23.0
- Go 1.19.4

### Bug fixes and enhancements

#### For all platforms

- Fixed `docker build --quiet` not outputting the image identifier with the `containerd` integration.
- Fixed image inspect not showing image labels with the `containerd` integration.
- Increased the contrast between running and stopped container icons to make it easier for colorblind people to scan the containers list.
- Fixed a bug where the user is prompted for new HTTP proxy credentials repeatedly until Docker Desktop is restarted.
- Added a diagnostics command `com.docker.diagnose login` to check HTTP proxy configuration.
- Fixed actions on compose stack not working properly. Fixes docker/for-mac#6566.
- Fixed the Docker Desktop Dashboard trying at startup to get disk usage information and display an error banner before the engine was running.
- Added an informational banner with instructions on how to opt-out of experimental feature access next to all experimental features.
- Docker Desktop now supports downloading Kubernetes images via an HTTP proxy.
- Fixed tooltips to not block action buttons. Fixes docker/for-mac#6516.
- Fixed the blank "An error occurred" container list on the **Container** view.

#### For Mac

- Minimum OS version to install or update Docker Desktop on macOS is now macOS Big Sur (version 11) or later.
- Fixed the Docker engine not starting when Enhanced Container Isolation is enabled if the legacy `osxfs` implementation is used for file sharing.
- Fixed files created on VirtioFS having the executable bit set. Fixes docker/for-mac#6614.
- Added back a way to uninstall Docker Desktop from the command line. Fixes docker/for-mac#6598.
- Fixed hardcoded `/usr/bin/kill`. Fixes docker/for-mac#6589.
- Fixed truncation (for example with the `truncate` command) of very large files (> 38GB) shared on VirtioFS with an incorrect size.
- Changed the disk image size in **Settings** to use the decimal system (base 10) to coincide with how Finder displays disk capacity.
- Fixed Docker crash under network load. Fixes docker/for-mac#6530.
- Fixed an issue causing Docker to prompt the user to install the `/var/run/docker.sock` symlink after every reboot.
- Ensured the Login Item which installs the `/var/run/docker.sock` symlink is signed.
- Fixed bug where `$HOME/.docker` was removed on factory reset.

### For Windows

- Fixed `docker build` hanging while printing "load metadata for". Fixes docker/for-win#10247.
- Fixed typo in diagnose.exe output Fixes docker/for-win#13107.
- Added support for running under cgroupv2 on WSL 2. This is activated by adding `kernelCommandLine = systemd.unified_cgroup_hierarchy=1 cgroup_no_v1=all` to your `%USERPROFILE%\.wslconfig` file in the `[wsl2]` section.

### Known Issues

- Calling `sudo` inside a container fails with a security related error for some images. See docker/for-mac/6675 and docker/for-win/13161.

## 4.15.0

### New

- Substantial performance improvements for macOS users with the option of enabling the new VirtioFS file sharing technology. Available for macOS 12.5 and above.
- Docker Desktop for Mac no longer needs to install the privileged helper process `com.docker.vmnetd` on install or on the first run. For more information see Permission requirements for Mac.
- Added WebAssembly capabilities. Use with the containerd integration.
- Improved the descriptions for beta and experimental settings to clearly explain the differences and how people can access them.
- Available disk space of VM now displays in the footer of Docker Desktop Dashboard for Mac and Linux.
- A disk space warning now displays in the footer if available space is below 3GB.
- Changes to Docker Desktop's interface as we become more ADA accessible and visually unified.
- Added a **Build** tab inside **Extensions** which contains all the necessary resources to build an extension.
- Added the ability to share extensions more easily, either with `docker extension share` CLI or with the share button in the extensions **Manage** tab.
- Extensions in the Marketplace now display the number of installs. You can also sort extensions by the number of installs.
- Dev Environments allow cloning a Git repository to a local bind mount, so you can use any local editor or IDE.
- More Dev Environments improvements: custom names, better private repo support, improved port handling.

### Upgrades

- Compose v2.13.0
- Containerd v1.6.10
- Docker Hub Tool v0.4.5
- Docker Scan v0.22.0

### Bug fixes and enhancements

#### For all platforms

- Containers are now restored on restart with the containerd integration.
- Fixed listing multi-platform images with the containerd integration.
- Better handling of dangling images with the containerd integration.
- Implement "reference" filter for images with the containerd integration.
- Added support for selecting upstream HTTP/HTTPS proxies automatically via `proxy.pac` in containers, `docker pull` etc.
- Fixed regressions when parsing image references on pull. Fixes docker/for-win#13053, docker/for-mac#6560, and docker/for-mac#6540.

#### For Mac

- Improved the performance of `docker pull`.

#### For Windows

- Fixed an issue where the system HTTP proxies were not used when Docker starts and the developer logs in.
- When Docker Desktop is using "system" proxies and if the Windows settings change, Docker Desktop now uses the new Windows settings without a restart.

#### For Linux

- Fixed hot-reload issue on Linux. Fixes docker/desktop-linux#30.
- Disabled tray icon animations on Linux which fixes crashes for some users.

## 4.14.1

### Bug fixes and enhancements

#### For all platforms

- Fixed container DNS lookups when using Registry Access Management.

#### For Mac

- Fixed an issue preventing the **Analyze Image** button on the **Images** tab from working.
- Fixed a bug causing symlinks to not be created for the user if `/usr/local/lib` doesn't already exist. Fixes docker/for-mac#6569
