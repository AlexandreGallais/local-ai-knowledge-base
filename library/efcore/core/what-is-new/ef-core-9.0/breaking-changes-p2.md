---
title: "Breaking changes in EF Core 9 (EF9) - EF Core (part 2 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-9.0/breaking-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 9 (EF9) - EF Core (part 2 of 4)

## Low-impact changes

### `EF.Functions.Unhex()` now returns `byte[]?`

Tracking Issue #33864

#### Old behavior

The `EF.Functions.Unhex()` function was previously annotated to return `byte[]`.

#### New behavior

Starting with EF Core 9.0, Unhex() is now annotated to return `byte[]?`.

#### Why

`Unhex()` is translated to the SQLite `unhex` function, which returns NULL for invalid inputs. As a result, `Unhex()` returned `null` for those cases, in violation of the annotation.

#### Mitigations

If you are sure that the text content passed to `Unhex()` represents a valid, hexadecimal string, you can simply add the null-forgiving operator as an assertion that the invocation will never return null:

```csharp
var binaryData = await context.Blogs.Select(b => EF.Functions.Unhex(b.HexString)!).ToListAsync();
```

Otherwise, add runtime checks for null on the return value of Unhex().

### Primitive collection APIs were replaced

Tracking Issue #33456

#### Old behavior

In EF Core 8, the following APIs were used for comparing and JSON serialization of primitive collections:

- `ListComparer<TElement>`
- `NullableValueTypeListComparer<TElement>`
- `ObjectListComparer<TElement>`
- `JsonCollectionReaderWriter<TCollection, TConcreteCollection, TElement>`
- `JsonNullableStructCollectionReaderWriter<TCollection, TConcreteCollection, TElement>`

#### New behavior

Starting with EF Core 9.0, these APIs have been replaced by APIs specialized for the collection element type:

| **EF Core 8 API** | **EF Core 9 API** |
|:------------------|:------------------|
| `ListComparer<TElement>` | `ListOfValueTypesComparer<TConcreteList, TElement>` for non-nullable value types, or `ListOfReferenceTypesComparer<TConcreteList, TElement>` for reference types |
| `NullableValueTypeListComparer<TElement>` | `ListOfNullableValueTypesComparer<TConcreteList, TElement>` |
| `ObjectListComparer<TElement>` | `ListOfReferenceTypesComparer<TConcreteList, TElement>` |
| `JsonCollectionReaderWriter<TCollection, TConcreteCollection, TElement>` | `JsonCollectionOfStructsReaderWriter<TConcreteCollection, TElement>` or `JsonCollectionOfReferencesReaderWriter<TConcreteCollection, TElement>` |
| `JsonNullableStructCollectionReaderWriter<TCollection, TConcreteCollection, TElement>` | `JsonCollectionOfNullableStructsReaderWriter<TConcreteCollection, TElement>` |

#### Why

Primitive collection infrastructure was consolidated across relational and Azure Cosmos DB providers. The new APIs use the exact concrete collection type when creating snapshots and distinguish between non-nullable value types, nullable value types, and reference types. This enables support for nested and read-only collections.

#### Mitigations

Code that directly uses one of the removed APIs must use the replacement appropriate for its element type. Supply the concrete collection type, such as `List<int>`, as `TConcreteList` or `TConcreteCollection`, and the element type as `TElement`.

### SQL Server `IndexOf` now propagates null values

Tracking Issue #18773

#### Old behavior

Previously, when SQL Server translated `IndexOf` with an empty search string, it returned `0` even if the string being searched was `null`.

#### New behavior

Starting with EF Core 9.0, SQL Server returns `null` for `IndexOf` when the string being searched is `null`. This matches the translation used by SQLite.

#### Why

The new translation follows standard null propagation and no longer treats a null string as containing an empty string at index zero.

#### Mitigations

To retain the previous behavior, handle null explicitly in the query:

```csharp
var indexes = context.Entities
    .Select(e => e.NullableString == null ? 0 : e.NullableString.IndexOf(string.Empty));
```

### Compiled models now reference value converter methods directly

Tracking Issue #35033

#### Old behavior

Previously, when using value converters with compiled models (using `dotnet ef dbcontext optimize`), EF would reference the converter type and everything worked correctly.

