---
title: "DateTime struct (part 8 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 8 of 18)

## DateTime.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `value`: The object to compare to this instance.

Returns: `true` if `value` is an instance of `DateTime` and equals the value of this instance; otherwise, `false`.

#### Remarks
The current instance and `value` are equal if their `Ticks` property values are equal. Their `Kind` property values are not considered in the test for equality.

#### Examples
The following example demonstrates the `DateTime.Equals` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/Equals/sample.cs._

## DateTime.Equals(DateTime, DateTime) method

```csharp
public static bool Equals (DateTime t1, DateTime t2);
```

Returns a value indicating whether two `DateTime` instances  have the same date and time value.

Parameters:

- `t1`: The first object to compare.
- `t2`: The second object to compare.

Returns: `true` if the two values are equal; otherwise, `false`.

#### Remarks
`t1` and `t2` are equal if their `Ticks` property values are equal. Their `Kind` property values are not considered in the test for equality.

#### Examples
The following example demonstrates the `DateTime.Equals` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/Equals/class1.cs._

## DateTime.FromBinary(Int64) method

```csharp
public static DateTime FromBinary (long dateData);
```

Deserializes a 64-bit binary value and recreates an original serialized `DateTime` object.

Parameters:

- `dateData`: A 64-bit signed integer that encodes the `DateTime.Kind` property in a 2-bit field and the `DateTime.Ticks` property in a 62-bit field.

Returns: An object that is equivalent to the `DateTime` object that was serialized by the `DateTime.ToBinary` method.

Exceptions:

- `ArgumentException`: `dateData` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

Use the `DateTime.ToBinary` method to convert the value of the current `DateTime` object to a binary value. Subsequently, use the binary value and the `DateTime.FromBinary` method to recreate the original `DateTime` object.

> **Important:**
> In some cases, the `DateTime` value returned by the `DateTime.FromBinary` method is not identical to the original `DateTime` value supplied to the `DateTime.ToBinary` method. For more information, see the next section, "Local Time Adjustment".

A `DateTime` structure consists of a private `Kind` field, which indicates whether the specified time value is based on local time, Coordinated Universal Time (UTC), or neither, concatenated to a private `Ticks` field, which contains the number of 100-nanosecond ticks that specify a date and time.

#### Local time adjustment

A local time, which is a Coordinated Universal Time adjusted to the local time zone, is represented by a `DateTime` structure whose `Kind` property has the value `Local`. When restoring a local `DateTime` value from the binary representation that is produced by the `DateTime.ToBinary` method, the `DateTime.FromBinary` method may adjust the recreated value so that it is not equal to the original value. This can occur under the following conditions:

- If a local `DateTime` object is serialized in one time zone by the `DateTime.ToBinary` method, and then deserialized in a different time zone by the `DateTime.FromBinary` method, the local time represented by the resulting `DateTime` object is automatically adjusted to the second time zone.

For example, consider a `DateTime` object that represents a local time of 3 P.M. An application that is executing in the U.S. Pacific Time zone uses the `DateTime.ToBinary` method to convert that `DateTime` object to a binary value. Another application that is executing in the U.S. Eastern Time zone then uses the `DateTime.FromBinary` method to convert the binary value to a new `DateTime` object. The value of the new `DateTime` object is 6 P.M., which represents the same point in time as the original 3 P.M. value, but is adjusted to local time in the Eastern Time zone.

- If the binary representation of a local `DateTime` value represents an invalid time in the local time zone of the system on which `DateTime.FromBinary` is called, the time is adjusted so that it is valid.

For example, the transition from standard time to daylight saving time occurs in the Pacific Time zone of the United States on March 14, 2010, at 2:00 A.M., when the time advances by one hour, to 3:00 A.M. This hour interval is an invalid time, that is, a time interval that does not exist in this time zone. The following example shows that when a time that falls within this range is converted to a binary value by the `DateTime.ToBinary` method and is then restored by the `DateTime.FromBinary` method, the original value is adjusted to become a valid time. You can determine whether a particular date and time value may be subject to modification by passing it to the `TimeZoneInfo.IsInvalidTime` method, as the example illustrates.

_Code sample not included: ~/snippets/csharp/System/DateTime/FromBinary/frombinary1.cs._

## DateTime.FromFileTime(Int64) method

```csharp
public static DateTime FromFileTime (long fileTime);
```

Converts the specified Windows file time to an equivalent local time.

Parameters:

- `fileTime`: A Windows file time expressed in ticks.

Returns: An object that represents the local time equivalent of the date and time represented by the `fileTime` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `fileTime` is less than 0 or represents a time greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
A Windows file time is a 64-bit value that represents the number of 100-nanosecond intervals that have elapsed since 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC). Windows uses a file time to record when an application creates, accesses, or writes to a file.

