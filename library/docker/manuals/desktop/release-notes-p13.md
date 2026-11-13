---
title: "Docker Desktop release notes (part 13 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 13 of 21)

## 4.31.0

### New

- Air-Gapped Containers is now generally available.
- Docker Compose File Viewer shows your Compose YAML with syntax highlighting and contextual links to relevant docs (Beta, progressive rollout).
- New Sidebar user experience.

### Upgrades

- Docker Engine and CLI v26.1.4.
- Docker Scout CLI v1.9.1
- Docker Compose v2.27.1
- Docker Buildx v0.14.1
- Containerd v1.6.33
- Credential Helpers v0.8.2
- NVIDIA Container Toolkit v1.15.0
- Go 1.22.4
- Linux kernel `v6.6.31`

### Bug fixes and enhancements

#### For all platforms

- Newer releases are now displayed in the **Software updates** settings tab when an update has already been downloaded.
- Added `proxyEnableKerberosNTLM` config to `settings.json` to enable fallback to basic proxy authentication if Kerberos/NTLM environment is not properly set up.
- Fixed a bug where Docker Debug was not working properly with Enhanced Container Isolation enabled.
- Fixed a bug where UDP responses were not truncated properly.
- Fixed a bug where the **Update** screen was hidden when using Settings Management.
- Fixed a bug where proxy settings defined in `admin-settings.json` were not applied correctly on startup.
- Fixed a bug where the **Manage Synchronized file shares with Compose** toggle did not correctly reflect the value with the feature.
- Fixed a bug where a bind mounted file modified on host is not updated after the container restarts, when gRPC FUSE file sharing is used on macOS and on Windows with Hyper-V. Fixes docker/for-mac#7274, docker/for-win#14060.
- Builds view:
  - New Import builds feature that lets you import build records for builds by other people, or builds in a CI environment.
  - Fixed missing OpenTelemetry traces in build results for failed builds.
  - Fixed `default-load` appearing as invalid driver-opt for the container driver.
  - Fixed deep link to build details.

#### For Windows

- Changed the `--allowed-org` installer flag to write a policy registry key instead of to the `registry.json`.

#### For Mac

- Moved the setting **Automatically check configuration** from **Advanced** settings to **General** settings.
- Improved VirtioFS caching by implementing longer attributes timeout and invalidation.

#### For Linux

- Added Linux headers to the VM, to ease the compilation of custom kernel modules.

### Security

#### For all platforms

- Fixed a security bug in Enhanced Container Isolation (ECI) mode where a user could create Docker volumes sourced from restricted directories inside the Docker Desktop VM and mount them into containers, thereby giving the container access to such restricted VM directories.
- By default, only extensions listed in the marketplace can be installed in Docker Desktop. This can be changed in Docker Desktop's settings. Extension developers will need to change this option in order to test their extensions.

### For Windows

- Fixed CVE-2024-5652 in which a user in the `docker-users` group can cause a Windows Denial-of-Service through the `exec-path` Docker daemon config option in Windows containers mode. This vulnerability was discovered by Hashim Jawad (@ihack4falafel) working with Trend Micro Zero Day Initiative.

### Deprecation

#### For all platforms

- The CLI binary that used to be shipped as `com.docker.cli` is now shipped simply as `docker`. This release leaves the CLI binary as `com.docker.cli`, but it will be removed next release.

#### For Windows

- Removed support for legacy version packs from the WSL2 engine.

### Known Issues

#### For Windows

- When upgrading to Docker Desktop 4.31.0, existing containers, images and volumes become invisible for users that created those containers and images using Docker Desktop 4.8.0 or lower, on Windows hosts with WSL only. The data is not lost, it just becomes invisible to Docker Desktop 4.31.0. If impacted, downgrade to version 4.30 or earlier. For more information see: docker/for-win#14118.

#### For Linux

- Ubuntu 24.04 LTS is not yet supported, Docker Desktop will fail to start. Due to a change in how the latest Ubuntu release restricts the unprivileged namespaces, `sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0` needs to be ran at least once. Refer to the Ubuntu Blog.

## 4.30.0

