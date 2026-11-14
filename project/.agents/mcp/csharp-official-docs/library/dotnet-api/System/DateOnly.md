---
title: "DateOnly struct (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateOnly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateOnly struct

Namespace: `System`

```csharp
public readonly struct DateOnly : IComparable, IComparable<DateOnly>, IEquatable<DateOnly>, IParsable<DateOnly>, ISpanFormattable, ISpanParsable<DateOnly>, IUtf8SpanFormattable
```

Represents dates with values ranging from January 1, 0001 Anno Domini (Common Era) through December 31, 9999 A.D. (C.E.) in the Gregorian calendar.

The `TryParse` and `TryParseExact` methods return `false` when the input doesn't match a valid format. In .NET 11 and later, they throw `ArgumentException` when a supplied `DateTimeStyles` value or format specifier is invalid.

## DateOnly.DateOnly(Int32, Int32, Int32) constructor

```csharp
public DateOnly (int year, int month, int day);
```

Creates a new instance of the `DateOnly` structure to the specified year, month, and day.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).

To be added.

## DateOnly.DateOnly(Int32, Int32, Int32, Calendar) constructor

```csharp
public DateOnly (int year, int month, int day, System.Globalization.Calendar calendar);
```

Creates a new instance of the `DateOnly` structure to the specified year, month, and day for the specified calendar.

Parameters:

- `year`: The year (1 through the number of years in calendar).
- `month`: The month (1 through the number of months in calendar).
- `day`: The day (1 through the number of days in `month`).
- `calendar`: The calendar that is used to interpret year, month, and day.`month`.

To be added.

## DateOnly.Day property

```csharp
public int Day { get; }
```

Gets the day component of the date represented by this instance.

Returns: The day component, expressed as a value between 1 and 31.

To be added.

## DateOnly.DayNumber property

```csharp
public int DayNumber { get; }
```

Gets the number of days since January 1, 0001 in the Proleptic Gregorian calendar represented by this instance.

Returns: The number of days since January 1, 0001 in the Proleptic Gregorian calendar represented by this instance.

To be added.

## DateOnly.DayOfWeek property

```csharp
public DayOfWeek DayOfWeek { get; }
```

Gets the day of the week represented by this instance.

Returns: A number that represents the day of the week represented by this instance.

To be added.

## DateOnly.DayOfYear property

```csharp
public int DayOfYear { get; }
```

Gets the day of the year represented by this instance.

Returns: A number that represents the day of the year represented by this instance.

To be added.

## DateOnly.MaxValue property

```csharp
public static DateOnly MaxValue { get; }
```

Gets the latest possible date that can be created.

Returns: A `DateOnly` representing the latest possible date that can be created.

To be added.

## DateOnly.MinValue property

```csharp
public static DateOnly MinValue { get; }
```

Gets the earliest possible date that can be created.

Returns: A `DateOnly` representing the earliest possible date that can be created.

To be added.

## DateOnly.Month property

```csharp
public int Month { get; }
```

Gets the month component of the date represented by this instance.

Returns: The month component, expressed as a value between 1 and 12.

To be added.

## DateOnly.Year property

```csharp
public int Year { get; }
```

Gets the year component of the date represented by this instance.

Returns: The year component, expressed as a value between 1 and 9999.

To be added.

## DateOnly.AddDays(Int32) method

```csharp
public DateOnly AddDays (int value);
```

Adds the specified number of days to the value of this instance.

Parameters:

- `value`: The number of days to add. To subtract days, specify a negative number.

Returns: An instance whose value is the sum of the date represented by this instance and the number of days represented by value.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting value is greater than <see cref="F:System.DateOnly.MaxValue">DateOnly.MaxValue</see>.

To be added.

## DateOnly.AddMonths(Int32) method

```csharp
public DateOnly AddMonths (int value);
```

Adds the specified number of months to the value of this instance.

Parameters:

- `value`: A number of months. The months parameter can be negative or positive.

Returns: An object whose value is the sum of the date represented by this instance and months.

To be added.

## DateOnly.AddYears(Int32) method

```csharp
public DateOnly AddYears (int value);
```

Adds the specified number of years to the value of this instance.

Parameters:

- `value`: A number of years. The value parameter can be negative or positive.

Returns: An object whose value is the sum of the date represented by this instance and the number of years represented by value.

To be added.

## DateOnly.CompareTo(DateOnly) method

```csharp
public int CompareTo (DateOnly value);
```

Compares the value of this instance to a specified `DateOnly` value and returns an integer that indicates whether this instance is earlier than, the same as, or later than the specified `DateOnly` value.

Parameters:

- `value`: The object to compare to the current instance.

Returns: Less than zero if this instance is earlier than value. Greater than zero if this instance is later than value. Zero if this instance is the same as value.

To be added.

## DateOnly.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares the value of this instance to a specified object that contains a specified `DateOnly` value, and returns an integer that indicates whether this instance is earlier than, the same as, or later than the specified `DateOnly` value.

Parameters:

- `value`: A boxed object to compare, or `null`.

Returns: Less than zero if this instance is earlier than value. Greater than zero if this instance is later than value. Zero if this instance is the same as value.

To be added.

## DateOnly.Deconstruct(Int32, Int32, Int32) method

```csharp
public void Deconstruct (out int year, out int month, out int day);
```

Deconstructs `DateOnly` by `DateOnly.Year`, `DateOnly.Month`, and `DateOnly.Day`.

Parameters:

- `year`: When this method returns, represents the `DateOnly.Year` value of this `DateOnly` instance.
- `month`: When this method returns, represents the `DateOnly.Month` value of this `DateOnly` instance.
- `day`: When this method returns, represents the `DateOnly.Day` value of this `DateOnly` instance.

