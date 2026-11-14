---
title: "Install .NET on Windows (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/windows.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install .NET on Windows

>
> - Install on Windows
> - Install on macOS
> - Install on Linux

This article teaches you about which versions of .NET are supported on Windows, how to install .NET, and what the difference is between the SDK and runtime.

Unlike .NET Framework, .NET isn't tied to your version of Windows. You can only have a single version of .NET Framework installed on Windows. But .NET is standalone and can be installed anywhere on your computer. Some apps might include their own copy of .NET.

By default, .NET is installed to the _Program Files\\dotnet_ directory on your computer, unless the installation method chooses a different directory.

> **Important:**
> If you're installing .NET system-wide, install with administrative privileges.

.NET is made up of the runtime and the SDK. The runtime runs .NET apps, and the SDK is used to create apps.

## Choose the correct runtime

There are three different runtimes for Windows, which enable different types of apps to run. The SDK includes all three runtimes, and an installer for a runtime might include an additional runtime. The following table describes which runtime is included with a particular .NET installer:

| Installer                | Includes .NET Runtime | Includes .NET Desktop Runtime | Includes ASP.NET Core Runtime |
|--------------------------|-----------------------|-------------------------------|-------------------------------|
| **.NET Runtime**         | Yes                   | No                            | No                            |
| **.NET Desktop Runtime** | Yes                   | Yes                           | No                            |
| **ASP.NET Core Runtime** | No                    | No                            | Yes                           |
| **.NET SDK**             | Yes                   | Yes                           | Yes                           |

To ensure that you can run all .NET apps on Windows, install both the ASP.NET Core Runtime and the .NET Desktop Runtime. The ASP.NET Core Runtime runs web-based apps, and the .NET Desktop Runtime runs desktop apps, such as a Windows Presentation Foundation (WPF) or Windows Forms app.

## Choose how to install .NET

There are different ways to install .NET, and some products might manage their own version of .NET. If you install .NET through software that manages its own version of .NET, it might not be enabled system-wide. Make sure you understand the implications of installing .NET through other software.

If you're unsure which method you should choose after reviewing the lists in the following sections, you probably want to use the .NET Installer.

### Developers

- Visual Studio

  Use **Visual Studio** to install .NET when you want to develop .NET apps using Visual Studio. Visual Studio manages its own copy of .NET. This method installs the SDK, Runtime, and Visual Studio templates.

- Visual Studio Code - C# Dev Kit

  Install the **C# Dev Kit** extension for Visual Studio Code to develop .NET apps. The extension can use an SDK that's already installed or install one for you.

### Users and developers

- .NET Installer

  Install .NET with a Windows Installer package, which is an executable that you run. This method can install the SDK and Runtime. Installs are performed system-wide.

- Windows Package Manager (WinGet)

  Use **WinGet** to install .NET when you want to manage .NET through the command line. This method can install the SDK and Runtime. Installs are performed system-wide.

- dotnetup

  Use dotnetup to manage user-level .NET SDK and runtime installations across Windows, macOS, and Linux.

- PowerShell

  A PowerShell script that can automate the install of the SDK or Runtime. You can choose which version of .NET to install.

## Supported versions

The following table is a list of currently supported .NET releases and the versions of Windows they're supported on. These versions remain supported until either the version of .NET reaches end-of-support or the version of Windows reaches end-of-life.

> **Tip:**
> As a reminder, this table applies to modern .NET (as opposed to .NET Framework). To install .NET Framework, see the .NET Framework installation guide.

Windows 10 support is limited to Long-Term Servicing Channel (LTSC) and Enterprise editions only. Check the Windows lifecycle fact sheet for specific details.

| Operating System                      | .NET 11 (Architectures) | .NET 10 (Architectures) |
|---------------------------------------|-------------------------|-------------------------|
| Windows 11 (26H1, 25H2, 24H2, 23H2 Ent/Edu) | ✔️ x64, x86, Arm64 | ✔️ x64, x86, Arm64 |
| Windows 10 (21H2, 1809, 1607 LTSC/Enterprise) | ✔️ x64, x86, Arm64 | ✔️ x64, x86, Arm64 |
| Windows Server (2025, 23H2, 2022, 2019, 2016, 2012 R2, 2012) | ✔️ x64 | ✔️ x64 |
| Windows Server Core (2025, 2022, 2019, 2016, 2012 R2, 2012) | ✔️ x64 | ✔️ x64 |
| Nano Server (2025, 2022, 2019)        | ✔️ x64                 | ✔️ x64                 |
| Windows 8.1                           | ❌                     | ❌                     |
| Windows 7 SP1 ESU              | ❌                     | ❌                     |

