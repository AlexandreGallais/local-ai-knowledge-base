---
title: "Vector3 struct (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector3 struct

Namespace: `System.Numerics`

```csharp
public struct Vector3 : IEquatable<System.Numerics.Vector3>, IFormattable
```

Represents a vector with three  single-precision floating-point values.

#### Remarks
The `Vector3` structure provides support for hardware acceleration.

## Vector3.Vector3(Single>) constructor

```csharp
public Vector3 (ReadOnlySpan<float> values);
```

Constructs a vector from the given `ReadOnlySpan<T>`. The span must contain at least 3 elements.

Parameters:

- `values`: The span of elements to assign to the vector.

To be added.

## Vector3.Vector3(Single) constructor

```csharp
public Vector3 (float value);
```

Creates a new `Vector3` object whose three elements have the same value.

Parameters:

- `value`: The value to assign to all three elements.

To be added.

## Vector3.Vector3(Vector2, Single) constructor

```csharp
public Vector3 (System.Numerics.Vector2 value, float z);
```

Creates a   new `Vector3` object from the specified `Vector2` object and the specified value.

Parameters:

- `value`: The vector with two elements.
- `z`: The additional value to assign to the `Vector3.Z` field.

To be added.

## Vector3.Vector3(Single, Single, Single) constructor

```csharp
public Vector3 (float x, float y, float z);
```

Creates a vector whose elements have the specified values.

Parameters:

- `x`: The value to assign to the `Vector3.X` field.
- `y`: The value to assign to the `Vector3.Y` field.
- `z`: The value to assign to the `Vector3.Z` field.

To be added.

## Vector3.AllBitsSet property

```csharp
public static System.Numerics.Vector3 AllBitsSet { get; }
```

To be added.

Returns: To be added.

To be added.

## Vector3.E property

```csharp
public static System.Numerics.Vector3 E { get; }
```

Gets a vector whose elements are equal to .

Returns: A vector whose elements are equal to `Single.E` (that is, it returns the vector
```csharp
Create(float.E)
```
).

To be added.

## Vector3.Epsilon property

```csharp
public static System.Numerics.Vector3 Epsilon { get; }
```

Gets a vector whose elements are equal to .

Returns: A vector whose elements are equal to `Single.Epsilon` (that is, it returns the vector
```csharp
Create(float.Epsilon)
```
).

To be added.

## Vector3.Item property

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

## Vector3.NaN property

```csharp
public static System.Numerics.Vector3 NaN { get; }
```

Gets a vector whose elements are equal to .

Returns: A vector whose elements are equal to `Single.NaN` (that is, it returns the vector
```csharp
Create(float.NaN)
```
).

To be added.

## Vector3.NegativeInfinity property

```csharp
public static System.Numerics.Vector3 NegativeInfinity { get; }
```

Gets a vector whose elements are equal to .

Returns: A vector whose elements are equal to `Single.NegativeInfinity` (that is, it returns the vector
```csharp
Create(float.NegativeInfinity)
```
).

To be added.

## Vector3.NegativeZero property

```csharp
public static System.Numerics.Vector3 NegativeZero { get; }
```

Gets a vector whose elements are equal to .

Returns: A vector whose elements are equal to `Single.NegativeZero` (that is, it returns the vector
```csharp
Create(float.NegativeZero)
```
).

To be added.

## Vector3.One property

```csharp
public static System.Numerics.Vector3 One { get; }
```

Gets a vector whose 3 elements are equal to one.

Returns: A vector whose three elements are equal to one (that is, it returns the vector
```csharp
(1,1,1)
```
).

To be added.

## Vector3.Pi property

```csharp
public static System.Numerics.Vector3 Pi { get; }
```

Gets a vector whose elements are equal to .

Returns: A vector whose elements are equal to `Single.Pi` (that is, it returns the vector
```csharp
Create(float.Pi)
```
).

To be added.

## Vector3.PositiveInfinity property

```csharp
public static System.Numerics.Vector3 PositiveInfinity { get; }
```

Gets a vector whose elements are equal to .

Returns: A vector whose elements are equal to `Single.PositiveInfinity` (that is, it returns the vector
```csharp
Create(float.PositiveInfinity)
```
).

To be added.

## Vector3.Tau property

```csharp
public static System.Numerics.Vector3 Tau { get; }
```

Gets a vector whose elements are equal to .

Returns: A vector whose elements are equal to `Single.Tau` (that is, it returns the vector
```csharp
Create(float.Tau)
```
).

To be added.

## Vector3.UnitX property

```csharp
public static System.Numerics.Vector3 UnitX { get; }
```

Gets the vector (1,0,0).

Returns: The vector `(1,0,0)`.

To be added.

## Vector3.UnitY property

```csharp
public static System.Numerics.Vector3 UnitY { get; }
```

Gets the vector (0,1,0).

Returns: The vector `(0,1,0)`.

To be added.

## Vector3.UnitZ property

```csharp
public static System.Numerics.Vector3 UnitZ { get; }
```

Gets the vector (0,0,1).

Returns: The vector `(0,0,1)`.

To be added.

## Vector3.Zero property

```csharp
public static System.Numerics.Vector3 Zero { get; }
```

Gets a vector whose 3 elements are equal to zero.

Returns: A vector whose three elements are equal to zero (that is, it returns the vector
```csharp
(0,0,0)
```
).

To be added.

## Vector3.Abs(Vector3) method

```csharp
public static System.Numerics.Vector3 Abs (System.Numerics.Vector3 value);
```

