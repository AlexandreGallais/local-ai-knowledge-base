---
title: "Docker Desktop release notes (part 4 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 4 of 21)

## 4.88.0

### Updates

- Docker Agent v1.124.0
- Docker Offload `v0.6.13`
- Docker Model Runner v1.2.8
- containerd v2.3.3
- Runc v1.4.3

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where Docker Desktop reported `enable fsverity failed: operation not supported` as the crash cause instead of the real underlying error.
- Fixed a bug where changing the hypervisor type in **Settings** had no effect when Docker Desktop was in Resource saver mode.
- Fixed port bindings reported by `docker ps` to accurately reflect active listeners when using 'Localhost by default' or 'Localhost only' settings, and added `[::1]` loopback listener alongside `127.0.0.1`.
- Fixed an HTTP 500 error that could occur during Docker Desktop startup or wake from idle-shutdown when the engine socket existed but was not yet listening.
- Fixed a bug where Docker Desktop would fail to start if `~/.docker/daemon.json` was corrupted with null bytes (typically caused by a crash or power-loss during a settings save). Docker Desktop now automatically recovers to default daemon settings.
- Fixed an issue in the Docker Engine config editor in settings where validation error messages would disappear immediately while typing invalid JSON.
- Fixed a Docker VMM regression that reduced container inbound network throughput to roughly 0.3 GB per second.
- Fixed error messages shown when the Docker Desktop VM exits unexpectedly to include the exit status code and surface the actual root cause of the crash.

#### For Mac

- Docker VMM can now use more than 28GiB of host memory.

#### For Windows

- Fixed a Windows auto-update failure when a self-updated CLI plugin (e.g `docker scout` or `docker agent`) newer than the bundled version was already present in the user's CLI-plugins folder.
- Fixed an issue on per-user Windows installs where Hyper-V, Windows containers, and related settings are now correctly disabled and grayed out, preventing broken behavior caused by the unavailable priveleged helper service.

## 4.87.0

### Updates

- Docker Agent v1.122.0
- Docker Buildx v0.36.1
- Docker Offload `v0.6.10`
- Docker Compose v5.4.0
- Linux kernel `v7.0.12`

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where the in-app update failed with `Source and destination path must have identical roots` when Docker Desktop was installed to a custom directory on another drive.
- Fixed a misleading proxy error that named the destination server instead of the unreachable upstream proxy, and included machine-wide proxy configuration in diagnostics.
- Fixed a bug where updating could keep failing with a `file exists` error after an earlier update had failed.
- Fixed an issue where Gordon would lose access to tools and show misleading sign-in prompts after a failed auto-login at startup, without requiring a restart of Docker Desktop.

#### For Mac

- Fixed a false `Docker Desktop encountered an unexpected error` dialog that could appear during VM shutdown on with the `libkrun` engine.
- Fixed a rare crash where the Docker Desktop with the Apple Virtualization Framework VM stopped unexpectedly right after a new connection was opened.

#### For Windows

- Fixed WSL error recovery on Windows not displaying specific, actionable error messages for errors like `HCS/0x80070569`, showing the generic fallback instead.
- Fixed an issue on Windows where per-user `.EXE` installs applying an auto-update wrote `install-settings.json` to the system-wide path instead of the correct per-user location.
- Fixed an issue on Windows where diagnostic bundles were missing network connection profile data due to an empty `Get-NetConnectionProfile.json` file.
- Fixed a bug on Windows where Docker Desktop repeatedly asked users to run `wsl --update` when WSL was installed via the Microsoft Store rather than the inbox optional component.
- Fixed an issue where the Resource Saver settings section was incorrectly shown when using Windows containers instead of Linux containers.
- Fixed an issue on Windows where the disk image usage limit was hidden in **Resources** settings when Hyper-V was selected as the hypervisor.
- Fixed an issue on Windows where installer logs from per-user installations were missing from diagnostic bundles.
- Fixed the virtual disk limit not being applied when lowered on Windows with Hyper-V.
- Fixed the disk usage limit slider being hidden and ignored for the Docker VMM backend on Windows, so users can now set and enforce disk size in **Settings** > **Resources** > **Advanced**.
- Fixed a Windows auto-update failure when a self-updated CLI plugin (`docker scout` or `docker agent`) newer than the bundled version was already present in the user's CLI-plugins folder.

