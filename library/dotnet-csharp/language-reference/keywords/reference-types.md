---
title: "Reference types"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/reference-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Reference types (C# reference)

C# has two kinds of types: reference types and value types. Variables of reference types store references to their data (objects), while variables of value types directly contain their data. With reference types, two variables can reference the same object. Therefore, operations on one variable can affect the object referenced by the other variable. With value types, each variable has its own copy of the data. Operations on one variable can't affect the other variable, except in the case of `in`, `ref`, and `out` parameter variables. For more information, see in, ref, and out parameter modifier.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

 Use the following keywords to declare reference types:

- class
- interface
- delegate
- record

 C# also provides the following built-in reference types:

- dynamic
- object
- string

## See also

- C# keywords
- Pointer types
- Value types
