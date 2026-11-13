---
title: "Collation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/collation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Collation

Collating sequences are used by SQLite when comparing TEXT values to determine order and equality. You can specify which collation to use when creating columns or per-operation in SQL queries. SQLite includes three collating sequences by default.

| Collation | Description                               |
| --------- | ----------------------------------------- |
| RTRIM     | Ignores trailing whitespace               |
| NOCASE    | Case-insensitive for ASCII characters A-Z |
| BINARY    | Case-sensitive. Compares bytes directly   |

## Custom collation

You can also define your own collating sequences or override the built-in ones using `Microsoft.Data.Sqlite.SqliteConnection.CreateCollation*`. The following example shows overriding the NOCASE collation to support Unicode characters. The full sample code is available on GitHub.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/CollationSample/Program.cs._

## Like operator

The LIKE operator in SQLite doesn't honor collations. The default implementation has the same semantics as the NOCASE collation. It's only case-insensitive for the ASCII characters A through Z.

You can easily make the LIKE operator case-sensitive by using the following pragma statement:

```sql
PRAGMA case_sensitive_like = 1
```

See User-defined functions for details on overriding the implementation of the LIKE operator.

## See also

* User-defined functions
* SQL Syntax
