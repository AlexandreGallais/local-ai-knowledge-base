---
title: "How to: Write a Custom PLINQ Aggregate Function (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-write-a-custom-plinq-aggregate-function.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Write a Custom PLINQ Aggregate Function

This example shows how to use the `System.Linq.ParallelEnumerable.Aggregate*` method to apply a custom aggregation function to a source sequence.

> **Warning:**
> This example is intended to demonstrate usage, and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see Understanding Speedup in PLINQ.
