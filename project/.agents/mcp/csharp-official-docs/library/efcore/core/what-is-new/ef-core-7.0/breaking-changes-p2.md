---
title: "Breaking changes in EF Core 7.0 (EF7) - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-7.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 7.0 (EF7) - EF Core (part 2 of 3)

## Medium-impact changes

### Orphaned dependents of optional relationships are not automatically deleted

Tracking Issue #27217

#### Old behavior

A relationship is optional if its foreign key is nullable. Setting the foreign key to null allows the dependent entity exist without any related principal entity. Optional relationships can be configured to use cascade deletes, although this is not the default.

An optional dependent can be severed from its principal by either setting its foreign key to null, or clearing the navigation to or from it. In EF Core 6.0, this would cause the dependent to be deleted when the relationship was configured for cascade delete.

#### New behavior

Starting with EF Core 7.0, the dependent is no longer deleted. Note that if the principal is deleted, then the dependent will still be deleted since cascade deletes are configured for the relationship.

#### Why

The dependent can exist without any relationship to a principal, so severing the relationship should not cause the entity to be deleted.

#### Mitigations

The dependent can be explicitly deleted:

```csharp
context.Remove(blog);
```

Or `SaveChanges` can be overridden or intercepted to delete dependents with no principal reference. For example:

```csharp
context.SavingChanges += (c, _) =>
    {
        foreach (var entry in ((DbContext)c!).ChangeTracker
            .Entries<Blog>()
            .Where(e => e.State == EntityState.Modified))
        {
            if (entry.Reference(e => e.Author).CurrentValue == null)
            {
                entry.State = EntityState.Deleted;
            }
        }
    };
```

### Cascade delete is configured between tables when using TPT mapping with SQL Server

Tracking Issue #28532

#### Old behavior

When mapping an inheritance hierarchy using the TPT strategy, the base table must contain a row for every entity saved, regardless of the actual type of that entity. Deleting the row in the base table should delete rows in all the other tables. EF Core configures a cascade deletes for this.

In EF Core 6.0, a bug in the SQL Server database provider meant that these cascade deletes were not being created.

#### New behavior

Starting with EF Core 7.0, the cascade deletes are now being created for SQL Server just as they always were for other databases.

#### Why

Cascade deletes from the base table to the sub-tables in TPT allow an entity to be deleted by deleting its row in the base table.

#### Mitigations

In most cases, this change should not cause any issues. However, SQL Server is very restrictive when there are multiple cascade behaviors configured between tables. This means that if there is an existing cascading relationship between tables in the TPT mapping, then SQL Server may generate the following error:

> Microsoft.Data.SqlClient.SqlException: The DELETE statement conflicted with the REFERENCE constraint "FK_Blogs_People_OwnerId". The conflict occurred in database "Scratch", table "dbo.Blogs", column 'OwnerId'. The statement has been terminated.

For example, this model creates a cycle of cascading relationships:

```csharp
[Table("FeaturedPosts")]
public class FeaturedPost : Post
{
    public int ReferencePostId { get; set; }
    public Post ReferencePost { get; set; } = null!;
}

[Table("Posts")]
public class Post
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Content { get; set; }
}
```

One of these will need to be configured to not use cascade deletes on the server. For example, to change the explicit relationship:

```csharp
modelBuilder
    .Entity<FeaturedPost>()
    .HasOne(e => e.ReferencePost)
    .WithMany()
    .OnDelete(DeleteBehavior.ClientCascade);
```

Or to change the implicit relationship created for the TPT mapping:

```csharp
modelBuilder
    .Entity<FeaturedPost>()
    .HasOne<Post>()
    .WithOne()
    .HasForeignKey<FeaturedPost>(e => e.Id)
    .OnDelete(DeleteBehavior.ClientCascade);
```

### Higher chance of busy/locked errors on SQLite when not using write-ahead logging

#### Old behavior

Previous versions of the SQLite provider saved changes via a less efficient technique which was able to automatically retry when the table was locked/busy and write-ahead logging (WAL) was not enabled.

#### New behavior

By default, EF Core now saves changes via a more efficient technique, using the RETURNING clause. Unfortunately, this technique is not able to automatically retry when busy/locked. In a multi-threaded application (like a web app) not using write-ahead logging, it is common to encounter these errors.

#### Why

The simplifications and performance improvements linked to the new method are significant enough that it's important to bring them to users by default. Databases created by EF Core also enable write-ahead logging by default. The SQLite team also recommends enabling write-ahead logging by default.

#### Mitigations

If possible, you should enable write-ahead logging on your database. If your database was created by EF, this should already be the case. If not, you can enable write-ahead logging by executing the following command.

```sql
PRAGMA journal_mode = 'wal';
```

If, for some reason, you can't enable write-ahead logging, it's possible to revert to the old mechanism for the entire application by inserting the following code in your context configuration:

##### EF Core 7.0

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlite(...)
        .ReplaceService<IUpdateSqlGenerator, SqliteLegacyUpdateSqlGenerator>();
```

##### EF Core 8.0 and above

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder.Conventions.Add(_ => new DoNotUseReturningClauseConvention());
}
```

```csharp
class DoNotUseReturningClauseConvention : IModelFinalizingConvention
{
    public void ProcessModelFinalizing(
        IConventionModelBuilder modelBuilder,
        IConventionContext<IConventionModelBuilder> context)
    {
        foreach (var entityType in modelBuilder.Metadata.GetEntityTypes())
        {
            entityType.UseSqlReturningClause(false);
        }
    }
}
```

---
