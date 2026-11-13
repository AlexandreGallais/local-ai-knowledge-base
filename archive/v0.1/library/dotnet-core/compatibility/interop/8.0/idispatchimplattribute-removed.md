---
title: "Breaking change: IDispatchImplAttribute API is removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/interop/8.0/idispatchimplattribute-removed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IDispatchImplAttribute API is removed

The `System.Runtime.InteropServices.IDispatchImplAttribute` implementation has officially been removed from .NET. This type was only discoverable at runtime and its removal has no impact on visible API surface area. However, if an assembly targeting .NET Framework uses this type and is loaded in .NET 8 or a later version, the runtime will throw a `System.TypeLoadException`.

## Previous behavior

The `System.Runtime.InteropServices.IDispatchImplAttribute` type could be found at runtime, but none of the documented semantics of the deprecated attribute applied.

## New behavior

Starting in .NET 8, attempting to load an assembly that contains this attribute throws a `System.TypeLoadException`.

## Version introduced

.NET 8 Preview 6

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This attribute was removed as it was not longer respected and served no functional purpose.

## Recommended action

Remove use of this API in assemblies that are loaded in .NET 8 and later versions.

## Affected APIs

- `System.Runtime.InteropServices.IDispatchImplAttribute`
