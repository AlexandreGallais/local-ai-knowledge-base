---
title: "ZstandardStream class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZstandardStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZstandardStream class

Namespace: `System.IO.Compression`

```csharp
public sealed class ZstandardStream : System.IO.Stream
```

To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, CompressionLevel) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.CompressionLevel compressionLevel);
```

To be added.

Parameters:

- `stream`: To be added.
- `compressionLevel`: To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, CompressionMode) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode);
```

To be added.

Parameters:

- `stream`: To be added.
- `mode`: To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, CompressionLevel, Boolean) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.CompressionLevel compressionLevel, bool leaveOpen);
```

To be added.

Parameters:

- `stream`: To be added.
- `compressionLevel`: To be added.
- `leaveOpen`: To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, CompressionMode, Boolean) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode, bool leaveOpen);
```

To be added.

Parameters:

- `stream`: To be added.
- `mode`: To be added.
- `leaveOpen`: To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, ZstandardCompressionOptions, Boolean) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.ZstandardCompressionOptions compressionOptions, bool leaveOpen = false);
```

To be added.

Parameters:

- `stream`: To be added.
- `compressionOptions`: To be added.
- `leaveOpen`: To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, ZstandardDecoder, Boolean) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.ZstandardDecoder decoder, bool leaveOpen = false);
```

To be added.

Parameters:

- `stream`: To be added.
- `decoder`: To be added.
- `leaveOpen`: To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, ZstandardDecompressionOptions, Boolean) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.ZstandardDecompressionOptions decompressionOptions, bool leaveOpen = false);
```

To be added.

Parameters:

- `stream`: To be added.
- `decompressionOptions`: To be added.
- `leaveOpen`: To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, ZstandardEncoder, Boolean) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.ZstandardEncoder encoder, bool leaveOpen = false);
```

To be added.

Parameters:

- `stream`: To be added.
- `encoder`: To be added.
- `leaveOpen`: To be added.

To be added.

## ZstandardStream.ZstandardStream(Stream, CompressionMode, ZstandardDictionary, Boolean) constructor

```csharp
public ZstandardStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode, System.IO.Compression.ZstandardDictionary dictionary, bool leaveOpen = false);
```

To be added.

Parameters:

- `stream`: To be added.
- `mode`: To be added.
- `dictionary`: To be added.
- `leaveOpen`: To be added.

To be added.

## ZstandardStream.BaseStream property

```csharp
public System.IO.Stream BaseStream { get; }
```

To be added.

Returns: To be added.

To be added.

## ZstandardStream.CanRead property

```csharp
public override bool CanRead { get; }
```

To be added.

Returns: To be added.

To be added.

## ZstandardStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

To be added.

Returns: To be added.

To be added.

## ZstandardStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

To be added.

Returns: To be added.

To be added.

## ZstandardStream.Length property

```csharp
public override long Length { get; }
```

To be added.

Returns: To be added.

To be added.

## ZstandardStream.Position property

```csharp
public override long Position { get; set; }
```

To be added.

Returns: To be added.

To be added.

## ZstandardStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.
- `callback`: To be added.
- `state`: To be added.

Returns: To be added.

To be added.

## ZstandardStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.
- `callback`: To be added.
- `state`: To be added.

Returns: To be added.

To be added.

## ZstandardStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## ZstandardStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

To be added.

Returns: To be added.

To be added.

## ZstandardStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

To be added.

Parameters:

- `asyncResult`: To be added.

Returns: To be added.

To be added.

## ZstandardStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

To be added.

Parameters:

- `asyncResult`: To be added.

To be added.

## ZstandardStream.Flush() method

```csharp
public override void Flush ();
```

To be added.

To be added.

## ZstandardStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ZstandardStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

Returns: To be added.

To be added.

## ZstandardStream.Read(Byte[], Int32, Int32) method

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

## ZstandardStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ZstandardStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

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

## ZstandardStream.ReadByte() method

```csharp
public override int ReadByte ();
```

To be added.

Returns: To be added.

To be added.

## ZstandardStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

To be added.

Parameters:

- `offset`: To be added.
- `origin`: To be added.

Returns: To be added.

To be added.

## ZstandardStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## ZstandardStream.SetSourceLength(Int64) method

```csharp
public void SetSourceLength (long length);
```

To be added.

Parameters:

- `length`: To be added.

To be added.

## ZstandardStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

To be added.

## ZstandardStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.

To be added.

## ZstandardStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ZstandardStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

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

## ZstandardStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.
