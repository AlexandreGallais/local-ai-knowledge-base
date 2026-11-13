---
title: "Docker Desktop release notes (part 18 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 18 of 21)

## 4.14.0

### New

- Set Virtualization framework as the default hypervisor for macOS >= 12.5.
- Migrate previous install to Virtualization framework hypervisor for macOS >= 12.5.
- The Enhanced Container Isolation feature, available to Docker Business users, can now be enabled from the General Settings.

### Updates

- Docker Engine v20.10.21,
  which contains mitigations against a Git vulnerability, tracked in CVE-2022-39253,
  and updates the handling of `image:tag@digest` image references.
- Docker Compose v2.12.2
- Containerd v1.6.9
- Go 1.19.3

### Bug fixes and enhancements

#### For all platforms

- Docker Desktop now requires an internal network subnet of size /24. If you were previously using a /28, it is automatically expanded to /24. If you experience networking issues, check to see if you have a clash between the Docker subnet and your infrastructure. Fixes docker/for-win#13025.
- Fixed an issue that prevents users from creating Dev Environments when the Git URL has upper-case characters.
- Fix the `vpnkit.exe is not running` error reported in diagnostics.
- Reverted qemu to 6.2.0 to fix errors like `PR_SET_CHILD_SUBREAPER is unavailable` when running emulated amd64 code.
- Enabled contextIsolation and sandbox mode inside Extensions. Now Extensions run in a separate context and this limits the harm that malicious code can cause by limiting access to most system resources.
- Included `unpigz` to allow parallel decompression of pulled images.
- Fixed issues related to performing actions on selected containers. Fixes https://github.com/docker/for-win/issues/13005
- Added functionality that allows you to display timestamps for your container or project view.
- Fixed a possible segfault when interrupting `docker pull` with Control+C.
- Increased the default DHCP lease time to avoid the VM's network glitching and dropping connections every two hours.
- Removed the infinite spinner on the containers list. Fixes https://github.com/docker/for-mac/issues/6486
- Fixed bug which showed incorrect values on used space in **Settings**.
- Fixed a bug that caused Kubernetes not to start with the containerd integration.
- Fixed a bug that caused `kind` not to start with the containerd integration.
- Fixed a bug that caused Dev Environments to not work with the containerd integration.
- Implemented `docker diff` in the containerd integration.
- Implemented `docker run —-platform` in the containerd integration.
- Fixed a bug that caused insecure registries not to work with the containerd integration.

#### For Mac

- Fixed a startup failure for users of Virtualization framework.
- Re-added the `/var/run/docker.sock` on Mac by default, to increase compatibility with tooling like `tilt` and `docker-py.`
- Fixed an issue that prevented the creation of Dev Environments on new Mac installs (error "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?").

#### For Windows

- Re-added `DockerCli.exe -SharedDrives`. Fixes docker/for-win#5625.
- Docker Desktop now allows Docker to function on machines where PowerShell is disabled.
- Fixed an issue where Compose v2 was not always enabled by default on Windows.
- Docker Desktop now deletes the `C:\Program Files\Docker` folder at uninstall.

### Known Issues

- For some users on Mac OS there is a known issue with the installer that prevents the installation of a new helper tool needed for the experimental vulnerability and package discovery feature in Docker Desktop. To fix this, a symlink is needed that can be created with the following command: `sudo ln -s /Applications/Docker.app/Contents/Resources/bin/docker-index /usr/local/bin/docker-index`

## 4.13.1

### Updates

- Docker Compose v2.12.1

### Bug fixes and enhancements

#### For all platforms

- Fixed a possible segfault when interrupting `docker pull` with `Control+C` or `CMD+C`.
- Increased the default DHCP lease time to avoid the VM's network glitching and dropping connections every two hours.
- Reverted `Qemu` to `6.2.0` to fix errors like `PR_SET_CHILD_SUBREAPER is unavailable` when running emulated amd64 code.

#### For Mac

- Added back the `/var/run/docker.sock` symlink on Mac by default, to increase compatibility with tooling like `tilt` and `docker-py`. Fixes docker/for-mac#6529.
- Fixed an issue preventing the creation of Dev Environments on new Mac installs and causing `error "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?")`

#### For Windows

- Docker Desktop now functions on machines where PowerShell is disabled.

## 4.13.0

### New

