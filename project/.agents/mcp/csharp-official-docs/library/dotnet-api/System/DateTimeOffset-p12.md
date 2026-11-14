---
title: "DateTimeOffset struct (part 12 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 12 of 15)

## DateTimeOffset.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? formatProvider = default);
```

Tries to format the value of the current datetime offset instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, the number of characters that were written in `destination`.
- `format`: A span containing the charactes that represent a standard or custom format string that defines the acceptable format for `destination`.
- `formatProvider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## DateTimeOffset.TryParse(Char>, DateTimeOffset) method

```csharp
public static bool TryParse (ReadOnlySpan<char> input, out DateTimeOffset result);
```

Tries to convert a specified span representation of a date and time to its `DateTimeOffset` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `input`: A span containing the characters representing the date and time to convert.
- `result`: When the method returns, contains the `DateTimeOffset` equivalent to the date and time of `input`, if the conversion succeeded, or <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>, if the conversion failed. The conversion fails if the `input` parameter is `null` or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if the `input` parameter is successfully converted; otherwise, `false`.

To be added.

## DateTimeOffset.TryParse(String, DateTimeOffset) method

```csharp
public static bool TryParse (string? input, out DateTimeOffset result);
```

Tries to converts a specified string representation of a date and time to its `DateTimeOffset` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `input`: A string that contains a date and time to convert.
- `result`: When the method returns, contains the `DateTimeOffset` equivalent to the date and time of `input`, if the conversion succeeded, or <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>, if the conversion failed. The conversion fails if the `input` parameter is `null` or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if the `input` parameter is successfully converted; otherwise, `false`.

#### Remarks
This overload of the `TryParse` method is like the `Parse` method, except that it does not throw an exception if the conversion fails. It parses a string with three elements that can appear in any order and are delimited by white space. These three elements are shown in the following table.

|Element|Example|
|-------------|-------------|
|\<Date>|"2/10/2007"|
|\<Time>|"1:02:03 PM"|
|\<Offset>|"-7:30"|

Although each of these elements is optional, \<Offset> cannot appear by itself. It must be provided together with either \<Date> or \<Time>. If \<Date> is missing, its default value is the current day. If \<Date> is present but its year component consists of only two digits, it is converted to a year in the current culture's current calendar based on the value of the `TwoDigitYearMax` property. If \<Time> is missing, its default value is 12:00:00 AM. If \<Offset> is missing, its default value is the offset of the local time zone. If \<Offset> is present, it can represent either a negative or a positive offset from Coordinated Universal Time (UTC). In either case, \<Offset> must include a sign symbol or the method returns `false`.

The `input` string is parsed by using the formatting information in a `DateTimeFormatInfo` object initialized for the current culture. To parse a string that contains designated formatting that does not necessarily correspond to that of the current culture, use the `DateTimeOffset.TryParseExact` method and provide a format specifier.

#### Examples
The following example calls the `TryParse` method to parse several strings with various date and time formats.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/TryParse/TryParse.cs._

## DateTimeOffset.TryParse(Char>, IFormatProvider, DateTimeOffset) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out DateTimeOffset result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## DateTimeOffset.TryParse(String, IFormatProvider, DateTimeOffset) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out DateTimeOffset result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## DateTimeOffset.TryParse(Char>, IFormatProvider, DateTimeStyles, DateTimeOffset) method

```csharp
public static bool TryParse (ReadOnlySpan<char> input, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles, out DateTimeOffset result);
```

Tries to convert a specified span representation of a date and time to its `DateTimeOffset` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `input`: A span containing the characters representing the date and time to convert.
- `formatProvider`: An object that provides culture-specific formatting information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`.
- `result`: When the method returns, contains the `DateTimeOffset` value equivalent to the date and time of `input`, if the conversion succeeded, or <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>, if the conversion failed. The conversion fails if the `input` parameter is `null` or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if the `input` parameter is successfully converted; otherwise, `false`.

To be added.

## DateTimeOffset.TryParse(String, IFormatProvider, DateTimeStyles, DateTimeOffset) method

```csharp
public static bool TryParse (string? input, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles, out DateTimeOffset result);
```

Tries to convert a specified string representation of a date and time to its `DateTimeOffset` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `input`: A string that contains a date and time to convert.
- `formatProvider`: An object that provides culture-specific formatting information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`.
- `result`: When the method returns, contains the `DateTimeOffset` value equivalent to the date and time of `input`, if the conversion succeeded, or <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>, if the conversion failed. The conversion fails if the `input` parameter is `null` or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if the `input` parameter is successfully converted; otherwise, `false`.

