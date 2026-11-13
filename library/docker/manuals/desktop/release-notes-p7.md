---
title: "Docker Desktop release notes (part 7 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 7 of 21)

## 4.71.0

> **Important:**
>
> Support for RHEL 8 has ended. Installing Docker Desktop will require RHEL 9 or RHEL 10 in the next release.

### Updates

- Docker Model Runner v1.1.36
- containerd to v2.2.3
- Runc v1.3.5
- Docker Compose v5.1.3
- Docker Agent v1.44.0
- Docker Engine v29.4.1

### Bug fixes and enhancements

#### For all platforms

- Docker Model Runner is now disabled by default and must be explicitly enabled in **Settings**. When enabled, TCP host-side support is automatically active.
- Fixed an issue where downloading a Docker Desktop update would fail without a clear error if the disk had insufficient free space.
- Fixed an issue where Docker Scout tag recommendations, when inspecting an image, failed when the base image digest or repository name was empty.
- Added a **Switch to local Docker context** button on the sign-in screen, allowing users in a cloud context to switch back to their local context without signing in.
- Added a dedicated **Stopped** status screen for the cloud engine so users see a clear stopped state instead of an error screen when transitioning away from Docker Offload.

#### For Mac

- Fixed an issue where error tracking would temporarily continue sending session data directly after a user disabled analytics. Fixes docker/for-mac#7768.

#### For Windows

- Fixed a critical issue where Docker Desktop Dashboard failed to open with `ERR_FAILED` errors caused by process hardening policies conflicting with Chromium.
- Fixed a bug where Kubernetes could fail to start on WSL 2 when `HTTP_PROXY` environment variables are set in WSL 2 itself.
- Fixed a bug in Enhanced Container Isolation (ECI) that was causing loss of container `rootfs` persistence across Docker Desktop restarts, when using WSL.

### Security

- Addressed CVE-2026-5843, container-to-host code execution in the Docker Model Runner MLX inference backend via MLX-LM `model_file` importlib loading.

## 4.70.0

### New

- Added a CLI hint that surfaces the **Logs** view when running `logs`, `compose logs`, `compose attach`, or `compose up` commands, giving you quick access to logs across all running containers. Available with the **Logs** (Beta) feature enabled.

### Updates

- Docker Compose v5.1.2
- Docker Engine v29.4.0
- Docker Agent v1.43.0
- Docker Model Runner v1.1.33
- Docker Scout CLI v1.20.4

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where `docker login` could fail silently in CI environments due to slow Docker Hub responses causing credential store update timeouts.
- Fixed an issue where disabling Beta features also disabled Docker Model Runner.
- Fixed `docker desktop start` causing the Docker AI agent API daemon to fail due to an inherited CLI plugin environment variable.

#### For Mac

- Fixed a crash loop where Docker Desktop repeatedly failed to start with exit status `42` after an update due to a corrupted `DockerAppLaunchPath` setting.
- Fixed an issue where a failed update could leave Docker Desktop in a broken state. The installer now automatically reverts to the previous version and shows a clear error message.
- Fixed a bug where stopping one container could disrupt active Unix socket forwards belonging to other running containers.

#### For Windows

- Fixed an issue where a failed update could leave Docker Desktop in a broken state. The installer now automatically reverts to the previous version and shows a clear error message.
- Fixed a bug where a failed switch to Windows containers could leave Docker Desktop in a broken state, requiring a restart.
- Fixed an issue where Docker Desktop failed to launch for users with `DEVHOME` set in their environment.
- Temporarily rolled back process hardening that caused Electron crashes on Windows. Fixes docker/desktop-feedback#245.

## 4.69.0

### Updates

- Docker Agent v1.42.0
- Docker Model v1.1.29
- containerd v2.2.2
- Docker Buildx v0.33.0

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where `docker logout` from the CLI was ignored by Docker Desktop when OAuth tokens remained in the credential store, leaving the user unexpectedly signed in.
- Fixed an issue where Docker Desktop could unexpectedly sign users out when unrelated credential <example-value>, `docker login`, or transient network errors triggered a sign-out.
- Fixed a data loss issue where backup data could be deleted during a failed restore operation, leaving users with no data.
- Fixed an issue where sign-in credentials (`login-info.json`) could be included in diagnostic bundles, improving privacy and security. Note that this file contains an encoded organisation(s) name, plan name, encoded username, and encoded email only. No passwords or credentials are included.
- Fixed the footer update label incorrectly showing **Downloading** during the prepare/unpack phase of an update. It now correctly displays **Preparing**.
- Fixed an issue where Docker Desktop would not start when the internal storage disk was full.

