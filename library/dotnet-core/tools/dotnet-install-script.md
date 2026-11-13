---
title: "dotnet-install scripts (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-install-script.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet-install scripts reference

> **Note:**
> The behavior of the install script has changed. It downloads .NET from new network locations. For more information, see Critical: .NET Install links are changing.

## Name

`dotnet-install.ps1` | `dotnet-install.sh` - Script used to install the .NET SDK and the shared runtime.

## Synopsis

Windows:

```powershell
dotnet-install.ps1 [-Architecture <ARCHITECTURE>] [-AzureFeed]
    [-Channel <CHANNEL>] [-DryRun] [-FeedCredential]
    [-InstallDir <DIRECTORY>] [-JSonFile <JSONFILE>]
    [-NoPath] [-ProxyAddress] [-ProxyBypassList <LIST_OF_URLS>]
    [-ProxyUseDefaultCredentials] [-Quality <QUALITY>] [-Runtime <RUNTIME>]
    [-SkipNonVersionedFiles] [-UncachedFeed] [-KeepZip] [-ZipPath <PATH>] [-Verbose]
    [-Version <VERSION>]

Get-Help ./dotnet-install.ps1
```

Linux/macOS:

```bash
dotnet-install.sh  [--architecture <ARCHITECTURE>] [--azure-feed]
    [--channel <CHANNEL>] [--dry-run] [--feed-credential]
    [--install-dir <DIRECTORY>] [--jsonfile <JSONFILE>]
    [--no-path] [--quality <QUALITY>]
    [--runtime <RUNTIME>] [--runtime-id <RID>]
    [--skip-non-versioned-files] [--uncached-feed] [--keep-zip] [--zip-path <PATH>] [--verbose]
    [--version <VERSION>]

dotnet-install.sh --help
```

The bash script also reads PowerShell switches, so you can use PowerShell switches with the script on Linux/macOS systems.

## Description

The `dotnet-install` scripts perform a non-admin installation of the .NET SDK, which includes the .NET CLI and the shared runtime. There are two scripts:

* A PowerShell script that works on Windows. For installation instructions, see Install on Windows.
* A bash script that works on Linux/macOS. For installation instructions, see Install on Linux and Install on macOS.

> **Note:**
> .NET collects telemetry data. To learn more and how to opt out, see .NET SDK telemetry.

### Purpose

 The intended use of the scripts is for Continuous Integration (CI) scenarios, where:

* The SDK needs to be installed without user interaction and without admin rights.
* The SDK installation doesn't need to persist across multiple CI runs.

  The typical sequence of events:
  * CI is triggered.
  * CI installs the SDK using one of these scripts.
  * CI finishes its work and clears temporary data including the SDK installation.

To set up a development environment or to run apps, use the installers rather than these scripts.

### Recommended version

We recommend that you use the stable version of the scripts:

- Bash (Linux/macOS): <https://dot.net/v1/dotnet-install.sh>
- PowerShell (Windows): <https://dot.net/v1/dotnet-install.ps1>

The source for the scripts is in the dotnet/install-scripts GitHub repository.

### Script behavior

Both scripts have the same behavior. They download the ZIP/tarball file from the CLI build drops and proceed to install it in either the default location or in a location specified by `-InstallDir|--install-dir`.

By default, the installation scripts download the SDK and install it. If you wish to only obtain the shared runtime, specify the `-Runtime|--runtime` argument.

By default, the script adds the install location to the $PATH for the current session. Override this default behavior by specifying the `-NoPath|--no-path` argument. The script doesn't set the `DOTNET_ROOT` environment variable.

> **Important:**
> The script doesn't add the install location to the user's `PATH` environment variable, you must manually add it.

Before running the script, make sure that your operating system is supported. For more information, see Install .NET on Windows, Linux, and macOS.

You can install a specific version using the `-Version|--version` argument. The version must be specified as a three-part version number, such as `2.1.0`. If the version isn't specified, the script installs the `latest` version.

The install scripts do not update the registry on Windows. They just download the zipped binaries and copy them to a folder. If you want registry key <example-value> to be updated, use the .NET installers.

## Options

- **`-Architecture|--architecture <ARCHITECTURE>`**

  Architecture of the .NET binaries to install. Possible values are `<auto>`, `amd64`, `x64`, `x86`, `arm64`, `arm`, `s390x`, `ppc64le`, and `riscv64`. The default value is `<auto>`, which represents the currently running OS architecture.

- **`-AzureFeed|--azure-feed`**

  For internal use only. Allows using a different storage to download SDK archives from. The default is `https://builds.dotnet.microsoft.com/dotnet`.

- **`-Channel|--channel <CHANNEL>`**

  Specifies the source channel for the installation. The possible values are:

  - `STS`: The most recent Standard Term Support release.
  - `LTS`: The most recent Long Term Support release.
  - Two-part version in A.B format, representing a specific release (for example, `3.1` or `8.0`).
  - Three-part version in A.B.Cxx format, representing a specific SDK release (for example, 8.0.1xx or 8.0.2xx). Available since the 5.0 release.

  The `version` parameter overrides the `channel` parameter when any version other than `latest` is used.

  The default value is `LTS`. For more information on .NET support channels, see the .NET Support Policy page.

