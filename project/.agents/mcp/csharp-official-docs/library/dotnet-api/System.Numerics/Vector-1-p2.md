---
title: "Vector<T> struct (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector<T> struct (part 2 of 3)

## Vector<T>.op_ExclusiveOr(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator ^ (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector by performing a bitwise `XOr` operation on each of the elements in two vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from the bitwise `XOr` of the elements in `left` and `right`.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_ExclusiveOr` method defines the bitwise `XOr` operation for `Vector<T>` objects.

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<byte> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `Byte`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<double> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `Double`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<short> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `Int16`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<int> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `Int32`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<long> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `Int64`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<IntPtr> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a source vector into a vector of native-sized integers.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Vector<T>`.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<sbyte> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `SByte`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<float> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `Single`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<ushort> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `UInt16`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<uint> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `UInt32`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<ulong> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of the specified vector into a vector of type `UInt64`.

Parameters:

- `value`: The vector to reinterpret.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Explicit` operator defines a narrowing conversion; it requires a casting operator (in C#) or a conversion method (in Visual Basic).

## Vector<T>.op_Explicit(Vector<T>) method

```csharp
public static explicit operator System.Numerics.Vector<UIntPtr> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a source vector into a vector of native-sized, unsigned integers.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Vector<T>`.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector<T>.op_Inequality(Vector<T>, Vector<T>) method

```csharp
public static bool operator != (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether any single pair of elements in the specified vectors is not equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if any element pairs in left and right are not equal. `false` if all element pairs are equal.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

To be added.

## Vector<T>.op_LeftShift(Vector<T>, Int32) method

```csharp
public static System.Numerics.Vector<T> operator << (System.Numerics.Vector<T> value, int shiftCount);
```

Shifts each element of a vector left by the specified amount.

Parameters:

- `value`: The vector whose elements are to be shifted.
- `shiftCount`: The number of bits by which to shift each element.

Returns: A vector whose elements were shifted left by `shiftCount`.

To be added.

## Vector<T>.op_Multiply(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator * (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose values are the product of each pair of elements in two specified vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The element-wise product vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Multiply` method defines the multiplication operation for `Vector<T>` objects.

## Vector<T>.op_Multiply(Vector<T>, T) method

```csharp
public static System.Numerics.Vector<T> operator * (System.Numerics.Vector<T> value, T factor);
```

Multiplies a vector by a specified scalar value.

Parameters:

- `value`: The source vector.
- `factor`: A scalar value.

Returns: The scaled vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Multiply` method defines the multiplication operation for `Vector<T>` objects.

## Vector<T>.op_Multiply(T, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator * (T factor, System.Numerics.Vector<T> value);
```

Multiplies a vector by a specified scalar value.

Parameters:

- `factor`: The scalar value.
- `value`: The source vector.

Returns: The scaled vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Multiply` method defines the multiplication operation for `Vector<T>` objects.

## Vector<T>.op_OnesComplement(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator ~ (System.Numerics.Vector<T> value);
```

Returns a new vector whose elements are obtained by taking the one's complement of a specified vector's elements.

Parameters:

- `value`: The source vector.

Returns: The one's complement vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

To be added.

## Vector<T>.op_RightShift(Vector<T>, Int32) method

```csharp
public static System.Numerics.Vector<T> operator >> (System.Numerics.Vector<T> value, int shiftCount);
```

Shifts (signed) each element of a vector right by the specified amount.

Parameters:

- `value`: The vector whose elements are to be shifted.
- `shiftCount`: The number of bits by which to shift each element.

Returns: A vector whose elements were shifted right by `shiftCount`.

To be added.

## Vector<T>.op_Subtraction(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator - (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Subtracts the second vector from the first.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from subtracting `right` from `left`.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Subtraction` method defines the subtraction operation for `Vector<T>` objects.

## Vector<T>.op_UnaryNegation(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator - (System.Numerics.Vector<T> value);
```

Negates a given vector.

Parameters:

- `value`: The vector to negate.

Returns: The negated vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_UnaryNegation` method defines the unary negation operation for `Vector<T>` objects.

## Vector<T>.op_UnaryPlus(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator + (System.Numerics.Vector<T> value);
```

Returns a given vector unchanged.

Parameters:

- `value`: The vector.

Returns: `value`

Exceptions:

- `NotSupportedException`: The type of the vector (`T`) is not supported.

To be added.

## Vector<T>.op_UnsignedRightShift(Vector<T>, Int32) method

```csharp
public static System.Numerics.Vector<T> op_UnsignedRightShift (System.Numerics.Vector<T> value, int shiftCount);
```

Shifts (unsigned) each element of a vector right by the specified amount.

Parameters:

- `value`: The vector whose elements are to be shifted.
- `shiftCount`: The number of bits by which to shift each element.

Returns: A vector whose elements were shifted right by `shiftCount`.

To be added.

## Vector<T>.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this vector using default formatting.

Returns: The string representation of this vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
This method returns a string in which each element of the vector is formatted using the "G" (general) format string and the formatting conventions of the current culture. The current culture's `NumberGroupSeparator` property followed by a space is used to separate each element.

## Vector<T>.ToString(String) method

```csharp
public string ToString (string? format);
```

Returns the string representation of this vector using the specified format string to format individual elements.

Parameters:

- `format`: The format of individual elements.

Returns: The string representation of the current instance.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
This method returns a string in which each element of the vector is formatted using `format` and the current culture's formatting conventions. The current culture's `NumberGroupSeparator` property followed by a space is used to separate each element.

## Vector<T>.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? formatProvider);
```

Returns the string representation of this vector using the specified format string to format individual elements and the specified format provider to define culture-specific formatting.

Parameters:

- `format`: The format of individual elements.
- `formatProvider`: A format provider that supplies culture-specific formatting information.

Returns: The string representation of the current instance.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
This method returns a string in which each element of the vector is formatted using `format` and `formatProvider`, and the format provider's `NumberGroupSeparator` property followed by a space is used to separate each element.

## Vector<T>.TryCopyTo(Byte>) method

```csharp
public bool TryCopyTo (Span<byte> destination);
```

Attempts to copy the vector to the given byte span.

Parameters:

- `destination`: The destination span to which the values are copied. The destination span must be at least size `Vector<T>.Count`.

Returns: `true` if the source vector was successfully copied to `destination`. `false` if `destination` is not large enough to hold the source vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

To be added.
