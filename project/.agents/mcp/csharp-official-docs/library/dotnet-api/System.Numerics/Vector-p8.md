---
title: "Vector class (part 8 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector class (part 8 of 9)

## Vector.StoreAlignedNonTemporal(Vector3, Single*) method

```csharp
public static void StoreAlignedNonTemporal (this System.Numerics.Vector3 source, float* destination);
```

Stores a vector at the given 8-byte aligned destination.

Parameters:

- `source`: The vector that will be stored.
- `destination`: The aligned destination at which `source` will be stored.

Exceptions:

- `AccessViolationException`: `destination` is not 8-byte aligned.

This method may bypass the cache on certain platforms.

## Vector.StoreAlignedNonTemporal(Vector4, Single*) method

```csharp
public static void StoreAlignedNonTemporal (this System.Numerics.Vector4 source, float* destination);
```

Stores a vector at the given 16-byte aligned destination.

Parameters:

- `source`: The vector that will be stored.
- `destination`: The aligned destination at which `source` will be stored.

Exceptions:

- `AccessViolationException`: `destination` is not 16-byte aligned.

This method may bypass the cache on certain platforms.

## Vector.StoreAlignedNonTemporal<T>(Vector<T>, T*) method

```csharp
public static void StoreAlignedNonTemporal<T> (this System.Numerics.Vector<T> source, T* destination);
```

Stores a vector at the given aligned destination.

Parameters:

- `T`: The type of the elements in the vector.
- `source`: The vector that will be stored.
- `destination`: The aligned destination at which `source` will be stored.

Exceptions:

- `NotSupportedException`: The type of `source` (`T`) is not supported.

This method may bypass the cache on certain platforms.

## Vector.StoreUnsafe(Vector2, Single) method

```csharp
public static void StoreUnsafe (this System.Numerics.Vector2 source, ref float destination);
```

Stores a vector at the given destination.

Parameters:

- `source`: The vector that will be stored.
- `destination`: The destination at which `source` will be stored.

To be added.

## Vector.StoreUnsafe(Vector3, Single) method

```csharp
public static void StoreUnsafe (this System.Numerics.Vector3 source, ref float destination);
```

Stores a vector at the given destination.

Parameters:

- `source`: The vector that will be stored.
- `destination`: The destination at which `source` will be stored.

To be added.

## Vector.StoreUnsafe(Vector4, Single) method

```csharp
public static void StoreUnsafe (this System.Numerics.Vector4 source, ref float destination);
```

Stores a vector at the given destination.

Parameters:

- `source`: The vector that will be stored.
- `destination`: The destination at which `source` will be stored.

To be added.

## Vector.StoreUnsafe(Vector2, Single, UIntPtr) method

```csharp
public static void StoreUnsafe (this System.Numerics.Vector2 source, ref float destination, UIntPtr elementOffset);
```

Stores a vector at the given destination.

Parameters:

- `source`: The vector that will be stored.
- `destination`: The destination to which `elementOffset` will be added before the vector will be stored.
- `elementOffset`: The element offset from `destination` from which the vector will be stored.

To be added.

## Vector.StoreUnsafe(Vector3, Single, UIntPtr) method

```csharp
public static void StoreUnsafe (this System.Numerics.Vector3 source, ref float destination, UIntPtr elementOffset);
```

Stores a vector at the given destination.

Parameters:

- `source`: The vector that will be stored.
- `destination`: The destination to which `elementOffset` will be added before the vector will be stored.
- `elementOffset`: The element offset from `destination` from which the vector will be stored.

To be added.

## Vector.StoreUnsafe(Vector4, Single, UIntPtr) method

```csharp
public static void StoreUnsafe (this System.Numerics.Vector4 source, ref float destination, UIntPtr elementOffset);
```

Stores a vector at the given destination.

Parameters:

- `source`: The vector that will be stored.
- `destination`: The destination to which `elementOffset` will be added before the vector will be stored.
- `elementOffset`: The element offset from `destination` from which the vector will be stored.

