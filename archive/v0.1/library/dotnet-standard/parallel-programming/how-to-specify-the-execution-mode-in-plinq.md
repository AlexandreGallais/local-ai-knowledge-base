---
title: "How to: Specify the Execution Mode in PLINQ (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-specify-the-execution-mode-in-plinq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Specify the Execution Mode in PLINQ

This example shows how to force PLINQ to bypass its default heuristics and parallelize a query regardless of the query's shape.

> **Note:**
> This example is intended to demonstrate usage and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see Understanding Speedup in PLINQ.
