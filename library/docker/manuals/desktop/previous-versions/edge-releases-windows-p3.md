---
title: "Docker Desktop for Windows Edge Release notes (part 3 of 9)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-windows.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Windows Edge Release notes (part 3 of 9)

## Docker Desktop Community 2.1.5.0
2019-11-04

This release contains a Kubernetes upgrade. Note that your local Kubernetes cluster will be reset after installation.

### Upgrades

- Kubernetes 1.15.5
- Docker Compose 1.25.0-rc4
- Linux kernel 4.19.76

### New

- **Docker Desktop Dashboard:** The new Docker Desktop **Dashboard** provides a user-friendly interface which enables you to interact with containers and applications, and manage the lifecycle of your applications directly from the UI. In addition, it allows you to access the logs, view container details, and monitor resource utilization to explore the container behavior.

  To access the Dashboard UI, select the Docker menu from the system tray and then click **Dashboard**.

- **WSL 2 backend:** The new Docker Desktop WSL 2 backend replaces the Docker Desktop WSL 2 Tech Preview. The WSL 2 backend architecture introduces support for Kubernetes, provides an updated Docker daemon, offers VPN-friendly networking, and additional features. For more information, see Docker Desktop WSL 2 backend.

- **New file sharing implementation:** Docker Desktop introduces a new file sharing implementation which uses gRPC, FUSE, and Hypervisor sockets instead of Samba, CIFS, and Hyper-V networking. The new implementation  offers improved I/O performance. Additionally, when using the new file system:

  - Users don't have to expose the Samba port, and therefore do not experience issues related to IT firewall or the drive-sharing policy.
  - There is no need to provide user credentials to Docker Desktop. File access rights are automatically enforced when accessing mounted folders through containers.

  > To switch back to the Samba file system:
  >
  > From the Docker menu, select **Settings** > **Command line**, and then clear the **Enable experimental features** check box. Alternatively, install a Docker Desktop Stable release.

### Known issues

- When you start a Docker Compose application and then start a Docker App which has the same name as the Compose application, Docker Desktop displays only one application on the Dashboard. However, when you expand the application, containers that belong to both applications are displayed on the Dashboard.

- When you deploy a Docker App with multiple containers on Kubernetes, Docker Desktop displays each Pod as an application on the Dashboard.

## Docker Desktop Community 2.1.4.0
2019-10-15

### Upgrades

- Docker 19.03.3
- Kubernetes 1.15.4
- Go 1.12.10 for CVE-2019-16276
- Kitematic 0.17.9

### Bug fixes and minor changes

- Improved the navigation in **Settings** and **Troubleshoot** UI.
- Fixed a bug that prevented users from accessing WSL 2 Tech Preview. Fixes docker/for-win#4734.
- Docker Machine is no longer included in the Docker Desktop installer. You can download it separately from the Docker Machine releases page.

## Docker Desktop Community 2.1.3.0
2019-09-16

### Bug fixes and minor changes

- Added a loading overlay to the **Settings** and **Troubleshoot** windows to prevent editing conflicts.
- Deactivated the **Reset Kubernetes** button when Kubernetes is not activated.

## Docker Desktop Community 2.1.2.0
2019-09-09

#### Upgrades

- Docker 19.03.2
- Kubernetes 1.14.6
- Go 1.12.9
- Qemu 4.0.1
- Docker Machine 0.16.2
- Kitematic 0.17.8

#### Bug fixes and minor changes

- Reduced the Virtual Machine (VM) startup time.
- Added support for `Expect: 100-continue` headers in the Docker API proxy. Some HTTP clients such as `curl` send this header when the payload is large, for example, when creating containers. Fixes moby/moby#39693.

## Docker Desktop Community 2.1.1.0
2019-08-12

#### Upgrades

- Linux Kernel 4.14.131

#### New

- Docker Desktop WSL 2 Tech Preview

#### Bug fixes and minor changes

- Fixed a PowerShell script signing issue that caused `AuthorizationManager check failed` errors on machines with strict group policies on PowerShell script signing. docker/for-win#4376
- Fixed an issue where attempts to upgrade Docker Desktop to version 2.1.0.0 sometimes failed with the error value cannot be null. docker/for-win#3375, docker/for-win#4381, docker/for-win#4343, docker/for-win#4359
- Fixed an issue to ensure Docker Desktop Community installer does not prompt for UAC when UAC is disabled.
- Improved the error messages displayed during VM lifecycle operations. docker/for-win#4348
- Docker Desktop now supports a configurable user timeout for VMs on slower machines. docker/for-win#4393
- Enabled Windows features such as Hyper-V and Containers during installation, thereby reducing the need for another restart after installation.

## Docker Desktop Community 2.1.0.0
2019-07-30

This release contains Kubernetes security improvements. Note that your local Kubernetes PKI and cluster will be reset after installation.

#### Upgrades

 - Docker 19.03.1
 - Docker Compose 1.24.1
 - Alpine 3.10
 - Linux Kernel 4.9.184
 - Docker Credential Helpers 0.6.3

#### New

 - Introduced a new user interface for the Docker Desktop **Settings** menu.
 - The **Restart** and **Reset** options are now available on the **Troubleshoot** menu.