To be added.

## DateOnly.Equals(DateOnly) method

```csharp
public bool Equals (DateOnly value);
```

Returns a value indicating whether the value of this instance is equal to the value of the specified `DateOnly` instance.

Parameters:

- `value`: The object to compare to this instance.

Returns: `true` if the value parameter equals the value of this instance; otherwise, `false`.

To be added.

## DateOnly.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `value`: The object to compare to this instance.

Returns: `true` if value is an instance of DateOnly and equals the value of this instance; otherwise, `false`.

To be added.

## DateOnly.FromDateTime(DateTime) method

```csharp
public static DateOnly FromDateTime (DateTime dateTime);
```

Returns a `DateOnly` instance that is set to the date part of the specified `dateTime`.

Parameters:

- `dateTime`: The `DateTime` instance.

Returns: The `DateOnly` instance composed of the date part of the specified input time `dateTime` instance.

To be added.

## DateOnly.FromDayNumber(Int32) method

```csharp
public static DateOnly FromDayNumber (int dayNumber);
```

Creates a new instance of the `DateOnly` structure to the specified number of days.

Parameters:

- `dayNumber`: The number of days since January 1, 0001 in the Proleptic Gregorian calendar.

Returns: A `DateOnly` structure instance to the specified number of days.

To be added.

## DateOnly.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DateOnly.op_Equality(DateOnly, DateOnly) method

```csharp
public static bool operator == (DateOnly left, DateOnly right);
```

Determines whether two specified instances of `DateOnly` are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left and right represent the same date; otherwise, `false`.

To be added.

## DateOnly.op_GreaterThan(DateOnly, DateOnly) method

```csharp
public static bool operator > (DateOnly left, DateOnly right);
```

Determines whether one specified `DateOnly` is later than another specified DateOnly.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left is later than right; otherwise, `false`.

To be added.

## DateOnly.op_GreaterThanOrEqual(DateOnly, DateOnly) method

```csharp
public static bool operator >= (DateOnly left, DateOnly right);
```

Determines whether one specified DateOnly represents a date that is the same as or later than another specified `DateOnly`.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left is the same as or later than right; otherwise, `false`.

To be added.

## DateOnly.op_Inequality(DateOnly, DateOnly) method

```csharp
public static bool operator != (DateOnly left, DateOnly right);
```

Determines whether two specified instances of `DateOnly` are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left and right do not represent the same date; otherwise, `false`.

To be added.

## DateOnly.op_LessThan(DateOnly, DateOnly) method

```csharp
public static bool operator < (DateOnly left, DateOnly right);
```

Determines whether one specified `DateOnly` is earlier than another specified `DateOnly`.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left is earlier than right; otherwise, `false`.

To be added.

## DateOnly.op_LessThanOrEqual(DateOnly, DateOnly) method

```csharp
public static bool operator <= (DateOnly left, DateOnly right);
```

Determines whether one specified `DateOnly` represents a date that is the same as or earlier than another specified `DateOnly`.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if left is the same as or earlier than right; otherwise, `false`.

To be added.

## DateOnly.Parse(String) method

```csharp
public static DateOnly Parse (string s);
```

Converts a string that contains string representation of a date to its `DateOnly` equivalent by using the conventions of the current culture.

Parameters:

- `s`: The string that contains the string to parse.

Returns: An object that is equivalent to the date contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date.

To be added.

## DateOnly.Parse(Char>, IFormatProvider) method

```csharp
public static DateOnly Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## DateOnly.Parse(String, IFormatProvider) method

```csharp
public static DateOnly Parse (string s, IFormatProvider? provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## DateOnly.Parse(Char>, IFormatProvider, DateTimeStyles) method

```csharp
public static DateOnly Parse (ReadOnlySpan<char> s, IFormatProvider? provider = default, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts a memory span that contains string representation of a date to its `DateOnly` equivalent by using culture-specific format information and a formatting style.

Parameters:

- `s`: The memory span that contains the string to parse.
- `provider`: An object that supplies culture-specific format information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date contained in `s`, as specified by provider and styles.

Exceptions:

- `FormatException`: `s` does not contain a valid string representation of a date.

To be added.

## DateOnly.Parse(String, IFormatProvider, DateTimeStyles) method

```csharp
public static DateOnly Parse (string s, IFormatProvider? provider, System.Globalization.DateTimeStyles style = System.Globalization.DateTimeStyles.None);
```

Converts a string that contains string representation of a date to its `DateOnly` equivalent by using culture-specific format information and a formatting style.

Parameters:

- `s`: The string that contains the string to parse.
- `provider`: An object that supplies culture-specific format information about `s`.
- `style`: A bitwise combination of the enumeration values that indicates the style elements that can be present in `s` for the parse operation to succeed, and that defines how to interpret the parsed date. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date contained in `s`, as specified by provider and styles.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not contain a valid string representation of a date.

To be added.

## DateOnly.ParseExact(Char>, String[]) method

```csharp
public static DateOnly ParseExact (ReadOnlySpan<char> s, string[] formats);
```

Converts the specified span representation of a date to its `DateOnly` equivalent using the specified array of formats.
The format of the string representation must match at least one of the specified formats exactly or an exception is thrown.

Parameters:

- `s`: A span containing the characters that represent a date to convert.
- `formats`: An array of allowable formats of `s`.

Returns: An object that is equivalent to the date contained in `s`, as specified by format, provider, and style.

Exceptions:

- `FormatException`: `s` does not contain a valid string representation of a date.

To be added.
