---
title: "Docker Desktop for Mac Edge release notes (part 2 of 8)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-mac.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Mac Edge release notes (part 2 of 8)

## Docker Desktop Community 2.2.3.0

2020-04-02

### Upgrades

- Docker 19.03.8
- Docker Compose 1.26.0-rc3
- Linux 4.19.76

### New

- Docker Desktop introduces a new onboarding tutorial upon first startup. The Quick Start tutorial guides users to get started with Docker in a few easy steps. It includes a simple exercise to build an example Docker image, run it as a container, push and save the image to Docker Hub.

### Bug fixes and minor changes

> Docker Desktop Edge 2.2.3.0 fixes 7 issues reported on the docker/for-mac GitHub repository.

- Reduced the size of the Docker Desktop installer from 710 MB to 445 MB.
- Removed dangling `/usr/local/bin/docker-machine` symlinks which avoids custom installs of `docker-machine` being accidentally deleted in future upgrades. Note that if you have installed Docker Machine manually, then the install might have followed the symlink and installed Docker Machine in `/Applications/Docker.app`. In this case, you must manually reinstall Docker Machine after installing this version of Docker Desktop. Fixes docker/for-mac#4208.
- Fixed a bug where the Docker UI could be started without the engine.
- Switched from `ahci-hd` to `virtio-blk` to avoid an AHCI deadlock, see moby/hyperkit#94 and docker/for-mac#1835.
- Capturing diagnostics is now faster and easier.
- Fixed an issue where a container port could not be exposed on a specific host IP. See docker/for-mac#4209.
- Kubernetes: Persistent volumes created by claims are now stored in the virtual machine. Fixes docker/for-win#5665.
- Removed port probing from dashboard, just unconditionally showing links to ports that should be available. Fixes docker/for-mac#4264.

### Known issues

- Loopback and unspecified IPv6 addresses (`::` and `::1`) within a container do not currently work. Some web servers and other programs may be using these addresses in their configuration files.

## Docker Desktop Community 2.2.2.0

2020-03-02

This release contains a Kubernetes upgrade. Note that your local Kubernetes cluster will be reset after installing Docker Desktop.

### Upgrades

- Kubernetes 1.16.5
- Go 1.13.8

### Bug fixes and minor changes

- Docker Desktop now shares `/var/folders` by default as it stores per-user temporary files and caches.
- Ceph support has been removed from Docker Desktop to save disk space.

## Docker Desktop Community 2.2.1.0

2020-02-12

### Upgrades

- Docker Compose 1.25.4
- Go 1.12.16

## Docker Desktop Community 2.1.7.0

2019-12-11

> **Note:**
>
> Docker Desktop Edge 2.1.7.0 is the release candidate for the upcoming major Stable release. Please help us test this version before the wider release and report any issues in the docker/for-mac GitHub repository.

### Upgrades

- Docker Compose 1.25.1-rc1

### Bug fixes and minor changes

- The Docker Desktop Dashboard now displays port information inline with the container status.
- Fixed an issue that caused the 'back' button on the Dashboard UI to behave inconsistently when repeatedly switching between the container details and the Settings window.
- Various minor improvements to the Dashboard UI.
- Fixed an issue that occurs when sharing overlapping directories.
- Fixed a bug that prevented users from changing the location of the VM disk image.
- Docker Desktop does not inject `inotify` events on directories anymore as these can cause mount points to disappear inside containers. Fixes docker/for-mac#3976.
- Fixed an issue that caused Docker Desktop to fail on startup when there is an incomplete Kubernetes config file.
- Fixed an issue where attempts to log into Docker through Docker Desktop could sometimes fail with the `Incorrect authentication credentials` error. Fixes docker/for-mac#4010.

## Docker Desktop Community 2.1.6.0

2019-11-18

### Upgrades

- Docker 19.03.5
- Go 1.12.13

### New

Added the ability to start and stop Compose-based applications and view combined logs in the Docker Desktop **Dashboard** UI.

### Bug fixes and minor changes

- Fixed port forwarding when containers are using `overlay` networks.
- Fixed a container start error when a container has more than one port with an arbitrary or not-yet-configured external port number. For example, `docker run -p 80 -p 443 nginx`. Fixes docker/for-win#4935 and docker/compose#6998.

## Docker Desktop Community 2.1.5.0

2019-11-04

This release contains a Kubernetes upgrade. Note that your local Kubernetes cluster will be reset after installation.

### Upgrades

- Kubernetes 1.15.5
- Docker Compose 1.25.0-rc4
- Linux kernel 4.19.76

### New

**Docker Desktop Dashboard:** The new Docker Desktop **Dashboard** provides a user-friendly interface which enables you to interact with containers and applications, and manage the lifecycle of your applications directly from the UI. In addition, it allows you to access the logs, view container details, and monitor resource utilization to explore the container behavior.

To access the new Dashboard UI, select the Docker menu from the Mac menu bar and then click **Dashboard**.

### Bug fixes and minor changes

Fixed an issue that caused VMs running on older hardware with macOS Catalina to fail on startup with the error `processor does not support desired secondary processor-based controls`.

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
- Fixed a bug in the UEFI boot menu that sometimes caused Docker Desktop to hang during restart. Fixes docker/for-mac#2655 and docker/for-mac#3921.
- Docker Desktop now allows users to access the host’s SSH agent inside containers. Fixes docker/for-mac#410
- Docker Machine is no longer included in the Docker Desktop installer. You can download it separately from the Docker Machine releases page.

## Docker Desktop Community 2.1.3.0

2019-09-16

### Bug fixes and minor changes

- All binaries included in Docker Desktop are now notarized so that they can run on macOS Catalina. For more information, see Notarization Requirement for Mac Software.
- Fixed an issue which caused higher CPU utilization when closing Docker Desktop windows.
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
- Hyperkit v0.20190802

