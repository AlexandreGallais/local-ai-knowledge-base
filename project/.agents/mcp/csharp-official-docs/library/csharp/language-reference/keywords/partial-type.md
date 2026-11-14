---
title: "Partial type"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/partial-type.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Partial type (C# Reference)

Partial type definitions allow you to split the definition of a class, struct, interface, or record into multiple definitions. You can put these multiple definitions in different files within the same project. One type declaration contains only the signatures for partial members:

```csharp
partial class A
{
    int num = 0;
    void MethodA() { }
    partial void MethodC();
}
```
The other declaration contains the implementation of the partial members:

```csharp
partial class A
{
    void MethodB() { }
    partial void MethodC() { }
}
```
The declarations for a partial type can appear in either the same or multiple files. Typically, the two declarations are in different files. You split a class, struct, or interface type when you're working with large projects, with automatically generated code such as that provided by the Windows Forms Designer, or Source generators like RegEx. A partial type can contain partial members.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Starting with C# 13, you can define partial properties and partial indexers. Starting with C# 14, you can define partial instance constructors and partial events. Before C# 13, only methods could be defined as partial members.

You can provide documentation comments on either the declaring declaration or the implementing declaration. When you apply documentation comments to both type declarations, the XML elements from each declaration are included in the output XML. For the rules on partial member declarations, see the article on partial members.

You can apply attributes to either declaration. The compiler combines all attributes from both declarations, including duplicates.

For more information, see Partial Classes and Methods.

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- Modifiers
- Introduction to Generics
