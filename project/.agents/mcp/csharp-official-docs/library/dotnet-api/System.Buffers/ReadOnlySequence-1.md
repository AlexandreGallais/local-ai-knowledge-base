---
title: "ReadOnlySequence<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/ReadOnlySequence`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlySequence<T> struct

Namespace: `System.Buffers`

```csharp
public readonly struct ReadOnlySequence<T>
```

Represents a sequence that can read a sequential series of `T`.

Parameters:

- `T`: The type of the elements in the read-only sequence.

To be added.

## ReadOnlySequence<T>.ReadOnlySequence(ReadOnlyMemory<T>) constructor

```csharp
public ReadOnlySequence (ReadOnlyMemory<T> memory);
```

Creates an instance of `ReadOnlySequence<T>` from a `ReadOnlyMemory<T>`.

Parameters:

- `memory`: A read-only block of memory of elements of type `T`.

The consumer is expected to manage the lifetime of memory until `ReadOnlySequence<T>` is not used anymore.

## ReadOnlySequence<T>.ReadOnlySequence(T[]) constructor

```csharp
public ReadOnlySequence (T[] array);
```

Creates an instance of `ReadOnlySequence<T>` from the `array`.

Parameters:

- `array`: The array from which to create a read-only sequence.

To be added.

## ReadOnlySequence<T>.ReadOnlySequence(T[], Int32, Int32) constructor

```csharp
public ReadOnlySequence (T[] array, int start, int length);
```

Creates an instance of a `ReadOnlySequence<T>` from a section of an array.

Parameters:

- `array`: The array from which to create the read-only sequence.
- `start`: The zero-based index of the first element in the array to include in the read-only sequence.
- `length`: The number of elements to include in the read-only sequence.

To be added.

## ReadOnlySequence<T>.ReadOnlySequence(ReadOnlySequenceSegment<T>, Int32, ReadOnlySequenceSegment<T>, Int32) constructor

```csharp
public ReadOnlySequence (System.Buffers.ReadOnlySequenceSegment<T> startSegment, int startIndex, System.Buffers.ReadOnlySequenceSegment<T> endSegment, int endIndex);
```

Creates an instance of a `ReadOnlySequence<T>` from a linked memory list represented by start and end segments and the corresponding indexes in them.

Parameters:

- `startSegment`: The initial node of the linked memory list.
- `startIndex`: The position to the start of the sequence inside `startSegment`.
- `endSegment`: The final node of the linked memory list.
- `endIndex`: The position to the end of the sequence inside `endSegment`.

Exceptions:

- `ArgumentNullException`: `startSegment` or `endSegment` is `null`.
- `ArgumentOutOfRangeException`: The running index of `startSegment` is greater than the running index of `endSegment`, even though `startSegment` is different to `endSegment`.

-or-

`startSegment` is equal to `endSegment` but `endIndex` is smaller than `startIndex`.

-or-

`startIndex` is greater than the length of the underlying memory block of `startSegment`.

To be added.

## ReadOnlySequence<T>.End property

```csharp
public SequencePosition End { get; }
```

Gets the position at the end of the `ReadOnlySequence<T>`.

Returns: To be added.

To be added.

## ReadOnlySequence<T>.First property

```csharp
public ReadOnlyMemory<T> First { get; }
```

Gets the `ReadOnlyMemory<T>` from the first segment.

Returns: To be added.

To be added.

## ReadOnlySequence<T>.FirstSpan property

```csharp
public ReadOnlySpan<T> FirstSpan { get; }
```

Gets the `ReadOnlySpan<T>` from the first segment.

Returns: To be added.

To be added.

## ReadOnlySequence<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether the `ReadOnlySequence<T>` is empty.

Returns: `true` if the read-only sequence is empty; otherwise, `false`.

To be added.

## ReadOnlySequence<T>.IsSingleSegment property

```csharp
public bool IsSingleSegment { get; }
```

Gets a value that indicates whether the `ReadOnlySequence<T>` contains a single `ReadOnlyMemory<T>` segment.

Returns: `true` if the read-only sequence consists of a single memory segment; otherwise, `false`.

To be added.

## ReadOnlySequence<T>.Length property

```csharp
public long Length { get; }
```

Gets the length of the `ReadOnlySequence<T>`.

Returns: The length of the read-only sequence.

To be added.

## ReadOnlySequence<T>.Start property

```csharp
public SequencePosition Start { get; }
```

Gets the position to the start of the `ReadOnlySequence<T>`.

Returns: To be added.

To be added.

## ReadOnlySequence<T>.GetEnumerator() method

```csharp
public System.Buffers.ReadOnlySequence<T>.Enumerator GetEnumerator ();
```

Returns an enumerator over the `ReadOnlySequence<T>`.

Returns: Returns an enumerator over the `ReadOnlySequence<T>`.

To be added.

## ReadOnlySequence<T>.GetOffset(SequencePosition) method

```csharp
public long GetOffset (SequencePosition position);
```

Returns the offset of a `position` within this sequence.

Parameters:

- `position`: The `SequencePosition` of which to get the offset.

Returns: The offset in the sequence.

Exceptions:

- `ArgumentOutOfRangeException`: The position is out of range.

The returned offset is not a zero-based index from the start. To obtain the zero-based index offset, subtract
```csharp
mySequence.GetOffset(mySequence.Start)
```
from the returned offset.

## ReadOnlySequence<T>.GetPosition(Int64) method

```csharp
public SequencePosition GetPosition (long offset);
```

Returns a new `SequencePosition` at an `offset` from the start of the sequence.

