---
title: "What's New in EF Core 9 (part 6 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-9.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 9 (part 6 of 7)

## Migrations

### Protection against concurrent migrations

EF9 introduces a locking mechanism to protect against multiple migration executions happening simultaneously, as that could leave the database in a corrupted state. This doesn't happen when migrations are deployed to the production environment using recommended methods, but can happen if migrations are applied at runtime using the `DbContext.Database.MigrateAsync()` method. We recommend applying migrations at deployment, rather than as part of application startup, but that can result in more complicated application architectures (e.g. when using .NET Aspire projects).

For more information, see Migration locking.

> **Note:**
> If you are using Sqlite database, see potential issues associated with this feature.

### Warn when multiple migration operations can't be run inside a transaction

The majority of operations performed during migrations are protected by a transaction. This ensures that if for some reason migration fails, the database does not end up in a corrupted state. However, some operations are not wrapped in a transaction (e.g. operations on SQL Server memory-optimized tables, or database altering operations like modifying the database collation). To avoid corrupting the database in case of migration failure, it is recommended that these operations are performed in isolation using a separate migration. EF9 now detects a scenario when a migration contains multiple operations, one of which can't be wrapped in a transaction, and issues a warning.

### Improved data seeding

EF9 introduced a convenient way to perform data seeding, that is populating the database with initial data. `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder` now contains `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseSeeding*` and `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseAsyncSeeding*` methods which get executed when the DbContext is initialized (as part of `Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade.EnsureCreatedAsync*`).

> **Note:**
> If the application had ran previously, the database may already contain the sample data (which would have been added on the first initialization of the context). As such, `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseSeeding*` `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseAsyncSeeding*` should check if data exists before attempting to populate the database. This can be achieved by issuing a simple EF query.

Here is an example of how these methods can be used:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=EFDataSeeding;Trusted_Connection=True;ConnectRetryCount=0")
        .UseSeeding((context, _) =>
        {
            var testBlog = context.Set<Blog>().FirstOrDefault(b => b.Url == "http://test.com");
            if (testBlog == null)
            {
                context.Set<Blog>().Add(new Blog { Url = "http://test.com" });
                context.SaveChanges();
            }
        })
        .UseAsyncSeeding(async (context, _, cancellationToken) =>
        {
            var testBlog = await context.Set<Blog>().FirstOrDefaultAsync(b => b.Url == "<example-value>", cancellationToken);
            if (testBlog == null)
            {
                context.Set<Blog>().Add(new Blog { Url = "http://test.com" });
                await context.SaveChangesAsync(cancellationToken);
            }
        });
```

More information can be found here.

### Other migration improvements

* When changing an existing table into a SQL Server temporal table, the migration code size has been significantly reduced.
