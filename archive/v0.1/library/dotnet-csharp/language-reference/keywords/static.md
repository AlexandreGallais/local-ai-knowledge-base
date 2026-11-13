---
title: "static modifier (part 1 of 13)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/static.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# static (C# Reference)

This article covers the `static` modifier keyword. The `static` keyword is also part of the `using static` directive.

Use the `static` modifier to declare a static member, which belongs to the type itself rather than to a specific object. Use the `static` modifier to declare `static` classes. In classes, interfaces, and structs, you can add the `static` modifier to fields, methods, properties, operators, events, and constructors. You can't use the `static` modifier with indexers or finalizers. For more information, see Static Classes and Static Class Members.

You can add the `static` modifier to a local function. A static local function can't capture local variables or instance state.
