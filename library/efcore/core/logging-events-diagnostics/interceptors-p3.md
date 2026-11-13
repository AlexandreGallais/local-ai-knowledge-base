---
title: "Interceptors - EF Core (part 3 of 6)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/logging-events-diagnostics/interceptors.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Interceptors - EF Core (part 3 of 6)

### Example: Advanced command interception for caching

> **Tip:**
> You can download the advanced command interceptor sample from GitHub.

EF Core interceptors can:

* Tell EF Core to suppress executing the operation being intercepted
* Change the result of the operation reported back to EF Core

This example shows an interceptor that uses these features to behave like a primitive second-level cache. Cached query results are returned for a specific query, avoiding a database roundtrip.

> **Warning:**
> Take care when changing the EF Core default behavior in this way. EF Core may behave in unexpected ways if it gets an abnormal result that it cannot process correctly. Also, this example demonstrates interceptor concepts; it is not intended as a template for a robust second-level cache implementation.

In this example, the application frequently executes a query to obtain the most recent "daily message":

```csharp
async Task<string> GetDailyMessage(DailyMessageContext context)
    => (await context.DailyMessages.TagWith("Get_Daily_Message").OrderBy(e => e.Id).LastAsync()).Message;
```

This query is tagged so that it can be easily detected in the interceptor. The idea is to only query the database for a new message once every day. At other times the application will use a cached result. (The sample uses delay of 10 seconds in the sample to simulate a new day.)

#### Interceptor state

This interceptor is stateful: it stores the ID and message text of the most recent daily message queried, plus the time when that query was executed. Because of this state we also need a lock since the caching requires that same interceptor must be used by multiple context instances.

```csharp
private readonly object _lock = new object();
private int _id;
private string _message;
private DateTime _queriedAt;
```

#### Before execution

In the `Executing` method (i.e. before making a database call), the interceptor detects the tagged query and then checks if there is a cached result. If such a result is found, then the query is suppressed and cached results are used instead.

```csharp
public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<DbDataReader> result,
    CancellationToken cancellationToken = default)
{
    if (command.CommandText.StartsWith("-- Get_Daily_Message", StringComparison.Ordinal))
    {
        lock (_lock)
        {
            if (_message != null
                && DateTime.UtcNow < _queriedAt + new TimeSpan(0, 0, 10))
            {
                command.CommandText = "-- Get_Daily_Message: Skipping DB call; using cache.";
                result = InterceptionResult<DbDataReader>.SuppressWithResult(new CachedDailyMessageDataReader(_id, _message));
            }
        }
    }

    return new ValueTask<InterceptionResult<DbDataReader>>(result);
}
```

Notice how the code calls `Microsoft.EntityFrameworkCore.Diagnostics.InterceptionResult`1.SuppressWithResult*` and passes a replacement `System.Data.Common.DbDataReader` containing the cached data. This InterceptionResult is then returned, causing suppression of query execution. The replacement reader is instead used by EF Core as the results of the query.

This interceptor also manipulates the command text. This manipulation is not required, but improves clarity in log messages. The command text does not need to be valid SQL since the query is now not going to be executed.

#### After execution

If no cached message is available, or if it has expired, then the code above does not suppress the result. EF Core will therefore execute the query as normal. It will then return to the interceptor's `Executed` method after execution. At this point if the result is not already a cached reader, then the new message ID and string is extracted from the real reader and cached ready for the next use of this query.

```csharp
public override async ValueTask<DbDataReader> ReaderExecutedAsync(
    DbCommand command,
    CommandExecutedEventData eventData,
    DbDataReader result,
    CancellationToken cancellationToken = default)
{
    if (command.CommandText.StartsWith("-- Get_Daily_Message", StringComparison.Ordinal)
        && !(result is CachedDailyMessageDataReader))
    {
        try
        {
            await result.ReadAsync(cancellationToken);

            lock (_lock)
            {
                _id = result.GetInt32(0);
                _message = result.GetString(1);
                _queriedAt = DateTime.UtcNow;
                return new CachedDailyMessageDataReader(_id, _message);
            }
        }
        finally
        {
            await result.DisposeAsync();
        }
    }

    return result;
}
```

#### Demonstration

The caching interceptor sample contains a simple console application that queries for daily messages to test the caching:

```csharp
// 1. Initialize the database with some daily messages.
using (var context = new DailyMessageContext())
{
    await context.Database.EnsureDeletedAsync();
    await context.Database.EnsureCreatedAsync();

    context.AddRange(
        new DailyMessage { Message = "Remember: All builds are GA; no builds are RTM." },
        new DailyMessage { Message = "Keep calm and drink tea" });

    await context.SaveChangesAsync();
}

// 2. Query for the most recent daily message. It will be cached for 10 seconds.
using (var context = new DailyMessageContext())
{
    Console.WriteLine(await GetDailyMessage(context));
}

