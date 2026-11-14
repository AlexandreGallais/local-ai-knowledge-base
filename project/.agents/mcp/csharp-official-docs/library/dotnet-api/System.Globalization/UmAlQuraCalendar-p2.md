---
title: "UmAlQuraCalendar class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/UmAlQuraCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UmAlQuraCalendar class (part 2 of 2)

## UmAlQuraCalendar.GetDaysInMonth(Int32, Int32, Int32) method

```csharp
public override int GetDaysInMonth (int year, int month, int era);
```

Calculates the number of days in the specified month of the specified year and era.

Parameters:

- `year`: A year.
- `month`: An integer from 1 through 12 that represents a month.
- `era`: An era. Specify `UmAlQuraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

Returns: The number of days in the specified month in the specified year and era. The return value is 29 in a common year and 30 in a leap year.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, or `era` is outside the range supported by the `UmAlQuraCalendar` class.

#### Remarks
This method returns a different number of days in a specified month for a common year versus a leap year. For example, this method returns 29 or 30 for Zulhijjah (`month` = 12), depending on whether `year` is a leap year.

#### Examples
The following example calls the `UmAlQuraCalendar.GetDaysInMonth` method to get the number of days in each month of five consecutive years.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/GetDaysInMonth/getdaysinmonth1.cs._

## UmAlQuraCalendar.GetDaysInYear(Int32, Int32) method

```csharp
public override int GetDaysInYear (int year, int era);
```

Calculates the number of days in the specified year of the specified era.

Parameters:

- `year`: A year.
- `era`: An era. Specify `UmAlQuraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

Returns: The number of days in the specified year and era. The number of days is 354 in a common year or 355 in a leap year.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by the `UmAlQuraCalendar` class.

#### Examples
The following example calls the `UmAlQuraCalendar.GetDaysInYear` method to get the number of days in ten consecutive years in each era supported by the `UmAlQuraCalendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/GetDaysInYear/getdaysinyear1.cs._

## UmAlQuraCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Calculates the era in which a specified date occurs.

Parameters:

- `time`: The date value to read.

Returns: Always returns the `UmAlQuraCalendar.UmAlQuraEra` value.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is outside the range supported by this calendar.

#### Remarks
The Um Al Qura calendar recognizes one era: A.H. (Latin "Anno Hegirae", which means "the year of the migration," in reference to the migration of Muhammad (PBUH) from Mecca).

#### Examples
The following example displays the values of several components of a date in the Um Al Qura calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/AddMonths/addmonths1.cs._

## UmAlQuraCalendar.GetLeapMonth(Int32, Int32) method

```csharp
public override int GetLeapMonth (int year, int era);
```

Calculates the leap month for a specified year and era.

Parameters:

- `year`: A year.
- `era`: An era. Specify `UmAlQuraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

Returns: Always 0 because the `UmAlQuraCalendar` class does not support leap months.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is less than 1318 or greater than 1450.

-or-

`era` is not `UmAlQuraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

#### Remarks
In a calendar that supports the notion of a leap month, the leap month can occur either after a particular month or after any month in a year. For example, the `GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

## UmAlQuraCalendar.GetMonth(DateTime) method

```csharp
public override int GetMonth (DateTime time);
```

Calculates the month in which a specified date occurs.

Parameters:

- `time`: The date value to read. The `UmAlQuraCalendar` class supports only dates from 04/30/1900 00.00.00 (Gregorian date) through 11/16/2077 23:59:59 (Gregorian date).

Returns: An integer from 1 through 12 that represents the month in the date specified by the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is outside the range supported by this calendar.

#### Examples
The following example displays the date ranges supported by the `UmAlQuraCalendar` class in both the Gregorian and Um Al Qura calendars. The `UmAlQuraCalendar.GetMonth` method is used to retrieve the month of the minimum and maximum supported dates in the Um Al Qura calendar if it is not the current culture's current calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/GetMonth/getmonth1.cs._

## UmAlQuraCalendar.GetMonthsInYear(Int32, Int32) method

```csharp
public override int GetMonthsInYear (int year, int era);
```

Calculates the number of months in the specified year of the specified era.

Parameters:

- `year`: A year.
- `era`: An era. Specify `UmAlQuaraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

Returns: Always 12.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by this calendar.
- `ArgumentException`: `era` is outside the range supported by this calendar.

#### Examples
The following example calls the `UmAlQuraCalendar.GetMonthsInYear` method to determine the number of months in four consecutive years, and then calls the `UmAlQuraCalendar.GetDaysInMonth` method to determine how many days there are in each month.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/GetDaysInMonth/getdaysinmonth1.cs._

## UmAlQuraCalendar.GetYear(DateTime) method

```csharp
public override int GetYear (DateTime time);
```

Calculates the year of a date represented by a specified `DateTime`.

Parameters:

- `time`: The date value to read. The `UmAlQuraCalendar` class supports only dates from 04/30/1900 00.00.00 (Gregorian date) through 11/16/2077 23:59:59 (Gregorian date).

Returns: An integer that represents the year specified by the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is outside the range supported by this calendar.

#### Examples
The following example displays the date ranges supported by the `UmAlQuraCalendar` class in both the Gregorian and Um Al Qura calendars. The `UmAlQuraCalendar.GetYear` method is used to retrieve the year of the minimum and maximum supported dates in the Um Al Qura calendar if it is not the current culture's current calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/GetMonth/getmonth1.cs._

## UmAlQuraCalendar.IsLeapDay(Int32, Int32, Int32, Int32) method

```csharp
public override bool IsLeapDay (int year, int month, int day, int era);
```

Determines whether the specified date is a leap day.

Parameters:

- `year`: A year.
- `month`: An integer from 1 through 12 that represents a month.
- `day`: An integer from 1 through 30 that represents a day.
- `era`: An era. Specify `UmAlQuraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

