---
title: "Memory<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Memory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Memory<T> struct

Namespace: `System`

```csharp
public readonly struct Memory<T> : IEquatable<Memory<T>>
```

Represents a contiguous region of memory.

Parameters:

- `T`: The type of items in the `Memory<T>`.

#### Remarks

Like `Span<T>`, `Memory<T>` represents a contiguous region of memory. Unlike `Span<T>`, however, `Memory<T>` is not a ref struct. This means that `Memory<T>` can be placed on the managed heap, whereas `Span<T>` cannot. As a result, the `Memory<T>` structure does not have the same restrictions as a `Span<T>` instance. In particular:

- It can be used as a field in a class.

- It can be used across `await` and `yield` boundaries.

In addition to `Memory<T>`, you can use `ReadOnlyMemory<T>` to represent immutable or read-only memory.

## Memory<T>.Memory(T[]) constructor

```csharp
public Memory (T[]? array);
```

Creates a new `Memory<T>` object over the entirety of a specified array.

Parameters:

- `array`: The array from which to create the `Memory<T>` object.

Exceptions:

- `ArrayTypeMismatchException`: `T` is a reference type, and `array` is not an array of type `T`.

-or-

The array is covariant.

If `array` is `null`, this constructor returns a `Memory<T>` object with a `default<T>` value.

## Memory<T>.Memory(T[], Int32, Int32) constructor

```csharp
public Memory (T[]? array, int start, int length);
```

Creates a new `Memory<T>` object that includes a specified number of elements of an array beginning at a specified index.

Parameters:

- `array`: The source array.
- `start`: The index of the first element to include in the new `Memory<T>`.
- `length`: The number of elements to include in the new `Memory<T>`.

Exceptions:

- `ArgumentOutOfRangeException`: `array` is `null`, but `start` or `length` is non-zero.

-or-

`start` is outside the bounds of the array.

-or-

`start` and `length` exceeds the number of elements in the array.
- `ArrayTypeMismatchException`: `T` is a reference type, and `array` is not an array of type `T`.

If `array` is `null`, this constructor returns a  `Memory<T>` object with a `default<T>` value.

## Memory<T>.Empty property

```csharp
public static Memory<T> Empty { get; }
```

Returns an empty `Memory<T>` object.

Returns: An empty object.

To be added.

## Memory<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Indicates whether the current instance is empty.

Returns: `true` if the current instance is empty; otherwise, `false`.

A `Memory<T>` object is empty if its length is 0.

## Memory<T>.Length property

```csharp
public int Length { get; }
```

Gets the number of items in the current instance.

Returns: The number of items in the current instance.

To be added.

## Memory<T>.Span property

```csharp
public Span<T> Span { get; }
```

Returns a span from the current instance.

Returns: A span created from the current `Memory<T>` object.

Although it doesn't involve copying, it's costly to access this property.
Instead of accessing this property multiple times, it's better to assign its result to a variable (if possible).

## Memory<T>.CopyTo(Memory<T>) method

```csharp
public void CopyTo (Memory<T> destination);
```

Copies the contents of a `Memory<T>` object into a destination `Memory<T>` object.

Parameters:

- `destination`: The destination `Memory<T>` object.

Exceptions:

- `ArgumentException`: The length of `destination` is less than the length of the current instance.

This method copies all of the contents of the current `Memory<T>` instance to `destination` even if the contents of the current instance and `destination` overlap.

## Memory<T>.Equals(Memory<T>) method

```csharp
public bool Equals (Memory<T> other);
```

Determines whether the specified `Memory<T>` object is equal to the current object.

Parameters:

- `other`: The object to compare with the current instance.

Returns: `true` if the current instance and `other` are equal; otherwise, `false`.

The two objects are equal if:

- `other` is a `Memory<T>` or `ReadOnlyMemory<T>` object.

- Both objects point to the same array and have the same length.

The `Equals(Memory<T>)` method performs a test for reference equality; it does not compare the elements of `Memory<T>` for equality.

## Memory<T>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current object.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`.

Two `Memory<T>` objects are equal if both objects point to the same array and have the same length. Note that the test for equality does not check whether the contents are equal.

## Memory<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Memory<T>.op_Implicit(ArraySegment<T>) method

```csharp
public static implicit operator Memory<T> (ArraySegment<T> segment);
```

Defines an implicit conversion of an `ArraySegment<T>` object to a `Memory<T>` object.

Parameters:

- `segment`: The object to convert.

Returns: The converted `ArraySegment<T>` object.

To be added.

## Memory<T>.op_Implicit(Memory<T>) method

```csharp
public static implicit operator ReadOnlyMemory<T> (Memory<T> memory);
```

Defines an implicit conversion of a `Memory<T>` object to a `ReadOnlyMemory<T>` object.

Parameters:

- `memory`: The object to convert.

Returns: The converted object.

To be added.

## Memory<T>.op_Implicit(T[]) method

```csharp
public static implicit operator Memory<T> (T[]? array);
```

Defines an implicit conversion of an array to a `Memory<T>` object.

Parameters:

- `array`: The array to convert.

Returns: The converted object.

To be added.

## Memory<T>.Pin() method

```csharp
public System.Buffers.MemoryHandle Pin ();
```

Creates a handle for the `Memory<T>` object.

Returns: A handle for the `Memory<T>` object.

Exceptions:

- `ArgumentException`: An instance with non-primitive (non-blittable) members cannot be pinned.

The garbage collector will not move the memory until the returned `MemoryHandle` object is disposed. This enables you to retrieve and use the memory's address.

## Memory<T>.Slice(Int32) method

```csharp
public Memory<T> Slice (int start);
```

Forms a slice out of the current memory that begins at a specified index.

Parameters:

- `start`: The index at which to begin the slice.

Returns: An object that contains all elements of the current instance from `start` to the end of the instance.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is less than zero or greater than `Memory<T>.Length`.

To be added.

## Memory<T>.Slice(Int32, Int32) method

```csharp
public Memory<T> Slice (int start, int length);
```

Forms a slice out of the current memory starting at a specified index for a specified length.

Parameters:

- `start`: The index at which to begin the slice.
- `length`: The number of elements to include in the slice.

Returns: An object that contains `length` elements from the current instance starting at `start`.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is less than zero or greater than `Memory<T>.Length`.

-or-

`length` is greater than `Memory<T>.Length` - `start`

To be added.

## Memory<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the contents from the memory into a new array.

Returns: An array containing the elements in the current memory.

Because a call to the `ToArray` method performs a heap allocation, it should generally be avoided. However, it is sometimes necessary to take advantage of functionality that is only available for arrays.

Each call to the `ToArray` method returns a new array.

## Memory<T>.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this `Memory<T>` object.

Returns: the string representation of this `Memory<T>` object.

For a `Memory<Char>`, the `ToString` method returns a `String` that contains the characters pointed to by the `Memory<T>`. Otherwise, it returns a `String` with the name of the type and the number of elements that the `Memory<T>` contains.

## Memory<T>.TryCopyTo(Memory<T>) method

```csharp
public bool TryCopyTo (Memory<T> destination);
```

Copies the contents of the memory into a destination `Memory<T>` instance.

Parameters:

- `destination`: The destination `Memory<T>` object.

Returns: `true` if the copy operation succeeds; otherwise, `false`.

This method copies all of the contents of the current `Memory<T>` instance to `destination` even if the contents of the current instance and `destination` overlap.
