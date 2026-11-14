---
title: "TimeZoneInfo class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo class (part 4 of 7)

## TimeZoneInfo.CreateCustomTimeZone(String, TimeSpan, String, String) method

```csharp
public static TimeZoneInfo CreateCustomTimeZone (string id, TimeSpan baseUtcOffset, string? displayName, string? standardDisplayName);
```

Creates a custom time zone with a specified identifier, an offset from Coordinated Universal Time (UTC), a display name, and a standard time display name.

Parameters:

- `id`: The time zone's identifier.
- `baseUtcOffset`: An object that represents the time difference between this time zone and Coordinated Universal Time (UTC).
- `displayName`: The display name of the new time zone.
- `standardDisplayName`: The name of the new time zone's standard time.

Returns: The new time zone.

Exceptions:

- `ArgumentNullException`: The `id` parameter is `null`.
- `ArgumentException`: The `id` parameter is an empty string ("").

-or-

The `baseUtcOffset` parameter does not represent a whole number of minutes.
- `ArgumentOutOfRangeException`: The `baseUtcOffset` parameter is greater than 14 hours or less than -14 hours.

#### Remarks
This overload of the `CreateCustomTimeZone` method is suitable for creating a time zone that has no adjustments (that is, a time zone that does not support daylight saving time). To define a time zone that includes adjustments for daylight saving time, use either the `TimeZoneInfo.CreateCustomTimeZone` or the `TimeZoneInfo.CreateCustomTimeZone` method.

The following table shows the relationship between the parameters that are provided to the `TimeZoneInfo.CreateCustomTimeZone` method and the properties of the `TimeZoneInfo` object that are returned by the method call.

|CreateCustomTimeZone parameter|TimeZoneInfo property|
|------------------------------------|---------------------------|
|`id`|`TimeZoneInfo.Id`|
|`baseUtcOffset`|`TimeZoneInfo.BaseUtcOffset`|
|`displayName`|`TimeZoneInfo.DisplayName`|
|`standardDisplayName`|`TimeZoneInfo.StandardName`|

Typically, the time zone's standard time name and its identifier are the same. However, the length of the time zone's identifier should not exceed 32 characters. The string passed to the `displayName` parameter follows a fairly standard format. The first portion of the display name is the time zone's base offset from Coordinated Universal Time, which is indicated by the acronym GMT (for Greenwich Mean Time), enclosed in parentheses. This is followed by a string that identifies the time zone itself, or one or more of the cities, regions, or countries in the time zone, or both. For example:

```txt
(GMT+02:00) Athens, Beirut, Istanbul, Minsk
(GMT-02:00) Mid-Atlantic
(GMT-07:00) Mountain Time (US & Canada)
```

#### Examples
The following example creates a custom time zone for the Mawson and Holme Bay regions of Antarctica. It then displays the result of converting the local time to the time in the new time zone.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/CreateCustomTimeZone/System.TimeZone2.CreateTimeZone.cs._

## TimeZoneInfo.CreateCustomTimeZone(String, TimeSpan, String, String, String, TimeZoneInfo+AdjustmentRule[]) method

```csharp
public static TimeZoneInfo CreateCustomTimeZone (string id, TimeSpan baseUtcOffset, string? displayName, string? standardDisplayName, string? daylightDisplayName, TimeZoneInfo.AdjustmentRule[]? adjustmentRules);
```

Creates a custom time zone with a specified identifier, an offset from Coordinated Universal Time (UTC), a display name, a standard time name, a daylight saving time name, and daylight saving time rules.

Parameters:

- `id`: The time zone's identifier.
- `baseUtcOffset`: An object that represents the time difference between this time zone and Coordinated Universal Time (UTC).
- `displayName`: The display name of the new time zone.
- `standardDisplayName`: The new time zone's standard time name.
- `daylightDisplayName`: The daylight saving time name of the new time zone.
- `adjustmentRules`: An array that augments the base UTC offset for a particular period.

Returns: A `TimeZoneInfo` object that represents the new time zone.

Exceptions:

- `ArgumentNullException`: The `id` parameter is `null`.
- `ArgumentException`: The `id` parameter is an empty string ("").

-or-

The `baseUtcOffset` parameter does not represent a whole number of minutes.
- `ArgumentOutOfRangeException`: The `baseUtcOffset` parameter is greater than 14 hours or less than -14 hours.
- `InvalidTimeZoneException`: The adjustment rules specified in the `adjustmentRules` parameter overlap.

-or-

The adjustment rules specified in the `adjustmentRules` parameter are not in chronological order.

-or-

One or more elements in `adjustmentRules` are `null`.

-or-

A date can have multiple adjustment rules applied to it.

