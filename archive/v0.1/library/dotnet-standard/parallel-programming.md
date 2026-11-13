---
title: "Parallel Programming in .NET: A guide to the documentation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Parallel programming in .NET: A guide to the documentation

Many personal computers and workstations have multiple CPU cores that enable multiple threads to be executed simultaneously. To take advantage of the hardware, you can parallelize your code to distribute work across multiple processors.

In the past, parallelization required low-level manipulation of threads and locks. Visual Studio and .NET enhance support for parallel programming by providing a runtime, class library types, and diagnostic tools. You can write efficient, fine-grained, and scalable parallel code in a natural idiom without having to work directly with threads or the thread pool.

The following illustration provides a high-level overview of the parallel programming architecture in .NET.

## Related Topics

|Technology|Description|
|----------------|-----------------|
|Task Parallel Library (TPL)|Provides documentation for the `System.Threading.Tasks.Parallel` class, which includes parallel versions of `For` and `ForEach` loops, and also for the `System.Threading.Tasks.Task` class, which represents the preferred way to express asynchronous operations.|
|Parallel LINQ (PLINQ)|A parallel implementation of LINQ to Objects that significantly improves performance in many scenarios.|
|Data Structures for Parallel Programming|Provides links to documentation for thread-safe collection classes, lightweight synchronization types, and types for lazy initialization.|
|Parallel Diagnostic Tools|Provides links to documentation for Visual Studio debugger windows for tasks and parallel stacks, and for the Concurrency Visualizer.|
|Custom Partitioners for PLINQ and TPL|Describes how partitioners work and how to configure the default partitioners or create a new partitioner.|
|Task Schedulers|Describes how schedulers work and how the default schedulers may be configured.|
|Lambda Expressions in PLINQ and TPL|Provides a brief overview of lambda expressions in C# and Visual Basic, and shows how they are used in PLINQ and the Task Parallel Library.|
|For Further Reading|Provides links to additional information and sample resources for parallel programming in .NET.|

## See also

- Managed Threading
- Asynchronous programming patterns
