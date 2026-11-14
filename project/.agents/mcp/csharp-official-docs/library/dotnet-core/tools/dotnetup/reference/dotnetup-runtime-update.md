---
title: "dotnetup runtime update command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-runtime-update.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnetup runtime update command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup runtime update` - Update tracked .NET runtime channels.

## Synopsis

```console
dotnetup runtime update [options]
```

## Description

The command processes the core .NET and ASP.NET Core runtime components. On
Windows, it also processes the Windows Desktop runtime. It skips exact-version
specifications.

The command tries each supported runtime component even if an earlier
component fails.

## Options

| Option | Description |
| --- | --- |
| `--manifest-path <MANIFEST_PATH>` | Use a custom manifest file. |
| `--install-path <INSTALL_PATH>` | Update only the matching installation root. |
| `--no-progress [<true\|false>]` | Disable progress display. |
| `-v`, `--verbosity <normal\|detailed>` | Set output verbosity. The default is `normal`. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

```dotnetcli
dotnetup runtime update
dotnetup runtime update --install-path .\.dotnet --no-progress
```
