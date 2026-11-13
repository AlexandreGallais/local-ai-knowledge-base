---
title: "Install Docker Desktop on Mac"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/setup/install/mac-install.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Install Docker Desktop on Mac

> **Docker Desktop terms**
>
> Commercial use of Docker Desktop in larger enterprises (more than 250
> employees or more than $10 million USD in annual revenue) requires a paid
> subscription.

This page provides download links, system requirements, and step-by-step installation instructions for Docker Desktop on Mac.

*For checksums, see Release notes.*

## System requirements

**Mac with Apple silicon**

- A supported version of macOS.

  > **Important:**
  >
  > Docker Desktop is supported on the current and two previous major macOS releases. As new major versions of macOS are made generally available, Docker stops supporting the oldest version and supports the newest version of macOS (in addition to the previous two releases).

- At least 4 GB of RAM.
- Optional: Docker VMM (Beta) is available on Apple silicon. For more information, see Virtual Machine Manager.
- For the best experience, it's recommended that you install Rosetta 2. Rosetta 2 is no longer strictly required, however there are a few optional command line tools that still require Rosetta 2 when using Darwin/AMD64. To install Rosetta 2 manually from the command line, run the following command:

   ```console
   $ softwareupdate --install-rosetta
   ```

**Mac with Intel chip**

- A supported version of macOS.

  > **Important:**
  >
  > Docker Desktop is supported on the current and two previous major macOS releases. As new major versions of macOS are made generally available, Docker stops supporting the oldest version and supports the newest version of macOS (in addition to the previous two releases).

- At least 4 GB of RAM.

> **Before you install or update**
>
> - Quit tools that might call Docker in the background (Visual Studio Code, terminals, agent apps).
>
> - If you manage fleets or install via MDM, use the **PKG installer**.
>
> - Keep the installer volume mounted until the installation completes.
>
> If you encounter a "Docker.app is damaged" dialog, see Fix "Docker.app is damaged" on macOS.

## Install and run Docker Desktop on Mac

> **Tip:**
>
> See the FAQs on how to install and run Docker Desktop without needing administrator privileges.

### Install interactively

1. Download the installer using the download buttons at the top of the page, or from the release notes.

1. Double-click `Docker.dmg` to open the installer, then drag the Docker icon to the **Applications** folder. By default, Docker Desktop is installed at `/Applications/Docker.app`.

1. Double-click `Docker.app` in the **Applications** folder to start Docker.

1. The Docker menu displays the Docker Subscription Service Agreement.

    Here’s a summary of the key points:
    - Docker Desktop is free for small businesses (fewer than 250 employees AND less than $10 million in annual revenue), personal use, education, and non-commercial open source projects.
    - Otherwise, it requires a paid subscription for professional use.
    - Paid subscriptions are also required for government entities.
    - Docker Pro, Team, and Business subscriptions include commercial use of Docker Desktop.

1. Select **Accept** to continue.

   Note that Docker Desktop won't run if you do not agree to the terms. You can choose to accept the terms at a later date by opening Docker Desktop.

   For more information, see Docker Desktop Subscription Service Agreement. It is recommended that you also read the FAQs.

1. Docker Desktop starts. No further configuration is needed and you aren't asked for a password.

   Docker Desktop applies a default configuration that requires no privileged access: Docker CLI tools are installed under `$HOME/.docker/bin`, which is added to your `PATH`, and the default Docker socket isn't created. To change either of these, go to **Settings** > **Advanced** after installation. See Advanced (Mac only).

   > **Note:**
   >
   > With Docker Desktop version 4.88.0 and earlier, these options are presented during installation instead. From the installation window, select either:
   >
   > - **Use recommended settings (requires password)**. This lets Docker Desktop automatically set the necessary configuration settings.
   > - **Use advanced settings**. You can then set the location of the Docker CLI tools either in the system or user directory, enable the default Docker socket, and enable privileged port mapping.
   >
   > Then select **Finish**. If you applied any configuration that requires a password, enter your password to confirm your choice.

### Install from the command line

After downloading `Docker.dmg` from either the download buttons at the top of the page or from the release notes, run the following commands in a terminal to install Docker Desktop in the **Applications** folder:

```console
$ sudo hdiutil attach Docker.dmg
$ sudo /Volumes/Docker/Docker.app/Contents/MacOS/install
$ sudo hdiutil detach /Volumes/Docker
```