#### Bug fixes and minor changes

- Docker Desktop now allows users to expose privileged UDP ports. docker/for-mac#3775
- Added missing fish completions for Docker Compose. docker/for-mac#3795
- Fixed an issue where running some Docker commands can fail if you are not using Credential Helpers. docker/for-mac#3785
- Fixed a bug that did not allow users to copy and paste text in the **Preferences** > **Daemon** window. docker/for-mac#3798

## Docker Desktop Community 2.1.0.0

2019-07-26

This release contains Kubernetes security improvements. Note that your local Kubernetes PKI and cluster will be reset after installation.

#### Upgrades

- Docker 19.03.1
- Docker Compose 1.24.1
- Alpine 3.10
- Linux Kernel 4.9.184
- Docker Credential <example-value> 0.6.3

#### New

- Introduced a new user interface for the Docker Desktop **Preferences** menu.
- The **Restart**, **Reset**, and **Uninstall** options are now available on the **Troubleshoot** menu.

#### Bug fixes and minor changes

- Changed the host's Kubernetes context to ensure `docker run -v .kube:kube ... kubectl` works.
- Restricted cluster-admin role on local Kubernetes cluster to `kube-system` namespace.
- Fixed Kubernetes installation with VPNkit subnet.
- Reduced the VM startup time. swap is not created every time a virtual machine boots.
- Fixed a bug where the process output was not redirected to stdout when gathering diagnostics on Windows, which sometimes resulted in a crash.
- Added `/etc/machine-id` to the virtual machine. Fixes docker/for-mac#3554.

## Docker Community Edition 2.0.5.0 2019-06-12

This is the Edge channel, which gives you early access to our newest features. Be aware that some of them may be experimental, and some of them may not ever reach the Stable release.

This release contains a Kubernetes upgrade. Note that your local Kubernetes cluster will be reset after install.

- Upgrades
  - Docker 19.03.0-rc2
  - Kubernetes 1.14.3
  - Compose on Kubernetes 0.4.23
  - linuxkit v0.7
  - Qemu 4.0.0 for cross compiling for ARM

- New
  - Docker Desktop includes the `buildx` plugin (currently experimental).
  - Selecting the `Experimental features` checkbox on the Docker Desktop Preferences Daemon page enables experimental features in the Docker daemon and the Docker CLI.
  - Docker Desktop has improved the reliability of `com.docker.osxfs trace` performance profiling command.
  - Users can now run the `com.docker.osxfs trace --summary` option to get a high-level summary of operations, instead of receiving a trace of all operations.
  - Docker Desktop now supports large lists of DNS resource records on Mac. Fixes docker/for-mac#2160

- Bug fixes and minor changes
  - Docker Desktop does not send DNS queries for `docker-desktop.<domain>` every 10s. It now relies on the host's DNS domain search order rather than trying to replicate it inside the VM.
  - Docker Desktop has removed the ability to log in using email address as a username as the Docker command line does not support this.
  - Docker Desktop now allows running a Docker registry inside a container. Fixes docker/for-mac#3611
  - Fixed a stability issue with the DNS resolver.

## Docker Community Edition 2.0.4.1 2019-05-07

- Bug fixes and minor changes
  - Upgrade QEMU from 2.8.0 to 3.1.0 to fix an emulation issue when building and running Java applications on Arm64 devices.

## Docker Community Edition 2.0.4.0 2019-04-30

- Upgrades
  - Docker 19.03.0-beta3
  - Docker Compose 1.24.0
  - Compose on Kubernetes 0.4.22
  - Kubernetes 1.14.1

- New
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
    - Concurrent building of Compose files
    - High-level build constructs with `bake`

- Bug fixes and minor changes
  - Truncate UDP DNS responses which are over 512 bytes in size

## Docker Community Edition 2.0.3.0 2019-03-05

- Upgrades
  - Docker 18.09.3

- Bug fixes and minor changes
  - Fixed port 8080 that was used on localhost when starting Kubernetes. Fixes docker/for-mac#3522
  - Error message improvements, do not propose to run diagnostics / reset to factory default when not appropriate.

### Docker Community Edition 2.0.2.1 2019-02-15

- Upgrades
  - Docker 18.09.2, fixes CVE-2019-5736

## Docker Community Edition 2.0.2.0 2019-02-06

- Upgrades
  - Docker Compose 1.24.0-rc1
  - Docker Machine 0.16.1
  - Compose on Kubernetes 0.4.18

- New
  - Rebranded UI

- Bug fixes and minor changes
  - Kubernetes: use default maximum number of pods for kubelet. docker/for-mac#3453
  - Fix DockerHelper crash. docker/for-mac#3470
  - Fix binding of privileged ports with specified IP. docker/for-mac#3464

## Docker Community Edition 2.0.1.0 2019-01-11

- Upgrades
  - Docker 18.09.1
  - Kubernetes 1.13.0
  - Kitematic 0.17.6
  - Golang 1.10.6, fixes CVEs: CVE-2018-16875, CVE-2018-16873 and CVE-2018-16874

  WARNING: If you have an existing Kubernetes cluster created with Docker Desktop, this upgrade will reset the cluster. If you need to back up your Kubernetes cluster or persistent volumes you can use Ark.

- Bug fixes and minor changes
  - Fix service log collection in diagnostics
  - Gather /etc/hosts to help diagnostics
  - Ensure localhost resolves to 127.0.0.1. Related to docker/for-mac#2990, docker/for-mac#3383
  - Add 18.09 missing daemon options
  - Rename Docker for Mac to Docker Desktop
  - Partially open services ports if possible. docker/for-mac#3438
