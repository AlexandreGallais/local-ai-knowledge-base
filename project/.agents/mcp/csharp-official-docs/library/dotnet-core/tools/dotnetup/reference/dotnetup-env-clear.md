---
title: "dotnetup env clear command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-env-clear.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnetup env clear command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup env clear` - Remove all dotnetup environment wiring.

## Synopsis

```console
dotnetup env clear [options]
```

## Description

The command removes managed `PATH` and `DOTNET_ROOT` changes and stores the
`none` access mode with `dotnetup` removed from `PATH`. It is equivalent to:

```dotnetcli
dotnetup env set none --dotnetup-on-path false
```

It does not uninstall .NET.

For more information about access modes, see
dotnetup environment configuration.

## Options

| Option | Description |
| --- | --- |
| `-s`, `--shell [<bash\|zsh\|fish\|pwsh>]` | Select the profile shell to update. If omitted, detect the current shell. |
| `-?`, `-h`, `--help` | Show command help. |

## Example

```dotnetcli
dotnetup env clear --shell pwsh
```
