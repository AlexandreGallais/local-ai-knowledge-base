---
title: "Deconstructing tuples and other types (part 1 of 8)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/patterns/deconstruct.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Deconstruct tuples and other types

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. Start with the pattern matching overview if patterns are new to you.

A *deconstruction* assigns the individual parts of a value — its *components* — to multiple variables in a single operation. A tuple's components are its elements, exposed by position. Another type can expose components by defining a `Deconstruct` method. Positional records, which declare their properties as constructor-like parameters, get a `Deconstruct` method automatically.
