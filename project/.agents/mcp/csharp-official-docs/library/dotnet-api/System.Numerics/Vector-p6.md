---
title: "Vector class (part 6 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector class (part 6 of 9)

## Vector.MinMagnitudeNumber<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> MinMagnitudeNumber<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Compares two vectors, on a per-element basis, to compute which has the lesser magnitude and returning the other value if an input is
```csharp
NaN
```
.

Parameters:

- `left`: The vector to compare with
```csharp
right
```
.
- `right`: The vector to compare with
```csharp
left
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it has a lesser magnitude than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector.MinNative<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> MinNative<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Compare two vectors to determine which is lesser on a per-element basis using platform specific behavior for
```csharp
NaN
```
and
```csharp
NegativeZero
```
.

Parameters:

- `left`: The vector to compare with
```csharp
right
```
.
- `right`: The vector to compare with
```csharp
left
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it is lesser than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector.MinNumber<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> MinNumber<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Compares two vectors, on a per-element basis, to compute which is lesser and returning the other value if an element is
```csharp
NaN
```
.

Parameters:

- `left`: The vector to compare with
```csharp
right
```
.
- `right`: The vector to compare with
```csharp
left
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it is lesser than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector.Multiply<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Multiply<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose values are the product of each pair of elements in two specified vectors.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The element-wise product vector.

To be added.

## Vector.Multiply<T>(Vector<T>, T) method

```csharp
public static System.Numerics.Vector<T> Multiply<T> (System.Numerics.Vector<T> left, T right);
```

Returns a new vector whose values are the values of a specified vector each multiplied by a scalar value.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The vector.
- `right`: The scalar value.

Returns: The scaled vector.

To be added.

## Vector.Multiply<T>(T, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Multiply<T> (T left, System.Numerics.Vector<T> right);
```

Returns a new vector whose values are a scalar value multiplied by each of the values of a specified vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The scalar value.
- `right`: The vector.

Returns: The scaled vector.

To be added.

## Vector.MultiplyAddEstimate(Double>, Double>, Double>) method

```csharp
public static System.Numerics.Vector<double> MultiplyAddEstimate (System.Numerics.Vector<double> left, System.Numerics.Vector<double> right, System.Numerics.Vector<double> addend);
```

To be added.

Returns: To be added.

To be added.

## Vector.MultiplyAddEstimate(Single>, Single>, Single>) method

```csharp
public static System.Numerics.Vector<float> MultiplyAddEstimate (System.Numerics.Vector<float> left, System.Numerics.Vector<float> right, System.Numerics.Vector<float> addend);
```

To be added.

Returns: To be added.

To be added.

## Vector.Narrow(Double>, Double>) method

```csharp
public static System.Numerics.Vector<float> Narrow (System.Numerics.Vector<double> low, System.Numerics.Vector<double> high);
```

Narrows two `Vector<Double>` instances into one `Vector<Single>`.

Parameters:

- `low`: The source vector that will be narrowed to the lower half of the result vector.
- `high`: The source vector that will be narrowed to the upper half of the result vector.

Returns: A `Vector<Single>` containing elements narrowed from the source vectors.

To be added.

## Vector.Narrow(Int16>, Int16>) method

```csharp
public static System.Numerics.Vector<sbyte> Narrow (System.Numerics.Vector<short> low, System.Numerics.Vector<short> high);
```

Narrows two `Vector<Int16>` instances into one `Vector<SByte>`.

Parameters:

- `low`: The source vector that will be narrowed to the lower half of the result vector.
- `high`: The source vector that will be narrowed to the upper half of the result vector.

Returns: A `Vector<SByte>` containing elements narrowed from the source vectors.

To be added.

## Vector.Narrow(Int32>, Int32>) method

```csharp
public static System.Numerics.Vector<short> Narrow (System.Numerics.Vector<int> low, System.Numerics.Vector<int> high);
```

Narrows two `Vector<Int32>` instances into one `Vector<Int16>`.

Parameters:

- `low`: The source vector that will be narrowed to the lower half of the result vector.
- `high`: The source vector that will be narrowed to the upper half of the result vector.

Returns: A `Vector<Int16>` containing elements narrowed from the source vectors.

