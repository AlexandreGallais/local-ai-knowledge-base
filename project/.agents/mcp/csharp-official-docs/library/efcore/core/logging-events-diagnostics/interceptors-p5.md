---
title: "Interceptors - EF Core (part 5 of 6)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/logging-events-diagnostics/interceptors.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Interceptors - EF Core (part 5 of 6)

### Example: Optimistic concurrency interception

EF Core supports the optimistic concurrency pattern by checking that the number of rows actually affected by an update or delete is the same as the number of rows expected to be affected. This is often coupled with a concurrency token; that is, a column value that will only match its expected value if the row has not been updated since the expected value was read.

EF signals a violation of optimistic concurrency by throwing a `Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException`. `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor` has methods `ThrowingConcurrencyException` and `ThrowingConcurrencyExceptionAsync` that are called before the `DbUpdateConcurrencyException` is thrown. These interception points allow the exception to be suppressed, possibly coupled with async database changes to resolve the violation.

For example, if two requests attempt to delete the same entity at almost the same time, then the second delete may fail because the row in the database no longer exists. This may be fine--the end result is that the entity has been deleted anyway. The following interceptor demonstrates how this can be done:

```csharp
public class SuppressDeleteConcurrencyInterceptor : ISaveChangesInterceptor
{
    public InterceptionResult ThrowingConcurrencyException(
        ConcurrencyExceptionEventData eventData,
        InterceptionResult result)
    {
        if (eventData.Entries.All(e => e.State == EntityState.Deleted))
        {
            Console.WriteLine("Suppressing Concurrency violation for command:");
            Console.WriteLine(((RelationalConcurrencyExceptionEventData)eventData).Command.CommandText);

            return InterceptionResult.Suppress();
        }

        return result;
    }

    public ValueTask<InterceptionResult> ThrowingConcurrencyExceptionAsync(
        ConcurrencyExceptionEventData eventData,
        InterceptionResult result,
        CancellationToken <example-value> = default)
        => new(ThrowingConcurrencyException(eventData, result));
}
```

There are several things worth noting about this interceptor:

* Both the synchronous and asynchronous interception methods are implemented. This is important if the application may call either `SaveChanges` or `SaveChangesAsync`. However, if all application code is async, then only `ThrowingConcurrencyExceptionAsync` needs to be implemented. Likewise, if the application never uses asynchronous database methods, then only `ThrowingConcurrencyException` needs to be implemented. This is generally true for all interceptors with sync and async methods.
* The interceptor has access to `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry` objects for the entities being saved. In this case, this is used to check whether or not the concurrency violation is happening for a delete operation.
* If the application is using a relational database provider, then the `Microsoft.EntityFrameworkCore.Diagnostics.ConcurrencyExceptionEventData` object can be cast to a `Microsoft.EntityFrameworkCore.Diagnostics.RelationalConcurrencyExceptionEventData` object. This provides additional, relational-specific information about the database operation being performed. In this case, the relational command text is printed to the console.
* Returning `InterceptionResult.Suppress()` tells EF Core to suppress the action it was about to take--in this case, throwing the `DbUpdateConcurrencyException`. This ability to _change the behavior of EF Core_, rather than just observing what EF Core is doing, is one of the most powerful features of interceptors.

## Materialization interception

`Microsoft.EntityFrameworkCore.Diagnostics.IMaterializationInterceptor` supports interception before and after an entity instance is created, and before and after properties of that instance are initialized. The interceptor can change or replace the entity instance at each point. This allows:

* Setting unmapped properties or calling methods needed for validation, computed values, or flags.
* Using a factory to create instances.
* Creating a different entity instance than EF would normally create, such as an instance from a cache, or of a proxy type.
* Injecting services into an entity instance.

> **Note:**
> `IMaterializationInterceptor` is a singleton interceptor, meaning a single instance is shared between all `DbContext` instances.

### Example: Simple actions on entity creation

