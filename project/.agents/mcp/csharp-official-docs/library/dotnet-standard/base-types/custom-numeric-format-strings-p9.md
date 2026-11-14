---
title: "Custom numeric format strings (part 9 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/custom-numeric-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom numeric format strings (part 9 of 11)

## The "E" and "e" custom specifiers

If any of the strings "E", "E+", "E-", "e", "e+", or "e-" are present in the format string and are followed immediately by at least one zero, the number is formatted by using scientific notation with an "E" or "e" inserted between the number and the exponent. The number of zeros following the scientific notation indicator determines the minimum number of digits to output for the exponent. The "E+" and "e+" formats indicate that a plus sign or minus sign should always precede the exponent. The "E", "E-", "e", or "e-" formats indicate that a sign character should precede only negative exponents.

The following example formats several numeric values using the specifiers for scientific notation.

```csharp
﻿using System;
using System.Globalization;

public class CustomNumericFormatting
{
   public static void Main()
   {
      Console.WriteLine("Zero Placeholder:");
      ShowZeroPlaceholder();
      Console.WriteLine();
      Console.WriteLine("Digit Placeholder:");
      ShowDigitPlaceholder();
      Console.WriteLine();
      Console.WriteLine("Decimal Point:");
      ShowDecimalPoint();
      Console.WriteLine();
      Console.WriteLine("Thousand Specifier:");
      ShowThousandSpecifier();
      Console.WriteLine();
      Console.WriteLine("Scaling Specifier:");
      ShowScalingSpecifier();
      Console.WriteLine();
      Console.WriteLine("Percentage Placeholder:");
      ShowPercentagePlaceholder();
      Console.WriteLine();
      Console.WriteLine("Scientific Notation:");
      ShowScientificNotation();
      Console.WriteLine();
      Console.WriteLine("Section Specifier:");
      ShowSectionSpecifier();
      Console.WriteLine();
      Console.WriteLine("Per Mille Placeholder:");
      ShowPerMillePlaceholder();
   }

   private static void ShowZeroPlaceholder()
   {
      double value;

      value = 123;
      Console.WriteLine(value.ToString("00000"));
      Console.WriteLine(String.Format("{0:00000}", value));
      // Displays 00123

      value = 1.2;
      Console.WriteLine(value.ToString("0.00", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                        "{0:0.00}", value));
      // Displays 1.20

      Console.WriteLine(value.ToString("00.00", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:00.00}", value));
      // Displays 01.20

      CultureInfo daDK = CultureInfo.CreateSpecificCulture("da-DK");
      Console.WriteLine(value.ToString("00.00", daDK));
      Console.WriteLine(String.Format(daDK, "{0:00.00}", value));
      // Displays 01,20

      value = .56;
      Console.WriteLine(value.ToString("0.0", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:0.0}", value));
      // Displays 0.6

      value = 1234567890;
      Console.WriteLine(value.ToString("0,0", CultureInfo.InvariantCulture));	
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:0,0}", value));	
      // Displays 1,234,567,890

      CultureInfo elGR = CultureInfo.CreateSpecificCulture("el-GR");
      Console.WriteLine(value.ToString("0,0", elGR));	
     Console.WriteLine(String.Format(elGR, "{0:0,0}", value));	
      // Displays 1.234.567.890

      value = 1234567890.123456;
      Console.WriteLine(value.ToString("0,0.0", CultureInfo.InvariantCulture));	
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:0,0.0}", value));	
      // Displays 1,234,567,890.1

      value = 1234.567890;
      Console.WriteLine(value.ToString("0,0.00", CultureInfo.InvariantCulture));	
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:0,0.00}", value));	
      // Displays 1,234.57
   }

   private static void ShowDigitPlaceholder()
   {
      double value;

      value = 1.2;
      Console.WriteLine(value.ToString("#.##", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:#.##}", value));
      // Displays 1.2

      value = 123;
      Console.WriteLine(value.ToString("#####"));
      Console.WriteLine(String.Format("{0:#####}", value));
      // Displays 123

      value = 123456;
      Console.WriteLine(value.ToString("[##-##-##]"));
      Console.WriteLine(String.Format("{0:[##-##-##]}", value));
	   // Displays [12-34-56]

      value = 1234567890;
      Console.WriteLine(value.ToString("#"));
      Console.WriteLine(String.Format("{0:#}", value));
      // Displays 1234567890

      Console.WriteLine(value.ToString("(###) ###-####"));
      Console.WriteLine(String.Format("{0:(###) ###-####}", value));
      // Displays (123) 456-7890
   }

   private static void ShowDecimalPoint()
   {
      double value;

      value = 1.2;
      Console.WriteLine(value.ToString("0.00", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:0.00}", value));
      // Displays 1.20

      Console.WriteLine(value.ToString("00.00", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:00.00}", value));
      // Displays 01.20

      Console.WriteLine(value.ToString("00.00",
                        CultureInfo.CreateSpecificCulture("da-DK")));
      Console.WriteLine(String.Format(CultureInfo.CreateSpecificCulture("da-DK"),
                        "{0:00.00}", value));
      // Displays 01,20

      value = .086;
      Console.WriteLine(value.ToString("#0.##%", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:#0.##%}", value));
      // Displays 8.6%

      value = 86000;
      Console.WriteLine(value.ToString("0.###E+0", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                        "{0:0.###E+0}", value));
	   // Displays 8.6E+4
   }

   private static void ShowThousandSpecifier()
   {
      double value = 1234567890;
      Console.WriteLine(value.ToString("#,#", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:#,#}", value));
      // Displays 1,234,567,890

      Console.WriteLine(value.ToString("#,##0,,", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:#,##0,,}", value));
      // Displays 1,235      	
   }

   private static void ShowScalingSpecifier()
   {
      double value = 1234567890;
      Console.WriteLine(value.ToString("#,,", CultureInfo.InvariantCulture));	
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:#,,}", value));	
      // Displays 1235

      Console.WriteLine(value.ToString("#,,,", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:#,,,}", value));
	  // Displays 1

      Console.WriteLine(value.ToString("#,##0,,", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:#,##0,,}", value));
	  // Displays 1,235
   }

   private static void ShowPercentagePlaceholder()
   {
      double value = .086;
      Console.WriteLine(value.ToString("#0.##%", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:#0.##%}", value));
      // Displays 8.6%
   }

   private static void ShowScientificNotation()
   {
      double value = 86000;
      Console.WriteLine(value.ToString("0.###E+0", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:0.###E+0}", value));
      // Displays 8.6E+4

      Console.WriteLine(value.ToString("0.###E+000", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:0.###E+000}", value));
      // Displays 8.6E+004

      Console.WriteLine(value.ToString("0.###E-000", CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:0.###E-000}", value));
      // Displays 8.6E004
   }

   private static void ShowSectionSpecifier()
   {
      double posValue = 1234;
      double negValue = -1234;
      double zeroValue = 0;

      string fmt2 = "##;(##)";
      string fmt3 = "##;(##);**Zero**";

      Console.WriteLine(posValue.ToString(fmt2));
      Console.WriteLine(String.Format("{0:" + fmt2 + "}", posValue));
      // Displays 1234

      Console.WriteLine(negValue.ToString(fmt2));
      Console.WriteLine(String.Format("{0:" + fmt2 + "}", negValue));
      // Displays (1234)

      Console.WriteLine(zeroValue.ToString(fmt3));
      Console.WriteLine(String.Format("{0:" + fmt3 + "}", zeroValue));
      // Displays **Zero**
   }

   private static void ShowPerMillePlaceholder()
   {
      double value = .00354;
      string perMilleFmt = "#0.## " + '\u2030';
      Console.WriteLine(value.ToString(perMilleFmt, CultureInfo.InvariantCulture));
      Console.WriteLine(String.Format(CultureInfo.InvariantCulture,
                                      "{0:" + perMilleFmt + "}", value));
      // Displays 3.54‰
   }
}
```

