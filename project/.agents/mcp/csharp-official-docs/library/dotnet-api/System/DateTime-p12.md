---
title: "DateTime struct (part 12 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 12 of 18)

## DateTime.ParseExact(String, String[], IFormatProvider, DateTimeStyles) method

```csharp
public static DateTime ParseExact (string s, string[] formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style);
```

Converts the specified string representation of a date and time to its `DateTime` equivalent using the specified array of formats, culture-specific format information, and style. The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A string that contains a date and time to convert.
- `formats`: An array of allowable formats of `s`. For more information, see the Remarks section.
- `provider`: An object that supplies culture-specific format information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date and time contained in `s`, as specified by `formats`, `provider`, and `style`.

Exceptions:

- `ArgumentNullException`: `s` or `formats` is `null`.
- `FormatException`: `s` is an empty string.

-or-

an element of `formats` is an empty string.

-or-

`s` does not contain a date and time that corresponds to any element of `formats`.

-or-

The hour component and the AM/PM designator in `s` do not agree.
- `ArgumentException`: `style` contains an invalid combination of `DateTimeStyles` values. For example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`.

#### Remarks
The `ParseExact` method parses the string representation of a date that matches any one of the patterns assigned to the `formats` parameter. If the string `s` does not match any one of these patterns with any of the variations defined by the `styles` parameter, the method throws a `FormatException`. Aside from comparing `s` to multiple formatting patterns, rather than to a single formatting pattern, this overload behaves identically to the `ParseExact` method.

The `s` parameter contains the date and time to parse. If the `s` parameter contains only a time and no date, the current date is used unless the `style` parameter includes the `NoCurrentDateDefault` flag, in which case the default date (`DateTime.Date.MinValue`) is used. If the `s` parameter contains only a date and no time, midnight (00:00:00) is used. The `style` parameter also determines whether the `s` parameter can contain leading, inner, or trailing white space characters other than those permitted by one of the format strings in `formats`.

If `s` contains no time zone information, the `Kind` property of the returned `DateTime` object is `Unspecified`. This behavior can be changed by using the `AssumeLocal` flag, which returns a `DateTime` value whose `Kind` property is `Local`, or by using the `AssumeUniversal` and `AdjustToUniversal` flags, which returns a `DateTime` value whose `Kind` property is `Utc`. If `s` contains time zone information, the time is converted to local time, if necessary, and the `Kind` property of the returned `DateTime` object is set to `Local`. This behavior can be changed by using the `RoundtripKind` flag to not convert Coordinated Universal Time (UTC) to a local time and set the `Kind` property to `Utc`.

The `formats` parameter contains an array of patterns, one of which `s` must match exactly if the parse operation is to succeed. The patterns in the `formats` parameter consists of one or more custom format specifiers from the Custom Date and Time Format Strings table, or a single standard format specifier, which identifies a predefined pattern, from the Standard Date and Time Format Strings table.

If you do not use date or time separators in a custom format pattern, use the invariant culture for the `provider` parameter and the widest form of each custom format specifier. For example, if you want to specify hours in the pattern, specify the wider form, "HH", instead of the narrower form, "H".

The `styles` parameter includes one or more members of the `DateTimeStyles` enumeration that determine whether and where white space not defined by `format` can appear in `s` and that control the precise behavior of the parse operation. The following table describes how each member of the `DateTimeStyles` enumeration affects the operation of the `ParseExact` method.

|DateTimeStyles member|Description|
|---------------------------|-----------------|
|`AdjustToUniversal`|Parses `s` and, if necessary, converts it to UTC. If `s` includes a time zone offset, or if `s` contains no time zone information but `styles` includes the `AssumeLocal` flag, the method parses the string, calls `DateTime.ToUniversalTime` to convert the returned `DateTime` value to UTC, and sets the `Kind` property to `Utc`. If `s` indicates that it represents UTC, or if `s` does not contain time zone information but `styles` includes the `AssumeUniversal` flag, the method parses the string, performs no time zone conversion on the returned `DateTime` value, and sets the `Kind` property to `Utc`. In all other cases, the flag has no effect.|
|`AllowInnerWhite`|Specifies that white space not defined by `format` can appear between any individual date or time element.|
|`AllowLeadingWhite`|Specifies that white space not defined by `format` can appear at the beginning of `s`.|
|`AllowTrailingWhite`|Specifies that white space not defined by `format` can appear at the end of `s`.|
|`AllowWhiteSpaces`|Specifies that `s` may contain leading, inner, and trailing white spaces not defined by `format`.|
|`AssumeLocal`|Specifies that if `s` lacks any time zone information, it is assumed to represent a local time. Unless the `AdjustToUniversal` flag is present, the `Kind` property of the returned `DateTime` value is set to `Local`.|
|`AssumeUniversal`|Specifies that if `s` lacks any time zone information, it is assumed to represent UTC. Unless the `AdjustToUniversal` flag is present, the method converts the returned `DateTime` value from UTC to local time and sets its `Kind` property to `Local`.|
|`NoCurrentDateDefault`|If `s` contains time without date information, the date of the return value is set to `DateTime.MinValue.Date`.|
|`None`|The `s` parameter is parsed using default values. No white space other than that present in `format` is allowed. If `s` lacks a date component, the date of the returned `DateTime` value is set to 1/1/0001. If `s` contains no time zone information, the `Kind` property of the returned `DateTime` object is set to `Unspecified`. If time zone information is present in `s`, the time is converted to local time and the `Kind` property of the returned `DateTime` object is set to `Local`.|
|`RoundtripKind`|For strings that contain time zone information, tries to prevent the conversion to a date and time with its `Kind` property set to `Local`. This flag primarily prevents the conversion of UTC times to local times.|

The particular date and time symbols and strings (such as the names of the days of the week in a particular language) used in `s` are defined by the `provider` parameter, as is the precise format of `s` if `format` is a standard format specifier string. The `provider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture used to interpret `s`. The `DateTimeFormatInfo` object returned by its `DateTimeFormat` property defines the symbols and formatting in `s`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

