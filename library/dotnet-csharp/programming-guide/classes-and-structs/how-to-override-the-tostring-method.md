---
title: "How to override the ToString method (part 1 of 7)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/how-to-override-the-tostring-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to override the ToString method (C# Programming Guide)

Every class or struct in C# implicitly inherits the `System.Object` class. Therefore, every object in C# gets the `System.Object.ToString*` method, which returns a string representation of that object. For example, all variables of type `int` have a `ToString` method, which enables them to return their contents as a string:
