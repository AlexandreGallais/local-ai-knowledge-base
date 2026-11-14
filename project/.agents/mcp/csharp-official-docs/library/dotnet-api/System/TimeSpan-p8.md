---
title: "TimeSpan struct (part 8 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 8 of 11)

## TimeSpan.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? formatProvider = default);
```

Tries to format the value of the current timespan number instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the charactes that represent a standard or custom format string that defines the acceptable format for `destination`.
- `formatProvider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## TimeSpan.TryParse(Char>, TimeSpan) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out TimeSpan result);
```

Converts the span representation of a time interval to its `TimeSpan` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing the time interval to convert.
- `result`: When this method returns, contains an object that represents the time interval specified by `s`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`. This operation returns `false` if the `s` parameter is `null` or `String.Empty`, has an invalid format, represents a time interval that is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>, or has at least one days, hours, minutes, or seconds component outside its valid range.

To be added.

## TimeSpan.TryParse(String, TimeSpan) method

```csharp
public static bool TryParse (string? s, out TimeSpan result);
```

Converts the string representation of a time interval to its `TimeSpan` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string that specifies the time interval to convert.
- `result`: When this method returns, contains an object that represents the time interval specified by `s`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`. This operation returns `false` if the `s` parameter is `null` or `String.Empty`, has an invalid format, represents a time interval that is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>, or has at least one days, hours, minutes, or seconds component outside its valid range.

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

The following example uses the `TimeSpan.TryParse` method to create `TimeSpan` objects from valid `TimeSpan` strings and to indicate when the parse operation has failed because the time span string is invalid.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/TryParse/TryParse1.cs._

## TimeSpan.TryParse(Char>, IFormatProvider, TimeSpan) method

```csharp
public static bool TryParse (ReadOnlySpan<char> input, IFormatProvider? formatProvider, out TimeSpan result);
```

Converts the span representation of a time interval to its `TimeSpan` equivalent by using the specified culture-specific formatting information, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `input`: A span containing the characters representing the time interval to convert.
- `formatProvider`: An object that supplies culture-specific formatting information.
- `result`: When this method returns, contains an object that represents the time interval specified by `input`, or `TimeSpan.Zero` if the conversion failed. This parameter is passed uninitialized.

Returns: `true` if `input` was converted successfully; otherwise, `false`. This operation returns `false` if the `input` parameter is `null` or `String.Empty`, has an invalid format, represents a time interval that is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>, or has at least one days, hours, minutes, or seconds component outside its valid range.

To be added.
