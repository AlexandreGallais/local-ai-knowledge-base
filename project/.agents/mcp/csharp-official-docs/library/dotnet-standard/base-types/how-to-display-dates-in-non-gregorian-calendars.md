---
title: "How to: Display Dates in Non-Gregorian Calendars (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/how-to-display-dates-in-non-gregorian-calendars.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Display Dates in Non-Gregorian Calendars

The `System.DateTime` and `System.DateTimeOffset` types use the Gregorian calendar as their default calendar. This means that calling a date and time value's `ToString` method displays the string representation of that date and time in the Gregorian calendar, even if that date and time was created using another calendar. This is illustrated in the following example, which uses two different ways to create a date and time value with the Persian calendar, but still displays those date and time values in the Gregorian calendar when it calls the `System.DateTime.ToString*` method. This example reflects two commonly used but incorrect techniques for displaying the date in a particular calendar.

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

 Two different techniques can be used to display the date in a particular calendar. The first requires that the calendar be the default calendar for a particular culture. The second can be used with any calendar.

### To display the date for a culture's default calendar

1. Instantiate a calendar object derived from the `System.Globalization.Calendar` class that represents the calendar to be used.

2. Instantiate a `System.Globalization.CultureInfo` object representing the culture whose formatting will be used to display the date.

3. Call the `System.Array.Exists*` method to determine whether the calendar object is a member of the array returned by the `System.Globalization.CultureInfo.OptionalCalendars` property. This indicates that the calendar can serve as the default calendar for the `System.Globalization.CultureInfo` object. If it is not a member of the array, follow the instructions in the "To Display the Date in Any Calendar" section.

4. Assign the calendar object to the `System.Globalization.DateTimeFormatInfo.Calendar` property of the `System.Globalization.DateTimeFormatInfo` object returned by the `System.Globalization.CultureInfo.DateTimeFormat` property.

    > **Note:**
    > The `System.Globalization.CultureInfo` class also has a `System.Globalization.CultureInfo.Calendar` property. However, it is read-only and constant; it does not change to reflect the new default calendar assigned to the `System.Globalization.DateTimeFormatInfo.Calendar` property.

5. Call either the `System.DateTime.ToString*` or the `System.DateTime.ToString*` method, and pass it the `System.Globalization.CultureInfo` object whose default calendar was modified in the previous step.

### To display the date in any calendar

1. Instantiate a calendar object derived from the `System.Globalization.Calendar` class that represents the calendar to be used.

2. Determine which date and time elements should appear in the string representation of the date and time value.

3. For each date and time element that you want to display, call the calendar object's `Get`… method. The following methods are available:

    - `System.Globalization.Calendar.GetYear*`, to display the year in the appropriate calendar.

    - `System.Globalization.Calendar.GetMonth*`, to display the month in the appropriate calendar.

    - `System.Globalization.Calendar.GetDayOfMonth*`, to display the number of the day of the month in the appropriate calendar.

    - `System.Globalization.Calendar.GetHour*`, to display the hour of the day in the appropriate calendar.

    - `System.Globalization.Calendar.GetMinute*`, to display the minutes in the hour in the appropriate calendar.

    - `System.Globalization.Calendar.GetSecond*`, to display the seconds in the minute in the appropriate calendar.

    - `System.Globalization.Calendar.GetMilliseconds*`, to display the milliseconds in the second in the appropriate calendar.
