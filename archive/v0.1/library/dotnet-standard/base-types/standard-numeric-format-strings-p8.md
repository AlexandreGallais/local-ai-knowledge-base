---
title: "Standard numeric format strings (part 8 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/standard-numeric-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Standard numeric format strings (part 8 of 10)

## Percent format specifier (P)

The percent ("P") format specifier multiplies a number by 100 and converts it to a string that represents a percentage. The precision specifier indicates the desired number of decimal places. If the precision specifier is omitted, the default numeric precision supplied by the current `System.Globalization.NumberFormatInfo.PercentDecimalDigits` property is used.

The following table lists the `System.Globalization.NumberFormatInfo` properties that control the formatting of the returned string.

|NumberFormatInfo property|Description|
|-------------------------------|-----------------|
|`System.Globalization.NumberFormatInfo.PercentPositivePattern*`|Defines the placement of the percent symbol for positive values.|
|`System.Globalization.NumberFormatInfo.PercentNegativePattern*`|Defines the placement of the percent symbol and the negative symbol for negative values.|
|`System.Globalization.NumberFormatInfo.NegativeSign*`|Defines the string that indicates that a number is negative.|
|`System.Globalization.NumberFormatInfo.PercentSymbol*`|Defines the percent symbol.|
|`System.Globalization.NumberFormatInfo.PercentDecimalDigits*`|Defines the default number of decimal digits in a percentage value. This value can be overridden by using the precision specifier.|
|`System.Globalization.NumberFormatInfo.PercentDecimalSeparator*`|Defines the string that separates integral and decimal digits.|
|`System.Globalization.NumberFormatInfo.PercentGroupSeparator*`|Defines the string that separates groups of integral numbers.|
|`System.Globalization.NumberFormatInfo.PercentGroupSizes*`|Defines the number of integer digits that appear in a group.|

The following example formats floating-point values with the percent format specifier:
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

## Round-trip format specifier (R)

The round-trip ("R") format specifier attempts to ensure that a numeric value that is converted to a string is parsed back into the same numeric value. This format is supported only for the `System.Half`, `System.Single`, `System.Double`, and `System.Numerics.BigInteger` types.

In .NET Framework and in .NET Core versions earlier than 3.0, the "R" format specifier fails to successfully round-trip `System.Double` values in some cases. For both `System.Double` and `System.Single` values, the "R" format specifier offers relatively poor performance. Instead, we recommend that you use the "G17" format specifier for `System.Double` values and the "G9" format specifier to successfully round-trip `System.Single` values.

When a `System.Numerics.BigInteger` value is formatted using this specifier, its string representation contains all the significant digits in the `System.Numerics.BigInteger` value.

Although you can include a precision specifier, it is ignored. Round trips are given precedence over precision when using this specifier.
The result string is affected by the formatting information of the current `System.Globalization.NumberFormatInfo` object. The following table lists the `System.Globalization.NumberFormatInfo` properties that control the formatting of the result string.

|NumberFormatInfo property|Description|
|-------------------------------|-----------------|
|`System.Globalization.NumberFormatInfo.NegativeSign*`|Defines the string that indicates that a number is negative.|
|`System.Globalization.NumberFormatInfo.NumberDecimalSeparator*`|Defines the string that separates integral digits from decimal digits.|
|`System.Globalization.NumberFormatInfo.PositiveSign*`|Defines the string that indicates that an exponent is positive.|

The following example formats a `System.Numerics.BigInteger` value with the round-trip format specifier.
_Code sample not included: ../../../samples/snippets/standard/base-types/format-strings/biginteger-r.cs._

> **Important:**
> In some cases, `System.Double` values formatted with the "R" standard numeric format string do not successfully round-trip if compiled using the `/platform:x64` or `/platform:anycpu` switches and run on 64-bit systems. See the following paragraph for more information.

To work around the problem of `System.Double` values formatted with the "R" standard numeric format string not successfully round-tripping if compiled using the `/platform:x64` or `/platform:anycpu` switches and run on 64-bit systems, you can format `System.Double` values by using the "G17" standard numeric format string. The following example uses the "R" format string with a `System.Double` value that does not round-trip successfully, and also uses the "G17" format string to successfully round-trip the original value:

```csharp
using System;
using System.Globalization;

public class Example
{
   static void Main(string[] args)
   {
      Console.WriteLine("Attempting to round-trip a Double with 'R':");
      double initialValue = 0.6822871999174;
      string valueString = initialValue.ToString("R",
                                                 CultureInfo.InvariantCulture);
      double roundTripped = double.Parse(valueString,
                                         CultureInfo.InvariantCulture);
      Console.WriteLine($"{initialValue:R} = {roundTripped:R}: {initialValue.Equals(roundTripped)}\n");

      Console.WriteLine("Attempting to round-trip a Double with 'G17':");
      string valueString17 = initialValue.ToString("G17",
                                                   CultureInfo.InvariantCulture);
      double roundTripped17 = double.Parse(valueString17,
                                           CultureInfo.InvariantCulture);
      Console.WriteLine($"{initialValue:R} = {roundTripped17:R}: {initialValue.Equals(roundTripped17)}\n");
      // If compiled to an application that targets anycpu or x64 and run on an x64 system,
      // the example displays the following output:
      //       Attempting to round-trip a Double with 'R':
      //       .NET Framework:
      //       0.6822871999174 = 0.68228719991740006: False
      //       .NET:
      //       0.6822871999174 = 0.6822871999174: True
      //
      //       Attempting to round-trip a Double with 'G17':
      //       0.6822871999174 = 0.6822871999174: True
   }
}
```
