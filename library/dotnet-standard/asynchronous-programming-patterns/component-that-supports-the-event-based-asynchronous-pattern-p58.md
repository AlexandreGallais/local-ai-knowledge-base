---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 58 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 58 of 102)

### To complete an asynchronous operation:

- Implement the completion method. It takes six parameters, which it uses to populate a `CalculatePrimeCompletedEventArgs` that is returned to the client through the client'<example-value>'s task ID token from the internal collection, and it ends the asynchronous operation's lifetime with a call to `System.ComponentModel.AsyncOperation.PostOperationCompleted*`. The `System.ComponentModel.AsyncOperation` marshals the call to the thread or context that is appropriate for the application model.
