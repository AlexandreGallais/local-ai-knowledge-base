---
title: "DateTimeOffset struct (part 8 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 8 of 15)

## DateTimeOffset.ParseExact(String, String, IFormatProvider) method

```csharp
public static DateTimeOffset ParseExact (string input, string format, IFormatProvider? formatProvider);
```

Converts the specified string representation of a date and time to its `DateTimeOffset` equivalent using the specified format and culture-specific format information. The format of the string representation must match the specified format exactly.

Parameters:

- `input`: A string that contains a date and time to convert.
- `format`: A format specifier that defines the expected format of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information about `input`.

Returns: An object that is equivalent to the date and time that is contained in `input` as specified by `format` and `formatProvider`.

Exceptions:

- `ArgumentException`: The offset is greater than 14 hours or less than -14 hours.
- `ArgumentNullException`: `input` is `null`.

-or-

`format` is `null`.
- `FormatException`: `input` is an empty string ("").

-or-

`input` does not contain a valid string representation of a date and time.

-or-

`format` is an empty string.

-or-

The hour component and the AM/PM designator in `input` do not agree.

#### Remarks
The `ParseExact` method parses the string representation of a date, which must be in the format defined by the `format` parameter. It also requires that the \<Date>, \<Time>, and \<Offset> elements of the string representation of a date and time appear in the order specified by `format`. If the `input` string does not match this `format` parameter, the method throws a `FormatException`.  In contrast, the `Parse` method parses the string representation of a date in any one of the formats recognized by the format provider's `DateTimeFormatInfo` object. `DateTimeOffset.Parse` also allows the \<Date>, \<Time>, and \<Offset> elements of the string representation of a date and time to appear in any order.

The `format` parameter is a string that contains either a single standard format specifier or one or more custom format specifiers that define the required format of the `input` parameter. For details about valid formatting codes, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. If `format` includes the `z`, `zz`, or `zzz` custom format specifiers to indicate that an offset must be present in `input`, that offset must include either a negative sign or a positive sign. If the sign is missing, the method throws a `FormatException`.

If `format` requires that `input` contain a date but not a time, the resulting `DateTimeOffset` object is assigned a time of midnight (0:00:00). If `format` requires that `input` contain a time but not a date, the resulting `DateTimeOffset` object is assigned the current date on the local system. If `format` does not require that `input` contain an offset, the resulting `DateTimeOffset` object is assigned the time zone offset of the local system.

The particular date and time symbols and strings used in `input` are defined by the `formatProvider` parameter, as is the precise format of `input` if `format` is a standard format specifier string. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture based on which `input` is interpreted. The `DateTimeFormatInfo` object returned by its `DateTimeFormat` property defines the symbols and formatting in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatprovider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

#### Examples
The following example uses the `ParseExact` method with standard and custom format specifiers and the invariant culture to parse several date and time strings.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ParseExact/ParseExact.cs._

The following example parses an array of strings that are expected to conform to ISO 8601. As the output from the example shows, strings with leading or trailing spaces fail to parse successfully, as do strings with date and time elements that are out of range.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ParseExact/parseexact-iso8601.cs._

## DateTimeOffset.ParseExact(Char>, Char>, IFormatProvider, DateTimeStyles) method

```csharp
public static DateTimeOffset ParseExact (ReadOnlySpan<char> input, ReadOnlySpan<char> format, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles = System.Globalization.DateTimeStyles.None);
```

Converts a character span that represents a date and time to its `DateTimeOffset` equivalent using the specified format, culture-specific format information, and style. The format of the date and time representation must match the specified format exactly.

Parameters:

- `input`: A character span that represents a date and time.
- `format`: A character span that contains a format specifier that defines the expected format of `input`.
- `formatProvider`: An object that provides culture-specific formatting information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`.

Returns: An object that is equivalent to the date and time that is contained in the `input` parameter, as specified by the `format`, `formatProvider`, and `styles` parameters.

Exceptions:

- `ArgumentException`: The offset is greater than 14 hours or less than -14 hours.
-or-
The `styles` parameter includes an unsupported value.
-or-
The `styles` parameter contains `DateTimeStyles` values that cannot be used together.
- `FormatException`: `input` is an empty character span.
-or-
`input` does not contain a valid string representation of a date and time.
-or-
`format` is an empty character span.
-or-
The hour component and the AM/PM designator in `input` do not agree.

#### Remarks

This method parses a character span that represents a date, which must be in the format defined by the `format` parameter. It also requires that the \<Date>, \<Time>, and \<Offset> elements of the string representation of a date and time appear in the order specified by `format`. If `input` does not match the `format` pattern, the method throws a `FormatException`.  In contrast, the `Parse` method parses the string representation of a date in any one of the formats recognized by the format provider's `DateTimeFormatInfo` object. `DateTimeOffset.Parse` also allows the \<Date>, \<Time>, and \<Offset> elements of the string representation of a date and time to appear in any order.

The `format` parameter is a character span that contains either a single-character standard format specifier or one or more custom format specifiers that define the required format of the `input` parameter. For details about valid formatting codes, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. If `format` includes the `z`, `zz`, or `zzz` custom format specifiers to indicate that an offset must be present in `input`, that offset must include either a negative sign or a positive sign. If the sign is missing, the method throws a `FormatException`.

If `format` requires that `input` contain a date but not a time, the resulting `DateTimeOffset` object is assigned a time of midnight (0:00:00). If `format` requires that `input` contain a time but not a date, the resulting `DateTimeOffset` object is assigned the current date on the local system. If `format` does not require that `input` contain an offset, the resulting `DateTimeOffset` object is assigned the time zone offset of the local system.

The particular date and time symbols and strings used in `input` are defined by the `formatProvider` parameter, as is the precise format of `input` if `format` is a standard format specifier. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture based on which `input` is interpreted. The `DateTimeFormatInfo` object returned by its `DateTimeFormat` property defines the symbols and formatting in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatprovider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.
