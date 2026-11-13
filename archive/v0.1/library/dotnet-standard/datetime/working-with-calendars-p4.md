---
title: "Working with calendars (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/working-with-calendars.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Working with calendars (part 4 of 4)

### Represent dates in calendars with multiple eras

If a `System.Globalization.Calendar` object supports eras and is the current calendar of a `System.Globalization.CultureInfo` object, the era is included in the string representation of a date and time value for the full date and time, long date, and short date patterns. The following example displays these date patterns when the current culture is Japan (Japanese) and the current calendar is the Japanese calendar.

```csharp
using System;
using System.Globalization;
using System.IO;
using System.Threading;

public class Example
{
   public static void Main()
   {
      StreamWriter sw = new StreamWriter(@".\eras.txt");
      DateTime dt = new DateTime(2012, 5, 1);

      CultureInfo culture = CultureInfo.CreateSpecificCulture("ja-JP");
      DateTimeFormatInfo dtfi = culture.DateTimeFormat;
      dtfi.Calendar = new JapaneseCalendar();
      Thread.CurrentThread.CurrentCulture = culture;

      sw.WriteLine("\n{0,-43} {1}", "Full Date and Time Pattern:", dtfi.FullDateTimePattern);
      sw.WriteLine(dt.ToString("F"));
      sw.WriteLine();

      sw.WriteLine("\n{0,-43} {1}", "Long Date Pattern:", dtfi.LongDatePattern);
      sw.WriteLine(dt.ToString("D"));

      sw.WriteLine("\n{0,-43} {1}", "Short Date Pattern:", dtfi.ShortDatePattern);
      sw.WriteLine(dt.ToString("d"));
      sw.Close();
    }
}
// The example writes the following output to a file:
//    Full Date and Time Pattern:                 gg y'年'M'月'd'日' H:mm:ss
//    平成 24年5月1日 0:00:00
//
//    Long Date Pattern:                          gg y'年'M'月'd'日'
//    平成 24年5月1日
//
//    Short Date Pattern:                         gg y/M/d
//    平成 24/5/1
```

> **Warning:**
> The `System.Globalization.JapaneseCalendar` class is the only calendar class in .NET that both supports dates in more than one era and that can be the current calendar of a `System.Globalization.CultureInfo` object - specifically, of a `System.Globalization.CultureInfo` object that represents the Japanese (Japan) culture.

For all calendars, the "g" custom format specifier includes the era in the result string. The following example uses the "MM-dd-yyyy g" custom format string to include the era in the result string when the current calendar is the Gregorian calendar.

```csharp
using System;

public class Example
{
   public static void Main()
   {
         DateTime dat = new DateTime(2012, 5, 1);
         Console.WriteLine($"{dat:MM-dd-yyyy g}");
      // The example displays the following output:
      //     05-01-2012 A.D.
   }
}
```

In cases where the string representation of a date is expressed in a calendar that is not the current calendar, the `System.Globalization.Calendar` class includes a `System.Globalization.Calendar.GetEra*` method that can be used along with the `System.Globalization.Calendar.GetYear*`, `System.Globalization.Calendar.GetMonth*`, and `System.Globalization.Calendar.GetDayOfMonth*` methods to unambiguously indicate a date as well as the era to which it belongs. The following example uses the `System.Globalization.JapaneseLunisolarCalendar` class to provide an illustration. However, note that including a meaningful name or abbreviation instead of an integer for the era in the result string requires that you instantiate a `System.Globalization.DateTimeFormatInfo` object and make `System.Globalization.JapaneseCalendar` its current calendar. (The `System.Globalization.JapaneseLunisolarCalendar` calendar cannot be the current calendar of any culture, but in this case the two calendars share the same eras.)