- A custom `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns either the `CultureInfo` object or the `DateTimeFormatInfo` object that provides formatting information.

If `provider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

#### Examples
The following example uses the `ParseExact` method to ensure that a string in a number of possible formats can be successfully parsed .

_Code sample not included: ~/snippets/csharp/System/DateTime/ParseExact/parseexact3.cs._

## DateTime.SpecifyKind(DateTime, DateTimeKind) method

```csharp
public static DateTime SpecifyKind (DateTime value, DateTimeKind kind);
```

Creates a new `DateTime` object that has the same number of ticks as the specified `DateTime`, but is designated as either local time, Coordinated Universal Time (UTC), or neither, as indicated by the specified `DateTimeKind` value.

Parameters:

- `value`: A date and time.
- `kind`: One of the enumeration values that indicates whether the new object represents local time, UTC, or neither.

Returns: A new object that has the same number of ticks as the object represented by the `value` parameter and the `DateTimeKind` value specified by the `kind` parameter.

#### Remarks
A `DateTime` object consists of a Kind field that indicates whether the time value is based on local time, Coordinated Universal Time (UTC), or neither, and a Ticks field that contains a time value measured in 100-nanosecond ticks. The `DateTime.SpecifyKind` method creates a new `DateTime` object using the specified `kind` parameter and the original time value.

> **Important:**
> The returned `DateTime` value does not represent the same instant in time as the `value` parameter, and `DateTime.SpecifyKind` is not a time zone conversion method. Instead, it leaves the time specified by the `value` parameter unchanged, and sets the `Kind` property to `kind`. For information about time zone conversions, see Converting Times Between Time Zones.

The `DateTime.SpecifyKind` method is useful in interoperability scenarios where you receive a `DateTime` object with an unspecified Kind field, but you can determine by independent means that the Ticks field represents local time or UTC.

#### Examples
The following example uses the `DateTime.SpecifyKind` method to demonstrate how the `Kind` property influences the `DateTime.ToLocalTime` and `DateTime.ToUniversalTime` conversion methods.

_Code sample not included: ~/snippets/csharp/System/DateTime/Kind/ks.cs._

## DateTime.Subtract(DateTime) method

```csharp
public TimeSpan Subtract (DateTime value);
```

Returns a new `TimeSpan` that subtracts the specified date and time from the value of this instance.

Parameters:

- `value`: The date and time value to subtract.

Returns: A time interval that is equal to the date and time represented by this instance minus the date and time represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The result is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
The `Subtract` method determines the difference between two dates. To subtract a time interval from the current instance, call the `Subtract` method. To subtract a particular time interval from the current instance, call the method that adds that time interval to the current date, and supply a negative value as the method argument. For example, to subtract two months from the current date, call the `AddMonths` method with a value of -2.

If the date and time of the current instance is earlier than `value`, the method returns a `TimeSpan` object that represents a negative time span. That is, the value of all of its non-zero properties (such as `TimeSpan.Days` or `TimeSpan.Ticks`) is negative.

The `Subtract` method does not consider the value of the `Kind` property of the two `DateTime` values when performing the subtraction. Before subtracting `DateTime` objects, ensure that the objects represent times in the same time zone. Otherwise, the result will include the difference between time zones.

> **Note:**
> The `Subtract` method does consider the difference between time zones when performing the subtraction.

#### Examples
The following example demonstrates the `DateTime.Subtract` method and the subtraction operator.

_Code sample not included: ~/snippets/csharp/System/DateTime/op_Subtraction/class1.cs._
