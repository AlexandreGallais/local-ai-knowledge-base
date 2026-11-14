---
title: "Simple logging - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/logging-events-diagnostics/simple-logging.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Simple Logging

> **Tip:**
> You can download this article's sample from GitHub.

Entity Framework Core (EF Core) simple logging can be used to easily obtain logs while developing and debugging applications. This form of logging requires minimal configuration and no additional NuGet packages.

> **Tip:**
> EF Core also integrates with Microsoft.Extensions.Logging, which requires more configuration, but is often more suitable for logging in production applications.

## Configuration

EF Core logs can be accessed from any type of application through the use of `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.LogTo*` when configuring a DbContext instance. This configuration is commonly done in an override of `Microsoft.EntityFrameworkCore.DbContext.OnConfiguring*`. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(Console.WriteLine);
```

Alternately, `LogTo` can be called as part of `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*` or when creating a `Microsoft.EntityFrameworkCore.DbContextOptions` instance to pass to the `DbContext` constructor.

> **Tip:**
> OnConfiguring is still called when AddDbContext is used or a DbContextOptions instance is passed to the DbContext constructor. This makes it the ideal place to apply context configuration regardless of how the DbContext is constructed.

## Directing the logs

### Logging to the console

`LogTo` requires an `System.Action`1` delegate that accepts a string. EF Core will call this delegate with a string for each log message generated. It is then up to the delegate to do something with the given message.

The `System.Console.WriteLine*` method is often used for this delegate, as shown above. This results in each log message being written to the console.

### Logging to the debug window

`System.Diagnostics.Debug.WriteLine*` can be used to send output to the Debug window in Visual Studio or other IDEs. Lambda syntax must be used in this case because the `Debug` class is compiled out of release builds. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(message => Debug.WriteLine(message));
```

### Logging to a file

Writing to a file requires creating a `System.IO.StreamWriter` or similar for the file. The `System.IO.StreamWriter.WriteLine*` method can then be used as in the other examples above. Remember to ensure the file is closed cleanly by disposing the writer when the context is disposed. For example:

```csharp
private readonly StreamWriter _logStream = new StreamWriter("mylog.txt", append: true);

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(_logStream.WriteLine);

public override void Dispose()
{
    base.Dispose();
    _logStream.Dispose();
}

public override async ValueTask DisposeAsync()
{
    await base.DisposeAsync();
    await _logStream.DisposeAsync();
}
```

> **Tip:**
> Consider using Microsoft.Extensions.Logging for logging to files in production applications.

## Getting detailed messages

### Sensitive data

By default, EF Core will not include the values of any data in exception messages. This is because such data may be confidential, and could be revealed in production use if an exception is not handled.

However, knowing data values, especially for keys, can be very helpful when debugging. This can be enabled in EF Core by calling `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging`. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .LogTo(Console.WriteLine)
        .EnableSensitiveDataLogging();
```

### Detailed query exceptions

For performance reasons, EF Core does not wrap each call to read a value from the database provider in a try-catch block. However, this sometimes results in exceptions that are hard to diagnose, especially when the database returns a NULL when not allowed by the model.

Turning on `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableDetailedErrors*` will cause EF to introduce these try-catch blocks and thereby provide more detailed errors. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .LogTo(Console.WriteLine)
        .EnableDetailedErrors();
```

## Filtering

### Log levels

Every EF Core log message is assigned to a level defined by the `Microsoft.Extensions.Logging.LogLevel` enum. By default, EF Core simple logging includes every message at `Debug` level or above. `LogTo` can be passed a higher minimum level to filter out some messages. For example, passing `Information` results in a minimal set of logs limited to database access and some housekeeping messages.

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
```

### Specific messages

Every log message is assigned an `Microsoft.Extensions.Logging.EventId`. These IDs can be accessed from the `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId` class or the `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId` class for relational-specific messages. A database provider may also have provider-specific IDs in a similar class. For example, `Microsoft.EntityFrameworkCore.Diagnostics.SqlServerEventId` for the SQL Server provider.

