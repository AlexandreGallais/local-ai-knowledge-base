---
title: "dotnet workload history command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-workload-history.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet workload history

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload history` - Shows a history of workload installation actions.

## Synopsis

```dotnetcli
dotnet workload history [options]

dotnet workload history -?|-h|--help
```

## Description

The `dotnet workload history` shows a history of workload installation actions.

For more information about the `dotnet workload` commands, see the dotnet workload install command.

## Options

- **--all**

  Removes and uninstalls all workload components from all SDK versions. Defaults to `false`.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

- Remove all workflow components:

  ```dotnetcli
  dotnet workload history --all
  ```
