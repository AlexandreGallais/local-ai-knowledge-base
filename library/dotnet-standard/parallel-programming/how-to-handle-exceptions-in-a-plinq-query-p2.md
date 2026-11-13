---
title: "How to: Handle Exceptions in a PLINQ Query (part 2 of 9)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-handle-exceptions-in-a-plinq-query.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Handle Exceptions in a PLINQ Query (part 2 of 9)

## Example 1

This example shows how to put the try-catch blocks around the code that executes the query to catch any `System.AggregateException`s that are thrown.
