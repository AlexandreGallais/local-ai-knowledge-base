---
title: "dotnetup dotnet command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-dotnet.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnetup dotnet command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup dotnet` - Run a command with the dotnetup-managed `dotnet`
executable.

## Synopsis

```console
dotnetup dotnet [--] [<ARGUMENT>...]
```

## Description

The command selects the current default dotnetup-managed .NET installation
root. It uses the `PATH` location if that location is the default managed
installation root. Otherwise, it uses the default installation root.

Before it starts the child process, it sets `DOTNET_ROOT` to the selected
installation root and prepends that root to `PATH`. It forwards all remaining
arguments and inherits standard input, output, and error. Its exit code is the
child process exit code.

This command does not automatically select an arbitrary installation root
supplied earlier with `--install-path`.

`dotnetup dotnet` changes the environment only for the command that it starts.
Other applications do not use this installation by default. This includes IDEs
such as Visual Studio Code.

Use Terminal Mode and launch the IDE from that terminal. On Windows, use
Everywhere Mode to configure all applications. For more information, see
dotnetup environment configuration.

## Arguments

`ARGUMENT`

Zero or more arguments to pass to `dotnet`. The optional `--` separator makes
the forwarding boundary explicit and should be used whenever an argument passed to `dotnet` could overlap with an option that `dotnetup dotnet` also accepts.

## Options

| Option | Description |
| --- | --- |
| `-?`, `-h`, `--help` | Show dotnetup command help. Add `--` before a `dotnet` help option when necessary. |

## Examples

```dotnetcli
dotnetup dotnet -- --version
dotnetup dotnet build --configuration Release
dotnetup do test
```
