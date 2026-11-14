---
title: "ElapsedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Timers/ElapsedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ElapsedEventArgs class

Namespace: `System.Timers`

```csharp
public sealed class ElapsedEventArgs : EventArgs
```

Provides data for the `Timer.Elapsed` event.

#### Examples
The following example instantiates a `Timer` object that fires its `Elapsed` event every two seconds (2000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/timer1.cs._

## ElapsedEventArgs.ElapsedEventArgs(DateTime) constructor

```csharp
public ElapsedEventArgs (DateTime signalTime);
```

Initializes a new instance of the `ElapsedEventArgs` class.

Parameters:

- `signalTime`: The time when the timer elapsed.

To be added.

## ElapsedEventArgs.SignalTime property

```csharp
public DateTime SignalTime { get; }
```

Gets the date/time when the `Timer.Elapsed` event was raised.

Returns: The time the `Timer.Elapsed` event was raised.

#### Remarks
The `Elapsed` event is raised on a `ThreadPool` thread, so the event-handling method might run on one thread at the same time that a call to the `Timer.Stop` method runs on another thread. This might result in the `Elapsed` event being raised after the `Timer.Stop` method is called. This race condition cannot be prevented simply by comparing the `SignalTime` property with the time when the `Timer.Stop` method is called, because the event-handling method might already be executing when the `Timer.Stop` method is called, or might begin executing between the moment when the `Timer.Stop` method is called and the moment when the stop time is saved. If it is critical to prevent the thread that calls the `Timer.Stop` method from proceeding while the event-handling method is still executing, use a more robust synchronization mechanism such as the `Monitor` class or the `Interlocked.CompareExchange` method. Code that uses the `Interlocked.CompareExchange` method can be found in the example for the `Timer.Stop` method.

#### Examples
The following example instantiates a `Timer` object that fires its `Elapsed` event every two seconds (2000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/timer1.cs._
