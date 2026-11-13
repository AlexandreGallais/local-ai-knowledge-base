---
title: "Interceptors - EF Core (part 4 of 6)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/logging-events-diagnostics/interceptors.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Interceptors - EF Core (part 4 of 6)

## SaveChanges interception

> **Tip:**
> You can download the SaveChanges interceptor sample from GitHub.

`Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` and `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*` interception points are defined by the `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor` interface. As for other interceptors, the `Microsoft.EntityFrameworkCore.Diagnostics.SaveChangesInterceptor` base class with no-op methods is provided as a convenience.

> **Tip:**
> Interceptors are powerful. However, in many cases it may be easier to override the SaveChanges method or use the .NET events for SaveChanges exposed on DbContext.

### Example: SaveChanges interception for auditing

SaveChanges can be intercepted to create an independent audit record of the changes made.

> **Note:**
> This is not intended to be a robust auditing solution. Rather it is a simplistic example used to demonstrate the features of interception.

#### The application context

The sample for auditing uses a simple DbContext with blogs and posts.

```csharp
public class BlogsContext : DbContext
{
    private readonly AuditingInterceptor _auditingInterceptor = new AuditingInterceptor("DataSource=audit.db");

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .AddInterceptors(_auditingInterceptor)
            .UseSqlite("DataSource=blogs.db");

    public DbSet<Blog> Blogs { get; set; }
}

public class Blog
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }

    public Blog Blog { get; set; }
}
```

Notice that a new instance of the interceptor is registered for each DbContext instance. This is because the auditing interceptor contains state linked to the current context instance.

#### The audit context

The sample also contains a second DbContext and model used for the auditing database.

```csharp
public class AuditContext : DbContext
{
    private readonly string _connectionString;

    public AuditContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlite(_connectionString);

    public DbSet<SaveChangesAudit> SaveChangesAudits { get; set; }
}

public class SaveChangesAudit
{
    public int Id { get; set; }
    public Guid AuditId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool Succeeded { get; set; }
    public string ErrorMessage { get; set; }

    public ICollection<EntityAudit> Entities { get; } = new List<EntityAudit>();
}

public class EntityAudit
{
    public int Id { get; set; }
    public EntityState State { get; set; }
    public string AuditMessage { get; set; }

    public SaveChangesAudit SaveChangesAudit { get; set; }
}
```

#### The interceptor

The general idea for auditing with the interceptor is:

* An audit message is created at the beginning of SaveChanges and is written to the auditing database
* SaveChanges is allowed to continue
* If SaveChanges succeeds, then the audit message is updated to indicate success
* If SaveChanges fails or is canceled, then the audit message is updated to indicate the outcome

The first stage is handled before any changes are sent to the database using overrides of `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.SavingChanges*` and `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.SavingChangesAsync*`.

```csharp
public async ValueTask<InterceptionResult<int>> SavingChangesAsync(
    DbContextEventData eventData,
    InterceptionResult<int> result,
    CancellationToken <example-value> = default)
{
    _audit = CreateAudit(eventData.Context);

    using var auditContext = new AuditContext(_connectionString);

    auditContext.Add(_audit);
    await auditContext.SaveChangesAsync();

    return result;
}

public InterceptionResult<int> SavingChanges(
    DbContextEventData eventData,
    InterceptionResult<int> result)
{
    _audit = CreateAudit(eventData.Context);

    using var auditContext = new AuditContext(_connectionString);
    auditContext.Add(_audit);
    auditContext.SaveChanges();

    return result;
}
```

Overriding both sync and async methods ensures that auditing will happen regardless of whether `SaveChanges` or `SaveChangesAsync` are called. Notice also that the async overload is itself able to perform non-blocking async I/O to the auditing database. You may wish to throw from the sync `SavingChanges` method to ensure that all database I/O is async. This then requires that the application always calls `SaveChangesAsync` and never `SaveChanges`.

#### The audit message

Every interceptor method has an `eventData` parameter providing contextual information about the event being intercepted. In this case the current application DbContext is included in the event data, which is then used to create an audit message.

