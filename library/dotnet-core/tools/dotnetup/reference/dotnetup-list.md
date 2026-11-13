---
title: "dotnetup list command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup-list.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup list command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup list` - List tracked .NET requirements and installations.

## Synopsis

```console
dotnetup list [options]
```

## Description

The text output groups tracked channels and installed versions by
installation root. Each specification includes its source. Each installation
includes its architecture and, by default, its validation state.

JSON output has two arrays:

- `installSpecs`
- `installations`

Property names use camel case. Enum values use their names.

## Options

| Option | Description |
| --- | --- |
| `--format <text\|json>` | Select text or JSON output. The default is `text`. |
| `--no-verify [<true\|false>]` | Do not validate each recorded installation on disk. |
| `--manifest-path <MANIFEST_PATH>` | Use a custom manifest file. |
| `--install-path <INSTALL_PATH>` | Show only the matching installation root. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

List and verify all tracked installations:

```dotnetcli
dotnetup list
```

Create JSON output without file validation:

```dotnetcli
dotnetup list --format json --no-verify
```
