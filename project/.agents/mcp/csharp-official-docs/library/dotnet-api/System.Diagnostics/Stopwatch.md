---
title: "Stopwatch class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Stopwatch.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stopwatch class

Namespace: `System.Diagnostics`

```csharp
public class Stopwatch
```

Provides a set of methods and properties that you can use to accurately measure elapsed time.

#### Remarks
A `Stopwatch` instance can measure elapsed time for one interval, or the total of elapsed time across multiple intervals. In a typical `Stopwatch` scenario, you call the `Stopwatch.Start` method, then eventually call the `Stopwatch.Stop` method, and then you check elapsed time using the `Elapsed` property.

A `Stopwatch` instance is either running or stopped; use `Stopwatch.IsRunning` to determine the current state of a `Stopwatch`. Use `Stopwatch.Start` to begin measuring elapsed time; use `Stopwatch.Stop` to stop measuring elapsed time. Query the elapsed time value through the properties `Stopwatch.Elapsed`, `Stopwatch.ElapsedMilliseconds`, or `Stopwatch.ElapsedTicks`. You can query the elapsed time properties while the instance is running or stopped. The elapsed time properties steadily increase while the `Stopwatch` is running; they remain constant when the instance is stopped.

By default, the elapsed time value of a `Stopwatch` instance equals the total of all measured time intervals. Each call to `Stopwatch.Start` begins counting at the cumulative elapsed time; each call to `Stopwatch.Stop` ends the current interval measurement and freezes the cumulative elapsed time value. Use the `Stopwatch.Reset` method to clear the cumulative elapsed time in an existing `Stopwatch` instance.

The `Stopwatch` measures elapsed time by counting timer ticks in the underlying timer mechanism. If the installed hardware and operating system support a high-resolution performance counter, then the `Stopwatch` class uses that counter to measure elapsed time. Otherwise, the `Stopwatch` class uses the system timer to measure elapsed time. Use the `Frequency` and `IsHighResolution` fields to determine the precision and resolution of the `Stopwatch` timing implementation.

The `Stopwatch` class assists the manipulation of timing-related performance counters within managed code. Specifically, the `Frequency` field and `Stopwatch.GetTimestamp` method can be used in place of the unmanaged Windows APIs `QueryPerformanceFrequency` and `QueryPerformanceCounter`.

> **Note:**
>  On a multiprocessor computer, it does not matter which processor the thread runs on. However, because of bugs in the BIOS or the Hardware Abstraction Layer (HAL), you can get different timing results on different processors. To specify processor affinity for a thread, use the `ProcessThread.ProcessorAffinity` method.

#### Examples
The following example demonstrates how to use the `Stopwatch` class to determine the execution time for an application.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source1.cs._

The following example demonstrates the use of the `Stopwatch` class to calculate performance data.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source.cs._

## Stopwatch.Stopwatch() constructor

```csharp
public Stopwatch ();
```

Initializes a new instance of the `Stopwatch` class.

#### Remarks
The returned `Stopwatch` instance is stopped, and the elapsed time property of the instance is zero.

Use the `Stopwatch.Start` method to begin measuring elapsed time with the new `Stopwatch` instance. Use the `Stopwatch.StartNew` method to initialize a new `Stopwatch` instance and immediately start it.

#### Examples
The following example initializes a `Stopwatch` instance by using a simple class constructor.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source1.cs._

## Stopwatch.Elapsed property

```csharp
public TimeSpan Elapsed { get; }
```

Gets the total elapsed time measured by the current instance.

Returns: A read-only `TimeSpan` representing the total elapsed time measured by the current instance.

#### Remarks
In a typical `Stopwatch` scenario, you call the `Stopwatch.Start` method, then eventually call the `Stopwatch.Stop` method, and then you check elapsed time using the `Elapsed` property.

Use the `Elapsed` property to retrieve the elapsed time value using `TimeSpan` methods and properties. For example, you can format the returned `TimeSpan` instance into a text representation, or pass it to another class that requires a `TimeSpan` parameter.

You can query the properties `Stopwatch.Elapsed`, `Stopwatch.ElapsedMilliseconds`, and `Stopwatch.ElapsedTicks` while the `Stopwatch` instance is running or stopped. The elapsed time properties steadily increase while the `Stopwatch` is running; they remain constant when the instance is stopped.

