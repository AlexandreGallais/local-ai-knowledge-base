---
title: "Write your own extensions to LINQ (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/how-to-extend-linq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Write your own extensions to LINQ

All LINQ based methods follow one of two similar patterns. They take an enumerable sequence. They return either a different sequence or a single value. The consistency of the shape enables you to extend LINQ by writing methods with a similar shape. In fact, the .NET libraries gained new methods in many .NET releases since LINQ was first introduced. In this article, you see examples of extending LINQ by writing your own methods that follow the same pattern.
