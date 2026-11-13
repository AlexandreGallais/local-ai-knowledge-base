---
title: "Accessing Tracked Entities - EF Core (part 3 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/entity-entries.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Accessing Tracked Entities - EF Core (part 3 of 4)

### Working with all properties of an entity

`Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Properties` returns an `System.Collections.Generic.IEnumerable`1` of `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry` for every property of the entity. This can be used to perform an action for every property of the entity. For example, to set any DateTime property to `DateTime.Now`:

```csharp
foreach (var propertyEntry in context.Entry(blog).Properties)
{
    if (propertyEntry.Metadata.ClrType == typeof(DateTime))
    {
        propertyEntry.CurrentValue = DateTime.Now;
    }
}
```

In addition, EntityEntry contains several methods to get and set all property values at the same time. These methods use the `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues` class, which represents a collection of properties and their values. PropertyValues can be obtained for current or original values, or for the values as currently stored in the database. For example:

```csharp
var currentValues = context.Entry(blog).CurrentValues;
var originalValues = context.Entry(blog).OriginalValues;
var databaseValues = await context.Entry(blog).GetDatabaseValuesAsync();
```

These PropertyValues objects are not very useful on their own. However, they can be combined to perform common operations needed when manipulating entities. This is useful when working with data transfer objects and when resolving optimistic concurrency conflicts. The following sections show some examples.

#### Setting current or original values from an entity or DTO

The current or original values of an entity can be updated by copying values from another object. For example, consider a `BlogDto` data transfer object (DTO) with the same properties as the entity type:

```csharp
public class BlogDto
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

This can be used to set the current values of a tracked entity using `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues.SetValues*`:

```csharp
var blogDto = new BlogDto { Id = 1, Name = "1unicorn2" };

context.Entry(blog).CurrentValues.SetValues(blogDto);
```

This technique is sometimes used when updating an entity with values obtained from a service call or a client in an n-tier application. Note that the object used does not have to be of the same type as the entity so long as it has properties whose names match those of the entity. In the example above, an instance of the DTO `BlogDto` is used to set the current values of a tracked `Blog` entity.

Note that properties will only be marked as modified if the value set differs from the current value.

#### Setting current or original values from a dictionary

The previous example set values from an entity or DTO instance. The same behavior is available when property values are stored as name/value pairs in a dictionary. For example:

```csharp
var blogDictionary = new Dictionary<string, object> { ["Id"] = 1, ["Name"] = "1unicorn2" };

context.Entry(blog).CurrentValues.SetValues(blogDictionary);
```

#### Setting current or original values from the database

The current or original values of an entity can be updated with the latest values from the database by calling `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.GetDatabaseValues` or `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.GetDatabaseValuesAsync*` and using the returned object to set current or original values, or both. For example:

```csharp
var databaseValues = await context.Entry(blog).GetDatabaseValuesAsync();
context.Entry(blog).CurrentValues.SetValues(databaseValues);
context.Entry(blog).OriginalValues.SetValues(databaseValues);
```

#### Creating a cloned object containing current, original, or database values

The PropertyValues object returned from CurrentValues, OriginalValues, or GetDatabaseValues can be used to create a clone of the entity using `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues.ToObject`. For example:

```csharp
var clonedBlog = (await context.Entry(blog).GetDatabaseValuesAsync()).ToObject();
```

Note that `ToObject` returns a new instance that is not tracked by the DbContext. The returned object also does not have any relationships set to other entities.

The cloned object can be useful for resolving issues related to concurrent updates to the database, especially when data binding to objects of a certain type. See optimistic concurrency for more information.

### Working with all navigations of an entity

`Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigations` returns an `System.Collections.Generic.IEnumerable`1` of `Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry` for every navigation of the entity. `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.References` and `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Collections` do the same thing, but restricted to reference or collection navigations respectively. This can be used to perform an action for every navigation of the entity. For example, to force loading of all related entities:

```csharp
foreach (var navigationEntry in context.Entry(blog).Navigations)
{
    navigationEntry.Load();
}
```

### Working with all members of an entity

Regular properties and navigation properties have different state and behavior. It is therefore common to process navigations and non-navigations separately, as shown in the sections above. However, sometimes it can be useful to do something with any member of the entity, regardless of whether it is a regular property or navigation. `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Member*` and `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Members` are provided for this purpose. For example:

```csharp
foreach (var memberEntry in context.Entry(blog).Members)
{
    Console.WriteLine(
        $"Member {memberEntry.Metadata.Name} is of type {memberEntry.Metadata.ClrType.ShortDisplayName()} and has value {memberEntry.CurrentValue}");
}
```

Running this code on a blog from the sample generates the following output:

```output
Member Id is of type int and has value 1
Member Name is of type string and has value .NET Blog
Member Posts is of type IList<Post> and has value System.Collections.Generic.List`1[Post]
```

