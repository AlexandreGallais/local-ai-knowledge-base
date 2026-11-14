---
title: "Blob I/O"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/sqlite/blob-io.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Blob I/O

> **Note:**
> The SqliteBlob class was added in version 3.0.

You can reduce memory usage while reading and writing large objects by streaming the data into and out of the database. This can be especially useful when parsing or transforming the data.

Start by inserting a row as normal. Use the `zeroblob()` SQL function to allocate space in the database to hold the large object. The `last_insert_rowid()` function provides a convenient way to get its rowid.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/StreamingSample/Program.cs._

After inserting the row, open a stream to write the large object using `Microsoft.Data.Sqlite.SqliteBlob`.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/StreamingSample/Program.cs._

To stream the large object out of the database, you must select the rowid or one of its aliases as shown here in addition to the large object's column. If you don't select the rowid, the entire object will be loaded into memory. The object returned by `GetStream()` will be a `SqliteBlob` when done correctly.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/StreamingSample/Program.cs._
