---
title: "ConsoleCancelEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ConsoleCancelEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleCancelEventHandler delegate

Namespace: `System`

```csharp
public delegate void ConsoleCancelEventHandler(object? sender, ConsoleCancelEventArgs e);
```

Represents the method that will handle the `Console.CancelKeyPress` event of a `Console`.

Parameters:

- `sender`: The source of the event.
- `e`: A `ConsoleCancelEventArgs` object that contains the event data.

#### Remarks
When you create a `ConsoleCancelEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.

#### Examples
The following code example demonstrates how to use the `ConsoleCancelEventHandler` class to handle an event.

_Code sample not included: ~/snippets/csharp/System/Console/CancelKeyPress/ckp.cs._
