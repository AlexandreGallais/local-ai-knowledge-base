---
title: "dotnetup uninstall command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-uninstall.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnetup uninstall command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup uninstall` - Remove an SDK install specification and unused files.

This command is an alias for
`dotnetup sdk uninstall`.

## Synopsis

```console
dotnetup uninstall <CHANNEL> [options]
```

## Arguments

`CHANNEL`

The stored SDK channel or exact version to remove. Use `dotnetup list` to
find the stored value.

## Options

| Option | Description |
| --- | --- |
| `--source <explicit\|globaljson\|all>` | Remove specifications from the selected source. The default is `explicit`. |
| `--manifest-path <MANIFEST_PATH>` | Use a custom manifest file. |
| `--install-path <INSTALL_PATH>` | Select the installation root. Without this option, use the current managed root or the default installation root. |
| `--interactive [<true\|false>]` | Enable confirmation for unexpected outcomes. The default is `false` in CI or when output is redirected, and `true` otherwise. Redirected input alone doesn't disable confirmation. |
| `--non-interactive` | Proceed without confirmation, even if `--interactive` is enabled. Warnings still appear. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

Remove an explicit feature-band requirement:

```dotnetcli
dotnetup uninstall 10.0.1xx
```

Remove matching requirements from any source:

```dotnetcli
dotnetup uninstall 10.0.1xx --source all
```

An installation remains when another specification still refers to it.
Garbage collection can also remove other unreferenced installations in the root.
Before it changes state, the command warns about these outcomes and asks for
confirmation in interactive mode.
Press **Y** or **Enter** to proceed, or **N** or **Esc** to cancel without
removing specifications or files.
For details, see SDK uninstall behavior.
