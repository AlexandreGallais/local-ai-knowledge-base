---
title: "Regular Expression Example: Scanning for HREFs"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/regular-expression-example-scanning-for-hrefs.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Regular expression example: Scanning for HREFs

The following example searches an input string and displays all the href="…" values and their locations in the string.

> **Warning:**
> Unrestricted use of `System.Text.RegularExpressions` with untrusted input can subject applications to denial-of-service attacks. Consult Best practices for regular expressions in .NET for guidance on how to safely use .NET regular expressions with untrusted input.

## The Regex object

Because the `DumpHRefs` method can be called multiple times from user code, it uses the `static` (`Shared` in Visual Basic) `System.Text.RegularExpressions.Regex.Match(System.String,System.String,System.Text.RegularExpressions.RegexOptions)` method. This enables the regular expression engine to cache the regular expression and avoids the overhead of instantiating a new `System.Text.RegularExpressions.Regex` object each time the method is called. A `System.Text.RegularExpressions.Match` object is then used to iterate through all matches in the string.

```csharp
private static void DumpHRefs(string inputString)
{
    string hrefPattern = @"href\s*=\s*(?:[""'](?<1>[^""']*)[""']|(?<1>[^>\s]+))";

    try
    {
        Match regexMatch = Regex.Match(inputString, hrefPattern,
                                       RegexOptions.IgnoreCase | RegexOptions.Compiled,
                                       TimeSpan.FromSeconds(1));
        while (regexMatch.Success)
        {
            Console.WriteLine($"Found href {regexMatch.Groups[1]} at {regexMatch.Groups[1].Index}");
            regexMatch = regexMatch.NextMatch();
        }
    }
    catch (RegexMatchTimeoutException)
    {
        Console.WriteLine("The matching operation timed out.");
    }
}
```
```vb
Private Sub DumpHRefs(inputString As String)
    Dim hrefPattern As String = "href\s*=\s*(?:[""'](?<1>[^""']*)[""']|(?<1>[^>\s]+))"

    Try
        Dim regexMatch = Regex.Match(inputString, hrefPattern,
                                     RegexOptions.IgnoreCase Or RegexOptions.Compiled,
                                     TimeSpan.FromSeconds(1))
        Do While regexMatch.Success
            Console.WriteLine($"Found href {regexMatch.Groups(1)} at {regexMatch.Groups(1).Index}.")
            regexMatch = regexMatch.NextMatch()
        Loop
    Catch e As RegexMatchTimeoutException
        Console.WriteLine("The matching operation timed out.")
    End Try
End Sub
```
The following example then illustrates a call to the `DumpHRefs` method.

```csharp
public static void Main()
{
    string inputString = "My favorite web sites include:</P>" +
                         "<A HREF=\"https://learn.microsoft.com/en-us/dotnet/\">" +
                         ".NET Documentation</A></P>" +
                         "<A HREF=\"http://www.microsoft.com\">" +
                         "Microsoft Corporation Home Page</A></P>" +
                         "<A HREF=\"https://devblogs.microsoft.com/dotnet/\">" +
                         ".NET Blog</A></P>";
    DumpHRefs(inputString);
}
// The example displays the following output:
//       Found href https://learn.microsoft.com/dotnet/ at 43
//       Found href http://www.microsoft.com at 114
//       Found href https://devblogs.microsoft.com/dotnet/ at 188
```
```vb
Public Sub Main()
    Dim inputString As String = "My favorite web sites include:</P>" &
                                "<A HREF=""https://learn.microsoft.com/en-us/dotnet/"">" &
                                ".NET Documentation</A></P>" &
                                "<A HREF=""http://www.microsoft.com"">" &
                                "Microsoft Corporation Home Page</A></P>" &
                                "<A HREF=""https://devblogs.microsoft.com/dotnet/"">" &
                                ".NET Blog</A></P>"
    DumpHRefs(inputString)
End Sub
' The example displays the following output:
'       Found href https://learn.microsoft.com/dotnet/ at 43
'       Found href http://www.microsoft.com at 114
'       Found href https://devblogs.microsoft.com/dotnet/ at 188
```
The regular expression pattern `href\s*=\s*(?:"'["']|(?<1>[^>\s]+))` is interpreted as shown in the following table.

| Pattern                | Description                                                     |
|------------------------|-----------------------------------------------------------------|
| `href`                 | Match the literal string "href". The match is case-insensitive. |
| `\s*`                  | Match zero or more white-space characters.                      |
| `=`                    | Match the equals sign.                                          |
| `\s*`                  | Match zero or more white-space characters.                      |
| `(?:`                  | Start a non-capturing group.                                    |
| `"'["']` | Match a quotation mark or apostrophe, followed by a capturing group that matches any character other than a quotation mark or apostrophe, followed by a quotation mark or apostrophe. The group named `1` is included in this pattern. |
| &#124;                 | Boolean OR that matches either the previous expression or the next expression. |
| `(?<1>[^>\s]+)`        | A capturing group that uses a negated set to match any character other than a greater-than sign or a whitespace character. The group named `1` is included in this pattern.|
| `)`                    | End the non-capturing group.                                    |

## Match result class

The results of a search are stored in the `System.Text.RegularExpressions.Match` class, which provides access to all the substrings extracted by the search. It also remembers the string being searched and the regular expression being used, so it can call the `System.Text.RegularExpressions.Match.NextMatch*` method to perform another search starting where the last one ended.

## Explicitly named captures

In traditional regular expressions, capturing parentheses are automatically numbered sequentially. This leads to two problems. First, if a regular expression is modified by inserting or removing a set of parentheses, all code that refers to the numbered captures must be rewritten to reflect the new numbering. Second, because different sets of parentheses often are used to provide two alternative expressions for an acceptable match, it might be difficult to determine which of the two expressions actually returned a result.

To address these problems, the `System.Text.RegularExpressions.Regex` class supports the syntax `(?<name>…)` for capturing a match into a specified slot (the slot can be named using a string or an integer; integers can be recalled more quickly). Thus, alternative matches for the same string all can be directed to the same place. In case of a conflict, the last match dropped into a slot is the successful match. (However, a complete list of multiple matches for a single slot is available. See the `System.Text.RegularExpressions.Group.Captures*` collection for details.)

## See also

- .NET Regular Expressions
