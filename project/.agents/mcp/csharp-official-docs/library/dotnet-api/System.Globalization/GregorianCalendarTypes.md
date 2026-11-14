---
title: "GregorianCalendarTypes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/GregorianCalendarTypes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GregorianCalendarTypes enum

Namespace: `System.Globalization`

```csharp
public enum GregorianCalendarTypes
```

Defines the different language versions of the Gregorian calendar.

#### Remarks
The date and time patterns associated with the `GregorianCalendar` vary depending on the language. If the `GregorianCalendar` is selected in `DateTimeFormatInfo.Calendar`, `GregorianCalendarTypes` can be used to specify which date and time patterns to use in that `DateTimeFormatInfo`.

For Arabic cultures, more language versions of the Gregorian calendar are available. For example, you can use the French version of `GregorianCalendar` using the `MiddleEastFrench` value.

A culture that supports `GregorianCalendarTypes` might not support all language versions of `GregorianCalendar`. The `CultureInfo.Calendar` and `CultureInfo.OptionalCalendars` properties specify the calendars supported by that culture. If `GregorianCalendar` is supported, `GregorianCalendar.CalendarType` can be used to determine which language versions of `GregorianCalendar` are supported.

#### Examples
The following code example demonstrates how to determine the GregorianCalendar language version supported by the culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/OptionalCalendars/gregoriancalendartypes.cs._

The following code example prints a `DateTime` using a `GregorianCalendar` that is localized.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/.ctor/gregorianlocalized.cs._

## GregorianCalendarTypes.Arabic field

```csharp
Arabic
```

Refers to the Arabic version of the Gregorian calendar.

## GregorianCalendarTypes.Localized field

```csharp
Localized
```

Refers to the localized version of the Gregorian calendar, based on the language of the `CultureInfo` that uses the `DateTimeFormatInfo`.

## GregorianCalendarTypes.MiddleEastFrench field

```csharp
MiddleEastFrench
```

Refers to the Middle East French version of the Gregorian calendar.

## GregorianCalendarTypes.TransliteratedEnglish field

```csharp
TransliteratedEnglish
```

Refers to the transliterated English version of the Gregorian calendar.

## GregorianCalendarTypes.TransliteratedFrench field

```csharp
TransliteratedFrench
```

Refers to the transliterated French version of the Gregorian calendar.

## GregorianCalendarTypes.USEnglish field

```csharp
USEnglish
```

Refers to the U.S. English version of the Gregorian calendar.
