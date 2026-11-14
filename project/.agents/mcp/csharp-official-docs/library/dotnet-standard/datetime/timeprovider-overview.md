---
title: "What is the TimeProvider class"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/timeprovider-overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What is TimeProvider?

`System.TimeProvider` is an abstraction of time that provides a point in time as a `System.DateTimeOffset` type. By using `TimeProvider`, you ensure that your code is testable and predictable. `TimeProvider` is available on the following frameworks:

| Framework | Notes |
|---|---|
| .NET 8+ | Included in the framework. |
| .NET 5 - .NET 7 | Provided in the `Microsoft.Bcl.TimeProvider` NuGet package. |
| .NET Framework 4.6.2+ | Provided in the `Microsoft.Bcl.TimeProvider` NuGet package. |
| .NET Standard 2.0 | Provided in the `Microsoft.Bcl.TimeProvider` NuGet package. |

The `System.TimeProvider` class defines the following capabilities:

- Provides access to the date and time through `System.TimeProvider.GetUtcNow` and `System.TimeProvider.GetLocalNow`.
- High-frequency timestamps with `System.TimeProvider.GetTimestamp`.
- Measure time between two timestamps with `System.TimeProvider.GetElapsedTime*`.
- High-resolution timers with `System.TimeProvider.CreateTimer(System.Threading.TimerCallback,System.Object,System.TimeSpan,System.TimeSpan)`.
- Get the current timezone with `System.TimeProvider.LocalTimeZone`.

## Default implementation

.NET provides an implementation of `System.TimeProvider` through the `System.TimeProvider.System` property, with the following characteristics:

- Date and time are calculated by using `System.DateTimeOffset.UtcNow` and `System.TimeZoneInfo.Local`.
- Timestamps are provided by `System.Diagnostics.Stopwatch`.
- Timers are implemented through an internal class and exposed as `System.Threading.ITimer`.

The following example shows how to use `System.TimeProvider` to get the current date and time:

```csharp
Console.WriteLine($"Local: {TimeProvider.System.GetLocalNow()}");
Console.WriteLine($"Utc:   {TimeProvider.System.GetUtcNow()}");

/* This example produces output similar to the following:
 *
 * Local: 12/5/2024 10:41:14 AM -08:00
 * Utc:   12/5/2024 6:41:14 PM +00:00
*/
```
```vb
Console.WriteLine($"Local: {TimeProvider.System.GetLocalNow()}")
Console.WriteLine($"Utc:   {TimeProvider.System.GetUtcNow()}")

' This example produces output similar to the following
'
' Local: 12/5/2024 10:41:14 AM -08:00
' Utc:   12/5/2024 6:41:14 PM +00:00
```
The following example shows how to capture elapsed time by using `System.TimeProvider.GetTimestamp`:

```csharp
long stampStart = TimeProvider.System.GetTimestamp();
Console.WriteLine($"Starting timestamp: {stampStart}");

long stampEnd = TimeProvider.System.GetTimestamp();
Console.WriteLine($"Ending timestamp:   {stampEnd}");

Console.WriteLine($"Elapsed time: {TimeProvider.System.GetElapsedTime(stampStart, stampEnd)}");
Console.WriteLine($"Nanoseconds: {TimeProvider.System.GetElapsedTime(stampStart, stampEnd).TotalNanoseconds}"); 

/* This example produces output similar to the following:
 *
 * Starting timestamp: 55185546133
 * Ending timestamp:   55185549929
 * Elapsed time: 00:00:00.0003796
 * Nanoseconds: 379600
*/
```
```vb
Dim stampStart As Long = TimeProvider.System.GetTimestamp()
Console.WriteLine($"Starting timestamp: {stampStart}")

Dim stampEnd As Long = TimeProvider.System.GetTimestamp()
Console.WriteLine($"Ending timestamp:   {stampEnd}")

Console.WriteLine($"Elapsed time: {TimeProvider.System.GetElapsedTime(stampStart, stampEnd)}")
Console.WriteLine($"Nanoseconds: {TimeProvider.System.GetElapsedTime(stampStart, stampEnd).TotalNanoseconds}")

' This example produces output similar to the following:
'
' Starting timestamp: 55185546133
' Ending timestamp:   55185549929
' Elapsed time: 00:00:00.0003796
' Nanoseconds: 379600
```
## FakeTimeProvider implementation

