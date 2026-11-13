---
title: "Custom numeric format strings (part 11 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/custom-numeric-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom numeric format strings (part 11 of 11)

## Example

The following example demonstrates two custom numeric format strings. In both cases, the digit placeholder (`#`) displays the numeric data, and all other characters are copied to the result string.

```csharp
﻿using System;

public class Example
{
   public static void Main()
   {
      double number1 = 1234567890;
      string value1 = number1.ToString("(###) ###-####");
      Console.WriteLine(value1);

      int number2 = 42;
      string value2 = number2.ToString("My Number = #");
      Console.WriteLine(value2);
      // The example displays the following output:
      //       (123) 456-7890
      //       My Number = 42
   }
}
```

Back to table

## See also

- `System.Globalization.NumberFormatInfo`
- Formatting Types
- Standard Numeric Format Strings
- How to: Pad a Number with Leading Zeros
- Sample: .NET Core WinForms Formatting Utility (C#)
- Sample: .NET Core WinForms Formatting Utility (Visual Basic)
