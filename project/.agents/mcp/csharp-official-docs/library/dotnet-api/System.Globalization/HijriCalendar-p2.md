---
title: "HijriCalendar class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/HijriCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HijriCalendar class (part 2 of 2)

## HijriCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Returns the day of the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 355 that represents the day of the year in the specified `DateTime`.

#### Remarks
The day of the year is defined as the number of days from the first day of the year. For example, `HijriCalendar.GetDayOfYear` for the first day of the first month returns 1, and `HijriCalendar.GetDayOfYear` for the last day of the last month returns the total number of days in that year, which is the same value returned by `HijriCalendar.GetDaysInYear`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/AddMonths/hijricalendar_addget.cs._

## HijriCalendar.GetDaysInMonth(Int32, Int32, Int32) method

```csharp
public override int GetDaysInMonth (int year, int month, int era);
```

Returns the number of days in the specified month of the specified year and era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `era`: An integer that represents the era.

Returns: The number of days in the specified month in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by this calendar.

-or-

`year` is outside the range supported by this calendar.

-or-

`month` is outside the range supported by this calendar.

#### Remarks
For example, this method returns 29 or 30 for Zulhijjah (`month` = 12), depending on whether `year` is a leap year.

#### Examples
The following code example calls `GetDaysInMonth` for the twelfth month in each of five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/GetDaysInMonth/hijricalendar_getdaysinmonth.cs._

## HijriCalendar.GetDaysInYear(Int32, Int32) method

```csharp
public override int GetDaysInYear (int year, int era);
```

Returns the number of days in the specified year and era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of days in the specified year and era. The number of days is 354 in a common year or 355 in a leap year.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

#### Examples
The following code example calls `GetDaysInYear` for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/GetDaysInYear/hijricalendar_getdaysinyear.cs._

## HijriCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Returns the era in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era in the specified `DateTime`.

#### Remarks
The Hijri calendar recognizes one era: A.H. (Latin "Anno Hegirae", which means "the year of the migration," in reference to the migration of Muhammad (PBUH) from Mecca).

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/AddMonths/hijricalendar_addget.cs._

## HijriCalendar.GetLeapMonth(Int32, Int32) method

```csharp
public override int GetLeapMonth (int year, int era);
```

Calculates the leap month for a specified year and era.

Parameters:

- `year`: A year.
- `era`: An era. Specify `Calendar.CurrentEra` or `HijriCalendar.HijriEra`.

Returns: Always 0 because the `HijriCalendar` type does not support the notion of a leap month.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is less than the Hijri calendar year 1 or greater than the year 9666.

-or-

`era` is not `Calendar.CurrentEra` or `HijriCalendar.HijriEra`.

#### Remarks
In a calendar that supports the notion of a leap month, the leap month can occur either after a particular month or after any month in a year. For example, the `EastAsianLunisolarCalendar.GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

## HijriCalendar.GetMonth(DateTime) method

```csharp
public override int GetMonth (DateTime time);
```

Returns the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 12 that represents the month in the specified `DateTime`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/AddMonths/hijricalendar_addget.cs._

## HijriCalendar.GetMonthsInYear(Int32, Int32) method

```csharp
public override int GetMonthsInYear (int year, int era);
```

Returns the number of months in the specified year and era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of months in the specified year and era.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by this calendar.

-or-

`year` is outside the range supported by this calendar.

#### Examples
The following code example calls the GetMonthsInYear method for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/GetMonthsInYear/hijricalendar_getmonthsinyear.cs._

## HijriCalendar.GetYear(DateTime) method

```csharp
public override int GetYear (DateTime time);
```

Returns the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the year in the specified `DateTime`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/AddMonths/hijricalendar_addget.cs._

## HijriCalendar.IsLeapDay(Int32, Int32, Int32, Int32) method

```csharp
public override bool IsLeapDay (int year, int month, int day, int era);
```

Determines whether the specified date is a leap day.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `day`: An integer from 1 to 30 that represents the day.
- `era`: An integer that represents the era.

Returns: `true` if the specified day is a leap day; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by this calendar.

-or-

`year` is outside the range supported by this calendar.

-or-

`month` is outside the range supported by this calendar.

-or-

`day` is outside the range supported by this calendar.

#### Remarks
In every 30-year cycle that ends with a year that is evenly divisible by 30, the 2nd, 5th, 7th, 10th, 13th, 16th, 18th, 21st, 24th, 26th, and 29th years are leap years. A common year has 354 days and a leap year has 355 days.

A leap day is a day that occurs only in a leap year. In the Hijri calendar, the 30th day of Zulhijjah is the only leap day.

#### Examples
The following code example calls the `IsLeapDay` method for the last day of the second month (February) for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/IsLeapDay/hijricalendar_isleapday.cs._

## HijriCalendar.IsLeapMonth(Int32, Int32, Int32) method

```csharp
public override bool IsLeapMonth (int year, int month, int era);
```

Determines whether the specified month in the specified year and era is a leap month.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `era`: An integer that represents the era.

Returns: This method always returns `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by this calendar.

