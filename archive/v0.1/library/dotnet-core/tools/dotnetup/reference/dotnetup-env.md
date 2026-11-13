---
title: "dotnetup env command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup-env.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup env command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup env` - Manage `PATH` and `DOTNET_ROOT` configuration.

## Synopsis

```console
dotnetup env <command> [options]
```

## Commands

| Command | Description |
| --- | --- |
| `set` | Apply or reapply environment settings. |
| `clear` | Remove all dotnetup environment wiring. |
| `show` | Show stored settings and detected drift. |
| `script` | Generate a shell activation script. |

## Options

| Option | Description |
| --- | --- |
| `-?`, `-h`, `--help` | Show command help. |

For the access-mode model, see
Environment configuration.