To be added.

## Vector.StoreUnsafe<T>(Vector<T>, T) method

```csharp
public static void StoreUnsafe<T> (this System.Numerics.Vector<T> source, ref T destination);
```

Stores a vector at the given destination.

Parameters:

- `T`: The type of the elements in the vector.
- `source`: The vector that will be stored.
- `destination`: The destination at which `source` will be stored.

Exceptions:

- `NotSupportedException`: The type of `source` (`T`) is not supported.

To be added.

## Vector.StoreUnsafe<T>(Vector<T>, T, UIntPtr) method

```csharp
public static void StoreUnsafe<T> (this System.Numerics.Vector<T> source, ref T destination, UIntPtr elementOffset);
```

Stores a vector at the given destination.

Parameters:

- `T`: The type of the elements in the vector.
- `source`: The vector that will be stored.
- `destination`: The destination to which `elementOffset` will be added before the vector will be stored.
- `elementOffset`: The element offset from `destination` from which the vector will be stored.

Exceptions:

- `NotSupportedException`: The type of `source` (`T`) is not supported.

To be added.

## Vector.Subtract<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Subtract<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose values are the difference between the elements in the second vector and their corresponding elements in the first vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The difference vector.

To be added.

## Vector.SubtractSaturate<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> SubtractSaturate<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.Sum<T>(Vector<T>) method

```csharp
public static T Sum<T> (System.Numerics.Vector<T> value);
```

Returns the sum of all the elements inside the specified vector.

Parameters:

- `T`: The type of the elements to sum..
- `value`: A vector containing the objects of type `T` to sum.

Returns: The sum of all elements inside the vector.

To be added.

## Vector.ToScalar(Vector2) method

