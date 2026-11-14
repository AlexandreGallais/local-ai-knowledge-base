---
title: "MemoryHandle struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/MemoryHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryHandle struct

Namespace: `System.Buffers`

```csharp
public struct MemoryHandle : IDisposable
```

Provides a memory handle for a block of memory.

#### Remarks

A `MemoryHandle` instance represents a handle to a pinned block of memory. It is returned by the following methods:

- `IPinnable.Pin`.
- `Memory<T>.Pin`
- `ReadOnlyMemory<T>.Pin`.
- `MemoryManager<T>.Pin`

## MemoryHandle.MemoryHandle(Void*, GCHandle, IPinnable) constructor

```csharp
public MemoryHandle (void* pointer, System.Runtime.InteropServices.GCHandle handle = default, System.Buffers.IPinnable? pinnable = default);
```

Creates a new memory handle for the block of memory.

Parameters:

- `pointer`: A pointer to memory.
- `handle`: A handle used to pin array buffers.
- `pinnable`: A reference to a manually managed object, or `default` if there is no memory manager.

To be added.

## MemoryHandle.Pointer property

```csharp
public void* Pointer { get; }
```

Returns a pointer to the memory block.

Returns: A pointer to the memory block.

The memory is assumed to be pinned so that its address won't change.

## MemoryHandle.Dispose() method

```csharp
public void Dispose ();
```

Frees the pinned handle and releases the `IPinnable` instance.

To be added.
