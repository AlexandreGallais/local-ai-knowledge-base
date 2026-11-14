---
title: "Standard date and time format strings (part 1 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/standard-date-and-time-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Standard date and time format strings

A standard date and time format string uses a single character as the format specifier to define the text representation of a `System.DateTime`, `System.DateTimeOffset`, `System.DateOnly`, or `System.TimeOnly` value. Any date and time format string that contains more than one character, including white space, is interpreted as a custom date and time format string. A standard or custom format string can be used in two ways:

- To define the string that results from a formatting operation.

- To define the text representation of a date and time value that can be converted to a `System.DateTime`, `System.DateTimeOffset`, `System.DateOnly`, or `System.TimeOnly` value by a parsing operation.

> **Tip:**
> You can download the **Formatting Utility**, a .NET Windows Forms application that lets you apply format strings to either numeric or date and time values and display the result string. Source code is available for C# and Visual Basic.

## Table of format specifiers

 The following table describes the standard date and time format specifiers. Unless otherwise noted, a particular standard date and time format specifier produces an identical string representation regardless of whether it is used with a `System.DateTime` or a `System.DateTimeOffset` value. Not all format specifiers can be used with `System.DateOnly` and `System.TimeOnly` values; for additional information, see DateOnly and TimeOnly formatting. For information about how regional settings on Windows and the current `System.Globalization.DateTimeFormatInfo` object can affect date and time formatting, see Control Panel Settings and DateTimeFormatInfo Properties.

|Format specifier|Description|Examples|
|----------------------|-----------------|--------------|
|"d"|Short date pattern. More information:The short date ("d") format specifier.|2009-06-15T13:45:30 -> 6/15/2009 (en-US) 2009-06-15T13:45:30 -> 15/06/2009 (fr-FR) 2009-06-15T13:45:30 -> 2009/06/15 (ja-JP) `System.DateOnly` (2009-06-15) -> 6/15/2009 (en-US)|
|"D"|Long date pattern. More information:The long date ("D") format specifier.|2009-06-15T13:45:30 -> Monday, June 15, 2009 (en-US) 2009-06-15T13:45:30 -> понедельник, 15 июня 2009 г. (ru-RU) 2009-06-15T13:45:30 -> Montag, 15. Juni 2009 (de-DE)|
|"f"|Full date/time pattern (short time). More information: The full date short time ("f") format specifier.|2009-06-15T13:45:30 -> Monday, June 15, 2009 1:45 PM (en-US) 2009-06-15T13:45:30 -> den 15 juni 2009 13:45 (sv-SE) 2009-06-15T13:45:30 -> Δευτέρα, 15 Ιουνίου 2009 1:45 μμ (el-GR)|
|"F"|Full date/time pattern (long time). More information: The full date long time ("F") format specifier.|2009-06-15T13:45:30 -> Monday, June 15, 2009 1:45:30 PM (en-US) 2009-06-15T13:45:30 -> den 15 juni 2009 13:45:30 (sv-SE) 2009-06-15T13:45:30 -> Δευτέρα, 15 Ιουνίου 2009 1:45:30 μμ (el-GR)|
|"g"|General date/time pattern (short time). More information: The general date short time ("g") format specifier.|2009-06-15T13:45:30 -> 6/15/2009 1:45 PM (en-US) 2009-06-15T13:45:30 -> 15/06/2009 13:45 (es-ES) 2009-06-15T13:45:30 -> 2009/6/15 13:45 (zh-CN)|
|"G"|General date/time pattern (long time). More information: The general date long time ("G") format specifier.|2009-06-15T13:45:30 -> 6/15/2009 1:45:30 PM (en-US) 2009-06-15T13:45:30 -> 15/06/2009 13:45:30 (es-ES) 2009-06-15T13:45:30 -> 2009/6/15 13:45:30 (zh-CN)|
|"M", "m"|Month/day pattern. More information: The month ("M", "m") format specifier.|2009-06-15T13:45:30 -> June 15 (en-US) 2009-06-15T13:45:30 -> 15. juni (da-DK) 2009-06-15T13:45:30 -> 15 Juni (id-ID)|
|"O", "o"|round-trip date/time pattern. More information: The round-trip ("O", "o") format specifier.|`System.DateTime` values: 2009-06-15T13:45:30 (DateTimeKind.Local) --> 2009-06-15T13:45:30.0000000-07:00 2009-06-15T13:45:30 (DateTimeKind.Utc) --> 2009-06-15T13:45:30.0000000Z 2009-06-15T13:45:30 (DateTimeKind.Unspecified) --> 2009-06-15T13:45:30.0000000 `System.DateTimeOffset` values: 2009-06-15T13:45:30-07:00 --> 2009-06-15T13:45:30.0000000-07:00 `System.DateOnly` values: 2009-06-15 --> 2009-06-15 `System.TimeOnly` values: 13:45:30 --> 13:45:30.0000000|
|"R", "r"|RFC1123 pattern. More information: The RFC1123 ("R", "r") format specifier.|`System.DateTimeOffset` input: 2009-06-15T13:45:30 -> Mon, 15 Jun 2009 20:45:30 GMT`System.DateTime` input: 2009-06-15T13:45:30 -> Mon, 15 Jun 2009 13:45:30 GMT |
|"s"|Sortable date/time pattern. More information: The sortable ("s") format specifier.|2009-06-15T13:45:30 (DateTimeKind.Local) -> 2009-06-15T13:45:30 2009-06-15T13:45:30 (DateTimeKind.Utc) -> 2009-06-15T13:45:30|
|"t"|Short time pattern. More information: The short time ("t") format specifier.|2009-06-15T13:45:30 -> 1:45 PM (en-US) 2009-06-15T13:45:30 -> 13:45 (hr-HR) 2009-06-15T13:45:30 -> 01:45 م (ar-EG) `System.TimeOnly` (13:45:30) -> 1:45 PM (en-US)|
|"T"|Long time pattern. More information: The long time ("T") format specifier.|2009-06-15T13:45:30 -> 1:45:30 PM (en-US) 2009-06-15T13:45:30 -> 13:45:30 (hr-HR) 2009-06-15T13:45:30 -> 01:45:30 م (ar-EG) `System.TimeOnly` (13:45:30) -> 1:45:30 PM (en-US)|
|"u"|Universal sortable date/time pattern. More information: The universal sortable ("u") format specifier.|With a `System.DateTime` value: 2009-06-15T13:45:30 -> 2009-06-15 13:45:30Z With a `System.DateTimeOffset` value: 2009-06-15T13:45:30 -> 2009-06-15 20:45:30Z|
|"U"|Universal full date/time pattern. More information: The universal full ("U") format specifier.|2009-06-15T13:45:30 -> Monday, June 15, 2009 8:45:30 PM (en-US) 2009-06-15T13:45:30 -> den 15 juni 2009 20:45:30 (sv-SE) 2009-06-15T13:45:30 -> Δευτέρα, 15 Ιουνίου 2009 8:45:30 μμ (el-GR)|
|"Y", "y"|Year month pattern. More information: The year month ("Y") format specifier.|2009-06-15T13:45:30 -> June 2009 (en-US) 2009-06-15T13:45:30 -> juni 2009 (da-DK) 2009-06-15T13:45:30 -> Juni 2009 (id-ID)|
|Any other single character|Unknown specifier.|Throws a runtime `System.FormatException`.|

