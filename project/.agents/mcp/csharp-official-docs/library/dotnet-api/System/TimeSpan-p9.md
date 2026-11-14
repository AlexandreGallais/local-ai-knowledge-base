---
title: "TimeSpan struct (part 9 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 9 of 11)

## TimeSpan.TryParse(String, IFormatProvider, TimeSpan) method

```csharp
public static bool TryParse (string? input, IFormatProvider? formatProvider, out TimeSpan result);
```

Converts the string representation of a time interval to its `TimeSpan` equivalent by using the specified culture-specific formatting information, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `input`: A string that specifies the time interval to convert.
- `formatProvider`: An object that supplies culture-specific formatting information.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`. This operation returns `false` if the `input` parameter is `null` or `String.Empty`, has an invalid format, represents a time interval that is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>, or has at least one days, hours, minutes, or seconds component outside its valid range.

#### TryParse(System.String,System.TimeSpan@) method

The `TryParse` method is like the `Parse` method, except that it doesn't throw an exception if the conversion fails.

The `s` parameter contains a time interval specification in the form:

`ws{ d | d.hh:mm[:ss[.ff]] | hh:mm[:ss[.ff]] }[ws]`

Elements in square brackets ([ and ]) are optional. One selection from the list of alternatives enclosed in braces ({ and }) and separated by vertical bars (|) is required. The following table describes each element.

| Element | Description                                                                                     |
|---------|-------------------------------------------------------------------------------------------------|
| *ws*    | Optional white space.                                                                           |
| -       | An optional minus sign, which indicates a negative `TimeSpan`.                      |
| *d*     | Days, ranging from 0 to 10675199.                                                               |
| .       | A culture-sensitive symbol that separates days from hours. The invariant format uses a period (".") character.|
| *hh*    | Hours, ranging from 0 to 23.                                                                    |
| :       | The culture-sensitive time separator symbol. The invariant format uses a colon (":") character. |
| *mm*    | Minutes, ranging from 0 to 59.                                                                  |
| *ss*    | Optional seconds, ranging from 0 to 59.                                                         |
| .       | A culture-sensitive symbol that separates seconds from fractions of a second. The invariant format uses a period (".") character.|
| *ff*    | Optional fractional seconds, consisting of one to seven decimal digits.                         |

The components of `s` must collectively specify a time interval that's greater than or equal to `MinValue` and less than or equal to `MaxValue`.

The `Parse` method tries to parse `s` by using each of the culture-specific formats for the current culture.

#### `TryParse` method

The `TryParse` method is like the `Parse` method, except that it does not throw an exception if the conversion fails.

The `input` parameter contains a time interval specification in the form:

`ws{ d | d.hh:mm[:ss[.ff]] | hh:mm[:ss[.ff]] }[ws]`

Elements in square brackets ([ and ]) are optional. One selection from the list of alternatives enclosed in braces ({ and }) and separated by vertical bars (|) is required. The following table describes each element.

| Element | Description                                                                                                    |
|---------|----------------------------------------------------------------------------------------------------------------|
| *ws*    | Optional white space.                                                                                          |
| -       | An optional minus sign, which indicates a negative `TimeSpan`.                                     |
| *d*     | Days, ranging from 0 to 10675199.                                                                              |
| .       | A culture-sensitive symbol that separates days from hours. The invariant format uses a period (".") character. |
| *hh*    | Hours, ranging from 0 to 23.                                                                                   |
| :       | The culture-sensitive time separator symbol. The invariant format uses a colon (":") character.                |
| *mm*    | Minutes, ranging from 0 to 59.                                                                                 |
| *ss*    | Optional seconds, ranging from 0 to 59.                                                                        |
| .       | A culture-sensitive symbol that separates seconds from fractions of a second. The invariant format uses a period (".") character. |
| *ff*    | Optional fractional seconds, consisting of one to seven decimal digits. |

The components of `input` must collectively specify a time interval that is greater than or equal to `MinValue` and less than or equal to `MaxValue`.

The `TryParse` method tries to parse `input` by using each of the culture-specific formats for the culture specified by `formatProvider`.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.
- A `DateTimeFormatInfo` object that defines the formatting of the returned string.
- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used.

The following example defines an array of `CultureInfo` objects, and uses each object in calls to the `TryParse` method to parse the elements in a string array. The example illustrates how the conventions of a specific culture influence the formatting operation.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TryParse/tryparse2.cs._

## TimeSpan.TryParseExact(Char>, Char>, IFormatProvider, TimeSpan) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> input, ReadOnlySpan<char> format, IFormatProvider? formatProvider, out TimeSpan result);
```

Converts the specified span representation of a time interval to its `TimeSpan` equivalent by using the specified format and culture-specific format information. The format of the string representation must match the specified format exactly.

Parameters:

- `input`: A span containing the characters that represent a time interval to convert.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`.

To be added.

## TimeSpan.TryParseExact(Char>, String[], IFormatProvider, TimeSpan) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> input, string?[]? formats, IFormatProvider? formatProvider, out TimeSpan result);
```

Converts the specified span representation of a time interval to its `TimeSpan` equivalent by using the specified formats and culture-specific format information. The format of the string representation must match one of the specified formats exactly.

Parameters:

- `input`: A span containing the characters that represent a time interval to convert.
- `formats`: An array of standard or custom format strings that define the acceptable formats of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`.

To be added.

## TimeSpan.TryParseExact(String, String, IFormatProvider, TimeSpan) method

```csharp
public static bool TryParseExact (string? input, string? format, IFormatProvider? formatProvider, out TimeSpan result);
```

Converts the string representation of a time interval to its `TimeSpan` equivalent by using the specified format and culture-specific format information. The format of the string representation must match the specified format exactly.

Parameters:

- `input`: A string that specifies the time interval to convert.
- `format`: A standard or custom format string that defines the required format of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`.

#### Remarks
The `TryParseExact` method parses the string representation of a time interval, which must be in the format defined by the `format` parameter, except that leading and trailing white-space characters are ignored. This method is similar to the `ParseExact` method, except that it does not throw an exception if the conversion fails.

The `format` parameter is a string that contains either a single standard format specifier, or one or more custom format specifiers that define the required format of `input`. For more information about valid format strings, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings.

> **Important:**
>  The `TryParseExact` method uses the conventions of the culture specified by the `formatProvider` parameter only if `format` is a standard `TimeSpan` format string whose value is either "g" or "G". The "c", "t", and "T" standard format strings use the formatting conventions of the invariant culture. Custom format strings define the precise format of the input string and use literal characters to separate the components of a time interval.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string if `format` is a standard format string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the formatting of the returned string.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used.

#### Examples
The following example uses the `TryParseExact` method to parse several string representations of time intervals using various format strings and cultures.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TryParseExact/tryparseexactexample1.cs._
