---
title: "TPL and Traditional .NET Asynchronous Programming (part 13 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 13 of 21)

### Synchronize multiple FromAsync tasks

 The static `System.Threading.Tasks.TaskFactory.ContinueWhenAll*` and `System.Threading.Tasks.TaskFactory.ContinueWhenAny*` methods provide added flexibility when used in conjunction with the `FromAsync` methods. The following example shows how to initiate multiple asynchronous I/O operations, and then wait for all of them to complete before you execute the continuation.
