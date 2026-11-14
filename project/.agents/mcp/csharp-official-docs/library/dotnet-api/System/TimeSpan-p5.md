---
title: "TimeSpan struct (part 5 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 5 of 11)

## TimeSpan.Parse(String) method

```csharp
public static TimeSpan Parse (string s);
```

Converts the string representation of a time interval to its `TimeSpan` equivalent.

Parameters:

- `s`: A string that specifies the time interval to convert.

Returns: A time interval that corresponds to `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` has an invalid format.
- `OverflowException`: `s` represents a number that is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

At least one of the days, hours, minutes, or seconds components is outside its valid range.

The input string to the `TimeSpan.Parse` methods contains a time interval specification in the form:

`ws{ d | [d.]hh:mm[:ss[.ff]] }[ws]`

Elements in square brackets (`[` and `]`) are optional. One selection from the list of alternatives enclosed in braces (`{` and `}`) and separated by vertical bars (|) is required. The following table describes each element.

| Element | Description                                                                                                    |
|---------|----------------------------------------------------------------------------------------------------------------|
| *ws*    | Optional white space.                                                                                          |
| -     | An optional minus sign, which indicates a negative `TimeSpan`.                                     |
| *d*     | Days, ranging from 0 to 10675199.                                                                              |
| .       | A culture-sensitive symbol that separates days from hours. The invariant format uses a period (".") character. |
| *hh*    | Hours, ranging from 0 to 23.                                                                                   |
| :       | The culture-sensitive time separator symbol. The invariant format uses a colon (":") character.                |
| *mm*    | Minutes, ranging from 0 to 59.                                                                                 |
| *ss*    | Optional seconds, ranging from 0 to 59.                                                                        |
| *.*     | A culture-sensitive symbol that separates seconds from fractions of a second. The invariant format uses a period (".") character. |
| *ff*    | Optional fractional seconds, consisting of one to seven decimal digits. |

If the input string is not a day value only, it must include an hours and a minutes component; other components are optional. If they are present, the values of each time component must fall within a specified range. For example, the value of *hh*, the hours component, must be between 0 and 23. Because of this, passing "23:00:00" to the `TimeSpan.Parse` method returns a time interval of 23 hours. On the other hand, passing "24:00:00" returns a time interval of 24 days. Because "24" is outside the range of the hours component, it is interpreted as the days component.

The components of the input string must collectively specify a time interval that is greater than or equal to `MinValue` and less than or equal to `MaxValue`.

The `Parse` method tries to parse the input string by using each of the culture-specific formats for the current culture.

The following example uses the `TimeSpan.Parse` method to convert each element in a string array to a `TimeSpan` value. It changes the current system culture to Croatian - Croatia ("hr-HR") and English - United States ("en-US") to illustrate how the current system culture affects the parsing operation.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Parse/parse1.cs._

## TimeSpan.Parse(Char>, IFormatProvider) method

```csharp
public static TimeSpan Parse (ReadOnlySpan<char> input, IFormatProvider? formatProvider = default);
```

Converts the span representation of a time interval to its `TimeSpan` equivalent by using the specified culture-specific format information.

Parameters:

- `input`: A span containing the characters that represent the time interval to convert.
- `formatProvider`: An object that supplies culture-specific formatting information.

Returns: A time interval that corresponds to `input`, as specified by `formatProvider`.

To be added.

## TimeSpan.Parse(String, IFormatProvider) method

```csharp
public static TimeSpan Parse (string input, IFormatProvider? formatProvider);
```

Converts the string representation of a time interval to its `TimeSpan` equivalent by using the specified culture-specific format information.

Parameters:

- `input`: A string that specifies the time interval to convert.
- `formatProvider`: An object that supplies culture-specific formatting information.

Returns: A time interval that corresponds to `input`, as specified by `formatProvider`.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `FormatException`: `input` has an invalid format.
- `OverflowException`: `input` represents a number that is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

At least one of the days, hours, minutes, or seconds components in `input` is outside its valid range.

This method tries to parse `input` by using each of the culture-specific formats for the culture specified by `formatProvider`.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.
- A `DateTimeFormatInfo` object that defines the formatting of the returned string.
- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used.

