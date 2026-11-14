---
title: "Vector class (part 1 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector class

Namespace: `System.Numerics`

```csharp
public static class Vector
```

Provides a collection of static methods for creating, manipulating, and otherwise operating on generic vectors.

To be added.

## Vector.IsHardwareAccelerated property

```csharp
public static bool IsHardwareAccelerated { get; }
```

Gets a value that indicates whether vector operations are subject to hardware acceleration through JIT intrinsic support.

Returns: `true` if vector operations are subject to hardware acceleration; otherwise, `false`.

#### Remarks
Vector operations are subject to hardware acceleration on systems that support Single Instruction, Multiple Data (SIMD) instructions, and the RyuJIT just-in-time compiler is used to compile managed code.

## Vector.Abs<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Abs<T> (System.Numerics.Vector<T> value);
```

Returns a new vector whose elements are the absolute values of the given vector's elements.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The absolute value vector.

To be added.

## Vector.Add<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Add<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose values are the sum of each pair of elements from two given vectors.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The summed vector.

To be added.

## Vector.AddSaturate<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> AddSaturate<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.All<T>(Vector<T>, T) method

```csharp
public static bool All<T> (System.Numerics.Vector<T> vector, T value);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.AllWhereAllBitsSet<T>(Vector<T>) method

```csharp
public static bool AllWhereAllBitsSet<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.AndNot<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> AndNot<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector by performing a bitwise And Not operation on each pair of corresponding elements in two vectors.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The resulting vector.

To be added.

## Vector.Any<T>(Vector<T>, T) method

```csharp
public static bool Any<T> (System.Numerics.Vector<T> vector, T value);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.AnyWhereAllBitsSet<T>(Vector<T>) method

```csharp
public static bool AnyWhereAllBitsSet<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.As<TFrom,TTo>(Vector<TFrom>) method

```csharp
public static System.Numerics.Vector<TTo> As<TFrom,TTo> (this System.Numerics.Vector<TFrom> vector);
```

Reinterprets a `Vector<T>` as a new `Vector<T>`.

Parameters:

- `TFrom`: The type of the input vector.
- `TTo`: The type of the vector `vector` should be reinterpreted as.
- `vector`: The vector to reinterpret.

Returns: `vector` reinterpreted as a new `Vector<T>`.

Exceptions:

- `NotSupportedException`: The type of `vector` (`TFrom`) or the type of the target (`TTo`) is not supported.

To be added.

## Vector.AsPlane(Vector4) method

```csharp
public static System.Numerics.Plane AsPlane (this System.Numerics.Vector4 value);
```

Reinterprets a `Vector4` as a new `Plane`.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Plane`.

To be added.

## Vector.AsQuaternion(Vector4) method

```csharp
public static System.Numerics.Quaternion AsQuaternion (this System.Numerics.Vector4 value);
```

Reinterprets a `Vector4` as a new `Quaternion`.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Quaternion`.

To be added.

## Vector.AsVector2(Vector3) method

```csharp
public static System.Numerics.Vector2 AsVector2 (this System.Numerics.Vector3 value);
```

Reinterprets a `Vector3` as a new `Vector2`.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Vector2`.

To be added.

## Vector.AsVector2(Vector4) method

```csharp
public static System.Numerics.Vector2 AsVector2 (this System.Numerics.Vector4 value);
```

Reinterprets a `Vector4` as a new `Vector2`.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Vector2`.

To be added.

## Vector.AsVector3(Vector2) method

```csharp
public static System.Numerics.Vector3 AsVector3 (this System.Numerics.Vector2 value);
```

Reinterprets a `Vector2` to a new `Vector3` with the new elements zeroed.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted to a new `Vector3` with the new elements zeroed.

To be added.

## Vector.AsVector3(Vector4) method

```csharp
public static System.Numerics.Vector3 AsVector3 (this System.Numerics.Vector4 value);
```

Reinterprets a `Vector4` as a new `Vector3`.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Vector3`.

To be added.

## Vector.AsVector3Unsafe(Vector2) method

```csharp
public static System.Numerics.Vector3 AsVector3Unsafe (this System.Numerics.Vector2 value);
```

Reinterprets a `Vector2` to a new `Vector3` with the new elements undefined.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted to a new `Vector3` with the new elements undefined.

To be added.

## Vector.AsVector4(Plane) method

```csharp
public static System.Numerics.Vector4 AsVector4 (this System.Numerics.Plane value);
```

Reinterprets a `Plane` as a new `Vector4`.

Parameters:

- `value`: The plane to reinterpret.

Returns: `value` reinterpreted as a new `Vector4`.

To be added.

## Vector.AsVector4(Quaternion) method

```csharp
public static System.Numerics.Vector4 AsVector4 (this System.Numerics.Quaternion value);
```

Reinterprets a `Quaternion` as a new `Vector4`.

Parameters:

- `value`: The quaternion to reinterpret.

Returns: `value` reinterpreted as a new `Quaternion`.

To be added.

## Vector.AsVector4(Vector2) method

```csharp
public static System.Numerics.Vector4 AsVector4 (this System.Numerics.Vector2 value);
```

Reinterprets a `Vector2` to a new `Vector4` with the new elements zeroed.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted to a new `Vector4` with the new elements zeroed.

To be added.

## Vector.AsVector4(Vector3) method

```csharp
public static System.Numerics.Vector4 AsVector4 (this System.Numerics.Vector3 value);
```

Converts a `Vector3` to a new `Vector4` with the new elements zeroed.

Parameters:

- `value`: The vector to convert.

Returns: `value` converted to a new `Vector4` with the new elements zeroed.

To be added.

## Vector.AsVector4Unsafe(Vector2) method

```csharp
public static System.Numerics.Vector4 AsVector4Unsafe (this System.Numerics.Vector2 value);
```

Reinterprets a `Vector2` to a new `Vector4` with the new elements undefined.

Parameters:

- `value`: The vector to reinterpret.

Returns: `value` reinterpreted to a new `Vector4` with the new elements undefined.

To be added.

## Vector.AsVector4Unsafe(Vector3) method

```csharp
public static System.Numerics.Vector4 AsVector4Unsafe (this System.Numerics.Vector3 value);
```

Converts a `Vector3` to a new `Vector4` with the new elements undefined.

Parameters:

- `value`: The vector to convert.

Returns: `value` converted to a new `Vector4` with the new elements undefined.

To be added.

## Vector.AsVectorByte<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<byte> AsVectorByte<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of unsigned bytes.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorDouble<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<double> AsVectorDouble<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a double-precision floating-point vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorInt16<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<short> AsVectorInt16<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of 16-bit integers.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorInt32<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<int> AsVectorInt32<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of integers.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorInt64<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<long> AsVectorInt64<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of long integers.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorNInt<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<IntPtr> AsVectorNInt<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of native-sized integers.

Parameters:

- `T`: The type of the input vector.
- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Vector<T>`.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorNUInt<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<UIntPtr> AsVectorNUInt<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of native-sized, unsigned integers.

Parameters:

- `T`: The type of the input vector.
- `value`: The vector to reinterpret.

Returns: `value` reinterpreted as a new `Vector<T>`.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorSByte<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<sbyte> AsVectorSByte<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of signed bytes.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorSingle<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<float> AsVectorSingle<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a single-precision floating-point vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorUInt16<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<ushort> AsVectorUInt16<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of unsigned 16-bit integers.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorUInt32<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<uint> AsVectorUInt32<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of unsigned integers.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.AsVectorUInt64<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<ulong> AsVectorUInt64<T> (System.Numerics.Vector<T> value);
```

Reinterprets the bits of a specified vector into those of a vector of unsigned long integers.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `value`: The source vector.

Returns: The reinterpreted vector.

Exceptions:

- `NotSupportedException`: The type of `value` (`T`) is not supported.

To be added.

## Vector.BitwiseAnd<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> BitwiseAnd<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector by performing a bitwise `And` operation on each pair of elements in two vectors.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The resulting vector.

To be added.
