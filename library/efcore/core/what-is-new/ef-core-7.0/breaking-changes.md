---
title: "Breaking changes in EF Core 7.0 (EF7) - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 7.0 (EF7)

This page documents API and behavior changes that have the potential to break existing applications updating from EF Core 6 to EF Core 7. Make sure to review earlier breaking changes if updating from an earlier version of EF Core:

- Breaking changes in EF Core 6

## Target Framework

EF Core 7.0 targets .NET 6. This means that existing applications that target .NET 6 can continue to do so. Applications targeting older .NET, .NET Core, and .NET Framework versions will need to target .NET 6 or .NET 7 to use EF Core 7.0.

## Summary

| **Breaking change**                                                                                                                      | **Impact** |
|:-----------------------------------------------------------------------------------------------------------------------------------------|------------|
| `Encrypt` defaults to `true` for SQL Server connections                                                                 | High       |
| Some warnings will again throw exceptions by default                                                              | High       |
| SQL Server tables with triggers or certain computed columns now require special EF Core configuration | High       |
| SQLite tables with AFTER triggers and virtual tables now require special EF Core configuration                        | High       |
| Orphaned dependents of optional relationships are not automatically deleted                                         | Medium     |
| Cascade delete is configured between tables when using TPT mapping with SQL Server                                | Medium     |
| Higher chance of busy/locked errors on SQLite when not using write-ahead logging                                       | Medium     |
| Key properties may need to be configured with a provider value comparer                                      | Low        |
| Check constraints and other table facets are now configured on the table                                         | Low        |
| Navigations from new entities to deleted entities are not fixed up                                                     | Low        |
| Using `FromSqlRaw` and related methods from the wrong provider throws                                         | Low        |
| Scaffolded `OnConfiguring` no longer calls `IsConfigured`                                                              | Low        |
| `ToTable(null, ...)` throws `ArgumentNullException`                                                                     | Low        |

## High-impact changes

### `Encrypt` defaults to `true` for SQL Server connections

Tracking Issue: SqlClient #1210

> **Important:**
> This is a severe breaking change in the Microsoft.Data.SqlClient package. **There is nothing that can be done in EF Core to revert or mitigate this change.** Please direct feedback to the Microsoft.Data.SqlClient GitHub Repo or contact a Microsoft Support Professional for additional questions or help.

#### Old behavior

SqlClient connection strings use `Encrypt=False` by default. This allows connections on development machines where the local server does not have a valid certificate.

#### New behavior

SqlClient connection strings use `Encrypt=True` by default. This means that:

- The server must be configured with a valid certificate
- The client must trust this certificate

If these conditions are not met, then a `SqlException` will be thrown. For example:

> A connection was successfully established with the server, but then an error occurred during the login process. (provider: SSL Provider, error: 0 - The certificate chain was issued by an authority that is not trusted.)

#### Why

This change was made to ensure that, by default, either the connection is secure or the application will fail to connect.

#### Mitigations

There are three ways to proceed:

1. Install a valid certificate on the server. Note that this is an involved process and requires obtaining a certificate and ensuring it is signed by an authority trusted by the client.
2. If the server has a certificate, but it is not trusted by the client, then `TrustServerCertificate=True` to allow bypassing the normal trust mechanism.
3. Explicitly add `Encrypt=False` to the connection string.

> **Warning:**
> Options 2 and 3 both leave the server in a potentially insecure state.

### Some warnings throw exceptions by default again

Tracking Issue #29069

#### Old behavior

In EF Core 6.0, a bug in the SQL Server provider meant that some warnings that are configured to throw exceptions by default were instead being logged but not throwing exceptions. These warnings are:

| EventId                                                                                                                                      | Description                                                                                                     |
|----------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.AmbientTransactionWarning`                    | An application may have expected an ambient transaction to be used when it was actually ignored.                |
| `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.IndexPropertiesBothMappedAndNotMappedToTable` | An index specifies properties some of which are mapped and some of which are not mapped to a column in a table. |
| `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.IndexPropertiesMappedToNonOverlappingTables`  | An index specifies properties which map to columns on non-overlapping tables.                                   |
| `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.ForeignKeyPropertiesMappedToUnrelatedTables`  | A foreign key specifies properties which don't map to the related tables.                                       |

#### New behavior

Starting with EF Core 7.0, these warnings again, by default, result in an exception being thrown.

#### Why

These are issues that very likely indicate an error in the application code that should be fixed.

#### Mitigations

Fix the underlying issue that is the reason for the warning.

Alternately, the warning level can be changed so that it is logged only or suppressed entirely. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .ConfigureWarnings(b => b.Ignore(RelationalEventId.AmbientTransactionWarning));
```

### SQL Server tables with triggers or certain computed columns now require special EF Core configuration

Tracking Issue #27372

#### Old behavior

Previous versions of the SQL Server provider saved changes via a less efficient technique which always worked.

#### New behavior

By default, EF Core now saves changes via a significantly more efficient technique; unfortunately, this technique is not supported on SQL Server if the target table has database triggers, or certain types of computed columns. See the SQL Server documentation for more details.

#### Why

The performance improvements linked to the new method are significant enough that it's important to bring them to users by default. At the same time, we estimate usage of database triggers or the affected computed columns in EF Core applications to be low enough that the negative breaking change consequences are outweighed by the performance gain.

#### Mitigations

In EF7 or later, if the target table has a trigger, then you can let EF Core know this, and EF will revert to the previous, less efficient technique. This can be done by configuring the corresponding entity type as follows:

##### EF 8+

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .ToTable(tb => tb.UseSqlOutputClause(false));
}
```

##### EF 7

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .ToTable(tb => tb.HasTrigger("SomeTrigger"));
}
```

---

For more information, including on how to configure this for all your tables, see the SQL Server documentation.

### SQLite tables with AFTER triggers and virtual tables now require special EF Core configuration

Tracking Issue #29916

#### Old behavior

Previous versions of the SQLite provider saved changes via a less efficient technique which always worked.

#### New behavior

By default, EF Core now saves changes via a more efficient technique, using the RETURNING clause. Unfortunately, this technique is not supported on SQLite if target table is has database AFTER triggers, is virtual, or if older versions of SQLite are being used. See the SQLite documentation for more details.

#### Why

The simplifications and performance improvements linked to the new method are significant enough that it's important to bring them to users by default. At the same time, we estimate usage of database triggers and virtual tables in EF Core applications to be low enough that the negative breaking change consequences are outweighed by the performance gain.

#### Mitigations

In EF Core 8.0, the `UseSqlReturningClause` method has been introduced to explicitly revert back to the older, less efficient SQL. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .ToTable(tb => tb.UseSqlReturningClause(false));
}
```

If you are still using EF Core 7.0, then it's possible to revert to the old mechanism for the entire application by inserting the following code in your context configuration:

```c#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlite(...)
        .ReplaceService<IUpdateSqlGenerator, SqliteLegacyUpdateSqlGenerator>();
```