The **Microsoft.Extensions.TimeProvider.Testing** NuGet package provides a controllable `TimeProvider` implementation designed for unit testing.

The following list describes some of the capabilities of the `Microsoft.Extensions.Time.Testing.FakeTimeProvider` class:

- Set a specific date and time.
- Automatically advance the date and time by a specified amount whenever the date and time is read.
- Manually advance the date and time.

## Custom implementation

While FakeTimeProvider covers most scenarios that require predictability with time, you can still provide your own implementation. Create a new class that derives from `System.TimeProvider` and override members to control how time is provided. For example, the following class only provides a single date, the date of the moon landing:

```csharp
public class MoonLandingTimeProviderPST: TimeProvider
{
    // July 20, 1969, at 20:17:40 UTC
    private readonly DateTimeOffset _specificDateTime = new(1969, 7, 20, 20, 17, 40, TimeZoneInfo.Utc.BaseUtcOffset);

    public override DateTimeOffset GetUtcNow() => _specificDateTime;

    public override TimeZoneInfo LocalTimeZone => TimeZoneInfo.FindSystemTimeZoneById("PST");
}
```
```vb
Public Class MoonLandingTimeProviderPST
    Inherits TimeProvider

    'July 20, 1969, at 20:17:40 UTC
    Private ReadOnly _specificDateTime As New DateTimeOffset(1969, 7, 20, 20, 17, 40, TimeZoneInfo.Utc.BaseUtcOffset)

    Public Overrides Function GetUtcNow() As DateTimeOffset
        Return _specificDateTime
    End Function

    Public Overrides ReadOnly Property LocalTimeZone As TimeZoneInfo
        Get
            Return TimeZoneInfo.FindSystemTimeZoneById("PST")
        End Get
    End Property

End Class
```
If code using this class calls `MoonLandingTimeProviderPST.GetUtcNow`, the date of the moon landing in UTC is returned. If `MoonLandingTimeProviderPST.GetLocalNow` is called, the base class applies `MoonLandingTimeProviderPST.LocalTimeZone` to `GetUtcNow` and returns the moon landing date and time in the PST time zone.

To demonstrate the usefulness of controlling time, consider the following example. Let's say that you're writing a calendar app that sends a greeting to the user when the app is first opened each day. The app says a special greeting when the current day has an event associated with it, such as the anniversary of the moon landing.

```csharp
public static class CalendarHelper
{
    static readonly DateTimeOffset MoonLandingDateTime = new(1969, 7, 20, 20, 17, 40, TimeZoneInfo.Utc.BaseUtcOffset);
    
    public static void SendGreeting(TimeProvider currentTime, string name)
    {
        DateTimeOffset localTime = currentTime.GetLocalNow();

        Console.WriteLine($"Good morning, {name}!");
        Console.WriteLine($"The date is {localTime.Date:d} and the day is {localTime.Date.DayOfWeek}.");

        if (localTime.Date.Month == MoonLandingDateTime.Date.Month
            && localTime.Date.Day == MoonLandingDateTime.Date.Day)
        {
            Console.WriteLine("Did you know that on this day in 1969 humans landed on the Moon?");
        }

        Console.WriteLine($"I hope you enjoy your day!");
    }
}
```
```vb
Public Module CalendarHelper

    ReadOnly MoonLandingDateTime As DateTimeOffset = #7/20/1969 20:17:40#

    Public Sub SendGreeting(currentTime As TimeProvider, name As String)

        Dim localTime As DateTimeOffset = currentTime.GetLocalNow()

        Console.WriteLine($"Good morning, {name}!")
        Console.WriteLine($"The date is {localTime.Date:d} and the day is {localTime.Date.DayOfWeek}.")

        If (localTime.Date.Month = MoonLandingDateTime.Date.Month _
            And localTime.Date.Day = MoonLandingDateTime.Date.Day) Then

            Console.WriteLine("Did you know that on this day in 1969 humans landed on the Moon?")
        End If

        Console.WriteLine($"I hope you enjoy your day!")

    End Sub

End Module
```
You might be inclined to write the previous code with `System.DateTime` or `System.DateTimeOffset` to get the current date and time, instead of `System.TimeProvider`. But with unit testing, it's hard to work around `System.DateTime` or `System.DateTimeOffset` directly. You would need to either run the tests on the day and month of the moon landing or further abstract the code into smaller but testable units.

