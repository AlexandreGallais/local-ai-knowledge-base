---
title: "TPL and Traditional .NET Asynchronous Programming (part 2 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 2 of 21)

## Wrap APM operations in a Task

 Both the `System.Threading.Tasks.TaskFactory` and `System.Threading.Tasks.TaskFactory`1` classes provide several overloads of the `System.Threading.Tasks.TaskFactory.FromAsync*` and `System.Threading.Tasks.TaskFactory`1.FromAsync*` methods that let you encapsulate an APM begin/end method pair in one `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` instance. The various overloads accommodate any begin/end method pair that have from zero to three input parameters.

 For pairs that have `End` methods that return a value (a `Function` in Visual Basic), use the methods in `System.Threading.Tasks.TaskFactory`1` that create a `System.Threading.Tasks.Task`1`. For `End` methods that return void (a `Sub` in Visual Basic), use the methods in `System.Threading.Tasks.TaskFactory` that create a `System.Threading.Tasks.Task`.

 For those few cases in which the `Begin` method has more than three parameters or contains `ref` or `out` parameters, additional `FromAsync` overloads that encapsulate only the `End` method are provided.

 The following example shows the signature for the `FromAsync` overload that matches the `System.IO.FileStream.BeginRead*` and `System.IO.FileStream.EndRead*` methods.
