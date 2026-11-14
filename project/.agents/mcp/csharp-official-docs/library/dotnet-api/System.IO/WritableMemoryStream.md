---
title: "WritableMemoryStream class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/WritableMemoryStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WritableMemoryStream class

Namespace: `System.IO`

```csharp
public sealed class WritableMemoryStream : System.IO.Stream
```

To be added.

To be added.

## WritableMemoryStream.WritableMemoryStream(Byte>) constructor

```csharp
public WritableMemoryStream (Memory<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

To be added.

## WritableMemoryStream.CanRead property

```csharp
public override bool CanRead { get; }
```

To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.Length property

```csharp
public override long Length { get; }
```

To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.Position property

```csharp
public override long Position { get; set; }
```

To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

To be added.

Parameters:

- `destination`: To be added.
- `bufferSize`: To be added.

To be added.

## WritableMemoryStream.CopyToAsync(Stream, Int32, CancellationToken) method

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

## WritableMemoryStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## WritableMemoryStream.Flush() method

```csharp
public override void Flush ();
```

To be added.

To be added.

## WritableMemoryStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.Read(Byte[], Int32, Int32) method

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

## WritableMemoryStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

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

## WritableMemoryStream.ReadByte() method

```csharp
public override int ReadByte ();
```

To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

To be added.

Parameters:

- `offset`: To be added.
- `origin`: To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## WritableMemoryStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

To be added.

## WritableMemoryStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.

To be added.

## WritableMemoryStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## WritableMemoryStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

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

## WritableMemoryStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.
