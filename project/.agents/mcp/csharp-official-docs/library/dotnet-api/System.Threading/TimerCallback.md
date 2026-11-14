---
title: "TimerCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/TimerCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimerCallback delegate

Namespace: `System.Threading`

```csharp
public delegate void TimerCallback(object? state);
```

Represents the method that handles calls from a `Timer`.

Parameters:

- `state`: An object containing application-specific information relevant to the method invoked by this delegate, or `null`.

#### Remarks
Use a `TimerCallback` delegate to specify the method that is called by a `Timer`. This method does not execute in the thread that created the timer; it executes in a separate thread pool thread that is provided by the system. The `TimerCallback` delegate invokes the method once after the start time elapses, and continues to invoke it once per timer interval until the `Timer.Dispose` method is called, or until the `Timer.Change` method is called with the interval value `Infinite`.

> **Note:**
>  Callbacks can occur after the `Dispose` method overload has been called, because the timer queues callbacks for execution by thread pool threads. You can use the `Dispose` method overload to wait until all callbacks have completed.

The timer delegate is specified when the timer is constructed, and cannot be changed. The start time for a `Timer` is passed in the `dueTime` parameter of the `Timer` constructors, and the period is passed in the `period` parameter. For an example that demonstrates creating and using a `TimerCallback` delegate, see `Timer`.

#### Examples
The following code example shows how to create the delegate used with the `Timer` class.

_Code sample not included: ~/snippets/csharp/System.Threading/Timer/Overview/source.cs._
