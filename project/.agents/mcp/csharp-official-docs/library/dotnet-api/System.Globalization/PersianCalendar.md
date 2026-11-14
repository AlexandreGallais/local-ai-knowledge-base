---
title: "PersianCalendar class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/PersianCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PersianCalendar class

Namespace: `System.Globalization`

```csharp
public class PersianCalendar : System.Globalization.Calendar
```

Represents the Persian calendar.

The Persian calendar is used in most countries/regions where Persian is spoken, although some regions use different month names. The Persian calendar is the official calendar of Iran and Afghanistan, and it is one of the alternative calendars in regions such as Kazakhstan and Tajikistan.

> **Note:**
> For information about using the `PersianCalendar` class and the other calendar classes in .NET, see Working with Calendars.

The Persian calendar is a solar Hijri calendar, and starts from the year of the Hijra, which corresponds to 622 C.E., which is the year when Muhammad migrated from Mecca to Medina.

The Persian calendar is based on a solar year and is approximately 365 days long. A year cycles through four seasons, and a new year begins when the sun appears to cross the equator from the southern hemisphere to the northern hemisphere as viewed from the center of the Earth. The new year marks the first day of the month of Farvardeen, which is the first day of spring in the northern hemisphere. For example, the date March 21, 2002 C.E. corresponds to the first day of the month of Farvardeen in the year 1381 Anno Persico.

Each of the first six months in the Persian calendar has 31 days, each of the next five months has 30 days, and the last month has 29 days in a common year and 30 days in a leap year. A leap year is a year that, when divided by 33, has a remainder of 1, 5, 9, 13, 17, 22, 26, or 30. For example, the year 1370 is a leap year because dividing it by 33 yields a remainder of 17. There are approximately eight leap years in every 33-year cycle.

#### Hijri solar astronomical algorithm

The `PersianCalendar` class uses the Hijri solar astronomical algorithm rather than an observational algorithm to calculate dates. This makes the `PersianCalendar` implementation consistent with the Persian calendar in use in Iran and Afghanistan, the two countries in which the Persian calendar is in most widespread use.

#### Use the PersianCalendar class

You can use a `PersianCalendar` object to calculate dates in the Persian calendar or convert Persian dates to and from Gregorian dates. The Persian calendar is the default calendar for cultures such as Persian (Afghanistan) and Central Kurdish (Iran).

The following example instantiates `DateTime` objects by using the `Now` property, a `DateTime` constructor, and the Persian calendar's `ToDateTime` method. It then displays these dates in both the Gregorian and Persian calendars. It also displays the date range of the Persian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/calendar2.cs._

The following example demonstrates the field, property, and method members of the `PersianCalendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.PersianCalendar() constructor

```csharp
public PersianCalendar ();
```

Initializes a new instance of the `PersianCalendar` class.

#### Examples
The following code example demonstrates the use of the constructor for the `PersianCalendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value indicating whether the current calendar is solar-based, lunar-based, or lunisolar-based.

Returns: Always returns `CalendarAlgorithmType.SolarCalendar`.

#### Remarks
A date calculation for a particular calendar depends on whether the calendar is solar-based, lunar-based, or lunisolar-based.

#### Examples
The following example uses reflection to instantiate each `Calendar` type in .NET and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## PersianCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the list of eras in a `PersianCalendar` object.

Returns: An array of integers that represents the eras in a `PersianCalendar` object. The array consists of a single element having a value of `PersianCalendar.PersianEra`.

#### Examples
The following code example demonstrates the use of the `Eras` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by the `PersianCalendar` class.

Returns: The latest date and time supported by the `PersianCalendar` class.

#### Remarks
The value of the `MaxSupportedDateTime` property is the last moment of December 31, 9999 C.E. in the Gregorian calendar. This value is equivalent to the 13th day of the 10th month of the year 9378 in the Persian calendar.

#### Examples
The following code example demonstrates the use of the `MaxSupportedDateTime` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by the `PersianCalendar` class.

Returns: The earliest date and time supported by the `PersianCalendar` class.

#### Remarks

The value of the `MinSupportedDateTime` property is equivalent to the first moment of March 22, 622 C.E. in the Gregorian calendar.

622 C.E. is equivalent to the year 0001 in the Persian calendar.

#### Examples
The following code example demonstrates the use of the `MinSupportedDateTime` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.TwoDigitYearMax property

