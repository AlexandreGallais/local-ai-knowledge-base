---
title: "IBufferWriter<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/IBufferWriter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IBufferWriter<T> interface

Namespace: `System.Buffers`

```csharp
public interface IBufferWriter<T>
```

Represents an output sink into which `T` data can be written.

Parameters:

- `T`: The type of the items in the `IBufferWriter<T>`.

To be added.

## IBufferWriter<T>.Advance(Int32) method

```csharp
public void Advance (int count);
```

Notifies the `IBufferWriter<T>` that `count` data items were written to the output `Span<T>` or `Memory<T>`.

Parameters:

- `count`: The number of data items written to the `Span<T>` or `Memory<T>`.

You must request a new buffer after calling Advance to continue writing more data; you cannot write to a previously acquired buffer.

## IBufferWriter<T>.GetMemory(Int32) method

```csharp
public Memory<T> GetMemory (int sizeHint = 0);
```

Returns a `Memory<T>` to write to that is at least the requested size (specified by `sizeHint`).

Parameters:

- `sizeHint`: The minimum length of the returned `Memory<T>`. If 0, a non-empty buffer is returned.

Returns: A `Memory<T>` of at least the size `sizeHint`. If `sizeHint` is 0, returns a non-empty buffer.

Exceptions:

- `OutOfMemoryException`: The requested buffer size is not available.

There is no guarantee that successive calls will return the same buffer or the same-sized buffer.

This must never return `Empty`, but it can throw if the requested buffer size is not available.

You must request a new buffer after calling `Advance` to continue writing more data; you cannot write to a previously acquired buffer.

## IBufferWriter<T>.GetSpan(Int32) method

```csharp
public Span<T> GetSpan (int sizeHint = 0);
```

Returns a `Span<T>` to write to that is at least the requested size (specified by `sizeHint`).

Parameters:

- `sizeHint`: The minimum length of the returned `Span<T>`. If 0, a non-empty buffer is returned.

Returns: A `Span<T>` of at least the size `sizeHint`. If `sizeHint` is 0, returns a non-empty buffer.

There is no guarantee that successive calls will return the same buffer or the same-sized buffer.

This method must never return `Empty`, but it can throw if the requested buffer size is not available.

You must request a new buffer after calling `Advance` to continue writing more data; you cannot write to a previously acquired buffer.
