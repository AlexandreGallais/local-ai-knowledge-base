---
title: "Vector class (part 2 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector class (part 2 of 9)

## Vector.BitwiseOr<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> BitwiseOr<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector by performing a bitwise `Or` operation on each pair of elements in two vectors.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The resulting vector.

To be added.

## Vector.Ceiling(Double>) method

```csharp
public static System.Numerics.Vector<double> Ceiling (System.Numerics.Vector<double> value);
```

Returns a new vector whose elements are the smallest integral values that are greater than or equal to the given vector's elements.

Parameters:

- `value`: The source vector.

Returns: The vector whose elements are the smallest integral values that are greater than or equal to the given vector's elements.
If a value is equal to `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`, that value is returned.

#### Remarks

Note that this method returns a `Double` instead of an integral type.

## Vector.Ceiling(Single>) method

```csharp
public static System.Numerics.Vector<float> Ceiling (System.Numerics.Vector<float> value);
```

Returns a new vector whose elements are the smallest integral values that are greater than or equal to the given vector's elements.

Parameters:

- `value`: The source vector.

Returns: The vector whose elements are the smallest integral values that are greater than or equal to the given vector's elements.
If a value is equal to `Single.NaN`, `Single.NegativeInfinity`, or `Single.PositiveInfinity`, that value is returned.

#### Remarks

Note that this method returns a `Single` instead of an integral type.

