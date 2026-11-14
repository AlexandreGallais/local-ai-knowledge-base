---
title: "Merge Options in PLINQ (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/merge-options-in-plinq.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Merge Options in PLINQ

When a query is executing as parallel, PLINQ partitions the source sequence so that multiple threads can work on different parts concurrently, typically on separate threads. If the results are to be consumed on one thread, for example, in a `foreach` (`For Each` in Visual Basic) loop, then the results from every thread must be merged back into one sequence. The kind of merge that PLINQ performs depends on the operators that are present in the query. For example, operators that impose a new order on the results must buffer all elements from all threads. From the perspective of the consuming thread (which is also that of the application user) a fully buffered query might run for a noticeable period of time before it produces its first result. Other operators, by default, are partially buffered; they yield their results in batches. One operator, `System.Linq.ParallelEnumerable.ForAll*` is not buffered by default. It yields all elements from all threads immediately.

 By using the `System.Linq.ParallelEnumerable.WithMergeOptions*` method, as shown in the following example, you can provide a hint to PLINQ that indicates what kind of merging to perform.
