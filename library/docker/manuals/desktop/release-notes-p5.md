---
title: "Docker Desktop release notes (part 5 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 5 of 21)

## 4.82.0

### Updates

- Docker Compose v5.3.0
- Docker Agent v1.98.0
- Docker Scout CLI v1.23.1

### Bug fixes and enhancements

#### For all platforms

- Added thumbs up and thumbs down feedback buttons to Gordon responses. Users can rate replies or report issues directly from the chat.
- Fixed a bug where containers created by Docker Desktop had their stop timeout set to 1 second instead of the Docker Engine default, causing `docker stop` to terminate processes too quickly.
- Fixed reset to factory defaults not clearing MCP Toolkit profiles, catalogs, and authorizations.
- Fixed an issue where selected thumbs up/down feedback buttons in Gordon were visually indistinguishable after selecting.
- Fixed reset to factory defaults not clearing downloaded LLM models.
- Fixed a bug where the Gordon chat area would go blank when the agent requested free-text input via elicitation.
- Fixed a delay in the Kubernetes screen where the progress UI did not appear immediately after confirming cluster creation or deletion.
- Fixed a bug where a Kubernetes kind cluster failed to start with a **Failed to get API server port** error after a Docker Desktop restart.
- With `docker pass`, the `ls` command now behaves consistently across all platforms.
- Fixed an issue where users signed out due to sign-in enforcement policies were shown a generic sign-in prompt instead of a clear explanation of why they were signed out.

#### For Mac

- Fixed an issue where Docker Desktop child processes could linger after an unexpected backend exit.
- Fixed an issue where Docker Desktop failed to start for users with long home directory paths that caused Unix socket paths to exceed OS length limits.
- Fixed an issue where vsock listener failures showed a cryptic crash instead of a clear, actionable recovery dialog.

#### For Windows

- Fixed an issue where `.log` files were missing from diagnostic bundles, ensuring the Docker Desktop service log is now included.
- Lowered the priority of Docker Desktop's background processes and enabled Windows Efficiency Mode while idle to reduce power and CPU usage.
- Fixed factory reset leaving containers and images behind on Hyper-V when Docker Desktop is run by a user other than the one that installed it.
- Fixed a multi-minute hang during WSL engine startup when the wsl-bootstrap process fails unexpectedly, surfacing the error promptly instead.
- Fixed an issue where auto-updates could leave Docker Desktop stuck in a 'connecting' state due to a successful installation being incorrectly rolled back.
- Fixed an issue where vsock listener failures on Windows Hyper-V showed a cryptic crash instead of a clear, actionable recovery dialog.
- Fixed a race condition where connecting to `com.docker.service` immediately after startup could result in a **File not found** error.
- Fixed an issue where a graphical installer window would flash during background auto-updates. Updates now run silently.
- Improved security by verifying the Authenticode signature of the downloaded installer before executing it during updates.
- Fixed an issue where missing or disabled Windows feature descriptions were not shown in diagnostic output.
- Improved the installer progress screen with a single continuous progress bar that smoothly advances from 0% to 100% throughout the entire installation.
- Fixed an issue where `~` in bind mount paths was not correctly resolved to the home directory when the `HOME` environment variable was not set.

#### For Linux

- Fixed an issue where Docker Desktop failed to start for users with long home directory paths that caused Unix socket paths to exceed OS length limits.

## 4.81.0

### Updates

- Docker Model Runner v1.2.5
- Docker Agent v1.88.1
- Docker Offload `v0.6.7`
- Docker Compose v5.2.0
- Docker Scout CLI v1.22.0
- DHI CLI (`dhictl`) v0.0.5

### Bug fixes and enhancements

#### For all platforms

