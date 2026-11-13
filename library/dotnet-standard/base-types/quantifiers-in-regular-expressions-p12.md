---
title: "Quantifiers in Regular Expressions (part 12 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/quantifiers-in-regular-expressions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Quantifiers in Regular Expressions (part 12 of 13)

### Match Between n and m Times (Lazy Match): {n,m}?

 The `{`*n*`,`*m*`}?` quantifier matches the preceding element between `n` and `m` times, where *n* and *m* are integers but as few times as possible. It's the lazy counterpart of the greedy quantifier `{`*n*`,`*m*`}`.

 In the following example, the regular expression `\bA-Z{1,10}[.!?]` matches sentences that contain between 1 and 10 words. It matches all the sentences in the input string except for one sentence that contains 18 words.

 ```csharp
using System;
using System.Text.RegularExpressions;

[assembly: CLSCompliant(true)]
public class Class1
{
   public static void Main()
   {
      Console.WriteLine("* quantifier:");
      ShowStar();
      Console.WriteLine();
      Console.WriteLine("+ quantifier:");
      ShowPlus();
      Console.WriteLine();
      Console.WriteLine("? quantifier:");
      ShowQuestion();
      Console.WriteLine();
      Console.WriteLine("{n} quantifier:");
      ShowN();
      Console.WriteLine();
      Console.WriteLine("{n,} quantifier:");
      ShowNComma();
      Console.WriteLine();
      Console.WriteLine("{n,m} quantifier:");
      ShowNM();
      Console.WriteLine();
      Console.WriteLine("*? quantifier:");
      ShowLazyStar();
      Console.WriteLine();
      Console.WriteLine("+? quantifier:");
      ShowLazyPlus();
      Console.WriteLine();
      Console.WriteLine("?? quantifier:");
      ShowLazyQuestion();
      Console.WriteLine();
      Console.WriteLine("{n}? quantifier:");
      ShowLazyN();
      Console.WriteLine();
      Console.WriteLine("{n,}? quantifier: NO EXAMPLE");
      ShowLazyNComma();
      Console.WriteLine();
      Console.WriteLine("{n,m}? quantifier:");
      ShowLazyNM();
   }

   private static void ShowStar()
   {
      string pattern = @"\b91*9*\b";
      string input = "99 95 919 929 9119 9219 999 9919 91119";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      // The example displays the following output:
      //       '99' found at position 0.
      //       '919' found at position 6.
      //       '9119' found at position 14.
      //       '999' found at position 24.
      //       '91119' found at position 33.
   }

   private static void ShowPlus()
   {
      string pattern = @"\ban+\w*?\b";

      string input = "Autumn is a great time for an annual announcement to all antique collectors.";
      foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnoreCase))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      // The example displays the following output:
      //       'an' found at position 27.
      //       'annual' found at position 30.
      //       'announcement' found at position 37.
      //       'antique' found at position 57.
   }

   private static void ShowQuestion()
   {
      string pattern = @"\ban?\b";
      string input = "An amiable animal with a large snout and an animated nose.";
      foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnoreCase))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      // The example displays the following output:
      //        'An' found at position 0.
      //        'a' found at position 23.
      //        'an' found at position 42.
   }

   private static void ShowN()
   {
      string pattern = @"\b\d+\,\d{3}\b";
      string input = "Sales totaled 103,524 million in January, " +
                            "106,971 million in February, but only " +
                            "943 million in March.";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      //  The example displays the following output:
      //        '103,524' found at position 14.
      //        '106,971' found at position 45.
   }

   private static void ShowNComma()
   {
      string pattern = @"\b\d{2,}\b\D+";
      string input = "7 days, 10 weeks, 300 years";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      //  The example displays the following output:
      //        '10 weeks, ' found at position 8.
      //        '300 years' found at position 18.
   }

   private static void ShowNM()
   {
      string pattern = @"(00\s){2,4}";
      string input = "0x00 FF 00 00 18 17 FF 00 00 00 21 00 00 00 00 00 ";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      //  The example displays the following output:
      //        '00 00 ' found at position 8.
      //        '00 00 00 ' found at position 23.
      //        '00 00 00 00 ' found at position 35.
   }

   private static void ShowLazyStar()
   {
       string pattern = @"\b\w*?oo\w*?\b";
       string input = "woof root root rob oof woo woe";
       foreach (Match match in Regex.Matches(input, pattern, RegexOptions.IgnoreCase))
          Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

       //  The example displays the following output:
      //        'woof' found at position 0.
      //        'root' found at position 5.
      //        'root' found at position 10.
      //        'oof' found at position 19.
      //        'woo' found at position 23.
   }

   private static void ShowLazyPlus()
   {
      string pattern = @"\b\w+?\b";
      string input = "Aa Bb Cc Dd Ee Ff";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      //  The example displays the following output:
      //        'Aa' found at position 0.
      //        'Bb' found at position 3.
      //        'Cc' found at position 6.
      //        'Dd' found at position 9.
      //        'Ee' found at position 12.
      //        'Ff' found at position 15.
   }

   private static void ShowLazyQuestion()
   {
      string pattern = @"^\s*(System.)??Console.Write(Line)??\(??";
      string input = "System.Console.WriteLine(\"Hello!\")\n" +
                            "Console.Write(\"Hello!\")\n" +
                            "Console.WriteLine(\"Hello!\")\n" +
                            "Console.ReadLine()\n" +
                            "   Console.WriteLine";
      foreach (Match match in Regex.Matches(input, pattern,
                                            RegexOptions.IgnorePatternWhitespace |
                                            RegexOptions.IgnoreCase |
                                            RegexOptions.Multiline))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      //  The example displays the following output:
      //        'System.Console.Write' found at position 0.
      //        'Console.Write' found at position 36.
      //        'Console.Write' found at position 61.
      //        '   Console.Write' found at position 110.
   }

   private static void ShowLazyN()
   {
      string pattern = @"\b(\w{3,}?\.){2}?\w{3,}?\b";
      string input = "www.microsoft.com msdn.microsoft.com mywebsite mycompany.com";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      //  The example displays the following output:
      //        'www.microsoft.com' found at position 0.
      //        'msdn.microsoft.com' found at position 18.
   }

   private static void ShowLazyNComma()
   {
   }

   private static void ShowLazyNM()
   {
      string pattern = @"\b[A-Z](\w*?\s*?){1,10}[.!?]";
      string input = "Hi. I am writing a short note. Its purpose is " +
                            "to test a regular expression that attempts to find " +
                            "sentences with ten or fewer words. Most sentences " +
                            "in this note are short.";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"'{match.Value}' found at position {match.Index}.");

      //  The example displays the following output:
      //        'Hi.' found at position 0.
      //        'I am writing a short note.' found at position 4.
      //        'Most sentences in this note are short.' found at position 132.
   }
}
```

 The regular expression pattern is defined as shown in the following table:

|Pattern|Description|
|-------------|-----------------|
|`\b`|Start at a word boundary.|
|`[A-Z]`|Matches an uppercase character from A to Z.|
|`(\w*?\s*?)`|Matches zero or more word characters, followed by one or more white-space characters but as few times as possible. This pattern is the first capturing group.|
|`{1,10}`|Matches the previous pattern between 1 and 10 times.|
|`[.!?]`|Matches any one of the punctuation characters `.`, `!`, or `?`.|

## Greedy and Lazy Quantifiers

 Some quantifiers have two versions:

- A greedy version.

    A greedy quantifier tries to match an element as many times as possible.

- A non-greedy (or lazy) version.

    A non-greedy quantifier tries to match an element as few times as possible. You can turn a greedy quantifier into a lazy quantifier by adding a `?`.

 Consider a regular expression that's intended to extract the last four digits from a string of numbers, such as a credit card number. The version of the regular expression that uses the `*` greedy quantifier is `\b.*([0-9]{4})\b`. However, if a string contains two numbers, this regular expression matches the last four digits of the second number only, as the following example shows:

 ```csharp
using System;
using System.Text.RegularExpressions;

[assembly: CLSCompliant(true)]
public class Class1
{
   public static void Main()
   {
      string greedyPattern = @"\b.*([0-9]{4})\b";
      string input1 = "1112223333 3992991999";
      foreach (Match match in Regex.Matches(input1, greedyPattern))
         Console.WriteLine($"Account ending in ******{match.Groups[1].Value}.");

      // The example displays the following output:
      //       Account ending in ******1999.
      Console.WriteLine();

      string lazyPattern = @"\b.*?([0-9]{4})\b";
      string input2 = "1112223333 3992991999";
      foreach (Match match in Regex.Matches(input2, lazyPattern))
         Console.WriteLine($"Account ending in ******{match.Groups[1].Value}.");

      // The example displays the following output:
      //       Account ending in ******3333.
      //       Account ending in ******1999.
   }
}
```

 The regular expression fails to match the first number because the `*` quantifier tries to match the previous element as many times as possible in the entire string, and so it finds its match at the end of the string.

 This behavior isn't the desired one. Instead, you can use the `*?` lazy quantifier to extract digits from both numbers, as the following example shows:

 ```csharp
using System;
using System.Text.RegularExpressions;

[assembly: CLSCompliant(true)]
public class Class1
{
   public static void Main()
   {
      string greedyPattern = @"\b.*([0-9]{4})\b";
      string input1 = "1112223333 3992991999";
      foreach (Match match in Regex.Matches(input1, greedyPattern))
         Console.WriteLine($"Account ending in ******{match.Groups[1].Value}.");

      // The example displays the following output:
      //       Account ending in ******1999.
      Console.WriteLine();

      string lazyPattern = @"\b.*?([0-9]{4})\b";
      string input2 = "1112223333 3992991999";
      foreach (Match match in Regex.Matches(input2, lazyPattern))
         Console.WriteLine($"Account ending in ******{match.Groups[1].Value}.");

      // The example displays the following output:
      //       Account ending in ******3333.
      //       Account ending in ******1999.
   }
}
```

 In most cases, regular expressions with greedy and lazy quantifiers return the same matches. They most commonly return different results when they're used with the wildcard (`.`) metacharacter, which matches any character.