- Two new security features have been introduced for Docker Business users, Settings Management and Enhanced Container Isolation. Read more about Docker Desktop’s new Hardened Docker Desktop security model.
- Added the new Dev Environments CLI `docker dev`, so you can create, list, and run Dev Envs via command line. Now it's easier to integrate Dev Envs into custom scripts.
- Docker Desktop can now be installed to any drive and folder using the `--installation-dir`. Partially addresses docker/roadmap#94.

### Updates

- Docker Scan v0.21.0
- Go 1.19.2 to address CVE-2022-2879, CVE-2022-2880 and CVE-2022-41715
- Updated Docker Engine and Docker CLI to v20.10.20,
  which contain mitigations against a Git vulnerability, tracked in CVE-2022-39253,
  and updated handling of `image:tag@digest` image references, as well as a fix for CVE-2022-36109.
- Docker Credential <example-value> v0.7.0
- Docker Compose v2.12.0
- Kubernetes v1.25.2
- Qemu 7.0.0 used for cpu emulation, inside the Docker Desktop VM.
- Linux kernel 5.15.49

### Bug fixes and enhancements

#### For all platforms

- Docker Desktop now allows the use of TLS when talking to HTTP and HTTPS proxies to encrypt proxy usernames and passwords.
- Docker Desktop now stores HTTP and HTTPS proxy passwords in the OS credential store.
- If Docker Desktop detects that the HTTP or HTTPS proxy password has changed then it will prompt developers for the new password.
- The **Bypass proxy settings for these hosts and domains** setting now handles domain names correctly for HTTPS.
- The **Remote Repositories** view and Tip of the Day now works with HTTP and HTTPS proxies which require authentication
- We’ve introduced dark launch for features that are in early stages of the product development lifecycle. Users that are opted in can opt out at any time in the settings under the “beta features” section.
- Added categories to the Extensions Marketplace.
- Added an indicator in the whale menu and on the **Extension** tab on when extension updates are available.
- Fixed failing uninstalls of extensions with image names that do not have a namespace, as in 'my-extension'.
- Show port mapping explicitly in the **Container** tab.
- Changed the refresh rate for disk usage information for images to happen automatically once a day.
- Made the tab style consistent for the **Container** and **Volume** tabs.
- Fixed Grpcfuse filesharing mode enablement in **Settings**. Fixes docker/for-mac#6467
- Virtualization Framework and VirtioFS are disabled for users running macOS < 12.5.
- Ports on the **Containers** tab are now clickable.
- The Extensions SDK now allows `ddClient.extension.vm.cli.exec`, `ddClient.extension.host.cli.exec`, `ddClient.docker.cli.exec` to accept a different working directory and pass <example-value> variables through the options parameters.
- Added a small improvement to navigate to the Extensions Marketplace when clicking on **Extensions** in the sidebar.
- Added a badge to identify new extensions in the Marketplace.
- Fixed kubernetes not starting with the containerd integration.
- Fixed `kind` not starting with the containerd integration.
- Fixed dev environments not working with the containerd integration.
- Implemented `docker diff` in the containerd integration.
- Implemented `docker run —-platform` in the containerd integration.
- Fixed insecure registries not working with the containerd integration.
- Fixed a bug that showed incorrect values on used space in **Settings**.
- Docker Desktop now installs credential <example-value> from Github releases. See docker/for-win#10247, docker/for-win#12995.
- Fixed an issue where users were logged out of Docker Desktop after 7 days.

#### For Mac

- Added **Hide**, **Hide others**, **Show all** menu items for Docker Desktop. See docker/for-mac#6446.
- Fixed a bug which caused the application to be deleted when running the install utility from the installed application. Fixes docker/for-mac#6442.
- By default Docker will not create the /var/run/docker.sock symlink on the host and use the docker-desktop CLI context instead.

#### For Linux

- Fixed a bug that prevented pushing images from the Dashboard

## 4.12.0

### New