By default, Docker Desktop is installed at `/Applications/Docker.app`. As macOS typically performs security checks the first time an application is used, the `install` command can take several minutes to run.

#### Installer flags

The `install` command accepts the following flags:

##### Installation behavior

- `--accept-license`: Accepts the Docker Subscription Service Agreement now, rather than requiring it to be accepted when the application is first run.
- `--user=<username>`: Performs the privileged configurations once during installation. This removes the need for the user to grant root privileges on first run. For more information, see Privileged helper permission requirements. To find the username, enter `ls /Users` in the CLI.
- `--backend=docker-vmm`: Selects the Docker VMM (Beta) engine at install time. Requires Apple silicon. `docker-vmm` is the only supported value on Mac; any other value fails the installation. For more information, see Virtual Machine Manager.

##### Security and access

- `--allowed-org=<org namespace>`: Requires the user to sign in and be a member of the specified Docker Hub organization namespace when running the application. Use the namespace, not the organization display name. For configuration details, see Configure sign-in enforcement.
- `--admin-settings`: Automatically creates an `admin-settings.json` file which is used by administrators to control certain Docker Desktop settings on client machines within their organization. For more information, see Settings Management.
  - It must be used together with the `--allowed-org=<org namespace>` flag.
  - For example: `--allowed-org=<org namespace> --admin-settings="{'configurationFileVersion': 2, 'enhancedContainerIsolation': {'value': true, 'locked': false}}"`

##### Proxy configuration

- `--proxy-http-mode=<mode>`: Sets the HTTP Proxy mode. The two modes are `system` (default) or `manual`.
- `--override-proxy-http=<URL>`: Sets the URL of the HTTP proxy that must be used for outgoing HTTP requests. It requires `--proxy-http-mode` to be `manual`.
- `--override-proxy-https=<URL>`: Sets the URL of the HTTP proxy that must be used for outgoing HTTPS requests, requires `--proxy-http-mode` to be `manual`
- `--override-proxy-exclude=<hosts/domains>`: Bypasses proxy settings for the hosts and domains. It's a comma-separated list.
- `--override-proxy-pac=<PAC file URL>`: Sets the PAC file URL. This setting takes effect only when using `manual` proxy mode.
- `--override-proxy-embedded-pac=<PAC script>`: Specifies an embedded PAC (Proxy Auto-Config) script. This setting takes effect only when using `manual` proxy mode and has precedence over the `--override-proxy-pac` flag.
- `--proxy-enable-kerberosntlm`: Enables Kerberos and NTLM proxy authentication. If you are enabling this, ensure your proxy server is properly configured for Kerberos/NTLM authentication.

> **Important:**
>
> Addresses passed to `--override-proxy-http` and `--override-proxy-https` are validated during installation, and an invalid value fails the install:
>
> - The address must include a port, for example `http://proxy.example.com:3128`. An address with no port is rejected.
> - The address must not include credentials. Use `--proxy-enable-kerberosntlm` for authenticated proxies.
> - If you omit the scheme, `http://` is added for you. `http://`, `https://`, and `socks5://` are accepted.

###### Example of specifying PAC file

```console
$ sudo /Applications/Docker.app/Contents/MacOS/install --user testuser --proxy-http-mode="manual" --override-proxy-pac="http://localhost:8080/myproxy.pac"
```

###### Example of specifying PAC script

```console
$ sudo /Applications/Docker.app/Contents/MacOS/install --user testuser --proxy-http-mode="manual" --override-proxy-embedded-pac="function FindProxyForURL(url, host) { return \"DIRECT\"; }"
```

> **Tip:**
>
> As an IT administrator, you can use endpoint management (MDM) software to identify the number of Docker Desktop instances and their versions within your environment. This can provide accurate license reporting, help ensure your machines use the latest version of Docker Desktop, and enable you to enforce sign-in.
> - Intune
> - Jamf
> - Kandji
> - Kolide
> - Workspace One

## Where to go next

- Explore Docker's subscriptions to see what Docker can offer you.
- Build and share a containerized application.
- Explore Docker Desktop and all its features.
- Troubleshooting describes common problems, workarounds, how
  to run and submit diagnostics, and submit issues.
- FAQs provide answers to frequently asked questions.
- Release notes lists component updates, new features, and improvements associated with Docker Desktop releases.
- Back up and restore data provides instructions
  on backing up and restoring data related to Docker.
