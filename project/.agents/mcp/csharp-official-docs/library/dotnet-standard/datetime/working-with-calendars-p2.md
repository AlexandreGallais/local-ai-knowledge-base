---
title: "Working with calendars (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/working-with-calendars.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Working with calendars (part 2 of 4)

## Dates and calendars

With the exception of the constructors that include a parameter of type `System.Globalization.Calendar` and allow the elements of a date (that is, the month, the day, and the year) to reflect values in a designated calendar, both `System.DateTime` and `System.DateTimeOffset` values are always based on the Gregorian calendar. This means, for example, that the `System.DateTime.Year` property returns the year in the Gregorian calendar, and the `System.DateTime.Day` property returns the day of the month in the Gregorian calendar.

> **Important:**
> It is important to remember that there is a difference between a date value and its string representation. The former is based on the Gregorian calendar; the latter is based on the current calendar of a specific culture.

The following example illustrates this difference between `System.DateTime` properties and their corresponding `System.Globalization.Calendar` methods. In the example, the current culture is Arabic (Egypt), and the current calendar is Um Al Qura. A `System.DateTime` value is set to the fifteenth day of the seventh month of 2011. It is clear that this is interpreted as a Gregorian date, because these same values are returned by the `System.DateTime.ToString(System.String,System.IFormatProvider)` method when it uses the conventions of the invariant culture. The string representation of the date that is formatted using the conventions of the current culture is 14/08/32, which is the equivalent date in the Um Al Qura calendar. Next, members of `DateTime` and `Calendar` are used to return the day, the month, and the year of the `System.DateTime` value. In each case, the values returned by `System.DateTime` members reflect values in the Gregorian calendar, whereas values returned by `System.Globalization.UmAlQuraCalendar` members reflect values in the Uum al-Qura calendar.

```csharp
using System;
using System.Globalization;
using System.Threading;

public class Example
{
   public static void Main()
   {
      // Make Arabic (Egypt) the current culture
      // and Umm al-Qura calendar the current calendar.
      CultureInfo arEG = CultureInfo.CreateSpecificCulture("ar-EG");
      Calendar cal = new UmAlQuraCalendar();
      arEG.DateTimeFormat.Calendar = cal;
      Thread.CurrentThread.CurrentCulture = arEG;

      // Display information on current culture and calendar.
      DisplayCurrentInfo();

      // Instantiate a date object.
      DateTime date1 = new DateTime(2011, 7, 15);

      // Display the string representation of the date.
      Console.WriteLine($"Date: {date1:d}");
      Console.WriteLine($"Date in the Invariant Culture: {date1.ToString("d", CultureInfo.InvariantCulture)}");
      Console.WriteLine();

      // Compare DateTime properties and Calendar methods.
      Console.WriteLine($"DateTime.Month property: {date1.Month}");
      Console.WriteLine($"UmAlQura.GetMonth: {cal.GetMonth(date1)}");
      Console.WriteLine();

      Console.WriteLine($"DateTime.Day property: {date1.Day}");
      Console.WriteLine($"UmAlQura.GetDayOfMonth: {cal.GetDayOfMonth(date1)}");
      Console.WriteLine();

      Console.WriteLine($"DateTime.Year property: {date1.Year:D4}");
      Console.WriteLine($"UmAlQura.GetYear: {cal.GetYear(date1)}");
      Console.WriteLine();
   }

   private static void DisplayCurrentInfo()
   {
      Console.WriteLine($"Current Culture: {CultureInfo.CurrentCulture.Name}");
      Console.WriteLine($"Current Calendar: {DateTimeFormatInfo.CurrentInfo.Calendar}");
   }
}
// The example displays the following output:
//    Current Culture: ar-EG
//    Current Calendar: System.Globalization.UmAlQuraCalendar
//    Date: 14/08/32
//    Date in the Invariant Culture: 07/15/2011
//
//    DateTime.Month property: 7
//    UmAlQura.GetMonth: 8
//
//    DateTime.Day property: 15
//    UmAlQura.GetDayOfMonth: 14
//
//    DateTime.Year property: 2011
//    UmAlQura.GetYear: 1432
```

### Instantiate dates based on a calendar

