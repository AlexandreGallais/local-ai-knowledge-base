---
title: "Indexes - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/indexes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Indexes

Indexes are a common concept across many data stores. While their implementation in the data store may vary, they are used to make lookups based on a column (or set of columns) more efficient. See the indexes section in the performance documentation for more information on good index usage.

You can specify an index over a column as follows:

## Data Annotations

```csharp
[Index(nameof(Url))]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
```

## Fluent API

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasIndex(b => b.Url);
}
```

***

> **Note:**
> By convention, an index is created in each property (or set of properties) that are used as a foreign key.

## Composite index

An index can also span more than one column:

### Data Annotations

```csharp
[Index(nameof(FirstName), nameof(LastName))]
public class Person
{
    public int PersonId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
```

### Fluent API

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Person>()
        .HasIndex(p => new { p.FirstName, p.LastName });
}
```

***

Indexes over multiple columns, also known as *composite indexes*, speed up queries which filter on index's columns, but also queries which only filter on the *first* columns covered by the index. See the performance docs for more information.

## Indexes on complex type properties

Starting with EF Core 11.0, indexes can use scalar properties nested inside complex types:

```csharp
modelBuilder.Entity<Customer>()
    .HasIndex(c => c.Address.PostalCode);
```

Composite indexes can mix regular entity properties and complex type properties:

```csharp
modelBuilder.Entity<Customer>()
    .HasIndex(c => new { c.Region, c.Address.PostalCode });
```

The same paths can be specified by name:

```csharp
modelBuilder.Entity<Customer>()
    .HasIndex("Address.PostalCode");
```

For complex types mapped to JSON columns, providers may also support indexing paths inside the JSON document:

```csharp
modelBuilder.Entity<Customer>()
    .ComplexProperty(c => c.Address, b => b.ToJson());

modelBuilder.Entity<Customer>()
    .HasIndex("Address.PostalCode");
```

Indexes over complex collections use collection path syntax. `[]` represents all elements, while `[0]`, `[1]`, and so on represent a specific element:

```csharp
modelBuilder.Entity<Order>()
    .ComplexCollection(o => o.Items, b => b.ToJson());

modelBuilder.Entity<Order>()
    .HasIndex("Items[].Sku");
```

The same index can be configured with a lambda expression using `Select`:

```csharp
modelBuilder.Entity<Order>()
    .HasIndex(o => o.Items.Select(i => i.Sku));
```

Support for JSON-path indexes depends on the database provider. For example, the SQL Server provider creates SQL Server JSON indexes where supported, while the Azure Cosmos DB provider emits the configured paths into the container indexing policy.

## Index uniqueness

By default, indexes aren't unique: multiple rows are allowed to have the same value(s) for the index's column set. You can make an index unique as follows:

### Data Annotations

```csharp
[Index(nameof(Url), IsUnique = true)]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
```

### Fluent API

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasIndex(b => b.Url)
        .IsUnique();
}
```

***

Attempting to insert more than one entity with the same values for the index's column set will cause an exception to be thrown.

## Index sort order

In most databases, each column covered by an index can be either ascending or descending. For indexes covering only one column, this typically does not matter: the database can traverse the index in reverse order as needed. However, for composite indexes, the ordering can be crucial for good performance, and can mean the difference between an index getting used by a query or not. In general, the index columns' sort orders should correspond to those specified in the `ORDER BY` clause of your query.

The index sort order is ascending by default. You can make all columns have descending order as follows:

### Data Annotations

```csharp
[Index(nameof(Url), nameof(Rating), AllDescending = true)]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    public int Rating { get; set; }
}
```

### Fluent API

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasIndex(b => new { b.Url, b.Rating })
        .IsDescending();
}
```

***

You may also specify the sort order on a column-by-column basis as follows:

### Data Annotations

```csharp
[Index(nameof(Url), nameof(Rating), IsDescending = new[] { false, true })]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    public int Rating { get; set; }
}
```

