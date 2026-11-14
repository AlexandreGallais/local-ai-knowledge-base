---
title: "TimeZone class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZone.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZone class

Namespace: `System`

```csharp
public abstract class TimeZone
```

Represents a time zone.

To be added.

## TimeZone.TimeZone() constructor

```csharp
protected TimeZone ();
```

Initializes a new instance of the `TimeZone` class.

To be added.

## TimeZone.CurrentTimeZone property

```csharp
public static TimeZone CurrentTimeZone { get; }
```

Gets the time zone of the current computer.

Returns: A `TimeZone` object that represents the current local time zone.

#### Remarks
The `CurrentTimeZone` property corresponds to the `Local` property. Whenever possible, use the `Local` property.

## TimeZone.DaylightName property

```csharp
public abstract string DaylightName { get; }
```

Gets the daylight saving time zone name.

Returns: The daylight saving time zone name.

#### Remarks
If daylight saving time is not used in the time zone, an empty string ("") is returned.

The `DaylightName` property corresponds to the `DaylightName` property. Whenever possible, use the `DaylightName` property.

## TimeZone.StandardName property

```csharp
public abstract string StandardName { get; }
```

Gets the standard time zone name.

Returns: The standard time zone name.

Exceptions:

- `ArgumentNullException`: An attempt was made to set this property to `null`.

#### Remarks
The `StandardName` property corresponds to the `StandardName` property. Whenever possible, use the `StandardName` property.

## TimeZone.GetDaylightChanges(Int32) method

```csharp
public abstract System.Globalization.DaylightTime GetDaylightChanges (int year);
```

Returns the daylight saving time period for a particular year.

Parameters:

- `year`: The year that the daylight saving time period applies to.

Returns: A `DaylightTime` object that contains the start and end date for daylight saving time in `year`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is less than 1 or greater than 9999.

#### Remarks
Only one daylight saving time period per year is supported.

If daylight saving time is not used in the current time zone, the return value is a `DaylightTime` object, where the value of `DaylightTime.Start` and `DaylightTime.End` is `MinValue`, and the value of `DaylightTime.Delta` is a `TimeSpan` initialized to 0 ticks.

## TimeZone.GetUtcOffset(DateTime) method

```csharp
public abstract TimeSpan GetUtcOffset (DateTime time);
```

Returns the Coordinated Universal Time (UTC) offset for the specified local time.

Parameters:

- `time`: A date and time value.

Returns: The Coordinated Universal Time (UTC) offset from `time`.

#### Remarks
This method returns the offset, or difference, between the `time` parameter and Coordinated Universal Time (UTC). That is:

`time` = UTC + offset

The method interprets the time zone of `time` based on its `Kind` property. If the value of the `Kind` property is `Local` or `Unspecified`, the method returns the offset of the local time zone. If the value of the `Kind` property is `Utc`, the method returns an offset equal to `Zero`.

If the local time zone observes daylight saving time, `TimeZone.GetUtcOffset` applies the current adjustment rule to `time` when determining the offset of the local time zone. That is, the offset returned by `TimeZone.GetUtcOffset` reflects whether `time` falls in the time zone's standard time or its daylight saving time.

> **Note:**
>  The `TimeZone.GetUtcOffset` method recognizes only the current daylight saving time adjustment rule for the local time zone. As a result, it is guaranteed to accurately return the UTC offset of a local time only during the period in which the latest adjustment rule is in effect. It may return inaccurate results if `time` is a historic date and time value that was subject to a previous adjustment rule.

The `TimeZone.GetUtcOffset` method corresponds to the `TimeZoneInfo.GetUtcOffset` method. Whenever possible, use the `TimeZoneInfo.GetUtcOffset` method.

Because the date and time value represented by `time` and this value's offset from UTC are not tightly coupled, a local or unspecified date and time value can return a different offset value when run on different computers or when run on the same computer under different time zones. If this behavior is undesirable, use a `DateTimeOffset` value instead. The `DateTimeOffset` data type tightly couples a date and time value with its offset from UTC.

## TimeZone.IsDaylightSavingTime(DateTime) method

```csharp
public virtual bool IsDaylightSavingTime (DateTime time);
```

Returns a value indicating whether the specified date and time is within a daylight saving time period.

Parameters:

- `time`: A date and time.

Returns: `true` if `time` is in a daylight saving time period; otherwise, `false`.

#### Remarks
The year to which the daylight saving time period applies is derived from the `time` parameter.

