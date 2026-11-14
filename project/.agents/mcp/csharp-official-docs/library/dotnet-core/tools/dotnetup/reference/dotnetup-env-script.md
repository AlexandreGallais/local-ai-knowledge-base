---
title: "dotnetup env script command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/reference/dotnetup-env-script.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnetup env script command

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

## Name

`dotnetup env script` - Generate shell code that activates dotnetup settings.

## Synopsis

```console
dotnetup env script [options]
```

## Description

Without selection options, the generated script follows the stored
configuration. If no configuration exists, it includes both the managed
`dotnet` and `dotnetup`.

With selection options, it includes only the requested parts.

## Options

| Option | Description |
| --- | --- |
| `-s`, `--shell [<bash\|zsh\|fish\|pwsh>]` | Select the script syntax. If omitted, detect the current shell. |
| `-d`, `--dotnet-install-path ` | Use a specific .NET installation root. The default is the default dotnetup-managed installation root. |
| `--dotnet` | Add the selected .NET root to `PATH` and set `DOTNET_ROOT`. |
| `--dotnetup` | Add the directory that contains `dotnetup` to `PATH`. |
| `-?`, `-h`, `--help` | Show command help. |

## Examples

Activate the stored configuration in Bash:

```bash
eval "$(dotnetup env script --shell bash)"
```

Activate only a repository-local .NET installation in PowerShell:

```powershell
dotnetup env script --shell pwsh --dotnet --dotnet-install-path .\.dotnet |
  Invoke-Expression
```

Generate script text without evaluating it:

```dotnetcli
dotnetup env script --shell fish --dotnet --dotnetup
```
