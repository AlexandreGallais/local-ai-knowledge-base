---
title: "Miscellaneous - Microsoft SQL Server Database Provider - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/providers/sql-server/misc.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Miscellaneous notes for SQL Server

## Azure SQL database options

> **Note:**
> You should use `UseAzureSql` method instead of `UseSqlServer` when connecting to Azure SQL.

Azure SQL Database provides a variety of pricing options that are usually configured through the Azure Portal. However, if you are managing the schema using EF Core migrations, you can configure the desired options with EF, and they will get applied when EF creates the database.

You can specify the service tier of the database (EDITION) using HasServiceTier:

```csharp
modelBuilder.HasServiceTier("BusinessCritical");
```

You can specify the maximum size of the database using HasDatabaseMaxSize:

```csharp
modelBuilder.HasDatabaseMaxSize("2 GB");
```

You can specify the performance level of the database (SERVICE_OBJECTIVE) using HasPerformanceLevel:

```csharp
modelBuilder.HasPerformanceLevel("BC_Gen4_1");
```

Use HasPerformanceLevelSql to configure the elastic pool, since the value is not a string literal:

```csharp
modelBuilder.HasPerformanceLevelSql("ELASTIC_POOL ( name = myelasticpool )");
```

> **Tip:**
> You can find all the supported values in the ALTER DATABASE documentation.

## SaveChanges, triggers and the OUTPUT clause

When EF Core saves changes to the database, it does so with an optimized technique using the T-SQL OUTPUT clause. Unfortunately, the OUTPUT clause has some limitations; it notably cannot be used with tables that have triggers, for example.

If you run into a limitation related to the use of the OUTPUT clause, you can disable it on a specific table via `Microsoft.EntityFrameworkCore.SqlServerEntityTypeExtensions.UseSqlOutputClause*`:

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .ToTable(tb => tb.UseSqlOutputClause(false));
}
```

Doing this will make EF switch to an older, less efficient technique for updating the table.

If most or all of your tables have triggers, you can configure this for all your model's tables by using the following model building convention:

```c#
public class NoOutputClauseConvention : IModelFinalizingConvention
{
    public virtual void ProcessModelFinalizing(
        IConventionModelBuilder modelBuilder,
        IConventionContext<IConventionModelBuilder> context)
    {
        foreach (var entityType in modelBuilder.Metadata.GetEntityTypes())
        {
            var table = StoreObjectIdentifier.Create(entityType, StoreObjectType.Table);
            if (table is not null)
            {
                entityType.Builder.UseSqlOutputClause(false);
            }

            foreach (var fragment in entityType.GetMappingFragments(StoreObjectType.Table))
            {
                entityType.Builder.UseSqlOutputClause(false, fragment.StoreObject);
            }
        }
    }
}
```

This effectively calls `Microsoft.EntityFrameworkCore.SqlServerEntityTypeExtensions.UseSqlOutputClause*` on all your model's tables, instead of you having to do it manually for each and every table.
