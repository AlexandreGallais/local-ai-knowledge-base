---
title: "Troubleshoot topics for Docker Desktop (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/troubleshoot-and-support/troubleshoot/topics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Troubleshoot topics for Docker Desktop

> **Tip:**
>
> If you do not find a solution in troubleshooting, browse the GitHub repositories or create a new issue.

## Topics for all platforms

### Certificates not set up correctly

#### Error message

When attempting to pull from a registry using `docker run`, you may encounter the following error:

```console
Error response from daemon: Get http://192.168.203.139:5858/v2/: malformed HTTP response "\x15\x03\x01\x00\x02\x02"
```

Additionally, logs from the registry may show:

```console
2017/06/20 18:15:30 http: TLS handshake error from 192.168.203.139:52882: tls: client didn't provide a certificate
2017/06/20 18:15:30 http: TLS handshake error from 192.168.203.139:52883: tls: first record does not look like a TLS handshake
```

#### Possible causes

- Docker Desktop ignores certificates listed under insecure registries.
- Client certificates are not sent to insecure registries, causing handshake failures.

#### Solution

- Ensure that your registry is properly configured with valid SSL certificates.
- If your registry is self-signed, configure Docker to trust the certificate by adding it to Docker’s certificates directory (/etc/docker/certs.d/ on Linux).
- If the issue persists, check your Docker daemon configuration and enable TLS authentication.

### Docker Desktop's UI appears green, distorted, or has visual artifacts

#### Cause

Docker Desktop uses hardware-accelerated graphics by default, which may cause problems for some GPUs.

#### Solution

Disable hardware acceleration:

1. Edit Docker Desktop's `settings-store.json` file. You can find this file at:

   - Mac: `~/Library/Group Containers/group.com.docker/settings-store.json`
   - Windows: `C:\Users\[USERNAME]\AppData\Roaming\Docker\settings-store.json`
   - Linux: `~/.docker/desktop/settings-store.json.`

1. Add the following entry:

   ```json
   "disableHardwareAcceleration": "always"
   ```

1. Save the file and restart Docker Desktop.

### Using mounted volumes and getting runtime errors indicating an application file is not found, access to a volume mount is denied, or a service cannot start

#### Cause

If your project directory is located outside your home directory (`/home/<user>`), Docker Desktop requires file sharing permissions to access it.

#### Solution

Enable file sharing in Docker Desktop for Mac and Linux:

1. Navigate to **Settings**, select **Resources** and then **File sharing**.
1. Add the drive or folder that contains the Dockerfile and volume mount paths.

Enable file sharing in Docker Desktop for Windows:

1. From **Settings**, select **Shared Folders**.
1. Share the folder that contains the Dockerfile and volume mount paths.

### `port already allocated` errors

#### Error message

When starting a container, you may see an error like:

```text
Bind for 0.0.0.0:8080 failed: port is already allocated
```

Or

```text
listen tcp:0.0.0.0:8080: bind: address is already in use
```

#### Cause

- Another application on your system is already using the specified port.
- A previously running container was not stopped properly and is still bound to the port.

#### Solution

To discover the identity of this software, either:
- Use the `resmon.exe` GUI, select **Network** and then **Listening Ports**
- In PowerShell, use `netstat -aon | find /i "listening "` to discover the PID of the process
currently using the port (the PID is the number in the rightmost column).

Then, decide whether to shut the other process down, or to use a different port in your
Docker app.

## Topics for Mac

### Upgrade requires administrator privileges

#### Cause

On Mac, users without administrator privileges cannot perform in-app upgrades from the Docker Desktop Dashboard.

#### Solution

> **Important:**
>
> Do not uninstall the current version before upgrading. Doing so deletes all local Docker containers, images, and volumes.

To upgrade Docker Desktop:

- Ask an administrator to install the newer version over the existing one.
- Use the `--user` install flag if appropriate for your setup.

### Persistent notification telling me an application has changed my Desktop configurations

#### Cause

You receive this notification because the Configuration integrity check feature has detected that a third-party application has altered your Docker Desktop configuration. This usually happens due to incorrect or missing symlinks. The notification ensures you are aware of these changes so you can review and repair any potential issues to maintain system reliability.

Opening the notification presents a pop-up window which provides detailed information about the detected integrity issues.

#### Solution

If you choose to ignore the notification, it will be shown again only at the next Docker Desktop startup. If you choose to repair your configuration, you won't be prompted again.

If you want to switch off Configuration integrity check notifications, navigate to Docker Desktop's settings and in the **General** tab, clear the **Automatically check configuration** setting.

### `com.docker.vmnetd` is still running after I quit the app

The privileged helper process `com.docker.vmnetd` is started by `launchd` and
runs in the background. The process does not consume any resources unless
`Docker.app` connects to it, so it's safe to ignore.

### Incompatible CPU detected

#### Cause

Docker Desktop requires a processor (CPU) that supports virtualization and, more
specifically, the Apple Hypervisor
framework.

#### Solution

Check that:

 - You've installed the correct Docker Desktop for your architecture
 - Your Mac supports Apple's Hypervisor framework. To check if your Mac supports the Hypervisor framework, run the following command in a terminal window.

   ```console
   $ sysctl kern.hv_support
   ```

   If your Mac supports the Hypervisor Framework, the command prints `kern.hv_support: 1`.

   If not, the command prints `kern.hv_support: 0`.

See also, Hypervisor Framework
Reference
in the Apple documentation, and Docker Desktop Mac system requirements.

### Docker.app is damaged and can't be opened

#### Cause

This issue occurs due to a non-atomic copy during a drag/drop installation. When you drag and drop `Docker.app` from a DMG file while another application, like VS Code, is invoking the Docker CLI through symlinks, the copy operation may be interrupted, leaving the app in a partially copied state that Gatekeeper marks as "damaged".

#### Solution

1. Quit third-party software

   Close any applications that might call Docker in the background:

   - Visual Studio Code and other IDEs
   - Terminal applications
   - Agent apps or development tools
   - Any scripts or processes that use the Docker CLI

1. Remove any partial installation:

   1. Move `/Applications/Docker.app` to Trash and empty Trash.
   2. If you used a DMG installer, eject and re-mount the Docker DMG.

1. Reinstall Docker Desktop

   Follow the instructions in the Mac installation guide to reinstall Docker Desktop.

If you continue to see the "damaged" dialog after following the recovery steps:

   1. Gather diagnostics using the terminal. Follow the instructions in Diagnose from the terminal.

   - Note down the your diagnostics ID displayed in the terminal after running diagnostics.

   1. Get help:
      - If you have a paid Docker subscription, contact support and include your diagnostics ID
      - For community users, open an issue on GitHub and include your diagnostics ID

To avoid this issue in the future:

- If your organization allows, update Docker Desktop via the in-app update flow
- Always quit applications that use Docker before installing Docker Desktop via the DMG installer drag-and-drop approach
- In managed environments, use PKG installations over DMG drag-and-drop
- Keep installer volumes mounted until installation is complete

### Containers can't reach devices on my local network

Containers can reach the internet, but not other devices on your local network
(LAN), such as a NAS, a printer, or another computer at a `192.168.x.x`
address. The device itself can reach them.

#### Cause

Docker Desktop doesn't have the Mac **Local Network** permission. Mac then
blocks container traffic to devices on your local network, including your
router, while traffic to the internet still works.

#### Solution

To give Docker Desktop the Local Network permission:

1. On your device, open **System Settings** > **Privacy & Security** > **Local Network**.
2. Turn on **Docker**.

The change applies immediately, without needing to restart Docker Desktop.
