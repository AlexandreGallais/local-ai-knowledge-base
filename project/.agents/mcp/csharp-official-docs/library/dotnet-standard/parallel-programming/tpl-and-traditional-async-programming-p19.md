---
title: "TPL and Traditional .NET Asynchronous Programming (part 19 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 19 of 21)

## Implement the APM pattern by using tasks

 In some scenarios, it may be desirable to directly expose the `System.IAsyncResult` pattern by using begin/end method pairs in an API. For example, you may want to maintain consistency with existing APIs, or you may have automated tools that require this pattern. In such cases, you can use `Task` objects to simplify how the APM pattern is implemented internally.

 The following example shows how to use tasks to implement an APM begin/end method pair for a long-running compute-bound method.
