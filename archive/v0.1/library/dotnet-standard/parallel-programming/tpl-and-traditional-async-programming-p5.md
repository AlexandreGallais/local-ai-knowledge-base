---
title: "TPL and Traditional .NET Asynchronous Programming (part 5 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 5 of 21)

### Use ContinueWith for the callback functionality

 If you require access to the data in the file, as opposed to just the number of bytes, the `System.Threading.Tasks.TaskFactory.FromAsync*` method is not sufficient. Instead, use `System.Threading.Tasks.Task`, whose `Result` property contains the file data. You can do this by adding a continuation to the original task. The continuation performs the work that would typically be performed by the `System.AsyncCallback` delegate. It is invoked when the antecedent completes, and the data buffer has been filled. (The `System.IO.FileStream` object should be closed before returning.)

 The following example shows how to return a `System.Threading.Tasks.Task` that encapsulates the `BeginRead`/`EndRead` pair of the `System.IO.FileStream` class.
