---
title: "Standard numeric format strings (part 6 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/standard-numeric-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Standard numeric format strings (part 6 of 10)

## General format specifier (G)

The general ("G") format specifier converts a number to the more compact of either fixed-point or scientific notation, depending on the type of the number and whether a precision specifier is present. The precision specifier defines the maximum number of significant digits that can appear in the result string. If the precision specifier is omitted or zero, the type of the number determines the default precision, as indicated in the following table.

|Numeric type                               | Default precision |
|-------------------------------------------|-------------------|
|`System.Byte` or `System.SByte`  |3 digits|
|`System.Int16` or `System.UInt16`|5 digits|
|`System.Int32` or `System.UInt32`|10 digits|
|`System.Int64`                        |19 digits|
|`System.UInt64`                       |20 digits|
|`System.Numerics.BigInteger`          |Unlimited (same as "R")|
|`System.Half`                         |Smallest round-trippable number of digits to represent the number|
|`System.Single`                       |Smallest round-trippable number of digits to represent the number (in .NET Framework, G7 is the default)|
|`System.Double`                       |Smallest round-trippable number of digits to represent the number (in .NET Framework, G15 is the default)|
|`System.Decimal`                      |Smallest round-trippable number of digits to represent the number|

Fixed-point notation is used if the exponent that would result from expressing the number in scientific notation is greater than -5 and less than the precision specifier; otherwise, scientific notation is used. The result contains a decimal point if required, and trailing zeros after the decimal point are omitted. If the precision specifier is present and the number of significant digits in the result exceeds the specified precision, the excess trailing digits are removed by rounding.

However, if the number is a `System.Decimal` and the precision specifier is omitted, fixed-point notation is always used and trailing zeros are preserved.

If scientific notation is used, the exponent in the result is prefixed with "E" if the format specifier is "G", or "e" if the format specifier is "g". The exponent contains a minimum of two digits. This differs from the format for scientific notation that is produced by the exponential format specifier, which includes a minimum of three digits in the exponent.

When used with a `System.Double` value, the "G17" format specifier ensures that the original `System.Double` value successfully round-trips. This is because `System.Double` is an IEEE 754-2008-compliant double-precision (`binary64`) floating-point number that gives up to 17 significant digits of precision. On .NET Framework, we recommend its use instead of the "R" format specifier, since in some cases "R" fails to successfully round-trip double-precision floating point values.

When used with a `System.Single` value, the "G9" format specifier ensures that the original `System.Single` value successfully round-trips. This is because `System.Single` is an IEEE 754-2008-compliant single-precision (`binary32`) floating-point number that gives up to nine significant digits of precision. For performance reasons, we recommend its use instead of the "R" format specifier.

The result string is affected by the formatting information of the current `System.Globalization.NumberFormatInfo` object. The following table lists the `System.Globalization.NumberFormatInfo` properties that control the formatting of the result string.

|NumberFormatInfo property|Description|
|-------------------------------|-----------------|
|`System.Globalization.NumberFormatInfo.NegativeSign*`|Defines the string that indicates that a number is negative.|
|`System.Globalization.NumberFormatInfo.NumberDecimalSeparator*`|Defines the string that separates integral digits from decimal digits.|
|`System.Globalization.NumberFormatInfo.PositiveSign*`|Defines the string that indicates that an exponent is positive.|

The following example formats assorted floating-point values with the general format specifier:
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
      // Displays 3.<example-card-number>
      Console.WriteLine(value.ToString("r",
                        CultureInfo.CreateSpecificCulture("fr-FR")));
      // Displays 3,<example-card-number>
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
