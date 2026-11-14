---
title: "ISOWeek class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/ISOWeek.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISOWeek class

Namespace: `System.Globalization`

```csharp
public static class ISOWeek
```

Provides static members to support the ISO week date that is part of the ISO 8601 date and time standard issued by the International Organization for Standardization (ISO).

To be added.

## ISOWeek.GetWeekOfYear(DateOnly) method

```csharp
public static int GetWeekOfYear (DateOnly date);
```

Calculates the ISO week number of a given Gregorian date.

Parameters:

- `date`: A date in the Gregorian calendar.

Returns: A number between 1 and 53 representing the ISO week number of the given Gregorian date.

To be added.

## ISOWeek.GetWeekOfYear(DateTime) method

```csharp
public static int GetWeekOfYear (DateTime date);
```

Calculates the ISO week number of a given Gregorian date.

Parameters:

- `date`: A date in the Gregorian calendar.

Returns: A number between 1 and 53 representing the ISO week number of the given Gregorian date.

#### Remarks
The returned ISO week number can belong to an ISO year that is different from the input Gregorian year. For example, the Gregorian date 2005-01-01 will have ISO week number 53 but ISO year 2004.

To get the ISO week-numbering year (also called the ISO year informally), call `GetYear`

## ISOWeek.GetWeeksInYear(Int32) method

```csharp
public static int GetWeeksInYear (int year);
```

calculates the number of weeks in a given ISO week-numbering year.

Parameters:

- `year`: An ISO week-numbering year (also called an ISO year informally).

Returns: The number of ISO weeks in the year. Returns either 52 or 53.

To be added.

## ISOWeek.GetYear(DateOnly) method

```csharp
public static int GetYear (DateOnly date);
```

Calculates the ISO week-numbering year (also called ISO year informally) mapped to the input Gregorian date.

Parameters:

- `date`: A date in the Gregorian calendar.

Returns: The ISO week-numbering year, between 1 and 9999

To be added.

## ISOWeek.GetYear(DateTime) method

```csharp
public static int GetYear (DateTime date);
```

Calculates the ISO week-numbering year (also called ISO year informally) mapped to the input Gregorian date.

Parameters:

- `date`: A date in the Gregorian calendar.

Returns: The ISO week-numbering year, between 1 and 9999

#### Remarks
The ISO week-numbering year number mapping to Gregorian date can be different than the year of the given Gregorian. or example, the Gregorian date 2005-01-01 maps to the ISO week-numbering year 2004.

## ISOWeek.GetYearEnd(Int32) method

```csharp
public static DateTime GetYearEnd (int year);
```

Calculates the Gregorian date at which the week-numbering year will end.

Parameters:

- `year`: An ISO week-numbering year (also called an ISO year informally).

Returns: The Gregorian date at which the week-numbering year will end.

To be added.

## ISOWeek.GetYearStart(Int32) method

```csharp
public static DateTime GetYearStart (int year);
```

Calculates the Gregorian date at which the week-numbering year will start.

Parameters:

- `year`: An ISO week-numbering year (also called an ISO year informally).

Returns: The Gregorian date at which the week-numbering year will start.

To be added.

## ISOWeek.ToDateOnly(Int32, Int32, DayOfWeek) method

```csharp
public static DateOnly ToDateOnly (int year, int week, DayOfWeek dayOfWeek);
```

Maps the ISO week date represented by a specified ISO year, week number, and day of week to the equivalent Gregorian date.

Parameters:

- `year`: An ISO week-numbering year (also called an ISO year informally).
- `week`: The ISO week number in the given ISO week-numbering year.
- `dayOfWeek`: The day of week inside the given ISO week.

Returns: The Gregorian date equivalent to the input ISO week date.

To be added.

## ISOWeek.ToDateTime(Int32, Int32, DayOfWeek) method

```csharp
public static DateTime ToDateTime (int year, int week, DayOfWeek dayOfWeek);
```

Maps the ISO week date represented by a specified ISO year, week number, and day of week to the equivalent Gregorian date.

Parameters:

- `year`: An ISO week-numbering year (also called an ISO year informally).
- `week`: The ISO week number in the given ISO week-numbering year.
- `dayOfWeek`: The day of week inside the given ISO week.

Returns: The Gregorian date equivalent to the input ISO week date.

To be added.
