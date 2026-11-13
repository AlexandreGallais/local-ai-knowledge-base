---
title: "Options for regular expression (part 5 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/regular-expression-options.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Options for regular expression (part 5 of 6)

## ECMAScript matching behavior

By default, the regular expression engine uses canonical behavior when matching a regular expression pattern to input text. However, you can instruct the regular expression engine to use ECMAScript matching behavior by specifying the `System.Text.RegularExpressions.RegexOptions.ECMAScript` option.

> **Note:**
> ECMAScript-compliant behavior is available only by supplying the `System.Text.RegularExpressions.RegexOptions.ECMAScript` value to the `options` parameter of a `System.Text.RegularExpressions.Regex` class constructor or static pattern-matching method. It is not available as an inline option.

The `System.Text.RegularExpressions.RegexOptions.ECMAScript` option can be combined only with the `System.Text.RegularExpressions.RegexOptions.IgnoreCase`, `System.Text.RegularExpressions.RegexOptions.Multiline`, and `System.Text.RegularExpressions.RegexOptions.Compiled` options. The use of any other option in a regular expression results in an `System.ArgumentOutOfRangeException`.

The behavior of ECMAScript and canonical regular expressions differs in three areas: character class syntax, self-referencing capturing groups, and octal versus backreference interpretation.

- Character class syntax. Because canonical regular expressions support Unicode whereas ECMAScript does not, character classes in ECMAScript have a more limited syntax, and some character class language elements have a different meaning. For example, ECMAScript does not support language elements such as the Unicode category or block elements `\p` and `\P`. Similarly, the `\w` element, which matches a word character, is equivalent to the `[a-zA-Z_0-9]` character class when using ECMAScript and `[\p{Ll}\p{Lu}\p{Lt}\p{Lo}\p{Nd}\p{Pc}\p{Lm}]` when using canonical behavior. For more information, see Character Classes.

  The following example illustrates the difference between canonical and ECMAScript pattern matching. It defines a regular expression, `\b(\w+\s*)+`, that matches words followed by white-space characters. The input consists of two strings, one that uses the Latin character set and the other that uses the Cyrillic character set. As the output shows, the call to the `System.Text.RegularExpressions.Regex.IsMatch(System.String,System.String,System.Text.RegularExpressions.RegexOptions)` method that uses ECMAScript matching fails to match the Cyrillic words, whereas the method call that uses canonical matching does match these words.

  ```csharp
using System;
using System.Text.RegularExpressions;

public class EcmaScriptExample
{
    public static void Main()
    {
        string[] values = { "целый мир", "the whole world" };
        string pattern = @"\b(\w+\s*)+";
        foreach (var value in values)
        {
            Console.Write("Canonical matching: ");
            if (Regex.IsMatch(value, pattern))
                Console.WriteLine($"'{value}' matches the pattern.");
            else
                Console.WriteLine($"{value} does not match the pattern.");

            Console.Write("ECMAScript matching: ");
            if (Regex.IsMatch(value, pattern, RegexOptions.ECMAScript))
                Console.WriteLine($"'{value}' matches the pattern.");
            else
                Console.WriteLine($"{value} does not match the pattern.");
            Console.WriteLine();
        }
    }
}
// The example displays the following output:
//       Canonical matching: 'целый мир' matches the pattern.
//       ECMAScript matching: целый мир does not match the pattern.
//
//       Canonical matching: 'the whole world' matches the pattern.
//       ECMAScript matching: 'the whole world' matches the pattern.
```

