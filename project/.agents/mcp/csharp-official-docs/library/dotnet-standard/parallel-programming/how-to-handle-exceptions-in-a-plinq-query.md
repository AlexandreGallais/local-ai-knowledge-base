---
title: "How to: Handle Exceptions in a PLINQ Query (part 1 of 9)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-handle-exceptions-in-a-plinq-query.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Handle Exceptions in a PLINQ Query

The first example in this topic shows how to handle the `System.AggregateException` that can be thrown from a PLINQ query when it executes. The second example shows how to put try-catch blocks within delegates, as close as possible to where the exception will be thrown. In this way, you can catch them as soon as they occur and possibly continue query execution. When exceptions are allowed to bubble up back to the joining thread, then it is possible that a query may continue to process some items after the exception is raised.

In some cases when PLINQ falls back to sequential execution, and an exception occurs, the exception may be propagated directly, and not wrapped in an `System.AggregateException`. Also, `System.Threading.ThreadAbortException`s are always propagated directly.

> **Note:**
> When "Just My Code" is enabled, Visual Studio will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press F5 to continue from it, and see the exception-handling behavior that is demonstrated in the examples below. To prevent Visual Studio from breaking on the first error, just uncheck the "Just My Code" checkbox under **Tools, Options, Debugging, General**.
>
> This example is intended to demonstrate usage, and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see Understanding Speedup in PLINQ.
