---
title: "dotnet nuget enable source command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-nuget-enable-source.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet nuget enable source

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet nuget enable source` - Enable a NuGet source.

## Synopsis

```dotnetcli
dotnet nuget enable source <NAME> [--configfile <FILE>]

dotnet nuget enable source -h|--help
```

## Description

The `dotnet nuget enable source` command enables an existing source in your NuGet configuration files.

## Arguments

- **`NAME`**

  Name of the source.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

## Examples

- Enable a source with name of `mySource`:

  ```dotnetcli
  dotnet nuget enable source mySource
  ```

## See also

- Package source sections in NuGet.config files

- sources command (nuget.exe)
