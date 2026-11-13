---
title: "Docker Desktop release notes (part 3 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 3 of 21)

## 4.92.0

### Updates

- containerd v2.3.5
- Docker Agent v1.140.0
- Docker Buildx v0.37.1
- Docker Offload `v0.6.27`

### Bug fixes and enhancements

#### For all platforms

- Fixed published ports staying unreachable for the life of the container when the host port was momentarily busy.
- Fixed in-app updates repeatedly failing when the update manifest contains no installer matching the current installation.
- Fixed Kubernetes staying on "Starting Kubernetes" indefinitely when the cluster failed to initialize. The error is now reported.
- Fixed **Send Diagnostics** hanging indefinitely, or showing an unhelpful error, when a proxy blocks the upload.
- Fixed container start, stop, and restart failures in the Docker Desktop Dashboard reporting only a generic HTTP error instead of the reason reported by Docker Engine.
- Fixed Docker Hub repository and tag browsing to use Docker Hub's current API, and removed the non-functional **Starred** and **Contributed** tabs from Docker Hub organization profiles.
- Fixed an issue where users signed out before a Docker Desktop update were not prompted to sign in after the app restarted.
- Fixed **Settings** section navigation to scroll to the selected section reliably, and added a divider between sections for easier visual parsing.
- Improved Kubernetes cloud cluster management by hiding the `kubeadm` option in the cluster dialog and resetting the cluster mode to kind when the dialog closes.
- Improved Ask Gordon so sessions start in the relevant project directory when launched from a volume or build history row, and added a banner that prompts you to select a project folder when chatting from an auto-generated scratch directory.
- Fixed Ask Gordon file diffs: edits that share a near-identical text prefix, the summary bar overlapping your message when scrolling, and row backgrounds and column width in the edit tool-call view.
- Fixed Ask Gordon chat: a blank command in the shell approval dialog, background job tool calls rendering as raw JSON, streamed command output jank, raw internal error details, and opening Ask Gordon from **Settings**, **Troubleshoot**, or **Support** corrupting drawer state for Ask Gordon, notifications, and the Learning Center.

#### For Mac

- Fixed moving the disk image to another location being slow on macOS 26.
- Fixed a macOS update failure where validating the staged app could fail even though the app was valid, and extended that validation to catch a staged app that fails to start.
- Fixed excessive idle CPU usage on Retina displays caused by a badge animation in the Ask Gordon interface.

#### For Windows

- Added support for migrating admin, per-machine installations to per-user installations when running the Docker VMM backend, in addition to WSL 2.
- Fixed an issue where Windows 10 users with the inbox `wsl.exe` saw a raw error instead of the prompt to update WSL when Docker Desktop checked the WSL version.
- Fixed `host.docker.internal` and `gateway.docker.internal` not being injected into Windows containers after Docker Desktop lost the container event stream.
- The MSI installer now refuses per-user installations, which are not supported, instead of installing a copy that later updates cannot upgrade.
- Fixed a misleading error message that claimed the WSL disk image had been deleted when WSL could not open it while registering the Docker Desktop distribution.
- Fixed Kubernetes failing to start after a WSL distro that had been integrated was unregistered.
- Fixed single-file bind mounts on Docker VMM. The "not shared from the host" error now points at the file's containing directory, and a file entry in the **File sharing** settings no longer prevents the engine from starting.
- Fixed Docker Desktop retrying the WSL engine indefinitely without reporting an error when WSL was unable to load its own kernel modules.
- Fixed disk image location moves always failing when moving to a different drive. Fixes docker/desktop-feedback#548 and docker/desktop-feedback#550.
- Fixed a failed incremental update not retrying with a full installer.
- Fixed the WSL 2 cross-distro bind-mount proxy serving stale or incomplete directory contents for host paths on slow-to-mount drives, such as Storage Pool volumes.

### Security

- Updated containerd to `v2.3.5`, addressing CVE-2026-53495.

### Known issues

- WSL integration can fail to start with `timed out waiting for ... to be automounted` when a distro's `wsl.conf` sets `[automount] root` to `/`, or after a container has bind-mounted a non-drive path under `/mnt`, such as WSLg's `/mnt/wslg`. As a workaround, downgrade to Docker Desktop 4.91.0, or remove the `root` setting from `wsl.conf` and run `wsl --shutdown`.

