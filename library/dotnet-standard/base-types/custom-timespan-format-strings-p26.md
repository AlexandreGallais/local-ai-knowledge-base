---
title: "Custom TimeSpan format strings (part 26 of 26)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/custom-timespan-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom TimeSpan format strings (part 26 of 26)

##  The `"FFFFFFF"` custom format specifier

The `"FFFFFFF"` custom format specifier (with seven `F` characters) outputs the ten-millionths of a second (or the fractional number of ticks) in a time interval. If there are any trailing fractional zeros, they aren't included in the result string. In a parsing operation that calls the `System.TimeSpan.ParseExact*` or `System.TimeSpan.TryParseExact*` method, the presence of the seven fractional digits in the input string is optional.

The following example uses the `"FFFFFFF"` custom format specifier to display the fractional parts of a second in a `System.TimeSpan` value. It also uses this custom format specifier in a parsing operation.

```csharp
using System;

public class Example
{
   public static void Main()
   {
      FSpecifier();
      Console.WriteLine("-----");
      FFSpecifier();
      Console.WriteLine("-----");
      FFFSpecifier();
      Console.WriteLine("-----");
      FFFFSpecifier();
      Console.WriteLine("-----");
      FFFFFSpecifier();
      Console.WriteLine("-----");
      FFFFFFSpecifier();
      Console.WriteLine("-----");
      F7Specifier();
   }

   private static void FSpecifier()
   {
      Console.WriteLine("Formatting:");
      TimeSpan ts1 = TimeSpan.Parse("0:0:3.669");
      Console.WriteLine($"{ts1} ('%F') --> {ts1:%F}");

      TimeSpan ts2 = TimeSpan.Parse("0:0:3.091");
      Console.WriteLine($"{ts2} ('ss\\.F') --> {ts2:ss\\.F}");
      Console.WriteLine();

      Console.WriteLine("Parsing:");
      string[] inputs = { "0:0:03.", "0:0:03.1", "0:0:03.12" };
      string fmt = @"h\:m\:ss\.F";
      TimeSpan ts3;

      foreach (string input in inputs) {
         if (TimeSpan.TryParseExact(input, fmt, null, out ts3))
            Console.WriteLine($"{input} ('{fmt}') --> {ts3}");
         else
            Console.WriteLine($"Cannot parse {input} with '{fmt}'.");
      }
      // The example displays the following output:
      //       Formatting:
      //       00:00:03.6690000 ('%F') --> 6
      //       00:00:03.0910000 ('ss\.F') --> 03.
      //
      //       Parsing:
      //       0:0:03. ('h\:m\:ss\.F') --> 00:00:03
      //       0:0:03.1 ('h\:m\:ss\.F') --> 00:00:03.1000000
      //       Cannot parse 0:0:03.12 with 'h\:m\:ss\.F'.
   }

   private static void FFSpecifier()
   {
      Console.WriteLine("Formatting:");
      TimeSpan ts1 = TimeSpan.Parse("0:0:3.697");
      Console.WriteLine($"{ts1} ('FF') --> {ts1:FF}");

      TimeSpan ts2 = TimeSpan.Parse("0:0:3.809");
      Console.WriteLine($"{ts2} ('ss\\.FF') --> {ts2:ss\\.FF}");
      Console.WriteLine();

      Console.WriteLine("Parsing:");
      string[] inputs = { "0:0:03.", "0:0:03.1", "0:0:03.127" };
      string fmt = @"h\:m\:ss\.FF";
      TimeSpan ts3;

      foreach (string input in inputs) {
         if (TimeSpan.TryParseExact(input, fmt, null, out ts3))
            Console.WriteLine($"{input} ('{fmt}') --> {ts3}");
         else
            Console.WriteLine($"Cannot parse {input} with '{fmt}'.");
      }
      // The example displays the following output:
      //       Formatting:
      //       00:00:03.6970000 ('FF') --> 69
      //       00:00:03.8090000 ('ss\.FF') --> 03.8
      //
      //       Parsing:
      //       0:0:03. ('h\:m\:ss\.FF') --> 00:00:03
      //       0:0:03.1 ('h\:m\:ss\.FF') --> 00:00:03.1000000
      //       Cannot parse 0:0:03.127 with 'h\:m\:ss\.FF'.
   }

   private static void FFFSpecifier()
   {
      Console.WriteLine("Formatting:");
      TimeSpan ts1 = TimeSpan.Parse("0:0:3.6974");
      Console.WriteLine($"{ts1} ('FFF') --> {ts1:FFF}");

      TimeSpan ts2 = TimeSpan.Parse("0:0:3.8009");
      Console.WriteLine($"{ts2} ('ss\\.FFF') --> {ts2:ss\\.FFF}");
      Console.WriteLine();

      Console.WriteLine("Parsing:");
      string[] inputs = { "0:0:03.", "0:0:03.12", "0:0:03.1279" };
      string fmt = @"h\:m\:ss\.FFF";
      TimeSpan ts3;

      foreach (string input in inputs) {
         if (TimeSpan.TryParseExact(input, fmt, null, out ts3))
            Console.WriteLine($"{input} ('{fmt}') --> {ts3}");
         else
            Console.WriteLine($"Cannot parse {input} with '{fmt}'.");
      }
      // The example displays the following output:
      //       Formatting:
      //       00:00:03.6974000 ('FFF') --> 697
      //       00:00:03.8009000 ('ss\.FFF') --> 03.8
      //
      //       Parsing:
      //       0:0:03. ('h\:m\:ss\.FFF') --> 00:00:03
      //       0:0:03.12 ('h\:m\:ss\.FFF') --> 00:00:03.1200000
      //       Cannot parse 0:0:03.1279 with 'h\:m\:ss\.FFF'.
   }

   private static void FFFFSpecifier()
   {
      Console.WriteLine("Formatting:");
      TimeSpan ts1 = TimeSpan.Parse("0:0:3.69749");
      Console.WriteLine($"{ts1} ('FFFF') --> {ts1:FFFF}");

      TimeSpan ts2 = TimeSpan.Parse("0:0:3.80009");
      Console.WriteLine($"{ts2} ('ss\\.FFFF') --> {ts2:ss\\.FFFF}");
      Console.WriteLine();

      Console.WriteLine("Parsing:");
      string[] inputs = { "0:0:03.", "0:0:03.12", "0:0:03.12795" };
      string fmt = @"h\:m\:ss\.FFFF";
      TimeSpan ts3;

      foreach (string input in inputs) {
         if (TimeSpan.TryParseExact(input, fmt, null, out ts3))
            Console.WriteLine($"{input} ('{fmt}') --> {ts3}");
         else
            Console.WriteLine($"Cannot parse {input} with '{fmt}'.");
      }
      // The example displays the following output:
      //       Formatting:
      //       00:00:03.6974900 ('FFFF') --> 6974
      //       00:00:03.8000900 ('ss\.FFFF') --> 03.8
      //
      //       Parsing:
      //       0:0:03. ('h\:m\:ss\.FFFF') --> 00:00:03
      //       0:0:03.12 ('h\:m\:ss\.FFFF') --> 00:00:03.1200000
      //       Cannot parse 0:0:03.12795 with 'h\:m\:ss\.FFFF'.
   }

   private static void FFFFFSpecifier()
   {
      Console.WriteLine("Formatting:");
      TimeSpan ts1 = TimeSpan.Parse("0:0:3.697497");
      Console.WriteLine($"{ts1} ('FFFFF') --> {ts1:FFFFF}");

      TimeSpan ts2 = TimeSpan.Parse("0:0:3.800009");
      Console.WriteLine($"{ts2} ('ss\\.FFFFF') --> {ts2:ss\\.FFFFF}");
      Console.WriteLine();

      Console.WriteLine("Parsing:");
      string[] inputs = { "0:0:03.", "0:0:03.12", "0:0:03.127956" };
      string fmt = @"h\:m\:ss\.FFFFF";
      TimeSpan ts3;

      foreach (string input in inputs) {
         if (TimeSpan.TryParseExact(input, fmt, null, out ts3))
            Console.WriteLine($"{input} ('{fmt}') --> {ts3}");
         else
            Console.WriteLine($"Cannot parse {input} with '{fmt}'.");
      }
      // The example displays the following output:
      //       Formatting:
      //       00:00:03.6974970 ('FFFFF') --> 69749
      //       00:00:03.8000090 ('ss\.FFFFF') --> 03.8
      //
      //       Parsing:
      //       0:0:03. ('h\:m\:ss\.FFFF') --> 00:00:03
      //       0:0:03.12 ('h\:m\:ss\.FFFF') --> 00:00:03.1200000
      //       Cannot parse 0:0:03.127956 with 'h\:m\:ss\.FFFF'.
   }

   private static void FFFFFFSpecifier()
   {
      Console.WriteLine("Formatting:");
      TimeSpan ts1 = TimeSpan.Parse("0:0:3.6974974");
      Console.WriteLine($"{ts1} ('FFFFFF') --> {ts1:FFFFFF}");

      TimeSpan ts2 = TimeSpan.Parse("0:0:3.8000009");
      Console.WriteLine($"{ts2} ('ss\\.FFFFFF') --> {ts2:ss\\.FFFFFF}");
      Console.WriteLine();

      Console.WriteLine("Parsing:");
      string[] inputs = { "0:0:03.", "0:0:03.12", "0:0:03.1279569" };
      string fmt = @"h\:m\:ss\.FFFFFF";
      TimeSpan ts3;

      foreach (string input in inputs) {
         if (TimeSpan.TryParseExact(input, fmt, null, out ts3))
            Console.WriteLine($"{input} ('{fmt}') --> {ts3}");
         else
            Console.WriteLine($"Cannot parse {input} with '{fmt}'.");
      }
      // The example displays the following output:
      //       Formatting:
      //       00:00:03.6974974 ('FFFFFF') --> 697497
      //       00:00:03.8000009 ('ss\.FFFFFF') --> 03.8
      //
      //       Parsing:
      //       0:0:03. ('h\:m\:ss\.FFFFFF') --> 00:00:03
      //       0:0:03.12 ('h\:m\:ss\.FFFFFF') --> 00:00:03.1200000
      //       Cannot parse 0:0:03.1279569 with 'h\:m\:ss\.FFFFFF'.
   }

   private static void F7Specifier()
   {
      Console.WriteLine("Formatting:");
      TimeSpan ts1 = TimeSpan.Parse("0:0:3.6974974");
      Console.WriteLine($"{ts1} ('FFFFFFF') --> {ts1:FFFFFFF}");

      TimeSpan ts2 = TimeSpan.Parse("0:0:3.9500000");
      Console.WriteLine($"{ts2} ('ss\\.FFFFFFF') --> {ts2:ss\\.FFFFFFF}");
      Console.WriteLine();

      Console.WriteLine("Parsing:");
      string[] inputs = { "0:0:03.", "0:0:03.12", "0:0:03.1279569" };
      string fmt = @"h\:m\:ss\.FFFFFFF";
      TimeSpan ts3;

      foreach (string input in inputs) {
         if (TimeSpan.TryParseExact(input, fmt, null, out ts3))
            Console.WriteLine($"{input} ('{fmt}') --> {ts3}");
         else
            Console.WriteLine($"Cannot parse {input} with '{fmt}'.");
      }
      // The example displays the following output:
      //    Formatting:
      //    00:00:03.6974974 ('FFFFFFF') --> 6974974
      //    00:00:03.9500000 ('ss\.FFFFFFF') --> 03.95
      //
      //    Parsing:
      //    0:0:03. ('h\:m\:ss\.FFFFFFF') --> 00:00:03
      //    0:0:03.12 ('h\:m\:ss\.FFFFFFF') --> 00:00:03.1200000
      //    0:0:03.1279569 ('h\:m\:ss\.FFFFFFF') --> 00:00:03.1279569
   }
}
```

