---
title: "TimeZoneInfo class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo class (part 2 of 7)

## TimeZoneInfo.ClearCachedData() method

```csharp
public static void ClearCachedData ();
```

Clears cached time zone data.

#### Remarks
Cached time zone data includes data on the local time zone and the Coordinated Universal Time (UTC) zone.

You might call the `ClearCachedData` method to reduce the memory devoted to the application's cache of time zone information or to reflect the fact that the local system's time zone has changed.

Storing references to the local and UTC time zones is not recommended. After the call to the `ClearCachedData` method, these object variables will be undefined `TimeZoneInfo` objects that are no longer references to `TimeZoneInfo.Local` or `TimeZoneInfo.Utc`. For example, in the following code, the second call to the `ConvertTime` method throws an `ArgumentException` because the `local` variable is no longer considered equal to `TimeZoneInfo.Local`.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ClearCachedData/System.TimeZone2.BestPractices.cs._

## TimeZoneInfo.ConvertTime(DateTime, TimeZoneInfo) method

```csharp
public static DateTime ConvertTime (DateTime dateTime, TimeZoneInfo destinationTimeZone);
```

Converts a time to the time in a particular time zone.

Parameters:

- `dateTime`: The date and time to convert.
- `destinationTimeZone`: The time zone to convert `dateTime` to.

Returns: The date and time in the destination time zone.

Exceptions:

- `ArgumentException`: The value of the `dateTime` parameter represents an invalid time.
- `ArgumentNullException`: The value of the `destinationTimeZone` parameter is `null`.

#### Remarks
When performing the conversion, the `ConvertTime` method applies any adjustment rules in effect in the `destinationTimeZone` time zone.

This overload of the `ConvertTime` method determines the source time zone from the value of the `dateTime` parameter's `Kind` property, as the following table shows.

|Kind property value|Source time zone|Method behavior|
|-------------------------|----------------------|---------------------|
|`Local`|`TimeZoneInfo.Local`|Converts the local time to the time in `destinationTimeZone`.|
|`Utc`|`TimeZoneInfo.Utc`|Converts Coordinated Universal Time (UTC) to the time in `destinationTimeZone`.|
|`Unspecified`|Assumed to be `TimeZoneInfo.Local`.|Converts the local time to the time in `destinationTimeZone`.|

The `Kind` property of the returned `DateTime` value is set as shown in the following table.

|Condition|Returned Kind property value|
|---------------|----------------------------------|
|The `destinationTimeZone` is `TimeZoneInfo.Utc`.|`Utc`|
|The `destinationTimeZone` is `TimeZoneInfo.Local`.|`Local`|
|All other date and time values and destination time zones.|`Unspecified`|

If the value of the `dateTime` parameter is an ambiguous local time, it is interpreted as a standard time. If the `dateTime` parameter is an invalid local time, this method throws an `ArgumentException`.

If the conversion of `dateTime` results in a date and time value that is earlier than `MinValue` or later than `MaxValue`, this method returns `MinValue` or `MaxValue`, respectively.

You can also convert to or from UTC by calling the `TimeZoneInfo.ConvertTimeFromUtc` and `TimeZoneInfo.ConvertTimeToUtc` methods.

#### Examples
The following example converts an array of date and time values to times in the Eastern Time zone of the U.S. and Canada. It shows that the source time zone depends on the `Kind` property of the source `DateTime` value. It also illustrates that the `TimeZoneInfo.ConvertTime` method takes time zone adjustments into account, because a time zone adjustment occurs in both the source and destination time zones at 2:00 A.M. on November 7, 2010.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ConvertTime/converttime1.cs._

## TimeZoneInfo.ConvertTime(DateTimeOffset, TimeZoneInfo) method

```csharp
public static DateTimeOffset ConvertTime (DateTimeOffset dateTimeOffset, TimeZoneInfo destinationTimeZone);
```

Converts a time to the time in a particular time zone.

Parameters:

- `dateTimeOffset`: The date and time to convert.
- `destinationTimeZone`: The time zone to convert `dateTimeOffset` to.

Returns: The date and time in the destination time zone.

Exceptions:

- `ArgumentNullException`: The value of the `destinationTimeZone` parameter is `null`.

