---
title: "SequenceReader<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/SequenceReader`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SequenceReader<T> struct

Namespace: `System.Buffers`

```csharp
public ref struct SequenceReader<T> where T : struct
```

Provides methods for reading binary and text data out of a `ReadOnlySequence<T>` with a focus on performance and minimal or zero heap allocations.

Parameters:

- `T`: The type of the read-only sequence.

To be added.

## SequenceReader<T>.SequenceReader(ReadOnlySequence<T>) constructor

```csharp
public SequenceReader (System.Buffers.ReadOnlySequence<T> sequence);
```

Creates a `SequenceReader<T>` over a given `ReadOnlySequence<T>`.

Parameters:

- `sequence`: The read-only sequence over which to create the `SequenceReader<T>`.

To be added.

## SequenceReader<T>.Consumed property

```csharp
public long Consumed { get; }
```

Gets the total number of `T` values processed by the reader.

Returns: The total number of values processed by the reader.

To be added.

## SequenceReader<T>.CurrentSpan property

```csharp
public ReadOnlySpan<T> CurrentSpan { get; }
```

Gets a `Span<T>` that contains the current segment in the `SequenceReader<T>.Sequence`.

Returns: A span that contains the current segment in the sequence.

To be added.

## SequenceReader<T>.CurrentSpanIndex property

```csharp
public int CurrentSpanIndex { get; }
```

Gets the index in the `SequenceReader<T>.CurrentSpan`.

Returns: The index in the `SequenceReader<T>.CurrentSpan`.

To be added.

## SequenceReader<T>.End property

```csharp
public bool End { get; }
```

Gets a value that indicates whether there is no more data in the `SequenceReader<T>.Sequence`.

Returns: `true` when there is no more data in the `SequenceReader<T>.Sequence`; otherwise, `false`.

To be added.

## SequenceReader<T>.Length property

```csharp
public long Length { get; }
```

Gets the count of items in the reader's `SequenceReader<T>.Sequence`.

Returns: The count of items in the reader's `SequenceReader<T>.Sequence`.

To be added.

## SequenceReader<T>.Position property

```csharp
public SequencePosition Position { get; }
```

Gets the current position in the `SequenceReader<T>.Sequence`.

Returns: The current position in the `SequenceReader<T>.Sequence`.

To be added.

## SequenceReader<T>.Remaining property

```csharp
public long Remaining { get; }
```

Gets  the remaining items in the reader's `SequenceReader<T>.Sequence`.

Returns: The remaining items in the reader's `SequenceReader<T>.Sequence`

To be added.

## SequenceReader<T>.Sequence property

```csharp
public System.Buffers.ReadOnlySequence<T> Sequence { get; }
```

Gets the underlying `ReadOnlySequence<T>` for the reader.

Returns: The underlying read-only sequence for the reader.

To be added.

## SequenceReader<T>.UnreadSequence property

```csharp
public System.Buffers.ReadOnlySequence<T> UnreadSequence { get; }
```

Gets the unread portion of the `SequenceReader<T>.Sequence`.

Returns: The unread portion of the `SequenceReader<T>.Sequence`.

To be added.

## SequenceReader<T>.UnreadSpan property

```csharp
public ReadOnlySpan<T> UnreadSpan { get; }
```

Gets the unread portion of the `SequenceReader<T>.CurrentSpan`.

Returns: The unread portion of the `SequenceReader<T>.CurrentSpan`.

To be added.

## SequenceReader<T>.Advance(Int64) method

```csharp
public void Advance (long count);
```

Moves the reader ahead a specified number of items.

Parameters:

- `count`: The number of items to advance.

To be added.

## SequenceReader<T>.AdvancePast(T) method

```csharp
public long AdvancePast (T value);
```

Advances past consecutive instances of the given `value`.

Parameters:

- `value`: The value past which the reader is to advance.

Returns: The number of positions the reader has advanced.

To be added.

## SequenceReader<T>.AdvancePastAny(ReadOnlySpan<T>) method

```csharp
public long AdvancePastAny (scoped ReadOnlySpan<T> values);
```

Skips consecutive instances of any of the specified `values`.

Parameters:

- `values`: The values to be skipped.

Returns: The number of positions the reader has advanced.

To be added.

## SequenceReader<T>.AdvancePastAny(T, T) method

```csharp
public long AdvancePastAny (T value0, T value1);
```

Advances past consecutive instances of either of two specified values.

Parameters:

- `value0`: The first value to skip.
- `value1`: The second value to skip.

Returns: The number of positions the reader has advanced.

To be added.

## SequenceReader<T>.AdvancePastAny(T, T, T) method

```csharp
public long AdvancePastAny (T value0, T value1, T value2);
```

Advances past consecutive instances of any of three specified values.

Parameters:

- `value0`: The first value to skip.
- `value1`: The second value to skip.
- `value2`: The third value to skip.

