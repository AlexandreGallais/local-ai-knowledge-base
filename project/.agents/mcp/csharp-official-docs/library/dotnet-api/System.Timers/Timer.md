---
title: "Timer class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Timers/Timer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Timer class

Namespace: `System.Timers`

```csharp
public class Timer : System.ComponentModel.Component, System.ComponentModel.ISupportInitialize
```

Generates an event after a set interval, with an option to generate recurring events.

#### Remarks
The `Timer` component is a server-based timer that raises an `Elapsed` event in your application after the number of milliseconds in the `Interval` property has elapsed. You can configure the `Timer` object to raise the event just once or repeatedly using the `AutoReset` property. Typically, a `Timer` object is declared at the class level so that it stays in scope as long as it is needed. You can then handle its `Elapsed` event to provide regular processing. For example, suppose you have a critical server that must be kept running 24 hours a day, 7 days a week. You could create a service that uses a `Timer` object to periodically check the server and ensure that the system is up and running. If the system is not responding, the service could attempt to restart the server or notify an administrator.

> **Important:**
> The `Timer` class is not available for all .NET implementations and versions, such as .NET Standard 1.6 and lower versions. In these cases, you can use the `Timer` class instead.

This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

The server-based `Timer` class is designed for use with worker threads in a multithreaded environment. Server timers can move among threads to handle the raised `Elapsed` event, resulting in more accuracy than Windows timers in raising the event on time.

The `Timer` component raises the `Elapsed` event, based on the value (in milliseconds) of the `Interval` property. You can handle this event to perform the processing you need. For example, suppose that you have an online sales application that continuously posts sales orders to a database. The service that compiles the instructions for shipping operates on a batch of orders rather than processing each order individually. You could use a `Timer` to start the batch processing every 30 minutes.

> **Important:**
> The System.Timers.Timer class has the same resolution as the system clock. This means that the `Elapsed` event will fire at an interval defined by the resolution of the system clock if the `Interval` property is less than the resolution of the system clock. For more information, see the `Interval` property.

> **Note:**
> The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

When `Timer.AutoReset` is set to `false`, a `Timer` object raises the `Elapsed` event only once, after the first `Timer.Interval` has elapsed. To keep raising the `Elapsed` event regularly at the interval defined by the `Timer.Interval`, set `Timer.AutoReset` to `true`, which is the default value.

