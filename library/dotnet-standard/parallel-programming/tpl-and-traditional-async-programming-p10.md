---
title: "TPL and Traditional .NET Asynchronous Programming (part 10 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 10 of 21)

### Provide custom state data

 In typical `System.IAsyncResult` operations, if your `System.AsyncCallback` delegate requires some custom state data, you have to pass it in through the last parameter in the `Begin` method, so that the data can be packaged into the `System.IAsyncResult` object that is eventually passed to the callback method. This is typically not required when the `FromAsync` methods are used. If the custom data is known to the continuation, then it can be captured directly in the continuation delegate. The following example resembles the previous example, but instead of examining the `Result` property of the antecedent, the continuation examines the custom state data that is directly accessible to the user delegate of the continuation.
