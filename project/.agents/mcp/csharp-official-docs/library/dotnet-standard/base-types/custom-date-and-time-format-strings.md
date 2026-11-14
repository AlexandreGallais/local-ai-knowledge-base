---
title: "Custom date and time format strings (part 1 of 36)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/custom-date-and-time-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom date and time format strings

A date and time format string defines the text representation of a `System.DateTime` or `System.DateTimeOffset` value that results from a formatting operation. It can also define the representation of a date and time value that is required in a parsing operation in order to successfully convert the string to a date and time. A custom format string consists of one or more custom date and time format specifiers. Any string that is not a standard date and time format string is interpreted as a custom date and time format string.

> **Tip:**
> You can download the **Formatting Utility**, a .NET Core Windows Forms application that lets you apply format strings to either numeric or date and time values and displays the result string. Source code is available for C# and Visual Basic.

Custom date and time format strings can be used with both `System.DateTime` and `System.DateTimeOffset` values.

In formatting operations, custom date and time format strings can be used either with the `ToString` method of a date and time instance or with a method that supports composite formatting. The following example illustrates both uses.

```csharp
﻿using System;

public class Example
{
    public static void Main()
    {
        DateTime thisDate1 = new DateTime(2011, 6, 10);
        Console.WriteLine("Today is " + thisDate1.ToString("MMMM dd, yyyy") + ".");

        DateTimeOffset thisDate2 = new DateTimeOffset(2011, 6, 10, 15, 24, 16,
                                                      TimeSpan.Zero);
        Console.WriteLine($"The current date and time: {thisDate2:MM/dd/yy H:mm:ss zzz}");

        // The example displays the following output:
        //    Today is June 10, 2011.
        //    The current date and time: 06/10/11 15:24:16 +00:00
    }
}
```

In parsing operations, custom date and time format strings can be used with the `System.DateTime.ParseExact*`, `System.DateTime.TryParseExact*`, `System.DateTimeOffset.ParseExact*`, and `System.DateTimeOffset.TryParseExact*` methods. These methods require that an input string conforms exactly to a particular pattern for the parse operation to succeed. The following example illustrates a call to the `System.DateTimeOffset.ParseExact(System.String,System.String,System.IFormatProvider)` method to parse a date that must include a day, a month, and a two-digit year.

```csharp
using System;
using System.Globalization;

public class Example1
{
    public static void Main()
    {
        string[] dateValues = { "30-12-2011", "12-30-2011",
                              "30-12-11", "12-30-11" };
        string pattern = "MM-dd-yy";
        DateTime parsedDate;

        foreach (var dateValue in dateValues)
        {
            if (DateTime.TryParseExact(dateValue, pattern, null,
                                      DateTimeStyles.None, out parsedDate))
                Console.WriteLine($"Converted '{dateValue}' to {parsedDate:d}.");
            else
                Console.WriteLine($"Unable to convert '{dateValue}' to a date and time.");
        }
    }
}

// The example displays the following output:
//    Unable to convert '30-12-2011' to a date and time.
//    Unable to convert '12-30-2011' to a date and time.
//    Unable to convert '30-12-11' to a date and time.
//    Converted '12-30-11' to 12/30/2011.
```

 The following table describes the custom date and time format specifiers and displays a result string produced by each format specifier. By default, result strings reflect the formatting conventions of the en-US culture. If a particular format specifier produces a localized result string, the example also notes the culture to which the result string applies. For more information about using custom date and time format strings, see the Notes section.

