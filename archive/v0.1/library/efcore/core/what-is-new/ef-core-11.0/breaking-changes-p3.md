---
title: "Breaking changes in EF Core 11 (EF11) - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-11.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 11 (EF11) - EF Core (part 3 of 3)

### Owned JSON collections without an explicit key are obsolete

Tracking Issue #37289

#### Old behavior

Previously, owned entity types mapped to a JSON column via `Microsoft.EntityFrameworkCore.RelationalOwnedNavigationBuilderExtensions.ToJson*` could be used as collections without configuring an explicit primary key. EF Core would synthesize an ordinal (positional) key <example-value> the scenes to identify each item in the collection:

```csharp
public class Blog
{
    public int Id { get; set; }
    public List<Post> Posts { get; set; } = new();
}

public class Post
{
    // No key <example-value>
    public required string Title { get; set; }
    public required string Content { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
    => modelBuilder.Entity<Blog>().OwnsMany(b => b.Posts, b => b.ToJson());
```

#### New behavior

Starting with EF Core 11.0, configuring an owned JSON collection without an explicit key <example-value> an `OwnedEntityMappedToJsonCollectionWarning` warning. The mapping continues to work, but is now considered deprecated and is expected to be removed in a future release.

Owned JSON entities that have an explicit primary key, as well as non-collection owned JSON references, are not affected by this change.

#### Why

Complex types became fully supported in EF Core 10, including for JSON mapping. Complex types are a better fit than owned types for JSON documents: they have value semantics and no identity, which avoids many of the issues that come from using owned entity types—which are entity types—to model what is fundamentally a value embedded in another document. In particular, owned JSON collections without an explicit key <example-value> on a synthetic ordinal key, which has known limitations and corner cases.

#### Mitigations

The recommended mitigation is to migrate the type to a complex type, which is now the preferred way to map types to JSON:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
    => modelBuilder.Entity<Blog>().ComplexCollection(b => b.Posts, b => b.ToJson());
```

Alternatively, if you need to keep the owned-type mapping, configure a non-shadow primary key on the owned type. Once a key is configured, the warning no longer applies:

```csharp
public class Post
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
    => modelBuilder.Entity<Blog>().OwnsMany(b => b.Posts, b =>
    {
        b.ToJson();
        b.HasKey(p => p.Id);
    });
```

If you cannot migrate immediately, you can suppress the warning via `ConfigureWarnings`:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.ConfigureWarnings(w => w.Ignore(CoreEventId.OwnedEntityMappedToJsonCollectionWarning));
```

### `Property` no longer configures primitive collections

#### Old behavior

Previously, calling `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder.Property*` for a member whose CLR type is a collection (for example `List<int>`) could result in the member being configured as a primitive collection, because a property could be promoted to a primitive collection at model finalization based on its type.

#### New behavior

Starting with EF Core 11.0, whether a property is a primitive collection is determined entirely when the property is configured. A primitive collection must be configured with `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder.PrimitiveCollection*` (or discovered as one by convention). `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder.Property*` now always configures the member as a non-collection (scalar) property, and there is no longer any finalization-time promotion to a primitive collection.

#### Why

Treating the element type as a finalization-time concern led to inconsistencies and bugs. For example, a property could be discovered as a primitive collection, but later resolve to a scalar via an inherited value converter, leaving a stale element type that caused an `InvalidCastException` at model finalization. Making primitive collections a creation-time concern also makes mapping unambiguous in cases like `byte[]`, where it is otherwise unclear whether the member should be mapped as a binary scalar or as a collection of bytes.

#### Mitigations

If you relied on `Property` to configure a primitive collection, switch to `PrimitiveCollection` instead:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
    => modelBuilder.Entity<Blog>().PrimitiveCollection(b => b.Tags);
```

In most cases no change is required, since primitive collections are discovered by convention.

### Split queries now throw when concurrent modifications are detected

Tracking Issue #33826

#### Old behavior

Previously, when a split query (using `AsSplitQuery()`) encountered out-of-order or orphaned child rows caused by concurrent data modifications between the split query's SQL statements, EF Core silently discarded the affected child collections. The result was an entity with an empty collection even though the related rows still existed—no exception was thrown and no warning was logged.

#### New behavior

Starting with EF Core 11.0, EF Core throws a `DbQueryConcurrencyException` when split query results cannot be correlated because of concurrent data modifications. The exception message describes the situation and suggests remediation:

> The results of a split query could not be correlated because the data was modified concurrently while the query was executing. Re-execute the query, or execute it within a serializable or snapshot transaction to prevent concurrent modifications.

#### Why

Silently returning incorrect data (empty collections for entities that have related rows) is far worse than surfacing an error. This scenario is intrinsically caused by the lack of data-consistency guarantees in split queries when the database is modified between statements. Throwing a retriable exception makes the problem visible and gives callers a clear path to recovery.

#### Mitigations

The simplest mitigation is to re-execute the query; the concurrent modification is transient and the retry will typically succeed:

```csharp
const int maxRetries = 3;

