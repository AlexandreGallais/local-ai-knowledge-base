---
title: "HebrewCalendar class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/HebrewCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HebrewCalendar class

Namespace: `System.Globalization`

```csharp
public class HebrewCalendar : System.Globalization.Calendar
```

Represents the Hebrew calendar.

#### Remarks
The Hebrew calendar recognizes two eras: B.C.E. (before the common era) and A.M. (Latin "Anno Mundi", which means "the year of the world"). This implementation of the `HebrewCalendar` class recognizes only the current era (A.M.) and the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

> **Note:**
> For information about using the `HebrewCalendar` class and the other calendar classes in .NET, see Working with Calendars.

In every 19-year cycle that ends with a year that is evenly divisible by 19, the 3rd, 6th, 8th, 11th, 14th, 17th, and 19th years are leap years. A common year can have from 353 to 355 days, depending on the placement of Jewish holidays. A leap year can have from 383 to 385 days.

The Hebrew calendar has 12 months during common years and 13 months during leap years:

|GetMonth value (common year)|GetMonth value (leap year)|Month|Days in common years|Days in leap years|
|------------------------------------|----------------------------------|-----------|--------------------------|------------------------|
|1|1|תשרי (Tishrei)|30|30|
|2|2|חשון (Cheshvan)|29/30|29/30|
|3|3|כסלו (Kislev)|29/30|29/30|
|4|4|טבת (Tevet)|29|29|
|5|5|שבט (Shevat)|30|30|
|6|-|אדר (Adar)|29|-|
|-|6|אדר א (Adar Alef)|-|30|
|-|7|אדר ב (Adar Beit)|-|29|
|7|8|ניסן (Nissan)|30|30|
|8|9|אייר (Iyar)|29|29|
|9|10|סיון (Sivan)|30|30|
|10|11|תמוז (Tamuz)|29|29|
|11|12|אב (Av)|30|30|
|12|13|אלול (Elul)|29|29|

The days in Cheshvan and Kislev vary depending on the placement of Jewish holidays. During leap years, Adar is replaced by Adar Alef with 30 days and Adar Beit with 29 days. Adar Alef is considered the leap month. The last day of Adar Alef and all the days in Adar Beit are considered leap days; that is, the `HebrewCalendar.IsLeapDay` method returns `true` for these days.

The date January 1, 2001 A.D. in the Gregorian calendar is equivalent to the sixth day of Tevet in the year 5761 A.M. in the Hebrew calendar.

Each `CultureInfo` supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, the application should set the `Calendar` property of `CultureInfo.DateTimeFormat` to a new `Calendar`.

#### Examples
The following example creates a file that contains the date ranges supported by the `HebrewCalendar` class, and displays the number of days in each month of the year 5772.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/Overview/example1.cs._

The example instantiates a `HebrewCalendar` object and makes it the current calendar of a Hebrew (Israel) `CultureInfo` object. It then makes Hebrew (Israel) the current culture. This causes the common language runtime to interpret all dates and times in relation to the Hebrew calendar.

## HebrewCalendar.HebrewCalendar() constructor

```csharp
public HebrewCalendar ();
```

Initializes a new instance of the `HebrewCalendar` class.

To be added.

## HebrewCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value that indicates whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: Always returns `CalendarAlgorithmType.LunisolarCalendar`.

#### Examples
The following example uses reflection to instantiate each `Calendar` type in .NET and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## HebrewCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the list of eras in the `HebrewCalendar`.

Returns: An array of integers that represents the eras in the `HebrewCalendar` type. The return value is always an array containing one element equal to `HebrewCalendar.HebrewEra`.

#### Remarks
The Hebrew calendar recognizes two eras: B.C.E. (before the common era) and A.M. (Latin "Anno Mundi", which means "the year of the world"). This implementation of the `HebrewCalendar` class recognizes only the current era (A.M.). This property always returns an array with only one element.

## HebrewCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by the `HebrewCalendar` type.

Returns: The latest date and time supported by the `HebrewCalendar` type, which is equivalent to the last moment of September, 29, 2239 C.E. in the Gregorian calendar.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/MaxSupportedDateTime/hebrewcalendar_minmax.cs._

## HebrewCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by the `HebrewCalendar` type.

Returns: The earliest date and time supported by the `HebrewCalendar` type, which is equivalent to the first moment of January, 1, 1583 C.E. in the Gregorian calendar.

