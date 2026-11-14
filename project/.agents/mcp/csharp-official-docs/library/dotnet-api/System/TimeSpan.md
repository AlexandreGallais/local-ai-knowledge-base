---
title: "TimeSpan struct (part 1 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct

Namespace: `System`

```csharp
public readonly struct TimeSpan : IComparable, IComparable<TimeSpan>, IEquatable<TimeSpan>, IParsable<TimeSpan>, ISpanFormattable, ISpanParsable<TimeSpan>, IUtf8SpanFormattable
```

Represents a time interval.

A `TimeSpan` object represents a time interval (duration of time or elapsed time) that is measured as a positive or negative number of days, hours, minutes, seconds, and fractions of a second. The `TimeSpan` structure can also be used to represent the time of day, but only if the time is unrelated to a particular date. Otherwise, the `DateTime` or `DateTimeOffset` structure should be used instead. (For more information about using the `TimeSpan` structure to reflect the time of day, see Choosing Between DateTime, DateTimeOffset, TimeSpan, and TimeZoneInfo.)

> **Note:**
> A `TimeSpan` value represents a time interval and can be expressed as a particular number of days, hours, minutes, seconds, and milliseconds. Because it represents a general interval without reference to a particular start or end point, it cannot be expressed in terms of years and months, both of which have a variable number of days. It differs from a `DateTime` value, which represents a date and time without reference to a particular time zone, or a `DateTimeOffset` value, which represents a specific moment of time.

The largest unit of time that the `TimeSpan` structure uses to measure duration is a day. Time intervals are measured in days for consistency, because the number of days in larger units of time, such as months and years, varies.

The value of a `TimeSpan` object is the number of ticks that equal the represented time interval. A tick is equal to 100 nanoseconds, or one ten-millionth of a second. The value of a `TimeSpan` object can range from `MinValue` to `MaxValue`.

#### Instantiate a TimeSpan value

You can instantiate a `TimeSpan` value in a number of ways:

- By calling its implicit parameterless constructor. This creates an object whose value is `Zero`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Overview/instantiate1.cs._

- By calling one of its explicit constructors. The following example initializes a `TimeSpan` value to a specified number of hours, minutes, and seconds.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Overview/instantiate1.cs._

- By calling a method or performing an operation that returns a `TimeSpan` value. For example, you can instantiate a `TimeSpan` value that represents the interval between two date and time values, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Overview/instantiate1.cs._

You can also initialize a `TimeSpan` object to a zero time value in this way, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Overview/zero1.cs._

`TimeSpan` values are returned by arithmetic operators and methods of the `DateTime`, `DateTimeOffset`, and `TimeSpan` structures.

- By parsing the string representation of a `TimeSpan` value. You can use the `TimeSpan.Parse` and `TimeSpan.TryParse` methods to convert strings that contain time intervals to `TimeSpan` values. The following example uses the `TimeSpan.Parse` method to convert an array of strings to `TimeSpan` values.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Overview/instantiate1.cs._

In addition, you can define the precise format of the input string to be parsed and converted to a `TimeSpan` value by calling the `TimeSpan.ParseExact` or `TimeSpan.TryParseExact` method.

#### Perform operations on TimeSpan values

You can add and subtract time durations either by using the `TimeSpan.op_Addition` and `TimeSpan.op_Subtraction` operators, or by calling the `TimeSpan.Add` and `TimeSpan.Subtract` methods. You can also compare two time durations by calling the `TimeSpan.Compare`, `TimeSpan.CompareTo`, and `TimeSpan.Equals` methods. The `TimeSpan` structure also includes the `TimeSpan.Duration` and `TimeSpan.Negate` methods, which convert time intervals to positive and negative values,

The range of `TimeSpan` values is `MinValue` to `MaxValue`.

#### Format a TimeSpan value

A `TimeSpan` value can be represented as [*-*]*d*.*hh*:*mm*:*ss*.*ff*, where the optional minus sign indicates a negative time interval, the *d* component is days, *hh* is hours as measured on a 24-hour clock, *mm* is minutes, *ss* is seconds, and *ff* is fractions of a second. That is, a time interval consists of a positive or negative number of days without a time of day, or a number of days with a time of day, or only a time of day.

