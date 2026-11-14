---
title: "UmAlQuraCalendar class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/UmAlQuraCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UmAlQuraCalendar class

Namespace: `System.Globalization`

```csharp
public class UmAlQuraCalendar : System.Globalization.Calendar
```

Represents the Saudi Hijri (Um Al Qura) calendar.

#### Remarks
The `UmAlQuraCalendar` class is nearly identical to the `HijriCalendar` class, except the Um Al Qura calendar uses a table-based algorithm licensed from the Saudi government to calculate dates, can express dates to the year 1500 A.H., and does not support the `HijriAdjustment` property.

> **Note:**
> For information about using the `UmAlQuraCalendar` class and the other calendar classes in .NET, see Working with Calendars.

For the `UmAlQuraCalendar` class, each month has either 29 or 30 days, but usually in no discernible order. Whereas the documentation for the Hijri Calendar gives a table that shows the corresponding days in each month, no such general table can be produced for the Um Al Qura calendar.

For more information about the Hijri calendar, see the `HijriCalendar` class.

**Note** The `UmAlQuraCalendar` class supports only dates from 04/30/1900 00.00.00 (Gregorian date) through 11/16/2077 23:59:59 (Gregorian date).

## UmAlQuraCalendar.UmAlQuraCalendar() constructor

```csharp
public UmAlQuraCalendar ();
```

Initializes a new instance of the `UmAlQuraCalendar` class.

To be added.

## UmAlQuraCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value indicating whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: Always returns `CalendarAlgorithmType.LunarCalendar`.

#### Examples
The following example uses reflection to instantiate each `Calendar` type in .NET and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## UmAlQuraCalendar.DaysInYearBeforeMinSupportedYear property

```csharp
protected override int DaysInYearBeforeMinSupportedYear { get; }
```

Gets the number of days in the year that precedes the year that is specified by the `UmAlQuraCalendar.MinSupportedDateTime` property.

Returns: The number of days in the year that precedes the year specified by `UmAlQuraCalendar.MinSupportedDateTime`.

#### Remarks
This property returns a constant value of 384.

## UmAlQuraCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets a list of the eras that are supported by the current `UmAlQuraCalendar`.

Returns: An array that consists of a single element having a value that is `UmAlQuraCalendar.UmAlQuraEra`.

#### Remarks
The Hijri calendar recognizes one era: A.H. (Latin "Anno Hegirae", which means "the year of the migration," in reference to the migration of Muhammad (PBUH) from Mecca). This property always returns an array with only one element.

## UmAlQuraCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by this calendar.

Returns: The latest date and time supported by the `UmAlQuraCalendar` class, which is equivalent to the last moment of November 16, 2077 C.E. in the Gregorian calendar.

#### Examples
The following example displays the date ranges supported by the `UmAlQuraCalendar` class in both the Gregorian and Um Al Qura calendars.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/GetMonth/getmonth1.cs._

## UmAlQuraCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by this calendar.

Returns: The earliest date and time supported by the `UmAlQuraCalendar` class, which is equivalent to the first moment of April 30, 1900 C.E. in the Gregorian calendar.

#### Examples
The following example displays the date ranges supported by the `UmAlQuraCalendar` class in both the Gregorian and Um Al Qura calendars.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/GetMonth/getmonth1.cs._

## UmAlQuraCalendar.TwoDigitYearMax property

