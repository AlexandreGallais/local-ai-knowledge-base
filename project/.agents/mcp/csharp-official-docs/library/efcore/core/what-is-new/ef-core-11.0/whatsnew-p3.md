---
title: "What's New in EF Core 11 (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-11.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 11 (part 3 of 3)

## SQLite

### Ordering in string aggregation

EF Core can translate `string.Join` and `string.Concat` over a grouping to SQLite's `group_concat` aggregate function. Starting with EF 11, these translations also support ordering the aggregated values, by applying `OrderBy`/`OrderByDescending` inside the aggregate. Previously, queries that ordered the values fell back to client evaluation.

For example, the following query concatenates each blog's post titles, ordered by descending post `Id`:

```csharp
var blogs = await context.Blogs
    .Select(b => new
    {
        b.Name,
        Posts = string.Join(
            ", ",
            b.Posts.OrderByDescending(p => p.Id).Select(p => p.Title))
    })
    .ToListAsync();
```

This translates to the following SQL, which uses `group_concat` with an `ORDER BY` clause:

```sql
SELECT "b"."Name", COALESCE(group_concat("p"."Title", ', ' ORDER BY "p"."Id" DESC), '') AS "Posts"
FROM "Blogs" AS "b"
LEFT JOIN "Posts" AS "p" ON "b"."Id" = "p"."BlogId"
GROUP BY "b"."Id", "b"."Name"
```

Ordering inside `group_concat` requires SQLite 3.44.0 or later.

### UInt128 support

`Microsoft.Data.Sqlite` can now bind `System.UInt128` parameter values. The value is stored as a zero-padded, 39-digit text representation, which preserves correct ordering and comparison of values directly in the database.

> **Note:**
> Reading `System.UInt128` values from data readers is not yet supported.

## Cosmos DB

### Complex types

EF Core complex types are now fully supported in the Azure Cosmos DB provider; they are embedded as nested JSON objects (or arrays, for collections) within the owning document, with support for queries, inserts, and updates.

For example, the following configures `ShippingAddress` as a complex type:

#### Fluent API

```csharp
modelBuilder.Entity<Order>()
    .ComplexProperty(o => o.ShippingAddress);
```

#### Data Annotations

```csharp
[ComplexType]
public class ShippingAddress
{
    public required string Street { get; set; }
    public required string City { get; set; }
}
```

***

Complex types are generally a better fit than owned types when mapping to JSON documents: unlike owned types, complex types have value semantics and no identity, which means they work better in scenarios such as comparing two embedded objects within the same document.

This feature was contributed by @JoasE - many thanks!

### Indexes and indexing policy

EF Core 11 adds support for more Azure Cosmos DB indexing policy configuration. You can now disable automatic indexing, exclude individual paths when automatic indexing is enabled, and emit explicit single-property, composite, vector, and full-text indexes:

```csharp
modelBuilder.Entity<Order>(b =>
{
    b.HasAutomaticIndexing()
        .Except("/InternalNotes/?");

    b.HasIndex(o => new { o.CustomerId, o.OrderDate });
});
```

Indexes can also traverse complex type properties and complex collections:

```csharp
modelBuilder.Entity<Order>()
    .HasIndex(o => o.Items.Select(i => i.Sku));
```

For more information, see Indexing policy.

### Transactional batches

Azure Cosmos DB supports transactional batches, which allow multiple operations to be executed atomically and in a single roundtrip against a single partition. Starting with EF Core 11, the provider leverages transactional batches by default, providing best-effort atomicity and improved performance when saving changes.

The batching behavior can be controlled via the `Microsoft.EntityFrameworkCore.AutoTransactionBehavior` property:

* **Auto** (default): Operations are grouped into transactional batches by container and partition. Batches are executed sequentially; if a batch fails, subsequent batches are not executed.
* **Never**: All operations are performed individually and sequentially (the pre-11 behavior).
* **Always**: Requires all operations to fit in a single transactional batch; throws if they cannot.

For more information, see the documentation.

This feature was contributed by @JoasE - many thanks!

### Bulk execution

Azure Cosmos DB supports _bulk execution_, which allows multiple document operations to be executed in parallel and across DbContext instances, significantly improving throughput when saving many entities at once. EF Core now supports enabling bulk execution:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseCosmos(
        "<connection string>",
        databaseName: "OrdersDB",
        options => options.BulkExecutionEnabled());
