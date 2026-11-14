---
title: "MemoryManager<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/MemoryManager`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryManager<T> class

Namespace: `System.Buffers`

```csharp
public abstract class MemoryManager<T> : System.Buffers.IMemoryOwner<T>, System.Buffers.IPinnable
```

An abstract base class that is used to replace the implementation of `Memory<T>`.

Parameters:

- `T`: The type of items in the memory buffer managed by this memory manager.

The `MemoryManager<T>` class is used to extend the knowledge of types that `Memory<T>` is able to represent. For example, you can derive from `MemoryManager<T>` to allow `Memory<T>` to be backed by a `SafeHandle`.

> **Note:**
> The `MemoryManager<T>` class is intended for advanced scenarios. Most developers do not need to use it.

## MemoryManager<T>.MemoryManager() constructor

```csharp
protected MemoryManager ();
```

Initializes a new instance of the `MemoryManager<T>` class.

To be added.

## MemoryManager<T>.Memory property

```csharp
public virtual Memory<T> Memory { get; }
```

Gets the memory block handled by this `MemoryManager<T>`.

Returns: The memory block handled by this `MemoryManager<T>`.

To be added.

## MemoryManager<T>.CreateMemory(Int32) method

```csharp
protected Memory<T> CreateMemory (int length);
```

Returns a memory buffer consisting of a specified number of elements from the memory managed by the current memory manager.

Parameters:

- `length`: The number of elements in the memory buffer, starting at offset 0.

Returns: A memory buffer.

To be added.

## MemoryManager<T>.CreateMemory(Int32, Int32) method

```csharp
protected Memory<T> CreateMemory (int start, int length);
```

Returns a memory buffer consisting of a specified number of elements starting at a specified offset from the memory managed by the current memory manager.

Parameters:

- `start`: The offset to the element at which the returned memory buffer starts.
- `length`: The number of elements to include in the returned memory buffer.

Returns: A memory buffer that consists of `length` elements starting at offset `start`.

To be added.

## MemoryManager<T>.Dispose(Boolean) method

```csharp
protected abstract void Dispose (bool disposing);
```

Releases all resources used by the current memory manager.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## MemoryManager<T>.GetSpan() method

```csharp
public abstract Span<T> GetSpan ();
```

Returns a memory span that wraps the underlying memory buffer.

Returns: A memory span that wraps the underlying memory buffer.

To be added.

## MemoryManager<T>.Pin(Int32) method

```csharp
public abstract System.Buffers.MemoryHandle Pin (int elementIndex = 0);
```

Returns a handle to the memory that has been pinned and whose address can be taken.

Parameters:

- `elementIndex`: The offset to the element in the memory buffer at which the returned `MemoryHandle` points.

Returns: A handle to the memory that has been pinned.

To be added.

## MemoryManager<T>.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Releases all resources used by the memory manager.

This method provides the memory manager's `IDisposable.Dispose` implementation.

## MemoryManager<T>.TryGetArray(ArraySegment<T>) method

```csharp
protected internal virtual bool TryGetArray (out ArraySegment<T> segment);
```

Returns an array segment.

Parameters:

- `segment`: The array segment to write to.

Returns: `true` if the method succeeded in retrieving the array segment; otherwise, `false`.

If this method is not overridden, it returns the default array segment.

## MemoryManager<T>.Unpin() method

```csharp
public abstract void Unpin ();
```

Unpins pinned memory so that the garbage collector is free to move it.

To be added.
