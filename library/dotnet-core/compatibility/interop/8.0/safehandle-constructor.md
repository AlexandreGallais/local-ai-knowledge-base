---
title: "Breaking change: SafeHandle types must have public constructor"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/interop/8.0/safehandle-constructor.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# SafeHandle types must have public constructor

Historically, passing `System.Runtime.InteropServices.SafeHandle`-derived types to P/Invokes and COM methods has implicitly required a parameterless constructor of any visibility when a `SafeHandle`-derived type is passed as a `ref` or `out` parameter or a return type. Source-generated interop in .NET 7 allowed this behavior to enable easier migration from `System.Runtime.InteropServices.DllImportAttribute`-based P/Invokes. At the same time, we updated the SafeHandle documentation to tell implementers to provide a `public` parameterless constructor in their derived type. This breaking change makes that recommendation a requirement for source-generated marshalling.

## Previous behavior

A `System.Runtime.InteropServices.SafeHandle`-derived type was required to have a parameterless constructor *of any visibility* when it was used:

- As a `ref` or `out` parameter or a return type in a `System.Runtime.InteropServices.LibraryImportAttribute`-attributed method.
- In a method on a `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute`-attributed interface.

## New behavior

A `System.Runtime.InteropServices.SafeHandle`-derived type is required to have a `public` parameterless constructor when it's used:

- As a `ref` or `out` parameter or a return type in a `System.Runtime.InteropServices.LibraryImportAttribute`-attributed method.
- In a method on a `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute`-attributed interface.

If the type doesn't have a `public` parameterless constructor, the interop source generator emits a compile error.

## Version introduced

.NET 8 Preview 5

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The interop source generators are changing to push more code out of the source generators themselves and into the core .NET libraries. As part of this change, the interop team is starting to enforce the recommended guidelines for more maintainable and understandable interop code.

## Recommended action

Change the existing non-`public` parameterless constructor on the `SafeHandle`-derived type to be `public`.

## Affected APIs

- `System.Runtime.InteropServices.LibraryImportAttribute`
- `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute`
