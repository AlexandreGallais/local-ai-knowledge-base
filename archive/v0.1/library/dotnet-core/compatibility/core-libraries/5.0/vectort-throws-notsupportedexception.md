---
title: "Breaking change: Vector<T> throws NotSupportedException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/vectort-throws-notsupportedexception.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Vector\<T> always throws NotSupportedException for unsupported types

`System.Numerics.Vector`1` now always throws a `System.NotSupportedException` for unsupported type parameters.

## Change description

Previously, members of `System.Numerics.Vector`1` would not always throw a `System.NotSupportedException` when `T` was an unsupported type. The exception wasn't always thrown because of code paths that supported hardware acceleration. For example, `Vector<bool> + Vector<bool>` returned `default` instead of throwing an exception on platforms that have no hardware acceleration, such as Arm32. For unsupported types, `System.Numerics.Vector`1` members exhibited inconsistent behavior across different platforms and hardware configurations.

Starting in .NET 5, `System.Numerics.Vector`1` members always throw a `System.NotSupportedException` on all hardware configurations when `T` is not a supported type.

### Unsupported types

The supported types for the type parameter of `System.Numerics.Vector`1` are:

- `byte`
- `sbyte`
- `short`
- `ushort`
- `int`
- `uint`
- `long`
- `ulong`
- `float`
- `double`

The supported types have not changed, however, they may change in the future.

## Version introduced

5.0

## Recommended action

Don't use an unsupported type for the type parameter of `System.Numerics.Vector`1`.

## Affected APIs

- `System.Numerics.Vector`1` and all its members