```csharp
public static float ToScalar (this System.Numerics.Vector2 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.ToScalar(Vector3) method

```csharp
public static float ToScalar (this System.Numerics.Vector3 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.ToScalar(Vector4) method

```csharp
public static float ToScalar (this System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.ToScalar<T>(Vector<T>) method

```csharp
public static T ToScalar<T> (this System.Numerics.Vector<T> vector);
```

Converts the given vector to a scalar containing the value of the first element.

Parameters:

- `T`: The type of the elements in the vector.
- `vector`: The vector to get the first element from.

Returns: A scalar `T` containing the value of the first element.

Exceptions:

- `NotSupportedException`: The type of `vector` (`T`) is not supported.

To be added.

## Vector.Truncate(Double>) method

```csharp
public static System.Numerics.Vector<double> Truncate (System.Numerics.Vector<double> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Truncate(Single>) method

```csharp
public static System.Numerics.Vector<float> Truncate (System.Numerics.Vector<float> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Unzip<T>(Vector<T>, Vector<T>) method

```csharp
public static (System.Numerics.Vector<T> Even, System.Numerics.Vector<T> Odd) Unzip<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.UnzipEven<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> UnzipEven<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.UnzipOdd<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> UnzipOdd<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.Widen(Byte>, UInt16>, UInt16>) method

```csharp
public static void Widen (System.Numerics.Vector<byte> source, out System.Numerics.Vector<ushort> low, out System.Numerics.Vector<ushort> high);
```

Widens a `Vector<Byte>` into two `Vector<UInt16>` instances.

Parameters:

- `source`: The source vector whose elements are widened into the outputs.
- `low`: When this method returns, contains the widened result of the lower half of `source`.
- `high`: When this method returns, contains the widened result of the upper half of `source`.

To be added.

## Vector.Widen(Int16>, Int32>, Int32>) method

```csharp
public static void Widen (System.Numerics.Vector<short> source, out System.Numerics.Vector<int> low, out System.Numerics.Vector<int> high);
```

Widens a `Vector<Int16>` into two `Vector<Int32>` instances.

Parameters:

- `source`: The source vector whose elements are widened into the outputs.
- `low`: When this method returns, contains the widened result of the lower half of `source`.
- `high`: When this method returns, contains the widened result of the upper half of `source`.

To be added.

## Vector.Widen(Int32>, Int64>, Int64>) method

```csharp
public static void Widen (System.Numerics.Vector<int> source, out System.Numerics.Vector<long> low, out System.Numerics.Vector<long> high);
```

Widens a `Vector<Int32>` into two `Vector<Int64>` instances.

Parameters:

- `source`: The source vector whose elements are widened into the outputs.
- `low`: When this method returns, contains the widened result of the lower half of `source`.
- `high`: When this method returns, contains the widened result of the upper half of `source`.

To be added.

## Vector.Widen(SByte>, Int16>, Int16>) method

```csharp
public static void Widen (System.Numerics.Vector<sbyte> source, out System.Numerics.Vector<short> low, out System.Numerics.Vector<short> high);
```

Widens a `Vector<SByte>` into two `Vector<Int16>` instances.

Parameters:

- `source`: The source vector whose elements are widened into the outputs.
- `low`: When this method returns, contains the widened result of the lower half of `source`.
- `high`: When this method returns, contains the widened result of the upper half of `source`.

To be added.

## Vector.Widen(Single>, Double>, Double>) method

```csharp
public static void Widen (System.Numerics.Vector<float> source, out System.Numerics.Vector<double> low, out System.Numerics.Vector<double> high);
```

Widens a `Vector<Single>` into two `Vector<Double>` instances.

Parameters:

- `source`: The source vector whose elements are widened into the outputs.
- `low`: When this method returns, contains the widened result of the lower half of `source`.
- `high`: When this method returns, contains the widened result of the upper half of `source`.

To be added.

## Vector.Widen(UInt16>, UInt32>, UInt32>) method

```csharp
public static void Widen (System.Numerics.Vector<ushort> source, out System.Numerics.Vector<uint> low, out System.Numerics.Vector<uint> high);
```

Widens a `Vector<UInt16>` into two `Vector<UInt32>` instances.

Parameters:

- `source`: The source vector whose elements are widened into the outputs.
- `low`: When this method returns, contains the widened result of the lower half of `source`.
- `high`: When this method returns, contains the widened result of the upper half of `source`.

To be added.

## Vector.Widen(UInt32>, UInt64>, UInt64>) method

```csharp
public static void Widen (System.Numerics.Vector<uint> source, out System.Numerics.Vector<ulong> low, out System.Numerics.Vector<ulong> high);
```

Widens a `Vector<UInt32>` into two `Vector<UInt64>` instances.

Parameters:

- `source`: The source vector whose elements are widened into the outputs.
- `low`: When this method returns, contains the widened result of the lower half of `source`.
- `high`: When this method returns, contains the widened result of the upper half of `source`.

To be added.

## Vector.WidenLower(Byte>) method

```csharp
public static System.Numerics.Vector<ushort> WidenLower (System.Numerics.Vector<byte> source);
```

Widens the lower half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened lower half of `source`.

To be added.

## Vector.WidenLower(Int16>) method

```csharp
public static System.Numerics.Vector<int> WidenLower (System.Numerics.Vector<short> source);
```

Widens the lower half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened lower half of `source`.

To be added.

## Vector.WidenLower(Int32>) method

```csharp
public static System.Numerics.Vector<long> WidenLower (System.Numerics.Vector<int> source);
```

Widens the lower half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened lower half of `source`.

To be added.

## Vector.WidenLower(SByte>) method

```csharp
public static System.Numerics.Vector<short> WidenLower (System.Numerics.Vector<sbyte> source);
```

Widens the lower half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened lower half of `source`.

To be added.

## Vector.WidenLower(Single>) method

```csharp
public static System.Numerics.Vector<double> WidenLower (System.Numerics.Vector<float> source);
```

Widens the lower half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened lower half of `source`.

To be added.

## Vector.WidenLower(UInt16>) method

```csharp
public static System.Numerics.Vector<uint> WidenLower (System.Numerics.Vector<ushort> source);
```

Widens the lower half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened lower half of `source`.

To be added.
