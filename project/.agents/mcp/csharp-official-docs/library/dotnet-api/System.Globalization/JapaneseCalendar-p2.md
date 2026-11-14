---
title: "JapaneseCalendar class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/JapaneseCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JapaneseCalendar class (part 2 of 3)

## JapaneseCalendar.AddYears(DateTime, Int32) method

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
- `ArgumentOutOfRangeException`: `time` is outside the supported range of the `JapaneseCalendar` type.

-or-

`years` is less than -10,000 or greater than 10,000.

The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The month part of the resulting `DateTime` remains the same as the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, Nigatsu (February) has 28 days except during leap years when it has 29 days. If the specified date is the 29th day of Nigatsu (February) in a leap year and the value of `years` is 1, the resulting date will be the 28th day of Nigatsu (February) in the following year.

If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples

The following code example displays the values of several components of a `DateTime` in terms of the Japanese calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/AddMonths/japanesecalendar_addget.cs._

## JapaneseCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Returns the day of the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 31 that represents the day of the month in the specified `DateTime`.

#### Examples

The following code example displays the values of several components of a `DateTime` in terms of the Japanese calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/AddMonths/japanesecalendar_addget.cs._

## JapaneseCalendar.GetDayOfWeek(DateTime) method

```csharp
public override DayOfWeek GetDayOfWeek (DateTime time);
```

Returns the day of the week in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A `DayOfWeek` value that represents the day of the week in the specified `DateTime`.

The `DayOfWeek` values are as follows:

| DayOfWeek value | which indicates     |
| --------------- | ------------------- |
| Sunday          | 日曜日 (Nichiyoubi) |
| Monday          | 月曜日 (Getsuyoubi) |
| Tuesday         | 火曜日 (Kayoubi)    |
| Wednesday       | 水曜日 (Suiyoubi)   |
| Thursday        | 木曜日 (Mokuyoubi)  |
| Friday          | 金曜日 (Kinyoubi)   |
| Saturday        | 土曜日 (Doyoubi)    |

#### Examples

The following code example displays the values of several components of a `DateTime` in terms of the Japanese calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/AddMonths/japanesecalendar_addget.cs._

## JapaneseCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Returns the day of the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 366 that represents the day of the year in the specified `DateTime`.

The day of the year is defined as the number of days from the first day of the year. For example, `JapaneseCalendar.GetDayOfYear` for the first day of the first month returns 1, and `JapaneseCalendar.GetDayOfYear` for the last day of the last month returns the total number of days in that year, which is the same value as that returned by `JapaneseCalendar.GetDaysInYear`.

#### Examples

The following code example displays the values of several components of a `DateTime` in terms of the Japanese calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/AddMonths/japanesecalendar_addget.cs._

## JapaneseCalendar.GetDaysInMonth(Int32, Int32, Int32) method

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

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

For example, this method returns 28 or 29 for Nigatsu (February, `month` = 2), depending on whether `year` is a leap year.

#### Examples

The following code example calls `JapaneseCalendar.GetDaysInMonth` for the second month in each of five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/GetDaysInMonth/japanesecalendar_getdaysinmonth.cs._

## JapaneseCalendar.GetDaysInYear(Int32, Int32) method

```csharp
public override int GetDaysInYear (int year, int era);
```

Returns the number of days in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of days in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

For example, this method returns 365 or 366, depending on whether `year` is a leap year.

#### Examples

The following example calls `JapaneseCalendar.GetDaysInYear` for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/GetDaysInYear/japanesecalendar_getdaysinyear.cs._

## JapaneseCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Returns the era in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era in the specified `DateTime`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is outside the supported range.

The Japanese calendar recognizes one era for every emperor's reign. The two most recent eras are the Heisei era, beginning in the Gregorian calendar year 1989, and the Reiwa era, beginning in the Gregorian calendar year 2019. The era name is typically displayed before the year. For example, the Gregorian calendar year 2001 is the Japanese calendar year Heisei 13. Note that the first year of an era is called "Gannen." Therefore, the Gregorian calendar year 1989 was the Japanese calendar year Heisei Gannen.

This class assigns numbers to the eras as follows:

| GetEra value | Era Name      | Era Abbreviation | Gregorian Dates                      |
| ------------ | ------------- | ---------------- | ------------------------------------ |
| 5            | 令和 (Reiwa)  | 令和 (R, r)      | May 1, 2019 to present               |
| 4            | 平成 (Heisei) | 平 (H, h)        | January 8, 1989 to April 30, 2019    |
| 3            | 昭和 (Showa)  | 昭 (S, s)        | December 25, 1926 to January 7, 1989 |
| 2            | 大正 (Taisho) | 大 (T, t)        | July 30, 1912 to December 24, 1926   |
| 1            | 明治 (Meiji)  | 明 (M, m)        | October 23, 1868 to July 29, 1912    |

