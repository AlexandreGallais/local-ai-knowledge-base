---
title: "dotnet nuget remove source command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-nuget-remove-source.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet nuget remove source

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet nuget remove source` - Remove a NuGet source.

## Synopsis

```dotnetcli
dotnet nuget remove source <NAME> [--configfile <FILE>]

dotnet nuget remove source -h|--help
```

## Description

The `dotnet nuget remove source` command removes an existing source from your NuGet configuration files.

## Arguments

- **`NAME`**

  Name of the source.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

## Examples

- Remove a source with name of `mySource`:

  ```dotnetcli
  dotnet nuget remove source mySource
  ```

## See also

- Package source sections in NuGet.config files

- sources command (nuget.exe)
