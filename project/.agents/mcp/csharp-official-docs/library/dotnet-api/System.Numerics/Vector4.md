---
title: "Vector4 struct (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector4 struct

Namespace: `System.Numerics`

```csharp
public struct Vector4 : IEquatable<System.Numerics.Vector4>, IFormattable
```

Represents a vector with four single-precision floating-point values.

#### Remarks
The `Vector4` structure provides support for hardware acceleration.

## Vector4.Vector4(Single>) constructor

```csharp
public Vector4 (ReadOnlySpan<float> values);
```

Constructs a vector from the given `ReadOnlySpan<T>`. The span must contain at least 4 elements.

Parameters:

- `values`: The span of elements to assign to the vector.

To be added.

## Vector4.Vector4(Single) constructor

```csharp
public Vector4 (float value);
```

Creates a new `Vector4` object whose four elements have the same value.

Parameters:

- `value`: The value to assign to all four elements.

To be added.

## Vector4.Vector4(Vector3, Single) constructor

```csharp
public Vector4 (System.Numerics.Vector3 value, float w);
```

Constructs a new `Vector4` object from the specified `Vector3` object and a W component.

Parameters:

- `value`: The vector to use for the X, Y, and Z components.
- `w`: The W component.

To be added.

## Vector4.Vector4(Vector2, Single, Single) constructor

```csharp
public Vector4 (System.Numerics.Vector2 value, float z, float w);
```

Creates a   new `Vector4` object from the specified `Vector2` object and a Z and a W component.

Parameters:

- `value`: The vector to use for the X and Y components.
- `z`: The Z component.
- `w`: The W component.

To be added.

## Vector4.Vector4(Single, Single, Single, Single) constructor

```csharp
public Vector4 (float x, float y, float z, float w);
```

Creates a vector whose elements have the specified values.

Parameters:

- `x`: The value to assign to the `Vector4.X` field.
- `y`: The value to assign to the `Vector4.Y` field.
- `z`: The value to assign to the `Vector4.Z` field.
- `w`: The value to assign to the `Vector4.W` field.

To be added.

## Vector4.AllBitsSet property

```csharp
public static System.Numerics.Vector4 AllBitsSet { get; }
```

Gets a vector where all bits are set to `1`.

Returns: A vector where all bits are set to `1`.

To be added.

## Vector4.E property

```csharp
public static System.Numerics.Vector4 E { get; }
```

Gets a vector whose elements are equal to `Single.E`.

Returns: A vector whose elements are equal to `Single.E` (that is, it returns the vector `Create(float.E)`).

To be added.

## Vector4.Epsilon property

```csharp
public static System.Numerics.Vector4 Epsilon { get; }
```

Gets a vector whose elements are equal to `Single.Epsilon`.

Returns: A vector whose elements are equal to `Single.Epsilon` (that is, it returns the vector `Create(float.Epsilon)`).

To be added.

## Vector4.Item property

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

## Vector4.NaN property

```csharp
public static System.Numerics.Vector4 NaN { get; }
```

Gets a vector whose elements are equal to `Single.NaN`.

Returns: A vector whose elements are equal to `Single.NaN` (that is, it returns the vector `Create(float.NaN)`).

To be added.

## Vector4.NegativeInfinity property

```csharp
public static System.Numerics.Vector4 NegativeInfinity { get; }
```

Gets a vector whose elements are equal to `Single.NegativeInfinity`.

Returns: A vector whose elements are equal to `Single.NegativeInfinity` (that is, it returns the vector `Create(float.NegativeInfinity)`).

To be added.

## Vector4.NegativeZero property

```csharp
public static System.Numerics.Vector4 NegativeZero { get; }
```

Gets a vector whose elements are equal to `Single.NegativeZero`.

Returns: A vector whose elements are equal to `Single.NegativeZero` (that is, it returns the vector `Create(float.NegativeZero)`).

To be added.

## Vector4.One property

```csharp
public static System.Numerics.Vector4 One { get; }
```

Gets a vector whose 4 elements are equal to one.

Returns: Returns `Vector4`.

#### Remarks
A vector whose four elements are equal to one (that is, it returns the vector `(1,1,1,1)`).

## Vector4.Pi property

```csharp
public static System.Numerics.Vector4 Pi { get; }
```

Gets a vector whose elements are equal to `Single.Pi`.

Returns: A vector whose elements are equal to `Single.Pi` (that is, it returns the vector `Create(float.Pi)`).

To be added.

## Vector4.PositiveInfinity property

```csharp
public static System.Numerics.Vector4 PositiveInfinity { get; }
```

Gets a vector whose elements are equal to `Single.PositiveInfinity`.

Returns: A vector whose elements are equal to `Single.PositiveInfinity` (that is, it returns the vector `Create(float.PositiveInfinity)`).

To be added.

## Vector4.Tau property

```csharp
public static System.Numerics.Vector4 Tau { get; }
```

Gets a vector whose elements are equal to `Single.Tau`.

Returns: A vector whose elements are equal to `Single.Tau` (that is, it returns the vector `Create(float.Tau)`).

To be added.

## Vector4.UnitW property

```csharp
public static System.Numerics.Vector4 UnitW { get; }
```

Gets the vector (0,0,0,1).

Returns: The vector `(0,0,0,1)`.

To be added.