List<Blog> blogs;
for (var attempt = 0; attempt < maxRetries; attempt++)
{
    try
    {
        blogs = await context.Blogs
            .Include(b => b.Posts)
            .AsSplitQuery()
            .ToListAsync();
        break;
    }
    catch (DbQueryConcurrencyException) when (attempt < maxRetries - 1)
    {
        // Retry on concurrent modification
    }
}
```

Alternatively, wrap the split query in a serializable or snapshot transaction to prevent concurrent modifications from affecting the results:

```csharp
await using var transaction =
    await context.Database.BeginTransactionAsync(IsolationLevel.Serializable);

var blogs = await context.Blogs
    .Include(b => b.Posts)
    .AsSplitQuery()
    .ToListAsync();

await transaction.CommitAsync();
```

If neither retry nor a transaction is acceptable, switch to a single query (`AsSingleQuery()`) which is always consistent:

```csharp
var blogs = await context.Blogs
    .Include(b => b.Posts)
    .AsSingleQuery()
    .ToListAsync();
```

## Microsoft.Data.Sqlite breaking changes

> **Note:**
> SQLitePCLRaw is an external, community-maintained library that is not owned or maintained by Microsoft. Microsoft.Data.Sqlite depends on it for its SQLite connectivity.

### Summary

| **Breaking change**                                                                                       | **Impact** |
|:----------------------------------------------------------------------------------------------------------|------------|
| Microsoft.Data.Sqlite no longer supports .NET Framework                              | Medium     |
| Some SQLitePCLRaw bundle packages are no longer maintained                  | Medium     |
| SQLite no longer supports UWP and classic Xamarin                              | Low        |

### Medium-impact changes

#### Microsoft.Data.Sqlite no longer supports .NET Framework

Tracking Issue #35599

##### Old behavior

Previously, `Microsoft.Data.Sqlite` and `Microsoft.Data.Sqlite.Core` targeted `netstandard2.0`, which allowed them to be used from .NET Framework applications.

##### New behavior

Starting with `Microsoft.Data.Sqlite` 11.0, both packages target `net10.0` only. .NET Framework applications can no longer reference or use `Microsoft.Data.Sqlite` 11.0.

##### Why

The `netstandard2.0` target made older, unsupported .NET targets appear to be supported, and it also masked API differences such as `DateOnly` and `TimeOnly` support. Targeting the minimum supported .NET version explicitly makes the supported platform surface clear.

##### Mitigations

If possible, move the application to .NET 10 or later.

If you must remain on .NET Framework, stay on the latest `Microsoft.Data.Sqlite` 10.0.x servicing release. The 10.0.x line uses `SQLitePCLRaw.bundle_e_sqlite3`, allowing .NET Framework applications to update the referenced `SQLitePCLRaw.bundle_e_sqlite3` version even after `Microsoft.Data.Sqlite` stops receiving updates.

#### Some SQLitePCLRaw bundle packages are no longer maintained

Tracking Issue #5108

##### Old behavior

Previously, the `SQLitePCLRaw.bundle_e_sqlcipher`, `SQLitePCLRaw.bundle_sqlite3`, `SQLitePCLRaw.bundle_winsqlite3`, `SQLitePCLRaw.bundle_green`, and `SQLitePCLRaw.bundle_e_sqlite3mc` packages provided a convenient way to configure SQLitePCLRaw with the corresponding SQLite provider.

##### New behavior

The `SQLitePCLRaw.bundle_e_sqlcipher`, `SQLitePCLRaw.bundle_sqlite3`, `SQLitePCLRaw.bundle_winsqlite3`, `SQLitePCLRaw.bundle_green`, and `SQLitePCLRaw.bundle_e_sqlite3mc` packages are no longer updated by the SQLitePCLRaw maintainer. They are not compatible with `SQLitePCLRaw.Core` 3.0 and later, so applications that directly reference any of these packages alongside `SQLitePCLRaw.Core` 3.x will encounter conflicts. Applications should migrate to the recommended alternatives to avoid future breakage.

##### Why

The SQLitePCLRaw maintainer removed these bundles in version 3.0; each bundle contained only a single line of configuration code and added unnecessary packaging overhead while the underlying provider packages continue to be supported. The `SQLitePCLRaw.bundle_e_sqlcipher` package is particularly affected: it provided encryption-enabled builds that are barely maintained, which is a security concern for encryption software where vulnerabilities may go unpatched.

##### Mitigations

**If using `SQLitePCLRaw.bundle_e_sqlcipher`** (encryption-enabled SQLite), migrate to one of the following alternatives:

- **SQLite3 Multiple Ciphers**: NuGet packages are available from SQLite3MultipleCiphers-NuGet. Reference `Microsoft.Data.Sqlite.Core` together with `SQLite3MC.PCLRaw.bundle`:

  ```xml
  <PackageReference Include="Microsoft.Data.Sqlite.Core" Version="11.0.0" />
  <PackageReference Include="SQLite3MC.PCLRaw.bundle" Version="2.x.x" />
  ```

  When encrypting a new database or opening an existing database that was encrypted with SQLCipher, configure the cipher scheme using URI parameters—for example: `Data Source=file:example.db?cipher=sqlcipher&legacy=4`. See How to open an existing database encrypted with SQLCipher for details.

- **SQLite Encryption Extension (SEE)**: The official encryption implementation from the SQLite team. A paid license is required. See https://sqlite.org/com/see.html and SourceGear's SQLite build service for NuGet options.

- **SQLCipher**: Purchase supported builds from Zetetic, or build the open source code yourself.

**If using `SQLitePCLRaw.bundle_sqlite3` or `SQLitePCLRaw.bundle_winsqlite3`**, replace the bundle package with the corresponding provider package:

```xml
<!-- Old -->
<PackageReference Include="SQLitePCLRaw.bundle_sqlite3" Version="2.x.x" />
<!-- or -->
<PackageReference Include="SQLitePCLRaw.bundle_winsqlite3" Version="2.x.x" />

