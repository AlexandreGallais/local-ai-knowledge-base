---
title: "Docker Desktop release notes (part 19 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 19 of 21)

## 4.11.0

### New

- Docker Desktop is now fully supported for Docker Business customers inside VMware ESXi and Azure VMs. For more information, see Run Docker Desktop inside a VM or VDI environment
- Added two new extensions (vcluster and PGAdmin4) to the Extensions Marketplace.
- The ability to sort extensions has been added to the Extensions Marketplace.
- Fixed a bug that caused some users to be asked for feedback too frequently. You'll now only be asked for feedback twice a year.
- Added custom theme settings for Docker Desktop. This allows you to specify dark or light mode for Docker Desktop independent of your device settings. Fixes docker/for-win#12747
- Added a new flag for Windows installer. `--no-windows-containers` disables the Windows containers integration.
- Added a new flag for Mac install command. `--user <username>` sets up Docker Desktop for a specific user, preventing them from needing an admin password on first run.

### Updates

- Docker Compose v2.7.0
- Docker Compose "Cloud Integrations" v1.0.28
- Kubernetes v1.24.2
- Go 1.18.4

### Bug fixes and enhancements

#### For all platforms

- Added the Container / Compose icon as well as the exposed port(s) / exit code to the Containers screen.
- Updated the Docker theme palette colour values to match our design system.
- Improved an error message from `docker login` if Registry Access Management is blocking the Docker engine's access to Docker Hub.
- Increased throughput between the Host and Docker. For example increasing performance of `docker cp`.
- Collecting diagnostics takes less time to complete.
- Selecting or deselecting a compose app on the containers overview now selects/deselects all its containers.
- Tag names on the container overview image column are visible.
- Added search decorations to the terminal's scrollbar so that matches outside the viewport are visible.
- Fixed an issue with search which doesn't work well on containers page docker/for-win#12828.
- Fixed an issue which caused infinite loading on the **Volume** screen docker/for-win#12789.
- Fixed a problem in the Container UI where resizing or hiding columns didn't work. Fixes docker/for-mac#6391.
- Fixed a bug where the state of installing, updating, or uninstalling multiple extensions at once was lost when leaving the Marketplace screen.
- Fixed an issue where the compose version in the about page would only get updated from v2 to v1 after restarting Docker Desktop.
- Fixed an issue where users cannot see the log view because their underlying hardware didn't support WebGL2 rendering. Fixes docker/for-win#12825.
- Fixed a bug where the UI for Containers and Images got out of sync.
- Fixed a startup race when the experimental virtualization framework is enabled.

#### For Mac

- Fixed an issue executing Compose commands from the UI. Fixes docker/for-mac#6400.

#### For Windows

- Fixed horizontal resizing issue. Fixes docker/for-win#12816.
- If an HTTP/HTTPS proxy is configured in the UI, then it automatically sends traffic from image builds and running containers to the proxy. This avoids the need to separately configure environment variables in each container or build.
- Added the `--backend=windows` installer option to set Windows containers as the default backend.

#### For Linux

- Fixed bug related to setting up file shares with spaces in their path.

## 4.10.1

### Bug fixes and enhancements

#### For Windows

- Fixed a bug where actions in the UI failed with Compose apps that were created from WSL. Fixes docker/for-win#12806.

#### For Mac

- Fixed a bug where the install command failed because paths were not initialized. Fixes docker/for-mac#6384.

## 4.10.0

### New

- You can now add environment variables before running an image in Docker Desktop.
- Added features to make it easier to work with a container's logs, such as regular expression search and the ability to clear container logs while the container is still running.
- Implemented feedback on the containers table. Added ports and separated container and image names.
- Added two new extensions, Ddosify and Lacework, to the Extensions Marketplace.

### Removed

- Removed Homepage while working on a new design. You can provide feedback here.

### Updates

- Docker Engine v20.10.17
- Docker Compose v2.6.1
- Kubernetes v1.24.1
- cri-dockerd to v0.2.1
- CNI plugins to v1.1.1
- containerd to v1.6.6
- runc to v1.1.2
- Go 1.18.3

### Bug fixes and enhancements

#### For all platforms

