---
title: "DateTime struct (part 6 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 6 of 18)

## DateTime.Second property

```csharp
public int Second { get; }
```

Gets the seconds component of the date represented by this instance.

Returns: The seconds component, expressed as a value between 0 and 59.

#### Examples
The following example demonstrates the `Second` property.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/class1.cs._

## DateTime.Ticks property

```csharp
public long Ticks { get; }
```

Gets the number of ticks that represent the date and time of this instance.

Returns: The number of ticks that represent the date and time of this instance. The value is between `DateTime.MinValue.Ticks` and `DateTime.MaxValue.Ticks`.

#### Remarks
A single tick represents one hundred nanoseconds or one ten-millionth of a second. There are 10,000 ticks in a millisecond (see `TicksPerMillisecond`) and 10 million ticks in a second.

The value of this property represents the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight, January 1, 0001 in the Gregorian calendar, which represents `MinValue`. It does not include the number of ticks that are attributable to leap seconds.
If the DateTime object has its `Kind` property set to `Local`, its ticks represent the time elapsed time since 12:00:00 midnight, January 1, 0001 in the local time as specified by the current time zone setting.
If the `DateTime` object has its `Kind` property set to `Utc`, its ticks represent the time elapsed time since 12:00:00 midnight, January 1, 0001 in the Coordinated Universal Time.
If the `DateTime` object has its `Kind` property set to `Unspecified`, its ticks represent the time elapsed time since 12:00:00 midnight, January 1, 0001 in the unknown time zone.

In general, the ticks represent the time according to the time zone specified by the `Kind` property.

#### Examples

The following example uses the `Ticks` property to display the number of ticks that have elapsed since the beginning of the twenty-first century and to instantiate a `TimeSpan` object. The `TimeSpan` object is then used to display the elapsed time using several other time intervals.

_Code sample not included: ~/snippets/csharp/System/DateTime/Ticks/Ticks.cs._

## DateTime.TimeOfDay property

```csharp
public TimeSpan TimeOfDay { get; }
```

Gets the time of day for this instance.

Returns: A time interval that represents the fraction of the day that has elapsed since midnight.

#### Remarks
Unlike the `Date` property, which returns a `DateTime` value that represents a date without its time component, the `TimeOfDay` property returns a `TimeSpan` value that represents a  `DateTime` value's time component.

If you want to display the time of day or retrieve the string representation of the time of day of a `DateTime` value, you can instead call an overload of the `DateTime.ToString` method that has a `format` parameter or use the composite formatting feature with the "t" or "T" standard format string.

#### Examples
The following example displays the value of the `TimeOfDay` property for an array of `DateTime` values. It also contrasts the return value with the string returned by the "t" standard format string in a composite formatting operation.

_Code sample not included: ~/snippets/csharp/System/DateTime/TimeOfDay/timeofday1.cs._

## DateTime.Today property

```csharp
public static DateTime Today { get; }
```

Gets the current date.

Returns: An object that is set to today's date, with the time component set to 00:00:00.

#### Remarks
The return value is a `DateTime` whose `Kind` property returns `Local`.

Because it returns the current date without the current time, the `Today` property is suitable for use in applications that work with dates only. For details, see Choosing Between DateTime, DateTimeOffset, TimeSpan, and TimeZoneInfo. In contrast, the `TimeOfDay` property returns the current time without the current date, and the `Now` property returns both the current date and the current time.

#### Examples
The following example uses the `Date` property to retrieve the current date. It also illustrates how a `DateTime` value can be formatted using some of the standard date and time format strings. Note that the output produced by the third call to the `ToString` method uses the g format specifier to include the time component, which is zero.

_Code sample not included: ~/snippets/csharp/System/DateTime/Today/Today1.cs._

## DateTime.UtcNow property

```csharp
public static DateTime UtcNow { get; }
```

Gets a `DateTime` object that is set to the current date and time on this computer, expressed as the Coordinated Universal Time (UTC).

Returns: An object whose value is the current UTC date and time.

#### Remarks
The resolution of this property depends on the system timer, which depends on the underlying operating system. It tends to be between 0.5 and 15 milliseconds.

The return value is a `DateTime` whose `Kind` property returns `Utc`.

An alternative to using `DateTime.UtcNow` is `DateTimeOffset.UtcNow`. While the former indicates that a date and time value is Coordinated Universal Time (UTC) by assigning `Utc` to its `Kind` property, the latter assigns the date and time value the UTC time's offset (equal to `Zero`).

#### Examples
The following example uses the `DateTime.SpecifyKind` method to demonstrate how the `Kind` property influences the `DateTime.ToLocalTime` and `DateTime.ToUniversalTime` conversion methods.

_Code sample not included: ~/snippets/csharp/System/DateTime/Kind/ks.cs._

## DateTime.Year property

```csharp
public int Year { get; }
```

Gets the year component of the date represented by this instance.

Returns: The year, between 1 and 9999.

#### Remarks
The `Year` property returns the year of the current instance in the Gregorian calendar. It does not return the year using the default calendar of the current culture. To retrieve the year using a particular calendar, you can call that calendar's `GetYear` method, as the following code shows.

_Code sample not included: ~/snippets/csharp/System/DateTime/Year/Year.cs._

#### Examples
The following example demonstrates the `Year` property.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/class1.cs._

