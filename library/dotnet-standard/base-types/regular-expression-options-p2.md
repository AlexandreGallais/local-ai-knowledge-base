---
title: "Options for regular expression (part 2 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/regular-expression-options.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Options for regular expression (part 2 of 6)

## Default options

The `System.Text.RegularExpressions.RegexOptions.None` option indicates that no options have been specified, and the regular expression engine uses its default behavior. This includes the following:

- The pattern is interpreted as a canonical rather than an ECMAScript regular expression.

- The regular expression pattern is matched in the input string from left to right.

- Comparisons are case-sensitive.

- The `^` and `$` language elements indicate the beginning and end of the input string. The end of the input string can be a trailing newline `\n` character.

- The `.` language element matches every character except `\n`.

- Any white space in a regular expression pattern is interpreted as a literal space character.

- The conventions of the current culture are used when comparing the pattern to the input string.

- Capturing groups in the regular expression pattern are implicit as well as explicit.

> **Note:**
> The `System.Text.RegularExpressions.RegexOptions.None` option has no inline equivalent. When regular expression options are applied inline, the default behavior is restored on an option-by-option basis, by turning a particular option off. For example, `(?i)` turns on case-insensitive comparison, and `(?-i)` restores the default case-sensitive comparison.

Because the `System.Text.RegularExpressions.RegexOptions.None` option represents the default behavior of the regular expression engine, it is rarely explicitly specified in a method call. A constructor or static pattern-matching method without an `options` parameter is called instead.

## Case-insensitive matching

The `System.Text.RegularExpressions.RegexOptions.IgnoreCase` option, or the `i` inline option, provides case-insensitive matching. By default, the casing conventions of the current culture are used.

The following example defines a regular expression pattern, `\bthe\w*\b`, that matches all words starting with "the". Because the first call to the `System.Text.RegularExpressions.Regex.Match*` method uses the default case-sensitive comparison, the output indicates that the string "The" that begins the sentence is not matched. It is matched when the `System.Text.RegularExpressions.Regex.Match*` method is called with options set to `System.Text.RegularExpressions.RegexOptions.IgnoreCase`.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\bthe\w*\b";
      string input = "The man then told them about that event.";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"Found {match.Value} at index {match.Index}.");

      Console.WriteLine();
      foreach (Match match in Regex.Matches(input, pattern,
                                            RegexOptions.IgnoreCase))
         Console.WriteLine($"Found {match.Value} at index {match.Index}.");
   }
}
// The example displays the following output:
//       Found then at index 8.
//       Found them at index 18.
//
//       Found The at index 0.
//       Found then at index 8.
//       Found them at index 18.
```

The following example modifies the regular expression pattern from the previous example to use inline options instead of the `options` parameter to provide case-insensitive comparison. The first pattern defines the case-insensitive option in a grouping construct that applies only to the letter "t" in the string "the". Because the option construct occurs at the beginning of the pattern, the second pattern applies the case-insensitive option to the entire regular expression.

```csharp
using System;
using System.Text.RegularExpressions;

public class CaseExample
{
    public static void Main()
    {
        string pattern = @"\b(?i:t)he\w*\b";
        string input = "The man then told them about that event.";
        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine($"Found {match.Value} at index {match.Index}.");

        Console.WriteLine();
        pattern = @"(?i)\bthe\w*\b";
        foreach (Match match in Regex.Matches(input, pattern,
                                              RegexOptions.IgnoreCase))
            Console.WriteLine($"Found {match.Value} at index {match.Index}.");
    }
}
// The example displays the following output:
//       Found The at index 0.
//       Found then at index 8.
//       Found them at index 18.
//
//       Found The at index 0.
//       Found then at index 8.
//       Found them at index 18.
```

## Multiline mode

The `System.Text.RegularExpressions.RegexOptions.Multiline` option, or the `m` inline option, enables the regular expression engine to handle an input string that consists of multiple lines. It changes the interpretation of the `^` and `$` language elements so that they indicate the beginning and end of a line, instead of the beginning and end of the input string.

By default, `$` will be satisfied only at the end of the input string. If you specify the `System.Text.RegularExpressions.RegexOptions.Multiline` option, it will be satisfied by either the newline character (`\n`) or the end of the input string.

In neither case does `$` recognize the carriage return/line feed character combination (`\r\n`). `$` always ignores any carriage return (`\r`). To end your match with either `\r\n` or `\n`, use the subexpression `\r?$` instead of just `$`. Note that this will make the `\r` part of the match.

> **Tip:**
> Starting with .NET 11, you can use `System.Text.RegularExpressions.RegexOptions.AnyNewLine` to make `^`, `$`, `\Z`, and `.` recognize all common newline sequences instead of only `\n`, removing the need for `\r?` workarounds. `AnyNewLine` also treats `\r\n` as an atomic newline sequence, so `\r` is never included in the match. For more information, see the AnyNewLine mode section.

The following example extracts bowlers' names and scores and adds them to a `System.Collections.Generic.SortedList`2` collection that sorts them in descending order. The `System.Text.RegularExpressions.Regex.Matches*` method is called twice. In the first method call, the regular expression is `^(\w+)\s(\d+)$` and no options are set. As the output shows, because the regular expression engine cannot match the input pattern along with the beginning and end of the input string, no matches are found. In the second method call, the regular expression is changed to `^(\w+)\s(\d+)\r?$` and the options are set to `System.Text.RegularExpressions.RegexOptions.Multiline`. As the output shows, the names and scores are successfully matched, and the scores are displayed in descending order.

