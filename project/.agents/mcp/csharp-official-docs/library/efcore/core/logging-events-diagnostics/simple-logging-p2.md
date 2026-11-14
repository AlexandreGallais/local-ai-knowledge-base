---
title: "Simple logging - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/logging-events-diagnostics/simple-logging.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Simple logging - EF Core (part 2 of 2)

## Message contents and formatting

The default content from `LogTo` is formatted across multiple lines. The first line contains message metadata:

* The `Microsoft.Extensions.Logging.LogLevel` as a four-character prefix
* A local timestamp, formatted for the current culture
* The `Microsoft.Extensions.Logging.EventId` in the form that can be copy/pasted to get the member from `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId` or one of the other `EventId` classes, plus the raw ID value
* The event category, as described above.

For example:

```output
info: 10/6/2020 10:52:45.581 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      CREATE TABLE "Blogs" (
          "Id" INTEGER NOT NULL CONSTRAINT "PK_Blogs" PRIMARY KEY <example-value>,
          "Name" INTEGER NOT NULL
      );
dbug: 10/6/2020 10:52:45.582 RelationalEventId.TransactionCommitting[20210] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Committing transaction.
dbug: 10/6/2020 10:52:45.585 RelationalEventId.TransactionCommitted[20202] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Committed transaction.
```

This content can be customized by passing values from `Microsoft.EntityFrameworkCore.Diagnostics.DbContextLoggerOptions`, as shown in the following sections.

> **Tip:**
> Consider using Microsoft.Extensions.Logging for more control over log formatting.

### Using UTC time

By default, timestamps are designed for local consumption while debugging. Use `Microsoft.EntityFrameworkCore.Diagnostics.DbContextLoggerOptions.DefaultWithUtcTime` to use culture-agnostic UTC timestamps instead, but keep everything else the same. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(
        Console.WriteLine,
        LogLevel.Debug,
        DbContextLoggerOptions.DefaultWithUtcTime);
```

This example results in the following log formatting:

```output
info: 2020-10-06T17:55:39.0333701Z RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      CREATE TABLE "Blogs" (
          "Id" INTEGER NOT NULL CONSTRAINT "PK_Blogs" PRIMARY KEY <example-value>,
          "Name" INTEGER NOT NULL
      );
dbug: 2020-10-06T17:55:39.0333892Z RelationalEventId.TransactionCommitting[20210] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Committing transaction.
dbug: 2020-10-06T17:55:39.0351684Z RelationalEventId.TransactionCommitted[20202] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Committed transaction.
```

### Single line logging

Sometimes it is useful to get exactly one line per log message. This can be enabled by `Microsoft.EntityFrameworkCore.Diagnostics.DbContextLoggerOptions.SingleLine`. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(
        Console.WriteLine,
        LogLevel.Debug,
        DbContextLoggerOptions.DefaultWithLocalTime | DbContextLoggerOptions.SingleLine);
```

This example results in the following log formatting:

```output
info: 10/6/2020 10:52:45.723 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command) -> Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']CREATE TABLE "Blogs" (    "Id" INTEGER NOT NULL CONSTRAINT "PK_Blogs" PRIMARY KEY <example-value>,    "Name" INTEGER NOT NULL);
dbug: 10/6/2020 10:52:45.723 RelationalEventId.TransactionCommitting[20210] (Microsoft.EntityFrameworkCore.Database.Transaction) -> Committing transaction.
dbug: 10/6/2020 10:52:45.725 RelationalEventId.TransactionCommitted[20202] (Microsoft.EntityFrameworkCore.Database.Transaction) -> Committed transaction.
```

### Other content options

Other flags in `Microsoft.EntityFrameworkCore.Diagnostics.DbContextLoggerOptions` can be used to trim down the amount of metadata included in the log. This can be useful in conjunction with single-line logging. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(
        Console.WriteLine,
        LogLevel.Debug,
        DbContextLoggerOptions.UtcTime | DbContextLoggerOptions.SingleLine);
```

This example results in the following log formatting:

```output
2020-10-06T17:52:45.7320362Z -> Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']CREATE TABLE "Blogs" (    "Id" INTEGER NOT NULL CONSTRAINT "PK_Blogs" PRIMARY KEY <example-value>,    "Name" INTEGER NOT NULL);
2020-10-06T17:52:45.7320531Z -> Committing transaction.
2020-10-06T17:52:45.7339441Z -> Committed transaction.
```

## Moving from EF6

EF Core simple logging differs from `System.Data.Entity.Database.Log` in EF6 in two important ways:

* Log messages are not limited to only database interactions
* The logging must be configured at context initialization time

For the first difference, the filtering described above can be used to limit which messages are logged.

The second difference is an intentional change to improve performance by not generating log messages when they are not needed. However, it is still possible to get a similar behavior to EF6 by creating a `Log` property on your `DbContext` and then using it only when it has been set. For example:

```csharp
public Action<string> Log { get; set; }

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(s => Log?.Invoke(s));
```
