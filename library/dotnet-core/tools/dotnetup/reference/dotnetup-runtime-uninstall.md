---
title: "dotnetup runtime uninstall command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/reference/dotnetup-runtime-uninstall.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnetup runtime uninstall command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup runtime uninstall` - Remove a runtime specification and unused
files.

## Synopsis

```console
dotnetup runtime uninstall <COMPONENT_SPEC> [options]
```

## Arguments

`COMPONENT_SPEC`

The stored runtime requirement to remove. Use
`component@version-or-channel` to select a component. A value without a
component selects the core .NET runtime.

The command accepts one argument and matches the stored specification name.
For the core runtime, use `runtime@11.0` or `11.0`, not `11.0@core`.

## Options

| Option | Description |
| --- | --- |
| `--source <explicit\|globaljson\|all>` | Remove specifications from the selected source. The default is `explicit`. Runtime specifications are normally explicit. |
| `--manifest-path <MANIFEST_PATH>` | Use a custom manifest file. |
| `--install-path <INSTALL_PATH>` | Select the installation root. |
| `--interactive [<true\|false>]` | Enable confirmation for unexpected outcomes. The default is `false` in CI or when output is redirected, and `true` otherwise. Redirected input alone doesn't disable confirmation. |
| `--non-interactive` | Proceed without confirmation, even if `--interactive` is enabled. Warnings still appear. |
| `-?`, `-h`, `--help` | Show command help. |

## Behavior

Uninstall removes matching specifications, then runs garbage collection for
the whole installation root, including SDKs and other runtime components.
Before it changes state, the command warns if other specifications retain
requested installations or if additional installations will be removed.
The warning summary identifies each specification that will be removed from
tracking, including its component and source.

When either warning applies in interactive mode, press **Y** or **Enter** to
proceed, or **N** or **Esc** to cancel.
Cancellation doesn't remove specifications or files.
In noninteractive mode, the command prints the warnings and proceeds without confirmation.
If other specifications retain a runtime, the requested specifications are
removed, but that runtime stays installed.

## Examples

```dotnetcli
dotnetup runtime uninstall 10.0
dotnetup runtime uninstall aspnetcore@10.0
dotnetup runtime uninstall windowsdesktop@10.0 --install-path .\.dotnet
```
