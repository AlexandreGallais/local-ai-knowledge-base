---
title: "HijriCalendar class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/HijriCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HijriCalendar class

Namespace: `System.Globalization`

```csharp
public class HijriCalendar : System.Globalization.Calendar
```

Represents the Hijri calendar.

#### Remarks
The Hijri calendar recognizes one era: A.H. (Latin "Anno Hegirae", which means "the year of the migration," in reference to the migration of Muhammad (PBUH) from Mecca).

> **Note:**
> For information about using the `HijriCalendar` class and the other calendar classes in .NET, see Working with Calendars.

In every 30-year cycle that ends with a year that is evenly divisible by 30, the 2nd, 5th, 7th, 10th, 13th, 16th, 18th, 21st, 24th, 26th, and 29th years are leap years. A common year has 354 days and a leap year has 355 days.

The Hijri calendar has 12 months with 29 to 30 days each:

|GetMonth value|Month|Days in common years|Days in leap years|
|--------------------|-----------|--------------------------|------------------------|
|1|محرم (Muharram)|30|30|
|2|صفر (Safar)|29|29|
|3|‏ربيع الاول (Rabi I)|30|30|
|4|‏ربيع الثاني (Rabi II)|29|29|
|5|جمادى الاولى (Jumada I)|30|30|
|6|جمادى الثانية (Jumada II)|29|29|
|7|رجب (Rajab)|30|30|
|8|شعبان (Shaban)|29|29|
|9|رمضان (Ramadan)|30|30|
|10|شوال (Shawwal)|29|29|
|11|ذو القعدة (Zulkadah)|30|30|
|12|ذو الحجة (Zulhijjah)|29|30|

Ramadan, the month of fasting in the Muslim world, officially starts and ends according to a decree that is based on the observation of the new moon. Therefore, the number of days in Shaban and the number of days in Ramadan vary.

The date January 1, 2001 A.D. in the Gregorian calendar is roughly equivalent to the sixth day of Shawwal in the year 1421 A.H. in the Hijri calendar.

This implementation of the `HijriCalendar` class adjusts the calendar date by adding or subtracting a value from zero to two days to accommodate the variances in the start and the end of Ramadan and to accommodate the date difference between countries/regions. That value is stored in the `HijriAdjustment` property. If `HijriCalendar.HijriAdjustment` is not set explicitly, it derives its value from the settings in the regional and language options portion of Control Panel and is stored in the registry value HKEY_CURRENT_USER\Control Panel\International\AddHijriDate. However, that information can change during the life of the `AppDomain`. The `HijriCalendar` class does not detect changes in the system settings automatically.

Each `CultureInfo` supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, the application should set the `Calendar` property of `CultureInfo.DateTimeFormat` to a new `Calendar`.

## HijriCalendar.HijriCalendar() constructor

```csharp
public HijriCalendar ();
```

Initializes a new instance of the `HijriCalendar` class.

To be added.

## HijriCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value that indicates whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: Always returns `CalendarAlgorithmType.LunarCalendar`.

#### Examples
The following example uses reflection to instantiate each `Calendar` type in .NET and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## HijriCalendar.DaysInYearBeforeMinSupportedYear property

```csharp
protected override int DaysInYearBeforeMinSupportedYear { get; }
```

Gets the number of days in the year that precedes the year that is specified by the `HijriCalendar.MinSupportedDateTime` property.

Returns: The number of days in the year that precedes the year specified by `HijriCalendar.MinSupportedDateTime`.

#### Remarks
This property returns a constant value of 354.

## HijriCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the list of eras in the `HijriCalendar`.

Returns: An array of integers that represents the eras in the `HijriCalendar`.

#### Remarks
The Hijri calendar recognizes one era: A.H. (Latin "Anno Hegirae", which means "the year of the migration," in reference to the migration of Muhammad (PBUH) from Mecca). This property always returns an array with only one element.

## HijriCalendar.HijriAdjustment property

```csharp
public int HijriAdjustment { get; set; }
```

Gets or sets the number of days to add or subtract from the calendar to accommodate the variances in the start and the end of Ramadan and to accommodate the date difference between countries/regions.

Returns: An integer from -2 to 2 that represents the number of days to add or subtract from the calendar.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to an invalid value.

