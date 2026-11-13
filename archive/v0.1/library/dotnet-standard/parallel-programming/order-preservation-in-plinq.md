---
title: "Order Preservation in PLINQ (part 1 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/order-preservation-in-plinq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Order Preservation in PLINQ

In PLINQ, the goal is to maximize performance while maintaining correctness. A query should run as fast as possible but still produce the correct results. In some cases, correctness requires the order of the source sequence to be preserved; however, ordering can be computationally expensive. Therefore, by default, PLINQ does not preserve the order of the source sequence. In this regard, PLINQ resembles LINQ to SQL, but is unlike LINQ to Objects, which does preserve ordering.

 To override the default behavior, you can turn on order-preservation by using the `System.Linq.ParallelEnumerable.AsOrdered*` operator on the source sequence. You can then turn off order preservation later in the query by using the `System.Linq.ParallelEnumerable.AsUnordered*` method. With both methods, the query is processed based on the heuristics that determine whether to execute the query as parallel or as sequential. For more information, see Understanding Speedup in PLINQ.

 The following example shows an unordered parallel query that filters for all the elements that match a condition, without trying to order the results in any way.
