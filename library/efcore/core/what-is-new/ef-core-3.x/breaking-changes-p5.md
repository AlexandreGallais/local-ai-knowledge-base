---
title: "Breaking changes in EF Core 3.x - EF Core (part 5 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-3.x/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 3.x - EF Core (part 5 of 5)

### Migration IDs are now generated using the invariant culture's calendar

Tracking Issue #12978

#### Old behavior

Migration IDs were inadvertently generated using the current culture's calendar.

#### New behavior

Migration IDs are now always generated using the invariant culture's calendar (Gregorian).

#### Why

The order of migrations is important when updating the database or resolving merge conflicts. Using the invariant calendar avoids ordering issues that can result from team members having different system calendars.

#### Mitigations

This change affects anyone using a non-Gregorian calendar where the year is greater than the Gregorian calendar (like the Thai Buddhist calendar). Existing migration IDs will need to be updated so that new migrations are ordered after existing migrations.

The migration ID can be found in the Migration attribute in the migrations' designer files.

```diff
 [DbContext(typeof(MyDbContext))]
-[Migration("25620318122820_MyMigration")]
+[Migration("20190318122820_MyMigration")]
 partial class MyMigration
 {
```

The Migrations history table also needs to be updated.

```sql
UPDATE __EFMigrationsHistory
SET MigrationId = CONCAT(LEFT(MigrationId, 4)  - 543, SUBSTRING(MigrationId, 4, 150))
```

### UseRowNumberForPaging has been removed

Tracking Issue #16400

#### Old behavior

Before EF Core 3.0, `UseRowNumberForPaging` could be used to generate SQL for paging that is compatible with SQL Server 2008.

#### New behavior

Starting with EF Core 3.0, EF will only generate SQL for paging that is only compatible with later SQL Server versions.

#### Why

We are making this change because SQL Server 2008 is no longer a supported product and updating this feature to work with the query changes made in EF Core 3.0 is significant work.

#### Mitigations

We recommend updating to a newer version of SQL Server, or using a higher compatibility level, so that the generated SQL is supported. That being said, if you are unable to do this, then please comment on the tracking issue with details. We may revisit this decision based on feedback.

### Extension info/metadata has been removed from IDbContextOptionsExtension

Tracking Issue #16119

#### Old behavior

`IDbContextOptionsExtension` contained methods for providing metadata about the extension.

#### New behavior

These methods have been moved onto a new `DbContextOptionsExtensionInfo` abstract base class, which is returned from a new `IDbContextOptionsExtension.Info` property.

#### Why

Over the releases from 2.0 to 3.0 we needed to add to or change these methods several times.
Breaking them out into a new abstract base class will make it easier to make these kind of changes without breaking existing extensions.

#### Mitigations

Update extensions to follow the new pattern.
Examples are found in the many implementations of `IDbContextOptionsExtension` for different kinds of extensions in the EF Core source code.

### LogQueryPossibleExceptionWithAggregateOperator has been renamed

Tracking Issue #10985

#### Change

`RelationalEventId.LogQueryPossibleExceptionWithAggregateOperator` has been renamed to `RelationalEventId.LogQueryPossibleExceptionWithAggregateOperatorWarning`.

#### Why

Aligns the naming of this warning event with all other warning events.

#### Mitigations

Use the new name. (Note that the event ID number has not changed.)

### Clarify API for foreign key constraint names

Tracking Issue #10730

#### Old behavior

Before EF Core 3.0, foreign key constraint names were referred to as simply the "name". For example:

```csharp
var constraintName = myForeignKey.Name;
```

#### New behavior

Starting with EF Core 3.0, foreign key constraint names are now referred to as the "constraint name". For example:

```csharp
var constraintName = myForeignKey.ConstraintName;
```

#### Why

This change brings consistency to naming in this area, and also clarifies that this is the name of the foreign key constraint, and not the column or property name that the foreign key is defined on.

#### Mitigations

Use the new name.

### IRelationalDatabaseCreator.HasTables/HasTablesAsync have been made public

Tracking Issue #15997

#### Old behavior

Before EF Core 3.0, these methods were protected.

#### New behavior

Starting with EF Core 3.0, these methods are public.

#### Why

These methods are used by EF to determine if a database is created but empty. This can also be useful from outside EF when determining whether or not to apply migrations.

#### Mitigations

Change the accessibility of any overrides.

### Microsoft.EntityFrameworkCore.Design is now a DevelopmentDependency package

Tracking Issue #11506

#### Old behavior

Before EF Core 3.0, Microsoft.EntityFrameworkCore.Design was a regular NuGet package whose assembly could be referenced by projects that depended on it.

#### New behavior

Starting with EF Core 3.0, it is a DevelopmentDependency package. This means that the dependency won't flow transitively into other projects, and that you can no longer, by default, reference its assembly.

#### Why

This package is only intended to be used at design time. Deployed applications shouldn't reference it. Making the package a DevelopmentDependency reinforces this recommendation.

#### Mitigations

