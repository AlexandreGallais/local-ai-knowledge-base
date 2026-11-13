---
title: "Options for regular expression (part 3 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/regular-expression-options.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Options for regular expression (part 3 of 6)

## Explicit captures only

By default, capturing groups are defined by the use of parentheses in the regular expression pattern. Named groups are assigned a name or number by the `(?<`*name*`>`*subexpression*`)` language option, whereas unnamed groups are accessible by index. In the `System.Text.RegularExpressions.GroupCollection` object, unnamed groups precede named groups.

Grouping constructs are often used only to apply quantifiers to multiple language elements, and the captured substrings are of no interest. For example, if the following regular expression:

`\b\(?((\w+),?\s?)+[\.!?]\)?`

is intended only to extract sentences that end with a period, exclamation point, or question mark from a document, only the resulting sentence (which is represented by the `System.Text.RegularExpressions.Match` object) is of interest. The individual words in the collection are not.

Capturing groups that are not subsequently used can be expensive, because the regular expression engine must populate both the `System.Text.RegularExpressions.GroupCollection` and `System.Text.RegularExpressions.CaptureCollection` collection objects. As an alternative, you can use either the `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` option or the `n` inline option to specify that the only valid captures are explicitly named or numbered groups that are designated by the `(?<`*name*`>` *subexpression*`)` construct.

The following example displays information about the matches returned by the `\b\(?((\w+),?\s?)+[\.!?]\)?` regular expression pattern when the `System.Text.RegularExpressions.Regex.Match*` method is called with and without the `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` option. As the output from the first method call shows, the regular expression engine fully populates the `System.Text.RegularExpressions.GroupCollection` and `System.Text.RegularExpressions.CaptureCollection` collection objects with information about captured substrings. Because the second method is called with `options` set to `System.Text.RegularExpressions.RegexOptions.ExplicitCapture`, it does not capture information on groups.

```csharp
using System;
using System.Text.RegularExpressions;

public class Explicit1Example
{
    public static void Main()
    {
        string input = "This is the first sentence. Is it the beginning " +
                       "of a literary masterpiece? I think not. Instead, " +
                       "it is a nonsensical paragraph.";
        string pattern = @"\b\(?((?>\w+),?\s?)+[\.!?]\)?";
        Console.WriteLine("With implicit captures:");
        foreach (Match match in Regex.Matches(input, pattern))
        {
            Console.WriteLine($"The match: {match.Value}");
            int groupCtr = 0;
            foreach (Group group in match.Groups)
            {
                Console.WriteLine($"   Group {groupCtr}: {group.Value}");
                groupCtr++;
                int captureCtr = 0;
                foreach (Capture capture in group.Captures)
                {
                    Console.WriteLine($"      Capture {captureCtr}: {capture.Value}");
                    captureCtr++;
                }
            }
        }
        Console.WriteLine();
        Console.WriteLine("With explicit captures only:");
        foreach (Match match in Regex.Matches(input, pattern, RegexOptions.ExplicitCapture))
        {
            Console.WriteLine($"The match: {match.Value}");
            int groupCtr = 0;
            foreach (Group group in match.Groups)
            {
                Console.WriteLine($"   Group {groupCtr}: {group.Value}");
                groupCtr++;
                int captureCtr = 0;
                foreach (Capture capture in group.Captures)
                {
                    Console.WriteLine($"      Capture {captureCtr}: {capture.Value}");
                    captureCtr++;
                }
            }
        }
    }
}
// The example displays the following output:
//    With implicit captures:
//    The match: This is the first sentence.
//       Group 0: This is the first sentence.
//          Capture 0: This is the first sentence.
//       Group 1: sentence
//          Capture 0: This
//          Capture 1: is
//          Capture 2: the
//          Capture 3: first
//          Capture 4: sentence
//       Group 2: sentence
//          Capture 0: This
//          Capture 1: is
//          Capture 2: the
//          Capture 3: first
//          Capture 4: sentence
//    The match: Is it the beginning of a literary masterpiece?
//       Group 0: Is it the beginning of a literary masterpiece?
//          Capture 0: Is it the beginning of a literary masterpiece?
//       Group 1: masterpiece
//          Capture 0: Is
//          Capture 1: it
//          Capture 2: the
//          Capture 3: beginning
//          Capture 4: of
//          Capture 5: a
//          Capture 6: literary
//          Capture 7: masterpiece
//       Group 2: masterpiece
//          Capture 0: Is
//          Capture 1: it
//          Capture 2: the
//          Capture 3: beginning
//          Capture 4: of
//          Capture 5: a
//          Capture 6: literary
//          Capture 7: masterpiece
//    The match: I think not.
//       Group 0: I think not.
//          Capture 0: I think not.
//       Group 1: not
//          Capture 0: I
//          Capture 1: think
//          Capture 2: not
//       Group 2: not
//          Capture 0: I
//          Capture 1: think
//          Capture 2: not
//    The match: Instead, it is a nonsensical paragraph.
//       Group 0: Instead, it is a nonsensical paragraph.
//          Capture 0: Instead, it is a nonsensical paragraph.
//       Group 1: paragraph
//          Capture 0: Instead,
//          Capture 1: it
//          Capture 2: is
//          Capture 3: a
//          Capture 4: nonsensical
//          Capture 5: paragraph
//       Group 2: paragraph
//          Capture 0: Instead
//          Capture 1: it
//          Capture 2: is
//          Capture 3: a
//          Capture 4: nonsensical
//          Capture 5: paragraph
//
//    With explicit captures only:
//    The match: This is the first sentence.
//       Group 0: This is the first sentence.
//          Capture 0: This is the first sentence.
//    The match: Is it the beginning of a literary masterpiece?
//       Group 0: Is it the beginning of a literary masterpiece?
//          Capture 0: Is it the beginning of a literary masterpiece?
//    The match: I think not.
//       Group 0: I think not.
//          Capture 0: I think not.
//    The match: Instead, it is a nonsensical paragraph.
//       Group 0: Instead, it is a nonsensical paragraph.
//          Capture 0: Instead, it is a nonsensical paragraph.
```