## Vector.Clamp<T>(Vector<T>, Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Clamp<T> (System.Numerics.Vector<T> value, System.Numerics.Vector<T> min, System.Numerics.Vector<T> max);
```

Restricts a vector between a minimum and a maximum value.

Parameters:

- `value`: The vector to restrict.
- `min`: The minimum value.
- `max`: The maximum value.

Returns: The restricted vector.

To be added.

## Vector.ClampNative<T>(Vector<T>, Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> ClampNative<T> (System.Numerics.Vector<T> value, System.Numerics.Vector<T> min, System.Numerics.Vector<T> max);
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

- `value`: The vector to restrict.
- `min`: The minimum value.
- `max`: The maximum value.

Returns: The restricted vector.

To be added.

## Vector.ConcatLowerLower<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> ConcatLowerLower<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.ConcatLowerUpper<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> ConcatLowerUpper<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.ConcatUpperLower<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> ConcatUpperLower<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.ConcatUpperUpper<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> ConcatUpperUpper<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.ConditionalSelect(Int32>, Single>, Single>) method

```csharp
public static System.Numerics.Vector<float> ConditionalSelect (System.Numerics.Vector<int> condition, System.Numerics.Vector<float> left, System.Numerics.Vector<float> right);
```

Creates a new single-precision vector with elements selected between two specified single-precision source vectors based on an integral mask vector.

Parameters:

- `condition`: The integral mask vector used to drive selection.
- `left`: The first source vector.
- `right`: The second source vector.

Returns: The new vector with elements selected based on the mask.

The returned vector is equivalent to `condition``?``left``:``right` on a per-bit basis.

## Vector.ConditionalSelect(Int64>, Double>, Double>) method

```csharp
public static System.Numerics.Vector<double> ConditionalSelect (System.Numerics.Vector<long> condition, System.Numerics.Vector<double> left, System.Numerics.Vector<double> right);
```

Creates a new double-precision vector with elements selected between two specified double-precision source vectors based on an integral mask vector.

Parameters:

- `condition`: The integral mask vector used to drive selection.
- `left`: The first source vector.
- `right`: The second source vector.

Returns: The new vector with elements selected based on the mask.

The returned vector is equivalent to `condition``?``left``:``right` on a per-bit basis.

## Vector.ConditionalSelect<T>(Vector<T>, Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> ConditionalSelect<T> (System.Numerics.Vector<T> condition, System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Creates a new vector of a specified type with elements selected between two specified source vectors of the same type based on an integral mask vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `condition`: The integral mask vector used to drive selection.
- `left`: The first source vector.
- `right`: The second source vector.

Returns: The new vector with elements selected based on the mask.

The returned vector is equivalent to `condition``?``left``:``right` on a per-bit basis.

## Vector.ConvertToDouble(Int64>) method

```csharp
public static System.Numerics.Vector<double> ConvertToDouble (System.Numerics.Vector<long> value);
```

Converts a `Vector<Int64>` to a `Vector<Double>`.

Parameters:

- `value`: The source vector.

Returns: The converted vector.

To be added.

## Vector.ConvertToDouble(UInt64>) method

```csharp
public static System.Numerics.Vector<double> ConvertToDouble (System.Numerics.Vector<ulong> value);
```

Converts a `Vector<UInt64>` to a `Vector<Double>`.

Parameters:

- `value`: The source vector.

Returns: The converted vector.

To be added.

## Vector.ConvertToInt32(Single>) method

```csharp
public static System.Numerics.Vector<int> ConvertToInt32 (System.Numerics.Vector<float> value);
```

Converts a `Vector<Single>` to a `Vector<Int32>`.

Parameters:

- `value`: The source vector.

Returns: The converted vector.

To be added.

## Vector.ConvertToInt32Native(Single>) method

```csharp
public static System.Numerics.Vector<int> ConvertToInt32Native (System.Numerics.Vector<float> value);
```

Converts a `Vector<T>` to a `Vector<T>` using platform specific behavior on overflow.

Parameters:

- `value`: The vector to convert.

Returns: The converted vector.

To be added.

## Vector.ConvertToInt64(Double>) method

```csharp
public static System.Numerics.Vector<long> ConvertToInt64 (System.Numerics.Vector<double> value);
```

Converts a `Vector<Double>` to a `Vector<Int64>`.

Parameters:

- `value`: The source vector.

Returns: The converted vector.

To be added.

## Vector.ConvertToInt64Native(Double>) method

```csharp
public static System.Numerics.Vector<long> ConvertToInt64Native (System.Numerics.Vector<double> value);
```

Converts a `System.Numerics.Vector<System.Double>` to a `System.Numerics.Vector<System.Int64>` using platform specific behavior on overflow.

Parameters:

- `value`: The vector to convert.

Returns: The converted vector.

To be added.

## Vector.ConvertToSingle(Int32>) method

```csharp
public static System.Numerics.Vector<float> ConvertToSingle (System.Numerics.Vector<int> value);
```

Converts a `Vector<Int32>` to a `Vector<Single>`.

Parameters:

- `value`: The source vector.

Returns: The converted vector.

To be added.

## Vector.ConvertToSingle(UInt32>) method

```csharp
public static System.Numerics.Vector<float> ConvertToSingle (System.Numerics.Vector<uint> value);
```

Converts a `Vector<UInt32>` to a `Vector<Single>`.

Parameters:

- `value`: The source vector.

Returns: The converted vector.

To be added.

## Vector.ConvertToUInt32(Single>) method

```csharp
public static System.Numerics.Vector<uint> ConvertToUInt32 (System.Numerics.Vector<float> value);
```

Converts a `Vector<Single>` to a `Vector<UInt32>`.

Parameters:

- `value`: The source vector.

Returns: The converted vector.

To be added.

## Vector.ConvertToUInt32Native(Single>) method

```csharp
public static System.Numerics.Vector<uint> ConvertToUInt32Native (System.Numerics.Vector<float> value);
```

Converts a `System.Numerics.Vector<System.Single>` to a `System.Numerics.Vector<System.UInt32>` using platform specific behavior on overflow.

Parameters:

- `value`: The vector to convert.

Returns: The converted vector.

To be added.

## Vector.ConvertToUInt64(Double>) method

```csharp
public static System.Numerics.Vector<ulong> ConvertToUInt64 (System.Numerics.Vector<double> value);
```

Converts a `Vector<Double>` to a `Vector<UInt64>`.

Parameters:

- `value`: The source vector.

Returns: The converted vector.

To be added.

## Vector.ConvertToUInt64Native(Double>) method

```csharp
public static System.Numerics.Vector<ulong> ConvertToUInt64Native (System.Numerics.Vector<double> value);
```

Converts a `System.Numerics.Vector<System.Double>` to a `System.Numerics.Vector<System.UInt64>` using platform specific behavior on overflow.

Parameters:

- `value`: The vector to convert.

Returns: The converted vector.

To be added.

## Vector.CopySign<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> CopySign<T> (System.Numerics.Vector<T> value, System.Numerics.Vector<T> sign);
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

## Vector.Cos(Double>) method

```csharp
public static System.Numerics.Vector<double> Cos (System.Numerics.Vector<double> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Cos(Single>) method

```csharp
public static System.Numerics.Vector<float> Cos (System.Numerics.Vector<float> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Count<T>(Vector<T>, T) method

```csharp
public static int Count<T> (System.Numerics.Vector<T> vector, T value);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.CountWhereAllBitsSet<T>(Vector<T>) method

```csharp
public static int CountWhereAllBitsSet<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.Create<T>(ReadOnlySpan<T>) method

```csharp
public static System.Numerics.Vector<T> Create<T> (ReadOnlySpan<T> values);
```

Creates a new `Vector<T>` from a given readonly span.

Parameters:

- `T`: The type of the elements in the vector.
- `values`: The readonly span from which the vector is created.

Returns: A new `Vector<T>` with its elements set to the first `Vector<T>.Count` elements from `values`.

Exceptions:

- `ArgumentOutOfRangeException`: The length of `values` is less than `Vector128<T>.Count`.
- `NotSupportedException`: The type of `values` (`T`) is not supported.

To be added.

## Vector.Create<T>(T) method

```csharp
public static System.Numerics.Vector<T> Create<T> (T value);
```

Creates a new `Vector<T>` instance with all elements initialized to the specified value.

Parameters:

- `T`: The type of the elements in the vector.
- `value`: The value that all elements will be initialized to.

Returns: A new `Vector<T>` with all elements initialized to `value`.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.CreateAlternatingSequence<T>(T, T) method

```csharp
public static System.Numerics.Vector<T> CreateAlternatingSequence<T> (T even, T odd);
```

To be added.

Parameters:

- `T`: To be added.
- `even`: To be added.
- `odd`: To be added.

Returns: To be added.

To be added.

## Vector.CreateGeometricSequence<T>(T, T) method

```csharp
public static System.Numerics.Vector<T> CreateGeometricSequence<T> (T initial, T multiplier);
```

To be added.

Parameters:

- `T`: To be added.
- `initial`: To be added.
- `multiplier`: To be added.

Returns: To be added.

To be added.

## Vector.CreateHarmonicSequence<T>(T, T) method

```csharp
public static System.Numerics.Vector<T> CreateHarmonicSequence<T> (T start, T step);
```

To be added.

Parameters:

- `T`: To be added.
- `start`: To be added.
- `step`: To be added.

Returns: To be added.

To be added.

## Vector.CreateScalar<T>(T) method

```csharp
public static System.Numerics.Vector<T> CreateScalar<T> (T value);
```

Creates a new `Vector<T>` instance with the first element initialized to the specified value and the remaining elements initialized to zero.

Parameters:

- `T`: The type of the elements in the vector.
- `value`: The value that element 0 will be initialized to.

Returns: A new `Vector<T>` instance with the first element initialized to `value` and the remaining elements initialized to zero.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.CreateScalarUnsafe<T>(T) method

```csharp
public static System.Numerics.Vector<T> CreateScalarUnsafe<T> (T value);
```

Creates a new `Vector<T>` instance with the first element initialized to the specified value and the remaining elements left uninitialized.

Parameters:

- `T`: The type of the elements in the vector.
- `value`: The value that element 0 will be initialized to.

Returns: A new `Vector<T>` instance with the first element initialized to `value` and the remaining elements left uninitialized.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.
