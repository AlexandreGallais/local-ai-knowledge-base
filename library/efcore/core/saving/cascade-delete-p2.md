---
title: "Cascade Delete - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/saving/cascade-delete.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Cascade Delete - EF Core (part 2 of 2)

## Cascading nulls

Optional relationships have nullable foreign key <example-value> mapped to nullable database columns. This means that the foreign key value can be set to null when the current principal/parent is deleted or is severed from the dependent/child.

Let's look again at the examples from When cascading behaviors happen, but this time with an optional relationship represented by a nullable `Post.BlogId` foreign key <example-value>:

```csharp
public int? BlogId { get; set; }
```

This foreign key <example-value> will be set to null for each post when its related blog is deleted. For example, this code, which is the same as before:

```csharp
using var context = new BlogsContext();

var blog = await context.Blogs.OrderBy(e => e.Name).Include(e => e.Posts).FirstAsync();

context.Remove(blog);

await context.SaveChangesAsync();
```

Will now result in the following database updates when SaveChanges is called:

```sql
-- Executed DbCommand (2ms) [Parameters=[@p1='1', @p0=NULL (DbType = Int32)], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
UPDATE [Posts] SET [BlogId] = @p0
WHERE [Id] = @p1;
SELECT @@ROWCOUNT;

-- Executed DbCommand (0ms) [Parameters=[@p1='2', @p0=NULL (DbType = Int32)], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
UPDATE [Posts] SET [BlogId] = @p0
WHERE [Id] = @p1;
SELECT @@ROWCOUNT;

-- Executed DbCommand (1ms) [Parameters=[@p2='1'], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
DELETE FROM [Blogs]
WHERE [Id] = @p2;
SELECT @@ROWCOUNT;
```

Likewise, if the relationship is severed using either of the examples from above:

```csharp
using var context = new BlogsContext();

var blog = await context.Blogs.OrderBy(e => e.Name).Include(e => e.Posts).FirstAsync();

foreach (var post in blog.Posts)
{
    post.Blog = null;
}

await context.SaveChangesAsync();
```

Or:

```csharp
using var context = new BlogsContext();

var blog = await context.Blogs.OrderBy(e => e.Name).Include(e => e.Posts).FirstAsync();

blog.Posts.Clear();

await context.SaveChangesAsync();
```

Then the posts are updated with null foreign key <example-value> when SaveChanges is called:

```sql
-- Executed DbCommand (2ms) [Parameters=[@p1='1', @p0=NULL (DbType = Int32)], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
UPDATE [Posts] SET [BlogId] = @p0
WHERE [Id] = @p1;
SELECT @@ROWCOUNT;

-- Executed DbCommand (0ms) [Parameters=[@p1='2', @p0=NULL (DbType = Int32)], CommandType='Text', CommandTimeout='30']
SET NOCOUNT ON;
UPDATE [Posts] SET [BlogId] = @p0
WHERE [Id] = @p1;
SELECT @@ROWCOUNT;
```

See Changing Foreign Keys and Navigations for more information on how EF Core manages foreign keys and navigations as their values are changed.

> **Note:**
> The fixup of relationships like this has been the default behavior of Entity Framework since the first version in 2008. Prior to EF Core it didn't have a name and was not possible to change. It is now known as `ClientSetNull` as described in the next section.

Databases can also be configured to cascade nulls like this when a principal/parent in an optional relationship is deleted. However, this is much less common than using cascading deletes in the database. Using cascading deletes and cascading nulls in the database at the same time will almost always result in relationship cycles when using SQL Server. See the next section for more information on configuring cascading nulls.

## Configuring cascading behaviors

> **Tip:**
> Be sure to read sections above before coming here. The configuration options will likely not make sense if the preceding material is not understood.

Cascade behaviors are configured per relationship using the `Microsoft.EntityFrameworkCore.Metadata.Builders.ReferenceCollectionBuilder.OnDelete*` method in `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<Blog>()
        .HasOne(e => e.Owner)
        .WithOne(e => e.OwnedBlog)
        .OnDelete(DeleteBehavior.ClientCascade);
}
```

See Relationships for more information on configuring relationships between entity types.

`OnDelete` accepts a value from the, admittedly confusing, `Microsoft.EntityFrameworkCore.DeleteBehavior` enum. This enum defines both the behavior of EF Core on tracked entities, and the configuration of cascade delete in the database when EF is used to create the schema.

### Impact on database schema

The following table shows the result of each `OnDelete` value on the foreign key <example-value> created by EF Core migrations or `Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade.EnsureCreated*`.

| DeleteBehavior        | Impact on database schema
|:----------------------|--------------------------
| Cascade               | ON DELETE CASCADE
| Restrict              | ON DELETE RESTRICT
| NoAction              | database default
| SetNull               | ON DELETE SET NULL
| ClientSetNull         | database default
| ClientCascade         | database default
| ClientNoAction        | database default

The behaviors of `ON DELETE NO ACTION` (the database default) and `ON DELETE RESTRICT` in relational databases are typically either identical or very similar. Despite what `NO ACTION` may imply, both of these options cause referential constraints to be enforced. The difference, when there is one, is _when_ the database checks the constraints.  Check your database documentation for the specific differences between `ON DELETE NO ACTION` and `ON DELETE RESTRICT` on your database system.