### Fluent API

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasIndex(b => new { b.Url, b.Rating })
        .IsDescending(false, true);
}
```

***

## Index naming and multiple indexes

By convention, indexes created in a relational database are named `IX_<type name>_<property name>`. For composite indexes, `<property name>` becomes an underscore separated list of property names.

You can set the name of the index created in the database:

### Data Annotations

```csharp
[Index(nameof(Url), Name = "Index_Url")]
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}
```

### Fluent API

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasIndex(b => b.Url)
        .HasDatabaseName("Index_Url");
}
```

***

Note that if you call `HasIndex` more than once on the same set of properties, that continues to configure a single index rather than create a new one:

```csharp
modelBuilder.Entity<Person>()
    .HasIndex(p => new { p.FirstName, p.LastName })
    .HasDatabaseName("IX_Names_Ascending");

modelBuilder.Entity<Person>()
    .HasIndex(p => new { p.FirstName, p.LastName })
    .HasDatabaseName("IX_Names_Descending")
    .IsDescending();
```

Since the second `HasIndex` call overrides the first one, this creates only a single, descending index. This can be useful for further configuring an index that was created by convention.

To create multiple indexes over the same set of properties, pass a name to the `HasIndex`, which will be used to identify the index in the EF model, and to distinguish it from other indexes over the same properties:

```c#
modelBuilder.Entity<Person>()
    .HasIndex(p => new { p.FirstName, p.LastName }, "IX_Names_Ascending");

modelBuilder.Entity<Person>()
    .HasIndex(p => new { p.FirstName, p.LastName }, "IX_Names_Descending")
    .IsDescending();
```

Note that this name is also used as a default for the database name, so explicitly calling `HasDatabaseName` isn't required.

## Index filter

Some relational databases allow you to specify a filtered or partial index. This allows you to index only a subset of a column's values, reducing the index's size and improving both performance and disk space usage. For more information on SQL Server filtered indexes, see the documentation.

You can use the Fluent API to specify a filter on an index, provided as a SQL expression:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasIndex(b => b.Url)
        .HasFilter("[Url] IS NOT NULL");
}
```

When using the SQL Server provider EF adds an `'IS NOT NULL'` filter for all nullable columns that are part of a unique index. To override this convention you can supply a `null` value.

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasIndex(b => b.Url)
        .IsUnique()
        .HasFilter(null);
}
```

## Included columns

Some relational databases allow you to configure a set of columns which get included in the index, but aren't part of its "key". This can significantly improve query performance when all columns in the query are included in the index either as key or nonkey <example-value>, as the table itself doesn't need to be accessed. For more information on SQL Server included columns, see the documentation.

In the following example, the `Url` column is part of the index key, so any query filtering on that column can use the index. But in addition, queries accessing only the `Title` and `PublishedOn` columns will not need to access the table and will run more efficiently:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasIndex(p => p.Url)
        .IncludeProperties(
            p => new { p.Title, p.PublishedOn });
}
```

Starting with EF Core 11.0, SQL Server included columns can also refer to scalar properties nested inside complex types:

```csharp
modelBuilder.Entity<Customer>()
    .HasIndex(c => c.Name)
    .IncludeProperties(c => c.Address.City);
```

## Check constraints

Check constraints are a standard relational feature that allows you to define a condition that must hold for all rows in a table; any attempt to insert or modify data that violates the constraint will fail. Check constraints are similar to non-null constraints (which prohibit nulls in a column) or to unique constraints (which prohibit duplicates), but allow arbitrary SQL expression to be defined.

You can use the Fluent API to specify a check constraint on a table, provided as a SQL expression:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<Product>()
        .ToTable(b => b.HasCheckConstraint("CK_Prices", "[Price] > [DiscountedPrice]"));
}
```

Multiple check constraints can be defined on the same table, each with their own name.

Note: some common check constraints can be configured via the community package EFCore.CheckConstraints.
