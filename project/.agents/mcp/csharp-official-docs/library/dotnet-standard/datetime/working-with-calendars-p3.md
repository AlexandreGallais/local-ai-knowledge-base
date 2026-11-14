---
title: "Working with calendars (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/working-with-calendars.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Working with calendars (part 3 of 4)

## Work with eras

Calendars typically divide dates into eras. However, the `System.Globalization.Calendar` classes in .NET do not support every era defined by a calendar, and most of the `System.Globalization.Calendar` classes support only a single era. Only the `System.Globalization.JapaneseCalendar` and `System.Globalization.JapaneseLunisolarCalendar` classes support multiple eras.

> **Important:**
> The Reiwa era, a new era in the `System.Globalization.JapaneseCalendar` and `System.Globalization.JapaneseLunisolarCalendar`, begins on May 1, 2019. This change affects all applications that use these calendars. See the following articles for more information:
>
> - Handling a new era in the Japanese calendar in .NET, which documents features added to .NET to support calendars with multiple eras and discusses best practices to use when handling multi-era calendars.
> - Prepare your application for the Japanese era change, which provides information on testing your applications on Windows to ensure their readiness for the era change.
> - Summary of new Japanese Era updates for .NET Framework, which lists .NET Framework updates for individual Windows versions that are related to the new Japanese calendar era, notes new .NET Framework features for multi-era support, and includes things to look for in testing your applications.

An era in most calendars denotes an extremely long time period. In the Gregorian calendar, for example, the current era spans more than two millennia. For the `System.Globalization.JapaneseCalendar` and the `System.Globalization.JapaneseLunisolarCalendar`, the two calendars that support multiple eras, this is not the case. An era corresponds to the period of an emperor's reign. Support for multiple eras, particularly when the upper limit of the current era is unknown, poses special challenges.

### Eras and era names

In .NET, integers that represent the eras supported by a particular calendar implementation are stored in reverse order in the `System.Globalization.Calendar.Eras*` array. The current era (which is the era with the latest time range) is at index zero, and for `System.Globalization.Calendar` classes that support multiple eras, each successive index reflects the previous era. The static `System.Globalization.Calendar.CurrentEra` property defines the index of the current era in the `System.Globalization.Calendar.Eras*` array; it is a constant whose value is always zero. Individual `System.Globalization.Calendar` classes also include static fields that return the value of the current era. They are listed in the following table.

| Calendar class                                        | Current era field                                                 |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| `System.Globalization.ChineseLunisolarCalendar`  | `System.Globalization.ChineseLunisolarCalendar.ChineseEra`   |
| `System.Globalization.GregorianCalendar`         | `System.Globalization.GregorianCalendar.ADEra`               |
| `System.Globalization.HebrewCalendar`            | `System.Globalization.HebrewCalendar.HebrewEra`              |
| `System.Globalization.HijriCalendar`             | `System.Globalization.HijriCalendar.HijriEra`                |
| `System.Globalization.JapaneseLunisolarCalendar` | `System.Globalization.JapaneseLunisolarCalendar.JapaneseEra` |
| `System.Globalization.JulianCalendar`            | `System.Globalization.JulianCalendar.JulianEra`              |
| `System.Globalization.KoreanCalendar`            | `System.Globalization.KoreanCalendar.KoreanEra`              |
| `System.Globalization.KoreanLunisolarCalendar`   | `System.Globalization.KoreanLunisolarCalendar.GregorianEra`  |
| `System.Globalization.PersianCalendar`           | `System.Globalization.PersianCalendar.PersianEra`            |
| `System.Globalization.ThaiBuddhistCalendar`      | `System.Globalization.ThaiBuddhistCalendar.ThaiBuddhistEra`  |
| `System.Globalization.UmAlQuraCalendar`          | `System.Globalization.UmAlQuraCalendar.UmAlQuraEra`          |

The name that corresponds to a particular era number can be retrieved by passing the era number to the `System.Globalization.DateTimeFormatInfo.GetEraName*` or `System.Globalization.DateTimeFormatInfo.GetAbbreviatedEraName*` method. The following example calls these methods to retrieve information about era support in the `System.Globalization.GregorianCalendar` class. It displays the Gregorian calendar date that corresponds to January 1 of the second year of the current era, as well as the Gregorian calendar date that corresponds to January 1 of the second year of each supported Japanese calendar era.