- Fixed an error that caused volumes, images, and containers to fail to load in the Docker Desktop Dashboard.
- Removed the deprecated `cagent` binary from Docker Desktop; use `docker agent` instead.
- Kubernetes kind cluster now works with Registry Access Management.
- Fixed a bug where the sign-in/update prompt was not shown when upgrading between versions that cross a version digit boundary (e.g., 4.9.x to 4.10.x).
- Fixed an issue in Ask Gordon where the tool call permission dialog blocked the chat view, replacing it with an inline approval card so users can read Gordon's full message before approving or rejecting.
- Fixed a rare case where Docker Desktop could shut down if the build service crashed, for example during a factory reset.
- Fixed an issue where containers ignored user-configured stop timeouts during normal operation due to a proxy-level override forcing a 1-second timeout on all containers.

#### For Mac

- Fixed Docker Desktop failing to start when the user's environment contained very long environment variables.
- Fixed a Docker Offload crash on Intel machines due to `SG_READ_ONLY` not being set in the `__DATA_CONST` segment, causing the system linker to fail to load the executable. Fixes docker/desktop-feedback#471.

#### For Windows

- Fixed an issue on Windows where stopping Docker Desktop would immediately force off the Hyper-V VM without waiting for a graceful guest shutdown, reducing the risk of data corruption.
- Fixed a bug on Windows where `dockerd` failed to connect through the local HTTPS proxy due to a TLS handshake error caused by an incorrect proxy URL scheme.
- Fixed a Windows update that reverted and showed a **Mismatch patch version** error when it ran again after the target version was already installed.
- Fixed Resource Saver not stopping the Docker engine when running on WSL.
- Fixed a regression where Docker Desktop failed to start on WSL2 kernels that could not attach the Synchronized File Shares eBPF probes, such as Windows on Arm. Fixes docker/desktop-feedback#470.

#### For Linux

- Fixed a bug where Docker Desktop would fail to start after a reset.

## 4.80.0

### Updates

- Docker Offload `v0.6.6`
- Docker Buildx v0.35.0
- Docker Model Runner v1.2.4
- containerd v2.2.5
- Docker Engine v29.6.1
- Runc v1.3.6
- Kubernetes v1.36.1
   - CNI plugins v1.9.1
   - cri-tools v1.35.0
   - cri-dockerd v0.3.25
- Updated Kubernetes images:
   - Kubeadm:
      - `docker/desktop-storage-provisioner:v4.0`
      - `docker/desktop-vpnkit-controller:v4.0`
      - `docker/desktop-kubernetes-etcd:3.6.8-0`
      - `docker/desktop-kubernetes-coredns:v1.14.2`
      - `docker/desktop-kubernetes-pause:3.10.2`
      - `docker/desktop-kubernetes-apiserver:v1.36.1`
      - `docker/desktop-kubernetes-controller-manager:v1.36.1`
      - `docker/desktop-kubernetes-scheduler:v1.36.1`
      - `docker/desktop-kubernetes-proxy:v1.36.1`
   - Kind:
      - `docker/desktop-containerd-registry-mirror:v0.0.4`
      - `docker/desktop-cloud-provider-kind:v0.6.0`
      - `envoyproxy/envoy:v1.36.7`

### Bug fixes and enhancements

#### For all platforms

- The experimental `docker sandbox` plugin has been removed. Migrate to `docker sbx`.
- Fixed an issue where running out of disk space showed a generic error dialog instead of a clear **Disk full** message prompting users to free up space and restart.
- Fixed an issue where using `docker -c desktop-linux` while a cloud context was active would silently route commands to the cloud engine instead of the local desktop Linux engine.
- Fixed a bug where the backend would incorrectly report a stopped VM as running after an idle shutdown, especially when Enhanced Container Isolation was enabled.
- Fixed an OS update notification timing issue where users with auto-download enabled were notified when an update was available rather than when it was ready to install.

#### For Mac

- Removed the legacy osxfs file sharing. Users still on osxfs are migrated to VirtioFS.
- Increased VirtioFS filesharing performance by not persisting (fake) file ownership changes on the host. Calls to `chown` will succeed, but `stat` will not be affected.

