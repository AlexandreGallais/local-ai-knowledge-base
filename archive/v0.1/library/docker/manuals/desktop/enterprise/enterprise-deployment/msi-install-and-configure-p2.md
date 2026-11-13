---
title: "MSI installer (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/enterprise-deployment/msi-install-and-configure.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# MSI installer (part 2 of 2)

## Install from the command line

This section covers command line installations of Docker Desktop using PowerShell. It provides common installation commands that you can run. You can also add additional arguments which are outlined in configuration options.

When installing Docker Desktop, you can choose between interactive or non-interactive installations.

Interactive installations, without specifying `/quiet` or `/qn`, display the user interface and let you select your own properties.

When installing via the user interface it's possible to:

- Choose the destination folder
- Create a desktop shortcut
- Configure the Docker Desktop service startup type
- Disable Windows Containers
- Choose between the WSL or Hyper-V engine

Non-interactive installations are silent and any additional configuration must be passed as arguments.

### Common installation commands

Admin rights are required to run any of the following commands.

#### Install interactively with verbose logging

```powershell
msiexec /i "DockerDesktop.msi" /L*V ".\msi.log"
```

#### Install interactively without verbose logging

```powershell
msiexec /i "DockerDesktop.msi"
```

#### Install non-interactively with verbose logging

```powershell
msiexec /i "DockerDesktop.msi" /L*V ".\msi.log" /quiet
```

#### Install non-interactively and suppressing reboots

```powershell
msiexec /i "DockerDesktop.msi" /L*V ".\msi.log" /quiet /norestart
```

#### Install non-interactively with admin settings

```powershell
msiexec /i "DockerDesktop.msi" /L*V ".\msi.log" /quiet /norestart ADMINSETTINGS="{""configurationFileVersion"":2,""enhancedContainerIsolation"":{""value"":true,""locked"":false}}" ALLOWEDORG="your-organization"
```

#### Install non-interactively and allow users to switch to Windows containers without admin rights

```powershell
msiexec /i "DockerDesktop.msi" /L*V ".\msi.log" /quiet /norestart ALLOWEDORG="your-organization" ALWAYSRUNSERVICE=1
```

#### Install interactively specifying a PAC file

```powershell
PowerShell
 msiexec --% /i "DockerDesktop.msi" /L*V ".\msi.log"  PROXYHTTPMODE="manual" OVERRIDEPROXYPAC="http://localhost:8080/myproxy.pac"
```

#### Install interactively specifying a PAC script

```powershell
PowerShell
 msiexec --% /i "DockerDesktop.msi" /L*V ".\msi.log"  PROXYHTTPMODE="manual" OVERRIDEPROXYEMBEDDEDPAC="function FindProxyForURL(url,host) {return ""DIRECT"" ;; }"
```

#### Install with the passive display option

You can use the `/passive` display option instead of `/quiet` when you want to perform a non-interactive installation but show a progress dialog.

In passive mode the installer doesn't display any prompts or error messages to the user and the installation cannot be cancelled.

For example:

```powershell
msiexec /i "DockerDesktop.msi" /L*V ".\msi.log" /passive /norestart
```

> **Tip:**
>
> When creating a value that expects a JSON string:
>
> - The property expects a JSON formatted string
> - The string should be wrapped in double quotes
> - The string shouldn't contain any whitespace
> - Property names are expected to be in double quotes

### Common uninstall commands

When uninstalling Docker Desktop, you need to use the same `.msi` file that was originally used to install the application.

If you no longer have the original `.msi` file, you need to use the product code associated with the installation. To find the product code, run:

```powershell
Get-WmiObject Win32_Product | Select-Object IdentifyingNumber, Name | Where-Object {$_.Name -eq "Docker Desktop"}
```

It should return output similar to the following:

```text
IdentifyingNumber                      Name
-----------------                      ----
{10FC87E2-9145-4D7D-B493-2E99E8D8E103} Docker Desktop
```

> **Note:**
>
> This command may take some time, depending on the number of installed applications.

`IdentifyingNumber` is the applications product code and can be used to uninstall Docker Desktop. For example:

```powershell
msiexec /x {10FC87E2-9145-4D7D-B493-2E99E8D8E103} /L*V ".\msi.log" /quiet
```

#### Uninstall interactively with verbose logging

```powershell
msiexec /x "DockerDesktop.msi" /L*V ".\msi.log"
```

#### Uninstall interactively without verbose logging

```powershell
msiexec /x "DockerDesktop.msi"
```

#### Uninstall non-interactively with verbose logging

```powershell
msiexec /x "DockerDesktop.msi" /L*V ".\msi.log" /quiet
```

#### Uninstall non-interactively without verbose logging

```powershell
msiexec /x "DockerDesktop.msi" /quiet
```

### Configuration options

In addition to the following custom properties, the Docker Desktop MSI installer also supports the standard Windows Installer command line options.

