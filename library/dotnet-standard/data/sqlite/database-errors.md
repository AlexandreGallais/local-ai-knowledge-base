---
title: "Database errors"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/database-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Database errors

`Microsoft.Data.Sqlite.SqliteException` is thrown when a SQLite error is encountered. The message is provided by SQLite. The `SqliteErrorCode` and `SqliteExtendedErrorCode` properties contain the SQLite result code of the error.

Errors may be encountered any time the Microsoft.Data.Sqlite interacts with the native SQLite library. The following list shows the common scenarios where errors can occur:

* Opening a connection.
* Beginning a transaction.
* Executing a command.
* Calling `Microsoft.Data.Sqlite.SqliteDataReader.NextResult*`.

Consider carefully how your app will handle these errors.

## Locking, retries, and timeouts

> **Warning:**
> Although SQLite supports concurrent access to the same database from multiple threads, the .NET APIs objects are not thread-safe. This means that `SqliteConnection`, `SqliteCommand` and `SqliteDataReader` cannot be shared and used concurrently from multiple threads.
> When using Microsoft.Data.Sqlite from a concurrent application, simply create and open a new instance of `SqliteConnection` whenever you need to access the database (pooling ensures that this is a fast operation).

SQLite is aggressive when it comes to locking tables and database files. If your app enables any concurrent database access, you'll likely encounter busy and locked errors. You can mitigate many errors by using write-ahead logging.

Whenever Microsoft.Data.Sqlite encounters a busy or locked error, it will automatically retry until it succeeds or the command timeout is reached.

You can increase the timeout of a command by setting `Microsoft.Data.Sqlite.SqliteCommand.CommandTimeout*`. The default timeout is 30 seconds. A value of `0` means no timeout.

```csharp
// Retry for 60 seconds while locked
command.CommandTimeout = 60;
```

Microsoft.Data.Sqlite sometimes needs to create an implicit command object. For example, during BeginTransaction. To set the timeout for these commands, use `Microsoft.Data.Sqlite.SqliteConnection.DefaultTimeout*`.

```csharp
// Set the default timeout of all commands on this connection
connection.DefaultTimeout = 60;
```

## See also

* SQLite Error Codes
* File Locking In SQLite
* Shared-Cache Mode
* Write-Ahead Logging
