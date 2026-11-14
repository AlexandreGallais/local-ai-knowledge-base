---
title: "Task Parallel Library (TPL)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/task-parallel-library-tpl.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Task Parallel Library (TPL)

The Task Parallel Library (TPL) is a set of public types and APIs in the `System.Threading` and `System.Threading.Tasks` namespaces. The purpose of the TPL is to make developers more productive by simplifying the process of adding parallelism and concurrency to applications. The TPL dynamically scales the degree of concurrency to use all the available processors most efficiently. In addition, the TPL handles the partitioning of the work, the scheduling of threads on the `System.Threading.ThreadPool`, cancellation support, state management, and other low-level details. Using TPL, you can maximize the performance of your code while focusing on the work that your program is designed to accomplish.

In .NET Framework 4, the TPL is the preferred way to write multithreaded and parallel code. However, not all code is suitable for parallelization. For example, if a loop performs only a small amount of work on each iteration, or it doesn't run for many iterations, then the overhead of parallelization can cause the code to run more slowly. Furthermore, parallelization, like any multithreaded code, adds complexity to your program execution. Although the TPL simplifies multithreaded scenarios, we recommend that you have a basic <example-value> of threading concepts, for example, locks, deadlocks, and race conditions, so that you can use the TPL effectively.

## Related articles

|Title|Description|
|-|-|
|Data Parallelism|Describes how to create parallel `for` and `foreach` loops (`For` and `For Each` in Visual Basic).|
|Task-based Asynchronous Programming|Describes how to create and run tasks implicitly by using `System.Threading.Tasks.Parallel.Invoke*` or explicitly by using `System.Threading.Tasks.Task` objects directly.|
|Dataflow|Describes how to use the dataflow components in the TPL Dataflow Library to handle multiple operations. These operations must communicate with one another and process data as it becomes available.|
|Potential Pitfalls in Data and Task Parallelism|Describes some common pitfalls and how to avoid them.|
|Parallel LINQ (PLINQ)|Describes how to achieve data parallelism with LINQ queries.|
|Parallel Programming|Top-level node for .NET parallel programming.|

## See also

- Samples for Parallel Programming with .NET
