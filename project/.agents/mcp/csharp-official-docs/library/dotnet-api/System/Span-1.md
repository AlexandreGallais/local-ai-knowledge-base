---
title: "Span<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Span`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Span<T> struct

Namespace: `System`

```csharp
public readonly ref struct Span<T>
```

Provides a type-safe and memory-safe representation of a contiguous region of arbitrary memory.

Parameters:

- `T`: The type of items in the `Span<T>`.

The `Span<T>` type is a ref struct that is allocated on the stack rather than on the managed heap. Ref struct types have some restrictions to ensure that they cannot be promoted to the managed heap, including that they can't be:

- Boxed.
- Assigned to variables of type `Object` or `dynamic`, or to any interface typ.
- Fields in a reference type.
- Used across `await` and `yield` boundaries.

In addition, calls to two methods, `Equals` and `Span<T>.GetHashCode`, throw a `NotSupportedException`.

> **Important:**
> Because it is a stack-only type, `Span<T>` is unsuitable for many scenarios that require storing references to buffers on the heap. This is true, for example, of routines that make asynchronous method calls. For such scenarios, you can use the complementary `Memory<T>` and `ReadOnlyMemory<T>` types.

For spans that represent immutable or read-only structures, use `ReadOnlySpan<T>`.

#### Memory

A `Span<T>` represents a contiguous region of arbitrary memory. A `Span<T>` instance is often used to hold the elements of an array or a portion of an array. Unlike an array, however, a `Span<T>` instance can point to managed memory, native memory, or memory managed on the stack. The following example creates a `Span<Byte>` from an array:

_Code sample not included: ~/snippets/csharp/System/Span/Overview/program.cs._

The following example creates a `Span<Byte>` from 100 bytes of native memory:

_Code sample not included: ~/snippets/csharp/System/Span/Overview/program.cs._

The following example uses the C# stackalloc keyword to allocate 100 bytes of memory on the stack:

_Code sample not included: ~/snippets/csharp/System/Span/Overview/program.cs._

Because `Span<T>` is an abstraction over an arbitrary block of memory, methods of the `Span<T>` type and methods with `Span<T>` parameters operate on any `Span<T>` object regardless of the kind of memory it encapsulates. For example, each of the separate sections of code that initialize the span and calculate the sum of its elements can be refactored into single initialization and calculation methods, as the following example illustrates:

_Code sample not included: ~/snippets/csharp/System/Span/Overview/program.cs._

#### Arrays

When it wraps an array, `Span<T>` can wrap an entire array, as it did in the examples in the Memory section. Because it supports slicing, `Span<T>` can also point to any contiguous range within the array.

The following example creates a slice of the middle five elements of a 10-element integer array. Note that the code doubles the values of each integer in the slice. As the output shows, the changes made by the span are reflected in the values of the array.

_Code sample not included: ~/snippets/csharp/System/Span/Slice/Program.cs._

#### Slices

`Span<T>` includes two overloads of the `Span<T>.Slice` method that form a slice out of the current span that starts at a specified index. This makes it possible to treat the data in a `Span<T>` as a set of logical chunks that can be processed as needed by portions of a data processing pipeline with minimal performance impact. For example, since modern server protocols are often text-based, manipulation of strings and substrings is particularly important. In the `String` class, the major method for extracting substrings is `String.Substring`. For data pipelines that rely on extensive string manipulation, its use offers some performance penalties, since it:

1. Creates a new string to hold the substring.
2. Copies a subset of the characters from the original string to the new string.

This allocation and copy operation can be eliminated by using either `Span<T>` or `ReadOnlySpan<T>`, as the following example shows:

_Code sample not included: ~/snippets/csharp/System/Span/Slice/Program2.cs._

## Span<T>.Span(T) constructor

```csharp
public Span (ref T reference);
```

Creates a new `Span<T>` of length 1 around the specified reference.

Parameters:

- `reference`: A reference to data.

To be added.

## Span<T>.Span(T[]) constructor

```csharp
public Span (T[]? array);
```

Creates a new `Span<T>` object over the entirety of a specified array.

Parameters:

- `array`: The array from which to create the `Span<T>` object.

Exceptions:

- `ArrayTypeMismatchException`: `T` is a reference type, and `array` is not an array of type `T`.

If `array` is `null`, this constructor returns a `null` `Span<T>`.

## Span<T>.Span(Void*, Int32) constructor