Exceptions:

- `ArgumentException`: `styles` includes an undefined `DateTimeStyles` value.

-or-

`DateTimeStyles.NoCurrentDateDefault` is not supported.

-or-

`styles` includes mutually exclusive `DateTimeStyles` values.

#### Remarks
This overload of the `TryParse` method is like the `Parse` method, except that it does not throw an exception if the conversion fails. The method parses a string with three elements that can appear in any order and are delimited by white space. These three elements are shown in the following table.

|Element|Example|
|-------------|-------------|
|\<Date>|"2/10/2007"|
|\<Time>|"1:02:03 PM"|
|\<Offset>|"-7:30"|

Although each of these elements is optional, \<Offset> cannot appear by itself. It must be provided together with either \<Date> or \<Time>. If \<Date> is missing, its default value is the current day. If \<Date> is present but its year component consists of only two digits, it is converted to a year in the `provider` parameter's current calendar based on the value of the `TwoDigitYearMax` property. If \<Time> is missing, its default value is 12:00:00 AM. If \<Offset> is missing, its default value is the offset of the local time zone, or `Zero` if either the `AdjustToUniversal` or `AssumeUniversal` value is specified in `styles`. If \<Offset> is present, it can represent either a negative or a positive offset from Coordinated Universal Time (UTC). In either case, \<Offset> must include a sign symbol or the method returns `false`.

The `input` string is parsed by using the culture-specific formatting information in a `DateTimeFormatInfo` object supplied by the `formatProvider` parameter. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture whose formatting is used in `input`. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the format that is used in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

In addition, each element can be delimited by leading or trailing white space, and the \<Date> and \<Time> components can include inner white space (such as 6:   00:00). Only the \<Offset> component cannot include inner white space.

If `provider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

The positive or negative sign used in \<Offset> must be either + or -. It is not defined by the `NumberFormatInfo.PositiveSign` or `NumberFormatInfo.NegativeSign` properties of the `NumberFormatInfo` object returned by the `formatprovider` parameter's `NumberFormat` property.

The following members of the `DateTimeStyles` enumeration are supported:

|DateTimeStyles Member|Comments|
|---------------------------|--------------|
|`AdjustToUniversal`|Parses the string represented by `input` and, if necessary, converts it to UTC. It is equivalent to parsing a string, and then calling the returned object's `ToUniversalTime` method.|
|`AllowInnerWhite`|Although valid, this value is ignored. Inner white space is allowed in the \<Date> and \<Time> components.|
|`AllowLeadingWhite`|Although valid, this value is ignored. Leading white space is allowed in front of each component in the parsed string.|
|`AllowTrailingWhite`|Although valid, this value is ignored. Trailing white space is allowed in front of each component in the parsed string.|
|`AllowWhiteSpaces`|This is the default behavior. It cannot be overridden by supplying a more restrictive `DateTimeStyles` enumeration value, such as `None`.|
|`AssumeLocal`|Indicates that, if the `input` parameter lacks an \<Offset> element, the offset of the local time zone should be provided. This is the default behavior of the `TryParse` method.|
|`AssumeUniversal`|Indicates that, if the `input` parameter lacks an \<Offset> element, the UTC offset (00:00) should be provided.|
|`None`|Although valid, this value is ignored and has no effect.|
|`RoundtripKind`|Because the `DateTimeOffset` structure does not include a `Kind` property, this value has no effect.|

Only the `NoCurrentDateDefault` value is not supported. An `ArgumentException` is thrown if this value is included in the `styles` parameter.

#### Examples
The following example calls the `TryParse` method with a variety of `DateTimeStyles` values to parse some strings with various date and time formats.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/TryParse/TryParse.cs._
