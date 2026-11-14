---
title: "MemoryPool<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/MemoryPool`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryPool<T> class

Namespace: `System.Buffers`

```csharp
public abstract class MemoryPool<T> : IDisposable
```

Represents a pool of memory blocks.

Parameters:

- `T`: The type of the items in the memory pool.

To be added.

## MemoryPool<T>.MemoryPool() constructor

```csharp
protected MemoryPool ();
```

Constructs a new instance of a memory pool.

To be added.

## MemoryPool<T>.MaxBufferSize property

```csharp
public abstract int MaxBufferSize { get; }
```

Gets the maximum buffer size supported by this pool.

Returns: The maximum buffer size supported by this pool.

To be added.

## MemoryPool<T>.Shared property

```csharp
public static System.Buffers.MemoryPool<T> Shared { get; }
```

Gets a singleton instance of a memory pool based on arrays.

Returns: A singleton instance of a memory pool.

To be added.

## MemoryPool<T>.Dispose() method

```csharp
public void Dispose ();
```

Frees all resources used by the memory pool.

To be added.

## MemoryPool<T>.Dispose(Boolean) method

```csharp
protected abstract void Dispose (bool disposing);
```

Frees the unmanaged resources used by the memory pool and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## MemoryPool<T>.Rent(Int32) method

```csharp
public abstract System.Buffers.IMemoryOwner<T> Rent (int minBufferSize = -1);
```

Returns a memory block capable of holding at least `minBufferSize` elements of T.

Parameters:

- `minBufferSize`: The minimum number of elements of `T` that the memory pool can hold. A value of -1 returns a memory pool set to the default size for the pool.

Returns: A memory block capable of holding at least `minBufferSize` elements of T.

To be added.
