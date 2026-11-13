---
title: "dotnet nuget disable source command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-nuget-disable-source.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet nuget disable source

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet nuget disable source` - Disable a NuGet source.

## Synopsis

```dotnetcli
dotnet nuget disable source <NAME> [--configfile <FILE>]

dotnet nuget disable source -h|--help
```

## Description

The `dotnet nuget disable source` command disables an existing source in your NuGet configuration files.

## Arguments

- **`NAME`**

  Name of the source.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

## Examples

- Disable a source with name of `mySource`:

  ```dotnetcli
  dotnet nuget disable source mySource
  ```

## See also

- Package source sections in NuGet.config files

- sources command (nuget.exe)
