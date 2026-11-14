---
title: "ReadOnlyMemory<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ReadOnlyMemory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyMemory<T> struct

Namespace: `System`

```csharp
public readonly struct ReadOnlyMemory<T> : IEquatable<ReadOnlyMemory<T>>
```

Represents a contiguous region of memory, similar to `ReadOnlySpan<T>`. Unlike `ReadOnlySpan<T>`, it is not a byref-like type.

Parameters:

- `T`: The object type from which the contiguous region of memory will be read.

To be added.

## ReadOnlyMemory<T>.ReadOnlyMemory(T[]) constructor

```csharp
public ReadOnlyMemory (T[]? array);
```

Creates a new memory region over the entirety of the target array.

Parameters:

- `array`: The target array.

Exceptions:

- `ArrayTypeMismatchException`: `array` is covariant, and the type of array is not exactly `T[]`.

#### Remarks

Returns `default` when `array` is `null`.

## ReadOnlyMemory<T>.ReadOnlyMemory(T[], Int32, Int32) constructor

```csharp
public ReadOnlyMemory (T[]? array, int start, int length);
```

Creates a new memory region over the portion of the target array beginning at a specified position and including a specified number of elements.

Parameters:

- `array`: The target array.
- `start`: The index at which to begin the memory region.
- `length`: The number of items in the memory region.

Exceptions:

- `ArrayTypeMismatchException`: `array` is covariant, and the type of array is not exactly `T[]`.
- `ArgumentOutOfRangeException`: `start`, `length`, or `start` + `length` identify a position outside the range of the array.

#### Remarks

Returns `default` when `array` is `null`.

## ReadOnlyMemory<T>.Empty property

```csharp
public static ReadOnlyMemory<T> Empty { get; }
```

Gets an empty `ReadOnlyMemory<T>`.

Returns: An empty read-only memory region.

To be added.

## ReadOnlyMemory<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this read-only memory region is empty.

Returns: `true` if the read-only memory region is empty (that is, its `ReadOnlyMemory<T>.Length` is 0); otherwise, `false`.

To be added.

## ReadOnlyMemory<T>.Length property

```csharp
public int Length { get; }
```

Gets the number of items in the memory region.

Returns: The number of items in the memory region.

To be added.

## ReadOnlyMemory<T>.Span property

```csharp
public ReadOnlySpan<T> Span { get; }
```

Gets a span from the memory region.

Returns: A memory span.

To be added.

## ReadOnlyMemory<T>.CopyTo(Memory<T>) method

```csharp
public void CopyTo (Memory<T> destination);
```

Copies the contents of the read-only memory region into a destination memory region.

Parameters:

- `destination`: The memory region to copy items into.

Exceptions:

- `ArgumentException`: `destination` is smaller than the source memory region.

## Remarks

If the source and `destination` overlap, this method behaves as if the original values are in a temporary location before the destination is overwritten.

## ReadOnlyMemory<T>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current read-only memory region.

Parameters:

- `obj`: The object to compare.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`.

To be added.

## ReadOnlyMemory<T>.Equals(ReadOnlyMemory<T>) method

```csharp
public bool Equals (ReadOnlyMemory<T> other);
```

Determines whether the current instance and a specified `ReadOnlyMemory<T>` objects are equal.

Parameters:

- `other`: The read-only memory to compare.

Returns: `true` if the current instance and `other` are equal; otherwise, `false`.

#### Remarks

[!IMPORTANT]

Two `ReadOnlyMemory<T>` objects are equal if the memory regions point to the same array and have the same length. The method does not check to see if the contents are equal.

## ReadOnlyMemory<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this `ReadOnlyMemory<T>`.

Returns: The hash code.

To be added.

## ReadOnlyMemory<T>.op_Implicit(ArraySegment<T>) method

```csharp
public static implicit operator ReadOnlyMemory<T> (ArraySegment<T> segment);
```

Defines an implicit conversion of a `ArraySegment<T>` to a `ReadOnlyMemory<T>`.

Parameters:

- `segment`: The array segment to convert.

Returns: A read-only memory representation of the array segment.

To be added.

## ReadOnlyMemory<T>.op_Implicit(T[]) method

```csharp
public static implicit operator ReadOnlyMemory<T> (T[]? array);
```

Defines an implicit conversion of an array to a `ReadOnlyMemory<T>`.

Parameters:

- `array`: An array of type T to convert.

Returns: The read-only memory representation of the array of type T.

To be added.

## ReadOnlyMemory<T>.Pin() method

```csharp
public System.Buffers.MemoryHandle Pin ();
```

Creates a handle for the memory.

Returns: A handle for the memory.

Exceptions:

- `ArgumentException`: An instance with nonprimitive (non-blittable) members cannot be pinned.

#### Remarks

> **Important:**
> The garbage collector will not move the memory until the returned `MemoryHandle` is disposed, which enables taking and using the memory's address.

## ReadOnlyMemory<T>.Slice(Int32) method

```csharp
public ReadOnlyMemory<T> Slice (int start);
```

Forms a slice out of the given memory region, beginning at a specified position and continuing to its end.

Parameters:

- `start`: The index at which to begin this slice.

Returns: A read-only memory region representing the desired slice.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is less than 0 or greater than `ReadOnlyMemory<T>.Length`.

To be added.

## ReadOnlyMemory<T>.Slice(Int32, Int32) method

```csharp
public ReadOnlyMemory<T> Slice (int start, int length);
```

Forms a slice out of the given memory region starting at `start` position for `length` elements.

Parameters:

- `start`: The index at which to begin this slice.
- `length`: The desired length for the slice.

Returns: A read-only memory region representing the desired slice.

Exceptions:

- `ArgumentOutOfRangeException`: `start`, `length`, or `start` + `length` are outside the range of the current instance.

To be added.

## ReadOnlyMemory<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the contents from the memory region into a new array.

Returns: An array.

#### Remarks

`ToArray` allocates on the heap and so should generally be avoided. However, it is sometimes necessary to bridge the gap with APIs written in terms of arrays.

## ReadOnlyMemory<T>.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this read-only memory instance.

Returns: For `ReadOnlyMemory<T>` with char elements, returns an instance of string that represents the characters pointed to by the memory. Otherwise, returns a `String` with the name of the type and the number of elements.

To be added.

## ReadOnlyMemory<T>.TryCopyTo(Memory<T>) method

```csharp
public bool TryCopyTo (Memory<T> destination);
```

Tries to copy the contents of the readonly-only memory into the destination and returns a value that indicates whether the copy operation succeeded.

Parameters:

- `destination`: The memory region to copy items into.

Returns: `true` if the copy operation succeeded. `false` if `destination` is smaller than the current instance, and no data is written to `destination`.

#### Remarks

If the source and `destination` overlap, this method behaves as if the original values are in a temporary location before the destination is overwritten.
