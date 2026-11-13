---
title: ".NET 7 breaking change: Equals method behavior change for NaN"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/7.0/equals-nan.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Equals method behavior change for NaN

The `Equals(T other)` instance method for the following types was updated to meet the `System.IEquatable`1` implementation requirements. As a result, the method now correctly handles NaN. This change ensures the types can correctly be used alongside `GetHashCode`, `System.Collections.Generic.Dictionary`2`, and other hash sets.

- `System.Numerics.Matrix3x2`
- `System.Numerics.Matrix4x4`
- `System.Numerics.Plane`
- `System.Numerics.Quaternion`
- `System.Numerics.Vector2`
- `System.Numerics.Vector3`
- `System.Numerics.Vector4`
- `System.Numerics.Vector`1`
- `System.Runtime.Intrinsics.Vector64`1`
- `System.Runtime.Intrinsics.Vector128`1`
- `System.Runtime.Intrinsics.Vector256`1`

## Previous behavior

Previously, the `Equals(T other)` instance method followed the IEEE 754 requirements and deferred to the `==` implementation. This meant that `NaN != NaN`, even when the two NaN are bitwise identical.

For example:

```csharp
float f = float.NaN;
Console.WriteLine(f == f);         // False
Console.WriteLine(f.Equals(f));   // True
```

While for several of the listed types:

```csharp
Vector2 v = new Vector2(float.NaN);
Console.WriteLine(v == v);        // False
Console.WriteLine(v.Equals(v));   // False
```

This is problematic because using one of these types as a key in a dictionary meant that the key could never be resolved:

```csharp
Vector2 v = new Vector2(float.NaN);
var s = new HashSet<Vector2>();
s.Add(v);
Console.WriteLine(s.Contains(v)); // False
```

## New behavior

The behavior is now the same as for the primitive floating-point types, which is that the `==` and `!=` methods continue to follow the IEEE 754 requirements where `NaN != NaN`. But the `Equals(T other)` instance methods follow the `System.IEquatable`1` requirements so that `NaN.Equals(NaN)`.

For example (no change):

```csharp
float f = float.NaN;
Console.WriteLine(f == f);         // False
Console.WriteLine(f.Equals(f));   // True
```

While for several of the listed types (the second line now prints `True`):

```csharp
Vector2 v = new Vector2(float.NaN);
Console.WriteLine(v == v);        // False
Console.WriteLine(v.Equals(v));   // True
```

And when used in some hash set (the output now prints `True`):

```csharp
Vector2 v = new Vector2(float.NaN);
var s = new HashSet<Vector2>();
s.Add(v);
Console.WriteLine(s.Contains(v)); // True
```

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The previous implementation did not meet the implementation requirements of `System.IEquatable`1` or `object.Equals(object obj)`. This resulted in the affected types not being usable in hash sets or with `GetHashCode`.

## Recommended action

If you prefer the previous behavior, switch to using `==` or `!=` instead of `Equals(T other)`.

## Affected APIs

- `System.Numerics.Matrix3x2.Equals*`
- `System.Numerics.Matrix4x4.Equals*`
- `System.Numerics.Plane.Equals*`
- `System.Numerics.Quaternion.Equals*`
- `System.Numerics.Vector2.Equals*`
- `System.Numerics.Vector3.Equals*`
- `System.Numerics.Vector4.Equals*`
- `System.Numerics.Vector`1.Equals*`
- `System.Runtime.Intrinsics.Vector64`1.Equals*`
- `System.Runtime.Intrinsics.Vector128`1.Equals*`
- `System.Runtime.Intrinsics.Vector256`1.Equals*`
