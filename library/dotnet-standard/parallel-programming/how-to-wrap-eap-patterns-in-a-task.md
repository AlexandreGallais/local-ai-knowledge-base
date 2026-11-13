---
title: "How to: Wrap EAP Patterns in a Task (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-wrap-eap-patterns-in-a-task.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Wrap EAP Patterns in a Task

The following example shows how to expose an arbitrary sequence of Event-Based Asynchronous Pattern (EAP) operations as one task by using a `System.Threading.Tasks.TaskCompletionSource`1`. The example also shows how to use a `System.Threading.CancellationToken` to invoke the built-in cancellation methods on the `System.Net.WebClient` objects.