- Self-referencing capturing groups. A regular expression capture class with a backreference to itself must be updated with each capture iteration. As the following example shows, this feature enables the regular expression `((a+)(\1) ?)+` to match the input string " aa aaaa aaaaaa " when using ECMAScript, but not when using canonical matching.

  ```csharp
using System;
using System.Text.RegularExpressions;

public class EcmaScript2Example
{
    static string pattern;

    public static void Main()
    {
        string input = "aa aaaa aaaaaa ";
        pattern = @"((a+)(\1) ?)+";

        // Match input using canonical matching.
        AnalyzeMatch(Regex.Match(input, pattern));

        // Match input using ECMAScript.
        AnalyzeMatch(Regex.Match(input, pattern, RegexOptions.ECMAScript));
    }

    private static void AnalyzeMatch(Match m)
    {
        if (m.Success)
        {
            Console.WriteLine($"'{pattern}' matches {m.Value} at position {m.Index}.");
            int grpCtr = 0;
            foreach (Group grp in m.Groups)
            {
                Console.WriteLine($"   {grpCtr}: '{grp.Value}'");
                grpCtr++;
                int capCtr = 0;
                foreach (Capture cap in grp.Captures)
                {
                    Console.WriteLine($"      {capCtr}: '{cap.Value}'");
                    capCtr++;
                }
            }
        }
        else
        {
            Console.WriteLine("No match found.");
        }
        Console.WriteLine();
    }
}
// The example displays the following output:
//    No match found.
//
//    '((a+)(\1) ?)+' matches aa aaaa aaaaaa  at position 0.
//       0: 'aa aaaa aaaaaa '
//          0: 'aa aaaa aaaaaa '
//       1: 'aaaaaa '
//          0: 'aa '
//          1: 'aaaa '
//          2: 'aaaaaa '
//       2: 'aa'
//          0: 'aa'
//          1: 'aa'
//          2: 'aa'
//       3: 'aaaa '
//          0: ''
//          1: 'aa '
//          2: 'aaaa '
```

  The regular expression is defined as shown in the following table.

  |Pattern|Description|
  |-------------|-----------------|
  |(a+)|Match the letter "a" one or more times. This is the second capturing group.|
  |(\1)|Match the substring captured by the first capturing group. This is the third capturing group.|
  |?|Match zero or one space characters.|
  |((a+)(\1) ?)+|Match the pattern of one or more "a" characters followed by a string that matches the first capturing group followed by zero or one space characters one or more times. This is the first capturing group.|

- Resolution of ambiguities between octal escapes and backreferences. The following table summarizes the differences in octal versus backreference interpretation by canonical and ECMAScript regular expressions.

  |Regular expression|Canonical behavior|ECMAScript behavior|
  |------------------------|------------------------|-------------------------|
  |`\0` followed by 0 to 2 octal digits|Interpret as an octal. For example, `\044` is always interpreted as an octal value and means "$".|Same behavior.|
  |`\` followed by a digit from 1 to 9, followed by no additional decimal digits,|Interpret as a backreference. For example, `\9` always means backreference 9, even if a ninth capturing group does not exist. If the capturing group does not exist, the regular expression parser throws an `System.ArgumentException`.|If a single decimal digit capturing group exists, backreference to that digit. Otherwise, interpret the value as a literal.|
  |`\` followed by a digit from 1 to 9, followed by additional decimal digits|Interpret the digits as a decimal value. If that capturing group exists, interpret the expression as a backreference. Otherwise, interpret the leading octal digits up to octal 377; that is, consider only the low 8 bits of the value. Interpret the remaining digits as literals. For example, in the expression `\3000`, if capturing group 300 exists, interpret as backreference 300; if capturing group 300 does not exist, interpret as octal 300 followed by 0.|Interpret as a backreference by converting as many digits as possible to a decimal value that can refer to a capture. If no digits can be converted, interpret as an octal by using the leading octal digits up to octal 377; interpret the remaining digits as literals.|

## Compare using the invariant culture

By default, when the regular expression engine performs case-insensitive comparisons, it uses the casing conventions of the current culture to determine equivalent uppercase and lowercase characters.

However, this behavior is undesirable for some types of comparisons, particularly when comparing user input to the names of system resources, such as passwords, files, or URLs. The following example illustrates such a scenario. The code is intended to block access to any resource whose URL is prefaced with **FILE://**. The regular expression attempts a case-insensitive match with the string by using the regular expression `$FILE://`. However, when the current system culture is tr-TR (Turkish-Türkiye), "I" is not the uppercase equivalent of "<example-value>". As a result, the call to the `System.Text.RegularExpressions.Regex.IsMatch*` method returns `false`, and access to the file is allowed.

