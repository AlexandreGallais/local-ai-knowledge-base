---
title: "Regular Expression behavior (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/details-of-regular-expression-behavior.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Regular Expression behavior (part 3 of 3)

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string greedyPattern = @".+(\d+)\.";
        string input = "This sentence ends with the number 107325.";
        Match match;

        // Match from left-to-right using lazy quantifier .+?.
        match = Regex.Match(input, greedyPattern);
        if (match.Success)
            Console.WriteLine($"Number at end of sentence (left-to-right): {match.Groups[1].Value}");
        else
            Console.WriteLine($"{greedyPattern} finds no match.");

        // Match from right-to-left using greedy quantifier .+.
        match = Regex.Match(input, greedyPattern, RegexOptions.RightToLeft);
        if (match.Success)
            Console.WriteLine($"Number at end of sentence (right-to-left): {match.Groups[1].Value}");
        else
            Console.WriteLine($"{greedyPattern} finds no match.");
    }
}
// The example displays the following output:
//       Number at end of sentence (left-to-right): 5
//       Number at end of sentence (right-to-left): 107325
```

     For more information about right-to-left matching, see Regular Expression Options.

- Positive and negative lookbehind: `(?<=`*subexpression*`)` for positive lookbehind, and `(?<!`*subexpression*`)` for negative lookbehind. This feature is similar to lookahead, which is discussed earlier in this topic. Because the regular expression engine allows complete right-to-left matching, regular expressions allow unrestricted lookbehinds. Positive and negative lookbehind can also be used to avoid nesting quantifiers when the nested subexpression is a superset of an outer expression. Regular expressions with such nested quantifiers often offer poor performance. For example, the following example verifies that a string begins and ends with an alphanumeric character, and that any other character in the string is one of a larger subset. It forms a portion of the regular expression used to validate email addresses; for more information, see How to: Verify that Strings Are in Valid Email Format.

     ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string[] inputs = { "jack.sprat", "dog#", "dog#1", "me.myself",
                          "me.myself!" };
        string pattern = @"^[A-Z0-9]([-!#$%&'.*+/=?^`{}|~\w])*(?<=[A-Z0-9])$";
        foreach (string input in inputs)
        {
            if (Regex.IsMatch(input, pattern, RegexOptions.IgnoreCase))
                Console.WriteLine($"{input}: Valid");
            else
                Console.WriteLine($"{input}: Invalid");
        }
    }
}
// The example displays the following output:
//       jack.sprat: Valid
//       dog#: Invalid
//       dog#1: Valid
//       me.myself: Valid
//       me.myself!: Invalid
```

     The regular expression ``^A-Z0-9*(?<=[A-Z0-9])$`` is defined as shown in the following table.

    |Pattern|Description|
    |-------------|-----------------|
    |`^`|Begin the match at the beginning of the string.|
    |`[A-Z0-9]`|Match any numeric or alphanumeric character. (The comparison is case-insensitive.)|
    |`([-!#$%&'.*+/=?^\`{}&#124;~\w])\*`|Match zero or more occurrences of any word character, or any of the following characters:  -, !, #, $, %, &, ', ., \*, +, /, =, ?, ^, &#96;, {, }, &#124;, or ~.|
    |`(?<=[A-Z0-9])`|Look behind to the previous character, which must be numeric or alphanumeric. (The comparison is case-insensitive.)|
    |`$`|End the match at the end of the string.|

     For more information about positive and negative lookbehind, see Grouping Constructs.

## Related articles

|Title|Description|
|-----------|-----------------|
|Backtracking|Provides information about how regular expression backtracking branches to find alternative matches.|
|Compilation and Reuse|Provides information about compiling and reusing regular expressions to increase performance.|
|.NET Regular Expressions|Provides an overview of the programming language aspect of regular expressions.|
|The Regular Expression Object Model|Provides information and code examples illustrating how to use the regular expression classes.|
|Regular Expression Language - Quick Reference|Provides information about the set of characters, operators, and constructs that you can use to define regular expressions.|

## Reference

- `System.Text.RegularExpressions`
