---
title: "Breaking change: System.Security.Cryptography APIs not supported on Blazor WebAssembly"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/5.0/cryptography-apis-not-supported-on-blazor-webassembly.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Security.Cryptography APIs not supported on Blazor WebAssembly

`System.Security.Cryptography` APIs throw a `System.PlatformNotSupportedException` at runtime when run on a browser.

## Change description

In previous .NET versions, most of the `System.Security.Cryptography` APIs aren't available to Blazor WebAssembly apps. Starting in .NET 5, Blazor WebAssembly apps target the full .NET 5 API surface area, however, not all .NET 5 APIs are supported due to browser sandbox constraints. In .NET 5 and later versions, the unsupported `System.Security.Cryptography` APIs throw a `System.PlatformNotSupportedException` when running on WebAssembly.

> **Tip:**
> The Platform compatibility analyzer will flag any calls to the affected APIs when you build a project that supports the browser platform. This analyzer runs by default in .NET 5 and later apps.

## Reason for change

Microsoft is unable to ship OpenSSL as a dependency in the Blazor WebAssembly configuration. We attempted to work around this by trying to integrate with the browser's `SubtleCrypto` API. Unfortunately, it required significant API changes that made it too hard to integrate.

## Version introduced

5.0

## Recommended action

There are no good workarounds to suggest at this time.

## Affected APIs

All `System.Security.Cryptography` APIs except the following:

- `System.Security.Cryptography.RandomNumberGenerator`
- `System.Security.Cryptography.IncrementalHash`
- `System.Security.Cryptography.SHA1`
- `System.Security.Cryptography.SHA256`
- `System.Security.Cryptography.SHA384`
- `System.Security.Cryptography.SHA512`
- `System.Security.Cryptography.SHA1Managed`
- `System.Security.Cryptography.SHA256Managed`
- `System.Security.Cryptography.SHA384Managed`
- `System.Security.Cryptography.SHA512Managed`
