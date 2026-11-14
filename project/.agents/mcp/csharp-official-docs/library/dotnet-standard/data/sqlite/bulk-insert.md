---
title: "Bulk insert"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/sqlite/bulk-insert.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Bulk insert

SQLite doesn't have any special way to bulk insert data. To get optimal performance when inserting or updating data, ensure that you do the following:

- Use a transaction.
- Reuse the same parameterized command. Subsequent executions will reuse the compilation of the first one.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/BulkInsertSample/Program.cs._
