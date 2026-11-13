---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 51 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 51 of 102)

### To raise events to your component's clients:

1. Implement public events for reporting to clients. You will need an event for reporting progress and one for reporting completion.
