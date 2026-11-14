---
title: "Breaking change: RuntimeHelpers.GetSubArray returns different type"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/9.0/getsubarray-return.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# RuntimeHelpers.GetSubArray returns different type

The type of array instance returned by `System.Runtime.CompilerServices.RuntimeHelpers.GetSubArray``1(``0[],System.Range)` has changed to match the source array. `RuntimeHelpers.GetSubArray` is used by C# compiler to implement range operator for arrays.

This behavior change can be observed only by code that uses covariant array conversions.

## Previous behavior

Previously, `RuntimeHelpers.GetSubArray<T>(T[] array, Range range)` returned an array instance of type `T[]`.

For example, the type of array instance returned by `RuntimeHelpers.GetSubArray<object>(new string[1], ...)` was `object[]`.

## New behavior

Starting in .NET 9, `RuntimeHelpers.GetSubArray<T>(T[] array, Range range)` returns an array instance of the same type as the `array` parameter.

For example, the type of array instance returned by `RuntimeHelpers.GetSubArray<object>(new string[1], ...)` is `string[]`.

## Version introduced

.NET 9 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

The design of C# pattern-matching features assumes that the type of array instance returned by `System.Runtime.CompilerServices.RuntimeHelpers.GetSubArray``1(``0[],System.Range)` matches the source array. The previous behavior led to unexpected behavior of certain complex pattern expressions that used slicing of covariant arrays. For more information, see dotnet/roslyn#69053.

## Recommended action

The recommended action is to remove dependency of the affected code on array covariance.

For example, change:

```csharp
object[] arr = new string[1];
M(arr[1..2]);
```

to:

```csharp
string[] arr = new string[1];
M(arr[1..2]);
```

## Affected APIs

- `System.Runtime.CompilerServices.RuntimeHelpers.GetSubArray``1(``0[],System.Range)`
