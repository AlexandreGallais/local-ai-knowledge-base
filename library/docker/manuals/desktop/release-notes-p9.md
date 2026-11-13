---
title: "Docker Desktop release notes (part 9 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 9 of 21)

## 4.48.0

> **Important:**
>
> Support for macOS 13 has ended. Installing Docker Desktop will require macOS 14 in the next release.

### New

- You can now specify PAC files and Embedded PAC scripts with installer flags for macOS and Windows.
- Administrators can set proxy settings via macOS configuration profiles.

### Upgrades

- Docker Compose v2.40.0
- Docker Buildx v0.29.1
- Docker Engine v28.5.1
- Docker MCP plugin `v0.22.0`
- Docker Model CLI v0.1.42

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where kind cluster state is sometimes reset when Desktop restarts. Fixes docker/for-mac#77445.
- Removed the obsolete `mcp` key to align with the latest VS Code MCP server changes.
- Update credential helpers to v0.9.4.
- Fixed an issue where Docker Desktop used an expired proxy password while waiting for the user to enter a new one.
- Fixed a bug which caused Docker Desktop to regularly create new processes with Docker CLI tools under certain conditions. Fixes docker/for-win#14944.
- Fixed a bug which caused models to not be configured for embeddings with Docker Model Runner via Compose. To specify that a model should be configured for embeddings, you must explicitly add the `--embeddings` runtime flag as described in AI Models in Docker Compose. Fixes docker/model-runner#166.

#### For Windows

- Removed the `HKLM\SOFTWARE\Docker Inc.\Docker\1.0` registry key. Look for `docker.exe` in the path to find out where Docker Desktop is installed instead.
- Fixed startup in WSL 2 mode when IPv6 has been disabled.

## 4.47.0

### Security

- Fixed CVE-2025-10657 where the Enhanced Container Isolation Docker Socket command restrictions feature was not working properly in Docker Desktop 4.46.0 only (the configuration for it was being ignored).

### New

- Added dynamic MCP server discovery and support to Docker's MCP catalog.
- With Enhanced Container Isolation, administrators can now block `docker plugin` and `docker login` commands in containers with Docker socket mounts.
- Added a new Docker Model Runner command. With `docker model requests` you can fetch requests and responses.

### Upgrades

- Docker Compose v2.39.4
- Kubernetes v1.34.1
  - CNI plugins v1.7.1
  - cri-tools v1.33.0
  - cri-dockerd v0.3.20
- Docker Debug `v0.0.44`

### Bug fixes and enhancements

#### For all platforms

- You can now search for MCP servers more easily with filters, sorting, and improved search functionality.
- Docker Debug no longer hangs when debugging containers that have environment variables set to an empty value.
- Enhanced Docker Model Runner with rich response rendering in the CLI, conversational context in the Docker Desktop Dashboard, and resumable downloads.

#### For Mac

- Removed the `com.apple.security.cs.allow-dyld-environment-variables` entitlement which allow a signed, arbitrary dynamic library to be loaded with Docker Desktop via the `DYLD_INSERT_LIBRARIES` environment variable.
- Fixed a regression where config profile sign-in enforcement broke for some customer environments.
- Fixed a bug that sometimes caused the `docker model package` command to hang when writing to the local content store (without the `--push` flag).
- Fixed a bug where containers started with the restart policy `unless-stopped` were never restarted. Fixes docker/for-mac#7744.

#### For Windows

- Fixed the Goose MCP client connection on Windows for the Docker MCP Toolkit.
- Addressed an issue with the "Skipping integration" of a WSL distro option, after a failed integration attempt.
- Fixed a bug that sometimes caused the `docker model package` command to hang when writing to the local content store (without the `--push` flag).

## 4.46.0

### New

- Added a new Learning center walkthrough for Docker MCP Toolkit and other onboarding improvements.
- Administrators can now control PAC configurations with Settings Management.
- The update experience has been redesigned to make it easier to understand and manage updates for Docker Desktop and its components.

### Upgrades

- Docker Buildx v0.28.0
- Docker Engine v28.4.0

### Bug fixes and enhancements

#### For all platforms

- With the Docker CLI, you can now set the `GODEBUG` environment variable when the key-value pair (`"GODEBUG":"..."`) exists inside the Docker context metadata. This means certificates that have negative serial numbers in the CLI binaries are supported by default.
- Updated the Docker Subscription Service Agreement link to point to the latest version.

#### For Mac

- Improved the security of Docker Model Runner by enabling sandboxing of the `llama.cpp` inference processes.
- Fixed a bug which caused Docker Desktop to start slowly and appear frozen. Fixes docker/for-mac#7671.

