---
title: "Microsoft SQL Server Database Provider - Value Generation - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/sql-server/value-generation.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# SQL Server Value Generation

This page details value generation configuration  and patterns that are specific to the SQL Server provider. It's recommended to first read the general page on value generation.

## IDENTITY columns

By convention, numeric columns that are configured to have their values generated on add are set up as SQL Server IDENTITY columns.

### Seed and increment

By default, IDENTITY columns start off at 1 (the seed), and increment by 1 each time a row is added (the increment). You can configure a different seed and increment as follows:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .Property(b => b.BlogId)
        .UseIdentityColumn(seed: 10, increment: 10);
}
```

### Inserting explicit values into IDENTITY columns

By default, SQL Server doesn't allow inserting explicit values into IDENTITY columns. To do so, you must manually enable `IDENTITY_INSERT` before calling `SaveChangesAsync()`, as follows:

```csharp
using (var context = new ExplicitIdentityValuesContext())
{
    context.Blogs.Add(new Blog { BlogId = 100, Url = "http://blog1.somesite.com" });
    context.Blogs.Add(new Blog { BlogId = 101, Url = "http://blog2.somesite.com" });

    await context.Database.OpenConnectionAsync();
    try
    {
        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Blogs ON");
        await context.SaveChangesAsync();
        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Blogs OFF");
    }
    finally
    {
        await context.Database.CloseConnectionAsync();
    }
}
```

> **Note:**
> We have a feature request on our backlog to do this automatically within the SQL Server provider.

## Sequences

As an alternative to IDENTITY columns, you can use standard sequences. This can be useful in various scenarios; for example, you may want to have multiple columns drawing their default values from a single sequence.

SQL Server allows you to create sequences and use them as detailed in the general page on sequences. It's up to you to configure your properties to use sequences via `HasDefaultValueSql()`.

## GUIDs

For GUID primary keys, the provider automatically generates optimal sequential values, similar to SQL Server's NEWSEQUENTIALID function. Generating the value on the client is more efficient in some scenarios, i.e. an extra database round trip isn't needed to get the database-generated value, when a dependent is also being inserted that references that key.

To have EF generate the same sequential GUID values for non-key properties, configure them as follows:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().Property(b => b.Guid).HasValueGenerator(typeof(SequentialGuidValueGenerator));
}
```

## Rowversions

SQL Server has the `rowversion` data type, which automatically changes whenever the row is updated. This makes it very useful as a concurrency token, for managing cases where the same row is simultaneously updated by multiple transactions.

To fully understand concurrency tokens and how to use them, read the dedicated page on concurrency conflicts. To map a `byte[]` property to a `rowversion` column, configure it as follows:

### Data Annotations

```c#
public class Person
{
    public int PersonId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    [Timestamp]
    public byte[] Version { get; set; }
}
```

### Fluent API

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Person>()
        .Property(p => p.Version)
        .IsRowVersion();
}
```

***
