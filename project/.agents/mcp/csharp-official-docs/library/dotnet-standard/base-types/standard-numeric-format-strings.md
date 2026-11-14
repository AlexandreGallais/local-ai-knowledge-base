---
title: "Standard numeric format strings (part 1 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/standard-numeric-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Standard numeric format strings

Standard numeric format strings are used to format common numeric types. A standard numeric format string takes the form *`format specifier`*, where:

- *Format specifier* is a single alphabetic character that specifies the type of number format, for example, currency or percent. Any numeric format string that contains more than one alphabetic character, including white space, is interpreted as a custom numeric format string. For more information, see Custom numeric format strings.

- *Precision specifier* is an optional integer that affects the number of digits in the resulting string. In .NET 7 and later versions, the maximum precision value is 999,999,999.  In .NET 6, the maximum precision value is `System.Int32.MaxValue`. In previous .NET versions, the precision can range from 0 to 99. The precision specifier controls the number of digits in the string representation of a number. It does not round the number itself. To perform a rounding operation, use the `System.Math.Ceiling*`, `System.Math.Floor*`, or `System.Math.Round*` method.

  When *precision specifier* controls the number of fractional digits in the result string, the result string reflects a number that is rounded to a representable result nearest to the infinitely precise result. If there are two equally near representable results:
  - **On .NET Framework and .NET Core up to .NET Core 2.0**, the runtime selects the result with the greater least significant digit (that is, using `System.MidpointRounding.AwayFromZero`).
  - **On .NET Core 2.1 and later**, the runtime selects the result with an even least significant digit (that is, using `System.MidpointRounding.ToEven`).

  > **Note:**
  > The precision specifier determines the number of digits in the result string. To pad a result string with leading or trailing spaces, use the composite formatting feature and define a *width component* in the format item.

Standard numeric format strings are supported by:

- Some overloads of the `ToString` method of all numeric types. For example, you can supply a numeric format string to the `System.Int32.ToString(System.String)` and `System.Int32.ToString(System.String,System.IFormatProvider)` methods.

- The `TryFormat` method of all numeric types, for example, `System.Int32.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)` and `System.Single.TryFormat(System.Span{System.Char},System.Int32@,System.ReadOnlySpan{System.Char},System.IFormatProvider)`.

- The .NET composite formatting feature, which is used by some `Write` and `WriteLine` methods of the `System.Console` and `System.IO.StreamWriter` classes, the `System.String.Format*` method, and the `System.Text.StringBuilder.AppendFormat*` method. The composite format feature allows you to include the string representation of multiple data items in a single string, to specify field width, and to align numbers in a field. For more information, see Composite Formatting.

- Interpolated strings in C# and Visual Basic, which provide a simplified syntax when compared to composite format strings.

> **Tip:**
> You can download the **Formatting Utility**, a .NET Core Windows Forms application that lets you apply format strings to either numeric or date and time values and displays the result string. Source code is available for C# and Visual Basic.

## Standard format specifiers

The following table describes the standard numeric format specifiers and displays sample output produced by each format specifier. See the Notes section for additional information about using standard numeric format strings, and the Code example section for a comprehensive illustration of their use.

> The result of a formatted string for a specific culture might differ from the following examples. Operating system settings, user settings, environment variables, and the .NET version you're using can all affect the format. For example, starting with .NET 5, .NET tries to unify cultural formats across platforms. For more information, see .NET globalization and ICU.