The `fileTime` parameter specifies a file time expressed in 100-nanosecond ticks.

The return value is a `DateTime` whose `Kind` property is `Local`.

#### Examples
The following example demonstrates the `DateTime.FromFileTime` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/FromFileTime/class1.cs._

## DateTime.FromFileTimeUtc(Int64) method

```csharp
public static DateTime FromFileTimeUtc (long fileTime);
```

Converts the specified Windows file time to an equivalent UTC time.

Parameters:

- `fileTime`: A Windows file time expressed in ticks.

Returns: An object that represents the UTC time equivalent of the date and time represented by the `fileTime` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `fileTime` is less than 0 or represents a time greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
A Windows file time is a 64-bit value that represents the number of 100-nanosecond intervals that have elapsed since 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC). Windows uses a file time to record when an application creates, accesses, or writes to a file.

The `fileTime` parameter specifies a file time expressed in 100-nanosecond ticks.

The return value is a `DateTime` whose `Kind` property is `Utc`.

## DateTime.FromOADate(Double) method

```csharp
public static DateTime FromOADate (double d);
```

Returns a `DateTime` equivalent to the specified OLE Automation Date.

Parameters:

- `d`: An OLE Automation Date value.

Returns: An object that represents the same date and time as `d`.

Exceptions:

- `ArgumentException`: The date is not a valid OLE Automation Date value.

#### Remarks
The `d` parameter is a double-precision floating-point number that represents a date as the number of days before or after the base date, midnight, 30 December 1899. The sign and integral part of `d` encode the date as a positive or negative day displacement from 30 December 1899, and the absolute value of the fractional part of `d` encodes the time of day as a fraction of a day displacement from midnight. `d` must be a value between negative 657435.0 through positive 2958465.99999999.

Note that because of the way dates are encoded, there are two ways of representing any time of day on 30 December 1899. For example, -0.5 and 0.5 both mean noon on 30 December 1899 because a day displacement of plus or minus zero days from the base date is still the base date, and a half day displacement from midnight is noon.

See `DateTime.ToOADate` for more information on OLE Automation.

## DateTime.GetDateTimeFormats() method

```csharp
public string[] GetDateTimeFormats ();
```

Converts the value of this instance to all the string representations supported by the standard date and time format specifiers.

Returns: A string array where each element is the representation of the value of this instance formatted with one of the standard date and time format specifiers.

#### Remarks
The string array returned by the `GetDateTimeFormats` method is equivalent to combining the string arrays returned by separate calls to the `GetDateTimeFormats` method with the "d", "D", "f", "F", "g", "G", "m", "o", "r", "s", "t", "T", "u", "U", and "y" standard format strings. For more information about standard format specifiers, see Standard Date and Time Format Strings.

Each element of the return value is formatted using information from the current culture. For more information about culture-specific formatting information for the current culture, see `CultureInfo.CurrentCulture`.

> **Important:**
> Because this method uses culture-sensitive data, you should not assume that multiple calls to the method will return identical data. The data returned by this method can change if the current culture changes, the user overrides individual cultural settings, or an update occurs to the system's cultural data.

#### Examples
The following example demonstrates the `GetDateTimeFormats` method. It displays the string representation of a date using all possible standard date and time formats in the computer's current culture, which in this case is en-US.

_Code sample not included: ~/snippets/csharp/System/DateTime/GetDateTimeFormats/class1.cs._

The example displays the following output:

