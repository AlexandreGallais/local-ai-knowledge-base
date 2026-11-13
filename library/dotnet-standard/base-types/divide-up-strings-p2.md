---
title: "Separate strings into substrings (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/divide-up-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Separate strings into substrings (part 2 of 3)

## Regular expressions

If your string conforms to a fixed pattern, you can use a regular expression to extract and handle its elements. For example, if strings take the form "*number* *operand* *number*", you can use a regular expression to extract and handle the string's elements. Here's an example:

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
The regular expression pattern `(\d+)\s+([-+*/])\s+(\d+)` is defined like this:

|Pattern|Description|
|-------------|-----------------|
|`(\d+)`|Match one or more decimal digits. This is the first capturing group.|
|`\s+`|Match one or more white-space characters.|
|`([-+*/])`|Match an arithmetic operator sign (+, -, *, or /). This is the second capturing group.|
|`\s+`|Match one or more white-space characters.|
|`(\d+)`|Match one or more decimal digits. This is the third capturing group.|

You can also use a regular expression to extract substrings from a string based on a pattern rather than a fixed set of characters. This is a common scenario when either of these conditions occurs:

- One or more of the delimiter characters does not *always* serve as a delimiter in the `System.String` instance.

- The sequence and number of delimiter characters is variable or unknown.

For example, the `System.String.Split*` method cannot be used to split the following string, because the number of `\n` (newline) characters is variable, and they don't always serve as delimiters.

```text
[This is captured\ntext.]\n\n[\n[This is more captured text.]\n]
\n[Some more captured text:\n   Option1\n   Option2][Terse text.]
```

A regular expression can split this string easily, as the following example shows.

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
The regular expression pattern `\[([^\[\]]+)\]` is defined like this:

|Pattern|Description|
|-------------|-----------------|
|`\[`|Match an opening bracket.|
|`([^\[\]]+)`|Match any character that is not an opening or a closing bracket one or more times. This is the first capturing group.|
|`\]`|Match a closing bracket.|

The `System.Text.RegularExpressions.Regex.Split*` method is almost identical to `System.String.Split*`, except that it splits a string based on a regular expression pattern instead of a fixed character set. For example, the following example uses the `System.Text.RegularExpressions.Regex.Split*` method to split a string that contains substrings delimited by various combinations of hyphens and other characters.