#### For Mac

- Fixed an issue where the in-app update button was not disabled when `Docker.app` was installed in a non-user-writable directory, preventing failed update attempts.
- Fixed update failure for users who installed Docker Desktop via Homebrew on Mac.

#### For Windows

- Fixed an unexpected WSL terminal popup appearing for Windows users using the Hyper-V backend during Docker Desktop installation or uninstallation.
- Fixed an issue on Windows where factory reset deleted CLI plugins from `~/.docker/cli-plugins`, causing `docker build` to fall back to the legacy builder.
- Fixed a bug where Kubernetes failed to start when WSL integration was enabled alongside another distro using cgroup v1 controllers.
- Fixed a race condition that caused Kubernetes to fail to start when a Registry Access Management policy change occurred during startup.
- Prevent Docker Desktop from fatally failing due to transient 'Access is denied' errors during file operations on Windows.

## 4.68.0

### New

- Gordon now has persistent local memory, allowing it to remember your preferences and context across sessions.

### Updates

- Docker Agent v1.39.0
- Docker Model v1.1.28
- Docker Offload v0.5.81

### Bug fixes and enhancements

#### For all platforms

- Fixed a deadlock in Enhanced Container Isolation that caused containers to hang indefinitely during creation when ECI was enabled.
- Added a warning banner to alert when an MCP server is community-provided and has not been verified by Docker.
- Added a persistent **Show timestamps** toggle to the **Logs** view, allowing timestamps to be hidden in both table and visualiser views across sessions.
- Fixed an issue where Docker Desktop frontend processes were not properly terminated on quit.
- Fixed a deadlock when settings controlled by admins reload that could cause Docker Desktop to become unresponsive during sign in or sign out operations.
- Fixed a bug where Docker Desktop could fail to start due to uncorrectable filesystem errors on the disk image not being repaired.
- Fixed a bug that caused Enhanced Container Isolation (ECI) to inadvertently block startup of Kubernetes clusters.
- Fixed an issue where a failed volume size fetch could make the **Volumes** view inaccessible; container counts on volumes now correctly exclude bind mounts.
- Fixed race conditions in volume backup that could cause containers to be incorrectly restarted, export logs to be corrupted, or runtime panics when scheduling tasks.
- Fixed a crash in the API cache that occurred when containers with no names caused a panic disrupting container listing.
- Fixed a bug where starting a container could fail with `ENOENT` if a bind-mount parent directory was deleted while no container was using it.

#### For Mac

- Fixed a security vulnerability where tampered user-deployed config profiles could bypass <example-value> sign-in enforcement.
- Fixed a bug where a failed `vmnetd` handshake could dispatch a bogus command on a broken connection, causing unexpected networking errors.
- Fixed a bug where the Docker Desktop Dashboard could be prematurely displayed when restoring to a fullscreen state on launch.
- Fixed nested bind mounts showing empty child mount content on VirtioFS when using Docker Compose with multiple services sharing a volume. Fixes docker/desktop-feedback#264.

#### For Windows

- Fixed an issue where the installer extraction did not update the progress bar and could take around 5 minutes, depending on the machine. Extraction is now ~60% faster and includes proper progress updates.
- Fixed a race condition where container ports would sometimes not be published correctly after container start, affecting ephemeral ports, `--publish-all`, and gateway IP bindings.
- Fixed an issue where a failed WSL distro move could leave the distro unregistered.

### Security

- Addressed CVE-2026-5817, container-to-host code execution in the Docker Model Runner vllm-metal inference backend via unsandboxed `trust_remote_code` tokenizer loading.

## 4.67.0

### New

- Docker MCP Toolkit now has MCP profile template cards and an onboarding tour accessible via the **Profiles** tab.

### Updates

- Docker Compose v5.1.1
- Docker Agent v1.34.0
- Docker Scout CLI v1.20.3
- Docker Model v1.1.25

### Bug fixes and minor changes

#### For all platforms

