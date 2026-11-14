---
title: "How to: Combine Parallel and Sequential LINQ Queries (part 2 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-combine-parallel-and-sequential-linq-queries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Combine Parallel and Sequential LINQ Queries (part 2 of 5)

## Example

 The following example shows one scenario in which `System.Linq.ParallelEnumerable.AsSequential*` is required, namely to preserve the ordering that was established in a previous clause of the query.
