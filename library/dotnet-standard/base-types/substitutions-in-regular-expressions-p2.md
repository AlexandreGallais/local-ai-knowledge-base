---
title: "Substitutions in Regular Expressions (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/substitutions-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Substitutions in Regular Expressions (part 2 of 2)

## Substituting the Text After the Match

 The `$'` substitution replaces the matched string with the entire input string after the match. That is, it duplicates the input string after the match while removing the matched text. Any text that precedes the matched text is unchanged in the result string. If there is no match, the  `$'` substitution has no effect.

 The following example uses the regular expression pattern `\d+` to match a sequence of one or more decimal digits in the input string. The replacement string `$'` replaces these digits with the text that follows the match.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string input = "aa1bb2cc3dd4ee5";
      string pattern = @"\d+";
      string substitution = "$'";
      Console.WriteLine("Matches:");
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"   {match.Value} at position {match.Index}");
      Console.WriteLine($"Input string:  {input}");
      Console.WriteLine("Output string: " +
                        Regex.Replace(input, pattern, substitution));
   }
}
// The example displays the following output:
//    Matches:
//       1 at position 2
//       2 at position 5
//       3 at position 8
//       4 at position 11
//       5 at position 14
//    Input string:  aa1bb2cc3dd4ee5
//    Output string: aabb2cc3dd4ee5bbcc3dd4ee5ccdd4ee5ddee5ee
```

 In this example, the input string `"aa1bb2cc3dd4ee5"` contains five matches. The following table illustrates how the `$'` substitution causes the regular expression engine to replace each match in the input string. Inserted text is shown in bold in the results column.

|Match|Position|String after match|Result string|
|-----------|--------------|------------------------|-------------------|
|1|2|bb2cc3dd4ee5|aa**bb2cc3dd4ee5**bb2cc3dd4ee5|
|2|5|cc3dd4ee5|aabb2cc3dd4ee5bb**cc3dd4ee5**cc3dd4ee5|
|3|8|dd4ee5|aabb2cc3dd4ee5bbcc3dd4ee5cc**dd4ee5**dd4ee5|
|4|11|ee5|aabb2cc3dd4ee5bbcc3dd4ee5ccdd4ee5dd**ee5**ee5|
|5|14|`System.String.Empty`|aabb2cc3dd4ee5bbcc3dd4ee5ccdd4ee5ddee5ee|

## Substituting the Last Captured Group

 The `$+` substitution replaces the matched string with the last captured group. If there are no captured groups or if the value of the last captured group is `System.String.Empty`, the `$+` substitution has no effect.

 The following example identifies duplicate words in a string and uses the `$+` substitution to replace them with a single occurrence of the word. The `System.Text.RegularExpressions.RegexOptions.IgnoreCase` option is used to ensure that words that differ in case but that are otherwise identical are considered duplicates.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b(\w+)\s\1\b";
      string substitution = "$+";
      string input = "The the dog jumped over the fence fence.";
      Console.WriteLine(Regex.Replace(input, pattern, substitution,
                        RegexOptions.IgnoreCase));
   }
}
// The example displays the following output:
//      The dog jumped over the fence.
```

 The regular expression pattern `\b(\w+)\s\1\b` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Begin the match at a word boundary.|
|`(\w+)`|Match one or more word characters. This is the first capturing group.|
|`\s`|Match a white-space character.|
|`\1`|Match the first captured group.|
|`\b`|End the match at a word boundary.|

## Substituting the Entire Input String

 The `$_` substitution replaces the matched string with the entire input string. That is, it removes the matched text and replaces it with the entire string, including the matched text.

 The following example matches one or more decimal digits in the input string. It uses the `$_` substitution to replace them with the entire input string.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string input = "ABC123DEF456";
      string pattern = @"\d+";
      string substitution = "$_";
      Console.WriteLine($"Original string:          {input}");
      Console.WriteLine($"String with substitution: {Regex.Replace(input, pattern, substitution)}");
   }
}
// The example displays the following output:
//       Original string:          ABC123DEF456
//       String with substitution: ABCABC123DEF456DEFABC123DEF456
```

 In this example, the input string `"ABC123DEF456"` contains two matches. The following table illustrates how the `$_` substitution causes the regular expression engine to replace each match in the input string. Inserted text is shown in bold in the results column.

|Match|Position|Match|Result string|
|-----------|--------------|-----------|-------------------|
|1|3|123|ABC**ABC123DEF456**DEF456|
|2|5|456|ABCABC123DEF456DEF**ABC123DEF456**|

## See also

- Regular Expression Language - Quick Reference
