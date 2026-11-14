---
title: "Async limitations"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/sqlite/async.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Async limitations

SQLite doesn't support asynchronous I/O. Async ADO.NET methods will execute synchronously in Microsoft.Data.Sqlite. Avoid calling them.

Instead, use write-ahead logging to improve performance and concurrency.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/AsyncSample/Program.cs._

> **Tip:**
> Write-ahead logging is enabled by default on databases created using Entity Framework Core.
