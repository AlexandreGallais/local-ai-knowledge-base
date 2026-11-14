---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 64 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 64 of 102)

## Implementing the Worker Methods

 So far, you have implemented the supporting asynchronous code for the `PrimeNumberCalculator` component. Now you can implement the code that does the actual work. You will implement three methods: `CalculateWorker`, `BuildPrimeNumberList`, and `IsPrime`. Together, `BuildPrimeNumberList` and `IsPrime` comprise a well-known algorithm called the Sieve of Eratosthenes, which determines if a number is prime by finding all the prime numbers up to the square root of the test number. If no divisors are found by that point, the test number is prime.

 If this component were written for maximum efficiency, it would remember all the prime numbers discovered by various invocations for different test numbers. It would also check for trivial divisors like 2, 3, and 5. The intent of this example is to demonstrate how time-consuming operations can be executed asynchronously, however, so these optimizations are left as an exercise for you.

 The `CalculateWorker` method is wrapped in a delegate and is invoked asynchronously with a call to `BeginInvoke`.

> **Note:**
> Progress reporting is implemented in the `BuildPrimeNumberList` method. On fast computers, `ProgressChanged` events can be raised in rapid succession. The client thread, on which these events are raised, must be able to handle this situation. User interface code may be flooded with messages and unable to keep up, resulting in unresponsiveness. For an example user interface that handles this situation, see How to: Implement a Client of the Event-based Asynchronous Pattern.
