---
title: "dotnet workload command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-workload.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet workload command

**This article applies to:** ✔️ .NET 7 SDK and later versions

## Name

`dotnet workload` - Provides information about the available workload commands and installed workloads.

## Synopsis

```dotnetcli
dotnet workload [--info]

dotnet workload -?|-h|--help
```

## Description

The `dotnet workload` command provides commands for working with .NET workloads. For example, `dotnet workload install` installs a particular workload. Each command defines its own options and arguments. All commands support the `--help` option for printing out brief documentation about how to use the command.

## Options

- **`--version`**

  Displays the current workload set version.

- **`--info`**

  Prints out detailed information about installed workloads, including their installation source, manifest version, manifest path, and install type.

- **`-?|-h|--help`**

  Prints out a list of available commands.

## See also

- Install a workload
- List the installed workloads on your machine
- Show workloads available to install
