---
title: "DateTime struct (part 16 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 16 of 18)

## DateTime.TryParse(String, DateTime) method

```csharp
public static bool TryParse (string? s, out DateTime result);
```

Converts the specified string representation of a date and time to its `DateTime` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing a date and time to convert.
- `result`: When this method returns, contains the `DateTime` value equivalent to the date and time contained in `s`, if the conversion succeeded, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is `null`, is an empty string (""), or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if the `s` parameter was converted successfully; otherwise, `false`.

#### Remarks
The `TryParse` method is similar to the `Parse` method, except that the `TryParse` method does not throw an exception if the conversion fails.

The string `s` is parsed using formatting information in the current `DateTimeFormatInfo` object, which is supplied implicitly by the current culture.

This method tries to ignore unrecognized data, if possible, and fills in missing month, day, and year information with the current date. If `s` contains only a date and no time, this method assumes the time is 12:00 midnight. If `s` includes a date component with a two-digit year, it is converted to a year in the current culture's current calendar based on the value of the `TwoDigitYearMax` property. Any leading, inner, or trailing white space character in `s` is ignored. The date and time can be bracketed with a pair of leading and trailing NUMBER SIGN characters ('#', U+0023), and can be trailed with one or more NULL characters (U+0000).

Because the `TryParse` method tries to parse the string representation of a date and time using the formatting rules of the current culture, trying to parse a particular string across different cultures can either fail or return different results. If a specific date and time format will be parsed across different locales, use the `TryParse` method or one of the overloads of the `DateTime.TryParseExact` method and provide a format specifier.

If `s` is the string representation of a leap day in a leap year in the current calendar, the method parses `s` successfully. If `s` is the string representation of a leap day in a non-leap year in the current culture's current calendar, the parse operation fails and the method returns `false`.

If `s` contains no time zone information, `result` contains a `DateTime` value whose `Kind` property is `Unspecified` when the method returns. If the string to be parsed contains time zone information, `result` contains a `DateTime` value whose `Kind` property is `Local` when the method returns.

#### Examples
The following example passes a number of date and time strings to the `TryParse` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/TryParse/TryParse1.cs._

## DateTime.TryParse(Char>, IFormatProvider, DateTime) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out DateTime result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## DateTime.TryParse(String, IFormatProvider, DateTime) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out DateTime result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## DateTime.TryParse(Char>, IFormatProvider, DateTimeStyles, DateTime) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, System.Globalization.DateTimeStyles styles, out DateTime result);
```

Converts the span representation of a date and time to its `DateTime` equivalent using the specified culture-specific format information and formatting style, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing the date and time to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `styles`: A bitwise combination of enumeration values that defines how to interpret the parsed date in relation to the current time zone or the current date. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `DateTime` value equivalent to the date and time contained in `s`, if the conversion succeeded, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is `null`, is an empty string (""), or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if the `s` parameter was converted successfully; otherwise, `false`.

To be added.

## DateTime.TryParse(String, IFormatProvider, DateTimeStyles, DateTime) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, System.Globalization.DateTimeStyles styles, out DateTime result);
```

Converts the specified string representation of a date and time to its `DateTime` equivalent using the specified culture-specific format information and formatting style, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing a date and time to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `styles`: A bitwise combination of enumeration values that defines how to interpret the parsed date in relation to the current time zone or the current date. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `DateTime` value equivalent to the date and time contained in `s`, if the conversion succeeded, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is `null`, is an empty string (""), or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if the `s` parameter was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `styles` is not a valid `DateTimeStyles` value.

-or-