```

For more information, see the documentation.

This feature was contributed by @JoasE - many thanks!

### Session token <example-value>

Azure Cosmos DB uses session tokens to track read-your-writes consistency within a session. When running in an environment with multiple instances (e.g., with round-robin load balancing), you may need to manually manage session tokens to ensure consistency across requests.

EF Core now provides APIs to retrieve and set session tokens on a `DbContext`. To enable manual session token <example-value>, configure the `SessionTokenManagementMode()`:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseCosmos(
        "<connection string>",
        databaseName: "OrdersDB",
        options => options.SessionTokenManagementMode(SessionTokenManagementMode.SemiAutomatic));
```

You can then retrieve and use session tokens:

```csharp
// After performing operations, retrieve the session token
var sessionToken = context.Database.GetSessionToken();

// Later, in a different context instance, apply the session token <example-value> reading
context.Database.UseSessionToken(sessionToken);
var result = await context.Documents.FindAsync(id);
```

For more information, see the documentation.

This feature was contributed by @JoasE - many thanks!

### Modernized JSON serializer

EF Core 11 modernizes the Azure Cosmos DB provider's document serialization and deserialization to use `System.Text.Json` (`Utf8JsonReader`/`Utf8JsonWriter`) internally, replacing the previous `Newtonsoft.Json`-based approach. This improves performance and removes the dependency on `Newtonsoft.Json`.

As part of this change, the `__jObject` shadow property (of type `JObject`) that was previously added to every entity type has been removed, and unmapped JSON properties in documents are no longer preserved on round-trip.

> **Important:**
> These are breaking changes. See the breaking changes documentation and Cosmos: Unmapped properties are no longer preserved for details and mitigations.

### Consistent behavior for undefined values in projections

Previously, when projecting scalar properties via optional navigations where a document path was absent (resulting in an `undefined` value in Cosmos DB), behavior was inconsistent: single-property anonymous type projections silently dropped those results, while multi-property projections threw a cryptic exception.

EF Core 11 now consistently throws an `InvalidOperationException` when any part of a projection evaluates to `undefined`. Use `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.IsDefined*` to filter or `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.CoalesceUndefined*` to provide fallbacks:

```csharp
var results = await context.Entities
    .Where(x => EF.Functions.IsDefined(x.Associate!.NestedAssociate!.Id))
    .Select(x => new { x.Associate!.NestedAssociate!.Id })
    .ToListAsync();
```

For more information, see the breaking changes documentation.

This feature was contributed by @JoasE - many thanks!

## Migrations

### Excluding foreign key <example-value> from migrations

It is now possible to configure a foreign key <example-value> in the EF model while preventing the corresponding database constraint from being created by migrations. This is useful for legacy databases without existing constraints, or in data synchronization scenarios where referential integrity constraints might conflict with the synchronization order:

```csharp
modelBuilder.Entity<Blog>()
    .HasMany(e => e.Posts)
    .WithOne(e => e.Blog)
    .HasForeignKey(e => e.BlogId)
    .ExcludeForeignKeyFromMigrations();
```

The relationship is fully supported in EF for queries, change tracking, etc. Only the foreign key <example-value> in the database is suppressed; a database index is still created on the foreign key column.

For more information, see Excluding foreign key <example-value> from migrations.

### Latest migration ID recorded in model snapshot

When working in team environments, it's common for multiple developers to create migrations on separate branches. When these branches are merged, the migration trees can diverge, leading to issues that are sometimes difficult to detect.

Starting with EF Core 11, the model snapshot now records the ID of the latest migration. When two developers create migrations on divergent branches, both branches will modify this value in the model snapshot, causing a source control merge conflict. This conflict alerts the team that they need to resolve the divergence - typically by discarding one of the migration trees and creating a new, unified migration.

For more information on managing migrations in team environments, see Migrations in Team Environments.

### Create and apply migrations in one step

The `dotnet ef database update` command now supports creating and applying a migration in a single step using the new `--add` option. This uses Roslyn to compile the migration at runtime, enabling scenarios like .NET Aspire and containerized applications where recompilation isn't possible:

