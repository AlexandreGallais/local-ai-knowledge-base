---
title: "How to: Implement a Client of the Event-based Asynchronous Pattern (part 1 of 7)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/how-to-implement-a-client-of-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Client of the Event-based Asynchronous Pattern

The following code example demonstrates how to use a component that adheres to the Event-based Asynchronous Pattern Overview. The form for this example uses the `PrimeNumberCalculator` component described in How to: Implement a Component That Supports the Event-based Asynchronous Pattern.

 When you run a project that uses this example, you will see a "Prime Number Calculator" form with a grid and two buttons: **Start New Task** and **Cancel**. You can click the **Start New Task** button several times in succession, and for each click, an asynchronous operation will begin a computation to determine if a randomly generated test number is prime. The form will periodically display progress and incremental results. Each operation is assigned a unique task ID. The result of the computation is displayed in the **Result** column; if the test number is not prime, it is labeled as **Composite,** and its first divisor is displayed.

 Any pending operation can be canceled with the **Cancel** button. Multiple selections can be made.

> **Note:**
> Most numbers will not be prime. If you have not found a prime number after several completed operations, simply start more tasks, and eventually you will find some prime numbers.
