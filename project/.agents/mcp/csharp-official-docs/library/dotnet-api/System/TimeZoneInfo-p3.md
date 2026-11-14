---
title: "TimeZoneInfo class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo class (part 3 of 7)

## TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTimeOffset, String) method

```csharp
public static DateTimeOffset ConvertTimeBySystemTimeZoneId (DateTimeOffset dateTimeOffset, string destinationTimeZoneId);
```

Converts a time to the time in another time zone based on the time zone's identifier.

Parameters:

- `dateTimeOffset`: The date and time to convert.
- `destinationTimeZoneId`: The identifier of the destination time zone.

Returns: The date and time in the destination time zone.

Exceptions:

- `ArgumentNullException`: `destinationTimeZoneId` is `null`.
- `InvalidTimeZoneException`: The time zone identifier was found but the registry data is corrupted.
- `SecurityException`: The process does not have the permissions required to read from the registry key that contains the time zone information.
- `TimeZoneNotFoundException`: The `destinationTimeZoneId` identifier was not found on the local system.

#### Remarks
When performing the conversion, the `TimeZoneInfo.ConvertTimeBySystemTimeZoneId` method applies any adjustment rules in effect in the `destinationTimeZoneId` time zone.

This overload is identical to calling the `ConvertTime` method, except that it allows you to specify the destination time zone by its identifier rather than by an object reference. This method is most useful when you must convert a time without retrieving the time zone object that corresponds to it and you do not need to know whether the converted time is standard or daylight saving time.

Because the `dateTimeOffset` parameter represents a date and time together with that time's offset from Coordinated Universal Time (UTC), it cannot represent either an ambiguous time or an invalid time.

This method retrieves the time zone whose identifier is specified by the `destinationTimeZoneId` parameter from the registry on Windows systems and from the ICU Library on Linux and macOS. It cannot retrieve a time zone object that is created using the `TimeZoneInfo.CreateCustomTimeZone` method. The `destinationTimeZoneId` parameter must correspond exactly to the time zone's identifier in length, but not in case, for a successful match to occur; that is, the comparison of `destinationTimeZoneId` with time zone identifiers is case-insensitive.

In converting the `dateTimeOffset` value to the time in the destination time zone, the method takes into account any adjustment rules in effect in the destination time zone.

If the conversion of `dateTimeOffset` results in a date and time value that is earlier than `MinValue` or later than `MaxValue`, this method returns `MinValue` or `MaxValue`, respectively.

## TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime, String, String) method

```csharp
public static DateTime ConvertTimeBySystemTimeZoneId (DateTime dateTime, string sourceTimeZoneId, string destinationTimeZoneId);
```

Converts a time from one time zone to another based on time zone identifiers.

Parameters:

- `dateTime`: The date and time to convert.
- `sourceTimeZoneId`: The identifier of the source time zone.
- `destinationTimeZoneId`: The identifier of the destination time zone.

Returns: The date and time in the destination time zone that corresponds to the `dateTime` parameter in the source time zone.

Exceptions:

- `ArgumentException`: The `DateTime.Kind` property of the `dateTime` parameter does not correspond to the source time zone.

-or-

`dateTime` is an invalid time in the source time zone.
- `ArgumentNullException`: `sourceTimeZoneId` is `null`.

-or-

`destinationTimeZoneId` is `null`.
- `InvalidTimeZoneException`: The time zone identifiers were found, but the registry data is corrupted.
- `SecurityException`: The user does not have the permissions required to read from the registry keys that hold time zone data.
- `TimeZoneNotFoundException`: The `sourceTimeZoneId` identifier was not found on the local system.

-or-

The `destinationTimeZoneId` identifier was not found on the local system.

#### Remarks
When performing the conversion, the `TimeZoneInfo.ConvertTimeBySystemTimeZoneId` method applies any adjustment rules in effect in the `destinationTimeZoneId` time zone.

