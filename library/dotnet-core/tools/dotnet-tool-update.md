---
title: "dotnet tool update command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-tool-update.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet tool update

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet tool update` - Updates the specified .NET tool on your machine.

## Synopsis

```dotnetcli
dotnet tool update <PACKAGE_ID> -g|--global
    [--add-source <SOURCE>] [--all] [--allow-downgrade]
    [--configfile <FILE>]
    [--disable-parallel] [--framework <FRAMEWORK>]
    [--ignore-failed-sources] [--interactive]
    [--no-cache] [--prerelease] [--source <SOURCE>]
    [-v|--verbosity <LEVEL>] [--version <VERSION>]

dotnet tool update <PACKAGE_ID> --tool-path <PATH>
    [--add-source <SOURCE>] [--all] [--allow-downgrade]
    [--configfile <FILE>]
    [--disable-parallel] [--framework <FRAMEWORK>]
    [--ignore-failed-sources] [--interactive] 
    [--no-cache] [--prerelease] [--source <SOURCE>]
    [-v|--verbosity <LEVEL>] [--version <VERSION>]

dotnet tool update <PACKAGE_ID> --local
    [--add-source <SOURCE>] [--all] [--allow-downgrade]
    [--configfile <FILE>]
    [--disable-parallel] [--framework <FRAMEWORK>]
    [--ignore-failed-sources] [--interactive]
    [--no-cache] [--prerelease] [--source <SOURCE>]
    [--tool-manifest <PATH>]
    [-v|--verbosity <LEVEL>] [--version <VERSION>]

dotnet tool update -h|--help
```

## Description

The `dotnet tool update` command provides a way for you to update .NET tools on your machine to the latest stable version of the package. The command uninstalls and reinstalls a tool, effectively updating it. To use the command, you specify one of the following options:

* To update a global tool that was installed in the default location, use the `--global` option
* To update a global tool that was installed in a custom location, use the `--tool-path` option.
* To update a local tool, use the `--local` option.

## Arguments

- **`PACKAGE_ID`**

  Name/ID of the NuGet package that contains the .NET global tool to update.

  Starting in .NET 10.0.100 SDK, use the name/ID, and version separated by `@` to update a .NET tool.

  You can find the package name using the dotnet tool list command.

## Options

- **`--add-source `**

Adds an additional NuGet package source to use during installation. Feeds are accessed in parallel, not sequentially in some order of precedence. If the same package and version is in multiple feeds, the fastest feed wins. For more information, see What happens when a NuGet package is installed?.

- **`--all`**

  Update all tools.

- **`--allow-downgrade`**

Allow package downgrade when installing or updating a .NET tool package. Suppresses the warning, "The requested version x.x.x is lower than existing version x.x.x."

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`--disable-parallel`**

Prevents restoring multiple projects in parallel.

- **`--framework <FRAMEWORK>`**

  Specifies the target framework to update the tool for.

- **`-g|--global`**

  Specifies that the update is for a user-wide tool. Can't be combined with the `--tool-path` option. Omitting both `--global` and `--tool-path` specifies that the tool to be updated is a local tool.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`--ignore-failed-sources`**

  Treat package source failures as warnings.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.

- **`--local`**

  Update the tool and the local tool manifest. Can't be combined with the `--global` option or the `--tool-path` option.

- **`--no-cache`**

  Do not cache packages and HTTP requests.

- **`--prerelease`**

  Include prerelease versions.

- **`--source `**

Specifies the source for NuGet packages.

> **Caution:**
> This option completely replaces existing NuGet configuration, including Package Source Mapping.

- **`--tool-manifest `**

  Path to the manifest file.

- **`--tool-path `**

  Specifies the location where the global tool is installed. PATH can be absolute or relative. Can't be combined with the `--global` option. Omitting both `--global` and `--tool-path` specifies that the tool to be updated is a local tool.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

- **`--version <VERSION>`**

  The version range of the tool package to update to. This cannot be used to downgrade versions, you must `uninstall` newer versions first.

  Starting in .NET 8.0, `--version Major.Minor.Patch` refers to a specific major.minor.patch version, including unlisted versions. To get the latest version of a certain major.minor version instead, use `--version Major.Minor.*`.

## Examples

- **`dotnet tool update -g dotnetsay`**

  Updates the dotnetsay global tool.

- **`dotnet tool update dotnetsay --tool-path c:\global-tools`**

  Updates the dotnetsay global tool located in a specific Windows directory.

- **`dotnet tool update dotnetsay --tool-path ~/bin`**

  Updates the dotnetsay global tool located in a specific Linux/macOS directory.

- **`dotnet tool update dotnetsay`**

  Updates the dotnetsay local tool installed for the current directory.

- **`dotnet tool update -g dotnetsay --version 2.0.*`**

  Updates the dotnetsay global tool to the latest patch version, with a major version of `2`, and a minor version of `0`.

- **`dotnet tool update -g dotnetsay@2.1.7*`**

  Updates the dotnetsay global tool to the latest patch version, 2.1.7.

- **`dotnet tool update -g dotnetsay --version (2.0.0,2.1.7)`**

  Updates the dotnetsay global tool to the lowest version within the specified range `(> 2.0.0 && < 2.1.7)`, version `2.1.0` would be installed. For more information on semantic versioning ranges, see NuGet packaging version ranges.

## See also

- .NET tools
- Semantic versioning
- Tutorial: Install and use a .NET global tool using the .NET CLI
- Tutorial: Install and use a .NET local tool using the .NET CLI