The `TimeSpan` structure supports culture-sensitive formatting through the overloads of its `TimeSpan.ToString` method, which converts a `TimeSpan` value to its string representation. The `ToString` overload lets you specify a format string that defines the string representation of the time interval. The `ToString` overload lets you specify a format string and the culture whose formatting conventions are used to create the string representation of the time interval. `TimeSpan` supports both standard and custom format strings. (For more information, see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings.) However, only standard format strings are culture-sensitive.

The following example instantiates a `TimeSpan` object that represents the difference between two dates. It then displays the `TimeSpan` object's properties.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Overview/structure1.cs._

_Code sample not included: ~/snippets/powershell/VS_Snippets_CLR_System/system.timespan.class/ps/structure1.ps1._
## TimeSpan.TimeSpan(Int64) constructor

```csharp
public TimeSpan (long ticks);
```

Initializes a new instance of the `TimeSpan` structure to the specified number of ticks.

Parameters:

- `ticks`: A time period expressed in 100-nanosecond units.

#### Remarks
A single tick represents one hundred nanoseconds or one ten-millionth of a second. There are 10,000 ticks in a millisecond.

#### Examples
The following example creates several `TimeSpan` objects using the constructor overload that initializes a `TimeSpan` to a specified number of ticks.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/.ctor/ctorl.cs._

## TimeSpan.TimeSpan(Int32, Int32, Int32) constructor

```csharp
public TimeSpan (int hours, int minutes, int seconds);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of hours, minutes, and seconds.

Parameters:

- `hours`: Number of hours.
- `minutes`: Number of minutes.
- `seconds`: Number of seconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

#### Remarks
The specified `hours`, `minutes`, and `seconds` are converted to ticks, and that value initializes this instance.

#### Examples
The following example creates several `TimeSpan` objects using the constructor overload that initializes a `TimeSpan` to a specified number of hours, minutes, and seconds.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/.ctor/ctoriii.cs._

## TimeSpan.TimeSpan(Int32, Int32, Int32, Int32) constructor

```csharp
public TimeSpan (int days, int hours, int minutes, int seconds);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of days, hours, minutes, and seconds.

Parameters:

- `days`: Number of days.
- `hours`: Number of hours.
- `minutes`: Number of minutes.
- `seconds`: Number of seconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

#### Remarks
The specified `days`, `hours`, `minutes`, and `seconds` are converted to ticks, and that value initializes this instance.

#### Examples
The following example creates several `TimeSpan` objects using the constructor overload that initializes a `TimeSpan` to a specified number of days, hours, minutes, and seconds.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/.ctor/ctoriiii.cs._

## TimeSpan.TimeSpan(Int32, Int32, Int32, Int32, Int32) constructor

```csharp
public TimeSpan (int days, int hours, int minutes, int seconds, int milliseconds);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of days, hours, minutes, seconds, and milliseconds.

Parameters:

- `days`: Number of days.
- `hours`: Number of hours.
- `minutes`: Number of minutes.
- `seconds`: Number of seconds.
- `milliseconds`: Number of milliseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

#### Remarks
The specified `days`, `hours`, `minutes`, `seconds`, and `milliseconds` are converted to ticks, and that value initializes this instance.

#### Examples
The following example creates several `TimeSpan` objects using the constructor overload that initializes a `TimeSpan` to a specified number of days, hours, minutes, seconds, and milliseconds.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/.ctor/ctoriiiii.cs._

## TimeSpan.TimeSpan(Int32, Int32, Int32, Int32, Int32, Int32) constructor

```csharp
public TimeSpan (int days, int hours, int minutes, int seconds, int milliseconds, int microseconds);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of days, hours, minutes, seconds, milliseconds, and microseconds.

Parameters:

