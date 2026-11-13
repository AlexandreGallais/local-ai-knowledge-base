---
title: "dotnetup sdk update command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup-sdk-update.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup sdk update command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup sdk update` - Update tracked .NET SDK channels.

## Synopsis

```console
dotnetup sdk update [options]
```

## Description

By default, the command processes only SDK specifications. It skips exact SDK
versions. Use `--all` to process SDK and runtime specifications.

## Options

| Option | Description |
| --- | --- |
| `--all` | Update all tracked components, including runtimes. |
| `--update-global-json` | Update applicable global.json-sourced SDK versions. |
| `--manifest-path <MANIFEST_PATH>` | Use a custom manifest file. |
| `--install-path <INSTALL_PATH>` | Update only the matching installation root. |
| `--interactive [<true\|false>]` | Allow update notifications when output isn't redirected. The default is `false` in CI or when output is redirected, and `true` otherwise. The update itself doesn't prompt for confirmation. |
| `--no-progress [<true\|false>]` | Disable progress display. |
| `-v`, `--verbosity <normal\|detailed>` | Set output verbosity. The default is `normal`. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

```dotnetcli
dotnetup sdk update
dotnetup sdk update --all
dotnetup sdk update --update-global-json
```
