---
title: "Separate strings into substrings (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/divide-up-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Separate strings into substrings (part 3 of 3)

```csharp
using System;

public class RegExExamples
{
    public static void Example1()
    {
        String[] expressions = { "16 + 21", "31 * 3", "28 / 3",
                               "42 - 18", "12 * 7",
                               "2, 4, 6, 8" };
        String pattern = @"(\d+)\s+([-+*/])\s+(\d+)";

        foreach (string expression in expressions)
        {
            foreach (System.Text.RegularExpressions.Match m in
            System.Text.RegularExpressions.Regex.Matches(expression, pattern))
            {
                int value1 = Int32.Parse(m.Groups[1].Value);
                int value2 = Int32.Parse(m.Groups[3].Value);
                switch (m.Groups[2].Value)
                {
                    case "+":
                        Console.WriteLine($"{m.Value} = {value1 + value2}");
                        break;
                    case "-":
                        Console.WriteLine($"{m.Value} = {value1 - value2}");
                        break;
                    case "*":
                        Console.WriteLine($"{m.Value} = {value1 * value2}");
                        break;
                    case "/":
                        Console.WriteLine($"{m.Value} = {value1 / value2:N2}");
                        break;
                }
            }
        }

        // The example displays the following output:
        //       16 + 21 = 37
        //       31 * 3 = 93
        //       28 / 3 = 9.33
        //       42 - 18 = 24
        //       12 * 7 = 84
    }

    public static void Example2()
    {
        String input = "[This is captured\ntext.]\n\n[\n" +
                       "[This is more captured text.]\n]\n" +
                       "[Some more captured text:\n   Option1" +
                       "\n   Option2][Terse text.]";
        String pattern = @"\[([^\[\]]+)\]";
        int ctr = 0;

        foreach (System.Text.RegularExpressions.Match m in
           System.Text.RegularExpressions.Regex.Matches(input, pattern))
        {
            Console.WriteLine($"{++ctr}: {m.Groups[1].Value}");
        }

        // The example displays the following output:
        //       1: This is captured
        //       text.
        //       2: This is more captured text.
        //       3: Some more captured text:
        //          Option1
        //          Option2
        //       4: Terse text.
    }

    public static void Example3()
    {
        String input = "abacus -- alabaster - * - atrium -+- " +
                       "any -*- actual - + - armoire - - alarm";
        String pattern = @"\s-\s?[+*]?\s?-\s";
        String[] elements = System.Text.RegularExpressions.Regex.Split(input, pattern);

        foreach (string element in elements)
            Console.WriteLine(element);

        // The example displays the following output:
        //       abacus
        //       alabaster
        //       atrium
        //       any
        //       actual
        //       armoire
        //       alarm
    }
}
```
```vb
﻿' Visual Basic .NET Document
Option Strict On

Imports System.Text.RegularExpressions

Module RegExExamples
    Public Sub Example1()
        Dim expressions() As String = {"16 + 21", "31 * 3", "28 / 3",
                                      "42 - 18", "12 * 7",
                                      "2, 4, 6, 8"}

        Dim pattern As String = "(\d+)\s+([-+*/])\s+(\d+)"
        For Each expression In expressions
            For Each m As Match In Regex.Matches(expression, pattern)
                Dim value1 As Integer = Int32.Parse(m.Groups(1).Value)
                Dim value2 As Integer = Int32.Parse(m.Groups(3).Value)
                Select Case m.Groups(2).Value
                    Case "+"
                        Console.WriteLine("{0} = {1}", m.Value, value1 + value2)
                    Case "-"
                        Console.WriteLine("{0} = {1}", m.Value, value1 - value2)
                    Case "*"
                        Console.WriteLine("{0} = {1}", m.Value, value1 * value2)
                    Case "/"
                        Console.WriteLine("{0} = {1:N2}", m.Value, value1 / value2)
                End Select
            Next
        Next

        ' The example displays the following output:
        '       16 + 21 = 37
        '       31 * 3 = 93
        '       28 / 3 = 9.33
        '       42 - 18 = 24
        '       12 * 7 = 84
    End Sub

    Public Sub Example2()
        Dim input As String = String.Format("[This is captured{0}text.]" +
                                          "{0}{0}[{0}[This is more " +
                                          "captured text.]{0}{0}" +
                                          "[Some more captured text:" +
                                          "{0}   Option1" +
                                          "{0}   Option2][Terse text.]",
                                          vbCrLf)
        Dim pattern As String = "\[([^\[\]]+)\]"
        Dim ctr As Integer = 0
        For Each m As Match In Regex.Matches(input, pattern)
            ctr += 1
            Console.WriteLine("{0}: {1}", ctr, m.Groups(1).Value)
        Next

        ' The example displays the following output:
        '       1: This is captured
        '       text.
        '       2: This is more captured text.
        '       3: Some more captured text:
        '          Option1
        '          Option2
        '       4: Terse text.
    End Sub

    Public Sub Example3()
        Dim input As String = "abacus -- alabaster - * - atrium -+- " +
                            "any -*- actual - + - armoire - - alarm"
        Dim pattern As String = "\s-\s?[+*]?\s?-\s"
        Dim elements() As String = Regex.Split(input, pattern)
        For Each element In elements
            Console.WriteLine(element)
        Next

        ' The example displays the following output:
        '       abacus
        '       alabaster
        '       atrium
        '       any
        '       actual
        '       armoire
        '       alarm
    End Sub
End Module
```
The regular expression pattern `\s-\s?[+*]?\s?-\s` is defined like this:

|Pattern|Description|
|-------------|-----------------|
|`\s-`|Match a white-space character followed by a hyphen.|
|`\s?`|Match zero or one white-space character.|
|`[+*]?`|Match zero or one occurrence of either the + or * character.|
|`\s?`|Match zero or one white-space character.|
|`-\s`|Match a hyphen followed by a white-space character.|

## String.IndexOf and String.Substring methods

If you aren't interested in all of the substrings in a string, you might prefer to work with one of the string comparison methods that returns the index at which the match begins. You can then call the `System.String.Substring*` method to extract the substring that you want. The string comparison methods include:

- `System.String.IndexOf*`, which returns the zero-based index of the first occurrence of a character or string in a string instance.

- `System.String.IndexOfAny*`, which returns the zero-based index in the current string instance of the first occurrence of any character in a character array.

- `System.String.LastIndexOf*`, which returns the zero-based index of the last occurrence of a character or string in a string instance.

- `System.String.LastIndexOfAny*`, which returns a zero-based index in the current string instance of the last occurrence of any character in a character array.

The following example uses the `System.String.IndexOf*` method to find the periods in a string. It then uses the `System.String.Substring*` method to return full sentences.

```csharp
﻿using System;
using System.Collections.Generic;

public class IndexOfExample
{
    public static void Example1()
    {
        String s = "This is the first sentence in a string. " +
                       "More sentences will follow. For example, " +
                       "this is the third sentence. This is the " +
                       "fourth. And this is the fifth and final " +
                       "sentence.";
        var sentences = new List<String>();
        int start = 0;
        int position;

        // Extract sentences from the string.
        do
        {
            position = s.IndexOf('.', start);
            if (position >= 0)
            {
                sentences.Add(s.Substring(start, position - start + 1).Trim());
                start = position + 1;
            }
        } while (position > 0);

        // Display the sentences.
        foreach (var sentence in sentences)
            Console.WriteLine(sentence);

        // The example displays the following output:
        //       This is the first sentence in a string.
        //       More sentences will follow.
        //       For example, this is the third sentence.
        //       This is the fourth.
        //       And this is the fifth and final sentence.
    }
}
```
```vb
﻿' Visual Basic .NET Document
Option Strict On

Module Example
    Public Sub Example1()
        Dim input As String = "This is the first sentence in a string. " +
                            "More sentences will follow. For example, " +
                            "this is the third sentence. This is the " +
                            "fourth. And this is the fifth and final " +
                            "sentence."
        Dim sentences As New List(Of String)
        Dim start As Integer = 0
        Dim position As Integer

        ' Extract sentences from the string.
        Do
            position = input.IndexOf("."c, start)
            If position >= 0 Then
                sentences.Add(input.Substring(start, position - start + 1).Trim())
                start = position + 1
            End If
        Loop While position > 0

        ' Display the sentences.
        For Each sentence In sentences
            Console.WriteLine(sentence)
        Next
    End Sub

    ' The example displays the following output:
    '       This is the first sentence in a string.
    '       More sentences will follow.
    '       For example, this is the third sentence.
    '       This is the fourth.
    '       And this is the fifth and final sentence.
End Module
```
## Ranges and indices

The C# range operator `..` and the index-from-end operator `^` let you extract substrings using a concise syntax. You can apply these operators directly to strings without calling `System.String.Substring*`.

The following example shows several ways to extract parts of a string using ranges:

```csharp
string str = "Hello, World!";

// Get the first 5 characters.
string hello = str[..5];
Console.WriteLine(hello);
// Output: Hello

// Get the last 6 characters.
string world = str[^6..];
Console.WriteLine(world);
// Output: World!

// Get characters from index 7 through 11 (exclusive of 12).
string substr = str[7..12];
Console.WriteLine(substr);
// Output: World
```
The next example uses the index-from-end operator to remove a file extension (the last three characters) from a path:

```csharp
string filePath = "C:\\Users\\user1\\bin\\fileA.cs";

// Remove the last 3 characters (.cs extension).
string trimmedPath = filePath[..^3];
Console.WriteLine(trimmedPath);
// Output: C:\Users\user1\bin\fileA
```
> **Note:**
> Ranges and the index-from-end operator are C# features. Visual Basic doesn't support this syntax; use `System.String.Substring*` instead.

## See also

- .NET regular expressions
- Split strings into substrings in C#
- Indices and ranges (C# guide)
