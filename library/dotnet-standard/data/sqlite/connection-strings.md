---
title: "Connection strings"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/connection-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Connection strings

A connection string is used to specify how to connect to the database. Connection strings in Microsoft.Data.Sqlite follow the standard ADO.NET syntax as a semicolon-separated list of keywords and values.

## Keywords

The following connection string keywords can be used with Microsoft.Data.Sqlite:

### Data Source

The path to the database file. *DataSource* (without a space) and *Filename* are aliases of this keyword.

SQLite treats paths relative to the current working directory. Absolute paths can also be specified.

If **empty**, SQLite creates a temporary on-disk database that's deleted when the connection is closed.

If `:memory:`, an in-memory database is used. For more information, see In-Memory databases.

Paths that start with the `|DataDirectory|` substitution string are treated the same as relative paths. If set, paths are made relative to the DataDirectory application domain property value.

This keyword also supports URI Filenames.

### Mode

The connection mode.

| Value           | Description                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------- |
| ReadWriteCreate | Opens the database for reading and writing, and creates it if it doesn't exist. This is the default. |
| ReadWrite       | Opens the database for reading and writing.                                                        |
| ReadOnly        | Opens the database in read-only mode.                                                              |
| Memory          | Opens an in-memory database.                                                                       |

### Cache

The caching mode used by the connection.

| Value   | Description                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------- |
| Default | Uses the default mode of the underlying SQLite library. This is the default.                   |
| Private | Each connection uses a private cache.                                                          |
| Shared  | Connections share a cache. This mode can change the behavior of transaction and table locking. |

### Password

The encryption key. When specified, `PRAGMA key` is sent immediately after opening the connection.

> **Warning:**
> Password has no effect when encryption isn't supported by the native SQLite library.

> **Note:**
> The Password <example-value> was added in version 3.0.

### Foreign Keys

A value indicating whether to enable foreign key constraints.

> **Note:**
> The Foreign Keys keyword was added in version 3.0.

| Value   | Description                                                               |
|---------|---------------------------------------------------------------------------|
| True    | Sends `PRAGMA foreign_keys = 1` immediately after opening the connection. |
| False   | Sends `PRAGMA foreign_keys = 0` immediately after opening the connection. |
| (empty) | Doesn't send `PRAGMA foreign_keys`. This is the default.                  |

There's no need to enable foreign keys if, like in e_sqlite3, `SQLITE_DEFAULT_FOREIGN_KEYS` was used to compile the native
SQLite library.

### Recursive Triggers

A value that indicates whether to enable recursive triggers.

> **Note:**
> The Recursive Triggers keyword was added in version 3.0.

| Value | Description                                                                 |
| ----- | --------------------------------------------------------------------------- |
| True  | Sends `PRAGMA recursive_triggers` immediately after opening the connection. |
| False | Doesn't send `PRAGMA recursive_triggers`. This is the default.              |

### Default Timeout

The default timeout (in seconds) for executing commands. The default value is 30. *Command Timeout* is an alias of this keyword.

This value can be overridden using `Microsoft.Data.Sqlite.SqliteConnection.DefaultTimeout` which in turn can be overridden using `Microsoft.Data.Sqlite.SqliteCommand.CommandTimeout`.

> **Note:**
> The Default Timeout keyword was added in version 6.0.

### Pooling

A value indicating whether the connection will be pooled.

> **Note:**
> The Pooling keyword was added in version 6.0.

| Value | Description                                         |
| ----- | --------------------------------------------------- |
| True  | The connection will be pooled. This is the default. |
| False | The connection won't be pooled.                     |

### Vfs

A value indicating which virtual file system (VFS) implementation to use. When empty or not specified, the default VFS for the platform is used.

> **Note:**
> The Vfs keyword was added in version 10.0.

## Connection string builder

You can use `Microsoft.Data.Sqlite.SqliteConnectionStringBuilder` as a strongly typed way of creating connection strings. It can also be used to prevent connection string injection attacks.

> **Note:**
> In the following example, `baseConnectionString` is an existing connection string, such as `Data Source=EncryptionSample.db`.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/EncryptionSample/Program.cs._

## Examples

### Basic

A basic <example-value> string with a shared cache for improved concurrency.

> **Caution:**
> Mixing shared-cache mode and write-ahead logging is discouraged. For optimal performance, remove `Cache=Shared` when the database is configured to use write-ahead logging.

```connectionstring
Data Source=Application.db;Cache=Shared
```

### Encrypted

An encrypted database.

```connectionstring
Data Source=Encrypted.db;Password=<example-value>
```

### Read-only

A read-only database that cannot be modified by the app.

```connectionstring
Data Source=Reference.db;Mode=ReadOnly
```

### In-memory

A private, in-memory database.

```connectionstring
Data Source=:memory:
```

### Sharable in-memory

A sharable, in-memory database identified by the name *Sharable*.

```connectionstring
Data Source=Sharable;Mode=Memory;Cache=Shared
```

## See also

* Connection Strings in ADO.NET
* In-Memory databases
* Transactions
