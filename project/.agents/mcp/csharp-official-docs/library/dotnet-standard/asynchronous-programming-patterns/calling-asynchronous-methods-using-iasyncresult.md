---
title: "Calling Asynchronous Methods Using IAsyncResult"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/calling-asynchronous-methods-using-iasyncresult.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Calling Asynchronous Methods Using IAsyncResult

Types in the .NET libraries and third-party class libraries can provide methods that allow an application to continue executing while performing asynchronous operations in threads other than the main application thread. The following sections describe and provide code examples that demonstrate the different ways you can call asynchronous methods that use the `System.IAsyncResult` design pattern.

- Blocking Application Execution by Ending an Async Operation.

- Blocking Application Execution Using an AsyncWaitHandle.

- Polling for the Status of an Asynchronous Operation.

- Using an AsyncCallback Delegate to End an Asynchronous Operation.

## See also

- Event-based Asynchronous Pattern (EAP)
- Event-based Asynchronous Pattern Overview