> **Tip:**
> The change tracker debug view shows information like this. The debug view for the entire change tracker is generated from the individual `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.DebugView` of each tracked entity.

## Find and FindAsync

`Microsoft.EntityFrameworkCore.DbContext.Find*`, `Microsoft.EntityFrameworkCore.DbContext.FindAsync*`, `Microsoft.EntityFrameworkCore.DbSet`1.Find*`, and `Microsoft.EntityFrameworkCore.DbSet`1.FindAsync*` are designed for efficient lookup of a single entity when its primary key is known. Find first checks if the entity is already tracked, and if so returns the entity immediately. A database query is only made if the entity is not tracked locally. For example, consider this code that calls Find twice for the same entity:

```csharp
using var context = new BlogsContext();

Console.WriteLine("First call to Find...");
var blog1 = await context.Blogs.FindAsync(1);

Console.WriteLine($"...found blog {blog1.Name}");

Console.WriteLine();
Console.WriteLine("Second call to Find...");
var blog2 = await context.Blogs.FindAsync(1);
Debug.Assert(blog1 == blog2);

Console.WriteLine("...returned the same instance without executing a query.");
```

The output from this code (including EF Core logging) when using SQLite is:

```output
First call to Find...
info: 12/29/2020 07:45:53.682 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (1ms) [Parameters=[@__p_0='1' (DbType = String)], CommandType='Text', CommandTimeout='30']
      SELECT "b"."Id", "b"."Name"
      FROM "Blogs" AS "b"
      WHERE "b"."Id" = @__p_0
      LIMIT 1
...found blog .NET Blog

Second call to Find...
...returned the same instance without executing a query.
```

Notice that the first call does not find the entity locally and so executes a database query. Conversely, the second call returns the same instance without querying the database because it is already being tracked.

Find returns null if an entity with the given key is not tracked locally and does not exist in the database.

### Composite keys

Find can also be used with composite keys. For example, consider an `OrderLine` entity with a composite key consisting of the order ID and the product ID:

```csharp
public class OrderLine
{
    public int OrderId { get; set; }
    public int ProductId { get; set; }

    //...
}
```

The composite key must be configured in `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*` to define the key parts _and their order_. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<OrderLine>()
        .HasKey(e => new { e.OrderId, e.ProductId });
}
```

Notice that `OrderId` is the first part of the key and `ProductId` is the second part of the key. This order must be used when passing key values to Find. For example:

```csharp
var orderline = await context.OrderLines.FindAsync(orderId, productId);
```

## Using ChangeTracker.Entries to access all tracked entities

So far we have accessed only a single `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry` at a time. `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries` returns an EntityEntry for every entity currently tracked by the DbContext. For example:

```csharp
using var context = new BlogsContext();
var blogs = await context.Blogs.Include(e => e.Posts).ToListAsync();

foreach (var entityEntry in context.ChangeTracker.Entries())
{
    Console.WriteLine($"Found {entityEntry.Metadata.Name} entity with ID {entityEntry.Property("Id").CurrentValue}");
}
```

This code generates the following output:

```output
Found Blog entity with ID 1
Found Post entity with ID 1
Found Post entity with ID 2
```

Notice that entries for both blogs and posts are returned. The results can instead be filtered to a specific entity type using the `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries``1` generic overload:

```csharp
foreach (var entityEntry in context.ChangeTracker.Entries<Post>())
{
    Console.WriteLine(
        $"Found {entityEntry.Metadata.Name} entity with ID {entityEntry.Property(e => e.Id).CurrentValue}");
}
```

The output from this code shows that only posts are returned:

```output
Found Post entity with ID 1
Found Post entity with ID 2
```

Also, using the generic overload returns generic `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1` instances. This is what allows that fluent-like access to the `Id` property in this example.

The generic type used for filtering does not have to be a mapped entity type; an unmapped base type or interface can be used instead. For example, if all the entity types in the model implement an interface defining their key property:

```csharp
public interface IEntityWithKey
{
    int Id { get; set; }
}
```

Then this interface can be used to work with the key of any tracked entity in a strongly-typed manner. For example:

```csharp
foreach (var entityEntry in context.ChangeTracker.Entries<IEntityWithKey>())
{
    Console.WriteLine(
        $"Found {entityEntry.Metadata.Name} entity with ID {entityEntry.Property(e => e.Id).CurrentValue}");
}
```
