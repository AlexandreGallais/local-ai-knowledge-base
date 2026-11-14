---
title: "How to: Handle Exceptions in a PLINQ Query (part 2 of 9)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-handle-exceptions-in-a-plinq-query.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Handle Exceptions in a PLINQ Query (part 2 of 9)

## Example 1

This example shows how to put the try-catch blocks around the code that executes the query to catch any `System.AggregateException`s that are thrown.
