---
title: "How to: Display Dates in Non-Gregorian Calendars (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/how-to-display-dates-in-non-gregorian-calendars.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Display Dates in Non-Gregorian Calendars (part 2 of 2)

## Example

 The example displays a date using two different calendars. It displays the date after defining the Hijri calendar as the default calendar for the ar-JO culture, and displays the date using the Persian calendar, which is not supported as an optional calendar by the fa-IR culture.

 ```csharp
using System;
using System.Globalization;

public class CalendarDates
{
   public static void Main()
   {
      HijriCalendar hijriCal = new HijriCalendar();
      CalendarUtility hijriUtil = new CalendarUtility(hijriCal);
      DateTime dateValue1 = new DateTime(1429, 6, 29, hijriCal);
      DateTimeOffset dateValue2 = new DateTimeOffset(dateValue1,
                                  TimeZoneInfo.Local.GetUtcOffset(dateValue1));
      CultureInfo jc = CultureInfo.CreateSpecificCulture("ar-JO");

      // Display the date using the Gregorian calendar.
      Console.WriteLine($"Using the system default culture: {dateValue1.ToString("d")}");
      // Display the date using the ar-JO culture's original default calendar.
      Console.WriteLine($"Using the ar-JO culture's original default calendar: {dateValue1.ToString("d", jc)}");
      // Display the date using the Hijri calendar.
      Console.WriteLine("Using the ar-JO culture with Hijri as the default calendar:");
      // Display a Date value.
      Console.WriteLine(hijriUtil.DisplayDate(dateValue1, jc));
      // Display a DateTimeOffset value.
      Console.WriteLine(hijriUtil.DisplayDate(dateValue2, jc));

      Console.WriteLine();

      PersianCalendar persianCal = new PersianCalendar();
      CalendarUtility persianUtil = new CalendarUtility(persianCal);
      CultureInfo ic = CultureInfo.CreateSpecificCulture("fa-IR");

      // Display the date using the ir-FA culture's default calendar.
      Console.WriteLine($"Using the ir-FA culture's default calendar: {dateValue1.ToString("d", ic)}");
      // Display a Date value.
      Console.WriteLine(persianUtil.DisplayDate(dateValue1, ic));
      // Display a DateTimeOffset value.
      Console.WriteLine(persianUtil.DisplayDate(dateValue2, ic));
   }
}

public class CalendarUtility
{
   private Calendar thisCalendar;
   private CultureInfo targetCulture;

   public CalendarUtility(Calendar cal)
   {
      this.thisCalendar = cal;
   }

   private bool CalendarExists(CultureInfo culture)
   {
      this.targetCulture = culture;
      return Array.Exists(this.targetCulture.OptionalCalendars,
                          this.HasSameName);
   }

   private bool HasSameName(Calendar cal)
   {
      if (cal.ToString() == thisCalendar.ToString())
         return true;
      else
         return false;
   }

   public string DisplayDate(DateTime dateToDisplay, CultureInfo culture)
   {
      DateTimeOffset displayOffsetDate = dateToDisplay;
      return DisplayDate(displayOffsetDate, culture);
   }

   public string DisplayDate(DateTimeOffset dateToDisplay,
                             CultureInfo culture)
   {
      string specifier = "yyyy/MM/dd";

      if (this.CalendarExists(culture))
      {
         Console.WriteLine($"Displaying date in supported {this.thisCalendar.GetType().Name} calendar...");
         culture.DateTimeFormat.Calendar = this.thisCalendar;
         return dateToDisplay.ToString(specifier, culture);
      }
      else
      {
         Console.WriteLine($"Displaying date in unsupported {thisCalendar.GetType().Name} calendar...");

         string separator = targetCulture.DateTimeFormat.DateSeparator;

         return thisCalendar.GetYear(dateToDisplay.DateTime).ToString("0000") +
                separator +
                thisCalendar.GetMonth(dateToDisplay.DateTime).ToString("00") +
                separator +
                thisCalendar.GetDayOfMonth(dateToDisplay.DateTime).ToString("00");
      }
   }
}
// The example displays the following output to the console:
//       Using the system default culture: 7/3/2008
//       Using the ar-JO culture's original default calendar: 03/07/2008
//       Using the ar-JO culture with Hijri as the default calendar:
//       Displaying date in supported HijriCalendar calendar...
//       1429/06/29
//       Displaying date in supported HijriCalendar calendar...
//       1429/06/29
//
//       Using the ir-FA culture's default calendar: 7/3/2008
//       Displaying date in unsupported PersianCalendar calendar...
//       1387/04/13
//       Displaying date in unsupported PersianCalendar calendar...
//       1387/04/13

public class AdditionalSnippets
{
   public static void BadDate()
   {
      PersianCalendar persianCal = new PersianCalendar();

      DateTime persianDate = persianCal.ToDateTime(1387, 3, 18, 12, 0, 0, 0);
      Console.WriteLine(persianDate.ToString());

      persianDate = new DateTime(1387, 3, 18, persianCal);
      Console.WriteLine(persianDate.ToString());
      // The example displays the following output to the console:
      //       6/7/2008 12:00:00 PM
      //       6/7/2008 12:00:00 AM
   }
}
```

 Each `System.Globalization.CultureInfo` object can support one or more calendars, which are indicated by the `System.Globalization.CultureInfo.OptionalCalendars` property. One of these is designated as the culture's default calendar and is returned by the read-only `System.Globalization.CultureInfo.Calendar` property. Another of the optional calendars can be designated as the default by assigning a `System.Globalization.Calendar` object that represents that calendar to the `System.Globalization.DateTimeFormatInfo.Calendar` property returned by the `System.Globalization.CultureInfo.DateTimeFormat` property. However, some calendars, such as the Persian calendar represented by the `System.Globalization.PersianCalendar` class, do not serve as optional calendars for any culture.

 The example defines a reusable calendar utility class, `CalendarUtility`, to handle many of the details of generating the string representation of a date using a particular calendar. The `CalendarUtility` class has the following members:

- A parameterized constructor whose single parameter is a `System.Globalization.Calendar` object in which a date is to be represented. This is assigned to a private field of the class.

- `CalendarExists`, a private method that returns a Boolean value indicating whether the calendar represented by the `CalendarUtility` object is supported by the `System.Globalization.CultureInfo` object that is passed to the method as a parameter. The method wraps a call to the `System.Array.Exists*` method, to which it passes the `System.Globalization.CultureInfo.OptionalCalendars*` array.

- `HasSameName`, a private method assigned to the `System.Predicate`1` delegate that is passed as a parameter to the `System.Array.Exists*` method. Each member of the array is passed to the method until the method returns `true`. The method determines whether the name of an optional calendar is the same as the calendar represented by the `CalendarUtility` object.

- `DisplayDate`, an overloaded public method that is passed two parameters: either a `System.DateTime` or `System.DateTimeOffset` value to express in the calendar represented by the `CalendarUtility` object; and the culture whose formatting rules are to be used. Its behavior in returning the string representation of a date depends on whether the target calendar is supported by the culture whose formatting rules are to be used.

 Regardless of the calendar used to create a `System.DateTime` or `System.DateTimeOffset` value in this example, that value is typically expressed as a Gregorian date. This is because the `System.DateTime` and `System.DateTimeOffset` types do not preserve any calendar information. Internally, they are represented as the number of ticks that have elapsed since midnight of January 1, 0001. The interpretation of that number depends on the calendar. For most cultures, the default calendar is the Gregorian calendar.
