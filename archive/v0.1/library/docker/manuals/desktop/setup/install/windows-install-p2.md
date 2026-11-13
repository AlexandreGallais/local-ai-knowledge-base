---
title: "Install Docker Desktop on Windows (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/setup/install/windows-install.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Install Docker Desktop on Windows (part 2 of 2)

## Advanced system configuration and installation options

### WSL: Verification and setup

If you have chosen to use WSL, first verify that your installed version meets system requirements by running the following command in your terminal:

```console
wsl --version
```

If version details do not appear, you are likely using the inbox version of WSL. This version does not support modern capabilities and must be updated.

You can update or install WSL using one of the following methods:

#### Option 1: Install or update WSL via the terminal

1. Open PowerShell or Windows Command Prompt in administrator mode.
2. Run either the install or update command. You may be prompted to restart your machine. For more information, refer to Install WSL.
```console
wsl --install

wsl --update
```

#### Option 2: Install WSL via the MSI package

If Microsoft Store access is blocked due to security policies:
1. Go to the official WSL GitHub Releases page.
2. Download the `.msi` installer from the latest stable release (under the Assets drop-down).
3. Run the downloaded installer and follow the setup instructions.

### Installer flags

> **Note:**
>
> If you're using PowerShell, you need to use the `ArgumentList` parameter before any flags.
> For example:
> ```powershell
> Start-Process 'Docker Desktop Installer.exe' -Wait -ArgumentList 'install', '--accept-license'
> ```

#### Installation behavior

- `--user`: Installs Docker Desktop in per-user mode, to `%LOCALAPPDATA%\Programs\DockerDesktop`. No administrator privileges are required. This is the recommended mode for most users. See Installation modes.
- `--quiet`: Suppresses information output when running the installer
- `--accept-license`: Accepts the Docker Subscription Service Agreement now, rather than requiring it to be accepted when the application is first run
- `--installation-dir=`: Changes the default installation location (`C:\Program Files\Docker\Docker`)
- `--backend=<backend name>`: Selects the default backend to use for Docker Desktop: `wsl-2` (default), `hyper-v`, `windows`, or `docker-vmm` (Beta, x86_64 only). With version 4.97 and later, `docker-vmm` can be combined with the `--user` flag. `hyper-v` and `windows` can't be combined with `--user`.
- `--always-run-service`: After installation completes, starts `com.docker.service` and sets the service startup type to Automatic. This circumvents the need for administrator privileges, which are otherwise necessary to start `com.docker.service`. `com.docker.service` is required by Windows containers and Hyper-V backend.

#### Security and access control

- `--allowed-org=<org namespace>`: Requires the user to sign in and be a member of the specified Docker Hub organization namespace when running the application. Use the namespace, not the organization display name. For configuration details, see Configure sign-in enforcement.
- `--admin-settings`: Automatically creates an `admin-settings.json` file which is used by admins to control certain Docker Desktop settings on client machines within their organization. For more information, see Settings Management.
  - It must be used together with the `--allowed-org=<org namespace>` flag.
  - For example: `--allowed-org=<org namespace> --admin-settings="{'configurationFileVersion': 2, 'enhancedContainerIsolation': {'value': true, 'locked': false}}"`
- `--no-windows-containers`: Disables the Windows containers integration. This can improve security.  Can't be combined with `--backend=windows`. For more information, see Windows containers.

#### Proxy configuration

