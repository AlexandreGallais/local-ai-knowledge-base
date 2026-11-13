---
title: "Identity Resolution - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/identity-resolution.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Identity Resolution in EF Core

A `Microsoft.EntityFrameworkCore.DbContext` can only track one entity instance with any given primary key value. This means multiple instances of an entity with the same key value must be resolved to a single instance. This is called "identity resolution". Identity resolution ensures Entity Framework Core (EF Core) is tracking a consistent graph with no ambiguities about the relationships or property values of the entities.

> **Tip:**
> This document assumes that entity states and the basics of EF Core change tracking are understood. See Change Tracking in EF Core for more information on these topics.

> **Tip:**
> You can run and debug into all the code in this document by downloading the sample code from GitHub.

## Introduction

The following code queries for an entity and then attempts to attach a different instance with the same primary key value:

```csharp
using var context = new BlogsContext();

var blogA = await context.Blogs.SingleAsync(e => e.Id == 1);
var blogB = new Blog { Id = 1, Name = ".NET Blog (All new!)" };

try
{
    context.Update(blogB); // This will throw
}
catch (Exception e)
{
    Console.WriteLine($"{e.GetType().FullName}: {e.Message}");
}
```

Running this code results in the following exception:

> System.InvalidOperationException: The instance of entity type 'Blog' cannot be tracked because another instance with the key value '{Id: 1}' is already being tracked. When attaching existing entities, ensure that only one entity instance with a given key value is attached.

EF Core requires a single instance because:

- Property values may be different between multiple instances. When updating the database, EF Core needs to know which property values to use.
- Relationships with other entities may be different between multiple instances. For example, "blogA" may be related to a different collection of posts than "blogB".

The exception above is commonly encountered in these situations:

- When attempting to update an entity
- When attempting to track a serialized graph of entities
- When failing to set a key value that is not automatically generated
- When reusing a DbContext instance for multiple units-of-work

Each of these situations is discussed in the following sections.

## Updating an entity

There are several different approaches to update an entity with new values, as covered in Change Tracking in EF Core and Explicitly Tracking Entities. These approaches are outlined below in the context of identity resolution. An important point to notice is that each of the approaches use either a query or a call to one of `Update` or `Attach`, but **_never both_**.

### Call Update

Often the entity to update does not come from a query on the DbContext that we are going to use for SaveChanges. For example, in a web application, an entity instance may be created from the information in a POST request. The simplest way to handle this is to use `Microsoft.EntityFrameworkCore.DbContext.Update*` or `Microsoft.EntityFrameworkCore.DbSet`1.Update*`. For example:

```csharp
public static async Task UpdateFromHttpPost1(Blog blog)
{
    using var context = new BlogsContext();

    context.Update(blog);

    await context.SaveChangesAsync();
}
```

In this case:

- Only a single instance of the entity is created.
- The entity instance is **not** queried from the database as part of making the update.
- All property values will be updated in the database, regardless of whether they have actually changed or not.
- One database round-trip is made.

### Query then apply changes

Usually it is not known which property values have actually been changed when an entity is created from information in a POST request or similar. Often it is fine to just update all values in the database, as we did in the previous example. However, if the application is handling many entities and only a small number of those have actual changes, then it may be useful to limit the updates sent. This can be achieved by executing a query to track the entities as they currently exist in the database, and then applying changes to these tracked entities. For example:

```csharp
public static async Task UpdateFromHttpPost2(Blog blog)
{
    using var context = new BlogsContext();

    var trackedBlog = await context.Blogs.FindAsync(blog.Id);

    trackedBlog.Name = blog.Name;
    trackedBlog.Summary = blog.Summary;

    await context.SaveChangesAsync();
}
```

In this case:

- Only a single instance of the entity is tracked; the one that is returned from the database by the `Find` query.
- `Update`, `Attach`, etc. are **not** used.
- Only property values that have actually changed are updated in the database.
- Two database round-trips are made.

EF Core has some helpers for transferring property values like this. For example, `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues.SetValues*` will copy all the values from the given object and set them on the tracked object:

```csharp
public static async Task UpdateFromHttpPost3(Blog blog)
{
    using var context = new BlogsContext();

    var trackedBlog = await context.Blogs.FindAsync(blog.Id);

    context.Entry(trackedBlog).CurrentValues.SetValues(blog);

    await context.SaveChangesAsync();
}
```

`SetValues` accepts various object types, including data transfer objects (DTOs) with property names that match the properties of the entity type. For example:

```csharp
public static async Task UpdateFromHttpPost4(BlogDto dto)
{
    using var context = new BlogsContext();

    var trackedBlog = await context.Blogs.FindAsync(dto.Id);

    context.Entry(trackedBlog).CurrentValues.SetValues(dto);

    await context.SaveChangesAsync();
}
```

Or a dictionary with name/value entries for the property values:

```csharp
public static async Task UpdateFromHttpPost5(Dictionary<string, object> propertyValues)
{
    using var context = new BlogsContext();

    var trackedBlog = await context.Blogs.FindAsync(propertyValues["Id"]);

    context.Entry(trackedBlog).CurrentValues.SetValues(propertyValues);

    await context.SaveChangesAsync();
}
```

See Accessing tracked entities for more information on working with property values like this.

### Use original values

So far each approach has either executed a query before making the update, or updated all property values regardless of whether or not they have changed. To update only values that have changed without querying as part of the update requires specific information about which property values have changed. A common way to get this information is to send back both the current and original values in the HTTP Post or similar. For example:

```csharp
public static async Task UpdateFromHttpPost6(Blog blog, Dictionary<string, object> originalValues)
{
    using var context = new BlogsContext();

    context.Attach(blog);
    context.Entry(blog).OriginalValues.SetValues(originalValues);

    await context.SaveChangesAsync();
}
```

In this code the entity with modified values is first attached. This causes EF Core to track the entity in the `Unchanged` state; that is, with no property values marked as modified. The dictionary of original values is then applied to this tracked entity. This will mark as modified properties with different current and original values. Properties that have the same current and original values will not be marked as modified.

In this case:

- Only a single instance of the entity is tracked, using Attach.
- The entity instance is **not** queried from the database as part of making the update.
- Applying the original values ensures that only property values that have actually changed are updated in the database.
- One database round-trip is made.

As with the examples in the previous section, the original values do not have to be passed as a dictionary; an entity instance or DTO will also work.

> **Tip:**
> While this approach has appealing characteristics, it does require sending the entity's original values to and from the web client. Carefully consider whether this extra complexity is worth the benefits; for many applications one of the simpler approaches is more pragmatic.
