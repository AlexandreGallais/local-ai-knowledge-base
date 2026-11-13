---
title: "Docker Desktop release notes (part 6 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 6 of 21)

## 4.78.0

### Updates

- Docker Agent v1.73.0
- `docker pass` v0.1.4
- Credential <example-value> v0.9.8

### Bug fixes and enhancements

#### For all platforms

- Fixed an out-of-memory crash that would cause Docker Desktop to become unresponsive or crash while streaming logs in the Docker Desktop Dashboard.
- Improved update reliability by retrying stalled and transient download failures and resuming from the partially downloaded file.
- Added live streaming output to Gordon tool calls so long-running commands like `docker compose up` display STDOUT/STDERR in real time instead of waiting until completion.
- Added color-coded labels to the **Logs** view so each container and build source is visually distinguished by a unique color in both the log grid and the container-filter dropdown.
- Improved the error message when the Docker Desktop VM fails to start. It now shows the underlying `VirtualizationFramework` / `libkrun` reason instead of the generic **Use of closed network connection**.
- Fixed a bug where Docker CLI error messages were shown as raw JSON instead of human-readable text while Docker Desktop was in Resource Saver mode.
- Fixed a crash that occurred in the **Logs** view when deselecting a container filter.
- Fixed an issue where the support page was replaced by the no-virtualization override screen when accessed from the troubleshooting popover.
- Fixed an issue where Docker Desktop failed to start on bare metal EC2 instances (e.g. `g4dn.metal`) with a **Nested virtualization not supported** error.
- Increased the retry delay to accommodate transient rename failures caused by antivirus software holding file locks.
- Gordon now shows clear network error messages with guidance to check VPN, proxy, or firewall settings when outbound HTTPS to Docker's services is blocked, instead of a generic agent error.
- Fixed the Gordon AI model picker incorrectly showing an internal model identifier instead of **Default** for sessions with no explicit model selection.

#### For Windows

- Fixed Docker Desktop getting stuck on **Starting the Docker Engine…** after an in-place upgrade.
- Fixed a bug where Docker Desktop was not restarted after a failed update was reverted to the previous version.
- Fixed delta updates failing to prepare.
- Fixed an issue on Hyper-V where Docker commands (e.g. `docker login`) would fail on the first attempt after the engine had been idle-shut-down or paused.
- Fixed an issue on Windows where Docker Desktop showed a generic engine-start failure instead of a clear, actionable error message when WSL is not installed.

## 4.77.0

### New

- You can now export log data from the **Logs** view.

### Updates

- Docker Offload v0.6.3
- Docker Buildx v0.34.1
- Docker Agent v1.70.0
- Docker MCP gateway v0.42.2
- `docker pass` v0.1.2
- containerd v2.2.4
- DHI CLI (`dhictl`) v0.0.4
- Docker Engine v29.5.3

### Bug fixes and enhancements

#### For all platforms

- Increased the retry delay to accommodate transient rename failures caused by antivirus software holding file locks.
- Marketplace extensions are now installed and updated by pinned manifest digest, instead of by tag, protecting against tag mutation after publication.
- Added Buildx version information to the About window.
- Added a case-sensitivity toggle to the **Logs** search bar which lets you switch between case-insensitive (default) and case-sensitive log filtering.
- Fixed a bug where the mouse wheel scroll was not working in the **Logs** view grid.
- Fixed an issue where the backend incorrectly exited with error code 150 on clean shutdown via SIGINT or SIGTERM, causing false failure signals.
- Removed the bundled `hub-tool` binary from Docker Desktop.
- Added working **Authenticate** and **Cancel** buttons to the MCP OAuth authorization chat bubble in Gordon, letting you complete or decline OAuth sign-in flows from MCP servers.
- Added two new commands to `docker pass`:
   - Use `docker pass run` to inject secrets into host commands.
   - Use `docker pass <example-value>` for dynamic plugin management.
- Fixed a regression where `docker cp` into a container with Enhanced Container Isolation (ECI) enabled set file ownership to `nobody:nogroup`.

#### For Windows

- Fixed an issue on Windows where Docker Desktop would get stuck on **Starting the Docker Engine...** after a failed WSL distro registration left a VHDX on disk.
- Fixed a backend shutdown hang in Windows Containers mode that caused Docker Desktop to take a long time or fail to exit cleanly.

