---
title: "Anchors in .NET Regular Expressions (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/anchors-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Anchors in Regular Expressions

Anchors, or atomic zero-width assertions, specify a position in the string where a match must occur. When you use an anchor in your search expression, the regular expression engine does not advance through the string or consume characters; it looks for a match in the specified position only. For example, `^` specifies that the match must start at the beginning of a line or string. Therefore, the regular expression `^http:` matches "http:" only when it occurs at the beginning of a line. The following table lists the anchors supported by the regular expressions in .NET.

|Anchor|Description|
|------------|-----------------|
|`^`|By default, the match must occur at the beginning of the string; in multiline mode, it must occur at the beginning of the line. For more information, see Start of String or Line.|
|`$`|By default, the match must occur at the end of the string or before `\n` at the end of the string; in multiline mode, it must occur at the end of the line or before `\n` at the end of the line. For more information, see End of String or Line.|
|`\A`|The match must occur at the beginning of the string only (no multiline support). For more information, see Start of String Only.|
|`\Z`|The match must occur at the end of the string, or before `\n` at the end of the string. For more information, see End of String or Before Ending Newline.|
|`\z`|The match must occur at the end of the string only. For more information, see End of String Only.|
|`\G`|The match must start at the position where the previous match ended, or if there was no previous match, at the position in the string where matching started. For more information, see Contiguous Matches.|
|`\b`|The match must occur on a word boundary. For more information, see Word Boundary.|
|`\B`|The match must not occur on a word boundary. For more information, see Non-Word Boundary.|

## Start of String or Line: ^

 By default, the `^` anchor specifies that the following pattern must begin at the first character position of the string. If you use `^` with the `System.Text.RegularExpressions.RegexOptions.Multiline` option (see Regular Expression Options), the match must occur at the beginning of each line.

 The following example uses the `^` anchor in a regular expression that extracts information about the years during which some professional baseball teams existed. The example calls two overloads of the `System.Text.RegularExpressions.Regex.Matches*` method:

- The call to the `System.Text.RegularExpressions.Regex.Matches(System.String,System.String)` overload finds only the first substring in the input string that matches the regular expression pattern.

