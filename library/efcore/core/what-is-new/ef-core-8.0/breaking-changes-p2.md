---
title: "Breaking changes in EF Core 8.0 (EF8) - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 8.0 (EF8) - EF Core (part 2 of 2)

## Low-impact changes

### SQLite `Math` methods now translate to SQL

Tracking Issue #18843

#### Old Behavior

Previously only the Abs, Max, Min, and Round methods on `Math` were translated to SQL. All other members would be evaluated on the client if they appeared in the final Select expression of a query.

#### New behavior

In EF Core 8.0, all `Math` methods with corresponding SQLite math functions are translated to SQL.

These math functions have been enabled in the native SQLite library that we provide by default (through our dependency on the SQLitePCLRaw.bundle_e_sqlite3 NuGet package). They have also been enabled in the library provided by SQLitePCLRaw.bundle_e_sqlcipher. If you're using one of these libraries, your application should not be affected by this change.

There is a chance, however, that applications including the native SQLite library by other means may not enable the math functions. In these cases, the `Math` methods will be translated to SQL and encounter *no such function* errors when executed.

#### Why

SQLite added built-in math functions in version 3.35.0. Even though they're disabled by default, they've become pervasive enough that we decided to provide default translations for them in our EF Core SQLite provider.

We also collaborated with Eric Sink on the SQLitePCLRaw project to enable math functions in all of the native SQLite libraries provided as part of that project.

#### Mitigations

The simplest way to fix breaks is, when possible, to enable the math function is the native SQLite library by specifying the SQLITE_ENABLE_MATH_FUNCTIONS compile-time option.

If you don't control compilation of the native library, you can also fix breaks by create the functions yourself at runtime using the Microsoft.Data.Sqlite APIs.

```csharp
sqliteConnection
    .CreateFunction<double, double, double>(
        "pow",
        Math.Pow,
        isDeterministic: true);
```

Alternatively, you can force client-evaluation by splitting the Select expression into two parts separated by `AsEnumerable`.

```csharp
// Before
var query = dbContext.Cylinders
    .Select(
        c => new
        {
            Id = c.Id
            // May throw "no such function: pow"
            Volume = Math.PI * Math.Pow(c.Radius, 2) * c.Height
        });

// After
var query = dbContext.Cylinders
    // Select the properties you'll need from the database
    .Select(
        c => new
        {
            c.Id,
            c.Radius,
            c.Height
        })
    // Switch to client-eval
    .AsEnumerable()
    // Select the final results
    .Select(
        c => new
        {
            Id = c.Id,
            Volume = Math.PI * Math.Pow(c.Radius, 2) * c.Height
        });
```

### ITypeBase replaces IEntityType in some APIs

Tracking Issue #13947

#### Old behavior

Previously, all mapped structural types were entity types.

#### New behavior

With the introduction of complex types in EF8, some APIs that were previously use an `IEntityType` now use `ITypeBase` so that the APIs can be used with either entity or complex types. This includes:

- `IProperty.DeclaringEntityType` is now obsolete and `IProperty.DeclaringType` should be used instead.
- `IEntityTypeIgnoredConvention` is now obsolete and `ITypeIgnoredConvention` should be used instead.
- `IValueGeneratorSelector.Select` now accepts an `ITypeBase` which may be, but does not have to be an `IEntityType`.

#### Why

With the introduction of complex types in EF8, these APIs can be used with either `IEntityType` or `IComplexType`.

#### Mitigations

The old APIs are obsoleted, but will not be removed until EF10. Code should be updated to use the new APIs ASAP.

### ValueConverter and ValueComparer expressions must use public APIs for the compiled model

Tracking Issue #24896

#### Old behavior

Previously, `ValueConverter` and `ValueComparer` definitions were not included in the compiled model, and so could contain arbitrary code.

#### New behavior

EF now extracts the expressions from the `ValueConverter` and `ValueComparer` objects and includes these C# in the compiled model. This means that these expressions must only use public API.

#### Why

The EF team is gradually moving more constructs into the compiled model to support using EF Core with AOT in the future.

