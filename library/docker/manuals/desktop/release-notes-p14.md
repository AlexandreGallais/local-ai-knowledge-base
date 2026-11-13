---
title: "Docker Desktop release notes (part 14 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 14 of 21)

## 4.28.0

### New

- Settings Management now allows admins to set the default file-sharing implementation and specify which paths developer can add file shares to.
- Added support for `socks5://` HTTP and HTTPS proxy URLs when the `SOCKS` proxy support beta feature is enabled.
- Users can now filter volumes to see which ones are in use in the **Volumes** tab.

### Upgrades

- Compose v2.24.6
- Docker Engine v25.0.3
- Docker Scout CLI v1.5.0
- Qemu 8.1.5
- Wasm runtimes:
  - Updated runwasi shims to `v0.4.0`, including:
    - wasmtime `v17.0`, with initial support for WASI preview 2
    - wasmedge `v0.13.5`
    - wasmer `v4.1.2`
  - Updated deislabs shims to `v0.11.1`, including:
    - lunatic `v0.13.2`
    - slight `v0.5.1`
    - spin `v2.2.0`
    - wws `v1.7.0`

### Bug fixes and enhancements

#### For all platforms

- Fixed `postgis` with `Qemu`. Fixes docker/for-mac#7172.
- Re added `CONFIG_BLK_DEV_DM` kernel config for `kpartx`. Fixes docker/for-mac#7197.
- Allow `SOCKS` proxies to be set via a proxy autoconfig `pac file`.
- Re added `CONFIG_AUDIT` kernel config.
- Fixed a bug with the Rust build on `virtiofs`. See rust-lang/docker-rust#161.
- Fixed an issue that caused the `missing registry authentication` error when pulling Kubernetes images.
- Fixed an issue that caused Docker Compose commands to hang.
- Fixed a bug in `docker build` that caused Docker Desktop to crash. Fixes docker/for-win#13885, docker/for-win#13896, docker/for-win#13899, docker/for-mac#7164, docker/for-mac#7169
- Docker Init:
  - Improved how Java applications are started based on Spring Boot version. Fixes docker/for-mac#7171.
  - Removed non-official Docker image used for Rust cross-compilation
- Builds view:
  - Active and completed builds can be found in dedicated tabs.
  - Build details now displays build duration and cache steps.
  - OpenTelemetry traces are now displayed in the build results.
  - Fixed an issue where context builders events were not always triggered.
  - Restyle the empty state view to make the dashboard clearer.

#### For Mac

- Fix `httpd` issue with Rosetta. docker/for-mac#7182
- Fixed a bug that caused a crash on the `virtualization.framework`. Fixes docker/for-mac#7024

#### For Windows

- Fixed an issue with DNS timeouts on Windows.
- Added support for Enhanced Container Isolation Docker socket mount permission on WSL user distributions.
- Fixed an issue that caused the `failed to get console mode` error when redirecting output from the CLI.
- Fixed an issue with the engine socket permissions when mounted inside containers. Fixes docker/for-win#13898

### Known Issues

#### For Windows

- In dark mode, the **Disk image location** in **Resources**>**Advanced** settings is not visible. As a workaround, change to light mode.

## 4.27.2

### Upgrades

- Compose v2.24.5
- Docker Scout CLI v1.4.1
- Docker Debug v0.0.24

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where the diagnostics ID would not print correctly when uploading diagnostics from the terminal.
- Fixed a bug where the default settings values were being reset to default on startup, when using Settings Management.
- Fixed a bug with the dashboard being shown at startup even though the **Open Docker Dashboard when Docker Desktop starts** option was disabled. Fixes docker/for-win#13887.
- Fixed a bug in the build backend service that caused Docker Desktop to crash. Fixes docker/for-win#13885, docker/for-win#13896, docker/for-win#13899, docker/for-mac#7164, docker/for-mac#7169.
- Fixed the Docker Engine socket permissions when mounted inside containers. Fixes docker/for-win#13898.
- Docker Scout:
  - Updated dependencies to address Leaky Vessels series of CVEs (CVE-2024-21626, CVE-2024-24557)
  - Added initial VEX document to document false positive CVE-2020-8911 and CVE-2020-8912
  - Added support for cosign SBOM attestations
  - Added support for VEX in-toto attestations
- Docker Debug:
  - Fixed a bug when pulling the image behind resource accesses management
  - Fixed connection issues

#### For Mac

- Re-added kernel modules needed by `Istio`. Fixes docker/for-mac#7148.
- Node now uses all the cores available under Rosetta.
- Fixed an issue with `php-fpm`. Fixes docker/for-mac#7037.

## 4.27.1

### Upgrades

- Docker Engine v25.0.2 which contains a fix for CVE-2024-24557, CVE-2024-23650, CVE-2024-23651, CVE-2024-23652 and CVE-2024-23653
- Containerd v1.6.28
- Runc v1.1.12 which contains a fix for CVE-2024-21626

