---
title: "TimeZoneInfo class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo class (part 6 of 7)

## TimeZoneInfo.GetSystemTimeZones(Boolean) method

```csharp
public static System.Collections.ObjectModel.ReadOnlyCollection<TimeZoneInfo> GetSystemTimeZones (bool skipSorting);
```

Returns a `ReadOnlyCollection<T>` containing all valid TimeZone's from the local machine.
This method does *not* throw TimeZoneNotFoundException or InvalidTimeZoneException.

Parameters:

- `skipSorting`: If `true`, The collection returned may not necessarily be sorted.

Returns: A read-only collection of `TimeZoneInfo` objects.

By setting the skipSorting parameter to `true`, the method will attempt to avoid sorting the returned collection.
This option can be beneficial when the caller does not require a sorted list and aims to enhance the performance.

## TimeZoneInfo.GetUtcOffset(DateTime) method

```csharp
public TimeSpan GetUtcOffset (DateTime dateTime);
```

Calculates the offset or difference between the time in this time zone and Coordinated Universal Time (UTC) for a particular date and time.

Parameters:

- `dateTime`: The date and time to determine the offset for.

Returns: An object that indicates the time difference between the two time zones.

#### Remarks
The returned time span includes any differences due to the application of adjustment rules to the current time zone. It differs from the `BaseUtcOffset` property, which returns the difference between Coordinated Universal Time (UTC) and the time zone's standard time and, therefore, does not take adjustment rules into account.

If the `dateTime` parameter's `Kind` property does not correspond to the time zone object, this method performs the necessary conversion before returning a result. For example, this can occur if the `Kind` property is `Local` but the time zone object is not the local time zone. If `dateTime` is ambiguous, or if the converted time is ambiguous, this method interprets the ambiguous time as a standard time. If `dateTime` is invalid, this method returns a `TimeSpan` object that reflects the difference between UTC and the time zone's standard time.

The `GetUtcOffset` method is similar in operation to the `TimeZone.GetUtcOffset` method of the `TimeZone` class.

#### Examples
The following example illustrates the use of the `GetUtcOffset` method with different time zones and with date values that have different `Kind` property values.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/GetUtcOffset/System.TimeZone2.GetUtcOffset.cs._

## TimeZoneInfo.GetUtcOffset(DateTimeOffset) method

```csharp
public TimeSpan GetUtcOffset (DateTimeOffset dateTimeOffset);
```

Calculates the offset or difference between the time in this time zone and Coordinated Universal Time (UTC) for a particular date and time.

Parameters:

- `dateTimeOffset`: The date and time to determine the offset for.

Returns: An object that indicates the time difference between Coordinated Universal Time (UTC) and the current time zone.

#### Remarks
The returned time span includes any differences due to the application of adjustment rules to the current time zone. It differs from the `BaseUtcOffset` property, which returns the difference between Coordinated Universal Time (UTC) and the time zone's standard time and, therefore, does not take adjustment rules into account.

## TimeZoneInfo.HasSameRules(TimeZoneInfo) method

```csharp
public bool HasSameRules (TimeZoneInfo other);
```

Indicates whether the current object and another `TimeZoneInfo` object have the same adjustment rules.

Parameters:

- `other`: A second object to compare with the current `TimeZoneInfo` object.

Returns: `true` if the two time zones have identical adjustment rules and an identical base offset; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `other` parameter is `null`.

#### Remarks
Like the `Equals` method, the `TimeZoneInfo.HasSameRules` method indicates whether two time zones have the same base offset (as defined by the `BaseUtcOffset` property) and the same adjustment rules. Unlike the `Equals` method, `TimeZoneInfo.HasSameRules` does not compare time zone identifiers (as defined by the `Id` property).

#### Examples
Typically, a number of time zones defined in the registry on Windows and the ICU Library on Linux and macOS have the same offset from Coordinated Universal Time (UTC) and the same adjustment rules. The following example displays a list of these time zones to the console.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/HasSameRules/HasSameRules.cs._

## TimeZoneInfo.IsAmbiguousTime(DateTime) method

```csharp
public bool IsAmbiguousTime (DateTime dateTime);
```

Determines whether a particular date and time in a particular time zone is ambiguous and can be mapped to two or more Coordinated Universal Time (UTC) times.

Parameters:

- `dateTime`: A date and time value.

