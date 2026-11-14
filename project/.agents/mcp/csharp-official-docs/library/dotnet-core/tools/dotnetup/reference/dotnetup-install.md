---
title: "dotnetup install command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-install.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnetup install command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup install` - Install one or more .NET SDK requirements.

This command is an alias for `dotnetup sdk install`.

## Synopsis

```console
dotnetup install [<CHANNEL>...] [options]
```

## Arguments

`CHANNEL`

One or more SDK channels or exact versions. If you omit this argument,
`dotnetup` derives a channel from the nearest `global.json`. If it cannot
derive one, it uses `latest`.

## Options

| Option | Description |
| --- | --- |
| `--install-path <INSTALL_PATH>` | Select the installation root. |
| `--set-default-install [<true\|false>]` | The current parser accepts this option. The current install handler does not apply its environment changes. Use `dotnetup env set` after installation. |
| `--migrate-from-system [<true\|false>]` | Install matching native-architecture SDKs from a system-managed installation into the selected installation root. |
| `--update-global-json [<true\|false>]` | Replace `sdk.version` in the applicable `global.json` with the installed version. |
| `--manifest-path <MANIFEST_PATH>` | Use a custom manifest file. |
| `--interactive [<true\|false>]` | Allow first-use onboarding to wait for input. |
| `--no-progress [<true\|false>]` | Disable progress display. |
| `-v`, `--verbosity <normal\|detailed>` | Set output verbosity. The default is `normal`. |
| `--require-muxer-update [<true\|false>]` | Fail if the command cannot update the `dotnet` executable. By default, installation continues with a warning. |
| `--untracked [<true\|false>]` | Install without adding a manifest record. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

Install the latest stable SDK:

```dotnetcli
dotnetup install latest
```

Install several requirements:

```dotnetcli
dotnetup install 9.0 10.0.1xx preview
```

Install the requirement from `global.json` and write the resolved version:

```dotnetcli
dotnetup install --update-global-json
```

Install in a repository-local installation root:

```dotnetcli
dotnetup install 10.0.1xx --install-path .\.dotnet
```
