---
title: "static modifier (part 1 of 13)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/static.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# static (C# Reference)

This article covers the `static` modifier keyword. The `static` keyword is also part of the `using static` directive.

Use the `static` modifier to declare a static member, which belongs to the type itself rather than to a specific object. Use the `static` modifier to declare `static` classes. In classes, interfaces, and structs, you can add the `static` modifier to fields, methods, properties, operators, events, and constructors. You can't use the `static` modifier with indexers or finalizers. For more information, see Static Classes and Static Class Members.

You can add the `static` modifier to a local function. A static local function can't capture local variables or instance state.
