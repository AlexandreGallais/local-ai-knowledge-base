---
title: "TimeSpan struct (part 7 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 7 of 11)

## TimeSpan.ParseExact(String, String[], IFormatProvider, TimeSpanStyles) method

```csharp
public static TimeSpan ParseExact (string input, string[] formats, IFormatProvider? formatProvider, System.Globalization.TimeSpanStyles styles);
```

Converts the string representation of a time interval to its `TimeSpan` equivalent by using the specified formats, culture-specific format information, and styles. The format of the string representation must match one of the specified formats exactly.

Parameters:

- `input`: A string that specifies the time interval to convert.
- `formats`: An array of standard or custom format strings that define the required format of `input`.
- `formatProvider`: An object that provides culture-specific formatting information.
- `styles`: A bitwise combination of enumeration values that defines the style elements that may be present in input.

Returns: A time interval that corresponds to `input`, as specified by `formats`, `formatProvider`, and `styles`.

Exceptions:

- `ArgumentException`: `styles` is an invalid `TimeSpanStyles` value.
- `ArgumentNullException`: `input` is `null`.
- `FormatException`: `input` has an invalid format.
- `OverflowException`: `input` represents a number that is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

-or-

At least one of the days, hours, minutes, or seconds components in `input` is outside its valid range.

#### Remarks
The `ParseExact` method parses the string representation of a time interval, which must be in one of the formats defined by the `formats` parameter, except that leading and trailing white-space characters are ignored. Because `input` must exactly conform to one of the formats specified in `formats`, you should always use exception handling when converting a string input by the user to a time interval. If you prefer not to use exception handling, you can call the `TryParseExact` method instead.

The `formats` parameter is a string array whose elements consist of either a single standard format specifier, or one or more custom format specifiers that define the required format of `input`. For more information about valid format strings, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings. `input` must correspond exactly to a member of `formats` for the parse operation to succeed. The parse operation attempts to match `input` to each element in `formats` starting with the first element in the array.

> **Important:**
>  The `TimeSpan.ParseExact` method uses the conventions of the culture specified by the `formatProvider` parameter only if the format string used to parse `input` is a standard `TimeSpan` format string whose value is either "g" or "G". The "c", "t", and "T" standard format strings use the formatting conventions of the invariant culture. Custom format strings define the precise format of the input string and use literal characters to separate the components of a time interval.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string if the format string used to parse `input` is a standard format string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the formatting of the returned string.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used.

The `styles` parameter affects the interpretation of strings that are parsed using custom format strings. It determines whether `input` is interpreted as a negative time interval only if a negative sign is present (`None`), or whether it is always interpreted as a negative time interval (`AssumeNegative`). If `AssumeNegative` is not used, `format` must include a literal negative sign symbol (such as "\\-") to successfully parse a negative time interval.

#### Examples
The following example calls the `ParseExact` method to convert each element of a string array to a `TimeSpan` value. The strings can represent a time interval in either the general short format or the general long format.

In addition, the example changes the way in which the time interval parsing methods interpret a single digit. Ordinarily, a single digit is interpreted as the number of days in a time interval. Instead, the `%h` custom format string is used to interpret a single digit as the number of hours. For this change to be effective, note that the `%h` custom format string must precede the other format strings in the `formats` array. Also note from the output that the `AssumeNegative` flag specified in the method call is used only when parsing a string with this format specifier.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/ParseExact/parseexactexample4.cs._

## TimeSpan.Subtract(TimeSpan) method

```csharp
public TimeSpan Subtract (TimeSpan ts);
```

Returns a new `TimeSpan` object whose value is the difference between the specified `TimeSpan` object and this instance.

Parameters:

- `ts`: The time interval to be subtracted.

Returns: A new time interval whose value is the result of the value of this instance minus the value of `ts`.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

#### Remarks
The return value must be between `MinValue` and `MaxValue`; otherwise, an exception is thrown.

The return value is a new `TimeSpan`; the original `TimeSpan` is not modified.

#### Examples
The following example uses the `TimeSpan.Subtract` method to calculate the difference between a single `TimeSpan` value and each of the time intervals in an array. Note that, because `TimeSpan` format strings do not include negative signs in the result string, the example uses conditional logic to include a negative sign with negative time intervals.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Subtract/subtract1.cs._