```dotnetcli
dotnet ef database update InitialCreate --add
```

This command scaffolds a new migration named `InitialCreate`, compiles it using Roslyn, and immediately applies it to the database. The migration files are still saved to disk for source control and future recompilation. The same options available for `dotnet ef migrations add` can be used:

```dotnetcli
dotnet ef database update AddProducts --add --output-dir Migrations/Products --namespace MyApp.Migrations
```

In PowerShell, use the `-Add` parameter:

```powershell
Update-Database -Migration InitialCreate -Add
```

### Connection and offline options for migrations remove

The `dotnet ef migrations remove` and `database drop` commands now accept `--connection` parameters, allowing you to specify the database connection string directly without needing to configure a default connection in your `DbContext`. Additionally, `migrations remove` supports the new `--offline` option to remove a migration without connecting to the database:

```console
# Remove migration with specific connection
dotnet ef migrations remove --connection "Server=prod;Database=MyDb;..."

# Remove migration without connecting to database (offline mode)
dotnet ef migrations remove --offline

# Revert and remove applied migration
dotnet ef migrations remove --force

# Drop specific database by connection string
dotnet ef database drop --connection "Server=test;Database=MyDb;..." --force
```

The `--offline` option skips the database connection check entirely, which is useful when the database is inaccessible or when you're certain the migration hasn't been applied. Note that `--offline` and `--force` cannot be used together, since `--force` requires a database connection to check if the migration has been applied before reverting it.

In PowerShell, use the `-Connection` and `-Offline` parameters:

```powershell
Remove-Migration -Connection "Server=prod;Database=MyDb;..."
Remove-Migration -Offline
Drop-Database -Connection "Server=test;Database=MyDb;..." -Force
```

### Configuration file for dotnet ef

The `dotnet ef` command-line tool now supports loading default option values from a `.config/dotnet-ef.json` configuration file. This eliminates the need to repeatedly specify the same options — such as `--project` and `--startup-project` — across every command invocation.

When you run `dotnet ef`, the tool searches for a `.config/dotnet-ef.json` file by walking up the directory tree from the current working directory. The first file found is used. Here's an example configuration file:

```json
{
  "project": "src/App.Infrastructure",
  "startupProject": "src/App.Api",
  "framework": "net11.0",
  "configuration": "Debug",
  "context": "AppDbContext",
  "runtime": "win-x64",
  "verbose": true,
  "noColor": false,
  "prefixOutput": false
}
```

Explicit command-line options always take precedence over configuration file values. Path values for `project` and `startupProject` are resolved relative to the parent of the `.config` directory containing the file.

For more information, see Configuration file.

### `-NoBuild` for PMC migrations commands

Starting with EF Core 11, the Package Manager Console `Add-Migration` and `Update-Database` commands support the `-NoBuild` switch, which skips the project build step before running the command.

This is useful when a build succeeds but produces warnings that Visual Studio's Package Manager Console treats as errors (such as NuGet vulnerability warnings), which would otherwise block the commands from running:

```powershell
Add-Migration MyMigration -NoBuild
Update-Database -NoBuild
```

Only use `-NoBuild` when the project is already up-to-date, since running with a stale build may produce unexpected results.

For more information, see the PMC tools reference.

### Wildcard context support for migration commands

When a project defines multiple `DbContext` types, several `dotnet ef` commands accept a wildcard (`*`) as the value of the `--context` option to target all contexts at once, instead of running the command separately for each one. The commands that support the wildcard are:

* `dotnet ef migrations list` — lists the migrations for every context.
* `dotnet ef migrations script` — generates and concatenates a script for every context.
* `dotnet ef database update` — applies migrations to the database of every context (migration bundles are covered as well).
* `dotnet ef database drop` — drops the database for every context.

For example, the following command lists the migrations for all contexts in the project:

```dotnetcli
dotnet ef migrations list --context "*"
```

## Other improvements

* The EF command-line tool now writes all logging and status messages to standard error, reserving standard output only for the command's actual expected output. For example, when generating a migration SQL script with `dotnet ef migrations script`, only the SQL is written to standard output.
* An analyzer and code fix now warn when `ToAsyncEnumerable` is used instead of `AsAsyncEnumerable` on EF queries (#37670, many thanks to @m-x-shokhzod).
