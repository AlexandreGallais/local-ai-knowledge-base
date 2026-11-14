---
title: "Grouping Constructs in Regular Expressions (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/grouping-constructs-in-regular-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Grouping Constructs in Regular Expressions (part 3 of 4)

## Group options

The following grouping construct applies or disables the specified options within a subexpression:

`(?imnsx-imnsx:` *subexpression* `)`

Here, *subexpression* is any valid regular expression pattern. For example, `(?i-s:)` turns on case insensitivity and disables single-line mode. For more information about the inline options you can specify, see Regular Expression Options.

> **Note:**
> You can specify options that apply to an entire regular expression rather than a subexpression by using a `System.Text.RegularExpressions.Regex` class constructor or a static method. You can also specify inline options that apply after a specific point in a regular expression by using the `(?imnsx-imnsx)` language construct.

The group options construct is not a capturing group. That is, although any portion of a string that is captured by *subexpression* is included in the match, it is not included in a captured group nor used to populate the `System.Text.RegularExpressions.GroupCollection` object.

For example, the regular expression `\b(?ix: d \w+)\s` in the following example uses inline options in a grouping construct to enable case-insensitive matching and ignore pattern white space in identifying all words that begin with the letter "d". The regular expression is defined as shown in the following table.

| Pattern        | Description                                                                                                                    |
|----------------|--------------------------------------------------------------------------------------------------------------------------------|
| `\b`           | Begin the match at a word boundary.                                                                                            |
| `(?ix: d \w+)` | Using case-insensitive matching and ignoring white space in this pattern, match a "d" followed by one or more word characters. |
| `\s`           | Match a white-space character.                                                                                                 |

```csharp
using System;
using System.Text.RegularExpressions;

public class ShowOptionsExamples
{
    public static void Main()
    {
        ShowOptionsArgument();
        Console.WriteLine("-----");
        ShowInlineOptions();
        Console.WriteLine("-----");
        ShowGroupOptions();
    }

    private static void ShowOptionsArgument()
    {
        string pattern = @"d \w+ \s";
        string input = "Dogs are decidedly good pets.";
        RegexOptions options = RegexOptions.IgnoreCase | RegexOptions.IgnorePatternWhitespace;

        foreach (Match match in Regex.Matches(input, pattern, options))
            Console.WriteLine($"'{match.Value}// found at index {match.Index}.");
        // The example displays the following output:
        //    'Dogs // found at index 0.
        //    'decidedly // found at index 9.
    }

    private static void ShowInlineOptions()
    {
        string pattern = @"(?ix) d \w+ \s";
        string input = "Dogs are decidedly good pets.";

        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine($"'{match.Value}// found at index {match.Index}.");
        // The example displays the following output:
        //    'Dogs // found at index 0.
        //    'decidedly // found at index 9.
    }

    private static void ShowGroupOptions()
    {
        string pattern = @"\b(?ix: d \w+)\s";
        string input = "Dogs are decidedly good pets.";

        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine($"'{match.Value}// found at index {match.Index}.");
        // The example displays the following output:
        //    'Dogs // found at index 0.
        //    'decidedly // found at index 9.
    }
}
```

## Zero-width positive lookahead assertions

The following grouping construct defines a zero-width positive lookahead assertion:

`(?=` *subexpression* `)`

Here, *subexpression* is any regular expression pattern. For a match to be successful, the input string must match the regular expression pattern in *subexpression*, although the matched substring is not included in the match result. A zero-width positive lookahead assertion does not backtrack.

Typically, a zero-width positive lookahead assertion is found at the end of a regular expression pattern. It defines a substring that must be found at the end of a string for a match to occur but that should not be included in the match. It is also useful for preventing excessive backtracking. You can use a zero-width positive lookahead assertion to ensure that a particular captured group begins with text that matches a subset of the pattern defined for that captured group. For example, if a capturing group matches consecutive word characters, you can use a zero-width positive lookahead assertion to require that the first character be an alphabetical uppercase character.