## 4.91.0

### Updates

- Docker Engine v29.8.0
- containerd v2.3.4
- Docker Compose v5.5.1
- Docker Agent v1.136.0
- Docker Desktop Build `v0.38.0`
- Docker Buildx v0.37.0
- Docker Offload `v0.6.17`
- Credential helpers v0.9.9

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where the **Last modified** column in the Volumes and container filesystem browsers displayed inaccurate timestamps like '57 years ago' instead of a blank when modification time was unavailable.
- Fixed Docker Desktop writing invalid export PATH syntax into csh/tcsh profiles when adding `~/.docker/bin` to PATH.
- Fixed an issue where Docker Scout CLI hints would persist after upgrading.
- Fixed a bug where a corrupt Docker network database, usually caused by an abrupt shutdown, prevented Docker Engine from starting and left a factory reset as the only recovery option.
- Fixed CLI plugin updates failing repeatedly when the plugin binary was locked by another process. The update is now retried automatically on the next start.
- Fixed Docker Desktop's interface getting stuck in an indefinite restart loop on machines with certain graphics driver issues, and added a message explaining when the interface can't be displayed due to a hardware compatibility problem.
- Improved startup experience in the new UI by showing a themed skeleton layout (header, sidebar, footer) immediately instead of a blank window while the app loads.
- Fixed Docker Desktop sometimes taking five extra minutes to report the engine as stopped when the virtual machine stopped unexpectedly.
- Fix Kubernetes (kubeadm) missing CNI loopback interface name.
- Fixed MCP profile tours getting stuck or rendering tooltips off-screen.
- Fixed a bug where changing the disk image location to a different volume could delete the existing disk image if the operation was interrupted before the copy started.
- Fixed Docker Compose rebuilding locally-built images on every Resource Saver wake. Fixes docker/desktop-feedback#507.
- Fixed a regression where Hub image search and tag listing would break if the Docker Hub API response included unexpected or changed fields.
- Fixed an issue where the VM could be unexpectedly shut down when the idle timeout was set to 0.

#### For Mac

- Fixed Docker Desktop adding `~/.docker/bin` to the login-shell PATH even when CLI tools were installed to the system path, which could create a `~/.bash_profile` that hid the user's existing shell environment.
- Added `kubectl` shell completions. Fixes docker/for-mac

#### For Windows

- Fixed a bug where switching to Windows containers with the WSL engine still enabled could incorrectly offer to continue without starting the required privileged service.
- Fixed an issue where uninstalling Docker Desktop left a stale `FeaturesRequireReboot=1` registry key, which could cause unexpected reboot prompts on subsequent installs.
- Fixed Docker Desktop staying on "Starting..." indefinitely when WSL could not access the disk image location, and reported the access failure with actionable guidance instead of a generic WSL error.
- Fixed the Windows MSI installer reporting success even when the Docker Desktop service failed to install or start.
- Fixed a spurious failure when running a command right after switching to Windows containers.

## 4.90.0

### Updates

- Docker Agent v1.128.0
- Docker Offload `v0.6.15`
- Docker Desktop CLI v0.4.4

### Bug fixes and enhancements

#### For all platforms

- Ask Gordon is now accessible as a right-side drawer, keeping users in context while chatting with Gordon alongside any page being viewed.
- A container, image, or volume row with a detected issue now shows an Ask Gordon symbol that starts a diagnosis in one click.
- Fixed a bug where generating a diagnostics bundle could hang until its timeout if a file it collects was on an unresponsive filesystem.
- Fixed an issue where changing the auto-pause timeout while Docker Desktop was already idle would not apply until the original timer expired.
- Fixed a crash in the **Images** view that occurred when many images loaded simultaneously on cold launch or after waking from Resource Saver mode.
- Fixed a Docker Desktop Dashboard crash issue. Fixes docker/desktop-feedback#611.
- Added support for starting and stopping a Kubernetes cloud cluster via Docker Offload, with configurable Kubernetes version and node count.
- The Docker Desktop Dashboard now displays the specific reason Docker Engine failed to start, when available.
- Fixed a bug where `renameat2(RENAME_EXCHANGE)` on a shared folder overwrote the target instead of swapping the two files.
- Fixed a bug where `mmap()` of a file on a Synchronized File Share failed with "No such device", breaking git and pnpm. Fixes docker/desktop-feedback#627.
- Fixed a bug where repeatedly replacing files on a shared folder leaked VM disk space until Docker Desktop was restarted. Fixes docker/desktop-feedback#619.
- Fixed a bug where a bind-mount root intermittently reported ownership as 0:0, causing git to report "detected dubious ownership". Fixes docker/desktop-feedback#628.

