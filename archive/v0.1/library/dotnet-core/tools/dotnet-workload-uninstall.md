---
title: "dotnet workload uninstall command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-workload-uninstall.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet workload uninstall

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload uninstall` - Uninstalls a specified workload.

## Synopsis

```dotnetcli
dotnet workload uninstall <WORKLOAD_ID...>

dotnet workload uninstall -?|-h|--help
```

## Description

The `dotnet workload uninstall` command uninstalls one or more workloads.

For more information about the `dotnet workload` commands, see the dotnet workload install command.

## Arguments

- **`WORKLOAD_ID...`**

  The workload ID or multiple IDs to uninstall.

## Options

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

- Uninstall the `maui` workload:

  ```dotnetcli
  dotnet workload uninstall maui
  ```

- Uninstall the `maui-android` and `maui-ios` workloads:

  ```dotnetcli
  dotnet workload uninstall maui-android maui-ios
  ```
