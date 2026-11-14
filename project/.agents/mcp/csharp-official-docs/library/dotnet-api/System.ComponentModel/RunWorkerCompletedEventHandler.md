---
title: "RunWorkerCompletedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/RunWorkerCompletedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RunWorkerCompletedEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void RunWorkerCompletedEventHandler(object? sender, RunWorkerCompletedEventArgs e);
```

Represents the method that will handle the `BackgroundWorker.RunWorkerCompleted` event of a `BackgroundWorker` class.

Parameters:

- `sender`: The source of the event.
- `e`: A `RunWorkerCompletedEventArgs` that contains the event data.

#### Remarks
When you create a `RunWorkerCompletedEventHandler` delegate, you identify a method to handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

#### Examples
The following code example shows a method that can be used as a handler for `RunWorkerCompletedEventHandler`. This example is part of a larger sample for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._
