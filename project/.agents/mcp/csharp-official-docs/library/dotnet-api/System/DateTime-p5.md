---
title: "DateTime struct (part 5 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 5 of 18)

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32, Calendar) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int microsecond, System.Globalization.Calendar calendar);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, millisecond, and Coordinated Universal Time (UTC) or local time for the specified calendar.

Parameters:

- `year`: The year (1 through the number of years in `calendar`).
- `month`: The month (1 through the number of months in `calendar`).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `microsecond`: The microseconds (0 through 999).
- `calendar`: The calendar that is used to interpret `year`, `month`, and `day`.

Exceptions:

- `ArgumentNullException`: `calendar` is `null`
- `ArgumentOutOfRangeException`: `year` is not in the range supported by `calendar`.

-or-

`month` is less than 1 or greater than the number of months in `calendar`.

-or-

`day` is less than 1 or greater than the number of days in `month`.

-or-

`hour` is less than 0 or greater than 23.

-or-

`minute` is less than 0 or greater than 59.

-or-

`second` is less than 0 or greater than 59.

-or-

`millisecond` is less than 0 or greater than 999.

-or-

`microsecond` is less than 0 or greater than 999.

#### Remarks

The allowable values for `year`, `month`, and `day` parameters
depend on the `calendar` parameter. An exception is thrown if the specified date and time cannot
be expressed using `calendar`.

For applications in which portability of date and time data or a limited degree of time zone awareness is important,
you can use the corresponding `DateTimeOffset` constructor.

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32, Calendar, DateTimeKind) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int microsecond, System.Globalization.Calendar calendar, DateTimeKind kind);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, millisecond, and Coordinated Universal Time (UTC) or local time for the specified calendar.

Parameters:

- `year`: The year (1 through the number of years in `calendar`).
- `month`: The month (1 through the number of months in `calendar`).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `microsecond`: The microseconds (0 through 999).
- `calendar`: The calendar that is used to interpret `year`, `month`, and `day`.
- `kind`: One of the enumeration values that indicates whether `year`, `month`, `day`, `hour`, `minute`, `second`, and `millisecond` specify a local time, Coordinated Universal Time (UTC), or neither.

Exceptions:

- `ArgumentNullException`: `calendar` is `null`
- `ArgumentOutOfRangeException`: `year` is not in the range supported by `calendar`.

-or-

`month` is less than 1 or greater than the number of months in `calendar`.

-or-

`day` is less than 1 or greater than the number of days in `month`.

-or-

`hour` is less than 0 or greater than 23.

-or-

`minute` is less than 0 or greater than 59.

-or-

`second` is less than 0 or greater than 59.

-or-

`millisecond` is less than 0 or greater than 999.

-or-

`microsecond` is less than 0 or greater than 999.
- `ArgumentException`: `kind` is not one of the `DateTimeKind` values.

#### Remarks

The allowable values for `year`, `month`, and `day` parameters
depend on the `calendar` parameter. An exception is thrown if the specified date and time cannot
be expressed using `calendar`.

For applications in which portability of date and time data or a limited degree of time zone awareness is important,
you can use the corresponding `DateTimeOffset` constructor.

## DateTime.Date property

```csharp
public DateTime Date { get; }
```

Gets the date component of this instance.

Returns: A new object with the same date as this instance, and the time value set to 12:00:00 midnight (00:00:00).

#### Remarks
The value of the `Kind` property of the returned `DateTime` value is the same as that of the current instance.

Because the `DateTime` type represents both dates and times in a single type, it is important to avoid misinterpreting a date returned by the `Date` property as a date and time.

#### Examples
The following example uses the `Date` property to extract the date component of a `DateTime` value with its time component set to zero (or 0:00:00, or midnight). It also illustrates that, depending on the format string used when displaying the `DateTime` value, the time component can continue to appear in formatted output.

_Code sample not included: ~/snippets/csharp/System/DateTime/Date/Date1.cs._

## DateTime.Day property

