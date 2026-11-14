---
title: "TimeZoneInfo class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo class (part 5 of 7)

## TimeZoneInfo.Equals(TimeZoneInfo) method

```csharp
public bool Equals (TimeZoneInfo? other);
```

Determines whether the current `TimeZoneInfo` object and another `TimeZoneInfo` object are equal.

Parameters:

- `other`: A second object to compare with the current object.

Returns: `true` if the two `TimeZoneInfo` objects are equal; otherwise, `false`.

#### Remarks
Equality is based on a comparison of values. Two `TimeZoneInfo` objects are considered to be equal under the following conditions:

- The value of their `Id` property is the same.

- They have the same adjustment rules.

`Equals` returns the Boolean value that results from evaluating the following expression:

```csharp
 other.Id == this.Id && HasSameRules(other);
```

```vb
 other.Id = me.Id AndAlso HasSameRules(other)
```

If the `other` parameter is an uninitialized `TimeZoneInfo` object, this method returns `false`.

#### Examples
The following example uses the `Equals` method to determine whether the local time zone is Pacific Time or Eastern Time.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/TimeZone2_Examples.cs._

## TimeZoneInfo.FindSystemTimeZoneById(String) method

```csharp
public static TimeZoneInfo FindSystemTimeZoneById (string id);
```

Returns a `TimeZoneInfo` object based on its identifier.

Parameters:

- `id`: The time zone identifier, which corresponds to the `TimeZoneInfo.Id` property.

Returns: An object whose identifier is the value of the `id` parameter.

Exceptions:

- `OutOfMemoryException`: The system does not have enough memory to hold information about the time zone.
- `ArgumentNullException`: The `id` parameter is `null`.
- `TimeZoneNotFoundException`: The time zone identifier specified by `id` was not found. This means that a time zone identifier whose name matches `id` does not exist, or that the identifier exists but does not contain any time zone data.
- `SecurityException`: The process does not have the permissions required to read from the registry key that contains the time zone information.
- `InvalidTimeZoneException`: The time zone identifier was found, but the registry data is corrupted.

#### Remarks

The `id` parameter must correspond exactly to the time zone's identifier in length, but not in case, for a successful match to occur; that is, the comparison of `id` with time zone identifiers is case-insensitive. If you want to retrieve time zone objects based on partial matches, you can write custom procedures that work with the read-only collection of `TimeZoneInfo` objects returned by the `TimeZoneInfo.GetSystemTimeZones` method.

On Windows systems, `FindSystemTimeZoneById` tries to match `id` to the subkey names of the HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Time Zones branch of the registry.
Windows systems also support IANA time zone identifiers (such as "America/Los_Angeles" or "Pacific/Auckland"), providing cross-platform time zone resolution. IANA IDs are supported on Windows only if NLS isn't enabled and globalization invariant mode isn't enabled.
On Linux and macOS, it uses time zone information available in the ICU Library.
If the registry or the library does not have the information for the time zone you desire, you can create a particular time zone either by calling one of the overloads of the `TimeZoneInfo.CreateCustomTimeZone` method or by calling `TimeZoneInfo.FromSerializedString` to deserialize a `TimeZoneInfo` object that represents the required time zone.
However, time zones created by these method calls are not system-defined time and cannot be retrieved using the `TimeZoneInfo.FindSystemTimeZoneById` method.
These custom time zones can be accessed only through the object reference returned by the `TimeZoneInfo.CreateCustomTimeZone` or `TimeZoneInfo.FromSerializedString` method call.

This method always returns a cached `TimeZoneInfo` instance.

#### Examples

The following example uses the `TimeZoneInfo.FindSystemTimeZoneById` method to retrieve the Tokyo Standard Time zone. This `TimeZoneInfo` object is then used to convert the local time to the time in Tokyo and to determine whether it is Tokyo Standard Time or Tokyo Daylight Time.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/ConvertTimeBySystemTimeZoneId/convertdt2.cs._

## TimeZoneInfo.FromSerializedString(String) method

```csharp
public static TimeZoneInfo FromSerializedString (string source);
```

Deserializes a string to re-create an original serialized `TimeZoneInfo` object.

Parameters:

- `source`: The string representation of the serialized `TimeZoneInfo` object.

Returns: The original serialized object.

Exceptions:

- `ArgumentException`: The `source` parameter is `String.Empty`.
- `ArgumentNullException`: The `source` parameter is a null string.
- `SerializationException`: The source parameter cannot be deserialized back into a `TimeZoneInfo` object.

#### Remarks
There is an alternative to providing all the code required to create a time zone that is not found in the registry on Windows or in the ICU Library on Linux and macOS. You can define a custom time zone and either use the `TimeZoneInfo.ToSerializedString` method in a standalone executable or use an application's setup program to save the time zone as a string. The application can then retrieve this string from its storage location and instantiate it using the `TimeZoneInfo.FromSerializedString` method.

#### Examples
The following example tries to retrieve the Antarctica/South Pole time zone from the local system. If it fails, the code tries to retrieve information about the time zone from a text file in the application directory. If this attempt fails, the code creates the time zone and writes information about the time zone to the text file.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/CreateCustomTimeZone/System.TimeZone2.CreateTimeZone.cs._

## TimeZoneInfo.GetAdjustmentRules() method

```csharp
public TimeZoneInfo.AdjustmentRule[] GetAdjustmentRules ();
```

Retrieves an array of `AdjustmentRule` objects that apply to the current `TimeZoneInfo` object.

Returns: An array of objects for this time zone.

Exceptions:

- `OutOfMemoryException`: The system does not have enough memory to make an in-memory copy of the adjustment rules.

#### Remarks
The `TimeZoneInfo.GetAdjustmentRules` method retrieves an array of `AdjustmentRule` objects. Each object in the array defines the effective start and end date of that time zone adjustment, as well as its delta (the exact amount by which the adjustment causes the time to change). In addition, two properties return `TransitionTime` objects that define when each annual transition to and from standard time occurs.

If a time zone has multiple adjustment rules, they are generally ordered from earliest (at index 0) to latest (at index `Array.Length` - 1).

If a time zone has no adjustment rules, the `TimeZoneInfo.GetAdjustmentRules` method returns an empty array (an array whose `Array.Length` is zero).

Any modifications to the elements of the array returned by the `TimeZoneInfo.GetAdjustmentRules` method are not reflected in the adjustment rules that belong to a particular time zone. To modify a time zone's adjustment rules (such as to reflect its historical transition to and from daylight saving time) you must create a new time zone with the appropriate adjustment rules, rather than modify the existing one.

#### Examples
The following example retrieves all time zones that are defined on the local system and displays complete information about their adjustment rules to the console.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo+AdjustmentRule/Overview/System.TimeZone2.AdjustmentRule.Class.cs._

## TimeZoneInfo.GetAmbiguousTimeOffsets(DateTime) method

```csharp
public TimeSpan[] GetAmbiguousTimeOffsets (DateTime dateTime);
```

Returns information about the possible dates and times that an ambiguous date and time can be mapped to.

Parameters:

- `dateTime`: A date and time.

Returns: An array of objects that represents possible Coordinated Universal Time (UTC) offsets that a particular date and time can be mapped to.

Exceptions:

- `ArgumentException`: `dateTime` is not an ambiguous time.

#### Remarks
The precise behavior of this method depends on the relationship between the `Kind` property and the `TimeZoneInfo` object, as the following table shows.

|TimeZoneInfo object type|Kind property value|Behavior|
|------------------------------|-------------------------|--------------|
|`TimeZoneInfo.Local`|`Local` or `Unspecified`|Returns ambiguous time offsets for `dateTime`.|
|`TimeZoneInfo.Local`|`Utc`|Converts `dateTime` to the local time, and then returns ambiguous time offsets for that time.|
|`TimeZoneInfo.Utc`|Any value.|Throws an `ArgumentException`.|
|Any other time zone.|`Local` or `Utc`|Converts `dateTime` to the specified time zone, and then determines whether that time is ambiguous.|
|Any other time zone.|`Unspecified`|Determines whether `dateTime` is ambiguous in the specified time zone.|

The order of `TimeSpan` objects in the array returned by this method is undefined. However, you can determine which element represents an offset from the time zone's standard time by comparing its value with the time zone's `BaseUtcOffset` property. To map an ambiguous time to a time zone's standard time, see How to: Resolve Ambiguous Times.

#### Examples
The following example defines a method named `ShowPossibleUtcTimes` that uses the `GetAmbiguousTimeOffsets` method to map an ambiguous time to its possible corresponding Coordinated Universal Time (UTC) times.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/GetAmbiguousTimeOffsets/System.TimeZone2.GetAmbiguousTimeOffsets.cs._

