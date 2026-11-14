---
title: "ThreadExceptionEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadExceptionEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadExceptionEventHandler delegate

Namespace: `System.Threading`

```csharp
public delegate void ThreadExceptionEventHandler(object sender, ThreadExceptionEventArgs e);
```

Represents the method that will handle the `Application.ThreadException` event of an `Application`.

Parameters:

- `sender`: The source of the event.
- `e`: A `ThreadExceptionEventArgs` that contains the event data.

#### Remarks
When you create a `ThreadExceptionEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.