#### Remarks
This implementation of the `HijriCalendar` class adjusts the calendar date by adding or subtracting a value from zero to two days to accommodate the variances in the start and the end of Ramadan and to accommodate the date difference between countries/regions. That value is stored in the `HijriAdjustment` property. If `HijriCalendar.HijriAdjustment` is not set explicitly, it derives its value from the settings in the regional and language options portion of Control Panel and is stored in the registry value HKEY_CURRENT_USER\Control Panel\International\AddHijriDate. However, that information can change during the life of the `AppDomain`. The `HijriCalendar` class does not detect changes in the system settings automatically.

#### Examples
The following code example shows how `HijriCalendar.HijriAdjustment` affects the date.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/HijriAdjustment/hijriadjustment.cs._

## HijriCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by this calendar.

Returns: The latest date and time supported by the `HijriCalendar` type, which is equivalent to the last moment of December 31, 9999 C.E. in the Gregorian calendar.

#### Remarks
December 31, 9999 C.E. is equivalent to the 3rd day of the 4th month of the year 9666 in the Hijri calendar.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/MaxSupportedDateTime/hijricalendar_minmax.cs._

## HijriCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by this calendar.

Returns: The earliest date and time supported by the `HijriCalendar` type, which is equivalent to the first moment of July 18, 622 C.E. in the Gregorian calendar.

#### Remarks
Microsoft Visual Basic <example-value> time of day as the specified time on the minimum date  supported by the `DateTime` type, which is January 1, 0001 C.E. However, the `HijriCalendar` type does not support that minimum date. Consequently, if you call a method to format the time of day using the current calendar but you do not specify a format specifier, formatting uses the ISO 8601 sortable ("s") date/time pattern format specifier instead of the default general ("G") date/time pattern format specifier. For more information, see Standard Date and Time Format Strings.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/MaxSupportedDateTime/hijricalendar_minmax.cs._

## HijriCalendar.TwoDigitYearMax property

```csharp
public override int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `InvalidOperationException`: This calendar is read-only.
- `ArgumentOutOfRangeException`: The value in a set operation is less than 100 or greater than 9666.

#### Remarks
This property allows a 2-digit year to be properly translated to a 4-digit year. For example, if this property is set to 1429, the 100-year range is from 1330 to 1429. Therefore, a 2-digit value of 30 is interpreted as 1330, while a 2-digit value of 29 is interpreted as 1429.

The initial value of this property is derived from the settings in the regional and language options portion of Control Panel. However, that information can change during the life of the `AppDomain`. The `HijriCalendar` class does not detect changes in the system settings automatically.

The application should set this value to 99 to indicate that 2-digit years are to be taken literally. For example, if this property is set to 99, the 100-year range is from 0 (not a valid value for most calendars) to 99. Therefore, a 2-digit value of 30 is interpreted as 30.

## HijriCalendar.AddMonths(DateTime, Int32) method

```csharp
public override DateTime AddMonths (DateTime time, int months);
```

Returns a `DateTime` that is the specified number of months away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to add months to.
- `months`: The number of months to add.

Returns: The `DateTime` that results from adding the specified number of months to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime`.
- `ArgumentOutOfRangeException`: `months` is less than -120000.

-or-

`months` is greater than 120000.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, if the specified month is Zulkadah, which has 30 days, the specified day is the 30th day of that month, and the value of the `months` parameter is 3, the resulting year is one more than the specified year, the resulting month is Safar, and the resulting day is the 29th day, which is the last day in Safar.

If the value of the `months` parameter is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/AddMonths/hijricalendar_addget.cs._

## HijriCalendar.AddYears(DateTime, Int32) method

```csharp
public override DateTime AddYears (DateTime time, int years);
```

Returns a `DateTime` that is the specified number of years away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to add years to.
- `years`: The number of years to add.

Returns: The `DateTime` that results from adding the specified number of years to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The month part of the resulting `DateTime` remains the same as the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, Zulhijjah has 29 days, except during leap years when it has 30 days. If the specified date is the 30th day of Zulhijjah in a leap year and the value of `years` is 1, the resulting date will be the 29th day of Zulhijjah in the following year.

If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/AddMonths/hijricalendar_addget.cs._

## HijriCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Returns the day of the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 30 that represents the day of the month in the specified `DateTime`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/AddMonths/hijricalendar_addget.cs._

## HijriCalendar.GetDayOfWeek(DateTime) method

```csharp
public override DayOfWeek GetDayOfWeek (DateTime time);
```

Returns the day of the week in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A `DayOfWeek` value that represents the day of the week in the specified `DateTime`.

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
The following code example displays the values of several components of a `DateTime` in terms of the Hijri calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HijriCalendar/AddMonths/hijricalendar_addget.cs._