## How standard format strings work

In a formatting operation, a standard format string is simply an alias for a custom format string. The advantage of using an alias to refer to a custom format string is that, although the alias remains invariant, the custom format string itself can vary. This is important because the string representations of date and time values typically vary by culture. For example, the "d" standard format string indicates that a date and time value is to be displayed using a short date pattern. For the invariant culture, this pattern is "MM/dd/yyyy". For the fr-FR culture, it is "dd/MM/yyyy". For the ja-JP culture, it is "yyyy/MM/dd".

If a standard format string in a formatting operation maps to a particular culture's custom format string, your application can define the specific culture whose custom format strings are used in one of these ways:

- You can use the default (or current) culture. The following example displays a date using the current culture's short date format. In this case, the current culture is en-US.

  ```csharp
﻿using System;
using System.Globalization;

public class Class1
{
   public static void Main()
   {
      ShowDefaultFormat();
      UseSpecificCulture();
      UseSpecificFormattingInfo();
   }

   private static void ShowDefaultFormat()
   {
      // Display using current (en-us) culture's short date format
      DateTime thisDate = new DateTime(2008, 3, 15);
      Console.WriteLine(thisDate.ToString("d"));           // Displays 3/15/2008
   }

    private static void UseSpecificCulture()
    {
      // Display using pt-BR culture's short date format
      DateTime thisDate = new DateTime(2008, 3, 15);
      CultureInfo culture = new CultureInfo("pt-BR");
      Console.WriteLine(thisDate.ToString("d", culture));  // Displays 15/3/2008
   }

   private static void UseSpecificFormattingInfo()
   {
      // Display using date format information from hr-HR culture
      DateTime thisDate = new DateTime(2008, 3, 15);
      DateTimeFormatInfo fmt = (new CultureInfo("hr-HR")).DateTimeFormat;
      Console.WriteLine(thisDate.ToString("d", fmt));      // Displays 15.3.2008
   }
}
```