The regular expression pattern`\b\(?((?>\w+),?\s?)+[\.!?]\)?` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Begin at a word boundary.|
|`\(?`|Match zero or one occurrences of the opening parenthesis ("(").|
|`(?>\w+),?`|Match one or more word characters, followed by zero or one commas. Do not backtrack when matching word characters.|
|`\s?`|Match zero or one white-space characters.|
|`((\w+),?\s?)+`|Match the combination of one or more word characters, zero or one commas, and zero or one white-space characters one or more times.|
|`[\.!?]\)?`|Match any of the three punctuation symbols, followed by zero or one closing parentheses (")").|

You can also use the `(?n)` inline element to suppress automatic captures. The following example modifies the previous regular expression pattern to use the `(?n)` inline element instead of the `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` option.

```csharp
using System;
using System.Text.RegularExpressions;

public class Explicit2Example
{
    public static void Main()
    {
        string input = "This is the first sentence. Is it the beginning " +
                       "of a literary masterpiece? I think not. Instead, " +
                       "it is a nonsensical paragraph.";
        string pattern = @"(?n)\b\(?((?>\w+),?\s?)+[\.!?]\)?";

        foreach (Match match in Regex.Matches(input, pattern))
        {
            Console.WriteLine($"The match: {match.Value}");
            int groupCtr = 0;
            foreach (Group group in match.Groups)
            {
                Console.WriteLine($"   Group {groupCtr}: {group.Value}");
                groupCtr++;
                int captureCtr = 0;
                foreach (Capture capture in group.Captures)
                {
                    Console.WriteLine($"      Capture {captureCtr}: {capture.Value}");
                    captureCtr++;
                }
            }
        }
    }
}
// The example displays the following output:
//       The match: This is the first sentence.
//          Group 0: This is the first sentence.
//             Capture 0: This is the first sentence.
//       The match: Is it the beginning of a literary masterpiece?
//          Group 0: Is it the beginning of a literary masterpiece?
//             Capture 0: Is it the beginning of a literary masterpiece?
//       The match: I think not.
//          Group 0: I think not.
//             Capture 0: I think not.
//       The match: Instead, it is a nonsensical paragraph.
//          Group 0: Instead, it is a nonsensical paragraph.
//             Capture 0: Instead, it is a nonsensical paragraph.
```