-or-

`year` is outside the range supported by this calendar.

-or-

`month` is outside the range supported by this calendar.

#### Remarks
In every 30-year cycle that ends with a year that is evenly divisible by 30, the 2nd, 5th, 7th, 10th, 13th, 16th, 18th, 21st, 24th, 26th, and 29th years are leap years. A common year has 354 days and a leap year has 355 days.

A leap month is an entire month that occurs only in a leap year. The Hijri calendar does not have any leap months.

#### Examples
The following code example calls `IsLeapMonth` for all the months in five years in the current era.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/IsLeapMonth/hijricalendar_isleapmonth.cs._

## HijriCalendar.IsLeapYear(Int32, Int32) method

```csharp
public override bool IsLeapYear (int year, int era);
```

Determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by this calendar.

-or-

`year` is outside the range supported by this calendar.

#### Remarks
In every 30-year cycle that ends with a year that is evenly divisible by 30, the 2nd, 5th, 7th, 10th, 13th, 16th, 18th, 21st, 24th, 26th, and 29th years are leap years. A common year has 354 days and a leap year has 355 days.

#### Examples
The following code example calls the `IsLeapYear` method for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/IsLeapYear/hijricalendar_isleapyear.cs._

## HijriCalendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public override DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int era);
```

Returns a `DateTime` that is set to the specified date, time, and era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `day`: An integer from 1 to 30 that represents the day.
- `hour`: An integer from 0 to 23 that represents the hour.
- `minute`: An integer from 0 to 59 that represents the minute.
- `second`: An integer from 0 to 59 that represents the second.
- `millisecond`: An integer from 0 to 999 that represents the millisecond.
- `era`: An integer that represents the era.

Returns: The `DateTime` that is set to the specified date and time in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by this calendar.

-or-

`year` is outside the range supported by this calendar.

-or-

`month` is outside the range supported by this calendar.

-or-

`day` is outside the range supported by this calendar.

-or-

`hour` is less than zero or greater than 23.

-or-

`minute` is less than zero or greater than 59.

-or-

`second` is less than zero or greater than 59.

-or-

`millisecond` is less than zero or greater than 999.

To be added.

## HijriCalendar.ToFourDigitYear(Int32) method

```csharp
public override int ToFourDigitYear (int year);
```

Converts the specified year to a four-digit year by using the `HijriCalendar.TwoDigitYearMax` property to determine the appropriate century.

Parameters:

- `year`: A two-digit or four-digit integer that represents the year to convert.

Returns: An integer that contains the four-digit representation of `year`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by this calendar.

#### Remarks
`HijriCalendar.TwoDigitYearMax` is the last year in the 100-year range that can be represented by a two-digit year. The century is determined by finding the sole occurrence of the two-digit `year` within that 100-year range. For example, if `HijriCalendar.TwoDigitYearMax` is set to 1429, the 100-year range is from 1330 to 1429; therefore, a 2-digit value of 30 is interpreted as 1330, while a 2-digit value of 29 is interpreted as 1429.

`HijriCalendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. Passing a two-digit year value (less than 100) causes the method to convert the value to a four-digit value according to the `HijriCalendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit year value that is within the supported calendar range to `HijriCalendar.ToFourDigitYear`, the method returns the actual input value. If the application supplies a four-digit value that is outside the supported calendar range, or if it supplies a negative value, the method throws an exception.

## HijriCalendar.HijriEra field

```csharp
public static readonly int HijriEra;
```

Represents the current era. This field is constant.

#### Remarks
The value of the `HijriEra` field is 1.

The Hijri calendar recognizes one era: A.H. (Latin "Anno Hegirae", which means "the year of the migration," in reference to the migration of Muhammad (PBUH) from Mecca).
