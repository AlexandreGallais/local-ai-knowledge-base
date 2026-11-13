---
title: "bool type"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/bool.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# bool (C# reference)

The `bool` type keyword is an alias for the .NET `System.Boolean` structure type that represents a Boolean value, which can be either `true` or `false`.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

To perform logical operations with values of the `bool` type, use Boolean logical operators. The `bool` type is the result type of comparison and equality operators. A `bool` expression can be a controlling conditional expression in the if, do, while, and for statements and in the conditional operator `?:`.

The default value of the `bool` type is `false`.

## Literals

Use the `true` and `false` literals to initialize a `bool` variable or to pass a `bool` value:

```csharp
﻿namespace builtin_types;

public static class BoolType
{
    public static void Examples()
    {
        Literals();
    }

    private static void Literals()
    {
        bool check = true;
        Console.WriteLine(check ? "Checked" : "Not checked");  // output: Checked

        Console.WriteLine(false ? "Checked" : "Not checked");  // output: Not checked
    }
}
```
## Three-valued Boolean logic

Use the nullable `bool?` type if you need to support three-valued logic. For example, use it when you work with databases that support a three-valued Boolean type. For the `bool?` operands, the predefined `&` and `|` operators support the three-valued logic. For more information, see the Nullable Boolean logical operators section of the Boolean logical operators article.

For more information about nullable value types, see Nullable value types.

## Conversions

C# provides only two conversions that involve the `bool` type. Those conversions are an implicit conversion to the corresponding nullable `bool?` type and an explicit conversion from the `bool?` type. However, .NET provides additional methods that you can use to convert to or from the `bool` type. For more information, see the Converting to and from Boolean values section of the `System.Boolean` API reference page.

## C# language specification

For more information, see The bool type section of the C# language specification.

## See also

- Value types
- true and false operators
