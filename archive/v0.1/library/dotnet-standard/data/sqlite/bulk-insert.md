---
title: "Bulk insert"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/bulk-insert.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Bulk insert

SQLite doesn't have any special way to bulk insert data. To get optimal performance when inserting or updating data, ensure that you do the following:

- Use a transaction.
- Reuse the same parameterized command. Subsequent executions will reuse the compilation of the first one.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/BulkInsertSample/Program.cs._