To be added.

## Vector.Narrow(Int64>, Int64>) method

```csharp
public static System.Numerics.Vector<int> Narrow (System.Numerics.Vector<long> low, System.Numerics.Vector<long> high);
```

Narrows two `Vector<Int64>` instances into one `Vector<Int32>`.

Parameters:

- `low`: The source vector that will be narrowed to the lower half of the result vector.
- `high`: The source vector that will be narrowed to the upper half of the result vector.

Returns: A `Vector<Int32>` containing elements narrowed from the source vectors.

To be added.

## Vector.Narrow(UInt16>, UInt16>) method

```csharp
public static System.Numerics.Vector<byte> Narrow (System.Numerics.Vector<ushort> low, System.Numerics.Vector<ushort> high);
```

Narrows two `Vector<UInt16>` instances into one `Vector<Byte>`.

Parameters:

- `low`: The source vector that will be narrowed to the lower half of the result vector.
- `high`: The source vector that will be narrowed to the upper half of the result vector.

Returns: A `Vector<Byte>` containing elements narrowed from the source vectors.

To be added.

## Vector.Narrow(UInt32>, UInt32>) method

```csharp
public static System.Numerics.Vector<ushort> Narrow (System.Numerics.Vector<uint> low, System.Numerics.Vector<uint> high);
```

Narrows two `Vector<UInt32>` instances into one `Vector<UInt16>`.

Parameters:

- `low`: The source vector that will be narrowed to the lower half of the result vector.
- `high`: The source vector that will be narrowed to the upper half of the result vector.

Returns: A `Vector<UInt16>` containing elements narrowed from the source vectors.

To be added.

## Vector.Narrow(UInt64>, UInt64>) method

```csharp
public static System.Numerics.Vector<uint> Narrow (System.Numerics.Vector<ulong> low, System.Numerics.Vector<ulong> high);
```

Narrows two `Vector<UInt64>` instances into one `Vector<UInt32>`.

Parameters:

- `low`: The source vector that will be narrowed to the lower half of the result vector.
- `high`: The source vector that will be narrowed to the upper half of the result vector.

Returns: A `Vector<UInt32>` containing elements narrowed from the source vectors.

To be added.

## Vector.NarrowWithSaturation(Double>, Double>) method

```csharp
public static System.Numerics.Vector<float> NarrowWithSaturation (System.Numerics.Vector<double> low, System.Numerics.Vector<double> high);
```

To be added.

Parameters:

- `low`: To be added.
- `high`: To be added.

Returns: To be added.

To be added.

## Vector.NarrowWithSaturation(Int16>, Int16>) method

```csharp
public static System.Numerics.Vector<sbyte> NarrowWithSaturation (System.Numerics.Vector<short> low, System.Numerics.Vector<short> high);
```

To be added.

Parameters:

- `low`: To be added.
- `high`: To be added.

Returns: To be added.

To be added.

## Vector.NarrowWithSaturation(Int32>, Int32>) method

```csharp
public static System.Numerics.Vector<short> NarrowWithSaturation (System.Numerics.Vector<int> low, System.Numerics.Vector<int> high);
```

To be added.

Parameters:

- `low`: To be added.
- `high`: To be added.

Returns: To be added.

To be added.

## Vector.NarrowWithSaturation(Int64>, Int64>) method

```csharp
public static System.Numerics.Vector<int> NarrowWithSaturation (System.Numerics.Vector<long> low, System.Numerics.Vector<long> high);
```

To be added.

Parameters:

- `low`: To be added.
- `high`: To be added.

Returns: To be added.

To be added.

## Vector.NarrowWithSaturation(UInt16>, UInt16>) method

```csharp
public static System.Numerics.Vector<byte> NarrowWithSaturation (System.Numerics.Vector<ushort> low, System.Numerics.Vector<ushort> high);
```

To be added.

Parameters:

- `low`: To be added.
- `high`: To be added.

Returns: To be added.

To be added.

## Vector.NarrowWithSaturation(UInt32>, UInt32>) method

```csharp
public static System.Numerics.Vector<ushort> NarrowWithSaturation (System.Numerics.Vector<uint> low, System.Numerics.Vector<uint> high);
```

