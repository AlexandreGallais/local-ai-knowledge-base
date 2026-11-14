---
title: "ReadOnlySequenceStream class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/ReadOnlySequenceStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlySequenceStream class

Namespace: `System.Buffers`

```csharp
public sealed class ReadOnlySequenceStream : System.IO.Stream
```

To be added.

To be added.

## ReadOnlySequenceStream.ReadOnlySequenceStream(Byte>) constructor

```csharp
public ReadOnlySequenceStream (System.Buffers.ReadOnlySequence<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

To be added.

## ReadOnlySequenceStream.CanRead property

```csharp
public override bool CanRead { get; }
```

To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.Length property

```csharp
public override long Length { get; }
```

To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.Position property

```csharp
public override long Position { get; set; }
```

To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

To be added.

Parameters:

- `destination`: To be added.
- `bufferSize`: To be added.

To be added.

## ReadOnlySequenceStream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `destination`: To be added.
- `bufferSize`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## ReadOnlySequenceStream.Flush() method

```csharp
public override void Flush ();
```

To be added.

To be added.

## ReadOnlySequenceStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.ReadByte() method

```csharp
public override int ReadByte ();
```

To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

To be added.

Parameters:

- `offset`: To be added.
- `origin`: To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## ReadOnlySequenceStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

To be added.

## ReadOnlySequenceStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.

To be added.

## ReadOnlySequenceStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ReadOnlySequenceStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.
