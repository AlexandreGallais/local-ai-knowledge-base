---
title: "StringStream class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StringStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringStream class

Namespace: `System.IO`

```csharp
public sealed class StringStream : System.IO.Stream
```

To be added.

To be added.

## StringStream.StringStream(Char>, Encoding) constructor

```csharp
public StringStream (ReadOnlyMemory<char> text, System.Text.Encoding encoding);
```

To be added.

Parameters:

- `text`: To be added.
- `encoding`: To be added.

To be added.

## StringStream.StringStream(String, Encoding) constructor

```csharp
public StringStream (string text, System.Text.Encoding encoding);
```

To be added.

Parameters:

- `text`: To be added.
- `encoding`: To be added.

To be added.

## StringStream.CanRead property

```csharp
public override bool CanRead { get; }
```

To be added.

Returns: To be added.

To be added.

## StringStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

To be added.

Returns: To be added.

To be added.

## StringStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

To be added.

Returns: To be added.

To be added.

## StringStream.Encoding property

```csharp
public System.Text.Encoding Encoding { get; }
```

To be added.

Returns: To be added.

To be added.

## StringStream.Length property

```csharp
public override long Length { get; }
```

To be added.

Returns: To be added.

To be added.

## StringStream.Position property

```csharp
public override long Position { get; set; }
```

To be added.

Returns: To be added.

To be added.

## StringStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## StringStream.Flush() method

```csharp
public override void Flush ();
```

To be added.

To be added.

## StringStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## StringStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

Returns: To be added.

To be added.

## StringStream.Read(Byte[], Int32, Int32) method

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

## StringStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## StringStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

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

## StringStream.ReadByte() method

```csharp
public override int ReadByte ();
```

To be added.

Returns: To be added.

To be added.

## StringStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

To be added.

Parameters:

- `offset`: To be added.
- `origin`: To be added.

Returns: To be added.

To be added.

## StringStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## StringStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

To be added.

## StringStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.

To be added.

## StringStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## StringStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

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
