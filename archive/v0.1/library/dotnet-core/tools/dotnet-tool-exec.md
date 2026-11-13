---
title: "dotnet tool exec command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-tool-exec.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet tool exec

**This article applies to:** ✔️ .NET 10.0.100 SDK and later versions

## Name

`dotnet tool exec` - Downloads and invokes a .NET tool without permanently installing it.

## Synopsis

```dotnetcli
dotnet tool exec <PACKAGE_NAME>[@<VERSION>]
    [--allow-roll-forward] [-a|--arch <ARCHITECTURE>]
    [--add-source <SOURCE>] [--configfile <FILE>] [--disable-parallel]
    [--framework <FRAMEWORK>] [--ignore-failed-sources] [--interactive]
    [--no-http-cache] [--prerelease] [--source <SOURCE>] [-y|--yes]
    [-v|--verbosity <LEVEL>]
    [--] [<tool-arguments>...]

dotnet tool exec -h|--help
```

## Description

The `dotnet tool exec` command provides a one-shot tool invocation mode for .NET Tools. It automatically downloads the specified tool package to the NuGet cache and invokes it without modifying your system `PATH` or requiring permanent installation.

When you run `dotnet tool exec`, the command:

1. Checks the version (or version range) you specify (or the latest version if none is specified) against your configured NuGet feeds to decide which package to download.
2. Downloads the specified package to the NuGet cache (if not already present).
3. Invokes the tool with any provided arguments.
4. Returns the tool's exit code.

`dotnet tool exec` works seamlessly with both global and local tools. If you have a local tool manifest available, it uses the manifest to determine which version of the tool to run.

This command also exists in two other forms for easier use

* `dotnet dnx` - A hidden alias for `dotnet tool exec` that is used as a way to easily implement the `dnx` script itself
* `dnx` - A shell script provided by the installer and available on `PATH`. It allows for simple use of tools directly via `dnx <toolname>`.

## Arguments

- **`PACKAGE_NAME`**

  The NuGet package ID of the .NET tool to execute. You can optionally specify a version using the `@` syntax, for example `user@example.com`.

- **`tool-arguments`**

  Arguments to pass to the tool being executed. Everything after `--` is passed directly to the tool.

## Options

- **`--allow-roll-forward`**

  Allow the tool to use a newer version of the .NET runtime if the runtime it targets isn't installed.

- **`--add-source `**

  Adds an additional NuGet package source to use during installation. Feeds are accessed in parallel, not in a fallback cascade sequence. If the same package and version is available in multiple feeds, the fastest feed wins. For more information, see What happens when a NuGet package is installed. You can control this through the use of NuGet package source mapping. For more information, see Package Source Mapping.

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`--disable-parallel`**

Prevents restoring multiple projects in parallel.

- **`--ignore-failed-sources`**

  Treats package source failures as warnings.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.

- **`--no-http-cache`**

  Doesn't cache HTTP requests to the configured NuGet feeds.

- **`--prerelease`**

  Allows prerelease packages to be selected when resolving the version to install.

- **`-y|--yes`**

  Accepts all confirmation prompts, including the prompt to download and run the tool package. Use this option only with packages and package sources that you trust. Available starting with .NET 11.

- **`--source `**

Specifies the source for NuGet packages.

> **Caution:**
> This option completely replaces existing NuGet configuration, including Package Source Mapping.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `normal`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

- **`dotnet tool exec dotnetsay`**

  Downloads (if necessary) and runs the latest version of the `dotnetsay` tool.

- **`dotnet tool exec user@example.com`**

  Downloads (if necessary) and runs version 2.1.0 of the `dotnetsay` tool.

- **`dotnet tool exec dotnetsay@2.*`**

  Downloads (if necessary) and runs the latest version of the `dotnetsay` tool in the 2.x version range.

- **`dotnet tool exec dotnetsay -- Hello World`**

  Runs the `dotnetsay` tool and passes "Hello World" as arguments to the tool.

- **`dotnet tool exec --add-source https://api.nuget.org/v3/index.json mytool`**

  Downloads and runs `mytool` using the specified NuGet source.

## Comparison with other commands

This command is intended to be a unified way to work with .NET Tools. While the previously available tool installation commands remain available, `dotnet tool exec` provides a simpler and more flexible experience for most users.

| Command | Purpose | Installation | Scope |
|---------|---------|--------------|-------|
| `dotnet tool exec` | One-shot execution | None (cached only) | Temporary |
| `dotnet tool install -g` | Permanent global installation | Global | System-wide |
| `dotnet tool install` | Permanent local installation | Local manifest | Project |
| `dotnet tool run` | Run an already-installed local tool | Requires prior installation | Project |

The `dotnet tool install -g` command does still serve an important purpose for users who want to permanently install a tool. However, for users who want to try out a tool or run it in a CI/CD pipeline, `dotnet tool exec` is often a better fit.

## See also

- .NET tools
- dotnet tool install
- dotnet tool run
- Tutorial: Install and use a .NET global tool using the .NET CLI
- Tutorial: Install and use a .NET local tool using the .NET CLI
