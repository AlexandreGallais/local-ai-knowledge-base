---
title: "DateTime struct (part 15 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 15 of 18)

## DateTime.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the value of the current `DateTime` object to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: A string representation of value of the current `DateTime` object as specified by `provider`.

Exceptions:

- `ArgumentOutOfRangeException`: The date and time is outside the range of dates supported by the calendar used by `provider`.

#### Remarks
The value of the current `DateTime` object is formatted using the general date and time format specifier ('G'), which formats output using the short date pattern and the long time pattern.

The format of the short date and long time pattern is defined by the `provider` parameter. The `provider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `provider` is `null`, the `DateTimeFormatInfo` object associated with the current culture is used. For more information, see `CultureInfo.CurrentCulture`.

#### Examples
The following example displays the string representation of a date and time using `CultureInfo` objects that represent five different cultures.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToString/ToString4.cs._

## DateTime.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the value of the current `DateTime` object to its equivalent string representation using the specified format and the formatting conventions of the current culture.

Parameters:

- `format`: A standard or custom date and time format string.

Returns: A string representation of value of the current `DateTime` object as specified by `format`.

Exceptions:

- `FormatException`: The length of `format` is 1, and it is not one of the format specifier characters defined for `DateTimeFormatInfo`.

-or-

`format` does not contain a valid custom format pattern.
- `ArgumentOutOfRangeException`: The date and time is outside the range of dates supported by the calendar used by the current culture.

#### Remarks
The `ToString` method returns the string representation of a date and time value in a specific format that uses the formatting conventions of the current culture; for more information, see `CultureInfo.CurrentCulture`.

The `format` parameter should contain either a single format specifier character (see Standard Date and Time Format Strings) or a custom format pattern (see Custom Date and Time Format Strings) that defines the format of the returned string. If `format` is `null` or an empty string, the general format specifier, 'G', is used.

Some uses of this method include:

- Getting a string that displays the date and time in the current culture's short date and time format. To do this, you use the "G" format specifier.

- Getting a string that contains only the month and year. To do this, you use the "MM/yyyy" format string. The format string uses the current culture's date separator.

- Getting a string that contains the date and time in a specific format. For example, the "MM/dd/yyyyHH:mm" format string displays the date and time string in a fixed format such as "19//03//2013 18:06". The format string uses "/" as a fixed date separator regardless of culture-specific settings.

- Getting a date in a condensed format that could be used for serializing a date string. For example, the "yyyyMMdd" format string displays a four-digit year followed by a two-digit month and a two-digit day with no date separator.

The following example uses these three format strings to display a date and time value by using the conventions of the en-US and fr-FR cultures.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToString/tostring5.cs._

#### Examples
The following example uses each of the standard date and time format strings and a selection of custom date and time format strings to display the string representation of a `DateTime` value. The thread current culture for the example is en-US.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToString/ToString2.cs._

## DateTime.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the value of the current `DateTime` object to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A standard or custom date and time format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A string representation of value of the current `DateTime` object as specified by `format` and `provider`.

Exceptions:

- `FormatException`: The length of `format` is 1, and it is not one of the format specifier characters defined for `DateTimeFormatInfo`.

-or-

`format` does not contain a valid custom format pattern.
- `ArgumentOutOfRangeException`: The date and time is outside the range of dates supported by the calendar used by `provider`.

#### Remarks
The `format` parameter can contain either a single format specifier character (see Standard Date and Time Format Strings) or a custom format pattern (see Custom Date and Time Format Strings). If `format` is `null` or an empty string (""), the standard format specifier, "G", is used.

The `provider` parameter defines the pattern that corresponds to the standard format specifiers, as well as the symbols and names of date and time components. The `provider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are to be reflected in the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

- A custom object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `DateTimeFormatInfo` object that provides formatting information.

If `provider` is `null`, the `DateTimeFormatInfo` associated with the current culture is used. For more information, see `CultureInfo.CurrentCulture`.

#### Examples
The following example uses each of the standard date time format strings to display the string representation of a date and time for four different cultures.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToString/tostring3.cs._

The following example demonstrates different ways of formatting a `DateTime` value using the invariant `DateTimeFormatInfo`.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToString/source.cs._

## DateTime.ToUniversalTime() method

```csharp
public DateTime ToUniversalTime ();
```

Converts the value of the current `DateTime` object to Coordinated Universal Time (UTC).

Returns: An object whose `DateTime.Kind` property is `DateTimeKind.Utc`, and whose value is the UTC equivalent to the value of the current `DateTime` object, or <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see> if the converted value is too large to be represented by a `DateTime` object, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the converted value is too small to be represented by a `DateTime` object.

#### Remarks
The Coordinated Universal Time (UTC) is equal to the local time minus the UTC offset. For more information about the UTC offset, see `TimeZoneInfo.GetUtcOffset`. The conversion also takes into account the daylight saving time rule that applies to the time represented by the current `DateTime` object.

The value returned by the `DateTime.ToUniversalTime` method is determined by the `Kind` property of the current `DateTime` object. The following table describes the possible results.

| Kind                                   | Results                                                        |
|----------------------------------------|----------------------------------------------------------------|
| `Utc`         | No conversion is performed.                                    |
| `Local`       | The current `DateTime` object is converted to UTC. |
| `Unspecified` | The current `DateTime` object is assumed to be a local time, and the conversion is performed as if `DateTime.Kind` were `Local`. |

> **Note:**
> The `DateTime.ToUniversalTime` method converts a `DateTime` value from local time to UTC. To convert the time in a non-local time zone to UTC, use the `ConvertTimeToUtc` method. To convert a time whose offset from UTC is known, use the `DateTimeOffset.ToUniversalTime` method.

If the date and time instance value is an ambiguous time, this method assumes that it is a standard time. (An ambiguous time is one that can map either to a standard time or to a daylight saving time in the local time zone) If the date and time instance value is an invalid time, this method simply subtracts the local time from the local time zone's UTC offset to return UTC. (An invalid time is one that does not exist because of the application of daylight saving time adjustment rules.)

#### Examples
The following example demonstrates the `DateTime.ToUniversalTime` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToLocalTime/class1.cs._

The following example uses the `DateTime.SpecifyKind` method to demonstrate how the `Kind` property influences the `DateTime.ToLocalTime` and `DateTime.ToUniversalTime` conversion methods.

_Code sample not included: ~/snippets/csharp/System/DateTime/Kind/ks.cs._

## DateTime.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## DateTime.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current datetime instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## DateTime.TryParse(Char>, DateTime) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out DateTime result);
```

Converts the specified char span of a date and time to its `DateTime` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing a date and time to convert.
- `result`: When this method returns, contains the `DateTime` value equivalent to the date and time contained in `s`, if the conversion succeeded, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is `null`, is an empty string (""), or does not contain a valid string representation of a date and time. This parameter is passed uninitialized.

Returns: `true` if the `s` parameter was converted successfully; otherwise, `false`.

To be added.
