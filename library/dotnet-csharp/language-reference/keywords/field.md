---
title: "The `field` contextual keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/field.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# `field` - Field backed property declarations

Use the contextual keyword `field`, introduced in C# 14, in a property accessor to access the compiler-synthesized backing field of a property. By using this syntax, you can define the body of a `get` or `set` accessor and let the compiler generate the other accessor as it would in an automatically implemented property.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The addition of the `field` contextual keyword provides a smooth path to add benefits such as range checking to an automatically implemented property. This practice is shown in the following example:

```csharp
class TimePeriod4
{
    public double Hours {
        get;
        set => field = (value >= 0)
            ? value
            : throw new ArgumentOutOfRangeException(nameof(value), "The value must not be negative");
    }
}
```
You might implement the `Hours` property as an automatically implemented property. Then, you discover that you want to protect against a negative value. Use `field` and provide range checking in the `set` accessor. You don't need to declare the backing field by hand or provide a body for the `get` accessor.

For more information, see the Properties and Indexers articles.

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.
