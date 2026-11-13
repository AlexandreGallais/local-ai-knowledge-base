---
title: "Docker Desktop release notes (part 20 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 20 of 21)

## 4.7.0

### New

- IT Administrators can now install Docker Desktop remotely using the command line.
- Add the Docker Software Bill of Materials (SBOM) CLI plugin. The new CLI plugin enables users to generate SBOMs for Docker images.
- Use cri-dockerd for new Kubernetes clusters instead of `dockershim`. The change is transparent from the user's point of view and Kubernetes containers run on the Docker Engine as before. `cri-dockerd` allows Kubernetes to manage Docker containers using the standard Container Runtime Interface, the same interface used to control other container runtimes. For more information, see The Future of Dockershim is cri-dockerd.

### Updates

- Docker Engine v20.10.14
- Compose v2.4.1
- Buildx 0.8.2
- containerd v1.5.11
- Go 1.18

### Security

- Update Docker Engine to v20.10.14 to address CVE-2022-24769
- Update containerd to v1.5.11 to address CVE-2022-24769

### Bug fixes and enhancements

#### For all platforms

- Fixed a bug where the Registry Access Management policy was never refreshed after a failure.
- Logs and terminals in the UI now respect your OS theme in light and dark mode.
- Easily clean up many volumes at once via multi-select checkboxes.
- Improved login feedback.

#### For Mac

- Fixed an issue that sometimes caused Docker Desktop to display a blank white screen. Fixes docker/for-mac#6134.
- Fixed a problem where gettimeofday() performance drops after waking from sleep when using Hyperkit. Fixes docker/for-mac#3455.
- Fixed an issue that caused Docker Desktop to become unresponsive during startup when `osxfs` is used for file sharing.

#### For Windows

- Fixed volume title. Fixes docker/for-win#12616.
- Fixed a bug in the WSL 2 integration that caused Docker commands to stop working after restarting Docker Desktop or after switching to Windows containers.

## 4.6.1

### Updates

- Buildx 0.8.1

### Bug fixes and enhancements

- Prevented spinning in vpnkit-forwarder filling the logs with error messages.
- Fixed diagnostics upload when there is no HTTP proxy set. Fixes docker/for-mac#6234.
- Removed a false positive "vm is not running" error from self-diagnose. Fixes docker/for-mac#6233.

## 4.6.0

### New

#### For all platforms

- The Docker Desktop Dashboard Volume Management feature now offers the ability to efficiently clean up volumes using multi-select checkboxes.

#### For Mac

- Docker Desktop 4.6.0 gives macOS users the option of enabling a new experimental file sharing technology called VirtioFS. During testing VirtioFS has been shown to drastically reduce the time taken to sync changes between the host and VM, leading to substantial performance improvements. For more information, see VirtioFS.

### Updates

#### For all platforms

- Docker Engine v20.10.13
- Compose v2.3.3
- Buildx 0.8.0
- containerd v1.4.13
- runc v1.0.3
- Go 1.17.8
- Linux kernel 5.10.104

### Security

#### For all platforms

- Fixed CVE-2022-0847, aka “Dirty Pipe”, an issue that could enable attackers to modify files in container images on the host, from inside a container.
  If using the WSL 2 backend, you must update WSL 2 by running `wsl --update`.

#### For Windows

- Fixed CVE-2022-26659, which could allow an attacker to overwrite any administrator writable file on the system during the installation or the update of Docker Desktop.

#### For Mac

- Qemu 6.2.0

### Bug fixes and enhancements

#### For all platforms

- Fixed uploading diagnostics when an HTTPS proxy is set.
- Made checking for updates from the systray menu open the Software updates settings section.

#### For Mac

- Fixed the systray menu not displaying all menu items after starting Docker Desktop. Fixes docker/for-mac#6192.
- Fixed a regression about Docker Desktop not starting in background anymore. Fixes docker/for-mac#6167.
- Fixed missing Docker Desktop Dock icon. Fixes docker/for-mac#6173.
- Used speed up block device access when using the experimental `virtualization.framework`. See benchmarks.
- Increased default VM memory allocation to half of physical memory (min 2 GB, max 8 GB) for better out-of-the-box performances.

#### For Windows