Back to table

## Other characters

Any other unescaped character in a format string, including a white-space character, is interpreted as a custom format specifier. In most cases, the presence of any other unescaped character results in a `System.FormatException`.

There are two ways to include a literal character in a format string:

- Enclose it in single quotation marks (the literal string delimiter).

- Precede it with a backslash ("\\"), which is interpreted as an escape character. This means that, in C#, the format string must either be @-quoted, or the literal character must be preceded by an additional backslash.

  In some cases, you may have to use conditional logic to include an escaped literal in a format string. The following example uses conditional logic to include a sign symbol for negative time intervals.

  ```csharp
using System;

public class Example
{
   public static void Main()
   {
      TimeSpan result = new DateTime(2010, 01, 01) - DateTime.Now;
      String fmt = (result < TimeSpan.Zero ?  "\\-" : "") + "dd\\.hh\\:mm";

      Console.WriteLine(result.ToString(fmt));
      Console.WriteLine($"Interval: {result.ToString(fmt)}");
   }
}
// The example displays output like the following:
//       -5582.12:21
//       Interval: -5582.12:21
```

.NET doesn't define a grammar for separators in time intervals. This means that the separators between days and hours, hours and minutes, minutes and seconds, and seconds and fractions of a second must all be treated as character literals in a format string.

The following example uses both the escape character and the single quote to define a custom format string that includes the word `"minutes"` in the output string.

```csharp
﻿using System;

public class Example
{
   public static void Main()
   {
      TimeSpan interval = new TimeSpan(0, 32, 45);
      // Escape literal characters in a format string.
      string fmt = @"mm\:ss\ \m\i\n\u\t\e\s";
      Console.WriteLine(interval.ToString(fmt));
      // Delimit literal characters in a format string with the ' symbol.
      fmt = "mm':'ss' minutes'";
      Console.WriteLine(interval.ToString(fmt));
      // The example displays the following output:
      //       32:45 minutes
      //       32:45 minutes
   }
}
```

Back to table

## See also

- Formatting Types
- Standard TimeSpan Format Strings
