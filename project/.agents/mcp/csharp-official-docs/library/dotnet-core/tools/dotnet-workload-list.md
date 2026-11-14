---
title: "dotnet workload list command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-workload-list.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet workload list

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload list` - Lists installed workloads.

### Synopsis

```dotnetcli
dotnet workload list [-v|--verbosity <LEVEL>]

dotnet workload list [-?|-h|--help]
```

## Description

The `dotnet workload list` command lists all installed workloads.

For more information about the `dotnet workload` commands, see the dotnet workload install command.

## Options

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

## Examples

- List the installed workloads:

  ```dotnetcli
  dotnet workload list
  ```