-or-

The sum of the `baseUtcOffset` parameter and the `AdjustmentRule.DaylightDelta` value of one or more objects in the `adjustmentRules` array is greater than 14 hours or less than -14 hours.

#### Remarks
This overload of the `TimeZoneInfo.CreateCustomTimeZone` method is suitable for creating a time zone that supports daylight saving time. To define a time zone that does not support daylight saving time, use either the `TimeZoneInfo.CreateCustomTimeZone` or the `TimeZoneInfo.CreateCustomTimeZone` method.

The following table shows the relationship between the parameters that are provided to the `TimeZoneInfo.CreateCustomTimeZone` method and the members of the `TimeZoneInfo` object that are returned by the method call.

|CreateCustomTimeZone parameter|TimeZoneInfo member|
|------------------------------------|-------------------------|
|`id`|`TimeZoneInfo.Id`|
|`baseUtcOffset`|`TimeZoneInfo.BaseUtcOffset`|
|`displayName`|`TimeZoneInfo.DisplayName`|
|`standardDisplayName`|`TimeZoneInfo.StandardName`|
|`daylightDisplayName`|`TimeZoneInfo.DaylightName`|
|`adjustmentRules`|An array of `AdjustmentRule` objects returned by the `TimeZoneInfo.GetAdjustmentRules` method.|

Typically, the time zone's standard time name and its identifier are the same. However, the length of the time zone's identifier should not exceed 32 characters. The string passed to the `displayName` parameter follows a fairly standard format. The first portion of the display name is the time zone's base offset from Coordinated Universal Time, which is indicated by the acronym GMT (for Greenwich Mean Time), enclosed in parentheses. This is followed by a string that identifies the time zone itself, or one or more of the cities, regions, or countries in the time zone, or both. For example:

```txt
(GMT+02:00) Athens, Beirut, Istanbul, Minsk
(GMT-02:00) Mid-Atlantic
(GMT-07:00) Mountain Time (US & Canada)
```

The `baseUtcOffset` parameter defines the custom time zone's offset from Coordinated Universal Time (UTC) for all of the time zone's adjustment rules. In other words, the `TimeZoneInfo` object model assumes that the time zone's offset from UTC is constant throughout the life of the time zone, and exists independent of particular adjustment rules. To reflect a time zone that has changed its offset from UTC, you must create a new time zone object.

A time zone's adjustment rules are defined by doing the following:

1.  Calling either the `TransitionTime.CreateFloatingDateRule` or the `TransitionTime.CreateFixedDateRule` method to define the starting and ending transition time for each adjustment rule.

2.  Calling the `AdjustmentRule.CreateAdjustmentRule` method for each adjustment rule.

3.  Assigning the adjustment rules to an array that can be passed as the `adjustmentRules` parameter.

#### Examples
The following example creates a custom time zone for the Palmer station and Anvers Island in Antarctica. It then converts the local time to the time in the new time zone and displays the result.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/CreateCustomTimeZone/System.TimeZone2.CreateTimeZone.cs._

## TimeZoneInfo.CreateCustomTimeZone(String, TimeSpan, String, String, String, TimeZoneInfo+AdjustmentRule[], Boolean) method

```csharp
public static TimeZoneInfo CreateCustomTimeZone (string id, TimeSpan baseUtcOffset, string? displayName, string? standardDisplayName, string? daylightDisplayName, TimeZoneInfo.AdjustmentRule[]? adjustmentRules, bool disableDaylightSavingTime);
```

Creates a custom time zone with a specified identifier, an offset from Coordinated Universal Time (UTC), a display name, a standard time name, a daylight saving time name, daylight saving time rules, and a value that indicates whether the returned object reflects daylight saving time information.

Parameters:

- `id`: The time zone's identifier.
- `baseUtcOffset`: A `TimeSpan` object that represents the time difference between this time zone and Coordinated Universal Time (UTC).
- `displayName`: The display name of the new time zone.
- `standardDisplayName`: The standard time name of the new time zone.
- `daylightDisplayName`: The daylight saving time name of the new time zone.
- `adjustmentRules`: An array of `AdjustmentRule` objects that augment the base UTC offset for a particular period.
- `disableDaylightSavingTime`: `true` to discard any daylight saving time-related information present in `adjustmentRules` with the new object; otherwise, `false`.

Returns: The new time zone. If the `disableDaylightSavingTime` parameter is `true`, the returned object has no daylight saving time data.

Exceptions:

- `ArgumentNullException`: The `id` parameter is `null`.
- `ArgumentException`: The `id` parameter is an empty string ("").

-or-