The input string to the `TimeSpan.Parse` methods contains a time interval specification in the form:

`ws{ d | [d.]hh:mm[:ss[.ff]] }[ws]`

Elements in square brackets (`[` and `]`) are optional. One selection from the list of alternatives enclosed in braces (`{` and `}`) and separated by vertical bars (|) is required. The following table describes each element.

| Element | Description                                                                                                    |
|---------|----------------------------------------------------------------------------------------------------------------|
| *ws*    | Optional white space.                                                                                          |
| -     | An optional minus sign, which indicates a negative `TimeSpan`.                                     |
| *d*     | Days, ranging from 0 to 10675199.                                                                              |
| .       | A culture-sensitive symbol that separates days from hours. The invariant format uses a period (".") character. |
| *hh*    | Hours, ranging from 0 to 23.                                                                                   |
| :       | The culture-sensitive time separator symbol. The invariant format uses a colon (":") character.                |
| *mm*    | Minutes, ranging from 0 to 59.                                                                                 |
| *ss*    | Optional seconds, ranging from 0 to 59.                                                                        |
| *.*     | A culture-sensitive symbol that separates seconds from fractions of a second. The invariant format uses a period (".") character. |
| *ff*    | Optional fractional seconds, consisting of one to seven decimal digits. |

If the input string is not a day value only, it must include an hours and a minutes component; other components are optional. If they are present, the values of each time component must fall within a specified range. For example, the value of *hh*, the hours component, must be between 0 and 23. Because of this, passing "23:00:00" to the `TimeSpan.Parse` method returns a time interval of 23 hours. On the other hand, passing "24:00:00" returns a time interval of 24 days. Because "24" is outside the range of the hours component, it is interpreted as the days component.

The components of the input string must collectively specify a time interval that is greater than or equal to `MinValue` and less than or equal to `MaxValue`.

The `Parse` method tries to parse the input string by using each of the culture-specific formats for the current culture.

The following example defines an array of `CultureInfo` objects, and uses each object in calls to the `Parse` method to parse the elements in a string array. The example illustrates how the conventions of a specific culture influence the formatting operation.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Parse/parse2.cs._

## TimeSpan.ParseExact(String, String, IFormatProvider) method

```csharp
public static TimeSpan ParseExact (string input, string format, IFormatProvider? formatProvider);
```

Converts the string representation of a time interval to its `TimeSpan` equivalent by using the specified format and culture-specific format information. The format of the string representation must match the specified format exactly.

Parameters:

- `input`: A string that specifies the time interval to convert.
- `format`: A standard or custom format string that defines the required format of `input`.
- `formatProvider`: An object that provides culture-specific formatting information.

Returns: A time interval that corresponds to `input`, as specified by `format` and `formatProvider`.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `FormatException`: `input` has an invalid format.
- `OverflowException`: `input` represents a number that is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

At least one of the days, hours, minutes, or seconds components in `input` is outside its valid range.

#### Remarks
The `ParseExact` method parses the string representation of a time interval, which must be in the format defined by the `format` parameter, except that leading and trailing white-space characters are ignored. Because `input` must conform to the format of `format` exactly, you should always use exception handling when converting a string input by the user to a time interval. If you prefer not to use exception handling, you can call the `TryParseExact` method instead.

The `format` parameter is a string that contains either a single standard format specifier, or one or more custom format specifiers that define the required format of `input`. For more information about valid format strings, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings.

> **Important:**
>  The `TimeSpan.ParseExact` method uses the conventions of the culture specified by the `formatProvider` parameter only if `format` is a standard `TimeSpan` format string whose value is either "g" or "G". The "c", "t", and "T" standard format strings use the formatting conventions of the invariant culture. Custom format strings define the precise format of the input string and use literal characters to separate the components of a time interval.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string if `format` is a standard format string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the formatting of the returned string.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used.

#### Examples
The following example uses the `ParseExact` method to parse several string representations of time intervals using various format strings and cultures.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/ParseExact/parseexactexample1.cs._
