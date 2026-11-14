---
title: "SseItem<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.ServerSentEvents/SseItem`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SseItem<T> struct

Namespace: `System.Net.ServerSentEvents`

```csharp
public readonly struct SseItem<T>
```

Represents a server-sent event.

Parameters:

- `T`: Specifies the type of data payload in the event.

To be added.

## SseItem<T>.SseItem(T, String) constructor

```csharp
public SseItem (T data, string? eventType = default);
```

Initializes the server-sent event.

Parameters:

- `data`: The event's payload.
- `eventType`: The event's type.

Exceptions:

- `ArgumentException`: Thrown when `eventType` contains a line break.

To be added.

## SseItem<T>.Data property

```csharp
public T Data { get; }
```

Gets the event's payload.

Returns: To be added.

To be added.

## SseItem<T>.EventId property

```csharp
public string? EventId { get; init; }
```

Gets the event's id.

Returns: To be added.

Exceptions:

- `ArgumentException`: Thrown when the value contains a line break.

To be added.

## SseItem<T>.EventType property

```csharp
public string EventType { get; }
```

Gets the event's type.

Returns: To be added.

To be added.

## SseItem<T>.ReconnectionInterval property

```csharp
public TimeSpan? ReconnectionInterval { get; init; }
```

Gets the event's retry interval.

Returns: To be added.

When specified on an event, instructs the client to update its reconnection time to the specified value.
