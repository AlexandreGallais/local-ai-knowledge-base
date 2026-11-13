---
title: "dotnetup sdk command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup-sdk.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup sdk command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup sdk` - Manage .NET SDK installations.

## Synopsis

```console
dotnetup sdk <command> [options]
```

## Commands

| Command | Description |
| --- | --- |
| `install` | Install one or more SDK requirements. |
| `update` | Update tracked SDK requirements. |
| `uninstall` | Remove an SDK requirement and unused files. |

## Options

| Option | Description |
| --- | --- |
| `-?`, `-h`, `--help` | Show command help. |

## Example

```dotnetcli
dotnetup sdk install 10.0.1xx
dotnetup sdk update
dotnetup sdk uninstall 10.0.1xx
```
