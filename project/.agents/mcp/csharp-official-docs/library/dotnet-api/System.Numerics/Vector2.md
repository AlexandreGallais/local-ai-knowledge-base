---
title: "Vector2 struct (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector2 struct

Namespace: `System.Numerics`

```csharp
public struct Vector2 : IEquatable<System.Numerics.Vector2>, IFormattable
```

Represents a vector with two single-precision floating-point values.

#### Remarks
The `Vector2` structure provides support for hardware acceleration.

## Vector2.Vector2(Single>) constructor

```csharp
public Vector2 (ReadOnlySpan<float> values);
```

Constructs a vector from the given `ReadOnlySpan<T>`. The span must contain at least two elements.

Parameters:

- `values`: The span of elements to assign to the vector.

To be added.

## Vector2.Vector2(Single) constructor

```csharp
public Vector2 (float value);
```

Creates a new `Vector2` object whose two elements have the same value.

Parameters:

- `value`: The value to assign to both elements.

To be added.

## Vector2.Vector2(Single, Single) constructor

```csharp
public Vector2 (float x, float y);
```

Creates a vector whose elements have the specified values.

Parameters:

- `x`: The value to assign to the `Vector2.X` field.
- `y`: The value to assign to the `Vector2.Y` field.

To be added.

## Vector2.AllBitsSet property

```csharp
public static System.Numerics.Vector2 AllBitsSet { get; }
```

To be added.

Returns: To be added.

To be added.

## Vector2.E property

```csharp
public static System.Numerics.Vector2 E { get; }
```

Gets a vector whose elements are equal to `Single.E`.

Returns: A vector whose elements are equal to `Single.E` (that is, it returns the vector
```csharp
Create(float.E)
```
).

To be added.

## Vector2.Epsilon property

```csharp
public static System.Numerics.Vector2 Epsilon { get; }
```

Gets a vector whose elements are equal to `Single.Epsilon`.

Returns: A vector whose elements are equal to `Single.Epsilon` (that is, it returns the vector
```csharp
Create(float.Epsilon)
```
).

To be added.

## Vector2.Item property

```csharp
public float this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The index of the element to get or set.

Returns: The the element at `index`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` was less than zero or greater than the number of elements.

To be added.

## Vector2.NaN property

```csharp
public static System.Numerics.Vector2 NaN { get; }
```

Gets a vector whose elements are equal to `Single.NaN`.

Returns: A vector whose elements are equal to `Single.NaN` (that is, it returns the vector
```csharp
Create(float.NaN)
```
).

To be added.

## Vector2.NegativeInfinity property

```csharp
public static System.Numerics.Vector2 NegativeInfinity { get; }
```

Gets a vector whose elements are equal to `Single.NegativeInfinity`.

Returns: A vector whose elements are equal to `Single.NegativeInfinity` (that is, it returns the vector
```csharp
Create(float.NegativeInfinity)
```
).

To be added.

## Vector2.NegativeZero property

```csharp
public static System.Numerics.Vector2 NegativeZero { get; }
```

Gets a vector whose elements are equal to `Single.NegativeZero`.

Returns: A vector whose elements are equal to `Single.NegativeZero` (that is, it returns the vector
```csharp
Create(float.NegativeZero)
```
).

To be added.

## Vector2.One property

```csharp
public static System.Numerics.Vector2 One { get; }
```

Gets a vector whose 2 elements are equal to one.

Returns: A vector whose two elements are equal to one (that is, it returns the vector
```csharp
(1,1)
```
).

To be added.

## Vector2.Pi property

```csharp
public static System.Numerics.Vector2 Pi { get; }
```

Gets a vector whose elements are equal to `Single.Pi`.

Returns: A vector whose elements are equal to `Single.Pi` (that is, it returns the vector
```csharp
Create(float.Pi)
```
).

To be added.

## Vector2.PositiveInfinity property

```csharp
public static System.Numerics.Vector2 PositiveInfinity { get; }
```

Gets a vector whose elements are equal to `Single.PositiveInfinity`.

Returns: A vector whose elements are equal to `Single.PositiveInfinity` (that is, it returns the vector
```csharp
Create(float.PositiveInfinity)
```
).