#### For Windows

- Improved the security of Docker Model Runner by enabling sandboxing of the `llama.cpp` inference processes.

#### For Linux

- Fixed a path issue in the RHEL post-uninstall sequence.

## 4.45.0

### New

- Docker Model Runner is now generally available.

### Upgrades

- Docker Compose v2.39.2
- Docker Buildx v0.27.0
- Docker Scout CLI v1.18.3
- Docker Engine v28.3.3

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug that caused the `com.docker.diagnose` to crash when uploading a diagnostics bundle behind a proxy that requires authentication.
- The `kind` dependency image `envoyproxy/envoy` was upgraded from v1.32.0 to v1.32.6. If you mirror `kind` images, ensure your mirrors are updated.

#### For Mac

- Fixed a bug that caused Docker Desktop to crash after the laptop woke from sleep. Fixes docker/for-mac#7741.
- Fixed an issue where the VM would sometimes fail with the error **The virtual machine stopped unexpectedly.**
- Fixed a bug that would break port mappings when a container was connected to or disconnected from a network after it was started. Fixes docker/for-mac#7693.

#### For Windows

- Fixed a bug that prevented CLI plugins from being deployed to `~/.docker/cli-plugins` by default when users lacked the correct permissions.
- Fixed a bug where relocating the WSL data distribution would fail if the `docker-desktop` distribution was not present.
- Fixed a typo in the WSL install URL in the Docker Desktop Dashboard.
- Fixed an issue where certain WSL distros would fail to integrate. Fixes docker/for-win#14686

## 4.44.3

### Security

- Fixed CVE-2025-9074 where a malicious container running on Docker Desktop could access the Docker Engine and launch additional containers without requiring the Docker socket to be mounted. This could allow unauthorized access to user files on the host system. Enhanced Container Isolation (ECI) does not mitigate this vulnerability.

### Bug fixes and enhancements

- Fixed a bug which caused the Docker Offload dialog to block users from accessing the dashboard.

## 4.44.2

### Bug fixes and enhancements

 - Adds Docker Offload to the **Beta features** settings tab and includes updates to support Docker Offload Beta.

## 4.44.1

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue found in version 4.44.0 that caused startup to fail when `vpnkit` CIDR is locked without specifying a value in Desktop Settings Management.

#### For Windows

- Fixed an issue where volumes and containers were not visible after an upgrade from distributions using the legacy `version-pack-data` directory structure.
- Resolved a rare issue in WSL 2 where the Docker CLI failed with a **Proxy Authentication Required** error.
- Fixed a bug where CLI plugins were not deployed to `~/.docker/cli-plugins` if the user lacked execution permissions on that directory.

## 4.44.0

### New

- WSL 2 stability improvements.
- You can now inspect requests and responses to help you diagnose model-related issues in Docker Model Runner.
- Added the ability to run multiple models and receive a warning on insufficient resources. This avoids Docker Desktop freezing when using big models.
- Added new MCP clients to the MCP Toolkit: Gemini CLI, Goose.
- Introduced `--gpu` (Windows only) and `--cors` flags for `docker desktop enable model-runner`.
- Added a new `docker desktop kubernetes` command to the Docker Desktop CLI.
- You can now search for specific configuration options within **Settings**.
- Apple Virtualization is now the default VMM for better performance and QEMU Virtualization is removed. See blog post.
- Performance and stability improvements to the DockerVMM.

### Upgrades

- Docker Compose v2.39.1
- Docker Buildx v0.26.1
- Docker Engine v28.3.2
- Docker Scout CLI v1.18.2
- Docker Model CLI v0.1.36
- Docker Desktop CLI v0.2.0

### Security

We are aware of CVE-2025-23266, a critical vulnerability affecting the NVIDIA Container Toolkit in CDI mode up to version 1.17.7. Docker Desktop includes version 1.17.8, which is not impacted. However, older versions of Docker Desktop that bundled earlier toolkit versions may be affected if CDI mode was manually enabled. Upgrade to Docker Desktop 4.44 or later to ensure you're using the patched version.

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue pulling images with zstd differential layers when the containerd image store is enabled.
- Fixed a bug causing containers launching  with the `--restart` flag to not restart properly when using Enhanced Container Isolation.
- Improved interaction between Kubernetes custom registry images and Enhanced Container Isolation (ECI), so the ECI Docker Socket image list no longer needs to be manually updated when using a custom registry for Kubernetes control plane images.
- Fixed a bug where a Docker Desktop Kubernetes cluster in kind mode fails to start after restarting Docker Desktop if the user is required to be signed in but is currently signed out.
- Fixed a bug that prevented the mounting of MCP secrets into containers when Enhanced Container Isolation is enabled.
- Fixed a bug preventing the use of `--publish-all` when `--publish` was already specified.
- Fixed a bug causing the **Images** view to scroll infinitely. Fixes docker/for-mac#7725.
- Fixed a bug which caused the **Volumes** tab to be blank while in Resource Saver mode.
- Updated terms of service text on first launch.
- More robustness in parsing newly released GGUF formats.

