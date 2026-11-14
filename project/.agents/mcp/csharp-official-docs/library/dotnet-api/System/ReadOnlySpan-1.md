---
title: "ReadOnlySpan<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ReadOnlySpan`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlySpan<T> struct

Namespace: `System`

```csharp
public readonly ref struct ReadOnlySpan<T>
```

Provides a type-safe and memory-safe read-only representation of a contiguous region of arbitrary memory.

Parameters:

- `T`: The type of items in the `ReadOnlySpan<T>`.

`ReadOnlySpan<T>` is a ref struct that is allocated on the stack and can never escape to the managed heap. Ref struct types have a number of restrictions to ensure that they cannot be promoted to the managed heap, including that they can't be boxed, captured in lambda expressions, assigned to variables of type `Object`, assigned to `dynamic` variables, and they cannot implement any interface type.

A `ReadOnlySpan<T>` instance is often used to reference the elements of an array or a portion of an array. Unlike an array, however, a `ReadOnlySpan<T>` instance can point to managed memory, native memory, or memory managed on the stack.

## ReadOnlySpan<T>.ReadOnlySpan(T) constructor

```csharp
public ReadOnlySpan (ref readonly T reference);
```

Creates a new `ReadOnlySpan<T>` of length 1 around the specified reference.

Parameters:

- `reference`: A reference to data.

To be added.

## ReadOnlySpan<T>.ReadOnlySpan(T[]) constructor

```csharp
public ReadOnlySpan (T[]? array);
```

Creates a new `ReadOnlySpan<T>` over the entirety of a specified array.

Parameters:

- `array`: The array from which to create the `ReadOnlySpan<T>`.

If the `array` is null, this constructor returns a `default` `ReadOnlySpan<T>`.

## ReadOnlySpan<T>.ReadOnlySpan(Void*, Int32) constructor

```csharp
public ReadOnlySpan (void* pointer, int length);
```

Creates a new `ReadOnlySpan<T>` from a specified number of `T` elements starting at a specified memory address.

Parameters:

- `pointer`: A pointer to the starting address of a specified number of `T` elements in memory.
- `length`: The number of `T` elements to be included in the `ReadOnlySpan<T>`.

Exceptions:

- `ArgumentException`: `T` is a reference type or contains references and therefore cannot be stored in unmanaged memory.
- `ArgumentOutOfRangeException`: `length` is negative.

This constructor should be used with care, since it creates arbitrarily typed `T`s from a `void*`-typed block of memory, and neither `pointer` nor `length` are validated by the constructor.

## ReadOnlySpan<T>.ReadOnlySpan(T[], Int32, Int32) constructor

```csharp
public ReadOnlySpan (T[]? array, int start, int length);
```

Creates a new `ReadOnlySpan<T>` that includes a specified number of elements of an array starting at a specified index.

Parameters:

- `array`: The array from which to create the `ReadOnlySpan<T>`.
- `start`: The zero-based index of the first element to include.
- `length`: The number of elements to include.

Exceptions:

- `ArgumentOutOfRangeException`: `array` is `null`, but `start` or `length` is non-zero.

-or-

`start` is outside the bounds of the array.

-or-

`start` and `length` exceeds the number of elements in the array.

#### Remarks

If the `array` is null, this constructor returns a `default` `ReadOnlySpan<T>`.

## ReadOnlySpan<T>.Empty property

```csharp
public static ReadOnlySpan<T> Empty { get; }
```

Returns an empty `ReadOnlySpan<T>`.

Returns: An empty `ReadOnlySpan<T>`.

To be added.

## ReadOnlySpan<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Returns a value that indicates the current read-only span is empty.

Returns: `true` when the current span is empty; otherwise `false`.

To be added.

## ReadOnlySpan<T>.Item property

```csharp
public ref readonly T this[int index] { get; }
```

Gets an item from the read-only span at the specified zero-based index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element from the read-only span.

Exceptions:

- `IndexOutOfRangeException`: `index` is less then zero or greater than or equal to `ReadOnlySpan<T>.Length`.

To be added.

## ReadOnlySpan<T>.Length property

```csharp
public int Length { get; }
```

The number of items in the read-only span.

Returns: The number of items.

To be added.

## ReadOnlySpan<T>.CastUp<TDerived>(ReadOnlySpan<TDerived>) method

```csharp
public static ReadOnlySpan<T> CastUp<TDerived> (ReadOnlySpan<TDerived> items) where TDerived : class, T;
```

Casts a read-only span of `TDerived` to a read-only span of `T`.

Parameters:

- `TDerived`: The element type of the source read-only span, which must be derived from `T`.
- `items`: The source read-only span. No copy is made.

Returns: A read-only span with elements cast to the new type.

This method uses a covariant cast, producing a read-only span that shares the same memory as the source. The relationships expressed in the type constraints ensure that the cast is a safe operation.

## ReadOnlySpan<T>.CopyTo(Span<T>) method

```csharp
public void CopyTo (Span<T> destination);
```

Copies the contents of this `ReadOnlySpan<T>` into a destination `Span<T>`.

Parameters:

- `destination`: The span to copy items into.

Exceptions:

- `ArgumentException`: `destination` is shorter than the source `ReadOnlySpan<T>`.

If the `source` and `destination` overlap, the entirety of `source` is handled as if it was copied to a temporary location before it is copied to `destination`.

## ReadOnlySpan<T>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Not supported. Throws a `NotSupportedException`.

Parameters:

- `obj`: Not supported.

Returns: Not supported.

Exceptions:

- `NotSupportedException`: Always thrown by this method.

Not supported.