Returns: `true` if the `dateTime` parameter is ambiguous; otherwise, `false`.

Exceptions:

- `ArgumentException`: The `DateTime.Kind` property of the `dateTime` value is `DateTimeKind.Local` and `dateTime` is an invalid time.

#### Remarks
An ambiguous time falls within a range of times for the current time zone. This means it can be either a standard time or a time that results from the application of an adjustment rule. Typically, ambiguous times result when the clock is set to return to standard time from daylight saving time. See the Example section for an illustration.

Coordinated Universal Time (UTC) has no ambiguous times; neither do time zones that do not support daylight saving time. Therefore, these time zones have no adjustment rules and calls to the `TimeZoneInfo.IsAmbiguousTime` method always return `false`.

For time zones that do observe daylight saving time, the precise behavior of this method depends on the relationship between the `Kind` property and the `TimeZoneInfo` object, as the following table shows.

|TimeZoneInfo object type|Kind property value|Behavior|
|------------------------------|-------------------------|--------------|
|`TimeZoneInfo.Local`|`Local` or `Unspecified`|Determines whether the `dateTime` parameter is ambiguous.|
|`TimeZoneInfo.Local`|`Utc`|Converts `dateTime` to the local time and then determines whether that time is ambiguous.|
|`TimeZoneInfo.Utc`|`Utc` or `Unspecified`|Returns `false`.|
|`TimeZoneInfo.Utc`|`Local`|If `dateTime` is ambiguous, assumes it is a standard time, converts it to UTC, and returns `false`.|
|Any other time zone.|`Local` or `Utc`|Converts `dateTime` to the time in the specified time zone and then determines whether that time is ambiguous.|
|Any other time zone.|`Unspecified`|Determines whether `dateTime` is ambiguous.|

#### Examples
In the Pacific Time zone, daylight saving time ends at 2:00 A.M. on November 4, 2007. The following example passes the time at one-minute intervals from 12:59 A.M. on November 4, 2007, to 2:01 A.M. on November 4, 2007, to the `IsAmbiguousTime` method of a `TimeZoneInfo` object that represents the Pacific Time zone. The console output indicates that all times from 1:00 A.M. on November 4, 2007, to 1:59 A.M. on November 4, 2007, are ambiguous.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/TimeZone2_Examples.cs._

## TimeZoneInfo.IsAmbiguousTime(DateTimeOffset) method

```csharp
public bool IsAmbiguousTime (DateTimeOffset dateTimeOffset);
```

Determines whether a particular date and time in a particular time zone is ambiguous and can be mapped to two or more Coordinated Universal Time (UTC) times.

Parameters:

- `dateTimeOffset`: A date and time.

Returns: `true` if the `dateTimeOffset` parameter is ambiguous in the current time zone; otherwise, `false`.

#### Remarks
An ambiguous time falls within a range of times for the current time zone. This means that it can be either a standard time or a time that results from the application of an adjustment rule. Typically, ambiguous times result when the clock is set to return to standard time from daylight saving time. Coordinated Universal Time (UTC) has no ambiguous times; neither do time zones that do not support daylight saving time.

The precise behavior of the method depends on the relationship between the `Offset` property of the `dateTimeOffset` parameter and the current time zone. If the value of the `Offset` property is a possible offset from the UTC of the current time zone, the method determines whether that date and time is ambiguous. Otherwise, it converts `dateTimeOffset` to the time in the current time zone, and then determines whether that date and time is ambiguous.

## TimeZoneInfo.IsDaylightSavingTime(DateTime) method

```csharp
public bool IsDaylightSavingTime (DateTime dateTime);
```

Indicates whether a specified date and time falls in the range of daylight saving time for the time zone of the current `TimeZoneInfo` object.

Parameters:

- `dateTime`: A date and time value.

Returns: `true` if the `dateTime` parameter is a daylight saving time; otherwise, `false`.

Exceptions:

- `ArgumentException`: The `DateTime.Kind` property of the `dateTime` value is `DateTimeKind.Local` and `dateTime` is an invalid time.

#### Remarks
The return value of `TimeZoneInfo.IsDaylightSavingTime` is affected by the relationship between the time zone represented by the `TimeZoneInfo` object and the `Kind` property of the `dateTime` parameter, as the following table shows.

