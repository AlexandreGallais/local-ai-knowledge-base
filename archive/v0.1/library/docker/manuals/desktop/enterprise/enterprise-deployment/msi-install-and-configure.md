---
title: "MSI installer (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/enterprise-deployment/msi-install-and-configure.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# MSI installer

The MSI package supports various MDM (Mobile Device Management) solutions, making it ideal for bulk installations and eliminating the need for manual setups by individual users. With this package, IT administrators can ensure standardized, policy-driven installations of Docker Desktop, enhancing efficiency and software management across their organizations.

## Install interactively

1. In Docker Home, choose your organization.
1. Select **Docker Desktop**, then **Deploy**.
1. From the **Windows OS** tab, select the **Download MSI installer** button.
1. Once downloaded, double-click `DockerDesktop.msi` to run the installer.
1. After accepting the license agreement, choose the install location. By default, Docker Desktop is installed at `C:\Program Files\Docker\Docker`. The MSI installer only supports all-users installations. If you need a per-user installation, use the EXE installer.
1. Configure the Docker Desktop installation. You can:
   - Create a desktop shortcut

   - Set the Docker Desktop service startup type to automatic

   - Allow Windows Containers to be used with this installation. This is cleared by default in the installation wizard, so Windows containers are disabled unless you select it.

   - Select the Docker Desktop backend: WSL or Hyper-V.
1. Follow the instructions on the installation wizard to authorize the installer and proceed with the install.
1. When the installation is successful, select **Finish** to complete the installation process.

If your administrator account is different from your user account, you must add the user to the **docker-users** group to access features that require higher privileges, such as creating and managing the Hyper-V VM, or using Windows containers:

1. Run **Computer Management** as an **administrator**.
1. Navigate to **Local Users and Groups** > **Groups** > **docker-users**.
1. Right-click to add the user to the group.
1. Sign out and sign back in for the changes to take effect.

> **Note:**
>
> When installing Docker Desktop with the MSI, in-app updates are automatically disabled by default. This ensures organizations can maintain version consistency and prevent unapproved updates. In-app updates from an MSI installation can be enabled by changing the `disableUpdate` setting to `false` through Settings Management.
>
> Docker Desktop notifies you when an update is available. To update Docker Desktop, download the latest installer from Docker Home. Navigate to the **Deploy** page.
>
> To keep up to date with new releases, check the release notes page.