| Property                           | Description                                                                                                                                                                                                                                                                                   | Default                 |
| :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------- |
| `ENABLEDESKTOPSHORTCUT`            | Creates a desktop shortcut.                                                                                                                                                                                                                                                                   | 1                       |
| `INSTALLFOLDER`                    | Specifies a custom location where Docker Desktop will be installed.                                                                                                                                                                                                                           | C:\Program Files\Docker |
| `ADMINSETTINGS`                    | Automatically creates an `admin-settings.json` file which is used to control certain Docker Desktop settings on client machines within organizations. It must be used together with the `ALLOWEDORG` property. If you pass `ADMINSETTINGS` on its own, the installation still succeeds but no `admin-settings.json` file is written and no error is reported. | None                    |
| `ALLOWEDORG`                       | Requires the user to sign in and be a member of the specified Docker Hub organization namespace when running the application. Use the namespace, not the organization display name. This creates a registry key <example-value> `allowedOrgs` in `HKLM\Software\Policies\Docker\Docker Desktop`. For configuration details, see Configure sign-in enforcement. | None                    |
| `ALWAYSRUNSERVICE`                 | Lets users switch to Windows containers without needing admin rights                                                                                                                                                                                                                          | 0                       |
| `DISABLEWINDOWSCONTAINERS`         | Disables the Windows containers integration                                                                                                                                                                                                                                                   | 1                       |
| `ENGINE`                           | Sets the Docker Engine that's used to run containers. This can be `wsl`, `hyperv`, `windows`, or `docker-vmm`. The installation wizard only offers `wsl` and `hyperv`. The others are command line only. `docker-vmm` (Beta, x86_64 only) is available with Docker Desktop version 4.90 and later.                                                                                                                                                                                       | `wsl`                   |
| `PROXYENABLEKERBEROSNTLM`          | When set to 1, enables support for Kerberos and NTLM proxy authentication.                                                                                                                                                                                                                    | 0                       |
| `PROXYHTTPMODE`                    | Sets the HTTP Proxy mode. This can be either `system` or `manual`                                                                                                                                                                                                                             | `system`                |
| `OVERRIDEPROXYHTTP`                | Sets the URL of the HTTP proxy that must be used for outgoing HTTP requests.                                                                                                                                                                                                                  | None                    |
| `OVERRIDEPROXYHTTPS`               | Sets the URL of the HTTP proxy that must be used for outgoing HTTPS requests.                                                                                                                                                                                                                 | None                    |
| `OVERRIDEPROXYEXCLUDE`             | Bypasses proxy settings for the hosts and domains. Uses a comma-separated list.                                                                                                                                                                                                               | None                    |
| `OVERRIDEPROXYPAC`                 | Sets the PAC file URL. This setting takes effect only when using `manual` proxy mode.                                                                                                                                                                                                         | None                    |
| `OVERRIDEPROXYEMBEDDEDPAC`         | Specifies an embedded PAC (Proxy Auto-config) script. This setting takes effect only when using `manual` proxy mode and has precedence over the `OVERRIDEPROXYPAC` flag.                                                                                                                      | None                    |
| `HYPERVDEFAULTDATAROOT`            | Specifies the default location for the Hyper-V VM disk.                                                                                                                                                                                                                                       | None                    |
| `WINDOWSCONTAINERSDEFAULTDATAROOT` | Specifies the default location for Windows containers.                                                                                                                                                                                                                                        | None                    |
| `WSLDEFAULTDATAROOT`               | Specifies the default location for the WSL distribution disk.                                                                                                                                                                                                                                 | None                    |
| `DISABLEANALYTICS`                 | When set to 1, analytics collection will be disabled for the MSI. For more information, see Analytics.                                                                                                                                                                          | 0                       |
| `REMOVEEXISTINGINSTALL`            | When set to 1, an existing all-users EXE installation is uninstalled before the MSI installs, and settings and content are preserved. Has no effect on per-user EXE installations, which must be removed by the users who own them.   | 1 |

Additionally, you can also use `/norestart` or `/forcerestart` to control reboot behaviour.

By default, the installer reboots the machine after a successful installation. When run silently, the reboot is automatic and the user is not prompted.

## Analytics

The MSI installer collects anonymous usage statistics relating to installation only. This is to better understand user behaviour and to improve the user experience by identifying and addressing issues or optimizing popular features.

### How to opt-out

**From the GUI**

When you install Docker Desktop from the default installer GUI, select the **Disable analytics** checkbox located on the bottom-left corner of the **Welcome** dialog.

**From the command line**

When you install Docker Desktop from the command line, use the `DISABLEANALYTICS` property.

```powershell
msiexec /i "DockerDesktop.msi" /L*V ".\msi.log" DISABLEANALYTICS=1
```

### Persistence

If you decide to disable analytics for an installation, your choice is persisted in the registry and honoured across future upgrades and uninstalls.

However, the key is removed when Docker Desktop is uninstalled and must be configured again via one of the previous methods.

The registry key is as follows:

```powershell
SOFTWARE\Docker Inc.\Docker Desktop\DisableMsiAnalytics
```

When analytics is disabled, this key is set to `1`.

## Additional resources

- Explore the FAQs
