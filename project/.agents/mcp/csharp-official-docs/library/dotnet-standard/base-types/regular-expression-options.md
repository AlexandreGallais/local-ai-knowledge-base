---
title: "Options for regular expression (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/regular-expression-options.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Regular expression options

By default, the comparison of an input string with any literal characters in a regular expression pattern is case-sensitive, white space in a regular expression pattern is interpreted as literal white-space characters, and capturing groups in a regular expression are named implicitly as well as explicitly. You can modify these and several other aspects of default regular expression behavior by specifying regular expression options. Some of these options, which are listed in the following table, can be included inline as part of the regular expression pattern, or they can be supplied to a `System.Text.RegularExpressions.Regex` class constructor or static pattern matching method as a `System.Text.RegularExpressions.RegexOptions` enumeration value.

| `RegexOptions` member | Inline character | Effect | More information |
|-|-|-|-|
| `System.Text.RegularExpressions.RegexOptions.None` | Not available | Use default behavior. | Default options |
| `System.Text.RegularExpressions.RegexOptions.IgnoreCase` | `i` | Use case-insensitive matching. | Case-insensitive matching |
| `System.Text.RegularExpressions.RegexOptions.Multiline` | `m` | Use multiline mode, where `^` and `$` indicate the beginning and end of each line (instead of the beginning and end of the input string). | Multiline mode |
| `System.Text.RegularExpressions.RegexOptions.Singleline` | `s` | Use single-line mode, where the period (.) matches every character (instead of every character except `\n`). | Single-line mode |
| `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` | `n` | Do not capture unnamed groups. The only valid captures are explicitly named or numbered groups of the form `(?<`*name*`>` *subexpression*`)`. | Explicit captures only |
| `System.Text.RegularExpressions.RegexOptions.Compiled` | Not available | Compile the regular expression to an assembly. | Compiled regular expressions |
| `System.Text.RegularExpressions.RegexOptions.IgnorePatternWhitespace` | `x` | Exclude unescaped white space from the pattern, and enable comments after a number sign (`#`). | Ignore white space |
| `System.Text.RegularExpressions.RegexOptions.RightToLeft` | Not available | Change the search direction. Search moves from right to left instead of from left to right. | Right-to-left mode |
| `System.Text.RegularExpressions.RegexOptions.ECMAScript` | Not available | Enable ECMAScript-compliant behavior for the expression. | ECMAScript matching behavior |
| `System.Text.RegularExpressions.RegexOptions.CultureInvariant` | Not available | Ignore cultural differences in language. | Comparison using the invariant culture |
| `System.Text.RegularExpressions.RegexOptions.NonBacktracking` | Not available | Match using an approach that avoids backtracking and guarantees linear-time processing in the length of the input. (Available in .NET 7 and later versions.)| NonBacktracking mode |
| `System.Text.RegularExpressions.RegexOptions.AnyNewLine` | Not available | Make `^`, `$`, `\Z`, and `.` recognize all common newline sequences instead of only `\n`. (Available in .NET 11 and later versions.) | AnyNewLine mode |

## Specify options

You can specify options for regular expressions in one of three ways:

- In the `options` parameter of a `System.Text.RegularExpressions.Regex` class constructor or static (`Shared` in Visual Basic) pattern-matching method, such as `System.Text.RegularExpressions.Regex.#ctor(System.String,System.Text.RegularExpressions.RegexOptions)` or `System.Text.RegularExpressions.Regex.Match(System.String,System.String,System.Text.RegularExpressions.RegexOptions)`. The `options` parameter is a bitwise OR combination of `System.Text.RegularExpressions.RegexOptions` enumerated values.

  When options are supplied to a `System.Text.RegularExpressions.Regex` instance by using the `options` parameter of a class constructor, the options are assigned to the `System.Text.RegularExpressions.RegexOptions` property. However, the `System.Text.RegularExpressions.RegexOptions` property does not reflect inline options in the regular expression pattern itself.

  The following example provides an illustration. It uses the `options` parameter of the `System.Text.RegularExpressions.Regex.Match(System.String,System.String,System.Text.RegularExpressions.RegexOptions)` method to enable case-insensitive matching and to ignore pattern white space when identifying words that begin with the letter "d".

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

- By applying inline options in a regular expression pattern with the syntax `(?imnsx-imnsx)`. The option applies to the pattern from the point that the option is defined to either the end of the pattern or to the point at which the option is undefined by another inline option. Note that the `System.Text.RegularExpressions.RegexOptions` property of a `System.Text.RegularExpressions.Regex` instance does not reflect these inline options. For more information, see the Miscellaneous Constructs topic.

  The following example provides an illustration. It uses inline options to enable case-insensitive matching and to ignore pattern white space when identifying words that begin with the letter "d".

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