```csharp
private static SaveChangesAudit CreateAudit(DbContext context)
{
    context.ChangeTracker.DetectChanges();

    var audit = new SaveChangesAudit { AuditId = Guid.NewGuid(), StartTime = DateTime.UtcNow };

    foreach (var entry in context.ChangeTracker.Entries())
    {
        var auditMessage = entry.State switch
        {
            EntityState.Deleted => CreateDeletedMessage(entry),
            EntityState.Modified => CreateModifiedMessage(entry),
            EntityState.Added => CreateAddedMessage(entry),
            _ => null
        };

        if (auditMessage != null)
        {
            audit.Entities.Add(new EntityAudit { State = entry.State, AuditMessage = auditMessage });
        }
    }

    return audit;

    string CreateAddedMessage(EntityEntry entry)
        => entry.Properties.Aggregate(
            $"Inserting {entry.Metadata.DisplayName()} with ",
            (auditString, property) => auditString + $"{property.Metadata.Name}: '{property.CurrentValue}' ");

    string CreateModifiedMessage(EntityEntry entry)
        => entry.Properties.Where(property => property.IsModified || property.Metadata.IsPrimaryKey()).Aggregate(
            $"Updating {entry.Metadata.DisplayName()} with ",
            (auditString, property) => auditString + $"{property.Metadata.Name}: '{property.CurrentValue}' ");

    string CreateDeletedMessage(EntityEntry entry)
        => entry.Properties.Where(property => property.Metadata.IsPrimaryKey()).Aggregate(
            $"Deleting {entry.Metadata.DisplayName()} with ",
            (auditString, property) => auditString + $"{property.Metadata.Name}: '{property.CurrentValue}' ");
}
```

The result is a `SaveChangesAudit` entity with a collection of `EntityAudit` entities, one for each insert, update, or delete. The interceptor then inserts these entities into the audit database.

> **Tip:**
> ToString is overridden in every EF Core event data class to generate the equivalent log message for the event. For example, calling `ContextInitializedEventData.ToString` generates "Entity Framework Core 5.0.0 initialized 'BlogsContext' using provider 'Microsoft.EntityFrameworkCore.Sqlite' with options: None".

#### Detecting success

The audit entity is stored on the interceptor so that it can be accessed again once SaveChanges either succeeds or fails. For success, `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.SavedChanges*` or `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.SavedChangesAsync*` is called.

```csharp
public int SavedChanges(SaveChangesCompletedEventData eventData, int result)
{
    using var auditContext = new AuditContext(_connectionString);

    auditContext.Attach(_audit);
    _audit.Succeeded = true;
    _audit.EndTime = DateTime.UtcNow;

    auditContext.SaveChanges();

    return result;
}

public async ValueTask<int> SavedChangesAsync(
    SaveChangesCompletedEventData eventData,
    int result,
    CancellationToken <example-value> = default)
{
    using var auditContext = new AuditContext(_connectionString);

    auditContext.Attach(_audit);
    _audit.Succeeded = true;
    _audit.EndTime = DateTime.UtcNow;

    await auditContext.SaveChangesAsync(cancellationToken);

    return result;
}
```

The audit entity is attached to the audit context, since it already exists in the database and needs to be updated. We then set `Succeeded` and `EndTime`, which marks these properties as modified so SaveChanges will send an update to the audit database.

#### Detecting failure, cancellation, and concurrency conflicts

Ordinary failures are handled in much the same way as success, but in the `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.SaveChangesFailed*` or `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.SaveChangesFailedAsync*` method. The event data contains the exception that was thrown.

> **Note:**
> `SaveChangesFailed` and `SaveChangesFailedAsync` are not called for every exception. A canceled operation calls `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.SaveChangesCanceled*` or `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.SaveChangesCanceledAsync*`. A `Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException` calls `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.ThrowingConcurrencyException*` or `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor.ThrowingConcurrencyExceptionAsync*` before the exception is thrown. It does not call `SaveChangesFailed` or `SaveChangesFailedAsync`.

```csharp
public void SaveChangesFailed(DbContextErrorEventData eventData)
    => UpdateAudit(eventData.Exception.Message);

public Task SaveChangesFailedAsync(
    DbContextErrorEventData eventData,
    CancellationToken <example-value> = default)
    => UpdateAuditAsync(eventData.Exception.Message, cancellationToken);
```