#### Remarks
Microsoft Visual Basic <example-value> time of day as the specified time on the minimum date supported by the `DateTime` type, which is January 1, 0001 C.E. However, the `HebrewCalendar` type does not support that minimum date. Consequently, if you call a method to format the time of day using the current calendar but you do not specify a format specifier, formatting uses the ISO 8601 sortable ("s") date/time pattern format specifier instead of the default general ("G") date/time pattern format specifier. For more information, see Standard Date and Time Format Strings.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/MaxSupportedDateTime/hebrewcalendar_minmax.cs._

## HebrewCalendar.TwoDigitYearMax property

```csharp
public override int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `InvalidOperationException`: The current `HebrewCalendar` object is read-only.
- `ArgumentOutOfRangeException`: In a set operation, the Hebrew calendar year value is less than 5343 but is not 99, or the year value is greater than 5999.

#### Remarks
The `TwoDigitYearMax` property allows a 2-digit year to be properly translated to a 4-digit year. For example, if this property is set to 5729, the 100-year range is from 5630 to 5729. Therefore, a 2-digit value of 30 is interpreted as 5630, while a 2-digit value of 29 is interpreted as 5729.

The initial value of this property is derived from the settings in the regional and language options portion of Control Panel. If the initial system setting changes during the life of your application the `HebrewCalendar` class does not automatically detect the change.

The special value 99 causes the `HebrewCalendar.ToFourDigitYear` method to ignore the system settings and return the specified year unchanged.

## HebrewCalendar.AddMonths(DateTime, Int32) method

```csharp
public override DateTime AddMonths (DateTime time, int months);
```

Returns a `DateTime` that is the specified number of months away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add `months`.
- `months`: The number of months to add.

Returns: The `DateTime` that results from adding the specified number of months to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.
- `ArgumentOutOfRangeException`: `months` is less than -120,000 or greater than 120,000.

#### Remarks
This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, if the specified month is Av, which has 30 days, the specified day is the 30th day of that month, and the value of the `months` parameter is 5, the resulting year is one more than the specified year, the resulting month is Tevet, and the resulting day is the 29th day, which is the last day in Tevet.

If the value of the `months` parameter is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hebrew calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/AddMonths/hebrewcalendar_addget.cs._

## HebrewCalendar.AddYears(DateTime, Int32) method

```csharp
public override DateTime AddYears (DateTime time, int years);
```

Returns a `DateTime` that is the specified number of years away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add `years`.
- `years`: The number of years to add.

Returns: The `DateTime` that results from adding the specified number of years to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.

#### Remarks
This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. For example, Cheshvan can have 29 or 30 days, depending on the placement of Jewish holidays. Suppose that Cheshvan has 30 days in the current year and 29 in the following year. If the specified date is the 30th day of Cheshvan in the current year and the value of `years` is 1, the resulting date will be the 29th day of Cheshvan in the following year.

The month part of the resulting `DateTime` is affected if the resulting month is not a valid month in the resulting year. It is changed to the last valid month in the resulting year. For example, if the month in the `time` parameter is the 13th month of a leap year and the value of `years` is 1, the month in the resulting `DateTime` is the 12th month of the following year, which is a non-leap year. Note that even when the month part does not change, it might still refer to a different month. For example, Adar Beit is the 7th month in leap years, but Nissan is the 7th month in common years.

This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`.

The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hebrew calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/AddMonths/hebrewcalendar_addget.cs._

## HebrewCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Returns the day of the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 30 that represents the day of the month in the specified `DateTime`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hebrew calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/AddMonths/hebrewcalendar_addget.cs._

## HebrewCalendar.GetDayOfWeek(DateTime) method

```csharp
public override DayOfWeek GetDayOfWeek (DateTime time);
```

Returns the day of the week in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A `DayOfWeek` value that represents the day of the week in the specified `DateTime`.

#### Remarks
The `DayOfWeek` values are as follows:

|DayOfWeek value|Day of Week|
|---------------------|-----------------|
|Sunday|יום ראשון (Yom Rishon)|
|Monday|יום שני (Yom Sheni)|
|Tuesday|יום שלישי (Yom Shlishi)|
|Wednesday|יום רביעי (Yom Reviee)|
|Thursday|יום חמישי (Yom Chamishi)|
|Friday|יום שישי (Yom Shishi)|
|Saturday|שבת (Shabat)|

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hebrew calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/AddMonths/hebrewcalendar_addget.cs._
