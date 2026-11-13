---
title: "System.Buffers - .NET (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/buffers.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.Buffers - .NET (part 2 of 2)

## SequenceReader\<T\>

`System.Buffers.SequenceReader`1`:

- Is a new type that was introduced in .NET Core 3.0 to simplify the processing of a `ReadOnlySequence<T>`.
- Unifies the differences between a single segment `ReadOnlySequence<T>` and multi-segment `ReadOnlySequence<T>`.
- Provides helpers for reading binary and text data (`byte` and `char`) that may or may not be split across segments.

There are built-in methods for dealing with processing both binary and delimited data. The following section demonstrates what those same methods look like with the `SequenceReader<T>`:

### Access data

`SequenceReader<T>` has methods for enumerating data inside of the `ReadOnlySequence<T>` directly. The following code is an example of processing a `ReadOnlySequence<byte>` a `byte` at a time:

```csharp
while (reader.TryRead(out byte b))
{
    Process(b);
}
```

The `CurrentSpan` exposes the current segment's `Span`, which is similar to what was done in the method manually.

### Use position

The following code is an example implementation of `FindIndexOf` using the `SequenceReader<T>`:

```csharp
SequencePosition? FindIndexOf(in ReadOnlySequence<byte> buffer, byte data)
{
    var reader = new SequenceReader<byte>(buffer);

    while (!reader.End)
    {
        // Search for the byte in the current span.
        var index = reader.CurrentSpan.IndexOf(data);
        if (index != -1)
        {
            // It was found, so advance to the position.
            reader.Advance(index);

            return reader.Position;
        }
        // Skip the current segment since there's nothing in it.
        reader.Advance(reader.CurrentSpan.Length);
    }

    return null;
}
```

### Process binary data

The following example parses a 4-byte big-endian integer length from the start of the `ReadOnlySequence<byte>`.

```csharp
bool TryParseHeaderLength(ref ReadOnlySequence<byte> buffer, out int length)
{
    var reader = new SequenceReader<byte>(buffer);
    return reader.TryReadBigEndian(out length);
}
```

### Process text data

```csharp
static ReadOnlySpan<byte> NewLine => new byte[] { (byte)'\r', (byte)'\n' };

static bool TryParseLine(ref ReadOnlySequence<byte> buffer,
                         out ReadOnlySequence<byte> line)
{
    var reader = new SequenceReader<byte>(buffer);

    if (reader.TryReadTo(out line, NewLine))
    {
        buffer = buffer.Slice(reader.Position);

        return true;
    }

    line = default;
    return false;
}
```

### SequenceReader\<T\> common problems

- Because `SequenceReader<T>` is a mutable struct, it should always be passed by reference.
- `SequenceReader<T>` is a ref struct so it can only be used in synchronous methods and can't be stored in fields. For more information, see Avoid allocations.
- `SequenceReader<T>` is optimized for use as a forward-only reader. `Rewind` is intended for small backups that can't be addressed utilizing other `Read`, `Peek`, and `IsNext` APIs.
