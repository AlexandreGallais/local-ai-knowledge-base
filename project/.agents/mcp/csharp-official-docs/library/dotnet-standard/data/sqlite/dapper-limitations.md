---
title: "Dapper limitations"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/sqlite/dapper-limitations.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Dapper limitations

There are a few limitations you should be aware of when using Microsoft.Data.Sqlite with Dapper.

## Parameters

SQLite parameter names are case-sensitive. Ensure that the parameter names used in SQL match the case of the anonymous object's properties. Issue #18861 would improve this experience.

Dapper also expects parameters to use the `@` prefix. Other prefixes won't work.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/DapperSample/Program.cs._

## Data types

Dapper reads values using the SqliteDataReader indexer. The return type of this indexer is object, which means it will only ever return long, double, string, or byte[] values. For more information, see Data types. Dapper handles most conversions between these and other primitive types. Unfortunately, it doesn't handle `DateTimeOffset`, `Guid`, or `TimeSpan`. Create type handlers if you want to use these types in your results.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/DapperSample/Program.cs._

Don't forget to add the type handlers before querying.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/DapperSample/Program.cs._

## See also

* Data types
* Async limitations
