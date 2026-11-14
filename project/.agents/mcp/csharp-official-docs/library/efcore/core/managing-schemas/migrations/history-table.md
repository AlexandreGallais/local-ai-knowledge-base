---
title: "Custom Migrations History Table - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/managing-schemas/migrations/history-table.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Custom Migrations History Table

By default, EF Core keeps track of which migrations have been applied to the database by recording them in a table named
`__EFMigrationsHistory`. For various reasons, you may want to customize this table to better suit your needs.

> **Important:**
> If you customize the Migrations history table *after* applying migrations, you are responsible for updating the
> existing table in the database.

## Schema and table name

You can change the schema and table name using the `MigrationsHistoryTable()` method in `OnConfiguring()` (or
`ConfigureServices()` on ASP.NET Core). Here is an example using the SQL Server EF Core provider.

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder options)
    => options.UseSqlServer(
        _connectionString,
        x => x.MigrationsHistoryTable("__MyMigrationsHistory", "mySchema"));
```

## Other changes

To configure additional aspects of the table, override and replace the provider-specific
`IHistoryRepository` service. Here is an example of changing the MigrationId column name to *Id* on SQL Server.

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder options)
    => options
        .UseSqlServer(_connectionString)
        .ReplaceService<IHistoryRepository, MyHistoryRepository>();
```

> **Warning:**
> `SqlServerHistoryRepository` is inside an internal namespace and may change in future releases.

```csharp
internal class MyHistoryRepository : SqlServerHistoryRepository
{
    public MyHistoryRepository(HistoryRepositoryDependencies dependencies)
        : base(dependencies)
    {
    }

    protected override void ConfigureTable(EntityTypeBuilder<HistoryRow> history)
    {
        base.ConfigureTable(history);

        history.Property(h => h.MigrationId).HasColumnName("Id");
    }
}
```
