---
title: "SequenceMarshal class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/SequenceMarshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SequenceMarshal class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class SequenceMarshal
```

Provides a collection of methods for interoperating with `ReadOnlySequence<T>`.

To be added.

## SequenceMarshal.TryGetArray<T>(ReadOnlySequence<T>, ArraySegment<T>) method

```csharp
public static bool TryGetArray<T> (System.Buffers.ReadOnlySequence<T> sequence, out ArraySegment<T> segment);
```

Gets an array segment from the underlying read-only sequence.

Parameters:

- `T`: The type of the read-only sequence.
- `sequence`: The read-only sequence from which the array segment will be retrieved.
- `segment`: The returned array segment.

Returns: `true` if it's possible to retrieve the array segment; otherwise, `false` and a default array segment is returned.

To be added.

## SequenceMarshal.TryGetReadOnlyMemory<T>(ReadOnlySequence<T>, ReadOnlyMemory<T>) method

```csharp
public static bool TryGetReadOnlyMemory<T> (System.Buffers.ReadOnlySequence<T> sequence, out ReadOnlyMemory<T> memory);
```

Attempts to retrieve a read-only memory from the specified read-only sequence.

Parameters:

- `T`: The type of the read-only sequence.
- `sequence`: The read-only sequence from which the memory will be retrieved.
- `memory`: The returned read-only memory of type T.

Returns: `true` if the read-only memory can be retrieved; otherwise, `false`.

To be added.

## SequenceMarshal.TryGetReadOnlySequenceSegment<T>(ReadOnlySequence<T>, ReadOnlySequenceSegment<T>, Int32, ReadOnlySequenceSegment<T>, Int32) method

```csharp
public static bool TryGetReadOnlySequenceSegment<T> (System.Buffers.ReadOnlySequence<T> sequence, out System.Buffers.ReadOnlySequenceSegment<T>? startSegment, out int startIndex, out System.Buffers.ReadOnlySequenceSegment<T>? endSegment, out int endIndex);
```

Attempts to retrieve a read-only sequence segment from the specified read-only sequence.

Parameters:

- `T`: The type of the read-only sequence.
- `sequence`: The read-only sequence from which the read-only sequence segment will be retrieved.
- `startSegment`: The beginning read-only sequence segment.
- `startIndex`: The initial position.
- `endSegment`: The ending read-only sequence segment.
- `endIndex`: The final position.

Returns: `true` if the read-only sequence segment can be retrieved; otherwise, `false`.

To be added.

## SequenceMarshal.TryRead<T>(Byte>, T) method

```csharp
public static bool TryRead<T> (ref System.Buffers.SequenceReader<byte> reader, out T value) where T : struct;
```

Attempts to read the specified type out of the buffer. It's dangerous to use this method with arbitrary structs - see remarks for more information.

Parameters:

- `T`: The type of the value.
- `reader`: A reference to the sequence reader.
- `value`: The returned value if the read was successful. `value` will be `default` if failed (due to lack of space).

Returns: `true` if the read attempt was successful, `false` otherwise.

#### Remarks

> **Important:**
> The read is a straight copy of bits. If a struct depends on the specific state of its members to behave correctly, this can lead to exceptions.
> If you're reading endian specific integers, use the explicit overloads such as TryReadLittleEndian(SequenceReader\<Byte>, Int32).
