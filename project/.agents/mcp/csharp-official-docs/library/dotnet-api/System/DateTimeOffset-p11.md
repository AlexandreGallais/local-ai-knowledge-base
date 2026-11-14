---
title: "DateTimeOffset struct (part 11 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 11 of 15)

## DateTimeOffset.ToOffset(TimeSpan) method

```csharp
public DateTimeOffset ToOffset (TimeSpan offset);
```

Converts the value of the current `DateTimeOffset` object to the date and time specified by an offset value.

Parameters:

- `offset`: The offset to convert the `DateTimeOffset` value to.

Returns: An object that is equal to the original `DateTimeOffset` object (that is, their `DateTimeOffset.ToUniversalTime` methods return identical points in time) but whose `DateTimeOffset.Offset` property is set to `offset`.

Exceptions:

- `ArgumentException`: The resulting `DateTimeOffset` object has a `DateTimeOffset.DateTime` value earlier than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` object has a `DateTimeOffset.DateTime` value later than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.
- `ArgumentOutOfRangeException`: `offset` is less than -14 hours.

-or-

`offset` is greater than 14 hours.

#### Remarks
The `DateTimeOffset.ToOffset` method is an alternative to calling the `ConvertTime` method. It can be useful for performing simple conversions from one time zone to another when the time zones' offsets from Coordinated Universal Time (UTC) are known. However, because neither the original `DateTimeOffset` object nor the new `DateTimeOffset` object returned by the method call are unambiguously related to a particular time zone, the method does not apply any time zone adjustment rules in the conversion.

#### Examples
The following example illustrates how to use the `DateTimeOffset.ToOffset` method to convert a `DateTimeOffset` object to a `DateTimeOffset` object with a different offset.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ToOffset/ToOffset.cs._

## DateTimeOffset.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current `DateTimeOffset` object to its equivalent string representation.

Returns: A string representation of a `DateTimeOffset` object that includes the offset appended at the end of the string.

Exceptions:

- `ArgumentOutOfRangeException`: The date and time is outside the range of dates supported by the calendar used by the current culture.

#### Remarks
The return value of this method is identical to that of the `ToString` method, except that it includes a space followed by the offset appended at the end of the string. In other words, it formats output using the short date pattern, the long time pattern, and the `zzz` custom format string, with each element separated from the previous element by a space. For example, if `ToString` returns a value of 1/12/2008 6:15:50 PM, `ToString` returns a value of 1/12/2008 6:15:50 PM -08:00 for a time that is eight hours behind Coordinated Universal Time (UTC).

This method uses formatting information derived from the current culture. For more information, see `CultureInfo.CurrentCulture`. Other overloads of the `DateTimeOffset.ToString` method enable you to specify the culture whose formatting to use, and to define the output pattern of the `DateTimeOffset` value.

#### Examples
The following example illustrates calls to the `ToString` method and displays its output on a system whose current culture is en-us.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ToString/ToString.cs._

## DateTimeOffset.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? formatProvider);
```

Converts the value of the current `DateTimeOffset` object to its equivalent string representation using the specified culture-specific formatting information.

Parameters:

- `formatProvider`: An object that supplies culture-specific formatting information.

Returns: A string representation of the value of the current `DateTimeOffset` object, as specified by `formatProvider`.

Exceptions:

- `ArgumentOutOfRangeException`: The date and time is outside the range of dates supported by the calendar used by `formatProvider`.

#### Remarks
The return value of this method is identical to that of its equivalent overload of the `DateTime.ToString` method, except that it includes a space followed by the offset appended at the end of the string. In other words, it formats output using the short date pattern, the long time pattern, and the `zzz` custom format string, with each element separated from the previous element by a space.

The format of these three elements is defined by the `formatProvider` parameter. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture whose formatting conventions are applied to the returned string. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting of the returned string.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object associated with the current culture is used (see `CultureInfo.CurrentCulture`).

#### Examples
The following example displays a `DateTimeOffset` object using `CultureInfo` objects that represent the invariant culture, as well as four other cultures.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ToString/ToString.cs._

## DateTimeOffset.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the value of the current `DateTimeOffset` object to its equivalent string representation using the specified format.

Parameters:

- `format`: A format string.

Returns: A string representation of the value of the current `DateTimeOffset` object, as specified by `format`.

Exceptions:

- `FormatException`: The length of `format` is one, and it is not one of the standard format specifier characters defined for `DateTimeFormatInfo`.

-or-

`format` does not contain a valid custom format pattern.
- `ArgumentOutOfRangeException`: The date and time is outside the range of dates supported by the calendar used by the current culture.

#### Remarks
The `format` parameter should contain either a single format specifier character (see Standard Date and Time Format Strings) or a custom format pattern (see Custom Date and Time Format Strings) that defines the format of the returned string. If `format` is a null or empty string (""), the `DateTimeOffset` value is output using the default format.

The following table shows the exact operation of certain format specifiers when used with `DateTimeOffset`, which differs from their behavior when used with `DateTime`.

