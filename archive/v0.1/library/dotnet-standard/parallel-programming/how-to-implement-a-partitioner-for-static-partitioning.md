---
title: "How to: Implement a Partitioner for Static Partitioning (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-implement-a-partitioner-for-static-partitioning.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Partitioner for Static Partitioning

The following example shows one way to implement a simple custom partitioner for PLINQ that performs static partitioning. Because the partitioner does not support dynamic partitions, it is not consumable from `System.Threading.Tasks.Parallel.ForEach*`. This particular partitioner might provide speedup over the default range partitioner for data sources for which each element requires an increasing amount of processing time.