| Format specifier | Name | Description | Examples |
|------------------|------|-------------|----------|
| "B" or "b" | Binary | Result: A binary string. Supported by: Integral types only (.NET 8+). Precision specifier: Number of digits in the result string. More information: The Binary ("B") Format Specifier. | 42 ("B")-> 101010 255 ("b16")-> <example-card-number> |
| "C" or "c" | Currency | Result: A currency value. Supported by: All numeric types. Precision specifier: Number of decimal digits. Default precision specifier: Defined by `System.Globalization.NumberFormatInfo.CurrencyDecimalDigits*`. More information: The Currency ("C") Format Specifier. | 123.456 ("C", en-US)-> \\$123.46 123.456 ("C", fr-FR)-> 123,46 &euro; 123.456 ("C", ja-JP)-> ¥123 -123.456 ("C3", en-US)-> (\\$123.456) -123.456 ("C3", fr-FR)-> -123,456 &euro; -123.456 ("C3", ja-JP)-> -¥123.456 |
| "D" or "d" | Decimal | Result: Integer digits with optional negative sign. Supported by: Integral types only. Precision specifier: Minimum number of digits. Default precision specifier: Minimum number of digits required. More information: The Decimal("D") Format Specifier. | 1234 ("D")-> 1234 -1234 ("D6")-> -001234 |
| "E" or "e" | Exponential (scientific) | Result: Exponential notation. Supported by: All numeric types. Precision specifier: Number of decimal digits. Default precision specifier: 6. More information: The Exponential ("E") Format Specifier. | 1052.0329112756 ("E", en-US)-> 1.052033E+003 1052.0329112756 ("e", fr-FR)-> 1,052033e+003 -1052.0329112756 ("e2", en-US)-> -1.05e+003 -1052.0329112756 ("E2", fr-FR)-> -1,05E+003 |
| "F" or "f" | Fixed-point | Result: Integral and decimal digits with optional negative sign. Supported by: All numeric types. Precision specifier: Number of decimal digits. Default precision specifier: Defined by `System.Globalization.NumberFormatInfo.NumberDecimalDigits*`. More information: The Fixed-Point ("F") Format Specifier. | 1234.567 ("F", en-US)-> 1234.57 1234.567 ("F", de-DE)-> 1234,57 1234 ("F1", en-US)-> 1234.0 1234 ("F1", de-DE)-> 1234,0 -1234.56 ("F4", en-US)-> -1234.5600 -1234.56 ("F4", de-DE)-> -1234,5600 |
| "G" or "g" | General | Result: The more compact of either fixed-point or scientific notation. Supported by: All numeric types. Precision specifier: Number of significant digits. Default precision specifier: Depends on numeric type. More information: The General ("G") Format Specifier. | -123.456 ("G", en-US)-> -123.456 -123.456 ("G", sv-SE)-> -123,456 123.4546 ("G4", en-US)-> 123.5 123.4546 ("G4", sv-SE)-> 123,5 -1.234567890e-25 ("G", en-US)-> -1.23456789E-25 -1.234567890e-25 ("G", sv-SE)-> -1,23456789E-25 |
| "N" or "n" | Number | Result: Integral and decimal digits, group separators, and a decimal separator with optional negative sign. Supported by: All numeric types. Precision specifier: Desired number of decimal places. Default precision specifier: Defined by `System.Globalization.NumberFormatInfo.NumberDecimalDigits*`. More information: The Numeric ("N") Format Specifier. | 1234.567 ("N", en-US)-> 1,234.57 1234.567 ("N", ru-RU)-> 1 234,57 1234 ("N1", en-US)-> 1,234.0 1234 ("N1", ru-RU)-> 1 234,0 -1234.56 ("N3", en-US)-> -1,234.560 -1234.56 ("N3", ru-RU)-> -1 234,560 |
| "P" or "p" | Percent | Result: Number multiplied by 100 and displayed with a percent symbol. Supported by: All numeric types. Precision specifier: Desired number of decimal places. Default precision specifier: Defined by  `System.Globalization.NumberFormatInfo.PercentDecimalDigits*`. More information: The Percent ("P") Format Specifier. | 1 ("P", en-US)-> 100.00 % 1 ("P", fr-FR)-> 100,00 % -0.39678 ("P1", en-US)-> -39.7 % -0.39678 ("P1", fr-FR)-> -39,7 % |
| "R" or "r" | Round-trip | Result: A string that can round-trip to an identical number. Supported by: `System.Single`, `System.Double`, and `System.Numerics.BigInteger`. Note: Recommended for the `System.Numerics.BigInteger` type only. For `System.Double` types, use "G17"; for `System.Single` types, use "G9".  Precision specifier: Ignored. More information: The Round-trip ("R") Format Specifier. | 123456789.12345678 ("R")-> 123456789.12345678 -1234567890.12345678 ("R")-> -1234567890.1234567 |
| "X" or "x" | Hexadecimal | Result: A hexadecimal string. Supported by: Integral types only. Precision specifier: Number of digits in the result string. More information: The Hexadecimal ("X") Format Specifier. | 255 ("X")-> FF -1 ("x")-> ff 255 ("x4")-> 00ff -1 ("X4")-> 00FF |
| Any other single character | Unknown specifier | Result: Throws a `System.FormatException` at runtime. |  |

## Use standard numeric format strings

A standard numeric format string can be used to define the formatting of a numeric value in one of the following ways:

- It can be passed to the `TryFormat` method or an overload of the `ToString` method that has a `format` parameter. The following example formats a numeric value as a currency string in the current culture (in this case, the en-US culture).

  ```csharp
using System;

public class Example
{
   public static void Main()
   {
      ShowToString();
      ShowComposite();
      ShowCompositeWithAlignment();
   }

   private static void ShowToString()
   {
      decimal value = 123.456m;
      Console.WriteLine(value.ToString("C2"));
      // Displays $123.46
   }

   private static void ShowComposite()
   {
      decimal value = 123.456m;
      Console.WriteLine($"Your account balance is {value:C2}.");
      // Displays "Your account balance is $123.46."
   }

   private static void ShowCompositeWithAlignment()
   {
      decimal[] amounts = { 16305.32m, 18794.16m };
      Console.WriteLine("   Beginning Balance           Ending Balance");
      Console.WriteLine("   {0,-28:C2}{1,14:C2}", amounts[0], amounts[1]);
      // Displays:
      //        Beginning Balance           Ending Balance
      //        $16,305.32                      $18,794.16
   }
}
```

- It can be supplied as the `formatString` argument in a format item used with such methods as `System.String.Format*`, `System.Console.WriteLine*`, and `System.Text.StringBuilder.AppendFormat*`. For more information, see Composite Formatting. The following example uses a format item to insert a currency value in a string.

  ```csharp
using System;

public class Example
{
   public static void Main()
   {
      ShowToString();
      ShowComposite();
      ShowCompositeWithAlignment();
   }

   private static void ShowToString()
   {
      decimal value = 123.456m;
      Console.WriteLine(value.ToString("C2"));
      // Displays $123.46
   }

   private static void ShowComposite()
   {
      decimal value = 123.456m;
      Console.WriteLine($"Your account balance is {value:C2}.");
      // Displays "Your account balance is $123.46."
   }

   private static void ShowCompositeWithAlignment()
   {
      decimal[] amounts = { 16305.32m, 18794.16m };
      Console.WriteLine("   Beginning Balance           Ending Balance");
      Console.WriteLine("   {0,-28:C2}{1,14:C2}", amounts[0], amounts[1]);
      // Displays:
      //        Beginning Balance           Ending Balance
      //        $16,305.32                      $18,794.16
   }
}
```

  Optionally, you can supply an `alignment` argument to specify the width of the numeric field and whether its value is right- or left-aligned. The following example left-aligns a currency value in a 28-character field, and it right-aligns a currency value in a 14-character field.

  ```csharp
using System;

public class Example
{
   public static void Main()
   {
      ShowToString();
      ShowComposite();
      ShowCompositeWithAlignment();
   }

   private static void ShowToString()
   {
      decimal value = 123.456m;
      Console.WriteLine(value.ToString("C2"));
      // Displays $123.46
   }

   private static void ShowComposite()
   {
      decimal value = 123.456m;
      Console.WriteLine($"Your account balance is {value:C2}.");
      // Displays "Your account balance is $123.46."
   }

   private static void ShowCompositeWithAlignment()
   {
      decimal[] amounts = { 16305.32m, 18794.16m };
      Console.WriteLine("   Beginning Balance           Ending Balance");
      Console.WriteLine("   {0,-28:C2}{1,14:C2}", amounts[0], amounts[1]);
      // Displays:
      //        Beginning Balance           Ending Balance
      //        $16,305.32                      $18,794.16
   }
}
```

- It can be supplied as the `formatString` argument in an interpolated expression item of an interpolated string. For more information, see the String interpolation article in the C# reference or the Interpolated strings article in the Visual Basic reference.

The following sections provide detailed information about each of the standard numeric format strings.

## Binary format specifier (B)

The binary ("B") format specifier converts a number to a string of binary digits. This format is supported only for integral types and only on .NET 8+.

The precision specifier indicates the minimum number of digits desired in the resulting string. If required, the number is padded with zeros to its left to produce the number of digits given by the precision specifier.

For `System.Numerics.BigInteger`, positive values always have a leading zero to distinguish them from negative values. This ensures the output round-trips to the original value when parsed. For instance, the number `3` converted with the format specifier `"B2"` is `"011"`. That's because the binary number `"11"` represents the negative value `-1`, as it is interpreted as a number with exactly `2` bits due to the `"B2"` format.

The result string is not affected by the formatting information of the current `System.Globalization.NumberFormatInfo` object.
