---
title: "Docker Desktop release notes (part 8 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 8 of 21)

## 4.63.0

### New

- Added SLSA v1 provenance support in the **Builds** view.

### Updates

- Kubernetes v1.34.3
- Linux kernel `v6.12.72`

### Bug fixes and minor changes

#### For all platforms

- Enhanced the proxy settings UI and added a separate proxy for containers.
- Fixed an issue where community registry MCP catalogs failed to load when a server's config object contained `"required": null`.
- Fixed an issue where `mcp-gateway` would hang when fetching secrets from the Secrets Engine while the Docker Desktop VM was in Resource Saver mode.
- Rebranded "Docker AI" references to "Gordon".

#### For Windows

- Improved startup time on Windows.

### Known issues

- The Windows MSI installer cannot update an existing Docker Desktop installation when the current version is between 4.56 and 4.65. As a workaround, uninstall the existing version before reinstalling the latest version. Note that uninstalling removes all associated data.

## 4.62.0

### New

- With Docker MCP Toolkit, you can now use profiles to organize your MCP servers into named collections. You can also create custom catalogs — curated collections of servers for your team or organization.

### Updates

- Linux kernel `v6.12.69`

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where background update checks did not respect the **Automatically check for updates** setting when disabled. Fixes docker/for-mac#3908.

#### For Mac

- Added support for vLLM Metal in Docker Model Runner.

#### For Linux

- Fixed a networking crash on QEMU 10.2.0 and later.

### Security

- Addressed CVE-2026-2664, out of bounds read in grpcfuse kernel module.
- Addressed CVE-2026-28400, runtime flag injection in Docker Model Runner.

### Known issues

- The Windows MSI installer cannot update an existing Docker Desktop installation when the current version is between 4.56 and 4.65. As a workaround, uninstall the existing version before reinstalling the latest version. Note that uninstalling removes all associated data.

## 4.61.0

### New

- You can now customize the left-hand navigation to show only the tabs that matter to you, and hide the ones that don’t.

### Updates

- Linux kernel `v6.12.68`
- Docker Engine v29.2.1
- Docker Sandbox `v0.12.0`

### Bug fixes and enhancements

#### For all platforms

- Docker Sandboxes:
   - Added automated image caching to prevent re-downloading images unnecessarily.
   - Added Shell mode for blank coding agent sandboxes.
   - Added support for OpenCode.
   - Added support for mounting multiple workspaces.
   - Added experimental Linux support (single user only, UID 1000).
   - Added support for running in WSL 2.
   - Sandboxes now start in the current working directory if no path is provided.

### Known issues

- The Windows MSI installer cannot update an existing Docker Desktop installation when the current version is between 4.56 and 4.65. As a workaround, uninstall the existing version before reinstalling the latest version. Note that uninstalling removes all associated data.

## 4.60.1

### Bug fixes and enhancements

#### For all platforms

- Fixed a rare issue that crashed the Docker Desktop Dashboard after sign-in.

## 4.60.0

### New

- Added a new `docker desktop diagnose` command to gather diagnostics.

### Bug fixes and enhancements

#### For all platforms

- Fixed `ping6 host.docker.internal`.
- Enabled landlock LSM.
- Docker Sandboxes improvements:
   - Improved agent system prompt with network access documentation
   - Fixed Gemini API key injection
   - Sandboxes now block `console.anthropic.com/claude.ai` in proxy default rules
   - Fix CLI help text for `run <agent> --help`
   - Improved terminal size handling

### Known issues

- The Windows MSI installer cannot update an existing Docker Desktop installation when the current version is between 4.56 and 4.65. As a workaround, uninstall the existing version before reinstalling the latest version. Note that uninstalling removes all associated data.

## 4.59.1

### Bug fixes and enhancements

#### For Mac

- Fixed an issue where CPU usage could spike at regular intervals. Fixes docker/for-mac#7839.

## 4.59.0

### Updates

- Linux kernel `v6.12.67`
- Docker Compose v5.0.2
- Docker Sandbox `v0.10.1`
- Docker Buildx v0.31.1

### Bug fixes and enhancements

#### For all platforms

- Added Neo4j as a known publisher to the Docker MCP Catalog.
- Fixed an issue where the **Models** tab would crash when displaying requests made via the Anthropic Messages API.

#### For Mac

- Fixed an issue where shared file permissions could be unintentionally modified when using DockerVMM. Fixes docker/for-mac#7830.

#### For Windows

- Fixed an issue where container secrets injection could fail with `docker-pass`.
- Temporarily disabled VHDX compaction for the WSL data disk to improve stability.

