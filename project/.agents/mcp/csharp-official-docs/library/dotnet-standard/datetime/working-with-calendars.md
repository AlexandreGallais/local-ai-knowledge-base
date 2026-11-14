---
title: "Working with calendars (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/working-with-calendars.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Work with calendars

Although a date and time value represents a moment in time, its string representation is culture-sensitive and depends both on the conventions used for displaying date and time values by a specific culture and on the calendar used by that culture. This topic explores the support for calendars in .NET and discusses the use of the calendar classes when working with date values.

## Calendars in .NET

All calendars in .NET derive from the `System.Globalization.Calendar` class, which provides the base calendar implementation. One of the classes that inherits from the `System.Globalization.Calendar` class is the `System.Globalization.EastAsianLunisolarCalendar` class, which is the base class for all lunisolar calendars. .NET includes the following calendar implementations:

- `System.Globalization.ChineseLunisolarCalendar`, which represents the Chinese lunisolar calendar.

- `System.Globalization.GregorianCalendar`, which represents the Gregorian calendar. This calendar is further divided into subtypes (such as Arabic and Middle East French) that are defined by the `System.Globalization.GregorianCalendarTypes` enumeration. The `System.Globalization.GregorianCalendar.CalendarType` property specifies the subtype of the Gregorian calendar.

- `System.Globalization.HebrewCalendar`, which represents the Hebrew calendar.

- `System.Globalization.HijriCalendar`, which represents the Hijri calendar.

- `System.Globalization.JapaneseCalendar`, which represents the Japanese calendar.

- `System.Globalization.JapaneseLunisolarCalendar`, which represents the Japanese lunisolar calendar.

- `System.Globalization.JulianCalendar`, which represents the Julian calendar.

- `System.Globalization.KoreanCalendar`, which represents the Korean calendar.

- `System.Globalization.KoreanLunisolarCalendar`, which represents the Korean lunisolar calendar.

- `System.Globalization.PersianCalendar`, which represents the Persian calendar.

- `System.Globalization.TaiwanCalendar`, which represents the Taiwan calendar.

- `System.Globalization.TaiwanLunisolarCalendar`, which represents the Taiwan lunisolar calendar.

- `System.Globalization.ThaiBuddhistCalendar`, which represents the Thai Buddhist calendar.

- `System.Globalization.UmAlQuraCalendar`, which represents the Um Al Qura calendar.

A calendar can be used in one of two ways:

- As the calendar used by a specific culture. Each `System.Globalization.CultureInfo` object has a current calendar, which is the calendar that the object is currently using. The string representations of all date and time values automatically reflect the current culture and its current calendar. Typically, the current calendar is the culture's default calendar. `System.Globalization.CultureInfo` objects also have optional calendars, which include additional calendars that the culture can use.

- As a standalone calendar independent of a specific culture. In this case, `System.Globalization.Calendar` methods are used to express dates as values that reflect the calendar.

Note that six calendar classes – `System.Globalization.ChineseLunisolarCalendar`, `System.Globalization.JapaneseLunisolarCalendar`, `System.Globalization.JulianCalendar`, `System.Globalization.KoreanLunisolarCalendar`, `System.Globalization.PersianCalendar`, and `System.Globalization.TaiwanLunisolarCalendar` – can be used only as standalone calendars. They are not used by any culture as either the default calendar or as an optional calendar.

## Calendars and cultures

Each culture has a default calendar, which is defined by the `System.Globalization.CultureInfo.Calendar` property. The `System.Globalization.CultureInfo.OptionalCalendars` property returns an array of `System.Globalization.Calendar` objects that specifies all the calendars supported by a particular culture, including that culture's default calendar.

The following example illustrates the `System.Globalization.CultureInfo.Calendar*` and `System.Globalization.CultureInfo.OptionalCalendars` properties. It creates `CultureInfo` objects for the Thai (Thailand) and Japanese (Japan) cultures and displays their default and optional calendars. Note that in both cases, the culture's default calendar is also included in the `System.Globalization.CultureInfo.OptionalCalendars*` collection.

```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      // Create a CultureInfo for Thai in Thailand.
      CultureInfo th = CultureInfo.CreateSpecificCulture("th-TH");
      DisplayCalendars(th);

      // Create a CultureInfo for Japanese in Japan.
      CultureInfo ja = CultureInfo.CreateSpecificCulture("ja-JP");
      DisplayCalendars(ja);
   }

   static void DisplayCalendars(CultureInfo ci)
   {
      Console.WriteLine($"Calendars for the {ci.Name} culture:");

      // Get the culture's default calendar.
      Calendar defaultCalendar = ci.Calendar;
      Console.Write("   Default Calendar: {0}", GetCalendarName(defaultCalendar));

      if (defaultCalendar is GregorianCalendar)
         Console.WriteLine($" ({((GregorianCalendar) defaultCalendar).CalendarType})");
      else
         Console.WriteLine();

      // Get the culture's optional calendars.
      Console.WriteLine("   Optional Calendars:");
      foreach (var optionalCalendar in ci.OptionalCalendars) {
         Console.Write("{0,6}{1}", "", GetCalendarName(optionalCalendar));
         if (optionalCalendar is GregorianCalendar)
            Console.Write(" ({0})",
                          ((GregorianCalendar) optionalCalendar).CalendarType);

         Console.WriteLine();
      }
      Console.WriteLine();
   }

   static string GetCalendarName(Calendar cal)
   {
      return cal.ToString().Replace("System.Globalization.", "");
   }
}
// The example displays the following output:
//       Calendars for the th-TH culture:
//          Default Calendar: ThaiBuddhistCalendar
//          Optional Calendars:
//             ThaiBuddhistCalendar
//             GregorianCalendar (Localized)
//
//       Calendars for the ja-JP culture:
//          Default Calendar: GregorianCalendar (Localized)
//          Optional Calendars:
//             GregorianCalendar (Localized)
//             JapaneseCalendar
//             GregorianCalendar (USEnglish)
```

