---
title: "Standard date and time format strings (part 15 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/standard-date-and-time-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Standard date and time format strings (part 15 of 16)

## Partial date formats

This group includes the following formats:

- The month ("M", "m") format specifier
- The year month ("Y", "y") format specifier

### The month ("M", "m") format specifier

The "M" or "m" standard format specifier represents a custom date and time format string that is defined by the current `System.Globalization.DateTimeFormatInfo.MonthDayPattern` property. For example, the custom format string for the invariant culture is "MMMM dd".

The following table lists the `System.Globalization.DateTimeFormatInfo` object properties that control the formatting of the returned string.

|Property|Description|
|--------------|-----------------|
|`System.Globalization.DateTimeFormatInfo.MonthDayPattern*`|Defines the overall format of the result string.|
|`System.Globalization.DateTimeFormatInfo.MonthNames*`|Defines the localized month names that can appear in the result string.|

The following example uses the "m" format specifier to display a date and time value.

```csharp
﻿using System;
using System.Globalization;

public class Class1
{
   public static void Main()
   {
      Console.Clear();
      Console.WriteLine();
      Console.WriteLine("***d Specifier***");
      ShowdSpecifier();
      Console.WriteLine();
      Console.WriteLine("***D Specifier***");
      ShowDSpecifier();
      Console.WriteLine();
      Console.WriteLine("***f Specifier***");
      ShowfSpecifier();
      Console.WriteLine();
      Console.WriteLine("***F Specifier***");
      ShowFSpecifier();
      Console.WriteLine();
      Console.WriteLine("***g Specifier***");
      ShowgSpecifier();
      Console.WriteLine();
      Console.WriteLine("***G Specifier***");
      ShowGSpecifier();
      Console.WriteLine();
      Console.WriteLine("***M Specifier***");
      ShowMSpecifier();
      Console.WriteLine();
      Console.WriteLine("***O Specifier***");
      ShowOSpecifier();
      Console.WriteLine();
      Console.WriteLine("***R Specifier***");
      ShowRSpecifier();
      Console.WriteLine();
      Console.WriteLine("***S Specifier***");
      ShowSSpecifier();
      Console.WriteLine();
      Console.WriteLine("***t Specifier***");
      ShowtSpecifier();
      Console.WriteLine();
      Console.WriteLine("***T Specifier***");
      ShowTSpecifier();
      Console.WriteLine();
      Console.WriteLine("***u Specifier***");
      ShowuSpecifier();
      Console.WriteLine();
      Console.WriteLine("***U Specifier***");
      ShowUSpecifier();
      Console.WriteLine();
      Console.WriteLine("***Y Specifier***");
      ShowYSpecifier();
   }

   private static void ShowdSpecifier()
   {
      // d Format Specifier
      DateTime date1 = new DateTime(2008,4, 10);
      Console.WriteLine(date1.ToString("d", DateTimeFormatInfo.InvariantInfo));
      // Displays 04/10/2008
      Console.WriteLine(date1.ToString("d",
                        CultureInfo.CreateSpecificCulture("en-US")));
      // Displays 4/10/2008
      Console.WriteLine(date1.ToString("d",
                        CultureInfo.CreateSpecificCulture("en-NZ")));
      // Displays 10/04/2008
      Console.WriteLine(date1.ToString("d",
                        CultureInfo.CreateSpecificCulture("de-DE")));
      // Displays 10.04.2008
   }

   private static void ShowDSpecifier()
   {
      // D Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10);
      Console.WriteLine(date1.ToString("D",
                        CultureInfo.CreateSpecificCulture("en-US")));
      // Displays Thursday, April 10, 2008
      Console.WriteLine(date1.ToString("D",
                        CultureInfo.CreateSpecificCulture("pt-BR")));
      // Displays quinta-feira, 10 de abril de 2008
      Console.WriteLine(date1.ToString("D",
                        CultureInfo.CreateSpecificCulture("es-MX")));
      // Displays jueves, 10 de abril de 2008
   }

   private static void ShowfSpecifier()
   {
      // f Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("f",
                        CultureInfo.CreateSpecificCulture("en-US")));
      // Displays Thursday, April 10, 2008 6:30 AM
      Console.WriteLine(date1.ToString("f",
                        CultureInfo.CreateSpecificCulture("fr-FR")));
      // Displays jeudi 10 avril 2008 06:30
   }

   private static void ShowFSpecifier()
   {
      // F Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("F",
                        CultureInfo.CreateSpecificCulture("en-US")));
      // Displays Thursday, April 10, 2008 6:30:00 AM
      Console.WriteLine(date1.ToString("F",
                        CultureInfo.CreateSpecificCulture("fr-FR")));
      // Displays jeudi 10 avril 2008 06:30:00
   }

   private static void ShowgSpecifier()
   {
      // g Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("g",
                        DateTimeFormatInfo.InvariantInfo));
      // Displays 04/10/2008 06:30
      Console.WriteLine(date1.ToString("g",
                        CultureInfo.CreateSpecificCulture("en-us")));
      // Displays 4/10/2008 6:30 AM
      Console.WriteLine(date1.ToString("g",
                        CultureInfo.CreateSpecificCulture("fr-BE")));
      // Displays 10/04/2008 6:30
   }

   private static void ShowGSpecifier()
   {
      // G Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("G",
                        DateTimeFormatInfo.InvariantInfo));
      // Displays 04/10/2008 06:30:00
      Console.WriteLine(date1.ToString("G",
                        CultureInfo.CreateSpecificCulture("en-us")));
      // Displays 4/10/2008 6:30:00 AM
      Console.WriteLine(date1.ToString("G",
                        CultureInfo.CreateSpecificCulture("nl-BE")));
      // Displays 10/04/2008 6:30:00
   }

   private static void ShowMSpecifier()
   {
      // M Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("m",
                        CultureInfo.CreateSpecificCulture("en-us")));
      // Displays April 10
      Console.WriteLine(date1.ToString("m",
                        CultureInfo.CreateSpecificCulture("ms-MY")));
      // Displays 10 April
   }

   private static void ShowOSpecifier()
   {
      // O Format Specifier

      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      DateTimeOffset dateOffset = new DateTimeOffset(date1,
                                  TimeZoneInfo.Local.GetUtcOffset(date1));
      Console.WriteLine(date1.ToString("o"));
      // Displays 2008-04-10T06:30:00.0000000
      Console.WriteLine(dateOffset.ToString("o"));
      // Displays 2008-04-10T06:30:00.0000000-07:00
   }

   private static void ShowRSpecifier()
   {
      // R Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      DateTimeOffset dateOffset = new DateTimeOffset(date1,
                                  TimeZoneInfo.Local.GetUtcOffset(date1));
      Console.WriteLine(date1.ToUniversalTime().ToString("r"));
      // Displays Thu, 10 Apr 2008 13:30:00 GMT
      Console.WriteLine(dateOffset.ToUniversalTime().ToString("r"));
      // Displays Thu, 10 Apr 2008 13:30:00 GMT
   }

   private static void ShowSSpecifier()
   {
      // S Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("s"));
      // Displays 2008-04-10T06:30:00
   }

   private static void ShowtSpecifier()
   {
      // t Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("t",
                        CultureInfo.CreateSpecificCulture("en-us")));
      // Displays 6:30 AM
      Console.WriteLine(date1.ToString("t",
                        CultureInfo.CreateSpecificCulture("es-ES")));
      // Displays 6:30
   }

   private static void ShowTSpecifier()
   {
      // T Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("T",
                        CultureInfo.CreateSpecificCulture("en-us")));
      // Displays 6:30:00 AM
      Console.WriteLine(date1.ToString("T",
                        CultureInfo.CreateSpecificCulture("es-ES")));
      // Displays 6:30:00
   }

   private static void ShowuSpecifier()
   {
      // u Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToUniversalTime().ToString("u"));
      // Displays 2008-04-10 13:30:00Z
   }

   private static void ShowUSpecifier()
   {
      // U Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("U",
                        CultureInfo.CreateSpecificCulture("en-US")));
      // Displays Thursday, April 10, 2008 1:30:00 PM
      Console.WriteLine(date1.ToString("U",
                        CultureInfo.CreateSpecificCulture("sv-FI")));
      // Displays den 10 april 2008 13:30:00
   }

   private static void ShowYSpecifier()
   {
      // Y/y Format Specifier
      DateTime date1 = new DateTime(2008, 4, 10, 6, 30, 0);
      Console.WriteLine(date1.ToString("Y",
                        CultureInfo.CreateSpecificCulture("en-US")));
      // Displays April, 2008
      Console.WriteLine(date1.ToString("y",
                        CultureInfo.CreateSpecificCulture("af-ZA")));
      // Displays April 2008
   }
}
```

Back to table