```txt
7/28/2009
7/28/09
07/28/09
07/28/2009
09/07/28
2009-07-28
28-Jul-09
Tuesday, July 28, 2009
July 28, 2009
Tuesday, 28 July, 2009
28 July, 2009
Tuesday, July 28, 2009 5:23 AM
Tuesday, July 28, 2009 05:23 AM
Tuesday, July 28, 2009 5:23
Tuesday, July 28, 2009 05:23
July 28, 2009 5:23 AM
July 28, 2009 05:23 AM
July 28, 2009 5:23
July 28, 2009 05:23
Tuesday, 28 July, 2009 5:23 AM
Tuesday, 28 July, 2009 05:23 AM
Tuesday, 28 July, 2009 5:23
Tuesday, 28 July, 2009 05:23
28 July, 2009 5:23 AM
28 July, 2009 05:23 AM
28 July, 2009 5:23
28 July, 2009 05:23
Tuesday, July 28, 2009 5:23:15 AM
Tuesday, July 28, 2009 05:23:15 AM
Tuesday, July 28, 2009 5:23:15
Tuesday, July 28, 2009 05:23:15
July 28, 2009 5:23:15 AM
July 28, 2009 05:23:15 AM
July 28, 2009 5:23:15
July 28, 2009 05:23:15
Tuesday, 28 July, 2009 5:23:15 AM
Tuesday, 28 July, 2009 05:23:15 AM
Tuesday, 28 July, 2009 5:23:15
Tuesday, 28 July, 2009 05:23:15
28 July, 2009 5:23:15 AM
28 July, 2009 05:23:15 AM
28 July, 2009 5:23:15
28 July, 2009 05:23:15
7/28/2009 5:23 AM
7/28/2009 05:23 AM
7/28/2009 5:23
7/28/2009 05:23
7/28/09 5:23 AM
7/28/09 05:23 AM
7/28/09 5:23
7/28/09 05:23
07/28/09 5:23 AM
07/28/09 05:23 AM
07/28/09 5:23
07/28/09 05:23
07/28/2009 5:23 AM
07/28/2009 05:23 AM
07/28/2009 5:23
07/28/2009 05:23
09/07/28 5:23 AM
09/07/28 05:23 AM
09/07/28 5:23
09/07/28 05:23
2009-07-28 5:23 AM
2009-07-28 05:23 AM
2009-07-28 5:23
2009-07-28 05:23
28-Jul-09 5:23 AM
28-Jul-09 05:23 AM
28-Jul-09 5:23
28-Jul-09 05:23
7/28/2009 5:23:15 AM
7/28/2009 05:23:15 AM
7/28/2009 5:23:15
7/28/2009 05:23:15
7/28/09 5:23:15 AM
7/28/09 05:23:15 AM
7/28/09 5:23:15
7/28/09 05:23:15
07/28/09 5:23:15 AM
07/28/09 05:23:15 AM
07/28/09 5:23:15
07/28/09 05:23:15
07/28/2009 5:23:15 AM
07/28/2009 05:23:15 AM
07/28/2009 5:23:15
07/28/2009 05:23:15
09/07/28 5:23:15 AM
09/07/28 05:23:15 AM
09/07/28 5:23:15
09/07/28 05:23:15
2009-07-28 5:23:15 AM
2009-07-28 05:23:15 AM
2009-07-28 5:23:15
2009-07-28 05:23:15
28-Jul-09 5:23:15 AM
28-Jul-09 05:23:15 AM
28-Jul-09 5:23:15
28-Jul-09 05:23:15
July 28
July 28
2009-07-28T05:23:15.0160000
2009-07-28T05:23:15.0160000
Tue, 28 Jul 2009 05:23:15 GMT
Tue, 28 Jul 2009 05:23:15 GMT
2009-07-28T05:23:15
5:23 AM
05:23 AM
5:23
05:23
5:23:15 AM
05:23:15 AM
5:23:15
05:23:15
2009-07-28 05:23:15Z
Tuesday, July 28, 2009 12:23:15 PM
Tuesday, July 28, 2009 12:23:15 PM
Tuesday, July 28, 2009 12:23:15
Tuesday, July 28, 2009 12:23:15
July 28, 2009 12:23:15 PM
July 28, 2009 12:23:15 PM
July 28, 2009 12:23:15
July 28, 2009 12:23:15
Tuesday, 28 July, 2009 12:23:15 PM
Tuesday, 28 July, 2009 12:23:15 PM
Tuesday, 28 July, 2009 12:23:15
Tuesday, 28 July, 2009 12:23:15
28 July, 2009 12:23:15 PM
28 July, 2009 12:23:15 PM
28 July, 2009 12:23:15
28 July, 2009 12:23:15
July, 2009
July, 2009
```

## DateTime.GetDateTimeFormats(Char) method

```csharp
public string[] GetDateTimeFormats (char format);
```

Converts the value of this instance to all the string representations supported by the specified standard date and time format specifier.

Parameters:

- `format`: A standard date and time format string.

Returns: A string array where each element is the representation of the value of this instance formatted with the `format` standard date and time format specifier.

Exceptions:

- `FormatException`: `format` is not a valid standard date and time format specifier character.

#### Remarks
The `format` parameter can be any of the standard date and time format specifiers. These include d, D, f, F, g, G, M (or m), O (or o), R (or r), s, t, T, u, U, and Y (or y). For more information, see Standard Date and Time Format Strings.

Each element of the return value is formatted using information from the current culture. For more information about culture-specific formatting information for the current culture, see `CultureInfo.CurrentCulture`.

> **Important:**
> Because this method uses culture-sensitive data, you should not assume that multiple calls to the method will return identical data. The data returned by this method can change if the current culture changes, the user overrides individual cultural settings, or an update occurs to the system's cultural data.

#### Examples
The following example demonstrates the `GetDateTimeFormats` method. It displays the string representation of a date using the long date format specifier ("D") for the current culture.

_Code sample not included: ~/snippets/csharp/System/DateTime/GetDateTimeFormats/class1.cs._
