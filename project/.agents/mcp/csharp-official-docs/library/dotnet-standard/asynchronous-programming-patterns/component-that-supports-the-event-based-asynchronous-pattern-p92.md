---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 92 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 92 of 102)

### To implement Start and Cancel functionality:

1. Implement the `CalculatePrimeAsync` method. Make sure the client-supplied token (task ID) is unique with respect to all the tokens representing currently pending tasks. If the client passes in a non-unique token, `CalculatePrimeAsync` raises an exception. Otherwise, the token is added to the task ID collection.