- You can pass a `System.Globalization.CultureInfo` object representing the culture whose formatting is to be used to a method that has an `System.IFormatProvider` parameter. The following example displays a date using the short date format of the pt-BR culture.

  ```csharp
﻿using System;
using System.Globalization;

public class Class1
{
   public static void Main()
   {
      ShowDefaultFormat();
      UseSpecificCulture();
      UseSpecificFormattingInfo();
   }

   private static void ShowDefaultFormat()
   {
      // Display using current (en-us) culture's short date format
      DateTime thisDate = new DateTime(2008, 3, 15);
      Console.WriteLine(thisDate.ToString("d"));           // Displays 3/15/2008
   }

    private static void UseSpecificCulture()
    {
      // Display using pt-BR culture's short date format
      DateTime thisDate = new DateTime(2008, 3, 15);
      CultureInfo culture = new CultureInfo("pt-BR");
      Console.WriteLine(thisDate.ToString("d", culture));  // Displays 15/3/2008
   }

   private static void UseSpecificFormattingInfo()
   {
      // Display using date format information from hr-HR culture
      DateTime thisDate = new DateTime(2008, 3, 15);
      DateTimeFormatInfo fmt = (new CultureInfo("hr-HR")).DateTimeFormat;
      Console.WriteLine(thisDate.ToString("d", fmt));      // Displays 15.3.2008
   }
}
```

- You can pass a `System.Globalization.DateTimeFormatInfo` object that provides formatting information to a method that has an `System.IFormatProvider` parameter. The following example displays a date using the short date format from a `System.Globalization.DateTimeFormatInfo` object for the hr-HR culture.

  ```csharp
﻿using System;
using System.Globalization;

public class Class1
{
   public static void Main()
   {
      ShowDefaultFormat();
      UseSpecificCulture();
      UseSpecificFormattingInfo();
   }

   private static void ShowDefaultFormat()
   {
      // Display using current (en-us) culture's short date format
      DateTime thisDate = new DateTime(2008, 3, 15);
      Console.WriteLine(thisDate.ToString("d"));           // Displays 3/15/2008
   }

    private static void UseSpecificCulture()
    {
      // Display using pt-BR culture's short date format
      DateTime thisDate = new DateTime(2008, 3, 15);
      CultureInfo culture = new CultureInfo("pt-BR");
      Console.WriteLine(thisDate.ToString("d", culture));  // Displays 15/3/2008
   }

   private static void UseSpecificFormattingInfo()
   {
      // Display using date format information from hr-HR culture
      DateTime thisDate = new DateTime(2008, 3, 15);
      DateTimeFormatInfo fmt = (new CultureInfo("hr-HR")).DateTimeFormat;
      Console.WriteLine(thisDate.ToString("d", fmt));      // Displays 15.3.2008
   }
}
```

> **Note:**
> For information about customizing the patterns or strings used in formatting date and time values, see the `System.Globalization.NumberFormatInfo` class topic.

In some cases, the standard format string serves as a convenient abbreviation for a longer custom format string that is invariant. Four standard format strings fall into this category: "O" (or "o"), "R" (or "r"), "s", and "u". These strings correspond to custom format strings defined by the invariant culture. They produce string representations of date and time values that are intended to be identical across cultures. The following table provides information on these four standard date and time format strings.

|Standard format string|Defined by DateTimeFormatInfo.InvariantInfo property|Custom format string|
|----------------------------|----------------------------------------------------------|--------------------------|
|"O" or "o"|None|yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffK|
|"R" or "r"|`System.Globalization.DateTimeFormatInfo.RFC1123Pattern*`|ddd, dd MMM yyyy HH':'mm':'ss 'GMT'|
|"s"|`System.Globalization.DateTimeFormatInfo.SortableDateTimePattern`|yyyy'-'MM'-'dd'T'HH':'mm':'ss|
|"u"|`System.Globalization.DateTimeFormatInfo.UniversalSortableDateTimePattern*`|yyyy'-'MM'-'dd HH':'mm':'ss'Z'|

Standard format strings can also be used in parsing operations with the `System.DateTime.ParseExact*`, `System.DateTimeOffset.ParseExact*`, `System.DateOnly.ParseExact*`, and `System.TimeOnly.ParseExact*` methods, which require an input string to exactly conform to a particular pattern for the parse operation to succeed. Many standard format strings map to multiple custom format strings, so a date and time value can be represented in a variety of formats and the parse operation will still succeed. You can determine the custom format string or strings that correspond to a standard format string by calling the `System.Globalization.DateTimeFormatInfo.GetAllDateTimePatterns(System.Char)` method. The following example displays the custom format strings that map to the "d" (short date pattern) standard format string.

```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      Console.WriteLine("'d' standard format string:");
      foreach (var customString in DateTimeFormatInfo.CurrentInfo.GetAllDateTimePatterns('d'))
          Console.WriteLine($"   {customString}");
   }
}
// The example displays the following output:
//       'd' standard format string:
//          M/d/yyyy
//          M/d/yy
//          MM/dd/yy
//          MM/dd/yyyy
//          yy/MM/dd
//          yyyy-MM-dd
//          dd-MMM-yy
```

The following sections describe the standard format specifiers for `System.DateTime`, `System.DateTimeOffset`, `System.DateOnly`, and `System.TimeOnly` values.
