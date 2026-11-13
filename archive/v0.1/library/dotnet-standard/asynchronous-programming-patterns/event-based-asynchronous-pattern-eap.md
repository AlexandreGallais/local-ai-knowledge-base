---
title: "Event-based Asynchronous Pattern (EAP)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/event-based-asynchronous-pattern-eap.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Event-based Asynchronous Pattern (EAP)

There are a number of ways to expose asynchronous features to client code. The Event-based Asynchronous Pattern prescribes one way for classes to present asynchronous behavior.

> **Note:**
> The Task Parallel Library provides a newer model for asynchronous and parallel programming. For more information, see Task Parallel Library (TPL) and Task-based Asynchronous Pattern (TAP).

## In This Section

 Event-based Asynchronous Pattern Overview
 Describes how the Event-based Asynchronous Pattern makes available the advantages of multithreaded applications while hiding many of the complex issues inherent in multithreaded design.

 Implementing the Event-based Asynchronous Pattern
 Describes the standardized way to package a class that has asynchronous features.

 Best Practices for Implementing the Event-based Asynchronous Pattern
 Describes the requirements for exposing asynchronous features according to the Event-based Asynchronous Pattern.

 Deciding When to Implement the Event-based Asynchronous Pattern
 Describes how to determine when you should choose to implement the Event-based Asynchronous Pattern instead of the `System.IAsyncResult` pattern represented by the Asynchronous Programming Model (APM).

 How to: Implement a Component That Supports the Event-based Asynchronous Pattern
 Describes how to create a component that implements the Event-based Asynchronous Pattern. It is implemented using helper classes from the `System.ComponentModel` namespace, which ensures that the component works correctly under any application model.

 How to: Implement a Client of the Event-based Asynchronous Pattern
 Describes how to create a client that uses a component that implements the Event-based Asynchronous Pattern.

 How to: Use Components That Support the Event-based Asynchronous Pattern
 Describes how to use a component that supports the Event-based Asynchronous Pattern.

## Reference

 `System.ComponentModel.AsyncOperation`
 Describes the `System.ComponentModel.AsyncOperation` class and has links to all its members.

 `System.ComponentModel.AsyncOperationManager`
 Describes the `System.ComponentModel.AsyncOperationManager` class and has links to all its members.

 `System.ComponentModel.BackgroundWorker`
 Describes the `System.ComponentModel.BackgroundWorker` component and has links to all its members.

## Related Sections

 Task Parallel Library (TPL)
 Describes a programming model for asynchronous and parallel operations.

 Threading
 Describes multithreading features in .NET.

## See also

- Managed Threading Best Practices
- Events
- Asynchronous Programming Design Patterns
