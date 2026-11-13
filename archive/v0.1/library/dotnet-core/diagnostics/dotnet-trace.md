---
title: "dotnet-trace diagnostic tool - .NET CLI (part 1 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/dotnet-trace.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet-trace performance analysis utility

**This article applies to:** ✔️ `dotnet-trace` 9.0.661903 and later versions

## Install

There are two ways to download and install `dotnet-trace`:

- **dotnet global tool:**

  To install the latest release version of the `dotnet-trace` NuGet package, use the dotnet tool install command:

  ```dotnetcli
  dotnet tool install --global dotnet-trace
  ```

- **Direct download:**

  Download the tool executable that matches your platform:

  | OS  | Platform |
  | --- | -------- |
  | Windows | x86 \| x64 \| Arm \| Arm-x64 |
  | Linux   | x64 \| Arm \| Arm64 \| musl-x64 \| musl-Arm64 |

## Synopsis

```dotnetcli
dotnet-trace [-h, --help] [--version] <command>
```

## Description

The `dotnet-trace` tool:

- Is a cross-platform .NET diagnostic tool.
- Enables the collection of .NET traces of a running process without a native profiler.
- Is built on `EventPipe` of the .NET runtime.
- Supports two different ways of collecting traces:

  - The `collect` verb offers consistent functionality on any OS.
  - The `collect-linux` verb uses Linux-specific OS capabilities to provide additional features.

  | Feature                                  | `collect` | `collect-linux`                  |
  |------------------------------------------|----------|-----------------------------------|
  | Supported OS                             | Any      | Linux only, kernel version >= 6.4 |
  | Requires Admin/Root privilege            | No       | Yes                               |
  | Trace all processes simultaneously       | No       | Supported                         |
  | Capture native library and kernel events | No       | Supported                         |
  | Event callstacks include native frames   | No       | Yes                               |

## Options

- **`-h|--help`**

  Shows command-line help.

- **`--version`**

  Displays the version of the dotnet-trace utility.

## Commands

| Command                                                   |
|-----------------------------------------------------------|
| dotnet-trace collect             |
| dotnet-trace collect-linux |
| dotnet-trace convert             |
| dotnet-trace ps                       |
| dotnet-trace list-profiles |
| dotnet-trace report               |
