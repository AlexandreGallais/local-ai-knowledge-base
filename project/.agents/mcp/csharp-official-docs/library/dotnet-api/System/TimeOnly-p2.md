---
title: "TimeOnly struct (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeOnly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeOnly struct (part 2 of 4)

## TimeOnly.op_GreaterThan(TimeOnly, TimeOnly) method

```csharp
public static bool operator > (TimeOnly left, TimeOnly right);
```

Determines whether one specified `TimeOnly` is later than another specified `TimeOnly`.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left is later than right; otherwise, `false`.

To be added.

## TimeOnly.op_GreaterThanOrEqual(TimeOnly, TimeOnly) method

```csharp
public static bool operator >= (TimeOnly left, TimeOnly right);
```

Determines whether one specified `TimeOnly` represents a time that is the same as or later than another specified `TimeOnly`.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left is the same as or later than right; otherwise, `false`.

To be added.

## TimeOnly.op_Inequality(TimeOnly, TimeOnly) method

```csharp
public static bool operator != (TimeOnly left, TimeOnly right);
```

Determines whether two specified instances of `TimeOnly` are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left and right do not represent the same time; otherwise, `false`.

To be added.

## TimeOnly.op_LessThan(TimeOnly, TimeOnly) method

```csharp
public static bool operator < (TimeOnly left, TimeOnly right);
```

Determines whether one specified `TimeOnly` is earlier than another specified `TimeOnly`.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left is earlier than right; otherwise, `false`.

To be added.

## TimeOnly.op_LessThanOrEqual(TimeOnly, TimeOnly) method

```csharp
public static bool operator <= (TimeOnly left, TimeOnly right);
```

Determines whether one specified `TimeOnly` represents a time that is the same as or earlier than another specified `TimeOnly`.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left is the same as or earlier than right; otherwise, `false`.

To be added.

## TimeOnly.op_Subtraction(TimeOnly, TimeOnly) method

```csharp
public static TimeSpan operator - (TimeOnly t1, TimeOnly t2);
```

Gives the elapsed time between two points on a circular clock, which will always be a positive value.

Parameters:

- `t1`: The first `TimeOnly` instance.
- `t2`: The second `TimeOnly` instance..

Returns: The elapsed time between `t1` and `t2`.

To be added.

## TimeOnly.Parse(String) method

```csharp
public static TimeOnly Parse (string s);
```

Converts the string representation of a time to its `TimeOnly` equivalent by using the conventions of the current culture.

Parameters:

- `s`: The string to parse.

Returns: A `TimeOnly` instance.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.Parse(Char>, IFormatProvider) method

