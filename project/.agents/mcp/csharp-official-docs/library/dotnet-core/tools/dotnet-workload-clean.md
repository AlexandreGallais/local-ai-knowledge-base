---
title: "dotnet workload clean command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-workload-clean.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet workload clean

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload clean` - Removes workload components that might have been left behind from previous updates and uninstallations.

## Synopsis

```dotnetcli
dotnet workload clean [options]

dotnet workload clean -?|-h|--help
```

## Description

The `dotnet workload clean` command removes all workload components that have been uninstalled.

For more information about the `dotnet workload` commands, see the dotnet workload install command.

## Options

- **--all**

  Removes and uninstalls all workload components from all SDK versions. Defaults to `false`.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

- Remove all workflow components:

  ```dotnetcli
  dotnet workload clean --all
  ```
