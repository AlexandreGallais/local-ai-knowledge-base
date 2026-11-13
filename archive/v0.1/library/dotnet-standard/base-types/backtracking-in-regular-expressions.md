---
title: "Backtracking in .NET regular expressions (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/backtracking-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Backtracking in regular expressions

Backtracking occurs when a regular expression pattern contains optional quantifiers or alternation constructs, and the regular expression engine returns to a previous saved state to continue its search for a match. Backtracking is central to the power of regular expressions; it makes it possible for expressions to be powerful and flexible, and to match very complex patterns. At the same time, this power comes at a cost. Backtracking is often the single most important factor that affects the performance of the regular expression engine. Fortunately, the developer has control over the behavior of the regular expression engine and how it uses backtracking. This article explains how backtracking works and how you can control it.

> **Warning:**
> Unrestricted use of `System.Text.RegularExpressions` with untrusted input can subject applications to denial-of-service attacks. Consult Best practices for regular expressions in .NET for guidance on how to safely use .NET regular expressions with untrusted input.

## Linear comparison without backtracking

 If a regular expression pattern has no optional quantifiers or alternation constructs, the regular expression engine executes in linear time. That is, after the regular expression engine matches the first language element in the pattern with text in the input string, it tries to match the next language element in the pattern with the next character or group of characters in the input string. This continues until the match either succeeds or fails. In either case, the regular expression engine advances by one character at a time in the input string.

 The following example provides an illustration. The regular expression `e{2}\w\b` looks for two occurrences of the letter "e" followed by any word character followed by a word boundary.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example1
{
    public static void Run()
    {
        string input = "needing a reed";
        string pattern = @"e{2}\w\b";
        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine($"{match.Value} found at position {match.Index}");
    }
}
// The example displays the following output:
//       eed found at position 11
```
```vb
﻿' Visual Basic .NET Document
Option Strict On

Imports System.Text.RegularExpressions

Module Example1
    Public Sub Run()
        Dim input As String = "needing a reed"
        Dim pattern As String = "e{2}\w\b"
        For Each match As Match In Regex.Matches(input, pattern)
            Console.WriteLine("{0} found at position {1}",
                              match.Value, match.Index)
        Next
    End Sub
End Module
' The example displays the following output:
'       eed found at position 11
```
 Although this regular expression includes the quantifier `{2}`, it is evaluated in a linear manner. The regular expression engine does not backtrack because `{2}` is not an optional quantifier; it specifies an exact number and not a variable number of times that the previous subexpression must match. As a result, the regular expression engine tries to match the regular expression pattern with the input string as shown in the following table.

| Operation | Position in pattern | Position in string         | Result                |
|-----------|---------------------|----------------------------|-----------------------|
| 1         | e                   | "needing a reed" (index 0) | No match.             |
| 2         | e                   | "eeding a reed" (index 1)  | Possible match.       |
| 3         | e{2}                | "eding a reed" (index 2)   | Possible match.       |
| 4         | \w                  | "ding a reed" (index 3)    | Possible match.       |
| 5         | \b                  | "ing a reed" (index 4)     | Possible match fails. |
| 6         | e                   | "eding a reed" (index 2)   | Possible match.       |
| 7         | e{2}                | "ding a reed" (index 3)    | Possible match fails. |
| 8         | e                   | "ding a reed" (index 3)    | Match fails.          |
| 9         | e                   | "ing a reed" (index 4)     | No match.             |
| 10        | e                   | "ng a reed" (index 5)      | No match.             |
| 11        | e                   | "g a reed" (index 6)       | No match.             |
| 12        | e                   | " a reed" (index 7)        | No match.             |
| 13        | e                   | "a reed" (index 8)         | No match.             |
| 14        | e                   | " reed" (index 9)          | No match.             |
| 15        | e                   | "reed" (index 10)          | No match              |
| 16        | e                   | "eed" (index 11)           | Possible match.       |
| 17        | e{2}                | "ed" (index 12)            | Possible match.       |
| 18        | \w                  | "d" (index 13)             | Possible match.       |
| 19        | \b                  | "" (index 14)              | Match.                |

 If a regular expression pattern includes no optional quantifiers or alternation constructs, the maximum number of comparisons required to match the regular expression pattern with the input string is roughly equivalent to the number of characters in the input string. In this case, the regular expression engine uses 19 comparisons to identify possible matches in this 13-character string.  In other words, the regular expression engine runs in near-linear time if it contains no optional quantifiers or alternation constructs.

## Backtracking with optional quantifiers or alternation constructs

 When a regular expression includes optional quantifiers or alternation constructs, the evaluation of the input string is no longer linear. Pattern matching with an Nondeterministic Finite Automaton (NFA) engine is driven by the language elements in the regular expression and not by the characters to be matched in the input string. Therefore, the regular expression engine tries to fully match optional or alternative subexpressions. When it advances to the next language element in the subexpression and the match is unsuccessful, the regular expression engine can abandon a portion of its successful match and return to an earlier saved state in the interest of matching the regular expression as a whole with the input string. This process of returning to a previous saved state to find a match is known as backtracking.

 For example, consider the regular expression pattern `.*(es)`, which matches the characters "es" and all the characters that precede it. As the following example shows, if the input string is "Essential services are provided by regular expressions.", the pattern matches the whole string up to and including the "es" in "expressions".

```csharp
using System;
using System.Text.RegularExpressions;

