---
title: "Vector<T> struct (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector<T> struct

Namespace: `System.Numerics`

```csharp
public readonly struct Vector<T> : IEquatable<System.Numerics.Vector<T>>, IFormattable
```

Represents a single vector of a specified numeric type that is suitable for low-level optimization of parallel algorithms.

Parameters:

- `T`: The type of the elements in the vector. `T` can be any primitive numeric type.

#### Remarks
`Vector<T>` is an immutable structure that represents a single vector of a specified numeric type. The count of `Vector<T>` instances is fixed, but its upper limit is CPU-register dependent. It's intended to be used as a building block for vectorizing large algorithms, and therefore cannot be used directly as an arbitrary length vector or tensor.

The `Vector<T>` structure provides support for hardware acceleration.

The term *primitive numeric data type* in this article refers to numeric data types that are directly supported by the CPU and have instructions that can manipulate those data types.

## Vector<T>.Vector(Byte>) constructor

```csharp
public Vector (ReadOnlySpan<byte> values);
```

Constructs a vector from the given read-only span of bytes.

Parameters:

- `values`: A read-only span of bytes that contains the values to add to the vector. The span must contain at least `Vector<T>.Count` elements and only the first `Vector<T>.Count` elements are used.

Exceptions:

- `IndexOutOfRangeException`: `values` did not contain at least `Vector<T>.Count` elements.
- `NotSupportedException`: Type `T` is not supported.
- `ArgumentOutOfRangeException`: The length of `values` is less than `sizeof(`Vector<T>`)`.

#### Remarks

Only the first `Vector<T>.Count` elements are added to the vector. The remainders are ignored.

## Vector<T>.Vector(ReadOnlySpan<T>) constructor

```csharp
public Vector (ReadOnlySpan<T> values);
```

Constructs a vector from the given `ReadOnlySpan<T>`.

Parameters:

- `values`: The values to add to the vector, as a read-only span of objects of type `T`. The span must contain at least `Vector<T>.Count` elements and only the first `Vector<T>.Count` elements are used.

Exceptions:

- `IndexOutOfRangeException`: `values` did not contain at least `Vector<T>.Count` elements.
- `NotSupportedException`: Type `T` is not supported.
- `ArgumentOutOfRangeException`: The length of `values` is less than `Vector<T>.Count`.

#### Remarks

Only the first `Vector<T>.Count` elements are added to the vector. The remainders are ignored.

## Vector<T>.Vector(Span<T>) constructor

```csharp
public Vector (Span<T> values);
```

Constructs a vector from the given `Span<T>`.

Parameters:

- `values`: The values to add to the vector, as a span of objects of type T. The span must contain at least `Vector<T>.Count` elements and only the first `Vector<T>.Count` elements are used.

Exceptions:

- `IndexOutOfRangeException`: `values` did not contain at least `Vector<T>.Count` elements.
- `NotSupportedException`: Type `T` is not supported.
- `ArgumentOutOfRangeException`: The length of `values` is less than `Vector<T>.Count`.

#### Remarks

Only the first `Vector<T>.Count` elements are added to the vector. The remainders are ignored.

## Vector<T>.Vector(T) constructor

```csharp
public Vector (T value);
```

Creates a vector whose components are of a specified type.

Parameters:

- `value`: The numeric type that defines the type of the components in the vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

To be added.

## Vector<T>.Vector(T[]) constructor

```csharp
public Vector (T[] values);
```

Creates a vector from a specified array.

Parameters:

- `values`: The values to add to the vector, as an array of objects of type T. The array must contain at least `Vector<T>.Count` elements and only the first `Vector<T>.Count` elements are used.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `NotSupportedException`: Type `T` is not supported.
- `NullReferenceException`: `values` is `null`.
- `ArgumentOutOfRangeException`: The length of `values` is less than `Vector128<T>.Count`.

#### Remarks

Only the first `Vector<T>.Count` elements are added to the vector. The remainders are ignored.

## Vector<T>.Vector(T[], Int32) constructor

```csharp
public Vector (T[] values, int index);
```

Creates a vector from a specified array starting at a specified index position.

Parameters:

- `values`: The values to add to the vector, as an array of objects of type T. The array must contain at least `Vector<T>.Count` elements from the specified index and only the first `Vector<T>.Count` elements are used.
- `index`: The starting index position from which to create the vector.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `IndexOutOfRangeException`: `index` is less than zero.

-or-

The length of `values` minus `index` is less than `Vector<T>.Count`.
- `NotSupportedException`: Type `T` is not supported.
- `NullReferenceException`: `values` is `null`.
- `ArgumentOutOfRangeException`: The length of `values`, starting from `index`, is less than `Vector128<T>.Count`.

#### Remarks

Only the first `Vector<T>.Count` elements are added to the vector. The remainders are ignored.

## Vector<T>.AllBitsSet property

```csharp
public static System.Numerics.Vector<T> AllBitsSet { get; }
```

Gets a new `Vector<T>` with all bits set to 1.

Returns: To be added.

Exceptions:

- `NotSupportedException`: The type of the current instance (`T`) is not supported.

To be added.

## Vector<T>.Count property

```csharp
public static int Count { get; }
```

Returns the number of elements stored in the vector.

Returns: The number of elements stored in the vector.

Exceptions:

- `NotSupportedException`: Access to the property getter via reflection is not supported.

-or-

Type `T` is not supported.

To be added.

## Vector<T>.Indices property

```csharp
public static System.Numerics.Vector<T> Indices { get; }
```

