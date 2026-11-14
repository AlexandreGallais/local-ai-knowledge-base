---
title: "CalendarAlgorithmType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CalendarAlgorithmType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CalendarAlgorithmType enum

Namespace: `System.Globalization`

```csharp
public enum CalendarAlgorithmType
```

Specifies whether a calendar is solar-based, lunar-based, or lunisolar-based.

#### Remarks
A date calculation for a particular calendar depends on whether the calendar is solar-based, lunar-based, or lunisolar-based. For example, the `GregorianCalendar`, `JapaneseCalendar`, and `JulianCalendar` classes are solar-based, the `HijriCalendar` and `UmAlQuraCalendar` classes are lunar-based,.and the `HebrewCalendar` and `JapaneseLunisolarCalendar` classes are lunisolar-based, thus using solar calculations for the year and lunar calculations for the month and day.

A `CalendarAlgorithmType` value, which is returned by a calendar member such as the `AlgorithmType` property, specifies the foundation for a particular calendar.

#### Examples
The following code example demonstrates the `AlgorithmType` property and the `CalendarAlgorithmType` enumeration.

_Code sample not included: ~/snippets/csharp/System.Globalization/CalendarAlgorithmType/Overview/caltype.cs._

## CalendarAlgorithmType.LunarCalendar field

```csharp
LunarCalendar
```

A lunar-based calendar.

## CalendarAlgorithmType.LunisolarCalendar field

```csharp
LunisolarCalendar
```

A lunisolar-based calendar.

## CalendarAlgorithmType.SolarCalendar field

```csharp
SolarCalendar
```

A solar-based calendar.

## CalendarAlgorithmType.Unknown field

```csharp
Unknown
```

An unknown calendar basis.
