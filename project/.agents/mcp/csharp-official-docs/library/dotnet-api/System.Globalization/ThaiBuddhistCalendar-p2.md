---
title: "ThaiBuddhistCalendar class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/ThaiBuddhistCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThaiBuddhistCalendar class (part 2 of 2)

## ThaiBuddhistCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Returns the era in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era in the specified `DateTime`.

#### Remarks
The `ThaiBuddhistCalendar` class recognizes only the current era.

#### Examples
The following example demonstrates the use of the `ThaiBuddhistCalendar.GetEra` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/ThaiBuddhistCalendar/AddMonths/thaibuddhistcalendar_addget.cs._

## ThaiBuddhistCalendar.GetLeapMonth(Int32, Int32) method

```csharp
public override int GetLeapMonth (int year, int era);
```

Calculates the leap month for a specified year and era.

Parameters:

- `year`: A year.
- `era`: An era.

Returns: The return value is always 0 because the `ThaiBuddhistCalendar` class does not support the notion of a leap month.

#### Remarks
In a calendar that supports the notion of a leap month, the leap month can occur either after a particular month or after any month in a year. For example, the `GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

## ThaiBuddhistCalendar.GetMonth(DateTime) method

```csharp
public override int GetMonth (DateTime time);
```

Returns the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 12 that represents the month in the specified `DateTime`.

#### Examples
The following example demonstrates the use of the `ThaiBuddhistCalendar.GetMonth` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/ThaiBuddhistCalendar/AddMonths/thaibuddhistcalendar_addget.cs._

## ThaiBuddhistCalendar.GetMonthsInYear(Int32, Int32) method

```csharp
public override int GetMonthsInYear (int year, int era);
```

Returns the number of months in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of months in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Examples
The following example calls `ThaiBuddhistCalendar.GetMonthsInYear` for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/ThaiBuddhistCalendar/GetMonthsInYear/thaibuddhistcalendar_getmonthsinyear.cs._

## ThaiBuddhistCalendar.GetWeekOfYear(DateTime, CalendarWeekRule, DayOfWeek) method

```csharp
public override int GetWeekOfYear (DateTime time, System.Globalization.CalendarWeekRule rule, DayOfWeek firstDayOfWeek);
```

Returns the week of the year that includes the date in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.
- `rule`: One of the `CalendarWeekRule` values that defines a calendar week.
- `firstDayOfWeek`: One of the `DayOfWeek` values that represents the first day of the week.

Returns: A 1-based positive integer that represents the week of the year that includes the date in the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` or `firstDayOfWeek` is outside the range supported by the calendar.

-or-

`rule` is not a valid `CalendarWeekRule` value.

#### Remarks
This method can be used to determine the number of weeks in the year by setting the `time` parameter to the last day of the year.

`CultureInfo.DateTimeFormat` contains culture-specific values that can be used for the `rule` and `firstDayOfWeek` parameters.

The `FirstDayOfWeek` property of `CultureInfo.DateTimeFormat` contains the default `DayOfWeek` value that represents the first day of the week for a specific culture, using the calendar specified in the `Calendar` property of `CultureInfo.DateTimeFormat`.

The `CalendarWeekRule` property of `CultureInfo.DateTimeFormat` contains the default `CalendarWeekRule` value that defines a calendar week for a specific culture, using the calendar specified in the `Calendar` property of `CultureInfo.DateTimeFormat`.

For example, in `GregorianCalendar`, `Calendar.GetWeekOfYear` for January 1 returns 1.

#### Examples
The following example shows how the result of the `ThaiBuddhistCalendar.GetWeekOfYear` method varies depending on the `DateTimeFormatInfo.FirstDayOfWeek` and `CalendarWeekRule` values used. If the specified date is the last day of the year, `ThaiBuddhistCalendar.GetWeekOfYear` returns the total number of weeks in that year.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetWeekOfYear/yslin_calendar_getweekofyear.cs._

## ThaiBuddhistCalendar.GetYear(DateTime) method

```csharp
public override int GetYear (DateTime time);
```

Returns the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the year in the specified `DateTime`.

#### Examples
The following example demonstrates the use of the `ThaiBuddhistCalendar.GetYear` Method.

_Code sample not included: ~/snippets/csharp/System.Globalization/ThaiBuddhistCalendar/AddMonths/thaibuddhistcalendar_addget.cs._

## ThaiBuddhistCalendar.IsLeapDay(Int32, Int32, Int32, Int32) method

```csharp
public override bool IsLeapDay (int year, int month, int day, int era);
```

Determines whether the specified date in the specified era is a leap day.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `day`: An integer from 1 to 31 that represents the day.
- `era`: An integer that represents the era.