## TimeSpan.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current `TimeSpan` object to its equivalent string representation.

Returns: The string representation of the current `TimeSpan` value.

#### Remarks
The returned string is formatted with the "c" format specifier and has the following format:

-*hh*:*mm*:*ss*[.*fffffff*]

Elements in square brackets ([ and ]) may not be included in the returned string. Colons and periods (: and.) are literal characters. The non-literal elements are listed in the following table. Note that the string returned by the `ToString` method is not culture-sensitive.

|Item|Description|
|----------|-----------------|
|"-"|A minus sign, which indicates a negative time interval. No sign is included for a positive time span.|
|"*d*"|The number of days in the time interval. This element is omitted if the time interval is less than one day.|
|"*hh*"|The number of hours in the time interval, ranging from 0 to 23.|
|"*mm*"|The number of minutes in the time interval, ranging from 0 to 59.|
|"*ss*"|The number of seconds in the time interval, ranging from 0 to 59.|
|"*fffffff*"|Fractional seconds in the time interval. This element is omitted if the time interval does not include fractional seconds. If present, fractional seconds are always expressed using seven decimal digits.|

#### Examples
The following example displays the strings returned by calling the `TimeSpan.ToString` method with a number of `TimeSpan` values. Note that although the example does not call the `TimeSpan.ToString` method directly, it is called by the `Console.WriteLine` method when it attempts to convert a `TimeSpan` value to its string representation.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/ToString/ToString1.cs._

## TimeSpan.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the value of the current `TimeSpan` object to its equivalent string representation by using the specified format.

Parameters:

- `format`: A standard or custom `TimeSpan` format string.

Returns: The string representation of the current `TimeSpan` value in the format specified by the `format` parameter.

Exceptions:

- `FormatException`: The `format` parameter is not recognized or is not supported.

#### Remarks
The `format` parameter can be any valid standard or custom format specifier for `TimeSpan` values. If `format` is equal to `Empty` or is `null`, the return value of the current `TimeSpan` object is formatted with the common format specifier ("c"). If `format` is any other value, the method throws a `FormatException`.

If `format` is a standard format string, the format of the returned string is defined by the formatting conventions of the current culture.

> **Important:**
>  The custom format strings for `TimeSpan` values do not include a date or time separator. If you want to include these elements in your format string, you must treat them as character literals. See the example for an illustration, and see the Custom TimeSpan Format Strings topic for more information.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about format strings for `TimeSpan` values, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings.

- For more information about support for formatting in .NET, see Formatting Types.

#### Examples
The following example uses standard and custom `TimeSpan` format strings to display the string representation of each element in an array of `TimeSpan` values

_Code sample not included: ~/snippets/csharp/System/TimeSpan/ToString/tostring3.cs._

## TimeSpan.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? formatProvider);
```

Converts the value of the current `TimeSpan` object to its equivalent string representation by using the specified format and culture-specific formatting information.

Parameters:

- `format`: A standard or custom `TimeSpan` format string.
- `formatProvider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the current `TimeSpan` value, as specified by `format` and `formatProvider`.

Exceptions:

- `FormatException`: The `format` parameter is not recognized or is not supported.

#### Remarks
The `format` parameter can be any valid standard or custom format specifier for `TimeSpan` values. If `format` is equal to `Empty` or is `null`, the return value of the current `TimeSpan` object is formatted with the common format specifier ("c"). If format is any other value, the method throws a `FormatException`.

> **Important:**
>  The custom format strings for `TimeSpan` values do not include a date or time separator. If you want to include these elements in your format string, you must treat them as character literals. See the example for an illustration, and see the Custom TimeSpan Format Strings topic for more information.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about format strings for `TimeSpan` values, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings.

- For more information about support for formatting in .NET, see Formatting Types.

The `formatProvider` parameter is an `IFormatProvider` implementation that provides culture-specific information about the format of the returned string. The `formatProvider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the formatting of the returned string.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object that is associated with the current culture is used. If `format` is a custom format string, the `formatProvider` parameter is ignored.

#### Examples
The following example calls the `ToString` method to format two time intervals. The example calls the method twice for each format string, first to display it using the conventions of the en-US culture and then to display it using the conventions of the fr-FR culture.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/ToString/tostring4.cs._

## TimeSpan.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default, IFormatProvider? formatProvider = default);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `formatProvider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.
