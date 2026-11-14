---
title: "DateOnly struct (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateOnly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateOnly struct (part 2 of 3)

## DateOnly.ParseExact(String, String) method

```csharp
public static DateOnly ParseExact (string s, string format);
```

Converts the specified string representation of a date to its `DateOnly` equivalent using the specified format.
The format of the string representation must match the specified format exactly or an exception is thrown.

Parameters:

- `s`: A string containing the characters that represent a date to convert.
- `format`: A string that represent a format specifier that defines the required format of `s`.

Returns: An object that is equivalent to the date contained in `s`, as specified by format.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date.

#### Remarks
The `ParseExact` method parses the string representation of a date, which must be in the format defined by the `format` parameter. It also requires that the \<Date> element of the string representation of a date appear in the order specified by `format`, and that `s` have no white space other than that permitted by `format`.
The `format` parameter is a string that contains either a single standard format specifier, or one or more custom format specifiers that define the required format of `s`. For details about valid formatting codes, see Standard Date and Time Format Strings or Custom Date and Time Format Strings.
> **Note:**
> If `format` is a custom format pattern that does not include date separators (such as "yyyyMMdd"), use the widest form of each custom format specifier. For example, if you want to specify months in the format pattern, specify the wider form, "MM", instead of the narrower form, "M".

## DateOnly.ParseExact(String, String[]) method

```csharp
public static DateOnly ParseExact (string s, string[] formats);
```

Converts the specified span representation of a date to its `DateOnly` equivalent using the specified array of formats.
The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A span containing the characters that represent a date to convert.
- `formats`: An array of allowable formats of `s`.

Returns: An object that is equivalent to the date contained in `s`, as specified by format, provider, and style.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date.

To be added.

## DateOnly.ParseExact(Char>, Char>, IFormatProvider, DateTimeStyles) method

```csharp
public static DateOnly ParseExact (ReadOnlySpan<char> s, ReadOnlySpan<char> format, IFormatProvider? provider = default, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified span representation of a date to its `DateOnly` equivalent using the specified format, culture-specific format information, and style.
The format of the string representation must match the specified format exactly or an exception is thrown.

Parameters:

- `s`: A span containing the characters that represent a date to convert.
- `format`: A span containing the characters that represent a format specifier that defines the required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date contained in `s`, as specified by format, provider, and style.

Exceptions:

- `FormatException`: `s` does not contain a valid string representation of a date.

To be added.

## DateOnly.ParseExact(Char>, String[], IFormatProvider, DateTimeStyles) method

```csharp
public static DateOnly ParseExact (ReadOnlySpan<char> s, string[] formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified span representation of a date to its `DateOnly` equivalent using the specified array of formats, culture-specific format information, and style.
The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A span containing the characters that represent a date to convert.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date contained in `s`, as specified by format, provider, and style.

To be added.

## DateOnly.ParseExact(String, String, IFormatProvider, DateTimeStyles) method

```csharp
public static DateOnly ParseExact (string s, string format, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified string representation of a date to its `DateOnly` equivalent using the specified format, culture-specific format information, and style.
The format of the string representation must match the specified format exactly or an exception is thrown.

Parameters:

- `s`: A string containing the characters that represent a date to convert.
- `format`: A string containing the characters that represent a format specifier that defines the required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of the enumeration values that provides additional information about `s`, about style elements that may be present in `s`, or about the conversion from `s` to a `DateOnly` value. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date contained in `s`, as specified by format, provider, and style.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date.

To be added.

## DateOnly.ParseExact(String, String[], IFormatProvider, DateTimeStyles) method

```csharp
public static DateOnly ParseExact (string s, string[] formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified string representation of a date to its `DateOnly` equivalent using the specified array of formats, culture-specific format information, and style.
The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A string containing the characters that represent a date to convert.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date contained in `s`, as specified by format, provider, and style.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date.

To be added.

## DateOnly.ToDateTime(TimeOnly) method

```csharp
public DateTime ToDateTime (TimeOnly time);
```

Returns a `DateTime` that is set to the date of this `DateOnly` instance and the time of specified input time.

Parameters:

- `time`: The time of the day.

Returns: The `DateTime` instance composed of the date of the current `DateOnly` instance and the time specified by the input time.

#### Remarks

The `Kind` property of the resulting `DateTime` is initialized to `Unspecified`.

## DateOnly.ToDateTime(TimeOnly, DateTimeKind) method

```csharp
public DateTime ToDateTime (TimeOnly time, DateTimeKind kind);
```

Returns a `DateTime` instance with the specified input kind that is set to the date of this `DateOnly` instance and the time of specified input time.

Parameters:

- `time`: The time of the day.
- `kind`: One of the enumeration values that indicates whether ticks specifies a local time, Coordinated Universal Time (UTC), or neither.

Returns: The `DateTime` instance composed of the date of the current `DateOnly` instance and the time specified by the input time.

To be added.

## DateOnly.ToLongDateString() method

```csharp
public string ToLongDateString ();
```

Converts the value of the current `DateOnly` object to its equivalent long date string representation.

Returns: A string that contains the long date string representation of the current `DateOnly` object.

To be added.

## DateOnly.ToShortDateString() method

```csharp
public string ToShortDateString ();
```

Converts the value of the current `DateOnly` object to its equivalent short date string representation.

Returns: A string that contains the short date string representation of the current `DateOnly` object.

To be added.

## DateOnly.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current `DateOnly` object to its equivalent string representation using the formatting conventions of the current culture.
The `DateOnly` object will be formatted in short form.

Returns: A string that contains the short date string representation of the current `DateOnly` object.

To be added.

## DateOnly.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the value of the current `DateOnly` object to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: A string representation of value of the current `DateOnly` object as specified by provider.

To be added.

## DateOnly.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the value of the current `DateOnly` object to its equivalent string representation using the specified format and the formatting conventions of the current culture.

Parameters:

- `format`: A standard or custom date format string.

Returns: A string representation of value of the current `DateOnly` object as specified by format.

To be added.

## DateOnly.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the value of the current `DateOnly` object to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `format`: A standard or custom date format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A string representation of value of the current `DateOnly` object as specified by format and provider.

To be added.

## DateOnly.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## DateOnly.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current `DateOnly` instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## DateOnly.TryParse(Char>, DateOnly) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out DateOnly result);
```

Converts the specified span representation of a date to its `DateOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing the date to convert.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is empty string, or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## DateOnly.TryParse(String, DateOnly) method

```csharp
public static bool TryParse (string? s, out DateOnly result);
```

Converts the specified string representation of a date to its `DateOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing the characters representing the date to convert.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is empty string, or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.
