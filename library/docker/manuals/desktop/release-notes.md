---
title: "Docker Desktop release notes (part 1 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes

This page contains information about the new features, improvements, known issues, and bug fixes in Docker Desktop releases.

Releases are gradually rolled out to ensure quality control. If the latest version is not yet available to you, allow some time — updates typically become available within a week of the release date.

Docker Desktop versions older than 6 months from the latest release are not available for download. Previous release notes are available in our documentation repository.

For more frequently asked questions, see the FAQs.

## 4.99.0

### Updates

- Docker Offload `v0.7.36`
- Docker Hardened Images (`dhictl`) `v0.0.10`
- Docker Agent v1.153.0
- Docker Scout CLI `v1.28.0`
- Docker MCP CLI `v0.44.3`
- Docker Compose v5.7.0
- Docker Engine v29.9.3

### Bug fixes and enhancements

#### For all platforms

- Fixed a socket leak in the system proxy where plain HTTP requests from containers routed through an upstream proxy left one socket open per request until restart.
- Fixed constant network traffic and CPU usage caused by Docker Desktop computing the size of NFS- or SMB-backed volumes. Fixes docker/desktop-feedback#800.
- Fixed an issue where Docker Desktop could shut down ungracefully, causing resource leaks or a corrupted state by not allowing cleanup handlers to run.
- Fixed the Containers list cutting off the ports when clicking **Show all ports**, which now lists all of them in a popover. Fixes docker/desktop-feedback#794.
- Fixed connection resets on published ports under bursts of new connections with Docker VMM.

#### For Mac

- Fixed an issue where an update could fail with **Unable to install** because Docker Desktop killed the installer while quitting.

#### For Windows

- Fixed Windows updates stopping Docker Desktop abruptly, which could corrupt the engine databases.
- Fixed an error that could occur when attempting to run `docker desktop` commands from inside a WSL distro while using the WSL integration.
- Added BuildKit support for Windows containers when using the containerd image store.
- Fixed WSL 2 engine start failing on slow machines when the data disk took more than a fraction of a second to appear.
- Fixed per-user installs and updates on Windows failing with a "Virtual Machine Platform" error on machines where WSL 2 already works.
- Fixed Docker Desktop hanging after closing an error dialog with its **Close** button. Closing an error dialog that offers **Continue now** continues instead of quitting Docker Desktop.
- Fixed Windows containers failing to start at login with **Starting windows containers: An error has occurred.** when a container took longer than 30 seconds to stop.
- Fixed WSL 2 distributions flushing their systemd-resolved DNS cache every 30 seconds while Docker Desktop was running. Fixes docker/desktop-feedback#761.
- Fixed Windows installer launcher to report descriptive error reasons (e.g. **Disk full**) on update failure instead of a bare exit code.

## 4.98.0

### Updates

- Docker Offload `v0.7.35`
- The following Kubernetes images have been updated to bring in latest security fixes. New tags listed below:
   - `docker/desktop-storage-provisioner:v5.0`
   - `docker/desktop-vpnkit-controller:v5.0`
   - `docker/desktop-containerd-registry-mirror:v0.0.5`
   - `docker/desktop-cloud-provider-kind:v0.8.0`

### Bug fixes and enhancements

#### For all platforms

- Fixed Docker Hub model pulls failing on proxy-only networks where local DNS could not resolve the authentication endpoint.
- Fixed Docker Desktop staying on the **Starting** page after Docker Engine had started. Fixes docker/desktop-feedback#685
- Fixed `diagnose gather` on slow or stopped VMs by capping the VM start wait to 120 seconds.
- Improved responsiveness of error dialogs.
- Fixed moving the disk image to another volume failing when the copy took more than 5 minutes.
- Fixed uncaught **Request aborted** errors each time the engine stopped.

#### For Mac

- Removed the `com.docker.vmnetd` privileged helper. A helper installed by a previous version is uninstalled automatically, and the `install vmnetd` option of the command line installer is gone.

#### For Windows

