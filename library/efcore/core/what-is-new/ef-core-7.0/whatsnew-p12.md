---
title: "What's New in EF Core 7.0 (part 12 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 12 of 16)

## New and improved interceptors and events

EF Core interceptors enable interception, modification, and/or suppression of EF Core operations. EF Core also includes traditional .NET events and logging.

EF7 includes the following enhancements to interceptors:

- Interception for creating and populating new entity instances (aka "materialization")
- Interception to modify the LINQ expression tree before a query is compiled
- Interception for optimistic concurrency handling (`DbUpdateConcurrencyException`)
- Interception for connections _before_ checking if the connection string has been set
- Interception for when EF Core has finished consuming a result set, but before that result set is closed
- Interception for creation of a `DbConnection` by EF Core
- Interception for `DbCommand` after it has been initialized

In addition, EF7 includes new traditional .NET events for:

- When an entity is about to be tracked or change state, but before it is actually tracked or change state
- Before and after EF Core detects changes to entities and properties (aka `DetectChanges` interception)

The following sections provide brief summaries of these new interception capabilities. For detailed documentation and complete code samples, see Interceptors.

### Materialization interception

The new `Microsoft.EntityFrameworkCore.Diagnostics.IMaterializationInterceptor` supports interception before and after an entity instance is created, and before and after properties of that instance are initialized. The interceptor can change or replace the entity instance at each point. This allows setting unmapped properties, using a factory to create instances, injecting services into entities, and more.

For example, an interceptor can set a `Retrieved` timestamp on entities as they are loaded from the database:

```csharp
public class SetRetrievedInterceptor : IMaterializationInterceptor
{
    public object InitializedInstance(MaterializationInterceptionData materializationData, object instance)
    {
        if (instance is IHasRetrieved hasRetrieved)
        {
            hasRetrieved.Retrieved = DateTime.UtcNow;
        }

        return instance;
    }
}
```

For more information and examples, including injecting services into entities, see Materialization interception.

### LINQ expression tree interception

The new `Microsoft.EntityFrameworkCore.Diagnostics.IQueryExpressionInterceptor` allows the LINQ expression tree for a query to be intercepted and modified before it is compiled. This can be used to dynamically add secondary ordering, apply filters, or make other modifications to queries across the application.

For example, the following interceptor replaces the expression tree before it is compiled:

```csharp
public class KeyOrderingExpressionInterceptor : IQueryExpressionInterceptor
{
    public Expression QueryCompilationStarting(Expression queryExpression, QueryExpressionEventData eventData)
        => new KeyOrderingExpressionVisitor().Visit(queryExpression);

    // ExpressionVisitor that modifies the tree...
}
```

For more information and examples, see Query expression interception.

### Optimistic concurrency interception

`Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor` now has `ThrowingConcurrencyException` and `ThrowingConcurrencyExceptionAsync` methods that are called before a `Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException` is thrown. These interception points allow the exception to be suppressed, possibly coupled with async database changes to resolve the violation.

For example, if two requests try to delete the same entity, the second delete fails because the row no longer exists. An interceptor can suppress this, since the end result is the same:

```csharp
public class SuppressDeleteConcurrencyInterceptor : ISaveChangesInterceptor
{
    public InterceptionResult ThrowingConcurrencyException(
        ConcurrencyExceptionEventData eventData,
        InterceptionResult result)
    {
        if (eventData.Entries.All(e => e.State == EntityState.Deleted))
        {
            return InterceptionResult.Suppress();
        }

        return result;
    }
}
```

For more information and examples, see Optimistic concurrency interception.

### Lazy initialization of a connection string

`Microsoft.EntityFrameworkCore.Diagnostics.IDbConnectionInterceptor` can be used to dynamically configure connection strings at the time the connection is first used, for example to support per-tenant connection strings in a multi-tenant system. The `ConnectionOpeningAsync` method can perform an async operation to obtain the connection string, find an access token, and so on.

For example, the following interceptor sets the connection string the first time the connection is opened:

```csharp
public class ConnectionStringInitializationInterceptor : DbConnectionInterceptor
{
    private readonly ITenantConnectionStringFactory _connectionStringFactory;

    public ConnectionStringInitializationInterceptor(ITenantConnectionStringFactory connectionStringFactory)
    {
        _connectionStringFactory = connectionStringFactory;
    }

    public override async ValueTask<InterceptionResult> ConnectionOpeningAsync(
        DbConnection connection, ConnectionEventData eventData, InterceptionResult result,
        CancellationToken cancellationToken = new())
    {
        if (string.IsNullOrEmpty(connection.ConnectionString))
        {
            connection.ConnectionString =
                (await _connectionStringFactory.GetConnectionStringAsync(cancellationToken));
        }

        return result;
    }
}
```

For more information and examples, see Lazy initialization of a connection string.

### Logging SQL Server query statistics

Two interceptors can work together to send SQL Server query statistics to the application log. An `Microsoft.EntityFrameworkCore.Diagnostics.IDbCommandInterceptor` prefixes commands with `SET STATISTICS IO ON` and uses the new `DataReaderClosingAsync` method to read statistics results. An `Microsoft.EntityFrameworkCore.Diagnostics.IDbConnectionInterceptor` uses the new `ConnectionCreated` method to hook into the `Microsoft.Data.SqlClient.SqlConnection.InfoMessage` event.

For example, the command interceptor prefixes the statistics directive:

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

For more information and examples, see Logging SQL Server query statistics.
