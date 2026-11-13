---
title: "Docker Desktop release notes (part 16 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 16 of 21)

## 4.21.0

### New

- Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.
- Added Rust server support to Docker init.
- Beta release of the **Builds** view that lets you inspect builds and manage builders. This can be found in the **Features in Development** tab in **Settings**.

### Upgrades

- Buildx v0.11.0
- Compose v2.19.0
- Kubernetes v1.27.2
- cri-tools v1.27.0
- cri-dockerd v0.3.2
- coredns v1.10.1
- cni v1.2.0
- etcd v3.5.7

### Bug fixes and enhancements

#### For all platforms

- Docker Desktop now automatically pauses the Docker Engine when it is not in use and wakes up again on demand.
- VirtioFS is now the default file sharing implementation for new installations of Docker Desktop on macOS 12.5 and higher.
- Improved product usage reporting using OpenTelemetry (experimental).
- Fixed Docker socket permissions. Fixes docker/for-win#13447 and docker/for-mac#6823.
- Fixed an issue which caused Docker Desktop to hang when quitting the application whilst paused.
- Fixed a bug which caused the **Logs** and **Terminal** tab content in the **Container** view to be covered by a fixed toolbar docker/for-mac#6814.
- Fixed a bug which caused input labels to overlap with input values on the container run dialog. Fixes docker/for-win#13304.
- Fixed a bug which meant users couldn't select the Docker Extension menu. Fixes docker/for-mac#6840 and docker/for-mac#6855

#### For Mac

- Added a health check for macOS that notifies users if there has been a change on their system which might cause problems running Docker binaries.

#### For Windows

- Fixed a bug on WSL 2 where if Desktop is paused, killed, and then restarted, the startup hangs unless WSL is shut down first with `wsl --shutdown`.
- Fixed the WSL engine in cases where wsl.exe is not on the PATH docker/for-win#13547.
- Fixed the WSL engine's ability to detect cases where one of the Docker Desktop distributions' drive is missing docker/for-win#13554.
- A slow or unresponsive WSL integration no longer prevents Docker Desktop from starting. Fixes docker/for-win#13549.
- Fixed a bug that caused Docker Desktop to crash on startup docker/for-win#6890.
- Added the following installer flags:
  - `--hyper-v-default-data-root` which specifies the default location for Hyper-V VM disk.
  - `--windows-containers-default-data-root` which specifies the default data root for Windows Containers.
  - `--wsl-default-data-root` which specifies the default location for WSL distribution disks.

## 4.20.1

### Bug fixes and enhancements

#### For all platforms

- containerd image store: Fixed a bug that caused `docker load` to fail when loading an image that contains attestations.
- containerd image store: Fixed the default image exporter during build.

#### For Windows

- Fixed a bug that made it difficult to parse the WSL version on the host in non-western locales. Fixes docker/for-win#13518 and docker/for-win#13524.

## 4.20.0

### Upgrades

- Buildx v0.10.5
- Compose v2.18.1
- Docker Engine v24.0.2
- Containerd v1.6.21
- runc v1.1.7

### Bug fixes and enhancements

#### For all platforms

- Docker Scout CLI now finds the most recently built image if it is not provided as an argument.
- Improved the Docker Scout CLI `compare` command.
- Added a warning about the retirement of Docker Compose ECS/ACS integrations in November 2023. Can be suppressed with `COMPOSE_CLOUD_EOL_SILENT=1`.
- Fixed an HTTP proxy bug where an HTTP 1.0 client could receive an HTTP 1.1 response.
- Enabled Docker Desktop's Enhanced Container Isolation (ECI) feature on WSL-2. This is available with a Docker Business subscription.
- Fixed a bug on the **Containers** table where previously hidden columns were displayed again after a fresh installation of Docker Desktop.

#### For Mac

- You can now reclaim disk space more quickly when files are deleted in containers. Related to docker/for-mac#371.
- Fixed a bug that prevented containers accessing 169.254.0.0/16 IPs. Fixes docker/for-mac#6825.
- Fixed a bug in `com.docker.diagnose check` where it would complain about a missing vpnkit even when vpnkit is not expected to be running. Related to docker/for-mac#6825.