To be added.

## Vector2.Tau property

```csharp
public static System.Numerics.Vector2 Tau { get; }
```

Gets a vector whose elements are equal to `Single.Tau`.

Returns: A vector whose elements are equal to `Single.Tau` (that is, it returns the vector
```csharp
Create(float.Tau)
```
).

To be added.

## Vector2.UnitX property

```csharp
public static System.Numerics.Vector2 UnitX { get; }
```

Gets the vector (1,0).

Returns: The vector `(1,0)`.

To be added.

## Vector2.UnitY property

```csharp
public static System.Numerics.Vector2 UnitY { get; }
```

Gets the vector (0,1).

Returns: The vector `(0,1)`.

To be added.

## Vector2.Zero property

```csharp
public static System.Numerics.Vector2 Zero { get; }
```

Returns a vector whose 2 elements are equal to zero.

Returns: A vector whose two elements are equal to zero (that is, it returns the vector
```csharp
(0,0)
```
).

To be added.

## Vector2.Abs(Vector2) method

```csharp
public static System.Numerics.Vector2 Abs (System.Numerics.Vector2 value);
```

Returns a vector whose elements are the absolute values of each of the specified vector's elements.

Parameters:

- `value`: A vector.

Returns: The absolute value vector.

To be added.

## Vector2.Add(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 Add (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

Adds two vectors together.

Parameters:

- `left`: The first vector to add.
- `right`: The second vector to add.

Returns: The summed vector.

To be added.

## Vector2.All(Vector2, Single) method

