---
title: "TaiwanCalendar class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/TaiwanCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaiwanCalendar class

Namespace: `System.Globalization`

```csharp
public class TaiwanCalendar : System.Globalization.Calendar
```

the Taiwan calendar.

#### Remarks
The Taiwan calendar works exactly like the Gregorian calendar, except that the year and era are different. The `TaiwanCalendar` class recognizes only the current era.

> **Note:**
> For information about using the `TaiwanCalendar` class and the other calendar classes in .NET, see Working with Calendars.

Leap years in the Taiwan calendar correspond to the same leap years in the Gregorian calendar. A leap year in the Gregorian calendar is defined as a Gregorian year that is evenly divisible by four, except if it is divisible by 100. However, Gregorian years that are divisible by 400 are leap years. A common year has 365 days and a leap year has 366 days.

The Taiwan calendar has 12 months with 28 to 31 days each:

|GetMonth value|Month|Days in common years|Days in leap years|
|--------------------|-----------|--------------------------|------------------------|
|1|1月 (January)|31|31|
|2|2月 (February)|28|29|
|3|3月 (March)|31|31|
|4|4月 (April)|30|30|
|5|5月 (May)|31|31|
|6|6月 (June)|30|30|
|7|7月 (July)|31|31|
|8|8月 (August)|31|31|
|9|9月 (September)|30|30|
|10|10月 (October)|31|31|
|11|11月 (November)|30|30|
|12|12月 (December)|31|31|

February has 29 days during leap years and 28 during common years.

The date January 1, 2001 C.E. in the Gregorian calendar is equivalent to the first day of January in the year 90 of the current era in the Taiwan calendar.

Each `CultureInfo` supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, the application should set the `Calendar` property of `CultureInfo.DateTimeFormat` to a new `Calendar`.

## TaiwanCalendar.TaiwanCalendar() constructor

```csharp
public TaiwanCalendar ();
```

Initializes a new instance of the `TaiwanCalendar` class.

Exceptions:

- `TypeInitializationException`: Unable to initialize a `TaiwanCalendar` object because of missing culture information.

To be added.

## TaiwanCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value that indicates whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: Always returns `CalendarAlgorithmType.SolarCalendar`.

#### Examples
The following example uses reflection to instantiate each `Calendar` type in .NET and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## TaiwanCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the list of eras in the `TaiwanCalendar`.

Returns: An array that consists of a single element for which the value is always the current era.

#### Remarks
The values in the array returned by this property are numbers that range from 1 to the largest era number. The largest era number is returned in the first array element and the smallest era number is returned in the last element.

## TaiwanCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by the `TaiwanCalendar` class.

Returns: The latest date and time supported by the `TaiwanCalendar` class, which is equivalent to the last moment of December 31, 9999 C.E. in the Gregorian calendar.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/MaxSupportedDateTime/taiwancalendar_minmax.cs._

## TaiwanCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by the `TaiwanCalendar` class.

Returns: The earliest date and time supported by the `TaiwanCalendar` class, which is equivalent to the first moment of January 1, 1912 C.E. in the Gregorian calendar.

#### Remarks
Microsoft Visual Basic <example-value> time of day as the specified time on the minimum date supported by `DateTime`, which is January 1, 0001 C.E. However, the `TaiwanCalendar` class does not support that minimum date. Consequently, if your application calls a method to format the time of day using the current calendar but does not specify a format specifier, formatting uses the ISO 8601 sortable ("s") date/time pattern format specifier instead of the default general ("G") date/time pattern format specifier. For more information, see Standard Date and Time Format Strings.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/MaxSupportedDateTime/taiwancalendar_minmax.cs._

## TaiwanCalendar.TwoDigitYearMax property

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
This property implements `Calendar.TwoDigitYearMax`.

Because the year in the Taiwan calendar is typically less than four digits long, this implementation returns 99 by default and does not affect the return value of `TaiwanCalendar.ToFourDigitYear`.

## TaiwanCalendar.AddMonths(DateTime, Int32) method

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
The following code example demonstrates the use of the `TaiwanCalendar.AddMonths` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/AddMonths/taiwancalendar_addget.cs._

## TaiwanCalendar.AddYears(DateTime, Int32) method

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
The following code example displays the use of the `TaiwanCalendar.AddYears` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/AddMonths/taiwancalendar_addget.cs._

## TaiwanCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Returns the day of the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 31 that represents the day of the month in the specified `DateTime`.

#### Examples
The following code example demonstrates the use of the `TaiwanCalendar.GetDayOfMonth` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/AddMonths/taiwancalendar_addget.cs._

## TaiwanCalendar.GetDayOfWeek(DateTime) method

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
|Sunday|星期日|
|Monday|星期一|
|Tuesday|星期二|
|Wednesday|星期三|
|Thursday|星期四|
|Friday|星期五|
|Saturday|星期六|

#### Examples
The following code example demonstrates the use of the `TaiwanCalendar.GetDayOfWeek` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/AddMonths/taiwancalendar_addget.cs._

## TaiwanCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Returns the day of the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 366 that represents the day of the year in the specified `DateTime`.

#### Remarks
The day of the year is defined as the number of days from the first day of the year. For example, `TaiwanCalendar.GetDayOfYear` for the first day of the first month returns 1, and `TaiwanCalendar.GetDayOfYear` for the last day of the last month returns the total number of days in that year. The total is the same as the value returned by `TaiwanCalendar.GetDaysInYear`.

#### Examples
The following code example demonstrates the use of the `TaiwanCalendar.GetDayOfYear` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/AddMonths/taiwancalendar_addget.cs._

## TaiwanCalendar.GetDaysInMonth(Int32, Int32, Int32) method

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

#### Remarks
For example, this method returns 28 or 29 for February (`month` = 2), depending on whether `year` is a leap year.

#### Examples
The following example calls `TaiwanCalendar.GetDaysInMonth` for the second month in each of five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/GetDaysInMonth/taiwancalendar_getdaysinmonth.cs._

## TaiwanCalendar.GetDaysInYear(Int32, Int32) method

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

#### Remarks
For example, this method returns 365 or 366, depending on whether `year` is a leap year.

#### Examples
The following example calls `TaiwanCalendar.GetDaysInYear` for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/GetDaysInYear/taiwancalendar_getdaysinyear.cs._

## TaiwanCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Returns the era in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era in the specified `DateTime`.

#### Remarks
The `TaiwanCalendar` class recognizes only the current era.

#### Examples
The following code example demonstrates the use of the `TaiwanCalendar.GetEra` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/TaiwanCalendar/AddMonths/taiwancalendar_addget.cs._
