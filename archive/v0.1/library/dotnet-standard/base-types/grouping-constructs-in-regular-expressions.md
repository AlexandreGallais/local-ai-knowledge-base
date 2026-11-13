---
title: "Grouping Constructs in Regular Expressions (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/grouping-constructs-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Grouping constructs in regular expressions

Grouping constructs delineate the subexpressions of a regular expression and capture the substrings of an input string. You can use grouping constructs to do the following:

- Match a subexpression that's repeated in the input string.
- Apply a quantifier to a subexpression that has multiple regular expression language elements. For more information about quantifiers, see Quantifiers.
- Include a subexpression in the string that's returned by the `System.Text.RegularExpressions.Regex.Replace*` and `System.Text.RegularExpressions.Match.Result*` methods.
- Retrieve individual subexpressions from the `System.Text.RegularExpressions.Match.Groups` property and process them separately from the matched text as a whole.

The following table lists the grouping constructs supported by the .NET regular expression engine and indicates whether they are capturing or noncapturing.

| Grouping construct                                                                      | Capturing or noncapturing |
|-----------------------------------------------------------------------------------------|---------------------------|
| Matched subexpressions                                       | Capturing                 |
| Named matched subexpressions                           | Capturing                 |
| Balancing group definitions                             | Capturing                 |
| Noncapturing groups                                             | Noncapturing              |
| Group options                                                         | Noncapturing              |
| Zero-width positive lookahead assertions   | Noncapturing              |
| Zero-width negative lookahead assertions   | Noncapturing              |
| Zero-width positive lookbehind assertions | Noncapturing              |
| Zero-width negative lookbehind assertions | Noncapturing              |
| Atomic groups                                                         | Noncapturing              |

For information on groups and the regular expression object model, see Grouping constructs and regular expression objects.

## Matched subexpressions

The following grouping construct captures a matched subexpression:

`(` *subexpression* `)`

Here, *subexpression* is any valid regular expression pattern. Captures that use parentheses are numbered automatically from left to right based on the order of the opening parentheses in the regular expression, starting from 1. However, named capture groups are always ordered last, after non-named capture groups. The capture that's numbered 0 is the text matched by the entire regular expression pattern.

> **Note:**
> By default, the `(`*subexpression*`)` language element captures the matched subexpression. But if the `System.Text.RegularExpressions.RegexOptions` parameter of a regular expression pattern matching method includes the `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` flag, or if the `n` option is applied to this subexpression (see Group options later in this article), the matched subexpression is not captured.

You can access captured groups in four ways:

- By using the backreference construct within the regular expression. The matched subexpression is referenced in the same regular expression by using the syntax `\`*number*, where *number* is the ordinal number of the captured subexpression.

- By using the named backreference construct within the regular expression. The matched subexpression is referenced in the same regular expression by using the syntax `\k<`*name*`>`, where *name* is the name of a capturing group, or `\k<`*number*`>`, where *number* is the ordinal number of a capturing group. A capturing group has a default name that is identical to its ordinal number. For more information, see Named matched subexpressions later in this topic.

- By using the `$`*number* replacement sequence in a `System.Text.RegularExpressions.Regex.Replace*` or `System.Text.RegularExpressions.Match.Result*` method call, where *number* is the ordinal number of the captured subexpression.

- Programmatically, by using the `System.Text.RegularExpressions.GroupCollection` object returned by the `System.Text.RegularExpressions.Match.Groups` property. The member at position zero in the collection represents the entire regular expression match. Each subsequent member represents a matched subexpression. For more information, see the Grouping Constructs and Regular Expression Objects section.

The following example illustrates a regular expression that identifies duplicated words in text. The regular expression pattern's two capturing groups represent the two instances of the duplicated word. The second instance is captured to report its starting position in the input string.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"(\w+)\s(\1)\W";
      string input = "He said that that was the the correct answer.";
      foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnoreCase))
         Console.WriteLine($"Duplicate '{match.Groups[1].Value}' found at positions {match.Groups[1].Index} and {match.Groups[2].Index}.");
   }
}
// The example displays the following output:
//       Duplicate 'that' found at positions 8 and 13.
//       Duplicate 'the' found at positions 22 and 26.
```

