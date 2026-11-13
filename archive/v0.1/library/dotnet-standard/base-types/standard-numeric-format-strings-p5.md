---
title: "Standard numeric format strings (part 5 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/standard-numeric-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Standard numeric format strings (part 5 of 10)

## Fixed-point format specifier (F)

The fixed-point ("F") format specifier converts a number to a string of the form "-ddd.ddd…" where each "d" indicates a digit (0-9). The string starts with a minus sign if the number is negative.

The precision specifier indicates the desired number of decimal places. If the precision specifier is omitted, the current `System.Globalization.NumberFormatInfo.NumberDecimalDigits` property supplies the numeric precision.

The result string is affected by the formatting information of the current `System.Globalization.NumberFormatInfo` object. The following table lists the properties of the `System.Globalization.NumberFormatInfo` object that control the formatting of the result string.

|NumberFormatInfo property|Description|
|-------------------------------|-----------------|
|`System.Globalization.NumberFormatInfo.NegativeSign*`|Defines the string that indicates that a number is negative.|
|`System.Globalization.NumberFormatInfo.NumberDecimalSeparator*`|Defines the string that separates integral digits from decimal digits.|
|`System.Globalization.NumberFormatInfo.NumberDecimalDigits*`|Defines the default number of decimal digits. This value can be overridden by using the precision specifier.|

