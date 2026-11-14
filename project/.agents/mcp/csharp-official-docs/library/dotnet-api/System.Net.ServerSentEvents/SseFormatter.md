---
title: "SseFormatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.ServerSentEvents/SseFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SseFormatter class

Namespace: `System.Net.ServerSentEvents`

```csharp
public static class SseFormatter
```

Provides methods for formatting server-sent events.

To be added.

## SseFormatter.WriteAsync(String>>, Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAsync (System.Collections.Generic.IAsyncEnumerable<System.Net.ServerSentEvents.SseItem<string>> source, System.IO.Stream destination, System.Threading.CancellationToken <example-value> = default);
```

Writes the `source` of server-sent events to the `destination` stream.

Parameters:

- `source`: The events to write to the stream.
- `destination`: The destination stream to write the events.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

The `destination` stream is flushed after each event is written.

## SseFormatter.WriteAsync<T>(SseItem<T>>, Stream, Byte>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAsync<T> (System.Collections.Generic.IAsyncEnumerable<System.Net.ServerSentEvents.SseItem<T>> source, System.IO.Stream destination, Action<System.Net.ServerSentEvents.SseItem<T>,System.Buffers.IBufferWriter<byte>> itemFormatter, System.Threading.CancellationToken <example-value> = default);
```

Writes the `source` of server-sent events to the `destination` stream.

Parameters:

- `T`: The data type of the event.
- `source`: The events to write to the stream.
- `destination`: The destination stream to write the events.
- `itemFormatter`: The formatter for the data field of given event.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

The `destination` stream is flushed after each event is written.
