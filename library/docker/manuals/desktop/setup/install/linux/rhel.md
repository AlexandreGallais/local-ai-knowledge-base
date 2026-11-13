---
title: "Install Docker Desktop on RHEL"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/setup/install/linux/rhel.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Install Docker Desktop on RHEL

> **Docker Desktop terms**
>
> Commercial use of Docker Desktop in larger enterprises (more than 250
> employees or more than $10 million USD in annual revenue) requires a paid
> subscription.

This page contains information on how to install, launch and upgrade Docker Desktop on a Red Hat Enterprise Linux (RHEL) distribution.

## Prerequisites

To install Docker Desktop successfully, you must:

- Meet the general system requirements.
- Have a 64-bit version of either RHEL 9 or RHEL 10.

- If `pass` is not installed, or it can't be installed, you must enable CodeReady Linux Builder (CRB) repository and Extra Packages for Enterprise Linux (EPEL).

   **RHEL 10**
   ```console
   $ sudo subscription-manager repos --enable codeready-builder-for-rhel-10-$(arch)-rpms
   $ sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-10.noarch.rpm
   $ sudo dnf install pass
   ```

   **RHEL 9**
   ```console
   $ sudo subscription-manager repos --enable codeready-builder-for-rhel-9-$(arch)-rpms
   $ sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm
   $ sudo dnf install pass
   ```

- For a GNOME desktop environment you must install AppIndicator and KStatusNotifierItem GNOME extensions. You must also enable EPEL.

   **RHEL 10**
   ```console
   $ # enable EPEL as described above
   $ sudo dnf install gnome-shell-extension-appindicator
   $ sudo gnome-extensions enable appindicatorsupport@rgcjonas.gmail.com
   ```

   **RHEL 9**
   ```console
   $ # enable EPEL as described above
   $ sudo dnf install gnome-shell-extension-appindicator
   $ sudo gnome-extensions enable appindicatorsupport@rgcjonas.gmail.com
   ```

- If you're not using GNOME, you must install `gnome-terminal` to enable terminal access from Docker Desktop:

   ```console
   $ sudo dnf install gnome-terminal
   ```

## Install Docker Desktop

To install Docker Desktop on RHEL:

1. Set up Docker's package repository as follows:

   ```console
   $ sudo dnf config-manager --add-repo {{% param "download-url-base" %}}/docker-ce.repo
   ```

2. Download the latest RPM package.

3. Install the package with dnf as follows:

   ```console
   $ sudo dnf install ./docker-desktop-x86_64-rhel.rpm
   ```

The RPM package includes a post-install script that completes additional setup steps automatically.

The post-install script:

- Sets the capability on the Docker Desktop binary to map privileged ports and set resource limits.
- Adds a DNS name for Kubernetes to `/etc/hosts`.
- Creates a symlink from `/usr/local/bin/com.docker.cli` to `/usr/bin/docker`.
  This is because the classic Docker CLI is installed at `/usr/bin/docker`. The Docker Desktop installer also installs a Docker CLI binary that includes cloud-integration capabilities and is essentially a wrapper for the Compose CLI, at `/usr/local/bin/com.docker.cli`. The symlink ensures that the wrapper can access the classic Docker CLI.
- Creates a symlink from `/usr/libexec/qemu-kvm` to `/usr/local/bin/qemu-system-x86_64`.

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

> **Tip:**
>
> To attach Red Hat subscription data to containers, see Red Hat verified solution.
>
> For example:
> ```console
> $ docker run --rm -it -v "/etc/pki/entitlement:/etc/pki/entitlement" -v "/etc/rhsm:/etc/rhsm-host" -v "/etc/yum.repos.d/redhat.repo:/etc/yum.repos.d/redhat.repo" registry.access.redhat.com/ubi9
> ```

## Upgrade Docker Desktop

Once a new version for Docker Desktop is released, the Docker UI shows a notification.
You need to first remove the previous version and then download the new package each time you want to upgrade Docker Desktop. Run:

```console
$ sudo dnf remove docker-desktop
$ sudo dnf install ./docker-desktop-<arch>-rhel.rpm
```

## Next steps

- Review Docker's subscriptions to see what Docker can offer you.
- Take a look at Get started with Docker to learn how to build an image and run it as a containerized application.
- Explore Docker Desktop and all its features.
- Troubleshooting describes common problems, workarounds, how to run and submit diagnostics, and submit issues.
- FAQs provide answers to frequently asked questions.
- Release notes lists component updates, new features, and improvements associated with Docker Desktop releases.
- Back up and restore data provides instructions
  on backing up and restoring data related to Docker.