If you need to reference this package to override EF Core's design-time behavior, then you can update PackageReference item metadata in your project.

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="3.0.0">
  <PrivateAssets>all</PrivateAssets>
  <!-- Remove IncludeAssets to allow compiling against the assembly -->
  <!--<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>-->
</PackageReference>
```

If the package is being referenced transitively via Microsoft.EntityFrameworkCore.Tools, you will need to add an explicit PackageReference to the package to change its metadata. Such an explicit reference must be added to any project where the types from the package are needed.

### SQLitePCL.raw updated to version 2.0.0

Tracking Issue #14824

#### Old behavior

Microsoft.EntityFrameworkCore.Sqlite previously depended on version 1.1.12 of SQLitePCL.raw.

#### New behavior

We've updated our package to depend on version 2.0.0.

#### Why

Version 2.0.0 of SQLitePCL.raw targets .NET Standard 2.0. It previously targeted .NET Standard 1.1 which required a large closure of transitive packages to work.

#### Mitigations

SQLitePCL.raw version 2.0.0 includes some breaking changes. See the release notes for details.

### NetTopologySuite updated to version 2.0.0

Tracking Issue #14825

#### Old behavior

The spatial packages previously depended on version 1.15.1 of NetTopologySuite.

#### New behavior

We've update our package to depend on version 2.0.0.

#### Why

Version 2.0.0 of NetTopologySuite aims to address several usability issues encountered by EF Core users.

#### Mitigations

NetTopologySuite version 2.0.0 includes some breaking changes. See the release notes for details.

### Microsoft.Data.SqlClient is used instead of System.Data.SqlClient

Tracking Issue #15636

#### Old behavior

Microsoft.EntityFrameworkCore.SqlServer previously depended on System.Data.SqlClient.

#### New behavior

We've updated our package to depend on Microsoft.Data.SqlClient.

#### Why

Microsoft.Data.SqlClient is the flagship data access driver for SQL Server going forward, and System.Data.SqlClient no longer be the focus of development.
Some important features, such as Always Encrypted, are only available on Microsoft.Data.SqlClient.

#### Mitigations

If your code takes a direct dependency on System.Data.SqlClient, you must change it to reference Microsoft.Data.SqlClient instead; as the two packages maintain a very high degree
of API compatibility, this should only be a simple package and namespace change.

### Multiple ambiguous self-referencing relationships must be configured

Tracking Issue #13573

#### Old behavior

An entity type with multiple self-referencing uni-directional navigation properties and matching FKs was incorrectly configured as a single relationship. For example:

```csharp
public class User
{
        public Guid Id { get; set; }
        public User CreatedBy { get; set; }
        public User UpdatedBy { get; set; }
        public Guid CreatedById { get; set; }
        public Guid? UpdatedById { get; set; }
}
```

#### New behavior

This scenario is now detected in model building and an exception is thrown indicating that the model is ambiguous.

#### Why

The resultant model was ambiguous and will likely usually be wrong for this case.

#### Mitigations

Use full configuration of the relationship. For example:

```csharp
modelBuilder
     .Entity<User>()
     .HasOne(e => e.CreatedBy)
     .WithMany();

 modelBuilder
     .Entity<User>()
     .HasOne(e => e.UpdatedBy)
     .WithMany();
```

### DbFunction.Schema being null or empty string configures it to be in model's default schema

Tracking Issue #12757

#### Old behavior

A DbFunction configured with schema as an empty string was treated as built-in function without a schema. For example following code will map `DatePart` CLR function to `DATEPART` built-in function on SqlServer.

```csharp
[DbFunction("DATEPART", Schema = "")]
public static int? DatePart(string datePartArg, DateTime? date) => throw new Exception();

```

#### New behavior

All DbFunction mappings are considered to be mapped to user defined functions. Hence empty string value would put the function inside the default schema for the model. Which could be the schema configured explicitly via fluent API `modelBuilder.HasDefaultSchema()` or `dbo` otherwise.

#### Why

Previously schema being empty was a way to treat that function is built-in but that logic is only applicable for SqlServer where built-in functions do not belong to any schema.

#### Mitigations

Configure DbFunction's translation manually to map it to a built-in function.

```csharp
modelBuilder
    .HasDbFunction(typeof(MyContext).GetMethod(nameof(MyContext.DatePart)))
    .HasTranslation(args => SqlFunctionExpression.Create("DatePart", args, typeof(int?), null));
```

### ~~EF Core 3.0 targets .NET Standard 2.1 rather than .NET Standard 2.0~~ Reverted

Tracking Issue #15498

EF Core 3.0 targets .NET Standard 2.1, which is a breaking change which excludes .NET Framework applications. EF Core 3.1 reverted this and targets .NET Standard 2.0 again.

### ~~Query execution is logged at Debug level~~ Reverted

Tracking Issue #14523

We reverted this change because new configuration in EF Core 3.0 allows the log level for any event to be specified by the application. For example, to switch logging of SQL to `Debug`, explicitly configure the level in `OnConfiguring` or `AddDbContext`:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseSqlServer(connectionString)
        .ConfigureWarnings(c => c.Log((RelationalEventId.CommandExecuting, LogLevel.Debug)));
```
