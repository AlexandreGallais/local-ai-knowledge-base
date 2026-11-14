---
title: "Calendar class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/Calendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Calendar class (part 2 of 4)

## Calendar.AddMonths(DateTime, Int32) method

```csharp
public abstract DateTime AddMonths (DateTime time, int months);
```

When overridden in a derived class, returns a `DateTime` that is the specified number of months away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add months.
- `months`: The number of months to add.

Returns: The `DateTime` that results from adding the specified number of months to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range of this calendar.
- `ArgumentOutOfRangeException`: `months` is outside the supported range of the `DateTime` return value.

#### Remarks
The `months` value is added to the specified `DateTime`. If `months` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, suppose that the current calendar has 12 months, where the fourth month has 30 days and the tenth month has 31 days. If the specified month is the tenth month, the specified day is the 31st day of that month, and the value of the `months` parameter is 6, the resulting year is one more than the specified year, the resulting month is the fourth month, and the resulting day is the 30th day, which is the last day of the resulting month.

If the value of the `months` parameter is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.AddSeconds(DateTime, Int32) method

```csharp
public virtual DateTime AddSeconds (DateTime time, int seconds);
```

Returns a `DateTime` that is the specified number of seconds away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add seconds.
- `seconds`: The number of seconds to add.

Returns: The `DateTime` that results from adding the specified number of seconds to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range of this calendar.
- `ArgumentOutOfRangeException`: `seconds` is outside the supported range of the `DateTime` return value.

#### Remarks
The `seconds` value is added to the specified `DateTime`. If `seconds` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The day part of the resulting `DateTime` is affected if the resulting time is outside the day of the specified `DateTime`. The month part of the resulting `DateTime` is affected if the resulting day is outside the month of the specified `DateTime`. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.AddWeeks(DateTime, Int32) method

```csharp
public virtual DateTime AddWeeks (DateTime time, int weeks);
```

Returns a `DateTime` that is the specified number of weeks away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add weeks.
- `weeks`: The number of weeks to add.

Returns: The `DateTime` that results from adding the specified number of weeks to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range of this calendar.
- `ArgumentOutOfRangeException`: `weeks` is outside the supported range of the `DateTime` return value.

#### Remarks
The `weeks` value is added to the specified `DateTime`. If `weeks` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The month part of the resulting `DateTime` is affected if the resulting day is outside the month of the specified `DateTime`. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

In all .NET classes derived from the `Calendar` class, a week is defined as seven days.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.AddYears(DateTime, Int32) method

```csharp
public abstract DateTime AddYears (DateTime time, int years);
```

When overridden in a derived class, returns a `DateTime` that is the specified number of years away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add years.
- `years`: The number of years to add.

Returns: The `DateTime` that results from adding the specified number of years to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range of this calendar.
- `ArgumentOutOfRangeException`: `years` is outside the supported range of the `DateTime` return value.

#### Remarks
The `years` value is added to the specified `DateTime`. If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The month part of the resulting `DateTime` is affected if the resulting month is not a valid month in the resulting year. It is changed to the last valid month in the resulting year. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, in the Gregorian calendar, February has 28 days, except during a leap year when it has 29 days. If the specified date is the 29th day of February in a leap year and the value of `years` is 1, the resulting date is the 28th day of February in the following year.

If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.Clone() method

```csharp
public virtual object Clone ();
```

Creates a new object that is a copy of the current `Calendar` object.

Returns: A new instance of `Object` that is the memberwise clone of the current `Calendar` object.

#### Remarks
The new memberwise clone is not read-only.

## Calendar.GetDayOfMonth(DateTime) method

```csharp
public abstract int GetDayOfMonth (DateTime time);
```

When overridden in a derived class, returns the day of the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A positive integer that represents the day of the month in the `time` parameter.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.GetDayOfWeek(DateTime) method

```csharp
public abstract DayOfWeek GetDayOfWeek (DateTime time);
```

When overridden in a derived class, returns the day of the week in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A `DayOfWeek` value that represents the day of the week in the `time` parameter.

#### Remarks
The `DayOfWeek` values are Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.GetDayOfYear(DateTime) method

```csharp
public abstract int GetDayOfYear (DateTime time);
```

When overridden in a derived class, returns the day of the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: A positive integer that represents the day of the year in the `time` parameter.

#### Remarks
The day of the year is defined as the number of days from the first day of the year. For example, in `GregorianCalendar`, `Calendar.GetDayOfYear` for January 1 returns 1, and `Calendar.GetDayOfYear` for December 31 returns 365 in a common year or 366 in a leap year.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.GetDaysInMonth(Int32, Int32) method

```csharp
public virtual int GetDaysInMonth (int year, int month);
```

Returns the number of days in the specified month and year of the current era.

Parameters:

- `year`: An integer that represents the year.
- `month`: A positive integer that represents the month.

Returns: The number of days in the specified month in the specified year in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

#### Remarks
For example, in `GregorianCalendar`, `Calendar.GetDaysInMonth` for February returns 28 in a common year or 29 in a leap year.

#### Examples
The following code example compares different implementations of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetDaysInMonth/calendar_compare.cs._

## Calendar.GetDaysInMonth(Int32, Int32, Int32) method

```csharp
public abstract int GetDaysInMonth (int year, int month, int era);
```

When overridden in a derived class, returns the number of days in the specified month, year, and era.

Parameters:

- `year`: An integer that represents the year.
- `month`: A positive integer that represents the month.
- `era`: An integer that represents the era.

Returns: The number of days in the specified month in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Remarks
For example, in `GregorianCalendar`, `Calendar.GetDaysInMonth` for February returns 28 in a common year or 29 in a leap year.

## Calendar.GetDaysInYear(Int32) method

```csharp
public virtual int GetDaysInYear (int year);
```

Returns the number of days in the specified year of the current era.

Parameters:

- `year`: An integer that represents the year.

Returns: The number of days in the specified year in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

#### Remarks
For example, in `GregorianCalendar`, `Calendar.GetDaysInYear` returns 365 for a common year or 366 for a leap year.

#### Examples
The following code example compares different implementations of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetDaysInMonth/calendar_compare.cs._

## Calendar.GetDaysInYear(Int32, Int32) method

```csharp
public abstract int GetDaysInYear (int year, int era);
```

When overridden in a derived class, returns the number of days in the specified year and era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of days in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Remarks
For example, in `GregorianCalendar`, `Calendar.GetDaysInYear` returns 365 for a common year or 366 for a leap year.

## Calendar.GetEra(DateTime) method

```csharp
public abstract int GetEra (DateTime time);
```

When overridden in a derived class, returns the era of the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era of `time`.

#### Remarks

Only the `JapaneseCalendar` and the `JapaneseLunisolarCalendar` classes support multiple eras.

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._
