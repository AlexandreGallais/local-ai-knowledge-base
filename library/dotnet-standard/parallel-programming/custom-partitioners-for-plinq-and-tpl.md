---
title: "Custom Partitioners for PLINQ and TPL (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/custom-partitioners-for-plinq-and-tpl.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom Partitioners for PLINQ and TPL

To parallelize an operation on a data source, one of the essential steps is to *partition* the source into multiple sections that can be accessed concurrently by multiple threads. PLINQ and the Task Parallel Library (TPL) provide default partitioners that work transparently when you write a parallel query or `System.Threading.Tasks.Parallel.ForEach*` loop. For more advanced scenarios, you can plug in your own partitioner.
