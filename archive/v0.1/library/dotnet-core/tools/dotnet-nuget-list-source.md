---
title: "dotnet nuget list source command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-nuget-list-source.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet nuget list source

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet nuget list source` - Lists all configured NuGet sources.

## Synopsis

```dotnetcli
dotnet nuget list source [--format [Detailed|Short]] [--configfile <FILE>]

dotnet nuget list source -h|--help
```

## Description

The `dotnet nuget list source` command lists all existing sources from your NuGet configuration files.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`--format [Detailed|Short]`**

  The format of the list command output: `Detailed` (the default) and `Short`.

## Examples

- List configured sources from the current directory:

  ```dotnetcli
  dotnet nuget list source
  ```

## See also

- Package source sections in NuGet.config files

- sources command (nuget.exe)