|TimeZoneInfo object|DateTime.Kind property|Result|
|-------------------------|----------------------------|------------|
|`TimeZoneInfo.Local`|`DateTimeKind.Local`|Determines whether `dateTime` is daylight saving time.|
|`TimeZoneInfo.Local`|`DateTimeKind.Utc`|Converts `dateTime` from Coordinated Universal Time (UTC) to local time and determines whether it is daylight saving time.|
|`TimeZoneInfo.Local`|`DateTimeKind.Unspecified`|Assumes that `dateTime` represents local time and determines whether it is daylight saving time.|
|`TimeZoneInfo.Utc`|`DateTimeKind.Local`, `DateTimeKind.Unspecified`, or `DateTimeKind.Utc`|Returns `false` (UTC does not support daylight saving time).|
|Any other `TimeZoneInfo` object.|`DateTimeKind.Local`|Converts the local time to the equivalent time of the `TimeZoneInfo` object and then determines whether the latter is daylight saving time.|
|Any other `TimeZoneInfo` object.|`DateTimeKind.Utc`|Converts UTC to the equivalent time of the `TimeZoneInfo` object and then determines whether the latter is daylight saving time.|
|Any other `TimeZoneInfo` object.|`DateTimeKind.Unspecified`|Determines whether `dateTime` is daylight saving time.|

If the time zone represented by the `TimeZoneInfo` object does not support daylight saving time, the method always returns `false`. A number of time zones, including `TimeZoneInfo.Utc`, do not observe daylight saving time.  To determine whether a time zone supports daylight saving time, retrieve the value of its `SupportsDaylightSavingTime` property.

If the `dateTime` parameter specifies an ambiguous time in the current object's time zone, the `TimeZoneInfo.IsDaylightSavingTime` method interprets `dateTime` as standard time and returns `false` if its `Kind` property is `Local` or `Unspecified`. If the `Kind` property is `Utc`, this method will select the correct ambiguous time and indicate whether it is a daylight saving time.

Because the `IsDaylightSavingTime` method can return `false` for a date and time that is ambiguous (that is, a date and time that can represent either a standard time or a daylight saving time in a particular time zone), the `IsAmbiguousTime` method can be paired with the `IsDaylightSavingTime` method to determine whether a time may be a daylight saving time. Because an ambiguous time is one that can be both a daylight saving time and a standard time, the `IsAmbiguousTime` method can be called first to determine whether a date and time may be a daylight saving time. If the method returns `false`, the `IsDaylightSavingTime` method can be called to determine whether the `DateTime` value is a daylight saving time. The following example illustrates this technique.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/DaylightName/IsDaylightSavingTime.cs._

If the `dateTime` parameter specifies an invalid time, the method call throws an `ArgumentException` if the value of the `dateTime` parameter's `Kind` property is `Local`; otherwise, the method returns `false`.

Call the `TimeZoneInfo.IsDaylightSavingTime` method to determine whether to use a time zone's `TimeZoneInfo.StandardName` value or its `TimeZoneInfo.DaylightName` value when displaying the time zone name. See the Example section for an illustration.

#### Examples
The following example defines a method named `DisplayDateWithTimeZoneName` that uses the `TimeZoneInfo.IsDaylightSavingTime` method to determine whether to display a time zone's standard time name or daylight saving time name.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/DaylightName/IsDaylightSavingTime.cs._

## TimeZoneInfo.IsDaylightSavingTime(DateTimeOffset) method

```csharp
public bool IsDaylightSavingTime (DateTimeOffset dateTimeOffset);
```

Indicates whether a specified date and time falls in the range of daylight saving time for the time zone of the current `TimeZoneInfo` object.

Parameters:

- `dateTimeOffset`: A date and time value.

Returns: `true` if the `dateTimeOffset` parameter is a daylight saving time; otherwise, `false`.

#### Remarks
The return value of `TimeZoneInfo.IsDaylightSavingTime` is affected by the relationship between the time zone represented by the `TimeZoneInfo` object and the `Offset` property of the `dateTimeOffset` parameter. If `dateTimeOffset` does not correspond to the current time zone's offset from Coordinated Universal Time (UTC), the method converts that time to the time in the current time zone. It then determines whether that date and time is a daylight saving time.

If the time zone represented by the `TimeZoneInfo` object does not support daylight saving time, the method always returns `false`. To determine whether a time zone supports daylight saving time, retrieve the value of its `SupportsDaylightSavingTime` property.