Ordinarily, the `JapaneseCalendar` class supports dates from October 23 in the year Meiji 1 (October 23, 1868 of the Gregorian calendar), which is the value of the `MinSupportedDateTime` property in .NET 11 and later versions. However, the `JapaneseCalendar.GetEra` method successfully returns the era for dates from January 1 through October 22 in the year Meiji 1 (January 1, 1868 through October 22, 1868 in the Gregorian calendar). For dates earlier than January 1, 1868 in the Gregorian calendar, the method throws an `ArgumentOutOfRangeException` exception.

#### Examples

The following example displays the values of several components of a `DateTime` in terms of the Japanese calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/AddMonths/japanesecalendar_addget.cs._

## JapaneseCalendar.GetLeapMonth(Int32, Int32) method

```csharp
public override int GetLeapMonth (int year, int era);
```

Calculates the leap month for a specified year and era.

Parameters:

- `year`: A year.
- `era`: An era.

Returns: The return value is always 0 because the `JapaneseCalendar` type does not support the notion of a leap month.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by the `JapaneseCalendar` type.

In a calendar that supports the notion of a leap month, the leap month can occur either after a particular month or after any month in a year. For example, the `EastAsianLunisolarCalendar.GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

## JapaneseCalendar.GetMonth(DateTime) method

```csharp
public override int GetMonth (DateTime time);
```

Returns the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 12 that represents the month in the specified `DateTime`.

#### Examples

The following example displays the values of several components of a `DateTime` in terms of the Japanese calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/AddMonths/japanesecalendar_addget.cs._

## JapaneseCalendar.GetMonthsInYear(Int32, Int32) method

```csharp
public override int GetMonthsInYear (int year, int era);
```

Returns the number of months in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The return value is always 12.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Examples

The following example calls `JapaneseCalendar.GetMonthsInYear` for the first five years in each era. Because the `JapaneseCalendar` class supports only 12-month years, it indicates that there are 12 months in each of the eras supported by the `JapaneseCalendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/GetMonthsInYear/japanesecalendar_getmonthsinyear.cs._

## JapaneseCalendar.GetWeekOfYear(DateTime, CalendarWeekRule, DayOfWeek) method

```csharp
public override int GetWeekOfYear (DateTime time, System.Globalization.CalendarWeekRule rule, DayOfWeek firstDayOfWeek);
```

Returns the week of the year that includes the date in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.
- `rule`: One of the `CalendarWeekRule` values that defines a calendar week.
- `firstDayOfWeek`: One of the `DayOfWeek` values that represents the first day of the week.

Returns: A 1-based integer that represents the week of the year that includes the date in the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` or `firstDayOfWeek` is outside the range supported by the calendar.

-or-

`rule` is not a valid `CalendarWeekRule` value.

This method can be used to determine the number of weeks in the year by setting the `time` parameter to the last day of the year.

The `DateTimeFormat` property contains culture-specific values that can be used for the `rule` and `firstDayOfWeek` parameters.

The `FirstDayOfWeek` property of `CultureInfo.DateTimeFormat` contains the default `DayOfWeek` value that represents the first day of the week for a specific culture, using the calendar specified in the `Calendar` property of `CultureInfo.DateTimeFormat`.

The `CalendarWeekRule` property of `CultureInfo.DateTimeFormat` contains the default `CalendarWeekRule` value that defines a calendar week for a specific culture, using the calendar specified in the `Calendar` property of `CultureInfo.DateTimeFormat`.

For example, in `GregorianCalendar`, the `Calendar.GetWeekOfYear` method for January 1 returns 1.

#### Examples

The following code example shows how the result of `Calendar.GetWeekOfYear` varies depending on the `DateTimeFormatInfo.FirstDayOfWeek` and `CalendarWeekRule` values used. If the specified date is the last day of the year, `Calendar.GetWeekOfYear` returns the total number of weeks in that year.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetWeekOfYear/yslin_calendar_getweekofyear.cs._

## JapaneseCalendar.GetYear(DateTime) method

```csharp
public override int GetYear (DateTime time);
```

Returns the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the year in the specified `DateTime`.

#### Examples

The following code example displays the values of several components of a `DateTime` in terms of the Japanese calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/AddMonths/japanesecalendar_addget.cs._
