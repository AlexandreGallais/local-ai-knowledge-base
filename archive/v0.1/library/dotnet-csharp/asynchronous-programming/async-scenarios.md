---
title: "Asynchronous programming scenarios (part 1 of 9)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/asynchronous-programming/async-scenarios.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Asynchronous programming scenarios

If your code implements I/O-bound scenarios to support network data requests, database access, or file system read/writes, asynchronous programming is the best approach. You can also write asynchronous code for CPU-bound scenarios like expensive calculations.

C# has a language-level asynchronous programming model that allows you to easily write asynchronous code without having to juggle callbacks or conform to a library that supports asynchrony. The model follows what is known as the Task-based asynchronous pattern (TAP).
