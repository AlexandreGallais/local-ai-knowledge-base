---
title: "TimeProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeProvider class

Namespace: `System`

```csharp
public abstract class TimeProvider
```

Provides an abstraction for time.

To make it easier to test time-dependent code, you can use `FakeTimeProvider` from the Microsoft.Extensions.Time.Testing package.

## TimeProvider.TimeProvider() constructor

```csharp
protected TimeProvider ();
```

Initializes the `TimeProvider`.

To be added.

## TimeProvider.LocalTimeZone property

```csharp
public virtual TimeZoneInfo LocalTimeZone { get; }
```

Gets a `TimeZoneInfo` object that represents the local time zone according to this `TimeProvider`'s notion of time.

Returns: To be added.

The default implementation returns `TimeZoneInfo.Local`.

## TimeProvider.System property

```csharp
public static TimeProvider System { get; }
```

Gets a `TimeProvider` that provides a clock based on `DateTimeOffset.UtcNow`,
a time zone based on `TimeZoneInfo.Local`, a high-performance time stamp based on `Stopwatch`,
and a timer based on `Timer`.

Returns: To be added.

If the `TimeZoneInfo.Local` changes after the object is returned, the change will be reflected in any subsequent operations that retrieve `TimeProvider.GetLocalNow`.

## TimeProvider.TimestampFrequency property

```csharp
public virtual long TimestampFrequency { get; }
```

Gets the frequency of `TimeProvider.GetTimestamp` of high-frequency value per second.

Returns: To be added.

The default implementation returns `Stopwatch.Frequency`. For a given TimeProvider instance, the value must be idempotent and remain unchanged.

## TimeProvider.CreateTimer(TimerCallback, Object, TimeSpan, TimeSpan) method

```csharp
public virtual System.Threading.ITimer CreateTimer (System.Threading.TimerCallback callback, object? state, TimeSpan dueTime, TimeSpan period);
```

Creates a new `ITimer` instance, using `TimeSpan` values to measure time intervals.

Parameters:

- `callback`: A delegate representing a method to be executed when the timer fires. The method specified for callback should be reentrant,
as it may be invoked simultaneously on two threads if the timer fires again before or while a previous callback is still being handled.
- `state`: An object to be passed to the `callback`. This may be null.
- `dueTime`: The amount of time to delay before `callback` is invoked. Specify `Timeout.InfiniteTimeSpan` to prevent the timer from starting. Specify `TimeSpan.Zero` to start the timer immediately.
- `period`: The time interval between invocations of `callback`. Specify `Timeout.InfiniteTimeSpan` to disable periodic signaling.

Returns: The newly created `ITimer` instance.

Exceptions:

- `ArgumentNullException`: `callback` is null.
- `ArgumentOutOfRangeException`: The number of milliseconds in the value of `dueTime` or `period` is negative and not equal to `Timeout.Infinite`, or is greater than `Int32.MaxValue`.

The delegate specified by the callback parameter is invoked once after `dueTime` elapses, and thereafter each time the `period` time interval elapses.

If `dueTime` is zero, the callback is invoked immediately. If `dueTime` is -1 milliseconds, `callback` is not invoked; the timer is disabled,
but can be re-enabled by calling the `ITimer.Change` method.

If `period` is 0 or -1 milliseconds and `dueTime` is positive, `callback` is invoked once; the periodic behavior of the timer is disabled,
but can be re-enabled using the `ITimer.Change` method.

The return `ITimer` instance will be implicitly rooted while the timer is still scheduled.

`TimeProvider.CreateTimer` captures the `ExecutionContext` and stores that with the `ITimer` for use in invoking `callback`
each time it's called. That capture can be suppressed with `ExecutionContext.SuppressFlow`.

## TimeProvider.GetElapsedTime(Int64) method

```csharp
public TimeSpan GetElapsedTime (long startingTimestamp);
```

Gets the elapsed time since the `startingTimestamp` value retrieved using `TimeProvider.GetTimestamp`.

Parameters:

- `startingTimestamp`: The timestamp marking the beginning of the time period.

Returns: A `TimeSpan` for the elapsed time between the starting timestamp and the time of this call.

To be added.

## TimeProvider.GetElapsedTime(Int64, Int64) method

```csharp
public TimeSpan GetElapsedTime (long startingTimestamp, long endingTimestamp);
```

Gets the elapsed time between two timestamps retrieved using `TimeProvider.GetTimestamp`.

Parameters:

- `startingTimestamp`: The timestamp marking the beginning of the time period.
- `endingTimestamp`: The timestamp marking the end of the time period.

Returns: A `TimeSpan` for the elapsed time between the starting and ending timestamps.

To be added.

## TimeProvider.GetLocalNow() method

```csharp
public DateTimeOffset GetLocalNow ();
```

Gets a `DateTimeOffset` value that is set to the current date and time according to this `TimeProvider`'s
notion of time based on `TimeProvider.GetUtcNow`, with the offset set to the `TimeProvider.LocalTimeZone`'s offset from Coordinated Universal Time (UTC).

Returns: A `DateTimeOffset` value that is set to the current date and time in the local time zone, according to this provider's notion of time.

To be added.

## TimeProvider.GetTimestamp() method

```csharp
public virtual long GetTimestamp ();
```

Gets the current high-frequency value designed to measure small time intervals with high accuracy in the timer mechanism.

Returns: A long integer representing the high-frequency counter value of the underlying timer mechanism.

The default implementation returns `Stopwatch.GetTimestamp`.

## TimeProvider.GetUtcNow() method

```csharp
public virtual DateTimeOffset GetUtcNow ();
```

Gets a `DateTimeOffset` value whose date and time are set to the current
Coordinated Universal Time (UTC) date and time and whose offset is Zero,
all according to this `TimeProvider`'s notion of time.

Returns: A `DateTimeOffset` value that is set to the current Coordinated Universal Time (UTC) date and time, according to this provider's notion of time.

The default implementation returns `DateTimeOffset.UtcNow`.
