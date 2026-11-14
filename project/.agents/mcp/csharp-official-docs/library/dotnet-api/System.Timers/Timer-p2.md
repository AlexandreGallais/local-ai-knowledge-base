---
title: "Timer class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Timers/Timer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Timer class (part 2 of 2)

## Timer.Interval property

```csharp
public double Interval { get; set; }
```

Gets or sets the interval, expressed in milliseconds, at which to raise the `Timer.Elapsed` event.

Returns: The time, in milliseconds, between `Timer.Elapsed` events. The value must be greater than zero, and less than or equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. The default is 100 milliseconds.

Exceptions:

- `ArgumentException`: The interval is less than or equal to zero.

-or-

The interval is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>, and the timer is currently enabled. (If the timer is not currently enabled, no exception is thrown until it becomes enabled.)

#### Remarks
You use the `Interval` property to determine the frequency at which the `Elapsed` event is fired. Because the `Timer` class depends on the system clock, it has the same resolution as the system clock. This means that the `Elapsed` event will fire at an interval defined by the resolution of the system clock if the `Interval` property is less than the resolution of the system clock. The following example sets the `Interval` property to 5 milliseconds. When run on a Windows system whose system clock has a resolution of approximately 15 milliseconds, the event fires approximately every 15 milliseconds rather than every 5 milliseconds.

> **Note:**
> The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

_Code sample not included: ~/snippets/csharp/System.Timers/Timer/Interval/interval2.cs._

If your app requires greater resolution than that offered by the `Timer` class or the system clock, use the high-resolution multimedia timers.

If the interval is set after the `Timer` has started, the count is reset. For example, if you set the interval to 5 seconds and then set the `Enabled` property to `true`, the count starts at the time `Timer.Enabled` is set. If you reset the interval to 10 seconds when count is 3 seconds, the `Elapsed` event is raised for the first time 13 seconds after `Timer.Enabled` was set to `true`.

If `Timer.Enabled` is set to `true` and `Timer.AutoReset` is set to `false`, the `Timer` raises the `Elapsed` event only once, the first time the interval elapses. `Timer.Enabled` is then set to `false`.

> **Note:**
> If `Timer.Enabled` and `Timer.AutoReset` are both set to `false`, and the timer has previously been enabled, setting the `Interval` property causes the `Elapsed` event to be raised once, as if the `Enabled` property had been set to `true`. To set the interval without raising the event, you can temporarily set the `Enabled` property to `true`, set the `Interval` property to the desired time interval, and then immediately set the `Enabled` property back to `false`.

#### Examples
The following example instantiates a `Timer` object that fires its `Elapsed` event every two seconds (2000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/timer1.cs._

## Timer.Site property

```csharp
public override System.ComponentModel.ISite? Site { get; set; }
```

Gets or sets the site that binds the `Timer` to its container in design mode.

Returns: An `ISite` interface representing the site that binds the `Timer` object to its container.

#### Remarks
Sites bind a `Component` to a `Container` and enable communication between them, as well as providing a way for the container to manage its components.

## Timer.SynchronizingObject property

```csharp
public System.ComponentModel.ISynchronizeInvoke? SynchronizingObject { get; set; }
```

Gets or sets the object used to marshal event-handler calls that are issued when an interval has elapsed.

Returns: The `ISynchronizeInvoke` representing the object used to marshal the event-handler calls that are issued when an interval has elapsed. The default is `null`.

#### Remarks
When `Timer.SynchronizingObject` is `null`, the method that handles the `Elapsed` event is called on a thread from the system-thread pool. For more information on system-thread pools, see `ThreadPool`.

When the `Elapsed` event is handled by a visual Windows Forms component, such as a button, accessing the component through the system-thread pool might result in an exception or just might not work. Avoid this effect by setting `Timer.SynchronizingObject` to a Windows Forms component, which causes the method that handles the `Elapsed` event to be called on the same thread that the component was created on.

> **Note:**
> Even if the `SynchronizingObject` property is not `null`, `Elapsed` events can occur after the `Timer.Dispose` or `Timer.Stop` method has been called or after the `Enabled` property has been set to `false`, because the signal to raise the `Elapsed` event is always queued for execution on a thread pool thread. One way to resolve this race condition is to set a flag that tells the event handler for the `Elapsed` event to ignore subsequent events.

If the `Timer` is used inside Visual Studio in a Windows Forms designer, `Timer.SynchronizingObject` is automatically set to the control that contains the `Timer`. For example, if you place a `Timer` on a designer for `Form1` (which inherits from `Form`), the `SynchronizingObject` property of `Timer` is set to the instance of `Form1`.

#### Examples
The following example is a Windows Forms app that serves as a very simple text file editor. When the text in the text box has not been saved, the app asks the user at one-minute intervals whether they want to save the contents of the text box.  To do this, the `Interval` property is set to one minute (60,000 milliseconds), and the `SynchronizingObject` property is set to the `Form` object.

_Code sample not included: ~/snippets/csharp/System.Timers/Timer/SynchronizingObject/Form1.cs._

The example requires that you add the following controls to the form:

- A `TextBox` control named `TextBox1` (its default name).
- A `Button` control named `Button1` (its default name).
- A `SaveFileDialog` control named `SaveSaveFileDialog1` (its default name).

## Timer.BeginInit() method

```csharp
public void BeginInit ();
```

Begins the run-time initialization of a `Timer` that is used on a form or by another component.

#### Remarks
The Visual Studio 2005 design environment uses this method to start the initialization of a component that is used on a form or by another component. The `Timer.EndInit` method ends the initialization. Using the `Timer.BeginInit` and `Timer.EndInit` methods prevents the control from being used before it is fully initialized.

## Timer.Close() method

```csharp
public void Close ();
```

Releases the resources used by the `Timer`.

#### Remarks
The `Timer.Close` method in turn calls the `Dispose` method.

## Timer.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases all resources used by the current `Timer`.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## Timer.EndInit() method

```csharp
public void EndInit ();
```

Ends the run-time initialization of a `Timer` that is used on a form or by another component.

#### Remarks
The Visual Studio 2005 design environment uses this method to end the initialization of a component that's used on a form or by another component. The `Timer.BeginInit` method starts the initialization. Using the `Timer.BeginInit` and `Timer.EndInit` methods prevents the control from being used before it's fully initialized.

## Timer.Start() method

```csharp
public void Start ();
```

Starts raising the `Timer.Elapsed` event by setting `Timer.Enabled` to `true`.

Exceptions:

- `ArgumentOutOfRangeException`: The `Timer` is created with an interval equal to or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> + 1, or set to an interval less than zero.

#### Remarks
If `Timer.Start` is called and `Timer.AutoReset` is set to `false`, the `Timer` raises the `Elapsed` event only once, the first time the interval elapses. If `Timer.Start` is called and `Timer.AutoReset` is `true`, the `Timer` raises the `Elapsed` event the first time the interval elapses and continues to raise the event on the specified interval.

You can also start timing by setting `Timer.Enabled` to `true`.

> **Note:**
> If `Timer.AutoReset` is `false`, the `Timer.Start` method must be called in order to start the count again.

A call to the `Timer.Start` method when the timer is enabled has no effect.

## Timer.Stop() method

```csharp
public void Stop ();
```

Stops raising the `Timer.Elapsed` event by setting `Timer.Enabled` to `false`.

#### Remarks
You can also stop timing by setting `Timer.Enabled` to `false`.

> **Note:**
> The signal to raise the `Elapsed` event is always queued for execution on a `ThreadPool` thread, so the event-handling method might run on one thread at the same time that a call to the `Timer.Stop` method runs on another thread. This might result in the `Elapsed` event being raised after the `Timer.Stop` method is called. The second code example in the Examples section shows one way to work around this race condition.

#### Examples
The following example instantiates a `System.Timers.Timer` object that fires its `Elapsed` event every two seconds (2,000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised. When the user presses the Enter key, the application calls the  `Timer.Stop` method before terminating the application.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/timer2a.cs._

The following code example shows one way to prevent the thread that calls the `Timer.Stop` method from continuing until a currently executing `Elapsed` event ends, and also to prevent two `Elapsed` events from executing the event handler at the same time (often referred to as reentrancy).

The example executes 100 test runs. Each time the test is run, the timer is started with an interval of 150 milliseconds. The event handler uses the `Thread.Sleep` method to simulate a task that randomly varies in length from 50 to 200 milliseconds. The test method also starts a control thread that waits for a second and then stops the timer. If an event is being handled when the control thread stops the timer, the control thread must wait until the event is finished before proceeding.

The `CompareExchange` method overload is used to avoid reentrancy and to prevent the control thread from continuing until an executing event ends. The event handler uses the `CompareExchange` method to set a control variable to 1, but only if the value is currently zero. This is an atomic operation. If the return value is zero, the control variable has been set to 1 and the event handler proceeds. If the return value is non-zero, the event is simply discarded to avoid reentrancy. (If it were necessary to execute every event, the `Monitor` class would be a better way to synchronize the events.) When the event handler ends, it sets the control variable back to zero. The example records the total number of events that executed, that were discarded because of reentrancy, and that occurred after the `Timer.Stop` method was called.

The control thread uses the `CompareExchange` method to set the control variable to -1 (minus one), but only if the value is currently zero. If the atomic operation returns non-zero, an event is currently executing. The control thread waits and tries again. The example records the number of times the control thread had to wait for an event to finish.

_Code sample not included: ~/snippets/csharp/System.Timers/Timer/Stop/source.cs._

## Timer.Elapsed event

```csharp
public event System.Timers.ElapsedEventHandler Elapsed;
```

Occurs when the interval elapses.

#### Remarks
The `Elapsed` event is raised if the `Enabled` property is `true` and the time interval (in milliseconds) defined by the `Interval` property elapses. If the `AutoReset` property is `true`, the event is raised repeatedly at an interval defined by the `Interval` property; otherwise, the event is raised only once, the first time the `Timer.Interval` value elapses.

If `Timer.Interval` is set after the `Timer` has started, the count is reset. For example, if you set the interval to 5 seconds and then set `Timer.Enabled` to `true`, the count starts at the time `Timer.Enabled` is set. If you reset the interval to 10 seconds when count is 3 seconds, the `Elapsed` event is raised for the first time 13 seconds after `Timer.Enabled` was set to `true`.

If the `SynchronizingObject` property is `null`,the `Elapsed` event is raised on a `ThreadPool` thread. If the processing of the `Elapsed` event lasts longer than `Timer.Interval`, the event might be raised again on another `ThreadPool` thread. In this situation, the event handler should be reentrant.

> **Note:**
> The event-handling method might run on one thread at the same time that another thread calls the `Timer.Stop` method or sets the `Enabled` property to `false`. This might result in the `Elapsed` event being raised after the timer is stopped. The example code for the `Timer.Stop` method shows one way to avoid this race condition.

Even if `Timer.SynchronizingObject` is not `null`, `Elapsed` events can occur after the `Timer.Dispose` or `Timer.Stop` method has been called or after the `Enabled` property has been set to `false`, because the signal to raise the `Elapsed` event is always queued for execution on a thread pool thread. One way to resolve this race condition is to set a flag that tells the event handler for the `Elapsed` event to ignore subsequent events.

The `Timer` component catches and suppresses all exceptions thrown by event handlers for the `Elapsed` event.

#### Examples
The following example instantiates a `Timer` object that fires its `Elapsed` event every two seconds (2000 milliseconds), sets up an event handler for the event, and starts the timer. The event handler displays the value of the `SignalTime` property each time it is raised.

_Code sample not included: ~/snippets/csharp/System.Timers/ElapsedEventArgs/Overview/timer1.cs._
