---
title: "Regular Expression behavior (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/details-of-regular-expression-behavior.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Regular Expression behavior (part 2 of 3)

## .NET engine capabilities

 To take advantage of the benefits of a traditional NFA engine, the .NET regular expression engine includes a complete set of constructs to enable programmers to steer the backtracking engine. These constructs can be used to find matches faster or to favor specific expansions over others.

 Other features of the .NET regular expression engine include the following:

- Lazy quantifiers: `??`, `*?`, `+?`, `{`*n*`,`*m*`}?`. These constructs tell the backtracking engine to search the minimum number of repetitions first. In contrast, ordinary greedy quantifiers try to match the maximum number of repetitions first. The following example illustrates the difference between the two. A regular expression matches a sentence that ends in a number, and a capturing group is intended to extract that number. The regular expression `.+(\d+)\.` includes the greedy quantifier `.+`, which causes the regular expression engine to capture only the last digit of the number. In contrast, the regular expression `.+?(\d+)\.` includes the lazy quantifier `.+?`, which causes the regular expression engine to capture the entire number.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string greedyPattern = @".+(\d+)\.";
        string lazyPattern = @".+?(\d+)\.";
        string input = "This sentence ends with the number 107325.";
        Match match;

        // Match using greedy quantifier .+.
        match = Regex.Match(input, greedyPattern);
        if (match.Success)
            Console.WriteLine($"Number at end of sentence (greedy): {match.Groups[1].Value}");
        else
            Console.WriteLine($"{greedyPattern} finds no match.");

        // Match using lazy quantifier .+?.
        match = Regex.Match(input, lazyPattern);
        if (match.Success)
            Console.WriteLine($"Number at end of sentence (lazy): {match.Groups[1].Value}");
        else
            Console.WriteLine($"{lazyPattern} finds no match.");
    }
}
// The example displays the following output:
//       Number at end of sentence (greedy): 5
//       Number at end of sentence (lazy): 107325
```

     The greedy and lazy versions of this regular expression are defined as shown in the following table:

    |Pattern|Description|
    |-------------|-----------------|
    |`.+` (greedy quantifier)|Match at least one occurrence of any character. This causes the regular expression engine to match the entire string, and then to backtrack as needed to match the remainder of the pattern.|
    |`.+?` (lazy quantifier)|Match at least one occurrence of any character, but match as few as possible.|
    |`(\d+)`|Match at least one numeric character, and assign it to the first capturing group.|
    |`\.`|Match a period.|

     For more information about lazy quantifiers, see Quantifiers.

- Positive lookahead: `(?=`*subexpression*`)`. This feature allows the backtracking engine to return to the same spot in the text after matching a subexpression. It is useful for searching throughout the text by verifying multiple patterns that start from the same position. It also allows the engine to verify that a substring exists at the end of the match without including the substring in the matched text. The following example uses positive lookahead to extract the words in a sentence that are not followed by punctuation symbols.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string pattern = @"\b[A-Z]+\b(?=\P{P})";
        string input = "If so, what comes next?";
        foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnoreCase))
            Console.WriteLine(match.Value);
    }
}
// The example displays the following output:
//       If
//       what
//       comes
```

     The regular expression `\b[A-Z]+\b(?=\P{P})` is defined as shown in the following table.

    |Pattern|Description|
    |-------------|-----------------|
    |`\b`|Begin the match at a word boundary.|
    |`[A-Z]+`|Match any alphabetic character one or more times. Because the `System.Text.RegularExpressions.Regex.Matches*` method is called with the `System.Text.RegularExpressions.RegexOptions.IgnoreCase` option, the comparison is case-insensitive.|
    |`\b`|End the match at a word boundary.|
    |`(?=\P{P})`|Look ahead to determine whether the next character is a punctuation symbol. If it is not, the match succeeds.|

     For more information about positive lookahead assertions, see Grouping Constructs.