Returns: The number of positions the reader has advanced.

To be added.

## SequenceReader<T>.AdvancePastAny(T, T, T, T) method

```csharp
public long AdvancePastAny (T value0, T value1, T value2, T value3);
```

Advances past consecutive instances of any of four specified values.

Parameters:

- `value0`: The first value to skip.
- `value1`: The second value to skip.
- `value2`: The third value to skip.
- `value3`: The fourth value to skip.

Returns: The number of positions the reader has advanced.

To be added.

## SequenceReader<T>.AdvanceToEnd() method

```csharp
public void AdvanceToEnd ();
```

Moves the reader to the end of the sequence.

To be added.

## SequenceReader<T>.IsNext(ReadOnlySpan<T>, Boolean) method

```csharp
public bool IsNext (scoped ReadOnlySpan<T> next, bool advancePast = false);
```

Checks whether the values specified in a read-only span are next in the sequence.

Parameters:

- `next`: The span to compare the next items to.
- `advancePast`: `true` to move past the `next` values if they are found; otherwise, `false`.

Returns: `true` if the values are next in sequence; otherwise, `false`.

To be added.

## SequenceReader<T>.IsNext(T, Boolean) method

```csharp
public bool IsNext (T next, bool advancePast = false);
```

Checks whether a specified value is next in the sequence.

Parameters:

- `next`: The value to compare the next items to.
- `advancePast`: `true` to move past the `next` values if they are found; otherwise, `false`.

Returns: `true` if the values are next in sequence; otherwise, `false`.

To be added.

## SequenceReader<T>.Rewind(Int64) method

```csharp
public void Rewind (long count);
```

Moves the reader back the specified number of items.

Parameters:

- `count`: The number of items.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is negative or greater than `SequenceReader<T>.Consumed`.

To be added.

## SequenceReader<T>.TryAdvanceTo(T, Boolean) method

```csharp
public bool TryAdvanceTo (T delimiter, bool advancePastDelimiter = true);
```

Searches for a specified delimiter and optionally advances past it if it is found.

Parameters:

- `delimiter`: The delimiter to search for.
- `advancePastDelimiter`: `true` to move past the `delimiter` if it is found; otherwise, `false`.

Returns: `true` if the given `delimiter` was found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryAdvanceToAny(ReadOnlySpan<T>, Boolean) method

```csharp
public bool TryAdvanceToAny (scoped ReadOnlySpan<T> delimiters, bool advancePastDelimiter = true);
```

Searches for any of a number of specified delimiters and optionally advances past the first one to be found.

Parameters:

- `delimiters`: The delimiters to search for.
- `advancePastDelimiter`: `true` to move past the first instance of any of the given `delimiters`; `false` to not move past the delimiter.

Returns: `true` if any of the given `delimiters` was found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryCopyTo(Span<T>) method

```csharp
public readonly bool TryCopyTo (Span<T> destination);
```

Copies data from the current position to the given destination span if there is enough data to fill it.

Parameters:

- `destination`: Destination span to copy to.

Returns: `true` if there is enough data to completely fill the `destination` span; otherwise, `false`.

#### Remarks

This method copies a fixed amount of data out of the sequence if possible. It does not advance the reader. To look ahead for a specific stream of data, use  `IsNext`.

## SequenceReader<T>.TryPeek(T) method

```csharp
public readonly bool TryPeek (out T value);
```

Peeks at the next value without advancing the reader.

Parameters:

- `value`: The next value, or the default value if at the end of the reader.

Returns: `true` if the reader is not at its end and the peek operation succeeded; `false` if at the end of the reader.

To be added.

## SequenceReader<T>.TryPeek(Int64, T) method

```csharp
public readonly bool TryPeek (long offset, out T value);
```

Peeks at the next value at the specified offset without advancing the reader.

Parameters:

- `offset`: The offset from current position.
- `value`: The next value, or the default value if at the end of the reader.

Returns: `true` if the reader is not at its end and the peek operation succeeded; `false` if at the end of the reader.

To be added.

## SequenceReader<T>.TryRead(T) method

```csharp
public bool TryRead (out T value);
```

Reads the next value and advance the reader.

Parameters:

- `value`: The next value, or the default value if at the end of the reader.

Returns: `true` if the reader is not at its end and the read operation succeeded; `false` if at the end of the reader.

To be added.

## SequenceReader<T>.TryReadExact(Int32, ReadOnlySequence<T>) method

```csharp
public bool TryReadExact (int count, out System.Buffers.ReadOnlySequence<T> sequence);
```

Attempts to read exactly `count` values from the current sequence.

Parameters:

- `count`: The number of values to read.
- `sequence`: When this method returns, contains the read data, if `count` items were successfully read.

Returns: `true` if there are `count` or more remaining items in the current sequence.

To be added.

## SequenceReader<T>.TryReadTo(ReadOnlySequence<T>, ReadOnlySpan<T>, Boolean) method

