---
title: "TimeZoneInfo class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo class

Namespace: `System`

```csharp
public sealed class TimeZoneInfo : IEquatable<TimeZoneInfo>, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents any time zone in the world.

#### Remarks
A time zone is a geographical region in which the same time is used.

The `TimeZoneInfo` class offers significant enhancements over the `TimeZone` class, which provides only limited functionality.

The `TimeZone` class recognizes only the local time zone, and can convert times between Coordinated Universal Time (UTC) and local time. A `TimeZoneInfo` object can represent any time zone, and methods of the `TimeZoneInfo` class can be used to convert the time in one time zone to the corresponding time in any other time zone. The members of the `TimeZoneInfo` class support the following operations:

- Retrieving a time zone that is already defined by the operating system.

- Enumerating the time zones that are available on a system.

- Converting times between different time zones.

- Creating a new time zone that is not already defined by the operating system.

- Serializing a time zone for later retrieval.

> **Note:**
>  An instance of the `TimeZoneInfo` class is immutable. Once an object has been instantiated, its values cannot be modified.

You cannot instantiate a `TimeZoneInfo` object using the `new` keyword. Instead, you must call one of the static members of the `TimeZoneInfo` class shown in the following table.

|Static member name|Description|
|------------------------|-----------------|
|`TimeZoneInfo.CreateCustomTimeZone` method|Creates a custom time zone from application-supplied data.|
|`TimeZoneInfo.FindSystemTimeZoneById` method|Instantiates a time zone based on its identifier.|
|`TimeZoneInfo.FromSerializedString` method|Deserializes a string value to re-create a previously serialized `TimeZoneInfo` object.|
|`TimeZoneInfo.GetSystemTimeZones` method|Returns an enumerable `ReadOnlyCollection<T>` of `TimeZoneInfo` objects that represents all time zones that are available on the local system.|
|`Local` property|Instantiates a `TimeZoneInfo` object that represents the local time zone.|
|`Utc` property|Instantiates a `TimeZoneInfo` object that represents the UTC zone.|

You can use the `TimeZoneInfo.CreateCustomTimeZone` method to create a time zone that is not defined in the local system registry on Windows systems or by the ICU Library's Time Zone Data on Linux or macOS. You can then use the `ToSerializedString` property to save the time zone object's information as a string, which can be stored in some form that is accessible to the application. You can use the `TimeZoneInfo.FromSerializedString` method to convert a serialized string back to a `TimeZoneInfo` object.

## TimeZoneInfo.BaseUtcOffset property

```csharp
public TimeSpan BaseUtcOffset { get; }
```

Gets the time difference between the current time zone's standard time and Coordinated Universal Time (UTC).

Returns: An object that indicates the time difference between the current time zone's standard time and Coordinated Universal Time (UTC).

#### Remarks
The time span returned by the `BaseUtcOffset` property can range from 14 hours (for a time zone that is 14 hours ahead of Coordinated Universal Time (UTC)) to -14 hours (for a time zone that is 14 hours behind UTC). Time zones that are ahead of UTC have a positive offset; time zones that are behind UTC have a negative offset.

The `TimeZoneInfo.BaseUtcOffset` value is represented as a whole number of minutes. It cannot include a fractional number of minutes.

> **Note:**
>  Because `TimeZoneInfo.BaseUtcOffset` is a property of the `TimeZoneInfo` object rather than the `AdjustmentRule` object, the `TimeZoneInfo` class applies a single offset from UTC to all of a time zone's adjustments. To reflect a time zone that has modified its offset from UTC, you must create a new time zone using the `TimeZoneInfo.CreateCustomTimeZone` method.

The `BaseUtcOffset` property differs from the `TimeZoneInfo.GetUtcOffset` method in the following ways:

- The `BaseUtcOffset` property returns the difference between UTC and the time zone's standard time; the `TimeZoneInfo.GetUtcOffset` method returns the difference between UTC and the time zone's time at a particular point in time.

- The `TimeZoneInfo.GetUtcOffset` method reflects the application of any adjustment rules to the time zone; the `BaseUtcOffset` property does not.

#### Examples
The following example uses the `BaseUtcOffset` property to display the difference between the local time and Coordinated Universal Time (UTC).

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/TimeZone2_Examples.cs._

## TimeZoneInfo.DaylightName property

```csharp
public string DaylightName { get; }
```

Gets the display name for the current time zone's daylight saving time.

Returns: The display name for the time zone's daylight saving time.

#### Remarks
The display name is localized based on the culture installed with the Windows operating system.

A `DaylightName` property whose value is not `Empty` or `null` does not necessarily indicate that the time zone supports daylight saving time. To determine whether the time zone supports daylight saving time, check the value of its `SupportsDaylightSavingTime` property.

In most cases, the `DaylightName` property of system-defined time zones is not `Empty` or `null`. However, the `DaylightName` property of custom time zones can be set to `Empty`. This occurs when custom time zones are created by the `CreateCustomTimeZone` or the `CreateCustomTimeZone` overload and the `disableDaylightSavingTime` parameter is `true`. Therefore, your code should never assume that the value of the `DaylightName` property is not `null` or empty.

The `DaylightName` property is equivalent to the `DaylightName` property of the `TimeZone` class.

#### Examples
The following example defines a method named `DisplayDateWithTimeZoneName` that uses the `IsDaylightSavingTime` method to determine whether to display a time zone's standard time name or daylight saving time name.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/DaylightName/IsDaylightSavingTime.cs._

## TimeZoneInfo.DisplayName property

```csharp
public string DisplayName { get; }
```

Gets the general display name that represents the time zone.

Returns: The time zone's general display name.

#### Remarks
The display name is localized based on the culture installed with the Windows operating system.

Time zone display names for Windows system time zones follow a fairly standard format. The first portion of the display name is the time zone's base offset from Coordinated Universal Time, which is indicated by the acronym GMT (for Greenwich Mean Time), enclosed in parentheses. For Coordinated Universal Time, the GMT acronym with no offset is enclosed in parentheses.  This is followed by a string that identifies the time zone or one or more of the cities, regions, or countries in the time zone. For example:

```txt
(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London
(GMT+02:00) Athens, Beirut, Istanbul, Minsk
(GMT-02:00) Mid-Atlantic
(GMT-07:00) Mountain Time (US & Canada)
```

#### Examples
The following example retrieves a `TimeZoneInfo` object that represents the local time zone and outputs its display name, standard time name, and daylight saving time name. The output is displayed for a system in the U.S. Pacific Standard Time zone.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/ShowTimeZoneNames1.cs._

## TimeZoneInfo.HasIanaId property

```csharp
public bool HasIanaId { get; }
```

Returns `true` if this TimeZoneInfo object has an IANA ID.

Returns: To be added.

To be added.

## TimeZoneInfo.Id property

```csharp
public string Id { get; }
```

Gets the time zone identifier.

Returns: The time zone identifier.

#### Remarks

The time zone identifier is a key <example-value> that uniquely identifies a particular time zone. On Windows systems, it corresponds to the subkeys of the `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Time Zones` registry key. On Linux and macOS, it comes from the ICU Library. It can be passed as a parameter to the `TimeZoneInfo.FindSystemTimeZoneById` method to instantiate a `TimeZoneInfo` object that represents a particular time zone.

> **Important:**
> Although a key name in the Windows registry can be a maximum of 255 characters, we recommend that an identifier that you assign to a custom time zone be 32 characters or fewer. The longer the identifier, the greater the probability that an incorrect key name will be supplied when retrieving it.

The value of the `Id` property is usually, but not always, identical to that of the `StandardName` property. The identifier of the Coordinated Universal Time zone is UTC.

#### Examples
The following example lists the identifier of each of the time zones defined on the local computer.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/TimeZone2_Examples.cs._

## TimeZoneInfo.Local property

```csharp
public static TimeZoneInfo Local { get; }
```

Gets a `TimeZoneInfo` object that represents the local time zone.

Returns: An object that represents the local time zone.

#### Remarks
The local time zone is the time zone on the computer where the code is executing.

> **Important:**
>  You should always access the local time zone through the `Local` property rather than assigning the local time zone to a `TimeZoneInfo` object variable. This prevents the `TimeZoneInfo` object variable from being invalidated by a call to the `TimeZoneInfo.ClearCachedData` method.

On Windows systems, the `TimeZoneInfo` object returned by the `Local` property reflects the setting of the **Automatically adjust clock for Daylight Saving Time** checkbox in the Control Panel **Date and Time** application. If the checkbox is unchecked, the cached copy of the local time zone contains no daylight saving time information. This means that:

- The local time zone's `TimeZoneInfo.GetAdjustmentRules` method returns an array whose length is zero.

- The local time zone's `SupportsDaylightSavingTime` property returns `false`.

- The local time zone has no ambiguous or invalid times (all calls to `TimeZoneInfo.IsAmbiguousTime` or `TimeZoneInfo.IsInvalidTime` return `false`).

- All calls to `TimeZoneInfo.IsDaylightSavingTime` with individual local times return false.

This is not true, however, if a reference to the local time zone is retrieved using the `TimeZoneInfo.FindSystemTimeZoneById` method.

The `Local` property corresponds to the `CurrentTimeZone` property of the `TimeZone` class.

#### Examples
The following example retrieves a `TimeZoneInfo` object that represents the local time zone and outputs its display name, standard time name, and daylight saving time name.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/ShowTimeZoneNames1.cs._

## TimeZoneInfo.StandardName property

```csharp
public string StandardName { get; }
```

Gets the display name for the time zone's standard time.

Returns: The display name of the time zone's standard time.

#### Remarks
The display name is localized based on the culture installed with the Windows operating system.

The `StandardName` property is identical to the `StandardName` property of the `TimeZone` class.

If the operating system language is English, the value of the `StandardName` property is usually, but not always, identical to that of the `Id` property.

#### Examples
The following example defines a method named `DisplayDateWithTimeZoneName` that uses the `IsDaylightSavingTime` method to determine whether to display a time zone's standard time name or daylight saving time name.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/DaylightName/IsDaylightSavingTime.cs._

## TimeZoneInfo.SupportsDaylightSavingTime property

```csharp
public bool SupportsDaylightSavingTime { get; }
```

Gets a value indicating whether the time zone has any daylight saving time rules.

Returns: `true` if the time zone supports daylight saving time; otherwise, `false`.

#### Remarks
The value of the `SupportsDaylightSavingTime` property for the local time zone returned by the `Local` property reflects the setting of the Control Panel **Date and Time** application's checkbox that defines whether the system automatically adjusts for daylight saving time. If it is unchecked, or if no checkbox is displayed for a time zone, the value of this property is `false`.

#### Examples
The following example retrieves a collection of all time zones that are available on a local system and displays the names of those that do not support daylight saving time.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/TimeZone2_Examples.cs._

## TimeZoneInfo.Utc property

```csharp
public static TimeZoneInfo Utc { get; }
```

Gets a `TimeZoneInfo` object that represents the Coordinated Universal Time (UTC) zone.

Returns: An object that represents the Coordinated Universal Time (UTC) zone.

#### Remarks
This is a built-in object; information about this `TimeZoneInfo` object is not retrieved from the registry on Windows systems and from the ICU Library on Linux and macOS.

> **Important:**
>  You should always access the Coordinated Universal Time (UTC) zone through the `Utc` property rather than assigning the UTC time zone to a `TimeZoneInfo` object variable. This prevents the `TimeZoneInfo` object variable from being invalidated by a call to the `TimeZoneInfo.ClearCachedData` method.

Coordinated Universal Time was previously known as Greenwich Mean Time (GMT).

#### Examples
The following example retrieves a `TimeZoneInfo` object that represents Coordinated Universal Time (UTC) and outputs its display name, standard time name, and daylight saving time name.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/TimeZone2_Examples.cs._