|Existing format specifier|New behavior|
|-------------------------------|------------------|
|"K"|Designed to round-trip a date and time. With `DateTimeOffset`, maps to "zzz" (the offset is always displayed with hours and minutes). Note that "K" is a custom format specifier; it cannot appear as the single character in `format`.|
|"U"|Not supported.|
|"r"|Converts the `DateTimeOffset` object to Coordinated Universal Time (UTC) and outputs it using the custom format string `ddd, dd MMM yyyy HH:mm:ss GMT`.|
|"u"|Converts the `DateTimeOffset` object to UTC and outputs it using the format `yyyy-MM-dd HH:mm:ssZ`.|

The remaining standard date and time format specifiers behave the same with the `ToString` method as they do with the `DateTime.ToString` method.

This method uses formatting information derived from the current culture. For more information, see `CultureInfo.CurrentCulture`.

#### Examples
The following example displays a `DateTimeOffset` object to the console using each of the standard date and time format specifiers. The output is formatted by using the en-us culture.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ToString/ToString.cs._

## DateTimeOffset.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? formatProvider);
```

Converts the value of the current `DateTimeOffset` object to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A format string.
- `formatProvider`: An object that supplies culture-specific formatting information.

Returns: A string representation of the value of the current `DateTimeOffset` object, as specified by `format` and `formatProvider`.

Exceptions:

- `FormatException`: The length of `format` is one, and it is not one of the standard format specifier characters defined for `DateTimeFormatInfo`.

-or-

`format` does not contain a valid custom format pattern.
- `ArgumentOutOfRangeException`: The date and time is outside the range of dates supported by the calendar used by `formatProvider`.

#### Remarks
The `format` parameter should contain either a single format specifier character (see Standard Date and Time Format Strings) or a custom format pattern (see Custom Date and Time Format Strings). If `format` is a null or empty string (""), the `DateTimeOffset` object is output using the default format.

The following table shows the exact operation of certain format specifiers when used with `DateTimeOffset`, which differs from their behavior when used with `DateTime`.

|Existing format specifier|New behavior|
|-------------------------------|------------------|
|"K"|Designed to round-trip a date and time. With `DateTimeOffset`, maps to "zzz" (the offset is always displayed with hours and minutes). Note that "K" is a custom format specifier; it cannot appear as the single character in `format`.|
|"U"|Not supported.|
|"r"|Converts the `DateTimeOffset` object to Coordinated Universal Time (UTC) and outputs it using the custom format string `ddd, dd MMM yyyy HH:mm:ss GMT`.|
|"u"|Converts the `DateTimeOffset` value to UTC and outputs it using the format `yyyy-MM-dd HH:mm:ssZ`.|

The remaining standard date and time format specifiers behave the same with the `ToString` method as they do with the `DateTime.ToString` method.

The pattern that corresponds to standard format specifiers, as well as the symbols and names of date and time components, is defined by the `formatProvider` parameter. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture whose formatting is used in `input`. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting used in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatProvider` is `null`, the `DateTimeFormatInfo` object associated with the current culture is used (see `CultureInfo.CurrentCulture`).

#### Examples
The following example uses the `ToString` method to display a `DateTimeOffset` object using a custom format string for several different cultures.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ToString/ToString.cs._

## DateTimeOffset.ToUniversalTime() method

```csharp
public DateTimeOffset ToUniversalTime ();
```

Converts the current `DateTimeOffset` object to a `DateTimeOffset` value that represents the Coordinated Universal Time (UTC).

Returns: An object that represents the date and time of the current `DateTimeOffset` object converted to Coordinated Universal Time (UTC).

#### Remarks
This method returns a `DateTimeOffset` object whose `Offset` property is set to zero.

Both the value of the current `DateTimeOffset` object and the value of the `DateTimeOffset` object returned by the method call represent the same point in time. That is, if both are passed to the `Equals` method, the method will return `true`.

#### Examples
The following example calls the `DateTimeOffset.ToUniversalTime` method to convert a local time and several other times to Coordinated Universal Time (UTC).

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.ToUnixTimeMilliseconds() method

```csharp
public long ToUnixTimeMilliseconds ();
```

Returns the number of milliseconds that have elapsed since 1970-01-01T00:00:00.000Z.

Returns: The number of milliseconds that have elapsed since 1970-01-01T00:00:00.000Z.

#### Remarks
Unix time represents the number of seconds that have elapsed since 1970-01-01T00:00:00Z (January 1, 1970, at 12:00 AM UTC). It does not take leap seconds into account. This method returns the number of milliseconds in Unix time.

This method first converts the current instance to UTC before returning the number of milliseconds in its Unix time. For date and time values before 1970-01-01T00:00:00Z, this method returns a negative value.

## DateTimeOffset.ToUnixTimeSeconds() method

```csharp
public long ToUnixTimeSeconds ();
```

Returns the number of seconds that have elapsed since 1970-01-01T00:00:00Z.

Returns: The number of seconds that have elapsed since 1970-01-01T00:00:00Z.

#### Remarks
Unix time represents the number of seconds that have elapsed since 1970-01-01T00:00:00Z (January 1, 1970, at 12:00 AM UTC). It does not take leap seconds into account.

This method first converts the current instance to UTC before returning its Unix time. For date and time values before 1970-01-01T00:00:00Z, this method returns a negative value.

#### Examples
The following example calls the `DateTimeOffset.ToUnixTimeSeconds` method to return the Unix time of values that are equal to, shortly before, and shortly after 1970-01-01T00:00:00Z.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ToUnixTimeSeconds/tounixtimeseconds1.cs._

## DateTimeOffset.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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
