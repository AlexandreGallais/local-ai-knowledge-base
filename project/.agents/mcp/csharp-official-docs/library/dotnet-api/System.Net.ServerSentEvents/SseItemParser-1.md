---
title: "SseItemParser<T> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.ServerSentEvents/SseItemParser`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SseItemParser<T> delegate

Namespace: `System.Net.ServerSentEvents`

```csharp
public delegate T SseItemParser<out T>(string eventType, ReadOnlySpan<byte> data);
```

Encapsulates a method for parsing the bytes payload of a server-sent event.

Parameters:

- `T`: Specifies the type of the return value of the parser.
- `eventType`: The event's type.
- `data`: The event's payload bytes.

Returns: The parsed `T`.

To be added.
