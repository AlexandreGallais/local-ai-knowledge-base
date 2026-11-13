---
title: "Docker Desktop release notes (part 10 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 10 of 21)

## 4.42.1

### Upgrades

- Docker Compose v2.37.1

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where Docker domains were not reachable when the proxy configuration is not valid.
- Fixed a possible deadlock when exposing ports.
- Fixed a race condition which can cause `docker run -p` ports to disappear.

#### For Mac

- Fixed a bug where a container’s port list appeared empty when inspected immediately after it was created, for example, when using a script. docker/for-mac#7693

#### For Windows

- Disabled the Resource Saver mode in WSL 2 to prevent `docker` CLI commands hanging in WSL 2 distros. docker/for-win#14656

## 4.42.0

### New

- Expanded network compatibility with IPv6 support.
- The Docker MCP Toolkit is now natively integrated into Docker Desktop.
- Docker Model Runner is now available for Windows systems running on Qualcomm/ARM GPUs.
- Added a **Logs** tab to the Models view so you can see the inference engine output in real time.
- Gordon now integrates the MCP Toolkit, providing access to 100+ MCP servers.

### Upgrades

- Docker Buildx v0.24.0
- Docker Engine v28.2.2
- Compose Bridge v0.0.20
- Docker Compose v2.36.2
- NVIDIA Container Toolkit v1.17.7
- Docker Scout CLI v1.18.0

### Bug fixes and enhancements

#### For all platforms

- Docker Desktop now accepts certificates with a negative serial number.
- Re-enable `seccomp` for containers by default. Use `docker run --security-opt seccomp=unconfined` to disable seccomp for a container.
- Fixed a bug that caused Docker Desktop to hang when it ran out of memory.
- Block `io_uring` syscalls in containers.
- Added support for pulling models from Docker Hub directly, simplifying the process of accessing and using models.
- Docker Desktop now sets the disk usage limit to the size of the physical disk on fresh install and reset to defaults on Mac and Linux.
- The maximum disk size in the settings UI now aligns with the full capacity of the host file system.
- The **Models** view now has a **Docker Hub** tab that lists models under the `ai` namespace.
- Improved the sign-in enforcement message when more than 10 organizations are enforced.
- Changed the way ports are mapped by Docker Desktop to fully support IPv6 ports.
- Fixed a bug in the Dashboard container logs screen causing the scrollbar to disappear as the mouse approaches.
- Enforced sign-in fixed for Teams subscription users.
- `llama.cpp` server now supports streaming and tool calling in Model Runner.
- Sign-in Enforcement capability is now available to all subscriptions.

#### For Mac

- Fixed a bug where the disk would always have a minimum usage limit of 64GB when using Docker VMM.
- Disabled the memory protection keys mechanism in the Docker Desktop Linux VM. This caused VS Code Dev Containers to not work properly. See docker/for-mac#7667.
- Fixed persistent volume claims under Kubernetes. Fixes docker/for-mac#7625.
- Fixed a bug where the VM failed to start using Apple virtualization.framework.
- Minimum version to install or update Docker Desktop on is now macOS Ventura 13.3.

#### For Windows

- Fixed a bug in Enhanced Container Isolation on Windows WSL, where files with hardlinks inside containers had `nobody:nogroup` ownership.
- Fixed a bug that caused Docker Desktop to crash. Related to docker/for-win#14782.
- Fixed a bug that caused `The network name cannot be found` error when starting with WSL 2. Fixes docker/for-win#14714.
- Fixed an issue where Docker Desktop would not remove entries in the hosts file when uninstalling.
- Fixed an issue when reading auto-start registry key for some system languages. Fixes docker/for-win#14731.
- Fixed a bug where Docker Desktop was adding unrecognised /etc/wsl.conf `crossDistro` option which was causing WSL 2 to log an error. See microsoft/WSL#4577
- Fixed a bug where Docker Desktop failed to start on WSL 2.5.7 if another WSL distro is still using Linux cgroups v1. Fixes docker/for-win#14801
- Windows Subsystem for Linux (WSL) version 2.1.5 is now the minimum version required for proper functioning of Docker Desktop application

### Known issues

#### For all platforms

- This release contains a regression with  `docker port`, resulting in "No host port found for host IP" errors when using testcontainers-node. See testcontainers/testcontainers-node#818

#### For Windows