// 3. Insert a new daily message.
using (var context = new DailyMessageContext())
{
    context.Add(new DailyMessage { Message = "Free beer for unicorns" });

    await context.SaveChangesAsync();
}

// 4. Cached message is used until cache expires.
using (var context = new DailyMessageContext())
{
    Console.WriteLine(await GetDailyMessage(context));
}

// 5. Pretend it's the next day.
Thread.Sleep(10000);

// 6. Cache is expired, so the last message will not be queried again.
using (var context = new DailyMessageContext())
{
    Console.WriteLine(await GetDailyMessage(context));
}

async Task<string> GetDailyMessage(DailyMessageContext context)
    => (await context.DailyMessages.TagWith("Get_Daily_Message").OrderBy(e => e.Id).LastAsync()).Message;
```

This results in the following output:

```output
info: 10/15/2020 12:32:11.801 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      -- Get_Daily_Message

      SELECT "d"."Id", "d"."Message"
      FROM "DailyMessages" AS "d"
      ORDER BY "d"."Id" DESC
      LIMIT 1

Keep calm and drink tea

info: 10/15/2020 12:32:11.821 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[@p0='Free beer for unicorns' (Size = 22)], CommandType='Text', CommandTimeout='30']
      INSERT INTO "DailyMessages" ("Message")
      VALUES (@p0);
      SELECT "Id"
      FROM "DailyMessages"
      WHERE changes() = 1 AND "rowid" = last_insert_rowid();

info: 10/15/2020 12:32:11.826 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      -- Get_Daily_Message: Skipping DB call; using cache.

Keep calm and drink tea

info: 10/15/2020 12:32:21.833 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      -- Get_Daily_Message

      SELECT "d"."Id", "d"."Message"
      FROM "DailyMessages" AS "d"
      ORDER BY "d"."Id" DESC
      LIMIT 1

Free beer for unicorns
```

Notice from the log output that the application continues to use the cached message until the timeout expires, at which point the database is queried again for any new message.

### Example: Logging SQL Server query statistics

This example shows two interceptors that work together to send SQL Server query statistics to the application log. To generate the statistics, we need an `Microsoft.EntityFrameworkCore.Diagnostics.IDbCommandInterceptor` to do two things.

First, the interceptor will prefix commands with `SET STATISTICS IO ON`, which tells SQL Server to send statistics to the client after a result set has been consumed:

```csharp
public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<DbDataReader> result,
    CancellationToken cancellationToken = default)
{
    command.CommandText = "SET STATISTICS IO ON;" + Environment.NewLine + command.CommandText;

    return new(result);
}
```

Second, the interceptor will implement the `DataReaderClosingAsync` method, which is called after the `System.Data.Common.DbDataReader` has finished consuming results, but _before_ it has been closed. When SQL Server is sending statistics, it puts them in a second result on the reader, so at this point the interceptor reads that result by calling `NextResultAsync` which populates statistics onto the connection.

```csharp
public override async ValueTask<InterceptionResult> DataReaderClosingAsync(
    DbCommand command,
    DataReaderClosingEventData eventData,
    InterceptionResult result)
{
    await eventData.DataReader.NextResultAsync();

    return result;
}
```

The second interceptor is needed to obtain the statistics from the connection and write them out to the application's logger. For this, we'll use an `Microsoft.EntityFrameworkCore.Diagnostics.IDbConnectionInterceptor`, implementing the `ConnectionCreated` method. `ConnectionCreated` is called immediately after EF Core has created a connection, and so can be used to perform additional configuration of that connection. In this case, the interceptor obtains an `ILogger` and then hooks into the `Microsoft.Data.SqlClient.SqlConnection.InfoMessage` event to log the messages.

```csharp
public override DbConnection ConnectionCreated(ConnectionCreatedEventData eventData, DbConnection result)
{
    var logger = eventData.Context!.GetService<ILoggerFactory>().CreateLogger("InfoMessageLogger");
    ((SqlConnection)eventData.Connection).InfoMessage += (_, args) =>
    {
        logger.LogInformation(1, args.Message);
    };
    return result;
}
```

> **Important:**
> The `ConnectionCreating` and `ConnectionCreated` methods are only called when EF Core creates a `DbConnection`. They will not be called if the application creates the `DbConnection` and passes it to EF Core.

### Filtering by command source

The `Microsoft.EntityFrameworkCore.Diagnostics.CommandEventData` supplied to diagnostics sources and interceptors contains a `Microsoft.EntityFrameworkCore.Diagnostics.CommandSource` property indicating which part of EF was responsible for creating the command. This can be used as a filter in the interceptor. For example, we may want an interceptor that only applies to commands that come from `SaveChanges`:

```csharp
public class CommandSourceInterceptor : DbCommandInterceptor
{
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result)
    {
        if (eventData.CommandSource == CommandSource.SaveChanges)
        {
            Console.WriteLine($"Saving changes for {eventData.Context!.GetType().Name}:");
            Console.WriteLine();
            Console.WriteLine(command.CommandText);
        }

        return result;
    }
}
```
