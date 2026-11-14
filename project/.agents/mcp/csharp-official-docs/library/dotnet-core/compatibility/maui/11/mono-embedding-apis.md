---
title: "Breaking change - Mono embedding APIs no longer supported on mobile platforms"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/maui/11/mono-embedding-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Mono embedding APIs no longer supported on mobile platforms

In .NET 11, Mono embedding APIs are no longer supported on mobile platforms.

## Version introduced

.NET 11

## Previous behavior

Native code could embed Mono by using Mono header files, linking to
`libmonosgen-2.0`, and calling `mono_*` APIs. These APIs exposed runtime,
domain, metadata, object, method-call, GC-handle, internal-call, thread, and
profiling features.

## New behavior

Mono embedding APIs are no longer supported. CoreCLR on mobile platforms
doesn't provide a direct replacement for the Mono embedding API.

This change doesn't affect normal P/Invoke, `System.Runtime.InteropServices.LibraryImportAttribute`, Java interop, or
Objective-C interop.

## Type of breaking change

This change is source incompatible, binary incompatible, and a behavioral change.

## Reason for change

Mono and CoreCLR use different hosting and embedding interfaces.

## Recommended action

- Follow
  native interoperability best practices.
- Use `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute` and C# function pointers for native-to-managed
  callbacks.
- Use values that have the same layout in managed and native code (blittable
  values).
- Consider moving performance-critical, chatty managed/native interfaces to a
  fully managed implementation to reduce interop overhead.

## Affected APIs

- The Mono native embedding API, including `mono_*` functions and
  `libmonosgen-2.0`.
