---
title: "Breaking change: WinHttpHandler removed from .NET runtime"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/networking/5.0/winhttphandler-removed-from-runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# WinHttpHandler removed from .NET runtime

The `WinHttpHandler` class was removed from the *System.Net.Http.dll* assembly. It's now available only as an out-of-band (OOB) NuGet package.

## Version introduced

5.0

## Change description

In previous .NET versions, the `System.Net.Http.WinHttpHandler` class is available as part of the core .NET libraries. Starting in .NET 5, the `System.Net.Http.WinHttpHandler` class is only available as a separately installed NuGet package.

## Recommended action

Install the System.Net.Http.WinHttpHandler NuGet package. Or, if you don't require WinHTTP-specific features, use `System.Net.Http.SocketsHttpHandler` instead.

## Affected APIs

- `System.Net.Http.WinHttpHandler`
