---
title: "dotnetup env set command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup-env-set.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup env set command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup env set` - Apply or reapply dotnetup environment settings.

## Synopsis

```console
dotnetup env set [<MODE>] [options]
```

## Arguments

`MODE`

The optional .NET access mode:

| Access mode | Behavior |
| --- | --- |
| `none` | Does not modify these environment variables. Run .NET with `dotnetup dotnet`. |
| `shell` | Modifies the shell profile to set these environment variables. Processes started from that shell use the .NET SDKs and Runtimes installed by dotnetup. |
| `everywhere` | Modifies the system `PATH` and sets the user-level `DOTNET_ROOT` environment variable. Only available on Windows. |

For details about each mode and considerations for `everywhere`, see
dotnetup environment configuration.

When you omit `MODE`, the command reapplies the stored mode. The command
fails if no readable configuration exists.

## Options

| Option | Description |
| --- | --- |
| `--dotnetup-on-path <true\|false>` | Add or remove the directory that contains `dotnetup` from `PATH`. If omitted, preserve the stored value. The first stored configuration defaults to `true`. |
| `-s`, `--shell [<bash\|zsh\|fish\|pwsh>]` | Select the profile shell. If omitted, detect the current shell. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

Use the managed `dotnet` from Bash:

```dotnetcli
dotnetup env set shell --shell bash
```

Keep only `dotnetup` on `PATH`:

```dotnetcli
dotnetup env set none --dotnetup-on-path true
```

Correct drift by reapplying stored settings:

```dotnetcli
dotnetup env set
```