## 4.76.0

### New

- Docker Model Runner now supports registry mirrors.

### Updates

- Docker Desktop Build v0.35.0
- Docker Agent v1.62.0
- NVIDIA Container Toolkit v1.19.1
- Docker Compose v5.1.4
- Docker Offload v0.5.93
- Docker Scout CLI v1.21.0
- `docker pass` v0.0.29

### Security

- Addressed CVE-2026-8936, a VM panic caused by unbounded recursion in the `grpcfuse` kernel module when a container created deeply nested directories on a bind-mounted host folder and triggered a `dentry` invalidation event.

### Bug fixes and enhancements

#### For all platforms

- The `docker sbom` command has been deprecated and will be removed in a future release. Use the `docker scout sbom command` instead.
- Fixed a race condition in Docker Engine when **Resource Saver** was active.
- Fixed a bug where anonymous Docker volumes were leaked each time a `kind` cluster was deleted, causing orphaned volumes to accumulate.
- Fixed column resizing in the **All Logs** grid so that **Timestamp** and **Object** columns no longer expand unexpectedly, and column widths are now preserved across navigation sessions.
- Fixed an issue where Docker Desktop failed to start when a VM disk resize operation encountered an error, even if the underlying filesystem was healthy.
- Fixed an issue that caused Docker Desktop to hang when quit.
- Fixed a bug where CPU and RAM resource totals could get stuck showing 0 in the Docker Desktop Dashboard after stopping or starting Docker Offload.
- Fixed a flicker in Gordon where the final answer text would briefly appear inside the working group before jumping to the response bubble.
- Fixed a daemon panic that could occur during concurrent sign-out and token <example-value> operations.
- Fixed a bug where the **Volumes** view showed incorrect mount targets for containers with multiple volumes.
- `docker pass` now has a `--force` flag on the `set` command.
- `docker --help` now shows `docker pass`.
- Fixed stale API cache responses (synthetic 404s) for containers, images, networks, volumes, and plugins after restarting an idle-stopped engine via external API calls.
- Fixed a bug where the **Delete** button on the **Builds** view might not be visible immediately after selecting a build. Fixes docker/desktop-feedback#329 and fixes docker/desktop-feedback#330.
- Fixed time-namespaces being unavailable when Enhanced Container Isolation (ECI) is enabled.

#### For Windows

- Fixed a regression where the `--quiet` installer flag did not suppress the install-type dialog during silent installation.
- Fixed a bug on Windows where a stale PID file with a trailing newline prevented the lingering daemon from being killed, leaving Windows Containers mode unconfigurable.
- Fixed an issue on Windows where triggering an update while another installer instance was already running showed a generic error instead of a specific message.
- Fixed an issue on Windows where the installer and updater executables incorrectly triggered UAC elevation prompts due to Windows heuristic installer detection.
- Fixed double separator in the tray menu when running in Windows container mode.
- Fixed port-binding failures on Windows Hyper-V where `docker run -p 0:N` could allocate HNS-reserved ports, causing bind errors.
- Fixed garbled taskkill error messages in logs on non-English Windows systems (For example, Chinese Windows using GBK encoding).
- Fixed unbounded growth of the WSL2 ISO cache. Old `docker-desktop.iso` and `docker-wsl-cli.iso` entries are now removed when a new version is installed. Fixes docker/desktop-feedback#419.

## 4.75.0

### Updates

- Docker Offload v0.5.92
- Docker Engine v29.5.2
- Docker Buildx v0.34.0

### Bug fixes and enhancements

#### For all platforms

- Removed the Docker Scout view and disabled Scout-related OS notifications and notification popups.
- Added support for time namespacing in ECI protected containers.
- Fixed a bug where the `http_proxy` environment variable could prevent kind clusters from pulling local images.
- Fixed a `500 Internal Server Error` that could occur on the first Docker API call right after the VM wakes up from idle shutdown.
- Fixed broken images in Docker Hub image descriptions caused by relative URLs being resolved to invalid `app://` scheme URLs.

#### For Mac

- Added a warning dialog that appears at startup when Docker Desktop is running from a staging directory due to a failed update. Also adds a link to download a fresh install.

#### For Windows