Because `System.DateTime` and `System.DateTimeOffset` values are based on the Gregorian calendar, you must call an overloaded constructor that includes a parameter of type `System.Globalization.Calendar` to instantiate a date value if you want to use the day, month, or year values from a different calendar. You can also call one of the overloads of a specific calendar's `System.Globalization.Calendar.ToDateTime*` method to instantiate a `System.DateTime` object based on the values of a particular calendar.

The following example instantiates one `System.DateTime` value by passing a `System.Globalization.HebrewCalendar` object to a `System.DateTime` constructor, and instantiates a second `System.DateTime` value by calling the `System.Globalization.HebrewCalendar.ToDateTime(System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32,System.Int32)` method. Because the two values are created with identical values from the Hebrew calendar, the call to the `System.DateTime.Equals*` method shows that the two `System.DateTime` values are equal.

```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      HebrewCalendar hc = new HebrewCalendar();

      DateTime date1 = new DateTime(5771, 6, 1, hc);
      DateTime date2 = hc.ToDateTime(5771, 6, 1, 0, 0, 0, 0);

      Console.WriteLine("{0:d} (Gregorian) = {1:d2}/{2:d2}/{3:d4} ({4}): {5}",
                        date1,
                        hc.GetMonth(date2),
                        hc.GetDayOfMonth(date2),
                        hc.GetYear(date2),
                        GetCalendarName(hc),
                        date1.Equals(date2));
   }

   private static string GetCalendarName(Calendar cal)
   {
      return cal.ToString().Replace("System.Globalization.", "").
                            Replace("Calendar", "");
   }
}
// The example displays the following output:
//    2/5/2011 (Gregorian) = 06/01/5771 (Hebrew): True
```

### Represent dates in the current calendar

Date and time formatting methods always use the current calendar when converting dates to strings. This means that the string representation of the year, the month, and the day of the month reflect the current calendar, and do not necessarily reflect the Gregorian calendar.

The following example shows how the current calendar affects the string representation of a date. It changes the current culture to Chinese (Traditional, Taiwan), and instantiates a date value. It then displays the current calendar and the date, changes the current calendar to `System.Globalization.TaiwanCalendar`, and displays the current calendar and date once again. The first time the date is displayed, it is represented as a date in the Gregorian calendar. The second time it is displayed, it is represented as a date in the Taiwan calendar.

```csharp
using System;
using System.Globalization;
using System.Threading;

public class Example
{
   public static void Main()
   {
      // Change the current culture to zh-TW.
      CultureInfo zhTW = CultureInfo.CreateSpecificCulture("zh-TW");
      Thread.CurrentThread.CurrentCulture = zhTW;
      // Define a date.
      DateTime date1 = new DateTime(2011, 1, 16);

      // Display the date using the default (Gregorian) calendar.
      Console.WriteLine($"Current calendar: {zhTW.DateTimeFormat.Calendar}");
      Console.WriteLine(date1.ToString("d"));

      // Change the current calendar and display the date.
      zhTW.DateTimeFormat.Calendar = new TaiwanCalendar();
      Console.WriteLine($"Current calendar: {zhTW.DateTimeFormat.Calendar}");
      Console.WriteLine(date1.ToString("d"));
   }
}
// The example displays the following output:
//    Current calendar: System.Globalization.GregorianCalendar
//    2011/1/16
//    Current calendar: System.Globalization.TaiwanCalendar
//    100/1/16
```

### Represent dates in a non-current calendar

To represent a date using a calendar that is not the current calendar of a particular culture, you must call methods of that `System.Globalization.Calendar` object. For example, the `System.Globalization.Calendar.GetYear*`, `System.Globalization.Calendar.GetMonth*`, and `System.Globalization.Calendar.GetDayOfMonth*` methods convert the year, month, and day to values that reflect a particular calendar.

> **Warning:**
> Because some calendars are not optional calendars of any culture, representing dates in these calendars always requires that you call calendar methods. This is true of all calendars that derive from the `System.Globalization.EastAsianLunisolarCalendar`, `System.Globalization.JulianCalendar`, and `System.Globalization.PersianCalendar` classes.

The following example uses a `System.Globalization.JulianCalendar` object to instantiate a date, January 9, 1905, in the Julian calendar. When this date is displayed using the default (Gregorian) calendar, it is represented as January 22, 1905. Calls to individual `System.Globalization.JulianCalendar` methods enable the date to be represented in the Julian calendar.