### Security

- Fixed a security issue in enhanced container isolation where Docker socket mount permissions could be bypassed when using the `--use-api-socket` flag.

## 4.58.1

### Bug fixes and enhancements

#### For Mac

- Fixed an issue where CPU usage could spike at regular intervals. Fixes docker/for-mac#7839.

## 4.58.0

### New

- A new version of Docker Sandboxes is now available on Docker Desktop. It provides a secure, isolated, microVM-based environment for running coding agents.

### Updates

- Linux kernel `v6.12.65`
- Credential helpers v0.9.5
- Docker Engine v29.1.5

### Bug fixes and enhancements

#### For all platforms

- Docker Model Runner now exposes an Anthropic-compatible API.
- Docker Desktop now supports UTF-8 BOM for `admin-settings.json` and `registry.json`.
- Fixed an issue where admin settings incorrectly changed user proxy settings after a restart.

> **Important:**
>
> Starting with Docker Desktop version 4.59, installing an update from the tray menu will proceed without opening the Docker Desktop Dashboard.

#### For Mac

- Fixed a bug where shared file permissions could be modified inadvertently while using DockerVMM on macOS. Fixes docker/for-mac#7830.

#### For Windows

- Fixed an issue where the installer failed because of special ACLs set on `ProgramData`.

### Security

- Updated Kubernetes images to address CVEs.
   - Kind:
      - `docker/desktop-containerd-registry-mirror:v0.0.3`
      - `docker/desktop-cloud-provider-kind:v0.5.0`
   - Kubeadm:
      - `docker/desktop-vpnkit-controller:v4.0`
      - `docker/desktop-storage-provisioner:v3.0`
- The `kind` dependency image `envoyproxy/envoy` was upgraded from v1.32.6 to v1.36.4. If you mirror `kind` images, ensure your mirrors are updated.

## 4.57.0

### Security

- Fixed CVE-2025-14740 where the Docker Desktop for Windows installer contained multiple incorrect permission assignment vulnerabilities in the handling of the `C:\ProgramData\DockerDesktop` directory.

### New

- Docker Desktop now has a new issue tracker for all platforms at https://github.com/docker/desktop-feedback. Relevant, actively discussed issues from the previous platform-specific trackers will be migrated.

### Updates

- Docker Compose v5.0.1

### Bug fixes and enhancements

#### For all platforms

- Improved alignment of the Ask Gordon streaming indicator so it stays in sync with content on large screens.
- Fixed a bug where `docker debug` failed on containers started with environment variables but no '='. For example, `docker run -e NONEXISTENT_ENV_VAR`.

## 4.56.0

### New

- Docker Desktop now includes Docker Compose v5 which introduces a new official Go SDK. This SDK provides a comprehensive API that lets you integrate Compose functionality directly into your applications, allowing you to load, validate, and manage multi-container environments without relying on the Compose CLI. For more information, see the Compose SDK docs.

### Updates

- containerd v2.2.1
- Docker Compose v5.0.0
- Docker Agent v1.18.6

### Bug fixes and enhancements

#### For all platforms

- Fixed a panic in filesharing tests when containers don't have an IP address immediately after starting.
- Added support for custom DNS entries in the LinuxKit VM with the `ExtraDNSEntries` configuration field.

#### For Windows

- Fixed a bug on Windows where removing the state directory would fail because log files were still open.
- Fixed installations from the Microsoft Store wrongly advertizing a new update.
- Fixed a crash when running `/sbin/ldconfig` in `ubuntu:22.04` ARM64 containers by upgrading QEMU from 8.1.5 to 10.0.4. This resolves a known issue reported in docker/for-win#15004.

  > **Note:**
  >
  > When running under ARM64 emulation, some `amd64` Go binaries built with older Go versions may still segfault. To avoid this, rebuild affected binaries using Go 1.25.4 or later. For details, see golang/go#69255 and the corresponding Go commit.

#### For Linux

- Fixed Kubernetes `hostPath` volume mounts failing on Linux hosts. Fixes docker/desktop-linux#12.

## 4.55.0

### Updates

- Docker Engine v29.1.3
- Docker Agent v1.15.1

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue that caused Docker Desktop to get stuck during startup.
- Improved the error message when the `daemon.json` is invalid.
- Fixed performance issues on every keystroke within a long Ask Gordon session.
- Fixed an issue that prevented Kubernetes in kubeadm mode from starting up when an organization has configured Registry Access Management to block Docker Hub.

> **Important:**
>
> Wasm workloads will be deprecated and removed in a future Docker Desktop release.

## 4.54.0

### New