- Docker Model Runner now supports Qwen3.5.
- With the new **Logs (Beta)** view, you can now filter container logs by Compose stack.
- Improved interaction with **Settings** while the Docker engine or Kubernetes is starting or stopping.
- Fixed a bug where random UDP port bindings reported port `0` instead of the actual assigned port.
- Fixed an issue with the Docker Desktop shortcut not reopening the Dashboard when Docker Desktop was already running.
- Fixed an issue where the **Add to existing profile** dialog showed profiles that already contained all selected MCP servers in the dropdown.

#### For Mac

- Fixed intermittent `exec format error` when starting amd64 containers on Apple Silicon Macs due to a race condition between Rosetta `binfmt` registration and `virtiofs` device availability.

#### For Windows

- Fixed Hyper-V being silently re-enabled on every EXE upgrade for WSL 2 users.
- Fixed an MSI installer bug where Docker Desktop processes could be left running after uninstall.
- Fixed an issue on Windows where installations or updates using `--installation-dir` would fail due to the installer archive being extracted into the custom installation directory.
- Improved Docker Desktop startup time on Windows by several seconds when using WSL 2.
- Fixed a bug on the **Models** > **Logs** screen which caused `docker-model` processes to accumulate on Windows each time the screen was visited.

### Security

- Addressed CVE-2026-33990, SSRF in Docker Model Runner OCI Registry Client

## 4.66.1

### Updates

- Docker Engine v29.3.1

## 4.66.0

### Updates

- Docker Engine v29.3.0
- NVIDIA Container Toolkit v1.19.0

### Bug fixes and minor changes

#### For all platforms

- Gordon improvements:
   - Provides pre-filled prompts when deeplinking from command-line failure hints.
   - Prevents Docker Hub rate limiting by authenticating before making requests.
- Fixed a Kubernetes pod discovery hang when the kube context is broken or unreachable.
- Fixed a terminal crash caused by an undefined dimensions error during terminal resize.
- Fixed volume backup export error handling for file, image, and registry export operations.

#### For Windows

- Fixed high CPU usage in the Windows API proxy caused by unnecessary process enumeration.
- Fixed the Windows MSI installer failing to update Docker Desktop. Versions between 4.56 and 4.65 need to uninstall before reinstalling version 4.66 or later. Note that uninstalling removes all associated data.

## 4.65.0

### New

- Added a new **Logs** view where you can explore logs from all sources in one unified view. (Beta)
- Gordon hints now appear when `docker build`, `docker run`, or `docker compose` commands fail, offering contextual suggestions.
- Community MCP servers now support OAuth authentication directly in the UI.
- Added the `docker dhi` CLI plugin for managing Docker Hardened Images.

### Updates

- Docker Scout CLI v1.20.1
- Docker Agent v1.29.0
- Docker Buildx v0.32.1

### Bug fixes and minor changes

#### For all platforms

- Kubernetes now defaults to kind for new clusters.
- Fixed update progress bar not resuming correctly.

#### For Windows

- Improved startup time by skipping docker-users group check when using WSL2 backend.

### Known issues

- The Windows MSI installer cannot update an existing Docker Desktop installation when the current version is between 4.56 and 4.65. As a workaround, uninstall the existing version before reinstalling the latest version. Note that uninstalling removes all associated data.

## 4.64.0

### Updates

- Docker Compose v5.1.0
- Docker Scout CLI v1.20.0
- Docker Agent v1.27.1

### Bug fixes and minor changes

#### For all platforms

- Fixed a bug in MCP Toolkit where disabling all tools in a profile would enable all tools.
- Fixed the `docker ai` command stopping after a Docker Agent update.
- Fixed Gordon session title flickering when hover buttons appeared.
- Improved Gordon summary rendering and reduced narrative verbosity.
- Fixed a bug where `docker ai` CLI commands did not correctly shell out to Docker Agent.
- Fixed the **OAuth** tab in Docker MCP Toolkit not showing entries from all catalogs.
- Improved MCP Catalog search.
- Fixed the **Build logs** tab not retaining search terms and filters when switching tabs.
- Fixed Kind container startup to be more reliable.

#### For Mac

- Improved update error reporting with more descriptive diagnostics.
- Improved update reliability by preparing the updated `Docker.app` under `Application Support` instead of `/tmp`.

### Known issues

- The Windows MSI installer cannot update an existing Docker Desktop installation when the current version is between 4.56 and 4.65. As a workaround, uninstall the existing version before reinstalling the latest version. Note that uninstalling removes all associated data.
