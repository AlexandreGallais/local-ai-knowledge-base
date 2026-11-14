---
title: "Vector3 struct (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector3 struct (part 4 of 4)

## Vector3.Shuffle(Vector3, Byte, Byte, Byte) method

```csharp
public static System.Numerics.Vector3 Shuffle (System.Numerics.Vector3 vector, byte xIndex, byte yIndex, byte zIndex);
```

Creates a new vector by selecting values from an input vector using a set of indices.

Parameters:

- `vector`: The input vector from which values are selected.
- `xIndex`: The index used to select a value from `vector` to be used as the value of `Vector3.X` in the result.
- `yIndex`: The index used to select a value from `vector` to be used as the value of `Vector3.Y` in the result
- `zIndex`: The index used to select a value from `vector` to be used as the value of `Vector3.Z` in the result

Returns: A new vector containing the values from `vector` selected by the given indices.

To be added.

## Vector3.Sin(Vector3) method

```csharp
public static System.Numerics.Vector3 Sin (System.Numerics.Vector3 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector3.SinCos(Vector3) method

```csharp
public static (System.Numerics.Vector3 Sin, System.Numerics.Vector3 Cos) SinCos (System.Numerics.Vector3 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector3.SquareRoot(Vector3) method

```csharp
public static System.Numerics.Vector3 SquareRoot (System.Numerics.Vector3 value);
```

Returns a vector whose elements are the square root of each of a specified vector's elements.

Parameters:

- `value`: A vector.

Returns: The square root vector.

To be added.

## Vector3.Subtract(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 Subtract (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Subtracts the second vector from the first.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The difference vector.

To be added.

## Vector3.Sum(Vector3) method

```csharp
public static float Sum (System.Numerics.Vector3 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector3.ToString() method

```csharp
public override readonly string ToString ();
```

Returns the string representation of the current instance using default formatting.

Returns: The string representation of the current instance.

#### Remarks
This method returns a string in which each element of the vector is formatted using the "G" (general) format string and the formatting conventions of the current culture. The "\<" and ">" characters are used to begin and end the string, and the current culture's `NumberGroupSeparator` property followed by a space is used to separate each element.

## Vector3.ToString(String) method

```csharp
public readonly string ToString (string? format);
```

Returns the string representation of the current instance using the specified format string to format individual elements.

Parameters:

- `format`: A standard or custom numeric format string that defines the format of individual elements.

Returns: The string representation of the current instance.

#### Remarks
This method returns a string in which each element of the vector is formatted using `format` and the current culture's formatting conventions. The "\<" and ">" characters are used to begin and end the string, and the current culture's `NumberGroupSeparator` property followed by a space is used to separate each element.

## Vector3.ToString(String, IFormatProvider) method

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

## Vector3.Transform(Vector3, Matrix4x4) method

```csharp
public static System.Numerics.Vector3 Transform (System.Numerics.Vector3 position, System.Numerics.Matrix4x4 matrix);
```

Transforms a vector by a specified 4x4 matrix.

Parameters:

- `position`: The vector to transform.
- `matrix`: The transformation matrix.

Returns: The transformed vector.

To be added.

## Vector3.Transform(Vector3, Quaternion) method

```csharp
public static System.Numerics.Vector3 Transform (System.Numerics.Vector3 value, System.Numerics.Quaternion rotation);
```

Transforms a vector by the specified Quaternion rotation value.

Parameters:

- `value`: The vector to rotate.
- `rotation`: The rotation to apply.

Returns: The transformed vector.

To be added.

## Vector3.TransformNormal(Vector3, Matrix4x4) method

```csharp
public static System.Numerics.Vector3 TransformNormal (System.Numerics.Vector3 normal, System.Numerics.Matrix4x4 matrix);
```

Transforms a vector normal by the given 4x4 matrix.

Parameters:

- `normal`: The source vector.
- `matrix`: The matrix.

Returns: The transformed vector.

To be added.

## Vector3.Truncate(Vector3) method

```csharp
public static System.Numerics.Vector3 Truncate (System.Numerics.Vector3 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector3.TryCopyTo(Single>) method

```csharp
public readonly bool TryCopyTo (Span<float> destination);
```

Attempts to copy the vector to the given `Span<T>`. The length of the destination span must be at least 3.

Parameters:

- `destination`: The destination span into which the values are copied.

Returns: `true` if the source vector was successfully copied to `destination`. `false` if `destination` is not large enough to hold the source vector.

To be added.

## Vector3.Xor(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 Xor (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector3.X field

```csharp
public float X;
```

The X component of the vector.

To be added.

## Vector3.Y field

```csharp
public float Y;
```

The Y component of the vector.

To be added.

## Vector3.Z field

```csharp
public float Z;
```

The Z component of the vector.

To be added.
