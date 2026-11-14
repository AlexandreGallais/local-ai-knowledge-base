---
title: "'dotnet nuget config unset' command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-nuget-config-unset.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet nuget config unset

**This article applies to:** ✔️ .NET 8.0.2xx SDK and later versions

## Name

`dotnet nuget config unset` - Removes the key-value pair from a specified NuGet configuration setting.

## Synopsis

```dotnetcli
dotnet nuget config unset <CONFIG-KEY> [--configfile <FILE>]

dotnet nuget config unset -h|--help
```

## Description

The `dotnet nuget config unset` unsets the values for NuGet configuration settings that will be applied from the config section.

## Arguments

- **`CONFIG_KEY`**

  The key of the settings that are to be removed.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

* Removes's the `repositoryPath` config value from the specified configuration file:

  ```dotnetcli
  dotnet nuget config unset repositoryPath --configfile "C:/nuget.config"
  ```

## See also

- nuGet.config reference
