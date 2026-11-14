---
title: "Strings (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/strings/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Strings and string literals

A string is an object of type `System.String` whose value is text. Internally, the text is stored as a sequential read-only collection of `System.Char` objects. The `System.String.Length` property of a string represents the number of `Char` objects it contains, not the number of Unicode characters. To access the individual Unicode code points in a string, use the `System.Globalization.StringInfo` object.

## string vs. System.String

In C#, the `string` keyword is an alias for `System.String`; therefore, `String` and `string` are equivalent. Use the provided alias `string` as it works even without `using System;`. The `String` class provides many methods for safely creating, manipulating, and comparing strings. In addition, the C# language overloads some operators to simplify common string operations. For more information about the keyword, see string. For more information about the type and its methods, see `System.String`.

## Declaring and initializing strings

You can declare and initialize strings in various ways, as shown in the following example:

```csharp
// Declare without initializing.
string message1;

// Initialize to null.
string? message2 = null;

// Initialize as an empty string.
// Use the Empty constant instead of the literal "".
string message3 = System.String.Empty;

// Initialize with a regular string literal.
string oldPath = "c:\\Program Files\\Microsoft Visual Studio 8.0";

// Initialize with a verbatim string literal.
string newPath = @"c:\Program Files\Microsoft Visual Studio 9.0";

// Use System.String if you prefer.
System.String greeting = "Hello World!";

// In local variables (i.e. within a method body)
// you can use implicit typing.
var temp = "I'm still a strongly-typed System.String!";

// Use a const string to prevent 'message4' from
// being used to store another string value.
const string message4 = "You can't get rid of me!";

// Use the String constructor only when creating
// a string from a char*, char[], or sbyte*. See
// System.String documentation for details.
char[] letters = { 'A', 'B', 'C' };
string alphabet = new string(letters);
```
You don't use the new operator to create a string object except when initializing the string with an array of chars.

Initialize a string with the `System.String.Empty` constant value to create a new `System.String` object whose string is of zero length. The string literal representation of a zero-length string is `""`. By initializing strings with the `System.String.Empty` value instead of null, you can reduce the chances of a `System.NullReferenceException` occurring. Use the static `System.String.IsNullOrEmpty(System.String)` method to verify the value of a string before you try to access it.

## Immutability of strings

String objects are *immutable*: they can't be changed after they're created. All of the `System.String` methods and C# operators that appear to modify a string actually return the results in a new string object. In the following example, when the contents of `s1` and `s2` are concatenated to form a single string, the two original strings are unmodified. The `+=` operator creates a new string that contains the combined contents. That new object is assigned to the variable `s1`, and the original object assigned to `s1` is released for garbage collection because no other variable holds a reference to it.

```csharp
string s1 = "A string is more ";
string s2 = "than the sum of its chars.";

// Concatenate s1 and s2. This actually creates a new
// string object and stores it in s1, releasing the
// reference to the original object.
s1 += s2;

System.Console.WriteLine(s1);
// Output: A string is more than the sum of its chars.
```
Because a string "modification" is actually a new string creation, you must use caution when you create references to strings. If you create a reference to a string, and then "modify" the original string, the reference continues to point to the original object. The original object doesn't reflect the new object that was created when the string was modified. The following code illustrates this behavior:

```csharp
string str1 = "Hello ";
string str2 = str1;
str1 += "World";

System.Console.WriteLine(str2);
//Output: Hello
```
For more information about how to create new strings that are based on modifications such as search and replace operations on the original string, see How to modify string contents.

## Quoted string literals

*Quoted string literals* start and end with a single double quote character (`"`) on the same line. Quoted string literals are best suited for strings that fit on a single line and don't include any escape sequences. A quoted string literal must embed escape characters, as shown in the following example:

```csharp
string columns = "Column 1\tColumn 2\tColumn 3";
//Output: Column 1        Column 2        Column 3

string rows = "Row 1\r\nRow 2\r\nRow 3";
/* Output:
    Row 1
    Row 2
    Row 3
*/

string title = "\"The \u00C6olean Harp\", by Samuel Taylor Coleridge";
//Output: "The Æolean Harp", by Samuel Taylor Coleridge
```
## Verbatim string literals

*Verbatim string literals* are more convenient for multi-line strings, strings that contain backslash characters, or embedded double quotes. Verbatim strings preserve new line characters as part of the string text. Use double quotation marks to embed a quotation mark inside a verbatim string. The following example shows some common uses for verbatim strings:

```csharp
string title = "\"The \u00C6olean Harp\", by Samuel Taylor Coleridge";
//Output: "The Æolean Harp", by Samuel Taylor Coleridge

string filePath = @"C:\Users\scoleridge\Documents\";
//Output: C:\Users\scoleridge\Documents\

string text = @"My pensive SARA ! thy soft cheek reclined
    Thus on mine arm, most soothing sweet it is
    To sit beside our Cot,...";
/* Output:
My pensive SARA ! thy soft cheek reclined
    Thus on mine arm, most soothing sweet it is
    To sit beside our Cot,...
*/

string quote = @"Her name was ""Sara.""";
//Output: Her name was "Sara."
```
## Raw string literals

You can use *raw string literals* to more easily create strings that are multi-line, or use any characters requiring escape sequences. *Raw string literals* remove the need to ever use escape sequences. You can write the string, including whitespace formatting, how you want it to appear in output. A *raw string literal*:

- Starts and ends with a sequence of at least three double quote characters (`"""`). You can use more than three consecutive characters to start and end the sequence to support string literals that contain three (or more) repeated quote characters.
- Single line raw string literals require the opening and closing quote characters on the same line.
- Multi-line raw string literals require both opening and closing quote characters on their own line.
- In multi-line raw string literals, any whitespace to the left of the closing quotes is removed from all lines of the raw string literal.
- In multi-line raw string literals, whitespace following the opening quote on the same line is ignored.
- In multi-line raw string literals, whitespace only lines following the opening quote are included in the string literal.

The following examples demonstrate these rules:

```csharp
string singleLine = """Friends say "hello" as they pass by.""";
string multiLine = """
    "Hello World!" is typically the first program someone writes.
    """;
string embeddedXML = """
       <element attr = "content">
           <body style="normal">
               Here is the main text
           </body>
           <footer>
               Excerpts from "An amazing story"
           </footer>
       </element >
       """;
// The line "<element attr = "content">" starts in the first column.
// All whitespace left of that column is removed from the string.

string rawStringLiteralDelimiter = """"
    Raw string literals are delimited 
    by a string of at least three double quotes,
    like this: """
    """";
```
The following examples demonstrate the compiler errors reported based on these rules:

```csharp
// CS8997: Unterminated raw string literal.
var multiLineStart = """This
    is the beginning of a string 
    """;

// CS9000: Raw string literal delimiter must be on its own line.
var multiLineEnd = """
    This is the beginning of a string """;

// CS8999: Line does not start with the same whitespace as the closing line
// of the raw string literal
var noOutdenting = """
    A line of text.
Trying to outdent the second line.
    """;
```
The first two examples are invalid because multiline raw string literals require the opening and closing quote sequence on its own line. The third example is invalid because the text is outdented from the closing quote sequence.

You should consider raw string literals when you're generating text that includes characters that require escape sequences when using quoted string literals or verbatim string literals. Raw string literals are easier for you and others to read because it more closely resembles the output text. For example, consider the following code that includes a string of formatted JSON:

```csharp
string jsonString = """
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "Hot",
  "DatesAvailable": [
    "2019-08-01T00:00:00-07:00",
    "2019-08-02T00:00:00-07:00"
  ],
  "TemperatureRanges": {
    "Cold": {
      "High": 20,
      "Low": -10
    },
    "Hot": {
      "High": 60,
      "Low": 20
    }
            },
  "SummaryWords": [
    "Cool",
    "Windy",
    "Humid"
  ]
}
""";
```
> **Tip:**
> Visual Studio and the C# Dev Kit provide some validation and syntax highlighting when raw string literals contain JSON data or regular expressions.
>
> The tools parse the text. If the tools have confidence that the text represents JSON or a regular expression, the editor provides syntax coloring.
>
> You can improve that experience by adding a comment above the declaration indicating the format:
>
> - `// lang=json` indicates the raw string literal represents JSON data.
> - `// lang=regex` indicates the raw string literal represents a regular expression.
>
> When a raw string literal is used as an argument where the parameter uses the `System.Diagnostics.CodeAnalysis.StringSyntaxAttribute` to indicate a format, these tools validate the raw string literal for some of the format types. Both JSON and regex are supported.
>
> For some formats, the comment or the attribute enables code suggestions offer fixes for string literals based on the format.

### String escape sequences

| Escape sequence | Character name                   | Unicode encoding                                       |
|-----------------|----------------------------------|--------------------------------------------------------|
| `\'`            | Single quote                     | 0x0027                                                 |
| `\"`            | Double quote                     | 0x0022                                                 |
| `\\`            | Backslash                        | 0x005C                                                 |
| `\0`            | Null                             | 0x0000                                                 |
| `\a`            | Alert                            | 0x0007                                                 |
| `\b`            | Backspace                        | 0x0008                                                 |
| `\e`            | Escape                           | 0x001B                                                 |
| `\f`            | Form feed                        | 0x000C                                                 |
| `\n`            | New line                         | 0x000A                                                 |
| `\r`            | Carriage return                  | 0x000D                                                 |
| `\t`            | Horizontal tab                   | 0x0009                                                 |
| `\v`            | Vertical tab                     | 0x000B                                                 |
| `\u`            | Unicode escape sequence (UTF-16) | `\uHHHH` (range: 0000 - FFFF; example: `\u00E7` = "ç") |
| `\U`            |Unicode escape sequence (UTF-32)  |`\U00HHHHHH` (range: 000000 - 10FFFF; example: `\U0001F47D` = "&#x1F47D;")|
| `\x`            |Unicode escape sequence similar to "\u" except with variable length|`\xHH[H]` (range: 0 - FFFF; example: `\x00E7` or `\x0E7` or `\xE7` = "ç")|

> **Warning:**
> When you use the `\x` escape sequence and specifying less than 4 hex digits, if the characters that immediately follow the escape sequence are valid hex digits (such as 0-9, A-F, and a-f), they're interpreted as being part of the escape sequence. For example, `\xA1` produces "&#161;", which is code point U+00A1. However, if the next character is "A" or "a", then the escape sequence will instead be interpreted as being `\xA1A` and produce "&#x0A1A;", which is code point U+0A1A. In such cases, specifying all 4 hex digits (for example, `\x00A1`) prevents any possible misinterpretation.

> **Note:**
> At compile time, verbatim and raw strings are converted to ordinary strings with all the same escape sequences. Therefore, if you view a verbatim or raw string in the debugger watch window, you see the escape characters added by the compiler, not the verbatim, or raw version from your source code. For example, the verbatim string `@"C:\files.txt"` appears in the watch window as `"C:\\files.txt"`.
