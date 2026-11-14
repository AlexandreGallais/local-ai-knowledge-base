---
title: "Vector4 struct (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector4 struct (part 4 of 4)

## Vector4.op_UnaryNegation(Vector4) method

```csharp
public static System.Numerics.Vector4 operator - (System.Numerics.Vector4 value);
```

Negates the specified vector.

Parameters:

- `value`: The vector to negate.

Returns: The negated vector.

#### Remarks
The `Vector4.op_UnaryNegation` method defines the unary negation operation for `Vector4` objects.

## Vector4.op_UnaryPlus(Vector4) method

```csharp
public static System.Numerics.Vector4 operator + (System.Numerics.Vector4 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.op_UnsignedRightShift(Vector4, Int32) method

```csharp
public static System.Numerics.Vector4 op_UnsignedRightShift (System.Numerics.Vector4 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector4.RadiansToDegrees(Vector4) method

```csharp
public static System.Numerics.Vector4 RadiansToDegrees (System.Numerics.Vector4 radians);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Round(Vector4) method

```csharp
public static System.Numerics.Vector4 Round (System.Numerics.Vector4 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Round(Vector4, MidpointRounding) method

```csharp
public static System.Numerics.Vector4 Round (System.Numerics.Vector4 vector, MidpointRounding mode);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Shuffle(Vector4, Byte, Byte, Byte, Byte) method

```csharp
public static System.Numerics.Vector4 Shuffle (System.Numerics.Vector4 vector, byte xIndex, byte yIndex, byte zIndex, byte wIndex);
```

Creates a new vector by selecting values from an input vector using a set of indices.

Parameters:

- `vector`: The input vector from which values are selected.
- `xIndex`: The index used to select a value from `vector` to be used as the value of `Vector4.X` in the result.
- `yIndex`: The index used to select a value from `vector` to be used as the value of `Vector4.Y` in the result
- `zIndex`: The index used to select a value from `vector` to be used as the value of `Vector4.Z` in the result
- `wIndex`: The index used to select a value from `vector` to be used as the value of `Vector4.W` in the result

Returns: A new vector containing the values from `vector` selected by the given indices.

To be added.

## Vector4.Sin(Vector4) method

```csharp
public static System.Numerics.Vector4 Sin (System.Numerics.Vector4 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector4.SinCos(Vector4) method

```csharp
public static (System.Numerics.Vector4 Sin, System.Numerics.Vector4 Cos) SinCos (System.Numerics.Vector4 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector4.SquareRoot(Vector4) method

```csharp
public static System.Numerics.Vector4 SquareRoot (System.Numerics.Vector4 value);
```

Returns a vector whose elements are the square root of each of a specified vector's elements.

Parameters:

- `value`: A vector.

Returns: The square root vector.

To be added.

## Vector4.Subtract(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Subtract (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Subtracts the second vector from the first.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The difference vector.

To be added.

## Vector4.Sum(Vector4) method

```csharp
public static float Sum (System.Numerics.Vector4 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.ToString() method

```csharp
public override readonly string ToString ();
```

Returns the string representation of the current instance using default formatting.

Returns: The string representation of the current instance.

#### Remarks
This method returns a string in which each element of the vector is formatted using the "G" (general) format string and the formatting conventions of the current culture. The "\<" and ">" characters are used to begin and end the string, and the current culture's `NumberGroupSeparator` property followed by a space is used to separate each element.

## Vector4.ToString(String) method

```csharp
public readonly string ToString (string? format);
```

Returns the string representation of the current instance using the specified format string to format individual elements.

Parameters:

- `format`: A standard or custom numeric format string that defines the format of individual elements.

Returns: The string representation of the current instance.

#### Remarks
This method returns a string in which each element of the vector is formatted using `format` and the current culture's formatting conventions. The "\<" and ">" characters are used to begin and end the string, and the current culture's `NumberGroupSeparator` property followed by a space is used to separate each element.

## Vector4.ToString(String, IFormatProvider) method

```csharp
public readonly string ToString (string? format, IFormatProvider? formatProvider);
```

Returns the string representation of the current instance using the specified format string to format individual elements and the specified format provider to define culture-specific formatting.

Parameters:

- `format`: A standard or custom numeric format string that defines the format of individual elements.
- `formatProvider`: A format provider that supplies culture-specific formatting information.

Returns: The string representation of the current instance.

#### Remarks
This method returns a string in which each element of the vector is formatted using `format` and `formatProvider`. The "\<" and ">" characters are used to begin and end the string, and the format provider's `NumberGroupSeparator` property followed by a space is used to separate each element.

## Vector4.Transform(Vector2, Matrix4x4) method

```csharp
public static System.Numerics.Vector4 Transform (System.Numerics.Vector2 position, System.Numerics.Matrix4x4 matrix);
```

Transforms a two-dimensional vector by a specified 4x4 matrix.

Parameters:

- `position`: The vector to transform.
- `matrix`: The transformation matrix.

Returns: The transformed vector.

To be added.

## Vector4.Transform(Vector2, Quaternion) method

```csharp
public static System.Numerics.Vector4 Transform (System.Numerics.Vector2 value, System.Numerics.Quaternion rotation);
```

Transforms a two-dimensional vector by the specified Quaternion rotation value.

Parameters:

- `value`: The vector to rotate.
- `rotation`: The rotation to apply.

Returns: The transformed vector.

To be added.

## Vector4.Transform(Vector3, Matrix4x4) method

```csharp
public static System.Numerics.Vector4 Transform (System.Numerics.Vector3 position, System.Numerics.Matrix4x4 matrix);
```

Transforms a three-dimensional vector by a specified 4x4 matrix.

Parameters:

- `position`: The vector to transform.
- `matrix`: The transformation matrix.

Returns: The transformed vector.

To be added.

## Vector4.Transform(Vector3, Quaternion) method

```csharp
public static System.Numerics.Vector4 Transform (System.Numerics.Vector3 value, System.Numerics.Quaternion rotation);
```

Transforms a three-dimensional vector by the specified Quaternion rotation value.

Parameters:

- `value`: The vector to rotate.
- `rotation`: The rotation to apply.

Returns: The transformed vector.

To be added.

## Vector4.Transform(Vector4, Matrix4x4) method

```csharp
public static System.Numerics.Vector4 Transform (System.Numerics.Vector4 vector, System.Numerics.Matrix4x4 matrix);
```

Transforms a four-dimensional vector by a specified 4x4 matrix.

Parameters:

- `vector`: The vector to transform.
- `matrix`: The transformation matrix.

Returns: The transformed vector.

To be added.

## Vector4.Transform(Vector4, Quaternion) method

```csharp
public static System.Numerics.Vector4 Transform (System.Numerics.Vector4 value, System.Numerics.Quaternion rotation);
```

Transforms a four-dimensional vector by the specified Quaternion rotation value.

Parameters:

- `value`: The vector to rotate.
- `rotation`: The rotation to apply.

Returns: The transformed vector.

To be added.

## Vector4.Truncate(Vector4) method

```csharp
public static System.Numerics.Vector4 Truncate (System.Numerics.Vector4 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector4.TryCopyTo(Single>) method

```csharp
public readonly bool TryCopyTo (Span<float> destination);
```

Attempts to copy the vector to the given `Span<T>`. The length of the destination span must be at least 4.

Parameters:

- `destination`: The destination span which the values are copied into.

Returns: `true` if the source vector was successfully copied to `destination`. `false` if `destination` is not large enough to hold the source vector.

To be added.

## Vector4.Xor(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Xor (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.W field

```csharp
public float W;
```

The W component of the vector.

To be added.

## Vector4.X field

```csharp
public float X;
```

The X component of the vector.

To be added.

## Vector4.Y field

```csharp
public float Y;
```

The Y component of the vector.

To be added.

## Vector4.Z field

```csharp
public float Z;
```

The Z component of the vector.

To be added.
