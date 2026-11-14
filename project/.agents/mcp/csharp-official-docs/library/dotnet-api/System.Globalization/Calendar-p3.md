---
title: "Calendar class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/Calendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Calendar class (part 3 of 4)

## Calendar.GetHour(DateTime) method

```csharp
public virtual int GetHour (DateTime time);
```

Returns the hours value in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 0 to 23 that represents the hour in `time`.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.GetLeapMonth(Int32) method

```csharp
public virtual int GetLeapMonth (int year);
```

Calculates the leap month for a specified year.

Parameters:

- `year`: A year.

Returns: A positive integer that indicates the leap month in the specified year.

-or-

Zero if this calendar does not support a leap month or if the `year` parameter does not represent a leap year.

#### Remarks
In a calendar that supports the notion of a leap month, the leap month can occur either after a particular month or after any month in a year. For example, the `GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

## Calendar.GetLeapMonth(Int32, Int32) method

```csharp
public virtual int GetLeapMonth (int year, int era);
```

Calculates the leap month for a specified year and era.

Parameters:

- `year`: A year.
- `era`: An era.

Returns: A positive integer that indicates the leap month in the specified year and era.

-or-

Zero if this calendar does not support a leap month or if the `year` and `era` parameters do not specify a leap year.

#### Remarks
In a calendar that supports the notion of a leap month, the leap month can occur either after a particular month or after any month in a year. For example, the `GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

## Calendar.GetMilliseconds(DateTime) method

```csharp
public virtual double GetMilliseconds (DateTime time);
```

Returns the milliseconds value in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A double-precision floating-point number from 0 to 999 that represents the milliseconds in the `time` parameter.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.GetMinute(DateTime) method

```csharp
public virtual int GetMinute (DateTime time);
```

Returns the minutes value in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 0 to 59 that represents the minutes in `time`.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.GetMonth(DateTime) method

```csharp
public abstract int GetMonth (DateTime time);
```

When overridden in a derived class, returns the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A positive integer that represents the month in `time`.

#### Remarks
For example, in `HebrewCalendar`, `Calendar.GetMonth` for Tishrei returns 1, and `Calendar.GetMonth` for Elul returns 12 in a common year or 13 in a leap year.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.GetMonthsInYear(Int32) method

```csharp
public virtual int GetMonthsInYear (int year);
```

Returns the number of months in the specified year in the current era.

Parameters:

- `year`: An integer that represents the year.

Returns: The number of months in the specified year in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

#### Remarks
For example, in `HebrewCalendar`, `Calendar.GetMonthsInYear` returns 12 for a common year or 13 for a leap year.

#### Examples
The following code example compares different implementations of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetDaysInMonth/calendar_compare.cs._

## Calendar.GetMonthsInYear(Int32, Int32) method

```csharp
public abstract int GetMonthsInYear (int year, int era);
```

When overridden in a derived class, returns the number of months in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of months in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Remarks
For example, in `HebrewCalendar`, `Calendar.GetMonthsInYear` returns 12 for a common year or 13 for a leap year.

## Calendar.GetSecond(DateTime) method

```csharp
public virtual int GetSecond (DateTime time);
```

Returns the seconds value in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 0 to 59 that represents the seconds in `time`.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.GetWeekOfYear(DateTime, CalendarWeekRule, DayOfWeek) method

```csharp
public virtual int GetWeekOfYear (DateTime time, System.Globalization.CalendarWeekRule rule, DayOfWeek firstDayOfWeek);
```

Returns the week of the year that includes the date in the specified `DateTime` value.

Parameters:

- `time`: A date and time value.
- `rule`: An enumeration value that defines a calendar week.
- `firstDayOfWeek`: An enumeration value that represents the first day of the week.

Returns: A positive integer that represents the week of the year that includes the date in the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is earlier than `Calendar.MinSupportedDateTime` or later than `Calendar.MaxSupportedDateTime`.

-or-

`firstDayOfWeek` is not a valid `DayOfWeek` value.

-or-

`rule` is not a valid `CalendarWeekRule` value.

#### Remarks
This method can be used to determine the number of weeks in the year by setting `time` to the last day of the year.

The `DateTimeFormatInfo` object for a particular culture that uses the calendar indicated by the `Calendar` property includes the following culture-specific values that can be used for the `rule` and `firstDayOfWeek` parameters:

- The `FirstDayOfWeek` property contains the default first day of the week that can be used for the `firstDayOfWeek` parameter.

- The `CalendarWeekRule` property contains the default calendar week rule that can be used for the `rule` parameter.

> **Note:**
> This does not map exactly to ISO 8601. The differences are discussed in the blog entry ISO 8601 Week of Year format in Microsoft .NET. `ISOWeek.GetYear` and `ISOWeek.GetWeekOfYear` solve this problem.

The following example uses the current culture's `DateTimeFormatInfo` object to determine that January 1, 2011 is in the first week of the year in the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetWeekOfYear/getweekofyearex1.cs._

For some calendars, a call to the `Calendar.GetWeekOfYear` method throws an `ArgumentOutOfRangeException` for particular combinations of `rule` and `firstDayOfWeek` values even if `time` is greater than the date returned by that calendar's `MinSupportedDateTime` property. The following table lists the affected calendars, the specific `rule` values, and the range of the earliest supported `time` values. The specific minimum `DateTime` value depends on the value of the `firstDayOfWeek` parameter.