```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      JulianCalendar julian = new JulianCalendar();
      DateTime date1 = new DateTime(1905, 1, 9, julian);

      Console.WriteLine("Date ({0}): {1:d}",
                        CultureInfo.CurrentCulture.Calendar,
                        date1);
      Console.WriteLine("Date in Julian calendar: {0:d2}/{1:d2}/{2:d4}",
                        julian.GetMonth(date1),
                        julian.GetDayOfMonth(date1),
                        julian.GetYear(date1));
   }
}
// The example displays the following output:
//    Date (System.Globalization.GregorianCalendar): 1/22/1905
//    Date in Julian calendar: 01/09/1905
```

### Calendars and date ranges

The earliest date supported by a calendar is indicated by that calendar's `System.Globalization.Calendar.MinSupportedDateTime` property. For the `System.Globalization.GregorianCalendar` class, that date is January 1, 0001 C.E. Most of the other calendars in .NET support a later date. Trying to work with a date and time value that precedes a calendar's earliest supported date throws an `System.ArgumentOutOfRangeException` exception.

However, there is one important exception. The default (uninitialized) value of a `System.DateTime` object and a `System.DateTimeOffset` object is equal to the `System.Globalization.GregorianCalendar.MinSupportedDateTime*` value. If you try to format this date in a calendar that does not support January 1, 0001 C.E. and you do not provide a format specifier, the formatting method uses the "s" (sortable date/time pattern) format specifier instead of the "G" (general date/time pattern) format specifier. As a result, the formatting operation does not throw an `System.ArgumentOutOfRangeException` exception. Instead, it returns the unsupported date. This is illustrated in the following example, which displays the value of `System.DateTime.MinValue` when the current culture is set to Japanese (Japan) with the Japanese calendar, and to Arabic (Egypt) with the Um Al Qura calendar. It also sets the current culture to English (United States) and calls the `System.DateTime.ToString(System.IFormatProvider)` method with each of these `System.Globalization.CultureInfo` objects. In each case, the date is displayed by using the sortable date/time pattern.

```csharp
using System;
using System.Globalization;
using System.Threading;

public class Example
{
   public static void Main()
   {
      DateTime dat = DateTime.MinValue;

      // Change the current culture to ja-JP with the Japanese Calendar.
      CultureInfo jaJP = CultureInfo.CreateSpecificCulture("ja-JP");
      jaJP.DateTimeFormat.Calendar = new JapaneseCalendar();
      Thread.CurrentThread.CurrentCulture = jaJP;
      Console.WriteLine($"Earliest supported date by {GetCalendarName(jaJP)} calendar: {jaJP.DateTimeFormat.Calendar.MinSupportedDateTime:d}");
      // Attempt to display the date.
      Console.WriteLine(dat.ToString());
      Console.WriteLine();

      // Change the current culture to ar-EG with the Um Al Qura calendar.
      CultureInfo arEG = CultureInfo.CreateSpecificCulture("ar-EG");
      arEG.DateTimeFormat.Calendar = new UmAlQuraCalendar();
      Thread.CurrentThread.CurrentCulture = arEG;
      Console.WriteLine($"Earliest supported date by {GetCalendarName(arEG)} calendar: {arEG.DateTimeFormat.Calendar.MinSupportedDateTime:d}");
      // Attempt to display the date.
      Console.WriteLine(dat.ToString());
      Console.WriteLine();

      // Change the current culture to en-US.
      Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("en-US");
      Console.WriteLine(dat.ToString(jaJP));
      Console.WriteLine(dat.ToString(arEG));
      Console.WriteLine(dat.ToString("d"));
   }

   private static string GetCalendarName(CultureInfo culture)
   {
      Calendar cal = culture.DateTimeFormat.Calendar;
      return cal.GetType().Name.Replace("System.Globalization.", "").Replace("Calendar", "");
   }
}
// The example displays the following output:
//       Earliest supported date by Japanese calendar: 明治 1/9/8
//       0001-01-01T00:00:00
//
//       Earliest supported date by UmAlQura calendar: 01/01/18
//       0001-01-01T00:00:00
//
//       0001-01-01T00:00:00
//       0001-01-01T00:00:00
//       1/1/0001
```
