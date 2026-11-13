---
title: "Docker Desktop release notes (part 12 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 12 of 21)

## 4.34.4

### Bug fixes and enhancements

#### For Mac

- Prevents a bug that caused Docker Desktop to not update `com.docker.vmnetd` or `com.docker.socket` to newer versions.

### Known issues

#### For Mac

- If you’re seeing a security popup about malware on `com.docker.vmnetd` or `com.docker.socket`, follow the steps documented in docker/for-mac#7527.

## 4.34.3

### Upgrades

- NVIDIA Container Toolkit v1.16.2

### Security

- Fixed CVE-2024-9348 which allows RCE via image build details source information
- Fixed NVIDIA Container Toolkit CVE-2024-0132
- Fixed NVIDIA Container Toolkit CVE-2024-0133

## 4.34.2

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where `docker compose up` would become unresponsive while in Resource Saver mode.

### Security

- Fixed CVE-2024-8695 which allows RCE via crafted extension description/changelog which could be abused by a malicious extension.
- Fixed CVE-2024-8696 which allows RCE via crafted extension publisher-url/additional-urls which could be abused by a malicious extension.

## 4.34.1

### Bug fixes and enhancements

#### For Windows

- Fixed a bug where Docker Desktop failed to start (often on first boot) incorrectly believing another instance of the application is running. (docker/for-win#14294 and docker/for-win#14034).

## 4.34.0

### New

- Host networking support on Docker Desktop is now generally available.
- If you authenticate via the CLI, you can now authenticate through a browser-based flow, removing the need for manual PAT generation.
- Windows now supports automatic reclamation of disk space in Docker Desktop for WSL2 installations using a managed virtual hard disk.
- Deploying Docker Desktop via the MSI installer is now generally available.
- Two new methods to enforce sign-in (windows registry key and `.plist` file) are now generally available.
- Fresh installations of Docker Desktop now use the containerd image store by default.
- Compose Bridge (Experimental) is now available from the Compose file viewer. Easily convert and deploy your Compose project to a Kubernetes cluster.

### Upgrades

- Docker Engine v27.2.0
- Docker Compose v2.29.2
- containerd v1.7.20
- Docker Scout CLI v1.13.0
- Docker Buildx v0.16.2
- Linux kernel `v6.10.1`

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug that caused the CLI to become idle when a container was started with AutoRemove (`--rm`) but whose port bindings would be rejected by Docker Desktop at start-up.
- Fixed a bug where diagnostics collection would fail sporadically on the **Support** screen.
- Fixed a bug where folders wouldn't expand in a container's **File** tab. Fixes docker/for-win#14204.
- In-app updates now respect the proxy settings.
- Extended the ECI Docker socket mount permissions feature to optionally child images derived from allowed images. This allows ECI to work with buildpacks (e.g., Paketo) that create ephemeral local images that use Docker socket mounts.
- Fixed a bug that caused the **Containers** view to flash when using certain proxy settings. Fixes docker/for-win#13972.
- Improved the output of `docker image list` to show multi-platform-related image information.

#### For Mac

- Fixed a bug where a `Partial repair error` would occasionally appear when triggering the Configuration integrity check feature.
- Configuration integrity check feature now shows information on why the Docker socket is mis-configured.
- Fixed an issue where the Configuration integrity check feature would report the system path instead of the user path if Docker Desktop is installed as `User`.
- Fixed a bug where applications trying to read extended attributes from bind mounted volumes could experience failures. Fixes docker/for-mac#7377.

#### For Windows

- Fixed a bug where Docker Desktop would reset docker's `credsStore` to `desktop` when the user's intention is to keep it empty. Fixes docker/for-win#9843.
- Fixed a bug that would cause Docker Desktop to not start in the WSL2 engine  docker/for-win#14034.
- Fixed a bug that caused WSL distribution to terminate abruptly. Fixes docker/for-win/14230.
- Fixed an issue that caused WSL to update in each startup. Fixes docker/for-win/13868, docker/for-win/13806.

### Known issues

- Compose Bridge does not work automatically when you enable it within the **Experimental** settings tab.  It takes a few minutes before you are notified that you must 'repair' Docker Desktop which then installs the `compose-bridge` binary.
- The **Convert and Deploy** button in the Compose file viewer  might be disabled even when Kubernetes is running and Compose Bridge is enabled. The workaround for this is to disable Compose Bridge in the **Experimental** settings tab, apply the change with **Apply & restart**, then re-enable and select **Apply & restart** again.
- There is a known issue when authenticating against a registry in the Docker CLI (`docker login [registry address]`) where, if the provided registry address includes a repository/image name (such as `docker login index.docker.io/docker/welcome-to-docker`), the repository part (`docker/welcome-to-docker`) is not normalized and results in credentials being stored incorrectly, which causes subsequent pulls from the registry (`docker pull index.docker.io/docker/welcome-to-docker`) to not be authenticated. To prevent this, don't include any extraneous suffix in the registry address when running `docker login`.
  > **Note:**
  > Using `docker login` with an address that includes URL path segments is not a documented use case and is considered unsupported. The recommended usage is to specify only a registry hostname, and optionally a port, as the address for `docker login`.
- When running `docker compose up` and Docker Desktop is in the Resource Saver mode, the command is unresponsive. As a workaround, manually exit the Resource Saving mode and Docker Compose becomes responsive again.
- When Enhanced Container Isolation (ECI) is enabled, Docker Desktop may not enter Resource Saver mode. This will be fixed in a future Docker Desktop release.
- The new ECI Docker socket mount permissions for derived images feature does not yet work when Docker Desktop is configured with the  **Use containerd for pulling and storing images**. This will be fixed in the next Docker Desktop release.

## 4.33.2

### Bug fixes and enhancements

#### For Mac

- Prevents a bug that caused Docker Desktop to not update `com.docker.vmnetd` or `com.docker.socket` to newer versions.

### Known issues

#### For Mac

- If you’re seeing a security popup about malware on `com.docker.vmnetd` or `com.docker.socket`, follow the steps documented in docker/for-mac#7527.

## 4.33.1

### Bug fixes and enhancements

#### For Windows

- Added support for WSL2 2.3.11 and above, which includes loadable kernel modules. Fixes docker/for-win#14222

## 4.33.0

### New

- Docker Debug is now generally available.
- BuildKit now evaluates Dockerfile rules to inform you of potential issues.
- **Resource Allocation** settings can now be accessed directly from the resource usage data displayed in the Dashboard footer.
- New and improved experience for troubleshooting.

### Upgrades

- Docker Compose v2.29.1
- Docker Engine v27.1.1
- containerd v1.7.19
- NVIDIA Container Toolkit v1.16.0
- Docker Scout CLI v1.11.0
- Kubernetes v1.30.2
- Linux kernel `v6.10`

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue that caused containers started with `--net=host` and listening on an IPv6 address to be accessible from the host.
- Improved the UX for enabling the containerd image store in the **Settings** tab.
- Fixed an issue that caused a deadlock seen while using the `grpcfuse` filesharing option under heavy load.
- Fixed a bug where Mac-specific admin settings were impacting other platforms.
- IPv6 address blocks can now be specified in Docker Engine's `default-address-pools`.
- Fixed an issue with the validation of the Docker Engine's `bip`, `fixed-cidr` and `fixed-cidr-v6`. Fixes  docker/for-mac#7104.
- Docker Engine's `default-network-opts` parameter is now properly validated.
- VirtioFS performance improvements include increasing directory cache timeout, handling change notifications from the host, removing extra FUSE operations for security.capability attributes, optimizing host event detection, and providing an API to clean caches after container termination.
- Docker Desktop now notifies when there is a port conflict in a host networking container.
- Compose Bridge command line option is now available via Experimental features. When enabled, run `compose-bridge` to convert your Compose configuration to Kubernetes resources.
- Builds view:
  - Added build checks to the build details' **Source** tab.
  - Added build tags to the build details' **Info** tab under the **Source details** section.
  - Newly imported builds are now highlighted.
  - Improved performance of error message handling.
  - Fixed a connection issue to the builder which prevented build records from displaying.
  - Fixed the navigation when opening builds through the CLI.

#### For Mac

- The Configuration integrity check feature now provides more context around what has changed with your Docker Desktop configuration. For more information, see the FAQs.
- The Configuration integrity check feature shows an error when it fails to repair Docker Desktop.
- Fixed a bug where the IPv6 TCP was set to `host.docker.internal`. Fixes docker/for-mac#7332.
- Fixed an issue where the `docker-compose` symlink pointed to an empty location. Fixes docker/for-mac#7345.

#### For Linux

- Fixed an issue where some `wincred` values were persisted after uninstall. Reported by Javier Yong @Javiery3889.
- Fixed an issue where the notification **Another application changed your Desktop configurations** is incorrectly triggered.

### Security

#### For all platforms

- Includes a fix for AuthZ Plugin Bypass Regression in Docker Engine. For more information, see CVE-2024-41110.

#### For Windows

- Fixed an issue where some `wincred` values were persisted after uninstall. Reported by Javier Yong @Javiery3889.

### Known Issues

#### For Windows

- Docker Desktop fails to start with WSL pre-releases `v2.3.11.0` and `v2.3.12.0`, which is included in Windows 11 Insider. To fix this ensure WSL `v2.2.4.0` is installed.
For more information, see microsoft/WSL#11794. This affects Docker Desktop 4.33.0 and earlier.

## 4.32.1

### Bug fixes and enhancements

#### For Mac

- Prevents a bug that caused Docker Desktop to not update `com.docker.vmnetd` or `com.docker.socket` to newer versions.

### Known issues

#### For Mac

- If you’re seeing a security popup about malware on `com.docker.vmnetd` or `com.docker.socket`, follow the steps documented in docker/for-mac#7527.

## 4.32.0

### New

- Docker Engine and CLI updated to version 27.0.
- Docker Desktop now supports moving data to a different drive on macOS and Windows with WSL2 backend. See docker/for-win#13384.
- You can now schedule backups for volume exports in the **Volumes** tab (Beta).
- Access a terminal shell directly from Docker Desktop (Beta).

### Upgrades

- Docker Buildx v0.15.1
- Docker Compose v2.28.1
- Docker Scout CLI v1.10.0
- Docker Engine v27.0.3
- Docker Init v1.3.0

### Bug fixes and enhancements

#### For all platforms

- Improved instructions for `watch` in the Compose File Viewer
- Added support for Golang projects that don't have dependencies in Docker Init. Addresses docker/roadmap#611
- Settings Management now lets admins set the default value to `ProxyEnableKerberosNTLM`.
- Removed a temporary compatibility fix for older versions of Visual Studio Code.
- Builds view:
  - Changed icon for imported build record to a "files" icon.
  - Improved the error message when trying to connect to an already connected Docker Build Cloud builder.
  - Fixed an issue where build records would disappear unexpectedly.
  - Fixed an issue that prevented users from being able to re-open an imported build.
  - Fixed an issue where build details were not displayed when a build's state had changed from running to completed.
  - Fixed malformed build source link in build details.
  - Fixed missing build stats for named contexts.
  - Fixed image index/manifest not being displayed anymore in build results.
  - Fixed an issue where build traces exported from the UI would appear as a single, flattened list when imported to Jaeger
  - Fixed truncated digest/sha in build details.
  - Fixed final status animation of active builds.

#### For Windows

- Fixed an issue on the WSL 2 engine where Docker Desktop would not detect the existence of the `docker-desktop-data` distribution if it had been manually moved by the user.
- The Windows on ARM installer and the privileged service are now built for ARM64.

#### For Mac

- Re-added `CONFIG_DM_CRYPT` kernel module.
- Re-added `CONFIG_PSI` kernel module.
- Re-added `CONFIG_GTP` kernel module.
- Re-added `CONFIG_NFT_BRIDGE_META` kernel module.
- Fixed a regression where the **Another application changed your Desktop configuration** warning message appeared whenever `/var/run/docker.socket` was pointing to an unexpected path.
- Changed the Configuration Check menu entry and banner to a notification.
- Improved the performance of read and write operations on bind mounts.
- Fixed fatal errors with some `AMD64` Java images. Fixes docker/for-mac/7286 and docker/for-mac/7006.
- Fixed an issue that caused Docker Desktop to remove `Docker.app` when installing from `/Applications`.
- Fixed an issue that caused bind mounts to fail. Fixes docker/for-mac#7274.

### Known issues

#### For all platforms

- The **Manage Synchronized File Shares with Compose** setting is automatically enabled for all users who opt into **Access experimental features**. This converts all bind mounts into synchronized file shares. To disable this behavior, deselect **Access experimental features**. Then, manually delete any file shares by going to the **File sharing** tab within **Resources**, navigating to the **Synchronized file shares** section, selecting the file shares you want to remove, and selecting **Delete**.

#### For Mac

- When running `docker-compose` after an update, it will return `command not found`. As a workaround, you can create the following symlink: `sudo ln -sf /Applications/Docker.app/Contents/Resources/cli-plugins/docker-compose /usr/local/bin/docker-compose`

## 4.31.1

### Bug fixes and enhancements

#### For Windows

- Fixed a bug where containers, images and volumes created before the update were potentially invisible for users. Fixes docker/for-win#14118.
