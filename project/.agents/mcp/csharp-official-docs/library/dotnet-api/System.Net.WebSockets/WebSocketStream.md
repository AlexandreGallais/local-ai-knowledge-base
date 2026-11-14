---
title: "WebSocketStream class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketStream class

Namespace: `System.Net.WebSockets`

```csharp
public class WebSocketStream : System.IO.Stream
```

Provides a `Stream` that delegates to a wrapped `WebSocketStream.WebSocket`.

To be added.

## WebSocketStream.CanRead property

```csharp
public override bool CanRead { get; }
```

To be added.

Returns: To be added.

To be added.

## WebSocketStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

To be added.

Returns: To be added.

To be added.

## WebSocketStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

To be added.

Returns: To be added.

To be added.

## WebSocketStream.Length property

```csharp
public override long Length { get; }
```

To be added.

Returns: To be added.

To be added.

## WebSocketStream.Position property

```csharp
public override long Position { get; set; }
```

To be added.

Returns: To be added.

To be added.

## WebSocketStream.WebSocket property

```csharp
public System.Net.WebSockets.WebSocket WebSocket { get; }
```

Gets the underlying `WebSocketStream.WebSocket` wrapped by this `WebSocketStream`.

Returns: To be added.

The `WebSocketStream.WebSocket` used to construct this instance.

## WebSocketStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

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

## WebSocketStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

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

## WebSocketStream.Create(WebSocket, WebSocketMessageType, Boolean) method

```csharp
public static System.Net.WebSockets.WebSocketStream Create (System.Net.WebSockets.WebSocket webSocket, System.Net.WebSockets.WebSocketMessageType writeMessageType, bool ownsWebSocket = false);
```

Creates a `WebSocketStream` that delegates to a wrapped `WebSocketStream.WebSocket`.

Parameters:

- `webSocket`: The wrapped `WebSocketStream.WebSocket`.
- `writeMessageType`: The type of messages that should be written as part of  `WriteAsync` calls. Each write produces a message.
- `ownsWebSocket`: `true` if disposing the `Stream` should close the underlying `WebSocketStream.WebSocket`; otherwise, `false`. Defaults to `false`.

Returns: A new instance of `WebSocketStream` that forwards reads and writes on the `Stream` to the underlying `WebSocketStream.WebSocket`.

To be added.

## WebSocketStream.Create(WebSocket, WebSocketMessageType, TimeSpan) method

```csharp
public static System.Net.WebSockets.WebSocketStream Create (System.Net.WebSockets.WebSocket webSocket, System.Net.WebSockets.WebSocketMessageType writeMessageType, TimeSpan closeTimeout);
```

Creates a `WebSocketStream` that delegates to a wrapped `WebSocketStream.WebSocket`.

Parameters:

- `webSocket`: The wrapped `WebSocketStream.WebSocket`.
- `writeMessageType`: The type of messages that should be written as part of  `WriteAsync` calls. Each write produces a message.
- `closeTimeout`: The amount of time that disposing the `WebSocketStream` will wait for a graceful closing of the `WebSocketStream.WebSocket`'s output.

Returns: A new instance of `WebSocketStream` that forwards reads and writes on the `Stream` to the underlying `WebSocketStream.WebSocket`.

To be added.

## WebSocketStream.CreateReadableMessageStream(WebSocket) method

```csharp
public static System.Net.WebSockets.WebSocketStream CreateReadableMessageStream (System.Net.WebSockets.WebSocket webSocket);
```

Creates a `WebSocketStream` that reads a single message from the underlying `WebSocketStream.WebSocket`.

Parameters:

- `webSocket`: The wrapped `WebSocketStream.WebSocket`.

Returns: A new instance of `WebSocketStream` that forwards reads on the `Stream` to the underlying `WebSocketStream.WebSocket`.

Reads on the `Stream` will read a single message from the underlying `WebSocketStream.WebSocket`. This means that reads will start returning 0 bytes read once all data has been consumed from the next message received in the `WebSocketStream.WebSocket`.

## WebSocketStream.CreateWritableMessageStream(WebSocket, WebSocketMessageType) method

```csharp
public static System.Net.WebSockets.WebSocketStream CreateWritableMessageStream (System.Net.WebSockets.WebSocket webSocket, System.Net.WebSockets.WebSocketMessageType writeMessageType);
```

Creates a `WebSocketStream` that writes a single message to the underlying `WebSocketStream.WebSocket`.

Parameters:

- `webSocket`: The wrapped `WebSocketStream.WebSocket`.
- `writeMessageType`: The type of messages that should be written as part of  `WriteAsync` calls.

Each write on the `Stream` results in writing a partial message to the underlying `WebSocketStream.WebSocket`.

When the `Stream` is disposed, it will write an empty message to the underlying `WebSocketStream.WebSocket` to signal the end of the message.

Returns: A new instance of `WebSocketStream` that forwards writes on the `Stream` to the underlying `WebSocketStream.WebSocket`.

To be added.

## WebSocketStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## WebSocketStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

To be added.

Returns: To be added.

To be added.

## WebSocketStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

To be added.

Parameters:

- `asyncResult`: To be added.

Returns: To be added.

To be added.

## WebSocketStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

To be added.

Parameters:

- `asyncResult`: To be added.

To be added.

## WebSocketStream.Flush() method

```csharp
public override void Flush ();
```

To be added.

To be added.

## WebSocketStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## WebSocketStream.Read(Byte[], Int32, Int32) method

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

## WebSocketStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## WebSocketStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

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

## WebSocketStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

To be added.

Parameters:

- `offset`: To be added.
- `origin`: To be added.

Returns: To be added.

To be added.

## WebSocketStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## WebSocketStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

To be added.

Parameters:

- `buffer`: To be added.
- `offset`: To be added.
- `count`: To be added.

To be added.

## WebSocketStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## WebSocketStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

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
