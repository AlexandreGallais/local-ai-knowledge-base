---
title: "dotnetup env command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-env.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
