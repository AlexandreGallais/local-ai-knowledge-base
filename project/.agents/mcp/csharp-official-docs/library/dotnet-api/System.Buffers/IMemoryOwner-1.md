---
title: "IMemoryOwner<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/IMemoryOwner`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IMemoryOwner<T> interface

Namespace: `System.Buffers`

```csharp
public interface IMemoryOwner<T> : IDisposable
```

Identifies the owner of a block of memory who is responsible for disposing of the underlying memory appropriately.

Parameters:

- `T`: The type of elements to store in memory.

The `IMemoryOwner<T>` interface is used to define the owner responsible for the lifetime management of a `Memory<T>` buffer. An instance of the `IMemoryOwner<T>` interface is returned by the `MemoryPool<T>.Rent` method.

While a buffer can have multiple consumers, it can only have a single owner at any given time. The owner can:

- Create the buffer either directly or by calling a factory method.

- Transfer ownership to another consumer. In this case, the previous owner should no longer use the buffer.

- Destroy the buffer when it is no longer in use.

Because the `IMemoryOwner<T>` object implements the `IDisposable` interface, you should call its `IDisposable.Dispose` method only after the memory buffer is no longer needed and you have destroyed it. You should *not* dispose of the `IMemoryOwner<T>` object while a reference to its memory is available. This means that the type in which `IMemoryOwner<T>` is declared should not have a `Object.Finalize` method.

## IMemoryOwner<T>.Memory property

```csharp
public Memory<T> Memory { get; }
```

Gets the memory belonging to this owner.

Returns: The memory belonging to this owner.

To be added.
