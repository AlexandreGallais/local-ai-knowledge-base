---
title: "Configure access to dotnetup-managed .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/usecases/manage-environment.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Configure access to dotnetup-managed .NET

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

Installation and environment configuration are separate operations. Select
the access mode that fits your workflow. For descriptions of the available
modes, see
dotnetup environment configuration.

## Use command forwarding

The least persistent option is the `none` mode. It does not add the managed
.NET installation to `PATH` or set `DOTNET_ROOT`. The command below adds the
`dotnetup` executable to `PATH` so you can run it from any directory:

```dotnetcli
dotnetup env set none --dotnetup-on-path true
dotnetup dotnet -- --info
dotnetup dotnet build
```

To avoid that `PATH` change, set `--dotnetup-on-path false`. The
`dotnetup dotnet` command runs .NET from the managed installation without
adding its `dotnet` executable to `PATH`.

## Configure a shell profile

Use the `shell` mode to write a managed block to your shell profile:

```dotnetcli
dotnetup env set shell --shell pwsh
```

Supported shell values are `bash`, `zsh`, `fish`, and `pwsh`.

Open a new shell after the command finishes, or activate the current shell to apply the changes:

```powershell
dotnetup env script --shell pwsh | Invoke-Expression
```

## Configure all Windows user applications

On Windows, use `everywhere` mode to make the managed installation available
to terminals and other user applications:

```dotnetcli
dotnetup env set everywhere --shell pwsh
```

This mode is not available on Linux or macOS.

> **Important:**
> Before enabling `everywhere`, review
> Everywhere mode considerations,
> including how the mode interacts with machine-wide installations and
> framework-dependent applications.

## Inspect and correct drift

Show stored settings and compare them with the current environment:

```dotnetcli
dotnetup env show
```

Reapply stored settings:

```dotnetcli
dotnetup env set
```

## Remove environment changes

```dotnetcli
dotnetup env clear
```

This command removes dotnetup environment wiring. It does not uninstall .NET.

## See also

- Environment configuration
- dotnetup env
