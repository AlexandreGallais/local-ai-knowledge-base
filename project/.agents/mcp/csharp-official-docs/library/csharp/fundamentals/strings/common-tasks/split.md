---
title: "Split strings into substrings in C#"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/strings/common-tasks/split.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Split strings into substrings in C\#

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the Get started tutorials first.
>
> **Coming from another language?** `string.Split` is C#'s counterpart to Java's `String.split` and JavaScript's `String.prototype.split`. Unlike those languages, C# returns an array (`string[]`), not a list, and the separator argument is a character or string, not a regular expression. For pattern-based splitting, see `System.Text.RegularExpressions.Regex.Split*`.

The `System.String.Split*` method breaks a string into an array of substrings using one or more separators. It's the simplest way to parse delimited text such as words, CSV-style values, or protocol tokens.

The method has many overloads, but they cover four independent decisions:

- **Separators**: one `char`, an array of `char`, one `string`, or an array of `string`.
- **Maximum result count**: cap the number of substrings returned.
- **Empty-entry handling**: keep empty substrings (the default) or drop them with `System.StringSplitOptions.RemoveEmptyEntries`.
- **Whitespace handling**: trim leading and trailing whitespace from each entry with `System.StringSplitOptions.TrimEntries`.

## Split a string into words

To split a phrase on whitespace, pass `' '` as the separator:

```csharp
string phrase = "The quick brown fox jumps over the lazy dog.";
string[] words = phrase.Split(' ');

foreach (var word in words)
{
    Console.WriteLine($"<{word}>");
}
// => <The>
// => <quick>
// => <brown>
// => <fox>
// => <jumps>
// => <over>
// => <the>
// => <lazy>
// => <dog.>
```
Iterate the returned array with `for` to recover the position of each word:

```csharp
string phrase = "The quick brown fox jumps over the lazy dog.";
string[] words = phrase.Split(' ');

for (int i = 0; i < words.Length; i++)
{
    Console.WriteLine($"Index {i}: <{words[i]}>");
}
// => Index 0: <The>
// => Index 1: <quick>
// => Index 2: <brown>
// => ...
```
If the input contains repeated instances of the separator character, `Split` produces empty entries, one for each "gap" between consecutive separators:

```csharp
string phrase = "The quick brown    fox     jumps over the lazy dog.";
string[] words = phrase.Split(' ');

foreach (var word in words)
{
    Console.WriteLine($"<{word}>");
}
// The runs of spaces produce empty entries:
// => <The>
// => <quick>
// => <brown>
// => <>
// => <>
// => <>
// => <fox>
// => ...
```
Pass `StringSplitOptions.RemoveEmptyEntries` to drop those empty entries, as shown later in this article.

## Split on multiple separator characters

When more than one character can act as a separator, pass them as an array. The following example treats spaces, commas, periods, colons, and tabs all as word boundaries:

```csharp
char[] delimiters = [' ', ',', '.', ':', '\t'];

string text = "one\ttwo three:four,five six seven";
Console.WriteLine($"Original text: '{text}'");

string[] words = text.Split(delimiters);
Console.WriteLine($"{words.Length} words in text:");

foreach (var word in words)
{
    Console.WriteLine($"<{word}>");
}
// => 7 words in text:
// => <one>
// => <two>
// => <three>
// => <four>
// => <five>
// => <six>
// => <seven>
```
Adjacent separators still produce empty entries:

```csharp
char[] delimiters = [' ', ',', '.', ':', '\t'];

string text = "one\ttwo :,five six seven";
Console.WriteLine($"Original text: '{text}'");

string[] words = text.Split(delimiters);
Console.WriteLine($"{words.Length} words in text:");

foreach (var word in words)
{
    Console.WriteLine($"<{word}>");
}
// => 7 words in text:
// => <one>
// => <two>
// => <>
// => <>
// => <five>
// => <six>
// => <seven>
```
## Split on multicharacter separators

To split on whole-word or multicharacter separators, pass an array of strings. The string-array overloads require a `System.StringSplitOptions` value. Use `RemoveEmptyEntries` when repeated separators would otherwise produce empty results:

```csharp
string[] separators = ["<<", "..."];

string text = "one<<two......three<four";
Console.WriteLine($"Original text: '{text}'");

string[] words = text.Split(separators, StringSplitOptions.RemoveEmptyEntries);
Console.WriteLine($"{words.Length} substrings in text:");

foreach (var word in words)
{
    Console.WriteLine(word);
}
// => 3 substrings in text:
// => one
// => two
// => three<four
```
## Limit how many substrings you get back

Pass a `count` argument to cap the number of results. The final entry holds everything that's left, including any remaining separators:

```csharp
string phrase = "The quick brown fox jumps over the lazy dog.";
string[] words = phrase.Split(' ', 4, StringSplitOptions.None);

foreach (var word in words)
{
    Console.WriteLine($"<{word}>");
}
// => <The>
// => <quick>
// => <brown>
// => <fox jumps over the lazy dog.>
```
This pattern is handy for `key=value` pairs and other formats where only the first separator is meaningful.

## Trim whitespace from each entry

`StringSplitOptions.TrimEntries` strips leading and trailing whitespace from every returned substring. You can combine it with `RemoveEmptyEntries` for typical CSV-style cleanup:

```csharp
string numerals = "1, 2, 3, 4, 5, 6, 7, 8, 9, 10";
string[] trimmed = numerals.Split(',', StringSplitOptions.TrimEntries);

Console.WriteLine("Trimmed entries:");
foreach (var word in trimmed)
{
    Console.WriteLine($"<{word}>");
}

string[] untrimmed = numerals.Split(',', StringSplitOptions.None);
Console.WriteLine("Untrimmed entries:");
foreach (var word in untrimmed)
{
    Console.WriteLine($"<{word}>");
}
// => Trimmed entries: <1> <2> ... <10>
// => Untrimmed entries: <1> < 2> ... < 10>
```
## Use regular expressions

`Split` works well for fixed character or string delimiters. For pattern-based splitting, use `System.Text.RegularExpressions.Regex.Split*`. For an introduction to regular expressions on strings, see String operations.

## See also

- `System.String.Split*`
- `System.StringSplitOptions`
- String operations: pattern matching, performance, and span-based search
- Extract elements from a string
