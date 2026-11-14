---
title: "Potential pitfalls with PLINQ (part 2 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/potential-pitfalls-with-plinq.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Potential pitfalls with PLINQ (part 2 of 5)

## Avoid over-parallelization

By using the `AsParallel` method, you incur the overhead costs of partitioning the source collection and synchronizing the worker threads. The benefits of parallelization are further limited by the number of processors on the computer. There is no speedup to be gained by running multiple compute-bound threads on just one processor. Therefore, you must be careful not to over-parallelize a query.

The most common scenario in which over-parallelization can occur is in nested queries, as shown in the following snippet.