<!-- New -->
<PackageReference Include="SQLitePCLRaw.provider.sqlite3" Version="3.x.x" />
<!-- or -->
<PackageReference Include="SQLitePCLRaw.provider.winsqlite3" Version="3.x.x" />
```

Then add explicit initialization before using SQLite:

```csharp
// For sqlite3
static void Init()
{
    SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());
}

// For winsqlite3
static void Init()
{
    SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_winsqlite3());
}
```

**If using `SQLitePCLRaw.bundle_e_sqlite3mc`**, replace the package reference with `SQLite3MC.PCLRaw.bundle`:

```xml
<!-- Old -->
<PackageReference Include="SQLitePCLRaw.bundle_e_sqlite3mc" Version="2.x.x" />

<!-- New -->
<PackageReference Include="SQLite3MC.PCLRaw.bundle" Version="2.x.x" />
```

**If using `SQLitePCLRaw.bundle_green`**, switch to `SQLitePCLRaw.bundle_e_sqlite3`. Alternatively, use `SQLitePCLRaw.config.e_sqlite3` paired with a separate native library package such as `SourceGear.sqlite3`, which allows updating the SQLite version independently:

```xml
<PackageReference Include="SQLitePCLRaw.bundle_e_sqlite3" Version="3.x.x" />
```

If you only target iOS and want to use the system SQLite library, reference the provider directly and initialize it explicitly:

```xml
<PackageReference Include="SQLitePCLRaw.Core" Version="3.x.x" />
<PackageReference Include="SQLitePCLRaw.provider.sqlite3" Version="3.x.x" />
```

```csharp
static void Init()
{
    SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());
}
```

For more details, see SQLite encryption options for use with SQLitePCLRaw and SQLitePCLRaw 3.0 Release Notes.

### Low-impact changes

#### SQLite no longer supports UWP and classic Xamarin

Tracking Issue #5108

##### Old behavior

Previously, `SQLitePCLRaw.bundle_e_sqlite3` included native SQLite builds for Universal Windows Platform (UWP) and classic Xamarin (Xamarin.iOS, Xamarin.Android, and Xamarin.Mac) targets.

##### New behavior

Starting with `SQLitePCLRaw.bundle_e_sqlite3` 2.1.12 (referenced by `Microsoft.Data.Sqlite` 11.0), native builds for UWP and classic Xamarin are no longer included. Applications targeting these platforms can no longer use the bundled native SQLite library.

##### Why

SQLite 3.53.0 (shipped by `SQLitePCLRaw.bundle_e_sqlite3` 2.1.12) no longer supports UWP and classic Xamarin. The SQLitePCLRaw maintainer dropped these builds in order to keep up with newer upstream SQLite releases.

##### Mitigations

Migrate UWP applications to the Windows App SDK and classic Xamarin applications to .NET MAUI, which are supported on modern .NET.

If you must remain on UWP or classic Xamarin, stay on an earlier version of `SQLitePCLRaw.bundle_e_sqlite3` that still includes the native builds for these platforms.
