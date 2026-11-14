---
title: "Parsing Numeric Strings in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/parsing-numeric.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Parsing numeric strings in .NET

All numeric types have two static parsing methods, `Parse` and `TryParse`, that you can use to convert the string representation of a number into a numeric type. These methods enable you to parse strings that were produced by using the format strings documented in Standard Numeric Format Strings and Custom Numeric Format Strings. By default, the `Parse` and `TryParse` methods can successfully convert strings that contain integral decimal digits only to integer values. They can successfully convert strings that contain integral and fractional decimal digits, group separators, and a decimal separator to floating-point values. The `Parse` method throws an exception if the operation fails, whereas the `TryParse` method returns `false`.

> **Note:**
> Starting in .NET 7, the numeric types in .NET also implement the `System.IParsable`1` interface, which defines the `System.IParsable`1.Parse*` and `System.IParsable`1.TryParse*` methods.

## Parsing and format providers

 Typically, the string representations of numeric values differ by culture. Elements of numeric strings, such as currency symbols, group (or thousands) separators, and decimal separators, all vary by culture. Parsing methods either implicitly or explicitly use a format provider that recognizes these culture-specific variations. If no format provider is specified in a call to the `Parse` or `TryParse` method, the format provider associated with the current culture (the `System.Globalization.NumberFormatInfo` object returned by the `System.Globalization.NumberFormatInfo.CurrentInfo` property) is used.

 A format provider is represented by an `System.IFormatProvider` implementation. This interface has a single member, the `System.IFormatProvider.GetFormat*` method, whose single parameter is a `System.Type` object that represents the type to be formatted. This method returns the object that provides formatting information. .NET supports the following two `System.IFormatProvider` implementations for parsing numeric strings:

- A `System.Globalization.CultureInfo` object whose `System.Globalization.CultureInfo.GetFormat*` method returns a `System.Globalization.NumberFormatInfo` object that provides culture-specific formatting information.

- A `System.Globalization.NumberFormatInfo` object whose `System.Globalization.NumberFormatInfo.GetFormat*` method returns itself.

 The following example tries to convert each string in an array to a `System.Double` value. It first tries to parse the string by using a format provider that reflects the conventions of the English (United States) culture. If this operation throws a `System.FormatException`, it tries to parse the string by using a format provider that reflects the conventions of the French (France) culture.

 ```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      string[] values = { "1,304.16", "$1,456.78", "1,094", "152",
                          "123,45 €", "1 304,16", "Ae9f" };
      double number;
      CultureInfo culture = null;

      foreach (string value in values) {
         try {
            culture = CultureInfo.CreateSpecificCulture("en-US");
            number = Double.Parse(value, culture);
            Console.WriteLine($"{culture.Name}: {value} --> {number}");
         }
         catch (FormatException) {
            Console.WriteLine($"{culture.Name}: Unable to parse '{value}'.");
            culture = CultureInfo.CreateSpecificCulture("fr-FR");
            try {
               number = Double.Parse(value, culture);
               Console.WriteLine($"{culture.Name}: {value} --> {number}");
            }
            catch (FormatException) {
               Console.WriteLine($"{culture.Name}: Unable to parse '{value}'.");
            }
         }
         Console.WriteLine();
      }
   }
}
// The example displays the following output:
//    en-US: 1,304.16 --> 1304.16
//
//    en-US: Unable to parse '$1,456.78'.
//    fr-FR: Unable to parse '$1,456.78'.
//
//    en-US: 1,094 --> 1094
//
//    en-US: 152 --> 152
//
//    en-US: Unable to parse '123,45 €'.
//    fr-FR: Unable to parse '123,45 €'.
//
//    en-US: Unable to parse '1 304,16'.
//    fr-FR: 1 304,16 --> 1304.16
//
//    en-US: Unable to parse 'Ae9f'.
//    fr-FR: Unable to parse 'Ae9f'.
```

## Parsing and NumberStyles Values

 The style elements (such as white space, group separators, and decimal separator) that the parse operation can handle are defined by a `System.Globalization.NumberStyles` enumeration value. By default, strings that represent integer values are parsed by using the `System.Globalization.NumberStyles.Integer` value, which permits only numeric digits, leading and trailing white space, and a leading sign. Strings that represent floating-point values are parsed using a combination of the `System.Globalization.NumberStyles.Float` and `System.Globalization.NumberStyles.AllowThousands` values; this composite style permits decimal digits along with leading and trailing white space, a leading sign, a decimal separator, a group separator, and an exponent. By calling an overload of the `Parse` or `TryParse` method that includes a parameter of type `System.Globalization.NumberStyles` and setting one or more `System.Globalization.NumberStyles` flags, you can control the style elements that can be present in the string for the parse operation to succeed.

 For example, a string that contains a group separator can't be converted to an `System.Int32` value by using the `System.Int32.Parse(System.String)` method. However, the conversion succeeds if you use the `System.Globalization.NumberStyles.AllowThousands` flag, as the following example illustrates.

 ```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      string value = "1,304";
      int number;
      IFormatProvider provider = CultureInfo.CreateSpecificCulture("en-US");
      if (Int32.TryParse(value, out number))
         Console.WriteLine($"{value} --> {number}");
      else
         Console.WriteLine($"Unable to convert '{value}'");

      if (Int32.TryParse(value, NumberStyles.Integer | NumberStyles.AllowThousands,
                        provider, out number))
         Console.WriteLine($"{value} --> {number}");
      else
         Console.WriteLine($"Unable to convert '{value}'");
   }
}
// The example displays the following output:
//       Unable to convert '1,304'
//       1,304 --> 1304
```

> **Warning:**
> The parse operation always uses the formatting conventions of a particular culture. If you do not specify a culture by passing a `System.Globalization.CultureInfo` or `System.Globalization.NumberFormatInfo` object, the culture associated with the current thread is used.

 The following table lists the members of the `System.Globalization.NumberStyles` enumeration and describes the effect that they have on the parsing operation.

|NumberStyles value|Effect on the string to be parsed|
|------------------------|---------------------------------------|
|`System.Globalization.NumberStyles.None`|Only numeric digits are permitted.|
|`System.Globalization.NumberStyles.AllowDecimalPoint`|The decimal separator and fractional digits are permitted. For integer values, only zero is permitted as a fractional digit. Valid decimal separators are determined by the `System.Globalization.NumberFormatInfo.NumberDecimalSeparator*` or `System.Globalization.NumberFormatInfo.CurrencyDecimalSeparator` property.|
|`System.Globalization.NumberStyles.AllowExponent`|The "e" or "E" character can be used to indicate exponential notation. For more information, see `System.Globalization.NumberStyles`.|
|`System.Globalization.NumberStyles.AllowLeadingWhite`|Leading white space is permitted.|
|`System.Globalization.NumberStyles.AllowTrailingWhite`|Trailing white space is permitted.|
|`System.Globalization.NumberStyles.AllowLeadingSign`|A positive or negative sign can precede numeric digits.|
|`System.Globalization.NumberStyles.AllowTrailingSign`|A positive or negative sign can follow numeric digits.|
|`System.Globalization.NumberStyles.AllowParentheses`|Parentheses can be used to indicate negative values.|
|`System.Globalization.NumberStyles.AllowThousands`|The group separator is permitted. The group separator character is determined by the `System.Globalization.NumberFormatInfo.NumberGroupSeparator*` or `System.Globalization.NumberFormatInfo.CurrencyGroupSeparator` property.|
|`System.Globalization.NumberStyles.AllowCurrencySymbol`|The currency symbol is permitted. The currency symbol is defined by the `System.Globalization.NumberFormatInfo.CurrencySymbol` property.|
|`System.Globalization.NumberStyles.AllowHexSpecifier`|The string to be parsed is interpreted as a hexadecimal number. It can include the hexadecimal digits 0-9, A-F, and a-f. This flag can be used only to parse integer values.|
|`System.Globalization.NumberStyles.AllowBinarySpecifier`|The string to be parsed is interpreted as a binary number. It can include the binary digits 0 and 1. This flag can be used only to parse integer values.|

 In addition, the `System.Globalization.NumberStyles` enumeration provides the following composite styles, which include multiple `System.Globalization.NumberStyles` flags.

|Composite NumberStyles value|Includes members|
|----------------------------------|----------------------|
|`System.Globalization.NumberStyles.Integer`|Includes the `System.Globalization.NumberStyles.AllowLeadingWhite`, `System.Globalization.NumberStyles.AllowTrailingWhite`, and `System.Globalization.NumberStyles.AllowLeadingSign` styles. This is the default style used to parse integer values.|
|`System.Globalization.NumberStyles.Number`|Includes the `System.Globalization.NumberStyles.AllowLeadingWhite`, `System.Globalization.NumberStyles.AllowTrailingWhite`, `System.Globalization.NumberStyles.AllowLeadingSign`, `System.Globalization.NumberStyles.AllowTrailingSign`, `System.Globalization.NumberStyles.AllowDecimalPoint`, and `System.Globalization.NumberStyles.AllowThousands` styles.|
|`System.Globalization.NumberStyles.Float`|Includes the `System.Globalization.NumberStyles.AllowLeadingWhite`, `System.Globalization.NumberStyles.AllowTrailingWhite`, `System.Globalization.NumberStyles.AllowLeadingSign`, `System.Globalization.NumberStyles.AllowDecimalPoint`, and `System.Globalization.NumberStyles.AllowExponent` styles.|
|`System.Globalization.NumberStyles.Currency`|Includes all styles except `System.Globalization.NumberStyles.AllowExponent` and `System.Globalization.NumberStyles.AllowHexSpecifier`.|
|`System.Globalization.NumberStyles.Any`|Includes all styles except `System.Globalization.NumberStyles.AllowHexSpecifier`.|
|`System.Globalization.NumberStyles.HexNumber`|Includes the `System.Globalization.NumberStyles.AllowLeadingWhite`, `System.Globalization.NumberStyles.AllowTrailingWhite`, and `System.Globalization.NumberStyles.AllowHexSpecifier` styles.|
|`System.Globalization.NumberStyles.BinaryNumber`|Includes the `System.Globalization.NumberStyles.AllowLeadingWhite`, `System.Globalization.NumberStyles.AllowTrailingWhite`, and `System.Globalization.NumberStyles.AllowBinarySpecifier` styles.|

## Parsing binary and hexadecimal BigIntegers

When parsing `System.Numerics.BigInteger` with the `System.Globalization.NumberStyles.AllowHexSpecifier` or `System.Globalization.NumberStyles.AllowBinarySpecifier` flags, the input string is interpreted as a hexadecimal/binary number of exactly the length the string has. For instance, parsing `"11"` as a binary BigInteger yields `-1`, because that is the interpretation of `11` as a signed two's complement value with exactly 2 digits. If you want a positive result, add a leading `0`, such as `"011"` which is parsed as `3`.

## Parsing and Unicode Digits

 The Unicode standard defines code points for digits in various writing systems. For example, code points from U+0030 to U+0039 represent the basic Latin digits 0 through 9, code points from U+09E6 to U+09EF represent the Bangla digits 0 through 9, and code points from U+FF10 to U+FF19 represent the Fullwidth digits 0 through 9. However, the only numeric digits recognized by parsing methods are the basic Latin digits 0-9 with code points from U+0030 to U+0039. If a numeric parsing method is passed a string that contains any other digits, the method throws a `System.FormatException`.

 The following example uses the `System.Int32.Parse*` method to parse strings that consist of digits in different writing systems. As the output from the example shows, the attempt to parse the basic Latin digits succeeds, but the attempt to parse the Fullwidth, Arabic-Indic, and Bangla digits fails.

 ```csharp
using System;

public class Example
{
   public static void Main()
   {
      string value;
      // Define a string of basic Latin digits 1-5.
      value = "\u0031\u0032\u0033\u0034\u0035";
      ParseDigits(value);

      // Define a string of Fullwidth digits 1-5.
      value = "\uFF11\uFF12\uFF13\uFF14\uFF15";
      ParseDigits(value);

      // Define a string of Arabic-Indic digits 1-5.
      value = "\u0661\u0662\u0663\u0664\u0665";
      ParseDigits(value);

      // Define a string of Bangla digits 1-5.
      value = "\u09e7\u09e8\u09e9\u09ea\u09eb";
      ParseDigits(value);
   }

   static void ParseDigits(string value)
   {
      try {
         int number = Int32.Parse(value);
         Console.WriteLine($"'{value}' --> {number}");
      }
      catch (FormatException) {
         Console.WriteLine($"Unable to parse '{value}'.");
      }
   }
}
// The example displays the following output:
//       '12345' --> 12345
//       Unable to parse '１２３４５'.
//       Unable to parse '١٢٣٤٥'.
//       Unable to parse '১২৩৪৫'.
```

## See also

- `System.Globalization.NumberStyles`
- Parsing Strings
- Formatting Types