```csharp
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class Multiline1Example
{
    public static void Main()
    {
        SortedList<int, string> scores = new SortedList<int, string>(new DescendingComparer1<int>());

        string input = "Joe 164\n" +
                       "Sam 208\n" +
                       "Allison 211\n" +
                       "Gwen 171\n";
        string pattern = @"^(\w+)\s(\d+)$";
        bool matched = false;

        Console.WriteLine("Without Multiline option:");
        foreach (Match match in Regex.Matches(input, pattern))
        {
            scores.Add(Int32.Parse(match.Groups[2].Value), (string)match.Groups[1].Value);
            matched = true;
        }
        if (!matched)
            Console.WriteLine("   No matches.");
        Console.WriteLine();

        // Redefine pattern to handle multiple lines.
        pattern = @"^(\w+)\s(\d+)\r*$";
        Console.WriteLine("With multiline option:");
        foreach (Match match in Regex.Matches(input, pattern, RegexOptions.Multiline))
            scores.Add(Int32.Parse(match.Groups[2].Value), (string)match.Groups[1].Value);

        // List scores in descending order.
        foreach (KeyValuePair<int, string> score in scores)
            Console.WriteLine($"{score.Value}: {score.Key}");
    }
}

public class DescendingComparer1<T> : IComparer<T>
{
    public int Compare(T x, T y)
    {
        return Comparer<T>.Default.Compare(x, y) * -1;
    }
}
// The example displays the following output:
//   Without Multiline option:
//      No matches.
//
//   With multiline option:
//   Allison: 211
//   Sam: 208
//   Gwen: 171
//   Joe: 164
```

The regular expression pattern `^(\w+)\s(\d+)\r*$` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`^`|Begin at the start of the line.|
|`(\w+)`|Match one or more word characters. This is the first capturing group.|
|`\s`|Match a white-space character.|
|`(\d+)`|Match one or more decimal digits. This is the second capturing group.|
|`\r?`|Match zero or one carriage return character.|
|`$`|End at the end of the line.|

The following example is equivalent to the previous one, except that it uses the inline option `(?m)` to set the multiline option.

```csharp
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class Multiline2Example
{
    public static void Main()
    {
        SortedList<int, string> scores = new SortedList<int, string>(new DescendingComparer<int>());

        string input = "Joe 164\n" +
                       "Sam 208\n" +
                       "Allison 211\n" +
                       "Gwen 171\n";
        string pattern = @"(?m)^(\w+)\s(\d+)\r*$";

        foreach (Match match in Regex.Matches(input, pattern, RegexOptions.Multiline))
            scores.Add(Convert.ToInt32(match.Groups[2].Value), match.Groups[1].Value);

        // List scores in descending order.
        foreach (KeyValuePair<int, string> score in scores)
            Console.WriteLine($"{score.Value}: {score.Key}");
    }
}

public class DescendingComparer<T> : IComparer<T>
{
    public int Compare(T x, T y)
    {
        return Comparer<T>.Default.Compare(x, y) * -1;
    }
}
// The example displays the following output:
//    Allison: 211
//    Sam: 208
//    Gwen: 171
//    Joe: 164
```

## Single-line mode

The `System.Text.RegularExpressions.RegexOptions.Singleline` option, or the `s` inline option, causes the regular expression engine to treat the input string as if it consists of a single line. It does this by changing the behavior of the period (`.`) language element so that it matches every character, instead of matching every character except for the newline character `\n`.

The following example illustrates how the behavior of the `.` language element changes when you use the `System.Text.RegularExpressions.RegexOptions.Singleline` option. The regular expression `^.+` starts at the beginning of the string and matches every character. By default, the match ends at the end of the first line; the regular expression pattern matches the carriage return character `\r`, but it does not match `\n`. Because the `System.Text.RegularExpressions.RegexOptions.Singleline` option interprets the entire input string as a single line, it matches every character in the input string, including `\n`.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = "^.+";
      string input = "This is one line and" + Environment.NewLine + "this is the second.";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine(Regex.Escape(match.Value));

      Console.WriteLine();
      foreach (Match match in Regex.Matches(input, pattern, RegexOptions.Singleline))
         Console.WriteLine(Regex.Escape(match.Value));
   }
}
// The example displays the following output:
//       This\ is\ one\ line\ and\r
//
//       This\ is\ one\ line\ and\r\nthis\ is\ the\ second\.
```

The following example is equivalent to the previous one, except that it uses the inline option `(?s)` to enable single-line mode.

```csharp
using System;
using System.Text.RegularExpressions;

public class SingleLineExample
{
    public static void Main()
    {
        string pattern = "(?s)^.+";
        string input = "This is one line and" + Environment.NewLine + "this is the second.";

        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine(Regex.Escape(match.Value));
    }
}
// The example displays the following output:
//       This\ is\ one\ line\ and\r\nthis\ is\ the\ second\.
```