## Vector4.UnitX property

```csharp
public static System.Numerics.Vector4 UnitX { get; }
```

Gets the vector (1,0,0,0).

Returns: The vector `(1,0,0,0)`.

To be added.

## Vector4.UnitY property

```csharp
public static System.Numerics.Vector4 UnitY { get; }
```

Gets the vector (0,1,0,0).

Returns: The vector `(0,1,0,0)`.

To be added.

## Vector4.UnitZ property

```csharp
public static System.Numerics.Vector4 UnitZ { get; }
```

Gets the vector (0,0,1,0).

Returns: The vector `(0,0,1,0)`.

To be added.

## Vector4.Zero property

```csharp
public static System.Numerics.Vector4 Zero { get; }
```

Gets a vector whose 4 elements are equal to zero.

Returns: A vector whose four elements are equal to zero (that is, it returns the vector `(0,0,0,0)`).

To be added.

## Vector4.Abs(Vector4) method

```csharp
public static System.Numerics.Vector4 Abs (System.Numerics.Vector4 value);
```

Returns a vector whose elements are the absolute values of each of the specified vector's elements.

Parameters:

- `value`: A vector.

Returns: The absolute value vector.

To be added.

## Vector4.Add(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Add (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Adds two vectors together.

Parameters:

- `left`: The first vector to add.
- `right`: The second vector to add.

Returns: The summed vector.

To be added.

## Vector4.All(Vector4, Single) method

```csharp
public static bool All (System.Numerics.Vector4 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.AllWhereAllBitsSet(Vector4) method

```csharp
public static bool AllWhereAllBitsSet (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.AndNot(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 AndNot (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.Any(Vector4, Single) method

```csharp
public static bool Any (System.Numerics.Vector4 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.AnyWhereAllBitsSet(Vector4) method

```csharp
public static bool AnyWhereAllBitsSet (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.BitwiseAnd(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 BitwiseAnd (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.BitwiseOr(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 BitwiseOr (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.Clamp(Vector4, Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Clamp (System.Numerics.Vector4 value1, System.Numerics.Vector4 min, System.Numerics.Vector4 max);
```

Restricts a vector between a minimum and a maximum value.

Parameters:

- `value1`: The vector to restrict.
- `min`: The minimum value.
- `max`: The maximum value.

Returns: The restricted vector.

To be added.

## Vector4.ClampNative(Vector4, Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 ClampNative (System.Numerics.Vector4 value1, System.Numerics.Vector4 min, System.Numerics.Vector4 max);
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

## Vector4.ConditionalSelect(Vector4, Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 ConditionalSelect (System.Numerics.Vector4 condition, System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `condition`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.CopySign(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 CopySign (System.Numerics.Vector4 value, System.Numerics.Vector4 sign);
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

## Vector4.CopyTo(Single[]) method

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
`array` must have at least four elements. The method copies the vector's elements starting at index 0.

## Vector4.CopyTo(Single>) method

```csharp
public readonly void CopyTo (Span<float> destination);
```

Copies the vector to the given `Span<T>`. The length of the destination span must be at least 4.

Parameters:

- `destination`: The destination span which the values are copied into.

Exceptions:

- `ArgumentException`: The number of elements in the source vector is greater than the number of elements available in the destination span.

To be added.

## Vector4.CopyTo(Single[], Int32) method

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
`array` must have a sufficient number of elements to accommodate the four vector elements. In other words, elements `index` through `index` + 3 must already exist in `array`.

## Vector4.Cos(Vector4) method

```csharp
public static System.Numerics.Vector4 Cos (System.Numerics.Vector4 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Count(Vector4, Single) method

```csharp
public static int Count (System.Numerics.Vector4 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.CountWhereAllBitsSet(Vector4) method

```csharp
public static int CountWhereAllBitsSet (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.Create(Single>) method

```csharp
public static System.Numerics.Vector4 Create (ReadOnlySpan<float> values);
```

Constructs a vector from the given `ReadOnlySpan<T>`. The span must contain at least 4 elements.

Parameters:

- `values`: The span of elements to assign to the vector.

Returns: A new `Vector4` whose elements have the specified values.

To be added.

## Vector4.Create(Single) method

```csharp
public static System.Numerics.Vector4 Create (float value);
```

Creates a new `Vector4` object whose four elements have the same value.

Parameters:

- `value`: The value to assign to all four elements.

Returns: A new `Vector4` whose four elements have the same value.

To be added.

## Vector4.Create(Vector3, Single) method

```csharp
public static System.Numerics.Vector4 Create (System.Numerics.Vector3 vector, float w);
```

Constructs a new `Vector4` object from the specified `Vector3` object and a W component.

Parameters:

- `vector`: The vector to use for the X, Y, and Z components.
- `w`: The W component.

Returns: A new `Vector4` from the specified `Vector3` object and a W component.

To be added.

## Vector4.Create(Vector2, Single, Single) method

```csharp
public static System.Numerics.Vector4 Create (System.Numerics.Vector2 vector, float z, float w);
```

Creates a new `Vector4` object from the specified `Vector2` object and a Z and a W component.

Parameters:

- `vector`: The vector to use for the X and Y components.
- `z`: The Z component.
- `w`: The W component.

Returns: A new `Vector4` from the specified `Vector2` object and a Z and a W component.

To be added.
