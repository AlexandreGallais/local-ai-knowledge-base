---
title: "Anchors in .NET Regular Expressions (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/anchors-in-regular-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Anchors in .NET Regular Expressions (part 2 of 2)

## End of String or Before Ending Newline: \Z

 The `\Z` anchor specifies that a match must occur at the end of the input string, or before `\n` at the end of the input string. It is identical to the `$` anchor, except that `\Z` ignores the `System.Text.RegularExpressions.RegexOptions.Multiline` option. Therefore, in a multiline string, it can only be satisfied by the end of the last line, or the last line before `\n`.

 Note that `\Z` is satisfied at `\n` but is not satisfied at `\r\n` (the CR/LF character combination). To treat CR/LF as if it were `\n`, include `\r?\Z` in the regular expression pattern. Note that this will make the `\r` part of the match.

 Starting with .NET 11, you can use `System.Text.RegularExpressions.RegexOptions.AnyNewLine` to make `\Z` recognize all common newline sequences instead of only `\n`. Unlike the `\r?\Z` workaround, `AnyNewLine` treats `\r\n` as an atomic sequence, so `\r` is not included in the match. For more information, see AnyNewLine mode.

 The following example uses the `\Z` anchor in a regular expression that is similar to the example in the Start of String or Line section, which extracts information about the years during which some professional baseball teams existed. The subexpression `\r?\Z` in the regular expression `^((\w+(\s?)){2,}),\s(\w+\s\w+),(\s\d{4}(-(\d{4}|present))?,?)+\r?\Z` is satisfied at the end of a string, and also at the end of a string that ends with `\n` or `\r\n`. As a result, each element in the array matches the regular expression pattern.
 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string[] inputs = { "Brooklyn Dodgers, National League, 1911, 1912, 1932-1957",
                          "Chicago Cubs, National League, 1903-present" + Environment.NewLine,
                          "Detroit Tigers, American League, 1901-present" + Regex.Unescape(@"\n"),
                          "New York Giants, National League, 1885-1957",
                          "Washington Senators, American League, 1901-1960" + Environment.NewLine};
        string pattern = @"^((\w+(\s?)){2,}),\s(\w+\s\w+),(\s\d{4}(-(\d{4}|present))?,?)+\r?\Z";

        foreach (string input in inputs)
        {
            Console.WriteLine(Regex.Escape(input));
            Match match = Regex.Match(input, pattern);
            if (match.Success)
                Console.WriteLine("   Match succeeded.");
            else
                Console.WriteLine("   Match failed.");
        }
    }
}
// The example displays the following output:
//    Brooklyn\ Dodgers,\ National\ League,\ 1911,\ 1912,\ 1932-1957
//       Match succeeded.
//    Chicago\ Cubs,\ National\ League,\ 1903-present\r\n
//       Match succeeded.
//    Detroit\ Tigers,\ American\ League,\ 1901-present\n
//       Match succeeded.
//    New\ York\ Giants,\ National\ League,\ 1885-1957
//       Match succeeded.
//    Washington\ Senators,\ American\ League,\ 1901-1960\r\n
//       Match succeeded.
```

## End of String Only: \z

 The `\z` anchor specifies that a match must occur at the end of the input string. Like the `$` language element, `\z` ignores the `System.Text.RegularExpressions.RegexOptions.Multiline` option. Unlike the `\Z` language element, `\z` is not satisfied by a `\n` character at the end of a string. Therefore, it can only match the end of the input string.

 The following example uses the `\z` anchor in a regular expression that is otherwise identical to the example in the previous section, which extracts information about the years during which some professional baseball teams existed. The example tries to match each of five elements in a string array with the regular expression pattern `^((\w+(\s?)){2,}),\s(\w+\s\w+),(\s\d{4}(-(\d{4}|present))?,?)+\r?\z`. Two of the strings end with carriage return and line feed characters, one ends with a line feed character, and two end with neither a carriage return nor a line feed character. As the output shows, only the strings without a carriage return or line feed character match the pattern.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string[] inputs = { "Brooklyn Dodgers, National League, 1911, 1912, 1932-1957",
                          "Chicago Cubs, National League, 1903-present" + Environment.NewLine,
                          "Detroit Tigers, American League, 1901-present\n",
                          "New York Giants, National League, 1885-1957",
                          "Washington Senators, American League, 1901-1960" + Environment.NewLine };
        string pattern = @"^((\w+(\s?)){2,}),\s(\w+\s\w+),(\s\d{4}(-(\d{4}|present))?,?)+\r?\z";

        foreach (string input in inputs)
        {
            Console.WriteLine(Regex.Escape(input));
            Match match = Regex.Match(input, pattern);
            if (match.Success)
                Console.WriteLine("   Match succeeded.");
            else
                Console.WriteLine("   Match failed.");
        }
    }
}
// The example displays the following output:
//    Brooklyn\ Dodgers,\ National\ League,\ 1911,\ 1912,\ 1932-1957
//       Match succeeded.
//    Chicago\ Cubs,\ National\ League,\ 1903-present\r\n
//       Match failed.
//    Detroit\ Tigers,\ American\ League,\ 1901-present\n
//       Match failed.
//    New\ York\ Giants,\ National\ League,\ 1885-1957
//       Match succeeded.
//    Washington\ Senators,\ American\ League,\ 1901-1960\r\n
//       Match failed.
```