## 4.86.0

### Updates

- Docker Engine v29.7.2
- Docker Buildx v0.36.0
- Docker Scout CLI v1.24.0
- Docker Agent v1.119.0

### Bug fixes and enhancements

#### For all platforms

- Docker VMM Beta performance improvements by Docker’s own container-optimized hypervisor. Available for Mac and Windows.
- Gordon now displays specific error messages for tool failures, policy-blocked actions, and loop detection instead of a generic **Agent error**.
- Fixed container stop timeouts and `unless-stopped` restart policies not being honored during engine shutdown.
- Fixed a bug where enabling Docker Offload from the Docker Desktop Dashboard failed when the proxy was configured by the operating system instead of by environment variables.
- Fixed a crash on startup after upgrading, for users whose settings file was written by a very old version.
- Fixed port forwarding for Swarm services that use automatically assigned published ports, including host-mode task ports and repeated ingress port definitions.
- Added a three-mode safety system (Strict, Balanced, Autonomous) to the Gordon AI agent's tool confirmation UI, replacing the previous binary approve/allow-all dialog, with risk-tier labels on confirmation.
- Fixed a flash of incorrect UI content on app launch, such as a brief 'Waiting for the Docker Engine...' screen or unexpected navigation away from gated pages.
- AF_UNIX sockets shared over VirtioFS now work in both directions (host to guest and guest to host).
- Fixed a bug where restarting the VM would steal the window focus.

#### For Mac

- Fixed a bug where a Kubernetes (kind) cluster with Enhanced Container Isolation could fail to recover after a Docker Desktop restart.
- Fixed nftables `fib` expressions failing with "Operation not supported" in `inet` tables on Apple Silicon.

#### For Windows

- Fixed an issue where the Windows installer reported success when it could not write its settings or enterprise policy files.
- Fixed Model Runner failing to start with `CreateJobObject: Access is denied` when Docker Desktop is launched via a Secondary Logon (run-as-user) session.
- Updated the bundled 7-Zip to 26.02 to avoid antivirus software quarantining it during an upgrade on Windows.

#### For Linux

- Fixed Docker Desktop failing to start on Linux arm64 hosts due to incorrect QEMU binary path resolution.

### Security

- Addressed CVE-2026-17106, a destination-escape flaw in `docker container cp`.

## 4.85.0

### Updates

- Docker AI Agent v1.115.0

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where native crash reports were uploaded to Bugsnag even when analytics was disabled by the user.
- Fixed an issue where file content previews and diffs were hidden in the Gordon confirmation card when approving write or edit file actions.
- Fixed an issue where an invalid `install-settings.json` caused a ~7-minute startup delay before showing the error dialog. The error now appears immediately.
- Fixed an issue where Gordon's plan mode would silently revert to build mode after the first message, causing subsequent turns to run with full tool access despite plan mode appearing active.
- Fixed an issue where an invalid `config.json` at startup would delay the error dialog by up to 7 minutes instead of appearing within seconds.
- Fixed a Linux VM kernel panic that could hang Docker Desktop when a container's file watcher (inotify/fanotify) observed host-side changes to files on a bind mount.
- Fixed Docker Hardened Images CLI ampersands being encoded when outputting JSON to the console.
- Fixed a bug where extensions-related requests would fail on startup due to the extensions selector incorrectly defaulting to enabled before settings were loaded.
- Fixed an issue where sub-agent message attribution was lost when reloading a historical multi-agent Gordon session, causing sub-agent messages to appear as if produced by the main agent.
- Fixed Gordon's **Clean up Docker** suggestion prompt to propose a cleanup plan and wait for user confirmation before removing any resources, preventing unintended deletions.
- Fixed the Gordon AI plan-mode toggle visibility to accurately reflect backend support, showing only when the connected agent declares plan capability.

#### For Windows

- Fixed a bug where per-user uninstalls of Docker Desktop on Windows failed with an unauthorized access error when attempting to revert the hosts file.
- Added per-user install mode as the default for fresh Docker Desktop installations from the Microsoft Store on Windows, removing the need for admin privileges.
- Fixed an issue where Docker Desktop crashed when the `docker-users` group is missing, now showing a recoverable group membership dialog instead.

