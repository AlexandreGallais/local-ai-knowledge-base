---
title: "Custom numeric format strings (part 10 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/custom-numeric-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom numeric format strings (part 10 of 11)

## The ";" section separator

The semicolon (;) is a conditional format specifier that applies different formatting to a number depending on whether its value is positive, negative, or zero. To produce this behavior, a custom format string can contain up to three sections separated by semicolons. These sections are described in the following table.

|Number of sections|Description|
|------------------------|-----------------|
|One section|The format string applies to all values.|
|Two sections|The first section applies to positive values and zeros, and the second section applies to negative values. If the number to be formatted is negative, but becomes zero after rounding according to the format in the second section, the resulting zero is formatted according to the first section.|
|Three sections|The first section applies to positive values, the second section applies to negative values, and the third section applies to zeros. The second section can be left empty (by having nothing between the semicolons), in which case the first section applies to all nonzero values. If the number to be formatted is nonzero, but becomes zero after rounding according to the format in the first or second section, the resulting zero is formatted according to the third section.|

Section separators ignore any preexisting formatting associated with a number when the final value is formatted. For example, negative values are always displayed without a minus sign when section separators are used. If you want the final formatted value to have a minus sign, you should explicitly include the minus sign as part of the custom format specifier.

The following example uses the ";" format specifier to format positive, negative, and zero numbers differently.

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

## Character literals

Format specifiers that appear in a custom numeric format string are always interpreted as formatting characters and never as literal characters. This includes the following characters:

- 0
- \#
- %
- ‰
- '
- \\
- .
- ,
- E or e, depending on its position in the format string.

All other characters are always interpreted as character literals and, in a formatting operation, are included in the result string unchanged.  In a parsing operation, they must match the characters in the input string exactly; the comparison is case-sensitive.

The following example illustrates one common use of literal character units (in this case, thousands):

```csharp
﻿using System;

public class Example
{
   public static void Main()
   {
      double n = 123.8;
      Console.WriteLine($"{n:#,##0.0K}");
      // The example displays the following output:
      //      123.8K
   }
}
```

There are two ways to indicate that characters are to be interpreted as literal characters and not as formatting characters, so that they can be included in a result string or successfully parsed in an input string:

- By escaping a formatting character. For more information, see The "\\" escape character.

- By enclosing the entire literal string in quotation apostrophes.

The following example uses both approaches to include reserved characters in a custom numeric format string.

```csharp
﻿using System;

public class Example
{
   public static void Main()
   {
      double n = 9.3;
      Console.WriteLine($@"{n:##.0\%}");
      Console.WriteLine($@"{n:\'##\'}");
      Console.WriteLine($@"{n:\\##\\}");
      Console.WriteLine();
      Console.WriteLine($"{n:##.0'%'}");
      Console.WriteLine($@"{n:'\'##'\'}");
      // The example displays the following output:
      //      9.3%
      //      '9'
      //      \9\
      //
      //      9.3%
      //      \9\
   }
}
```

## Notes

### Floating-Point infinities and NaN

Regardless of the format string, if the value of a `System.Half`, `System.Single`, or `System.Double` floating-point type is positive infinity, negative infinity, or not a number (NaN), the formatted string is the value of the respective `System.Globalization.NumberFormatInfo.PositiveInfinitySymbol*`, `System.Globalization.NumberFormatInfo.NegativeInfinitySymbol*`, or `System.Globalization.NumberFormatInfo.NaNSymbol` property specified by the currently applicable `System.Globalization.NumberFormatInfo` object.

### Control Panel settings

The settings in the **Regional and Language Options** item in Control Panel influence the result string produced by a formatting operation. Those settings are used to initialize the `System.Globalization.NumberFormatInfo` object associated with the current culture, and the current culture provides values used to govern formatting. Computers that use different settings generate different result strings.

In addition, if you use the `System.Globalization.CultureInfo.#ctor(System.String)` constructor to instantiate a new `System.Globalization.CultureInfo` object that represents the same culture as the current system culture, any customizations established by the **Regional and Language Options** item in Control Panel will be applied to the new `System.Globalization.CultureInfo` object. You can use the `System.Globalization.CultureInfo.#ctor(System.String,System.Boolean)` constructor to create a `System.Globalization.CultureInfo` object that does not reflect a system's customizations.

### Rounding and fixed-point format strings

For fixed-point format strings (that is, format strings that do not contain scientific notation format characters), numbers are rounded to as many decimal places as there are digit placeholders to the right of the decimal point. If the format string does not contain a decimal point, the number is rounded to the nearest integer. If the number has more digits than there are digit placeholders to the left of the decimal point, the extra digits are copied to the result string immediately before the first digit placeholder.

Back to table
