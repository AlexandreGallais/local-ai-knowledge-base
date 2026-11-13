---
title: "raw-string-parsing"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/includes/raw-string-parsing.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# raw-string-parsing

> **Tip:**
> Visual Studio and the C# Dev Kit provide some validation and syntax highlighting when raw string literals contain JSON data or regular expressions.
>
> The tools parse the text. If the tools have confidence that the text represents JSON or a regular expression, the editor provides syntax coloring.
>
> You can improve that experience by adding a comment above the declaration indicating the format:
>
> - `// lang=json` indicates the raw string literal represents JSON data.
> - `// lang=regex` indicates the raw string literal represents a regular expression.
>
> When a raw string literal is used as an argument where the parameter uses the `System.Diagnostics.CodeAnalysis.StringSyntaxAttribute` to indicate a format, these tools validate the raw string literal for some of the format types. Both JSON and regex are supported.
>
> For some formats, the comment or the attribute enables code suggestions offer fixes for string literals based on the format.
