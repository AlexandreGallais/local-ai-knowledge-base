---
title: "Troubleshoot topics for Docker Desktop (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/troubleshoot-and-support/troubleshoot/topics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Troubleshoot topics for Docker Desktop (part 2 of 2)

## Topics for Windows

### Docker Desktop fails to start when anti-virus software is installed

#### Cause

Some anti-virus software may be incompatible with Hyper-V and Microsoft
Windows builds. The conflict
typically occurs after a Windows update and
manifests as an error response from the Docker daemon and a Docker Desktop start failure.

#### Solution

For a temporary workaround, uninstall the anti-virus software, or
add Docker to the exclusions/exceptions in your antivirus software.

Some anti-virus software, such as Avast, also has its own hardware-assisted
virtualization or hardened mode that claims exclusive access to
Hyper-V, which blocks Docker Desktop and WSL from using it. If your Docker
Desktop start failure includes an error such as
`Wsl/Service/RegisterDistro/CreateVm/HCS/ERROR_NOT_SUPPORTED`, disable this
feature in your anti-virus software. For example, in Avast, go to **Menu** >
**Settings** > **Troubleshooting** and clear **Enable hardware-assisted
virtualization**.

### Permissions errors on data directories for shared volumes

#### Cause

When sharing files from Windows, Docker Desktop sets permissions on shared volumes
to a default value of 0777
(`read`, `write`, `execute` permissions for `user` and for `group`).

The default permissions on shared volumes are not configurable.

#### Solution

If you are
working with applications that require different permissions, either:
 - Use non-host-mounted volumes
 - Find a way to make the applications work with the default file permissions

### Unexpected syntax errors, use Unix style line endings for files in containers

#### Cause

Docker containers expect Unix-style line `\n` endings, not Windows style: `\r\n`. This includes files referenced at the command line for builds and in RUN commands in Docker files.

Keep this in mind when authoring files such as shell scripts using Windows
tools, where the default is likely to be Windows style line endings. These
commands ultimately get passed to Unix commands inside a Unix based container
(for example, a shell script passed to `/bin/sh`). If Windows style line endings
are used, `docker run` fails with syntax errors.

#### Solution

 - Convert files to Unix-style line endings using:

   ```console
   $ dos2unix script.sh
   ```
- In VS Code, set line endings to `LF` (Unix) instead of `CRLF` (Windows).

### Path conversion errors on Windows

#### Cause

Unlike Linux, Windows requires explicit path conversion for volume mounting.

On Linux, the system takes care of mounting a path to another path. For example, when you run the following command on Linux:

```console
$ docker run --rm -ti -v /home/user/work:/work alpine
```

It adds a `/work` directory to the target container to mirror the specified path.

#### Solution

Update the source path. For example, if you are using
the legacy Windows shell (`cmd.exe`), you can use the following command:

```console
$ docker run --rm -ti -v C:\Users\user\work:/work alpine
```

This starts the container and ensures the volume becomes usable. This is possible because Docker Desktop detects
the Windows-style path and provides the appropriate conversion to mount the directory.

Docker Desktop also allows you to use Unix-style path to the appropriate format. For example:

```console
$ docker run --rm -ti -v /c/Users/user/work:/work alpine ls /work
```

### Docker commands failing in Git Bash

#### Error message

```console
$ docker run --rm -ti -v C:\Users\user\work:/work alpine
docker: Error response from daemon: mkdir C:UsersUserwork: Access is denied.
```

```console
$ docker run --rm -ti -v $(pwd):/work alpine
docker: Error response from daemon: OCI runtime create failed: invalid mount {Destination:\Program Files\Git\work Type:bind Source:/run/desktop/mnt/host/c/Users/user/work;C Options:[rbind rprivate]}: mount destination \Program Files\Git\work not absolute: unknown.
```

#### Cause

Git Bash (or MSYS) provides a Unix-like environment on Windows. These tools apply their own
preprocessing on the command line.

This affects `$(pwd)`, colon-separated paths, and tilde (`~`)

Also, the `\` character has a special meaning in Git Bash.

#### Solution

 - Disable Git Bash path conversion temporarily. For example, run the command with MSYS path conversion disable:
    ```console
    $ MSYS_NO_PATHCONV=1 docker run --rm -ti -v $(pwd):/work alpine
    ```
 - Use proper path formatting:
    - Use double forward and backslashes (`\\` `//`) instead of single (`\` `/`).
    - If referencing `$(pwd)`, add an extra `/`:

Portability of the scripts is not affected as Linux treats multiple `/` as a single entry.

### Docker Desktop fails due to Virtualization not working

#### Error message

A typical error message is "Docker Desktop - Unexpected WSL error" mentioning the error code
`Wsl/Service/RegisterDistro/CreateVm/HCS/HCS_E_HYPERV_NOT_INSTALLED` or
`Wsl/Service/RegisterDistro/CreateVm/HCS/ERROR_NOT_SUPPORTED`. Manually executing `wsl` commands
also fails with the same error code.

#### Cause

- Virtualization settings are disabled in the BIOS.
- Windows Hyper-V or WSL 2 components are missing.

Note some third-party software such as Android emulators will disable Hyper-V on install.

#### Solutions

Your machine must have the following features for Docker Desktop to function correctly:

##### WSL 2 and Windows Home

1. Virtual Machine Platform
1. Windows Subsystem for Linux
1. Virtualization enabled in the BIOS
   Note that many Windows devices already have virtualization enabled, so this may not apply.