- By applying inline options in a particular grouping construct in a regular expression pattern with the syntax `(?imnsx-imnsx:`*subexpression*`)`. No sign before a set of options turns the set on; a minus sign before a set of options turns the set off. (`?` is a fixed part of the language construct's syntax that is required whether options are enabled or disabled.) The option applies only to that group. For more information, see Grouping Constructs.

  The following example provides an illustration. It uses inline options in a grouping construct to enable case-insensitive matching and to ignore pattern white space when identifying words that begin with the letter "d".

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

If options are specified inline, a minus sign (`-`) before an option or set of options turns off those options. For example, the inline construct `(?ix-ms)` turns on the `System.Text.RegularExpressions.RegexOptions.IgnoreCase` and `System.Text.RegularExpressions.RegexOptions.IgnorePatternWhitespace` options and turns off the `System.Text.RegularExpressions.RegexOptions.Multiline` and `System.Text.RegularExpressions.RegexOptions.Singleline` options. All regular expression options are turned off by default.

> **Note:**
> If the regular expression options specified in the `options` parameter of a constructor or method call conflict with the options specified inline in a regular expression pattern, the inline options are used.

The following five regular expression options can be set both with the options parameter and inline:

- `System.Text.RegularExpressions.RegexOptions.IgnoreCase`

- `System.Text.RegularExpressions.RegexOptions.Multiline`

- `System.Text.RegularExpressions.RegexOptions.Singleline`

- `System.Text.RegularExpressions.RegexOptions.ExplicitCapture`

- `System.Text.RegularExpressions.RegexOptions.IgnorePatternWhitespace`

The following seven regular expression options can be set using the `options` parameter but cannot be set inline:

- `System.Text.RegularExpressions.RegexOptions.None`

- `System.Text.RegularExpressions.RegexOptions.Compiled`

- `System.Text.RegularExpressions.RegexOptions.RightToLeft`

- `System.Text.RegularExpressions.RegexOptions.CultureInvariant`

- `System.Text.RegularExpressions.RegexOptions.ECMAScript`

- `System.Text.RegularExpressions.RegexOptions.NonBacktracking`

- `System.Text.RegularExpressions.RegexOptions.AnyNewLine`

## Determine options

You can determine which options were provided to a `System.Text.RegularExpressions.Regex` object when it was instantiated by retrieving the value of the read-only `System.Text.RegularExpressions.Regex.Options` property.

To test for the presence of any option except `System.Text.RegularExpressions.RegexOptions.None`, perform an AND operation with the value of the `System.Text.RegularExpressions.Regex.Options` property and the `System.Text.RegularExpressions.RegexOptions` value in which you are interested. Then test whether the result equals that `System.Text.RegularExpressions.RegexOptions` value. The following example tests whether the `System.Text.RegularExpressions.RegexOptions.IgnoreCase` option has been set.

```csharp
﻿using System;
using System.Text.RegularExpressions;

public class DetermineOptionsExample
{
    public static void Main()
    {
        Regex rgx = new Regex(@"\w*\s", RegexOptions.IgnoreCase);
        if ((rgx.Options & RegexOptions.IgnoreCase) == RegexOptions.IgnoreCase)
            Console.WriteLine("Case-insensitive pattern comparison.");
        else
            Console.WriteLine("Case-sensitive pattern comparison.");
        if (rgx.Options == RegexOptions.None)
            Console.WriteLine("No options have been set.");
    }
}
```

To test for `System.Text.RegularExpressions.RegexOptions.None`, determine whether the value of the `System.Text.RegularExpressions.Regex.Options` property is equal to `System.Text.RegularExpressions.RegexOptions.None`, as the following example illustrates.

```csharp
﻿using System;
using System.Text.RegularExpressions;

public class DetermineOptionsExample
{
    public static void Main()
    {
        Regex rgx = new Regex(@"\w*\s", RegexOptions.IgnoreCase);
        if ((rgx.Options & RegexOptions.IgnoreCase) == RegexOptions.IgnoreCase)
            Console.WriteLine("Case-insensitive pattern comparison.");
        else
            Console.WriteLine("Case-sensitive pattern comparison.");
        if (rgx.Options == RegexOptions.None)
            Console.WriteLine("No options have been set.");
    }
}
```

The following sections list the options supported by regular expression in .NET.
