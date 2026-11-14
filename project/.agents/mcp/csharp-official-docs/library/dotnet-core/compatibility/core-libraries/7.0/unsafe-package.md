---
title: ".NET 7 breaking change: System.Runtime.CompilerServices.Unsafe NuGet package"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/7.0/unsafe-package.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Runtime.CompilerServices.Unsafe NuGet package

New versions of the System.Runtime.CompilerServices.Unsafe NuGet package will no longer be produced.

## Previous behavior

New versions of the System.Runtime.CompilerServices.Unsafe NuGet package were produced with each new .NET \[Core] version.

## New behavior

Starting in .NET 7, new functionality will ship as part of the shared framework for .NET.

## Version introduced

.NET 7 Preview 3

## Reason for change

There were previously two different implementations of the `Unsafe` type: one that was referenced and used inside the core libraries, and one that shipped as a separate NuGet package. This duplicated code and was also a maintenance burden for JIT and AOT, so we unified the implementations. The NuGet package no longer needs to be produced, as the unified implementation of `Unsafe` ships as part of the shared framework for .NET.

## Recommended action

You can continue to use older versions of the packages if you're targeting .NET 6 or earlier. But starting from .NET 7, you should remove the package dependency and instead use the API that comes as part of the shared framework.

## Affected APIs

- All of the APIs under `System.Runtime.CompilerServices.Unsafe`.
