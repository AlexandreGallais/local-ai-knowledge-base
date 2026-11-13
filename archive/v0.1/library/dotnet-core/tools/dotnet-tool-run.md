---
title: "dotnet tool run command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-tool-run.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet tool run

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet tool run` - Invokes a local tool.

## Synopsis

```dotnetcli
dotnet tool run <COMMAND NAME> [--allow-roll-forward]

dotnet tool run -h|--help
```

## Description

The `dotnet tool run` command searches tool manifest files that are in scope for the current directory. When it finds a reference to the specified tool, it runs the tool. For more information, see Invoke a local tool.

## Arguments

- **`COMMAND_NAME`**

  The command name of the tool to run.

## Options

- **`--allow-roll-forward`**

  Available starting with .NET 9.0 SDK. Allow tool to use a newer version of the .NET runtime if the runtime it targets isn't installed.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Example

- **`dotnet tool run dotnetsay`**

  Runs the `dotnetsay` local tool.

- **`dotnet tool run dotnetsay --allow-roll-forward`**

  Runs the `dotnetsay` local tool and allows it to run on newer .NET versions if the target runtime isn't available.

## See also

- .NET tools
- Tutorial: Install and use a .NET local tool using the .NET CLI