The following example formats a `System.Double` and an `System.Int32` value with the fixed-point format specifier:
```csharp
﻿using System;
using System.Globalization;

class formatting
{
   public static void Main()
   {
      Console.Clear();
      Console.WriteLine(CultureInfo.CurrentUICulture.Name);
      Console.WriteLine(CultureInfo.CurrentCulture.Name);
      Console.WriteLine();
      Console.WriteLine("Currency Format Specifier:");
      ShowCurrency();
      Console.WriteLine();
      Console.WriteLine("Decimal Format Specifier:");
      ShowDecimal();
      Console.WriteLine();
      Console.WriteLine("Exponentiation Format Specifier:");
      ShowExponentiation();
      Console.WriteLine();
      Console.WriteLine("Fixed Point Format Specifier:");
      ShowFixedPoint();
      Console.WriteLine();
      Console.WriteLine("'G' Format Specifier:");
      ShowGeneral();
      Console.WriteLine();
      Console.WriteLine("'N' Format Specifier:");
      ShowNumeric();
      Console.WriteLine();
      Console.WriteLine("Percent Format Specifier:");
      ShowPercent();
      Console.WriteLine();
      Console.WriteLine("Round-trip Format Specifier:");
      ShowRoundTrip();
      Console.WriteLine();
      Console.WriteLine("Hexadecimal Format Specifier:");
      ShowHex();
   }

   public static void ShowCurrency()
   {
      double value = 12345.6789;
      Console.WriteLine(value.ToString("C", CultureInfo.CurrentCulture));

      Console.WriteLine(value.ToString("C3", CultureInfo.CurrentCulture));

      Console.WriteLine(value.ToString("C3",
                        CultureInfo.CreateSpecificCulture("da-DK")));
      // The example displays the following output on a system whose
      // current culture is English (United States):
      //       $12,345.68
      //       $12,345.679
      //       12.345,679 kr
   }

   public static void ShowDecimal()
   {
      int value;

      value = 12345;
      Console.WriteLine(value.ToString("D"));
      // Displays 12345
      Console.WriteLine(value.ToString("D8"));
      // Displays 00012345

      value = -12345;
      Console.WriteLine(value.ToString("D"));
      // Displays -12345
      Console.WriteLine(value.ToString("D8"));
      // Displays -00012345
   }

   public static void ShowExponentiation()
   {
      double value = 12345.6789;
      Console.WriteLine(value.ToString("E", CultureInfo.InvariantCulture));
      // Displays 1.234568E+004

      Console.WriteLine(value.ToString("E10", CultureInfo.InvariantCulture));
      // Displays 1.2345678900E+004

      Console.WriteLine(value.ToString("e4", CultureInfo.InvariantCulture));
      // Displays 1.2346e+004

      Console.WriteLine(value.ToString("E",
                        CultureInfo.CreateSpecificCulture("fr-FR")));
      // Displays 1,234568E+004
   }

   public static void ShowFixedPoint()
   {
      int integerNumber;
      integerNumber = 17843;
      Console.WriteLine(integerNumber.ToString("F",
                        CultureInfo.InvariantCulture));
      // Displays 17843.00

      integerNumber = -29541;
      Console.WriteLine(integerNumber.ToString("F3",
                        CultureInfo.InvariantCulture));
      // Displays -29541.000

      double doubleNumber;
      doubleNumber = 18934.1879;
      Console.WriteLine(doubleNumber.ToString("F", CultureInfo.InvariantCulture));
      // Displays 18934.19

      Console.WriteLine(doubleNumber.ToString("F0", CultureInfo.InvariantCulture));
      // Displays 18934

      doubleNumber = -1898300.1987;
      Console.WriteLine(doubleNumber.ToString("F1", CultureInfo.InvariantCulture));
      // Displays -1898300.2

      Console.WriteLine(doubleNumber.ToString("F3",
                        CultureInfo.CreateSpecificCulture("es-ES")));
      // Displays -1898300,199
   }

   public static void ShowGeneral()
   {
      double number;

      number = 12345.6789;
      Console.WriteLine(number.ToString("G", CultureInfo.InvariantCulture));
      // Displays  12345.6789
      Console.WriteLine(number.ToString("G",
                        CultureInfo.CreateSpecificCulture("fr-FR")));
      // Displays 12345,6789

      Console.WriteLine(number.ToString("G7", CultureInfo.InvariantCulture));
      // Displays 12345.68

      number = .0000023;
      Console.WriteLine(number.ToString("G", CultureInfo.InvariantCulture));
      // Displays 2.3E-06
      Console.WriteLine(number.ToString("G",
                        CultureInfo.CreateSpecificCulture("fr-FR")));
      // Displays 2,3E-06

      number = .0023;
      Console.WriteLine(number.ToString("G", CultureInfo.InvariantCulture));
      // Displays 0.0023

      number = 1234;
      Console.WriteLine(number.ToString("G2", CultureInfo.InvariantCulture));
      // Displays 1.2E+03

      number = Math.PI;
      Console.WriteLine(number.ToString("G5", CultureInfo.InvariantCulture));
      // Displays 3.1416
   }

   public static void ShowNumeric()
   {
      double dblValue = -12445.6789;
      Console.WriteLine(dblValue.ToString("N", CultureInfo.InvariantCulture));
      // Displays -12,445.68
      Console.WriteLine(dblValue.ToString("N1",
                        CultureInfo.CreateSpecificCulture("sv-SE")));
      // Displays -12 445,7

      int intValue = 123456789;
      Console.WriteLine(intValue.ToString("N1", CultureInfo.InvariantCulture));
      // Displays 123,456,789.0
   }

   public static void ShowPercent()
   {
      double number = .2468013;
      Console.WriteLine(number.ToString("P", CultureInfo.InvariantCulture));
      // Displays 24.68 %
      Console.WriteLine(number.ToString("P",
                        CultureInfo.CreateSpecificCulture("hr-HR")));
      // Displays 24,68%
      Console.WriteLine(number.ToString("P1", CultureInfo.InvariantCulture));
      // Displays 24.7 %
   }

   public static void ShowRoundTrip()
   {
      double value;

      value = Math.PI;
      Console.WriteLine(value.ToString("r"));
      // Displays 3.1415926535897931
      Console.WriteLine(value.ToString("r",
                        CultureInfo.CreateSpecificCulture("fr-FR")));
      // Displays 3,1415926535897931
      value = 1.623e-21;
      Console.WriteLine(value.ToString("r"));
      // Displays 1.623E-21
   }

   public static void ShowHex()
   {
      int value;

      value = 0x2045e;
      Console.WriteLine(value.ToString("x"));
      // Displays 2045e
      Console.WriteLine(value.ToString("X"));
      // Displays 2045E
      Console.WriteLine(value.ToString("X8"));
      // Displays 0002045E

      value = 123456789;
      Console.WriteLine(value.ToString("X"));
      // Displays 75BCD15
      Console.WriteLine(value.ToString("X2"));
      // Displays 75BCD15
   }
}
```
