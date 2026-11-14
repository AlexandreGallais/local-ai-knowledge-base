---
title: "dotnet build-server command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-build-server.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet build-server

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet build-server` - Interacts with servers started by a build.

## Synopsis

```dotnetcli
dotnet build-server shutdown [--msbuild] [--razor] [--vbcscompiler]

dotnet build-server shutdown -h|--help

dotnet build-server -h|--help
```

## Commands

- **`shutdown`**

  Shuts down build servers that are started from dotnet. By default, all servers are shut down.

## Options

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`--msbuild`**

  Shuts down the MSBuild build server.

- **`--razor`**

  Shuts down the Razor build server.

- **`--vbcscompiler`**

  Shuts down the VB/C# compiler build server.
