---
title: "Interoperability"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/interop.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Interoperability

`Microsoft.Data.Sqlite` uses `SQLitePCLRaw` to interact with the native SQLite library. `SQLitePCLRaw` provides a thin .NET API over the native SQLite API. `SqliteConnection` and `SqliteDataReader` provide access to the underlying SQLitePCLRaw objects letting you call these APIs directly.

The following example shows how to call `sqlite3_trace` to write executed SQL statements to the console:

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/InteropSample/Program.cs._

And the following example shows calling `sqlite3_stmt_status` to see how many SQLite virtual machine steps a SQL statement compiled into:

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/InteropSample/Program.cs._

The SQLitePCLRaw objects even expose a pointer to the native objects letting you P/Invoke additional native SQLite APIs.