- Added the ability to use containerd for pulling and storing images. This is an experimental feature.
- Docker Desktop now runs untagged images. Fixes docker/for-mac#6425.
- Added search capabilities to Docker Extension's Marketplace. Fixes docker/roadmap#346.
- Added the ability to zoom in, out or set Docker Desktop to Actual Size. This is done by using keyboard shortcuts ⌘ + / CTRL +, ⌘ - / CTRL -, ⌘ 0 / CTRL 0 on Mac and Windows respectively, or through the View menu on Mac.
- Added compose stop button if any related container is stoppable.
- Individual compose containers are now deletable from the **Container** view.
- Removed the workaround for virtiofsd <-> qemu protocol mismatch on Fedora 35, as it is no longer needed. Fedora 35 users should upgrade the qemu package to the most recent version (qemu-6.1.0-15.fc35 as of the time of writing).
- Implemented an integrated terminal for containers.
- Added a tooltip to display the link address for all external links by default.

### Updates

- Docker Compose v2.10.2
- Docker Scan v0.19.0
- Kubernetes v1.25.0
- Go 1.19
- cri-dockerd v0.2.5
- Buildx v0.9.1
- containerd v1.6.8
- containerd v1.6.7
- runc v1.1.4
- runc v1.1.3

### Security

#### For all platforms

- Fixed CVE-2023-0626 which allows RCE via query parameters in the message-box route in the Electron client.
- Fixed CVE-2023-0625 which allows RCE via extension description/changelog which could be abused by a malicious extension.

#### For Windows

- Fixed CVE-2023-0627 which allows to bypass for the `--no-windows-containers` installation flag which was introduced in version 4.11. This flag allows administrators to disable the use of Windows containers.
- Fixed CVE-2023-0633 in which an argument injection to the Docker Desktop installer which may result in local privilege escalation.

### Bug fixes and minor enhancements

#### For all platforms

- Compose V2 is now enabled after factory reset.
- Compose V2 is now enabled by default on new installations of Docker Desktop.
- Precedence order of environment variables in Compose is more consistent, and clearly documented.
- Upgraded kernel to 5.10.124.
- Improved overall performance issues caused by calculating disk size. Related to docker/for-win#9401.
- Docker Desktop now prevents users on ARM macs without Rosetta installed from switching back to Compose V1, which has only intel binaries.
- Changed the default sort order to descending for volume size and the **Created** column, along with the container's **Started** column.
- Re-organized container row actions by keeping only the start/stop and delete actions visible at all times, while allowing access to the rest via the row menu item.
- The Quickstart guide now runs every command immediately.
- Defined the sort order for container/compose **Status** column to running > some running > paused > some paused > exited > some exited > created.
- Fixed issues with the image list appearing empty in Docker Desktop even though there are images. Related to docker/for-win#12693 and docker/for-mac#6347.
- Defined what images are "in use" based on whether or not system containers are displayed. If system containers related to Kubernetes and Extensions are not displayed, the related images are not defined as "in use."
- Fixed a bug that made Docker clients in some languages hang on `docker exec`. Fixes https://github.com/apocas/dockerode/issues/534.
- A failed spawned command when building an extension no longer causes Docker Desktop to unexpectedly quit.
- Fixed a bug that caused extensions to be displayed as disabled in the left menu when they are not.
- Fixed `docker login` to private registries when Registry Access Management is enabled and access to Docker Hub is blocked.
- Fixed a bug where Docker Desktop fails to start the Kubernetes cluster if the current cluster metadata is not stored in the `.kube/config` file.
- Updated the tooltips in Docker Desktop and MUI theme package to align with the overall system design.
- Copied terminal contents do not contain non-breaking spaces anymore.

#### For Mac

- Minimum version to install or update Docker Desktop on macOS is now 10.15. Fixes docker/for-mac#6007.
- Fixed a bug where the Tray menu incorrectly displays "Download will start soon..." after downloading the update. Fixes some issue reported in for-mac/issues#5677
- Fixed a bug that didn't restart Docker Desktop after applying an update.
- Fixed a bug that caused the connection to Docker to be lost when the computer sleeps if a user is using virtualization.framework and restrictive firewall software.
- Fixed a bug that caused Docker Desktop to run in the background even after a user had quit the application. Fixes docker/for-mac##6440
- Disabled both Virtualization Framework and VirtioFS for users running macOS < 12.5

#### For Windows

- Fixed a bug where versions displayed during an update could be incorrect. Fixes for-win/issues#12822.

## 4.11.1

### Bug fixes and enhancements

#### For all platforms

- Fixed regression preventing VM system locations (e.g. /var/lib/docker) from being bind mounted for-mac/issues#6433

#### For Windows

- Fixed `docker login` to private registries from WSL2 distribution docker/for-win#12871
