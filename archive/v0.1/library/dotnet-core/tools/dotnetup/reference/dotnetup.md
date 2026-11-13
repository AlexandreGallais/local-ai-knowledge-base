---
title: "dotnetup command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup` - Install and manage user-level .NET SDKs and runtimes.

## Synopsis

```console
dotnetup [command] [options]
dotnetup
dotnetup --info [--format <text|json>] [--no-list]
```

## Description

`dotnetup` tracks .NET installation requirements and the concrete SDK or
runtime versions that satisfy them. A bare `dotnetup` invocation runs the SDK
install workflow. When interactive input is available and no configuration
exists, it can start first-use onboarding.

## Commands

| Command | Description |
| --- | --- |
| `sdk` | Manage .NET SDK installations. |
| `runtime` | Manage .NET runtime installations. |
| `install` | Install a component. |
| `update` | Update all tracked components. |
| `uninstall` | Remove a tracked component. |
| `list` | List tracked specifications and installations. |
| `init` | Run interactive setup. |
| `env` | Manage environment configuration. |
| `dotnet` | Run the dotnetup-managed `dotnet`. |
| `self update` | Update the dotnetup executable or configure update notifications. |

## Options

| Option | Description |
| --- | --- |
| `--info` | Display the dotnetup version, commit, process architecture, runtime identifier, and verified installation information. |
| `--version` | Display the dotnetup version. |
| `--interactive [<true\|false>]` | Allow a bare invocation to wait for user input. The default is `true` in an interactive terminal and `false` in CI or when output is redirected. |
| `-h`, `/h`, `-?`, `/?`, `--help` | Show root help. |

### --info options

| Option | Description |
| --- | --- |
| `--format <text\|json>` | Select text or JSON output. The default is `text`. |
| `--no-list [<true\|false>]` | Omit tracked specifications and installations. Without this option, `--info` verifies installations. |

## Examples

Show help and version information:

```dotnetcli
dotnetup --help
dotnetup --version
dotnetup --info
dotnetup --info --format json --no-list
```

Start first-use installation:

```dotnetcli
dotnetup
```

For predictable automation, select an explicit command and channel:

```dotnetcli
dotnetup install latest --interactive false --no-progress
```
