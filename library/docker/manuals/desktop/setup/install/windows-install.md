---
title: "Install Docker Desktop on Windows (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/setup/install/windows-install.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

> **Docker Desktop terms**
>
> Commercial use of Docker Desktop in larger enterprises (more than 250
> employees OR more than $10 million USD in annual revenue) requires a paid
> subscription.

This page provides download links, system requirements, and step-by-step installation instructions for Docker Desktop on Windows.

_For checksums, see Release notes_

## Installation modes

Docker Desktop supports two installation modes. Per-user installation is recommended for most users and is selected by default in the installer. It does not require administrator privileges to install or update, and the WSL 2 backend it uses covers the needs of the vast majority of Docker Desktop users.

| | Per-user (recommended) | All users |
|---|---|---|
| Install location | `%LOCALAPPDATA%\Programs\DockerDesktop` | `C:\Program Files\Docker\Docker` |
| Registry keys | Current User (HKCU) | Local Machine (HKLM) |
| Admin rights to install | Not required | Required |
| Admin rights to update | Not required | Required |
| Linux containers backend | WSL 2 or Docker VMM (Beta) | WSL 2, Hyper-V, or Docker VMM (Beta) |
| Windows containers | Not supported | Supported |
| Security | Smaller attack surface; no privileged system service installed | Requires privileged system service; broader access to host resources |

For more information, see Understand permission requirements for Windows.

## System requirements

> **Tip:**
>
> **Which backend should I use?**
>
> Docker Desktop for Windows supports three backends: WSL 2, Hyper-V, and Docker VMM (Beta). WSL 2 is the default and works for most users without administrator privileges. Hyper-V is only available with all-users installation. Docker VMM is a container-optimized hypervisor that reclaims idle memory and improves file I/O. For more information, see Virtual Machine Manager.

**WSL 2 backend, x86_64**

- WSL version 2.1.5 or later. To check your version, see WSL: Verification and setup
- If you intend to use Enhanced Container Isolation, ensure you’re using WSL version 2.6 or later. This is required because ECI depends on a Linux kernel version of at least 6.3.0, and WSL 2.6+ bundles Linux kernel version 6.6.
- Windows 10 64-bit: Enterprise, Pro, or Education version 22H2 (build 19045).
- Windows 11 64-bit: Enterprise, Pro, or Education version 23H2 (build 22631) or higher.
- The Windows Server service (LanmanServer) must be enabled and its start mode set to **Automatic**.
- Turn on the WSL 2 feature on Windows. For detailed instructions, refer to the
  Microsoft documentation.
- The following hardware prerequisites are required to successfully run
  WSL 2 on Windows 10 or Windows 11:
  - 64-bit processor with Second Level Address Translation (SLAT)
  - 8GB system RAM
  - Enable hardware virtualization in BIOS/UEFI. For more information, see
    Virtualization.

For more information on setting up WSL 2 with Docker Desktop, see WSL.

> **Note:**
>
> Docker only supports Docker Desktop on Windows for those versions of Windows that are still within Microsoft’s servicing timeline. Docker Desktop is not supported on server versions of Windows, such as Windows Server 2019 or Windows Server 2022. For more information on how to run containers on Windows Server, see Microsoft's official documentation.

> **Important:**
>
> To run Windows containers, you need Windows 10 or Windows 11 Professional or Enterprise edition.
> Windows Home or Education editions only allow you to run Linux containers.

**Hyper-V backend, x86_64**

- Windows 10 64-bit: Enterprise, Pro, or Education version 22H2 (build 19045).
- Windows 11 64-bit: Enterprise, Pro, or Education version 23H2 (build 22631) or higher.
- The Windows Server service (LanmanServer) must be enabled and its start mode set to **Automatic**.
- Turn on Hyper-V and Containers Windows features.
- The following hardware prerequisites are required to successfully run Client
  Hyper-V on Windows 10:

  - 64 bit processor with Second Level Address Translation (SLAT)
  - 8GB system RAM
  - Turn on BIOS/UEFI-level hardware virtualization support in the
    BIOS/UEFI settings. For more information, see
    Virtualization.

> **Note:**
>
> Docker only supports Docker Desktop on Windows for those versions of Windows that are still within Microsoft’s servicing timeline. Docker Desktop is not supported on server versions of Windows, such as Windows Server 2019 or Windows Server 2022. For more information on how to run containers on Windows Server, see Microsoft's official documentation.

> **Important:**
>
> To run Windows containers, you need Windows 10 or Windows 11 Professional or Enterprise edition.
> Windows Home or Education editions only allow you to run Linux containers.

**Docker VMM backend, x86_64 (Beta)**

- The same Windows versions as the WSL 2 backend.
- The **Windows Hypervisor Platform** and **Virtual Machine Platform** Windows
  features turned on. The all-users installer turns them on for you, and might
  ask you to restart Windows. A per-user installation can't turn on Windows
  Hypervisor Platform, so an administrator must turn it on first.
- Hardware virtualization enabled in BIOS/UEFI. Inside a virtual machine, the
  host must expose nested virtualization.
- Docker VMM doesn't require the Hyper-V feature, and isn't supported on Arm. On
  Arm, the installer uses WSL 2 instead.

For more information, see Virtual Machine Manager.

**WSL 2 backend, Arm (Early Access)**