```csharp
public static bool All (System.Numerics.Vector2 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector2.AllWhereAllBitsSet(Vector2) method

```csharp
public static bool AllWhereAllBitsSet (System.Numerics.Vector2 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector2.AndNot(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 AndNot (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector2.Any(Vector2, Single) method

```csharp
public static bool Any (System.Numerics.Vector2 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector2.AnyWhereAllBitsSet(Vector2) method

```csharp
public static bool AnyWhereAllBitsSet (System.Numerics.Vector2 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector2.BitwiseAnd(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 BitwiseAnd (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector2.BitwiseOr(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 BitwiseOr (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector2.Clamp(Vector2, Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 Clamp (System.Numerics.Vector2 value1, System.Numerics.Vector2 min, System.Numerics.Vector2 max);
```

Restricts a vector between a minimum and a maximum value.

Parameters:

- `value1`: The vector to restrict.
- `min`: The minimum value.
- `max`: The maximum value.

Returns: The restricted vector.

To be added.

## Vector2.ClampNative(Vector2, Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 ClampNative (System.Numerics.Vector2 value1, System.Numerics.Vector2 min, System.Numerics.Vector2 max);
```

Restricts a vector between a minimum and a maximum value using platform specific behavior for
```csharp
NaN
```
and
```csharp
NegativeZero
```
..

Parameters:

- `min`: The minimum value.
- `max`: The maximum value.

Returns: The restricted vector.

To be added.

## Vector2.ConditionalSelect(Vector2, Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 ConditionalSelect (System.Numerics.Vector2 condition, System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

To be added.

Parameters:

- `condition`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector2.CopySign(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 CopySign (System.Numerics.Vector2 value, System.Numerics.Vector2 sign);
```

Copies the per-element sign of a vector to the per-element sign of another vector.

Parameters:

- `value`: The vector whose magnitude is used in the result.
- `sign`: The vector whose sign is used in the result.

Returns: A vector with the magnitude of
```csharp
value
```
and the sign of
```csharp
sign
```
.

To be added.

## Vector2.CopyTo(Single[]) method

```csharp
public readonly void CopyTo (float[] array);
```

Copies the elements of the vector to a specified array.

Parameters:

- `array`: The destination array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: The number of elements in the current instance is greater than in the array.
- `RankException`: `array` is multidimensional.
- `NullReferenceException`: `array` is `null`.

#### Remarks
`array` must have at least two elements. The method copies the vector's elements starting at index 0.

## Vector2.CopyTo(Single>) method

```csharp
public readonly void CopyTo (Span<float> destination);
```

Copies the vector to the given `Span<T>`.The length of the destination span must be at least 2.

Parameters:

- `destination`: The destination span into which the values are copied.

Exceptions:

- `ArgumentException`: The number of elements in the source vector is greater than the number of elements available in destination span.

To be added.

## Vector2.CopyTo(Single[], Int32) method

```csharp
public readonly void CopyTo (float[] array, int index);
```

Copies the elements of the vector to a specified array starting at a specified index position.

Parameters:

- `array`: The destination array.
- `index`: The index at which to copy the first element of the vector.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: The number of elements in the current instance is greater than in the array.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than or equal to the array length.
- `RankException`: `array` is multidimensional.
- `NullReferenceException`: `array` is `null`.

#### Remarks
`array` must have a sufficient number of elements to accommodate the two vector elements. In other words, elements `index` and `index` + 1 must already exist in `array`.

## Vector2.Cos(Vector2) method

```csharp
public static System.Numerics.Vector2 Cos (System.Numerics.Vector2 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector2.Count(Vector2, Single) method

```csharp
public static int Count (System.Numerics.Vector2 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector2.CountWhereAllBitsSet(Vector2) method

```csharp
public static int CountWhereAllBitsSet (System.Numerics.Vector2 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector2.Create(Single>) method

```csharp
public static System.Numerics.Vector2 Create (ReadOnlySpan<float> values);
```

Constructs a vector from the given `ReadOnlySpan<T>`. The span must contain at least 2 elements.

Parameters:

- `values`: The span of elements to assign to the vector.

Returns: A new `Vector2` whose elements have the specified values.

To be added.

## Vector2.Create(Single) method

```csharp
public static System.Numerics.Vector2 Create (float value);
```

Creates a new `Vector2` object whose two elements have the same value.

Parameters:

- `value`: The value to assign to all two elements.

Returns: A new `Vector2` whose two elements have the same value.

To be added.

## Vector2.Create(Single, Single) method

```csharp
public static System.Numerics.Vector2 Create (float x, float y);
```

Creates a vector whose elements have the specified values.

Parameters:

- `x`: The value to assign to the `Vector2.X` field.
- `y`: The value to assign to the `Vector2.Y` field.

Returns: A new `Vector2` whose elements have the specified values.

To be added.

## Vector2.CreateScalar(Single) method

```csharp
public static System.Numerics.Vector2 CreateScalar (float x);
```

Creates a vector with `Vector2.X` initialized to the specified value and the remaining elements initialized to zero.

Parameters:

- `x`: The value to assign to the `Vector2.X` field.

Returns: A new `Vector2` with `Vector2.X` initialized `x` and the remaining elements initialized to zero.

To be added.

## Vector2.CreateScalarUnsafe(Single) method

```csharp
public static System.Numerics.Vector2 CreateScalarUnsafe (float x);
```

Creates a vector with `Vector2.X` initialized to the specified value and the remaining elements left uninitialized.

Parameters:

- `x`: The value to assign to the `Vector2.X` field.

Returns: A new `Vector2` with `Vector2.X` initialized `x` and the remaining elements left uninitialized.

To be added.

## Vector2.Cross(Vector2, Vector2) method

```csharp
public static float Cross (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
```

Returns the z-value of the cross product of two vectors.

Since the Vector2 is in the x-y plane, a 3D cross product only produces the z-value.

Parameters:

- `value1`: The first vector.
- `value2`: The second vector.

Returns: The value of the z-coordinate from the cross product.

Return z-value = value1.X * value2.Y - value1.Y * value2.X `Vector2.Cross` is the same as taking the `Vector2.Dot` with the second vector that has been rotated 90-degrees.

## Vector2.DegreesToRadians(Vector2) method

```csharp
public static System.Numerics.Vector2 DegreesToRadians (System.Numerics.Vector2 degrees);
```

To be added.

Returns: To be added.

To be added.

## Vector2.Distance(Vector2, Vector2) method

```csharp
public static float Distance (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
```

Computes the Euclidean distance between the two given points.

Parameters:

- `value1`: The first point.
- `value2`: The second point.

Returns: The distance.

To be added.