### Windows 7 / 8.1 / Server 2012

There is no longer a version of .NET that's supported on **Windows 7 and Windows 8.1**. The last supported releases was .NET 6 and support ended on November 12, 2024.

**Windows Server 2012** is still supported by any version of .NET that's still in support.

All three of these versions of Windows require further dependencies to be installed:

| Operating System         | Prerequisites                                                                    |
|--------------------------|----------------------------------------------------------------------------------|
| Windows 7 SP1 ESU | - Microsoft Visual C++ 2015-2019 Redistributable 64-bit / 32-bit  - KB3063858 64-bit / 32-bit  - Microsoft Root Certificate Authority 2011 (.NET Core 2.1 offline installer only) |
| Windows 8.1              | Microsoft Visual C++ 2015-2019 Redistributable 64-bit / 32-bit |
| Windows Server 2012      | Microsoft Visual C++ 2015-2019 Redistributable 64-bit / 32-bit |
| Windows Server 2012 R2   | Microsoft Visual C++ 2015-2019 Redistributable 64-bit / 32-bit |

The previous requirements are also required if you receive an error related to either of the following dlls:

- *api-ms-win-crt-runtime-l1-1-0.dll*
- *api-ms-win-cor-timezone-l1-1-0.dll*
- *hostfxr.dll*

## Arm-based Windows PCs

.NET is supported on Arm-based Windows PCs. The following sections describe things you should consider when installing .NET.

### Path differences

On an Arm-based Windows PC, all Arm64 versions of .NET are installed to the normal _C:\\Program Files\\dotnet\\_ folder. However, the **x64** version of the .NET SDK is installed to the _C:\\Program Files\\dotnet\\x64\\_ folder.

### Path variables

Environment variables that add .NET to system path, such as the `PATH` variable, might need to be changed if you have both the x64 and Arm64 versions of the .NET SDK installed. Additionally, some tools rely on the `DOTNET_ROOT` environment variable, which would also need to be updated to point to the appropriate .NET SDK installation folder.

## Install with Visual Studio

Visual Studio installs its own copy of .NET separate from other copies of .NET. Different versions of Visual Studio support different versions of .NET. The latest version of Visual Studio always supports the latest version of .NET.

> Download Visual Studio Installer

Visual Studio Installer installs and configures Visual Studio. Some Visual Studio workloads include .NET, such as **ASP.NET and web development** and **.NET Multi-platform App UI development**. Specific versions of .NET can be installed through the **Individual Components** tab.

The Visual Studio documentation provides instructions on how to:

- Install Visual Studio.
- Configure Visual Studio workloads.

### .NET versions and Visual Studio

If you're using Visual Studio to develop .NET apps, the following table describes the minimum required version of Visual Studio based on the target .NET SDK version.

| .NET SDK version      | Visual Studio version                       |
| --------------------- | ------------------------------------------- |
| 10                    | Visual Studio 2026 version 18.0 or higher.  |
| 9                     | Visual Studio 2022 version 17.12 or higher. |
| 8                     | Visual Studio 2022 version 17.8 or higher.  |
| 7                     | Visual Studio 2022 version 17.4 or higher.  |
| 6                     | Visual Studio 2022 version 17.0 or higher.  |
| 5                     | Visual Studio 2019 version 16.8 or higher.  |
| 3.1                   | Visual Studio 2019 version 16.4 or higher.  |
| 3.0                   | Visual Studio 2019 version 16.3 or higher.  |
| 2.2                   | Visual Studio 2017 version 15.9 or higher.  |
| 2.1                   | Visual Studio 2017 version 15.7 or higher.  |

If you already have Visual Studio installed, you can check your version with the following steps.

01. Open Visual Studio.
01. Select **Help** > **About Microsoft Visual Studio**.
01. Read the version number from the **About** dialog.

For more information about, see .NET SDK, MSBuild, and Visual Studio versioning.

## Install with Visual Studio Code

Visual Studio Code is a powerful and lightweight source code editor that runs on your desktop. Visual Studio Code can use the SDK already installed on your system.

> **Important:**
> If you're installing .NET system-wide, install with administrative privileges.

This WinGet configuration file installs the latest .NET SDK, Visual Studio Code and the C# DevKit. If you already have any of them installed, WinGet will skip that step.

01. Download the file and double-click to run it.
01. Read the license agreement, type `y`, and select `Enter` when prompted to accept.
01. If you get a flashing User Account Control (UAC) prompt in your Taskbar, allow the installation to continue.

Additionally, the C# Dev Kit extension will install .NET for you if it's not already installed.

For instructions on installing .NET through Visual Studio Code, see Getting Started with C# in VS Code.
