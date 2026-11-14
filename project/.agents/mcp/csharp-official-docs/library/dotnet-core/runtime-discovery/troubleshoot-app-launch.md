---
title: "Troubleshoot app launch failures"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/runtime-discovery/troubleshoot-app-launch.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Troubleshoot app launch failures

This article describes some common reasons and possible solutions for application launch failures. It relates to framework-dependent applications, which rely on a .NET installation on your machine.

If you already know which .NET version you need, you can download it from .NET downloads.

## .NET installation not found

If a .NET installation isn't found, the application fails to launch with a message similar to:

**os-windows:**

```console
You must install .NET to run this application.

App: C:\repos\myapp\myapp.exe
Architecture: x64
Host version: 7.0.0
.NET location: Not found
```

**os-linux:**

```console
You must install .NET to run this application.

App: /home/user/repos/myapp/myapp
Architecture: x64
Host version: 7.0.0
.NET location: Not found
```

This may be due to a package mix-up.

Global installs are registered in `/etc/dotnet/install_location`. On some systems, architecture-specific files are also present, such as `/etc/dotnet/install_location_arm64`.

**os-macos:**

```console
You must install .NET to run this application.

App: /home/user/repos/myapp/myapp
Architecture: x64
Host version: 7.0.0
.NET location: Not found
```

Global installs are registered in `/etc/dotnet/install_location`. On some systems, architecture-specific files are also present, such as `/etc/dotnet/install_location_arm64`.

The error message includes a link to download .NET. You can follow that link to get to the appropriate download page. You can also pick the .NET version (specified by `Host version`) from .NET downloads.

**os-windows,os-macos:**
On the download page for the required .NET version, find the **.NET Runtime** download that matches the architecture listed in the error message. You can then install it by downloading and running an **Installer**.

