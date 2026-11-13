---
title: "How to convert a string to a number"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/types/how-to-convert-a-string-to-a-number.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to convert a string to a number (C# Programming Guide)

You convert a `string` to a number by calling the `Parse` or `TryParse` method found on numeric types (`int`, `long`, `double`, and so on), or by using methods in the `System.Convert` class.

It's slightly more efficient and straightforward to call a `TryParse` method (for example, `int.TryParse("11", out number)`) or `Parse` method (for example, `var number = int.Parse("11")`). Using a `System.Convert` method is more useful for general objects that implement `System.IConvertible`.

You use `Parse` or `TryParse` methods on the numeric type you expect the string contains, such as the `System.Int32` type. The `System.Convert.ToInt32*` method uses `System.Int32.Parse*` internally. The `Parse` method returns the converted number; the `TryParse` method returns a boolean value that indicates whether the conversion succeeded, and returns the converted number in an `out` parameter. If the string isn't in a valid format, `Parse` throws an exception, but `TryParse` returns `false`. When calling a `Parse` method, you should always use exception handling to catch a `System.FormatException` when the parse operation fails.

> **Tip:**
> You can use AI assistance to convert a string to a number.

## Call Parse or TryParse methods

The `Parse` and `TryParse` methods ignore white space at the beginning and at the end of the string, but all other characters must be characters that form the appropriate numeric type (`int`, `long`, `ulong`, `float`, `decimal`, and so on). Any white space within the string that forms the number causes an error. For example, you can use `decimal.TryParse` to parse "10", "10.3", or "  10  ", but you can't use this method to parse 10 from "10X", "1 0" (note the embedded space), "10 .3" (note the embedded space), "10e1" (`float.TryParse` works here), and so on. A string whose value is `null` or `System.String.Empty` fails to parse successfully. You can check for a null or empty string before attempting to parse it by calling the `System.String.IsNullOrEmpty*` method.

The following example demonstrates both successful and unsuccessful calls to `Parse` and `TryParse`.

```csharp
﻿using System;

public static class StringConversion
{
    public static void Main()
    {
        string input = String.Empty;
        try
        {
            int result = Int32.Parse(input);
            Console.WriteLine(result);
        }
        catch (FormatException)
        {
            Console.WriteLine($"Unable to parse '{input}'");
        }
        // Output: Unable to parse ''

        try
        {
            int numVal = Int32.Parse("-105");
            Console.WriteLine(numVal);
        }
        catch (FormatException e)
        {
            Console.WriteLine(e.Message);
        }
        // Output: -105

        if (Int32.TryParse("-105", out int j))
        {
            Console.WriteLine(j);
        }
        else
        {
            Console.WriteLine("String could not be parsed.");
        }
        // Output: -105

        try
        {
            int m = Int32.Parse("abc");
        }
        catch (FormatException e)
        {
            Console.WriteLine(e.Message);
        }
        // Output: Input string was not in a correct format.

        const string inputString = "abc";
        if (Int32.TryParse(inputString, out int numValue))
        {
            Console.WriteLine(numValue);
        }
        else
        {
            Console.WriteLine($"Int32.TryParse could not parse '{inputString}' to an int.");
        }
        // Output: Int32.TryParse could not parse 'abc' to an int.
    }
}
```

The following example illustrates one approach to parsing a string expected to include leading numeric characters (including hexadecimal characters) and trailing non-numeric characters. It assigns valid characters from the beginning of a string to a new string before calling the `System.Int32.TryParse*` method. Because the strings to be parsed contain a few characters, the example calls the `System.String.Concat*` method to assign valid characters to a new string. For a larger string, the `System.Text.StringBuilder` class can be used instead.

```csharp
﻿using System;

public static class StringConversion
{
    public static void Main()
    {
        var str = "  10FFxxx";
        string numericString = string.Empty;
        foreach (var c in str)
        {
            // Check for numeric characters (hex in this case) or leading or trailing spaces.
            if ((c >= '0' && c <= '9') || (char.ToUpperInvariant(c) >= 'A' && char.ToUpperInvariant(c) <= 'F') || c == ' ')
            {
                numericString = string.Concat(numericString, c.ToString());
            }
            else
            {
                break;
            }
        }

        if (int.TryParse(numericString, System.Globalization.NumberStyles.HexNumber, null, out int i))
        {
            Console.WriteLine($"'{str}' --> '{numericString}' --> {i}");
        }
        // Output: '  10FFxxx' --> '  10FF' --> 4351

        str = "   -10FFXXX";
        numericString = "";
        foreach (char c in str)
        {
            // Check for numeric characters (0-9), a negative sign, or leading or trailing spaces.
            if ((c >= '0' && c <= '9') || c == ' ' || c == '-')
            {
                numericString = string.Concat(numericString, c);
            }
            else
            {
                break;
            }
        }

        if (int.TryParse(numericString, out int j))
        {
            Console.WriteLine($"'{str}' --> '{numericString}' --> {j}");
        }
        // Output: '   -10FFXXX' --> '   -10' --> -10
    }
}
```

## Call Convert methods

The following table lists some of the methods from the `System.Convert` class that you can use to convert a string to a number.

| Numeric type | Method                                             |
|--------------|----------------------------------------------------|
| `decimal`    | `System.Convert.ToDecimal(System.String)` |
| `float`      | `System.Convert.ToSingle(System.String)`  |
| `double`     | `System.Convert.ToDouble(System.String)`  |
| `short`      | `System.Convert.ToInt16(System.String)`   |
| `int`        | `System.Convert.ToInt32(System.String)`   |
| `long`       | `System.Convert.ToInt64(System.String)`   |
| `ushort`     | `System.Convert.ToUInt16(System.String)`  |
| `uint`       | `System.Convert.ToUInt32(System.String)`  |
| `ulong`      | `System.Convert.ToUInt64(System.String)`  |

The following example calls the `System.Convert.ToInt32(System.String)` method to convert an input string to an int. The example catches the two most common exceptions thrown by this method: `System.FormatException` and `System.OverflowException`. If the resulting number can be incremented without exceeding `System.Int32.MaxValue`, the example adds 1 to the result and displays the output.

```csharp
using System;

public class ConvertStringExample1
{
    static void Main(string[] args)
    {
        int numVal = -1;
        bool repeat = true;

        while (repeat)
        {
            Console.Write("Enter a number between −2,147,483,648 and +2,147,483,647 (inclusive): ");

            string? input = Console.ReadLine();

            // ToInt32 can throw FormatException or OverflowException.
            try
            {
                numVal = Convert.ToInt32(input);
                if (numVal < Int32.MaxValue)
                {
                    Console.WriteLine($"The new value is {++numVal}");
                }
                else
                {
                    Console.WriteLine("numVal cannot be incremented beyond its current value");
                }
           }
            catch (FormatException)
            {
                Console.WriteLine("Input string is not a sequence of digits.");
            }
            catch (OverflowException)
            {
                Console.WriteLine("The number cannot fit in an Int32.");
            }

            Console.Write("Go again? Y/N: ");
            string? go = Console.ReadLine();
            if (go?.ToUpper() != "Y")
            {
                repeat = false;
            }
        }
    }
}
// Sample Output:
//   Enter a number between -2,147,483,648 and +2,147,483,647 (inclusive): 473
//   The new value is 474
//   Go again? Y/N: y
//   Enter a number between -2,147,483,648 and +2,147,483,647 (inclusive): 2147483647
//   numVal cannot be incremented beyond its current value
//   Go again? Y/N: y
//   Enter a number between -2,147,483,648 and +2,147,483,647 (inclusive): -1000
//   The new value is -999
//   Go again? Y/N: n
```

## Use AI to convert a string to a number

You can use AI tools, such as GitHub Copilot, to generate C# code to convert a string to a number. You can customize the prompt to use a string per your requirements.

Here's an example Copilot Chat prompt:

```copilot-prompt
Show me how to parse a string as a number, but don't throw an exception if the input string doesn't represent a number.
```

Review Copilot's suggestions before applying them.

For more information, see Copilot FAQs.

## See also

- GitHub Copilot in Visual Studio
- GitHub Copilot in VS Code
