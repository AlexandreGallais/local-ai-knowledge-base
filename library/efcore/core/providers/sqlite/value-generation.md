---
title: "SQLite Database Provider - Value Generation - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/sqlite/value-generation.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# SQLite Value Generation

This page details value generation configuration and patterns that are specific to the SQLite provider. It's recommended to first read the general page on value generation.

## AUTOINCREMENT columns

By convention, numeric primary key columns that are configured to have their values generated on add are set up with SQLite's AUTOINCREMENT feature. Starting with EF Core 10, SQLite AUTOINCREMENT can also be enabled or disabled via configuration.

### Configuring AUTOINCREMENT

By convention, integer primary keys are automatically configured with AUTOINCREMENT when they are not part of a composite key and don't have a foreign key on them. However, you may need to explicitly configure a property to use SQLite AUTOINCREMENT when the property has a value conversion from a non-integer type, or when overriding conventions:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<BlogWithConvertedId>()
        .Property(b => b.Id)
        .HasConversion<int>()
        .UseAutoincrement();
}
```

## Disabling AUTOINCREMENT for default SQLite value generation

AUTOINCREMENT imposes extra CPU, memory, disk space, and disk I/O overhead compared to the default key generation algorithm in SQLite - ROWID. The downside of `ROWID` is that it reuses values from deleted rows. If your scenario wouldn't be affected by this, you may want to disable AUTOINCREMENT and use SQLite's default value generation behavior instead. You can do this using the Metadata API:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .Property(b => b.Id)
        .Metadata.SetValueGenerationStrategy(SqliteValueGenerationStrategy.None);
}
```

Alternatively, you can configure EF to not treat the property as value-generated:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .Property(b => b.Id)
        .ValueGeneratedNever();
}
```

This means that it's up to the application to supply a value for the property before saving to the database. Note that this still won't disable the default value generation server-side, so non-EF usages could still get a generated value. To completely disable value generation, change the column type from `INTEGER` to `INT`.