- Added Docker VMM to the **Clean up data** dialog.
- Fixed WSL error code parsing so that users running newer WSL versions (3.0.x) receive accurate, actionable recovery instructions instead of a generic error message.
- Fixed the Docker VMM backend option on Windows ARM64 to appear correctly disabled with an explanation in settings, and automatically fall back to WSL 2 during install or upgrade.
- Fixed an intermittent **Being used by another process** error on the `desktop-linux` Docker context file when the engine started.
- Fixed file sharing treating a directory as shared, or as allowed by Settings Management, when its name only started with that of a shared or allowed directory (e.g. `C:\foobar` for `C:\foo`). Allowed file share entries now match whole directory names only.
- Fixed an issue where processes started in the Docker Desktop terminal could be left running after closing the terminal.
- Added support for running `docker` and `docker compose` from WSL 2 distros when Docker VMM is the engine, including bind mounts of files on Windows drives such as `/mnt/c`.
- Fixed Docker VMM re-enabling the WSL feature on update and showing a **Press any key to install WSL** prompt when WSL is uninstalled. Fixes docker/desktop-feedback#775.

#### For Linux

- Added Docker VMM as a virtual machine manager option in Settings on Linux.

### Security

- Fixed CVE-2026-98432, a use-after-free in the Linux kernel's IPv4 TCP handling.
- Fixed CVE-2026-112917 where a container on the WSL 2 backend could bypass the AF_VSOCK restriction. Requires WSL 3.0.3 or later.

## 4.97.0

### Bug fixes and enhancements

#### For all platforms

- Fixed a spurious Resource Saver error when signing out while sign-in enforcement is enabled.
- Fixed diagnostics collection being slow when the backend is unresponsive, reducing worst-case wait time from several minutes to approximately 3 seconds.
- Fixed reliability issues with the container exec terminal: closing a container no longer triggers spurious error reports, and terminal resize now works correctly on startup.
- Fixed an issue where the Date header in Docker API responses was incorrect after Docker Desktop entered Resource Saver mode.
- Added the `-e`/`--env` flag to `docker pass run` for setting environment variables, including `se://` secret references.
- Fixed `docker pass set` printing "context canceled" on Ctrl-C at the value prompt.
- Improved responsiveness when searching the **Images**, **Containers** and **Volumes** lists.
- Fixed an unhandled error when viewing the files of a Compose project whose config file no longer exists.

#### For Mac

- Fixed adding Docker Desktop commands to the PATH failing for fish users without a `~/.config/fish` directory.
- Added a setting to allow privileged ports (1-1024) to be exposed to other machines on the LAN.

#### For Windows

- Added a Docker VMM (Beta) backend option to the Windows installer.
- Fixed an issue on Windows where a slow WSL version check asked to update WSL.
- Fixed Docker VMM requiring a Docker Desktop restart to share a new bind-mount directory from the host.
- Fixed WSL installer errors (e.g. `Wsl/CallMsi/`) being misidentified as disk-related failures, preventing misleading 'disk file has been deleted' recovery messages.
- Fixed Docker Desktop becoming unresponsive, with `docker` commands hanging and Quit not working, after the disk filled up or, on Windows, after the backend's console host process exited. Fixes docker/desktop-feedback#429 and docker/desktop-feedback#699.
- Fixed an issue where the installer rejected `--backend=docker-vmm` when combined with `--user` flag or Microsoft Store installs.
- Fixed factory reset to stop Docker engines before deleting data, surface cleanup failures as an error dialog, and clean up custom data-root directories.
- Fixed Windows containers failing to start with a "Path contains symlink" error on `callback.sock`.
- Fixed a bug where the installer could leave a file under `C:\ProgramData\DockerDesktop` with no permissions at all, making it unreadable to diagnostics and to later installs.
- Fixed a bug where the disk image location could not be moved back to a folder it had previously been moved out of. Fixes docker/desktop-feedback#565.
- Fixed a bug where a failed update could put back Start Menu and desktop shortcuts that had been deleted on purpose.
- `--user` mode is now the default for new Docker Desktop `.EXE` installations.

### Security

- Addressed CVE-2026-114409, where Docker Desktop could write third-party API keys and OAuth access tokens in cleartext to local application logs and diagnostics bundles. This release also cleans up existing host logs and crash dumps. These OAuth tokens are not Docker account tokens. If you've generated or shared diagnostics bundles with Docker Desktop 4.96.x or earlier, or kept copies of Docker Desktop logs elsewhere, delete or sanitize them.
- Addressed CVE-2026-99999, a kernel vulnerability where a container could exploit bad IPv4 checksum metadata via TUN or `AF_PACKET` to corrupt the VM's network stack.

## 4.96.3

### Updates

