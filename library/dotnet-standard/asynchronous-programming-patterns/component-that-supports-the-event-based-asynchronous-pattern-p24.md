---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 24 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 24 of 102)

## Defining Private Delegates

 The asynchronous aspects of the `PrimeNumberCalculator` component are implemented internally with a special delegate known as a `System.Threading.SendOrPostCallback`. A `System.Threading.SendOrPostCallback` represents a callback method that executes on a `System.Threading.ThreadPool` thread. The callback method must have a signature that takes a single parameter of type `System.Object`, which means you will need to pass state among delegates in a wrapper class. For more information, see `System.Threading.SendOrPostCallback`.
