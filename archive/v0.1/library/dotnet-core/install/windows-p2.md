---
title: "Install .NET on Windows (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/install/windows.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Install .NET on Windows (part 2 of 3)

## .NET installer

The download page for .NET provides Windows Installer executables.

> **Important:**
> If you're installing .NET system-wide, install with administrative privileges.

1. Open a web browser and navigate to <https://dotnet.microsoft.com/download/dotnet>.
1. Select the version of .NET you want to download, such as 10.0.
1. Find the SDK or Runtime box that contains the links for downloading .NET.
1. Under the **Installers** column, find the **Windows** row and select the link for your CPU architecture. If you're unsure, select **x64** as it's the most common.

   The browser should automatically download the installer.

   > **Tip:**
   > The following image shows the SDK, but you can also download the Runtime.

1. Open Windows Explorer and navigate to where the file was downloaded, most likely your **Downloads** folder.
1. Double-click on the file to install .NET.

   The Windows Installer dialog is opened.

1. Select **Install** and follow the instructions to install .NET.

To learn how to use the .NET CLI, see .NET CLI overview.

### Command-line options

Use the `/?` parameter to display a list of options.

If you want to install .NET silently, such as in a production environment or to support continuous integration, use the following options:

- `/install`\
Installs .NET.

- `/quiet`\
Prevents any UI and prompts from displaying.

- `/norestart`\
Suppresses any attempts to restart.

```console
dotnet-sdk-9.0.100-win-x64.exe /install /quiet /norestart
```

If you've already installed .NET, use the .NET Installer to manage the installation. Instead of `/install`, use one of the following options:

- `/uninstall`\
Remove this version of .NET.

- `/repair`\
Check if the installations key files or components are damaged and restore them.

> **Tip:**
> The installer returns an exit code of **0** for success and an exit code of **3010** to indicate that a restart is required. Any other value is most likely an error code.

### Microsoft Update

The .NET installer executables are independent products that can be serviced using Microsoft Update (MU) on Windows. MU is different to Windows Update (WU), which is used to service operating system components like .NET Framework.

Both security and non-security fixes for supported versions of .NET are provided through MU using multiple distribution channels. Automatic Updates (AU) is relevant to end users and consumers, while Window Server Update Services (WSUS) and Windows Update Catalog are relevant to IT administrators.

The .NET installer executables support side-by-side (SxS) installations across major and minor releases for different architectures and components, such as the runtime and SDK. For example, you can install both the 6.0.15 (x64) and 6.0.17 (x86) runtime. When MU triggers, it will offer the latest installer for both installations.

#### Block updates

While most users prefer to be kept up to date, it is possible to block .NET updates using the registry keys in the following table.

| .NET version | Registry key | Name | Type | Value |
| -------------- | :--------- | :---------- | :---------- | :---------- |
| All | HKLM\SOFTWARE\Microsoft\\.NET | BlockMU | REG_DWORD | 0x00000001 |
| .NET 10 | HKLM\SOFTWARE\Microsoft\\.NET\10.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 9 | HKLM\SOFTWARE\Microsoft\\.NET\9.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 8 | HKLM\SOFTWARE\Microsoft\\.NET\8.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 7 | HKLM\SOFTWARE\Microsoft\\.NET\7.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 6 | HKLM\SOFTWARE\Microsoft\\.NET\6.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 5 | HKLM\SOFTWARE\Microsoft\\.NET\5.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET Core 3.1 | HKLM\SOFTWARE\Microsoft\\.NET\3.1 | BlockMU | REG_DWORD | 0x00000001 |
| .NET Core 2.1 | HKLM\SOFTWARE\Microsoft\\.NET\2.1 | BlockMU | REG_DWORD | 0x00000001 |

#### Automatic updates for Server OS

Updates for server operating systems are supported by WSUS and Microsoft Update Catalog, but not AU. Server operating systems can opt in to receive updates through AU using the following registry keys.