**os-linux:**
.NET is available through various Linux package managers. For more information, see Install .NET on Linux. (Preview versions of .NET aren't typically available through package managers.)

You need to install the .NET Runtime package for the appropriate version, like `dotnet-runtime-10.0`.

Alternatively, on the download page for the required .NET version, you can download **Binaries** for the specified architecture.

## Required framework not found

If a required framework or compatible version isn't found, the application fails to launch with a message similar to:

**os-windows:**

```console
You must install or update .NET to run this application.

App: C:\repos\myapp\myapp.exe
Architecture: x64
Framework: 'Microsoft.NETCore.App', version '5.0.15' (x64)
.NET location: C:\Program Files\dotnet\

The following frameworks were found:
  6.0.2 at [c:\Program Files\dotnet\shared\Microsoft.NETCore.App]
```

**os-linux:**

```console
You must install or update .NET to run this application.

App: /home/user/repos/myapp/myapp
Architecture: x64
Framework: 'Microsoft.NETCore.App', version '5.0.15' (x64)
.NET location: /usr/share/dotnet/

The following frameworks were found:
  6.0.2 at [/usr/share/dotnet/shared/Microsoft.NETCore.App]
```

**os-macos:**

```console
You must install or update .NET to run this application.

App: /home/user/repos/myapp/myapp
Architecture: x64
Framework: 'Microsoft.NETCore.App', version '5.0.15' (x64)
.NET location: /usr/local/share/dotnet/

The following frameworks were found:
  6.0.2 at [/usr/local/share/dotnet/shared/Microsoft.NETCore.App]
```

The error indicates the name, version, and architecture of the missing framework and the location at which it's expected to be installed. To run the application, you can install a compatible runtime at the specified ".NET location". If the application targets a lower version than one you have installed and you'd like to run it on a higher version, you can also configure roll-forward behavior for the application.

### Install a compatible runtime

The error message includes a link to download the missing framework. You can follow this link to get to the appropriate download page.

Alternately, you can download a runtime from the .NET downloads page. There are multiple .NET runtime downloads.

The following table shows the frameworks that each runtime contains.

**os-windows:**

| Runtime download     | Included frameworks                                    |
| -------------------- | ------------------------------------------------------ |
| ASP.NET Core Runtime | Microsoft.NETCore.AppMicrosoft.AspNetCore.App     |
| .NET Desktop Runtime | Microsoft.NETCore.AppMicrosoft.WindowsDesktop.App |
| .NET Runtime         | Microsoft.NETCore.App                                  |

**os-linux,os-macos:**

| Runtime download     | Included frameworks                                |
| -------------------- | -------------------------------------------------- |
| ASP.NET Core Runtime | Microsoft.NETCore.AppMicrosoft.AspNetCore.App |
| .NET Runtime         | Microsoft.NETCore.App                              |

Select a runtime download that contains the missing framework, and then install it.

**os-windows,os-macos:**
On the download page for the required .NET version, find the runtime download that matches the architecture listed in the error message. You likely want to download an **Installer**.

**os-linux:**
.NET is available through various Linux package managers. See Install .NET on Linux for details. (Preview versions of .NET aren't typically available through package managers.)

You need to install the .NET runtime package for the appropriate version, like `dotnet-runtime-10.0` or `aspnetcore-runtime-10.0`.

Alternatively, on the download page for the required .NET version, you can download **Binaries** for the specified architecture.

In most cases, when the application that failed to launch is using such an installation, the ".NET location" in the error message points to:
**os-windows:**
`%ProgramFiles%\dotnet`

**os-linux:**
`/usr/share/dotnet/`

**os-macos:**
`/usr/local/share/dotnet/`

## Check the DOTNET_ROOT environment variable

The `DOTNET_ROOT` environment variable tells the application where to find the `dotnet` driver and the frameworks it needs. If this variable is set incorrectly, or points to a location that doesn't contain a valid .NET installation, the app fails to launch even when .NET is installed elsewhere on the machine.

Common problems to look for:

- **Variable points to wrong location** — `DOTNET_ROOT` may be set to a path from a previous .NET installation, a CI environment, or a script that no longer reflects the current install location.
- **Variable is set when it shouldn't be** — If `DOTNET_ROOT` is set in the environment, .NET skips the default install location entirely. Remove or update the variable if .NET has moved.
- **Architecture mismatch** — Use the architecture-specific variant when running 32-bit apps on a 64-bit machine. For example, set `DOTNET_ROOT_X86` to point to the 32-bit installation. For more information, see `DOTNET_ROOT` environment variable.

To diagnose, print the current value of the variable and confirm it points to a directory that contains a valid .NET installation:

**os-windows:**

```powershell
echo $env:DOTNET_ROOT
```

**os-linux,os-macos:**

```bash
echo $DOTNET_ROOT
```

If the variable is set, verify that the path exists and contains the expected .NET version. If the variable isn't set, .NET falls back to the default install location for your platform.

**os-windows:**

### Check the install location

On Windows, .NET searches only one location—the first location where a .NET installation is found. If the framework lookup fails, verify that .NET is installed in the expected location.

When you run the application through `dotnet`, frameworks are searched for in subdirectories relative to `dotnet`. When you run the application through its executable (`apphost`), .NET searches the following locations in order and uses the first one where an installation is found:

1. Subdirectories relative to the `DOTNET_ROOT` environment variable (if set).
1. Globally registered install location (if set) in `HKLM\SOFTWARE\dotnet\Setup\InstalledVersions\<arch>\InstallLocation`.
1. Default install location: `%ProgramFiles%\dotnet` (or `%ProgramFiles(x86)%\dotnet` for 32-bit processes on 64-bit Windows).

If .NET is installed in a non-default location, make sure `DOTNET_ROOT` points to it so the app can find the correct installation.

## Run the dotnet-install script

Use the dotnet-install script when you need a quick, non-admin installation, such as in CI scenarios or temporary environments.

The script installs .NET to a folder that you choose. It doesn't behave like the standard OS installer, and it creates a private installation.

To run an app from that private installation, set the `DOTNET_ROOT` (or the architecture-specific variant) environment variable when you launch through an executable (known as an `apphost`), or launch through the matching `dotnet` host from the same install location.

**os-windows:**
For installation steps on Windows, see Install with PowerShell.

**os-linux:**
For installation steps on Linux, see Install .NET with a script.

**os-macos:**
For installation steps on macOS, see Install .NET with a script.

For script options and behavior details, see dotnet-install scripts reference.

## Download binaries

You can download a binary archive of .NET from the download page. From the **Binaries** column of the runtime download, download the binary release matching the required architecture. Extract the downloaded archive to the ".NET location" specified in the error message.

**os-windows:**
For more information about manual installation, see Install .NET on Windows

**os-linux:**
For more information about manual installation, see Install .NET on Linux

**os-macos:**
For more information about manual installation, see Install .NET on macOS

## Configure roll-forward behavior

If you already have a higher version of the required framework installed, you can make the application run on that higher version by configuring its roll-forward behavior.

When running the application, you can specify the `--roll-forward` command line option or set the `DOTNET_ROLL_FORWARD` environment variable.
By default, an application requires a framework that matches the same major version that the application targets, but can use a higher minor or patch version. However, application developers may have specified a different behavior. For more information, see Framework-dependent apps roll-forward.

> **Note:**
> Since using this option lets the application run on a different framework version than the one for which it was designed, it may result in unintended behavior due to changes between versions of a framework.

## See also

- Install .NET
- .NET install locations
- Check installed .NET versions
- Framework-dependent applications
