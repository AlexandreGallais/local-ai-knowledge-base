---
title: "GregorianCalendar class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/GregorianCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GregorianCalendar class (part 2 of 2)

## GregorianCalendar.GetDayOfWeek(DateTime) method

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
The following code example displays the values of several components of a `DateTime` in terms of the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/AddMonths/gregoriancalendar_addget.cs._

## GregorianCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Returns the day of the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 366 that represents the day of the year in `time`.

#### Remarks
The day of the year is defined as the number of days from the first day of the year. For example, `GregorianCalendar.GetDayOfYear` for the first day of the first month returns 1, and `GregorianCalendar.GetDayOfYear` for the last day of the last month returns the total number of days in that year, which is the same value returned by `GregorianCalendar.GetDaysInYear`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/AddMonths/gregoriancalendar_addget.cs._

## GregorianCalendar.GetDaysInMonth(Int32, Int32, Int32) method

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
For example, this method returns 28 or 29 for February (`month` = 2), depending on whether `year` is a leap year.

#### Examples
The following code example calls GetDaysInMonth for the second month in each of five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/GetDaysInMonth/gregoriancalendar_getdaysinmonth.cs._

## GregorianCalendar.GetDaysInYear(Int32, Int32) method

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
For example, this method returns 365 or 366, depending on whether `year` is a leap year.

#### Examples
The following code example calls GetDaysInYear for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/GetDaysInYear/gregoriancalendar_getdaysinyear.cs._

## GregorianCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Returns the era in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era in `time`.

#### Remarks
The Gregorian calendar recognizes two eras: B.C. or B.C.E., and A.D. or C.E. This implementation of the `GregorianCalendar` class recognizes only the current era (A.D. or C.E.).

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/AddMonths/gregoriancalendar_addget.cs._

## GregorianCalendar.GetLeapMonth(Int32, Int32) method

```csharp
public override int GetLeapMonth (int year, int era);
```

Calculates the leap month for a specified year and era.

Parameters:

- `year`: A year.
- `era`: An era. Specify either `GregorianCalendar.ADEra` or `GregorianCalendar.Eras[Calendar.CurrentEra]`.

Returns: Always 0 because the Gregorian calendar does not recognize leap months.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is less than the Gregorian calendar year 1 or greater than the Gregorian calendar year 9999.

-or-

`era` is not `GregorianCalendar.ADEra` or `GregorianCalendar.Eras[Calendar.CurrentEra]`.

To be added.

## GregorianCalendar.GetMonth(DateTime) method

```csharp
public override int GetMonth (DateTime time);
```

Returns the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 12 that represents the month in `time`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/AddMonths/gregoriancalendar_addget.cs._

## GregorianCalendar.GetMonthsInYear(Int32, Int32) method

```csharp
public override int GetMonthsInYear (int year, int era);
```

Returns the number of months in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of months in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by the calendar.

-or-

`year` is outside the range supported by the calendar.

#### Examples
The following code example calls GetMonthsInYear for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/GetMonthsInYear/gregoriancalendar_getmonthsinyear.cs._

## GregorianCalendar.GetYear(DateTime) method

```csharp
public override int GetYear (DateTime time);
```

Returns the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the year in `time`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/AddMonths/gregoriancalendar_addget.cs._

## GregorianCalendar.IsLeapDay(Int32, Int32, Int32, Int32) method

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

- `ArgumentOutOfRangeException`: `era` is outside the range supported by the calendar.

-or-

`year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`day` is outside the range supported by the calendar.

#### Remarks
A leap year in the Gregorian calendar is defined as a year that is evenly divisible by four, except if it is divisible by 100. However, years that are divisible by 400 are leap years. For example, the year 1900 was not a leap year, but the year 2000 was. A common year has 365 days and a leap year has 366 days.

A leap day is a day that occurs only in a leap year. In the Gregorian calendar, the 29th day of February is the only leap day.

#### Examples
The following code example calls IsLeapDay for the last day of the second month (February) for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/IsLeapDay/gregoriancalendar_isleapday.cs._

## GregorianCalendar.IsLeapMonth(Int32, Int32, Int32) method

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

- `ArgumentOutOfRangeException`: `era` is outside the range supported by the calendar.

-or-

`year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

#### Remarks
A leap year in the Gregorian calendar is defined as a year that is evenly divisible by four, except if it is divisible by 100. However, years that are divisible by 400 are leap years. For example, the year 1900 was not a leap year, but the year 2000 was. A common year has 365 days and a leap year has 366 days.

A leap month is an entire month that occurs only in a leap year. The Gregorian calendar does not have any leap months.

#### Examples
The following code example calls IsLeapMonth for all the months in five years in the current era.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/IsLeapMonth/gregoriancalendar_isleapmonth.cs._

## GregorianCalendar.IsLeapYear(Int32, Int32) method

```csharp
public override bool IsLeapYear (int year, int era);
```

Determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is outside the range supported by the calendar.

-or-

`year` is outside the range supported by the calendar.

#### Remarks
A leap year in the Gregorian calendar is defined as a year that is evenly divisible by four, except if it is divisible by 100. However, years that are divisible by 400 are leap years. For example, the year 1900 was not a leap year, but the year 2000 was. A common year has 365 days and a leap year has 366 days.

#### Examples
The following code example calls IsLeapYear for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/IsLeapYear/gregoriancalendar_isleapyear.cs._

## GregorianCalendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

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

- `ArgumentOutOfRangeException`: `era` is outside the range supported by the calendar.

-or-

`year` is outside the range supported by the calendar.

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

To be added.

## GregorianCalendar.ToFourDigitYear(Int32) method

```csharp
public override int ToFourDigitYear (int year);
```

Converts the specified year to a four-digit year by using the `GregorianCalendar.TwoDigitYearMax` property to determine the appropriate century.

Parameters:

- `year`: A two-digit or four-digit integer that represents the year to convert.

Returns: An integer that contains the four-digit representation of `year`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

#### Remarks
`GregorianCalendar.TwoDigitYearMax` is the last year in the 100-year range that can be represented by a two-digit year. The century is determined by finding the sole occurrence of the two-digit `year` within that 100-year range. For example, if `GregorianCalendar.TwoDigitYearMax` is set to 2029, the 100-year range is from 1930 to 2029. Therefore, a 2-digit value of 30 is interpreted as 1930, while a 2-digit value of 29 is interpreted as 2029.

`GregorianCalendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. Passing a two-digit year value (less than 100) causes the method to convert the value to a four-digit value according to the `GregorianCalendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit year value that is within the supported calendar range to `GregorianCalendar.ToFourDigitYear`, the method returns the actual input value. If the application supplies a four-digit value that is outside the supported calendar range, or if it supplies a negative value, the method throws an exception.

## GregorianCalendar.ADEra field

```csharp
public const int ADEra = 1;
```

Represents the current era. This field is constant.

#### Remarks
The Gregorian calendar recognizes two eras: B.C. or B.C.E., and A.D. or C.E. This implementation of the `GregorianCalendar` class recognizes only the current era (A.D. or C.E.). This field always returns 1.
