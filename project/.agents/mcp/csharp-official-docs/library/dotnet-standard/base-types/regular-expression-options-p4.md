---
title: "Options for regular expression (part 4 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/regular-expression-options.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Options for regular expression (part 4 of 6)

## Ignore white space

By default, white space in a regular expression pattern is significant; it forces the regular expression engine to match a white-space character in the input string. Because of this, the regular expression "`\b\w+\s`" and "`\b\w+` " are roughly equivalent regular expressions. In addition, when the number sign (#) is encountered in a regular expression pattern, it is interpreted as a literal character to be matched.

The `System.Text.RegularExpressions.RegexOptions.IgnorePatternWhitespace` option, or the `x` inline option, changes this default behavior as follows:

- Unescaped white space in the regular expression pattern is ignored. To be part of a regular expression pattern, white-space characters must be escaped (for example, as `\s` or "`\` ").

- The number sign (#) is interpreted as the beginning of a comment, rather than as a literal character. All text in the regular expression pattern from the `#` character to either the next `\n` character or to the end of the string, is interpreted as a comment.

However, in the following cases, white-space characters in a regular expression aren't ignored, even if you use the `System.Text.RegularExpressions.RegexOptions.IgnorePatternWhitespace` option:

- White space within a character class is always interpreted literally. For example, the regular expression pattern `[ .,;:]` matches any single white-space character, period, comma, semicolon, or colon.

- White space isn't allowed within a bracketed quantifier, such as `{`*n*`}`, `{`*n*`,}`, and `{`*n*`,`*m*`}`. For example, the regular expression pattern `\d{1, 3}` fails to match any sequences of digits from one to three digits because it contains a white-space character.

- White space isn't allowed within a character sequence that introduces a language element. For example:

  - The language element `(?:`*subexpression*`)` represents a noncapturing group, and the `(?:` portion of the element can't have embedded spaces. The pattern `(? :`*subexpression*`)` throws an `System.ArgumentException` at runtime because the regular expression engine can't parse the pattern, and the pattern `( ?:`*subexpression*`)` fails to match *subexpression*.

  - The language element `\p{`*name*`}`, which represents a Unicode category or named block, can't include embedded spaces in the `\p{` portion of the element. If you do include a white space, the element throws an `System.ArgumentException` at runtime.

Enabling this option helps simplify regular expressions that are often difficult to parse and to understand. It improves readability, and makes it possible to document a regular expression.

The following example defines the following regular expression pattern:

`\b \(? ( (?>\w+) ,?\s? )+  [\.!?] \)? # Matches an entire sentence.`

This pattern is similar to the pattern defined in the Explicit Captures Only section, except that it uses the `System.Text.RegularExpressions.RegexOptions.IgnorePatternWhitespace` option to ignore pattern white space.

```csharp
using System;
using System.Text.RegularExpressions;

public class Whitespace1Example
{
    public static void Main()
    {
        string input = "This is the first sentence. Is it the beginning " +
                       "of a literary masterpiece? I think not. Instead, " +
                       "it is a nonsensical paragraph.";
        string pattern = @"\b \(? ( (?>\w+) ,?\s? )+ [\.!?] \)? # Matches an entire sentence.";

        foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnorePatternWhitespace))
            Console.WriteLine(match.Value);
    }
}
// The example displays the following output:
//       This is the first sentence.
//       Is it the beginning of a literary masterpiece?
//       I think not.
//       Instead, it is a nonsensical paragraph.
```

The following example uses the inline option `(?x)` to ignore pattern white space.

```csharp
using System;
using System.Text.RegularExpressions;

public class Whitespace2Example
{
    public static void Main()
    {
        string input = "This is the first sentence. Is it the beginning " +
                       "of a literary masterpiece? I think not. Instead, " +
                       "it is a nonsensical paragraph.";
        string pattern = @"(?x)\b \(? ( (?>\w+) ,?\s? )+  [\.!?] \)? # Matches an entire sentence.";

        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine(match.Value);
    }
}
// The example displays the following output:
//       This is the first sentence.
//       Is it the beginning of a literary masterpiece?
//       I think not.
//       Instead, it is a nonsensical paragraph.
```

## Right-to-left mode

By default, the regular expression engine searches from left to right. You can reverse the search direction by using the `System.Text.RegularExpressions.RegexOptions.RightToLeft` option. The right-to-left search automatically begins at the last character position of the string. For pattern-matching methods that include a starting position parameter, such as `System.Text.RegularExpressions.Regex.Match(System.String,System.Int32)`, the specified starting position is the index of the rightmost character position at which the search is to begin.

> **Note:**
> Right-to-left pattern mode is available only by supplying the `System.Text.RegularExpressions.RegexOptions.RightToLeft` value to the `options` parameter of a `System.Text.RegularExpressions.Regex` class constructor or static pattern-matching method. It is not available as an inline option.

### Example

The regular expression `\bb\w+\s` matches words with two or more characters that begin with the letter "b" and are followed by a white-space character. In the following example, the input string consists of three words that include one or more "b" characters. The first and second words begin with "b" and the third word ends with "b". As the output from the right-to-left search example shows, only the first and second words match the regular expression pattern, with the second word being matched first.

```csharp
using System;
using System.Text.RegularExpressions;

public class RTL1Example
{
    public static void Main()
    {
        string pattern = @"\bb\w+\s";
        string input = "build band tab";
        foreach (Match match in Regex.Matches(input, pattern, RegexOptions.RightToLeft))
            Console.WriteLine($"'{match.Value}' found at position {match.Index}.");
    }
}
// The example displays the following output:
//       'band ' found at position 6.
//       'build ' found at position 0.
```

### Evaluation order

The `System.Text.RegularExpressions.RegexOptions.RightToLeft` option changes the search direction and also reverses the order in which the regular expression pattern is evaluated. In a right-to-left search, the search pattern is read from right to left. This distinction is important because it can affect things like capture groups and backreferences. For example, the expression `Regex.Match("abcabc", @"\1(abc)", RegexOptions.RightToLeft)` finds a match `abcabc`, but in a left-to-right search (`Regex.Match("abcabc", @"\1(abc)", RegexOptions.None)`), no match is found. That's because the `(abc)` element must be evaluated before the numbered capturing group element (`\1`) for a match to be found.

### Lookahead and lookbehind assertions

The location of a match for a lookahead (`(?=subexpression)`) or lookbehind (`(?<=subexpression)`) assertion doesn't change in a right-to-left search. The lookahead assertions look to the right of the current match location; the lookbehind assertions look to the left of the current match location.

> **Tip:**
> Whether a search is right-to-left or not, lookbehinds are implemented using a right-to-left search starting at the current match location.

For example, the regular expression `(?<=\d{1,2}\s)\w+,\s\d{4}` uses the lookbehind assertion to test for a date that precedes a month name. The regular expression then matches the month and the year. For information on lookahead and lookbehind assertions, see Grouping Constructs.

```csharp
using System;
using System.Text.RegularExpressions;

public class RTL2Example
{
    public static void Main()
    {
        string[] inputs = { "1 May, 1917", "June 16, 2003" };
        string pattern = @"(?<=\d{1,2}\s)\w+,\s\d{4}";

        foreach (string input in inputs)
        {
            Match match = Regex.Match(input, pattern, RegexOptions.RightToLeft);
            if (match.Success)
                Console.WriteLine($"The date occurs in {match.Value}.");
            else
                Console.WriteLine($"{input} does not match.");
        }
    }
}

// The example displays the following output:
//       The date occurs in May, 1917.
//       June 16, 2003 does not match.
```

The regular expression pattern is defined as shown in the following table.

| Pattern          | Description                                                                                   |
|------------------|-----------------------------------------------------------------------------------------------|
| `(?<=\d{1,2}\s)` | The beginning of the match must be preceded by one or two decimal digits followed by a space. |
| `\w+`            | Match one or more word characters.                                                            |
| `,`              | Match one comma character.                                                                    |
| `\s`             | Match a white-space character.                                                                |
| `\d{4}`          | Match four decimal digits.                                                                    |