public class Example2
{
    public static void Run()
    {
        string input = "Essential services are provided by regular expressions.";
        string pattern = ".*(es)";
        Match m = Regex.Match(input, pattern, RegexOptions.IgnoreCase);
        if (m.Success)
        {
            Console.WriteLine($"'{m.Value}' found at position {m.Index}");
            Console.WriteLine($"'es' found at position {m.Groups[1].Index}");
        }
    }
}
//    'Essential services are provided by regular expres' found at position 0
//    'es' found at position 47
```
```vb
﻿' Visual Basic .NET Document
Option Strict On

Imports System.Text.RegularExpressions

Module Example2
    Public Sub Run()
        Dim input As String = "Essential services are provided by regular expressions."
        Dim pattern As String = ".*(es)"
        Dim m As Match = Regex.Match(input, pattern, RegexOptions.IgnoreCase)
        If m.Success Then
            Console.WriteLine("'{0}' found at position {1}",
                              m.Value, m.Index)
            Console.WriteLine("'es' found at position {0}",
                              m.Groups(1).Index)
        End If
    End Sub
End Module
'    'Essential services are provided by regular expres' found at position 0
'    'es' found at position 47
```
 To do this, the regular expression engine uses backtracking as follows:

- It matches the `.*` (which matches zero, one, or more occurrences of any character) with the whole input string.

- It attempts to match "e" in the regular expression pattern. However, the input string has no remaining characters available to match.

- It backtracks to its last successful match, "Essential services are provided by regular expressions", and attempts to match "e" with the period at the end of the sentence. The match fails.

- It continues to backtrack to a previous successful match one character at a time until the tentatively matched substring is "Essential services are provided by regular expr". It then compares the "e" in the pattern to the second "e" in "expressions" and finds a match.

- It compares "s" in the pattern to the "s" that follows the matched "e" character (the first "s" in "expressions"). The match is successful.

 When you use backtracking, matching the regular expression pattern with the input string, which is 55 characters long, requires 67 comparison operations. Generally, if a regular expression pattern has a single alternation construct or a single optional quantifier, the number of comparison operations required to match the pattern is more than twice the number of characters in the input string.

## Backtracking with nested optional quantifiers

 The number of comparison operations required to match a regular expression pattern can increase exponentially if the pattern includes a large number of alternation constructs, if it includes nested alternation constructs, or, most commonly, if it includes nested optional quantifiers. For example, the regular expression pattern `^(a+)+$` is designed to match a complete string that contains one or more "a" characters. The example provides two input strings of identical length, but only the first string matches the pattern. The `System.Diagnostics.Stopwatch` class is used to determine how long the match operation takes.

```csharp
using System;
using System.Diagnostics;
using System.Text.RegularExpressions;

