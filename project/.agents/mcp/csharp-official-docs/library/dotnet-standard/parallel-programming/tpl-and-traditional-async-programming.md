---
title: "TPL and Traditional .NET Asynchronous Programming (part 1 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TPL and traditional .NET asynchronous programming

.NET provides the following two standard patterns for performing I/O-bound and compute-bound asynchronous operations:

- Asynchronous Programming Model (APM), in which asynchronous operations are represented by a pair of begin/end methods. For example: `System.IO.FileStream.BeginRead*` and `System.IO.Stream.EndRead*`.

- Event-based asynchronous pattern (EAP), in which asynchronous operations are represented by a method/event pair that are named `<OperationName>Async` and `<OperationName>Completed`. For example: `System.Net.WebClient.DownloadStringAsync*` and `System.Net.WebClient.DownloadStringCompleted`.

The Task Parallel Library (TPL) can be used in various ways in conjunction with either of the asynchronous patterns. You can expose both APM and EAP operations as `Task` objects to library consumers, or you can expose the APM patterns but use `Task` objects to implement them internally. In both scenarios, by using `Task` objects, you can simplify the code and take advantage of the following useful functionality:

- Register callbacks, in the form of task continuations, at any time after the task has started.

- Coordinate multiple operations that execute in response to a `Begin_` method by using the `System.Threading.Tasks.TaskFactory.ContinueWhenAll*` and `System.Threading.Tasks.TaskFactory.ContinueWhenAny*` methods, or the `System.Threading.Tasks.Task.WaitAll*` and `System.Threading.Tasks.Task.WaitAny*` methods.

- Encapsulate asynchronous I/O-bound and compute-bound operations in the same `Task` object.

- Monitor the status of the `Task` object.

- Marshal the status of an operation to a `Task` object by using `System.Threading.Tasks.TaskCompletionSource`1`.