```csharp
public Span (void* pointer, int length);
```

Creates a new `Span<T>` object  from a specified number of `T` elements starting at a specified memory address.

Parameters:

- `pointer`: A pointer to the starting address of a specified number of `T` elements in memory.
- `length`: The number of `T` elements to be included in the `Span<T>`.

Exceptions:

- `ArgumentException`: `T` is a reference type or contains pointers and therefore cannot be stored in unmanaged memory.
- `ArgumentOutOfRangeException`: `length` is negative.

This constructor should be used with care, since it creates arbitrarily typed `T`s from a `void*`-typed block of memory, and neither `pointer` nor `length` are validated by the constructor.

## Span<T>.Span(T[], Int32, Int32) constructor

```csharp
public Span (T[]? array, int start, int length);
```

Creates a new `Span<T>` object that includes a specified number of elements of an array starting at a specified index.

Parameters:

- `array`: The source array.
- `start`: The zero-based index of the first element to include in the new `Span<T>`.
- `length`: The number of elements to include in the new `Span<T>`.

Exceptions:

- `ArgumentOutOfRangeException`: `array` is `null`, but `start` or `length` is non-zero.

-or-

`start` is outside the bounds of the array.

-or-

`start` and `length` exceeds the number of elements in the array.
- `ArrayTypeMismatchException`: `T` is a reference type, and `array` is not an array of type `T`.

#### Remarks

This method returns `default` when `array` is `null`.

## Span<T>.Empty property

```csharp
public static Span<T> Empty { get; }
```

Returns an empty `Span<T>` object.

Returns: An empty `Span<T>` object.

To be added.

## Span<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Returns a value that indicates whether the current `Span<T>` is empty.

Returns: `true` if the current span is empty; otherwise, `false`.

To be added.

## Span<T>.Item property

```csharp
public ref T this[int index] { get; }
```

Gets the element at the specified zero-based index.

Parameters:

- `index`: The zero-based index of the element.

Returns: The element at the specified index.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than zero or greater than or equal to `Span<T>.Length`.

To be added.

## Span<T>.Length property

```csharp
public int Length { get; }
```

Returns the length of the current span.

Returns: The length of the current span.

To be added.

## Span<T>.Clear() method

```csharp
public void Clear ();
```

Clears the contents of this `Span<T>` object.

The `Clear` method sets the items in the `Span<T>` object to their default values. It does not remove items from the `Span<T>`.

## Span<T>.CopyTo(Span<T>) method

```csharp
public void CopyTo (Span<T> destination);
```

Copies the contents of this `Span<T>` into a destination `Span<T>`.

Parameters:

- `destination`: The destination `Span<T>` object.

Exceptions:

- `ArgumentException`: `destination` is shorter than the source `Span<T>`.

This method copies all of `source` to `destination` even if `source` and `destination` overlap.

## Span<T>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Calls to this method are not supported.

Parameters:

- `obj`: Not supported.

Returns: Calls to this method are not supported.

Exceptions:

- `NotSupportedException`: Calls to this method are not supported.

To be added.

## Span<T>.Fill(T) method

```csharp
public void Fill (T value);
```

Fills the elements of this span with a specified value.

Parameters:

- `value`: The value to assign to each element of the span.

To be added.

## Span<T>.GetEnumerator() method

```csharp
public Span<T>.Enumerator GetEnumerator ();
```

Returns an enumerator for this `Span<T>`.

Returns: An enumerator for this span.

Instead of calling the `Span<T>.GetEnumerator` method directly, you can use the C# `foreach` statement and the Visual Basic `For Each`...`Next` construct to enumerate a `Span<T>`.

## Span<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Throws a `NotSupportedException`.

Returns: Calls to this method always throw a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Calls to this method are not supported.

To be added.

## Span<T>.GetPinnableReference() method

```csharp
public ref T GetPinnableReference ();
```

Returns a reference to an object of type T that can be used for pinning.

This method is intended to support .NET compilers and is not intended to be called by user code.

Returns: A reference to the element of the span at index 0, or `null` if the span is empty.

#### Remarks

Applications should not directly call `GetPinnableReference`. Instead, callers should use their language's normal pinning syntax, such as C\#'s `fixed` statement.

If pinning a `Span<char>`, the resulting `char*` __is not__ assumed to be null-terminated. This behavior is different from pinning a `string`, where the resulting `char*` is guaranteed to be null-terminated.