- WSL integration with the default distribution has been disabled. To change this, visit **Settings**.
- Fixed a bug where `docker compose up` failed with an `EOF` error on Windows with a Hyper-V backend, when accepting a file-sharing consent prompt.
- Fixed Windows installer bugs that could cause incorrect backend mode detection or unexpected directory creation during installation.

## 4.74.0

### New

- Gordon is now generally available. New usage plans are also available. Paid Gordon plans unlock higher usage limits.

### Updates

- Docker Offload v0.5.89
- Docker Agent v1.57.0
- Credential <example-value> v0.9.7
- `docker pass` v0.0.26

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where Docker Desktop's own Electron helper processes (GPU, renderer, utility) were incorrectly detected and killed as lingering processes on startup when launching from the Start menu, causing a crash loop.
- Fixed an issue where the **View build logs** toggle in Logs view display settings was reset after restarting Docker Desktop instead of persisting the user's preference.
- Docker Extensions is now disabled by default.

#### For Mac

- Fixed published ports being inaccessible when a container is also connected to a Swarm overlay network. Fixes docker/for-mac#7854.
- Fixed dashboard TLS failures in some corporate environments.
- Improved GUI security via content hash validation.

#### For Linux

- Added support for Ubuntu 26.04.

## 4.73.1

### Bug fixes and enhancements

#### For Windows

- Fixed a bug where Docker Desktop's own Electron processes were incorrectly killed when launching from the Start menu. Fixes docker/desktop-feedback#367.

## 4.73.0

### Updates

- Docker Engine v29.4.3
- Docker Agent v1.54.0

### Bug fixes and enhancements

#### For all platforms

- Fixed `Cmd+Q` (Mac) and `Ctrl+Q` (Windows/Linux) not fully quitting Docker Desktop. Fixes docker/for-mac#7833.
- Fixed a bug where canceling `docker load` left a containerd ref lock held, causing subsequent loads of the same image to fail.
- Fixed an issue where Docker Desktop made unnecessary network requests to `mcp.docker.com` on sign-in when MCP Toolkit was disabled, causing unexpected proxy authentication prompts.
- Fixed an issue where the search input in Gordon's session sidebar would not close if it was left empty.
- Improved Docker Desktop handling of transient rename failures caused by antivirus software accessing those files simultaneously.

#### For Mac

- Fixed excessive memory usage on Apple Silicon Macs by improving the Linux VM's ability to return freed container memory back to the host OS.
- Fixed a bug where containers received connections with a corrupted source IP when another container had an active outbound connection to an IP in the same subnet range. Fixes docker/for-mac#7824.

## 4.72.0

### New

- The **Logs** view is now generally available.
- New installations of Docker Desktop for Windows have a choice between per-user (Beta) or all-user installs.

### Updates

- Docker Agent v1.50.0
- Docker DHI (`dhictl`) v0.0.3
- Docker Model Runner v1.1.37
- credential <example-value> v0.9.6

### Security

- The Extensions settings page now includes a security notice that extensions run with host-level privileges and are not audited by Docker.
- Fixed CVE-2026-31431 ("copy.fail") by backporting an upstream Linux kernel patch that prevents an unprivileged container user from gaining root inside the container via a controlled write into the host VM page cache.

### Bug fixes and enhancements

#### For all platforms

- Improvements to Docker Offload idle notifications.
- Fixed the **Open Gordon in TUI**  button not working due to a missing `run` subcommand in Docker Agent command arguments.
- Fixed an issue where transient network errors or Docker Hub server errors during sign-in would unexpectedly sign users out instead of retrying automatically.
- Improved data refresh for the Containers, Images, and Volumes screens by fetching up-to-date data on demand when navigating to those screens, reducing background polling load.
- Fixed a kernel crash that could occur when changing filesharing technology after significant container file activity.
- Enable the OpenAI Responses API (`/responses`) endpoint in Docker Model Runner.
- Fixed a bug where users were unexpectedly signed out of Docker Desktop mid-flow when signing in via `docker login` using OAuth.

#### For Windows

- Fixed a bug on Windows where selecting the Docker Desktop taskbar icon multiple times could spawn multiple backend processes. Re-selecting the icon while Docker Desktop is running now brings the dashboard to focus.
- Fixed a race condition on Windows that caused a false-positive "processes still running" dialog to appear when Docker Desktop starts or exits normally.

### For Linux

- Support for RHEL 8 has been dropped.
