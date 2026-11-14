---
title: "ElapsedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Timers/ElapsedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ElapsedEventHandler delegate

Namespace: `System.Timers`

```csharp
public delegate void ElapsedEventHandler(object? sender, ElapsedEventArgs e);
```

Represents the method that will handle the `Timer.Elapsed` event of a `Timer`.

Parameters:

- `sender`: The source of the event.
- `e`: An `ElapsedEventArgs` object that contains the event data.

#### Remarks
When you create an `ElapsedEventHandler` delegate, you identify the method that will handle the `Elapsed` event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

#### Examples
The following code example sets up an event handler for the `Elapsed` event, creates a timer, and starts the timer. The event handler has the same signature as the `ElapsedEventHandler` delegate. The event handler displays the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventHandler/Overview/source.cs._
