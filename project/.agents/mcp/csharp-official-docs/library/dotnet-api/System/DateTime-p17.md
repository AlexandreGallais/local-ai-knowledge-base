---
title: "DateTime struct (part 17 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 17 of 18)

## DateTime.TryParseExact(Char>, Char>, IFormatProvider, DateTimeStyles, DateTime) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, ReadOnlySpan<char> format, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateTime result);
```

Converts the specified span representation of a date and time to its `DateTime` equivalent using the specified format, culture-specific format information, and style. The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing a date and time to convert.
- `format`: The required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of one or more enumeration values that indicate the permitted format of `s`.
- `result`: When this method returns, contains the `DateTime` value equivalent to the date and time contained in `s`, if the conversion succeeded, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the conversion failed. The conversion fails if either the `s` or `format` parameter is `null`, is an empty string, or does not contain a date and time that correspond to the pattern specified in `format`. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `FormatException`: The length of `format` is 1, and it is not one of the format specifier characters defined for `DateTimeFormatInfo`.

-or-

`format` does not contain a valid custom format pattern.
- `ArgumentException`: `style` is not a valid `DateTimeStyles` value.

-or-

`style` contains an invalid combination of `DateTimeStyles` values (for example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`).

To be added.

## DateTime.TryParseExact(Char>, String[], IFormatProvider, DateTimeStyles, DateTime) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, string?[]? formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateTime result);
```

Converts the specified char span of a date and time to its `DateTime` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The span containing the string to parse.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that defines how to interpret the parsed date in relation to the current time zone or the current date. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `DateTime` value equivalent to the date and time contained in `s`, if the conversion succeeded, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is `null`, is `String.Empty`, or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `FormatException`: The length of an element in `formats` is 1, and it is not one of the format specifier characters defined for `DateTimeFormatInfo`.
- `ArgumentException`: `style` is not a valid `DateTimeStyles` value.

-or-

`style` contains an invalid combination of `DateTimeStyles` values (for example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`).

To be added.

## DateTime.TryParseExact(String, String, IFormatProvider, DateTimeStyles, DateTime) method

```csharp
public static bool TryParseExact (string? s, string? format, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateTime result);
```

Converts the specified string representation of a date and time to its `DateTime` equivalent using the specified format, culture-specific format information, and style. The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing a date and time to convert.
- `format`: The required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of one or more enumeration values that indicate the permitted format of `s`.
- `result`: When this method returns, contains the `DateTime` value equivalent to the date and time contained in `s`, if the conversion succeeded, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the conversion failed. The conversion fails if either the `s` or `format` parameter is `null`, is an empty string, or does not contain a date and time that correspond to the pattern specified in `format`. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `FormatException`: The length of `format` is 1, and it is not one of the format specifier characters defined for `DateTimeFormatInfo`.

-or-

`format` does not contain a valid custom format pattern.
- `ArgumentException`: `style` is not a valid `DateTimeStyles` value.

-or-

`style` contains an invalid combination of `DateTimeStyles` values (for example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`).

#### Remarks
The `TryParseExact` method parses the string representation of a date, which must be in the format defined by the `format` parameter. It is similar to the `ParseExact` method, except that the `TryParseExact` method does not throw an exception if the conversion fails.

The `s` parameter contains the date and time to parse and must be in a format defined by the `format` parameter. If date, time, and time zone elements are present in `s`, they must also appear in the order specified by `format`. If `format` defines a date with no time element and the parse operation succeeds, the resulting `DateTime` value has a time of midnight (00:00:00). If `format` defines a time with no date element and the parse operation succeeds, the resulting `DateTime` value by default has a date of `DateTime.Now.Date`, or it has a date of `DateTime.MinValue.Date` if `styles` includes the `NoCurrentDateDefault` flag. The `style` parameter determines whether the `s` parameter can contain leading, inner, or trailing white space characters.

If `s` contains no time zone information, the `Kind` property of the returned `DateTime` object is `Unspecified`. This behavior can be changed by using the `AssumeLocal` flag, which returns a `DateTime` value whose `Kind` property is `Local`, or by using the `AssumeUniversal` and `AdjustToUniversal` flags, which returns a `DateTime` value whose `Kind` property is `Utc`. If s contains time zone information, the time is converted to local time, if necessary, and the `Kind` property of the returned `DateTime` object is set to `Local`. This behavior can be changed by using the `RoundtripKind` flag to not convert Coordinated Universal Time (UTC) to a local time and set the `Kind` property to `Utc`.

The `format` parameter contains a pattern that corresponds to the expected format of the `s` parameter. The pattern in the `format` parameter consists of one or more custom format specifiers from the Custom Date and Time Format Strings table, or a single standard format specifier, which identifies a predefined pattern, from the Standard Date and Time Format Strings table.

If you do not use date or time separators in a custom format pattern, use the invariant culture for the `provider` parameter and the widest form of each custom format specifier. For example, if you want to specify hours in the pattern, specify the wider form, "HH", instead of the narrower form, "H".

> **Note:**
> Rather than requiring that `s` conform to a single format for the parse operation to succeed, you can call the `TryParseExact` method and specify multiple permitted formats. This makes the parse operation more likely to succeed.

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
The following example demonstrates the `TryParseExact` method. Note that the string " 5/01/2009 8:30 AM" cannot be parsed successfully when the `styles` parameter equals `None` because leading spaces are not allowed by `format`. Additionally, the string "5/01/2009 09:00" cannot be parsed successfully with a `format` of "MM/dd/yyyyhh:mm" because the date string does not precede the month number with a leading zero, as `format` requires.

_Code sample not included: ~/snippets/csharp/System/DateTime/TryParseExact/TryParseExact1.cs._