The `Timer` component catches and suppresses all exceptions thrown by event handlers for the `Elapsed` event. This is not true of event handlers that execute asynchronously and include the `await` operator (in C#) or the `Await` operator (in Visual Basic). Exceptions thrown in these event handlers are propagated back to the calling thread, as the following example illustrates. For more information on exceptions thrown in asynchronous methods, see Exception Handling.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/AsyncHandlerEx1.cs._

If the `SynchronizingObject` property is `null`, the `Elapsed` event is raised on a `ThreadPool` thread. If processing of the `Elapsed` event lasts longer than `Timer.Interval`, the event might be raised again on another `ThreadPool` thread. In this situation, the event handler should be reentrant.

> **Note:**
> The event-handling method might run on one thread at the same time that another thread calls the `Timer.Stop` method or sets the `Enabled` property to `false`. This might result in the `Elapsed` event being raised after the timer is stopped. The example code for the `Timer.Stop` method shows one way to avoid this race condition.

Even if `Timer.SynchronizingObject` is not `null`, `Elapsed` events can occur after the `Timer.Dispose` or `Timer.Stop` method has been called or after the `Enabled` property has been set to `false`, because the signal to raise the `Elapsed` event is always queued for execution on a thread pool thread. One way to resolve this race condition is to set a flag that tells the event handler for the `Elapsed` event to ignore subsequent events.

If you use the `Timer` class with a user interface element, such as a form or control, without placing the timer on that user interface element, assign the form or control that contains the `Timer` to the `SynchronizingObject` property, so that the event is marshaled to the user interface thread.

For a list of default property values for an instance of `Timer`, see the `Timer.%23ctor` constructor.

> **Tip:**
> .NET includes a few classes named `Timer`, each of which offers different functionality:
>
> - `Timer` (this topic): fires an event at regular intervals. The class is intended for use as a server-based or service component in a multithreaded environment; it has no user interface and is not visible at runtime.
> - `Timer`: executes a single callback method on a thread pool thread at regular intervals. The callback method is defined when the timer is instantiated and cannot be changed. Like the `Timer` class, this class is intended for use as a server-based or service component in a multithreaded environment; it has no user interface and is not visible at runtime.
> - `Timer`: a Windows Forms component that fires an event at regular intervals. The component has no user interface and is designed for use in a single-threaded environment.

#### Examples
The following example instantiates a `System.Timers.Timer` object that fires its `Elapsed` event every two seconds (2,000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/timer2a.cs._

## Timer.Timer() constructor

```csharp
public Timer ();
```

Initializes a new instance of the `Timer` class, and sets all the properties to their initial values.

#### Remarks
The following table shows initial property values for an instance of `Timer`.

| Property                                        | Initial value                                 |
|-------------------------------------------------|-----------------------------------------------|
| `Timer.AutoReset`           | `true`                                        |
| `Timer.Enabled`             | `false`                                       |
| `Timer.Interval`            | 100 milliseconds                              |
| `Timer.SynchronizingObject` | A null reference (`Nothing` in Visual Basic). |

#### Examples
The following example instantiates a `Timer` object that fires its `Elapsed` event every two seconds (2000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/timer1.cs._

## Timer.Timer(Double) constructor

```csharp
public Timer (double interval);
```

Initializes a new instance of the `Timer` class, and sets the `Timer.Interval` property to the specified number of milliseconds.

Parameters:

- `interval`: The time, in milliseconds, between events. The value must be greater than zero and less than or equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

Exceptions:

- `ArgumentException`: The value of the `interval` parameter is less than or equal to zero, or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
This constructor sets the `Interval` property of the new timer instance, but does not enable the timer.

#### Examples
The following example instantiates a `Timer` object that fires its `Elapsed` event every two seconds (2000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/AsyncHandlerEx1.cs._

## Timer.Timer(TimeSpan) constructor

```csharp
public Timer (TimeSpan interval);
```

Initializes a new instance of the `Timer` class, setting the `Timer.Interval` property to the specified period.

Parameters:

- `interval`: The time between events. The value in milliseconds must be greater than zero and less than or equal to `Int32.MaxValue`.

To be added.

## Timer.AutoReset property

```csharp
public bool AutoReset { get; set; }
```

Gets or sets a Boolean indicating whether the `Timer` should raise the `Timer.Elapsed` event only once (`false`) or repeatedly (`true`).

Returns: `true` if the `Timer` should raise the `Timer.Elapsed` event each time the interval elapses; `false` if it should raise the `Timer.Elapsed` event only once, after the first time the interval elapses. The default is `true`.

#### Remarks
If `Timer.AutoReset` is `false`, the `Timer.Start` method must be called in order to start the count again.

Resetting the interval affects when the `Elapsed` event is raised. For example, if you set the interval to 5 seconds and then set the `Enabled` property to `true`, the count starts at the time `Timer.Enabled` is set. If you reset the interval to 10 seconds when the count is 3 seconds, the `Elapsed` event is raised for the first time 13 seconds after the `Enabled` property was set to `true`.

#### Examples
The following example creates a `Timer` whose `Elapsed` event fires after 1.5 seconds. Its event handler then displays "Hello World!" on the console.

_Code sample not included: ~/snippets/csharp/System.Timers/Timer/AutoReset/source.cs._

## Timer.Enabled property

```csharp
public bool Enabled { get; set; }
```

Gets or sets a value indicating whether the `Timer` should raise the `Timer.Elapsed` event.

Returns: `true` if the `Timer` should raise the `Timer.Elapsed` event; otherwise, `false`. The default is `false`.

Exceptions:

- `ObjectDisposedException`: This property cannot be set because the timer has been disposed.
- `ArgumentException`: The `Timer.Interval` property was set to a value greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> before the timer was enabled.

#### Remarks
Setting `Timer.Enabled` to `true` is the same as calling `Timer.Start`, while setting `Timer.Enabled` to `false` is the same as calling `Timer.Stop`.

> **Note:**
> The signal to raise the `Elapsed` event is always queued for execution on a `ThreadPool` thread. This might result in the `Elapsed` event being raised after the `Enabled` property is set to `false`. The code example for the `Timer.Stop` method shows one way to work around this race condition.

If `Timer.Enabled` is set to `true` and `Timer.AutoReset` is set to `false`, the `Timer` raises the `Elapsed` event only once, the first time the interval elapses.

If the interval is set after the `Timer` has started, the count is reset. For example, if you set the interval to 5 seconds and then set the `Enabled` property to `true`, the count starts at the time `Timer.Enabled` is set. If you reset the interval to 10 seconds when count is 3 seconds, the `Elapsed` event is raised for the first time 13 seconds after `Timer.Enabled` was set to `true`.

> **Note:**
> Some visual designers, such as those in Microsoft Visual Studio, set the `Enabled` property to `true` when inserting a new `Timer`.

#### Examples
The following example instantiates a `Timer` object that fires its `Elapsed` event every two seconds (2000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/timer1.cs._