## ReadOnlySpan<T>.GetEnumerator() method

```csharp
public ReadOnlySpan<T>.Enumerator GetEnumerator ();
```

Returns an enumerator for this `ReadOnlySpan<T>`.

Returns: An enumerator for this read-only span.

Instead of calling the `ReadOnlySpan<T>.GetEnumerator` method directly, you can use the C# `foreach` statement and the Visual Basic `For Each`...`Next` construct to enumerate a `ReadOnlySpan<T>`.

## ReadOnlySpan<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Not supported. Throws a `NotSupportedException`.

Returns: Not supported.

Exceptions:

- `NotSupportedException`: Always thrown by this method.

Not supported.

## ReadOnlySpan<T>.GetPinnableReference() method

```csharp
public ref readonly T GetPinnableReference ();
```

Returns a read-only reference to an object of type T that can be used for pinning.

This method is intended to support .NET compilers and is not intended to be called by user code.

Returns: A reference to the element of the span at index 0, or `null` if the span is empty.

#### Remarks

Applications should not directly call `GetPinnableReference`. Instead, callers should use their language's normal pinning syntax, such as C\#'s `fixed` statement.

If pinning a `ReadOnlySpan<char>`, the resulting `char*` __is not__ assumed to be null-terminated. This behavior is different from pinning a `string`, where the resulting `char*` is guaranteed to be null-terminated.

#### Examples

The following example demonstrates creating an integer array, pinning it, and writing each element to the console.

_Code sample not included: ~/snippets/csharp/System/ReadOnlySpanT/GetPinnableReference/getpinnablereference1.cs._

## ReadOnlySpan<T>.op_Equality(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static bool operator == (ReadOnlySpan<T> left, ReadOnlySpan<T> right);
```

Returns a value that indicates whether two `ReadOnlySpan<T>` instances are equal.

Parameters:

- `left`: The first span to compare.
- `right`: The second span to compare.

Returns: `true` if the two `ReadOnlySpan<T>` instances are equal; otherwise, `false`.

This tests if two `ReadOnlySpan<T>` instances point to the same starting memory location, and have the same `Length` values. This does not compare the contents of two `ReadOnlySpan<T>` instances.

## ReadOnlySpan<T>.op_Implicit(ArraySegment<T>) method

```csharp
public static implicit operator ReadOnlySpan<T> (ArraySegment<T> segment);
```

Defines an implicit conversion of an `ArraySegment<T>` to a `ReadOnlySpan<T>`.

Parameters:

- `segment`: The array segment to be converted to a `ReadOnlySpan<T>`.

Returns: A read-only span that corresponds to the array segment.

To be added.

## ReadOnlySpan<T>.op_Implicit(T[]) method

```csharp
public static implicit operator ReadOnlySpan<T> (T[]? array);
```

Defines an implicit conversion of an array to a `ReadOnlySpan<T>`.

Parameters:

- `array`: The array to convert to a `ReadOnlySpan<T>`.

Returns: The read-only span that corresponds to `array`.

To be added.

## ReadOnlySpan<T>.op_Inequality(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static bool operator != (ReadOnlySpan<T> left, ReadOnlySpan<T> right);
```

Returns a value that indicates whether two `ReadOnlySpan<T>` instances are not equal.

Parameters:

- `left`: The first read-only span to compare.
- `right`: The second read-only span to compare.

Returns: `true` if the two `ReadOnlySpan<T>` instances are not equal; otherwise, `false`.

Two `ReadOnlySpan<T>` instances are not equal if they have different lengths or if the corresponding elements of `left` and `right` point to different memory locations.

## ReadOnlySpan<T>.Slice(Int32) method

```csharp
public ReadOnlySpan<T> Slice (int start);
```

Forms a slice out of the current read-only span that begins at a specified index.

Parameters:

- `start`: The zero-based index at which to begin the slice.

Returns: A span that consists of all elements of the current span from `start` to the end of the span.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is greater than the number of items in the read-only span.

To be added.

## ReadOnlySpan<T>.Slice(Int32, Int32) method

```csharp
public ReadOnlySpan<T> Slice (int start, int length);
```

Forms a slice out of the current read-only span starting at a specified index for a specified length.

Parameters:

- `start`: The zero-based index at which to begin this slice.
- `length`: The desired length for the slice.

Returns: A read-only span that consists of `length` elements from the current span starting at `start`.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is less than zero or greater than `Span<T>.Length`.

To be added.

## ReadOnlySpan<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the contents of this read-only span into a new array.

Returns: An array containing the data in the current span.

This method performs a heap allocation and data copy, and therefore, should be avoided if possible. It it sometimes necessary when APIs that support `ReadOnlySpan<T>` are not available, but APIs that work with arrays are.

## ReadOnlySpan<T>.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this `ReadOnlySpan<T>`.

Returns: The string representation of this instance.

For a `ReadOnlySpan<Char>`, the `ToString` method returns a `String` that contains the characters pointed to by the span. Otherwise, it returns a `String` with the name of the type and the number of elements that the span contains.

## ReadOnlySpan<T>.TryCopyTo(Span<T>) method

```csharp
public bool TryCopyTo (Span<T> destination);
```

Attempts to copy the contents of this `ReadOnlySpan<T>` into a `Span<T>` and returns a value to indicate whether or not the operation succeeded.

Parameters:

- `destination`: The target of the copy operation.

Returns: `true` if the copy operation succeeded; otherwise, `false`.

If the `source` and `destination` overlap, the entirety of `source` is handled as if it was copied to a temporary location before it is copied to `destination`.

If the `destination` length is shorter than `source`, no items are copied and the method returns `false`.