Because the `TimeZone` class supports a single daylight saving time adjustment rule, the `IsDaylightSavingTime` method applies the current adjustment rule to any date, regardless of whether the adjustment rule was in effect on that date. Assuming that the operating system itself has accurate historic daylight saving time data, a more accurate result is available by using the `TimeZoneInfo.IsDaylightSavingTime` method. Whenever possible, use the `TimeZoneInfo.IsDaylightSavingTime` method.

## TimeZone.IsDaylightSavingTime(DateTime, DaylightTime) method

```csharp
public static bool IsDaylightSavingTime (DateTime time, System.Globalization.DaylightTime daylightTimes);
```

Returns a value indicating whether the specified date and time is within the specified daylight saving time period.

Parameters:

- `time`: A date and time.
- `daylightTimes`: A daylight saving time period.

Returns: `true` if `time` is in `daylightTimes`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `daylightTimes` is `null`.

#### Remarks
The `TimeZoneInfo.IsDaylightSavingTime` method provides the same functionality as this overload of the `TimeZone.IsDaylightSavingTime` method. Whenever possible, use the `TimeZoneInfo.IsDaylightSavingTime` method.

## TimeZone.ToLocalTime(DateTime) method

```csharp
public virtual DateTime ToLocalTime (DateTime time);
```

Returns the local time that corresponds to a specified date and time value.

Parameters:

- `time`: A Coordinated Universal Time (UTC) time.

Returns: A `DateTime` object whose value is the local time that corresponds to `time`.

#### Remarks
The following table shows the relationship between the `time` parameter and the `DateTime` value returned by this method.

|`time` parameter|Behavior|Return value|
|----------------------|--------------|------------------|
|A Coordinated Universal Time (UTC) time (`Utc`).|Converts the time from UTC to the local time.|A `DateTime` object whose value is the local time that corresponds to `time`.|
|A local time (`Local`).|No conversion necessary.|The same `DateTime` value represented by the `time` parameter.|
|An unspecified time (`Unspecified`).|Assumes that the time is UTC and converts it from UTC to the local time.|A `DateTime` object whose value is the local time that corresponds to `time`.|

If the local time zone observes daylight saving time, `TimeZone.ToLocalTime` applies the current adjustment rule to `time` when performing the conversion.

> **Note:**
>  The `TimeZone.ToLocalTime` method recognizes only the current daylight saving time adjustment rule for the local time zone. As a result, it is guaranteed to accurately return the local time corresponding to a particular UTC time only during the period in which the latest adjustment rule is in effect. It may return inaccurate results if `time` is a historic date and time value that was subject to a previous adjustment rule.

The `TimeZone.ToLocalTime` method corresponds to the `TimeZoneInfo.ConvertTimeFromUtc` method with its `destinationTimeZone` parameter set to `TimeZoneInfo.Local`. Whenever possible, use the `TimeZoneInfo.ConvertTimeFromUtc` method.

## TimeZone.ToUniversalTime(DateTime) method

```csharp
public virtual DateTime ToUniversalTime (DateTime time);
```

Returns the Coordinated Universal Time (UTC) that corresponds to a specified time.

Parameters:

- `time`: A date and time.

Returns: A `DateTime` object whose value is the Coordinated Universal Time (UTC) that corresponds to `time`.

#### Remarks
If the local time zone observes daylight saving time, `TimeZone.ToUniversalTime` applies the current adjustment rule to the `time` parameter when performing the conversion.

> **Note:**
>  The `TimeZone.ToUniversalTime` method recognizes only the current daylight saving time adjustment rule for the local time zone. As a result, it is guaranteed to accurately return the Coordinated Universal Time (UTC) corresponding to a particular local time only during the period in which the latest adjustment rule is in effect. It may return inaccurate results if `time` is a historic date and time value that was subject to a previous adjustment rule.

If the `time` parameter is an ambiguous time, the method assumes that it is a standard time. (An ambiguous time is one that can map either to a standard time or to a daylight saving time in the local time zone.) If `time` is an invalid time, the method simply subtracts the local time from the local time zone's UTC offset to return UTC. (An invalid time is one that does not exist because of the application of daylight saving time adjustment rules.)

Because `time` is interpreted in relation to the current time zone on the current system, the date and time returned by this method can differ if an application is run on different computers or on the same computer with different time zones. For cases in which a date and time value must represent a single, unambiguous point in time, use a `DateTimeOffset` value to represent the local time.

The `TimeZone.ToUniversalTime` method corresponds to the `ConvertTimeToUtc` method overload with a `DateTime` parameter whose `Kind` property does not equal `Utc`. Whenever possible, use the `ConvertTimeToUtc` method overload.
