---
title: "Custom numeric format strings (part 4 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/custom-numeric-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom numeric format strings (part 4 of 11)

## The "." custom specifier

The "." custom format specifier inserts a localized decimal separator into the result string. The first period in the format string determines the location of the decimal separator in the formatted value; any additional periods are ignored. If the format specifier ends with a "." only the significant digits are formatted into the result string.

The character that is used as the decimal separator in the result string is not always a period; it is determined by the `System.Globalization.NumberFormatInfo.NumberDecimalSeparator` property of the `System.Globalization.NumberFormatInfo` object that controls formatting.

The following example uses the "." format specifier to define the location of the decimal point in several result strings.

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
