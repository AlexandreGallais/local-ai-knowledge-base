---
title: "Deconstructing tuples and other types (part 1 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/patterns/deconstruct.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Deconstruct tuples and other types

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. Start with the pattern matching overview if patterns are new to you.

A *deconstruction* assigns the individual parts of a value — its *components* — to multiple variables in a single operation. A tuple's components are its elements, exposed by position. Another type can expose components by defining a `Deconstruct` method. Positional records, which declare their properties as constructor-like parameters, get a `Deconstruct` method automatically.