The calendar currently in use by a particular `System.Globalization.CultureInfo` object is defined by the culture's `System.Globalization.DateTimeFormatInfo.Calendar` property. A culture's `System.Globalization.DateTimeFormatInfo` object is returned by the `System.Globalization.CultureInfo.DateTimeFormat` property. When a culture is created, its default value is the same as the value of the `System.Globalization.CultureInfo.Calendar` property. However, you can change the culture's current calendar to any calendar contained in the array returned by the `System.Globalization.CultureInfo.OptionalCalendars` property. If you try to set the current calendar to a calendar that is not included in the `System.Globalization.CultureInfo.OptionalCalendars` property value, an `System.ArgumentException` is thrown.

The following example changes the calendar used by the Arabic (Saudi Arabia) culture. It first instantiates a `System.DateTime` value and displays it using the current culture - which, in this case, is English (United States) - and the current culture's calendar (which, in this case, is the Gregorian calendar). Next, it changes the current culture to Arabic (Saudi Arabia) and displays the date using its default Um Al-Qura calendar. It then calls the `CalendarExists` method to determine whether the Hijri calendar is supported by the Arabic (Saudi Arabia) culture. Because the calendar is supported, it changes the current calendar to Hijri and again displays the date. Note that in each case, the date is displayed using the current culture's current calendar.

```csharp
using System.Globalization;

DateTime date1 = new(2011, 6, 20);

Console.OutputEncoding = System.Text.Encoding.UTF8;
DisplayCurrentInfo();
// Display the date using the current culture and calendar.
Console.WriteLine(date1.ToString("d"));
Console.WriteLine();

CultureInfo arSA = CultureInfo.CreateSpecificCulture("ar-SA");

// Change the current culture to Arabic (Saudi Arabia).
CultureInfo.CurrentCulture = arSA;
// Display date and information about the current culture.
DisplayCurrentInfo();
Console.WriteLine(date1.ToString("d"));
Console.WriteLine();

// Change the calendar to Hijri.
Calendar hijri = new HijriCalendar();
if (CalendarExists(arSA, hijri))
{
    arSA.DateTimeFormat.Calendar = hijri;
    // Display date and information about the current culture.
    DisplayCurrentInfo();
    Console.WriteLine(date1.ToString("d"));
}

static void DisplayCurrentInfo()
{
    Console.WriteLine($"Current Culture: {CultureInfo.CurrentCulture.Name}");
    Console.WriteLine($"Current Calendar: {DateTimeFormatInfo.CurrentInfo.Calendar}");
}

static bool CalendarExists(CultureInfo culture, Calendar cal) =>
    culture.OptionalCalendars.Any(optional => optional.ToString() == cal.ToString());
// The example displays the following output:
//    Current Culture: en-US
//    Current Calendar: System.Globalization.GregorianCalendar
//    6/20/2011
//
//    Current Culture: ar-SA
//    Current Calendar: System.Globalization.UmAlQuraCalendar
//    18‏‏/7‏‏/1432 بعد الهجرة
//
//    Current Culture: ar-SA
//    Current Calendar: System.Globalization.HijriCalendar
//    19‏‏/7‏‏/1432 بعد الهجرة
```
```vb
Imports System.Globalization

Module Example
    Public Sub Main()
        Dim date1 As Date = #6/20/2011#

        Console.OutputEncoding = System.Text.Encoding.UTF8
        DisplayCurrentInfo()
        ' Display the date using the current culture and calendar.
        Console.WriteLine(date1.ToString("d"))
        Console.WriteLine()

        Dim arSA As CultureInfo = CultureInfo.CreateSpecificCulture("ar-SA")

        ' Change the current culture to Arabic (Saudi Arabia).
        CultureInfo.CurrentCulture = arSA
        ' Display date and information about the current culture.
        DisplayCurrentInfo()
        Console.WriteLine(date1.ToString("d"))
        Console.WriteLine()

        ' Change the calendar to Hijri.
        Dim hijri As Calendar = New HijriCalendar()
        If CalendarExists(arSA, hijri) Then
            arSA.DateTimeFormat.Calendar = hijri
            ' Display date and information about the current culture.
            DisplayCurrentInfo()
            Console.WriteLine(date1.ToString("d"))
        End If
    End Sub

    Private Sub DisplayCurrentInfo()
        Console.WriteLine($"Current Culture: {CultureInfo.CurrentCulture.Name}")
        Console.WriteLine($"Current Calendar: {DateTimeFormatInfo.CurrentInfo.Calendar}")
    End Sub

    Private Function CalendarExists(culture As CultureInfo, cal As Calendar) As Boolean
        Return culture.OptionalCalendars.Any(Function(optional1) optional1.ToString() = cal.ToString())
    End Function
End Module
' The example displays the following output:
'    Current Culture: en-US
'    Current Calendar: System.Globalization.GregorianCalendar
'    6/20/2011
'    
'    Current Culture: ar-SA
'    Current Calendar: System.Globalization.UmAlQuraCalendar
'    18‏‏/7‏‏/1432 بعد الهجرة
'    
'    Current Culture: ar-SA
'    Current Calendar: System.Globalization.HijriCalendar
'    19‏‏/7‏‏/1432 بعد الهجرة
```
Before the example writes to the console, it changes the console's output encoding to UTF-8 so that Arabic letters display correctly.
