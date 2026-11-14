---
title: "How to: Combine Parallel and Sequential LINQ Queries (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-combine-parallel-and-sequential-linq-queries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Combine Parallel and Sequential LINQ Queries

This example shows how to use the `System.Linq.ParallelEnumerable.AsSequential*` method to instruct PLINQ to process all subsequent operators in the query sequentially. Although sequential processing is often slower than parallel, sometimes it's necessary to produce correct results.

> **Note:**
> This example is intended to demonstrate usage and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see Understanding Speedup in PLINQ.
