---
title: "How to: Extract the Day of the Week from a Specific Date"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/how-to-extract-the-day-of-the-week-from-a-specific-date.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Extract the Day of the Week from a Specific Date

.NET makes it easy to determine the ordinal day of the week for a particular date, and to display the localized weekday name for a particular date. An enumerated value that indicates the day of the week corresponding to a particular date is available from the `System.DateTime.DayOfWeek*` or `System.DateTimeOffset.DayOfWeek` property. In contrast, retrieving the weekday name is a formatting operation that can be performed by calling a formatting method, such as a date and time value's `ToString` method or the `System.String.Format*` method. This article shows how to perform these formatting operations.

## Extract a number indicating the day of the week

1. Use the static `System.DateTime.Parse*` or `System.DateTimeOffset.Parse*` method to convert the string representation of a date to a `System.DateTime` or a `System.DateTimeOffset` value.

1. Use the `System.DateTime.DayOfWeek*` or `System.DateTimeOffset.DayOfWeek` property to retrieve a `System.DayOfWeek` value that indicates the day of the week.

1. If necessary, cast (in C#) or convert (in Visual Basic) the `System.DayOfWeek` value to an integer.

 The following example displays an integer that represents the day of the week of a specific date:

 ```csharp
using System;

public class Example
{
   public static void Main()
   {
      DateTime dateValue = new DateTime(2008, 6, 11);
      Console.WriteLine((int) dateValue.DayOfWeek);
   }
}
// The example displays the following output:
//       3
```

## Extract the abbreviated weekday name

1. Use the static `System.DateTime.Parse*` or `System.DateTimeOffset.Parse*` method to convert the string representation of a date to a `System.DateTime` or a `System.DateTimeOffset` value.

1. You can extract the abbreviated weekday name of the current culture or of a specific culture:

    1. To extract the abbreviated weekday name for the current culture, call the date and time value's `System.DateTime.ToString(System.String)` or `System.DateTimeOffset.ToString(System.String)` instance method, and pass the string `ddd` as the `format` parameter. The following example illustrates the call to the `System.DateTime.ToString(System.String)` method:

         ```csharp
using System;

public class Example
{
   public static void Main()
   {
      DateTime dateValue = new DateTime(2008, 6, 11);
      Console.WriteLine(dateValue.ToString("ddd"));
   }
}
// The example displays the following output:
 //       Wed
```

    1. To extract the abbreviated weekday name for a specific culture, call the date and time value's `System.DateTime.ToString(System.String,System.IFormatProvider)` or `System.DateTimeOffset.ToString(System.String,System.IFormatProvider)` instance method. Pass the string `ddd` as the `format` parameter. Pass <example-value> a `System.Globalization.CultureInfo` or a `System.Globalization.DateTimeFormatInfo` object that represents the culture whose weekday name you want to retrieve as the `provider` parameter. The following code illustrates a call to the `System.DateTime.ToString(System.String,System.IFormatProvider)` method using a `System.Globalization.CultureInfo` object that represents the fr-FR culture:

         ```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      DateTime dateValue = new DateTime(2008, 6, 11);
      Console.WriteLine(dateValue.ToString("ddd",
                        new CultureInfo("fr-FR")));
   }
}
// The example displays the following output:
//       mer.
```

## Extract the full weekday name

1. Use the static `System.DateTime.Parse*` or `System.DateTimeOffset.Parse*` method to convert the string representation of a date to a `System.DateTime` or a `System.DateTimeOffset` value.

1. You can extract the full weekday name of the current culture or of a specific culture:

    1. To extract the weekday name for the current culture, call the date and time value's `System.DateTime.ToString(System.String)` or `System.DateTimeOffset.ToString(System.String)` instance method, and pass the string `dddd` as the `format` parameter. The following example illustrates the call to the `System.DateTime.ToString(System.String)` method:

         ```csharp
using System;

public class Example
{
   public static void Main()
   {
      DateTime dateValue = new DateTime(2008, 6, 11);
      Console.WriteLine(dateValue.ToString("dddd"));
   }
}
// The example displays the following output:
//       Wednesday
```

    1. To extract the weekday name for a specific culture, call the date and time value's `System.DateTime.ToString(System.String,System.IFormatProvider)` or `System.DateTimeOffset.ToString(System.String,System.IFormatProvider)` instance method. Pass the string `dddd` as the `format` parameter. Pass <example-value> a `System.Globalization.CultureInfo` or a `System.Globalization.DateTimeFormatInfo` object that represents the culture whose weekday name you want to retrieve as the `provider` parameter. The following code illustrates a call to the `System.DateTime.ToString(System.String,System.IFormatProvider)` method using a `System.Globalization.CultureInfo` object that represents the es-ES culture:

         ```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      DateTime dateValue = new DateTime(2008, 6, 11);
      Console.WriteLine(dateValue.ToString("dddd",
                        new CultureInfo("es-ES")));
   }
}
// The example displays the following output:
//       miércoles.
```

## Example

 The following example illustrates calls to the `System.DateTime.DayOfWeek*` and `System.DateTimeOffset.DayOfWeek` properties to retrieve the number that represents the day of the week for a particular date. It also includes calls to the `System.DateTime.ToString*` and `System.DateTimeOffset.ToString*` methods to extract the abbreviated weekday name and the full weekday name.

 ```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      string dateString = "6/11/2007";
      DateTime dateValue;
      DateTimeOffset dateOffsetValue;

      try
      {
         DateTimeFormatInfo dateTimeFormats;
         // Convert date representation to a date value
         dateValue = DateTime.Parse(dateString, CultureInfo.InvariantCulture);
         dateOffsetValue = new DateTimeOffset(dateValue,
                                      TimeZoneInfo.Local.GetUtcOffset(dateValue));

         // Convert date representation to a number indicating the day of week
         Console.WriteLine((int) dateValue.DayOfWeek);
         Console.WriteLine((int) dateOffsetValue.DayOfWeek);

         // Display abbreviated weekday name using current culture
         Console.WriteLine(dateValue.ToString("ddd"));
         Console.WriteLine(dateOffsetValue.ToString("ddd"));

         // Display full weekday name using current culture
         Console.WriteLine(dateValue.ToString("dddd"));
         Console.WriteLine(dateOffsetValue.ToString("dddd"));

         // Display abbreviated weekday name for de-DE culture
         Console.WriteLine(dateValue.ToString("ddd", new CultureInfo("de-DE")));
         Console.WriteLine(dateOffsetValue.ToString("ddd",
                                                     new CultureInfo("de-DE")));

         // Display abbreviated weekday name with de-DE DateTimeFormatInfo object
         dateTimeFormats = new CultureInfo("de-DE").DateTimeFormat;
         Console.WriteLine(dateValue.ToString("ddd", dateTimeFormats));
         Console.WriteLine(dateOffsetValue.ToString("ddd", dateTimeFormats));

         // Display full weekday name for fr-FR culture
         Console.WriteLine(dateValue.ToString("ddd", new CultureInfo("fr-FR")));
         Console.WriteLine(dateOffsetValue.ToString("ddd",
                                                    new CultureInfo("fr-FR")));

         // Display abbreviated weekday name with fr-FR DateTimeFormatInfo object
         dateTimeFormats = new CultureInfo("fr-FR").DateTimeFormat;
         Console.WriteLine(dateValue.ToString("dddd", dateTimeFormats));
         Console.WriteLine(dateOffsetValue.ToString("dddd", dateTimeFormats));
      }
      catch (FormatException)
      {
         Console.WriteLine($"Unable to convert {dateString} to a date.");
      }
   }
}
// The example displays the following output:
//       1
//       1
//       Mon
//       Mon
//       Monday
//       Monday
//       Mo
//       Mo
//       Mo
//       Mo
//       lun.
//       lun.
//       lundi
//       lundi
```

 Individual languages might provide functionality that duplicates or supplements the functionality provided by .NET. For example, Visual Basic <example-value> two such functions:

- `Weekday`, which returns a number that indicates the day of the week of a particular date. It considers the ordinal value of the first day of the week to be one, whereas the `System.DateTime.DayOfWeek` property considers it to be zero.

- `WeekdayName`, which returns the name of the week in the current culture that corresponds to a particular weekday number.

 The following example illustrates the use of the Visual Basic `Weekday` and `WeekdayName` functions:

 You can also use the value returned by the `System.DateTime.DayOfWeek` property to retrieve the weekday name of a particular date. This process requires only a call to the `System.Enum.ToString*` method on the `System.DayOfWeek` value returned by the property. However, this technique doesn't produce a localized weekday name for the current culture, as the following example illustrates:

 ```csharp
using System;
using System.Globalization;
using System.Threading;

public class Example
{
   public static void Main()
   {
      // Change current culture to fr-FR
      CultureInfo originalCulture = Thread.CurrentThread.CurrentCulture;
      Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");

      DateTime dateValue = new DateTime(2008, 6, 11);
      // Display the DayOfWeek string representation
      Console.WriteLine(dateValue.DayOfWeek.ToString());
      // Restore original current culture
      Thread.CurrentThread.CurrentCulture = originalCulture;
   }
}
// The example displays the following output:
//       Wednesday
```

## See also

- Standard Date and Time Format Strings
- Custom Date and Time Format Strings