```csharp
using System;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Threading;

public class CultureExample
{
    public static void Main()
    {
        ShowIllegalAccess();
        Console.WriteLine("-----");
        ShowNoAccess();
    }

    private static void ShowIllegalAccess()
    {
        CultureInfo defaultCulture = Thread.CurrentThread.CurrentCulture;
        Thread.CurrentThread.CurrentCulture = new CultureInfo("tr-TR");

        string input = "file://c:/Documents.MyReport.doc";
        string pattern = "FILE://";

        Console.WriteLine($"Culture-sensitive matching ({Thread.CurrentThread.CurrentCulture.Name} culture)...");
        if (Regex.IsMatch(input, pattern, RegexOptions.IgnoreCase))
            Console.WriteLine("URLs that access files are not allowed.");
        else
            Console.WriteLine($"Access to {input} is allowed.");

        Thread.CurrentThread.CurrentCulture = defaultCulture;
        // The example displays the following output:
        //       Culture-sensitive matching (tr-TR culture)...
        //       Access to file://c:/Documents.MyReport.doc is allowed.
    }

    private static void ShowNoAccess()
    {
        CultureInfo defaultCulture = Thread.CurrentThread.CurrentCulture;
        Thread.CurrentThread.CurrentCulture = new CultureInfo("tr-TR");

        string input = "file://c:/Documents.MyReport.doc";
        string pattern = "FILE://";

        Console.WriteLine("Culture-insensitive matching...");
        if (Regex.IsMatch(input, pattern,
                          RegexOptions.IgnoreCase | RegexOptions.CultureInvariant))
            Console.WriteLine("URLs that access files are not allowed.");
        else
            Console.WriteLine($"Access to {input} is allowed.");

        Thread.CurrentThread.CurrentCulture = defaultCulture;
        // The example displays the following output:
        //       Culture-insensitive matching...
        //       URLs that access files are not allowed.
    }
}
```

> **Note:**
> For more information about string comparisons that are case-sensitive and that use the invariant culture, see Best Practices for Using Strings.

Instead of using the case-insensitive comparisons of the current culture, you can specify the `System.Text.RegularExpressions.RegexOptions.CultureInvariant` option to ignore cultural differences in language and to use the conventions of the invariant culture.

> **Note:**
> Comparison using the invariant culture is available only by supplying the `System.Text.RegularExpressions.RegexOptions.CultureInvariant` value to the `options` parameter of a `System.Text.RegularExpressions.Regex` class constructor or static pattern-matching method. It is not available as an inline option.

The following example is identical to the previous example, except that the static `System.Text.RegularExpressions.Regex.IsMatch(System.String,System.String,System.Text.RegularExpressions.RegexOptions)` method is called with options that include `System.Text.RegularExpressions.RegexOptions.CultureInvariant`. Even when the current culture is set to Turkish (Türkiye), the regular expression engine is able to successfully match "FILE" and "file" and block access to the file resource.

```csharp
using System;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Threading;

public class CultureExample
{
    public static void Main()
    {
        ShowIllegalAccess();
        Console.WriteLine("-----");
        ShowNoAccess();
    }

    private static void ShowIllegalAccess()
    {
        CultureInfo defaultCulture = Thread.CurrentThread.CurrentCulture;
        Thread.CurrentThread.CurrentCulture = new CultureInfo("tr-TR");

        string input = "file://c:/Documents.MyReport.doc";
        string pattern = "FILE://";

        Console.WriteLine($"Culture-sensitive matching ({Thread.CurrentThread.CurrentCulture.Name} culture)...");
        if (Regex.IsMatch(input, pattern, RegexOptions.IgnoreCase))
            Console.WriteLine("URLs that access files are not allowed.");
        else
            Console.WriteLine($"Access to {input} is allowed.");

        Thread.CurrentThread.CurrentCulture = defaultCulture;
        // The example displays the following output:
        //       Culture-sensitive matching (tr-TR culture)...
        //       Access to file://c:/Documents.MyReport.doc is allowed.
    }

    private static void ShowNoAccess()
    {
        CultureInfo defaultCulture = Thread.CurrentThread.CurrentCulture;
        Thread.CurrentThread.CurrentCulture = new CultureInfo("tr-TR");

        string input = "file://c:/Documents.MyReport.doc";
        string pattern = "FILE://";

        Console.WriteLine("Culture-insensitive matching...");
        if (Regex.IsMatch(input, pattern,
                          RegexOptions.IgnoreCase | RegexOptions.CultureInvariant))
            Console.WriteLine("URLs that access files are not allowed.");
        else
            Console.WriteLine($"Access to {input} is allowed.");

        Thread.CurrentThread.CurrentCulture = defaultCulture;
        // The example displays the following output:
        //       Culture-insensitive matching...
        //       URLs that access files are not allowed.
    }
}
```