```csharp
public static TimeOnly Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: A span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## TimeOnly.Parse(String, IFormatProvider) method

```csharp
public static TimeOnly Parse (string s, IFormatProvider? provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## TimeOnly.Parse(Char>, IFormatProvider, DateTimeStyles) method

```csharp
public static TimeOnly Parse (ReadOnlySpan<char> s, IFormatProvider? provider = default, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts a memory span that contains string representation of a time to its `TimeOnly` equivalent by using culture-specific format information and a formatting style.

Parameters:

- `s`: The memory span that contains the time to parse.
- `provider`: The culture-specific format information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: A `TimeOnly` instance.

Exceptions:

- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.Parse(String, IFormatProvider, DateTimeStyles) method

```csharp
public static TimeOnly Parse (string s, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the string representation of a time to its `TimeOnly` equivalent by using culture-specific format information and a formatting style.

Parameters:

- `s`: The string containing the time to parse.
- `provider`: The culture-specific format information about `s`.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in s for the parse operation to succeed, and that defines how to interpret the parsed date. A typical value to specify is `DateTimeStyles.None`.

Returns: A`TimeOnly` instance.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.ParseExact(Char>, String[]) method

```csharp
public static TimeOnly ParseExact (ReadOnlySpan<char> s, string[] formats);
```

Converts the specified span to its `TimeOnly` equivalent using the specified array of formats.
The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A span containing the time to convert.
- `formats`: An array of allowable formats of `s`.

Returns: A `TimeOnly` instance.

Exceptions:

- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.ParseExact(String, String) method

```csharp
public static TimeOnly ParseExact (string s, string format);
```

Converts the specified string representation of a time to its `TimeOnly` equivalent using the specified format.
The format of the string representation must match the specified format exactly or an exception is thrown.

Parameters:

- `s`: A string containing a time to convert.
- `format`: A format specifier that defines the required format of `s`.

Returns: A `TimeOnly` instance.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.ParseExact(String, String[]) method

```csharp
public static TimeOnly ParseExact (string s, string[] formats);
```

Converts the specified span to a `TimeOnly` equivalent using the specified array of formats.
The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A span containing the time to convert.
- `formats`: An array of allowable formats of `s`.

Returns: A `TimeOnly` instance.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.ParseExact(Char>, Char>, IFormatProvider, DateTimeStyles) method

```csharp
public static TimeOnly ParseExact (ReadOnlySpan<char> s, ReadOnlySpan<char> format, IFormatProvider? provider = default, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified span representation of a time to its `TimeOnly` equivalent using the specified format, culture-specific format information, and style.
The format of the string representation must match the specified format exactly or an exception is thrown.

Parameters:

- `s`: A span containing the time to convert.
- `format`: The format specifier that defines the required format of `s`.
- `provider`: The culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: A `TimeOnly` instance.

Exceptions:

- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.ParseExact(Char>, String[], IFormatProvider, DateTimeStyles) method

```csharp
public static TimeOnly ParseExact (ReadOnlySpan<char> s, string[] formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified span representation of a time to its `TimeOnly` equivalent using the specified array of formats, culture-specific format information, and style.
The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A span containing the time to convert.
- `formats`: An array of allowable formats of `s`.
- `provider`: The culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: A `TimeOnly` instance.

Exceptions:

- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.ParseExact(String, String, IFormatProvider, DateTimeStyles) method

```csharp
public static TimeOnly ParseExact (string s, string format, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified string representation of a time to its `TimeOnly` equivalent using the specified format, culture-specific format information, and style.
The format of the string representation must match the specified format exactly or an exception is thrown.

Parameters:

- `s`: A string containing the time to convert.
- `format`: The format specifier that defines the required format of `s`.
- `provider`: The culture-specific formatting information about `s`.
- `style`: A bitwise combination of the enumeration values that provides additional information about `s`, about style elements that may be present in `s`, or about the conversion from `s` to a `TimeOnly` value. A typical value to specify is `DateTimeStyles.None`.

Returns: A `TimeOnly` instance.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.ParseExact(String, String[], IFormatProvider, DateTimeStyles) method

```csharp
public static TimeOnly ParseExact (string s, string[] formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts the specified string representation of a time to its `TimeOnly` equivalent using the specified array of formats, culture-specific format information, and style.
The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A string containing the time to convert.
- `formats`: An array of allowable formats of `s`.
- `provider`: The culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: A `TimeOnly` instance.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a time.

To be added.

## TimeOnly.ToLongTimeString() method

```csharp
public string ToLongTimeString ();
```

Converts the value of the current `TimeOnly` instance to its equivalent long date string representation.

Returns: The long time string representation of the current instance.

To be added.

## TimeOnly.ToShortTimeString() method

```csharp
public string ToShortTimeString ();
```

Converts the current `TimeOnly` instance to its equivalent short time string representation.

Returns: The short time string representation of the current instance.

To be added.

## TimeOnly.ToString() method

```csharp
public override string ToString ();
```

Converts the current `TimeOnly` instance to its equivalent short time string representation using the formatting conventions of the current culture.

Returns: The short time string representation of the current instance.

To be added.

## TimeOnly.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the value of the current `TimeOnly` instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: The culture-specific formatting information.

Returns: A string representation of the current instance as specified by the provider.

To be added.

## TimeOnly.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the current `TimeOnly` instance to its equivalent string representation using the specified format and the formatting conventions of the current culture.

Parameters:

- `format`: A standard or custom time format string.

Returns: A string representation of the current instance with the specified format and the formatting conventions of the current culture.

#### Remarks

The accepted standard formats are 'r', 'R', 'o', 'O', 't' and 'T'.

## TimeOnly.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the value of the current `TimeOnly` instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `format`: A standard or custom time format string.
- `provider`: The culture-specific formatting information.

Returns: A string representation of value of the current instance.

#### Remarks

The accepted standard formats are 'r', 'R', 'o', 'O', 't' and 'T'.

## TimeOnly.ToTimeSpan() method

```csharp
public TimeSpan ToTimeSpan ();
```

Convert the current `TimeOnly` instance to a `TimeSpan` object.

Returns: A `TimeSpan` object spanning to the time specified in the current `TimeOnly` instance.

To be added.