#### Remarks
When performing the conversion, the `ConvertTime` method applies any adjustment rules in effect in the `destinationTimeZone` time zone.

This overload differs from the other overloads of the `TimeZoneInfo.ConvertTime` method by accepting a `DateTimeOffset` value as its first parameter. This identifies the date and time as an offset from Coordinated Universal Time (UTC) rather than as the date and time in a particular time zone. As a result, the `dateTimeOffset` parameter cannot represent either an ambiguous time or an invalid time.

In converting the `dateTimeOffset` value to the time in the destination time zone, this method takes into account any adjustment rules in effect in the destination time zone.

If the conversion of `dateTimeOffset` results in a date and time value that is earlier than `MinValue` or later than `MaxValue`, this method returns `MinValue` or `MaxValue`, respectively.

#### Examples
The following example converts an array of `DateTimeOffset` values to times in the Eastern Time zone of the U.S. and Canada. It illustrates that the `TimeZoneInfo.ConvertTime` method takes time zone adjustments into account, because a time zone adjustment occurs in both the source and destination time zones at 2:00 A.M. on November 7, 2010.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ConvertTime/converttime2.cs._

## TimeZoneInfo.ConvertTime(DateTime, TimeZoneInfo, TimeZoneInfo) method

```csharp
public static DateTime ConvertTime (DateTime dateTime, TimeZoneInfo sourceTimeZone, TimeZoneInfo destinationTimeZone);
```

Converts a time from one time zone to another.

Parameters:

- `dateTime`: The date and time to convert.
- `sourceTimeZone`: The time zone of `dateTime`.
- `destinationTimeZone`: The time zone to convert `dateTime` to.

Returns: The date and time in the destination time zone that corresponds to the `dateTime` parameter in the source time zone.

Exceptions:

- `ArgumentException`: The `DateTime.Kind` property of the `dateTime` parameter is `DateTimeKind.Local`, but the `sourceTimeZone` parameter does not equal `DateTimeKind.Local`.

-or-

The `DateTime.Kind` property of the `dateTime` parameter is `DateTimeKind.Utc`, but the `sourceTimeZone` parameter does not equal `TimeZoneInfo.Utc`.

-or-