The auditing interceptor also handles cancellation separately. The asynchronous callback does not pass the canceled token to the audit operation, so that the outcome can still be recorded.

```csharp
public void SaveChangesCanceled(DbContextEventData eventData)
    => UpdateAudit("SaveChanges was canceled.");

public Task SaveChangesCanceledAsync(
    DbContextEventData eventData,
    CancellationToken <example-value> = default)
    => UpdateAuditAsync("<example-value>", CancellationToken.None);
```

Concurrency interception occurs immediately before EF Core throws the exception and allows the exception to be suppressed. This interceptor records the conflict and returns the existing result without suppressing it.

```csharp
public InterceptionResult ThrowingConcurrencyException(
    ConcurrencyExceptionEventData eventData,
    InterceptionResult result)
{
    UpdateAudit(eventData.Exception.Message);
    return result;
}

public async ValueTask<InterceptionResult> ThrowingConcurrencyExceptionAsync(
    ConcurrencyExceptionEventData eventData,
    InterceptionResult result,
    CancellationToken <example-value> = default)
{
    await UpdateAuditAsync(eventData.Exception.Message, cancellationToken);
    return result;
}
```

#### Demonstration

The auditing sample contains a simple console application that makes changes to the blogging database and then shows the auditing that was created.

```csharp
// Insert, update, and delete some entities

using (var context = new BlogsContext())
{
    context.Add(
        new Blog { Name = "EF Blog", Posts = { new Post { Title = "EF Core 3.1!" }, new Post { Title = "EF Core 5.0!" } } });

    await context.SaveChangesAsync();
}

using (var context = new BlogsContext())
{
    var blog = await context.Blogs.Include(e => e.Posts).SingleAsync();

    blog.Name = "EF Core Blog";
    context.Remove(blog.Posts.First());
    blog.Posts.Add(new Post { Title = "EF Core 6.0!" });

    await context.SaveChangesAsync();
}

// Do an insert that will fail

using (var context = new BlogsContext())
{
    try
    {
        context.Add(new Post { Id = 3, Title = "EF Core 3.1!" });

        await context.SaveChangesAsync();
    }
    catch (DbUpdateException)
    {
    }
}

// Look at the audit trail

using (var context = new AuditContext("DataSource=audit.db"))
{
    foreach (var audit in await context.SaveChangesAudits.Include(e => e.Entities).ToListAsync())
    {
        Console.WriteLine(
            $"Audit {audit.AuditId} from {audit.StartTime} to {audit.EndTime} was{(audit.Succeeded ? "" : " not")} successful.");

        foreach (var entity in audit.Entities)
        {
            Console.WriteLine($"  {entity.AuditMessage}");
        }

        if (!audit.Succeeded)
        {
            Console.WriteLine($"  Error: {audit.ErrorMessage}");
        }
    }
}
```

The result shows the contents of the auditing database:

```output
Audit 52e94327-1767-4046-a3ca-4c6b1eecbca6 from 10/14/2020 9:10:17 PM to 10/14/2020 9:10:17 PM was successful.
  Inserting Blog with Id: '-2147482647' Name: 'EF Blog'
  Inserting Post with Id: '-2147482647' BlogId: '-2147482647' Title: 'EF Core 3.1!'
  Inserting Post with Id: '-2147482646' BlogId: '-2147482647' Title: 'EF Core 5.0!'
Audit 8450f57a-5030-4211-a534-eb66b8da7040 from 10/14/2020 9:10:17 PM to 10/14/2020 9:10:17 PM was successful.
  Inserting Post with Id: '-2147482645' BlogId: '1' Title: 'EF Core 6.0!'
  Updating Blog with Id: '1' Name: 'EF Core Blog'
  Deleting Post with Id: '1'
Audit 201fef4d-66a7-43ad-b9b6-b57e9d3f37b3 from 10/14/2020 9:10:17 PM to 10/14/2020 9:10:17 PM was not successful.
  Inserting Post with Id: '3' BlogId: '' Title: 'EF Core 3.1!'
  Error: SQLite Error 19: 'UNIQUE constraint failed: Post.Id'.
```