- The call to the `System.Text.RegularExpressions.Regex.Matches(System.String,System.String,System.Text.RegularExpressions.RegexOptions)` overload with the `options` parameter set to `System.Text.RegularExpressions.RegexOptions.Multiline` finds all five substrings.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string input = "Brooklyn Dodgers, National League, 1911, 1912, 1932-1957\n" +
                     "Chicago Cubs, National League, 1903-present\n" +
                     "Detroit Tigers, American League, 1901-present\n" +
                     "New York Giants, National League, 1885-1957\n" +
                     "Washington Senators, American League, 1901-1960\n";
        string pattern = @"^((\w+(\s?)){2,}),\s(\w+\s\w+),(\s\d{4}(-(\d{4}|present))?,?)+";
        Match match;

        match = Regex.Match(input, pattern);
        while (match.Success)
        {
            Console.Write("The {0} played in the {1} in",
                              match.Groups[1].Value, match.Groups[4].Value);
            foreach (Capture capture in match.Groups[5].Captures)
                Console.Write(capture.Value);

            Console.WriteLine(".");
            match = match.NextMatch();
        }
        Console.WriteLine();

        match = Regex.Match(input, pattern, RegexOptions.Multiline);
        while (match.Success)
        {
            Console.Write("The {0} played in the {1} in",
                              match.Groups[1].Value, match.Groups[4].Value);
            foreach (Capture capture in match.Groups[5].Captures)
                Console.Write(capture.Value);

            Console.WriteLine(".");
            match = match.NextMatch();
        }
        Console.WriteLine();
    }
}
// The example displays the following output:
//    The Brooklyn Dodgers played in the National League in 1911, 1912, 1932-1957.
//
//    The Brooklyn Dodgers played in the National League in 1911, 1912, 1932-1957.
//    The Chicago Cubs played in the National League in 1903-present.
//    The Detroit Tigers played in the American League in 1901-present.
//    The New York Giants played in the National League in 1885-1957.
//    The Washington Senators played in the American League in 1901-1960.
```

 The regular expression pattern `^((\w+(\s?)){2,}),\s(\w+\s\w+),(\s\d{4}(-(\d{4}|present))?,?)+` is defined as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`^`|Begin the match at the beginning of the input string (or the beginning of the line if the method is called with the `System.Text.RegularExpressions.RegexOptions.Multiline` option).|
|`((\w+(\s?)){2,}`|Match one or more word characters followed either by zero or by one space at least two times. This is the first capturing group. This expression also defines a second and third capturing group: The second consists of the captured word, and the third consists of the captured white space.|
|`,\s`|Match a comma followed by a white-space character.|
|`(\w+\s\w+)`|Match one or more word characters followed by a space, followed by one or more word characters. This is the fourth capturing group.|
|`,`|Match a comma.|
|`\s\d{4}`|Match a space followed by four decimal digits.|
|`(-(\d{4}&#124;present))?`|Match zero or one occurrence of a hyphen followed by four decimal digits or the string "present". This is the sixth capturing group. It also includes a seventh capturing group.|
|`,?`|Match zero or one occurrence of a comma.|
|`(\s\d{4}(-(\d{4}&#124;present))?,?)+`|Match one or more occurrences of the following: a space, four decimal digits, zero or one occurrence of a hyphen followed by four decimal digits or the string "present", and zero or one comma. This is the fifth capturing group.|

## End of String or Line: $

 The `$` anchor specifies that the preceding pattern must occur at the end of the input string, or before `\n` at the end of the input string.

 If you use `$` with the `System.Text.RegularExpressions.RegexOptions.Multiline` option, the match can also occur at the end of a line. Note that `$` is satisfied at `\n` but not at `\r\n` (the combination of carriage return and newline characters, or CR/LF). To handle the CR/LF character combination, include `\r?$` in the regular expression pattern. Note that `\r?$` will include any `\r` in the match.

 Starting with .NET 11, you can use `System.Text.RegularExpressions.RegexOptions.AnyNewLine` to make `$` recognize all common newline sequences instead of only `\n`. Unlike the `\r?$` workaround, `AnyNewLine` treats `\r\n` as an atomic sequence, so `\r` is not included in the match. For more information, see AnyNewLine mode.

 The following example adds the `$` anchor to the regular expression pattern used in the example in the Start of String or Line section. When used with the original input string, which includes five lines of text, the `System.Text.RegularExpressions.Regex.Matches(System.String,System.String)` method is unable to find a match, because the end of the first line does not match the `$` pattern. When the original input string is split into a string array, the `System.Text.RegularExpressions.Regex.Matches(System.String,System.String)` method succeeds in matching each of the five lines. When the `System.Text.RegularExpressions.Regex.Matches(System.String,System.String,System.Text.RegularExpressions.RegexOptions)` method is called with the `options` parameter set to `System.Text.RegularExpressions.RegexOptions.Multiline`, no matches are found because the regular expression pattern does not account for the carriage return character `\r`. However, when the regular expression pattern is modified by replacing `$` with `\r?$`, calling the `System.Text.RegularExpressions.Regex.Matches(System.String,System.String,System.Text.RegularExpressions.RegexOptions)` method with the `options` parameter set to `System.Text.RegularExpressions.RegexOptions.Multiline` again finds five matches.
 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string cr = Environment.NewLine;
        string input = "Brooklyn Dodgers, National League, 1911, 1912, 1932-1957" + cr +
                       "Chicago Cubs, National League, 1903-present" + cr +
                       "Detroit Tigers, American League, 1901-present" + cr +
                       "New York Giants, National League, 1885-1957" + cr +
                       "Washington Senators, American League, 1901-1960" + cr;
        Match match;

        string basePattern = @"^((\w+(\s?)){2,}),\s(\w+\s\w+),(\s\d{4}(-(\d{4}|present))?,?)+";
        string pattern = basePattern + "$";
        Console.WriteLine("Attempting to match the entire input string:");
        match = Regex.Match(input, pattern);
        while (match.Success)
        {
            Console.Write("The {0} played in the {1} in",
                              match.Groups[1].Value, match.Groups[4].Value);
            foreach (Capture capture in match.Groups[5].Captures)
                Console.Write(capture.Value);

            Console.WriteLine(".");
            match = match.NextMatch();
        }
        Console.WriteLine();

        string[] teams = input.Split(new String[] { cr }, StringSplitOptions.RemoveEmptyEntries);
        Console.WriteLine("Attempting to match each element in a string array:");
        foreach (string team in teams)
        {
            match = Regex.Match(team, pattern);
            if (match.Success)
            {
                Console.Write("The {0} played in the {1} in",
                              match.Groups[1].Value, match.Groups[4].Value);
                foreach (Capture capture in match.Groups[5].Captures)
                    Console.Write(capture.Value);
                Console.WriteLine(".");
            }
        }
        Console.WriteLine();

        Console.WriteLine("Attempting to match each line of an input string with '$':");
        match = Regex.Match(input, pattern, RegexOptions.Multiline);
        while (match.Success)
        {
            Console.Write("The {0} played in the {1} in",
                              match.Groups[1].Value, match.Groups[4].Value);
            foreach (Capture capture in match.Groups[5].Captures)
                Console.Write(capture.Value);

            Console.WriteLine(".");
            match = match.NextMatch();
        }
        Console.WriteLine();

        pattern = basePattern + "\r?$";
        Console.WriteLine(@"Attempting to match each line of an input string with '\r?$':");
        match = Regex.Match(input, pattern, RegexOptions.Multiline);
        while (match.Success)
        {
            Console.Write("The {0} played in the {1} in",
                              match.Groups[1].Value, match.Groups[4].Value);
            foreach (Capture capture in match.Groups[5].Captures)
                Console.Write(capture.Value);

            Console.WriteLine(".");
            match = match.NextMatch();
        }
        Console.WriteLine();
    }
}
// The example displays the following output:
//    Attempting to match the entire input string:
//
//    Attempting to match each element in a string array:
//    The Brooklyn Dodgers played in the National League in 1911, 1912, 1932-1957.
//    The Chicago Cubs played in the National League in 1903-present.
//    The Detroit Tigers played in the American League in 1901-present.
//    The New York Giants played in the National League in 1885-1957.
//    The Washington Senators played in the American League in 1901-1960.
//
//    Attempting to match each line of an input string with '$':
//
//    Attempting to match each line of an input string with '\r?$':
//    The Brooklyn Dodgers played in the National League in 1911, 1912, 1932-1957.
//    The Chicago Cubs played in the National League in 1903-present.
//    The Detroit Tigers played in the American League in 1901-present.
//    The New York Giants played in the National League in 1885-1957.
//    The Washington Senators played in the American League in 1901-1960.
```

## Start of String Only: \A

 The `\A` anchor specifies that a match must occur at the beginning of the input string. It is identical to the `^` anchor, except that `\A` ignores the `System.Text.RegularExpressions.RegexOptions.Multiline` option. Therefore, it can only match the start of the first line in a multiline input string.

 The following example is similar to the examples for the `^` and `$` anchors. It uses the `\A` anchor in a regular expression that extracts information about the years during which some professional baseball teams existed. The input string includes five lines. The call to the `System.Text.RegularExpressions.Regex.Matches(System.String,System.String,System.Text.RegularExpressions.RegexOptions)` method finds only the first substring in the input string that matches the regular expression pattern. As the example shows, the `System.Text.RegularExpressions.RegexOptions.Multiline` option has no effect.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
    public static void Main()
    {
        string input = "Brooklyn Dodgers, National League, 1911, 1912, 1932-1957\n" +
                       "Chicago Cubs, National League, 1903-present\n" +
                       "Detroit Tigers, American League, 1901-present\n" +
                       "New York Giants, National League, 1885-1957\n" +
                       "Washington Senators, American League, 1901-1960\n";

        string pattern = @"\A((\w+(\s?)){2,}),\s(\w+\s\w+),(\s\d{4}(-(\d{4}|present))?,?)+";

        Match match = Regex.Match(input, pattern, RegexOptions.Multiline);
        while (match.Success)
        {
            Console.Write("The {0} played in the {1} in",
                              match.Groups[1].Value, match.Groups[4].Value);
            foreach (Capture capture in match.Groups[5].Captures)
                Console.Write(capture.Value);

            Console.WriteLine(".");
            match = match.NextMatch();
        }
        Console.WriteLine();
    }
}
// The example displays the following output:
//    The Brooklyn Dodgers played in the National League in 1911, 1912, 1932-1957.
```
