---
title: "DoWorkEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DoWorkEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DoWorkEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void DoWorkEventHandler(object? sender, DoWorkEventArgs e);
```

Represents the method that will handle the `BackgroundWorker.DoWork` event. This class cannot be inherited.

Parameters:

- `sender`: The source of the event.
- `e`: A `DoWorkEventArgs` that contains the event data.

#### Remarks
When you create a `DoWorkEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event-handler method is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.

#### Examples
The following code example demonstrates how to use the `DoWorkEventHandler` delegate to handle the `DoWork` event. For a full code listing, see How to: Run an Operation in the Background.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DoWorkEventArgs/Overview/Form1.cs._
