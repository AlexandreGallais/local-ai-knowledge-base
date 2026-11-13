---
title: "Identifier names - rules and conventions (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/coding-style/identifier-names.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# identifier naming rules and conventions

An **identifier** is the name you assign to a type (class, interface, struct, delegate, or enum), member, variable, or namespace.

This article covers the essential rules for valid C# identifiers and the naming conventions used to help you write consistent, professional code.

## Naming rules

Valid identifiers must follow these rules. The C# compiler produces an error for any identifier that doesn't follow these rules:

- Identifiers must start with a letter or underscore (`_`).
- Identifiers can contain Unicode letter characters, decimal digit characters, Unicode connecting characters, Unicode combining characters, or Unicode formatting characters. For more information on Unicode categories, see the Unicode Category Database.

You can declare identifiers that match C# keywords by using the `@` prefix on the identifier. The `@` isn't part of the identifier name. For example, `@if` declares an identifier named `if`. These verbatim identifiers are primarily for interoperability with identifiers declared in other languages.

For a complete definition of valid identifiers, see the Identifiers article in the C# Language Specification.

> **Important:**
> The C# language specification only allows letter (Lu, Ll, Lt, Lm, or Nl), digit (Nd), connecting (Pc), combining (Mn or Mc), and formatting (Cf) categories. Anything outside that is automatically replaced using `_`. This might impact certain Unicode characters.
