---
title: "JulianCalendar class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/JulianCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JulianCalendar class

Namespace: `System.Globalization`

```csharp
public class JulianCalendar : System.Globalization.Calendar
```

Represents the Julian calendar.

#### Remarks
In 45 B.C., Julius Caesar ordered a calendar reform, which resulted in the calendar called the Julian calendar. The Julian calendar is the predecessor of the Gregorian calendar.

> **Note:**
> For information about using the `JulianCalendar` class and the other calendar classes in .NET, see Working with Calendars.

The `JulianCalendar` class recognizes only the current era.

Unlike the Gregorian calendar, the Julian calendar defines a leap year as a year that is evenly divisible by four with no exceptions. Therefore, the calendar is inaccurate by one day every 128 years. A common year has 365 days and a leap year has 366 days.

Like the Gregorian calendar, the Julian calendar has 12 months with 28 to 31 days each: January (31 days), February (28 or 29 days), March (31 days), April (30 days), May (31 days), June (30 days), July (31 days), August (31 days), September (30 days), October (31 days), November (30 days), and December (31 days). February has 29 days during leap years and 28 during common years.

The date January 1, 2001 A.D. in the Gregorian calendar is equivalent to the 19th day of December in the year 2000 A.D. in the Julian calendar.

Currently, the `JulianCalendar` is not used by any of the cultures supported by the `CultureInfo` class. Therefore, the `JulianCalendar` class can be used only to calculate dates in the Julian calendar.

Each `CultureInfo` object supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, the application should set the `Calendar` property of `CultureInfo.DateTimeFormat` to a new `Calendar`.

## JulianCalendar.JulianCalendar() constructor

```csharp
public JulianCalendar ();
```

Initializes a new instance of the `JulianCalendar` class.

To be added.

## JulianCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value that indicates whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: Always returns `CalendarAlgorithmType.SolarCalendar`.

#### Examples
The following example uses reflection to instantiate each `Calendar` type in .NET and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## JulianCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the list of eras in the `JulianCalendar`.

Returns: An array of integers that represents the eras in the `JulianCalendar`.

#### Remarks
The `JulianCalendar` class recognizes only the current era. This property always returns an array with only one element.

## JulianCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by the `JulianCalendar` class.

Returns: The latest date and time supported by the `JulianCalendar` class, which is equivalent to the last moment of December 31, 9999 C.E. in the Gregorian calendar.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/MaxSupportedDateTime/juliancalendar_minmax.cs._

## JulianCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by the `JulianCalendar` class.

Returns: The earliest date and time supported by the `JulianCalendar` class, which is equivalent to the first moment of January 1, 0001 C.E. in the Gregorian calendar.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/MaxSupportedDateTime/juliancalendar_minmax.cs._

## JulianCalendar.TwoDigitYearMax property

```csharp
public override int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified in a set operation is less than 99.

-or-

The value specified in a set operation is greater than `MaxSupportedDateTime.Year`.
- `InvalidOperationException`: In a set operation, the current instance is read-only.

#### Remarks
This property allows a 2-digit year to be properly translated to a 4-digit year. For example, if this property is set to 2029, the 100-year range is from 1930 to 2029. Therefore, a 2-digit value of 30 is interpreted as 1930, while a 2-digit value of 29 is interpreted as 2029.

The `JulianCalendar` class does not detect changes in the system settings.

The application can set this value to 99 to indicate that 2-digit years are to be taken literally. For example, if this property is set to 99, the 100-year range is from 0 (not a valid value for most calendars) to 99. Therefore, a 2-digit value of 30 is interpreted as 30.

## JulianCalendar.AddMonths(DateTime, Int32) method

```csharp
public override DateTime AddMonths (DateTime time, int months);
```

Returns a `DateTime` that is the specified number of months away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add months.
- `months`: The number of months to add.

Returns: The `DateTime` that results from adding the specified number of months to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.
- `ArgumentOutOfRangeException`: `months` is less than -120000.

-or-

`months` is greater than 120000.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, if the specified month is October, which has 31 days, the specified day is the 31st day of that month, and the value of the `months` parameter is 6, the resulting year is one more than the specified year, the resulting month is April, and the resulting day is the 30th day, which is the last day in April.

If the value of the `months` parameter is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Julian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/AddMonths/juliancalendar_addget.cs._

## JulianCalendar.AddYears(DateTime, Int32) method

```csharp
public override DateTime AddYears (DateTime time, int years);
```

Returns a `DateTime` that is the specified number of years away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add years.
- `years`: The number of years to add.

Returns: The `DateTime` that results from adding the specified number of years to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The month part of the resulting `DateTime` remains the same as the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, February has 28 days, except during leap years when it has 29 days. If the specified date is the 29th day of February in a leap year and the value of `years` is 1, the resulting date is the 28th day of February in the following year.

If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Julian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/AddMonths/juliancalendar_addget.cs._

## JulianCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Returns the day of the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 31 that represents the day of the month in `time`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Julian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/AddMonths/juliancalendar_addget.cs._

## JulianCalendar.GetDayOfWeek(DateTime) method

```csharp
public override DayOfWeek GetDayOfWeek (DateTime time);
```

Returns the day of the week in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A `DayOfWeek` value that represents the day of the week in `time`.

#### Remarks
The `DayOfWeek` values are Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Julian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/AddMonths/juliancalendar_addget.cs._

## JulianCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Returns the day of the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 366 that represents the day of the year in `time`.

#### Remarks
The day of the year is defined as the number of days from the first day of the year. For example, `JulianCalendar.GetDayOfYear` for the first day of the first month returns 1, and `JulianCalendar.GetDayOfYear` for the last day of the last month returns the total number of days in that year. The total is the same value as that returned by `JulianCalendar.GetDaysInYear`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Julian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/AddMonths/juliancalendar_addget.cs._

## JulianCalendar.GetDaysInMonth(Int32, Int32, Int32) method

```csharp
public override int GetDaysInMonth (int year, int month, int era);
```

Returns the number of days in the specified month in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `era`: An integer that represents the era.

Returns: The number of days in the specified month in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by the calendar.

-or-

`year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

#### Remarks
This method returns 28 or 29 for February (`month` = 2), depending on whether `year` is a leap year.

#### Examples
The following example calls `JulianCalendar.GetDaysInMonth` for the second month in each of five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/GetDaysInMonth/juliancalendar_getdaysinmonth.cs._

## JulianCalendar.GetDaysInYear(Int32, Int32) method

```csharp
public override int GetDaysInYear (int year, int era);
```

Returns the number of days in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of days in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by the calendar.

-or-

`year` is outside the range supported by the calendar.

#### Remarks
This method returns 365 or 366, depending on whether `year` is a leap year.

#### Examples
The following example calls `JulianCalendar.GetDaysInYear` for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/GetDaysInYear/juliancalendar_getdaysinyear.cs._

## JulianCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Returns the era in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era in `time`.

#### Remarks
The `JulianCalendar` class recognizes only the current era.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Julian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JulianCalendar/AddMonths/juliancalendar_addget.cs._
