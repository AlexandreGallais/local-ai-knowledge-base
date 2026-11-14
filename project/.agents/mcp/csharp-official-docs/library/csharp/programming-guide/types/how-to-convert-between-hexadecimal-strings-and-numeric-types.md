---
title: "How to convert between hexadecimal strings and numeric types"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/types/how-to-convert-between-hexadecimal-strings-and-numeric-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to convert between hexadecimal strings and numeric types (C# Programming Guide)

These examples show you how to perform the following tasks:

- Obtain the hexadecimal value of each character in a string.

- Obtain the char that corresponds to each value in a hexadecimal string.

- Convert a hexadecimal `string` to an int.

- Convert a hexadecimal `string` to a float.

- Convert a byte array to a hexadecimal `string`.

## Examples

 This example outputs the hexadecimal value of each character in a `string`. First it parses the `string` to an array of characters. Then it calls `System.Convert.ToInt32(System.Char)` on each character to obtain its numeric value. Finally, it formats the number as its hexadecimal representation in a `string`.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs._

 This example parses a `string` of hexadecimal values and outputs the character corresponding to each hexadecimal value. First it calls the Split(Char\[\])) method to obtain each hexadecimal value as an individual `string` in an array. Then it calls `System.Convert.ToInt32(System.String,System.Int32)` to convert the hexadecimal value to a decimal value represented as an int. It shows two different ways to obtain the character corresponding to that character code. The first technique uses `System.Char.ConvertFromUtf32(System.Int32)`, which returns the character corresponding to the integer argument as a `string`. The second technique explicitly casts the `int` to a char.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs._

 This example shows another way to convert a hexadecimal `string` to an integer, by calling the `System.Int32.Parse(System.String,System.Globalization.NumberStyles)` method.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs._

 The following example shows how to convert a hexadecimal `string` to a float by using the `System.BitConverter` class and the `System.UInt32.Parse*` method.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs._

 The following example shows how to convert a byte array to a hexadecimal string by using the `System.BitConverter` class.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs._

 The following example shows how to convert a byte array to a hexadecimal string by calling the `System.Convert.ToHexString*` method introduced in .NET 5.0.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs._

## See also

- Standard Numeric Format Strings
- Types
- How to determine whether a string represents a numeric value
