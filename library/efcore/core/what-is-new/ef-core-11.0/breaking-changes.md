---
title: "Breaking changes in EF Core 11 (EF11) - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-11.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 11 (EF11)

This page documents API and behavior changes that have the potential to break existing applications updating from EF Core 10 to EF Core 11. Make sure to review earlier breaking changes if updating from an earlier version of EF Core:

- Breaking changes in EF Core 10
- Breaking changes in EF Core 9
- Breaking changes in EF Core 8

## Summary

> **Note:**
> If you are using Microsoft.Data.Sqlite, please see the separate section below on Microsoft.Data.Sqlite breaking changes.

| **Breaking change**                                                                                             | **Impact** |
|:--------------------------------------------------------------------------------------------------------------- | -----------|
| Cosmos: Unmapped properties are no longer preserved                              | High       |
| Sync I/O via the Azure Cosmos DB provider has been fully removed                              | Medium     |
| Microsoft.Data.SqlClient has been updated to 7.0                                                | Medium     |
| Cosmos: exception thrown when a projection evaluates to undefined               | Medium     |
| Cosmos: illegal `id` characters are no longer escaped                                   | Medium     |
| Cosmos: `__jObject` shadow property removed; JObject no longer used for serialization | Low        |
| SQL Server compatibility level now defaults to 160                       | Low        |
| EF Core now throws by default when no migrations are found                             | Low        |
| `EFOptimizeContext` MSBuild property has been removed                           | Low        |
| EF tools packages no longer reference Microsoft.EntityFrameworkCore.Design           | Low        |
| SqlVector properties are no longer loaded by default                              | Low        |
| Cosmos: empty owned collections now return an empty collection instead of null     | Low        |
| Cosmos: the default discriminator property is now named `Discriminator` in the model | Low        |
| Cosmos: floating-point values are now truncated when materializing to fixed-point types   | Low        |
| Owned JSON collections without an explicit key are obsolete                 | Low        |
| `Property` no longer configures primitive collections                     | Low        |
| Split queries now throw when concurrent modifications are detected         | Low        |

## High-impact changes

### Cosmos: Unmapped properties are no longer preserved

Tracking Issue #5421

#### Old behavior

Previously, when EF Core read a Cosmos DB document that contained JSON properties not mapped in the EF model, those extra properties were preserved in the `__jObject` shadow property and written back to the database on the next `SaveChanges`. Unmapped data in documents was transparently round-tripped.

#### New behavior

Starting with EF Core 11, unmapped JSON properties in a Cosmos DB document are ignored when reading. Any extra properties that are not part of the EF model will be lost if the entity is subsequently saved.

#### Why

Because `__jObject` has been removed (see Cosmos: `__jObject` shadow property removed; JObject no longer used for serialization), there is no mechanism to preserve unmapped properties. EF Core 11 uses a lean JSON reader that only processes the properties it knows about from the model.

#### Mitigations

If your application relies on preserving unmapped data, consider one of the following options:

- **Use `CosmosClient` directly** for documents where you need full control over the JSON shape.
- **Map all relevant properties** explicitly in your EF model, including any extra fields that should be preserved.

## Medium-impact changes

### Sync I/O via the Azure Cosmos DB provider has been fully removed

Tracking Issue #37059

#### Old behavior

Synchronous I/O via the Azure Cosmos DB provider has been unsupported since EF 9.0 (note); calling any sync I/O API - like `ToList` or `SaveChanges` threw an exception, unless a special opt-in was configured. When the opt-in was configured, sync I/O APIs worked as before, causing the provider to perform "sync-over-async" blocking against the Azure Cosmos DB SDK, which could result in deadlocks and other performance issues.

#### New behavior

Starting with EF Core 11.0, EF now always throws when a synchronous I/O API is called. There is no way to opt back into using sync I/O APIs.

#### Why

Synchronous blocking on asynchronous methods ("sync-over-async") is highly discouraged, and can lead to deadlock and other performance problems. Since the Azure Cosmos DB SDK only supports async methods, so does the EF Cosmos provider.

#### Mitigations

Convert your code to use async I/O APIs instead of sync I/O ones. For example, replace calls to `SaveChanges()` with `await SaveChangesAsync()`.

### Microsoft.Data.SqlClient has been updated to 7.0

#### Old behavior

EF Core 10 used Microsoft.Data.SqlClient 6.x, which included Azure/Entra ID authentication dependencies (such as `Azure.Core`, `Azure.Identity`, and `Microsoft.Identity.Client`) in the core package.

#### New behavior

EF Core 11 now depends on Microsoft.Data.SqlClient 7.0. This version removes Azure/Entra ID (formerly Azure Active Directory) authentication dependencies from the core package. If your application uses Entra ID authentication (for example, `ActiveDirectoryDefault`, `ActiveDirectoryInteractive`, `ActiveDirectoryManagedIdentity`, or `ActiveDirectoryServicePrincipal`), you must now install the `Microsoft.Data.SqlClient.Extensions.Azure` package separately.

In addition, `SqlAuthenticationMethod.ActiveDirectoryPassword` has been marked as obsolete.

For more details, see the Microsoft.Data.SqlClient 7.0 release notes.

