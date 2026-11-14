---
title: "Standard numeric format strings (part 2 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/standard-numeric-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Standard numeric format strings (part 2 of 10)

## Currency format specifier (C)

The "C" (or currency) format specifier converts a number to a string that represents a currency amount. The precision specifier indicates the desired number of decimal places in the result string. If the precision specifier is omitted, the default precision is defined by the `System.Globalization.NumberFormatInfo.CurrencyDecimalDigits` property.

If the value to be formatted has more than the specified or default number of decimal places, the fractional value is rounded in the result string. If the value to the right of the number of specified decimal places is 5 or greater, the last digit in the result string is rounded away from zero.

The result string is affected by the formatting information of the current `System.Globalization.NumberFormatInfo` object. The following table lists the `System.Globalization.NumberFormatInfo` properties that control the formatting of the returned string.

|NumberFormatInfo property|Description|
|-------------------------------|-----------------|
|`System.Globalization.NumberFormatInfo.CurrencyPositivePattern*`|Defines the placement of the currency symbol for positive values.|
|`System.Globalization.NumberFormatInfo.CurrencyNegativePattern*`|Defines the placement of the currency symbol for negative values, and specifies whether the negative sign is represented by parentheses or the `System.Globalization.NumberFormatInfo.NegativeSign` property.|
|`System.Globalization.NumberFormatInfo.NegativeSign*`|Defines the negative sign used if `System.Globalization.NumberFormatInfo.CurrencyNegativePattern*` indicates that parentheses are not used.|
|`System.Globalization.NumberFormatInfo.CurrencySymbol*`|Defines the currency symbol.|
|`System.Globalization.NumberFormatInfo.CurrencyDecimalDigits*`|Defines the default number of decimal digits in a currency value. This value can be overridden by using the precision specifier.|
|`System.Globalization.NumberFormatInfo.CurrencyDecimalSeparator*`|Defines the string that separates integral and decimal digits.|
|`System.Globalization.NumberFormatInfo.CurrencyGroupSeparator*`|Defines the string that separates groups of integral numbers.|
|`System.Globalization.NumberFormatInfo.CurrencyGroupSizes*`|Defines the number of integer digits that appear in a group.|

The following example formats a `System.Double` value with the currency format specifier:
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