- `--proxy-http-mode=<mode>`: Sets the HTTP Proxy mode, `system` (default) or `manual`
- `--override-proxy-http=<URL>`: Sets the URL of the HTTP proxy that must be used for outgoing HTTP requests, requires `--proxy-http-mode` to be `manual`
- `--override-proxy-https=<URL>`: Sets the URL of the HTTP proxy that must be used for outgoing HTTPS requests, requires `--proxy-http-mode` to be `manual`
- `--override-proxy-exclude=<hosts/domains>`: Bypasses proxy settings for the hosts and domains. Uses a comma-separated list.
- `--proxy-enable-kerberosntlm`: Enables Kerberos and NTLM proxy authentication. If you are enabling this, ensure your proxy server is properly configured for Kerberos/NTLM authentication. Available with Docker Desktop 4.32 and later.
- `--override-proxy-pac=<PAC file URL>`: Sets the PAC file URL. This setting takes effect only when using `manual` proxy mode.
- `--override-proxy-embedded-pac=<PAC script>`: Specifies an embedded PAC (Proxy Auto-Config) script. This setting takes effect only when using `manual` proxy mode and has precedence over the `--override-proxy-pac` flag.

##### Example of specifying PAC file

```console
"Docker Desktop Installer.exe" install --proxy-http-mode="manual" --override-proxy-pac="http://localhost:8080/myproxy.pac"
```

##### Example of specifying PAC script

```console
"Docker Desktop Installer.exe" install --proxy-http-mode="manual" --override-proxy-embedded-pac="function FindProxyForURL(url, host) { return \"DIRECT\"; }"
```

#### Data root and disk location

- `--hyper-v-default-data-root=`: Specifies the default location for the Hyper-V VM disk.
- `--windows-containers-default-data-root=`: Specifies the default location for the Windows containers.
- `--wsl-default-data-root=`: Specifies the default location for the WSL distribution disk.

### Administrator privileges

In per-user mode, Docker Desktop can be installed and updated without administrator privileges. Some settings still require elevation and are marked **Requires password** in the Settings UI. Enabling WSL 2 for the first time also requires administrator privileges, but this is a one-time, per-machine operation.

In all-users mode, installing Docker Desktop requires administrator privileges. However, once installed, it can be used without administrative access. Some actions, though, still need elevated permissions. See Understand permission requirements for Windows for more detail.

See the FAQs on how to install and run Docker Desktop without needing administrator privileges.

If you're an IT admin and your users do not have administrator rights and plan to perform operations that require elevated privileges, be sure to install Docker Desktop using the `--always-run-service` installer flag. This ensures those actions can still be executed without prompting for User Account Control (UAC) elevation. See Installer Flags for more detail.

### Windows containers

> **Note:**
>
> Windows containers are only supported in all-users installation mode. They are not available when Docker Desktop is installed per-user.

From the Docker Desktop menu, you can toggle which daemon (Linux or Windows)
the Docker CLI talks to. Select **Switch to Windows containers** to use Windows
containers, or select **Switch to Linux containers** to use Linux containers
(the default).

For more information on Windows containers, refer to the following documentation:

- Microsoft documentation on Windows containers.

- Build and Run Your First Windows Server Container (Blog Post)
  gives a quick tour of how to build and run native Docker Windows containers on Windows 10 and Windows Server 2016 evaluation releases.

- Getting Started with Windows Containers (Lab)
  shows you how to use the MusicStore
  application with Windows containers. The MusicStore is a standard .NET application and,
  forked here to use containers, is a good example of a multi-container application.

- To understand how to connect to Windows containers from the local host, see
  I want to connect to a container from Windows

> **Note:**
>
> When you switch to Windows containers, **Settings** only shows those tabs that are active and apply to your Windows containers.

If you set proxies or daemon configuration in Windows containers mode, these
apply only on Windows containers. If you switch back to Linux containers,
proxies and daemon configurations return to what you had set for Linux
containers. Your Windows container settings are retained and become available
again when you switch back.

## Where to go next

- Explore Docker's subscriptions to see what Docker can offer you.
- Build and share a containerized application.
- Explore Docker Desktop and all its features.
- Troubleshooting describes common problems, workarounds, and
  how to get support.
- FAQs provide answers to frequently asked questions.
- Release notes lists component updates, new features, and improvements associated with Docker Desktop releases.
- Back up and restore data provides instructions on backing up and restoring data related to Docker.
