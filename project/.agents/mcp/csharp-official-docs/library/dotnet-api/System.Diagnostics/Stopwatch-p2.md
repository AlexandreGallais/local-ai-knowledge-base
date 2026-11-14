---
title: "Stopwatch class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Stopwatch.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stopwatch class (part 2 of 2)

## Stopwatch.Stop() method

```csharp
public void Stop ();
```

Stops measuring elapsed time for an interval.

#### Remarks
In a typical `Stopwatch` scenario, you call the `Stopwatch.Start` method, then eventually call the `Stopwatch.Stop` method, and then you check elapsed time using the `Elapsed` property.

The `Stopwatch.Stop` method ends the current time interval measurement. Stopping a `Stopwatch` that is not running does not change the timer state or reset the elapsed time properties.

When a `Stopwatch` instance measures more than one interval, the `Stopwatch.Stop` method is equivalent to pausing the elapsed time measurement. A subsequent call to `Stopwatch.Start` resumes measuring time from the current elapsed time value. Use the `Stopwatch.Reset` method to clear the cumulative elapsed time in a `Stopwatch` instance.

#### Examples
The following example demonstrates how to use the `Stopwatch.Stop` method to stop a timer that measures the execution time of an application.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source1.cs._

## Stopwatch.ToString() method

```csharp
public override string ToString ();
```

Returns the `Stopwatch.Elapsed` time as a string.

Returns: The elapsed time string in the same format used by `TimeSpan.ToString`.

To be added.

## Stopwatch.Frequency field

```csharp
public static readonly long Frequency;
```

Gets the frequency of the timer as the number of ticks per second. This field is read-only.

#### Remarks
The timer frequency indicates the timer precision and resolution. For example, a timer frequency of 2 million ticks per second equals a timer resolution of 500 nanoseconds per tick. In other words, because one second equals 1 billion nanoseconds, a timer frequency of 2 million ticks per second is equivalent to 2 million ticks per 1 billion nanoseconds, which can be further simplified to 1 tick per 500 nanoseconds.

The `Frequency` value depends on the resolution of the underlying timing mechanism. If the installed hardware and operating system support a high-resolution performance counter, then the `Frequency` value reflects the frequency of that counter. Otherwise, the `Frequency` value is based on the system timer frequency.

Because the `Stopwatch` frequency depends on the installed hardware and operating system, the `Frequency` value remains constant while the system is running.

#### Examples
The following example displays the frequency and resolution of a `Stopwatch` timer. This code example is part of a larger example provided for the `Stopwatch` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source.cs._

## Stopwatch.IsHighResolution field

```csharp
public static readonly bool IsHighResolution;
```

Indicates whether the timer is based on a high-resolution performance counter. This field is read-only.

#### Remarks
The timer used by the `Stopwatch` class depends on the system hardware and operating system. `IsHighResolution` is `true` if the `Stopwatch` timer is based on a high-resolution performance counter. Otherwise, `IsHighResolution` is `false`, which indicates that the `Stopwatch` timer is based on the system timer.

#### Examples
The following example displays the frequency and resolution of a `Stopwatch` timer. This code example is part of a larger example provided for the `Stopwatch` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Stopwatch/Overview/source.cs._