- WSL version 2.1.5 or later. To check your version, see WSL: Verification and setup
- Windows 10 64-bit: Enterprise, Pro, or Education version 22H2 (build 19045).
- Windows 11 64-bit: Enterprise, Pro, or Education version 23H2 (build 22631) or higher.
- The Windows Server service (LanmanServer) must be enabled and its start mode set to **Automatic**.
- Turn on the WSL 2 feature on Windows. For detailed instructions, refer to the
  Microsoft documentation.
- The following hardware prerequisites are required to successfully run
  WSL 2 on Windows 10 or Windows 11:
  - 64-bit processor with Second Level Address Translation (SLAT)
  - 8GB system RAM
  - Enable hardware virtualization in BIOS/UEFI. For more information, see
    Virtualization.

> **Important:**
>
> Windows containers are not supported.

Containers and images created with Docker Desktop are shared between all
user accounts on machines where it is installed. This is because all Windows
accounts use the same VM to build and run containers. Note that it is not possible to share containers and images between user accounts when using the Docker Desktop WSL 2 backend.

Running Docker Desktop inside a VMware ESXi or Azure VM is supported for Docker Business customers.
It requires enabling nested virtualization on the hypervisor first.
For more information, see Running Docker Desktop in a VM or VDI environment.

## Install Docker Desktop on Windows

### Install interactively

1. Download the installer using the download button at the top of the page, or from the release notes.

1. Double-click `Docker Desktop Installer.exe` to run the installer. The installer will ask which installation mode you prefer. Choosing per-user installs to `%LOCALAPPDATA%\Programs\DockerDesktop` and requires no administrator privileges. Choosing all users will prompt for elevation.

   > **Note:**
   >
   >If you want to switch installation mode at a later date, you need to uninstall and reinstall Docker Desktop.

1. When prompted, select your backend on the **Configuration page**: **Use WSL 2 instead of Hyper-V** for WSL 2, or leave it unselected for Hyper-V. You can switch to Docker VMM after installation from **Settings** > **General**.

    With version 4.97 and later, the **Configuration** page lists the backends as options. Per-user installation offers WSL 2 and Docker VMM (Beta). All-users installation offers WSL 2, Hyper-V, and Docker VMM (Beta).

    On systems that support only one backend, Docker Desktop automatically selects the available option.

1. Follow the instructions on the installation wizard to authorize the installer and proceed with the installation.

1. When the installation is successful, select **Close** to complete the installation process.

1. Start Docker Desktop.

### Install from the command line

After downloading `Docker Desktop Installer.exe`, run the following command in a terminal to install Docker Desktop to `%LOCALAPPDATA%\Programs\DockerDesktop`.

For per-user installation, run:

```console
$ "Docker Desktop Installer.exe" install --user
```

To install for all users on the machine (requires administrator privileges):

```console
$ "Docker Desktop Installer.exe" install
```

If you're using PowerShell you should run it as:

```powershell
# Per-user installation (no admin required)
Start-Process 'Docker Desktop Installer.exe' -Wait -ArgumentList 'install', '--user'
 
# All-users installation (run as administrator)
Start-Process 'Docker Desktop Installer.exe' -Wait install
```

If using the Windows Command Prompt:

```sh
# Per-user installation (no admin required)
start /w "" "Docker Desktop Installer.exe" install --user
 
# All-users installation (run as administrator)
start /w "" "Docker Desktop Installer.exe" install
```

If using all-users installation and your administrator account is different to your user account, you must add the user to the **docker-users** group to access features that require higher privileges, such as creating and managing the Hyper-V VM, or using Windows containers:

```console
$ net localgroup docker-users <user> /add
```

> **Warning:**
>
> Membership in `docker-users` grants access to the Docker daemon socket, which is equivalent to granting administrative privileges on the host. Only add users who require access to Windows containers or Hyper-V VM management. For Linux containers using the WSL 2 backend, this group membership is not required. See Protect the Docker daemon socket for more information.

If you're deploying via MDM (such as Intune) and the `docker-users` group isn't populated automatically, see Why isn't the `docker-users` group populated when the MSI is installed with Intune or another MDM solution?.

See the Installer flags section to see what flags the `install` command accepts.

> **Note:**
>
>If you want to switch installation mode at a later date, you need to uninstall and reinstall Docker Desktop.

## Start Docker Desktop

Docker Desktop does not start automatically after installation. To start Docker Desktop:

1. Search for Docker, and select **Docker Desktop** in the search results.

2. The Docker menu () displays the Docker Subscription Service Agreement.

   Here’s a summary of the key points:

- Docker Desktop is free for small businesses (fewer than 250 employees AND less than $10 million in annual revenue), personal use, education, and non-commercial open source projects.
- Otherwise, it requires a paid subscription for professional use.
- Paid subscriptions are also required for government entities.
- The Docker Pro, Team, and Business subscriptions include commercial use of Docker Desktop.

3. Select **Accept** to continue. Docker Desktop starts after you accept the terms.

   Note that Docker Desktop won't run if you do not agree to the terms. You can choose to accept the terms at a later date by opening Docker Desktop.

   For more information, see Docker Desktop Subscription Service Agreement. It is recommended that you read the FAQs.

> **Tip:**
>
> As an IT administrator, you can use endpoint management (MDM) software to identify the number of Docker Desktop instances and their versions within your environment. This can provide accurate license reporting, help ensure your machines use the latest version of Docker Desktop, and enable you to enforce sign-in.
> - Intune
> - Jamf
> - Kandji
> - Kolide
> - Workspace One
