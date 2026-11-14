---
title: "dotnet tool restore command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-tool-restore.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet tool restore

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet tool restore` - Installs the .NET local tools that are in scope for the current directory.

## Synopsis

```dotnetcli
dotnet tool restore
    [--configfile <FILE>] [--add-source <SOURCE>]
    [--tool-manifest <PATH_TO_MANIFEST_FILE>] [--disable-parallel]
    [--ignore-failed-sources] [--no-cache] [--interactive]
    [-v|--verbosity <LEVEL>]

dotnet tool restore -h|--help
```

## Description

The `dotnet tool restore` command finds the tool manifest file that is in scope for the current directory and installs the tools that are listed in it. For information about manifest files, see Install a local tool and Invoke a local tool.

For information about where local tools are stored, see dotnet tool install.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`--add-source `**

Adds an additional NuGet package source to use during installation. Feeds are accessed in parallel, not sequentially in some order of precedence. If the same package and version is in multiple feeds, the fastest feed wins. For more information, see What happens when a NuGet package is installed?.

- **`--tool-manifest `**

  Path to the manifest file.

- **`--disable-parallel`**

Prevents restoring multiple projects in parallel.

- **`--ignore-failed-sources`**

  Treat package source failures as warnings.

- **`--no-cache`**

  Do not cache packages and http requests.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

## Example

- **`dotnet tool restore`**

  Restores local tools for the current directory.

## See also

- .NET tools
- Tutorial: Install and use a .NET local tool using the .NET CLI