```csharp
﻿using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      int year = 2;
      int month = 1;
      int day = 1;
      Calendar cal = new JapaneseCalendar();

      Console.WriteLine("\nDate instantiated without an era:");
      DateTime date1 = new DateTime(year, month, day, 0, 0, 0, 0, cal);
      Console.WriteLine("{0}/{1}/{2} in Japanese Calendar -> {3:d} in Gregorian",
                        cal.GetMonth(date1), cal.GetDayOfMonth(date1),
                        cal.GetYear(date1), date1);

      Console.WriteLine("\nDates instantiated with eras:");
      foreach (int era in cal.Eras) {
         DateTime date2 = cal.ToDateTime(year, month, day, 0, 0, 0, 0, era);
         Console.WriteLine("{0}/{1}/{2} era {3} in Japanese Calendar -> {4:d} in Gregorian",
                           cal.GetMonth(date2), cal.GetDayOfMonth(date2),
                           cal.GetYear(date2), cal.GetEra(date2), date2);
      }
   }
}
```

In addition, the "g" custom date and time format string includes a calendar's era name in the string representation of a date and time. For more information, see Custom date and time format strings.

### Instantiate a date with an era

For the two `System.Globalization.Calendar` classes that support multiple eras, a date that consists of a particular year, month, and day of the month value can be ambiguous. For example, all eras supported by the `System.Globalization.JapaneseCalendar` have years whose number is 1. Ordinarily, if an era is not specified, both date and time and calendar methods assume that values belong to the current era. This is true of the `System.DateTime.#ctor*` and `System.DateTimeOffset.#ctor*` constructors that include parameters of type `System.Globalization.Calendar`, as well as the JapaneseCalendar.ToDateTime) and JapaneseLunisolarCalendar.ToDateTime) methods. The following example instantiates a date that represents January 1 of the second year of an unspecified era. If you execute the example when the Reiwa era is the current era, the date is interpreted as the second year of the Reiwa era. The era, 令和, precedes the year in the string returned by the `System.DateTime.ToString(System.String,System.IFormatProvider)` method and corresponds to January 1, 2020, in the Gregorian calendar. (The Reiwa era begins in the year 2019 of the Gregorian calendar.)

_Code sample not included: ~/samples/snippets/standard/datetime/calendars/current-era/cs/program.cs._

However, if the era changes, the intent of this code becomes ambiguous. Is the date intended to represent the second year of the current era, or is it intended to represent the second year of the Heisei era? There are two ways to avoid this ambiguity:

- Instantiate the date and time value using the default `System.Globalization.GregorianCalendar` class. You can then use the Japanese calendar or the Japanese Lunisolar calendar for the string representation of dates, as the following example shows.

  _Code sample not included: ~/samples/snippets/standard/datetime/calendars/gregorian/cs/program.cs._

- Call a date and time method that explicitly specifies an era. This includes the following methods:

  - The `System.Globalization.Calendar.ToDateTime(System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32)` method of the `System.Globalization.JapaneseCalendar` or `System.Globalization.JapaneseLunisolarCalendar` class.

  - A `System.DateTime` or `System.DateTimeOffset` parsing method, such as `System.DateTime.Parse*`, `System.DateTime.TryParse*`, `System.DateTime.ParseExact*`, or `System.DateTime.TryParseExact*`, that includes the string to be parsed and optionally a `System.Globalization.DateTimeStyles` argument if the current culture is Japanese-Japan ("ja-JP") and that culture's calendar is the `System.Globalization.JapaneseCalendar`. The string to be parsed must include the era.

  - A `System.DateTime` or `System.DateTimeOffset` parsing method that includes a `provider` parameter of type `System.IFormatProvider`. `provider` must be either a `System.Globalization.CultureInfo` object that represents the Japanese-Japan ("ja-JP") culture whose current calendar is `System.Globalization.JapaneseCalendar` or a `System.Globalization.DateTimeFormatInfo` object whose `System.Globalization.DateTimeFormatInfo.Calendar` property is `System.Globalization.JapaneseCalendar`. The string to be parsed must include the era.

  The following example uses three of these methods to instantiate a date and time in the Meiji era, which began on September 8, 1868, and ended on July 29, 1912.

  _Code sample not included: ~/samples/snippets/standard/datetime/calendars/specify-era/cs/program.cs._

