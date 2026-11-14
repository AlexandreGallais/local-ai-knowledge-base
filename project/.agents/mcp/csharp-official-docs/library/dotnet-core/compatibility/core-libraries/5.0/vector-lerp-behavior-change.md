---
title: "Breaking change: Behavior change for Vector2.Lerp and Vector4.Lerp"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/5.0/vector-lerp-behavior-change.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Behavior change for Vector2.Lerp and Vector4.Lerp

The implementation of `System.Numerics.Vector2.Lerp(System.Numerics.Vector2,System.Numerics.Vector2,System.Single)` and `System.Numerics.Vector4.Lerp(System.Numerics.Vector4,System.Numerics.Vector4,System.Single)` changed to correctly account for a floating-point rounding error.

## Change description

Previously, `System.Numerics.Vector2.Lerp(System.Numerics.Vector2,System.Numerics.Vector2,System.Single)` and `System.Numerics.Vector4.Lerp(System.Numerics.Vector4,System.Numerics.Vector4,System.Single)` were implemented as `value1 + (value2 - value1) * amount`. However, due to a floating-point rounding error, this algorithm doesn't always return `value2` when `amount` is `1.0f`.

In .NET 5 and later, the implementation uses the same algorithm as `System.Numerics.Vector3.Lerp(System.Numerics.Vector3,System.Numerics.Vector3,System.Single)`, which is `(value1 * (1.0f - amount)) + (value2 * amount)`. This algorithm correctly accounts for the rounding error. Now, when `amount` is `1.0f`, the result is precisely `value2`. The updated algorithm also allows the algorithm to be freely optimized using `System.MathF.FusedMultiplyAdd*` when it's available.

## Version introduced

5.0

## Recommended action

No action is necessary. However, if you want to maintain the old behavior, you can implement your own `Lerp` function that uses the previous algorithm of `value1 + (value2 - value1) * amount`.

## Affected APIs

- `System.Numerics.Vector2.Lerp(System.Numerics.Vector2,System.Numerics.Vector2,System.Single)`
- `System.Numerics.Vector4.Lerp(System.Numerics.Vector4,System.Numerics.Vector4,System.Single)`