Although it is similar to the `ConvertTime` method, you can use `ConvertTimeBySystemTimeZoneId` to specify the source and destination time zones using their identifiers instead of their `TimeZoneInfo` objects. This method is most useful when you must convert a time without retrieving the time zone object that corresponds to it and you do not need to know whether the converted time is standard or daylight saving time.

This method retrieves the time zones whose identifiers are the `sourceTimeZoneId` and `destinationTimeZoneId` parameters from the registry on Windows systems and from the ICU Library on Linux and macOS. It cannot retrieve time zone objects that are created using the `TimeZoneInfo.CreateCustomTimeZone` method.

The value of the `Kind` property of the `dateTime` parameter must correspond to the `sourceTimeZoneId` parameter, as the following table shows.

|DateTime.Kind value|sourceTimeZone value|Method behavior|
|-------------------------|--------------------------|---------------------|
|`Utc`|Equals `TimeZoneInfo.Utc.Id`.|Converts `dateTime` to the destination time zone's time.|
|`Utc`|Does not equal `TimeZoneInfo.Utc.Id`.|Throws an `ArgumentException`.|
|`Local`|Equals `TimeZoneInfo.Local.Id`.|Converts `dateTime` to the destination time zone's time.|
|`Local`|Does not equal `TimeZoneInfo.Local.Id`.|Throws an `ArgumentException`.|
|`Unspecified`|Any.|Converts `dateTime` to the destination time zone's time.|

Because it relies on calls to the `TimeZoneInfo.FindSystemTimeZoneById` method, the `TimeZoneInfo.ConvertTimeBySystemTimeZoneId` method performs a case-insensitive search to locate the time zones that correspond to `sourceTimeZoneId` and `destinationTimeZoneId`.

If the value of the `dateTime` parameter is an ambiguous time in the source time zone, it is interpreted as a standard time. If the `dateTime` parameter is an invalid time in the source time zone, this method throws an `ArgumentException`.

The `Kind` property of the returned `DateTime` value is set to `Unspecified` unless the destination time zone is Coordinated Universal Time (UTC), in which case it is set to `Utc`.

#### Examples
The following example uses the `ConvertTimeBySystemTimeZoneId` method to display the time that corresponds to the local system time in eight cities of the world.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ConvertTimeBySystemTimeZoneId/System.TimeZone2.Conversions.cs._

## TimeZoneInfo.ConvertTimeFromUtc(DateTime, TimeZoneInfo) method

```csharp
public static DateTime ConvertTimeFromUtc (DateTime dateTime, TimeZoneInfo destinationTimeZone);
```

Converts a Coordinated Universal Time (UTC) to the time in a specified time zone.

Parameters:

- `dateTime`: The Coordinated Universal Time (UTC).
- `destinationTimeZone`: The time zone to convert `dateTime` to.

Returns: The date and time in the destination time zone. Its `DateTime.Kind` property is `DateTimeKind.Utc` if `destinationTimeZone` is `TimeZoneInfo.Utc`; otherwise, its `DateTime.Kind` property is `DateTimeKind.Unspecified`.

Exceptions:

- `ArgumentException`: The `DateTime.Kind` property of `dateTime` is `DateTimeKind.Local`.
- `ArgumentNullException`: `destinationTimeZone` is `null`.

#### Remarks
When performing the conversion, the `TimeZoneInfo.ConvertTimeFromUtc` method applies any adjustment rules in effect in the `destinationTimeZone` time zone.

The precise behavior of this method depends on the value of the `Kind` property of the `dateTime` parameter, as the following table shows.

|DateTime.Kind property|Conversion|
|----------------------------|----------------|
|`Local`|Throws an `ArgumentException`.|
|`Unspecified` or `Utc`|Converts from Coordinated Universal Time (UTC).|

If the conversion of `dateTime` results in a date and time value that is earlier than `MinValue` or later than `MaxValue`, this method returns `MinValue` or `MaxValue`, respectively.

#### Examples
The following example converts Coordinated Universal Time (UTC) to Central Time.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ConvertTime/TimeZone2Concepts.cs._

## TimeZoneInfo.ConvertTimeToUtc(DateTime) method