#### For Windows

- Fixed a bug that meant WSL data could not be moved to a different disk. Fixes docker/for-win#13269.
- Fixed a bug where Docker Desktop was not stopping its WSL distributions (docker-desktop and docker-desktop-data) when it was shutdown, consuming host memory unnecessarily.
- Added a new setting that allows the Windows Docker daemon to use Docker Desktop's internal proxy when running Windows containers. See Windows proxy settings.

#### For Linux

- Fixed an issue with the Docker Compose V1/V2 compatibility setting.

## 4.19.0

### New

- Docker Engine and CLI updated to Moby 23.0.
- The **Learning Center** now supports in-product walkthroughs.
- Docker init (Beta) now supports Node.js and Python.
- Faster networking between VM and host on macOS.
- You can now inspect and analyze remote images from Docker Desktop without pulling them.
- Usability and performance improvements to the **Artifactory images** view.

### Removed

- Removed `docker scan` command. To continue learning about the vulnerabilities of your images, and many other features, use the new `docker scout` command. Run `docker scout --help`, or read the docs to learn more.

### Upgrades

- Docker Engine v23.0.5
- Compose 2.17.3
- Containerd v1.6.20
- Kubernetes v1.25.9
- runc v1.1.5
- Go v1.20.3

### Bug fixes and enhancements

#### For all platforms