> **Tip:**
> When working with calendars that support multiple eras, *always* use the Gregorian date to instantiate a date, or specify the era when you instantiate a date and time based on that calendar.

In specifying an era to the `System.Globalization.Calendar.ToDateTime(System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32)` method, you provide the index of the era in the calendar's `System.Globalization.Calendar.Eras` property. For calendars whose eras are subject to change, however, these indexes are not constant values; the current era is at index 0, and the oldest era is at index `Eras.Length - 1`. When a new era is added to a calendar, the indexes of the previous eras increase by one. You can supply the appropriate era index as follows:

- For dates in the current era, always use the calendar's `System.Globalization.Calendar.CurrentEra` property.

- For dates in a specified era, use the `System.Globalization.DateTimeFormatInfo.GetEraName*` method to retrieve the index that corresponds to a specified era name. This requires that the `System.Globalization.JapaneseCalendar` be the current calendar of the `System.Globalization.CultureInfo` object that represents the ja-JP culture.  (This technique works for the `System.Globalization.JapaneseLunisolarCalendar` as well, since it supports the same eras as the `System.Globalization.JapaneseCalendar`.) The previous example illustrates this approach.

### Calendars, eras, and date ranges: Relaxed range checks

Very much like individual calendars have supported date ranges, eras in the `System.Globalization.JapaneseCalendar` and `System.Globalization.JapaneseLunisolarCalendar` classes also have supported ranges. Previously, .NET used strict era range checks to ensure that an era-specific date was within the range of that era. That is, if a date is outside of the range of the specified era, the method throws an `System.ArgumentOutOfRangeException`. Currently, .NET uses relaxed ranged checking by default. Updates to all versions of .NET introduced relaxed era range checks; the attempt to instantiate an era-specific date that is outside the range of the specified era "overflows" into the following era, and no exception is thrown.

The following example attempts to instantiate a date in the 65th year of the Showa era, which began on December 25, 1926 and ended on January 7, 1989. This date corresponds to January 9, 1990, which is outside the range of the Showa era in the `System.Globalization.JapaneseCalendar`. As the output from the example illustrates, the date displayed by the example is January 9, 1990, in the second year of the Heisei era.

  _Code sample not included: ~/samples/snippets/standard/datetime/calendars/relaxed-range/cs/program.cs._

If relaxed range checks are undesirable, you can restore strict range checks in a number of ways, depending on the version of .NET on which your application is running:

- **.NET Core:** Add the following to the *.netcore.runtime.json* config file:

  ```json
  "runtimeOptions": {
    "configProperties": {
        "Switch.System.Globalization.EnforceJapaneseEraYearRanges": true
    }
  }
  ```

- **.NET Framework 4.6 or later:** Set the following AppContext switch in the *app.config* file:

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <configuration>
    <runtime>
      <AppContextSwitchOverrides value="Switch.System.Globalization.EnforceJapaneseEraYearRanges=true" />
    </runtime>
  </configuration>
  ```

- **.NET Framework 4.5.2 or earlier:** Set the following registry value:

  |           | Value                                                               |
  | --------- | ------------------------------------------------------------------- |
  | **Key**   | **HKEY_LOCAL_MACHINE\Software\Microsoft\\.NETFramework\AppContext** |
  | **Entry** | Switch.System.Globalization.EnforceJapaneseEraYearRanges            |
  | **Type**  | REG_SZ                                                              |
  | **Value** | true                                                                |

With strict range checks enabled, the previous example throws an `System.ArgumentOutOfRangeException` and displays the following output:

```console
Unhandled Exception: System.ArgumentOutOfRangeException: Valid values are between 1 and 64, inclusive.
Parameter name: year
   at System.Globalization.GregorianCalendarHelper.GetYearOffset(Int32 year, Int32 era, Boolean throwOnError)
   at System.Globalization.GregorianCalendarHelper.ToDateTime(Int32 year, Int32 month, Int32 day, Int32 hour, Int32 minute, Int32 second, Int32 millisecond, Int32 era)
   at Example.Main()
```