```csharp
public static DateTime ConvertTimeToUtc (DateTime dateTime);
```

Converts the specified date and time to Coordinated Universal Time (UTC).

Parameters:

- `dateTime`: The date and time to convert.

Returns: The Coordinated Universal Time (UTC) that corresponds to the `dateTime` parameter. The `DateTime` value's `DateTime.Kind` property is always set to `DateTimeKind.Utc`.

Exceptions:

- `ArgumentException`: `TimeZoneInfo.Local.IsInvalidDateTime(`
`dateTime`
`)` returns `true`.

#### Remarks
The exact conversion performed depends on the value of the `Kind` property of the `dateTime` parameter, as the following table shows.

|DateTime.Kind property|Conversion|
|----------------------------|----------------|
|`Local`|Converts from local time to Coordinated Universal Time (UTC).|
|`Unspecified`|Assumes `dateTime` is local time and converts from local time to UTC.|
|`Utc`|Returns `dateTime` unchanged.|

If `dateTime` corresponds to an ambiguous local time, this method assumes that it is standard local time. If `dateTime` corresponds to an invalid local time, the method throws an `ArgumentException`.

> **Note:**
>  If the current computer's local time zone includes multiple adjustment rules, this overload of the `TimeZoneInfo.ConvertTimeToUtc` method can return results that differ from the `TimeZone.ToUniversalTime` and `DateTime.ToUniversalTime` methods. `TimeZone.ToUniversalTime` always applies the current adjustment rule to time zone conversion, whether or not `dateTime` lies within its date range.

If the UTC equivalent of `dateTime` is earlier than `MinValue` or later that `MaxValue`, this method returns `MinValue` or `MaxValue`, respectively.

#### Examples
The following example illustrates the conversion of time values whose `Kind` property is `Utc`, `Local`, and `Unspecified`, respectively. It also illustrates the conversion of ambiguous and invalid times.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ConvertTimeBySystemTimeZoneId/System.TimeZone2.Conversions.cs._

## TimeZoneInfo.ConvertTimeToUtc(DateTime, TimeZoneInfo) method

```csharp
public static DateTime ConvertTimeToUtc (DateTime dateTime, TimeZoneInfo sourceTimeZone);
```

Converts the time in a specified time zone to Coordinated Universal Time (UTC).

Parameters:

- `dateTime`: The date and time to convert.
- `sourceTimeZone`: The time zone of `dateTime`.

Returns: The Coordinated Universal Time (UTC) that corresponds to the `dateTime` parameter. The `DateTime` object's `DateTime.Kind` property is always set to `DateTimeKind.Utc`.

Exceptions:

- `ArgumentException`: `dateTime`.`Kind` is `DateTimeKind.Utc` and `sourceTimeZone` does not equal `TimeZoneInfo.Utc`.

-or-

`dateTime`.`Kind` is `DateTimeKind.Local` and `sourceTimeZone` does not equal `TimeZoneInfo.Local`.

-or-

`sourceTimeZone``.IsInvalidDateTime(``dateTime``)` returns `true`.
- `ArgumentNullException`: `sourceTimeZone` is `null`.

#### Remarks
If the `Kind` property of the `dateTime` parameter equals `Utc` and the `sourceTimeZone` parameter equals `TimeZoneInfo.Utc`, this method returns `dateTime` without performing any conversion.

If `dateTime` corresponds to an ambiguous time, this method assumes that it is the standard time of the source time zone. If `dateTime` corresponds to an invalid time, this method throws an `ArgumentException`.

If the Coordinated Universal Time (UTC) equivalent of `dateTime` is earlier than `MinValue` or later that `MaxValue`, this method returns `MinValue` or `MaxValue`, respectively.

#### Examples
The following example retrieves the current date from the local system and converts it to Coordinated Universal Time (UTC), then converts it to Tokyo Standard Time, and finally converts from Tokyo Standard Time back to UTC. Note that the two UTC times are identical.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ConvertTimeBySystemTimeZoneId/convertdt2.cs._