- Negative lookahead: `(?!`*subexpression*`)`. This feature adds the ability to match an expression only if a subexpression fails to match. This is powerful for pruning a search, because it is often simpler to provide an expression for a case that should be eliminated than an expression for cases that must be included. For example, it is difficult to write an expression for words that do not begin with "non". The following example uses negative lookahead to exclude them.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string pattern = @"\b(?!non)\w+\b";
        string input = "Nonsense is not always non-functional.";
        foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnoreCase))
            Console.WriteLine(match.Value);
    }
}
// The example displays the following output:
//       is
//       not
//       always
//       functional
```

     The regular expression pattern `\b(?!non)\w+\b` is defined as shown in the following table.

    |Pattern|Description|
    |-------------|-----------------|
    |`\b`|Begin the match at a word boundary.|
    |`(?!non)`|Look ahead to ensure that the current string does not begin with "non". If it does, the match fails.|
    |`(\w+)`|Match one or more word characters.|
    |`\b`|End the match at a word boundary.|

     For more information about negative lookahead assertions, see Grouping Constructs.

- Conditional evaluation: `(?(`*expression*`)`*yes*`|`*no*`)` and `(?(`*name*`)`*yes*`|`*no*`)`, where *expression* is a subexpression to match, *name* is the name of a capturing group, *yes* is the string to match if *expression* is matched or *name* is a valid, non-empty captured group, and *no* is the subexpression to match if *expression* is not matched or *name* is not a valid, non-empty captured group. This feature allows the engine to search by using more than one alternate pattern, depending on the result of a previous subexpression match or the result of a zero-width assertion. This allows a more powerful form of backreference that permits, for example, matching a subexpression based on whether a previous subexpression was matched. The regular expression in the following example matches paragraphs that are intended for both public and internal use. Paragraphs intended only for internal use begin with a `<PRIVATE>` tag. The regular expression pattern `^(?<Pvt>\<PRIVATE\>\s)?(?(Pvt)((\w+\p{P}?\s)+)|((\w+\p{P}?\s)+))\r?$` uses conditional evaluation to assign the contents of paragraphs intended for public and for internal use to separate capturing groups. These paragraphs can then be handled differently.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string input = "<PRIVATE> This is not for public consumption." + Environment.NewLine +
                       "But this is for public consumption." + Environment.NewLine +
                       "<PRIVATE> Again, this is confidential.\n";
        string pattern = @"^(?<Pvt>\<PRIVATE\>\s)?(?(Pvt)((\w+\p{P}?\s)+)|((\w+\p{P}?\s)+))\r?$";
        string publicDocument = null, privateDocument = null;

        foreach (Match match in Regex.Matches(input, pattern, RegexOptions.Multiline))
        {
            if (match.Groups[1].Success)
            {
                privateDocument += match.Groups[1].Value + "\n";
            }
            else
            {
                publicDocument += match.Groups[3].Value + "\n";
                privateDocument += match.Groups[3].Value + "\n";
            }
        }

        Console.WriteLine("Private Document:");
        Console.WriteLine(privateDocument);
        Console.WriteLine("Public Document:");
        Console.WriteLine(publicDocument);
    }
}
// The example displays the following output:
//    Private Document:
//    This is not for public consumption.
//    But this is for public consumption.
//    Again, this is confidential.
//
//    Public Document:
//    But this is for public consumption.
```

     The regular expression pattern is defined as shown in the following table.

    |Pattern|Description|
    |-------------|-----------------|
    |`^`|Begin the match at the beginning of a line.|
    |`(?<Pvt>\<PRIVATE\>\s)?`|Match zero or one occurrence of the string `<PRIVATE>` followed by a white-space character. Assign the match to a capturing group named `Pvt`.|
    |`(?(Pvt)((\w+\p{P}?\s)+)`|If the `Pvt` capturing group exists, match one or more occurrences of one or more word characters followed by zero or one punctuation separator followed by a white-space character. Assign the substring to the first capturing group.|
    |`&#124;((\w+\p{P}?\s)+))`|If the `Pvt` capturing group does not exist, match one or more occurrences of one or more word characters followed by zero or one punctuation separator followed by a white-space character. Assign the substring to the third capturing group.|
    |`\r?$`|Match the end of a line or the end of the string.|

     For more information about conditional evaluation, see Alternation Constructs.