```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      DateTime date1 = new DateTime(2011, 8, 28);
      Calendar cal = new JapaneseLunisolarCalendar();

      Console.WriteLine("{0} {1:d4}/{2:d2}/{3:d2}",
                        cal.GetEra(date1),
                        cal.GetYear(date1),
                        cal.GetMonth(date1),
                        cal.GetDayOfMonth(date1));

      // Display eras
      CultureInfo culture = CultureInfo.CreateSpecificCulture("ja-JP");
      DateTimeFormatInfo dtfi = culture.DateTimeFormat;
      dtfi.Calendar = new JapaneseCalendar();

      Console.WriteLine("{0} {1:d4}/{2:d2}/{3:d2}",
                        dtfi.GetAbbreviatedEraName(cal.GetEra(date1)),
                        cal.GetYear(date1),
                        cal.GetMonth(date1),
                        cal.GetDayOfMonth(date1));
   }
}
// The example displays the following output:
//       4 0023/07/29
//       平 0023/07/29
```

In the Japanese calendars, the first year of an era is called Gannen (元年). For example, instead of Heisei 1, the first year of the Heisei era can be described as Heisei Gannen. .NET adopts this convention in formatting operations for dates and times formatted with the following standard or custom date and time format strings when they are used with a `System.Globalization.CultureInfo` object that represents the Japanese-Japan ("ja-JP") culture with the `System.Globalization.JapaneseCalendar` class:

- The long date pattern, indicated by the "D" standard date and time format string.
- The full date long time pattern, indicated by the "F" standard date and time format string.
- The full date short time pattern, indicated by the "f" standard date and time format string.
- The year/month pattern, indicated by the "Y" or "y" standard date and time format string.
- The "ggy'年'" or "ggy年" custom date and time format string.

For example, the following example displays a date in the first year of the Heisei era in the `System.Globalization.JapaneseCalendar`.

  _Code sample not included: ~/samples/snippets/standard/datetime/calendars/gannen/cs/program.cs._

If this behavior is undesirable in formatting operations, you can restore the previous behavior, which always represents the first year of an era as "1" rather than "Gannen", by doing the following, depending on the version of .NET:

- **.NET Core:** Add the following to the *.netcore.runtime.json* config file:

  ```json
  "runtimeOptions": {
    "configProperties": {
        "Switch.System.Globalization.FormatJapaneseFirstYearAsANumber": true
    }
  }
  ```

- **.NET Framework 4.6 or later:** Set the following AppContext switch in the *app.config* file:

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <configuration>
    <runtime>
      <AppContextSwitchOverrides value="Switch.System.Globalization.FormatJapaneseFirstYearAsANumber=true" />
    </runtime>
  </configuration>
  ```

- **.NET Framework 4.5.2 or earlier:** Set the following registry value:

   |           | Value                                                               |
   | --------- | ------------------------------------------------------------------- |
   | **Key**   | **HKEY_LOCAL_MACHINE\Software\Microsoft\\.NETFramework\AppContext** |
   | **Entry** | Switch.System.Globalization.FormatJapaneseFirstYearAsANumber        |
   | **Type**  | REG_SZ                                                              |
   | **Value** | true                                                                |

With gannen support in formatting operations disabled, the previous example displays the following output:

```console
Japanese calendar date: 平成1年8月18日 (Gregorian: Friday, August 18, 1989)
```

.NET has also been updated so that date and time parsing operations support strings that contain the year represented as either "1" or Gannen. Although you should not need to do this, you can restore the previous behavior to recognize only "1" as the first year of an era. You can do this as follows, depending on the version of .NET:

- **.NET Core:** Add the following to the *.netcore.runtime.json* config file:

  ```json
  "runtimeOptions": {
    "configProperties": {
        "Switch.System.Globalization.EnforceLegacyJapaneseDateParsing": true
    }
  }
  ```

- **.NET Framework 4.6 or later:** Set the following AppContext switch in the *app.config* file:

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <configuration>
    <runtime>
      <AppContextSwitchOverrides value="Switch.System.Globalization.EnforceLegacyJapaneseDateParsing=true" />
    </runtime>
  </configuration>
  ```

- **.NET Framework 4.5.2 or earlier:** Set the following registry value:

   |           | Value                                                               |
   | --------- | ------------------------------------------------------------------- |
   | **Key**   | **HKEY_LOCAL_MACHINE\Software\Microsoft\\.NETFramework\AppContext** |
   | **Entry** | Switch.System.Globalization.EnforceLegacyJapaneseDateParsing        |
   | **Type**  | REG_SZ                                                              |
   | **Value** | true                                                                |

## See also

- How to: Display dates in non-Gregorian calendars
- Calendar class
