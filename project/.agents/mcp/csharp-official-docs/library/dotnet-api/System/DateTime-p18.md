---
title: "DateTime struct (part 18 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 18 of 18)

## DateTime.TryParseExact(String, String[], IFormatProvider, DateTimeStyles, DateTime) method

```csharp
public static bool TryParseExact (string? s, string?[]? formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateTime result);
```

Converts the specified string representation of a date and time to its `DateTime` equivalent using the specified array of formats, culture-specific format information, and style. The format of the string representation must match at least one of the specified formats exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string that contains a date and time to convert.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific format information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `DateTime` value equivalent to the date and time contained in `s`, if the conversion succeeded, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the conversion failed. The conversion fails if `s` or `formats` is `null`, `s` or an element of `formats` is an empty string, or the format of `s` is not exactly as specified by at least one of the format patterns in `formats`. This parameter is passed uninitialized.

Returns: `true` if the `s` parameter was converted successfully; otherwise, `false`.

Exceptions:

- `FormatException`: The length of an element in `formats` is 1, and it is not one of the format specifier characters defined for `DateTimeFormatInfo`.
- `ArgumentException`: `style` is not a valid `DateTimeStyles` value.

-or-

`style` contains an invalid combination of `DateTimeStyles` values (for example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`).

#### Remarks
The `TryParseExact` method parses the string representation of a date that matches any one of the patterns assigned to the `formats` parameter. It is like the `ParseExact` method, except the `DateTime.TryParseExact` method does not throw an exception if the conversion fails.

The `s` parameter contains the date and time to parse. If the `s` parameter contains only a time and no date, the current date is used unless the `style` parameter includes the `NoCurrentDateDefault` flag, in which case the default date (`DateTime.Date.MinValue`) is used. If the `s` parameter contains only a date and no time, midnight (00:00:00) is used. The `style` parameter also determines whether the `s` parameter can contain leading, inner, or trailing white space characters other than those permitted by one of the format strings in `formats`.

If `s` contains no time zone information, the `Kind` property of the returned `DateTime` object is `Unspecified`. This behavior can be changed by using the `AssumeLocal` flag, which returns a `DateTime` value whose `Kind` property is `Local`, or by using the `AssumeUniversal` and `AdjustToUniversal` flags, which returns a `DateTime` value whose `Kind` property is `Utc`. If s contains time zone information, the time is converted to local time, if necessary, and the `Kind` property of the returned `DateTime` object is set to `Local`. This behavior can be changed by using the `RoundtripKind` flag to not convert Coordinated Universal Time (UTC) to a local time and set the `Kind` property to `Utc`.

The `formats` parameter contains an array of patterns, one of which `s` must match exactly if the parse operation is to succeed. The patterns in the `formats` parameter consist of one or more custom format specifiers from the Custom Date and Time Format Strings table, or a single standard format specifier, which identifies a predefined pattern, from the Standard Date and Time Format Strings table.

If you do not use date or time separators in a custom format pattern, use the invariant culture for the `provider` parameter and the widest form of each custom format specifier. For example, if you want to specify hours in the pattern, specify the wider form, "HH", instead of the narrower form, "H".

The particular date and time symbols and strings (such as the names of the days of the week in a particular language) used in `s` are defined by the `provider` parameter, as is the precise format of `s` if `format` is a standard format specifier string. The `provider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture used to interpret `s`. The `DateTimeFormatInfo` object returned by its `DateTimeFormat` property defines the symbols and formatting in `s`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

- A custom `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns either the `CultureInfo` object or the `DateTimeFormatInfo` object that provides formatting information.

If `provider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

The `styles` parameter includes one or more members of the `DateTimeStyles` enumeration that determine whether and where white space not defined by `format` can appear in `s` and that control the precise behavior of the parse operation. The following table describes how each member of the `DateTimeStyles` enumeration affects the operation of the `TryParseExact` method.

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
|`RoundtripKind`|For strings that contain time zone information, tries to prevent the conversion to a `DateTime` value with its `Kind` property set to `Local`. This flag primarily prevents the conversion of UTC times to local times.|

#### Examples
The following example uses the `TryParseExact` method to ensure that a string in a number of possible formats can be successfully parsed .

_Code sample not included: ~/snippets/csharp/System/DateTime/TryParseExact/TryParseExact2.cs._

## DateTime.MaxValue field

```csharp
public static readonly DateTime MaxValue;
```

Represents the largest possible value of `DateTime`. This field is read-only.

#### Remarks
The value of this constant is equivalent to 23:59:59.9999999 UTC, December 31, 9999 in the Gregorian calendar, exactly one 100-nanosecond tick before 00:00:00 UTC, January 1, 10000.

Some calendars, such as the `ThaiBuddhistCalendar`, support an upper date range that is earlier than `MaxValue`. In these cases, trying to access `MaxValue` in variable assignments or formatting and parsing operations can throw an `ArgumentOutOfRangeException`. Rather than retrieving the value of `MaxValue`, you can retrieve the value of the specified culture's latest valid date value from the `MaxSupportedDateTime` property.

#### Examples
The following example instantiates a `DateTime` object by passing its constructor an `Int64` value that represents a number of ticks. Before invoking the constructor, the example ensures that this value is greater than or equal to `DateTime.MinValue.Ticks` and less than or equal to `DateTime.MaxValue.Ticks`. If not, it throws an `ArgumentOutOfRangeException`.

_Code sample not included: ~/snippets/csharp/System/DateTime/MaxValue/MinValue.cs._

## DateTime.MinValue field

```csharp
public static readonly DateTime MinValue;
```

Represents the smallest possible value of `DateTime`. This field is read-only.

#### Remarks
The value of this constant is equivalent to 00:00:00.0000000 UTC, January 1, 0001, in the Gregorian calendar.

`MinValue` defines the date and time that is assigned to an uninitialized `DateTime` variable. The following example illustrates this.

_Code sample not included: ~/snippets/csharp/System/DateTime/MaxValue/MinValue.cs._

The `MinValue` and `MaxValue` properties can be used to ensure that a value lies within the supported range before passing it to a `DateTime` constructor. The code in the Example section illustrates this usage.

#### Examples
The following example instantiates a `DateTime` object by passing its constructor an `Int64` value that represents a number of ticks. Before invoking the constructor, the example ensures that this value is greater than or equal to `DateTime.MinValue.Ticks` and less than or equal to `DateTime.MaxValue.Ticks`. If not, it throws an `ArgumentOutOfRangeException`.

_Code sample not included: ~/snippets/csharp/System/DateTime/MaxValue/MinValue.cs._

## DateTime.UnixEpoch field

```csharp
public static readonly DateTime UnixEpoch;
```

The value of this constant is equivalent to 00:00:00.0000000 UTC, January 1, 1970, in the Gregorian calendar. `DateTime.UnixEpoch` defines the point in time when Unix time is equal to 0.

To be added.