To be added.

Parameters:

- `low`: To be added.
- `high`: To be added.

Returns: To be added.

To be added.

## Vector.NarrowWithSaturation(UInt64>, UInt64>) method

```csharp
public static System.Numerics.Vector<uint> NarrowWithSaturation (System.Numerics.Vector<ulong> low, System.Numerics.Vector<ulong> high);
```

To be added.

Parameters:

- `low`: To be added.
- `high`: To be added.

Returns: To be added.

To be added.

## Vector.Negate<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Negate<T> (System.Numerics.Vector<T> value);
```

Returns a new vector whose elements are the negation of the corresponding element in the specified vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The negated vector.

To be added.

## Vector.None<T>(Vector<T>, T) method

```csharp
public static bool None<T> (System.Numerics.Vector<T> vector, T value);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.NoneWhereAllBitsSet<T>(Vector<T>) method

```csharp
public static bool NoneWhereAllBitsSet<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.OnesComplement<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> OnesComplement<T> (System.Numerics.Vector<T> value);
```

Returns a new vector whose elements are obtained by taking the one's complement of a specified vector's elements.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The resulting vector.

To be added.

## Vector.RadiansToDegrees(Double>) method

```csharp
public static System.Numerics.Vector<double> RadiansToDegrees (System.Numerics.Vector<double> radians);
```

To be added.

Returns: To be added.

To be added.

## Vector.RadiansToDegrees(Single>) method

```csharp
public static System.Numerics.Vector<float> RadiansToDegrees (System.Numerics.Vector<float> radians);
```

To be added.

Returns: To be added.

To be added.

## Vector.Reverse<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Reverse<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.Round(Double>) method

```csharp
public static System.Numerics.Vector<double> Round (System.Numerics.Vector<double> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Round(Single>) method

```csharp
public static System.Numerics.Vector<float> Round (System.Numerics.Vector<float> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Round(Double>, MidpointRounding) method

```csharp
public static System.Numerics.Vector<double> Round (System.Numerics.Vector<double> vector, MidpointRounding mode);
```

To be added.

Returns: To be added.

To be added.

## Vector.Round(Single>, MidpointRounding) method

```csharp
public static System.Numerics.Vector<float> Round (System.Numerics.Vector<float> vector, MidpointRounding mode);
```

To be added.

Returns: To be added.

To be added.

## Vector.ShiftLeft(Byte>, Int32) method

```csharp
public static System.Numerics.Vector<byte> ShiftLeft (System.Numerics.Vector<byte> value, int shiftCount);
```

Shifts each element of a vector left by the specified amount.

Parameters:

- `value`: The vector whose elements are to be shifted.
- `shiftCount`: The number of bits by which to shift each element.

Returns: A vector whose elements were shifted left by `shiftCount`.

To be added.

## Vector.ShiftLeft(Int16>, Int32) method

```csharp
public static System.Numerics.Vector<short> ShiftLeft (System.Numerics.Vector<short> value, int shiftCount);
```

Shifts each element of a vector left by the specified amount.

Parameters:

- `value`: The vector whose elements are to be shifted.
- `shiftCount`: The number of bits by which to shift each element.

Returns: A vector whose elements were shifted left by `shiftCount`.

To be added.

## Vector.ShiftLeft(Int32>, Int32) method

```csharp
public static System.Numerics.Vector<int> ShiftLeft (System.Numerics.Vector<int> value, int shiftCount);
```

Shifts each element of a vector left by the specified amount.

Parameters:

- `value`: The vector whose elements are to be shifted.
- `shiftCount`: The number of bits by which to shift each element.

Returns: A vector whose elements were shifted left by `shiftCount`.

To be added.

## Vector.ShiftLeft(Int64>, Int32) method

```csharp
public static System.Numerics.Vector<long> ShiftLeft (System.Numerics.Vector<long> value, int shiftCount);
```

Shifts each element of a vector left by the specified amount.

Parameters:

- `value`: The vector whose elements are to be shifted.
- `shiftCount`: The number of bits by which to shift each element.

Returns: A vector whose elements were shifted left by `shiftCount`.

To be added.
