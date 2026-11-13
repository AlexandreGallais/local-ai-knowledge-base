---
title: "Standard numeric format strings (part 10 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/standard-numeric-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Standard numeric format strings (part 10 of 10)

## Code example

The following example formats an integral and a floating-point numeric value using the en-US culture and all the standard numeric format specifiers. This example uses two particular numeric types (`System.Double` and `System.Int32`), but would yield similar results for any of the other numeric base types (`System.Byte`, `System.SByte`, `System.Int16`, `System.Int32`, `System.Int64`, `System.UInt16`, `System.UInt32`, `System.UInt64`, `System.Numerics.BigInteger`, `System.Decimal`, `System.Half`, and `System.Single`).

```csharp
// This older code snippet replaced by a new one
// This code example demonstrates the ToString(String) and
// ToString(String, IFormatProvider) methods for integral and
// floating-point numbers, in conjunction with the standard
// numeric format specifiers.
// This code example uses the System.Int32 integral type and
// the System.Double floating-point type, but would yield
// similar results for any of the numeric types. The integral
// numeric types are System.Byte, SByte, Int16, Int32, Int64,
// UInt16, UInt32, and UInt64. The floating-point numeric types
// are Decimal, Single, and Double.
//
// using System;
// using System.Globalization;
// using System.Threading;
//
// class Sample
// {
//     public static void Main()
//     {
// // Format a negative integer or floating-point number in various ways.
//     int    integralVal = -12345;
//     double floatingVal = -1234.567d;
//
//     string msgCurrency =    "(C) Currency: . . . . . . ";
//     string msgDecimal  =    "(D) Decimal:. . . . . . . ";
//     string msgScientific =  "(E) Scientific: . . . . . ";
//     string msgFixedPoint =  "(F) Fixed point:. . . . . ";
//     string msgGeneral =     "(G) General (default):. . ";
//     string msgNumber =      "(N) Number: . . . . . . . ";
//     string msgPercent =     "(P) Percent:. . . . . . . ";
//     string msgRoundTrip =   "(R) Round-trip: . . . . . ";
//     string msgHexadecimal = "(X) Hexadecimal:. . . . . ";
//
//     string msg1 = "Use ToString(String) and the current thread culture.\n";
//     string msg2 = "Use ToString(String, IFormatProvider) and a specified culture.\n";
//     string msgCulture     = "Culture:";
//     string msgIntegralVal = "Integral value:";
//     string msgFloatingVal = "Floating-point value:";
//
//     CultureInfo ci;
// //
//     Console.Clear();
//     Console.WriteLine("Standard Numeric Format Specifiers:\n");
// // Display the values.
//     Console.WriteLine(msg1);
//
// // Display the thread current culture, which is used to format the values.
//     ci = Thread.CurrentThread.CurrentCulture;
//     Console.WriteLine("{0,-26}{1}", msgCulture, ci.DisplayName);
//
// // Display the integral and floating-point values.
//     Console.WriteLine("{0,-26}{1}", msgIntegralVal, integralVal);
//     Console.WriteLine("{0,-26}{1}", msgFloatingVal, floatingVal);
//     Console.WriteLine();
//
// // Use the format specifiers that are only for integral types.
//     Console.WriteLine("Format specifiers only for integral types:");
//     Console.WriteLine(msgDecimal     + integralVal.ToString("D"));
//     Console.WriteLine(msgHexadecimal + integralVal.ToString("X"));
//     Console.WriteLine();
//
// // Use the format specifier that is only for the Single and Double
// // floating-point types.
//     Console.WriteLine("Format specifier only for the Single and Double types:");
//     Console.WriteLine(msgRoundTrip   + floatingVal.ToString("R"));
//     Console.WriteLine();
//
// // Use the format specifiers that are for integral or floating-point types.
//     Console.WriteLine("Format specifiers for integral or floating-point types:");
//     Console.WriteLine(msgCurrency    + floatingVal.ToString("C"));
//     Console.WriteLine(msgScientific  + floatingVal.ToString("E"));
//     Console.WriteLine(msgFixedPoint  + floatingVal.ToString("F"));
//     Console.WriteLine(msgGeneral     + floatingVal.ToString("G"));
//     Console.WriteLine(msgNumber      + floatingVal.ToString("N"));
//     Console.WriteLine(msgPercent     + floatingVal.ToString("P"));
//     Console.WriteLine();
//
// // Display the same values using a CultureInfo object. The CultureInfo class
// // implements IFormatProvider.
//     Console.WriteLine(msg2);
//
// // Display the culture used to format the values.
// // Create a European culture and change its currency symbol to "euro" because
// // this particular code example uses a thread current UI culture that cannot
// // display the euro symbol (€).
//     ci = new CultureInfo("de-DE");
//     ci.NumberFormat.CurrencySymbol = "euro";
//     Console.WriteLine("{0,-26}{1}", msgCulture, ci.DisplayName);
//
// // Display the integral and floating-point values.
//     Console.WriteLine("{0,-26}{1}", msgIntegralVal, integralVal);
//     Console.WriteLine("{0,-26}{1}", msgFloatingVal, floatingVal);
//     Console.WriteLine();
//
// // Use the format specifiers that are only for integral types.
//     Console.WriteLine("Format specifiers only for integral types:");
//     Console.WriteLine(msgDecimal     + integralVal.ToString("D", ci));
//     Console.WriteLine(msgHexadecimal + integralVal.ToString("X", ci));
//     Console.WriteLine();
//
// // Use the format specifier that is only for the Single and Double
// // floating-point types.
//     Console.WriteLine("Format specifier only for the Single and Double types:");
//     Console.WriteLine(msgRoundTrip   + floatingVal.ToString("R", ci));
//     Console.WriteLine();
//
// // Use the format specifiers that are for integral or floating-point types.
//     Console.WriteLine("Format specifiers for integral or floating-point types:");
//     Console.WriteLine(msgCurrency    + floatingVal.ToString("C", ci));
//     Console.WriteLine(msgScientific  + floatingVal.ToString("E", ci));
//     Console.WriteLine(msgFixedPoint  + floatingVal.ToString("F", ci));
//     Console.WriteLine(msgGeneral     + floatingVal.ToString("G", ci));
//     Console.WriteLine(msgNumber      + floatingVal.ToString("N", ci));
//     Console.WriteLine(msgPercent     + floatingVal.ToString("P", ci));
//     Console.WriteLine();
//     }
// }
// /*
// This code example produces the following results:
//
// Standard Numeric Format Specifiers:
//
// Use ToString(String) and the current thread culture.
//
// Culture:                  English (United States)
// Integral value:           -12345
// Floating-point value:     -1234.567
//
// Format specifiers only for integral types:
// (D) Decimal:. . . . . . . -12345
// (X) Hexadecimal:. . . . . FFFFCFC7
//
// Format specifier only for the Single and Double types:
// (R) Round-trip: . . . . . -1234.567
//
// Format specifiers for integral or floating-point types:
// (C) Currency: . . . . . . ($1,234.57)
// (E) Scientific: . . . . . -1.234567E+003
// (F) Fixed point:. . . . . -1234.57
// (G) General (default):. . -1234.567
// (N) Number: . . . . . . . -1,234.57
// (P) Percent:. . . . . . . -123,456.70 %
//
// Use ToString(String, IFormatProvider) and a specified culture.
//
// Culture:                  German (Germany)
// Integral value:           -12345
// Floating-point value:     -1234.567
//
// Format specifiers only for integral types:
// (D) Decimal:. . . . . . . -12345
// (X) Hexadecimal:. . . . . FFFFCFC7
//
// Format specifier only for the Single and Double types:
// (R) Round-trip: . . . . . -1234,567
//
// Format specifiers for integral or floating-point types:
// (C) Currency: . . . . . . -1.234,57 euro
// (E) Scientific: . . . . . -1,234567E+003
// (F) Fixed point:. . . . . -1234,57
// (G) General (default):. . -1234,567
// (N) Number: . . . . . . . -1.234,57
// (P) Percent:. . . . . . . -123.456,70%
//
// */
//
// END OF OLD CODE SNIPPET

using System;
using System.Globalization;
using System.Threading;

public class NumericFormats
{
   public static void Main()
   {
      // Display string representations of numbers for en-us culture
      CultureInfo ci = new CultureInfo("en-us");

      // Output floating point values
      double floating = 10761.937554;
      Console.WriteLine($"C: {floating.ToString("C", ci)}");           // Displays "C: $10,761.94"
      Console.WriteLine($"E: {floating.ToString("E03", ci)}");         // Displays "E: 1.076E+004"
      Console.WriteLine($"F: {floating.ToString("F04", ci)}");         // Displays "F: 10761.9376"
      Console.WriteLine($"G: {floating.ToString("G", ci)}");           // Displays "G: 10761.937554"
      Console.WriteLine($"N: {floating.ToString("N03", ci)}");         // Displays "N: 10,761.938"
      Console.WriteLine($"P: {(floating/10000).ToString("P02", ci)}"); // Displays "P: 107.62 %"
      Console.WriteLine($"R: {floating.ToString("R", ci)}");           // Displays "R: 10761.937554"
      Console.WriteLine();

      // Output integral values
      int integral = 8395;
      Console.WriteLine($"C: {integral.ToString("C", ci)}");           // Displays "C: $8,395.00"
      Console.WriteLine($"D: {integral.ToString("D6", ci)}");          // Displays "D: 008395"
      Console.WriteLine($"E: {integral.ToString("E03", ci)}");         // Displays "E: 8.395E+003"
      Console.WriteLine($"F: {integral.ToString("F01", ci)}");         // Displays "F: 8395.0"
      Console.WriteLine($"G: {integral.ToString("G", ci)}");           // Displays "G: 8395"
      Console.WriteLine($"N: {integral.ToString("N01", ci)}");         // Displays "N: 8,395.0"
      Console.WriteLine($"P: {(integral/10000.0).ToString("P02", ci)}"); // Displays "P: 83.95 %"
      Console.WriteLine($"X: 0x{integral.ToString("X", ci)}");           // Displays "X: 0x20CB"
      Console.WriteLine();
   }
}
```

## See also

- `System.Globalization.NumberFormatInfo`
- Custom Numeric Format Strings
- Formatting Types
- How to: Pad a Number with Leading Zeros
- Composite Formatting
- Sample: .NET Core WinForms Formatting Utility (C#)
- Sample: .NET Core WinForms Formatting Utility (Visual Basic)