- `days`: Number of days.
- `hours`: Number of hours.
- `minutes`: Number of minutes.
- `seconds`: Number of seconds.
- `milliseconds`: Number of milliseconds.
- `microseconds`: Number of microseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`

#### Remarks

The specified `days`, `hours`, `minutes`, `seconds`, `milliseconds`, and `microseconds` are converted to ticks, and that value initializes this instance.

## TimeSpan.Days property

```csharp
public int Days { get; }
```

Gets the days component of the time interval represented by the current `TimeSpan` structure.

Returns: The day component of this instance. The return value can be positive or negative.

#### Remarks
A `TimeSpan` value can be represented as [*-*]*d*.*hh*:*mm*:*ss*.*ff*, where the optional minus sign indicates a negative time interval, the *d* component is days, *hh* is hours as measured on a 24-hour clock, *mm* is minutes, *ss* is seconds, and *ff* is fractions of a second. The value of the `Days` property is the day component, *d*.

The `Days` property represents whole days, whereas the `TotalDays` property represents whole and fractional days.

#### Examples
The following example creates several `TimeSpan` objects and displays the `Days` property of each.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Days/properties.cs._

## TimeSpan.Hours property

```csharp
public int Hours { get; }
```

Gets the hours component of the time interval represented by the current `TimeSpan` structure.

Returns: The hour component of the current `TimeSpan` structure. The return value ranges from -23 through 23.

#### Remarks
A `TimeSpan` value can be represented as [*-*]*d*.*hh*:*mm*:*ss*.*ff*, where the optional minus sign indicates a negative time interval, the *d* component is days, *hh* is hours as measured on a 24-hour clock, *mm* is minutes, *ss* is seconds, and *ff* is fractions of a second. The value of the `Hours` property is the hours component, *hh*.

The `Hours` property represents whole hours, whereas the `TotalHours` property represents whole and fractional hours.

#### Examples
The following example creates several `TimeSpan` objects and displays the `Hours` property of each.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Days/properties.cs._

## TimeSpan.Microseconds property

```csharp
public int Microseconds { get; }
```

Gets the microseconds component of the time interval represented by the current `TimeSpan` structure.

Returns: To be added.

#### Remarks

The `Microseconds` property represents whole microseconds, whereas the
`TotalMicroseconds` property represents whole and fractional microseconds.

## TimeSpan.Milliseconds property

```csharp
public int Milliseconds { get; }
```

Gets the milliseconds component of the time interval represented by the current `TimeSpan` structure.

Returns: The millisecond component of the current `TimeSpan` structure. The return value ranges from -999 through 999.

#### Remarks
A `TimeSpan` value can be represented as [*-*]*d*.*hh*:*mm*:*ss*.*ff*, where the optional minus sign indicates a negative time interval, the *d* component is days, *hh* is hours as measured on a 24-hour clock, *mm* is minutes, *ss* is seconds, and *ff* is fractions of a second. The value of the `Milliseconds` property is the fractional second component, *ff*.

The `Milliseconds` property represents whole milliseconds, whereas the `TotalMilliseconds` property represents whole and fractional milliseconds.

#### Examples
The following example creates several `TimeSpan` objects and displays the `Milliseconds` property of each.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Days/properties.cs._

## TimeSpan.Minutes property

```csharp
public int Minutes { get; }
```

Gets the minutes component of the time interval represented by the current `TimeSpan` structure.

Returns: The minute component of the current `TimeSpan` structure. The return value ranges from -59 through 59.

#### Remarks
A `TimeSpan` value can be represented as [*-*]*d*.*hh*:*mm*:*ss*.*ff*, where the optional minus sign indicates a negative time interval, the *d* component is days, *hh* is hours as measured on a 24-hour clock, *mm* is minutes, *ss* is seconds, and *ff* is fractions of a second. The value of the `Minutes` property is the minute component, *mm*.

The `Minutes` property represents whole minutes, whereas the `TotalMinutes` property represents whole and fractional minutes.

#### Examples
The following example creates several `TimeSpan` objects and displays the `Minutes` property of each.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Days/properties.cs._
