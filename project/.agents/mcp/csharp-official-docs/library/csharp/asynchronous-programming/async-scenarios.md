---
title: "Asynchronous programming scenarios (part 1 of 9)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/asynchronous-programming/async-scenarios.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Asynchronous programming scenarios

If your code implements I/O-bound scenarios to support network data requests, database access, or file system read/writes, asynchronous programming is the best approach. You can also write asynchronous code for CPU-bound scenarios like expensive calculations.

C# has a language-level asynchronous programming model that allows you to easily write asynchronous code without having to juggle callbacks or conform to a library that supports asynchrony. The model follows what is known as the Task-based asynchronous pattern (TAP).