### Bug fixes and enhancements

#### For Mac

- Fixed a bug that caused Docker Desktop to hang when applying an update.

## 4.27.0

### New

- Docker init now supports Java and is generally available to all users.
- Synchronized File Shares provides fast and flexible host-to-VM file sharing within Docker Desktop. Utilizing the technology behind Docker’s acquisition of Mutagen, this feature provides an alternative to virtual bind mounts that uses synchronized filesystem caches, improving performance for developers working with large codebases.
- Organization admins can now configure Docker socket mount permissions when ECI is enabled.
- Containerd Image Store support is now generally available to all users.
- Get a debug shell into any container or image with the new `docker debug` command (Beta).
- Organization admins, with a Docker Business subscription, can now configure a custom list of extensions with Private Extensions Marketplace enabled (Beta)

### Upgrades

- Amazon ECR Credential <example-value> v0.7.1
- Buildx v0.12.1
- Containerd v1.6.27
- Compose v2.24.3
- Docker Credential <example-value> v0.8.1
- Runc v1.1.11
- Docker Engine v25.0.0
- Kubernetes v1.29.1
- Docker Scout v1.3.0

### Bug fixes and enhancements

#### For all platforms

- The `docker scan` command has been removed. To continue learning about the vulnerabilities of your images, and many other features, use the `docker scout` command.
- Fixed a bug where automatic updates would not download when the **Always download updates** checkbox was selected.
- Fixed typo in the dashboard tooltip. Fixes docker/for-mac#7132
- Improved signal handling behavior (e.g. when pressing Ctrl-C in the terminal while running a `docker` command).
- Re-added kernel modules required by `minikube start --cni=cilium`.
- Fixed a bug that caused the installation screen to appear again when admin controls are enabled after sign in.
- Fixed a bug where Docker would not start if a shared folder is no longer present.
- Fixed the number of available CPUs displayed in the **Containers** section of the Dashboard.
- Re-added kernel modules for `btrfs`, `xfs`, `vfat`, `exfat`, `ntfs3`, `f2fs`, `squashfs`, `udf`, `9p` and `autofs`.
- Container usage charts have been moved to a vertical **Resource usage** side panel to allow for more space in the containers list. Accessing the usage charts remains the same via the **Show charts** button.
- Fixed a bug where selecting **Close Application** at sign-in was leaving behind a hung backend process.
- Fixed a bug which caused Docker Desktop to become unresponsive when analytics is disabled through Settings Management.
- Docker init:
  - Added support for containerizing a Java server
  - Various fixes on Windows
- Builder settings:
  - You can now refresh storage data for your builder at any point in time.
  - You can now delete the build history for a builder.
- Builds view:
  - An error message is now shown when a build record cannot be removed.
  - Fixed an issue where a cloud builder could not be created in rootless mode on macOS.
  - Inline cache and Git source are now properly handled in the **Build timing** section of the **Info** tab.
  - The Builder used and the author invoking the build is now displayed in past builds on the **History** tab.
  - Several improvements made to better link past builds on the **History** tab.
  - Several improvements to make the build name more accurate.
  - Fixed stuck builds in the **Active builds** list when a builder cannot be reached.
  - Fixed an issue preventing the build record from being deleted in some circumstances.
  - Fixed an issue where build names could be empty.
  - Fixed a general issue with the Builds view when Resource saver mode is enabled.

#### For Mac

- Enabled `Huge Pages` and fixed PHP segmentation fault with Rosetta. Fixes docker/for-mac#7117.
- Fixed `xvfb` under Rosetta. Fixes docker/for-mac#7122
- Fixed `ERR_WORKER_INVALID_EXEC_ARGV` error under Rosetta. docker/for-mac#6998.
- Fixed a bug where Docker Desktop could deadlock if `admin-settings.json` was syntactically invalid.

#### For Windows

- Fixed a bug that prevented UTF-16 strings from being encoded to UTF-8 for some locales. Fixes docker/for-win#13868.
- Fixed a bug where the credentials store configuration would reset on app restart with the WSL integration. Fixes docker/for-win#13529.
- Fixed an issue that prevented the correct WSL engine errors from propagating to the user.
- Fixed an issue that would cause Docker Desktop to hang when quitting from Windows Containers mode.

### Security

#### For Windows

- Mitigated several DLL side-loading vulnerabilities in the Docker Desktop installer on Windows, reported by Suman Kumar Chakraborty (@Hijack-Everything)

### Known issues

#### For all platforms

- When using Setting Management, the settings that are not set in the `admin-settings.json` will be reset to default when Docker Desktop starts.

#### For Mac

- Updating to 4.27.0 from the **Software updates** sometimes hangs. As a workaround, use the 4.27.0 installer from this page.

## 4.26.1

### Bug fixes and enhancements

#### For all platforms

- Updated feedback links inside Docker Desktop to ensure they continue to work correctly