| .NET version | Registry key | Name | Type | Value |
| -------------- | :--------- | :---------- | :---------- | :---------- |
| All | HKLM\SOFTWARE\Microsoft\\.NET | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 10 | HKLM\SOFTWARE\Microsoft\\.NET\10.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 9 | HKLM\SOFTWARE\Microsoft\\.NET\9.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 8 | HKLM\SOFTWARE\Microsoft\\.NET\8.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 7 | HKLM\SOFTWARE\Microsoft\\.NET\7.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 6 | HKLM\SOFTWARE\Microsoft\\.NET\6.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 5 | HKLM\SOFTWARE\Microsoft\\.NET\5.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET Core 3.1 | HKLM\SOFTWARE\Microsoft\\.NET\3.1 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |

#### WSUS and update classifications

WSUS can be configured to provide specific updates based on their classification. Updates for .NET are classified as either *security* or *critical*. If the latest update is classified as critical, an older *security* update might be offered when an older version of .NET is installed that's superseded by the latest security update. This also applies to using the offline CAB (Wsusscan2.cab) to scan a machine.

> **Note:**
> In some cases, WSUS might report a missing update for a version that's older than the .NET version you installed. For example, imagine a user installs .NET 6.0.36, the latest release of .NET 6. This version is classified as a critical (non-security) update. Then an application installs an older version, 6.0.33. (It's not uncommon for applications to include specific versions of .NET as a prerequisite.) If an admin configured WSUS to only provide security updates, the next scan will report 6.0.35 as a missing update. Machines configured to receive *security* updates through AU or WSUS will be offered 6.0.35, even when 6.0.36 is installed. The reason for this is that 6.0.35 supersedes 6.0.33 and is the latest *security* update.

### Choose when previous versions are removed

The installer executables always install new content before removing the previous installation. Applications that are running might be interrupted or crash when older runtimes are removed. To minimize the impact of updating .NET, you can specify when a previous .NET installation should be removed using a registry key.

| .NET version | Registry key | Name | Type | Value |
| -------------- | :--------- | :---------- | :---------- | :---------- |
| All | HKLM\SOFTWARE\Microsoft\\.NET | RemovePreviousVersion | REG_SZ | `always`, `never`, or `nextSession` |
| .NET 10 | HKLM\SOFTWARE\Microsoft\\.NET\10.0 | RemovePreviousVersion | REG_SZ | `always`, `never`, or `nextSession` |
| .NET 9 | HKLM\SOFTWARE\Microsoft\\.NET\9.0 | RemovePreviousVersion | REG_SZ | `always`, `never`, or `nextSession` |
| .NET 8 | HKLM\SOFTWARE\Microsoft\\.NET\8.0 | RemovePreviousVersion | REG_SZ | `always`, `never`, or `nextSession` |

- `never` retains previous installations and requires manual intervention to remove previous .NET installations.
- `always` removes previous installations after the new version is installed. This is the default behavior in .NET.
- `nextSession` defers the removal until the next logon session from members in the Administrators group.
- Values are case-insensitive and invalid values default to `always`.

When the removal is deferred, the installer writes a command to the RunOnce registry key to uninstall the previous version. The command only executes if a user in the Administrators group logs on to the machine.

> **Note:**
> This feature is only available starting with .NET 8 (8.0.11). It only applies to the standalone installer executables and impacts distributions like WinGet that use them.

## Install with Windows Package Manager (WinGet)

You can install and manage .NET through the Windows Package Manager service, using the `winget.exe` tool. For more information about how to install and use **WinGet**, see Use the winget tool to install and manage applications.

> **Important:**
> If you're installing .NET system-wide, install with administrative privileges.

The .NET WinGet packages are:

- `Microsoft.DotNet.Runtime.10`—.NET Runtime 10.0
- `Microsoft.DotNet.AspNetCore.10`—ASP.NET Core Runtime 10.0
- `Microsoft.DotNet.DesktopRuntime.10`—.NET Desktop Runtime 10.0
- `Microsoft.DotNet.SDK.10`—.NET SDK 10.0
- `Microsoft.DotNet.Runtime.9`—.NET Runtime 9.0
- `Microsoft.DotNet.AspNetCore.9`—ASP.NET Core Runtime 9.0
- `Microsoft.DotNet.DesktopRuntime.9`—.NET Desktop Runtime 9.0
- `Microsoft.DotNet.SDK.9`—.NET SDK 9.0
- `Microsoft.DotNet.Runtime.8`—.NET Runtime 8.0
- `Microsoft.DotNet.AspNetCore.8`—ASP.NET Core Runtime 8.0
- `Microsoft.DotNet.DesktopRuntime.8`—.NET Desktop Runtime 8.0
- `Microsoft.DotNet.SDK.8`—.NET SDK 8.0