### New

#### For all platforms

- Docker Desktop now supports SOCKS5 proxies. Requires a Business subscription.
- Added a new setting to manage the onboarding survey in Settings Management.

#### For Windows

- Added support for Kerberos and NTLM proxy authentication on Windows. Requires a Business subscription.

### Upgrades

- Docker Compose v2.27.0
- Docker Engine v26.1.1
- Wasm runtimes:
  - Updated `runwasi` shims to `v0.4.0`
  - Updated `deislabs` shims to `v0.11.1`
  - Updated `spin` shim to `v0.13.1`
- Docker Scout CLI v1.8.0
- Docker Debug `v0.0.29`
- Linux kernel `v6.6.26`
- Go 1.22.2

### Bug fixes and enhancements

#### For all platforms

- Improved Enhanced Container Isolation (ECI) security when running `docker build` commands in rootless containers.
- Fixed a bug where `docker events` exited with `Unexpected EOF` when Docker Desktop entered/exited Resource Saver mode.
- Fixed a bug where `docker stats --no-stream` hung when Docker Desktop was in Resource Saver mode.
- Fixed a bug in the self-diagnose CLI that incorrectly showed the VM had not started. Fixes docker/for-mac#7241.
- Fixed a bug where high-throughput port forward transfers could stall. Fixes docker/for-mac#7207.
- Fixed CLI-plugin symlinks not being removed when CLI apps were removed.
- Fixed a bug in the shared ports drawer to show the right message for local engines.
- Dev Environments is being sunset and has moved to the **Beta** tab in **Features in development**.
- Builds view:
  - Better bulk delete for build records.
  - Added action to open the relevant web page for container images and Git sources in build dependencies.
  - Added action to download Provenance and OpenTelemetry traces in Jaeger or OTLP format.
  - Fixed source details for remote build invocations.
  - Fixed a bug where multi-platform builds would show up as separate records when using a cloud builder.

#### For Mac

- Fixed a bug where a segmentation fault was triggered with Virtualization Framework, on post-2019 Macs. See docker/for-mac#6824.
- Enabled `CONFIG_SECURITY=y` kernel config, for example for Tetragon. Fixes docker/for-mac#7250.
- Re-added support for `SQUASHFS` compression. Fixes docker/for-mac#7260.
- Fixed a bug that caused a new version of Docker Desktop to be marked as damaged.
- Increased network MTU when using qemu on Apple Silicon.
- Fixed a bug preventing Docker Desktop to start if Rosetta was not installed. Fixes docker/for-mac#7243.

#### For Windows

- Added a simplified provisioning mode for WSL2 that avoids the need for the ancillary `docker-desktop-data` WSL distribution (experimental).
- Fixed bash completions for the Docker CLI in a WSL environment.
- Fixed a regression in Docker Desktop 4.28 that caused host files bind-mounted into containers to not show up properly inside the container, when using Docker-in-Docker (via mounts of `/var/run/docker.sock`) on WSL.
- Fixed a bug that would cause the following error `merging settings: integratedWslDistros type mismatch`.

### Known issues

#### For all platforms

- If you have enabled a feature in Docker Desktop that requires you to be signed in, such as **Host networking** you must remain signed in to use Docker Desktop. To continue using Docker Desktop or to modify these settings, ensure you are signed in.
- To enable or disable **Manage Synchronized file shares with Compose**, **Access experimental features** and **Manage Synchronized file shares with Compose** have to be checked or unchecked at the same time.
- The Docker CLI will sometimes hang when running a container with the autoremove option (`--rm`) if the container fails to start (e.g.: `docker run --rm alpine invalidcommand`). In this case, the CLI process may need to be manually killed.

#### For Windows

- When starting Docker Desktop as a non-admin user, the following error connect `ENOENT \\.\pipe\errorReporter` might be triggered if the user is not a member of the **docker-users** group.
This can be resolved by adding the user to the **docker-users** group. Before starting Docker Desktop, make sure to sign out and then sign back in and unregister `docker-desktop` distribution if that was created, using `wsl --unregister docker-desktop`.

#### For Linux