```csharp
public override int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `InvalidOperationException`: This calendar is read-only.
- `ArgumentOutOfRangeException`: In a set operation, the Um Al Qura calendar year value is less than 1318 but not 99, or is greater than 1450.

#### Remarks
This property allows a 2-digit year to be properly translated to a 4-digit year. For example, if this property is set to 1429, the 100-year range is from 1330 through 1429. Therefore, a 2-digit value of 30 is interpreted as 1330, while a 2-digit value of 29 is interpreted as 1429.

The initial value of this property is derived from the settings in the regional and language options portion of Control Panel. However, that information can change during the life of the `AppDomain`. The `UmAlQuraCalendar` class does not detect changes in the system settings automatically.

The special value 99 causes the `UmAlQuraCalendar.ToFourDigitYear` method to ignore the system settings and return the specified year unchanged.

## UmAlQuraCalendar.AddMonths(DateTime, Int32) method

```csharp
public override DateTime AddMonths (DateTime time, int months);
```

Calculates a date that is a specified number of months away from a specified initial date.

Parameters:

- `time`: The date to which to add months. The `UmAlQuraCalendar` class supports only dates from 04/30/1900 00.00.00 (Gregorian date) through 11/16/2077 23:59:59 (Gregorian date).
- `months`: The positive or negative number of months to add.

Returns: The date yielded by adding the number of months specified by the `months` parameter to the date specified by the `time` parameter.

Exceptions:

- `ArgumentException`: The resulting date is outside the range supported by the `UmAlQuraCalendar` class.
- `ArgumentOutOfRangeException`: `months` is less than -120,000 or greater than 120,000.

-or-

`time` is outside the range supported by this calendar.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. This implementation supports only the current era. Therefore, an exception is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, if the specified month is Zulkadah, which has 30 days, the specified day is the 30th day of that month, and the value of the `months` parameter is 3, the resulting year is one more than the specified year, the resulting month is Safar, and the resulting day is the 29th day, which is the last day in Safar.

If the value of the `months` parameter is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following example instantiates a `DateTime` value and displays the values of several of its components in the Um Al Qura calendar. Next, it calls the `UmAlQuraCalendar.AddYears` and `UmAlQuraCalendar.AddMonths` methods to add 2 years and 10 months in the Um Al Qura calendar to the date value. Finally, it again displays the values of these date components in the Um Al Qura calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/AddMonths/addmonths1.cs._

## UmAlQuraCalendar.AddYears(DateTime, Int32) method

```csharp
public override DateTime AddYears (DateTime time, int years);
```

Calculates a date that is a specified number of years away from a specified initial date.

Parameters:

- `time`: The date to which to add years. The `UmAlQuraCalendar` class supports only dates from 04/30/1900 00.00.00 (Gregorian date) through 11/16/2077 23:59:59 (Gregorian date).
- `years`: The positive or negative number of years to add.

Returns: The date yielded by adding the number of years specified by the `years` parameter to the date specified by the `time` parameter.

Exceptions:

- `ArgumentException`: The resulting date is outside the range supported by the `UmAlQuraCalendar` class.
- `ArgumentOutOfRangeException`: `years` is less than -10,000 or greater than 10,000.

-or-

`time` is outside the range supported by this calendar.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The month part of the resulting `DateTime` remains the same as the specified `DateTime`. This implementation supports only the current era. Therefore, an exception is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, Zulhijjah has 29 days, except during leap years when it has 30 days. If the specified date is the 30th day of Zulhijjah in a leap year and the value of the `years` parameter is 1, the resulting date is the 29th day of Zulhijjah in the following year.

If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following example instantiates a `DateTime` value and displays the values of several of its components in the Um AL Qura calendar. Next, it calls the `UmAlQuraCalendar.AddYears` and `UmAlQuraCalendar.AddMonths` methods to add 2 years and 10 months in the Um Al Qura calendar to the date value. Finally, it again displays the values of these date components in the Um Al Qura calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/AddMonths/addmonths1.cs._

## UmAlQuraCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Calculates the day of the month on which a specified date occurs.

Parameters:

- `time`: The date value to read. The `UmAlQuraCalendar` class supports only dates from 04/30/1900 00.00.00 (Gregorian date) through 11/16/2077 23:59:59 (Gregorian date).

Returns: An integer from 1 through 30 that represents the day of the month specified by the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is outside the range supported by this calendar.

#### Examples
The following example displays the values of several components of a `DateTime` in terms of the Um Al Qura calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/AddMonths/addmonths1.cs._

## UmAlQuraCalendar.GetDayOfWeek(DateTime) method

```csharp
public override DayOfWeek GetDayOfWeek (DateTime time);
```

Calculates the day of the week on which a specified date occurs.

Parameters:

- `time`: The date value to read. The `UmAlQuraCalendar` class supports only dates from 04/30/1900 00.00.00 (Gregorian date) through 11/16/2077 23:59:59 (Gregorian date).

Returns: A `DayOfWeek` value that represents the day of the week specified by the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is outside the range supported by this calendar.

#### Remarks
The `DayOfWeek` values are as follows:

|DayOfWeek value|which indicates|
|---------------------|---------------------|
|Sunday|الاحد (Al-Ahad)|
|Monday|الاثنين (Al-Ithnayn)|
|Tuesday|الثلاثاء (At-Thulaathaa')|
|Wednesday|الاربعاء (Al-Arbi'aa')|
|Thursday|الخميس (Al-Khamiis)|
|Friday|الجمعة (Al-Jumu'ah)|
|Saturday|السبت (As-Sabt)|

#### Examples
The following example displays the values of several components of a `DateTime` in terms of the Um Al Qura calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/AddMonths/addmonths1.cs._

## UmAlQuraCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Calculates the day of the year on which a specified date occurs.

Parameters:

- `time`: The date value to read. The `UmAlQuraCalendar` class supports only dates from 04/30/1900 00.00.00 (Gregorian date) through 11/16/2077 23:59:59 (Gregorian date).

Returns: An integer from 1 through 355 that represents the day of the year specified by the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is outside the range supported by this calendar.

#### Remarks
The day of the year is defined as the number of days from the first day of the year. For example, the `UmAlQuraCalendar.GetDayOfYear` method returns 1 for the first day of the first month of the year, and the total number of days in the year for the last day of the last month.

#### Examples
The following example displays the values of several components of a `DateTime` in terms of the Um Al Qura calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/UmAlQuraCalendar/AddMonths/addmonths1.cs._
