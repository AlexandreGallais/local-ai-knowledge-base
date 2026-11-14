---
title: "What's New in EF Core 6.0 (part 11 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 11 of 11)

## Microsoft.Data.Sqlite 6.0

> **Tip:**
> You can run and debug into all the samples shown below by downloading the sample code from GitHub.

### Connection Pooling

GitHub Issue: #13837.

It is common practice to keep database connections open for as little time as possible. This helps prevent contention on the connection resource. This is why libraries like EF Core open the connection immediately before performing a database operation, and close it again immediately after. For example, consider this EF Core code:

```csharp
Console.WriteLine("Starting query...");
Console.WriteLine();

var users = await context.Users.ToListAsync();

Console.WriteLine();
Console.WriteLine("Query finished.");
Console.WriteLine();

foreach (var user in users)
{
    if (user.Username.Contains("microsoft"))
    {
        user.Username = "msft:" + user.Username;

        Console.WriteLine("Starting SaveChanges...");
        Console.WriteLine();

        await context.SaveChangesAsync();

        Console.WriteLine();
        Console.WriteLine("SaveChanges finished.");
    }
}
```

The output from this code, with logging for connections turned on, is:

```none
Starting query...

dbug: 8/27/2021 09:26:57.810 RelationalEventId.ConnectionOpened[20001] (Microsoft.EntityFrameworkCore.Database.Connection)
      Opened connection to database 'main' on server 'C:\dotnet\efdocs\samples\core\Miscellaneous\NewInEFCore6\bin\Debug\net6.0\test.db'.
dbug: 8/27/2021 09:26:57.813 RelationalEventId.ConnectionClosed[20003] (Microsoft.EntityFrameworkCore.Database.Connection)
      Closed connection to database 'main' on server 'test.db'.

Query finished.

Starting SaveChanges...

dbug: 8/27/2021 09:26:57.813 RelationalEventId.ConnectionOpened[20001] (Microsoft.EntityFrameworkCore.Database.Connection)
      Opened connection to database 'main' on server 'C:\dotnet\efdocs\samples\core\Miscellaneous\NewInEFCore6\bin\Debug\net6.0\test.db'.
dbug: 8/27/2021 09:26:57.814 RelationalEventId.ConnectionClosed[20003] (Microsoft.EntityFrameworkCore.Database.Connection)
      Closed connection to database 'main' on server 'test.db'.

SaveChanges finished.
```

Notice that the connection is opened and closed rapidly for each operation.

However, for most database systems, opening a physical connection to the database is an expensive operation. Therefore most ADO.NET providers create a pool of physical connections and rent them out to `DbConnection` instances as needed.

SQLite is a little bit different since database access is typically just accessing a file. This means opening a connection to a SQLite database is usually very fast. However, this is not always the case. For example, opening a connection to an encrypted database can be very slow. Therefore, SQLite connections are now pooled when using Microsoft.Data.Sqlite 6.0.

### Support DateOnly and TimeOnly

GitHub Issue: #24506.

Microsoft.Data.Sqlite 6.0 supports the new `DateOnly` and `TimeOnly` types from .NET 6. These can also be used in EF Core 6.0 with the SQLite provider. As always with SQLite, its native type system means that the values from these types need to be stored as one of the four supported types. Microsoft.Data.Sqlite stores them as `TEXT`. For example, an entity using these types:

```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }

    public DateOnly Birthday { get; set; }
    public TimeOnly TokensRenewed { get; set; }
}
```

Maps to the following table in the SQLite database:

```sql
CREATE TABLE "Users" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY <example-value>,
    "Username" TEXT NULL,
    "Birthday" TEXT NOT NULL,
    "<example-value>" TEXT NOT NULL);
```

Values can then be saved, queried, and updated in the normal way. For example, this EF Core LINQ query:

```csharp
var users = await context.Users.Where(u => u.Birthday < new DateOnly(1900, 1, 1)).ToListAsync();
```

Is translated into the following on SQLite:

```sql
SELECT "<example-value>"."<example-value>", "<example-value>"."<example-value>", "<example-value>"."<example-value>", "<example-value>"."<example-value>"
FROM "Users" AS "u"
WHERE "u"."Birthday" < '1900-01-01'
```

And returns only uses with birthdays before 1900 CE:

```output
Found 'ajcvickers'
Found 'wendy'
```

### Savepoints API

GitHub Issue: #20228.

We have been standardizing on a common API for savepoints in ADO.NET providers. Microsoft.Data.Sqlite now supports this API, including:

* `System.Data.Common.DbTransaction.Save(System.String)` to create a savepoint in the transaction
* `System.Data.Common.DbTransaction.Rollback(System.String)` to roll back to a previous savepoint
* `System.Data.Common.DbTransaction.Release(System.String)` to release a savepoint

Using a savepoint allows part of a transaction to be rolled back without rolling back the entire transaction. For example, the code below:

* Creates a transaction
* Sends an update to the database
* Creates a savepoint
* Sends another update to the database
* Rolls back to the savepoint previous created
* Commits the transaction

```csharp
using var connection = new SqliteConnection("Command Timeout=60;DataSource=test.db");
await connection.OpenAsync();

await using var transaction = await connection.BeginTransactionAsync();

using (var command = connection.CreateCommand())
{
    command.CommandText = @"UPDATE Users SET Username = 'ajcvickers' WHERE Id = 1";
    await command.ExecuteNonQueryAsync();
}

await transaction.SaveAsync("MySavepoint");

using (var command = connection.CreateCommand())
{
    command.CommandText = @"UPDATE Users SET Username = 'wfvickers' WHERE Id = 2";
    await command.ExecuteNonQueryAsync();
}

await transaction.RollbackAsync("MySavepoint");

await transaction.CommitAsync();
```

This will result in the first update being committed to the database, while the second update is not committed since the savepoint was rolled back before committing the transaction.

### Command timeout in the connection string

GitHub Issue: #22505. This feature was contributed by @nmichels. Many thanks!

ADO.NET providers support two distinct timeouts:

* The connection timeout, which determines the maximum time to wait when making a connection to the database.
* The command timeout, which determines the maximum time to wait for a command to complete executing.

The command timeout can be set from code using `System.Data.Common.DbCommand.CommandTimeout`. Many providers are now also exposing this command timeout in the connection string. Microsoft.Data.Sqlite is following this trend with the `Command Timeout` connection string keyword. For example, `"Command Timeout=60;DataSource=test.db"` will use 60 seconds as the default timeout for commands created by the connection.

> **Tip:**
> Sqlite treats `Default Timeout` as a synonym for `Command Timeout` and so can be used instead if preferred.
