---
title: "dotnet help command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-help.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet help reference

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet help` - Shows more detailed documentation online for the specified command.

## Synopsis

```dotnetcli
dotnet help <COMMAND_NAME> [-h|--help]
```

## Description

The `dotnet help` command opens up the reference page for more detailed information about the specified command.

## Arguments

- **`COMMAND_NAME`**

  Name of the .NET CLI command. For a list of the valid CLI commands, see CLI commands.

## Options

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

- Opens the documentation page for the dotnet new command:

  ```dotnetcli
  dotnet help new
  ```