#### Mitigations

Make the APIs used by the comparer public. For example, consider this simple converter:

```csharp
public class MyValueConverter : ValueConverter<string, byte[]>
{
    public MyValueConverter()
        : base(v => ConvertToBytes(v), v => ConvertToString(v))
    {
    }

    private static string ConvertToString(byte[] bytes)
        => ""; // ... TODO: Conversion code

    private static byte[] ConvertToBytes(string chars)
        => Array.Empty<byte>(); // ... TODO: Conversion code
}
```

To use this converter in a compiled model with EF8, the `ConvertToString` and `ConvertToBytes` methods must be made public. For example:

```csharp
public class MyValueConverter : ValueConverter<string, byte[]>
{
    public MyValueConverter()
        : base(v => ConvertToBytes(v), v => ConvertToString(v))
    {
    }

    public static string ConvertToString(byte[] bytes)
        => ""; // ... TODO: Conversion code

    public static byte[] ConvertToBytes(string chars)
        => Array.Empty<byte>(); // ... TODO: Conversion code
}
```

### ExcludeFromMigrations no longer excludes other tables in a TPC hierarchy

Tracking Issue #30079

#### Old behavior

Previously, using `ExcludeFromMigrations` on a table in a TPC hierarchy would also exclude other tables in the hierarchy.

#### New behavior

Starting with EF Core 8.0, `ExcludeFromMigrations` does not impact other tables.

#### Why

The old behavior was a bug and prevented migrations from being used to manage hierarchies across projects.

#### Mitigations

Use `ExcludeFromMigrations` explicitly on any other table that should be excluded.

### Non-shadow integer keys are persisted to Cosmos documents

Tracking Issue #31664

#### Old behavior

Previously, non-shadow integer properties that match the criteria to be a synthesized key property would not be persisted into the JSON document, but were instead re-synthesized on the way out.

#### New behavior

Starting with EF Core 8.0, these properties are now persisted.

#### Why

The old behavior was a bug and prevented properties that match the synthesized key criteria from being persisted to Cosmos.

#### Mitigations

Exclude the property from the model if its value should not be persisted.
Additionally, you can disable this behavior entirely by setting `Microsoft.EntityFrameworkCore.Issue31664` AppContext switch to `true`, see AppContext for library consumers for more details.

```c#
AppContext.SetSwitch("Microsoft.EntityFrameworkCore.Issue31664", isEnabled: true);
```

### Relational model is generated in the compiled model

Tracking Issue #24896

#### Old behavior

Previously, the relational model was computed at run-time even when using a compiled model.

#### New behavior

Starting with EF Core 8.0, the relational model is part of the generated compiled model. However, for particularly large models the generated file may fail to compile.

#### Why

This was done to further improve startup time.

#### Mitigations

Edit the generated `*ModelBuilder.cs` file and remove the line `AddRuntimeAnnotation("Relational:RelationalModel", CreateRelationalModel());` as well as the method `CreateRelationalModel()`.

### Scaffolding may generate different navigation names

Tracking Issue #27832

#### Old behavior

Previously when scaffolding a `DbContext` and entity types from an existing database, the navigation names for relationships were sometimes derived from a common prefix of multiple foreign key column names.

#### New behavior

Starting with EF Core 8.0, common prefixes of column names from a composite foreign key are no longer used to generate navigation names.

#### Why

This is an obscure naming rule which sometimes generates very poor names like, `S`, `Student_`, or even just `_`. Without this rule, strange names are no longer generated, and the naming conventions for navigations are also made simpler, thereby making it easier to understand and predict which names will be generated.

#### Mitigations

The EF Core Power Tools have an option to keep generating navigations in the old way. Alternatively, the code generated can be fully customized using T4 templates. This can be used to example the foreign key properties of scaffolding relationships and use whatever rule is appropriate for your code to generate the navigation names you need.

### Discriminators now have a max length

Tracking Issue #10691

#### Old behavior