`LogTo` can be configured to only log the messages associated with one or more event IDs. For example, to log only messages for the context being initialized or disposed:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .LogTo(Console.WriteLine, new[] { CoreEventId.ContextDisposed, CoreEventId.ContextInitialized });
```

### Message categories

Every log message is assigned to a named hierarchical logger category. The categories are:

| Category                                             | Messages
|:-----------------------------------------------------|-------------------------------------------------
| Microsoft.EntityFrameworkCore                        | All EF Core messages
| Microsoft.EntityFrameworkCore.Database               | All database interactions
| Microsoft.EntityFrameworkCore.Database.Connection    | Uses of a database connection
| Microsoft.EntityFrameworkCore.Database.Command       | Uses of a database command
| Microsoft.EntityFrameworkCore.Database.Transaction   | Uses of a database transaction
| Microsoft.EntityFrameworkCore.Update                 | Saving entities, excluding database interactions
| Microsoft.EntityFrameworkCore.Model                  | All model and metadata interactions
| Microsoft.EntityFrameworkCore.Model.Validation       | Model validation
| Microsoft.EntityFrameworkCore.Query                  | Queries, excluding database interactions
| Microsoft.EntityFrameworkCore.Infrastructure         | General events, such as context creation
| Microsoft.EntityFrameworkCore.Scaffolding            | Database reverse engineering
| Microsoft.EntityFrameworkCore.Migrations             | Migrations
| Microsoft.EntityFrameworkCore.ChangeTracking         | Change tracking interactions

`LogTo` can be configured to only log the messages from one or more categories. For example, to log only database interactions:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Name });
```

Notice that the `Microsoft.EntityFrameworkCore.DbLoggerCategory` class provides a hierarchical API for finding a category and avoids the need to hard-code strings.

Since categories are hierarchical, this example using the `Database` category will include all messages for the subcategories `Database.Connection`, `Database.Command`, and `Database.Transaction`.

### Custom filters

`LogTo` allows a custom filter to be used for cases where none of the filtering options above are sufficient. For example, to log any message at level `Information` or above, as well as messages for opening and closing a connection:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .LogTo(
            Console.WriteLine,
            (eventId, logLevel) => logLevel >= LogLevel.Information
                                   || eventId == RelationalEventId.ConnectionOpened
                                   || eventId == RelationalEventId.ConnectionClosed);
```

> **Tip:**
> Filtering using custom filters or using any of the other options shown here is more efficient than filtering in the `LogTo` delegate. This is because if the filter determines the message should not be logged, then the log message is not even created.

## Configuration for specific messages

The EF Core `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.ConfigureWarnings*` API allows applications to change what happens when a specific event is encountered. This can be used to:

* Change the log level at which the event is logged
* Skip logging the event altogether
* Throw an exception when the event occurs

### Changing the log level for an event

The previous example used a custom filter to log every message at `LogLevel.Information` as well as two events defined for `LogLevel.Debug`. The same can be achieved by changing the log level of the two `Debug` events to `Information`:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .ConfigureWarnings(
            b => b.Log(
                (RelationalEventId.ConnectionOpened, LogLevel.Information),
                (RelationalEventId.ConnectionClosed, LogLevel.Information)))
        .LogTo(Console.WriteLine, LogLevel.Information);
```

### Suppress logging an event

In a similar way, an individual event can be suppressed from logging. This is particularly useful for ignoring a warning that has been reviewed and understood. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .ConfigureWarnings(b => b.Ignore(CoreEventId.DetachedLazyLoadingWarning))
        .LogTo(Console.WriteLine);
```

### Throw for an event

Finally, EF Core can be configured to throw for a given event. This is particularly useful for changing a warning into an error. (Indeed, this was the original purpose of `ConfigureWarnings` method, hence the name.) For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .ConfigureWarnings(b => b.Throw(RelationalEventId.MultipleCollectionIncludeWarning))
        .LogTo(Console.WriteLine);
```
