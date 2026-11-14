---
title: "Parameters"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/sqlite/parameters.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Parameters

Parameters are used to protect against SQL injection attacks. Instead of concatenating user input with SQL statements, use parameters to ensure input is only ever treated as a literal value and never executed. In SQLite, parameters are typically allowed anywhere a literal is allowed in SQL statements.

Parameters can be prefixed with either `:`, `@`, or `$`.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/HelloWorldSample/Program.cs._

See Data types for details about how .NET values are mapped to SQLite values.

## Truncation

Use the `Microsoft.Data.Sqlite.SqliteParameter.Size` property to truncate TEXT and BLOB values.

```csharp
// Truncate name to 30 characters
command.Parameters.AddWithValue("$name", name).Size = 30;
```

## Alternative types

Sometimes, you may want to use an alternative SQLite type. Do this by setting the `Microsoft.Data.Sqlite.SqliteParameter.SqliteType` property.

The following alternative type mappings can be used. For the default mappings, see Data types.

| Value          | SqliteType | Remarks          |
| -------------- | ---------- | ---------------- |
| Char           | Integer    | UTF-16           |
| DateOnly       | Real       | Julian day value |
| DateTime       | Real       | Julian day value |
| DateTimeOffset | Real       | Julian day value |
| Guid           | Blob       |                  |
| TimeOnly       | Real       | In days          |
| TimeSpan       | Real       | In days          |

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/DateAndTimeSample/Program.cs._

## Output parameters

SQLite doesn't support output parameters. Return values in the query results instead.

## See also

* Data types
