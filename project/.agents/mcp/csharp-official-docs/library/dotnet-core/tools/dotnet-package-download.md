---
title: "dotnet package download command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-package-download.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet package download

> Applies to: ✔️ .NET 10.0.2xx SDK and later versions.

## Name

`dotnet package download` — Download one or more NuGet packages to disk.

## Synopsis

```
dotnet package download [<packages>...]
    [--output <path>]
    [--configfile <path> ]
    [--prerelease]
    [--source <package source>]
    [--allow-insecure-connections]
    [--interactive]
    [--verbosity <level>]

dotnet package download -h|--help
```

## Description

`dotnet package download` downloads NuGet packages to a local directory. It **does not** add or update `PackageReference` entries in project files and **does not** build or restore a project.
By default, the command downloads only the packages you specify (no transitive dependencies) to the current working directory.

## Arguments

* **`packages`**

  One or more package IDs to download.
  Each package can optionally include a version with `@`.
  If a package version isn't specified, the latest version of the package is downloaded.
  For example, `dotnet package download Contoso.Utilities` or `dotnet package download user@example.com`.

## Options

* **`--allow-insecure-connections`**

     Allows downloading from HTTP sources. Without this flag, insecure sources cause the command to error per HTTPS-everywhere guidance.

* **`--configfile `**

     Path to a NuGet.config to use.

* **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.

* **`-o, --output `**

     Directory where the package will be placed. Defaults to the current working directory.

* **`--prerelease`**

     Allows downloading prerelease versions.

* **`-s --source <package source>`**

     Specifies the NuGet package source to use.

* **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

* **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

### Download a single package at a specific version

```ps1
dotnet package download user@example.com --output My/Destination/For/packages
```

### Download multiple packages to a custom folder

```ps1
dotnet package download user@example.com user@example.com --output My/Destination/For/packages
```