public class Example3
{
    public static void Run()
    {
        string pattern = "^(a+)+$";
        string[] inputs = { "aaaaaaaaaaaaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaaaa!" };
        Regex rgx = new Regex(pattern);
        Stopwatch sw;

        foreach (string input in inputs)
        {
            sw = Stopwatch.StartNew();
            Match match = rgx.Match(input);
            sw.Stop();
            if (match.Success)
                Console.WriteLine($"Matched {match.Value} in {sw.Elapsed}");
            else
                Console.WriteLine($"No match found in {sw.Elapsed}");
        }
    }
}
//    Matched aaaaaaaaaaaaaaaaaaaaaaaaaaa in 00:00:00.0018281
//    No match found in 00:00:05.1882144
```
```vb
﻿' Visual Basic .NET Document
Option Strict On

Imports System.Text.RegularExpressions

Module Example3
    Public Sub Run()
        Dim pattern As String = "^(a+)+$"
        Dim inputs() As String = {"aaaaaaaaaaaaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaaaa!"}
        Dim rgx As New Regex(pattern)
        Dim sw As Stopwatch

        For Each input As String In inputs
            sw = Stopwatch.StartNew()
            Dim match As Match = rgx.Match(input)
            sw.Stop()
            If match.Success Then
                Console.WriteLine("Matched {0} in {1}", match.Value, sw.Elapsed)
            Else
                Console.WriteLine("No match found in {0}", sw.Elapsed)
            End If
        Next
    End Sub
End Module
'    Matched aaaaaaaaaaaaaaaaaaaaaaaaaaa in 00:00:00.0018281
'    No match found in 00:00:05.1882144
```
 As the output from the example shows, the regular expression engine took significantly longer to find that an input string *did not match* the pattern as it did to identify a matching string. This is because an unsuccessful match always represents a worst-case scenario. The regular expression engine must use the regular expression to follow all possible paths through the data before it can conclude that the match is unsuccessful, and the nested parentheses create many additional paths through the data. The regular expression engine concludes that the second string did not match the pattern by doing the following:

- It checks that it was at the beginning of the string, and then matches the first five characters in the string with the pattern `a+`. It then determines that there are no additional groups of "a" characters in the string. Finally, it tests for the end of the string. Because one additional character remains in the string, the match fails. This failed match requires 9 comparisons. The regular expression engine also saves state information from its matches of "a" (which we'll call match 1), "aa" (match 2), "aaa" (match 3), and "aaaa" (match 4).

- It returns to the previously saved match 4. It determines that there is one additional "a" character to assign to an additional captured group. Finally, it tests for the end of the string. Because one additional character remains in the string, the match fails. This failed match requires 4 comparisons. So far, a total of 13 comparisons have been performed.

- It returns to the previously saved match 3. It determines that there are two additional "a" characters to assign to an additional captured group. However, the end-of-string test fails. It then returns to match 3 and tries to match the two additional "a" characters in two additional captured groups. The end-of-string test still fails. These failed matches require 12 comparisons. So far, a total of 25 comparisons have been performed.

 Comparison of the input string with the regular expression continues in this way until the regular expression engine has tried all possible combinations of matches, and then concludes that there is no match. Because of the nested quantifiers, this comparison is an O(2n) or an exponential operation, where *n* is the number of characters in the input string. This means that in the worst case, an input string of 30 characters requires approximately 1,073,741,824 comparisons, and an input string of 40 characters requires approximately 1,099,511,627,776 comparisons. If you use strings of these or even greater lengths, regular expression methods can take an extremely long time to complete when they process input that does not match the regular expression pattern.
