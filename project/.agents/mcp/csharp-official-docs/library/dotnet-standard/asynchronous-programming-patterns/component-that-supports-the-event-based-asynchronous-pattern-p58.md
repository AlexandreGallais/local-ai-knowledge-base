---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 58 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 58 of 102)

### To complete an asynchronous operation:

- Implement the completion method. It takes six parameters, which it uses to populate a `CalculatePrimeCompletedEventArgs` that is returned to the client through the client'<example-value>'s task ID token from the internal collection, and it ends the asynchronous operation's lifetime with a call to `System.ComponentModel.AsyncOperation.PostOperationCompleted*`. The `System.ComponentModel.AsyncOperation` marshals the call to the thread or context that is appropriate for the application model.