The `baseUtcOffset` parameter does not represent a whole number of minutes.
- `ArgumentOutOfRangeException`: The `baseUtcOffset` parameter is greater than 14 hours or less than -14 hours.
- `InvalidTimeZoneException`: The adjustment rules specified in the `adjustmentRules` parameter overlap.

-or-

The adjustment rules specified in the `adjustmentRules` parameter are not in chronological order.

-or-

One or more elements in `adjustmentRules` are `null`.

-or-

A date can have multiple adjustment rules applied to it.

-or-

The sum of the `baseUtcOffset` parameter and the `AdjustmentRule.DaylightDelta` value of one or more objects in the `adjustmentRules` array is greater than 14 hours or less than -14 hours.

#### Remarks
You can use this overload of the `TimeZoneInfo.CreateCustomTimeZone` method to create a custom time zone whose support for daylight saving time can be determined by conditions at run time.

The following table shows the relationship between the parameters that are provided to the `TimeZoneInfo.CreateCustomTimeZone` method and the members of the `TimeZoneInfo` object that are returned by the method call.

|CreateCustomTimeZone parameter|TimeZoneInfo property|
|------------------------------------|---------------------------|
|`id`|`TimeZoneInfo.Id`|
|`baseUtcOffset`|`TimeZoneInfo.BaseUtcOffset`|
|`displayName`|`TimeZoneInfo.DisplayName`|
|`standardDisplayName`|`TimeZoneInfo.StandardName`|
|`daylightDisplayName`|`TimeZoneInfo.DaylightName` if `disableDaylightSavingTime` is `false`; `Empty` if `disableDaylightSavingTime` is `true`.|
|`adjustmentRules`|An array of `AdjustmentRule` objects returned by the `TimeZoneInfo.GetAdjustmentRules` method if `disableDaylightSavingTime` is `false`; an empty array returned by the `TimeZoneInfo.GetAdjustmentRules` method if `disableDaylightSavingTime` is `true`.|
|`disableDaylightSavingTime`|Not `TimeZoneInfo.SupportsDaylightSavingTime`.|

Typically, the time zone's standard time name and its identifier are the same. However, the length of the time zone's identifier should not exceed 32 characters. The string passed to the `displayName` parameter follows a fairly standard format. The first portion of the display name is the time zone's base offset from Coordinated Universal Time, which is indicated by the acronym GMT (for Greenwich Mean Time), enclosed in parentheses. This is followed by a string that identifies the time zone itself, or one or more of the cities, regions, or countries in the time zone, or both. For example:

```txt
(GMT+02:00) Athens, Beirut, Istanbul, Minsk
(GMT-02:00) Mid-Atlantic
(GMT-07:00) Mountain Time (US & Canada)
```

A time zone's adjustment rules are defined by doing the following:

1. Calling either the `TransitionTime.CreateFloatingDateRule` or the `TransitionTime.CreateFixedDateRule` method to define the starting and ending transition rules for each adjustment rule.

2. Calling the `AdjustmentRule.CreateAdjustmentRule` method for each adjustment rule.

3. Assigning the adjustment rules to an array that can be passed as the `adjustmentRules` parameter.

If `disableDaylightSavingTime` parameter is `false`, the operation of this method is identical to the `TimeZoneInfo.CreateCustomTimeZone` overload. If `disableDaylightSavingTime` is `true`, the returned object includes no adjustment rules and a `DaylightName` property whose value is an empty string.

#### Examples
The following example creates a custom time zone for the Palmer station and Anvers Island in Antarctica. It sets the `disableDaylightSavingTime` parameter in the call to the `TimeZoneInfo.CreateCustomTimeZone` method to `true`. It then displays the new time zone's daylight saving time name, if one is present, and the number of adjustment rules to confirm that the new time zone has no daylight saving time information.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/CreateCustomTimeZone/System.TimeZone2.CreateTimeZone.cs._

## TimeZoneInfo.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the current `TimeZoneInfo` object and another object are equal.

Parameters:

- `obj`: A second object to compare with the current object.

Returns: `true` if `obj` is a `TimeZoneInfo` object that is equal to the current instance; otherwise, `false`.

#### Remarks
This method converts or casts `obj` to a `TimeZoneInfo` object and compares it with the current instance. The test for equality is based on a comparison of values. The current `TimeZoneInfo` instance and `obj` are considered to be equal under the following conditions:

- The run-time type of `obj` is `TimeZoneInfo`.

- The two objects have the same `Id` property value.

- The two objects have the same adjustment rules.

If `obj` is `null`, this method returns `false`.

#### Examples
The following example uses the `Equals` method to determine whether the local time zone is Pacific Time or Eastern Time.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/Equals/equals1.cs._