The method can then be called using code such as the following:

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/GetAmbiguousTimeOffsets/System.TimeZone2.GetAmbiguousTimeOffsets.cs._

## TimeZoneInfo.GetAmbiguousTimeOffsets(DateTimeOffset) method

```csharp
public TimeSpan[] GetAmbiguousTimeOffsets (DateTimeOffset dateTimeOffset);
```

Returns information about the possible dates and times that an ambiguous date and time can be mapped to.

Parameters:

- `dateTimeOffset`: A date and time.

Returns: An array of objects that represents possible Coordinated Universal Time (UTC) offsets that a particular date and time can be mapped to.

Exceptions:

- `ArgumentException`: `dateTimeOffset` is not an ambiguous time.

#### Remarks
The precise behavior of this method depends on the relationship between the `Offset` property of the `dateTimeOffset` parameter and the `TimeZoneInfo` object. If the value of the `Offset` property corresponds to the current time zone's possible offsets from Coordinated Universal Time (UTC) for that date and time, the method returns the possible offsets. Otherwise, it converts `dateTimeOffset` to the time in the current time zone, and then returns the possible offsets of that date and time.

The order of `TimeSpan` objects in the array returned by this method is undefined. However, you can determine which element represents an offset from the time zone's standard time by comparing its value with the time zone's `BaseUtcOffset` property. To map an ambiguous time to a time zone's standard time, see How to: Resolve Ambiguous Times.

## TimeZoneInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for hashing algorithms and data structures such as hash tables.

Returns: A 32-bit signed integer that serves as the hash code for this `TimeZoneInfo` object.

#### Remarks
For additional detail about the `TimeZoneInfo.GetHashCode` method, see `Object.GetHashCode`.

## TimeZoneInfo.GetSystemTimeZones() method

```csharp
public static System.Collections.ObjectModel.ReadOnlyCollection<TimeZoneInfo> GetSystemTimeZones ();
```

Returns a sorted collection of all the time zones about which information is available on the local system.

Returns: A read-only collection of `TimeZoneInfo` objects.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to store all time zone information.
- `SecurityException`: The user does not have permission to read from the registry keys that contain time zone information.

#### Remarks
The `TimeZoneInfo.GetSystemTimeZones` method retrieves all available time zone information from the subkeys of the registry's HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Time Zones key on Windows systems and from the ICU Library on Linux and macOS. If it is unable to successfully retrieve and parse values for particular string properties of individual `TimeZoneInfo` objects, this method sets their value to an empty string ("").

> **Important:**
>  The `TimeZoneInfo.GetSystemTimeZones` method returns a collection of `TimeZoneInfo` objects only for time zones defined in the Windows registry or the ICU library. It does not include time zones created using the overloads of the `TimeZoneInfo.CreateCustomTimeZone` method. These are accessible only through the object reference returned by the time zone creation method.

The collection returned by this method is sorted by UTC offset and, for time zones that have the same UTC offset, by the display name using the current culture. For information about the display name, see `TimeZoneInfo.DisplayName`.

The `ReadOnlyCollection<T>` object returned by this method supports the `IEnumerable<T>` interface, which means that it can be iterated using the `foreach` (in C#) or `For Each…Next` (in Visual Basic) statements. Each iteration of the loop provides the next `TimeZoneInfo` object in the collection.

The collection of `TimeZoneInfo` objects represents time zones defined on the local computer; it does not necessarily provide complete information for all time zones during all time periods. If your application requires time zones not found on the local computer, you can create custom time zones using the overloads of the `TimeZoneInfo.CreateCustomTimeZone` method. For more information, see How to: Create Time Zones Without Adjustment Rules and How to: Create Time Zones with Adjustment Rules.

You can also determine whether an individual time zone is defined on the local computer by calling the `TimeZoneInfo.FindSystemTimeZoneById` method and providing the identifier of the time zone you want to retrieve as a parameter.

#### Examples
The following example retrieves a collection of time zone objects that represent the time zones defined on a computer and writes information about them to a text file.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/getsystemtimezones1.cs._

_Code sample not included: ~/snippets/powershell/VS_Snippets_CLR_System/System.TimeZone2.Class/PS/Timezone2_Examples.ps1._