#### For Windows

- Switch the CLI binaries to a version compatible with older versions of glibc, such as used in Ubuntu 20.04 fixes docker/for-win#13824

## 4.26.0

### New

- Administrators can now control access to beta and experimental features in the **Features in development** tab with Settings Management.
- Introduced four new version update states in the footer.
- `docker init` (Beta) now supports PHP with Apache + Composer.
- The **Builds** view is now GA. You can now inspect builds, troubleshoot errors, and optimize build speed.

### Upgrades

- Compose v2.23.3
- Docker Scout CLI v1.2.0.
- Buildx v0.12.0
- Wasm runtimes:
  - wasmtime, wasmedge and wasmer `v0.3.1`.
  - lunatic, slight, spin, and wws `v0.10.0`.
  - Wasmtime is now based on wasmtime `v14.0` and supports wasi preview-2 components
  - Wasmedge is now based on WasmEdge `v0.13.5`
  - Spin is now based on Spin `v2.0.1`
  - wws is now based on wws `v1.7.0`
- Docker Engine v24.0.7
- Containerd v1.6.25
- runc v1.1.10

### Bug fixes and enhancements

#### For all platforms

- You can now provide feedback from the commandline by using `docker feedback`.
- Improved the text and position of the startup options in the **General** settings tab.
- Redesigned the dashboard's header bar, added links to other Docker resources, improved display of account information.
- Fixed a bug  where enabling the containerd image store and Wasm simultaneously would not enable Wasm.
- containerd integration:
  - Fixed `docker push/pull` authentication not being sent to non-DockerHub registries in cases where `ServerAddress` is not provided.
  - Fixed `docker history` reporting wrong IDs and tags.
  - Fixed `docker tag` not preserving internal metadata.
  - Fixed `docker commit` when the daemon configured with `--userns-remap`.
  - Fixed `docker image list` to show real image creation date.
  - Added support for `-a` flag to `docker pull` (pull all remote repository tags).
  - Added support for `--group-add` flag to `docker run` (append extra groups).
  - Adjusted some errors reported by `docker push/pull`.
- Docker Init:
  - Improved cross-compilation in Dockerfiles for Golang and Rust.
  - Improved caching in Dockerfile for ASP.NET Core.
- Docker Desktop now gives more detailed information about pending updates in the dashboard footer.
- Fixed a bug in Enhanced Container Isolation mode where `docker run --init` was failing.
- Fixed a bug where a notification prompting the user to download a new version of Docker Desktop remained visible after the user started downloading the new version.
- Added a notification that indicates when Docker Desktop is installing a new version.
- Fixed a bug where the cursor changed to a pointer when the user hovered over a notification that has no call to action.

#### For Mac

- Fixed an issue where Rosetta would not work with PHP. Fixes docker/for-mac#6773  and docker/for-mac#7037.
- Fixed several issues related to Rosetta not working. Fixed [docker/for-mac#6973, [docker/for-mac#7009, [docker/for-mac#7068 and [docker/for-mac#7075
- Improved the performance of NodeJS under Rosetta.
- Fixed the **Unable to open /proc/self/exe** Rosetta errors.
- Fixed a bug were the setting **Start Docker Desktop when you sign in** would not work. Fixes docker/for-mac#7052.
- You can now enable the use of Kernel networking path for UDP through the UI. Fixes docker/for-mac#7008.
- Fixed a regression where the `uninstall` CLI tool was missing.
- Addressed an issue which caused Docker Desktop to become unresponsive when analytics were disabled with Settings Management.

#### For Windows

- Added support for WSL mirrored mode networking (requires WSL `v2.0.4` and up).
- Added missing signatures on DLL and VBS files.

### Known issues

#### For Windows

- Docker CLI doesn’t work when using WSL 2 integration on an older Linux distribution (for example, Ubuntu 20.04) which uses a `glibc` version older than `2.32`. This will be fixed in future releases. See docker/for-win#13824.

## 4.25.2

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where a blank UI would appear after submitting a response in the **Welcome Survey**.

#### For Windows

- Fixed a bug where Docker Desktop on WSL 2 would shut down dockerd unexpectedly when idle. Fixes docker/for-win#13789

## 4.25.1

### Bug fixes and enhancements

#### For all platforms

- Fixed a regression in 4.25 where Docker would not start if the swap file was corrupt. Corrupt swap files will be re-created on next boot.
- Fixed a bug when swap is disabled. Fixes docker/for-mac#7045, docker/for-mac#7044 and docker/for-win#13779.
- The `sysctl vm.max_map_count` is now set to 262144. See docker/for-mac#7047

#### For Windows

- Fixed an issue where **Switch to Windows Containers** would not appear on the tray menu for some users. See docker/for-win#13761.
- Fixed a bug where the WSL integration would not work for users using a shell other than `sh`. See docker/for-win#13764.
- Re-added `DockerCli.exe`.