- **`-DryRun|--dry-run`**

  If set, the script won't perform the installation. Instead, it displays what command line to use to consistently install the currently requested version of the .NET CLI. For example, if you specify version `latest`, it displays a link with the specific version so that this command can be used deterministically in a build script. It also displays the binary's location if you prefer to install or download it yourself.

- **`-FeedCredential|--feed-credential`**

  Used as a query string to append to the Azure feed. It allows changing the URL to use non-public blob storage accounts.

- **`--help`**

  Prints out help for the script. Applies only to bash script. For PowerShell, use `Get-Help ./dotnet-install.ps1`.

- **`-InstallDir|--install-dir <DIRECTORY>`**

  Specifies the installation path. The directory is created if it doesn't exist. The default value is *%LocalAppData%\Microsoft\dotnet* on Windows and *$HOME/.dotnet* on Linux/macOS. Binaries are placed directly in this directory.

- **`-JSonFile|--jsonfile <JSONFILE>`**

  Specifies a path to a global.json file that will be used to determine the SDK version. The *global.json* file must have a value for `sdk:version`.

- **`-NoPath|--no-path`**

  If set, the installation folder isn't exported to the path for the current session. By default, the script modifies the PATH, which makes the .NET CLI available immediately after install.

- **`-ProxyAddress`**

  If set, the installer uses the proxy when making web requests. (Only valid for Windows.)

- **`-ProxyBypassList <LIST_OF_URLS>`**

  If set with `ProxyAddress`, provides a list of comma-separated urls that will bypass the proxy. (Only valid for Windows.)

- **`-ProxyUseDefaultCredentials`**

  If set, the installer uses the credentials of the current user when using proxy address. (Only valid for Windows.)

- **`-Quality|--quality <QUALITY>`**

  Downloads the latest build of the specified quality in the channel. The possible values are: `daily`, `preview`, and `GA`.

  The different quality values signal different stages of the release process of the SDK or Runtime installed.

  * `daily`: The latest builds of the SDK or Runtime. They're built every day and aren't tested. Don't use them in production. These builds come from the dotnet/dotnet VMR (Virtual Monolithic Repository), so you might need to wait for changes from repositories like `dotnet/sdk` or `dotnet/runtime` to flow into `dotnet/dotnet` before they appear in a daily build.
  * `preview`: The monthly public releases of the next version of .NET, intended for public use. Not recommended for production use. Intended to allow users to experiment and test the new major version before release.
  * `GA`: The final stable releases of the .NET SDK and Runtime. Intended for public use as well as production support.

  The `--quality` option works only in combination with `--channel`, but is not applicable for the `STS` and `LTS` channels and will be ignored if one of those channels is used.

  For an SDK installation, use a `channel` value that is in `A.B` or `A.B.Cxx` format.
  For a runtime installation, use `channel` in `A.B` format.

  Don't use both `version` and `quality` parameters. When `quality` is specified, the script determines the proper version on its own.

  Available since the 5.0 release.

- **`-Runtime|--runtime <RUNTIME>`**

  Installs just the shared runtime, not the entire SDK. The possible values are:

  - `dotnet`: The `Microsoft.NETCore.App` shared runtime.
  - `aspnetcore`: The `Microsoft.AspNetCore.App` shared runtime.
  - `windowsdesktop` The `Microsoft.WindowsDesktop.App` shared runtime.

- **`--os <OPERATING_SYSTEM>`**

  Specifies the operating system for which the tools are being installed. Possible values are: `osx`, `macos`, `linux`, `linux-musl`, `freebsd`.

  The parameter is optional and should only be used when it's required to override the operating system that is detected by the script.

- **`-SharedRuntime|--shared-runtime`**

  > **Note:**
  > This parameter is obsolete and may be removed in a future version of the script. The recommended alternative is the `-Runtime|--runtime` option.

  Installs just the shared runtime bits, not the entire SDK. This option is equivalent to specifying `-Runtime|--runtime dotnet`.

- **`-SkipNonVersionedFiles|--skip-non-versioned-files`**

  Skips installing non-versioned files, such as *dotnet.exe*, if they already exist.

- **`-UncachedFeed|--uncached-feed`**

  For internal use only. Allows using a different storage to download SDK archives from. This parameter overwrites `-AzureFeed|--azure-feed`.

- **`-KeepZip|--keep-zip`**

  If set, the downloaded SDK archive is kept after installation.

- **`-ZipPath|--zip-path `**

  If set, the downloaded SDK archive is stored at the specified path.

- **`-Verbose|--verbose`**

  Displays diagnostics information.

- **`-Version|--version <VERSION>`**

  Represents a specific build version. The possible values are:

  - `latest`: Latest build on the channel (used with the `-Channel` option).
  - Three-part version in X.Y.Z format representing a specific build version; supersedes the `-Channel` option. For example: `2.0.0-preview2-006120`.

  If not specified, `-Version` defaults to `latest`.