```csharp
public override int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `InvalidOperationException`: This calendar is read-only.
- `ArgumentOutOfRangeException`: The value in a set operation is less than 100 or greater than 9378.

#### Remarks
This property allows a 2-digit year to be properly translated to a 4-digit year. For example, if this property is set to 2029, the 100-year range is from 1930 to 2029. Therefore, a 2-digit value of 30 is interpreted as 1930, while a 2-digit value of 29 is interpreted as 2029.

The initial value of this property is derived from the settings in the regional and language options in Control Panel. However, that information can change during the life of the `AppDomain`. The `PersianCalendar` class does not detect changes in the system settings automatically. If the calendar is not supported in the regional and language options, the initial value of this property is the default value defined by the calendar class.

The application should set this value to 99 to indicate that 2-digit years are to be taken literally. For example, if this property is set to 99, the 100-year range is from 0 (not a valid value for most calendars) to 99. Therefore, a 2-digit value of 30 is interpreted as 30.

#### Examples
The following code example demonstrates the use of the `TwoDigitYearMax` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.AddMonths(DateTime, Int32) method

```csharp
public override DateTime AddMonths (DateTime time, int months);
```

Returns a `DateTime` object that is offset the specified number of months from the specified `DateTime` object.

Parameters:

- `time`: The `DateTime` to which to add months.
- `months`: The positive or negative number of months to add.

Returns: A `DateTime` object that represents the date yielded by adding the number of months specified by the `months` parameter to the date specified by the `time` parameter.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.
- `ArgumentOutOfRangeException`: `months` is less than -120,000 or greater than 120,000.

#### Remarks
The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the use of the `PersianCalendar.AddMonths` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.AddYears(DateTime, Int32) method

```csharp
public override DateTime AddYears (DateTime time, int years);
```

Returns a `DateTime` object that is offset the specified number of years from the specified `DateTime` object.

Parameters:

- `time`: The `DateTime` to which to add years.
- `years`: The positive or negative number of years to add.

Returns: The `DateTime` object that results from adding the specified number of years to the specified `DateTime` object.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.
- `ArgumentOutOfRangeException`: `years` is less than -10,000 or greater than 10,000.

#### Remarks
The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the use of the `PersianCalendar.AddYears` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Returns the day of the month in the specified `DateTime` object.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 through 31 that represents the day of the month in the specified `DateTime` object.

Exceptions:

- `ArgumentOutOfRangeException`: The `time` parameter represents a date less than `PersianCalendar.MinSupportedDateTime` or greater than `PersianCalendar.MaxSupportedDateTime`.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetDayOfMonth` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetDayOfWeek(DateTime) method

```csharp
public override DayOfWeek GetDayOfWeek (DateTime time);
```

Returns the day of the week in the specified `DateTime` object.

Parameters:

- `time`: The `DateTime` to read.

Returns: A `DayOfWeek` value that represents the day of the week in the specified `DateTime` object.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetDayOfWeek` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Returns the day of the year in the specified `DateTime` object.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 through 366 that represents the day of the year in the specified `DateTime` object.

Exceptions:

- `ArgumentOutOfRangeException`: The `time` parameter represents a date less than `PersianCalendar.MinSupportedDateTime` or greater than `PersianCalendar.MaxSupportedDateTime`.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetDayOfYear` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetDaysInMonth(Int32, Int32, Int32) method

```csharp
public override int GetDaysInMonth (int year, int month, int era);
```

Returns the number of days in the specified month of the specified year and era.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year.
- `month`: An integer that represents the month, and ranges from 1 through 12 if `year` is not 9378, or 1 through 10 if `year` is 9378.
- `era`: An integer from 0 through 1 that represents the era.

Returns: The number of days in the specified month of the specified year and era.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, or `era` is outside the range supported by this calendar.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetDaysInMonth` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetDaysInYear(Int32, Int32) method

```csharp
public override int GetDaysInYear (int year, int era);
```

Returns the number of days in the specified year of the specified era.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year.
- `era`: An integer from 0 through 1 that represents the era.

Returns: The number of days in the specified year and era. The number of days is 365 in a common year or 366 in a leap year.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

#### Examples
The following code example demonstrates use of the `PersianCalendar.GetDaysInYear` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Returns the era in the specified `DateTime` object.

Parameters:

- `time`: The `DateTime` to read.

Returns: Always returns `PersianCalendar.PersianEra`.

Exceptions:

- `ArgumentOutOfRangeException`: The `time` parameter represents a date less than `PersianCalendar.MinSupportedDateTime` or greater than `PersianCalendar.MaxSupportedDateTime`.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetEra` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._