- Added support for vLLM in Docker Model Runner on Windows with WSL2 and NVIDIA GPUs.

### Bug fixes and enhancements

#### For Mac

- Fixed a bug where `/dev/shm` did not have enough permission for containers to write into. Fixes docker/for-mac#7804.

### Upgrades

- Docker Buildx v0.30.1
- Docker Engine v29.1.2
- Runc v1.3.4
- Docker Model Runner CLI v1.0.2

### Security

- Added a security patch to address CVE-2025-13743 where Docker Desktop diagnostics bundles were found to include expired Hub PATs in log output due to error object serialization.

## 4.53.0

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where the Support Diagnostics tooling inadvertently captured expired Docker Hub authorization bearer tokens.

### Security

- Added security patches to address CVEs 2025-52565, 2025-52881, and 2025-31133 when using Enhanced Container Isolation.

## 4.52.0

### New

- Added new port binding settings to Docker Desktop. This can also be controlled by administrators via Settings Management using the `admin-settings.json` file.
- Added a new Docker Model Runner command. With `docker model purge` you can remove all your models.

### Upgrades

- Docker Engine v29.0.0
- Docker Model Runner v1.0.3
- Docker Model Runner CLI v1.0.0
- Docker MCP plugin `v0.28.0`

### Bug fixes and enhancements

#### For all platforms

- Docker MCP Toolkit improvements:
   - Amazon Q client support
   - OAuth DCR (Dynamic Client Registration) with Docker Engine
   - Create MCP profiles using the CLI
- Docker Model Runner improvements:
   - You can now skip the `/engines` prefix for Docker Model Runner's OpenAI API endpoint `curl http://localhost:12434/v1/models`.
   - You can now skip the `ai/` prefix for the models published on Docker Hub with `docker model pull`.
   - Downloads are now resumed when they get interrupted.

#### For Windows

- Fixed an issue with Kerberos/NTLM proxy sign in.

## 4.51.0

### New

- You can now set up your Kubernetes resources from the **Kubernetes** view. This new view also provides a real-time display of your pods, services, and deployments.

### Upgrades

- Docker Engine v28.5.2
- Linux kernel `v6.12.54`

### Bug fixes and enhancements

#### For all platforms

- Kind now only pulls required dependency images if they are not available locally.

## 4.50.0

### New

- Dynamic MCP(Experimental) is now available in Docker Desktop .
- Introduced a new Welcome Survey to improve onboarding. New users can now provide information to help tailor their Docker Desktop experience.

### Upgrades

- Docker Compose v2.40.3
- NVIDIA Container Toolkit v1.18.0

### Bug fixes and enhancements

#### For all platforms

- Docker Desktop now detects and attempts to avoid clashes between the "Docker subnet" and physical networks using RFC1918 addresses. For example if the host has a non-default route which overlaps with `192.168.65.0/24` then an alternative network will be chosen automatically. You can still override the choice as before via Docker Desktop settings and admin settings.
- Docker Desktop no longer treats Stargz Snapshotter failures as fatal. If a failure occurs, Docker Desktop continues to run without the Stargz Snapshotter.
- Ask Gordon no longer displays images with user provided URLs.
- Ask Gordon now asks for confirmation before running all built-in and all user added MCP tools.

## 4.49.0

> **Important:**
>
> Support for Windows 10 21H2 (19044) and 11 22H2 (22621) has ended. Installing Docker Desktop will require Windows 10 22H2 (19045) or Windows 11 23H2 (22631) in the next release.

### Security

- Fixed CVE-2025-9164 where the Docker Desktop for Windows installer was vulnerable to DLL hijacking due to insecure DLL search order. The installer searches for required DLLs in the user's Downloads folder before checking system directories, allowing local privilege escalation through malicious DLL placement.

### New

- Docker Agent is now available through Docker Desktop.
- Docker Debug is now free for all users.

### Upgrades

- Docker Engine v28.5.1
- Docker Compose v2.40.2
- NVIDIA Container Toolkit v1.17.9
- Docker Debug `v0.0.45`

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where Docker Desktop used an expired proxy password while waiting for the user to enter a new one.
- Fixed a 'chown' error shown on startup with Docker Debug.
- Fixed a bug that caused some forwarded UDP ports to hang.

#### For Mac

- Fixed Kubernetes startup hanging when another Kubernetes context was active. Fixes https://github.com/docker/for-mac/issues/7771.
- If a Rosetta install is cancelled or fails, Rosetta will be disabled in Docker Desktop.
- Minimum OS version to install or update Docker Desktop on macOS is now macOS Sonoma (version 14) or later.
