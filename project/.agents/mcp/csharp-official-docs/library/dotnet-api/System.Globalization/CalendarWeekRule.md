---
title: "CalendarWeekRule enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CalendarWeekRule.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CalendarWeekRule enum

Namespace: `System.Globalization`

```csharp
public enum CalendarWeekRule
```

Defines different rules for determining the first week of the year.

#### Remarks
A member of the `CalendarWeekRule` enumeration is returned by the `CalendarWeekRule` property and is used by the culture's current calendar to determine the calendar week rule. The enumeration value is also used as a parameter to the `Calendar.GetWeekOfYear` method.

Calendar week rules depend on the `DayOfWeek` value that indicates the first day of the week in addition to depending on a `CalendarWeekRule` value. The `FirstDayOfWeek` property provides the default value for a culture, but any `DayOfWeek` value can be specified as the first day of the week in the `Calendar.GetWeekOfYear` method.

The first week based on the `FirstDay` value can have one to seven days. The first week based on the `FirstFullWeek` value always has seven days. The first week based on the `FirstFourDayWeek` value can have four to seven days.

For example, in the Gregorian calendar, suppose that the first day of the year (January 1) falls on a Tuesday and the designated first day of the week is Sunday. Selecting `FirstFullWeek` defines the first Sunday (January 6) as the beginning of the first week of the year. The first five days of the year are considered part of the last week of the previous year. In contrast, selecting `FirstFourDayWeek` defines the first day of the year (January 1) as the beginning of the first week of the year because there are more than four days from January 1 to the day before the following Sunday.

|Date|FirstDay|FirstFullWeek|FirstFourDayWeek|
|----------|--------------|-------------------|----------------------|
|Dec 31 Mon|Last week of the previous year|Last week of the previous year|Last week of the previous year|
|Jan 1 Tue|Week 1|Last week of the previous year|Week 1|
|Jan 2 Wed|Week 1|Last week of the previous year|Week 1|
|Jan 3 Thu|Week 1|Last week of the previous year|Week 1|
|Jan 4 Fri|Week 1|Last week of the previous year|Week 1|
|Jan 5 Sat|Week 1|Last week of the previous year|Week 1|
|Jan 6 Sun|Week 2|Week 1|Week 2|
|Jan 7 Mon|Week 2|Week 1|Week 2|
|Jan 8 Tue|Week 2|Week 1|Week 2|
|Jan 9 Wed|Week 2|Week 1|Week 2|
|Jan 10 Thu|Week 2|Week 1|Week 2|
|Jan 11 Fri|Week 2|Week 1|Week 2|
|Jan 12 Sat|Week 2|Week 1|Week 2|

Suppose the first day of the year (January 1) falls on a Friday and the designated first day of the week is Sunday. Selecting `FirstFourDayWeek` defines the first Sunday (January 3) as the beginning of the first week of the year because there are fewer than four days from January 1 to the day before the following Sunday.

|Date|FirstDay|FirstFullWeek|FirstFourDayWeek|
|----------|--------------|-------------------|----------------------|
|Dec 31 Thu|Last week of the previous year|Last week of the previous year|Last week of the previous year|
|Jan 1 Fri|Week 1|Last week of the previous year|Last week of the previous year|
|Jan 2 Sat|Week 1|Last week of the previous year|Last week of the previous year|
|Jan 3 Sun|Week 2|Week 1|Week 1|
|Jan 4 Mon|Week 2|Week 1|Week 1|
|Jan 5 Tue|Week 2|Week 1|Week 1|
|Jan 6 Wed|Week 2|Week 1|Week 1|
|Jan 7 Thu|Week 2|Week 1|Week 1|
|Jan 8 Fri|Week 2|Week 1|Week 1|
|Jan 9 Sat|Week 2|Week 1|Week 1|

The following example illustrates how the `CalendarWeekRule` and `DayOfWeek` values are used together to determine how weeks are assigned. In the Gregorian calendar, the first day of the year (January 1) in 2013 falls on a Tuesday. If the designated first day of the week is Sunday, the first Sunday (January 6) is the first day of the first week of the year, and Saturday (January 5) belongs to the fifty-third week of the previous year. Changing the calendar week rule to `FirstFourDayWeek` defines Tuesday (January 1) as the beginning of the first week of the year, because there are more than four days between Tuesday, January 1, and Sunday, January 6. Using this rule, January 5 belongs to the first week of the year. For 2010, a year in which January 1 falls on a Friday, applying the `FirstFourDayWeek` rule with `Sunday` as the first day of the week makes Sunday, January 3 the beginning of the first week of the year, because the first week in 2010 that has more than four days is January 3 through 9.

_Code sample not included: ~/snippets/csharp/System.Globalization/CalendarWeekRule/Overview/calendarweekruleex.cs._

> **Note:**
>  This does not map exactly to ISO 8601. The differences are discussed in the blog entry ISO 8601 Week of Year format in Microsoft .NET. `ISOWeek.GetYear` and `ISOWeek.GetWeekOfYear` solve this problem.

Each `CultureInfo` object supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, set the `Calendar` property of `CultureInfo.DateTimeFormat` to a new `Calendar`.

## CalendarWeekRule.FirstDay field

```csharp
FirstDay
```

Indicates that the first week of the year starts on the first day of the year and ends before the following designated first day of the week. The value is 0.

## CalendarWeekRule.FirstFourDayWeek field

```csharp
FirstFourDayWeek
```

Indicates that the first week of the year is the first week with four or more days before the designated first day of the week. The value is 2.

## CalendarWeekRule.FirstFullWeek field

```csharp
FirstFullWeek
```

Indicates that the first week of the year begins on the first occurrence of the designated first day of the week on or after the first day of the year. The value is 1.