#### For Windows

- Fixed an issue where the Windows installer failed when the destination directory contained leftover files from a previous interrupted installation.
- Fixed an issue on Windows where upgrading Docker Desktop would unnecessarily shut down and unregister unrelated WSL distros via `wsl --shutdown`.
- Fixed spurious Hyper-V job failures on Windows where operations briefly transitioning through suspended or shutting down states were incorrectly reported as failed.
- Fixed an issue where the WSL engine failed to start with a **Permission denied** error on machines where the cross-distro WSL mount was configured as `noexec`.
- Fixed an issue on Windows where end users could override the `NO_PROXY` exclusion list even when an admin had locked the proxy configuration.
- Fixed an issue on Windows where Docker Desktop would silently disappear on startup failure. An error dialog is now displayed instead.
- Fixed an issue on Windows where Docker Desktop showed a generic engine-start failure instead of routing to the WSL update recovery when an older wsl.exe did not support the --version flag.

## 4.79.0

### Updates

- Docker Agent v1.79.0
- `docker pass` v0.1.5
- Docker Desktop CLI v0.4.1
- Docker Offload v0.6.4

### Bug fixes and enhancements

#### For all platforms

- Gordon improvements:
   - Added context-aware suggested questions to the Ask Gordon menu in the **Containers**, **Images**, **Volumes**, and **Builds** tabs, surfacing relevant diagnostics first when items are in a problematic state.
   - Added a **Give feedback** link to Gordon so you can report issues with a redacted conversation preview or share product feedback.
   - Fixed a React warning in Gordon's sidebar search input that appeared on the first keystroke when typing a search query.
- Fixed an issue where the Docker Engine settings editor displayed minified JSON instead of formatted JSON when first opened.
- Fixed spurious 500 errors for Docker API calls made right after the VM woke from idle shutdown.
- Fixed spurious 'Integrity issue detected' notifications caused by leftover symlinks from previously bundled binaries.
- Fixed a broken documentation link in the error screen shown when the current user is not a member of the `docker-users` group.
- Fixed a breaking change to the `/app/settings/grouped` API that caused integrations such as NVIDIA to stop working correctly.
- Fixed high CPU usage (~30%) on macOS Retina displays caused by SVG animations in the Gordon landing page.
- Fixed an issue where OAuth network errors caused Docker Desktop to incorrectly show users as signed out.
- Fixed an issue where signing in via OAuth would not display the user's username and email in the UI after login.
- QEMU has been updated to v10.2.3
- **Logs** view improvements
   - Added copy buttons. Copy all visible filtered logs at once or copy individual log entries on hover, respecting the current timestamp visibility setting.
   - Improved the toolbar with a reorganized layout, saved filter presets that now capture container selection and build log visibility, and the ability to persist container filter state.
   - Added the ability to clear logs.
   - Combined **copy** and **expand**/**collapse** buttons into a single pinned column that stays visible during horizontal scrolling, and fixed **copy** accidentally toggling the row detail pan.
- Fixed Registry Access Management policy downloads to avoid `permission denied` errors by fetching and caching policies in the user's own directory with tampering detection.

#### For Windows

- Fixed a bug where Docker Desktop on WSL failed to start with an 'is already mounted' error after a force-killed bootstrap left stale rootfs mounts behind.
- Fixed an issue on Windows where clicking "Quit Docker Desktop" had no effect when the backend had crashed or been killed.
- Fixed an issue on Windows where Docker Desktop processes could linger as orphans after an unexpected exit or crash.
- Fixed getting stuck on "Starting the Docker Engine…" after an in-place upgrade on Windows when the WSL virtual machine had not been shut down.
- Fixed the tray icon on Windows not matching the system taskbar theme, so the correct light or dark icon is now displayed.
- Fixed a silent failure on Windows where backend startup errors were only written to a log file. Users now see a visible error dialog box when Docker Desktop fails to start.