Back to table

## The "\\" escape character

The "#", "0", ".", ",", "%", and "‰" symbols in a format string are interpreted as format specifiers rather than as literal characters. Depending on their position in a custom format string, the uppercase and lowercase "E" as well as the + and - symbols may also be interpreted as format specifiers.

To prevent a character from being interpreted as a format specifier, you can precede it with a backslash, which is the escape character. The escape character signifies that the following character is a character literal that should be included in the result string unchanged.

To include a backslash in a result string, you must escape it with another backslash (`\\`).

> **Note:**
> Some compilers, such as the C++ and C# compilers, may also interpret a single backslash character as an escape character. To ensure that a string is interpreted correctly when formatting, you can use the verbatim string literal character (the @ character) before the string in C#, or add another backslash character before each backslash in C# and C++. The following C# example illustrates both approaches.

The following example uses the escape character to prevent the formatting operation from interpreting the "#", "0", and "\\" characters as either escape characters or format specifiers. The C# examples uses an additional backslash to ensure that a backslash is interpreted as a literal character.

```csharp
﻿using System;

public class Escape
{
   public static void Main()
   {
      int value = 123;
      Console.WriteLine(value.ToString("\\#\\#\\# ##0 dollars and \\0\\0 cents \\#\\#\\#"));
      Console.WriteLine(String.Format("{0:\\#\\#\\# ##0 dollars and \\0\\0 cents \\#\\#\\#}",
                                      value));
      // Displays ### 123 dollars and 00 cents ###

      Console.WriteLine(value.ToString(@"\#\#\# ##0 dollars and \0\0 cents \#\#\#"));
      Console.WriteLine(String.Format(@"{0:\#\#\# ##0 dollars and \0\0 cents \#\#\#}",
                                      value));
      // Displays ### 123 dollars and 00 cents ###

      Console.WriteLine(value.ToString("\\\\\\\\\\\\ ##0 dollars and \\0\\0 cents \\\\\\\\\\\\"));
      Console.WriteLine(String.Format("{0:\\\\\\\\\\\\ ##0 dollars and \\0\\0 cents \\\\\\\\\\\\}",
                                      value));
      // Displays \\\ 123 dollars and 00 cents \\\

      Console.WriteLine(value.ToString(@"\\\\\\ ##0 dollars and \0\0 cents \\\\\\"));
      Console.WriteLine(String.Format(@"{0:\\\\\\ ##0 dollars and \0\0 cents \\\\\\}",
                                      value));
      // Displays \\\ 123 dollars and 00 cents \\\
   }
}
```

Back to table