```c#
public sealed class BooleanToCharConverter() : ValueConverter<bool, char>(v => ConvertToChar(v), v => ConvertToBoolean(v))
{
    public static readonly BooleanToCharConverter Default = new();

    private static char ConvertToChar(bool value) // Private method
        => value ? 'Y' : 'N';

    private static bool ConvertToBoolean(char value) // Private method
        => value == 'Y';
}
```

#### New behavior

Starting with EF Core 9.0, EF generates code that directly references the conversion methods themselves. If these methods are private, compilation will fail.

#### Why

This change was necessary to support NativeAOT.

#### Mitigations

Make the methods referenced by value converters public or internal instead of private.

### SqlFunctionExpression's nullability arguments' arity validated

Tracking Issue #33852

#### Old behavior

Previously it was possible to create a `SqlFunctionExpression` with a different number of arguments and nullability propagation arguments.

#### New behavior

Starting with EF Core 9.0, EF now throws if the number of arguments and nullability propagation arguments do not match.

#### Why

Not having matching number of arguments and nullability propagation arguments can lead to unexpected behavior.

#### Mitigations

Make sure the `argumentsPropagateNullability` has same number of elements as the `arguments`. When in doubt use `false` for nullability argument.

### `ToString()` method now returns empty string for `null` instances

Tracking Issue #33941

#### Old behavior

Previously EF returned inconsistent results for the `ToString()` method when the argument value was `null`. E.g. `ToString()` on `bool?` property with `null` value returned `null`, but for non-property `bool?` expressions whose value was `null` it returned `True`. The behavior was also inconsistent for other data types, e.g. `ToString()` on `null` value enum returned empty string.

#### New behavior

Starting with EF Core 9.0, the `ToString()` method now consistently returns empty string in all cases when the argument value is `null`.

#### Why

The old behavior was inconsistent across different data types and situations, as well as not aligned with the C# behavior.

#### Mitigations

To revert to the old behavior, rewrite the query accordingly:

```csharp
var newBehavior = context.Entity.Select(x => x.NullableBool.ToString());
var oldBehavior = context.Entity.Select(x => x.NullableBool == null ? null : x.NullableBool.ToString());
```

### Shared framework dependencies were updated to 9.0.x

#### Old behavior

Apps using the `Microsoft.NET.Sdk.Web` SDK and targetting net8.0 would resolve packages like `System.Text.Json`, `Microsoft.Extensions.Caching.Memory`, `Microsoft.Extensions.Configuration.Abstractions`, `Microsoft.Extensions.Logging` and `Microsoft.Extensions.DependencyModel` from the shared framework, so these assemblies wouldn't normally be deployed with the app.

#### New behavior

While EF Core 9.0 still supports net8.0 it now references the 9.0.x versions of `System.Text.Json`, `Microsoft.Extensions.Caching.Memory`, `Microsoft.Extensions.Configuration.Abstractions`, `Microsoft.Extensions.Logging` and `Microsoft.Extensions.DependencyModel`. Apps targetting net8.0 will not be able to leverage the shared framework to avoid deploying these assemblies.

#### Why

The matching dependency versions contain the latest security fixes and using them simplifies the servicing model for EF Core.

#### Mitigations

Change your app to target net9.0 to get the previous behavior.

### EF tools no longer support .NET Framework projects

Tracking Issue #37745

#### Old behavior

Previously, the EF Core tools (`dotnet-ef` CLI and Package Manager Console tools) worked with projects targeting .NET Framework.

#### New behavior

Starting with EF Core 9.0, the EF Core tools no longer work with projects targeting .NET Framework. The tools produce an error when the startup project targets .NET Framework.

#### Why

The current version of EF Core tools works with all supported EF Core versions and there are no longer any supported EF Core versions that work on .NET Framework.

#### Mitigations

Update your project to target .NET (e.g., .NET 8 or later). If your project currently targets .NET Framework, see the porting guide for information on migrating to .NET.

### `EF.Constant()` and `EF.Parameter()` no longer work inside compiled queries

Tracking Issue #33674

#### Old behavior

In EF Core 8, `Microsoft.EntityFrameworkCore.EF.Constant*` and `Microsoft.EntityFrameworkCore.EF.Parameter*` could be used inside compiled queries (`Microsoft.EntityFrameworkCore.EF.CompileQuery*` and `Microsoft.EntityFrameworkCore.EF.CompileAsyncQuery*`):

```csharp
var lookbackDays = 7;

var compiledQuery = EF.CompileAsyncQuery(
    (AppDbContext db) => db.Blogs
        .Where(b => b.PublishedOn >= DateTime.Today.AddDays(EF.Constant(-lookbackDays))));
```

