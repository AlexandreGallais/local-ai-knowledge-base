---
title: "What's New in EF Core 5.0 (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-5.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 5.0 (part 2 of 2)

## Other features

### Model building

* Model building APIs have been introduced for easier configuration of value comparers.
* Computed columns can now be configured as *stored* or *virtual*.
* Precision and scale can now be configured via the Fluent API.
* New model building APIs have been introduced for navigation properties.
* New model building APIs have been introduced for fields, similar to properties.
* The .NET PhysicalAddress and IPAddress types can now be mapped to database string columns.
* A backing field can now be configured via the new `[BackingField]` attribute.
* Nullable backing fields are now allowed, providing better support for store-generated defaults where the CLR default isn't a good sentinel value (notable `bool`).
* A new `[Index]` attribute can be used on an entity type to specify an index, instead of using the Fluent API.
* A new `[Keyless]` attribute can be used to configure an entity type as having no key.
* By default, EF Core now regards discriminators as *complete*, meaning that it expects to never see discriminator values not configured by the application in the model. This allows for some performance improvements, and can be disabled if your discriminator column might hold unknown values.

### Query

* Query translation failure exceptions now contain more explicit reasons about the reasons for the failure, to help pinpoint the issue.
* No-tracking queries can now perform identity resolution, avoiding multiple entity instances being returned for the same database object.
* Added support for GroupBy with conditional aggregates (e.g. `GroupBy(o => o.OrderDate).Select(g => g.Count(i => i.OrderDate != null))`).
* Added support for translating the Distinct operator over group elements before aggregate.
* Translation of `Reverse`.
* Improved translation around `DateTime` for SQL Server (e.g. `DateDiffWeek`, `DateFromParts`).
* Translation of new methods on byte arrays (e.g. `Contains`, `Length`, `SequenceEqual`).
* Translation of some additional bitwise operators, such as two's complement.
* Translation of `FirstOrDefault` over strings.
* Improved query translation around null semantics, resulting in tighter, more efficient queries.
* User-mapped functions can now be annotated to control null propagation, again resulting in tighter, more efficient queries.
* SQL containing CASE blocks is now considerably more concise.
* The SQL Server `DATALENGTH` function can now be called in queries via the new `EF.Functions.DataLength` method.
* `EnableDetailedErrors` adds additional details to exceptions.

### Saving

* SaveChanges interception and events.
* APIs have been introduced for controlling transaction savepoints. In addition, EF Core will automatically create a savepoint when `SaveChanges` is called and a transaction is already in progress, and roll back to it in case of failure.
* A transaction ID can be explicitly set by the application, allowing for easier correlation of transaction events in logging and elsewhere.
* The default maximum batch size for SQL Server has been changed to 42 based on an analysis of batching performance.

### Migrations and scaffolding

* Tables can now be excluded from migrations.
* A new `dotnet ef migrations list` command now shows which migrations have not yet been applied to the database (`Get-Migration` does the same in the Package Management Console).
* Migrations scripts now contain transaction statements where appropriate to improve handling cases where migration application fails.
* The columns for unmapped base classes are now ordered after other columns for mapped entity types. Note this only impacts newly created tables; the column order for existing tables remains unchanged.
* Migration generation can now be aware if the migration being generated is idempotent, and whether the output will be executed immediately or generated as a script.
* New command-line parameters have been added for specifying namespaces in Migrations and scaffolding.
* The dotnet ef database update command now accepts a new `--connection` parameter for specifying the connection string.
* Scaffolding existing databases now singularizes table names, so tables named `People` and `Addresses` will be scaffolded to entity types called `Person` and `Address`. Original database names can still be preserved.
* The new `--no-onconfiguring` option can instruct EF Core to exclude `OnConfiguring` when scaffolding a model.

### Azure Cosmos DB

* Azure Cosmos DB connection settings have been expanded.
* Optimistic concurrency is now supported on Azure Cosmos DB via the use of ETags.
* The new `WithPartitionKey` method allows the Azure Cosmos DB partition key to be included both in the model and in queries.
* The string methods `Contains`, `StartsWith` and `EndsWith` are now translated for Azure Cosmos DB.
* The C# `is` operator is now translated on Azure Cosmos DB.

### Sqlite

* Computed columns are now supported.
* Retrieving binary and string data with GetBytes, GetChars, and GetTextReader is now more efficient by making use of SqliteBlob and streams.
* Initialization of SqliteConnection is now lazy.

### Other

* Change-tracking proxies can be generated that automatically implement INotifyPropertyChanging and INotifyPropertyChanged. This provides an alternative approach to change-tracking that doesn't scan for changes when `SaveChanges` is called.
* A `System.Data.Common.DbConnection` or connection string can now be changed on an already-initialized DbContext.
* The new `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Clear*` method clears the DbContext of all tracked entities. This should usually not be needed when using the best practice of creating a new, short-lived context instance for each unit-of-work. However, if there is a need to reset the state of a DbContext instance, then using the new `Clear()` method is more efficient and robust than mass-detaching all entities.
* The EF Core command line tools now automatically configure the `ASPNETCORE_ENVIRONMENT` *and* `DOTNET_ENVIRONMENT` environment variables to "Development". This brings the experience when using the generic host in line with the experience for ASP.NET Core during development.
* Custom command-line arguments can be flowed into `Microsoft.EntityFrameworkCore.Design.IDesignTimeDbContextFactory`1`, allowing applications to control how the context is created and initialized.
* The index fill factor can now be configured on SQL Server.
* The new `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.IsRelational*` property can be used to distinguish when using a relational provider and a non-relation provider (such as in-memory).