#### Why

This change was made in Microsoft.Data.SqlClient to reduce dependency bloat for applications that don't use Azure authentication, which is especially beneficial for containerized deployments and local development.

#### Mitigations

If your application uses Entra ID authentication with SQL Server, add a reference to the `Microsoft.Data.SqlClient.Extensions.Azure` package in your project:

```xml
<PackageReference Include="Microsoft.Data.SqlClient.Extensions.Azure" Version="7.0.0" />
```

No code changes are required beyond adding this package reference. If you use `SqlAuthenticationMethod.ActiveDirectoryPassword`, migrate to a modern authentication method such as `ActiveDirectoryDefault` or `ActiveDirectoryInteractive`.

### Cosmos: illegal `id` characters are no longer escaped

Tracking Issue #38244

#### Old behavior

Previously, when generating the Cosmos `id` property value from a composite key that contains multiple parts, the Azure Cosmos DB provider escaped certain characters that are illegal in Cosmos resource `id` values:

| Character | Escaped as |
|-----------|------------|
| `/`       | `^2F`      |
| `\`       | `^5C`      |
| `?`       | `^3F`      |
| `#`       | `^23`      |

#### New behavior

Starting with EF Core 11.0, these characters are no longer escaped in the generated `id` value. The `id` value will contain the raw key values without modification. Note that when `id` values are concatenated (i.e. when using a composite key or when the discriminator-in-id behavior is opted into), the `|` character is used as a separator—and any `|` characters already present in key values are escaped to avoid ambiguity. No other escaping is applied.

The old escape behavior can be re-enabled by setting an `AppContext` switch:

```csharp
AppContext.SetSwitch("Microsoft.EntityFrameworkCore.EscapeIllegalCosmosIdCharacters", true);
```

#### Why

The previous escaping scheme was non-injective: the escape character `^` was never itself escaped. This meant that a key value containing the literal string `^2F` would produce the same `id` as a key value containing `/`, resulting in silent data corruption where two entities with distinct primary keys would be mapped to the same Cosmos document. Stopping the escaping altogether fixes the collision problem.

#### Mitigations

If your application uses composite keys whose values can contain the characters `/`, `\`, `?`, or `#`, be aware of the following:

- **Existing data**: Documents previously stored in Cosmos DB have `id` values using the old escape sequences (e.g. `Post|1|^2F`). After upgrading to EF Core 11, EF will generate unescaped `id` values (e.g. `Post|1|/`) and will no longer find those existing documents. To continue accessing existing data without migration, opt back into the old behavior using the `AppContext` switch described above—however, be aware that the id-collision bug will still be present.
- **New data**: If you are creating a new application or database, avoid using these illegal characters in key values, as they are not valid in Cosmos DB resource `id` values. See the Azure documentation for details.

### Cosmos: exception thrown when a projection evaluates to undefined

Tracking Issue #34067

#### Old behavior

Previously, when projecting properties in anonymous type or DTO projections via navigation over optional relationships where a segment of the path was absent in the Cosmos DB document (causing the projected value to be `undefined`), the behavior was inconsistent:

- With **single-property** anonymous type or DTO projections, EF translated the query using `SELECT VALUE`, which silently filtered out any documents where the projected value was `undefined`. This meant fewer results were returned than expected, with no indication of the missing data.
- With **multi-property** anonymous type or DTO projections, an `InvalidOperationException` with the message "Nullable object must have a value" was thrown.

For example, given an entity `Entity` with an optional owned `Associate` which in turn has an optional owned `NestedAssociate`:

```csharp
// Previously silently returned fewer results (undefined results were filtered out)
var singlePropResults = await context.Entities
    .Select(x => new { x.Associate!.NestedAssociate!.Id })
    .ToListAsync();

// Previously threw InvalidOperationException: Nullable object must have a value
var multiPropResults = await context.Entities
    .Select(x => new { x.Associate!.NestedAssociate!.Id, x.Associate!.NestedAssociate!.String })
    .ToListAsync();
```

#### New behavior

Starting with EF Core 11.0, an `InvalidOperationException` is thrown in both cases when any part of the projection evaluates to `undefined` in Azure Cosmos DB. The exception message is:

> A part of the projection was undefined, use the coalesce operator to handle possible undefined values.

#### Why

The previous behavior was inconsistent. Single-property projections could silently discard results, making it easy to miss data without any indication of the problem. The new behavior ensures consistent, predictable error reporting whenever a projection encounters an undefined value.

#### Mitigations

Use `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.IsDefined*` to filter out documents where the projected value is missing:

```csharp
var results = await context.Entities
    .Where(x => EF.Functions.IsDefined(x.Associate!.NestedAssociate!.Id))
    .Select(x => new { x.Associate!.NestedAssociate!.Id })
    .ToListAsync();
```

Alternatively, use `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.CoalesceUndefined*` to provide a default value for properties that could be `undefined`:

```csharp
var results = await context.Entities
    .Select(x => new
    {
        Id = EF.Functions.CoalesceUndefined(x.Associate!.NestedAssociate!.Id, Guid.Empty)
    })
    .ToListAsync();
```
