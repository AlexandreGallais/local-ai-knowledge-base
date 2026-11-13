---
title: "Try .NET daily builds with dotnetup"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/usecases/try-daily-builds.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Try .NET daily builds with dotnetup

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

Daily channels give you bleeding-edge builds from the .NET build feeds. `dotnetup`
makes it easy to try these daily builds in your workspaces.

## Install a daily SDK

Install the latest daily SDK:

```dotnetcli
dotnetup sdk install daily
```

Limit the request to a release, feature band, or development phase:

```dotnetcli
dotnetup sdk install 11-daily
dotnetup sdk install 11.0-daily
dotnetup sdk install 11.0.1xx-daily
dotnetup sdk install <major>.<minor>.1xx-preview.<phase>-daily
```

## Isolate a daily SDK

Use a separate installation root when you do not want daily and stable
installations in the same root:

```dotnetcli
dotnetup sdk install daily --install-path .dotnet-daily
```

Run the installation's executable directly:

```powershell
.\.dotnet-daily\dotnet.exe --version
```

On Linux or macOS, run:

```bash
./.dotnet-daily/dotnet --version
```

`dotnetup dotnet` selects the default dotnetup-managed .NET installation root.
It does not automatically select an arbitrary `--install-path`.

## Install daily runtimes

Runtime daily channels use the same suffix:

```dotnetcli
dotnetup runtime install 11.0-daily
dotnetup runtime install user@example.com
```

## Update or remove the daily requirement

A daily channel is a rolling requirement:

```dotnetcli
dotnetup sdk update
dotnetup sdk uninstall daily --install-path .dotnet-daily
```

An exact prerelease version is pinned and is not changed by update commands.

## See also

- Daily channels
- Preview channels
- Manage custom installation roots
- How dotnetup verifies downloads
