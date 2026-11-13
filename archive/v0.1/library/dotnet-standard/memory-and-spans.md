---
title: "Memory-related and span types"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/memory-and-spans/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Memory-related and span types

.NET includes a number of interrelated types that represent a contiguous, strongly typed region of arbitrary memory. These types are designed to allow the creation of algorithms that *avoid copying memory or allocating on the managed heap* more than necessary. Creating them (either via `Slice`, `AsSpan()`, a collection expression, or their constructors) does not involve duplicating the underlying buffers: only the relevant references and offsets, which represent the "view" of the wrapped memory, are updated. In high-performance code, spans are often used to avoid allocating strings unnecessarily.

The types include:

- `System.Span`1`, a type that's used to access a contiguous region of memory. A `System.Span`1` instance can be backed by an array of type `T`, a buffer allocated with stackalloc, or a pointer to unmanaged memory. Because it has to be allocated on the stack, it has a number of restrictions. For example, a field in a class cannot be of type `System.Span`1`, nor can span be used in asynchronous operations.

- `System.ReadOnlySpan`1`, an immutable version of the `System.Span`1` structure. Instances can be also backed by a `System.String`.

- `System.Memory`1`, a wrapper over a contiguous region of memory. A `System.Memory`1` instance can be backed by an array of type `T` or a memory manager. As it can be stored on the managed heap, `System.Memory`1` has none of the limitations of `System.Span`1`.

- `System.ReadOnlyMemory`1`, an immutable version of the `System.Memory`1` structure. Instances can also be backed by a `System.String`.

- `System.Buffers.MemoryPool`1`, which allocates strongly typed blocks of memory from a memory pool to an owner. `System.Buffers.IMemoryOwner`1` instances can be rented from the pool by calling `System.Buffers.MemoryPool`1.Rent*` and released back to the pool by calling `System.Buffers.MemoryPool`1.Dispose`.

- `System.Buffers.IMemoryOwner`1`, which represents the owner of a block of memory and controls its lifetime management.

- `System.Buffers.MemoryManager`1`, an abstract base class that can be used to replace the implementation of `System.Memory`1` so that `System.Memory`1` can be backed by additional types, such as safe handles. `System.Buffers.MemoryManager`1` is intended for advanced scenarios.

- `System.ArraySegment`1`, a wrapper for a particular number of array elements starting at a particular index.

- `System.MemoryExtensions`, a collection of extension methods for converting strings, arrays, and array segments to `System.Memory`1` blocks.

For more information, see the `System.Buffers` namespace.

## Working with memory and span

Because the memory-related and span-related types are typically used to store data in a processing pipeline, it's important that you follow a set of best practices when using `System.Span`1`, `System.Memory`1`, and related types. These best practices are documented in Memory\<T> and Span\<T> usage guidelines.

## See also

- `System.Memory`1`
- `System.ReadOnlyMemory`1`
- `System.Span`1`
- `System.ReadOnlySpan`1`
- `System.Buffers`