- Ubuntu 24.04 LTS is not yet supported, Docker Desktop will fail to start. Due to a change in how the latest Ubuntu release restricts the unprivileged namespaces, `sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0` needs to be ran at least once. Refer to the Ubuntu Blog for more details.

## 4.29.0

### New

- You can now enforce Rosetta usage via Settings Management.
- Docker socket mount restrictions with ECI is now generally available.
- Docker Engine and CLI updated to Moby 26.0. This includes Buildkit 0.13, sub volumes mounts, networking updates, and improvements to the containerd multi-platform image store UX.
- New and improved Docker Desktop error screens: swift troubleshooting, easy diagnostics uploads, and actionable remediation.
- Compose supports Synchronized file shares (experimental).
- New interactive Compose CLI (experimental).
- Beta release of:
  - Air-Gapped Containers with Settings Management.
  - Host networking in Docker Desktop.
  - Docker Debug for running containers.
  - Volumes Backup & Share extension functionality available in the **Volumes** tab.

### Upgrades

- Docker Compose v2.26.1
- Docker Scout CLI v1.6.3
- Docker Engine v26.0.0
- Buildx v0.13.1
- Kubernetes v1.29.2
- cri-dockerd v0.3.11
- Docker Debug v0.0.27

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue with dropdown menu opening beyond the application window.
- Docker Init:
  - Updated the formatting of CLI output to improve legibility.
  - Fixed an issue with `.dockerignore` to avoid ignoring application files that start with "compose".
  - Improved how Java applications are started based on Spring Boot version. Fixes docker/for-mac#7171.
  - Removed non-official Docker image used for Rust cross-compilation.
- The maximum number of files per Synchronized file share now exceeds 2 million.
- Fixed an issue that caused the warning: "_The value provided to Autocomplete is invalid._" when selecting the **Export to local image** field.
- **Run Cloud** can now be accessed from the Docker Desktop Dashboard.
- Opting out from sending analytics will now also disable collecting data for bug reports.
- You can now share and unshare a port to the Cloud Engine in the **Containers** view.
- Shared cloud can now be accessed from the footer in the right-hand side of the **Dashboard**.
- Added beta support for host networking on macOS, Windows and Docker Desktop for Linux  docker#238.
- Added a timestamp to new unread notifications.
- Fixed typo in the virtualization support error message. Fixes docker/desktop-linux#197.
- Docker Desktop now allows connections to `host.docker.internal` to be blocked by a rule in a PAC file.
- Fixed the placement of the secondary menu in the **Images** and **Containers** lists.
- Fixed a race condition that occurred when starting Docker Desktop with QEMU.
- Improved the error message when an image pull is blocked by Registry Access Management policy.
- Re-add `CONFIG_BONDING=y` in the kernel config.

#### For Mac

- Fixed Kubernetes not starting successfully. Fixes docker/for-mac#7136 and docker/for-mac#7031.
- Fixed a bug when the browser was not able to send back authentication information to Docker Desktop. Fixes docker/for-mac/issues#7160.

#### For Windows

- Fixed a bug where `docker run -v` would fail after switching between WSL 2 and Hyper-V.
- Fixed a bug where Docker Desktop was not stopping its WSL distributions (`docker-desktop` and `docker-desktop-data`) when it was shutdown. Fixes docker/for-win/issues/13443 and docker/for-win/issues/13938.

#### For Linux

- Fixed an issue that caused the list of available experimental features in the UI to become out-of-sync with the backend data.

#### Security

- Disabled Electron `runAsNode` fuse to improve security hardening. For more info, see Electron's documentation..
- Fixed CVE-2024-6222 which allows an attacker who has gained access to the Docker Desktop VM through a container breakout to further escape to the host by passing extensions and dashboard related IPC messages. Reported by Billy Jheng Bing-Jhong, Đỗ Minh Tuấn, Muhammad Alifa Ramdhan working with Trend Micro Zero Day Initiative.

### Known issues

#### For Mac

- Docker Desktop on Apple Silicon doesn't start if Rosetta is not installed. This will be fixed in future releases. See docker/for-mac#7243.