By default, the elapsed time value of a `Stopwatch` instance equals the total of all measured time intervals. Each call to `Stopwatch.Start` begins counting at the cumulative elapsed time; each call to `Stopwatch.Stop` ends the current interval measurement and freezes the cumulative elapsed time value. Use the `Stopwatch.Reset` method to clear the cumulative elapsed time in an existing `Stopwatch` instance.

#### Examples
The following example demonstrates how to use the `Elapsed` property to determine the execution time for an application.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source1.cs._

## Stopwatch.ElapsedMilliseconds property

```csharp
public long ElapsedMilliseconds { get; }
```

Gets the total elapsed time measured by the current instance, in milliseconds.

Returns: A read-only long integer representing the total number of milliseconds measured by the current instance.

#### Remarks
This property represents elapsed time rounded down to the nearest whole millisecond value. For higher precision measurements, use the `Stopwatch.Elapsed` or `Stopwatch.ElapsedTicks` properties.

You can query the properties `Stopwatch.Elapsed`, `Stopwatch.ElapsedMilliseconds`, and `Stopwatch.ElapsedTicks` while the `Stopwatch` instance is running or stopped. The elapsed time properties steadily increase while the `Stopwatch` is running; they remain constant when the instance is stopped.

By default, the elapsed time value of a `Stopwatch` instance equals the total of all measured time intervals. Each call to `Stopwatch.Start` begins counting at the cumulative elapsed time; each call to `Stopwatch.Stop` ends the current interval measurement and freezes the cumulative elapsed time value. Use the `Stopwatch.Reset` method to clear the cumulative elapsed time in an existing `Stopwatch` instance.

#### Examples
The following example uses the `Stopwatch` class to measure the performance of four different implementations for parsing an integer from a string. This code example is part of a larger example provided for the `Stopwatch` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source.cs._

## Stopwatch.ElapsedTicks property

```csharp
public long ElapsedTicks { get; }
```

Gets the total elapsed time measured by the current instance, in timer ticks.

Returns: A read-only long integer representing the total number of timer ticks measured by the current instance.

#### Remarks
This property represents the number of elapsed ticks in the underlying timer mechanism. A tick is the smallest unit of time that the `Stopwatch` timer can measure. Use the `Frequency` field to convert the `Stopwatch.ElapsedTicks` value into a number of seconds.

You can query the properties `Stopwatch.Elapsed`, `Stopwatch.ElapsedMilliseconds`, and `Stopwatch.ElapsedTicks` while the `Stopwatch` instance is running or stopped. The elapsed time properties steadily increase while the `Stopwatch` is running; they remain constant when the instance is stopped.

By default, the elapsed time value of a `Stopwatch` instance equals the total of all measured time intervals. Each call to `Stopwatch.Start` begins counting at the cumulative elapsed time; each call to `Stopwatch.Stop` ends the current interval measurement and freezes the cumulative elapsed time value. Use the `Stopwatch.Reset` method to clear the cumulative elapsed time in an existing `Stopwatch` instance.

> **Note:**
>  `Stopwatch` ticks are different from `DateTime.Ticks`. Each tick in the `DateTime.Ticks` value represents one 100-nanosecond interval. Each tick in the `Stopwatch.ElapsedTicks` value represents the time interval equal to 1 second divided by the `Frequency`.

#### Examples
The following example uses the `Stopwatch` class to measure the performance of four different implementations for parsing an integer from a string. This code example is part of a larger example provided for the `Stopwatch` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source.cs._

## Stopwatch.IsRunning property

```csharp
public bool IsRunning { get; }
```

Gets a value indicating whether the `Stopwatch` timer is running.

Returns: `true` if the `Stopwatch` instance is currently running and measuring elapsed time for an interval; otherwise, `false`.

#### Remarks
A `Stopwatch` instance begins running with a call to `Stopwatch.Start` or `Stopwatch.StartNew`. The instance stops running with a call to `Stopwatch.Stop` or `Stopwatch.Reset`.

## Stopwatch.GetElapsedTime(Int64) method

```csharp
public static TimeSpan GetElapsedTime (long startingTimestamp);
```

Gets the elapsed time since the `startingTimestamp` value retrieved using `Stopwatch.GetTimestamp`.

