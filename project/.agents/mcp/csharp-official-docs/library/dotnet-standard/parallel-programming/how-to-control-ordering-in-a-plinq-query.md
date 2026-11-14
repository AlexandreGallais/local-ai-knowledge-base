---
title: "How to: Control Ordering in a PLINQ Query (part 1 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-control-ordering-in-a-plinq-query.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Control Ordering in a PLINQ Query

These examples show how to control the ordering in a PLINQ query by using the `System.Linq.ParallelEnumerable.AsOrdered*` extension method.

> **Warning:**
> These examples are primarily intended to demonstrate usage, and may or may not run faster than the equivalent sequential LINQ to Objects queries.
