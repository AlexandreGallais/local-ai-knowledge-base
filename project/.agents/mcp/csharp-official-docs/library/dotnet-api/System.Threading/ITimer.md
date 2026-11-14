---
title: "ITimer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ITimer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ITimer interface

Namespace: `System.Threading`

```csharp
public interface ITimer : IAsyncDisposable, IDisposable
```

Represents a timer that can have its due time and period changed.

Implementations of `ITimer.Change`, `IDisposable.Dispose`, and `IAsyncDisposable.DisposeAsync`
must all be thread-safe such that the timer instance may be accessed concurrently from multiple threads.

## ITimer.Change(TimeSpan, TimeSpan) method

```csharp
public bool Change (TimeSpan dueTime, TimeSpan period);
```

Changes the start time and the interval between method invocations for a timer, using `TimeSpan` values to measure time intervals.

Parameters:

- `dueTime`: A `TimeSpan` representing the amount of time to delay before invoking the callback method specified when the `ITimer` was constructed.
Specify `Timeout.InfiniteTimeSpan` to prevent the timer from restarting. Specify `TimeSpan.Zero` to restart the timer immediately.
- `period`: The time interval between invocations of the callback method specified when the Timer was constructed.
Specify `Timeout.InfiniteTimeSpan` to disable periodic signaling.

Returns: `true` if the timer was successfully updated; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: The `dueTime` or `period` parameter, in milliseconds, is less than -1 or greater than 4294967294.

It is the responsibility of the implementer of the ITimer interface to ensure thread safety.
