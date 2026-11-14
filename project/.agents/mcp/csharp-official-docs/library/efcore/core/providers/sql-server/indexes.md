---
title: "Microsoft SQL Server Database Provider - Indexes - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/providers/sql-server/indexes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Index features specific to the Entity Framework Core SQL Server provider

This page details index configuration options that are specific to the SQL Server provider.

## Clustering

Clustered indexes sort and store the data rows in the table or view based on their key values. Creating the right clustered index for your table can significantly improve the speed of your queries, as data is already laid out in the optimal order. There can be only one clustered index per table, because the data rows themselves can be stored in only one order. For more information, see the SQL Server documentation on clustered and non-clustered indexes.

By default, the primary key <example-value> of a table is implicitly backed by a clustered index, and all other indexes are non-clustered.

You can configure an index or key to be clustered as follows:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().HasIndex(b => b.PublishedOn).IsClustered();
}
```

> **Note:**
> SQL Server only supports one clustered index per table, and the primary key is by default clustered. If you'd like to have a clustered index on a non-key <example-value>, you must explicitly make your key non-clustered.

## Fill factor

The index fill-factor option is provided for fine-tuning index data storage and performance. For more information, see the SQL Server documentation on fill factor.

You can configure an index's fill factor as follows:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().HasIndex(b => b.PublishedOn).HasFillFactor(10);
}
```

## Online creation

The ONLINE option allows concurrent user access to the underlying table or clustered index data and any associated nonclustered indexes during index creation, so that users can continue to update and query the underlying data. When you perform data definition language (DDL) operations offline, such as building or rebuilding a clustered index; these operations hold exclusive locks on the underlying data and associated indexes. For more information, see the SQL Server documentation on the ONLINE index option.

You can configure an index with the ONLINE option as follows:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().HasIndex(b => b.PublishedOn).IsCreatedOnline();
}
```
