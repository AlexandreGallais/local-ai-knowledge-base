---
title: "Use the dotnetup preview channel"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnetup/channels/preview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Use the dotnetup preview channel

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

The `preview` channel selects the latest available preview or GoLive .NET
release. If no active preview is available, the resolver selects an active
release.

## Install a preview SDK

```dotnetcli
dotnetup sdk install preview
```

The tracked specification remains `preview`. A later update can move it to a
newer preview:

```dotnetcli
dotnetup sdk update
```

## Install preview runtimes

Select one or more runtime components:

```dotnetcli
dotnetup runtime install runtime@preview aspnetcore@preview
```

The Windows Desktop runtime is available only on Windows:

```dotnetcli
dotnetup runtime install windowsdesktop@preview
```

## Pin one prerelease version

Use the full version from the published release metadata when you need one
specific prerelease. Replace `<sdk-version>` with that full version:

```dotnetcli
dotnetup sdk install <sdk-version>
```

An exact prerelease version is pinned, so update commands do not advance it.
Use the `preview` channel when you want the latest available preview instead.

## Preview and daily are different

The `preview` channel uses published release metadata. A daily channel uses
daily-build endpoints and can select builds that are not published previews.
For more information, see Daily channels.

## Remove the preview requirement

```dotnetcli
dotnetup sdk uninstall preview
```

This command removes the explicit `preview` specification. Files remain if
another specification still requires them.