```csharp
public int Day { get; }
```

Gets the day of the month represented by this instance.

Returns: The day component, expressed as a value between 1 and 31.

#### Remarks
The `Day` property always returns the day of the month in the Gregorian calendar, even if the current `DateTime` value was instantiated using some other calendar or if the current culture's default calendar is not the Gregorian calendar. To retrieve the day of the month of a particular date using some other calendar, call that calendar's `Calendar.GetDayOfMonth` method. The following example uses both the `Day` property and the `HijriCalendar.GetDayOfMonth` method to retrieve the day of the month for a `DateTime` value that is instantiated using the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/Day1.cs._

Similarly, the following example uses both the `Day` property and the `HijriCalendar.GetDayOfMonth` method to retrieve the day of the month when the current culture is ar-SA, which uses Hijri as its default calendar.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/Day2.cs._

#### Examples
The following example demonstrates the `Day` property.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/class1.cs._

## DateTime.DayOfWeek property

```csharp
public DayOfWeek DayOfWeek { get; }
```

Gets the day of the week represented by this instance.

Returns: An enumerated constant that indicates the day of the week of this `DateTime` value.

#### Remarks
The value of the constants in the `DayOfWeek` enumeration ranges from `Sunday` to `Saturday`. If cast to an integer, its value ranges from zero (which indicates `Sunday`) to six (which indicates `Saturday`).

The `DayOfWeek` property returns an enumerated constant; it does not reflect a system's regional and language settings. To retrieve a string representing a localized weekday name for a particular date, call one of the overloads of the `DateTime.ToString` method that includes a `format` parameter and pass it either the `ddd` or `dddd` custom format strings. For details, see How to: Extract the Day of the Week from a Specific Date.

#### Examples
The following example demonstrates the `DayOfWeek` property and the `DayOfWeek` enumeration.

_Code sample not included: ~/snippets/csharp/System/DateTime/DayOfWeek/dow.cs._

## DateTime.DayOfYear property

```csharp
public int DayOfYear { get; }
```

Gets the day of the year represented by this instance.

Returns: The day of the year, expressed as a value between 1 and 366.

#### Remarks
The `DayOfYear` property takes leap years into account when it calculates the day of the year. The property value always reflects the day of the year in the Gregorian calendar, regardless of the current culture's current calendar. To retrieve the day of the year in a different calendar, call the `Calendar.GetDayOfYear` method of that calendar.

#### Examples
The following example displays the day of the year of December 31 for the years 2010-2020 in the Gregorian calendar. Note that the example shows that December 31 is the 366th day of the year in leap years.

_Code sample not included: ~/snippets/csharp/System/DateTime/DayOfYear/dayofyear2.cs._

## DateTime.Hour property

```csharp
public int Hour { get; }
```

Gets the hour component of the date represented by this instance.

Returns: The hour component, expressed as a value between 0 and 23.

#### Remarks
The value of the `Hour` property is always expressed using a 24-hour clock. To retrieve a string that represents the hour of a date and time using a 12-hour clock, call the `ToString` or `ToString` method with the "h" custom format specifier. For example:

_Code sample not included: ~/snippets/csharp/System/DateTime/Hour/Hour1.cs._

#### Examples
The following example demonstrates the `Hour` property.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/class1.cs._

## DateTime.Kind property

```csharp
public DateTimeKind Kind { get; }
```

Gets a value that indicates whether the time represented by this instance is based on local time, Coordinated Universal Time (UTC), or neither.

Returns: One of the enumeration values that indicates what the current time represents. The default is `DateTimeKind.Unspecified`.

#### Remarks
You can explicitly set the `Kind` property of a new `DateTime` value to a particular `DateTimeKind` value by calling the `DateTime.SpecifyKind` method.

The `Kind` property allows a `DateTime` value to clearly reflect either Coordinated Universal Time (UTC) or the local time. In contrast, the `DateTimeOffset` structure can unambiguously reflect any time in any time zone as a single point in time.

