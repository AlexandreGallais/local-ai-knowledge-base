---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 25 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 25 of 102)

### To implement your component's internal asynchronous behavior:

1. Declare and create the `System.Threading.SendOrPostCallback` delegates in the `PrimeNumberCalculator` class. Create the `System.Threading.SendOrPostCallback` objects in a utility method called `InitializeDelegates`.

     You will need two delegates: one for reporting progress to the client, and one for reporting completion to the client.
