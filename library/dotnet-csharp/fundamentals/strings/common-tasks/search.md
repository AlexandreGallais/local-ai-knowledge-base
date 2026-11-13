---
title: "Search strings in C#"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/strings/common-tasks/search.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Search strings in C\#

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the Get started tutorials first.
>
> **Coming from another language?** C# `string` methods such as `Contains`, `StartsWith`, and `IndexOf` parallel methods in Java's `String` and JavaScript's `String.prototype`. The key difference is that some C# searches default to **ordinal, case-sensitive** comparison. Others default to the current culture's semantics. For user-facing searches, you might want to pass a `System.StringComparison` value.

The `System.String` class includes methods that answer two everyday questions:

- *Does this string contain that text?* — use `System.String.Contains*`, `System.String.StartsWith*`, or `System.String.EndsWith*`.
- *Where does that text occur?* — use `System.String.IndexOf*` or `System.String.LastIndexOf*`.

More complex search and replacement algorithms can be built using regular expressions. For more information on regular expressions and other string operations, see the language reference article on String operations.

## Check whether a string contains text

Use `Contains`, `StartsWith`, or `EndsWith` to test for the presence of a substring:

```csharp
string factMessage = "Extension methods have all the capabilities of regular static methods.";

// Write the string and include the quotation marks.
Console.WriteLine($"\"{factMessage}\"");

// Default comparisons are case sensitive.
bool containsSearchResult = factMessage.Contains("extension");
Console.WriteLine($"""Contains "extension"? {containsSearchResult}""");

// For user-facing searches, pass a StringComparison value to control case and culture.
bool ignoreCaseSearchResult = factMessage.StartsWith("extension", StringComparison.CurrentCultureIgnoreCase);
Console.WriteLine($"""Starts with "extension"? {ignoreCaseSearchResult} (ignoring case)""");

bool endsWithSearchResult = factMessage.EndsWith(".", StringComparison.Ordinal);
Console.WriteLine($"Ends with '.'? {endsWithSearchResult}");
// => "Extension methods have all the capabilities of regular static methods."
// => Contains "extension"? False
// => Starts with "extension"? True (ignoring case)
// => Ends with '.'? True
```
These methods default to **case-sensitive, ordinal** comparison. To accept user input or to ignore case for display text, pass a `System.StringComparison` value such as `System.StringComparison.CurrentCultureIgnoreCase` or `System.StringComparison.OrdinalIgnoreCase`.

When you search for a single character, use the `char` overload of `Contains`. It avoids allocating a one-character string and is more direct:

```csharp
string path = "/usr/local/bin";
bool hasSlash = path.Contains('/');
Console.WriteLine($"Path contains '/': {hasSlash}");
// => Path contains '/': True
```
## Locate the position of text

`IndexOf` returns the zero-based index of the first occurrence of a substring (or character), and `LastIndexOf` returns the index of the last occurrence. Both return `-1` when the search text isn't present. Combine them to extract the text between two markers:

```csharp
string factMessage = "Extension methods have all the capabilities of regular static methods.";

Console.WriteLine($"\"{factMessage}\"");

// Extract the text between the first and last occurrence of "methods".
int first = factMessage.IndexOf("methods") + "methods".Length;
int last = factMessage.LastIndexOf("methods");
string between = factMessage.Substring(first, last - first);
Console.WriteLine($"""Substring between "methods" and "methods": '{between}'""");
// => "Extension methods have all the capabilities of regular static methods."
// => Substring between "methods" and "methods": ' have all the capabilities of regular static '
```
When you need every occurrence rather than the first or last, iterate by passing the previous result plus one as the `startIndex` argument, or switch to a regular expression.

## Choose the right comparison

Most search overloads accept an optional `System.StringComparison` value. Pick it based on the kind of data you're searching:

- If you're searching identifiers, file paths, protocol tokens, or anything else machine-defined, use `System.StringComparison.Ordinal`.
- If you're searching the same kind of machine-defined data but want case insensitivity, use `System.StringComparison.OrdinalIgnoreCase`.
- If you're searching user-visible text where the current locale's rules should apply, use `System.StringComparison.CurrentCulture`.
- If you're searching that same user-visible text and want to ignore case, use `System.StringComparison.CurrentCultureIgnoreCase`.
- If you're searching persisted data that must compare the same on every machine and culture, use `System.StringComparison.InvariantCulture` (rarely needed).

Ordinal comparison is the fastest option and the right default for anything that isn't natural-language text. Culture-aware comparison is significantly slower and can produce surprising results. For example, in some cultures the lowercase `i` doesn't match an uppercase `I`.Reserve it for searches that users perform against prose.

For an in-depth treatment of culture-aware comparison, see Best practices for comparing strings.

## See also

- String operations: pattern matching, performance, and span-based search
- Best practices for comparing strings in .NET
- Comparing strings
- `System.String`
- `System.StringComparison`
