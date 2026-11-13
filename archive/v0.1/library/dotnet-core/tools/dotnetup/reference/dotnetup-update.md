---
title: "dotnetup update command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup-update.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup update command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup update` - Update all tracked SDK and runtime channels.

## Synopsis

```console
dotnetup update [options]
```

## Description

The command checks every tracked SDK and runtime specification. It installs a
newer matching version when one is available and skips exact-version
specifications. It then removes unreferenced files.

The command continues after an individual update failure. It returns a
failure after it processes the remaining specifications.

This command doesn't update the dotnetup executable itself. Use
`dotnetup self update` to update the tool.

## Options

| Option | Description |
| --- | --- |
| `--update-global-json` | Update applicable global.json-sourced SDK versions. |
| `--manifest-path <MANIFEST_PATH>` | Use a custom manifest file. |
| `--install-path <INSTALL_PATH>` | Update only the matching installation root. Without this option, update all roots in the manifest. |
| `--interactive [<true\|false>]` | Allow update notifications when output isn't redirected. The default is `false` in CI or when output is redirected, and `true` otherwise. The update itself doesn't prompt for confirmation. |
| `--no-progress [<true\|false>]` | Disable progress display. |
| `-v`, `--verbosity <normal\|detailed>` | Set output verbosity. The default is `normal`. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

Update all tracked components:

```dotnetcli
dotnetup update
```

Update one installation root and its repository files:

```dotnetcli
dotnetup update --install-path .\.dotnet --update-global-json
```