Parameters:

- `offset`: The offset from the start of the sequence.

Returns: An object representing the sequence position that starts at the specified `offset` from the start of the sequence.

To be added.

## ReadOnlySequence<T>.GetPosition(Int64, SequencePosition) method

```csharp
public SequencePosition GetPosition (long offset, SequencePosition origin);
```

Returns a new `SequencePosition` starting at the specified offset from the `origin` position.

Parameters:

- `offset`: The offset from the specified `origin` sequence position.
- `origin`: A sequence position representing the point from which to initiate the offset.

Returns: An object representing the sequence position that starts at the `offset` position of the specified `origin` position object.

To be added.

## ReadOnlySequence<T>.Slice(Int64) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (long start);
```

Forms a slice out of the current `ReadOnlySequence<T>`, beginning at a specified index and continuing to the end of the read-only sequence.

Parameters:

- `start`: The start index at which to begin this slice.

Returns: A slice starting at index `start` and continuing to the end of the current read-only sequence.

To be added.

## ReadOnlySequence<T>.Slice(SequencePosition) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (SequencePosition start);
```

Forms a slice out of the current `ReadOnlySequence<T>`, beginning at a specified sequence position and continuing to the end of the read-only sequence.

Parameters:

- `start`: The starting (inclusive) `SequencePosition` at which to begin this slice.

Returns: A slice starting at sequence position `start` and continuing to the end of the current read-only sequence.

To be added.

## ReadOnlySequence<T>.Slice(Int32, Int32) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (int start, int length);
```

Forms a slice out of the current `ReadOnlySequence<T>`, beginning at `start`, with `length` items.

Parameters:

- `start`: The index at which to begin this slice.
- `length`: The length of the slice.

Returns: A slice that consists of `length` elements from the current instance starting at index `start`.

To be added.

## ReadOnlySequence<T>.Slice(Int32, SequencePosition) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (int start, SequencePosition end);
```

Forms a slice out of the current `ReadOnlySequence<T>`, beginning at `start` and ending at `end` (exclusive).

Parameters:

- `start`: The index at which to begin this slice.
- `end`: The end (exclusive) `SequencePosition` of the slice.

Returns: A slice that consists of items from the `start` index to, but not including, the `end` sequence position in the current read-only sequence.

To be added.

## ReadOnlySequence<T>.Slice(Int64, Int64) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (long start, long length);
```

Forms a slice out of the given `ReadOnlySequence<T>`, beginning at `start`, with `length` items.

Parameters:

- `start`: The index at which to begin this slice.
- `length`: The length of the slice.

Returns: A slice that consists of `length` elements from the current instance starting at index `start`.

To be added.

## ReadOnlySequence<T>.Slice(Int64, SequencePosition) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (long start, SequencePosition end);
```

Forms a slice out of the current `ReadOnlySequence<T>`, beginning at `start` and ending at `end` (exclusive).

Parameters:

- `start`: The index at which to begin this slice.
- `end`: The end (exclusive) of the slice.

Returns: A slice that consists of items from the `start` index to, but not including, the `end` sequence position in the current read-only sequence.

To be added.

## ReadOnlySequence<T>.Slice(SequencePosition, Int32) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (SequencePosition start, int length);
```

Forms a slice out of the current `ReadOnlySequence<T>`, beginning at `start`, with `length` items.

Parameters:

- `start`: The starting (inclusive) `SequencePosition` at which to begin this slice.
- `length`: The length of the slice.

Returns: A slice that consists of `length` elements from the current instance starting at sequence position `start`.

To be added.

## ReadOnlySequence<T>.Slice(SequencePosition, Int64) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (SequencePosition start, long length);
```

Forms a slice out of the current `ReadOnlySequence<T>`, beginning at `start`, with `length` items.

Parameters:

- `start`: The starting (inclusive) `SequencePosition` at which to begin this slice.
- `length`: The length of the slice.

Returns: A slice that consists of `length` elements from the current instance starting at sequence position `start`.

To be added.

## ReadOnlySequence<T>.Slice(SequencePosition, SequencePosition) method

```csharp
public System.Buffers.ReadOnlySequence<T> Slice (SequencePosition start, SequencePosition end);
```

Forms a slice out of the current `ReadOnlySequence<T>`, beginning at `start` and ending at `end` (exclusive).

Parameters:

- `start`: The starting (inclusive) `SequencePosition` at which to begin this slice.
- `end`: The ending (exclusive) `SequencePosition` of the slice.

Returns: A slice that consists of items from the `start` sequence position to, but not including, the `end` sequence position in the current read-only sequence.

To be added.

## ReadOnlySequence<T>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current sequence.

Returns: A string that represents the current sequence.

To be added.

## ReadOnlySequence<T>.TryGet(SequencePosition, ReadOnlyMemory<T>, Boolean) method

```csharp
public bool TryGet (ref SequencePosition position, out ReadOnlyMemory<T> memory, bool advance = true);
```

Tries to retrieve the next segment after `position` and returns a value that indicates whether the operation succeeded.

Parameters:

- `position`: The current sequence position.
- `memory`: A read-only memory span that contains the next segment after `position`.
- `advance`: `true` if `position` should advance to the beginning of the next segment; otherwise, `false`.

Returns: Returns `true` if the method returned the next segment, or `false` if the end of the read-only sequence was reached.

To be added.

## ReadOnlySequence<T>.Empty field

```csharp
public static readonly System.Buffers.ReadOnlySequence<T> Empty;
```

Returns an empty `ReadOnlySequence<T>`.

To be added.
