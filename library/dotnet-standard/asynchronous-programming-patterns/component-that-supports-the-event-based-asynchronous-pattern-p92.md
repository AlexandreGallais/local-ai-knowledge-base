---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 92 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 92 of 102)

### To implement Start and Cancel functionality:

1. Implement the `CalculatePrimeAsync` method. Make sure the client-supplied token (task ID) is unique with respect to all the tokens representing currently pending tasks. If the client passes in a non-unique token, `CalculatePrimeAsync` raises an exception. Otherwise, the token is added to the task ID collection.