The regular expression pattern is the following:

`(\w+)\s(\1)\W`

The following table shows how the regular expression pattern is interpreted.

|Pattern|Description|
|-------------|-----------------|
|`(\w+)`|Match one or more word characters. This is the first capturing group.|
|`\s`|Match a white-space character.|
|`(\1)`|Match the string in the first captured group. This is the second capturing group. The example assigns it to a captured group so that the starting position of the duplicate word can be retrieved from the `Match.Index` property.|
|`\W`|Match a non-word character, including white space and punctuation. This prevents the regular expression pattern from matching a word that starts with the word from the first captured group.|

## Named matched subexpressions

The following grouping construct captures a matched subexpression and lets you access it by name or by number:

`(?<name>subexpression)`

or:

`(?'name'subexpression)`

Here, *name* is a valid group name, and *subexpression* is any valid regular expression pattern. *name* must not contain any punctuation characters and cannot begin with a number.

> **Note:**
> If the `System.Text.RegularExpressions.RegexOptions` parameter of a regular expression pattern matching method includes the `System.Text.RegularExpressions.RegexOptions.ExplicitCapture` flag, or if the `n` option is applied to this subexpression (see Group options later in this topic), the only way to capture a subexpression is to explicitly name capturing groups.

You can access named captured groups in the following ways:

- By using the named backreference construct within the regular expression. The matched subexpression is referenced in the same regular expression by using the syntax `\k<`*name*`>`, where *name* is the name of the captured subexpression.

- By using the backreference construct within the regular expression. The matched subexpression is referenced in the same regular expression by using the syntax `\`*number*, where *number* is the ordinal number of the captured subexpression. Named matched subexpressions are numbered consecutively from left to right after matched subexpressions.

- By using the `${`*name*`}` replacement sequence in a `System.Text.RegularExpressions.Regex.Replace*` or `System.Text.RegularExpressions.Match.Result*` method call, where *name* is the name of the captured subexpression.

- By using the `$`*number* replacement sequence in a `System.Text.RegularExpressions.Regex.Replace*` or `System.Text.RegularExpressions.Match.Result*` method call, where *number* is the ordinal number of the captured subexpression.

- Programmatically, by using the `System.Text.RegularExpressions.GroupCollection` object returned by the `System.Text.RegularExpressions.Match.Groups` property. The member at position zero in the collection represents the entire regular expression match. Each subsequent member represents a matched subexpression. Named captured groups are stored in the collection after numbered captured groups.

- Programmatically, by providing the subexpression name to the `System.Text.RegularExpressions.GroupCollection` object's indexer (in C#) or to its `System.Text.RegularExpressions.GroupCollection.Item*` property (in Visual Basic).

A simple regular expression pattern illustrates how numbered (unnamed) and named groups can be referenced either programmatically or by using regular expression language syntax. The regular expression `((?<One>abc)\d+)?(?<Two>xyz)(.*)` produces the following capturing groups by number and by name. The first capturing group (number 0) always refers to the entire pattern. (Named groups are always ordered last.)

| Number | Name             | Pattern                            |
|--------|------------------|------------------------------------|
| 0      | 0 (default name) | `((?<One>abc)\d+)?(?<Two>xyz)(.*)` |
| 1      | 1 (default name) | `((?<One>abc)\d+)`                 |
| 2      | 2 (default name) | `(.*)`                             |
| 3      | One              | `(?<One>abc)`                      |
| 4      | Two              | `(?<Two>xyz)`                      |

The following example illustrates a regular expression that identifies duplicated words and the word that immediately follows each duplicated word. The regular expression pattern defines two named subexpressions: `duplicateWord`, which represents the duplicated word, and `nextWord`, which represents the word that follows the duplicated word.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"(?<duplicateWord>\w+)\s\k<duplicateWord>\W(?<nextWord>\w+)";
      string input = "He said that that was the the correct answer.";
      foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnoreCase))
         Console.WriteLine($"A duplicate '{match.Groups["duplicateWord"].Value}' at position {match.Groups["duplicateWord"].Index} is followed by '{match.Groups["nextWord"].Value}'.");
   }
}
// The example displays the following output:
//       A duplicate 'that' at position 8 is followed by 'was'.
//       A duplicate 'the' at position 22 is followed by 'correct'.
```