The normal operation of your app uses `TimeProvider.System` to retrieve the current date and time:

```csharp
CalendarHelper.SendGreeting(TimeProvider.System, "Eric Solomon");

/* This example produces output similar to the following:
 *
 * Good morning, Eric Solomon! 
 * The date is 12/5/2024 and the day is Thursday. 
 * I hope you enjoy your day! 
*/
```
```vb
CalendarHelper.SendGreeting(TimeProvider.System, "Eric Solomon")

' This example produces output similar to the following:
'
' Good morning, Eric Solomon! 
' The date is 12/5/2024 and the day is Thursday. 
' I hope you enjoy your day! 
```
And unit tests can be written to test specific scenarios, such as testing the anniversary of the moon landing:

```csharp
CalendarHelper.SendGreeting(new MoonLandingTimeProviderPST(), "Eric Solomon");

/* This example produces output similar to the following:
 *
 * Good morning, Eric Solomon!
 * The date is 7/20/1969 and the day is Sunday.
 * Did you know that on this day in 1969 humans landed on the Moon?
 * I hope you enjoy your day!
*/
```
```vb
CalendarHelper.SendGreeting(New MoonLandingTimeProviderPST(), "Eric Solomon")

' This example produces output similar to the following:
'
' Good morning, Eric Solomon!
' The date is 7/20/1969 and the day is Sunday.
' Did you know that on this day in 1969 humans landed on the Moon?
' I hope you enjoy your day!
```
## Use with .NET

Starting with .NET 8, the runtime library provides the `System.TimeProvider` class. Older versions of .NET or libraries targeting .NET Standard 2.0 must reference the `Microsoft.Bcl.TimeProvider` NuGet package.

The following methods related to asynchronous programming work with `TimeProvider`:

- `System.Threading.CancellationTokenSource.#ctor(System.TimeSpan,System.TimeProvider)`
- `System.Threading.Tasks.Task.Delay(System.TimeSpan,System.TimeProvider)`
- `System.Threading.Tasks.Task.Delay(System.TimeSpan,System.TimeProvider,System.Threading.CancellationToken)`
- `System.Threading.Tasks.Task.WaitAsync(System.TimeSpan,System.TimeProvider)`
- `System.Threading.Tasks.Task.WaitAsync(System.TimeSpan,System.TimeProvider,System.Threading.CancellationToken)`

## Use with .NET Framework

The `Microsoft.Bcl.TimeProvider` NuGet package implements `System.TimeProvider`.

Support for working with `TimeProvider` in asynchronous programming scenarios was added through the following extension methods:

- `System.Threading.Tasks.TimeProviderTaskExtensions.CreateCancellationTokenSource(System.TimeProvider,System.TimeSpan)`
- `System.Threading.Tasks.TimeProviderTaskExtensions.Delay(System.TimeProvider,System.TimeSpan,System.Threading.CancellationToken)`
- `System.Threading.Tasks.TimeProviderTaskExtensions.WaitAsync(System.Threading.Tasks.Task,System.TimeSpan,System.TimeProvider,System.Threading.CancellationToken)`
- `System.Threading.Tasks.TimeProviderTaskExtensions.WaitAsync``1(System.Threading.Tasks.Task{``0},System.TimeSpan,System.TimeProvider,System.Threading.CancellationToken)`
