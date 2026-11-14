---
title: "SseParser<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.ServerSentEvents/SseParser`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SseParser<T> class

Namespace: `System.Net.ServerSentEvents`

```csharp
public sealed class SseParser<T>
```

Provides a parser for server-sent events information.

Parameters:

- `T`: Specifies the type of data parsed from an event.

To be added.

## SseParser<T>.LastEventId property

```csharp
public string LastEventId { get; }
```

Gets the last event ID.

Returns: To be added.

This value is updated any time a new last event ID is parsed. It is not reset between SSE items.

## SseParser<T>.ReconnectionInterval property

```csharp
public TimeSpan ReconnectionInterval { get; }
```

Gets the reconnection interval.

Returns: To be added.

If no retry event was received, this defaults to `Timeout.InfiniteTimeSpan`, and it will only
ever be `Timeout.InfiniteTimeSpan` in that situation. If a client wishes to retry, the server-sent
events specification states that the interval may then be decided by the client implementation and should be a
few seconds.

## SseParser<T>.Enumerate() method

```csharp
public System.Collections.Generic.IEnumerable<System.Net.ServerSentEvents.SseItem<T>> Enumerate ();
```

Gets an enumerable of the server-sent events from this parser.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The parser has already been enumerated. Such an exception may propagate out of a call to `IEnumerator.MoveNext`.

To be added.

## SseParser<T>.EnumerateAsync(CancellationToken) method

```csharp
public System.Collections.Generic.IAsyncEnumerable<System.Net.ServerSentEvents.SseItem<T>> EnumerateAsync (System.Threading.CancellationToken <example-value> = default);
```

Gets an asynchronous enumerable of the server-sent events from this parser.

Parameters:

- `cancellationToken`: The cancellation token to use to cancel the enumeration.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The parser has already been enumerated. Such an exception may propagate out of a call to `IAsyncEnumerator<T>.MoveNextAsync`.
- `OperationCanceledException`: The enumeration was canceled. Such an exception may propagate out of a call to `IAsyncEnumerator<T>.MoveNextAsync`.

To be added.
