---
title: "The Regular Expression Object Model (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/the-regular-expression-object-model.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The regular expression object model

This article describes the object model used in working with .NET regular expressions.

## The regular expression engine

 The regular expression engine in .NET is represented by the `System.Text.RegularExpressions.Regex` class. The regular expression engine is responsible for parsing and compiling a regular expression, and for performing operations that match the regular expression pattern with an input string. The engine is the central component in the .NET regular expression object model.

 You can use the regular expression engine in either of two ways:

- By calling the static methods of the `System.Text.RegularExpressions.Regex` class. The method parameters include the input string and the regular expression pattern. The regular expression engine caches regular expressions that are used in static method calls, so repeated calls to static regular expression methods that use the same regular expression offer relatively good performance.

- By instantiating a `System.Text.RegularExpressions.Regex` object, that is, by passing a regular expression to the class constructor. In this case, the `System.Text.RegularExpressions.Regex` object is immutable (read-only) and represents a regular expression engine that is tightly coupled with a single regular expression. Because regular expressions used by `System.Text.RegularExpressions.Regex` instances aren't cached, you shouldn't instantiate a `System.Text.RegularExpressions.Regex` object multiple times with the same regular expression.

 You can call the methods of the `System.Text.RegularExpressions.Regex` class to perform the following operations:

- Determine whether a string matches a regular expression pattern.
- Extract a single match or the first match.
- Extract all matches.
- Replace a matched substring.
- Split a single string into an array of strings.

 These operations are described in the following sections.

### Match a regular expression pattern

 The `System.Text.RegularExpressions.Regex.IsMatch*` method returns `true` if the string matches the pattern, or `false` if it does not. The `System.Text.RegularExpressions.Regex.IsMatch*` method is often used to validate string input. For example, the following code ensures that a string matches a valid social security number in the United States.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string[] values = { "111-22-3333", "111-2-3333"};
      string pattern = @"^\d{3}-\d{2}-\d{4}$";
      foreach (string value in values) {
         if (Regex.IsMatch(value, pattern))
            Console.WriteLine($"{value} is a valid SSN.");
         else
            Console.WriteLine($"{value}: Invalid");
      }
   }
}
// The example displays the following output:
//       111-22-3333 is a valid SSN.
//       111-2-3333: Invalid
```

 The regular expression pattern `^\d{3}-\d{2}-\d{4}$` is interpreted as shown in the following table.

| Pattern | Description                              |
|---------|------------------------------------------|
| `^`     | Match the beginning of the input string. |
| `\d{3}` | Match three decimal digits.              |
| `-`     | Match a hyphen.                          |
| `\d{2}` | Match two decimal digits.                |
| `-`     | Match a hyphen.                          |
| `\d{4}` | Match four decimal digits.               |
| `$`     | Match the end of the input string.       |

### Extract a single match or the first match

 The `System.Text.RegularExpressions.Regex.Match*` method returns a `System.Text.RegularExpressions.Match` object that contains information about the first substring that matches a regular expression pattern. If the `Match.Success` property returns `true`, indicating that a match was found, you can retrieve information about subsequent matches by calling the `System.Text.RegularExpressions.Match.NextMatch*` method. These method calls can continue until the `Match.Success` property returns `false`. For example, the following code uses the `System.Text.RegularExpressions.Regex.Match(System.String,System.String)` method to find the first occurrence of a duplicated word in a string. It then calls the `System.Text.RegularExpressions.Match.NextMatch*` method to find any additional occurrences. The example examines the `Match.Success` property after each method call to determine whether the current match was successful and whether a call to the `System.Text.RegularExpressions.Match.NextMatch*` method should follow.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string input = "This is a a farm that that raises dairy cattle.";
      string pattern = @"\b(\w+)\W+(\1)\b";
      Match match = Regex.Match(input, pattern);
      while (match.Success)
      {
         Console.WriteLine($"Duplicate '{match.Groups[1].Value}' found at position {match.Groups[2].Index}.");
         match = match.NextMatch();
      }
   }
}
// The example displays the following output:
//       Duplicate 'a' found at position 10.
//       Duplicate 'that' found at position 22.
```

 The regular expression pattern `\b(\w+)\W+(\1)\b` is interpreted as shown in the following table.

| Pattern | Description                                                           |
|---------|-----------------------------------------------------------------------|
| `\b`    | Begin the match on a word boundary.                                   |
| `(\w+)` | Match one or more word characters. This is the first capturing group. |
| `\W+`   | Match one or more non-word characters.                                |
| `(\1)`  | Match the first captured string. This is the second capturing group.  |
| `\b`    | End the match on a word boundary.                                     |

### Extract all matches

 The `System.Text.RegularExpressions.Regex.Matches*` method returns a `System.Text.RegularExpressions.MatchCollection` object that contains information about all matches that the regular expression engine found in the input string. For example, the previous example could be rewritten to call the `System.Text.RegularExpressions.Regex.Matches*` method instead of the `System.Text.RegularExpressions.Regex.Match*` and `System.Text.RegularExpressions.Match.NextMatch*` methods.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string input = "This is a a farm that that raises dairy cattle.";
      string pattern = @"\b(\w+)\W+(\1)\b";
      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine($"Duplicate '{match.Groups[1].Value}' found at position {match.Groups[2].Index}.");
   }
}
// The example displays the following output:
//       Duplicate 'a' found at position 10.
//       Duplicate 'that' found at position 22.
```

### Replace a matched substring

 The `System.Text.RegularExpressions.Regex.Replace*` method replaces each substring that matches the regular expression pattern with a specified string or regular expression pattern, and returns the entire input string with replacements. For example, the following code adds a U.S. currency symbol before a decimal number in a string.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b\d+\.\d{2}\b";
      string replacement = "$$$&";
      string input = "Total Cost: 103.64";
      Console.WriteLine(Regex.Replace(input, pattern, replacement));
   }
}
// The example displays the following output:
//       Total Cost: $103.64
```

 The regular expression pattern `\b\d+\.\d{2}\b` is interpreted as shown in the following table.

| Pattern | Description                         |
|---------|-------------------------------------|
| `\b`    | Begin the match at a word boundary. |
| `\d+`   | Match one or more decimal digits.   |
| `\.`    | Match a period.                     |
| `\d{2}` | Match two decimal digits.           |
| `\b`    | End the match at a word boundary.   |

 The replacement pattern `$$$&` is interpreted as shown in the following table.

| Pattern | Replacement string             |
|---------|--------------------------------|
| `$$`    | The dollar sign ($) character. |
| `$&`    | The entire matched substring.  |

### Split a single string into an array of strings

 The `System.Text.RegularExpressions.Regex.Split*` method splits the input string at the positions defined by a regular expression match. For example, the following code places the items in a numbered list into a string array.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string input = "1. Eggs 2. Bread 3. Milk 4. Coffee 5. Tea";
      string pattern = @"\b\d{1,2}\.\s";
      foreach (string item in Regex.Split(input, pattern))
      {
         if (!String.IsNullOrEmpty(item))
            Console.WriteLine(item);
      }
   }
}
// The example displays the following output:
//       Eggs
//       Bread
//       Milk
//       Coffee
//       Tea
```

 The regular expression pattern `\b\d{1,2}\.\s` is interpreted as shown in the following table.

| Pattern   | Description                         |
|-----------|-------------------------------------|
| `\b`      | Begin the match at a word boundary. |
| `\d{1,2}` | Match one or two decimal digits.    |
| `\.`      | Match a period.                     |
| `\s`      | Match a white-space character.      |
