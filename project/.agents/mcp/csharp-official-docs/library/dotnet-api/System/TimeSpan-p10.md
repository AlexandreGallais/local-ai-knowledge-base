---
title: "TimeSpan struct (part 10 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 10 of 11)

## TimeSpan.TryParseExact(String, String[], IFormatProvider, TimeSpan) method

```csharp
public static bool TryParseExact (string? input, string?[]? formats, IFormatProvider? formatProvider, out TimeSpan result);
```

Converts the specified string representation of a time interval to its `TimeSpan` equivalent by using the specified formats and culture-specific format information. The format of the string representation must match one of the specified formats exactly.

Parameters:

- `input`: A string that specifies the time interval to convert.
- `formats`: An array of standard or custom format strings that define the acceptable formats of `input`.
- `formatProvider`: An object that provides culture-specific formatting information.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`.

#### Remarks
The `TryParseExact` method parses the string representation of a time interval, which must be in the format defined by one of the format strings specified by the `formats` parameter, except that leading and trailing white-space characters are ignored. This method is similar to the `ParseExact` method, except that it does not throw an exception if the conversion fails.

The `formats` parameter is a string array whose elements consist of either a single standard format specifier, or one or more custom format specifiers that define the required format of `input`. For more information about valid format strings, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings. `input` must correspond exactly to a member of `formats` for the parse operation to succeed. The parse operation attempts to match `input` to each element in `formats` starting with the first element in the array.

> **Important:**
>  The `TimeSpan.TryParseExact` method uses the conventions of the culture specified by the `formatProvider` parameter only if the format string used to parse `input` is a standard `TimeSpan` format string whose value is either "g" or "G". The "c", "t", and "T" standard format strings use the formatting conventions of the invariant culture. Custom format strings define the precise format of the input string and use literal characters to separate the components of a time interval.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string if the format string used to parse `input` is a standard format string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the formatting of the returned string.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used.

#### Examples
The following example calls the `TryParseExact` method to convert each element of a string array to a `TimeSpan` value. The example interprets the strings by using the formatting conventions of the French - France ("fr-FR") culture. The strings can represent a time interval in either the general short format or the general long format.

In addition, the example changes the way in which the time interval parsing methods interpret a single digit. Ordinarily, a single digit is interpreted as the number of days in a time interval. Instead, the `%h` custom format string is used to interpret a single digit as the number of hours. For this change to be effective, note that the `%h` custom format string must precede the other format strings in the `formats` array.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TryParseExact/tryparseexactexample3.cs._

## TimeSpan.TryParseExact(Char>, Char>, IFormatProvider, TimeSpanStyles, TimeSpan) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> input, ReadOnlySpan<char> format, IFormatProvider? formatProvider, System.Globalization.TimeSpanStyles styles, out TimeSpan result);
```

Converts the specified span representation of a time interval to its `TimeSpan` equivalent by using the specified format, culture-specific format information, and styles, and returns a value that indicates whether the conversion succeeded. The format of the string representation must match the specified format exactly.

Parameters:

- `input`: A span containing the characters that represent a time interval to convert.
- `format`: A span containing the charactes that represent a standard or custom format string that defines the acceptable format of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information.
- `styles`: One or more enumeration values that indicate the style of `input`.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`.

To be added.

## TimeSpan.TryParseExact(Char>, String[], IFormatProvider, TimeSpanStyles, TimeSpan) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> input, string?[]? formats, IFormatProvider? formatProvider, System.Globalization.TimeSpanStyles styles, out TimeSpan result);
```

Converts the specified span representation of a time interval to its `TimeSpan` equivalent by using the specified formats, culture-specific format information and styles. The format of the string representation must match one of the specified formats exactly.

Parameters:

- `input`: A span containing the characters that represent a time interval to convert.
- `formats`: An array of standard or custom format strings that define the acceptable formats of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information.
- `styles`: One or more enumeration values that indicate the style of `input`.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`.

To be added.

## TimeSpan.TryParseExact(String, String, IFormatProvider, TimeSpanStyles, TimeSpan) method

```csharp
public static bool TryParseExact (string? input, string? format, IFormatProvider? formatProvider, System.Globalization.TimeSpanStyles styles, out TimeSpan result);
```

Converts the string representation of a time interval to its `TimeSpan` equivalent by using the specified format, culture-specific format information and styles. The format of the string representation must match the specified format exactly.

Parameters:

- `input`: A string that specifies the time interval to convert.
- `format`: A standard or custom format string that defines the required format of `input`.
- `formatProvider`: An object that provides culture-specific formatting information.
- `styles`: One or more enumeration values that indicate the style of `input`.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`.

#### Remarks
The `TryParseExact` method parses the string representation of a time interval, which must be in the format defined by the `format` parameter, except that leading and trailing white-space characters are ignored. This method is similar to the `ParseExact` method, except that it does not throw an exception if the conversion fails.

The `format` parameter is a string that contains either a single standard format specifier, or one or more custom format specifiers that define the required format of `input`. For more information about valid format strings, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string if `format` is a standard format string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the formatting of the returned string.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used.

The `styles` parameter affects the interpretation of strings parsed using custom format strings. It determines whether `input` is interpreted as a negative time interval only if a negative sign is present (`None`), or whether it is always interpreted as a negative time interval (`AssumeNegative`). If `AssumeNegative` is not used, `format` must include a literal negative sign symbol (such as "\\-") to successfully parse a negative time interval.

#### Examples
The following example uses the `ParseExact` method to parse several string representations of time intervals using various format strings and cultures. It also uses the `AssumeNegative` value to interpret each string as a negative time interval. The output from the example illustrates that the `AssumeNegative` style affects the return value only when it is used with custom format strings.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TryParseExact/tryparseexactexample2.cs._