- Docker Init `v1.4.1`
- Docker Offload `v0.7.19`
- Docker Model Runner `v1.2.9`
- Docker Debug `v0.49.0`
- Docker MCP `v0.44.2`
- `kubectl` `v1.36.1`

### Security

- Removed trust for certificates issued by the compromised eMudhra intermediate CA compromise. An attacker with network access could have used these certificates to intercept TLS connections made by non-browser clients, such as the Docker CLI and daemon.

## 4.96.2

### Updates

- Docker Compose v5.6.1
- Docker Offload `v0.7.6`
- Docker Agent v1.152.0
- Docker Hardened Images CLI (`dhictl`) v0.0.9
- Docker Desktop Build `v0.39.1`
- Docker Scout CLI v1.27.0
- Docker pass `v0.3.2`

### Security

- Removed trust for certificates issued by the compromised eMudhra intermediate CA compromise. An attacker with network access could have used these certificates to intercept TLS connections made by non-browser clients, such as the Docker CLI and daemon.

> **Important:**
>
> This fix is being rolled out in batches as individual Docker Desktop components are updated. Upcoming patch releases will cover the remaining components. We recommend updating to each patch release as soon as it’s available.

## 4.96.1

### Updates

- Docker Engine 29.9.2
- Docker Buildx v0.38.1
- Credential <example-value> to v0.9.12
-  Docker Offload `v0.7.16`

### Security

- Removed trust for certificates issued by the compromised eMudhra intermediate CA compromise. An attacker with network access could have used these certificates to intercept TLS connections made by non-browser clients, such as the Docker CLI and daemon.

> **Important:**
>
> This fix is being rolled out in batches as individual Docker Desktop components are updated. Upcoming patch releases will cover the remaining components. We recommend updating to each patch release as soon as it’s available.

## 4.96.0

### Updates

- Credential <example-value> v0.9.10
- containerd v2.4.2
- Docker Desktop Build `v0.39.0`
- Docker Offload `v0.7.4`
- `docker pass` v0.3.0
- Docker Engine v29.9.1
- Docker Buildx v0.38.0
- Docker Agent v1.149.0

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where the error dialog could close unexpectedly on systems under memory pressure.
- Fixed an issue where Docker Desktop's internal DHCP replies were sent onto the host's physical network.
- Fixed the reclaimable space on the **Images** view staying at 0 when a local image has no history.
- Improved telemetry for secrets injection by including the realm of each resolved environment variable secret <example-value> in observability events.
- Fixed Docker Desktop getting stuck on "Starting the Docker Engine..." when a Docker network took addresses inside Docker Desktop's internal network (`192.168.65.0/24` by default). Such networks are now rejected, and an existing one can be removed from the error dialog. Fixes docker/desktop-feedback#659.
- Fixed file ownership and transient `0:0` reporting on Apple Virtualization Framework + VirtioFS bind mounts. Fixes docker/desktop-feedback#628 and #649.
- Fixed the CLI error message when combining a leading `+` with a trailing `ago` in a time span to read as natural prose.
- Fixed a bug where uninstalling Docker Desktop could leave the installation directory behind.
- Added a **Check for updates** button to the **Software update** drawer when an update is available or ready to install, so newer releases can be found without installing the pending update first.
- Fixed the backend crashing, and the engine becoming unreachable, when a container's `--volumes-from` refers back to itself, for example after renaming a container to the name of the removed container it inherits volumes from. See docker/desktop-feedback#286.
- Clearing Gordon sessions no longer deletes sessions that are still running.
- Improved buffered filesystem performance and fixed a FUSE issue that could expose stale bytes when extending files.

#### For Mac

- Fixed an issue where a misconfigured `allowedOrgs` type in a configuration profile was silently ignored; admins now see a log message explaining why sign-in enforcement is not applied.
- Fixed Docker Desktop on Mac not reporting an error when the VM stops unexpectedly.

#### For Windows

- Fixed an issue where tray icon light/dark theme detection could fail.
- Fixed disk full detection on Windows so that a full-disk error during startup now shows the disk full recovery dialog instead of a generic failure dialog.
- Fixed an issue on Windows where WSL distro startup failures showed a confusing 'bad magic string' error instead of the actual reason reported by wsl.exe.
- Improved the error shown when Docker VMM cannot use the Windows hypervisor, for example on some virtual machines where WSL 2 works.
- Fixed a bug where an unusable WSL data disk (e.g., already in use) would repeatedly trigger failed mkfs format attempts instead of reporting a clear error.
