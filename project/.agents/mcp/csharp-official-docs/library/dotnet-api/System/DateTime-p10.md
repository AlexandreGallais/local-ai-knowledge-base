---
title: "DateTime struct (part 10 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 10 of 18)

## DateTime.op_Subtraction(DateTime, TimeSpan) method

```csharp
public static DateTime operator - (DateTime d, TimeSpan t);
```

Subtracts a specified time interval from a specified date and time and returns a new date and time.

Parameters:

- `d`: The date and time value to subtract from.
- `t`: The time interval to subtract.

Returns: An object whose value is the value of `d` minus the value of `t`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
This method subtracts the ticks value of `t` from the ticks value of `d`.

The equivalent method for this operator is `Subtract`

#### Examples
The following example demonstrates the `DateTime.Subtract` method and the subtraction operator.

_Code sample not included: ~/snippets/csharp/System/DateTime/op_Subtraction/class1.cs._

## DateTime.Parse(String) method

```csharp
public static DateTime Parse (string s);
```

Converts the string representation of a date and time to its `DateTime` equivalent by using the conventions of the current culture.

Parameters:

- `s`: A string that contains a date and time to convert. See The string to parse for more information.

Returns: An object that is equivalent to the date and time contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date and time.

#### Remarks

If `s` contains time zone information, this method returns a `DateTime` value whose `Kind` property is `Local` and converts the date and time in `s` to local time. Otherwise, it performs no time zone conversion and returns a `DateTime` value whose `Kind` property is `Unspecified`.

This overload attempts to parse `s` by using the formatting conventions of the current culture. The current culture is indicated by the `CurrentCulture` property. To parse a string using the formatting conventions of a specific culture, call the `Parse` or the `Parse` overloads.

This overload attempts to parse `s` by using `AllowWhiteSpaces` style.

#### Examples

The following example parses the string representation of several date and time values by:

- Using the default format provider, which provides the formatting conventions of the current culture of the computer used to produce the example output. The output from this example reflects the formatting conventions of the en-US culture.

- Using the default style value, which is `AllowWhiteSpaces`.

It handles the `FormatException` exception that is thrown when the method tries to parse the string representation of a date and time by using some other culture's formatting conventions. It also shows how to successfully parse a date and time value that does not use the formatting conventions of the current culture.

_Code sample not included: ~/snippets/csharp/System/DateTime/Parse/Parse1.cs._

## DateTime.Parse(Char>, IFormatProvider) method

```csharp
public static DateTime Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## DateTime.Parse(String, IFormatProvider) method

```csharp
public static DateTime Parse (string s, IFormatProvider? provider);
```

Converts the string representation of a date and time to its `DateTime` equivalent by using culture-specific format information.

Parameters:

- `s`: A string that contains a date and time to convert. See The string to parse for more information.
- `provider`: An object that supplies culture-specific format information about `s`.  See Parsing and cultural conventions

Returns: An object that is equivalent to the date and time contained in `s` as specified by `provider`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date and time.

#### Remarks

If `s` contains time zone information, this method returns a `DateTime` value whose `Kind` property is `Local` and converts the date and time in `s` to local time. Otherwise, it performs no time zone conversion and returns a `DateTime` value whose `Kind` property is `Unspecified`.

This overload attempts to parse `s` by using the `AllowWhiteSpaces` style.

#### Examples

The following example parses an array of date strings by using the conventions of the en-US, fr-FR, and de-DE cultures. It demonstrates that the string representations of a single date can be interpreted differently across different cultures.

_Code sample not included: ~/snippets/csharp/System/DateTime/Parse/Parse3.cs._

## DateTime.Parse(Char>, IFormatProvider, DateTimeStyles) method

```csharp
public static DateTime Parse (ReadOnlySpan<char> s, IFormatProvider? provider = default, System.Globalization.DateTimeStyles styles = System.Globalization.DateTimeStyles.None);
```

Converts a memory span that contains string representation of a date and time to its `DateTime` equivalent by using culture-specific format information and a formatting style.

Parameters:

- `s`: The memory span that contains the string to parse. See The string to parse for more information.
- `provider`: An object that supplies culture-specific format information about `s`.  See Parsing and cultural conventions
- `styles`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s` for the parse operation to succeed, and that defines how to interpret the parsed date in relation to the current time zone or the current date. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date and time contained in `s`, as specified by `provider` and `styles`.

Exceptions:

- `FormatException`: `s` does not contain a valid string representation of a date and time.
- `ArgumentException`: `styles` contains an invalid combination of `DateTimeStyles` values. For example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`.

To be added.

## DateTime.Parse(String, IFormatProvider, DateTimeStyles) method

```csharp
public static DateTime Parse (string s, IFormatProvider? provider, System.Globalization.DateTimeStyles styles);
```

Converts the string representation of a date and time to its `DateTime` equivalent by using culture-specific format information and a formatting style.

Parameters:

- `s`: A string that contains a date and time to convert. See The string to parse for more information.
- `provider`: An object that supplies culture-specific formatting information about `s`.  See Parsing and cultural conventions
- `styles`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s` for the parse operation to succeed, and that defines how to interpret the parsed date in relation to the current time zone or the current date. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date and time contained in `s`, as specified by `provider` and `styles`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date and time.
- `ArgumentException`: `styles` contains an invalid combination of `DateTimeStyles` values. For example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`.

#### Remarks

This method overload converts the date and time in `s` and sets the `Kind` property of the returned `DateTime` value as follows:

| If | Time zone conversion | Kind property |
|----|----------------------|---------------|
| `s` contains no time zone information. | None. | `Unspecified` |
| `s` contains time zone information. | To the time in the local time zone | `Local` |
| `s` contains time zone information, and `styles` includes the `AdjustToUniversal` flag. | To Coordinated Universal Time (UTC) | `Utc` |
| `s` contains the Z or GMT time zone designator, and `styles` includes the `RoundtripKind`. | None. | `Utc` |

#### Examples

The following example demonstrates the `Parse` method and displays the value of the `Kind` property of the resulting `DateTime` values.

_Code sample not included: ~/snippets/csharp/System/DateTime/Parse/Parse4.cs._

## DateTime.ParseExact(String, String, IFormatProvider) method

```csharp
public static DateTime ParseExact (string s, string format, IFormatProvider? provider);
```

Converts the specified string representation of a date and time to its `DateTime` equivalent using the specified format and culture-specific format information. The format of the string representation must match the specified format exactly.

Parameters:

- `s`: A string that contains a date and time to convert.
- `format`: A format specifier that defines the required format of `s`. For more information, see the Remarks section.
- `provider`: An object that supplies culture-specific format information about `s`.

Returns: An object that is equivalent to the date and time contained in `s`, as specified by `format` and `provider`.

Exceptions:

- `ArgumentNullException`: `s` or `format` is `null`.
- `FormatException`: `s` or `format` is an empty string.

-or-

`s` does not contain a date and time that corresponds to the pattern specified in `format`.

-or-

The hour component and the AM/PM designator in `s` do not agree.

#### Remarks
The `ParseExact` method parses the string representation of a date, which must be in the format defined by the `format` parameter. It also requires that the \<Date> and \<Time> elements of the string representation of a date and time appear in the order specified by `format`, and that `s` have no white space other than that permitted by `format`. If `format` defines a date with no time element and the parse operation succeeds, the resulting `DateTime` value has a time of midnight (00:00:00). If `format` defines a time with no date element and the parse operation succeeds, the resulting `DateTime` value has a date of `DateTime.Now.Date`.

If `s` does not represent a time in a particular time zone and the parse operation succeeds, the `Kind` property of the returned `DateTime` value is `Unspecified`. If `s` does represent the time in a particular time zone and `format` allows time zone information to be present (for example, if `format` is equal to the "o", "r", or "u" standard format specifiers, or if it contains the "z", "zz", or "zzz" custom format specifiers), the `Kind` property of the returned `DateTime` value is `Local`.

The `format` parameter is a string that contains either a single standard format specifier, or one or more custom format specifiers that define the required format of `s`. For details about valid formatting codes, see Standard Date and Time Format Strings or Custom Date and Time Format Strings.

> **Note:**
> If `format` is a custom format pattern that does not include date or time separators (such as "yyyyMMddHHmm"), use the invariant culture for the `provider` parameter and the widest form of each custom format specifier. For example, if you want to specify hours in the format pattern, specify the wider form, "HH", instead of the narrower form, "H".

The particular date and time symbols and strings (such as names of the days of the week in a particular language) used in `s` are defined by the `provider` parameter, as is the precise format of `s` if `format` is a standard format specifier string. The `provider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture used to interpret `s`. The `DateTimeFormatInfo` object returned by its `DateTimeFormat` property defines the symbols and formatting in `s`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

- A custom `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns either the `CultureInfo` object or the `DateTimeFormatInfo` object that provides formatting information.

If `provider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

#### Examples
The following example demonstrates the `DateTime.ParseExact` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/ParseExact/ParseExact1.cs._

## DateTime.ParseExact(Char>, Char>, IFormatProvider, DateTimeStyles) method

```csharp
public static DateTime ParseExact (ReadOnlySpan<char> s, ReadOnlySpan<char> format, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified span representation of a date and time to its `DateTime` equivalent using the specified format, culture-specific format information, and style. The format of the string representation must match the specified format exactly or an exception is thrown.

Parameters:

- `s`: A span containing the characters that represent a date and time to convert.
- `format`: A span containing the characters that represent a format specifier that defines the required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of the enumeration values that provides additional information about `s`, about style elements that may be present in `s`, or about the conversion from `s` to a `DateTime` value. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date and time contained in `s`, as specified by `format`, `provider`, and `style`.

To be added.

## DateTime.ParseExact(Char>, String[], IFormatProvider, DateTimeStyles) method

```csharp
public static DateTime ParseExact (ReadOnlySpan<char> s, string[] formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified span representation of a date and time to its `DateTime` equivalent using the specified array of formats, culture-specific format information, and style. The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A span containing the characters that represent a date and time to convert.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific format information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date and time contained in `s`, as specified by `formats`, `provider`, and `style`.

To be added.
