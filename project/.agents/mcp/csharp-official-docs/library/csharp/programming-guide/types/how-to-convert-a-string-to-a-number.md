---
title: "How to convert a string to a number"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/types/how-to-convert-a-string-to-a-number.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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

_Code sample not included: ~/samples/snippets/csharp/programming-guide/string-to-number/parse-tryparse/program.cs._

The following example illustrates one approach to parsing a string expected to include leading numeric characters (including hexadecimal characters) and trailing non-numeric characters. It assigns valid characters from the beginning of a string to a new string before calling the `System.Int32.TryParse*` method. Because the strings to be parsed contain a few characters, the example calls the `System.String.Concat*` method to assign valid characters to a new string. For a larger string, the `System.Text.StringBuilder` class can be used instead.

_Code sample not included: ~/samples/snippets/csharp/programming-guide/string-to-number/parse-tryparse2/program.cs._

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

_Code sample not included: ~/samples/snippets/csharp/programming-guide/string-to-number/convert/program.cs._

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
