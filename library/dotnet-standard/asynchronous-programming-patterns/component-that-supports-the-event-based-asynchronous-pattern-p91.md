---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 91 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 91 of 102)

## Implementing the Start and Cancel Methods

 You start the worker method on its own thread by calling `BeginInvoke` on the delegate that wraps it. To manage the lifetime of a particular asynchronous operation, you call the `System.ComponentModel.AsyncOperationManager.CreateOperation*` method on the `System.ComponentModel.AsyncOperationManager` helper class. This returns an `System.ComponentModel.AsyncOperation`, which marshals calls on the client's event handlers to the proper thread or context.

 You cancel a particular pending operation by calling `System.ComponentModel.AsyncOperation.PostOperationCompleted*` on its corresponding `System.ComponentModel.AsyncOperation`. This ends that operation, and any subsequent calls to its `System.ComponentModel.AsyncOperation` will throw an exception.
