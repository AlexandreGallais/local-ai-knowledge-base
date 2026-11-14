---
title: "dotnetup runtime command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnetup runtime command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup runtime` - Manage .NET runtime installations.

## Synopsis

```console
dotnetup runtime <command> [options]
```

## Commands

| Command | Description |
| --- | --- |
| `install` | Install one or more runtime requirements. |
| `update` | Update tracked runtime requirements. |
| `uninstall` | Remove a runtime requirement and unused files. |

## Options

| Option | Description |
| --- | --- |
| `-?`, `-h`, `--help` | Show command help. |

## Runtime components

| Name | Component |
| --- | --- |
| `runtime` | Core .NET runtime |
| `aspnetcore` or `aspnet` | ASP.NET Core runtime |
| `windowsdesktop` or `desktop` | Windows Desktop runtime. Windows only. |
