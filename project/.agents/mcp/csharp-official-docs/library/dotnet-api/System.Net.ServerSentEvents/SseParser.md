---
title: "SseParser class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.ServerSentEvents/SseParser.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SseParser class

Namespace: `System.Net.ServerSentEvents`

```csharp
public static class SseParser
```

Provides a parser for parsing server-sent events.

To be added.

## SseParser.Create(Stream) method

```csharp
public static System.Net.ServerSentEvents.SseParser<string> Create (System.IO.Stream sseStream);
```

Creates a parser for parsing a `sseStream` of server-sent events into a sequence of `SseItem<T>` values.

Parameters:

- `sseStream`: The stream containing the data to parse.

Returns: The enumerable of strings, which can be enumerated synchronously or asynchronously. The strings
are decoded from the UTF8-encoded bytes of the payload of each event.

Exceptions:

- `ArgumentNullException`: `sseStream` is null.

This overload has behavior equivalent to calling `SseParser.Create<T>` with a delegate
that decodes the data of each event using `Encoding.UTF8`'s GetString method.

## SseParser.Create<T>(Stream, SseItemParser<T>) method

```csharp
public static System.Net.ServerSentEvents.SseParser<T> Create<T> (System.IO.Stream sseStream, System.Net.ServerSentEvents.SseItemParser<T> itemParser);
```

Creates a parser for parsing a `sseStream` of server-sent events into a sequence of `SseItem<T>` values.

Parameters:

- `T`: Specifies the type of data in each event.
- `sseStream`: The stream containing the data to parse.
- `itemParser`: The parser to use to transform each payload of bytes into a data element.

Returns: The enumerable, which can be enumerated synchronously or asynchronously.

Exceptions:

- `ArgumentNullException`: `sseStream` or `itemParser` is null.

To be added.

## SseParser.EventTypeDefault field

```csharp
public const string EventTypeDefault;
```

The default `SseItem<T>.EventType` ("message") for an event that did not explicitly specify a type.

To be added.
