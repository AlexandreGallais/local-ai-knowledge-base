---
title: "Breaking change: Static abstract members in interfaces"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/6.0/static-abstract-interface-methods.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Static abstract members declared in interfaces

.NET 6 previews a new feature where `static` interface members can be marked as `abstract`. This feature involves several changes to the ECMA 335 spec to allow intermediate language (IL) metadata patterns that were previously considered illegal. For more information, see dotnet/runtime#49558.

## Old behavior

If a static interface was marked as `abstract`:

- The C# compiler generated error CS0112.
- Tools and other compilers generated illegal IL metadata.

## New behavior

Starting in .NET 6, static interface members can be marked as `abstract` and will compile successfully. In addition, the IL metadata patterns that are generated are now considered legal due to changes in the ECMA 335 spec.

The implementation of `static abstract` interface members is provided by types that implement the interface.

> **Note:**
> For .NET 6, you must enable preview features in your project to be able to mark an interface member as `static abstract`.

Since this is a newly legal IL pattern, existing tooling may incorrectly process the associated metadata and have unexpected behavior. It's likely that tooling will encounter the new metadata pattern, because interfaces with `static abstract` members now appear on the primitive types, for example, `System.Int32`.

## Version introduced

.NET 6

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This change was introduced because there was no way to abstract over static members and write generalized code that applies across types that define those static members. This was particularly problematic for member kinds that only exist in a static form, for example, operators.

## Recommended action

Update any tooling that consumes .NET binaries or C# source code to account for the new concept of `static abstract` interface members, including those that now exist on the .NET primitive types.

## Affected APIs

N/A

## See also

- Tutorial: Explore static virtual members in interfaces