- Balancing group definitions: `(?<`*name1*`-`*name2*`>` *subexpression*`)`. This feature allows the regular expression engine to keep track of nested constructs such as parentheses or opening and closing brackets. For an example, see Grouping Constructs.

- Atomic groups: `(?>`*subexpression*`)`. This feature allows the backtracking engine to guarantee that a subexpression matches only the first match found for that subexpression, as if the expression were running independent of its containing expression. If you do not use this construct, backtracking searches from the larger expression can change the behavior of a subexpression. For example, the regular expression `(a+)\w` matches one or more "a" characters, along with a word character that follows the sequence of "a" characters, and assigns the sequence of "a" characters to the first capturing group. However, if the final character of the input string is also an "a", it is matched by the `\w` language element and is not included in the captured group.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string[] inputs = { "aaaaa", "aaaaab" };
        string backtrackingPattern = @"(a+)\w";
        Match match;

        foreach (string input in inputs)
        {
            Console.WriteLine($"Input: {input}");
            match = Regex.Match(input, backtrackingPattern);
            Console.WriteLine($"   Pattern: {backtrackingPattern}");
            if (match.Success)
            {
                Console.WriteLine($"      Match: {match.Value}");
                Console.WriteLine($"      Group 1: {match.Groups[1].Value}");
            }
            else
            {
                Console.WriteLine("      Match failed.");
            }
        }
        Console.WriteLine();
    }
}
// The example displays the following output:
//       Input: aaaaa
//          Pattern: (a+)\w
//             Match: aaaaa
//             Group 1: aaaa
//       Input: aaaaab
//          Pattern: (a+)\w
//             Match: aaaaab
//             Group 1: aaaaa
```

     The regular expression `((?>a+))\w` prevents this behavior. Because all consecutive "a" characters are matched without backtracking, the first capturing group includes all consecutive "a" characters. If the "a" characters are not followed by at least one more character other than "a", the match fails.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string[] inputs = { "aaaaa", "aaaaab" };
        string nonbacktrackingPattern = @"((?>a+))\w";
        Match match;

        foreach (string input in inputs)
        {
            Console.WriteLine($"Input: {input}");
            match = Regex.Match(input, nonbacktrackingPattern);
            Console.WriteLine($"   Pattern: {nonbacktrackingPattern}");
            if (match.Success)
            {
                Console.WriteLine($"      Match: {match.Value}");
                Console.WriteLine($"      Group 1: {match.Groups[1].Value}");
            }
            else
            {
                Console.WriteLine("      Match failed.");
            }
        }
        Console.WriteLine();
    }
}
// The example displays the following output:
//       Input: aaaaa
//          Pattern: ((?>a+))\w
//             Match failed.
//       Input: aaaaab
//          Pattern: ((?>a+))\w
//             Match: aaaaab
//             Group 1: aaaaa
```

     For more information about atomic groups, see Grouping Constructs.

- Right-to-left matching, which is specified by supplying the `System.Text.RegularExpressions.RegexOptions.RightToLeft` option to a `System.Text.RegularExpressions.Regex` class constructor or static instance matching method. This feature is useful when searching from right to left instead of from left to right, or in cases where it is more efficient to begin a match at the right part of the pattern instead of the left. As the following example illustrates, using right-to-left matching can change the behavior of greedy quantifiers. The example conducts two searches for a sentence that ends in a number. The left-to-right search that uses the greedy quantifier `+` matches one of the six digits in the sentence, whereas the right-to-left search matches all six digits. For a description of the regular expression pattern, see the example that illustrates lazy quantifiers earlier in this section.