The following example uses a zero-width positive lookahead assertion to match the word that precedes the verb "is" in the input string.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b\w+(?=\sis\b)";
      string[] inputs = { "The dog is a Malamute.",
                          "The island has beautiful birds.",
                          "The pitch missed home plate.",
                          "Sunday is a weekend day." };

      foreach (string input in inputs)
      {
         Match match = Regex.Match(input, pattern);
         if (match.Success)
            Console.WriteLine($"'{match.Value}' precedes 'is'.");
         else
            Console.WriteLine($"'{input}' does not match the pattern.");
      }
   }
}
// The example displays the following output:
//    'dog' precedes 'is'.
//    'The island has beautiful birds.' does not match the pattern.
//    'The pitch missed home plate.' does not match the pattern.
//    'Sunday' precedes 'is'.
```

The regular expression `\b\w+(?=\sis\b)` is interpreted as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Begin the match at a word boundary.|
|`\w+`|Match one or more word characters.|
|`(?=\sis\b)`|Determine whether the word characters are followed by a white-space character and the string "is", which ends on a word boundary. If so, the match is successful.|

## Zero-width negative lookahead assertions

The following grouping construct defines a zero-width negative lookahead assertion:

`(?!` *subexpression* `)`

Here, *subexpression* is any regular expression pattern. For the match to be successful, the input string must not match the regular expression pattern in *subexpression*, although the matched string is not included in the match result.

A zero-width negative lookahead assertion is typically used either at the beginning or at the end of a regular expression. At the beginning of a regular expression, it can define a specific pattern that should not be matched when the beginning of the regular expression defines a similar but more general pattern to be matched. In this case, it is often used to limit backtracking. At the end of a regular expression, it can define a subexpression that cannot occur at the end of a match.

The following example defines a regular expression that uses a zero-width lookahead assertion at the beginning of the regular expression to match words that do not begin with "un".

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b(?!un)\w+\b";
      string input = "unite one unethical ethics use untie ultimate";
      foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnoreCase))
         Console.WriteLine(match.Value);
   }
}
// The example displays the following output:
//       one
//       ethics
//       use
//       ultimate
```

The regular expression `\b(?!un)\w+\b` is interpreted as shown in the following table.

| Pattern  | Description                                                                               |
|----------|-------------------------------------------------------------------------------------------|
| `\b`     | Begin the match at a word boundary.                                                       |
| `(?!un)` | Determine whether the next two characters are "un". If they are not, a match is possible. |
| `\w+`    | Match one or more word characters.                                                        |
| `\b`     | End the match at a word boundary.                                                         |

The following example defines a regular expression that uses a zero-width lookahead assertion at the end of the regular expression to match words that do not end with a punctuation character.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b\w+\b(?!\p{P})";
      string input = "Disconnected, disjointed thoughts in a sentence fragment.";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine(match.Value);
   }
}
// The example displays the following output:
//       disjointed
//       thoughts
//       in
//       a
//       sentence
```

The regular expression `\b\w+\b(?!\p{P})` is interpreted as shown in the following table.

| Pattern  | Description                                                                                          |
|----------|------------------------------------------------------------------------------------------------------|
| `\b`     | Begin the match at a word boundary.                                                                  |
| `\w+`    | Match one or more word characters.                                                                   |
| `\b`     | End the match at a word boundary.                                                                    |
| `\p{P})` | If the next character is not a punctuation symbol (such as a period or a comma), the match succeeds. |

## Zero-width positive lookbehind assertions

The following grouping construct defines a zero-width positive lookbehind assertion:

`(?<=` *subexpression* `)`

Here, *subexpression* is any regular expression pattern. For a match to be successful, *subexpression* must occur at the input string to the left of the current position, although `subexpression` is not included in the match result. A zero-width positive lookbehind assertion does not backtrack.

Zero-width positive lookbehind assertions are typically used at the beginning of regular expressions. The pattern that they define is a precondition for a match, although it is not a part of the match result.

For example, the following example matches the last two digits of the year for the twenty first century (that is, it requires that the digits "20" precede the matched string).

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string input = "<example-card-number> 2009";
      string pattern = @"(?<=\b20)\d{2}\b";

      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine(match.Value);
   }
}
// The example displays the following output:
//       10
//       09
```

The regular expression pattern `(?<=\b20)\d{2}\b` is interpreted as shown in the following table.

| Pattern     | Description                                                                                              |
|-------------|----------------------------------------------------------------------------------------------------------|
| `\d{2}`     | Match two decimal digits.                                                                                |
| `(?<=\b20)` | Continue the match if the two decimal digits are preceded by the decimal digits "20" on a word boundary. |
| `\b`        | End the match at a word boundary.                                                                        |

Zero-width positive lookbehind assertions are also used to limit backtracking when the last character or characters in a captured group must be a subset of the characters that match that group's regular expression pattern. For example, if a group captures all consecutive word characters, you can use a zero-width positive lookbehind assertion to require that the last character be alphabetical.
