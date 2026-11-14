---
title: "CancelEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CancelEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CancelEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void CancelEventHandler(object? sender, CancelEventArgs e);
```

Represents the method that handles a cancelable event.

Parameters:

- `sender`: The source of the event.
- `e`: A `CancelEventArgs` that contains the event data.

#### Remarks
When you create a `CancelEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event-handler method is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.

#### Examples
For an example of how to use the `CancelEventHandler` delegate, please see the sample code in the `CancelEventArgs` class.
