---
title: "Identity Resolution - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/identity-resolution.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Identity Resolution - EF Core (part 3 of 3)

## Identity resolution and queries

Identity resolution happens automatically when entities are tracked from a query. This means that if an entity instance with a given key value is already tracked, then this existing tracked instance is used instead of creating a new instance. This has an important consequence: if the data has changed in the database, then this will not be reflected in the results of the query. This is a good reason to use a new DbContext instance for each unit-of-work, as described in DbContext Initialization and Configuration, and elaborated on in Change Tracking in EF Core.

> **Important:**
> It is important to understand that EF Core always executes a LINQ query on a DbSet against the database and only returns results based on what is in the database. However, for a tracking query, if the entities returned are already tracked, then the tracked instances are used instead of creating instances from the data in the database.

`Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Reload` or `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.GetDatabaseValues` can be used when tracked entities need to be refreshed with the latest data from the database. See Accessing Tracked Entities for more information.

In contrast to tracking queries, no-tracking queries do not perform identity resolution. This means that no-tracking queries can return duplicates just like in the JSON serialization case described earlier. This is usually not an issue if the query results are going to be serialized and sent to the client.

> **Tip:**
> Do not routinely perform a no-tracking query and then attach the returned entities to the same context. This will be both slower and harder to get right than using a tracking query.

No-tracking queries do not perform identity resolution because doing so impacts the performance of streaming a large number of entities from a query. This is because identity resolution requires keeping track of each instance returned so that it can be used instead of later creating a duplicate.

No-tracking queries can be forced to perform identity resolution by using `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.AsNoTrackingWithIdentityResolution``1(System.Linq.IQueryable{``0})`. The query will then keep track of returned instances (without tracking them in the normal way) and ensure no duplicates are created in the query results.

## Overriding object equality

EF Core uses reference equality when comparing entity instances. This is the case even if the entity types override `System.Object.Equals(System.Object)` or otherwise change object equality. However, there is one place where overriding equality can impact EF Core behavior: when collection navigations use the overridden equality instead of reference equality, and hence report multiple instances as the same.

Because of this it is recommended that overriding entity equality should be avoided. If it is used, then make sure to create collection navigations that force reference equality. For example, create an equality comparer that uses reference equality:

```csharp
public sealed class ReferenceEqualityComparer : IEqualityComparer<object>
{
    private ReferenceEqualityComparer()
    {
    }

    public static ReferenceEqualityComparer Instance { get; } = new ReferenceEqualityComparer();

    bool IEqualityComparer<object>.Equals(object x, object y) => x == y;

    int IEqualityComparer<object>.GetHashCode(object obj) => RuntimeHelpers.GetHashCode(obj);
}
```

(Starting with .NET 5, this is included in the BCL as `System.Collections.Generic.ReferenceEqualityComparer`.)

This comparer can then be used when creating collection navigations. For example:

```csharp
public ICollection<Order> Orders { get; set; }
    = new HashSet<Order>(ReferenceEqualityComparer.Instance);
```

### Comparing key properties

In addition to equality comparisons, key values also need to be ordered. This is important for avoiding deadlocks when updating multiple entities in a single call to SaveChanges. All types used for primary, alternate, or foreign key properties, as well as those used for unique indexes, must implement `System.IComparable`1` and `System.IEquatable`1`. Types normally used as keys (int, Guid, string, etc.) already support these interfaces. Custom key types may add these interfaces.
