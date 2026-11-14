---
title: "MemoryMarshal class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/MemoryMarshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryMarshal class (part 2 of 2)

## MemoryMarshal.Read<T>(Byte>) method

```csharp
public static T Read<T> (ReadOnlySpan<byte> source) where T : struct;
```

Reads a structure of type `T` out of a read-only span of bytes.

Parameters:

- `T`: The type of the item to retrieve from the read-only span.
- `source`: A read-only span.

Returns: The structure retrieved from the read-only span.

Exceptions:

- `ArgumentException`: `T` contains managed object references.
- `ArgumentOutOfRangeException`: `source` is smaller than `T`'s length in bytes.

#### Remarks

`T` cannot contain managed object references. The `Read` method performs this check at runtime and throws `ArgumentException` if the check fails.

> **Caution:**
> This method initializes an instance of `T`, including private instance fields and other implementation details, from the raw binary contents of the source span. Callers must ensure that the contents of the source span are well-formed with regard to `T`'s internal invariants.

## MemoryMarshal.ToEnumerable<T>(ReadOnlyMemory<T>) method

```csharp
public static System.Collections.Generic.IEnumerable<T> ToEnumerable<T> (ReadOnlyMemory<T> memory);
```

Creates an `IEnumerable<T>` view of the given read-only memory buffer.

Parameters:

- `T`: The type of the items in the read-only memory buffer.
- `memory`: A read-only memory buffer.

Returns: An enumerable view of `memory`.

#### Remarks

This method allows a read-only memory buffer to be used in existing APIs that require a parameter of type `IEnumerable<T>`.

## MemoryMarshal.TryGetArray<T>(ReadOnlyMemory<T>, ArraySegment<T>) method

```csharp
public static bool TryGetArray<T> (ReadOnlyMemory<T> memory, out ArraySegment<T> segment);
```

Tries to get an array segment from the underlying memory buffer. The return value indicates the success of the operation.

Parameters:

- `T`: The type of items in the read-only memory buffer.
- `memory`: A read-only memory buffer.
- `segment`: When this method returns, contains the array segment retrieved from the underlying read-only memory buffer. If the method fails, the method returns a default array segment.

Returns: `true` if the method call succeeds; `false` otherwise.

#### Remarks

> **Caution:**
> `ReadOnlyMemory<T>` is used to represent immutable data. `ArraySegment<T>` instances returned by this method should not be written to, and the wrapped array instance should only be passed to methods which treat the array contents as read-only.

## MemoryMarshal.TryGetMemoryManager<T,TManager>(ReadOnlyMemory<T>, TManager) method

```csharp
public static bool TryGetMemoryManager<T,TManager> (ReadOnlyMemory<T> memory, out TManager? manager) where TManager : System.Buffers.MemoryManager<T>;
```

Tries to retrieve a `MemoryManager<T>` from the underlying read-only memory buffer.

Parameters:

- `T`: The type of the items in the read-only memory buffer.
- `TManager`: The type of the `MemoryManager<T>` to retrieve.
- `memory`: The read-only memory buffer for which to get the memory manager.
- `manager`: When the method returns, the manager of `memory`.

Returns: `true` if the method retrieved the memory manager; otherwise, `false`.

To be added.

## MemoryMarshal.TryGetMemoryManager<T,TManager>(ReadOnlyMemory<T>, TManager, Int32, Int32) method

```csharp
public static bool TryGetMemoryManager<T,TManager> (ReadOnlyMemory<T> memory, out TManager? manager, out int start, out int length) where TManager : System.Buffers.MemoryManager<T>;
```

Tries to retrieve a `MemoryManager<T>`, start index, and length from the underlying read-only memory buffer.

Parameters:

- `T`: The type of the items in the read-only memory buffer.
- `TManager`: The type of the `MemoryManager<T>` to retrieve.
- `memory`: The read-only memory buffer for which to get the memory manager.
- `manager`: When the method returns, the manager of `memory`.
- `start`: When the method returns, the offset from the start of the `manager` that the `memory` represents.
- `length`: When the method returns, the length of the `manager` that the `memory` represents.

Returns: `true` if the method succeeded; otherwise, `false`.

To be added.

## MemoryMarshal.TryGetString(Char>, String, Int32, Int32) method

```csharp
public static bool TryGetString (ReadOnlyMemory<char> memory, out string? text, out int start, out int length);
```

Tries to get the underlying string from a `System.ReadOnlyMemory<Char>`.

Parameters:

- `memory`: Read-only memory containing a block of characters.
- `text`: When the method returns, the string contained in the memory buffer.
- `start`: The starting location in `text`.
- `length`: The number of characters in `text`.

Returns: `true` if the method successfully retrieves the underlying string; otherwise, `false`.

To be added.

## MemoryMarshal.TryRead<T>(Byte>, T) method

```csharp
public static bool TryRead<T> (ReadOnlySpan<byte> source, out T value) where T : struct;
```

Tries to read a structure of type `T` from a read-only span of bytes.

Parameters:

- `T`: The type of the structure to retrieve.
- `source`: A read-only span of bytes.
- `value`: When the method returns, an instance of `T`.

Returns: `true` if the method succeeds in retrieving an instance of the structure; otherwise, `false`.

Exceptions:

- `ArgumentException`: `T` contains managed object references.

#### Remarks

`T` cannot contain managed object references. The `TryRead` method performs this check at runtime and throws `ArgumentException` if the check fails.

> **Caution:**
> This method initializes an instance of `T`, including private instance fields and other implementation details, from the raw binary contents of the source span. Callers must ensure that the contents of the source span are well-formed with regard to `T`'s internal invariants.

## MemoryMarshal.TryWrite<T>(Byte>, T) method

```csharp
public static bool TryWrite<T> (Span<byte> destination, in T value) where T : struct;
```

Tries to write a structure of type `T` into a span of bytes.

Parameters:

- `T`: The type of the structure.
- `destination`: The span of bytes to contain the structure.
- `value`: The structure to be written to the span.

Returns: `true` if the write operation succeeded; otherwise, `false`. The method returns `false` if the span is too small to contain `T`.

Exceptions:

- `ArgumentException`: `T` contains managed object references.

#### Remarks

`T` cannot contain managed object references. The `TryWrite` method performs this check at runtime and throws `ArgumentException` if the check fails.

> **Caution:**
> This method copies raw binary data from the original span, including any private instance fields and other implementation details of type `T`. Callers should ensure that their code is resilient to changes in the internal layout of `T`.

## MemoryMarshal.Write<T>(Byte>, T) method

```csharp
public static void Write<T> (Span<byte> destination, in T value) where T : struct;
```

Writes a structure of type `T` into a span of bytes.

Parameters:

- `T`: The type of the structure.
- `destination`: The span of bytes to contain the structure.
- `value`: The structure to be written to the span.

Exceptions:

- `ArgumentException`: `T` contains managed object references.
- `ArgumentOutOfRangeException`: `destination` is too small to contain `value`.

#### Remarks

`T` cannot contain managed object references. The `Write` method performs this check at runtime and throws `ArgumentException` if the check fails.

> **Caution:**
> This method copies raw binary data from the original span, including any private instance fields and other implementation details of type `T`. Callers should ensure that their code is resilient to changes in the internal layout of `T`.
