---
title: "ProgressChangedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ProgressChangedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProgressChangedEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void ProgressChangedEventHandler(object? sender, ProgressChangedEventArgs e);
```

Represents the method that will handle the `BackgroundWorker.ProgressChanged` event of the `BackgroundWorker` class. This class cannot be inherited.

Parameters:

- `sender`: The source of the event.
- `e`: A `ProgressChangedEventArgs` that contains the event data.

#### Remarks
When you create a `ProgressChangedEventHandler` delegate, you identify a method to handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

#### Examples
The following code example shows how to use the `ProgressChangedEventHandler` class. This example is part of a larger example for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._