Previously, discriminator columns created for TPH inheritance mapping were configured as `nvarchar(max)` on SQL Server/Azure SQL, or the equivalent unbounded string type on other databases.

#### New behavior

Starting with EF Core 8.0, discriminator columns are created with a max length that covers all the known discriminator values. EF will generate a migration to make this change. However, if the discriminator column is constrained in some way -- for example, as part of an index -- then the `AlterColumn` created by Migrations may fail.

#### Why

`nvarchar(max)` columns are inefficient and unnecessary when the lengths of all possible values are known.

#### Mitigations

The column size can be made explicitly unbounded:

```csharp
modelBuilder.Entity<Foo>()
    .Property<string>("Discriminator")
    .HasMaxLength(-1);
```

### SQL Server key values are compared case-insensitively

Tracking Issue #27526

#### Old behavior

Previously, when tracking entities with string keys with the SQL Server/Azure SQL database providers, the key values were compared using the default .NET case-sensitive ordinal comparer.

#### New behavior

Starting with EF Core 8.0, SQL Server/Azure SQL string key values are compared using the default .NET case-insensitive ordinal comparer.

#### Why

By default, SQL Server uses case-insensitive comparisons when comparing foreign key values for matches to principal key values. This means when EF uses case-sensitive comparisons it may not connect a foreign key to a principal key when it should.

#### Mitigations

Case-sensitive comparisons can be used by setting a custom `ValueComparer`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var comparer = new ValueComparer<string>(
        (l, r) => string.Equals(l, r, StringComparison.Ordinal),
        v => v.GetHashCode(),
        v => v);

    modelBuilder.Entity<Blog>()
        .Property(e => e.Id)
        .Metadata.SetValueComparer(comparer);

    modelBuilder.Entity<Post>(
        b =>
        {
            b.Property(e => e.Id).Metadata.SetValueComparer(comparer);
            b.Property(e => e.BlogId).Metadata.SetValueComparer(comparer);
        });
}
```

### Multiple AddDbContext calls are applied in different order

Tracking Issue #32518

#### Old behavior

Previously, when multiple calls to `AddDbContext`, `AddDbContextPool`, `AddDbContextFactory` or `AddPooledDbContextFactory` were made with the same context type but conflicting configuration, the first one won.

#### New behavior

Starting with EF Core 8.0, the configuration from the last call will take precedence.

#### Why

This was changed to be consistent with the new method `ConfigureDbContext`, that enables configuration composability for non-conflicting configurations. See DbContext configuration for more information.

#### Mitigations

If your application depends on the previous behavior where the first registration wins, you have several options:

1. **Reorder your registrations**: Place the registration with the configuration you want to use last:

   ```csharp
   services.AddDbContext<MyContext>(options => 
       options.UseSqlServer("connection1")); // This will be ignored now
   
   services.AddDbContext<MyContext>(options => 
       options.UseSqlServer("connection2")); // This will be used
   ```

2. **Remove previous registrations**: If possible, remove the conflicting registration.

3. **Use conditional registration**: Check if the service is already registered before adding:

   ```csharp
   if (!services.Any(d => d.ServiceType == typeof(DbContextOptions<MyContext>)))
   {
       services.AddDbContext<MyContext>(options => 
           options.UseSqlServer("connection"));
   }
   ```

4. **Use the new `ConfigureDbContext` method**: This allows you to configure options without registering the context itself. See DbContext configuration for more information:

   ```csharp
   services.ConfigureDbContext<MyContext>(options => 
       options.UseSqlServer("connection"));
   
   services.AddDbContext<MyContext>(); // Register the context without configuration
   ```

### EntityTypeAttributeConventionBase replaced with TypeAttributeConventionBase

#### New behavior

In EF Core 8.0 `EntityTypeAttributeConventionBase` was renamed to `TypeAttributeConventionBase`.

#### Why

`TypeAttributeConventionBase` represents the functionality better as it now can be used for complex types and entity types.

#### Mitigations

Replace `EntityTypeAttributeConventionBase` usages with `TypeAttributeConventionBase`.
