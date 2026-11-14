---
title: "BuffersExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/BuffersExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BuffersExtensions class

Namespace: `System.Buffers`

```csharp
public static class BuffersExtensions
```

Provides extension methods for `ReadOnlySequence<T>`.

To be added.

## BuffersExtensions.CopyTo<T>(ReadOnlySequence<T>, Span<T>) method

```csharp
public static void CopyTo<T> (this in System.Buffers.ReadOnlySequence<T> source, Span<T> destination);
```

Copies the `ReadOnlySequence<T>` to the specified `Span<T>`.

Parameters:

- `T`: The type of the items in the `ReadOnlySequence<T>`.
- `source`: The source `ReadOnlySequence<T>`.
- `destination`: The destination `Span<T>`.

To be added.

## BuffersExtensions.PositionOf<T>(ReadOnlySequence<T>, T) method

```csharp
public static SequencePosition? PositionOf<T> (this in System.Buffers.ReadOnlySequence<T> source, T value) where T : IEquatable<T>;
```

Returns the position of the first occurrence of `value` in the `ReadOnlySequence<T>`.

Parameters:

- `T`: The type of the items in the `ReadOnlySequence<T>`.
- `source`: The source `ReadOnlySequence<T>`.
- `value`: The item to find in the `ReadOnlySequence<T>`.

Returns: An object whose `SequencePosition.GetInteger` method returns the position of the first occurrence of `value`, or an object whose `Nullable<SequencePosition>.HasValue` property is `false` .

To be added.

## BuffersExtensions.ToArray<T>(ReadOnlySequence<T>) method

```csharp
public static T[] ToArray<T> (this in System.Buffers.ReadOnlySequence<T> sequence);
```

Converts the `ReadOnlySequence<T>` to an array.

Parameters:

- `T`: The type of the items in the `ReadOnlySequence<T>`.
- `sequence`: The read-only sequence to convert to an array.

Returns: An array containing the data in the current read-only sequence.

To be added.

## BuffersExtensions.Write<T>(IBufferWriter<T>, ReadOnlySpan<T>) method

```csharp
public static void Write<T> (this System.Buffers.IBufferWriter<T> writer, ReadOnlySpan<T> value);
```

Writes the contents of `value` to `writer`.

Parameters:

- `T`: The type of the items in the `ReadOnlySpan<T>`.
- `writer`: The buffer writer to which to write `value`.
- `value`: The read-only span to be written to `writer`.

Exceptions:

- `ArgumentOutOfRangeException`: `writer` is shorter than `value`.

To be added.