Gets a new `Vector<T>` with the elements set to their index.

Returns: To be added.

Exceptions:

- `NotSupportedException`: The type of the vector (`T`) is not supported.

To be added.

## Vector<T>.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether `T` is supported.

Returns: `true` if `T` is supported; otherwise, `false`.

To be added.

## Vector<T>.Item property

```csharp
public T this[int index] { get; }
```

Gets the element at a specified index.

Parameters:

- `index`: The index of the element to return.

Returns: The element at index `index`.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than or equal to `Vector<T>.Count`.
- `NotSupportedException`: Type `T` is not supported.
- `ArgumentOutOfRangeException`: `index` was less than zero or greater than the number of elements.

To be added.

## Vector<T>.One property

```csharp
public static System.Numerics.Vector<T> One { get; }
```

Returns a vector containing all ones.

Returns: A vector containing all ones.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

To be added.

## Vector<T>.Zero property

```csharp
public static System.Numerics.Vector<T> Zero { get; }
```

Returns a vector containing all zeroes.

Returns: A vector containing all zeroes.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

To be added.

## Vector<T>.CopyTo(Byte>) method

```csharp
public void CopyTo (Span<byte> destination);
```

Copies the vector to the given `Span<T>`.

Parameters:

- `destination`: The destination span to which the values are copied. The destination span must be at least size `Vector<T>.Count`.

Exceptions:

- `ArgumentException`: The number of elements in the source vector is greater than those available in the destination span.
- `NotSupportedException`: Type `T` is not supported.

To be added.

## Vector<T>.CopyTo(Span<T>) method

```csharp
public void CopyTo (Span<T> destination);
```

Copies the vector to the given span. .

Parameters:

- `destination`: The destination span to which the values are copied. The destination span must be at least size `Vector<T>.Count`.

Exceptions:

- `ArgumentException`: The number of elements in the source vector is greater than those available in the destination span.
- `NotSupportedException`: Type `T` is not supported.

To be added.

## Vector<T>.CopyTo(T[]) method

```csharp
public void CopyTo (T[] destination);
```

Copies the vector instance to a specified destination array.

Parameters:

- `destination`: The array to receive a copy of the vector values.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentException`: The number of elements in the current vector is greater than the number of elements available in the `destination` array.
- `NotSupportedException`: Type `T` is not supported.
- `NullReferenceException`: `destination` is `null`.

#### Remarks
The copy operation begins at index 0 of `destination`. The destination array must have at least `Vector<T>.Count` elements.

## Vector<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] destination, int startIndex);
```

Copies the vector instance to a specified destination array starting at a specified index position.

Parameters:

- `destination`: The array to receive a copy of the vector values.
- `startIndex`: The starting index in `destination` at which to begin the copy operation.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentException`: The number of elements in the current instance is greater than the number of elements available from `startIndex` to the end of the `destination` array.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last index in `destination`.
- `NotSupportedException`: Type `T` is not supported.
- `NullReferenceException`: `destination` is `null`.

#### Remarks
The copy operation begins at index `startIndex` of `destination`. The destination array must have at least `startIndex` + `Vector<T>.Count` elements.

## Vector<T>.Equals(Vector<T>) method

```csharp
public bool Equals (System.Numerics.Vector<T> other);
```

Returns a value that indicates whether this instance is equal to a specified vector.

Parameters:

- `other`: The vector to compare with this instance.

Returns: `true` if the current instance and `other` are equal; otherwise, `false`.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
Two vectors are equal if they are of the same type, have the same number of values, and each value in the current instance is equal to the corresponding value in `other`.

## Vector<T>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`. The method returns `false` if `obj` is null, or if `obj` is a vector of a different type than the current instance.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
Two vectors are equal if they are of the same type, have the same number of values, and each value in the current instance is equal to the corresponding value in `other`.

## Vector<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

To be added.

## Vector<T>.op_Addition(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator + (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Adds two vectors together.

Parameters:

- `left`: The first vector to add.
- `right`: The second vector to add.

Returns: The summed vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Addition` method defines the addition operation for `Vector<T>` objects.

## Vector<T>.op_BitwiseAnd(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator & (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector by performing a bitwise `And` operation on each of the elements in two vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from the bitwise `And` of `left` and `right`.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_BitwiseAnd` method defines the bitwise `And` operation for `Vector<T>` objects.

## Vector<T>.op_BitwiseOr(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator | (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector by performing a bitwise `Or` operation on each of the elements in two vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from the bitwise `Or` of the elements in `left` and `right`.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_BitwiseOr` method defines the bitwise `Or` operation for `Vector<T>` objects.

## Vector<T>.op_Division(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> operator / (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Divides the first vector by the second.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from dividing `left` by `right`.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
The `Vector<T>.op_Division` method defines the division operation for `Vector<T>` objects.

## Vector<T>.op_Division(Vector<T>, T) method

```csharp
public static System.Numerics.Vector<T> operator / (System.Numerics.Vector<T> left, T right);
```

Divides a vector by a scalar to compute the per-element quotient.

Parameters:

- `left`: The vector that will be divided by `right`.
- `right`: The scalar that will divide `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## Vector<T>.op_Equality(Vector<T>, Vector<T>) method

```csharp
public static bool operator == (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether each pair of elements in two specified vectors are equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

#### Remarks
Two vectors are equal if they are of the same type, have the same number of values, and each value in `left` is equal to the corresponding value in `right`.
