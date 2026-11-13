---
title: "Extensions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/extensions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Extensions

SQLite supports loading extensions at runtime. Extensions include things like additional SQL functions, collations, virtual tables, and more.

.NET includes additional logic for locating native libraries in additional places like referenced NuGet packages. Unfortunately, SQLite can't leverage this logic; it calls the platform API directly to load libraries. Because of this, you may need to modify the `PATH`, `LD_LIBRARY_PATH`, or `DYLD_LIBRARY_PATH` environment variables before loading SQLite extensions. There's a sample on GitHub that demonstrates finding binaries for the current runtime inside a referenced NuGet package.

To load an extension, call the `Microsoft.Data.Sqlite.SqliteConnection.LoadExtension*` method. Microsoft.Data.Sqlite will ensure that the extension remains loaded even if the connection is closed and reopened.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/ExtensionsSample/Program.cs._

> **Note:**
> The LoadExtension method was added in version 3.0.

## See also

* Run-Time Loadable Extensions
