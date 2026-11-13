---
title: "dotnetup env show command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup-env-show.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup env show command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup env show` - Show environment settings and report detected drift.

## Synopsis

```console
dotnetup env show [options]
```

## Description

The command displays the stored .NET access mode and `dotnetup` `PATH`
setting. It compares the stored configuration with the selected shell profile
and persisted environment. It also reports whether the current process has
the requested settings.

If the configuration has drifted, run `dotnetup env set` to reapply it.

For more information about access modes, see
dotnetup environment configuration.

## Options

| Option | Description |
| --- | --- |
| `-s`, `--shell [<bash\|zsh\|fish\|pwsh>]` | Select the profile shell to inspect. If omitted, detect the current shell. |
| `-?`, `-h`, `--help` | Show command help. |

## Example

```dotnetcli
dotnetup env show --shell zsh
```
