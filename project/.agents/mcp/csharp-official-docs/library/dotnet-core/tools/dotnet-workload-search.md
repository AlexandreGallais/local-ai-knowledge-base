---
title: "dotnet workload search command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-workload-search.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet workload search

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload search` - Searches for optional workloads.

## Synopsis

```dotnetcli
dotnet workload search [<SEARCH_STRING>] [-v|--verbosity <LEVEL>] [version <WORKLOAD_VERSION>]

dotnet workload search -?|-h|--help
```

## Description

The `dotnet workload search` command lists available workloads. You can filter the list by specifying all or part of the workload ID you're looking for.

For more information about the `dotnet workload` commands, see the dotnet workload install command.

## Arguments

- **`SEARCH_STRING`**

  The workload ID to search for, or part of it. For example, if you specify `maui`, the command lists all of the workload IDs that have `maui` in their workload ID.

## Options

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

- **`version <WORKLOAD_VERSION>`**

A workload version to display, or one or more workloads and their versions joined by the `@` character. Support for the `@` character is available since 9.0.200 SDK.

## Examples

- List all available workloads:

  ```dotnetcli
  dotnet workload search
  ```

- List all available workloads that have "maui" in their workload ID:

  ```dotnetcli
  dotnet workload search maui
  ```

- Search for a workload that matches the provided version:

  ```dotnetcli
  dotnet workload search version user@example.com
  ```