- Fixed the UI stuck in `starting` state forever although Docker Desktop is working fine from the command line.
- Fixed missing Docker Desktop systray icon docker/for-win#12573
- Fixed Registry Access Management under WSL 2 with latest 5.10.60.1 kernel.
- Fixed a UI crash when selecting the containers of a Compose application started from a WSL 2 environment. Fixes docker/for-win#12567.
- Fixed copying text from terminal in Quick Start Guide. Fixes docker/for-win#12444.

### Known issues

#### For Mac

- After enabling VirtioFS, containers with processes running with different Unix user IDs may experience caching issues. For example if a process running as `root` queries a file and another process running as user `nginx` tries to access the same file immediately, the `nginx` process will get a "Permission Denied" error.

## 4.5.1

### Bug fixes and enhancements

#### For Windows

- Fixed an issue that caused new installations to default to the Hyper-V backend instead of WSL 2.
- Fixed a crash in the Docker Desktop Dashboard which would make the systray menu disappear.

If you are running Docker Desktop on Windows Home, installing 4.5.1 will switch it back to WSL 2 automatically. If you are running another version of Windows, and you want Docker Desktop to use the WSL 2 backend, you must manually switch by enabling the **Use the WSL 2 based engine** option in the **Settings > General** section.
Alternatively, you can edit the Docker Desktop settings file located at `%APPDATA%\Docker\settings.json` and manually switch the value of the `wslEngineEnabled` field to `true`.

## 4.5.0

### New

- Docker Desktop 4.5.0 introduces a new version of the Docker menu which creates a consistent user experience across all operating systems. For more information, see the blog post New Docker Menu & Improved Release Highlights with Docker Desktop 4.5
- The 'docker version' output now displays the version of Docker Desktop installed on the machine.

### Updates

- Amazon ECR Credential <example-value> v0.6.0

### Security

#### For Mac

- Fixed CVE-2021-44719 where Docker Desktop could be used to access any user file on the host from a container, bypassing the allowed list of shared folders.

#### For Windows

- Fixed CVE-2022-23774 where Docker Desktop allows attackers to move arbitrary files.

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where Docker Desktop incorrectly prompted users to sign in after they quit Docker Desktop and start the application.
- Increased the filesystem watch (inotify) limits by setting `fs.inotify.max_user_watches=1048576` and `fs.inotify.max_user_instances=8192` in Linux. Fixes docker/for-mac#6071.

#### For Mac

- Fixed an issue that caused the VM to become unresponsive during startup when using `osxfs` and when no host directories are shared with the VM.
- Fixed an issue that didn't allow users to stop a Docker Compose application using Docker Desktop Dashboard if the application was started in a different version of Docker Compose. For example, if the user started a Docker Compose application in V1 and then switched to Docker Compose V2, attempts to stop the Docker Compose application would fail.
- Fixed an issue where Docker Desktop incorrectly prompted users to sign in after they quit Docker Desktop and start the application.
- Fixed an issue where the **About Docker Desktop** window wasn't working anymore.
- Limit the number of CPUs to 8 on Mac M1 to fix the startup problem. Fixes docker/for-mac#6063.

#### For Windows

- Fixed an issue related to compose app started with version 2, but the dashboard only deals with version 1

### Known issues

#### For Windows

Installing Docker Desktop 4.5.0 from scratch has a bug which defaults Docker Desktop to use the Hyper-V backend instead of WSL 2. This means, Windows Home users will not be able to start Docker Desktop as WSL 2 is the only supported backend. To work around this issue, you must uninstall 4.5.0 from your machine and then download and install Docker Desktop 4.5.1 or a higher version. Alternatively, you can edit the Docker Desktop settings.json file located at `%APPDATA%\Docker\settings.json` and manually switch the value of the `wslEngineEnabled` field to `true`.

## 4.4.4

### Bug fixes and enhancements

#### For Windows

- Fixed logging in from WSL 2. Fixes docker/for-win#12500.

### Known issues

#### For Windows

- Clicking **Proceed to Desktop** after signing in through the browser, sometimes does not bring the Dashboard to the front.
- After logging in, when the Dashboard receives focus, it sometimes stays in the foreground even when clicking a background window. As a workaround you need to click the Dashboard before clicking another application window.
- The tips of the week show on top of the mandatory login dialog when an organization restriction is enabled via a `registry.json` file.

## 4.4.3

### Bug fixes and enhancements

#### For Windows

- Disabled Dashboard shortcuts to prevent capturing them even when minimized or un-focussed. Fixes docker/for-win#12495.