```csharp
public bool TryReadTo (out System.Buffers.ReadOnlySequence<T> sequence, scoped ReadOnlySpan<T> delimiter, bool advancePastDelimiter = true);
```

Tries to read data until the entire delimiter specified as a read-only span matches.

Parameters:

- `sequence`: When the method returns, contains the data read, if any.
- `delimiter`: A read-only span that contains one or more delimiters.
- `advancePastDelimiter`: `true` to move past the `delimiter` if found; otherwise, `false`.

Returns: `true` if the `delimiter` was found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryReadTo(ReadOnlySequence<T>, T, Boolean) method

```csharp
public bool TryReadTo (out System.Buffers.ReadOnlySequence<T> sequence, T delimiter, bool advancePastDelimiter = true);
```

Tries to read everything up to the given `delimiter`.

Parameters:

- `sequence`: When the method returns, contains the data read, if any.
- `delimiter`: The delimiter to look for.
- `advancePastDelimiter`: `true` to move past the `delimiter` if found; otherwise, `false`.

Returns: `true` if the `delimiter` was found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryReadTo(ReadOnlySpan<T>, ReadOnlySpan<T>, Boolean) method

```csharp
public bool TryReadTo (out ReadOnlySpan<T> span, scoped ReadOnlySpan<T> delimiter, bool advancePastDelimiter = true);
```

Try to read everything up to the given `delimiter`.

Parameters:

- `span`: The read data, if any.
- `delimiter`: The delimiter to look for.
- `advancePastDelimiter`: `true` to move past the `delimiter` if found.

Returns: `true` if the `delimiter` was found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryReadTo(ReadOnlySpan<T>, T, Boolean) method

```csharp
public bool TryReadTo (out ReadOnlySpan<T> span, T delimiter, bool advancePastDelimiter = true);
```

Tries to read everything up to the given `delimiter`.

Parameters:

- `span`: When the method returns, contains the data read, if any.
- `delimiter`: The delimiter to look for.
- `advancePastDelimiter`: `true` to move past the `delimiter` if found; otherwise, `false`.

Returns: `true` if the `delimiter` was found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryReadTo(ReadOnlySequence<T>, T, T, Boolean) method

```csharp
public bool TryReadTo (out System.Buffers.ReadOnlySequence<T> sequence, T delimiter, T delimiterEscape, bool advancePastDelimiter = true);
```

Tries to read everything up to the given `delimiter`, ignoring delimiters that are preceded by `delimiterEscape`.

Parameters:

- `sequence`: When the method returns, contains the data read, if any.
- `delimiter`: The delimiter to look for.
- `delimiterEscape`: A value that indicates that an immediately following `delimiter` is to be skipped.
- `advancePastDelimiter`: `true` to move past the `delimiter` if found; otherwise, `false`.

Returns: `true` if the `delimiter` was found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryReadTo(ReadOnlySpan<T>, T, T, Boolean) method

```csharp
public bool TryReadTo (out ReadOnlySpan<T> span, T delimiter, T delimiterEscape, bool advancePastDelimiter = true);
```

Tries to read everything up to the given `delimiter`, ignoring delimiters that are preceded by `delimiterEscape`.

Parameters:

- `span`: When the method returns, contains the data read, if any.
- `delimiter`: The delimiter to look for.
- `delimiterEscape`: A value that indicates that an immediately following `delimiter` is to be skipped.
- `advancePastDelimiter`: `true` to move past the `delimiter` if found; otherwise, `false`.

Returns: `true` if the `delimiter` was found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryReadToAny(ReadOnlySequence<T>, ReadOnlySpan<T>, Boolean) method

```csharp
public bool TryReadToAny (out System.Buffers.ReadOnlySequence<T> sequence, scoped ReadOnlySpan<T> delimiters, bool advancePastDelimiter = true);
```

Tries to read everything up to any of the specified `delimiters`.

Parameters:

- `sequence`: When the method returns, contains the data read, if any.
- `delimiters`: The delimiters to look for.
- `advancePastDelimiter`: `true` to move past the first found instance of any of the given `delimiters`; otherwise, `false`.

Returns: `true` if any of the `delimiters` were found; otherwise, `false`.

To be added.

## SequenceReader<T>.TryReadToAny(ReadOnlySpan<T>, ReadOnlySpan<T>, Boolean) method

```csharp
public bool TryReadToAny (out ReadOnlySpan<T> span, scoped ReadOnlySpan<T> delimiters, bool advancePastDelimiter = true);
```

Tries to read everything up to any of the specified `delimiters`.

Parameters:

- `span`: When the method returns, contains the data read, if any.
- `delimiters`: The delimiters to look for.
- `advancePastDelimiter`: `true` to move past the first found instance of any of the given `delimiters`; otherwise, `false`.

Returns: `true` if any of the `delimiters` were found; otherwise, `false`.

To be added.