Parameters:

- `startingTimestamp`: The timestamp marking the beginning of the time period.

Returns: A `TimeSpan` for the elapsed time between the starting timestamp and the time of this call.

To be added.

## Stopwatch.GetElapsedTime(Int64, Int64) method

```csharp
public static TimeSpan GetElapsedTime (long startingTimestamp, long endingTimestamp);
```

Gets the elapsed time between two timestamps retrieved using `Stopwatch.GetTimestamp`.

Parameters:

- `startingTimestamp`: The timestamp marking the beginning of the time period.
- `endingTimestamp`: The timestamp marking the end of the time period.

Returns: A `TimeSpan` for the elapsed time between the starting and ending timestamps.

To be added.

## Stopwatch.GetTimestamp() method

```csharp
public static long GetTimestamp ();
```

Gets the current number of ticks in the timer mechanism.

Returns: A long integer representing the tick counter value of the underlying timer mechanism.

#### Remarks
If the `Stopwatch` class uses a high-resolution performance counter, `Stopwatch.GetTimestamp` returns the current value of that counter. If the `Stopwatch` class uses the system timer, `Stopwatch.GetTimestamp` returns the current `Ticks` property of the `DateTime.UtcNow` instance.

#### Examples
The following example illustrates the use of the `Stopwatch.GetTimestamp` method to update a performance counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounter/NextValue/elapsedtime.cs._

## Stopwatch.Reset() method

```csharp
public void Reset ();
```

Stops time interval measurement and resets the elapsed time to zero.

#### Remarks
A `Stopwatch` instance calculates and retains the cumulative elapsed time across multiple time intervals, until the instance is reset. Use `Stopwatch.Stop` to stop the current interval measurement and retain the cumulative elapsed time value. Use `Stopwatch.Reset` to stop any interval measurement in progress and clear the elapsed time value.

## Stopwatch.Restart() method

```csharp
public void Restart ();
```

Stops time interval measurement, resets the elapsed time to zero, and starts measuring elapsed time.

#### Remarks
A `Stopwatch` instance calculates and retains the cumulative elapsed time across multiple time intervals, until the instance is reset or restarted. Use `Stopwatch.Stop` to stop the current interval measurement and retain the cumulative elapsed time value. Use `Stopwatch.Reset` to stop any interval measurement in progress and clear the elapsed time value. Use `Stopwatch.Restart` to stop current interval measurement and start a new interval measurement.

## Stopwatch.Start() method

```csharp
public void Start ();
```

Starts, or resumes, measuring elapsed time for an interval.

#### Remarks
In a typical `Stopwatch` scenario, you call the `Stopwatch.Start` method, then eventually call the `Stopwatch.Stop` method, and then you check elapsed time using the `Elapsed` property.

Once started, a `Stopwatch` timer measures the current interval, in elapsed timer ticks, until the instance is stopped or reset. Starting a `Stopwatch` that is already running does not change the timer state or reset the elapsed time properties.

When a `Stopwatch` instance measures more than one interval, the `Stopwatch.Start` method resumes measuring time from the current elapsed time value. A `Stopwatch` instance calculates and retains the cumulative elapsed time across multiple time intervals, until the instance is reset. Use the `Stopwatch.Reset` method before calling `Stopwatch.Start` to clear the cumulative elapsed time in a `Stopwatch` instance. Use the `Stopwatch.Restart` method to `Stopwatch.Reset` and `Stopwatch.Start` the `Stopwatch` with a single command.

#### Examples
The following example demonstrates how to use the `Stopwatch.Start` method to start a timer that measures the execution time of an application.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source1.cs._

## Stopwatch.StartNew() method

```csharp
public static System.Diagnostics.Stopwatch StartNew ();
```

Initializes a new `Stopwatch` instance, sets the elapsed time property to zero, and starts measuring elapsed time.

Returns: A `Stopwatch` that has just begun measuring elapsed time.

#### Remarks
This method is equivalent to calling the `Stopwatch` constructor and then calling `Stopwatch.Start` on the new instance.

#### Examples
The following example uses the `Stopwatch` class to measure the performance of four different implementations for parsing an integer from a string. This code example is part of a larger example provided for the `Stopwatch` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source.cs._
