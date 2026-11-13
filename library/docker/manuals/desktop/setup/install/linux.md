---
title: "Install Docker Desktop on Linux"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/setup/install/linux/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Install Docker Desktop on Linux

> **Docker Desktop terms**
>
> Commercial use of Docker Desktop in larger enterprises (more than 250
> employees or more than $10 million USD in annual revenue) requires a paid
> subscription.

This page contains information about general system requirements, supported platforms, and instructions on how to install Docker Desktop for Linux.

> **Important:**
>
> Docker Desktop on Linux runs a Virtual Machine (VM) which creates and uses a custom docker context, `desktop-linux`, on startup.
>
> This means images and containers deployed on the Linux Docker Engine (before installation) are not available in Docker Desktop for Linux.
>
>

> **Important:**
>
> For commercial use of Docker Engine obtained via Docker Desktop within larger enterprises (exceeding 250 employees or with annual revenue surpassing $10 million USD), a paid subscription is required.

Docker Desktop for Linux provides a user-friendly graphical interface that simplifies the management of containers and services. It includes Docker Engine as this is the core technology that powers Docker containers. Docker Desktop for Linux also comes with additional features like Docker Scout and Docker Extensions.

### Installing Docker Desktop and Docker Engine

Docker Desktop for Linux and Docker Engine can be installed side-by-side on the
same machine. Docker Desktop for Linux stores containers and images in an isolated
storage location within a VM and offers
controls to restrict its resources. Using a dedicated storage
location for Docker Desktop prevents it from interfering with a Docker Engine
installation on the same machine.

While it's possible to run both Docker Desktop and Docker Engine simultaneously,
there may be situations where running both at the same time can cause issues.
For example, when mapping network ports (`-p` / `--publish`) for containers, both
Docker Desktop and Docker Engine may attempt to reserve the same port on your
machine, which can lead to conflicts ("port already in use").

We generally recommend stopping the Docker Engine while you're using Docker Desktop
to prevent the Docker Engine from consuming resources and to prevent conflicts
as described above.

Use the following command to stop the Docker Engine service:

```console
$ sudo systemctl stop docker docker.socket containerd
```

Depending on your installation, the Docker Engine may be configured to automatically
start as a system service when your machine starts. Use the following command to
disable the Docker Engine service, and to prevent it from starting automatically:

```console
$ sudo systemctl disable docker docker.socket containerd
```

### Switching between Docker Desktop and Docker Engine

The Docker CLI can be used to interact with multiple Docker Engines. For example,
you can use the same Docker CLI to control a local Docker Engine and to control
a remote Docker Engine instance running in the cloud. Docker Contexts
allow you to switch between Docker Engines instances.

When installing Docker Desktop, a dedicated "desktop-linux" context is created to
interact with Docker Desktop. On startup, Docker Desktop automatically sets its
own context (`desktop-linux`) as the current context. This means that subsequent
Docker CLI commands target Docker Desktop. On shutdown, Docker Desktop resets
the current context to the `default` context.

Use the `docker context ls` command to view what contexts are available on your
machine. The current context is indicated with an asterisk (`*`).

```console
$ docker context ls
NAME            DESCRIPTION                               DOCKER ENDPOINT                                  ...
default *       Current DOCKER_HOST based configuration   unix:///var/run/docker.sock                      ...
desktop-linux                                             unix:///home/<user>/.docker/desktop/docker.sock  ...
```

If you have both Docker Desktop and Docker Engine installed on the same machine,
you can run the `docker context use` command to switch between the Docker Desktop
and Docker Engine contexts. For example, use the "default" context to interact
with the Docker Engine:

```console
$ docker context use default
default
Current context is now "default"
```

And use the `desktop-linux` context to interact with Docker Desktop:

```console
$ docker context use desktop-linux
desktop-linux
Current context is now "desktop-linux"
```

Refer to the Docker Context documentation for more details.

## Supported platforms

Docker provides `.deb` and `.rpm` packages for the following Linux distributions
and architectures:

| Platform                                   | x86_64 / amd64 |
| :----------------------------------------- | :------------: |
| Ubuntu                        |       ✅       |
| Debian                        |       ✅       |
| Red Hat Enterprise Linux (RHEL) |       ✅       |
| Fedora                        |       ✅       |

An experimental package is available for Arch-based distributions. Docker has not tested or verified the installation.

Docker supports Docker Desktop on the current and previous LTS releases of the aforementioned distributions, as well as the most recent version.

## General system requirements

To install Docker Desktop successfully, your Linux host must meet the following general requirements:

- 64-bit kernel and CPU support for virtualization.
- KVM virtualization support. Follow the KVM virtualization support instructions to check if the KVM kernel modules are enabled and how to provide access to the KVM device.
- QEMU must be version 5.2 or later. We recommend upgrading to the latest version.
- systemd init system.
- GNOME, KDE, or MATE desktop environments are supported but others may work.
  - For many Linux distributions, the GNOME environment does not support tray icons. To add support for tray icons, you need to install a GNOME extension. For example, AppIndicator.
- At least 4 GB of RAM.
- Enable configuring ID mapping in user namespaces, see File sharing. Note that for Docker Desktop version 4.35 and later, this is not required anymore.
- Initialize `pass` for credentials management.

Docker Desktop for Linux runs a Virtual Machine (VM). For more information on why, see Why Docker Desktop for Linux runs a VM.

> **Note:**
>
> Docker does not provide support for running Docker Desktop for Linux in nested virtualization scenarios. We recommend that you run Docker Desktop for Linux natively on supported distributions.

> **Note:**
>
> With Docker Desktop 4.98 and later, you can use Docker VMM (Beta) instead of
> QEMU. To switch, select **Docker VMM** under **Settings** > **General** >
> **Virtual Machine Manager**. If the option is unavailable, turn on **Beta
> features** in **Settings**. Docker VMM has the same KVM requirements as QEMU.
> For more information, see
> Virtual Machine Manager.

### KVM virtualization support

Docker Desktop runs a VM that requires KVM support.

The `kvm` module should load automatically if the host has virtualization support. To load the module manually, run:

```console
$ modprobe kvm
```

Depending on the processor of the host machine, the corresponding module must be loaded:

```console
$ modprobe kvm_intel  # Intel processors

$ modprobe kvm_amd    # AMD processors
```

If the above commands fail, you can view the diagnostics by running:

```console
$ kvm-ok
```

To check if the KVM modules are enabled, run:

```console
$ lsmod | grep kvm
kvm_amd               167936  0
ccp                   126976  1 kvm_amd
kvm                  1089536  1 kvm_amd
irqbypass              16384  1 kvm
```

#### Set up KVM device user permissions

To check ownership of `/dev/kvm`, run :

```console
$ ls -al /dev/kvm
```

Add your user to the kvm group in order to access the kvm device:

```console
$ sudo usermod -aG kvm $USER
```

Sign out and sign back in so that your group membership is re-evaluated.

## Signing in with Docker Desktop for Linux

Docker Desktop for Linux relies on `pass` to store credentials in GPG-encrypted files.
Before signing in to Docker Desktop with your Docker ID, you must initialize `pass`.
Docker Desktop displays a warning if `pass` is not configured.

1. Generate a GPG key. You can initialize pass by using a gpg key. To generate a gpg key, run:

   ```console
   $ gpg --generate-key
   ``` 
2. Enter your name and email once prompted.

   Once confirmed, GPG creates a key pair. Look for the `pub` line that contains your GPG ID, for example:

   ```text
   ...
   pubrsa3072 2022-03-31 [SC] [expires: 2024-03-30]
    3ABCD1234EF56G78
   uid          Molly <molly@example.com>
   ```
3. Copy the GPG ID and use it to initialize `pass`. For example

   ```console
   $ pass init 3ABCD1234EF56G78
   ``` 

   You should see output similar to:

   ```text
   mkdir: created directory '/home/molly/.password-store/'
   Password store initialized for <generated_gpg-id_public_key>
   ```

Once you initialize `pass`, you can sign in and pull your private images.
When Docker CLI or Docker Desktop use credentials, a user prompt may pop up for the password you set during the GPG key generation.

```console
$ docker pull molly/privateimage
Using default tag: latest
latest: Pulling from molly/privateimage
3b9cc81c3203: Pull complete 
Digest: sha256:3c6b73ce467f04d4897d7a7439782721fd28ec9bf62ea2ad9e81a5fb7fb3ff96
Status: Downloaded newer image for molly/privateimage:latest
docker.io/molly/privateimage:latest
```

## Using Docker SDKs with Docker Desktop

Docker Desktop for Linux uses a per-user socket instead of the system-wide `/var/run/docker.sock`. Docker SDKs and tools that connect directly to the Docker daemon need the `DOCKER_HOST` environment variable set to connect to Docker Desktop. For configuration details, see How do I use Docker SDKs with Docker Desktop for Linux?.

## Where to go next

- Install Docker Desktop for Linux for your specific Linux distribution:
  - Install on Ubuntu
  - Install on Debian
  - Install on Red Hat Enterprise Linux (RHEL)
  - Install on Fedora
  - Install on Arch
