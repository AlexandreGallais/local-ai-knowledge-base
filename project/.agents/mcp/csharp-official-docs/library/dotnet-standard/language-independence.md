---
title: "Language independence and language-independent components (part 1 of 8)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/language-independence.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Language independence and language-independent components

.NET is language independent. This means that, as a developer, you can develop in one of the many languages that target .NET implementations, such as C#, F#, and Visual Basic. You can access the types and members of class libraries developed for .NET implementations without having to know the language in which they were originally written and without having to follow any of the original language's conventions. If you're a component developer, your component can be accessed by any .NET app, regardless of its language.

> **Note:**
> This first part of this article discusses creating language-independent components, that is, components that can be consumed by apps that are written in any language. You can also create a single component or app from source code written in multiple languages; see Cross-Language Interoperability in the second part of this article.

To fully interact with other objects written in any language, objects must expose to callers only those features that are common to all languages. This common set of features is defined by the *Common Language Specification* (CLS), which is a set of rules that apply to generated assemblies. The Common Language Specification is defined in Partition I, Clauses 7 through 11 of the ECMA-335 Standard: Common Language Infrastructure.

If your component conforms to the Common Language Specification, it is guaranteed to be CLS-compliant and can be accessed from code in assemblies written in any programming language that supports the CLS. You can determine whether your component conforms to the Common Language Specification at compile time by applying the CLSCompliantAttribute attribute to your source code. For more information, see The CLSCompliantAttribute attribute.
