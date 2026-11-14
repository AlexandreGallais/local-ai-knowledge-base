---
title: "Vector class (part 9 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector class (part 9 of 9)

## Vector.WidenLower(UInt32>) method

```csharp
public static System.Numerics.Vector<ulong> WidenLower (System.Numerics.Vector<uint> source);
```

Widens the lower half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened lower half of `source`.

To be added.

## Vector.WidenUpper(Byte>) method

```csharp
public static System.Numerics.Vector<ushort> WidenUpper (System.Numerics.Vector<byte> source);
```

Widens the upper half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened upper half of `source`.

To be added.

## Vector.WidenUpper(Int16>) method

```csharp
public static System.Numerics.Vector<int> WidenUpper (System.Numerics.Vector<short> source);
```

Widens the upper half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened upper half of `source`.

To be added.

## Vector.WidenUpper(Int32>) method

```csharp
public static System.Numerics.Vector<long> WidenUpper (System.Numerics.Vector<int> source);
```

Widens the upper half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened upper half of `source`.

To be added.

## Vector.WidenUpper(SByte>) method

```csharp
public static System.Numerics.Vector<short> WidenUpper (System.Numerics.Vector<sbyte> source);
```

Widens the upper half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened upper half of `source`.

To be added.

## Vector.WidenUpper(Single>) method

```csharp
public static System.Numerics.Vector<double> WidenUpper (System.Numerics.Vector<float> source);
```

Widens the upper half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened upper half of `source`.

To be added.

## Vector.WidenUpper(UInt16>) method

```csharp
public static System.Numerics.Vector<uint> WidenUpper (System.Numerics.Vector<ushort> source);
```

Widens the upper half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened upper half of `source`.

To be added.

## Vector.WidenUpper(UInt32>) method

```csharp
public static System.Numerics.Vector<ulong> WidenUpper (System.Numerics.Vector<uint> source);
```

Widens the upper half of a `Vector<T>` into a `Vector<T>`.

Parameters:

- `source`: The vector whose elements are to be widened.

Returns: A vector that contains the widened upper half of `source`.

To be added.

## Vector.WithElement(Vector2, Int32, Single) method

```csharp
public static System.Numerics.Vector2 WithElement (this System.Numerics.Vector2 vector, int index, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `index`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.WithElement(Vector3, Int32, Single) method

```csharp
public static System.Numerics.Vector3 WithElement (this System.Numerics.Vector3 vector, int index, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `index`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.WithElement(Vector4, Int32, Single) method

```csharp
public static System.Numerics.Vector4 WithElement (this System.Numerics.Vector4 vector, int index, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `index`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.WithElement<T>(Vector<T>, Int32, T) method

```csharp
public static System.Numerics.Vector<T> WithElement<T> (this System.Numerics.Vector<T> vector, int index, T value);
```

Creates a new `Vector<T>` with the element at the specified index set to the specified value and the remaining elements set to the same value as that in the given vector.

Parameters:

- `T`: The type of the elements in the vector.
- `vector`: The vector to get the remaining elements from.
- `index`: The index of the element to set.
- `value`: The value to set the element to.

Returns: A `Vector<T>` with the value of the element at `index` set to `value` and the remaining elements set to the same value as that in `vector`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` was less than zero or greater than the number of elements.
- `NotSupportedException`: The type of `vector` (`T`) is not supported.

To be added.

## Vector.Xor<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Xor<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector by performing a bitwise exclusive Or (`XOr`) operation on each pair of elements in two vectors.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The resulting vector.

To be added.

## Vector.Zip<T>(Vector<T>, Vector<T>) method

```csharp
public static (System.Numerics.Vector<T> Lower, System.Numerics.Vector<T> Upper) Zip<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.ZipLower<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> ZipLower<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector.ZipUpper<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> ZipUpper<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

To be added.

Parameters:

- `T`: To be added.
- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.