The `dateTime` parameter is an invalid time (that is, it represents a time that does not exist because of a time zone's adjustment rules).
- `ArgumentNullException`: The `sourceTimeZone` parameter is `null`.

-or-

The `destinationTimeZone` parameter is `null`.

#### Remarks
When performing the conversion, the `TimeZoneInfo.ConvertTime` method applies any adjustment rules in effect in the `destinationTimeZone` time zone.

The value of the `Kind` property of the `dateTime` parameter must correspond to the `sourceTimeZone` parameter, as the following table shows.

|DateTime.Kind value|sourceTimeZone value|Method behavior|
|-------------------------|--------------------------|---------------------|
|`Utc`|Equals `TimeZoneInfo.Utc`.|Converts `dateTime` to the destination time zone's time.|
|`Utc`|Does not equal `TimeZoneInfo.Utc`.|Throws an `ArgumentException`.|
|`Local`|Equals `TimeZoneInfo.Local`.|Converts `dateTime` to the destination time zone's time.|
|`Local`|Does not equal `TimeZoneInfo.Local`.|Throws an `ArgumentException`.|
|`Unspecified`|Any.|Converts `dateTime` to the destination time zone's time.|

You can also convert to or from Coordinated Universal Time (UTC) by calling the `TimeZoneInfo.ConvertTimeFromUtc` and `TimeZoneInfo.ConvertTimeToUtc` methods.

The `Kind` property of the returned `DateTime` value is set as shown in the following table.

|Condition|Returned Kind property value|
|---------------|----------------------------------|
|The `destinationTimeZone` argument is `TimeZoneInfo.Utc`.|`Utc`|
|The `destinationTimeZone` argument is `TimeZoneInfo.Local`.|`Local`|
|All other date and time values, source time zones, and destination time zones.|`Unspecified`|

If the value of the `dateTime` parameter is an ambiguous time in the source time zone, it is interpreted as a standard time. If the `dateTime` parameter is an invalid time in the source time zone, this method throws an `ArgumentException`.

If the conversion of `dateTime` results in a date and time value that is earlier than `MinValue` or later than `MaxValue`, this method returns `MinValue` or `MaxValue`, respectively.

The `ConvertTime` method throws an `ArgumentException` exception if the `Kind` property of the `dateTime` argument is `Local` but the `sourceTimeZone` argument is not `TimeZoneInfo.Local`. To determine whether the source time zone is the local time zone or the universal time zone, the method tests for reference equality instead of testing for value equality with the `Equals` method. Note that `TimeZoneInfo` objects that represent the local time zone and that are retrieved by calling the `TimeZoneInfo.FindSystemTimeZoneById` method do not have referential equality with `TimeZoneInfo.Local`. Furthermore, `TimeZoneInfo` objects that represent the local or universal time zone and that are retrieved by iterating the collection returned by the `TimeZoneInfo.GetSystemTimeZones` method do not have referential equality with `TimeZoneInfo.Local` or `TimeZoneInfo.Utc`. As an alternative, you can call the `ConvertTimeBySystemTimeZoneId` method.

#### Examples
The following example illustrates the use of the `ConvertTime` method to convert from Hawaiian Standard Time to local time.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ConvertTime/TimeZone2Concepts.cs._

## TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime, String) method

```csharp
public static DateTime ConvertTimeBySystemTimeZoneId (DateTime dateTime, string destinationTimeZoneId);
```

Converts a time to the time in another time zone based on the time zone's identifier.

Parameters:

- `dateTime`: The date and time to convert.
- `destinationTimeZoneId`: The identifier of the destination time zone.

Returns: The date and time in the destination time zone.

Exceptions:

- `ArgumentNullException`: `destinationTimeZoneId` is `null`.
- `InvalidTimeZoneException`: The time zone identifier was found, but the registry data is corrupted.
- `SecurityException`: The process does not have the permissions required to read from the registry key that contains the time zone information.
- `TimeZoneNotFoundException`: The `destinationTimeZoneId` identifier was not found on the local system.

#### Remarks
When performing the conversion, the `TimeZoneInfo.ConvertTimeBySystemTimeZoneId` method applies any adjustment rules in effect in the `destinationTimeZoneId` time zone.

This overload is largely identical to calling the `ConvertTime` method, except that it allows you to specify the destination time zone by its identifier rather than by an object reference. This method is most useful when you must convert a time without retrieving the time zone object that corresponds to it and you do not need to know whether the converted time is standard or daylight saving time.

The `ConvertTimeBySystemTimeZoneId` method determines the source time zone from the value of the `dateTime` parameter's `Kind` property, as the following table shows.

|Kind property value|Source time zone|Method behavior|
|-------------------------|----------------------|---------------------|
|`Local`|`TimeZoneInfo.Local`|Converts the local time to the time in `destinationTimeZone`.|
|`Utc`|`TimeZoneInfo.Utc`|Converts Coordinated Universal Time (UTC) to the time in `destinationTimeZone`.|
|`Unspecified`|Assumed to be `TimeZoneInfo.Local`.|Converts the local time to the time in `destinationTimeZone`.|

The `Kind` property of the returned `DateTime` value is set as shown in the following table.

|Condition|Returned Kind property value|
|---------------|----------------------------------|
|The `destinationTimeZone` is `TimeZoneInfo.Utc.Id`.|`Utc`|
|Any other `destinationTimeZone` value.|`Unspecified`|

If the value of the `dateTime` parameter is an ambiguous local time, it is interpreted as a standard time. If the `dateTime` parameter is an invalid local time, this method throws an `ArgumentException`.

If the conversion of `dateTime` results in a date and time value that is earlier than `MinValue` or later than `MaxValue`, this method returns `MinValue` or `MaxValue`, respectively.

This method retrieves information on the time zone whose identifier is specified by the `destinationTimeZoneId` parameter from the registry on Windows systems and from the ICU Library on Linux and macOS. It cannot retrieve a time zone object that is created using the `TimeZoneInfo.CreateCustomTimeZone` method. The `destinationTimeZoneId` parameter must correspond exactly to the time zone's identifier in length, but not in case, for a successful match to occur; that is, the comparison of `destinationTimeZoneId` with time zone identifiers is case-insensitive.
