---
title: "JapaneseCalendar class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/JapaneseCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JapaneseCalendar class

Namespace: `System.Globalization`

```csharp
public class JapaneseCalendar : System.Globalization.Calendar
```

Represents the Japanese calendar.

The Japanese calendar, which is also known as the Wareki calendar, works exactly like the Gregorian calendar, except that the year and era are different.

> **Note:**
> For information about using the `JapaneseCalendar` class and the other calendar classes in .NET, see Working with Calendars.

The Japanese calendar recognizes one era for every emperor's reign. The two most recent eras are the Heisei era, beginning in the Gregorian calendar year 1989, and the Reiwa era, beginning in the Gregorian calendar year 2019. The era name is typically displayed before the year. For example, the Gregorian calendar year 2001 is the Japanese calendar year Heisei 13. Note that the first year of an era is called "Gannen." Therefore, the Gregorian calendar year 1989 was the Japanese calendar year Heisei Gannen. By default, formatting operations with specified date and time format strings, such as "D", "F", and "Y", output Gannen rather than "1" in the result string.

This class assigns numbers to the eras as follows:

| GetEra value | Era Name      | Era Abbreviation | Gregorian Dates                      |
| ------------ | ------------- | ---------------- | ------------------------------------ |
| 5            | 令和 (Reiwa)  | 令和 (R, r)      | May 1, 2019 to present               |
| 4            | 平成 (Heisei) | 平 (H, h)        | January 8, 1989 to April 30, 2019    |
| 3            | 昭和 (Showa)  | 昭 (S, s)        | December 25, 1926 to January 7, 1989 |
| 2            | 大正 (Taisho) | 大 (T, t)        | July 30, 1912 to December 24, 1926   |
| 1            | 明治 (Meiji)  | 明 (M, m)        | October 23, 1868 to July 29, 1912    |

This class handles dates from October 23 in the year Meiji 1 (in the Gregorian calendar, October 23, 1868). Although the Japanese calendar was switched from a lunar calendar to a solar calendar in the year Meiji 6 (1873 of the Gregorian calendar), this implementation is based on the solar calendar only.

Leap years in the Japanese calendar correspond to the same leap years in the Gregorian calendar. A leap year in the Gregorian calendar is defined as a Gregorian year that is evenly divisible by four, except if it is divisible by 100. However, Gregorian years that are divisible by 400 are leap years. A common year has 365 days and a leap year has 366 days.

The Japanese calendar has 12 months with 28 to 31 days each:

| GetMonth value | Month               | English   | Days in common years | Days in leap years |
| -------------- | ------------------- | --------- | -------------------- | ------------------ |
| 1              | 1月 (Ichigatsu)     | January   | 31                   | 31                 |
| 2              | 2月 (Nigatsu)       | February  | 28                   | 29                 |
| 3              | 3月 (Sangatsu)      | March     | 31                   | 31                 |
| 4              | 4月 (Shigatsu)      | April     | 30                   | 30                 |
| 5              | 5月 (Gogatsu)       | May       | 31                   | 31                 |
| 6              | 6月 (Rokugatsu)     | June      | 30                   | 30                 |
| 7              | 7月 (Shichigatsu)   | July      | 31                   | 31                 |
| 8              | 8月 (Hachigatsu)    | August    | 31                   | 31                 |
| 9              | 9月 (Kugatsu)       | September | 30                   | 30                 |
| 10             | 10月 (Juugatsu)     | October   | 31                   | 31                 |
| 11             | 11月 (Juuichigatsu) | November  | 30                   | 30                 |
| 12             | 12月 (Juunigatsu)   | December  | 31                   | 31                 |

Nigatsu, which is equivalent to the Gregorian calendar month of February, has 29 days during leap years and 28 during common years.

The date January 1, 2001 A.D. in the Gregorian calendar is equivalent to the first day of Ichigatsu in the year Heisei 13 in the Japanese calendar.

If the `JapaneseCalendar` is the current calendar of the Japanese culture, `DateTime.Parse` recognizes the era abbreviations in front of the year. The abbreviation is either the single-character case-insensitive Latin alphabet abbreviation or the single-character Kanji abbreviation. `DateTime.Parse` also recognizes either "1" or Gannen (元年) as the first year of an era.

Each `CultureInfo` object supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, set the `Calendar` property to a new `Calendar`.

## JapaneseCalendar.JapaneseCalendar() constructor

```csharp
public JapaneseCalendar ();
```

Initializes a new instance of the `JapaneseCalendar` class.

Exceptions:

- `TypeInitializationException`: Unable to initialize a `JapaneseCalendar` object because of missing culture information.

To be added.

## JapaneseCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value that indicates whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: Always returns `CalendarAlgorithmType.SolarCalendar`.

#### Examples

The following example uses reflection to instantiate each `Calendar` type found in the .NET Class Library and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## JapaneseCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the list of eras in the `JapaneseCalendar`.

Returns: An array of integers that represents the eras in the `JapaneseCalendar`.

The Japanese calendar recognizes one era for every emperor's reign. The two most recent eras are the Heisei era, beginning in the Gregorian calendar year 1989, and the Reiwa era, beginning in the Gregorian calendar year 2019. The era name is typically displayed before the year. For example, the Gregorian calendar year 2001 is the Japanese calendar year Heisei 13. Note that the first year of an era is called "Gannen." Therefore, the Gregorian calendar year 1989 was the Japanese calendar year Heisei Gannen.

This class assigns numbers to the eras as follows:

| GetEra value | Era Name      | Era Abbreviation | Gregorian Dates                      |
| ------------ | ------------- | ---------------- | ------------------------------------ |
| 5            | 令和 (Reiwa)  | 令和 (R, r)      | May 1, 2019 to present               |
| 4            | 平成 (Heisei) | 平 (H, h)        | January 8, 1989 to present           |
| 3            | 昭和 (Showa)  | 昭 (S, s)        | December 25, 1926 to January 7, 1989 |
| 2            | 大正 (Taisho) | 大 (T, t)        | July 30, 1912 to December 24, 1926   |
| 1            | 明治 (Meiji)  | 明 (M, m)        | October 23, 1868 to July 29, 1912    |

This class handles dates from October 23 in the year Meiji 1 (January 1, 1868 of the Gregorian calendar). Although the Japanese calendar was switched from a lunar calendar to a solar calendar in the year Meiji 6 (1873 of the Gregorian calendar), this implementation is based on the solar calendar only.

> **Note:**
> If additional eras are added in the future, applications might encounter more than the expected five eras for the Japanese calendar. Test your applications to ensure that they continue to work in such an event. For more information, see Era Handling for the Japanese Calendar.

#### Examples

The following example displays the values contained in the `Eras` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Eras/yslin_japanesecalendar_eras.cs._

## JapaneseCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by the current `JapaneseCalendar` object.

Returns: The latest date and time supported by the `JapaneseCalendar` type, which is equivalent to the last moment of December 31, 9999 C.E. in the Gregorian calendar.

#### Examples

The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/MaxSupportedDateTime/japanesecalendar_minmax.cs._

## JapaneseCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by the current `JapaneseCalendar` object.

Returns: The earliest date and time supported by the `JapaneseCalendar` type, which is equivalent to the first moment of October 23, 1868 C.E. in the Gregorian calendar (or in .NET 10 and earlier versions, September 8, 1868 C.E.).

The earliest date supported by the `JapaneseCalendar` class is October 23, 1868 C.E., in the first year of the Meiji era. Ordinarily, date and time operations that use the `JapaneseCalendar` class throw an `ArgumentOutOfRangeException` exception for dates before this date. However, some members, such as the `JapaneseCalendar.GetEra` method, support dates from January 1, 1868 through October 22 in the year Meiji 1.

> **Note:**
> In .NET 10 and earlier versions, this property returns a date and time representing the first moment of September 8, 1868 C.E. in the Gregorian calendar.

#### Examples

The following example gets the earliest and latest dates supported by the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/MaxSupportedDateTime/japanesecalendar_minmax.cs._

## JapaneseCalendar.TwoDigitYearMax property

```csharp
public override int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified in a set operation is less than 99.

-or-

The value specified in a set operation is greater than 8011 (or `MaxSupportedDateTime.Year`).
- `InvalidOperationException`: In a set operation, the current instance is read-only.

This property implements `Calendar.TwoDigitYearMax`.

Because the year in the Japanese calendar is typically less than four digits long, this implementation returns 99 by default and does not affect the return value of `JapaneseCalendar.ToFourDigitYear`.

## JapaneseCalendar.AddMonths(DateTime, Int32) method

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

The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, if the specified month is Juugatsu (October), which has 31 days, the specified day is the 31st day of that month, and `months` is 6, the resulting year is one more than the specified year, the resulting month is Shigatsu (April), and the resulting day is the 30th day, which is the last day in Shigatsu (April).

If `months` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples

The following code example displays the values of several components of a `DateTime` in terms of the Japanese calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/AddMonths/japanesecalendar_addget.cs._
