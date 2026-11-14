---
title: "ADO.NET limitations"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/sqlite/adonet-limitations.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ADO.NET limitations

Microsoft.Data.Sqlite provides implementations of many of the ADO.NET abstractions, but there are some limitations.

## Database schema information

Metadata about query results is available using the `Microsoft.Data.Sqlite.SqliteDataReader.GetSchemaTable*` method.

`DbConnection.GetSchema()` isn't implemented. This API isn't well-defined, so we recommend retrieving database metadata directly using standard SQLite APIs like the sqlite_master table and the table_info PRAGMA.

For more information, see Metadata.

## System.Transactions

Microsoft.Data.Sqlite doesn't yet support System.Transactions. Use ADO.NET transactions instead. For more information, see Transactions.

Provide feedback about the lack of support for System.Transactions on issue #13825.

## Data adapters

`DbDataAdapter` isn't yet implemented by Microsoft.Data.Sqlite. This means you can only use ADO.NET `DataSet` and `DataTable` to load data and not update it.

Use issue #13838 to provide feedback about implementing `DbDataAdapter`.

## Output parameters

SQLite doesn't support output parameters.

## Positional parameters

Microsoft.Data.Sqlite only supports named parameters. Positional parameters aren't supported.

## Stored procedures

SQLite doesn't support stored procedures.

## Isolation levels

The `Chaos` and `Snapshot` isolation levels aren't supported in SQLite transactions.

## See also

* Async limitations
* Data types
* Transactions
