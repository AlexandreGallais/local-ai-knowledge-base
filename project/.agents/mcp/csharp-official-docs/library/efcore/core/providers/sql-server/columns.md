---
title: "Microsoft SQL Server Database Provider - Columns - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/providers/sql-server/columns.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Column features specific to the Entity Framework Core SQL Server provider

This page details column configuration options that are specific to the SQL Server provider.

## Unicode and UTF-8

SQL Server 2019 introduced introduced UTF-8 support, which allows storing UTF-8 data in `char` and `varchar` columns by configuring them with special UTF-8 collations. You can use UTF-8 columns with EF simply by configuring the column's type to `char` or `varchar`, specify a UTF-8 collation (ending with `_UTF8`), and specifying that the column should be Unicode:

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .Property(b => b.Name)
        .HasColumnType("varchar(max)")
        .UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
}
```

## Sparse columns

Sparse columns are ordinary columns that have an optimized storage for null values, reducing the space requirements for null values at the cost of more overhead to retrieve non-null values.

As an example, consider a type hierarchy mapped via the table-per-hierarchy (TPH) strategy. In TPH, a single database table is used to hold all types in a hierarchy; this means that the table must contain columns for each and every property across the entire hierarchy, and for columns belonging to rare types, most rows will contain a null value for that column. In these cases, it may make sense to configure the column as *sparse*, in order to reduce the space requirements. The decision whether to make a column sparse must be made by the user, and depends on expectations for actual data in the table.

A column can be made sparse via the Fluent API:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<RareBlog>()
        .Property(b => b.RareProperty)
        .IsSparse();
}
```

For more information on sparse columns, see the SQL Server docs.
