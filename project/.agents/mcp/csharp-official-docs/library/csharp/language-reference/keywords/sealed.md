---
title: "sealed modifier (part 1 of 5)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/sealed.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# sealed (C# Reference)

When you apply the `sealed` modifier to a class, it prevents other classes from inheriting from that class. In the following example, class `B` inherits from class `A`, but no class can inherit from class `B`.

```csharp
class A {}
sealed class B : A {}
```

You can also use the `sealed` modifier on a method or property that overrides a virtual method or property in a base class. By using this approach, you enable developers to derive classes from your class while preventing them from overriding specific virtual methods or properties.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

In the following example, `Z` inherits from `Y` but `Z` can't override the virtual function `F` that is declared in `X` and sealed in `Y`.