Returns: `true` if the specified day is a leap day; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`day` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Remarks
Leap years in the Thai Buddhist calendar correspond to the same leap years in the Gregorian calendar. A leap year in the Gregorian calendar is defined as a Gregorian year that is evenly divisible by four, except if it is divisible by 100. However, Gregorian years that are divisible by 400 are leap years. A common year has 365 days and a leap year has 366 days.

A leap day is a day that occurs only in a leap year. For example, the 29th day of February is the only leap day.

#### Examples
The following example calls `ThaiBuddhistCalendar.IsLeapDay` for the last day of the second month (February) for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/ThaiBuddhistCalendar/IsLeapDay/thaibuddhistcalendar_isleapday.cs._

## ThaiBuddhistCalendar.IsLeapMonth(Int32, Int32, Int32) method

```csharp
public override bool IsLeapMonth (int year, int month, int era);
```

Determines whether the specified month in the specified year in the specified era is a leap month.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `era`: An integer that represents the era.

Returns: This method always returns `false`, unless overridden by a derived class.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Remarks
Leap years in the Thai Buddhist calendar correspond to the same leap years in the Gregorian calendar. A leap year in the Gregorian calendar is defined as a Gregorian year that is evenly divisible by four, except if it is divisible by 100. However, Gregorian years that are divisible by 400 are leap years. A common year has 365 days and a leap year has 366 days.

A leap month is an entire month that occurs only in a leap year. The Thai Buddhist calendar does not have any leap months.

#### Examples
The following example calls `ThaiBuddhistCalendar.IsLeapMonth` for all the months in five years in the current era.

_Code sample not included: ~/snippets/csharp/System.Globalization/ThaiBuddhistCalendar/IsLeapMonth/thaibuddhistcalendar_isleapmonth.cs._

## ThaiBuddhistCalendar.IsLeapYear(Int32, Int32) method

```csharp
public override bool IsLeapYear (int year, int era);
```

Determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Remarks
Leap years in the Thai Buddhist calendar correspond to the same leap years in the Gregorian calendar. A leap year in the Gregorian calendar is defined as a Gregorian year that is evenly divisible by four, except if it is divisible by 100. However, Gregorian years that are divisible by 400 are leap years. A common year has 365 days and a leap year has 366 days.

#### Examples
The following example calls `ThaiBuddhistCalendar.IsLeapYear` for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/ThaiBuddhistCalendar/IsLeapYear/thaibuddhistcalendar_isleapyear.cs._

## ThaiBuddhistCalendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public override DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int era);
```

Returns a `DateTime` that is set to the specified date and time in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `day`: An integer from 1 to 31 that represents the day.
- `hour`: An integer from 0 to 23 that represents the hour.
- `minute`: An integer from 0 to 59 that represents the minute.
- `second`: An integer from 0 to 59 that represents the second.
- `millisecond`: An integer from 0 to 999 that represents the millisecond.
- `era`: An integer that represents the era.

Returns: The `DateTime` that is set to the specified date and time in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`day` is outside the range supported by the calendar.

-or-

`hour` is less than zero or greater than 23.

-or-

`minute` is less than zero or greater than 59.

-or-

`second` is less than zero or greater than 59.

-or-

`millisecond` is less than zero or greater than 999.

-or-

`era` is outside the range supported by the calendar.

To be added.

## ThaiBuddhistCalendar.ToFourDigitYear(Int32) method

```csharp
public override int ToFourDigitYear (int year);
```

Converts the specified year to a four-digit year by using the `ThaiBuddhistCalendar.TwoDigitYearMax` property to determine the appropriate century.

Parameters:

- `year`: A two-digit or four-digit integer that represents the year to convert.

Returns: An integer that contains the four-digit representation of `year`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

#### Remarks
`ThaiBuddhistCalendar.TwoDigitYearMax` is the last year in the 100-year range that can be represented by a two-digit year. The century is determined by finding the sole occurrence of the two-digit `year` within that 100-year range. For example, if `ThaiBuddhistCalendar.TwoDigitYearMax` is set to 2029, the 100-year range is from 1930 to 2029. Therefore, a 2-digit value of 30 is interpreted as 1930, while a 2-digit value of 29 is interpreted as 2029.

`ThaiBuddhistCalendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. Passing a two-digit year value (less than 100) causes the method to convert the value to a four-digit value according to the `ThaiBuddhistCalendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit year value that is within the supported calendar range to `ThaiBuddhistCalendar.ToFourDigitYear`, the method returns the actual input value. If the application supplies a four-digit value that is outside the supported calendar range, or if it supplies a negative value, the method throws an exception.

## ThaiBuddhistCalendar.ThaiBuddhistEra field

```csharp
public const int ThaiBuddhistEra = 1;
```

Represents the current era. This field is constant.

#### Remarks
The `ThaiBuddhistCalendar` class recognizes only the current era. This field always returns 1.
