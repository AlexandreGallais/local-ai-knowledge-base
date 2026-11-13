---
title: "// and /* */ - comments"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/tokens/comments.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Code comments - `//` and `/*` - `*/`

C# supports two different forms of comments. Single line comments start with `//` and end at the end of that line of code. Multiline comments start with `/*` and end with `*/`.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following code shows an example of each form:

```csharp
// This is a single line comment.

/* This could be a summary of all the
   code that's in this class.
   You might add multiple paragraphs, or links to pages
   like https://learn.microsoft.com/dotnet/csharp.
   
   You could even include emojis. This example is 🔥
   Then, when you're done, close with
   */
```
You can use a multiline comment to insert text in a line of code. Because these comments have an explicit closing character, you can include more executable code after the comment:

```csharp
public static int Add(int left, int right)
{
    return left /* first operand */ + right /* second operand */;
}
```
A single line comment can appear after executable code on the same line. The comment ends at the end of the text line:

```csharp
return source++; // increment the source.
```
Some comments start with three slashes: `///`. *Triple-slash comments* are *XML documentation comments*. The compiler reads these comments to produce human documentation. You can read more about XML doc comments in the section on triple-slash comments.