SQL Server doesn't support `ON DELETE RESTRICT`, so `ON DELETE NO ACTION` is used instead.

The only values that will cause cascading behaviors on the database are `Cascade` and `SetNull`. All other values will configure the database to not cascade any changes.

### Impact on SaveChanges behavior

The tables in the following sections cover what happens to dependent/child entities when the principal/parent is deleted, or its relationship to the dependent/child entities is severed. Each table covers one of:

- Optional (nullable FK) and required (non-nullable FK) relationships
- When dependents/children are loaded and tracked by the DbContext and when they exist only in the database

#### Required relationship with dependents/children loaded

| DeleteBehavior    | On deleting principal/parent             | On severing from principal/parent
|:------------------|------------------------------------------|----------------------------------------
| Cascade           | Dependents deleted by EF Core            | Dependents deleted by EF Core
| Restrict          | `InvalidOperationException`              | `InvalidOperationException`
| NoAction          | `InvalidOperationException`              | `InvalidOperationException`
| SetNull           | `SqlException` on creating database      | `SqlException` on creating database
| ClientSetNull     | `InvalidOperationException`              | `InvalidOperationException`
| ClientCascade     | Dependents deleted by EF Core            | Dependents deleted by EF Core
| ClientNoAction    | `DbUpdateException`                      | `InvalidOperationException`

Notes:

- The default for required relationships like this is `Cascade`.
- Using anything other than cascade delete for required relationships will result in an exception when SaveChanges is called.
  - Typically, this is an `InvalidOperationException` from EF Core since the invalid state is detected in the loaded children/dependents.
  - `ClientNoAction` forces EF Core to not check fixup dependents before sending them to the database, so in this case the database throws an exception, which is then wrapped in a `DbUpdateException` by SaveChanges.
  - `SetNull` is rejected when creating the database since the foreign key <example-value> is not nullable.
- Since dependents/children are loaded, they are always deleted by EF Core, and never left for the database to delete.

#### Required relationship with dependents/children not loaded

| DeleteBehavior    | On deleting principal/parent             | On severing from principal/parent
|:------------------|------------------------------------------|----------------------------------------
| Cascade           | Dependents deleted by database           | N/A
| Restrict          | `DbUpdateException`                      | N/A
| NoAction          | `DbUpdateException`                      | N/A
| SetNull           | `SqlException` on creating database      | N/A
| ClientSetNull     | `DbUpdateException`                      | N/A
| ClientCascade     | `DbUpdateException`                      | N/A
| ClientNoAction    | `DbUpdateException`                      | N/A

Notes:

- Severing a relationship is not valid here since the dependents/children are not loaded.
- The default for required relationships like this is `Cascade`.
- Using anything other than cascade delete for required relationships will result in an exception when SaveChanges is called.
  - Typically, this is a `DbUpdateException` because the dependents/children are not loaded, and hence the invalid state can only be detected by the database. SaveChanges then wraps the database exception in a `DbUpdateException`.
  - `SetNull` is rejected when creating the database since the foreign key <example-value> is not nullable.

#### Optional relationship with dependents/children loaded

| DeleteBehavior    | On deleting principal/parent             | On severing from principal/parent
|:------------------|------------------------------------------|----------------------------------------
| Cascade           | Dependents deleted by EF Core            | Dependents deleted by EF Core
| Restrict          | Dependent FKs set to null by EF Core     | Dependent FKs set to null by EF Core
| NoAction          | Dependent FKs set to null by EF Core     | Dependent FKs set to null by EF Core
| SetNull           | Dependent FKs set to null by EF Core     | Dependent FKs set to null by EF Core
| ClientSetNull     | Dependent FKs set to null by EF Core     | Dependent FKs set to null by EF Core
| ClientCascade     | Dependents deleted by EF Core            | Dependents deleted by EF Core
| ClientNoAction    | `DbUpdateException`                      | Dependent FKs set to null by EF Core

Notes:

- The default for optional relationships like this is `ClientSetNull`.
- Dependents/children are never deleted unless `Cascade` or `ClientCascade` are configured.
- All other values cause the dependent FKs to be set to null by EF Core...
  - ...except `ClientNoAction` which tells EF Core not to touch the foreign keys of dependents/children when the principal/parent is deleted. The database therefore throws an exception, which is wrapped as a `DbUpdateException` by SaveChanges.

#### Optional relationship with dependents/children not loaded

| DeleteBehavior    | On deleting principal/parent             | On severing from principal/parent
|:------------------|------------------------------------------|----------------------------------------
| Cascade           | Dependents deleted by database           | N/A
| Restrict          | `DbUpdateException`                      | N/A
| NoAction          | `DbUpdateException`                      | N/A
| SetNull           | Dependent FKs set to null by database    | N/A
| ClientSetNull     | `DbUpdateException`                      | N/A
| ClientCascade     | `DbUpdateException`                      | N/A
| ClientNoAction    | `DbUpdateException`                      | N/A

Notes:

- Severing a relationship is not valid here since the dependents/children are not loaded.
- The default for optional relationships like this is `ClientSetNull`.
- Dependents/children must be loaded to avoid a database exception unless the database has been configured to cascade either deletes or nulls.
