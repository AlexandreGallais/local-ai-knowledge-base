---
title: "Separate strings into substrings (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/divide-up-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Extract substrings from a string

This article covers some different techniques for extracting parts of a string.

- Use the Split method when the substrings you want are separated by a known delimiting character (or characters).
- Regular expressions are useful when the string conforms to a fixed pattern.
- Use the IndexOf and Substring methods in conjunction when you don't want to extract *all* of the substrings in a string.
- Use ranges and indices in C# to extract or trim characters at known positions.

## String.Split method

`System.String.Split*` provides a handful of overloads to help you break up a string into a group of substrings based on one or more delimiting characters that you specify. You can choose to limit the total number of substrings in the final result, trim white-space characters from substrings, or exclude empty substrings.

The following examples show three different overloads of `String.Split()`. The first example calls the `System.String.Split(System.Char[])` overload without passing any separator characters. When you don't specify any delimiting characters, `String.Split()` uses default delimiters, which are white-space characters, to split up the string.

```csharp
﻿using System;

class Intro
{
    public static void Intro1()
    {
        string s = "You win some. You lose some.";

        string[] subs = s.Split();

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some.
        // Substring: You
        // Substring: lose
        // Substring: some.
    }

    public static void Intro2()
    {
        string s = "You win some. You lose some.";

        string[] subs = s.Split(' ', '.');

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some
        // Substring:
        // Substring: You
        // Substring: lose
        // Substring: some
        // Substring:
    }

    public static void Intro3()
    {
        string s = "You win some. You lose some.";
        char[] separators = new char[] { ' ', '.' };

        string[] subs = s.Split(separators, StringSplitOptions.RemoveEmptyEntries);

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some
        // Substring: You
        // Substring: lose
        // Substring: some
    }
}
```
```vb
﻿Module IntroExamples

    Sub Intro1()
        Dim s As String = "You win some. You lose some."
        Dim subs As String() = s.Split()

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some.
        ' Substring: You
        ' Substring: lose
        ' Substring: some.
    End Sub

    Sub Intro2()
        Dim s As String = "You win some. You lose some."
        Dim subs As String() = s.Split(" "c, "."c)

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some
        ' Substring:
        ' Substring: You
        ' Substring: lose
        ' Substring: some
        ' Substring:
    End Sub

    Sub Intro3()
        Dim s As String = "You win some. You lose some."
        Dim separators As Char() = New Char() {" "c, "."c}
        Dim subs As String() = s.Split(separators, StringSplitOptions.RemoveEmptyEntries)

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some
        ' Substring: You
        ' Substring: lose
        ' Substring: some
    End Sub
End Module
```
As you can see, the period characters (`.`) are included in two of the substrings. If you want to exclude the period characters, you can add the period character as an additional delimiting character. The next example shows how to do this.

```csharp
﻿using System;

class Intro
{
    public static void Intro1()
    {
        string s = "You win some. You lose some.";

        string[] subs = s.Split();

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some.
        // Substring: You
        // Substring: lose
        // Substring: some.
    }

    public static void Intro2()
    {
        string s = "You win some. You lose some.";

        string[] subs = s.Split(' ', '.');

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some
        // Substring:
        // Substring: You
        // Substring: lose
        // Substring: some
        // Substring:
    }

    public static void Intro3()
    {
        string s = "You win some. You lose some.";
        char[] separators = new char[] { ' ', '.' };

        string[] subs = s.Split(separators, StringSplitOptions.RemoveEmptyEntries);

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some
        // Substring: You
        // Substring: lose
        // Substring: some
    }
}
```
```vb
﻿Module IntroExamples

    Sub Intro1()
        Dim s As String = "You win some. You lose some."
        Dim subs As String() = s.Split()

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some.
        ' Substring: You
        ' Substring: lose
        ' Substring: some.
    End Sub

    Sub Intro2()
        Dim s As String = "You win some. You lose some."
        Dim subs As String() = s.Split(" "c, "."c)

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some
        ' Substring:
        ' Substring: You
        ' Substring: lose
        ' Substring: some
        ' Substring:
    End Sub

    Sub Intro3()
        Dim s As String = "You win some. You lose some."
        Dim separators As Char() = New Char() {" "c, "."c}
        Dim subs As String() = s.Split(separators, StringSplitOptions.RemoveEmptyEntries)

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some
        ' Substring: You
        ' Substring: lose
        ' Substring: some
    End Sub
End Module
```
The periods are gone from the substrings, but now two extra empty substrings have been included. These empty substring represent the substring between the word and the period that follows it. To omit empty substrings from the resulting array, you can call the
`System.String.Split(System.Char[],System.StringSplitOptions)` overload and specify
`System.StringSplitOptions.RemoveEmptyEntries` for the `options` parameter.

```csharp
﻿using System;

class Intro
{
    public static void Intro1()
    {
        string s = "You win some. You lose some.";

        string[] subs = s.Split();

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some.
        // Substring: You
        // Substring: lose
        // Substring: some.
    }

    public static void Intro2()
    {
        string s = "You win some. You lose some.";

        string[] subs = s.Split(' ', '.');

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some
        // Substring:
        // Substring: You
        // Substring: lose
        // Substring: some
        // Substring:
    }

    public static void Intro3()
    {
        string s = "You win some. You lose some.";
        char[] separators = new char[] { ' ', '.' };

        string[] subs = s.Split(separators, StringSplitOptions.RemoveEmptyEntries);

        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");
        }

        // This example produces the following output:
        //
        // Substring: You
        // Substring: win
        // Substring: some
        // Substring: You
        // Substring: lose
        // Substring: some
    }
}
```
```vb
﻿Module IntroExamples

    Sub Intro1()
        Dim s As String = "You win some. You lose some."
        Dim subs As String() = s.Split()

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some.
        ' Substring: You
        ' Substring: lose
        ' Substring: some.
    End Sub

    Sub Intro2()
        Dim s As String = "You win some. You lose some."
        Dim subs As String() = s.Split(" "c, "."c)

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some
        ' Substring:
        ' Substring: You
        ' Substring: lose
        ' Substring: some
        ' Substring:
    End Sub

    Sub Intro3()
        Dim s As String = "You win some. You lose some."
        Dim separators As Char() = New Char() {" "c, "."c}
        Dim subs As String() = s.Split(separators, StringSplitOptions.RemoveEmptyEntries)

        For Each substring As String In subs
            Console.WriteLine("Substring: {0}", substring)
        Next

        ' This example produces the following output:
        '
        ' Substring: You
        ' Substring: win
        ' Substring: some
        ' Substring: You
        ' Substring: lose
        ' Substring: some
    End Sub
End Module
```