Returns a vector whose elements are the absolute values of each of the specified vector's elements.

Parameters:

- `value`: A vector.

Returns: The absolute value vector.

To be added.

## Vector3.Add(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 Add (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Adds two vectors together.

Parameters:

- `left`: The first vector to add.
- `right`: The second vector to add.

Returns: The summed vector.

To be added.

## Vector3.All(Vector3, Single) method

```csharp
public static bool All (System.Numerics.Vector3 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector3.AllWhereAllBitsSet(Vector3) method

```csharp
public static bool AllWhereAllBitsSet (System.Numerics.Vector3 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector3.AndNot(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 AndNot (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector3.Any(Vector3, Single) method

```csharp
public static bool Any (System.Numerics.Vector3 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector3.AnyWhereAllBitsSet(Vector3) method

```csharp
public static bool AnyWhereAllBitsSet (System.Numerics.Vector3 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector3.BitwiseAnd(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 BitwiseAnd (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector3.BitwiseOr(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 BitwiseOr (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector3.Clamp(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 Clamp (System.Numerics.Vector3 value1, System.Numerics.Vector3 min, System.Numerics.Vector3 max);
```

Restricts a vector between a minimum and a maximum value.

Parameters:

- `value1`: The vector to restrict.
- `min`: The minimum value.
- `max`: The maximum value.

Returns: The restricted vector.

To be added.

## Vector3.ClampNative(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 ClampNative (System.Numerics.Vector3 value1, System.Numerics.Vector3 min, System.Numerics.Vector3 max);
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

## Vector3.ConditionalSelect(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 ConditionalSelect (System.Numerics.Vector3 condition, System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

To be added.

Parameters:

- `condition`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector3.CopySign(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 CopySign (System.Numerics.Vector3 value, System.Numerics.Vector3 sign);
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

## Vector3.CopyTo(Single[]) method

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
`array` must have at least three elements. The method copies the vector's elements starting at index 0.

## Vector3.CopyTo(Single>) method

```csharp
public readonly void CopyTo (Span<float> destination);
```

Copies the vector to the given `Span<T>`. The length of the destination span must be at least 3.

Parameters:

- `destination`: The destination span into which the values are copied.

Exceptions:

- `ArgumentException`: The number of elements in the source vector is greater than the number of elements available in the destination span.

To be added.

## Vector3.CopyTo(Single[], Int32) method

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
`array` must have a sufficient number of elements to accommodate the three vector elements. In other words, elements `index`, `index` + 1, and `index` + 2 must already exist in `array`.

## Vector3.Cos(Vector3) method

```csharp
public static System.Numerics.Vector3 Cos (System.Numerics.Vector3 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector3.Count(Vector3, Single) method

```csharp
public static int Count (System.Numerics.Vector3 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector3.CountWhereAllBitsSet(Vector3) method

```csharp
public static int CountWhereAllBitsSet (System.Numerics.Vector3 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector3.Create(Single>) method

```csharp
public static System.Numerics.Vector3 Create (ReadOnlySpan<float> values);
```

Constructs a vector from the given `ReadOnlySpan<T>`. The span must contain at least 3 elements.

Parameters:

- `values`: The span of elements to assign to the vector.

Returns: A new `Vector3` whose elements have the specified values.

To be added.

## Vector3.Create(Single) method

```csharp
public static System.Numerics.Vector3 Create (float value);
```

Creates a new `Vector3` object whose three elements have the same value.

Parameters:

- `value`: The value to assign to all three elements.

Returns: A new `Vector3` whose three elements have the same value.

To be added.

## Vector3.Create(Vector2, Single) method

```csharp
public static System.Numerics.Vector3 Create (System.Numerics.Vector2 vector, float z);
```

Creates a new `Vector3` object from the specified `Vector2` object and a Z component.

Parameters:

- `vector`: The vector to use for the X and Y components.
- `z`: The Z component.

Returns: A new `Vector3` from the specified `Vector2` object and a Z component.

To be added.

## Vector3.Create(Single, Single, Single) method

```csharp
public static System.Numerics.Vector3 Create (float x, float y, float z);
```

Creates a vector whose elements have the specified values.

Parameters:

- `x`: The value to assign to the `Vector3.X` field.
- `y`: The value to assign to the `Vector3.Y` field.
- `z`: The value to assign to the `Vector3.Z` field.

Returns: A new `Vector3` whose elements have the specified values.

To be added.

## Vector3.CreateScalar(Single) method

```csharp
public static System.Numerics.Vector3 CreateScalar (float x);
```

Creates a vector with `Vector3.X` initialized to the specified value and the remaining elements initialized to zero.

Parameters:

- `x`: The value to assign to the `Vector3.X` field.

Returns: A new `Vector3` with `Vector3.X` initialized `x` and the remaining elements initialized to zero.

To be added.

## Vector3.CreateScalarUnsafe(Single) method

```csharp
public static System.Numerics.Vector3 CreateScalarUnsafe (float x);
```

Creates a vector with `Vector3.X` initialized to the specified value and the remaining elements left uninitialized.

Parameters:

- `x`: The value to assign to the `Vector3.X` field.

Returns: A new `Vector3` with `Vector3.X` initialized `x` and the remaining elements left uninitialized.

To be added.

## Vector3.Cross(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 Cross (System.Numerics.Vector3 vector1, System.Numerics.Vector3 vector2);
```

Computes the cross product of two vectors.

Parameters:

- `vector1`: The first vector.
- `vector2`: The second vector.

Returns: The cross product.

To be added.