- Added additional bulk actions for starting/pausing/stopping selected containers in the **Containers** tab.
- Added pause and restart actions for compose projects in the **Containers** tab.
- Added icons and exposed ports or exit code information in the **Containers** tab.
- External URLs can now refer to extension details in the Extension Marketplace using links such as `docker-desktop://extensions/marketplace?extensionId=docker/logs-explorer-extension`.
- The expanded or collapsed state of the Compose apps is now persisted.
- `docker extension` CLI commands are available with Docker Desktop by default.
- Increased the size of the screenshots displayed in the Extension marketplace.
- Fixed a bug where a Docker extension fails to load if its backend container(s) are stopped. Fixes docker/extensions-sdk#16.
- Fixed a bug where the image search field is cleared without a reason. Fixes docker/for-win#12738.
- Fixed a bug where the license agreement does not display and silently blocks Docker Desktop startup.
- Fixed the displayed image and tag for unpublished extensions to actually display the ones from the installed unpublished extension.
- Fixed the duplicate footer on the Support screen.
- Dev Environments can be created from a subdirectory in a GitHub repository.
- Removed the error message if the tips of the day cannot be loaded when using Docker Desktop offline. Fixes docker/for-mac#6366.

#### For Mac

- Fixed a bug with location of bash completion files on macOS. Fixes docker/for-mac#6343.
- Fixed a bug where Docker Desktop does not start if the username is longer than 25 characters. Fixes docker/for-mac#6122.
- Fixed a bug where Docker Desktop was not starting due to invalid system proxy configuration. Fixes some issues reported in docker/for-mac#6289.
- Fixed a bug where Docker Desktop failed to start when the experimental virtualization framework is enabled.
- Fixed a bug where the tray icon still displayed after uninstalling Docker Desktop.

#### For Windows

- Fixed a bug which caused high CPU usage on Hyper-V. Fixes docker/for-win#12780.
- Fixed a bug where Docker Desktop for Windows would fail to start. Fixes docker/for-win#12784.
- Fixed the `--backend=wsl-2` installer flag which did not set the backend to WSL 2. Fixes docker/for-win#12746.

#### For Linux

- Fixed a bug when settings cannot be applied more than once.
- Fixed Compose version displayed in the `About` screen.

### Known Issues

- Occasionally the Docker engine will restart during a `docker system prune`. This is a known issue in the version of buildkit used in the current engine and will be fixed in future releases.

## 4.9.1

### Bug fixes and enhancements

#### For all platforms

- Fixed blank dashboard screen. Fixes docker/for-win#12759.

## 4.9.0

### New

- Added additional guides on the homepage for: Elasticsearch, MariaDB, Memcached, MySQL, RabbitMQ and Ubuntu.
- Added a footer to the Docker Desktop Dashboard with general information about the Docker Desktop update status and Docker Engine statistics
- Re-designed the containers table, adding:
  - A button to copy a container ID to the clipboard
  - A pause button for each container
  - Column resizing for the containers table
  - Persistence of sorting and resizing for the containers table
  - Bulk deletion for the containers table

### Updates

- Compose v2.6.0
- Docker Engine v20.10.16
- containerd v1.6.4
- runc v1.1.1
- Go 1.18.2

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue which caused Docker Desktop to hang if you quit the app whilst Docker Desktop was paused.
- Fixed the Kubernetes cluster not resetting properly after the PKI expires.
- Fixed an issue where the Extensions Marketplace was not using the defined http proxies.
- Improved the logs search functionality in Docker Desktop Dashboard to allow spaces.
- Middle-button mouse clicks on buttons in the Dashboard now behave as a left-button click instead of opening a blank window.

#### For Mac

- Fixed an issue to avoid creating `/opt/containerd/bin` and `/opt/containerd/lib` on the host if `/opt` has been added to the file sharing directories list.

#### For Windows

- Fixed a bug in the WSL 2 integration where if a file or directory is bind-mounted to a container, and the container exits, then the file or directory is replaced with the other type of object with the same name. For example, if a file is replaced with a directory or a directory with a file, any attempts to bind-mount the new object fails.
- Fixed a bug where the Tray icon and Dashboard UI didn't show up and Docker Desktop didn't fully start. Fixes docker/for-win#12622.

### Known issues

#### For Linux

