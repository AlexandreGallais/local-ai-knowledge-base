---
title: "void"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/void.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# void (C# reference)

Use `void` as the return type of a method or a local function to specify that the method doesn't return a value.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

```csharp
﻿namespace builtin_types;

public static class VoidType
{
    public static void Examples()
    {
        Display([1, 2, 9]);
    }

    public static void Display(IEnumerable<int> numbers)
    {
        if (numbers is null)
        {
            return;
        }

        Console.WriteLine(string.Join(" ", numbers));
    }
}
```
You can also use `void` as a referent type to declare a pointer to an unknown type. For more information, see Pointer types.

You can't use `void` as the type of a variable.

## See also

- `System.Void`
