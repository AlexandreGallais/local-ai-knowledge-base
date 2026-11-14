---
title: "IPinnable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/IPinnable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPinnable interface

Namespace: `System.Buffers`

```csharp
public interface IPinnable
```

Provides a mechanism for pinning and unpinning objects to prevent the garbage collector from moving them.

#### Remarks

The `MemoryManager<T>` class implements the `IPinnable` interface.

## IPinnable.Pin(Int32) method

```csharp
public System.Buffers.MemoryHandle Pin (int elementIndex);
```

Pins a block of memory.

Parameters:

- `elementIndex`: The offset to the element within the memory buffer to which the returned `MemoryHandle` points.

Returns: A handle to the block of memory.

#### Remarks

A developer can access an object that implements the `IPinnable` interface without pinning it only through managed APIs. Pinning is required for access by unmanaged APIs.

Call this method to indicate that the `IPinnable` object cannot be moved by the garbage collector so that the address of the pinned object can be used.

## IPinnable.Unpin() method

```csharp
public void Unpin ();
```

Frees a block of pinned memory.

#### Remarks

Call this method to indicate that the `IPinnable` object no longer needs to be pinned, and that the garbage collector can now move the object.