## DateTime.Add(TimeSpan) method

```csharp
public DateTime Add (TimeSpan value);
```

Returns a new `DateTime` that adds the value of the specified `TimeSpan` to the value of this instance.

Parameters:

- `value`: A positive or negative time interval.

Returns: An object whose value is the sum of the date and time represented by this instance and the time interval represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
You can use the `DateTime.Add` method to add more than one kind of time interval (days, hours, minutes, seconds, or milliseconds) in a single operation. This method's behavior is identical to that of the addition operator. The `DateTime` structure also supports specialized addition methods (such as `DateTime.AddDays`, `DateTime.AddHours`, and `DateTime.AddMinutes`) for each time interval.

The `DateTime.Add` method takes into account leap years and the number of days in a month when performing date arithmetic.

This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime` whose value is the result of this operation. The `Kind` property of the new `DateTime` instance is the same as that of the current instance.

#### Examples
The following example demonstrates the `DateTime.Add` method. It calculates the day of the week that is 36 days (864 hours) from this moment.

_Code sample not included: ~/snippets/csharp/System/DateTime/Add/class1.cs._

## DateTime.AddDays(Double) method

```csharp
public DateTime AddDays (double value);
```

Returns a new `DateTime` that adds the specified number of days to the value of this instance.

Parameters:

- `value`: A number of whole and fractional days. The `value` parameter can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by this instance and the number of days represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime` whose value is the result of this operation.

The fractional part of `value` is the fractional part of a day. For example, 4.5 is equivalent to 4 days, 12 hours, 0 minutes, 0 seconds, 0 milliseconds, and 0 ticks.

The full `Double` precision of the `value` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

The `DateTime.AddDays` method takes into account leap years and the number of days in a month when performing date arithmetic.

#### Examples
The following example uses the `DateTime.AddDays` method to determine the day of the week 36 days after the current date.

_Code sample not included: ~/snippets/csharp/System/DateTime/AddDays/class1.cs._

## DateTime.AddHours(Double) method

```csharp
public DateTime AddHours (double value);
```

Returns a new `DateTime` that adds the specified number of hours to the value of this instance.

Parameters:

- `value`: A number of whole and fractional hours. The `value` parameter can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by this instance and the number of hours represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime` whose value is the result of this operation. The `Kind` property of the returned `DateTime` object is the same as that of `value`.

The fractional part of `value` is the fractional part of an hour. For example, 4.5 is equivalent to 4 hours, 30 minutes, 0 seconds, 0 milliseconds, and 0 ticks.

The full `Double` precision of the `value` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

Converting time intervals of less than an hour to a fraction can involve a loss of precision if the result is a non-terminating repeating decimal. (For example, one minute is 0.016667 of an hour.) If this is problematic, you can use the `DateTime.Add` method, which enables you to specify more than one kind of time interval in a single method call and eliminates the need to convert time intervals to fractional parts of an hour.

#### Examples
The following example uses the `DateTime.AddHours` method to add a number of whole and fractional values to a date and time. It also illustrates the loss of precision caused by passing the method a value that includes a fractional component.

_Code sample not included: ~/snippets/csharp/System/DateTime/AddHours/AddHours1.cs._

## DateTime.AddMicroseconds(Double) method

```csharp
public DateTime AddMicroseconds (double value);
```

Returns a new `DateTime` that adds the specified number of microseconds to the value of this instance.

Parameters:

- `value`: A number of whole and fractional microseconds.
The `value` parameter can be negative or positive.
Note that this value is rounded to the nearest integer.

Returns: An object whose value is the sum of the date and time represented by this instance and the number of microseconds represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than `DateTime.MinValue` or greater than `DateTime.MaxValue`.

#### Remarks

This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime`
whose value is the result of this operation.

The fractional part of value is the fractional part of a microsecond.
For example, 4.5 is equivalent to 4 microseconds and 50 ticks, where one microsecond = 10 ticks.

The value parameter is rounded to the nearest integer.

## DateTime.AddMilliseconds(Double) method

```csharp
public DateTime AddMilliseconds (double value);
```

Returns a new `DateTime` that adds the specified number of milliseconds to the value of this instance.

Parameters:

- `value`: A number of whole and fractional milliseconds. The `value` parameter can be negative or positive. Note that this value is rounded to the nearest integer.

Returns: An object whose value is the sum of the date and time represented by this instance and the number of milliseconds represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime` whose value is the result of this operation.

The fractional part of `value` is the fractional part of a millisecond. For example, 4.5 is equivalent to 4 milliseconds and 5000 ticks, where one millisecond = 10000 ticks.

The full `Double` precision of the `value` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

#### Examples
The following example uses the `DateTime.AddMilliseconds` method to add one millisecond and 1.5 milliseconds to a `DateTime` value. It then displays each new value and displays the difference between it and the original value. The difference is displayed both as a time span and as a number of ticks. The example makes it clear that one millisecond equals 10,000 ticks. It also shows that fractional milliseconds are rounded before performing the addition; the `DateTime` value that results from adding 1.5 milliseconds to the original date is 2 milliseconds greater than the original date.

_Code sample not included: ~/snippets/csharp/System/DateTime/AddMilliseconds/addmilliseconds2.cs._
