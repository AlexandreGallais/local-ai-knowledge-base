---
title: "TPL and Traditional .NET Asynchronous Programming (part 16 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 16 of 21)

### FromAsync tasks for only the End method

 For those few cases in which the `Begin` method requires more than three input parameters or has `ref` or `out` parameters, you can use the `FromAsync` overloads, for example, `System.Threading.Tasks.TaskFactory`1.FromAsync(System.IAsyncResult,System.Func{System.IAsyncResult,`0})`, that represent only the `End` method. These methods can also be used in any scenario in which you're passed an `System.IAsyncResult` and want to encapsulate it in a Task.