- Changing ownership rights for files in bind mounts fails. This is due to the way we have implemented file sharing between the host and VM within which the Docker Engine runs. We aim to resolve this issue in the next release.

## 4.8.2

### Updates

- Compose v2.5.1

### Bug fixes and minor enahancements

- Fixed an issue with manual proxy settings which caused problems when pulling images. Fixes docker/for-win#12714 and docker/for-mac#6315.
- Fixed high CPU usage when extensions are disabled. Fixes docker/for-mac#6310.
- Docker Desktop now redacts HTTP proxy passwords in log files and diagnostics.

### Known issues

#### For Linux

- Changing ownership rights for files in bind mounts fails. This is due to the way we have implemented file sharing between the host and VM within which the Docker Engine runs. We aim to resolve this issue in the next release.

## 4.8.1

### New

- Released Docker Desktop for Linux.
- Beta release of Docker Extensions and Extensions SDK.
- Created a Docker Homepage where you can run popular images and discover how to use them.
- Compose V2 is now GA

### Bug fixes and enhancements

- Fixed a bug that caused the Kubernetes cluster to be deleted when updating Docker Desktop.

### Known issues

#### For Linux

- Changing ownership rights for files in bind mounts fails. This is due to the way we have implemented file sharing between the host and VM within which the Docker Engine runs. We aim to resolve this issue in the next release.

## 4.8.0

### New

- Released Docker Desktop for Linux.
- Beta release of Docker Extensions and Extensions SDK.
- Created a Docker Homepage where you can run popular images and discover how to use them.
- Compose V2 is now GA

### Updates

- Compose v2.5.0
- Go 1.18.1
- Kubernetes 1.24

### Bug fixes and minor enhancements

#### For all platforms

- Introduced reading system proxy. You no longer need to manually configure proxies unless it differs from your OS level proxy.
- Fixed a bug that showed Remote Repositories in the Dashboard when running behind a proxy.
- Fixed vpnkit establishing and blocking the client connection even if the server is gone. See docker/for-mac#6235
- Made improvements on the Volume tab in Docker Desktop:
  - Volume size is displayed.
  - Columns can be resized, hidden and reordered.
  - A columns sort order and hidden state is persisted, even after Docker Desktop restarts.
  - Row selection is persisted when switching between tabs, even after Docker Desktop restarts.
- Fixed a bug in the Dev Environments tab that did not add a scroll when more items were added to the screen.
- Standardised the header title and action in the Dashboard.
- Added support for downloading Registry Access Management policies through HTTP proxies.
- Fixed an issue related to empty remote repositories when the machine is in sleep mode for an extended period of time.
- Fixed a bug where dangling images were not selected in the cleanup process if their name was not marked as "<none>" but their tag is.
- Improved the error message when `docker pull` fails because an HTTP proxy is required.
- Added the ability to clear the search bar easily in Docker Desktop.
- Renamed the "Containers / Apps" tab to "Containers".
- Fixed a silent crash in the Docker Desktop installer when `C:\ProgramData\DockerDesktop` is a file or a symlink.
- Fixed a bug where an image with no namespace, for example `docker pull <private registry>/image`, would be erroneously blocked by Registry Access Management unless access to Docker Hub was enabled in settings.

#### For Mac

- Docker Desktop's icon now matches Big Sur Style guide. See docker/for-mac#5536
- Fixed a problem with duplicate Dock icons and Dock icon not working as expected. Fixes docker/for-mac#6189.
- Improved support for the `Cmd+Q` shortcut.

#### For Windows

- Improved support for the `Ctrl+W` shortcut.

### Known issues

#### For all platforms

- Currently, if you are running a Kubernetes cluster, it will be deleted when you upgrade to Docker Desktop 4.8.0. We aim to fix this in the next release.

#### For Linux

- Changing ownership rights for files in bind mounts fails. This is due to the way we have implemented file sharing between the host and VM within which the Docker Engine runs. We aim to resolve this issue in the next release.

## 4.7.1

### Bug fixes and enhancements

#### For all platforms

- Fixed a crash on the Quick Start Guide final screen.

#### For Windows

- Fixed a bug where update was failing with a symlink error. Fixes docker/for-win#12650.
- Fixed a bug that prevented using Windows container mode. Fixes docker/for-win#12652.
