---
title: "How to: Combine Parallel and Sequential LINQ Queries (part 2 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-combine-parallel-and-sequential-linq-queries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Combine Parallel and Sequential LINQ Queries (part 2 of 5)

## Example

 The following example shows one scenario in which `System.Linq.ParallelEnumerable.AsSequential*` is required, namely to preserve the ordering that was established in a previous clause of the query.