- Running containers with Wasm will hang sporadically. See docker/for-mac#7666.
- On some machines Resource Saver will cause other WSL 2 distros to freeze. The workaround is to disable Resource Saver. See docker/for-win#14656.

## 4.41.2

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where the `Models` menu was displayed in the GUI even when Docker Model Runner was not supported or not enabled.

## 4.41.1

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where Docker Desktop failed to start when a proxy configuration was specified in the `admin-settings.json` file.

#### For Windows

- Fixed possible conflict with 3rd party tools (for example, Ollama) by avoiding placing `llama.cpp` DLLs in a directory included in the system `PATH`.

## 4.41.0

### New

- Docker Model Runner is now available on x86 Windows machines with NVIDIA GPUs.
- You can now push models to Docker Hub with Docker Model Runner.
- Added support for Docker Model Runner's model management and chat interface in Docker Desktop for Mac and Windows (on hardware supporting Docker Model Runner). Users can now view, interact with, and manage local AI models through a new dedicated interface.
- Docker Compose and Testcontainers Java and Go now support Docker Model Runner.
- Introducing Docker Desktop in the Microsoft App Store.

### Upgrades

- Docker Engine v28.1.1
- Docker Compose v2.35.1
- Docker Buildx v0.23.0
- Docker Scout CLI v1.17.1
- Compose Bridge v0.0.19

### Security

- Fixed CVE-2025-3224 allowing an attacker with access to a user machine to perform an elevation of privilege when Docker Desktop updates.
- Fixed CVE-2025-4095 where Registry Access Management (RAM) policies were not enforced when using a MacOS configuration profile, allowing users to pull images from unapproved registries.
- Fixed CVE-2025-3911 allowing an attacker with read access to a user's machine to obtain sensitive information from Docker Desktop log files, including environment variables configured for running containers.

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug in DockerVMM that caused an excessive number of open file handles on the host.
- Fixed an issue where Docker Desktop failed to start if the `admin-settings.json` file didn't contain the optional `configurationFileVersion` configuration.
- Fixed a bug that was causing outgoing UDP connections to be eagerly closed.
- Enhanced log reading experience with advanced search capabilities and container-level filtering, enabling quicker debugging and troubleshooting.
- Improved error messages when downloading Registry Access Management configuration.
- If Docker can't bind an ICMPv4 socket, it now logs an error and continues rather than quits.
- Enabled the memory protection keys mechanism in the Docker Desktop Linux VM, allowing containers like Oracle database images to run correctly.
- Fixed a problem with containers accessing `/proc/sys/kernel/shm*` sysctls when Enhanced Container Isolation is enabled on Mac, Windows Hyper-V, or Linux.
- Added kernel module `nft_fib_inet`, required for running firewalld in a Linux container.
- MacOS QEMU Virtualization option is being deprecated on July 14, 2025.

#### For Mac

- Fixed a bug that caused high CPU usage. Fixes docker/for-mac#7643.
- Fixed multi-arch build issue with Rosetta on M3 Macs.
- Fixed an issue where absence of `/Library/Application Support/com.docker.docker/` directory can cause failure to apply RAM policy restrictions.

#### For Windows

- The Windows `.exe` installer now includes improved handling of locked files. Fixes docker/for-win#14299 and docker/for-win#14316.
- Fixed `Docker Desktop.exe` not showing version information after installation. Fixes docker/for-win#14703.

### Known issues

#### For all platforms

- If you have enforced sign-in using `desktop.plist` (on macOS) or Registry key (on Windows) and also have a `registry.json`, sign-in will fail if the user belongs to an organization listed in `desktop.plist`/ registry key but not to any organizations specified in `registry.json`. To resolve this, remove the `registry.json` file.

#### For Windows

- If multiple organizations are specified in the `allowedOrgs` Windows registry key using space-separated format, sign-in will fail and user will be logged out. As a workaround, specify each organization on a separate line in the registry key value.

## 4.40.0

### New

- You can now pull, run, and manage AI models from Docker Hub directly in Docker Desktop with Docker Model Runner (Beta). Currently available for Docker Desktop for Mac with Apple Silicon.

### Upgrades