1. Hypervisor enabled at Windows startup

It must be possible to run WSL 2 commands without error, for example:

```console
PS C:\users\> wsl -l -v
  NAME              STATE           VERSION
* Ubuntu            Running         2
  docker-desktop    Stopped         2
PS C:\users\> wsl -d docker-desktop echo WSL 2 is working
WSL 2 is working
```

If the features are enabled but the commands are not working, first check Virtualization is turned on
then enable the Hypervisor at Windows startup if required. If running Docker
Desktop in a Virtual Machine, ensure the hypervisor has nested virtualization enabled.

##### Hyper-V

On Windows 10 Pro or Enterprise, you can also use Hyper-V with the following features enabled:

1. Hyper-V
   installed and working
1. Virtualization enabled in the BIOS
   Note that many Windows devices already have virtualization enabled, so this may not apply.
1. Hypervisor enabled at Windows startup

Docker Desktop requires Hyper-V as well as the Hyper-V Module for Windows
PowerShell to be installed and enabled. The Docker Desktop installer enables
it for you.

Docker Desktop also needs two CPU hardware features to use Hyper-V: Virtualization and Second Level Address Translation (SLAT), which is also called Rapid Virtualization Indexing (RVI). On some systems, Virtualization must be enabled in the BIOS. The steps required are vendor-specific, but typically the BIOS option is called `Virtualization Technology (VTx)` or something similar. Run the command `systeminfo` to check all required Hyper-V features. See Pre-requisites for Hyper-V on Windows 10 for more details.

To install Hyper-V manually, see Install Hyper-V on Windows 10. A reboot is *required* after installation. If you install Hyper-V without rebooting, Docker Desktop does not work correctly.

From the start menu, type **Turn Windows features on or off** and press enter.
In the subsequent screen, verify that Hyper-V is enabled.

##### Virtualization must be turned on

In addition to Hyper-V or WSL 2, virtualization must be turned on. Check the
Performance tab on the Task Manager. Alternatively, you can type `systeminfo` into your terminal. If you see `Hyper-V Requirements: A hypervisor has been detected. Features required for Hyper-V will not be displayed`, then virtualization is enabled.

If you manually uninstall Hyper-V, WSL 2 or turn off virtualization,
Docker Desktop cannot start.

To turn on nested virtualization, see Run Docker Desktop for Windows in a VM or VDI environment.

##### Hypervisor enabled at Windows startup

If you have completed the previous steps and are still experiencing
Docker Desktop startup issues, this could be because the Hypervisor is installed,
but not launched during Windows startup. Some tools (such as older versions of
Virtual Box) and video game installers turn off hypervisor on boot. To turn it back on:

1. Open an administrative console prompt.
1. Run `bcdedit /set hypervisorlaunchtype auto`.
1. Restart Windows.

You can also refer to the Microsoft TechNet article on Code flow guard (CFG) settings.

##### Turn on nested virtualization

If you are using Hyper-V and you get the following error message when running Docker Desktop in a VDI environment:

```console
The Virtual Machine Management Service failed to start the virtual machine 'DockerDesktopVM' because one of the Hyper-V components is not running
```

Try enabling nested virtualization.

### Docker Desktop with Windows Containers fails with "The media is write protected""

#### Error message

`FSCTL_EXTEND_VOLUME \\?\Volume{GUID}: The media is write protected`

#### Cause

If you're encountering failures when running Docker Desktop with Windows Containers, it might be due to
a specific Windows configuration policy: FDVDenyWriteAccess.

This policy, when enabled, causes Windows to mount all fixed drives not encrypted by BitLocker-encrypted as read-only.
This also affects virtual machine volumes and as a result, Docker Desktop may not be able to start or run containers
correctly because it requires read-write access to these volumes.

FDVDenyWriteAccess is a Windows Group Policy setting that, when enabled, prevents write access to fixed data drives that are not protected
by BitLocker. This is often used in security-conscious environments but can interfere with development tools like Docker.
In the Windows registry it can be found at `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Policies\Microsoft\FVE\FDVDenyWriteAccess`.

#### Solutions

Docker Desktop does not support running Windows Containers on systems where FDVDenyWriteAccess is enabled. This setting interferes with the
ability of Docker to mount volumes correctly, which is critical for container functionality.

To use Docker Desktop with Windows Containers, ensure that FDVDenyWriteAccess is disabled. You can check and change this setting in the registry or through Group Policy Editor (`gpedit.msc`) under:

**Computer Configuration** > **Administrative Templates** > **Windows Components** > **BitLocker Drive Encryption** > **Fixed Data Drives** > **Deny write access to fixed drives not protected by BitLocker**

> **Note:**
>
> Modifying Group Policy settings may require administrator privileges and should comply with your organization's IT policies. If the setting gets reset after some time this usually means that it was overridden by the centralized configuration of your IT department. Talk to them before making any changes.

### `Docker Desktop Access Denied` error message when starting Docker Desktop

#### Error message

When starting Docker Desktop, the following error appears:

```text
Docker Desktop - Access Denied
```

#### Cause

The user is not part of the `docker-users` group, which is required for permissions.

#### Solution

If your admin account is different to your user account, add it:

1. Run **Computer Management** as an administrator.
1. Navigate to **Local Users and Groups** > **Groups** > **docker-users**.
1. Right-click to add the user to the group.
1. Sign out and sign back in for the changes to take effect