- Improved `docker scout compare` command to compare two images, now also aliased under `docker scout diff`.
- Added more details to dashboard errors when a `docker-compose` action fails (docker/for-win#13378).
- Added support for setting HTTP proxy configuration during installation. This can be done via the `--proxy-http-mode`, `--overrider-proxy-http`, `--override-proxy-https` and `--override-proxy-exclude` installer flags in the case of installation from the CLI on Mac and Windows, or alternatively by setting the values in the `install-settings.json` file.
- Docker Desktop now stops overriding .docker/config.json `credsStore` keys on application start. Note that if you use a custom credential helper then the CLI `docker login` and `docker logout` does not affect whether the UI is signed in to Docker or not. In general, it is better to sign into Docker via the UI since the UI supports multi-factor authentication.
- Added a warning about the forthcoming removal of Compose V1 from Docker Desktop. Can be suppressed with `COMPOSE_V1_EOL_SILENT=1`.
- In the Compose config, boolean fields in YAML should be either `true` or `false`. Deprecated YAML 1.1 values such as “on” or “no” now produce a warning.
- Improved UI for image table, allowing rows to use more available space.
- Fixed various bugs in port-forwarding.
- Fixed a HTTP proxy bug where an HTTP request without a Server Name Indication record would be rejected with an error.

#### For Windows

- Reverted to fully patching etc/hosts on Windows (includes `host.docker.internal` and `gateway.docker.internal` again). For WSL, this behavior is controlled by a new setting in the **General** tab. Fixes docker/for-win#13388 and docker/for-win#13398.
- Fixed a spurious `courgette.log` file appearing on the Desktop when updating Docker Desktop. Fixes docker/for-win#12468.
- Fixed the "zoom in" shortcut (ctrl+=). Fixes docker/for-win#13392.
- Fixed a bug where the tray menu would not correctly update after second container type switch. Fixes docker/for-win#13379.

#### For Mac

- Increased the performance of VM networking when using the Virtualization framework on macOS Ventura and above. Docker Desktop for Mac now uses gVisor instead of VPNKit. To continue using VPNKit, add `"networkType":"vpnkit"` to your `settings.json` file located at `~/Library/Group Containers/group.com.docker/settings.json`.
- Fixed a bug where an error window is displayed on uninstall.
- Fixed a bug where the setting `deprecatedCgroupv1` was ignored. Fixes docker/for-mac#6801.
- Fixed cases where `docker pull` would return `EOF`.

#### For Linux

- Fixed a bug where the VM networking crashes after 24h. Fixes docker/desktop-linux#131.

### Security

#### For all platforms

- Fixed a security issue allowing users to bypass Image Access Management (IAM) restrictions configured by their organisation by avoiding `registry.json` enforced login via deleting the `credsStore` key from their Docker CLI configuration file. Only affects Docker Business customers.
- Fixed CVE-2023-24532.
- Fixed CVE-2023-25809.
- Fixed CVE-2023-27561.
- Fixed CVE-2023-28642.
- Fixed CVE-2023-28840.
- Fixed CVE-2023-28841.
- Fixed CVE-2023-28842.

## 4.18.0

### New

- Initial beta release of `docker init` as per the roadmap.
- Added a new **Learning Center** tab to help users get started with Docker.
- Added an experimental file-watch command to Docker Compose that automatically updates your running Compose services as you edit and save your code.

### Upgrades

- Buildx v0.10.4
- Compose 2.17.2
- Containerd v1.6.18, which includes fixes for CVE-2023-25153 and CVE-2023-25173.
- Docker Engine v20.10.24, which contains fixes for CVE-2023-28841,
  CVE-2023-28840, and
  CVE-2023-28842.

### Bug fixes and enhancements

#### For all platforms

- Docker Scout CLI can now compare two images and display packages and vulnerabilities differences. This command is in Early Access and might change in the future.
- Docker Scout CLI now displays base image update and remediation recommendations using `docker scout recommendations`. It also displays a short overview of an image using `docker scout quickview` commands.
- You can now search for extensions direct from the Marketplace, as well as using **Global Search**.
- Fixed a bug where `docker buildx` container builders would lose access to the network after 24hrs.
- Reduced how often users are prompted for feedback on Docker Desktop.
- Removed minimum VM swap size.
- Added support for subdomain match, CIDR match, `.` and `_.` in HTTP proxy exclude lists.
- Fixed a bug in the transparent TLS proxy when the Server Name Indication field is not set.
- Fixed a grammatical error in Docker Desktop engine status message.

### For Windows

- Fixed a bug where `docker run --gpus=all` hangs. Fixes docker/for-win#13324.
- Fixed a bug where Registry Access Management policy updates were not downloaded.
- Docker Desktop now allows Windows containers to work when BitLocker is enabled on `C:`.
- Docker Desktop with the WSL backend no longer requires the `com.docker.service` privileged service to run permanently. For more information see Permission requirements for Windows.

### For Mac

- Fixed a performance issue where attributes stored on the host would not be cached for VirtioFS users.
- The first time Docker Desktop for Mac is launched, the user is presented with an installation window to confirm or adjust the configuration that requires privileged access. For more information see Permission requirements for Mac.
- Added the **Advanced** tab in **Settings**, where users can adjust the settings which require privileged access.

### For Linux

- Fixed a bug where the VM networking crashes after 24h. docker/for-linux#131

### Security

#### For all platforms

- Fixed CVE-2023-1802 where a security issue with the Artifactory Integration would cause it to fall back to sending registry credentials over plain HTTP if HTTPS check failed. Only users who have `Access experimental features` enabled are affected. Fixes docker/for-win#13344.

#### For Mac

- Removed the `com.apple.security.cs.allow-dyld-environment-variables` and `com.apple.security.cs.disable-library-validation` entitlements which allow an arbitrary dynamic library to be loaded with Docker Desktop via the `DYLD_INSERT_LIBRARIES` environment variable.

### Known Issues

- Uninstalling Docker Desktop on Mac from the **Troubleshoot** page might trigger an unexpected fatal error popup.

## 4.17.1

### Bug fixes and enhancements

#### For Windows

- Docker Desktop now allows Windows containers to work when BitLocker is enabled on C:
- Fixed a bug where `docker buildx` container builders would lose access to the network after 24hrs.
- Fixed a bug where Registry Access Management policy updates were not downloaded.
- Improved debug information to better characterise failures under WSL 2.

### Known Issues

- Running containers with `--gpus` on Windows with the WSL 2 backend does not work. This will be fixed in future releases. See docker/for-win/13324.
