---
title: "How to: Wrap EAP Patterns in a Task (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-wrap-eap-patterns-in-a-task.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Wrap EAP Patterns in a Task

The following example shows how to expose an arbitrary sequence of Event-Based Asynchronous Pattern (EAP) operations as one task by using a `System.Threading.Tasks.TaskCompletionSource`1`. The example also shows how to use a `System.Threading.CancellationToken` to invoke the built-in cancellation methods on the `System.Net.WebClient` objects.