#### Examples
The following example uses the `DateTime.SpecifyKind` method to demonstrate how the `Kind` property influences the `DateTime.ToLocalTime` and `DateTime.ToUniversalTime` conversion methods.

_Code sample not included: ~/snippets/csharp/System/DateTime/Kind/ks.cs._

## DateTime.Microsecond property

```csharp
public int Microsecond { get; }
```

The microseconds component, expressed as a value between 0 and 999.

Returns: To be added.

To be added.

## DateTime.Millisecond property

```csharp
public int Millisecond { get; }
```

Gets the milliseconds component of the date represented by this instance.

Returns: The milliseconds component, expressed as a value between 0 and 999.

#### Remarks
You can display the string representation of the `Millisecond` property by using the "fff" format specifier. For example, the following code displays a string that contains the number of milliseconds in a date and time to the console.

_Code sample not included: ~/snippets/csharp/System/DateTime/Millisecond/Millisecond.cs._

You can also display the millisecond component together with the other components of a date and time value by using the "o" standard format specifier. For example:

_Code sample not included: ~/snippets/csharp/System/DateTime/Millisecond/Millisecond.cs._

However, the "o" format specifier is intended less for displaying than for round-tripping or storing a `DateTime` value. You can also display milliseconds together with other date and time components by using a custom format string, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/DateTime/Millisecond/Millisecond.cs._

#### Examples
The following example demonstrates the `Millisecond` property.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/class1.cs._

## DateTime.Minute property

```csharp
public int Minute { get; }
```

Gets the minute component of the date represented by this instance.

Returns: The minute component, expressed as a value between 0 and 59.

#### Examples
The following example demonstrates the `Minute` property.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/class1.cs._

## DateTime.Month property

```csharp
public int Month { get; }
```

Gets the month component of the date represented by this instance.

Returns: The month component, expressed as a value between 1 and 12.

#### Examples
The following example demonstrates the `Month` property.

_Code sample not included: ~/snippets/csharp/System/DateTime/Day/class1.cs._

## DateTime.Nanosecond property

```csharp
public int Nanosecond { get; }
```

The nanoseconds component, expressed as a value between 0 and 900 (in increments of 100 nanoseconds).

Returns: To be added.

To be added.

## DateTime.Now property

```csharp
public static DateTime Now { get; }
```

Gets a `DateTime` object that is set to the current date and time on this computer, expressed as the local time.

Returns: An object whose value is the current local date and time.

#### Remarks
The `Now` property returns a `DateTime` value that represents the current date and time on the local computer. Note that there is a difference between a `DateTime` value, which represents the number of ticks that have elapsed since midnight of January 1, 0001, and the string representation of that `DateTime` value, which expresses a date and time value in a culture-specific-specific format. For information on formatting date and time values, see the `DateTime.ToString` method. The following example displays the short date and time string in a number of culture-specific formats.

_Code sample not included: ~/snippets/csharp/System/DateTime/Now/now1.cs._

The resolution of this property depends on the system timer, which depends on the underlying operating system. It tends to be between 0.5 and 15 milliseconds. As a result, repeated calls to the `Now` property in a short time interval, such as in a loop, may return the same value.

The `Now` property is frequently used to measure performance. However, because of its low resolution, it is not suitable for use as a benchmarking tool. A better alternative is to use the `Stopwatch` class.

The return value is a `DateTime` whose `Kind` property returns `Local`.

> **Note:**
> You can also use the `Now` property to retrieve the current local date and time. It allows a local time to be expressed unambiguously as a single point in time, which in turn makes that time value portable across computers.

#### Examples
The following example uses the `DateTime.Now` and `DateTime.UtcNow` properties to retrieve the current local date and time and the current universal coordinated (UTC) date and time. It then uses the formatting conventions of a number of cultures to display the strings, along with the values of their `DateTime.Kind` properties.

_Code sample not included: ~/snippets/csharp/System/DateTime/Now/now2.cs._
