---
title: "virtual keyword (part 1 of 6)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/virtual.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# virtual (C# Reference)

Use the `virtual` keyword to modify a method, property, indexer, or event declaration and allow a derived class to override it.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

For example, any class that inherits this method can override it:

```csharp
public virtual double Area()
{
    return x * y;
}
```

An overriding member in a derived class can change the implementation of a virtual member. For more information about how to use the `virtual` keyword, see Versioning with the Override and New Keywords and Knowing When to Use Override and New Keywords.

When you invoke a virtual method, the runtime checks the type of the object for an overriding member. It calls the overriding member in the most derived class. If no derived class overrides the member, the original member is called.

By default, methods are non-virtual. You can't override a non-virtual method.

The following example shows a virtual property:
