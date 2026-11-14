---
title: "Standard date and time format strings (part 8 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/standard-date-and-time-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Standard date and time format strings (part 8 of 16)

### The round-trip ("O", "o") format specifier

The "O" or "o" standard format specifier represents a custom date and time format string using a pattern that preserves time zone information and emits a result string that complies with ISO 8601. For `System.DateTime` values, this format specifier is designed to preserve date and time values along with the `System.DateTime.Kind` property in text. The formatted string can be parsed back by using the `System.DateTime.Parse(System.String,System.IFormatProvider,System.Globalization.DateTimeStyles)` or `System.DateTime.ParseExact*` method if the `styles` parameter is set to `System.Globalization.DateTimeStyles.RoundtripKind`.

For `System.DateOnly` values, this format specifier produces a date-only ISO 8601 string in the format "yyyy-MM-dd". For `System.TimeOnly` values, it produces a time-only ISO 8601 string in the format "HH:mm:ss.fffffff".

The "O" or "o" standard format specifier corresponds to the "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffK" custom format string for `System.DateTime` values and to the "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffzzz" custom format string for `System.DateTimeOffset` values. In this string, the pairs of single quotation marks that delimit individual characters, such as the hyphens, the colons, and the letter "T", indicate that the individual character is a literal that cannot be changed. The apostrophes do not appear in the output string.

The "O" or "o" standard format specifier (and the "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffK"  custom format string) takes advantage of the three ways that ISO 8601 represents time zone information to preserve the `System.DateTime.Kind` property of `System.DateTime` values:

- The time zone component of `System.DateTimeKind.Local` date and time values is an offset from UTC (for example, +01:00, -07:00). All `System.DateTimeOffset` values are also represented in this format.

- The time zone component of `System.DateTimeKind.Utc` date and time values uses "Z" (which stands for zero offset) to represent UTC.

- `System.DateTimeKind.Unspecified` date and time values have no time zone information.

Because the "O" or "o" standard format specifier conforms to an international standard, the formatting or parsing operation that uses the specifier always uses the invariant culture and the Gregorian calendar.

Strings that are passed to the `Parse`, `TryParse`, `ParseExact`, and `TryParseExact` methods of `System.DateTime`, `System.DateTimeOffset`, `System.DateOnly`, and `System.TimeOnly` can be parsed by using the "O" or "o" format specifier if they are in one of these formats. In the case of `System.DateTime` objects, the parsing overload that you call should also include a `styles` parameter with a value of `System.Globalization.DateTimeStyles.RoundtripKind`. Note that if you call a parsing method with the custom format string that corresponds to the "O" or "o" format specifier, you won't get the same results as "O" or "o". This is because parsing methods that use a custom format string can't parse the string representation of date and time values that lack a time zone component or use "Z" to indicate UTC.

The following example uses the "o" format specifier to display a series of `System.DateTime` values and a `System.DateTimeOffset` value on a system in the U.S. Pacific Time zone.

```csharp
using System;

public class Example
{
   public static void Main()
   {
       DateTime dat = new DateTime(2009, 6, 15, 13, 45, 30,
                                   DateTimeKind.Unspecified);
       Console.WriteLine($"{dat} ({dat.Kind}) --> {dat:O}");

       DateTime uDat = new DateTime(2009, 6, 15, 13, 45, 30,
                                    DateTimeKind.Utc);
       Console.WriteLine($"{uDat} ({uDat.Kind}) --> {uDat:O}");

       DateTime lDat = new DateTime(2009, 6, 15, 13, 45, 30,
                                    DateTimeKind.Local);
       Console.WriteLine($"{lDat} ({lDat.Kind}) --> {lDat:O}\n");

       DateTimeOffset dto = new DateTimeOffset(lDat);
       Console.WriteLine($"{dto} --> {dto:O}");
   }
}
// The example displays the following output:
//    6/15/2009 1:45:30 PM (Unspecified) --> 2009-06-15T13:45:30.0000000
//    6/15/2009 1:45:30 PM (Utc) --> 2009-06-15T13:45:30.0000000Z
//    6/15/2009 1:45:30 PM (Local) --> 2009-06-15T13:45:30.0000000-07:00
//
//    6/15/2009 1:45:30 PM -07:00 --> 2009-06-15T13:45:30.0000000-07:00
```

The following example uses the "o" format specifier to create a formatted string, and then restores the original date and time value by calling a date and time `Parse` method.

```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      // Round-trip DateTime values.
      DateTime originalDate, newDate;
      string dateString;
      // Round-trip a local time.
      originalDate = DateTime.SpecifyKind(new DateTime(2008, 4, 10, 6, 30, 0), DateTimeKind.Local);
      dateString = originalDate.ToString("o");
      newDate = DateTime.Parse(dateString, null, DateTimeStyles.RoundtripKind);
      Console.WriteLine($"Round-tripped {originalDate} {originalDate.Kind} to {newDate} {newDate.Kind}.");
      // Round-trip a UTC time.
      originalDate = DateTime.SpecifyKind(new DateTime(2008, 4, 12, 9, 30, 0), DateTimeKind.Utc);
      dateString = originalDate.ToString("o");
      newDate = DateTime.Parse(dateString, null, DateTimeStyles.RoundtripKind);
      Console.WriteLine($"Round-tripped {originalDate} {originalDate.Kind} to {newDate} {newDate.Kind}.");
      // Round-trip time in an unspecified time zone.
      originalDate = DateTime.SpecifyKind(new DateTime(2008, 4, 13, 12, 30, 0), DateTimeKind.Unspecified);
      dateString = originalDate.ToString("o");
      newDate = DateTime.Parse(dateString, null, DateTimeStyles.RoundtripKind);
      Console.WriteLine($"Round-tripped {originalDate} {originalDate.Kind} to {newDate} {newDate.Kind}.");

      // Round-trip a DateTimeOffset value.
      DateTimeOffset originalDTO = new DateTimeOffset(2008, 4, 12, 9, 30, 0, new TimeSpan(-8, 0, 0));
      dateString = originalDTO.ToString("o");
      DateTimeOffset newDTO = DateTimeOffset.Parse(dateString, null, DateTimeStyles.RoundtripKind);
      Console.WriteLine($"Round-tripped {originalDTO} to {newDTO}.");
      // The example displays the following output:
      //    Round-tripped 4/10/2008 6:30:00 AM Local to 4/10/2008 6:30:00 AM Local.
      //    Round-tripped 4/12/2008 9:30:00 AM Utc to 4/12/2008 9:30:00 AM Utc.
      //    Round-tripped 4/13/2008 12:30:00 PM Unspecified to 4/13/2008 12:30:00 PM Unspecified.
      //    Round-tripped 4/12/2008 9:30:00 AM -08:00 to 4/12/2008 9:30:00 AM -08:00.
   }
}
```

Back to table
