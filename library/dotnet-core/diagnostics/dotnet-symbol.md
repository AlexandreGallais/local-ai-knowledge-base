---
title: "dotnet-symbol diagnostic tool - .NET CLI"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/dotnet-symbol.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Symbol downloader (dotnet-symbol)

**This article applies to:** ✔️ .NET Core 2.1 SDK and later versions

## Install

To install the latest release version of the `dotnet-symbol` NuGet package, use the dotnet tool install command:

```dotnetcli
dotnet tool install --global dotnet-symbol
```

## Synopsis

```console
dotnet-symbol [-h|--help] [options] <FILES>
```

## Description

The `dotnet-symbol` global tool downloads files (symbols, DAC, modules, etc.) needed for debugging core dumps and minidumps. This can be useful when debugging dumps captured on another machine. `dotnet-symbol` can download modules and symbols needed to analyze the dump.

## Options

- **`--microsoft-symbol-server`**

  Add `http://msdl.microsoft.com/download/symbols` symbol server path (default).

- **`--server-path <symbol server path>`**

  Add a symbol server to the server path.

- **`authenticated-server-path <pat> <server path>`**

  Add an authenticated symbol server to the server path using a personal access token (PAT).

- **`--cache-directory <file cache directory>`**

  Adds a cache directory.

- **`--recurse-subdirectories`**

  Process input files in all subdirectories.

- **`--host-only`**

  Download only the host program (that is, dotnet) that lldb needs for loading core dumps.

- **`--symbols`**

  Download symbol files (.pdb, .dbg, .dwarf).

- **`--modules`**

  Download the module files (.dll, .so, .dylib).

- **`--debugging`**

  Download the special debugging modules (DAC, DBI, SOS).

- **`--windows-pdbs`**

  Force the downloading of the Windows PDBs when Portable PDBs are also available.

- **`-o, --output <output directory>`**

  Set the output directory. Otherwise, write next to the input file (default).

- **`-d, --diagnostics`**

  Enable diagnostic output.

- **`-h|--help`**

  Shows command-line help.

## Download symbols

Running `dotnet-symbol` against a dump file will, by default, download all the modules, symbols, and DAC/DBI files needed to debug the dump including the managed assemblies. Because SOS can now download symbols when needed, most Linux core dumps can be analyzed using lldb with only the host (dotnet) and debugging modules. To get these files necessary for diagnosing a core dump with lldb run:

```console
dotnet-symbol --host-only --debugging <dump file path>
```

## Troubleshoot

- 404 Not Found while downloading symbols.

   Symbol download is only supported for official .NET Core runtime versions acquired through official channels such as the official web site and the default sources in the dotnet installation scripts. A 404 error while downloading debugging files may indicate that the dump was created with a .NET Core runtime from another source, such as one built from source locally or for a particular Linux distro, or from community sites like archlinux. In such cases, file necessary for debugging (dotnet, libcoreclr.so, and libmscordaccore.so) should be copied from those sources or from the environment the dump file was created in.

## See also

* Debugging with symbols
* Symbols and Portable PDBs
