---
title: "dotnetup init command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-init.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnetup init command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup init` - Configure dotnetup and install .NET through an interactive
setup flow.

## Synopsis

```console
dotnetup init [options]
```

## Description

The setup flow presents the effective install path and starter SDK channel.
It lets you select an access mode and whether the `dotnetup` executable is on
`PATH`. It can also offer to migrate matching native-architecture
system-managed installations. For descriptions of the access modes, see
dotnetup environment configuration.

The current public-preview build first asks whether to install with the
recommended settings. Select **No, customize setup** to choose another SDK
channel, access mode, or migration option.

Run this command again to reconfigure dotnetup.

## Options

| Option | Description |
| --- | --- |
| `--install-path <INSTALL_PATH>` | Select the installation root. |
| `--manifest-path <MANIFEST_PATH>` | Use a custom manifest file. |
| `--no-progress [<true\|false>]` | Disable progress display. |
| `-s`, `--shell [<bash\|zsh\|fish\|pwsh>]` | Select the profile shell. If omitted, detect the current shell. |
| `-v`, `--verbosity <normal\|detailed>` | Set output verbosity. The default is `normal`. |
| `--require-muxer-update [<true\|false>]` | Fail if the command cannot update the `dotnet` executable. By default, installation continues with a warning. |
| `--interactive [<true\|false>]` | Allow the command to wait for input. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

```dotnetcli
dotnetup init
dotnetup init --shell bash
dotnetup init --install-path .\.dotnet
```
