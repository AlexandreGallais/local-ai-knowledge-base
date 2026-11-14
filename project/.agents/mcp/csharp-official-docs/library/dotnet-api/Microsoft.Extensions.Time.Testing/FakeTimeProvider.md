---
title: "FakeTimeProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Time.Testing/FakeTimeProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FakeTimeProvider class

Namespace: `Microsoft.Extensions.Time.Testing`

```csharp
public class FakeTimeProvider : TimeProvider
```

Represents a synthetic time provider that can be used to enable deterministic behavior in tests.

To be added.

## FakeTimeProvider.FakeTimeProvider() constructor

```csharp
public FakeTimeProvider ();
```

Initializes a new instance of the `FakeTimeProvider` class.

This creates a provider whose time is initially set to midnight January 1st 2000.
The provider is set to not automatically advance time each time it is read.

## FakeTimeProvider.FakeTimeProvider(DateTimeOffset) constructor

```csharp
public FakeTimeProvider (DateTimeOffset startDateTime);
```

Initializes a new instance of the `FakeTimeProvider` class.

Parameters:

- `startDateTime`: The initial time and date reported by the provider.

The provider is set to not automatically advance time each time it is read.

## FakeTimeProvider.AutoAdvanceAmount property

```csharp
public TimeSpan AutoAdvanceAmount { get; set; }
```

Gets or sets the amount of time by which time advances whenever the clock is read.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: The time value is less than `TimeSpan.Zero`.

This defaults to `TimeSpan.Zero`.

## FakeTimeProvider.LocalTimeZone property

```csharp
public override TimeZoneInfo LocalTimeZone { get; }
```

To be added.

Returns: To be added.

To be added.

## FakeTimeProvider.Start property

```csharp
public DateTimeOffset Start { get; }
```

Gets the starting date and time for this provider.

Returns: To be added.

To be added.

## FakeTimeProvider.TimestampFrequency property

```csharp
public override long TimestampFrequency { get; }
```

Gets the amount by which the value from `FakeTimeProvider.GetTimestamp` increments per second.

Returns: To be added.

This is fixed to the value of `TimeSpan.TicksPerSecond`.

## FakeTimeProvider.AdjustTime(DateTimeOffset) method

```csharp
public void AdjustTime (DateTimeOffset value);
```

Sets the date and time in the UTC time zone.

Parameters:

- `value`: The date and time in the UTC time zone.

This method updates the current time, and has no impact on outstanding
timers. This is similar to what happens in a real system when the system's
time is changed.

## FakeTimeProvider.Advance(TimeSpan) method

```csharp
public void Advance (TimeSpan delta);
```

Advances time by a specific amount.

Parameters:

- `delta`: The amount of time to advance the clock by.

Exceptions:

- `ArgumentOutOfRangeException`: The time value is less than `TimeSpan.Zero`.

Advancing time affects the timers created from this provider, and all other operations that are directly or
indirectly using this provider as a time source. Whereas when using `TimeProvider.System`, time
marches forward automatically in hardware, for the fake time provider the application is responsible for
doing this explicitly by calling this method.

## FakeTimeProvider.CreateTimer(TimerCallback, Object, TimeSpan, TimeSpan) method

```csharp
public override System.Threading.ITimer CreateTimer (System.Threading.TimerCallback callback, object? state, TimeSpan dueTime, TimeSpan period);
```

To be added.

Parameters:

- `callback`: To be added.
- `state`: To be added.
- `dueTime`: To be added.
- `period`: To be added.

Returns: To be added.

To be added.

## FakeTimeProvider.GetTimestamp() method

```csharp
public override long GetTimestamp ();
```

To be added.

Returns: To be added.

To be added.

## FakeTimeProvider.GetUtcNow() method

```csharp
public override DateTimeOffset GetUtcNow ();
```

To be added.

Returns: To be added.

To be added.

## FakeTimeProvider.SetLocalTimeZone(TimeZoneInfo) method

```csharp
public void SetLocalTimeZone (TimeZoneInfo localTimeZone);
```

Sets the local time zone.

Parameters:

- `localTimeZone`: The local time zone.

To be added.

## FakeTimeProvider.SetUtcNow(DateTimeOffset) method

```csharp
public void SetUtcNow (DateTimeOffset value);
```

Advances the date and time in the UTC time zone.

Parameters:

- `value`: The date and time in the UTC time zone.

Exceptions:

- `ArgumentOutOfRangeException`: The supplied time value is before the current time.

This method simply advances time. If the time is set forward beyond the
trigger point of any outstanding timers, those timers will immediately trigger.
This is unlike the `FakeTimeProvider.AdjustTime` method, which has no impact
on timers.

## FakeTimeProvider.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation this provider's idea of current time.

Returns: A string representing the provider's current time.

To be added.
