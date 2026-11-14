---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 57 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 57 of 102)

## Implementing the Completion Method

 The completion delegate is the method that the underlying, free-threaded asynchronous behavior will invoke when the asynchronous operation ends by successful completion, error, or cancellation. This invocation happens on an arbitrary thread.

 This method is where the client's task ID is removed from the internal collection of unique client tokens. This method also ends the lifetime of a particular asynchronous operation by calling the `System.ComponentModel.AsyncOperation.PostOperationCompleted*` method on the corresponding `System.ComponentModel.AsyncOperation`. This call raises the completion event on the thread that is appropriate for the application model. After the `System.ComponentModel.AsyncOperation.PostOperationCompleted*` method is called, this instance of `System.ComponentModel.AsyncOperation` can no longer be used, and any subsequent attempts to use it will throw an exception.

 The `CompletionMethod` signature must hold all state necessary to describe the outcome of the asynchronous operation. It holds state for the number that was tested by this particular asynchronous operation, whether the number is prime, and the value of its first divisor if it is not a prime number. It also holds state describing any exception that occurred, and the `System.ComponentModel.AsyncOperation` corresponding to this particular task.