`styles` contains an invalid combination of `DateTimeStyles` values (for example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`).
- `NotSupportedException`: `provider` is a neutral culture and cannot be used in a parsing operation.

The `TryParse` method parses a string that can contain date, time, and time zone information. It is similar to the `Parse` method, except that the `TryParse` method does not throw an exception if the conversion fails.

This method attempts to ignore unrecognized data and parse the input string (`s`) completely. If `s` contains a time but no date, the method by default substitutes the current date or, if `styles` includes the `NoCurrentDateDefault` flag, it substitutes `DateTime.Date.MinValue`. If `s` contains a date but no time, 12:00 midnight is used as the default time. If a date is present but its year component consists of only two digits, it is converted to a year in the `provider` parameter's current calendar based on the value of the `TwoDigitYearMax` property. Any leading, inner, or trailing white space characters in `s` are ignored. The date and time can be bracketed with a pair of leading and trailing NUMBER SIGN characters ('#', U+0023), and can be trailed with one or more NULL characters (U+0000).

Specific valid formats for date and time elements, as well as the names and symbols used in dates and times, are defined by the `provider` parameter, which can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting is used in the `s` parameter. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting used in `s`.
- A `DateTimeFormatInfo` object that defines the formatting used in `s`.
- A custom `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that defines the formatting used in `s`.

If `provider` is `null`, the current culture is used.

If `s` is the string representation of a leap day in a leap year in the current calendar, the method parses `s` successfully. If `s` is the string representation of a leap day in a non-leap year in the current calendar of `provider`, the parse operation fails and the method returns `false`.

The `styles` parameter defines the precise interpretation of the parsed string and how the parse operation should handle it. It can be one or more members of the `DateTimeStyles` enumeration, as described in the following table.

|DateTimeStyles member|Description|
|---------------------------|-----------------|
|`AdjustToUniversal`|Parses `s` and, if necessary, converts it to UTC. If `s` includes a time zone offset, or if `s` contains no time zone information but `styles` includes the `AssumeLocal` flag, the method parses the string, calls `DateTime.ToUniversalTime` to convert the returned `DateTime` value to UTC, and sets the `Kind` property to `Utc`. If `s` indicates that it represents UTC, or if `s` does not contain time zone information but `styles` includes the `AssumeUniversal` flag, the method parses the string, performs no time zone conversion on the returned `DateTime` value, and sets the `Kind` property to `Utc`. In all other cases, the flag has no effect.|
|`AllowInnerWhite`|Although valid, this value is ignored. Inner white space is permitted in the date and time elements of `s`.|
|`AllowLeadingWhite`|Although valid, this value is ignored. Leading white space is permitted in the date and time elements of `s`.|
|`AllowTrailingWhite`|Although valid, this value is ignored. Trailing white space is permitted in the date and time elements of `s`.|
|`AllowWhiteSpaces`|Specifies that `s` may contain leading, inner, and trailing white spaces. This is the default behavior. It cannot be overridden by supplying a more restrictive `DateTimeStyles` enumeration value such as `None`.|
|`AssumeLocal`|Specifies that if `s` lacks any time zone information, it is assumed to represent a local time. Unless the `AdjustToUniversal` flag is present, the `Kind` property of the returned `DateTime` value is set to `Local`.|
|`AssumeUniversal`|Specifies that if `s` lacks any time zone information, it is assumed to represent UTC. Unless the `AdjustToUniversal` flag is present, the method converts the returned `DateTime` value from UTC to local time and sets its `Kind` property to `Local`.|
|`None`|Although valid, this value is ignored.|
|`RoundtripKind`|For strings that contain time zone information, tries to prevent the conversion of a date and time string to a `DateTime` value with its `Kind` property set to `Local`. Typically, such a string is created by calling the `ToString` method using either the "o", "r", or "u" standard format specifiers.|

If `s` contains no time zone information, the `TryParse` method returns a `DateTime` value whose `Kind` property is `Unspecified` unless a `styles` flag indicates otherwise. If `s` includes time zone or time zone offset information, the `TryParse` method performs any necessary time conversion and returns one of the following:

- A `DateTime` value whose date and time reflect the local time and whose `Kind` property is `Local`.
- Or, if `styles` includes the `AdjustToUniversal` flag, a `DateTime` value whose date and time reflect UTC and whose `Kind` property is `Utc`.

This behavior can be overridden by using the `RoundtripKind` flag.

#### Parse custom cultures

If you parse a date and time string generated for a custom culture, use the `DateTime.TryParseExact` method instead of the `DateTime.TryParse` method to improve the probability that the parse operation will succeed. A custom culture date and time string can be complicated and difficult to parse. The `DateTime.TryParse` method attempts to parse a string with several implicit parse patterns, all of which might fail. In contrast, the `DateTime.TryParseExact` method  requires you to explicitly designate one or more exact parse patterns that are likely to succeed.

For more information about custom cultures, see the `CultureAndRegionInfoBuilder` class.

The following example illustrates the `TryParse` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/TryParse/tryparse2.cs._