#### Bug fixes and minor changes

 - Changed the host's kubernetes context to ensure `docker run -v .kube:kube ... kubectl` works.
 - Restricted the `cluster-admin` role on local Kubernetes cluster to `kube-system` namespace.
 - Fixed Kubernetes installation with VPNkit subnet.
 - Fixed an issue where Docker Desktop restarts when a user logs out of Windows and logs back in, which results in retaining the
   exported ports on containers.
 - Reduced the VM startup time. `swap` is not created every time a virtual machine boots.
 - Fixed a bug which caused Docker Desktop to crash when a user cancels switching the version using Windows User Account Control (UAC)    settings.
 - Fixed a bug where the process output was not redirected to stdout when gathering diagnostics on Windows, which sometimes resulted in    a crash.

## Docker Community Edition 2.0.5.0 2019-06-12

This is the Edge channel, which gives you early access to our newest features. Be aware that some of them may be experimental, and some of them may not ever reach the Stable release.

This release contains a Kubernetes upgrade. Note that your local Kubernetes cluster will be reset after installation.

* Upgrades
  - Docker 19.03.0-rc2
  - Kubernetes 1.14.3
  - Compose on Kubernetes 0.4.23
  - linuxkit v0.7
  - Qemu 4.0.0 for cross compiling for ARM

* New
  - Docker Desktop includes the `buildx` plugin (currently experimental).
  - Selecting the `Experimental features` checkbox on the Docker Desktop settings Daemon page enables experimental features in the Docker daemon and the Docker CLI.
  - Docker Desktop now checks for stored credentials at startup before attempting to mount any shared drives. This prompts users to reenter the credentials if they are invalid.

* Bug fixes and minor changes
  - Fixed race condition where Kubernetes sometimes fails to start after the app is restarted.
  - The system tray icon now opens the Docker Desktop menu with left or right mouse button.
  - When displaying the crash report window, Docker Desktop does not send a bugsnag crash report unless the user needs the report to upload diagnostics.
  - Docker Desktop has removed the ability to log in using email address as a username as the Docker command line does not support this.
  - For Linux containers on Windows (LCOW), at least one physical computer running Windows 10 Professional or Windows 10 Enterprise version 1809 or later is required.
  - The `Send usage statistics` checkbox is selected by default in Docker Desktop for Windows (Community). This option cannot be modified.
  - Docker Desktop has added a new dialog box during startup which allows users to retry mounting a shared drive or remove it from the shared drives list after a failed attempt.

* Known issues
  - Windows containers networking does not work properly on Windows 1903.

## Docker Community Edition 2.0.4.1 2019-05-07

* Bug fixes and minor changes
  - Upgrade QEMU from 2.8.0 to 3.1.0 to fix an emulation issue when building and running Java applications on Arm64 devices.

## Docker Community Edition 2.0.4.0 2019-04-30

* Upgrades
  - Docker 19.03.0-beta3
  - Docker Compose 1.24.0
  - Compose on Kubernetes 0.4.22
  - Kubernetes 1.14.1

* New

  - App: Docker CLI plugin to configure, share, and install applications

    - Extend Compose files with metadata and parameters
    - Reuse the same application across multiple environments (Development/QA/Staging/Production)
    - Multi-orchestrator installation (Swarm or Kubernetes)
    - Push/Pull/Promotion/Signing supported for application, with the same workflow as images
    - Fully CNAB compliant
    - Full support for Docker Contexts

  - Buildx (Tech Preview): Docker CLI plugin for extended build capabilities with BuildKit

    - Familiar UI from docker build
    - Full BuildKit capabilities with container driver
    - Multiple builder instance support
    - Multi-node builds for cross-platform images (out-of-the-box support for linux/arm/v7 and linux/arm64)
    - Concurrent building of compose files
    - High-level build constructs with `bake`

* Bug fixes and minor changes

  - Fix `Delete` of persistent volume claims
  - Truncate UDP DNS responses which are over 512 bytes in size

## Docker Community Edition 2.0.3.0 2019-03-05

* Upgrades
  - Docker 18.09.3

* Bug fixes and minor changes
  - Fixed docker not added to PATH after install in some cases
  - Fixed port 8080 that was used on localhost when starting Kubernetes.
  - Fixed "create issue" link in diagnostics windows.

## Docker Community Edition 2.0.2.1 2019-02-15

* Upgrades
  - Docker 18.09.2, fixes CVE-2019-5736

## Docker Community Edition 2.0.2.0 2019-02-06

* Upgrades
  - Docker Compose 1.24.0-rc1
  - Docker Machine 0.16.1
  - Compose on Kubernetes 0.4.18

* New
  - Rebranded UI

* Bug fixes and minor changes
  - Kubernetes: use default maximum number of pods for kubelet. docker/for-mac#3453

## Docker Community Edition 2.0.1.0 2019-01-11

* Upgrades
  - Docker 18.09.1
  - Kubernetes 1.13.0
  - Kitematic 0.17.6
  - Golang 1.10.6, fixes CVEs: CVE-2018-16875, CVE-2018-16873 and CVE-2018-16874

  WARNING: If you have an existing Kubernetes cluster created with Docker Desktop, this upgrade will reset the cluster. If you need to back up your Kubernetes cluster or persistent volumes you can use Ark.

* Bug fixes and minor changes
  - Fix service log collection in diagnostics
  - Gather /etc/hosts to help diagnostics
  - Add 18.09 missing daemon options
  - Rename Docker for Windows to Docker Desktop
  - Partially open services ports if possibles
  - Quit will not check if service is running anymore
  - Fix UI lock when changing kubernetes state