## Contiguous Matches: \G

The `\G` anchor specifies that a match must occur at the point where the previous match ended, or if there was no previous match, at the position in the string where matching started. When you use this anchor with the `System.Text.RegularExpressions.Regex.Matches*` or `System.Text.RegularExpressions.Match.NextMatch*` method, it ensures that all matches are contiguous.

> **Tip:**
> Typically, you place a `\G` anchor at the left end of your pattern. In the uncommon case you're performing a right-to-left search, place the `\G` anchor at the right end of your pattern.

 The following example uses a regular expression to extract the names of rodent species from a comma-delimited string.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string input = "capybara,squirrel,chipmunk,porcupine,gopher," +
                       "beaver,groundhog,hamster,guinea pig,gerbil," +
                       "chinchilla,prairie dog,mouse,rat";
        string pattern = @"\G(\w+\s?\w*),?";
        Match match = Regex.Match(input, pattern);
        while (match.Success)
        {
            Console.WriteLine(match.Groups[1].Value);
            match = match.NextMatch();
        }
    }
}
// The example displays the following output:
//       capybara
//       squirrel
//       chipmunk
//       porcupine
//       gopher
//       beaver
//       groundhog
//       hamster
//       guinea pig
//       gerbil
//       chinchilla
//       prairie dog
//       mouse
//       rat
```

 The regular expression `\G(\w+\s?\w*),?` is interpreted as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\G`|Begin where the last match ended.|
|`\w+`|Match one or more word characters.|
|`\s?`|Match zero or one space.|
|`\w*`|Match zero or more word characters.|
|`(\w+\s?\w*)`|Match one or more word characters followed by zero or one space, followed by zero or more word characters. This is the first capturing group.|
|`,?`|Match zero or one occurrence of a literal comma character.|

## Word Boundary: \b

 The `\b` anchor specifies that the match must occur on a boundary between a word character (the `\w` language element) and a non-word character (the `\W` language element). Word characters consist of alphanumeric characters and underscores; a non-word character is any character that is not alphanumeric or an underscore. (For more information, see Character Classes.) The match may also occur on a word boundary at the beginning or end of the string.

 The `\b` anchor is frequently used to ensure that a subexpression matches an entire word instead of just the beginning or end of a word. The regular expression `\bare\w*\b` in the following example illustrates this usage. It matches any word that begins with the substring "are". The output from the example also illustrates that `\b` matches both the beginning and the end of the input string.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string input = "area bare arena mare";
        string pattern = @"\bare\w*\b";
        Console.WriteLine("Words that begin with 'are':");
        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine($"'{match.Value}' found at position {match.Index}");
    }
}
// The example displays the following output:
//       Words that begin with 'are':
//       'area' found at position 0
//       'arena' found at position 10
```

 The regular expression pattern is interpreted as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\b`|Begin the match at a word boundary.|
|`are`|Match the substring "are".|
|`\w*`|Match zero or more word characters.|
|`\b`|End the match at a word boundary.|

## Non-Word Boundary: \B

 The `\B` anchor specifies that the match must not occur on a word boundary. It is the opposite of the `\b` anchor.

 The following example uses the `\B` anchor to locate occurrences of the substring "qu" in a word. The regular expression pattern `\Bqu\w+` matches a substring that begins with a "qu" that does not start a word and that continues to the end of the word.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string input = "equity queen equip acquaint quiet";
        string pattern = @"\Bqu\w+";
        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine($"'{match.Value}' found at position {match.Index}");
    }
}
// The example displays the following output:
//       'quity' found at position 1
//       'quip' found at position 14
//       'quaint' found at position 21
```

 The regular expression pattern is interpreted as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`\B`|Do not begin the match at a word boundary.|
|`qu`|Match the substring "qu".|
|`\w+`|Match one or more word characters.|

## See also

- Regular Expression Language - Quick Reference
- Regular Expression Options
