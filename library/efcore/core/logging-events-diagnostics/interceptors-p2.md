---
title: "Interceptors - EF Core (part 2 of 6)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/logging-events-diagnostics/interceptors.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Interceptors - EF Core (part 2 of 6)

## Database interception

> **Note:**
> Database interception is only available for relational database providers.

Low-level database interception is split into the three interfaces shown in the following table.

| Interceptor                                                            | Database operations intercepted
|:-----------------------------------------------------------------------|-------------------------------------------------
| `Microsoft.EntityFrameworkCore.Diagnostics.IDbCommandInterceptor` | Creating commands</br>Executing commands</br>Command failures</br>Disposing the command's DbDataReader
| `Microsoft.EntityFrameworkCore.Diagnostics.IDbConnectionInterceptor` | Opening and closing connections</br>Creating connections</br>Connection failures
| `Microsoft.EntityFrameworkCore.Diagnostics.IDbTransactionInterceptor` | Creating transactions</br>Using existing transactions</br>Committing transactions</br>Rolling back transactions</br>Creating and using savepoints</br>Transaction failures

The base classes `Microsoft.EntityFrameworkCore.Diagnostics.DbCommandInterceptor`, `Microsoft.EntityFrameworkCore.Diagnostics.DbConnectionInterceptor`, and `Microsoft.EntityFrameworkCore.Diagnostics.DbTransactionInterceptor` contain no-op implementations for each method in the corresponding interface. Use the base classes to avoid the need to implement unused interception methods.

The methods on each interceptor type come in pairs, with the first being called before the database operation is started, and the second after the operation has completed. For example, `Microsoft.EntityFrameworkCore.Diagnostics.DbCommandInterceptor.ReaderExecuting*` is called before a query is executed, and `Microsoft.EntityFrameworkCore.Diagnostics.DbCommandInterceptor.ReaderExecuted*` is called after query has been sent to the database.

Each pair of methods have both sync and async variations. This allows for asynchronous I/O, such as requesting an access token, to happen as part of intercepting an async database operation.

### Example: Command interception to add query hints

> **Tip:**
> You can download the command interceptor sample from GitHub.

An `Microsoft.EntityFrameworkCore.Diagnostics.IDbCommandInterceptor` can be used to modify SQL before it is sent to the database. This example shows how to modify the SQL to include a query hint.

Often, the trickiest part of the interception is determining when the command corresponds to the query that needs to be modified. Parsing the SQL is one option, but tends to be fragile. Another option is to use EF Core query tags to tag each query that should be modified. For example:

```csharp
var blogs1 = await context.Blogs.TagWith("Use hint: robust plan").ToListAsync();
```

This tag can then be detected in the interceptor as it will always be included as a comment in the first line of the command text. On detecting the tag, the query SQL is modified to add the appropriate hint:

```csharp
public class TaggedQueryCommandInterceptor : DbCommandInterceptor
{
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result)
    {
        ManipulateCommand(command);

        return result;
    }

    public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result,
        CancellationToken cancellationToken = default)
    {
        ManipulateCommand(command);

        return new ValueTask<InterceptionResult<DbDataReader>>(result);
    }

    private static void ManipulateCommand(DbCommand command)
    {
        if (command.CommandText.StartsWith("-- Use hint: robust plan", StringComparison.Ordinal))
        {
            command.CommandText += " OPTION (ROBUST PLAN)";
        }
    }
}
```

Notice:

* The interceptor inherits from `Microsoft.EntityFrameworkCore.Diagnostics.DbCommandInterceptor` to avoid having to implement every method in the interceptor interface.
* The interceptor implements both sync and async methods. This ensures that the same query hint is applied to sync and async queries.
* The interceptor implements the `Executing` methods which are called by EF Core with the generated SQL _before_ it is sent to the database. Contrast this with the `Executed` methods, which are called after the database call has returned.

Running the code in this example generates the following when a query is tagged:

```sql
-- Use hint: robust plan

SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b] OPTION (ROBUST PLAN)
```

On the other hand, when a query is not tagged, then it is sent to the database unmodified:

```sql
SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
```

### Example: Connection interception for SQL Azure authentication using AAD

> **Tip:**
> You can download the connection interceptor sample from GitHub.

An `Microsoft.EntityFrameworkCore.Diagnostics.IDbConnectionInterceptor` can be used to manipulate the `System.Data.Common.DbConnection` before it is used to connect to the database. This can be used to obtain an Azure Active Directory (AAD) access token. For example:

```csharp
public class AadAuthenticationInterceptor : DbConnectionInterceptor
{
    public override InterceptionResult ConnectionOpening(
        DbConnection connection,
        ConnectionEventData eventData,
        InterceptionResult result)
        => throw new InvalidOperationException("Open connections asynchronously when using AAD authentication.");

    public override async ValueTask<InterceptionResult> ConnectionOpeningAsync(
        DbConnection connection,
        ConnectionEventData eventData,
        InterceptionResult result,
        CancellationToken cancellationToken = default)
    {
        var sqlConnection = (SqlConnection)connection;

        var provider = new AzureServiceTokenProvider();
        // Note: in some situations the access token may not be cached automatically the Azure Token Provider.
        // Depending on the kind of token requested, you may need to implement your own caching here.
        sqlConnection.AccessToken = await provider.GetAccessTokenAsync("https://database.windows.net/", null, cancellationToken);

        return result;
    }
}
```

> **Tip:**
> Microsoft.Data.SqlClient now supports AAD authentication via connection string. See `Microsoft.Data.SqlClient.SqlAuthenticationMethod` for more information.

> **Warning:**
> Notice that the interceptor throws if a sync call is made to open the connection. This is because there is no non-async method to obtain the access token and there is no universal and simple way to call an async method from non-async context without risking deadlock.

> **Warning:**
> in some situations the access token may not be cached automatically the Azure Token Provider. Depending on the kind of token requested, you may need to implement your own caching here.

### Example: Lazy initialization of a connection string

Connection strings are often static assets read from a configuration file. These can easily be passed to `UseSqlServer` or similar when configuring a `DbContext`. However, sometimes the connection string can change for each context instance. For example, each tenant in a multi-tenant system may have a different connection string.

An `Microsoft.EntityFrameworkCore.Diagnostics.IDbConnectionInterceptor` can be used to handle dynamic connections and connection strings. This starts with the ability to configure the `DbContext` without any connection string. For example:

```csharp
services.AddDbContext<CustomerContext>(
    b => b.UseSqlServer());
```

One of the `IDbConnectionInterceptor` methods can then be implemented to configure the connection before it is used. `ConnectionOpeningAsync` is a good choice, since it can perform an async operation to obtain the connection string, find an access token, and so on. For example, imagine a service scoped to the current request that understands the current tenant:

```csharp
services.AddScoped<ITenantConnectionStringFactory, TestTenantConnectionStringFactory>();
```

> **Warning:**
> Performing an asynchronous lookup for a connection string, access token, or similar every time it is needed can be very slow. Consider caching these things and only refreshing the cached string or token periodically. For example, access tokens can often be used for a significant period of time before needing to be refreshed.

This can be injected into each `DbContext` instance using constructor injection:

```csharp
public class CustomerContext : DbContext
{
    private readonly ITenantConnectionStringFactory _connectionStringFactory;

    public CustomerContext(
        DbContextOptions<CustomerContext> options,
        ITenantConnectionStringFactory connectionStringFactory)
        : base(options)
    {
        _connectionStringFactory = connectionStringFactory;
    }

    // ...
}
```

This service is then used when constructing the interceptor implementation for the context:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.AddInterceptors(
        new ConnectionStringInitializationInterceptor(_connectionStringFactory));
```

Finally, the interceptor uses this service to obtain the connection string asynchronously and set it the first time that the connection is used:

```csharp
public class ConnectionStringInitializationInterceptor : DbConnectionInterceptor
{
    private readonly ITenantConnectionStringFactory _connectionStringFactory;

    public ConnectionStringInitializationInterceptor(ITenantConnectionStringFactory connectionStringFactory)
    {
        _connectionStringFactory = connectionStringFactory;
    }

    public override InterceptionResult ConnectionOpening(
        DbConnection connection,
        ConnectionEventData eventData,
        InterceptionResult result)
        => throw new NotSupportedException("Synchronous connections not supported.");

    public override async ValueTask<InterceptionResult> ConnectionOpeningAsync(
        DbConnection connection, ConnectionEventData eventData, InterceptionResult result,
        CancellationToken cancellationToken = new())
    {
        if (string.IsNullOrEmpty(connection.ConnectionString))
        {
            connection.ConnectionString = (await _connectionStringFactory.GetConnectionStringAsync(cancellationToken));
        }

        return result;
    }
}
```

> **Note:**
> The connection string is only obtained the first time that a connection is used. After that, the connection string stored on the `DbConnection` will be used without looking up a new connection string.

> **Tip:**
> This interceptor overrides the non-async `ConnectionOpening` method to throw since the service to get the connection string must be called from an async code path.
