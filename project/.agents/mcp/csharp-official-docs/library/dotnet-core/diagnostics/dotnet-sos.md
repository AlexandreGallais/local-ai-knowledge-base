---
title: "dotnet-sos diagnostic tool - .NET CLI"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/dotnet-sos.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# SOS installer (dotnet-sos)

**This article applies to:** ✔️ .NET 6.0 SDK and later versions

> **Note:**
> Consider using the .NET debugger extensions instead, which include the SOS functionality and additional features.

## Install

There are two ways to download and install `dotnet-sos`:

- **dotnet global tool:**

  To install the latest release version of the `dotnet-sos` NuGet package, use the dotnet tool install command:

  ```dotnetcli
  dotnet tool install --global dotnet-sos
  ```

- **Direct download:**

  Download the tool executable that matches your platform:

  | OS  | Platform |
  | --- | -------- |
  | Windows | x86 \| x64 \| Arm \| Arm-x64 |
  | Linux   | x64 \| Arm \| Arm64 \| musl-x64 \| musl-Arm64 |

## Synopsis

```console
dotnet-sos [-h|--help] [options] [command]]
```

## Description

The `dotnet-sos` global tool installs the SOS debugger extension. This extension lets you inspect managed .NET Core state from native debuggers like LLDB and WinDbg.

## Options

- **`--version`**

  Displays version information.

- **`-h|--help`**

  Shows command-line help.

## dotnet-sos install

Installs the SOS extension locally for debugging .NET Core processes. On macOS and Linux, the *.lldbinit* file is updated so that the extension automatically loads at LLDB startup. If you're installing SOS on Windows with older debugging tools (before version 10.0.18317.1001), you need to manually load the extension in WinDbg or cdb by running `.load %USERPROFILE%\.dotnet\sos\sos.dll` in the debugger.

This overwrites any previous installations from the dotnet-debugger-extensions or dotnet-sos installers.

### Synopsis

```console
dotnet-sos install [--architecture <arch>]
```

### Options

- **`--architecture <arch>`**

  Specifies the processor architecture of the SOS binaries to install. By default, `dotnet-sos` installs the architecture of the host machine. Use this option when you want to install SOS for an architecture that's different from the dotnet host architecture. For example, if you're running Arm32 binaries from an Arm64 host, you need to install SOS with `dotnet-sos install --architecture Arm`.

  The following architectures are available:

  - `Arm`
  - `Arm64`
  - `X86`
  - `X64`

## dotnet-sos uninstall

Uninstalls the SOS extension and, on Linux and macOS, removes it from LLDB configuration.

### Synopsis

```console
dotnet-sos uninstall
```