|Calendar|CalendarWeekRule value|Gregorian date (M/dd/yyyy)|Date in calendar (M/dd/yyyy)|
|--------------|----------------------------|------------------------------------|--------------------------------------|
|`ChineseLunisolarCalendar`|`FirstFullWeek`|2/19/1901 to 2/25/1901|1/1/1901 to 1/7/1901|
|`ChineseLunisolarCalendar`|`FirstFourDayWeek`|2/19/1901 to 2/22/1901|1/01/1901 to 1/04/1901|
|`HebrewCalendar`|`FirstDay`|9/17/1583|1/01/5344|
|`HebrewCalendar`|`FirstFullWeek`|9/17/1583 to 9/23/1583|1/01/5344 to 1/07/5344|
|`HebrewCalendar`|`FirstFourDayWeek`|9/17/1583 to 9/20/1583|1/01/5344 to 1/04/5344|
|`HijriCalendar`|`FirstFullWeek`|7/18/0622 to 7/24/0622|1/01/0001 to 1/07/0001|
|`HijriCalendar`|`FirstFourDayWeek`|7/18/0622 to 7/21/0622|1/01/0001 to 1/04/0001|
|`JapaneseLunisolarCalendar`|`FirstFullWeek`|1/28/1960 to 2/03/1960|1/01/35 to 1/07/0035|
|`JapaneseLunisolarCalendar`|`FirstFourDayWeek`|1/28/1960 to 1/31/1960|1/01/0035 to 1/04/0035|
|`JulianCalendar`|`FirstFullWeek`|1/01/0001 to 1/05/0001|1/03/0001 to 1/07/0001|
|`JulianCalendar`|`FirstFourDayWeek`|1/01/0001 to 1/02/0001|1/03/0001 to 1/04/0001|
|`KoreanLunisolarCalendar`|`FirstFullWeek`|2/14/0918 to 2/20/0918|1/01/0918 to 1/07/0918|
|`KoreanLunisolarCalendar`|`FirstFourDayWeek`|2/14/0918 to 2/17/0918|1/01/0918 to 1/04/0918|
|`PersianCalendar`|`FirstFullWeek`|3/21/0622 to 3/27/0622|1/01/0001 to 1/07/0001|
|`PersianCalendar`|`FirstFourDayWeek`|3/21/0622 to 3/24/0622|1/01/0001 to 1/04/0001|
|`TaiwanLunisolarCalendar`|`FirstFullWeek`|2/18/1912 to 2/24/1912|1/01/0001 to 1/07/0001|
|`TaiwanLunisolarCalendar`|`FirstFourDayWeek`|2/18/1912 to 2/21/1912|1/01/0001 to 1/04/0001|
|`UmAlQuraCalendar`|`FirstFullWeek`|4/30/1900 to 5/06/1900|1/01/1318 to 1/07/1318|
|`UmAlQuraCalendar`|`FirstFourDayWeek`|4/30/1900 to 5/03/1900|1/01/1318 to 1/04/1318|

#### Examples
The following code example shows how the result of `Calendar.GetWeekOfYear` varies depending on the `DateTimeFormatInfo.FirstDayOfWeek` and the `CalendarWeekRule` used. If the specified date is the last day of the year, `Calendar.GetWeekOfYear` returns the total number of weeks in that year.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetWeekOfYear/yslin_calendar_getweekofyear.cs._

## Calendar.GetYear(DateTime) method

```csharp
public abstract int GetYear (DateTime time);
```

When overridden in a derived class, returns the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the year in `time`.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.IsLeapDay(Int32, Int32, Int32) method

```csharp
public virtual bool IsLeapDay (int year, int month, int day);
```

Determines whether the specified date in the current era is a leap day.

Parameters:

- `year`: An integer that represents the year.
- `month`: A positive integer that represents the month.
- `day`: A positive integer that represents the day.

Returns: `true` if the specified day is a leap day; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`day` is outside the range supported by the calendar.

#### Remarks
To make up for the difference between the calendar year and the actual time that the earth rotates around the sun or the actual time that the moon rotates around the earth, a leap year has a different number of days from a standard calendar year. Each `Calendar` implementation defines leap years differently.

A leap day is a day that occurs only in a leap year. For example, in the Gregorian calendar, the 29th day of February is the only leap day.

#### Examples
The following code example compares different implementations of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetDaysInMonth/calendar_compare.cs._

## Calendar.IsLeapDay(Int32, Int32, Int32, Int32) method

```csharp
public abstract bool IsLeapDay (int year, int month, int day, int era);
```

When overridden in a derived class, determines whether the specified date in the specified era is a leap day.

Parameters:

- `year`: An integer that represents the year.
- `month`: A positive integer that represents the month.
- `day`: A positive integer that represents the day.
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
To make up for the difference between the calendar year and the actual time that the earth rotates around the sun or the actual time that the moon rotates around the earth, a leap year has a different number of days from a standard calendar year. Each `Calendar` implementation defines leap years differently.

A leap day is a day that occurs only in a leap year. For example, in the Gregorian calendar, the 29th day of February is the only leap day.

## Calendar.IsLeapMonth(Int32, Int32) method

```csharp
public virtual bool IsLeapMonth (int year, int month);
```

Determines whether the specified month in the specified year in the current era is a leap month.

Parameters:

- `year`: An integer that represents the year.
- `month`: A positive integer that represents the month.

Returns: `true` if the specified month is a leap month; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

#### Remarks
To make up for the difference between the calendar year and the actual time that the earth rotates around the sun or the actual time that the moon rotates around the earth, a leap year has a different number of days from a standard calendar year. Each `Calendar` implementation defines leap years differently.

A leap month is an entire month that occurs only in a leap year. For example, in the Hebrew calendar, Adar Beit is the only leap month.

#### Examples
The following code example compares different implementations of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetDaysInMonth/calendar_compare.cs._