#### New behavior

Starting with EF Core 9.0, using `Microsoft.EntityFrameworkCore.EF.Constant*` or `Microsoft.EntityFrameworkCore.EF.Parameter*` inside a compiled query throws an `InvalidCastException`:

> :::no-loc text="Unable to cast object of type 'System.Linq.Expressions.ConstantExpression' to type 'System.Linq.Expressions.ParameterExpression'.":::

#### Why

The internal implementation of `Microsoft.EntityFrameworkCore.EF.Constant*` was changed to avoid full query recompilation for each different constant value. The previous implementation introduced constant nodes early in the query pipeline (before query caching), causing expensive cache misses whenever a different value was passed to `EF.Constant()`. The new implementation processes these methods at a later stage, which is incompatible with compiled queries.

#### Mitigations

Either remove the `Microsoft.EntityFrameworkCore.EF.Constant*` or `Microsoft.EntityFrameworkCore.EF.Parameter*` call from the compiled query, or stop using a compiled query for that particular query. Note that removing `EF.Constant()` causes the value to be sent as a SQL parameter rather than inlined as a constant, which may affect query plan performance.

### Some `NoTrackingWithIdentityResolution` queries are now prohibited for JSON collections

Tracking Issue #33073

#### Old behavior

Previously, using `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.AsNoTrackingWithIdentityResolution*` (or setting `Microsoft.EntityFrameworkCore.QueryTrackingBehavior.NoTrackingWithIdentityResolution`) with queries that include JSON-mapped entity collections could silently produce incorrect results or data corruption, depending on the order in which entities were processed during materialization. Additionally, such queries could throw an unhelpful `Invalid token type: 'StartObject'` exception in some scenarios.

#### New behavior

Starting with EF Core 9.0, EF Core restricts the use of `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.AsNoTrackingWithIdentityResolution*` for certain JSON collection query patterns, to prevent silent data corruption:

- If entity instances in a JSON collection would be materialized in an order that could cause data corruption, EF Core throws an exception instructing the user to use a different tracking behavior.
- Using LINQ operators (such as `OrderBy`, `Where`, `Skip`, `Take`, etc.) directly on JSON collection navigations in a query with `AsNoTrackingWithIdentityResolution()` is now prohibited. For example, the following query would throw an exception:

```csharp
var blogs = await context.Blogs
    .AsNoTrackingWithIdentityResolution()
    .Select(b => new
    {
        Blog = b,
        TopPosts = b.JsonPosts.OrderBy(p => p.Rating).Take(3).ToList()
    })
    .ToListAsync();
```

#### Why

The combination of `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.AsNoTrackingWithIdentityResolution*` and JSON collections could silently produce incorrect materialized objects due to how JSON is streamed from the database: nested includes in JSON are part of the parent's materialization rather than being materialized separately. The stand-alone change tracker used for identity resolution relies on key values to deduplicate entity instances, but when LINQ operators are applied to JSON collections, EF Core cannot reliably propagate those key values to the materializer, resulting in entities with null keys and potential data corruption.

#### Mitigations

Use a regular tracking query if identity resolution is required:

```csharp
var blogs = await context.Blogs
    .AsTracking()
    .Select(b => new
    {
        Blog = b,
        TopPosts = b.JsonPosts.OrderBy(p => p.Rating).Take(3).ToList()
    })
    .ToListAsync();
```

If you do not need identity resolution, use `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.AsNoTracking*` instead:

```csharp
var blogs = await context.Blogs
    .AsNoTracking()
    .Select(b => new
    {
        Blog = b,
        TopPosts = b.JsonPosts.OrderBy(p => p.Rating).Take(3).ToList()
    })
    .ToListAsync();
```

### All pending migrations are applied in a single transaction

Tracking Issue #34439

#### Old behavior

Previously, EF Core would (by default) wrap each migration in its own transaction when applying migrations.

#### New behavior

Starting with EF Core 9.0, all pending migrations are applied within a single transaction as part of migration locking. If any migration fails, the entire transaction is rolled back. This behavior was reverted in EF Core 10.

#### Why

Applying all migrations in a single transaction ensures the database is either fully up-to-date or left unchanged if an error occurs, avoiding intermediate states.

#### Mitigations

If you need per-migration transaction behavior in EF Core 9, upgrade to EF Core 10, which reverts to wrapping each migration in its own transaction.