### Install the SDK

If you install the SDK, you don't need to install the corresponding runtime.

01. Install WinGet.
01. Open a terminal, such as PowerShell or Command Prompt.
01. Run the `winget install` command and pass the name of the SDK package:

    ```cmd
    winget install Microsoft.DotNet.SDK.10
    ```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

There are different runtimes you can install. Refer to the Choose the correct runtime section to understand what's included with each runtime.

01. Install WinGet.
01. Open a terminal, such as **PowerShell** or **Command Prompt**.
01. Run the `winget install` command and pass the name of the SDK package:

    ```cmd
    winget install Microsoft.DotNet.DesktopRuntime.10
    winget install Microsoft.DotNet.AspNetCore.10
    ```

To learn how to use the .NET CLI, see .NET CLI overview.

### Search for versions

Use the `winget search` command to search for different versions of the package you want to install. For example, the following command searches for all .NET SDKs available via WinGet:

```cmd
winget search Microsoft.DotNet.SDK
```

The search results are printed in a table with each package identifier.

```output
Name                            Id                           Version                 Source
--------------------------------------------------------------------------------------------
Microsoft .NET SDK 3.1          Microsoft.DotNet.SDK.3_1     3.1.426                 winget
Microsoft .NET SDK 5.0          Microsoft.DotNet.SDK.5       5.0.408                 winget
Microsoft .NET SDK 6.0          Microsoft.DotNet.SDK.6       6.0.428                 winget
Microsoft .NET SDK 7.0          Microsoft.DotNet.SDK.7       7.0.410                 winget
Microsoft .NET SDK 8.0          Microsoft.DotNet.SDK.8       8.0.415                 winget
Microsoft .NET SDK 9.0          Microsoft.DotNet.SDK.9       9.0.306                 winget
Microsoft .NET SDK 10.0         Microsoft.DotNet.SDK.10      10.0.100                winget
```

### Install preview versions

If a preview version is available, substitute the version number in the **Id** with the word `Preview`. The following example installs the preview release of the .NET Desktop Runtime:

```cmd
winget install Microsoft.DotNet.DesktopRuntime.Preview
```

## Install with PowerShell

Installing .NET through the `dotnet-install` PowerShell script is recommended for continuous integration and nonadmin installs. If you're installing .NET for normal use on your system, use either the .NET Installer or Windows Package Manager installation methods.

The script defaults to installing the latest long term support (LTS) version, which is .NET 10. You can choose a specific release by specifying the `-Channel` switch. Include the `-Runtime` switch to install a runtime. Otherwise, the script installs the SDK. The script is available at <https://dot.net/v1/dotnet-install.ps1> and the source code is hosted on GitHub.

> Download the script

For more information about the script, see dotnet-install script reference.

### Install the runtime

The .NET Runtime is installed by providing the `-Runtime` switch.

01. Download the install script from <https://dot.net/v1/dotnet-install.ps1>
01. Open PowerShell and navigate to the folder containing the script.
01. Run the following commands to install both the Desktop runtime and ASP.NET Core runtime for maximum compatibility:

    ```powershell
    dotnet-install.ps1 -Runtime windowsdesktop
    dotnet-install.ps1 -Runtime aspnetcore
    ```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the SDK

If you install the SDK, you don't need to install the runtimes.

01. Download the install script from <https://dot.net/v1/dotnet-install.ps1>
01. Open PowerShell and navigate to the folder containing the script.
01. Run the following command to install the .NET SDK.

    ```powershell
    dotnet-install.ps1
    ```

    > **Note:**
    > The SDK is installed by omitting the `-Runtime` switch.

To learn how to use the .NET CLI, see .NET CLI overview.