Returns: `true` if the specified day is a leap day; otherwise, `false`. The return value is always `false` because the `UmAlQuraCalendar` class does not support leap days.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, `day`, or `era` is outside the range supported by the `UmAlQuraCalendar` class.

#### Remarks
A leap day is a day that occurs only in a leap year.

#### Examples
The following example calls the `UmAlQuraCalendar.IsLeapDay` method for the last day of the second month (February) for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/IsLeapDay/hijricalendar_isleapday.cs._

## UmAlQuraCalendar.IsLeapMonth(Int32, Int32, Int32) method

```csharp
public override bool IsLeapMonth (int year, int month, int era);
```

Determines whether the specified month in the specified year and era is a leap month.

Parameters:

- `year`: A year.
- `month`: An integer from 1 through 12 that represents a month.
- `era`: An era. Specify `UmAlQuraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

Returns: Always `false` because the `UmAlQuraCalendar` class does not support leap months.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, or `era` is outside the range supported by the `UmAlQuraCalendar` class.

#### Remarks
A leap month is an entire month that occurs only in a leap year.

## UmAlQuraCalendar.IsLeapYear(Int32, Int32) method

```csharp
public override bool IsLeapYear (int year, int era);
```

Determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: A year.
- `era`: An era. Specify `UmAlQuraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by the `UmAlQuraCalendar` class.

#### Remarks
A common year has 354 days and a leap year has 355 days.

#### Examples
The following example lists the number of days in ten consecutive years and calls the `UmAlQuraCalendar.IsLeapYear` method to determine which years are leap years.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/IsLeapYear/isleapyear1.cs._

## UmAlQuraCalendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public override DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int era);
```

Returns a `DateTime` that is set to the specified date, time, and era.

Parameters:

- `year`: A year.
- `month`: An integer from 1 through 12 that represents a month.
- `day`: An integer from 1 through 29 that represents a day.
- `hour`: An integer from 0 through 23 that represents an hour.
- `minute`: An integer from 0 through 59 that represents a minute.
- `second`: An integer from 0 through 59 that represents a second.
- `millisecond`: An integer from 0 through 999 that represents a millisecond.
- `era`: An era. Specify `UmAlQuraCalendar.Eras[UmAlQuraCalendar.CurrentEra]` or `UmAlQuraCalendar.UmAlQuraEra`.

Returns: The `DateTime` that is set to the specified date and time in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, `day`, or `era` is outside the range supported by the `UmAlQuraCalendar` class.

-or-

`hour` is less than zero or greater than 23.

-or-

`minute` is less than zero or greater than 59.

-or-

`second` is less than zero or greater than 59.

-or-

`millisecond` is less than zero or greater than 999.

#### Remarks
The `UmAlQuraCalendar.ToDateTime` method is useful because it can convert any date in the current calendar to a Gregorian calendar date. The Gregorian date can subsequently be used, for example, to compare dates in different calendars or create an equivalent date in a particular calendar.

## UmAlQuraCalendar.ToFourDigitYear(Int32) method

```csharp
public override int ToFourDigitYear (int year);
```

Converts the specified year to a four-digit year by using the `UmAlQuraCalendar.TwoDigitYearMax` property to determine the appropriate century.

Parameters:

- `year`: A 2-digit year from 0 through 99, or a 4-digit Um Al Qura calendar year from 1318 through 1450.

Returns: If the `year` parameter is a 2-digit year, the return value is the corresponding 4-digit year. If the `year` parameter is a 4-digit year, the return value is the unchanged `year` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by this calendar.

#### Remarks
The `UmAlQuraCalendar.ToFourDigitYear` method uses the `year` parameter, the `TwoDigitYearMax` property, and a year to calculate a 4-digit year. The century is determined by finding the sole occurrence of the 2-digit `year` parameter within that 100-year range. For example, if `UmAlQuraCalendar.TwoDigitYearMax` is set to 1429, the 100-year range is from 1330 through 1429. Therefore, a 2-digit value of 30 is interpreted as 1330, while a 2-digit value of 29 is interpreted as 1429.

If the `TwoDigitYearMax` property is the special value 99, the `UmAlQuraCalendar.ToFourDigitYear` method ignores the settings in the regional and language options in Control Panel and returns the `year` parameter unchanged.

`UmAlQuraCalendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. Passing a two-digit year value (less than 100) causes the method to convert the value to a four-digit value according to the `UmAlQuraCalendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit year value that is within the supported calendar range to `UmAlQuraCalendar.ToFourDigitYear`, the method returns the actual input value. If the application supplies a four-digit value that is outside the supported calendar range, or if it supplies a negative value, the method throws an exception.

## UmAlQuraCalendar.UmAlQuraEra field

```csharp
public const int UmAlQuraEra = 1;
```

Represents the current era. This field is constant.

#### Remarks
The value of the `UmAlQuraEra` field is 1.

The Um Al Qura calendar recognizes one era: A.H. (Latin "Anno Hegirae", which means "the year of the migration," in reference to the migration of Muhammad (PBUH) from Mecca).
