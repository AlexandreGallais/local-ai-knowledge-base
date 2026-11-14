---
title: "Using diagnostic listeners - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/logging-events-diagnostics/diagnostic-listeners.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Using Diagnostic Listeners in EF Core

> **Tip:**
> You can download this article's sample from GitHub.

Diagnostic listeners allow listening for any EF Core event that occurs in the current .NET process. The `System.Diagnostics.DiagnosticListener` class is a part of a common mechanism across .NET for obtaining diagnostic information from running applications.

Diagnostic listeners are not suitable for getting events from a single DbContext instance. EF Core interceptors provide access to the same events with per-context registration.

Diagnostic listeners are not designed for logging. Consider using simple logging or Microsoft.Extensions.Logging for logging.

## Example: Observing diagnostic events

Resolving EF Core events is a two-step process. First, an observer for `DiagnosticListener` itself must be created:

```csharp
public class DiagnosticObserver : IObserver<DiagnosticListener>
{
    public void OnCompleted()
        => throw new NotImplementedException();

    public void OnError(Exception error)
        => throw new NotImplementedException();

    public void OnNext(DiagnosticListener value)
    {
        if (value.Name == DbLoggerCategory.Name) // "Microsoft.EntityFrameworkCore"
        {
            value.Subscribe(new KeyValueObserver());
        }
    }
}
```

The `OnNext` method looks for the DiagnosticListener that comes from EF Core. This listener has the name "Microsoft.EntityFrameworkCore", which can be obtained from the `Microsoft.EntityFrameworkCore.DbLoggerCategory` class as shown.

This observer must then be registered globally, for example in the application's `Main` method:

```csharp
DiagnosticListener.AllListeners.Subscribe(new DiagnosticObserver());
```

Second, once the EF Core DiagnosticListener is found, a new key-value observer is created to subscribe to the actual EF Core events. For example:

```csharp
public class KeyValueObserver : IObserver<KeyValuePair<string, object>>
{
    public void OnCompleted()
        => throw new NotImplementedException();

    public void OnError(Exception error)
        => throw new NotImplementedException();

    public void OnNext(KeyValuePair<string, object> value)
    {
        if (value.Key == CoreEventId.ContextInitialized.Name)
        {
            var payload = (ContextInitializedEventData)value.Value;
            Console.WriteLine($"EF is initializing {payload.Context.GetType().Name} ");
        }

        if (value.Key == RelationalEventId.ConnectionOpening.Name)
        {
            var payload = (ConnectionEventData)value.Value;
            Console.WriteLine($"EF is opening a connection to {payload.Connection.ConnectionString} ");
        }
    }
}
```

The `OnNext` method is this time called with a key/value pair for each EF Core event. The key is the name of the event, which can be obtained from one of:

* `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId` for events common to all EF Core database providers
* `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId` for events common to all relational database providers
* A similar class for events specific to the current database provider. For example, `Microsoft.EntityFrameworkCore.Diagnostics.SqlServerEventId` for the SQL Server provider.

The value of the key/value pair is a payload type specific to the event. The type of payload to expect is documented on each event defined in these event classes.

For example, the code above handles the `Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.ContextInitialized` and the `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.ConnectionOpening` events. For the first of these, the payload is `Microsoft.EntityFrameworkCore.Diagnostics.ContextInitializedEventData`. For the second, it is `Microsoft.EntityFrameworkCore.Diagnostics.ConnectionEventData`.

> **Tip:**
> ToString is overridden in every EF Core event data class to generate the equivalent log message for the event. For example, calling `ContextInitializedEventData.ToString` generates "Entity Framework Core 5.0.0 initialized 'BlogsContext' using provider 'Microsoft.EntityFrameworkCore.Sqlite' with options: None".

The sample contains a simple console application that makes changes to the blogging database and prints out the diagnostic events encountered.

```csharp
public static async Task Main()
{
    DiagnosticListener.AllListeners.Subscribe(new DiagnosticObserver());
```

The output from this code shows the events detected:

```output
EF is initializing BlogsContext
EF is opening a connection to Data Source=blogs.db;Mode=ReadOnly
EF is opening a connection to DataSource=blogs.db
EF is opening a connection to Data Source=blogs.db;Mode=ReadOnly
EF is opening a connection to DataSource=blogs.db
EF is opening a connection to DataSource=blogs.db
EF is opening a connection to DataSource=blogs.db
EF is initializing BlogsContext
EF is opening a connection to DataSource=blogs.db
EF is opening a connection to DataSource=blogs.db
```