- Docker Buildx v0.22.0
- Docker Compose v2.34.0
- Docker Engine v28.0.4
- Docker Scout CLI v1.17.0
- compose-bridge v0.0.18
- NVIDIA Container Toolkit v1.17.5

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug that caused `docker-proxy` to stop forwarding UDP datagrams to containers.
- Fixed a bug that caused docker-proxy to close UDP connections to containers eagerly and resulting in the source address to change needlessly
- Fixed a race condition that prevented Docker Desktop Kubernetes from starting in some scenarios.
- Improved the way ECI collects image digest info from a repository in environments where proxies are configured.
- Users can now to specify a timeout when generating  a private Extension Marketplace using the new `--timeout` flag.
- Removed unused internal helper tool `com.docker.admin` for Mac and Linux.

#### For Mac

- Fixed an issue where stale directory cache in Docker VMM that prevented detecting moved or new files.
- Removed Continue/Restart pop up when Time Machine utility is restricted.
- Docker Desktop now allows Unix domain sockets to be shared with containers via `docker run -v /path/to/unix.sock:/unix.sock`. The full socket path must be specified in the bind-mount. See for-mac/#483.
- Fixed a bug that caused the `docker-credential-osxkeychain` and `docker-credential-desktop` to return malformed URIs when a token was stored for a server with a port specified.

#### For Windows

- The Windows MSI and `.exe` installers now disable Windows Containers by default when installing with the GUI.
- Improved port-mapping throughput on WSL2.

### Known issues

#### For Windows

- Switching to Windows Containers while the privileged helper error message is displayed could cause inconsistent state. As a workaround, quit Docker Desktop, change `UseWindowsContainers` to `false` in `settings-store.json` and restart Docker Desktop.
- After installation, `Docker Desktop.exe` does not contain the latest version information.

## 4.39.0

### New

- The Docker Desktop CLI is now generally available. You can now also print logs with the new `docker desktop logs` command.
- Docker Desktop now supports the `--platform` flag on `docker load` and `docker save`. This helps you import and export a subset of multi-platform images.

### Upgrades

- Docker Compose v2.33.1
- Docker Buildx v0.21.1
- Kubernetes v1.32.2
- Docker Engine v28.0.1
- Docker Scout CLI v1.16.3

### Security

- Fixed CVE-2025-1696 which could disclose proxy authentication credentials in plaintext in log files.

### Bug fixes and enhancements

#### For all platforms

- Ask Gordon now offers deeper context on Docker images, containers, and volumes, delivers faster support, and enables more user actions via Docker Desktop and the Docker CLI.
- Support multi-platform images via enabling users to pick a specific platform in `docker history`
- Fixed an issue that caused clients other than the CLI and Docker Desktop to see a delay of 3 seconds whenever a container with port-mappings exists. See docker/for-mac#7575
- Fixed a bug in the ECI Docker socket permissions which caused it to sometimes block Docker socket mounts on containers with allowed images, or images derived from allowed images.
- Fixed a bug that prevented Docker Desktop from entering Resource Saver mode again immediately after an engine restart.
- Fixed an issue that caused Kubernetes clusters to stop working due to expired PKI certificates.

#### For Mac

- Downgraded Linux kernel to `v6.10.14` to fix a bug in OpenJDK that causes Java containers to terminate due to cgroups controller misidentification. See docker/for-mac#7573.
- Added `/usr/share/misc/usb.ids` in the root mount namespace to fix `usbip`.
- Fixed an issue where the display of the CPU limit was capped at 8 when using Docker VMM.
- Fixed an issue where startup would hang and the `com.docker.backend` process consumed 100% of the CPU. See docker/for-mac#6951.
- Fixed a bug that caused all Java programs running on M4 Macbook Pro to emit a SIGILL error. See docker/for-mac#7583.
- Blocked startup on macOS 15.4 beta 1 since starting VMs will cause the host to crash, see https://developer.apple.com/documentation/macos-release-notes/macos-15_4-release-notes#Virtual-Machines.
- Fixed an issue where the myIPAddress PAC file function retrieved the host IP from the wrong interface, causing incorrect proxy selection.

#### For Windows

- Fixed a bug that prevented `docker compose log` to stream when running apps in WSL.
- Fixed a bug where Paketo buildpacks failed with Enhanced Container Isolation when Docker Desktop uses WSL.
- Fixed a bug where the WSL 2 integration would fail if WSL Version 1 distributions are installed.
- Fixed a bug that caused some CLI plugins update to fail if WSL distributions were enabled.
- Fixed a bug where Docker Desktop sign-in would hang when using a PAC file for proxy configuration, causing a blurred UI and blocking access.

#### For Linux

- The **Software Updates** page in settings, now points to the latest available version available.
