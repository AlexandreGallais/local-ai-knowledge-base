---
title: "How to: Implement a Partitioner for Static Partitioning (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-implement-a-partitioner-for-static-partitioning.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Partitioner for Static Partitioning

The following example shows one way to implement a simple custom partitioner for PLINQ that performs static partitioning. Because the partitioner does not support dynamic partitions, it is not consumable from `System.Threading.Tasks.Parallel.ForEach*`. This particular partitioner might provide speedup over the default range partitioner for data sources for which each element requires an increasing amount of processing time.