Imagine that we want to keep track of the time that an entity was retrieved from the database, perhaps so it can be displayed to a user editing the data. To accomplish this, we first define an interface:

```csharp
public interface IHasRetrieved
{
    DateTime Retrieved { get; set; }
}
```

Using an interface is common with interceptors since it allows the same interceptor to work with many different entity types. For example:

```csharp
public class Customer : IHasRetrieved
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? PhoneNumber { get; set; }

    [NotMapped]
    public DateTime Retrieved { get; set; }
}
```

Notice that the `[NotMapped]` attribute is used to indicate that this property is used only while working with the entity, and should not be persisted to the database.

The interceptor must then implement the appropriate method from `IMaterializationInterceptor` and set the time retrieved:

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

An instance of this interceptor is registered when configuring the `DbContext`:

```csharp
public class CustomerContext : DbContext
{
    private static readonly SetRetrievedInterceptor _setRetrievedInterceptor = new();
    
    public DbSet<Customer> Customers => Set<Customer>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        => optionsBuilder
            .AddInterceptors(_setRetrievedInterceptor)
            .UseSqlite("Data Source = customers.db");
}
```

> **Tip:**
> This interceptor is stateless, which is common, so a single instance is created and shared between all `DbContext` instances.

Now, whenever a `Customer` is queried from the database, the `Retrieved` property will be set automatically. For example:

```csharp
await using (var context = new CustomerContext())
{
    var customer = await context.Customers.SingleAsync(e => e.Name == "Alice");
    Console.WriteLine($"Customer '{customer.Name}' was retrieved at '{customer.Retrieved.ToLocalTime()}'");
}
```

Produces output:

```output
Customer 'Alice' was retrieved at '9/22/2022 5:25:54 PM'
```

### Example: Injecting services into entities

EF Core already has built-in support for injecting some special services into context instances; for example, see Lazy loading without proxies, which works by injecting the `ILazyLoader` service.

An `IMaterializationInterceptor` can be used to generalize this to any service. The following example shows how to inject an `Microsoft.Extensions.Logging.ILogger` into entities such that they can perform their own logging.

> **Note:**
> Injecting services into entities couples those entity types to the injected services, which some people consider to be an anti-pattern.

As before, an interface is used to define what can be done.

```csharp
public interface IHasLogger
{
    ILogger? Logger { get; set; }
}
```

And entity types that will log must implement this interface. For example:

```csharp
public class Customer : IHasLogger
{
    private string? _phoneNumber;

    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public string? PhoneNumber
    {
        get => _phoneNumber;
        set
        {
            Logger?.LogInformation(1, $"Updating phone number for '{Name}' from '{_phoneNumber}' to '{value}'.");

            _phoneNumber = value;
        }
    }

    [NotMapped]
    public ILogger? Logger { get; set; }
}
```

This time, the interceptor must implement `IMaterializationInterceptor.InitializedInstance`, which is called after every entity instance has been created and its property values have been initialized. The interceptor obtains an `ILogger` from the context and initializes `IHasLogger.Logger` with it:

```csharp
public class LoggerInjectionInterceptor : IMaterializationInterceptor
{
    private ILogger? _logger;

    public object InitializedInstance(MaterializationInterceptionData materializationData, object instance)
    {
        if (instance is IHasLogger hasLogger)
        {
            _logger ??= materializationData.Context.GetService<ILoggerFactory>().CreateLogger("CustomersLogger");
            hasLogger.Logger = _logger;
        }

        return instance;
    }
}
```

This time a new instance of the interceptor is used for each `DbContext` instance, since the `ILogger` obtained can change per `DbContext` instance, and the `ILogger` is cached on the interceptor:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.AddInterceptors(new LoggerInjectionInterceptor());
```

Now, whenever the `Customer.PhoneNumber` is changed, this change will be logged to the application's log. For example:

```output
info: CustomersLogger[1]
      Updating phone number for 'Alice' from '+1 515 555 0123' to '+1 515 555 0125'.
```
