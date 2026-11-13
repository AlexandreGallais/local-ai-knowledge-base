---
title: "Breaking changes in EF Core 9 (EF9) - EF Core (part 4 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-9.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 9 (EF9) - EF Core (part 4 of 4)

### Medium-impact changes

#### Sync I/O via the Azure Cosmos DB provider is no longer supported

Tracking Issue #32563

##### Old behavior

Previously, calling synchronous methods like `ToList` or `SaveChanges` would cause EF Core to block synchronously using `.GetAwaiter().GetResult()` when executing async calls against the Azure Cosmos DB SDK. This can result in deadlock.

##### New behavior

Starting with EF Core 9.0, EF now throws by default when attempting to use synchronous I/O. The exception message is "Azure Cosmos DB does not support synchronous I/O. Make sure to use and correctly await only async methods when using Entity Framework Core to access Azure Cosmos DB. See https://aka.ms/ef-cosmos-nosync for more information."

##### Why

Synchronous blocking on asynchronous methods can result in deadlock, and the Azure Cosmos DB SDK only supports async methods.

##### Mitigations

In EF Core 9.0, the error can be suppressed with:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.ConfigureWarnings(w => w.Ignore(CosmosEventId.SyncNotSupported));
}
```

That being said, applications should stop using sync APIs with Azure Cosmos DB since this is not supported by the Azure Cosmos DB SDK. The ability to suppress the exception will be removed in a future release of EF Core, after which the only option will be to use async APIs.

#### SQL queries must now project JSON values directly

Tracking Issue #25527

##### Old behavior

Previously, EF generated queries such as the following:

```sql
SELECT c["City"] FROM root c
```

Such queries cause Azure Cosmos DB to wrap each result in a JSON object, as follows:

```json
[
    {
        "City": "Berlin"
    },
    {
        "City": "México D.F."
    }
]
```

##### New behavior

Starting with EF Core 9.0, EF now adds the `VALUE` modifier to queries as follows:

```sql
SELECT VALUE c["City"] FROM root c
```

Such queries cause Azure Cosmos DB to return the values directly, without being wrapped:

```json
[
    "Berlin",
    "México D.F."
]
```

If your application makes use of SQL queries, such queries are likely broken after upgrading to EF 9.0, as they don't include the `VALUE` modifier.

##### Why

Wrapping each result in an additional JSON object can cause performance degradation in some scenarios, bloats the JSON result payload, and isn't the natural way to work with Azure Cosmos DB.

##### Mitigations

To mitigate, simply add the `VALUE` modifier to the projections of your SQL queries, as shown above.

#### Undefined results are now automatically filtered from query results

Tracking Issue #25527

##### Old behavior

Previously, EF generated queries such as the following:

```sql
SELECT c["City"] FROM root c
```

Such queries cause Azure Cosmos DB to wrap each result in a JSON object, as follows:

```json
[
    {
        "City": "Berlin"
    },
    {
        "City": "México D.F."
    }
]
```

If any of the results were undefined (e.g. the `City` property was absent from the document), an empty document was returned, and EF would return `null` for that result.

##### New behavior

Starting with EF Core 9.0, EF now adds the `VALUE` modifier to queries as follows:

```sql
SELECT VALUE c["City"] FROM root c
```

Such queries cause Azure Cosmos DB to return the values directly, without being wrapped:

```json
[
    "Berlin",
    "México D.F."
]
```

The Azure Cosmos DB behavior is to automatically filter `undefined` values out of results; this means that if one of the `City` properties is absent from the document, the query would return just a single result, rather than two results, with one being `null`.

##### Why

Wrapping each result in an additional JSON object can cause performance degradation in some scenarios, bloats the JSON result payload, and isn't the natural way to work with Azure Cosmos DB.

##### Mitigations

If getting `null` values for undefined results is important for your application, coalesce the `undefined` values to `null` using the new `EF.Functions.Coalesce` operator:

```csharp
var users = await context.Customer
    .Select(c => EF.Functions.CoalesceUndefined(c.City, null))
    .ToListAsync();
```

#### Incorrectly translated queries are no longer translated

Tracking Issue #34123

##### Old behavior

Previously, EF translated queries such as the following:

```csharp
var sessions = await context.Sessions
    .Take(5)
    .Where(s => s.Name.StartsWith("f"))
    .ToListAsync();
```

However, the SQL translation for this query was incorrect:

```sql
SELECT c
FROM root c
WHERE ((c["Discriminator"] = "Session") AND STARTSWITH(c["Name"], "f"))
OFFSET 0 LIMIT @__p_0
```

In SQL, the `WHERE` clause is evaluated _before_ the `OFFSET` and `LIMIT` clauses; but in the LINQ query above, the `Take` operator appears before the `Where` operator. As a result, such queries could return incorrect results.

##### New behavior

Starting with EF Core 9.0, such queries are no longer translated, and an exception is thrown.

##### Why

Incorrect translations can cause silent data corruption, which can introduce hard-to-discover bugs in your application. EF always prefer to fail-fast by throwing up-front rather than to possibly cause data corruption.

##### Mitigations

If you were happy with the previous behavior and would like to execute the same SQL, simply swap around the order of LINQ operators:

```csharp
var sessions = await context.Sessions
    .Where(s => s.Name.StartsWith("f"))
    .Take(5)
    .ToListAsync();
```

Unfortunately, Azure Cosmos DB does not currently support the `OFFSET` and `LIMIT` clauses in SQL subqueries, which is what the proper translation of the original LINQ query requires.

### Low-impact changes

#### `HasIndex` now throws instead of being ignored

Tracking Issue #34023

##### Old behavior

Previously, calls to <xref: Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.HasIndex*> were ignored by the EF Cosmos DB provider.

##### New behavior

The provider now throws if <xref: Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.HasIndex*> is specified.

##### Why

In Azure Cosmos DB, all properties are indexed by default, and no indexing needs to be specified. While it's possible to define a custom indexing policy, this isn't currently supported by EF, and can be done via the Azure Portal without EF support. Since <xref: Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.HasIndex*> calls weren't doing anything, they are no longer allowed.

##### Mitigations

Remove any calls to <xref: Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.HasIndex*>.

#### `IncludeRootDiscriminatorInJsonId` was renamed to `HasRootDiscriminatorInJsonId` after 9.0.0-rc.2

Tracking Issue #34717

##### Old behavior

The `IncludeRootDiscriminatorInJsonId` API was introduced in 9.0.0 rc.1.

##### New behavior

For the final release of EF Core 9.0, the API was renamed to `HasRootDiscriminatorInJsonId`

##### Why

Another related API was renamed to start with `Has` instead of `Include`, and so this one was renamed for consistency as well.

##### Mitigations

If your code is using the `IncludeRootDiscriminatorInJsonId` API, simply change it to reference `HasRootDiscriminatorInJsonId` instead.

#### The referenced Newtonsoft.Json version was updated from 10.0.2 to 13.0.1

##### Old behavior

The Cosmos provider referenced Newtonsoft.Json version 10.0.2.

##### New behavior

Starting with EF Core 9.0, the Cosmos provider references Newtonsoft.Json version 13.0.1.

##### Why

The previously referenced version of Newtonsoft.Json has known vulnerabilities. The version was updated to avoid depending on a package version with known security issues.

##### Mitigations

The upgrade to Newtonsoft.Json 13.0.1 should not cause issues in most cases. If your application uses Newtonsoft.Json directly and relies on a specific older version, you can update your application to be compatible with Newtonsoft.Json 13.0.1 or later. See the Newtonsoft.Json release notes for details on changes between versions.