Finally, you can use the inline group element `(?n:)` to suppress automatic captures on a group-by-group basis. The following example modifies the previous pattern to suppress unnamed captures in the outer group, `((?>\w+),?\s?)`. Note that this suppresses unnamed captures in the inner group as well.

```csharp
using System;
using System.Text.RegularExpressions;

public class Explicit3Example
{
    public static void Main()
    {
        string input = "This is the first sentence. Is it the beginning " +
                       "of a literary masterpiece? I think not. Instead, " +
                       "it is a nonsensical paragraph.";
        string pattern = @"\b\(?(?n:(?>\w+),?\s?)+[\.!?]\)?";

        foreach (Match match in Regex.Matches(input, pattern))
        {
            Console.WriteLine($"The match: {match.Value}");
            int groupCtr = 0;
            foreach (Group group in match.Groups)
            {
                Console.WriteLine($"   Group {groupCtr}: {group.Value}");
                groupCtr++;
                int captureCtr = 0;
                foreach (Capture capture in group.Captures)
                {
                    Console.WriteLine($"      Capture {captureCtr}: {capture.Value}");
                    captureCtr++;
                }
            }
        }
    }
}
// The example displays the following output:
//       The match: This is the first sentence.
//          Group 0: This is the first sentence.
//             Capture 0: This is the first sentence.
//       The match: Is it the beginning of a literary masterpiece?
//          Group 0: Is it the beginning of a literary masterpiece?
//             Capture 0: Is it the beginning of a literary masterpiece?
//       The match: I think not.
//          Group 0: I think not.
//             Capture 0: I think not.
//       The match: Instead, it is a nonsensical paragraph.
//          Group 0: Instead, it is a nonsensical paragraph.
//             Capture 0: Instead, it is a nonsensical paragraph.
```

## Compiled regular expressions

> **Note:**
> Where possible, use source-generated regular expressions instead of compiling regular expressions using the `System.Text.RegularExpressions.RegexOptions.Compiled` option. Source generation can help your app start faster, run more quickly and be more trimmable. To learn when source generation is possible, see When to use it.

By default, regular expressions in .NET are interpreted. When a `System.Text.RegularExpressions.Regex` object is instantiated or a static `System.Text.RegularExpressions.Regex` method is called, the regular expression pattern is parsed into a set of custom opcodes, and an interpreter uses these opcodes to run the regular expression. This involves a tradeoff: the cost of initializing the regular expression engine is minimized at the expense of runtime performance.

You can use compiled instead of interpreted regular expressions by using the `System.Text.RegularExpressions.RegexOptions.Compiled` option. In this case, when a pattern is passed to the regular expression engine, it is parsed into a set of opcodes and then converted to common intermediate language (CIL), which can be passed directly to the common language runtime. Compiled regular expressions maximize runtime performance at the expense of initialization time.

> **Note:**
> A regular expression can be compiled only by supplying the `System.Text.RegularExpressions.RegexOptions.Compiled` value to the `options` parameter of a `System.Text.RegularExpressions.Regex` class constructor or a static pattern-matching method. It's not available as an inline option.

You can use compiled regular expressions in calls to both static and instance regular expressions. In static regular expressions, the `System.Text.RegularExpressions.RegexOptions.Compiled` option is passed to the `options` parameter of the regular expression pattern-matching method. In instance regular expressions, it's passed to the `options` parameter of the `System.Text.RegularExpressions.Regex` class constructor. In both cases, it results in enhanced performance.

However, this improvement in performance occurs only under the following conditions:

- A `System.Text.RegularExpressions.Regex` object that represents a particular regular expression is used in multiple calls to regular expression pattern-matching methods.

- The `System.Text.RegularExpressions.Regex` object is not allowed to go out of scope, so it can be reused.

- A static regular expression is used in multiple calls to regular expression pattern-matching methods. (The performance improvement is possible because regular expressions used in static method calls are cached by the regular expression engine.)

> **Note:**
> The `System.Text.RegularExpressions.RegexOptions.Compiled` option is unrelated to the obsolete `System.Text.RegularExpressions.Regex.CompileToAssembly*` method, which creates a special-purpose assembly that contains predefined, compiled regular expressions.