### Known issues

#### For Windows

- Clicking **Proceed to Desktop** after signing in through the browser, sometimes does not bring the Dashboard to the front.
- After logging in, when the Dashboard receives focus, it sometimes stays in the foreground even when clicking a background window. As a workaround you need to click the Dashboard before clicking another application window.
- The tips of the week show on top of the mandatory login dialog when an organization restriction is enabled via a `registry.json` file.

## 4.4.2

### New

- Easy, Secure sign in with Auth0 and Single Sign-on
  - Single Sign-on: Users with a Docker Business subscription can now configure SSO to authenticate using their identity providers (IdPs) to access Docker. For more information, see Single Sign-on.
  - Signing in to Docker Desktop now takes you through the browser so that you get all the benefits of auto-filling from password managers.

### Upgrades

- Docker Engine v20.10.12
- Compose v2.2.3
- Kubernetes 1.22.5
- docker scan v0.16.0

### Security

- Fixed CVE-2021-45449 that affects users currently on Docker Desktop version 4.3.0 or 4.3.1.

Docker Desktop version 4.3.0 and 4.3.1 has a bug that may log sensitive information (access token or password) on the user's machine during login.
This only affects users if they are on Docker Desktop 4.3.0, 4.3.1 and the user has logged in while on 4.3.0, 4.3.1. Gaining access to this data would require having access to the user’s local files.

### Bug fixes and enhancements

#### For all platforms

- Docker Desktop displays an error if `registry.json` contains more than one organization in the `allowedOrgs` field. If you are using multiple organizations for different groups of developers, you must provision a separate `registry.json` file for each group.
- Fixed a regression in Compose that reverted the container name separator from `-` to `_`. Fixes docker/compose-switch.

#### For Mac

- Fixed the memory statistics for containers in the Dashboard. Fixes docker/for-mac/#4774.
- Added a deprecated option to `settings.json`: `"deprecatedCgroupv1": true`, which switches the Linux environment back to cgroups v1. If your software requires cgroups v1, you should update it to be compatible with cgroups v2. Although cgroups v1 should continue to work, it is likely that some future features will depend on cgroups v2. It is also possible that some Linux kernel bugs will only be fixed with cgroups v2.
- Fixed an issue where putting the machine to Sleep mode after pausing Docker Desktop results in Docker Desktop not being able to resume from pause after the machine comes out of Sleep mode. Fixes for-mac#6058.

#### For Windows

- Doing a `Reset to factory defaults` no longer shuts down Docker Desktop.

### Known issues

#### For all platforms

- The tips of the week show on top of the mandatory login dialog when an organization restriction is enabled via a `registry.json` file.

#### For Windows

- Clicking **Proceed to Desktop** after logging in in the browser, sometimes does not bring the Dashboard to the front.
- After logging in, when the Dashboard receives focus, it sometimes stays in the foreground even when clicking a background window. As a workaround you need to click the Dashboard before clicking another application window.
- When the Dashboard is open, even if it does not have focus or is minimized, it will still catch keyboard shortcuts (e.g. ctrl-r for Restart)

## 4.3.2

### Security

- Fixed CVE-2021-45449 that affects users currently on Docker Desktop version 4.3.0 or 4.3.1.

Docker Desktop version 4.3.0 and 4.3.1 has a bug that may log sensitive information (access token or password) on the user's machine during login.
This only affects users if they are on Docker Desktop 4.3.0, 4.3.1 and the user has logged in while on 4.3.0, 4.3.1. Gaining access to this data would require having access to the user’s local files.

### Upgrades

docker scan v0.14.0

### Security

**Log4j 2 CVE-2021-44228**: We have updated the `docker scan` CLI plugin.
This new version of `docker scan` is able to detect Log4j 2
CVE-2021-44228 and Log4j 2
CVE-2021-45046

For more information, read the blog post Apache Log4j 2
CVE-2021-44228.

## 4.3.1

### Upgrades

docker scan v0.11.0

### Security

**Log4j 2 CVE-2021-44228**: We have updated the `docker scan` CLI plugin for you.
Older versions of `docker scan` in Docker Desktop 4.3.0 and earlier versions are
not able to detect Log4j 2
CVE-2021-44228.

For more information, read the
blog post Apache Log4j 2
CVE-2021-44228.
