---
title: "ZLibStream class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZLibStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZLibStream class (part 2 of 2)

## ZLibStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

This method is not supported and always throws a `NotSupportedException`.

Parameters:

- `value`: Not supported.

To be added.

## ZLibStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

Writes compressed bytes to the underlying stream from the specified byte span.

Parameters:

- `buffer`: The buffer to write data from.

To be added.

## ZLibStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes compressed bytes to the underlying stream from the specified byte array.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The byte offset in buffer to begin writing from.
- `count`: The maximum number of bytes to write.

To be added.

## ZLibStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous completion of the operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## ZLibStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The byte offset in buffer to begin writing from.
- `count`: The maximum number of bytes to write.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous completion of the operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ZLibStream.Write`.

## ZLibStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current position in the stream and advances the position within the stream by one byte.

Parameters:

- `value`: The byte to write to the stream.

To be added.
