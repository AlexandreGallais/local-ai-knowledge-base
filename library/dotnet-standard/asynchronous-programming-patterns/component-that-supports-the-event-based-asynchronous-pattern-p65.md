---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 65 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 65 of 102)

### To execute the prime number calculation asynchronously:

1. Implement the `TaskCanceled` utility method. This checks the task lifetime collection for the given task ID, and returns `true` if the task ID is not found.
