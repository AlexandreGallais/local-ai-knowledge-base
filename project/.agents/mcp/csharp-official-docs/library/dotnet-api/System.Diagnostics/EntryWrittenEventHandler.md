---
title: "EntryWrittenEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EntryWrittenEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EntryWrittenEventHandler delegate

Namespace: `System.Diagnostics`

```csharp
public delegate void EntryWrittenEventHandler(object? sender, EntryWrittenEventArgs e);
```

Represents the method that will handle the `EventLog.EntryWritten` event of an `EventLog`.

Parameters:

- `sender`: The source of the event.
- `e`: An `EntryWrittenEventArgs` that contains the event data.

#### Remarks
When you create an `EntryWrittenEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.
