---
title: "Install Docker Desktop on Arch-based distributions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/setup/install/linux/archlinux.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Install Docker Desktop on Arch-based distributions

> **Docker Desktop terms**
>
> Commercial use of Docker Desktop in larger enterprises (more than 250
> employees OR more than $10 million USD in annual revenue) requires a paid
> subscription.

This page contains information on how to install, launch and upgrade Docker Desktop on an Arch-based distribution.

## Prerequisites

To install Docker Desktop successfully, you must meet the general system requirements.

## Install Docker Desktop

1. Install the Docker client binary on Linux. Static binaries for the Docker client are available for Linux as `docker`. You can use:

   ```console
   $ wget https://download.docker.com/linux/static/stable/x86_64/docker-{{% param "docker_ce_version" %}}.tgz -qO- | tar xvfz - docker/docker --strip-components=1
   $ sudo cp -rp ./docker /usr/local/bin/ && rm -r ./docker
   ```

2. Download the latest Arch package from the Release notes.

3. Install the package:

   ```console
   $ sudo pacman -U ./docker-desktop-x86_64.pkg.tar.zst
   ```

   By default, Docker Desktop is installed at `/opt/docker-desktop`.

## Launch Docker Desktop

To start Docker Desktop for Linux:

1. Navigate to the Docker Desktop application in your Gnome/KDE Desktop.

2. Select **Docker Desktop** to start Docker.

   The Docker Subscription Service Agreement displays.

3. Select **Accept** to continue. Docker Desktop starts after you accept the terms.

   Note that Docker Desktop won't run if you do not agree to the terms. You can choose to accept the terms at a later date by opening Docker Desktop.

   For more information, see Docker Desktop Subscription Service Agreement. It is recommended that you also read the FAQs.

Alternatively, open a terminal and run:

```console
$ systemctl --user start docker-desktop
```

When Docker Desktop starts, it creates a dedicated context that the Docker CLI
can use as a target and sets it as the current context in use. This is to avoid
a clash with a local Docker Engine that may be running on the Linux host and
using the default context. On shutdown, Docker Desktop resets the current
context to the previous one.

The Docker Desktop installer updates Docker Compose and the Docker CLI binaries
on the host. It installs Docker Compose V2 and gives users the choice to
link it as docker-compose from the Settings panel. Docker Desktop installs
the new Docker CLI binary that includes cloud-integration capabilities in `/usr/local/bin/com.docker.cli`
and creates a symlink to the classic Docker CLI at `/usr/local/bin`.

After you’ve successfully installed Docker Desktop, you can check the versions
of these binaries by running the following commands:

```console
$ docker compose version
Docker Compose version v2.39.4

$ docker --version
Docker version 28.4.0, build d8eb465

$ docker version
Client:
 Version:           28.4.0
 API version:       1.51
 Go version:        go1.24.7
<...>
```

To enable Docker Desktop to start on sign in, from the Docker menu, select
**Settings** > **General** > **Start Docker Desktop when you sign in to your computer**.

Alternatively, open a terminal and run:

```console
$ systemctl --user enable docker-desktop
```

To stop Docker Desktop, select the Docker menu icon to open the Docker menu and select **Quit Docker Desktop**.

Alternatively, open a terminal and run:

```console
$ systemctl --user stop docker-desktop
```

## Next steps

- Explore Docker's subscriptions to see what Docker can offer you.
- Take a look at Get started with Docker to learn how to build an image and run it as a containerized application.
- Explore Docker Desktop and all its features.
- Troubleshooting describes common problems, workarounds, how to run and submit diagnostics, and submit issues.
- FAQs provide answers to frequently asked questions.
- Release notes lists component updates, new features, and improvements associated with Docker Desktop releases.
- Back up and restore data provides instructions
  on backing up and restoring data related to Docker.
