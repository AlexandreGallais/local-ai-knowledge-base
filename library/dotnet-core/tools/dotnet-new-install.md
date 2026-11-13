---
title: "dotnet new install"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-new-install.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet new install

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet new install` - installs a template package.

## Synopsis

```dotnetcli
dotnet new install <PATH|NUGET_ID>  [--interactive] [--add-source|--nuget-source <SOURCE>] [--force] [--prerelease]
    [-d|--diagnostics] [--verbosity <LEVEL>] [-h|--help]
```

## Description

The `dotnet new install` command installs a template package from the `PATH` or `NUGET_ID` provided. If you want to install a specific version or prerelease version of a template package, specify the version in the format `<package-name>@<package-version>`. (The colon separator `::` was deprecated in favor of the `@` character in .NET 9.0.200 SDK.) By default, `dotnet new` passes \* for the version, which represents the latest stable package version. For more information, see the Examples section.

If a version of the template package was already installed when you run this command, the template package will be updated to the specified version. If no version is specified, the package is updated to the latest stable version unless you specify the `--prerelease` option.
Starting with .NET SDK 6.0.100, if the argument specifies the version, and that version of the NuGet package is already installed, it won't be reinstalled.
If the argument is a `PATH` and it's already installed, it won't be reinstalled.

Prior to .NET SDK 6.0.100, template packages were managed individually for each .NET SDK version, including patch versions.
For example, if you install the template package using `dotnet new --install` in .NET SDK 5.0.100, it will be installed only for .NET SDK 5.0.100. Templates from the package won't be available in other .NET SDK versions installed on your machine.

Starting with .NET SDK 6.0.100, installed template packages are available in later .NET SDK versions installed on your machine. A template package installed in .NET SDK 6.0.100 will also be available in .NET SDK 6.0.101, .NET SDK 6.0.200, and so on. However, these template packages won't be available in .NET SDK versions prior to .NET SDK 6.0.100. To use a template package installed in .NET SDK 6.0.100 or later in earlier .NET SDK versions, you need to install it using `dotnet new install` in that .NET SDK version.

> **Note:**
> Starting with the .NET 7 SDK, the `dotnet new` syntax has changed:

- The `--list`, `--search`, `--install`, and `--uninstall` options became `list`, `search`, `install`, and `uninstall` subcommands.
- The `--update-apply` option became the `update` subcommand.
- To use `--update-check`, use the `update` subcommand with the `--check-only` option.

Other options that were available before are still available to use with their respective subcommands.
Separate help for each subcommand is available via the `-h` or `--help` option: `dotnet new <subcommand> --help` lists all supported options for the subcommand.

Additionally, tab completion is now available for `dotnet new`. It supports completion for installed template names and for the options a selected template provides.
To activate tab completion for the .NET SDK, see Enable tab completion.
>
> Examples of old syntax:
>
> - Install the latest version of Azure web jobs project template package:
>
>   ```dotnetcli
>   dotnet new --install Microsoft.Azure.WebJobs.ProjectTemplates
>   ```

> **Warning:**
> Templates can run MSBuild code and other arbitrary code when triggered. Don't install or run untrusted .NET templates.

### Package signature verification

When signature verification is enabled, `dotnet new install` verifies signed template packages downloaded from NuGet sources before installation. Verification applies to configured and additional NuGet sources, but not to packages installed directly from a local `.nupkg` file or folder.

Verification depends on the operating system:

| Operating system | Default behavior | Configuration |
|---|---|---|
| Windows | Enabled | Can't be disabled with `DOTNET_NUGET_SIGNATURE_VERIFICATION`. |
| Linux | Enabled | Set `DOTNET_NUGET_SIGNATURE_VERIFICATION=false` to disable verification. |
| macOS | Disabled | Set `DOTNET_NUGET_SIGNATURE_VERIFICATION=true` to enable verification. See NuGet signed-package verification for platform limitations. |

When verification is enabled, unsigned packages are accepted unless the applicable NuGet configuration sets `signatureValidationMode` to `require`, or the source declares that all its packages are repository-signed. For information about configuring the client policy, see signatureValidationMode.

If signature verification fails, the package isn't installed. The `--force` option doesn't bypass signature verification. Run the command with `--diagnostics` to see verification details. For certificate-store requirements and troubleshooting, see NuGet signed-package verification. You can also verify a downloaded package explicitly with `dotnet nuget verify`.

Successful verification doesn't guarantee that a template is safe to run. For more information about this behavior change and affected SDK feature bands, see Template package installation verifies NuGet signatures.

## Arguments

- **``**

  The folder on the file system or the NuGet package identifier to install the template package from. `dotnet new` attempts to install the NuGet package from the NuGet sources available for the current working directory and the sources specified via the `--add-source` option.
  If you want to install a specific version or prerelease version of a template package from NuGet source, specify the version in the format `<package-name>@<package-version>`. (The colon separator `::` was deprecated in favor of the `@` character in .NET 9.0.200 SDK.)

## Options

- **`--add-source|--nuget-source `**

  By default, `dotnet new install` uses the hierarchy of NuGet configuration files from the current directory to determine the NuGet sources for the operation. Specify `--nuget-source` to use a source in addition to the configured sources.
  To check the configured sources for the current directory, use `dotnet nuget list source`. For more information, see Common NuGet Configurations.

  > **Note:**
  > Following NuGet's Https Everywhere initiative, `dotnet new` is phasing out `http` feeds. If an `http` feed is passed, it isn't queried for packages and a warning is displayed. The `--force` option can be used to override this behavior if necessary.

- **`-d|--diagnostics`**

  Enables diagnostic output. Available since .NET SDK 7.0.100.

- **`--force`**

  Allows installing template packages from the specified sources even if they would override a template package from another source. Available since .NET SDK 7.0.100.

  This option doesn't bypass package signature verification.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.

- **`--prerelease`**

  Selects the latest available version, including prerelease versions, when you don't specify a template package version. If you specify a package version, such as `Contoso.Templates@2.0.0-preview.3`, the command selects that exact version. Available since .NET SDK 11.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

## Examples

- Install the latest version of SPA templates for ASP.NET Core:

  ```dotnetcli
  dotnet new install Microsoft.DotNet.Web.Spa.ProjectTemplates
  ```

- Install version 2.0 of the SPA templates for ASP.NET Core:

  ```dotnetcli
  dotnet new install Microsoft.DotNet.Web.Spa.ProjectTemplates@2.0.0
  ```

- Install version 2.0 of the SPA templates for ASP.NET Core from a custom NuGet source using interactive mode:

  ```dotnetcli
  dotnet new install Microsoft.DotNet.Web.Spa.ProjectTemplates@2.0.0 --add-source "https://api.my-custom-nuget.com/v3/index.json" --interactive
  ```

## See also

- `dotnet new` command
- `dotnet new search` command
- .NET templates for authors
