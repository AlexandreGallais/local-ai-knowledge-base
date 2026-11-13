---
title: "dotnet workload repair command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-workload-repair.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet workload repair

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload repair` - Repairs workloads installations.

## Synopsis

```dotnetcli
dotnet workload repair
    [--configfile] [--disable-parallel] [--ignore-failed-sources]
    [--interactive] [--no-cache]
    [-s|--source <SOURCE>] [--temp-dir <PATH>]
    [-v|--verbosity <LEVEL>]

dotnet workload repair -?|-h|--help
```

## Description

The `dotnet workload repair` command reinstalls all installed workloads. Workloads are made up of multiple workload packs and it's possible to get into a state where some installed successfully but others didn't. For example, a `dotnet workload install` command might not finish installing because of a dropped internet connection.

For more information about the `dotnet workload` commands, see the dotnet workload install command.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`--disable-parallel`**

Prevents restoring multiple projects in parallel.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`--ignore-failed-sources`**

Treats package source failures as warnings.

- **`--include-previews`**

Allows prerelease workload manifests.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.

- **`--no-cache`**

Prevents caching of packages and http requests.

- **`-s|--source `**

Specifies the URI of the NuGet package source to use. This setting overrides all of the sources specified in the *nuget.config* files. Multiple sources can be provided by specifying this option multiple times.

- **`--temp-dir `**

Specify the temporary directory used to download and extract NuGet packages (must be secure).

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

## Examples

- Repair all installed workloads:

  ```dotnetcli
  dotnet workload repair
  ```