#### Examples

The following example demonstrates creating an integer array, pinning it, and writing each element to the console.

_Code sample not included: ~/snippets/csharp/System/ReadOnlySpanT/GetPinnableReference/getpinnablereference1.cs._

## Span<T>.op_Equality(Span<T>, Span<T>) method

```csharp
public static bool operator == (Span<T> left, Span<T> right);
```

Returns a value that indicates whether two `Span<T>` objects are equal.

Parameters:

- `left`: The first span to compare.
- `right`: The second span to compare.

Returns: `true` if the two `Span<T>` objects are equal; otherwise, `false`.

Two `Span<T>` objects are equal if they have the same length and the corresponding elements of `left` and `right` point to the same memory. Note that the test for equality does *not* attempt to determine whether the contents are equal.

## Span<T>.op_Implicit(ArraySegment<T>) method

```csharp
public static implicit operator Span<T> (ArraySegment<T> segment);
```

Defines an implicit conversion of an `ArraySegment<T>` to a `Span<T>`.

Parameters:

- `segment`: The array segment to be converted to a `Span<T>`.

Returns: A span that corresponds to the array segment.

To be added.

## Span<T>.op_Implicit(Span<T>) method

```csharp
public static implicit operator ReadOnlySpan<T> (Span<T> span);
```

Defines an implicit conversion of a `Span<T>` to a `ReadOnlySpan<T>`.

Parameters:

- `span`: The object to convert to a `ReadOnlySpan<T>`.

Returns: A read-only span that corresponds to the current instance.

To be added.

## Span<T>.op_Implicit(T[]) method

```csharp
public static implicit operator Span<T> (T[]? array);
```

Defines an implicit conversion of an array to a `Span<T>`.

Parameters:

- `array`: The array to convert to a `Span<T>`.

Returns: The span that corresponds to `array`.

To be added.

## Span<T>.op_Inequality(Span<T>, Span<T>) method

```csharp
public static bool operator != (Span<T> left, Span<T> right);
```

Returns a value that indicates whether two `Span<T>` objects are not equal.

Parameters:

- `left`: The first span to compare.
- `right`: The second span to compare.

Returns: `true` if the two `Span<T>` objects are not equal; otherwise, `false`.

Two `Span<T>` objects are not equal if they have different lengths or if the corresponding elements of `left` and `right` do not point to the same memory.

## Span<T>.Slice(Int32) method

```csharp
public Span<T> Slice (int start);
```

Forms a slice out of the current span that begins at a specified index.

Parameters:

- `start`: The zero-based index at which to begin the slice.

Returns: A span that consists of all elements of the current span from `start` to the end of the span.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is less than zero or greater than `Span<T>.Length`.

To be added.

## Span<T>.Slice(Int32, Int32) method

```csharp
public Span<T> Slice (int start, int length);
```

Forms a slice out of the current span starting at a specified index for a specified length.

Parameters:

- `start`: The zero-based index at which to begin this slice.
- `length`: The desired length for the slice.

Returns: A span that consists of `length` elements from the current span starting at `start`.

Exceptions:

- `ArgumentOutOfRangeException`: `start` or `start` + `length` is less than zero or greater than `Span<T>.Length`.

To be added.

## Span<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the contents of this span into a new array.

Returns: An array containing the data in the current span.

This method performs a heap allocation and therefore should be avoided if possible. Heap allocations are expected in APIs that work with arrays. Using such APIs is unavoidable if an alternative API overload that takes a `Span<T>` does not exist.

## Span<T>.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this `Span<T>` object.

Returns: The string representation of this `Span<T>` object.

For a `Span<Char>`, the `ToString` method returns a `String` that contains the characters pointed to by the `Span<T>`. Otherwise, it returns a `String` with the name of the type and the number of elements that the `Span<T>` contains.

## Span<T>.TryCopyTo(Span<T>) method

```csharp
public bool TryCopyTo (Span<T> destination);
```

Attempts to copy the current `Span<T>` to a destination `Span<T>` and returns a value that indicates whether the copy operation succeeded.

Parameters:

- `destination`: The target of the copy operation.

Returns: `true` if the copy operation succeeded; otherwise, `false`.

This method copies all of `source` to `destination` even if `source` and `destination` overlap.

If `destination` is shorter than the source `Span<T>`, this method returns `false`, and no data is written to `destination`.