#### For Mac

- Fixed an installer crash that occurred when the user's home folder was on a different disk than `/Applications`. Fresh installs and auto-updates now complete successfully in this configuration.
- Fixed startup failures caused by `VZErrorInvalidVirtualMachineConfiguration` due to stale file locks on `Docker.raw` and APFS disk metadata sync races.

#### For Windows

- Fixed a startup hang where Docker Desktop would get stuck on 'Starting' after a WinGet upgrade due to conflicting engine settings in `install-settings.json`.
- The Docker VMM engine option is now always available and no longer flips engines shortly after startup while feature flags load.
- Fixed an issue where the `noWindowsContainers` setting in `install-settings.json` was cleared during a self-update, causing Windows containers to be re-enabled unexpectedly.
- Added a prompt during in-app updates for all-users installations, offering users the option to migrate to a per-user installation that requires no admin privileges for future updates.
- Fixed a bug where Docker Desktop could fail to start after an ungraceful shutdown left behind a stuck socket file.
- Docker Desktop now checks that a Windows host can run Docker VMM before switching to it, and offers to switch back instead of leaving no working engine.
- Fixed Docker VMM telling users to enable the Windows Hypervisor Platform feature when it was already enabled and the real cause was elsewhere.
- Fixed a bug where a failing third-party WSL plugin (for example the Microsoft Defender for Endpoint plug-in for WSL) was reported as a missing Docker Desktop disk instead of naming the plugin that blocked WSL from starting.
- Fixed the MSI installer ignoring `ENGINE=docker-vmm`, which left the Windows Hypervisor Platform feature disabled and the engine unselected.
- Fixed a bug where running the installer with only command-line flags and no `install` verb failed with exit code `4294967291` and no error message.
- Fixed a bug where Docker VMM did not explain how to fix an unavailable Windows Hypervisor Platform.

### Security

- Updated the Kind cloud provider image to `v0.7.0`, addressing CVE-2026-46595 and CVE-2026-39834.

## 4.89.0

### Updates

- Docker Compose v5.5.0
- NVIDIA Container Toolkit v1.20.0
- Docker Agent v1.127.0

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where background container and image polling was waking the Docker engine unnecessarily when Resource Saver mode was active.
- Fixed slow Zsh startup caused by duplicated Docker CLI completion setup in `.zshrc`. Docker Desktop now keeps a single completion block and removes existing duplicates. Fixes docker/desktop-feedback#561.
- Sidebar customization permanently is now available to all users. Right-click the left-hand navigation, select **Customize**, and then select, deselect, or re-order the tabs.
- Fixed the **Disk usage** slider in **Settings** to no longer show duplicate tick marks at small ranges, now displaying values in GiB with one decimal place for ranges up to 8 TiB.
- Fixed excessive update notifications in the notification center so that pop-ups only appear for failures or when user action is required, not during in-progress update steps.
- Fixed a dashboard crash issue. Fixes docker/desktop-feedback#611

#### For Windows

- When `CONTAINERD_BUILDX_FOR_WINDOWS` is enabled, Windows Containers now uses `dockerd`'s embedded containerd and in-process BuildKit, replacing the standalone containerd and buildkitd services.
- Fixed a bug where Docker Desktop could fail to start after an ungraceful shutdown left behind a stuck socket file.
- Fixed a bug where Docker VMM did not explain how to fix an unavailable Windows Hypervisor platform.

## 4.88.1

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where opening the Dashboard would incorrectly redirect unauthenticated users to the sign-in prompt page.
