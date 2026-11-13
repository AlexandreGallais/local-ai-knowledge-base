---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 2 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 2 of 102)

## Defining Public Asynchronous Events and Delegates

 Your component communicates to clients using events. The _MethodName_**Completed** event alerts clients to the completion of an asynchronous task, and the _MethodName_**ProgressChanged** event informs clients of the progress of an asynchronous task.
