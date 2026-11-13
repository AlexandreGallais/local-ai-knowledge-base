---
title: "Managing Migrations - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/managing-schemas/migrations/managing.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Managing Migrations - EF Core (part 2 of 2)

## Resetting all migrations

In some extreme cases, it may be necessary to remove all migrations and start over. This can be easily done by deleting your **Migrations** folder and dropping your database; at that point you can create a new initial migration, which will contain your entire current schema.

It's also possible to reset all migrations and create a single one without losing your data. This is called **squashing migrations**, and involves some manual work. EF Core doesn't currently provide an automated squashing command; see dotnet/efcore#2174.

1. Back up your database, in case something goes wrong.
2. In your database, delete all rows from the migrations history table (e.g. `DELETE FROM [__EFMigrationsHistory]` on SQL Server).
3. Delete your **Migrations** folder.
4. Create a new migration and generate a SQL script for it (`dotnet ef migrations script`).
5. Insert a single row into the migrations history, to record that the first migration has already been applied, since your tables are already there. The insert SQL is the last operation in the SQL script generated above, and resembles the following (don't forget to update the values):

```sql
INSERT INTO [__EFMigrationsHistory] ([MIGRATIONID], [PRODUCTVERSION])
VALUES (N'<full_migration_timestamp_and_name>', N'<EF_version>');
```

> **Warning:**
> Any custom migration code will be lost when the **Migrations** folder is deleted.  Any customizations must be applied to the new initial migration manually in order to be preserved.

Before squashing, verify that every deployed database is at a known migration and back it up. New databases must be created from the new initial migration, while existing databases must have the replacement migration recorded without executing schema operations that have already been applied. Test both paths before deployment.

## Additional resources

* Entity Framework Core tools reference - .NET CLI : Includes commands to update, drop, add, remove, and  more.
* Entity Framework Core tools reference - Package Manager Console in Visual Studio : Includes commands to update, drop, add, remove, and  more.