#### For Linux

- Removing files on a host bind mount inside an Enhanced Container Isolation container no longer fails with "Value too large for data type".

## 4.84.0

### Updates

- Docker Agent v1.111.0
- Kubernetes:
  - cri-dockerd v0.4.4
- Docker Hardened Images CLI (`dhictl`) v0.0.7
- Docker Desktop CLI `v0.4.3`

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where an invalid `~/.docker/config.json` caused Docker Desktop to hang with high CPU/memory and show no error dialog. Docker Desktop now surfaces an error dialog prompting the user to correct the file.
- Fixed a bug that prevented some Docker Hardened Images customizations from being created.
- Fixed a bug where deleting an unrelated credential ID could accidentally erase Docker Hub OAuth tokens, causing users to be unexpectedly signed out.
- Removed Docker Scout CLI hints that previously appeared after running `docker pull` or `docker buildx build` commands.

#### For Windows

- Fixed a bug on Windows where an empty or malformed `install-settings.json` caused Docker Desktop to hang with high CPU/memory usage and no error dialog on startup.
- The MSI installer now detects per-user Docker Desktop installations on the machine and blocks installation with a clear message naming the affected users. Affected users must uninstall their per-user Docker Desktop before the MSI can be installed.
- Fixed a bug where uninstalling Docker Desktop could permanently lock the user out of their own application data directories if the deletion failed mid-way.

## 4.83.0

### Updates

- Docker Desktop CLI `v0.4.2`
- Docker Model Runner v1.2.6
- Docker Offload `v0.6.9`
- Docker Agent v1.103.0
- Docker Compose v5.3.1
- Docker Desktop Build `v0.36.0`
- Docker Engine v29.6.2

### Bug fixes and enhancements

#### For all platforms

- Added support for migrating a per-machine Docker Desktop installation to a per-user installation in-place via `install --user` on Windows, preserving user data without requiring a manual uninstall.
- Fixed `kubectl exec` and `kubectl attach` functionality for v1.36.
- Fixed Docker Engine startup failures being reported as a generic `io: read/write on closed pipe` error instead of the underlying cause.
- Fixed the **Images** view showing **0 Bytes** reclaimable size for a while when many images are present.
- Fixed the volumes list not correctly sorting by size.
- Fixed an issue where a GPU process crash prevented the Docker Desktop Dashboard from loading by automatically disabling hardware acceleration and restarting the app.
- Fixed an issue where `docker ai` sessions launched directly from a terminal were killed when Docker Desktop was restarted.
- Fixed an issue where a malformed `daemon.json` would be silently overwritten with defaults on startup, causing users to lose their custom daemon configuration.
- Added a **Custom rules** tab to Gordon's permissions dialog. Users can now add allow/deny rules for specific commands or MCP tools.
- Added pulsing discovery badges to Gordon's **Plan mode** button, model selector, and **Feedback/Issues** button to help users find new features.

#### For Mac

- Fixed an issue where a stale `com.docker.virtualization` process could prevent Docker Desktop from starting a new VM with a `VZErrorInvalidVirtualMachineConfiguration` error.

#### For Windows

- Fixed an issue where a failed delta update would leave users stranded on an old version by automatically falling back to the full installer.
- Fixed the Windows MSI installer reporting success when the component installation step actually failed.
- Fixed an issue where the Windows installer wizard froze while enabling Windows features via DISM during Docker Desktop installation.
- Fixed a UI thread deadlock in the Windows installer that caused a blank or hung window when prerequisite services were registered but not running during admin installs.
- Fixed the Windows installer silently reporting success when it could not install the Docker CLI plugins.
- Fixed the Windows installer deleting a previously installed CLI plugin when re-linking it failed.
- Fixed a bug where registry policy download failures were silently ignored, so users now see proper error reporting when the admin helper exits with a non-zero code.
- Changed the Windows installer to select a per-user installation by default.
- Fixed a WSL integration issue on WSL 2.6.x and later where Docker Desktop failed to work in user distros due to a 0-byte proxy binary, causing **Permission denied** or **Exec format error**.
- Fixed the Docker CLI in integrated WSL distributions breaking after Resource Saver stopped the VM. The VM now stays running while a WSL integration is active and wakes when one is enabled. Fixes docker/desktop-feedback#522.