The regular expression pattern is as follows:

`(?<duplicateWord>\w+)\s\k<duplicateWord>\W(?<nextWord>\w+)`

The following table shows how the regular expression is interpreted.

|Pattern|Description|
|-------------|-----------------|
|`(?<duplicateWord>\w+)`|Match one or more word characters. Name this capturing group `duplicateWord`.|
|`\s`|Match a white-space character.|
|`\k<duplicateWord>`|Match the string from the captured group that is named `duplicateWord`.|
|`\W`|Match a non-word character, including white space and punctuation. This prevents the regular expression pattern from matching a word that starts with the word from the first captured group.|
|`(?<nextWord>\w+)`|Match one or more word characters. Name this capturing group `nextWord`.|

A group name can be repeated in a regular expression. For example, it's possible for more than one group to be named `digit`, as the following example illustrates. In the case of duplicate names, the value of the `System.Text.RegularExpressions.Group` object is determined by the last successful capture in the input string. In addition, the `System.Text.RegularExpressions.CaptureCollection` is populated with information about each capture just as it would be if the group name was not duplicated.

In the following example, the regular expression `\D+(?<digit>\d+)\D+(?<digit>\d+)?` includes two occurrences of a group named `digit`. The first `digit` named group captures one or more digit characters. The second `digit` named group captures either zero or one occurrence of one or more digit characters. As the output from the example shows, if the second capturing group successfully matches text, the value of that text defines the value of the `System.Text.RegularExpressions.Group` object. If the second capturing group does not match the input string, the value of the last successful match defines the value of the `System.Text.RegularExpressions.Group` object.

```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      String pattern = @"\D+(?<digit>\d+)\D+(?<digit>\d+)?";
      String[] inputs = { "abc123def456", "abc123def" };
      foreach (var input in inputs) {
         Match m = Regex.Match(input, pattern);
         if (m.Success) {
            Console.WriteLine($"Match: {m.Value}");
            for (int grpCtr = 1; grpCtr < m.Groups.Count; grpCtr++) {
               Group grp = m.Groups[grpCtr];
               Console.WriteLine($"Group {grpCtr}: {grp.Value}");
               for (int capCtr = 0; capCtr < grp.Captures.Count; capCtr++)
                  Console.WriteLine($"   Capture {capCtr}: {grp.Captures[capCtr].Value}");
            }
         }
         else {
            Console.WriteLine("The match failed.");
         }
         Console.WriteLine();
      }
   }
}
// The example displays the following output:
//       Match: abc123def456
//       Group 1: 456
//          Capture 0: 123
//          Capture 1: 456
//
//       Match: abc123def
//       Group 1: 123
//          Capture 0: 123
```

The following table shows how the regular expression is interpreted.

| Pattern          | Description                                                                                                        |
|------------------|--------------------------------------------------------------------------------------------------------------------|
| `\D+`            | Match one or more non-decimal digit characters.                                                                    |
| `(?<digit>\d+)`  | Match one or more decimal digit characters. Assign the match to the `digit` named group.                           |
| `\D+`            | Match one or more non-decimal digit characters.                                                                    |
| `(?<digit>\d+)?` | Match zero or one occurrence of one or more decimal digit characters. Assign the match to the `digit` named group. |
