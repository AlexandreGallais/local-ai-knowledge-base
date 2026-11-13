---
title: "Accessing Tracked Entities - EF Core (part 2 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/entity-entries.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Accessing Tracked Entities - EF Core (part 2 of 4)

## Using DbContext.Entry and EntityEntry instances

For each tracked entity, Entity Framework Core (EF Core) keeps track of:

- The overall state of the entity. This is one of `Unchanged`, `Modified`, `Added`, or `Deleted`; see Change Tracking in EF Core for more information.
- The relationships between tracked entities. For example, the blog to which a post belongs.
- The "current values" of properties.
- The "original values" of properties, when this information is available. Original values are the property values that existed when entity was queried from the database.
- Which property values have been modified since they were queried.
- Other information about property values, such as whether or not the value is temporary.

Passing an entity instance to `System.Data.Entity.DbContext.Entry*` results in an `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1` providing access to this information for the given entity. For example:

```csharp
using var context = new BlogsContext();

var blog = await context.Blogs.SingleAsync(e => e.Id == 1);
var entityEntry = context.Entry(blog);
```

The following sections show how to use an EntityEntry to access and manipulate entity state, as well as the state of the entity's properties and navigations.

### Working with the entity

The most common use of `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1` is to access the current `Microsoft.EntityFrameworkCore.EntityState` of an entity. For example:

```csharp
var currentState = context.Entry(blog).State;
if (currentState == EntityState.Unchanged)
{
    context.Entry(blog).State = EntityState.Modified;
}
```

The Entry method can also be used on entities that are not yet tracked. This _does not start tracking the entity_; the state of the entity is still `Detached`. However, the returned EntityEntry can then be used to change the entity state, at which point the entity will become tracked in the given state. For example, the following code will start tracking a Blog instance as `Added`:

```csharp
var newBlog = new Blog();
Debug.Assert(context.Entry(newBlog).State == EntityState.Detached);

context.Entry(newBlog).State = EntityState.Added;
Debug.Assert(context.Entry(newBlog).State == EntityState.Added);
```

> **Tip:**
> Unlike in EF6, setting the state of an individual entity will not cause all connected entities to be tracked. This makes setting the state this way a lower-level operation than calling `Add`, `Attach`, or `Update`, which operate on an entire graph of entities.

The following table summarizes ways to use an EntityEntry to work with an entire entity:

| EntityEntry member                                                                                         | Description
|:-----------------------------------------------------------------------------------------------------------|----------------------
| `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.State`         | Gets and sets the `Microsoft.EntityFrameworkCore.EntityState` of the entity.
| `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Entity`        | Gets the entity instance.
| `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Context`       | The `Microsoft.EntityFrameworkCore.DbContext` that is tracking this entity.
| `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Metadata`      | `Microsoft.EntityFrameworkCore.Metadata.IEntityType` metadata for the type of entity.
| `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.IsKeySet`      | Whether or not the entity has had its key value set.
| `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Reload`        | Overwrites property values with values read from the database.
| `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.DetectChanges` | Forces detection of changes for this entity only; see Change Detection and Notifications.

### Working with a single property

Several overloads of `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Property*` allow access to information about an individual property of an entity. For example, using a strongly-typed, fluent-like API:

```csharp
PropertyEntry<Blog, string> propertyEntry = context.Entry(blog).Property(e => e.Name);
```

The property name can instead be passed as a string. For example:

```csharp
PropertyEntry<Blog, string> propertyEntry = context.Entry(blog).Property<string>("Name");
```

The returned `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2` can then be used to access information about the property. For example, it can be used to get and set the current value of the property on this entity:

```csharp
string currentValue = context.Entry(blog).Property(e => e.Name).CurrentValue;
context.Entry(blog).Property(e => e.Name).CurrentValue = "1unicorn2";
```

Both of the Property methods used above return a strongly-typed generic `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2` instance. Using this generic type is preferred because it allows access to property values without boxing value types. However, if the type of entity or property is not known at compile-time, then a non-generic `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry` can be obtained instead:

```csharp
PropertyEntry propertyEntry = context.Entry(blog).Property("Name");
```

This allows access to property information for any property regardless of its type, at the expense of boxing value types. For example:

```csharp
object blog = await context.Blogs.SingleAsync(e => e.Id == 1);

object currentValue = context.Entry(blog).Property("Name").CurrentValue;
context.Entry(blog).Property("Name").CurrentValue = "1unicorn2";
```

The following table summarizes property information exposed by PropertyEntry:

| PropertyEntry member                               | Description
|:-------------------------------------------------|----------------------
| `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2.CurrentValue`  | Gets and sets the current value of the property.
| `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2.OriginalValue` | Gets and sets the original value of the property, if available.
| `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2.EntityEntry`   | A back reference to the `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1` for the entity.
| `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.Metadata`          | `Microsoft.EntityFrameworkCore.Metadata.IProperty` metadata for the property.
| `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsModified`        | Indicates whether this property is marked as modified, and allows this state to be changed.
| `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsTemporary`       | Indicates whether this property is marked as temporary, and allows this state to be changed.

Notes:

- The original value of a property is the value that the property had when the entity was queried from the database. However, original values are not available if the entity was disconnected and then explicitly attached to another DbContext, for example with `Attach` or `Update`. In this case, the original value returned will be the same as the current value.
- `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` will only update properties marked as modified. Set `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsModified` to true to force EF Core to update a given property value, or set it to false to prevent EF Core from updating the property value.
- Temporary values are typically generated by EF Core value generators. Setting the current value of a property will replace the temporary value with the given value and mark the property as not temporary. Set `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsTemporary` to true to force a value to be temporary even after it has been explicitly set.

### Working with a single navigation

Several overloads of `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Reference*`, `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Collection*`, and `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigation*` allow access to information about an individual navigation.

Reference navigations to a single related entity are accessed through the `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Reference*` methods. Reference navigations point to the "one" sides of one-to-many relationships, and both sides of one-to-one relationships. For example:

```csharp
ReferenceEntry<Post, Blog> referenceEntry1 = context.Entry(post).Reference(e => e.Blog);
ReferenceEntry<Post, Blog> referenceEntry2 = context.Entry(post).Reference<Blog>("Blog");
ReferenceEntry referenceEntry3 = context.Entry(post).Reference("Blog");
```

Navigations can also be collections of related entities when used for the "many" sides of one-to-many and many-to-many relationships. The `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Collection*` methods are used to access collection navigations. For example:

```csharp
CollectionEntry<Blog, Post> collectionEntry1 = context.Entry(blog).Collection(e => e.Posts);
CollectionEntry<Blog, Post> collectionEntry2 = context.Entry(blog).Collection<Post>("Posts");
CollectionEntry collectionEntry3 = context.Entry(blog).Collection("Posts");
```

Some operations are common for all navigations. These can be accessed for both reference and collection navigations using the `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigation*` method. Note that only non-generic access is available when accessing all navigations together. For example:

```csharp
NavigationEntry navigationEntry = context.Entry(blog).Navigation("Posts");
```

The following table summarizes ways to use `Microsoft.EntityFrameworkCore.ChangeTracking.ReferenceEntry`2`, `Microsoft.EntityFrameworkCore.ChangeTracking.CollectionEntry`2`, and `Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry`:

| NavigationEntry member                                                                                    | Description
|:----------------------------------------------------------------------------------------------------------|----------------------
| `Microsoft.EntityFrameworkCore.ChangeTracking.MemberEntry.CurrentValue` | Gets and sets the current value of the navigation. This is the entire collection for collection navigations.
| `Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Metadata` | `Microsoft.EntityFrameworkCore.Metadata.INavigationBase` metadata for the navigation.
| `Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.IsLoaded` | Gets or sets a value indicating whether the related entity or collection has been fully loaded from the database.
| `Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Load`     | Loads the related entity or collection from the database; see Explicit Loading of Related Data.
| `Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Query`    | The query EF Core would use to load this navigation as an `IQueryable` that can be further composed; see Explicit Loading of Related Data.
