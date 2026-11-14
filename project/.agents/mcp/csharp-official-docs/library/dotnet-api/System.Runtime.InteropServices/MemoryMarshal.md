---
title: "MemoryMarshal class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/MemoryMarshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryMarshal class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class MemoryMarshal
```

Provides methods to interoperate with `Memory<T>`, `ReadOnlyMemory<T>`,  `Span<T>`, and  `ReadOnlySpan<T>`.

To be added.

## MemoryMarshal.AsBytes<T>(ReadOnlySpan<T>) method

```csharp
public static ReadOnlySpan<byte> AsBytes<T> (ReadOnlySpan<T> span) where T : struct;
```

Casts a `ReadOnlySpan<T>` of one primitive type, `T`, to a `ReadOnlySpan<Byte>`.

Parameters:

- `T`: The type of items in the read-only span.
- `span`: The source slice to convert.

Returns: A read-only span of type `Byte`.

Exceptions:

- `ArgumentException`: `T` contains managed object references.
- `OverflowException`: The `ReadOnlySpan<T>.Length` property of the new `ReadOnlySpan<T>` would exceed <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>

#### Remarks

`T` cannot contain managed object references. The `AsBytes` method performs this check at runtime and throws `ArgumentException` if the check fails.

> **Caution:**
> This method provides a raw binary projection over the original span, including over any private instance fields and other implementation details of type `T`. Callers should ensure that their code is resilient to changes in the internal layout of `T`.

## MemoryMarshal.AsBytes<T>(Span<T>) method

```csharp
public static Span<byte> AsBytes<T> (Span<T> span) where T : struct;
```

Casts a `Span<T>` of one primitive type, `T`, to a `Span<Byte>`.

Parameters:

- `T`: The type of items in the span.
- `span`: The source slice to convert.

Returns: A span of type `Byte`.

Exceptions:

- `ArgumentException`: `T` contains managed object references.
- `OverflowException`: The `ReadOnlySpan<T>.Length` property of the new `ReadOnlySpan<T>` would exceed <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>

#### Remarks

`T` cannot contain managed object references. The `AsBytes` method performs this check at runtime and throws `ArgumentException` if the check fails.

> **Caution:**
> This method provides a raw binary projection over the original span, including over any private instance fields and other implementation details of type `T`. Callers should ensure that their code is resilient to changes in the internal layout of `T`.

## MemoryMarshal.AsMemory<T>(ReadOnlyMemory<T>) method

```csharp
public static Memory<T> AsMemory<T> (ReadOnlyMemory<T> memory);
```

Creates a `Memory<T>` instance from a `ReadOnlyMemory<T>`.

Parameters:

- `T`: The type of items in the read-only memory buffer.
- `memory`: The read-only memory buffer.

Returns: A memory block that represents the same memory as the `ReadOnlyMemory<T>`.

#### Remarks

> **Caution:**
> This method must be used with extreme caution. `ReadOnlyMemory<T>` is used to represent immutable data and other memory that is not meant to be written to. `Memory<T>` instances created by this method should not be written to. The purpose of this method is to allow variables typed as `Memory<T>` but only used for reading to store a `ReadOnlyMemory<T>`.

## MemoryMarshal.AsRef<T>(Byte>) method

```csharp
public static ref readonly T AsRef<T> (ReadOnlySpan<byte> span) where T : struct;
```

Reinterprets a read-only span of bytes as a read-only reference to the structure of type `T`.

Parameters:

- `T`: The type of the returned reference.
- `span`: The read-only span to reinterpret.

Returns: The read-only reference to the structure of type `T`.

Exceptions:

- `ArgumentException`: `T` contains managed object references.

#### Remarks

`T` cannot contain managed object references. The `AsRef` method performs this check at runtime and throws `ArgumentException` if the check fails.

This method is supported only on platforms that support misaligned memory access or when the memory block is aligned by other means.

## MemoryMarshal.AsRef<T>(Byte>) method

```csharp
public static ref T AsRef<T> (Span<byte> span) where T : struct;
```

Reinterprets a span of bytes as a reference to the structure of type `T`.

Parameters:

- `T`: The type of the returned reference.
- `span`: The span to reinterpret.

Returns: The reference to the structure of type `T`.

Exceptions:

- `ArgumentException`: `T` contains managed object references.

#### Remarks

`T` cannot contain managed object references. The `AsRef` method performs this check at runtime and throws `ArgumentException` if the check fails.

This method is supported only on platforms that support misaligned memory access or when the memory block is aligned by other means.

## MemoryMarshal.Cast<TFrom,TTo>(ReadOnlySpan<TFrom>) method

```csharp
public static ReadOnlySpan<TTo> Cast<TFrom,TTo> (ReadOnlySpan<TFrom> span) where TFrom : struct where TTo : struct;
```

Casts a read-only span of one primitive type to a read-only span of another primitive type.

Parameters:

- `TFrom`: The type of the source span.
- `TTo`: The type of the target span.
- `span`: The source slice to convert.

Returns: The converted read-only span.

Exceptions:

- `ArgumentException`: `TFrom` or `TTo` contains managed object references.
- `OverflowException`: The `ReadOnlySpan<T>.Length` property of the new `ReadOnlySpan<T>` would exceed `Int32.MaxValue`.

#### Remarks

Neither `TFrom` nor `TTo` can contain managed object references. The `Cast` method performs this check at runtime and throws `ArgumentException` if the check fails.

This method is supported only on platforms that support misaligned memory access or when the memory block is aligned by other means.

## MemoryMarshal.Cast<TFrom,TTo>(Span<TFrom>) method

```csharp
public static Span<TTo> Cast<TFrom,TTo> (Span<TFrom> span) where TFrom : struct where TTo : struct;
```

Casts a span of one primitive type to a span of another primitive type.

Parameters:

- `TFrom`: The type of the source span.
- `TTo`: The type of the target span.
- `span`: The source slice to convert.

Returns: The converted span.

Exceptions:

- `ArgumentException`: `TFrom` or `TTo` contains managed object references.
- `OverflowException`: The `ReadOnlySpan<T>.Length` property of the new `ReadOnlySpan<T>` would exceed `Int32.MaxValue`.

#### Remarks

Neither `TFrom` nor `TTo` can contain managed object references. The `Cast` method performs this check at runtime and throws `ArgumentException` if the check fails.

If the sizes of the two types are different, the cast combines or splits values, which leads to a change in length.

For example, if `TFrom` is `Int64`, the `ReadOnlySpan<Int64>` contains a single value, 0x0100001111110F0F, and `TTo` is `Int32`, the resulting `ReadOnlySpan<Int32>` contains two values. The values are 0x11110F0F and 0x01000011 on a little-endian architecture, such as x86. On a big-endian architecture, the order of the two values is reversed, i.e. 0x01000011, followed by 0x11110F0F.

As another example, if `TFrom` is `Int32`, the `ReadOnlySpan<Int32>` contains the values of 1, 2 and 3, and `TTo` is `Int64`, the resulting `ReadOnlySpan<Int64>` contains a single value: 0x0000000200000001 on a little-endian architecture and 0x0000000100000002 on a big-endian architecture.

This method is supported only on platforms that support misaligned memory access or when the memory block is aligned by other means.

## MemoryMarshal.CreateFromPinnedArray<T>(T[], Int32, Int32) method

```csharp
public static Memory<T> CreateFromPinnedArray<T> (T[]? array, int start, int length);
```

Creates a new memory buffer over the portion of the pre-pinned target array beginning at the `start` index and consisting of `length` items.

Parameters:

- `T`: The type of the array.
- `array`: The pre-pinned source array.
- `start`: The index of `array` at which to begin the memory block.
- `length`: The number of items to include in the memory block.

Returns: A block of memory over the specified elements of `array`. If `array` is `null`, or if `start` and `length` are 0, the method returns a `Memory<T>` instance of `Memory<T>.Length` zero.

Exceptions:

- `ArrayTypeMismatchException`: `array` is covariant, and the type of `array` is not exactly `T[]`.
- `ArgumentOutOfRangeException`: The `start` or the end index is not in the range of 0 to `Array.Length`.

#### Remarks

The array must already be pinned before this method is called, and that array must not be unpinned while the `Memory<T>` buffer that it returns is still in use. Calling this method on an unpinned array could result in memory corruption.

## MemoryMarshal.CreateReadOnlySpan<T>(T, Int32) method

```csharp
public static ReadOnlySpan<T> CreateReadOnlySpan<T> (scoped ref readonly T reference, int length);
```

Creates a new read-only span over a portion of a regular managed object.

Parameters:

- `T`: The type of the data items.
- `reference`: A reference to data.
- `length`: The number of `T` elements that `reference` contains.

Returns: A read-only span.

#### Remarks

This method can be useful if part of a managed object represents a fixed array.

> **Warning:**
> This method should be used with caution. It is dangerous because the `length` argument is not checked. Even though the `ref` is annotated as `scoped`, it will be stored into the returned span, and the lifetime of the returned span will not be validated for safety, even by span-aware languages.

## MemoryMarshal.CreateReadOnlySpanFromNullTerminated(Byte*) method

```csharp
public static ReadOnlySpan<byte> CreateReadOnlySpanFromNullTerminated (byte* value);
```

Creates a new read-only span for a null-terminated sequence of bytes.

Parameters:

- `value`: The pointer to the null-terminated sequence of bytes.

Returns: A read-only span representing the specified sequence of bytes, or an empty span if the pointer is `null`.

Exceptions:

- `ArgumentException`: The `ReadOnlySpan<T>.Length` property of the new `ReadOnlySpan<T>` would exceed <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

This method is typically used with byte sequences representing narrow character strings, such as ANSI or UTF-8 strings. The returned span does not include the `null` terminator, nor does this API attempt to intepret the contents of the byte sequence in any form.

## MemoryMarshal.CreateReadOnlySpanFromNullTerminated(Char*) method

```csharp
public static ReadOnlySpan<char> CreateReadOnlySpanFromNullTerminated (char* value);
```

Creates a new read-only span for a null-terminated string.

Parameters:

- `value`: The pointer to the null-terminated string of characters.

Returns: A read-only span representing the specified null-terminated string, or an empty span if the pointer is `null`.

Exceptions:

- `ArgumentException`: The `ReadOnlySpan<T>.Length` property of the new `ReadOnlySpan<T>` would exceed <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

The returned span does not include the `null` terminator.

## MemoryMarshal.CreateSpan<T>(T, Int32) method

```csharp
public static Span<T> CreateSpan<T> (scoped ref T reference, int length);
```

Creates a new span over a portion of a regular managed object.

Parameters:

- `T`: The type of the data items.
- `reference`: A reference to data.
- `length`: The number of `T` elements that `reference` contains.

Returns: A span.

#### Remarks

This method can be useful if part of a managed object represents a fixed array.

> **Warning:**
> This method should be used with caution. It is dangerous because the `length` argument is not checked. Even though the `ref` is annotated as `scoped`, it will be stored into the returned span, and the lifetime of the returned span will not be validated for safety, even by span-aware languages.

## MemoryMarshal.GetArrayDataReference(Array) method

```csharp
public static ref byte GetArrayDataReference (Array array);
```

Returns a reference to the 0th element of `array`. If the array is empty, returns a reference to where the 0th element would have been stored. Such a reference may be used for pinning but must never be dereferenced.

Parameters:

- `array`: The array to analyze.

Returns: A reference to the 0th element of `array`.

Exceptions:

- `NullReferenceException`: `array` is `null`.

#### Remarks

The caller must manually reinterpret the returned ref byte as a ref to the array's underlying elemental type,
perhaps utilizing an API such as System.Runtime.CompilerServices.Unsafe.As to assist with the reinterpretation.
This technique does not perform array variance checks. The caller must manually perform any array variance checks
if the caller wishes to write to the returned reference.

## MemoryMarshal.GetArrayDataReference<T>(T[]) method

```csharp
public static ref T GetArrayDataReference<T> (T[] array);
```

Returns a reference to the 0th element of `array`. If the array is empty, returns a reference to where the 0th element would have been stored. Such a reference may be used for pinning but must never be dereferenced.

Parameters:

- `T`: The type of the array elements.
- `array`: The array to analyze.

Returns: Reference to the 0th element in `array`.

Exceptions:

- `NullReferenceException`: `array` is `null`.

#### Remarks

This method does not perform array variance checks. The caller must manually perform any array variance checks if the caller wishes to write to the returned reference.

## MemoryMarshal.GetReference<T>(ReadOnlySpan<T>) method

```csharp
public static ref T GetReference<T> (ReadOnlySpan<T> span);
```

Returns a reference to the element of the read-only span at index 0.

Parameters:

- `T`: The type of items in the span.
- `span`: The read-only span from which the reference is retrieved.

Returns: A reference to the element at index 0.

#### Remarks

If the read-only span is empty, this method returns a reference to the location where the element at index 0 would have been stored. Such a reference may or may not be `null`. The returned reference can be used for pinning, but it must never be dereferenced.

## MemoryMarshal.GetReference<T>(Span<T>) method

```csharp
public static ref T GetReference<T> (Span<T> span);
```

Returns a reference to the element of the span at index 0.

Parameters:

- `T`: The type of items in the span.
- `span`: The span from which the reference is retrieved.

Returns: A reference to the element at index 0.

#### Remarks

If the span is empty, this method returns a reference to the location where the element at index 0 would have been stored. Such a reference may or may not be `null`. The returned reference can be used for pinning, but it must never be dereferenced.
