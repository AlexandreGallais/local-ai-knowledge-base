---
title: "How to: Specify Merge Options in PLINQ (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-specify-merge-options-in-plinq.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Specify Merge Options in PLINQ

This example shows how to specify the merge options that will apply to all subsequent operators in a PLINQ query. You do not have to set merge options explicitly, but doing so may improve performance. For more information about merge options, see Merge Options in PLINQ.

> **Warning:**
> This example is intended to demonstrate usage, and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see Understanding Speedup in PLINQ.
