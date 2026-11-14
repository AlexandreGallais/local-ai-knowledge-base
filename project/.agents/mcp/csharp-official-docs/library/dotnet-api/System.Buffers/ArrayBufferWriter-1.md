---
title: "ArrayBufferWriter<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/ArrayBufferWriter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayBufferWriter<T> class

Namespace: `System.Buffers`

```csharp
public sealed class ArrayBufferWriter<T> : System.Buffers.IBufferWriter<T>
```

Represents a heap-based, array-backed output sink into which `T` data can be written.

Parameters:

- `T`: The type of the items in this `ArrayBufferWriter<T>` instance.

To be added.

## ArrayBufferWriter<T>.ArrayBufferWriter() constructor

```csharp
public ArrayBufferWriter ();
```

Creates an instance of an `ArrayBufferWriter<T>` to which data can be written, with the default initial capacity.

To be added.

## ArrayBufferWriter<T>.ArrayBufferWriter(Int32) constructor

```csharp
public ArrayBufferWriter (int initialCapacity);
```

Creates an instance of an `ArrayBufferWriter<T>` to which data can be written, with a specified initial capacity.

Parameters:

- `initialCapacity`: The minimum capacity with which to initialize the underlying buffer.

Exceptions:

- `ArgumentException`: `initialCapacity` is less than or equal to 0.

To be added.

## ArrayBufferWriter<T>.Capacity property

```csharp
public int Capacity { get; }
```

Gets the total amount of space within the underlying buffer.

Returns: The total capacity of the underlying buffer.

To be added.

## ArrayBufferWriter<T>.FreeCapacity property

```csharp
public int FreeCapacity { get; }
```

Gets the amount of available space that can be written to without forcing the underlying buffer to grow.

Returns: The space available for writing without forcing the underlying buffer to grow.

To be added.

## ArrayBufferWriter<T>.WrittenCount property

```csharp
public int WrittenCount { get; }
```

Gets the amount of data written to the underlying buffer.

Returns: The amount of data written to the underlying buffer.

To be added.

## ArrayBufferWriter<T>.WrittenMemory property

```csharp
public ReadOnlyMemory<T> WrittenMemory { get; }
```

Gets a `ReadOnlyMemory<T>` that contains the data written to the underlying buffer so far.

Returns: The data written to the underlying buffer.

To be added.

## ArrayBufferWriter<T>.WrittenSpan property

```csharp
public ReadOnlySpan<T> WrittenSpan { get; }
```

Gets a `ReadOnlySpan<T>` that contains the data written to the underlying buffer so far.

Returns: The data written to the underlying buffer.

To be added.

## ArrayBufferWriter<T>.Advance(Int32) method

```csharp
public void Advance (int count);
```

Notifies the `IBufferWriter<T>` that `count` items were written to the output `Span<T>`/`Memory<T>`.

Parameters:

- `count`: The number of items written.

Exceptions:

- `ArgumentException`: `count` is negative.
- `InvalidOperationException`: The method call attempts to advance past the end of the underlying buffer.

You must request a new buffer after calling `Advance` to continue writing more data and cannot write to a previously acquired buffer.

## ArrayBufferWriter<T>.Clear() method

```csharp
public void Clear ();
```

Clears the data written to the underlying buffer.

You must clear the `ArrayBufferWriter<T>` before trying to reuse it.

## ArrayBufferWriter<T>.GetMemory(Int32) method

```csharp
public Memory<T> GetMemory (int sizeHint = 0);
```

Returns a `Memory<T>` to write to that is at least the length specified by `sizeHint`.

Parameters:

- `sizeHint`: The minimum requested length of the `Memory<T>`.

Returns: A `Memory<T>` whose length is at least `sizeHint`.  If `sizeHint` is not provided or is equal to 0, some non-empty buffer is returned.

Exceptions:

- `ArgumentException`: `sizeHint` is negative.

This method never returns `Empty`.

## ArrayBufferWriter<T>.GetSpan(Int32) method

```csharp
public Span<T> GetSpan (int sizeHint = 0);
```

Returns a `Span<T>` to write to that is at least a specified length.

Parameters:

- `sizeHint`: The minimum requested length of the `Span<T>`.

Returns: A span of at least `sizeHint` in length. If `sizeHint` is not provided or is equal to 0, some non-empty buffer is returned.

Exceptions:

- `ArgumentException`: `sizeHint` is negative.

This method never returns `Empty`.

## ArrayBufferWriter<T>.ResetWrittenCount() method

```csharp
public void ResetWrittenCount ();
```

Resets the data written to the underlying buffer without zeroing its content.

You must reset or clear the `ArrayBufferWriter<T>` before trying to re-use it.

If you reset the writer using the `ArrayBufferWriter<T>.ResetWrittenCount` method, the underlying buffer will not be cleared.