| Format specifier | Description | Examples |
|--|--|--|
| "d" | The day of the month, from 1 to 31. More information: The "d" Custom Format Specifier. | 2009-06-01T13:45:30 -> 1 2009-06-15T13:45:30 -> 15 |
| "dd" | The day of the month, from 01 to 31. More information: The "dd" Custom Format Specifier. | 2009-06-01T13:45:30 -> 01 2009-06-15T13:45:30 -> 15 |
| "ddd" | The abbreviated name of the day of the week. More information: The "ddd" Custom Format Specifier. | 2009-06-15T13:45:30 -> Mon (en-US) 2009-06-15T13:45:30 -> Пн (ru-RU) 2009-06-15T13:45:30 -> lun. (fr-FR) |
| "dddd" | The full name of the day of the week. More information: The "dddd" Custom Format Specifier. | 2009-06-15T13:45:30 -> Monday (en-US) 2009-06-15T13:45:30 -> понедельник (ru-RU) 2009-06-15T13:45:30 -> lundi (fr-FR) |
| "f" | The tenths of a second in a date and time value. More information: The "f" Custom Format Specifier. | 2009-06-15T13:45:30.6170000 -> 6 2009-06-15T13:45:30.05 -> 0 |
| "ff" | The hundredths of a second in a date and time value. More information: The "ff" Custom Format Specifier. | 2009-06-15T13:45:30.6170000 -> 61 2009-06-15T13:45:30.0050000 -> 00 |
| "fff" | The milliseconds in a date and time value. More information: The "fff" Custom Format Specifier. | 6/15/2009 13:45:30.617 -> 617 6/15/2009 13:45:30.0005 -> 000 |
| "ffff" | The ten thousandths of a second in a date and time value. More information: The "ffff" Custom Format Specifier. | 2009-06-15T13:45:30.6175000 -> 6175 2009-06-15T13:45:30.0000500  -> 0000 |
| "fffff" | The hundred thousandths of a second in a date and time value. More information: The "fffff" Custom Format Specifier. | 2009-06-15T13:45:30.6175400 -> 61754 6/15/2009 13:45:30.000005 -> 00000 |
| "ffffff" | The millionths of a second in a date and time value. More information: The "ffffff" Custom Format Specifier. | 2009-06-15T13:45:30.6175420 -> 617542 2009-06-15T13:45:30.0000005 -> 000000 |
| "fffffff" | The ten millionths of a second in a date and time value. More information: The "fffffff" Custom Format Specifier. | 2009-06-15T13:45:30.6175425 -> 6175425 2009-06-15T13:45:30.0001150 -> 0001150 |
| "F" | If non-zero, the tenths of a second in a date and time value. More information: The "F" Custom Format Specifier. | 2009-06-15T13:45:30.6170000 -> 6 2009-06-15T13:45:30.0500000 -> (no output) |
| "FF" | If non-zero, the hundredths of a second in a date and time value. More information: The "FF" Custom Format Specifier. | 2009-06-15T13:45:30.6170000 -> 61 2009-06-15T13:45:30.0050000 -> (no output) |
| "FFF" | If non-zero, the milliseconds in a date and time value. More information: The "FFF" Custom Format Specifier. | 2009-06-15T13:45:30.6170000 -> 617 2009-06-15T13:45:30.0005000 -> (no output) |
| "FFFF" | If non-zero, the ten thousandths of a second in a date and time value. More information: The "FFFF" Custom Format Specifier. | 2009-06-15T13:45:30.5275000 -> 5275 2009-06-15T13:45:30.0000500 -> (no output) |
| "FFFFF" | If non-zero, the hundred thousandths of a second in a date and time value. More information: The "FFFFF" Custom Format Specifier. | 2009-06-15T13:45:30.6175400 -> 61754 2009-06-15T13:45:30.0000050 -> (no output) |
| "FFFFFF" | If non-zero, the millionths of a second in a date and time value. More information: The "FFFFFF" Custom Format Specifier. | 2009-06-15T13:45:30.6175420 -> 617542 2009-06-15T13:45:30.0000005 -> (no output) |
| "FFFFFFF" | If non-zero, the ten millionths of a second in a date and time value. More information: The "FFFFFFF" Custom Format Specifier. | 2009-06-15T13:45:30.6175425 -> 6175425 2009-06-15T13:45:30.0001150 -> 000115 |
| "g", "gg" | The period or era. More information: The "g" or "gg" Custom Format Specifier. | 2009-06-15T13:45:30.6170000 -> A.D. |
| "h" | The hour, using a 12-hour clock from 1 to 12. More information: The "h" Custom Format Specifier. | 2009-06-15T01:45:30 -> 1 2009-06-15T13:45:30 -> 1 |
| "hh" | The hour, using a 12-hour clock from 01 to 12. More information: The "hh" Custom Format Specifier. | 2009-06-15T01:45:30 -> 01 2009-06-15T13:45:30 -> 01 |
| "H" | The hour, using a 24-hour clock from 0 to 23. More information: The "H" Custom Format Specifier. | 2009-06-15T01:45:30 -> 1 2009-06-15T13:45:30 -> 13 |
| "HH" | The hour, using a 24-hour clock from 00 to 23. More information: The "HH" Custom Format Specifier. | 2009-06-15T01:45:30 -> 01 2009-06-15T13:45:30 -> 13 |
| "K" | Time zone information. More information: The "K" Custom Format Specifier. | With `System.DateTime` values: 2009-06-15T13:45:30, Kind Unspecified -> 2009-06-15T13:45:30, Kind Utc -> Z 2009-06-15T13:45:30, Kind Local -> -07:00 (depends on local computer settings) With `System.DateTimeOffset` values: 2009-06-15T01:45:30-07:00 --> -07:00 2009-06-15T08:45:30+00:00 --> +00:00 |
| "m" | The minute, from 0 to 59. More information: The "m" Custom Format Specifier. | 2009-06-15T01:09:30 -> 9 2009-06-15T13:29:30 -> 29 |
| "mm" | The minute, from 00 to 59. More information: The "mm" Custom Format Specifier. | 2009-06-15T01:09:30 -> 09 2009-06-15T01:45:30 -> 45 |
| "M" | The month, from 1 to 12. More information: The "M" Custom Format Specifier. | 2009-06-15T13:45:30 -> 6 |
| "MM" | The month, from 01 to 12. More information: The "MM" Custom Format Specifier. | 2009-06-15T13:45:30 -> 06 |
| "MMM" | The abbreviated name of the month. When used with "d" or "dd" specifiers, uses genitive names, except with .NET Framework. (This is known issue that's fixed in .NET.) More information: The "MMM" Custom Format Specifier. | 2009-06-15T13:45:30 -> Jun (en-US) 2009-06-15T13:45:30 -> juin (fr-FR) 2009-06-15T13:45:30 -> Jun (zu-ZA) |
| "MMMM" | The full name of the month. When used with "d" or "dd" specifiers, uses genitive names. More information: The "MMMM" Custom Format Specifier. | 2009-06-15T13:45:30 -> June (en-US) 2009-06-15T13:45:30 -> juni (da-DK) 2009-06-15T13:45:30 -> uJuni (zu-ZA) |
| "s" | The second, from 0 to 59. More information: The "s" Custom Format Specifier. | 2009-06-15T13:45:09 -> 9 |
| "ss" | The second, from 00 to 59. More information: The "ss" Custom Format Specifier. | 2009-06-15T13:45:09 -> 09 |
| "t" | The first character of the AM/PM designator. More information: The "t" Custom Format Specifier. | 2009-06-15T13:45:30 -> P (en-US) 2009-06-15T13:45:30 -> 午 (ja-JP) 2009-06-15T13:45:30 ->  (fr-FR) |
| "tt" | The AM/PM designator. More information: The "tt" Custom Format Specifier. | 2009-06-15T13:45:30 -> PM (en-US) 2009-06-15T13:45:30 -> 午後 (ja-JP) 2009-06-15T13:45:30 ->  (fr-FR) |
| "y" | The year, from 0 to 99. More information: The "y" Custom Format Specifier. | 0001-01-01T00:00:00 -> 1 0900-01-01T00:00:00 -> 0 1900-01-01T00:00:00 -> 0 2009-06-15T13:45:30 -> 9 2019-06-15T13:45:30 -> 19 |
| "yy" | The year, from 00 to 99. More information: The "yy" Custom Format Specifier. | 0001-01-01T00:00:00 -> 01 0900-01-01T00:00:00 -> 00 1900-01-01T00:00:00 -> 00 2019-06-15T13:45:30 -> 19 |
| "yyy" | The year, with a minimum of three digits. More information: The "yyy" Custom Format Specifier. | 0001-01-01T00:00:00 -> 001 0900-01-01T00:00:00 -> 900 1900-01-01T00:00:00 -> 1900 2009-06-15T13:45:30 -> 2009 |
| "yyyy" | The year as a four-digit number. More information: The "yyyy" Custom Format Specifier. | 0001-01-01T00:00:00 -> 0001 0900-01-01T00:00:00 -> 0900 1900-01-01T00:00:00 -> 1900 2009-06-15T13:45:30 -> 2009 |
| "yyyyy" | The year as a five-digit number. More information: The "yyyyy" Custom Format Specifier. | 0001-01-01T00:00:00 -> 00001 2009-06-15T13:45:30 -> 02009 |
| "z" | Hours offset from UTC, with no leading zeros. More information: The "z" Custom Format Specifier. | 2009-06-15T13:45:30-07:00 -> -7 |
| "zz" | Hours offset from UTC, with a leading zero for a single-digit value. More information: The "zz" Custom Format Specifier. | 2009-06-15T13:45:30-07:00 -> -07 |
| "zzz" | Hours and minutes offset from UTC. More information: The "zzz" Custom Format Specifier. | 2009-06-15T13:45:30-07:00 -> -07:00 |
| ":" | The time separator. More information: The ":" Custom Format Specifier. | 2009-06-15T13:45:30 -> : (en-US) 2009-06-15T13:45:30 -> . (it-IT) 2009-06-15T13:45:30 -> : (ja-JP) |
| "/" | The date separator. More Information: The "/" Custom Format Specifier. | 2009-06-15T13:45:30 -> / (en-US) 2009-06-15T13:45:30 -> - (ar-DZ) 2009-06-15T13:45:30 -> . (tr-TR) |
| "*string*" '*string*' | Literal string delimiter. More information: Character literals. | 2009-06-15T13:45:30 ("arr:" h:m t) -> arr: 1:45 P 2009-06-15T13:45:30 ('arr:' h:m t) -> arr: 1:45 P |
| % | Defines the following character as a custom format specifier. More information: Using Single Custom Format Specifiers. | 2009-06-15T13:45:30 (%h) -> 1 |
| &#92; | The escape character. More information: Character literals and Using the Escape Character. | 2009-06-15T13:45:30 (h \h) -> 1 h |
| Any other character | The character is copied to the result string unchanged. More information: Character literals. | 2009-06-15T01:45:30 (arr hh:mm t) -> arr 01:45 A |

The following sections provide additional information about each custom date and time format specifier. Unless otherwise noted, each specifier produces an identical string representation regardless of whether it's used with a `System.DateTime` value or a `System.DateTimeOffset` value.
