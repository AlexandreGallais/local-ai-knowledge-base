---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 91 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 91 of 102)

## Implementing the Start and Cancel Methods

 You start the worker method on its own thread by calling `BeginInvoke` on the delegate that wraps it. To manage the lifetime of a particular asynchronous operation, you call the `System.ComponentModel.AsyncOperationManager.CreateOperation*` method on the `System.ComponentModel.AsyncOperationManager` helper class. This returns an `System.ComponentModel.AsyncOperation`, which marshals calls on the client's event handlers to the proper thread or context.

 You cancel a particular pending operation by calling `System.ComponentModel.AsyncOperation.PostOperationCompleted*` on its corresponding `System.ComponentModel.AsyncOperation`. This ends that operation, and any subsequent calls to its `System.ComponentModel.AsyncOperation` will throw an exception.