#### For Mac

- Fixed disk corruption on DockerVMM when reclaiming disk space.
- Fixed regression since 4.42.0 on DockerVMM by re-introducing performance boost on general usage.
- Removed QEMU hypervisor and switched to Apple Virtualization as the new default. See blog post.
- Fixed a bug preventing Traefik from autodetecting containers' ports. Fixes docker/for-mac#7693.
- Fixed a bug that caused port mappings to break when a container was connected to or disconnected from a network after it was started. Fixes docker/for-mac#7693.
- Removed eBPF which blocked `io_uring`. To enable `io_uring` in a container, use `--security-opt seccomp=unconfined`. Fixes docker/for-mac#7707.
- Docker Model Runner now supports GPT OSS models.

#### For Windows

- Re-added `docker-users` group to the named pipe security descriptors.
- Fixed an installer crash when the current user has no `SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall` registry key.
- Fixed a bug where Docker Desktop could leak a `com.docker.build` process and fail to start. Fixed docker/for-win#14840.
- Fixed a bug that was preventing Docker Desktop Kubernetes in kind mode from starting when using WSL with `cgroups v1` and Enhanced Container Isolation (ECI) is enabled.
- Fixed a typo in the WSL installation URL in the UI.
- Docker Model Runner now supports GPT OSS models

## 4.43.2

### Upgrades

- Docker Compose v2.38.2
- Docker Engine v28.3.2
- Docker Model CLI v0.1.33

## 4.43.1

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue that caused Docker Desktop UI to break when Ask Gordon responses contained HTML tags.
- Fixed an issue that prevented extensions from communicating with their backends.

## 4.43.0

### New

- Compose Bridge is now generally available.

### Upgrades

- Docker Buildx v0.25.0
- Docker Compose v2.38.1
- Docker Engine v28.3.0
- NVIDIA Container Toolkit v1.17.8

### Security

- Fixed CVE-2025-6587 where sensitive system environment variables were included in Docker Desktop diagnostic logs, allowing for potential secret exposure.

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug causing `docker start` to drop the container's port mappings for a container already running.
- Fixed a bug that prevented container ports to be displayed on the GUI when a container was re-started.
- Fixed a bug that caused Docker API `500 Internal Server Error for API route and version` error application start.
- The settings **Apply & restart** button is now labeled **Apply**. The VM is no longer restarted when applying changed settings.
- Fixed a bug where the disk would be corrupted if Docker is shutdown during a `fsck`.
- Fixed a bug causing an incorrect `~/.kube/config` in WSL2 when using a `kind` Kubernetes cluster.
- Return an explicit error to a Docker API / `docker` CLI command if Docker Desktop has been manually paused.
- Fixed an issue where unknown keys in Admin and Cloud settings caused a failure.

#### For Mac

- Removed `eBPF` which blocked `io_uring`. To enable `io_uring` in a container, use `--security-opt seccomp=unconfined`. Fixes docker/for-mac#7707.

#### For Windows

- Fixed an issue that caused the Docker Desktop installer to crash when the current user has no `SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall` registry key.
- Fixed a bug where Docker Desktop could leak a `com.docker.build` process and fail to start. Fixes docker/for-win#14840

### Known issues

#### For all platforms

- `docker buildx bake` will not build images in Compose files with a top-level models attribute. Use `docker compose build` instead.
- Gordon responses containing HTML can cause Desktop UI to be permanently broken. As a workaround, you can delete `persisted-state.json` file to reset the UI. The file is located in the following directories:
  - Windows: `%APPDATA%\Docker Desktop\persisted-state.json`
  - Linux: `$XDG_CONFIG_HOME/Docker Desktop/persisted-state.json` or `~/.config/Docker Desktop/persisted-state.json`
  - Mac: `~/Library/Application Support/Docker Desktop/persisted-state.json`

#### For Windows

- Possible incompatibility between the "host networking" feature of Docker Desktop and the most recent WSL 2 Linux kernel. If you encounter such issues, downgrade WSL 2 to 2.5.7.
