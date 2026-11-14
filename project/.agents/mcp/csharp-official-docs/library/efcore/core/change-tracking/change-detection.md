---
title: "Change Detection and Notifications - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/change-tracking/change-detection.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Change Detection and Notifications

Each `Microsoft.EntityFrameworkCore.DbContext` instance tracks changes made to entities. These tracked entities in turn drive the changes to the database when `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` is called. This is covered in Change Tracking in EF Core, and this document assumes that entity states and the basics of Entity Framework Core (EF Core) change tracking are understood.

Tracking property and relationship changes requires that the DbContext is able to detect these changes. This document covers how this detection happens, as well as how to use property notifications or change-tracking proxies to force immediate detection of changes.

> **Tip:**
> You can run and debug into all the code in this document by downloading the sample code from GitHub.

## Snapshot change tracking

By default, EF Core creates a snapshot of every entity's property values when it is first tracked by a DbContext instance. The values stored in this snapshot are then compared against the current values of the entity in order to determine which property values have changed.

This detection of changes happens when SaveChanges is called to ensure all changed values are detected before sending updates to the database. However, the detection of changes also happens at other times to ensure the application is working with up-to-date tracking information. Detection of changes can be forced at any time by calling `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges`.

### When change detection is needed

Detection of changes is needed when a property or navigation has been changed _without using EF Core to make this change_. For example, consider loading blogs and posts and then making changes to these entities:

```csharp
using var context = new BlogsContext();
var blog = await context.Blogs.Include(e => e.Posts).FirstAsync(e => e.Name == ".NET Blog");

// Change a property value
blog.Name = ".NET Blog (Updated!)";

// Add a new entity to a navigation
blog.Posts.Add(
    new Post
    {
        Title = "What’s next for System.Text.Json?", Content = ".NET 5.0 was released recently and has come with many..."
    });

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
context.ChangeTracker.DetectChanges();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

Looking at the change tracker debug view before calling `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges` shows that the changes made have not been detected and hence are not reflected in the entity states and modified property data:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog (Updated!)' Originally '.NET Blog'
  Posts: [{Id: 1}, {Id: 2}, <not found>]
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
```

Specifically, the state of the blog entry is still `Unchanged`, and the new post does not appear as a tracked entity. (The astute will notice properties report their new values, even though these changes have not yet been detected by EF Core. This is because the debug view is reading current values directly from the entity instance.)

Contrast this with the debug view after calling DetectChanges:

```output
Blog {Id: 1} Modified
  Id: 1 PK
  Name: '.NET Blog (Updated!)' Modified Originally '.NET Blog'
  Posts: [{Id: 1}, {Id: 2}, {Id: -2147482643}]
Post {Id: -2147482643} Added
  Id: -2147482643 PK Temporary
  BlogId: 1 FK
  Content: '.NET 5.0 was released recently and has come with many...'
  Title: 'What's next for System.Text.Json?'
  Blog: {Id: 1}
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
```

Now the blog is correctly marked as `Modified` and the new post has been detected and is tracked as `Added`.

At the start of this section we stated that detecting changes is needed when not _using EF Core to make the change_. This is what is happening in the code above. That is, the changes to the property and navigation are made _directly on the entity instances_, and not by using any EF Core methods.

Contrast this to the following code which modifies the entities in the same way, but this time using EF Core methods:

```csharp
using var context = new BlogsContext();
var blog = await context.Blogs.Include(e => e.Posts).FirstAsync(e => e.Name == ".NET Blog");

// Change a property value
context.Entry(blog).Property(e => e.Name).CurrentValue = ".NET Blog (Updated!)";

// Add a new entity to the DbContext
context.Add(
    new Post
    {
        Blog = blog,
        Title = "What’s next for System.Text.Json?",
        Content = ".NET 5.0 was released recently and has come with many..."
    });

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

In this case the change tracker debug view shows that all entity states and property modifications are known, even though detection of changes has not happened. This is because `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.CurrentValue` is an EF Core method, which means that EF Core immediately knows about the change made by this method. Likewise, calling `Microsoft.EntityFrameworkCore.DbContext.Add*` allows EF Core to immediately know about the new entity and track it appropriately.

> **Tip:**
> Don't attempt to avoid detecting changes by always using EF Core methods to make entity changes. Doing so is often more cumbersome and performs less well than making changes to entities in the normal way. The intention of this document is to inform as to when detecting changes is needed and when it is not. The intention is not to encourage avoidance of change detection.

### Methods that automatically detect changes

`Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges` is called automatically by methods where doing so is likely to impact the results. These methods are:

- `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` and `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*`, to ensure that all changes are detected before updating the database.
- `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries` and `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries``1`, to ensure entity states and modified properties are up-to-date.
- `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.HasChanges`, to ensure that the result is accurate.
- `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.CascadeChanges`, to ensure correct entity states for principal/parent entities before cascading.
- `Microsoft.EntityFrameworkCore.DbSet`1.Local`, to ensure that the tracked graph is up-to-date.

There are also some places where detection of changes happens on only a single entity instance, rather than on the entire graph of tracked entities. These places are:

- When using `System.Data.Entity.DbContext.Entry*`, to ensure that the entity's state and modified properties are up-to-date.
- When using `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry` methods such as `Property`, `Collection`, `Reference` or `Member` to ensure property modifications, current values, etc. are up-to-date.
- When a dependent/child entity is going to be deleted because a required relationship has been severed. This detects when an entity should not be deleted because it has been re-parented.

Local detection of changes for a single entity can be triggered explicitly by calling `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.DetectChanges`.

> **Note:**
> Local detect changes can miss some changes that a full detection would find. This happens when cascading actions resulting from undetected changes to other entities have an impact on the entity in question. In such situations the application may need to force a full scan of all entities by explicitly calling `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges`.

### Disabling automatic change detection

The performance of detecting changes is not a bottleneck for most applications. However, detecting changes can become a performance problem for some applications that track thousands of entities. (The exact number will dependent on many things, such as the number of properties in the entity.) For this reason the automatic detection of changes can be disabled using `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.AutoDetectChangesEnabled`. For example, consider processing join entities in a many-to-many relationship with payloads:

```csharp
public override async Task<int> SaveChangesAsync(CancellationToken <example-value> = default)
{
    foreach (var entityEntry in ChangeTracker.Entries<PostTag>()) // Detects changes automatically
    {
        if (entityEntry.State == EntityState.Added)
        {
            entityEntry.Entity.TaggedBy = "ajcvickers";
            entityEntry.Entity.TaggedOn = DateTime.Now;
        }
    }

    try
    {
        ChangeTracker.AutoDetectChangesEnabled = false;
        return await base.SaveChangesAsync(cancellationToken); // Avoid automatically detecting changes again here
    }
    finally
    {
        ChangeTracker.AutoDetectChangesEnabled = true;
    }
}
```

As we know from the previous section, both `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries``1` and `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` automatically detect changes. However, after calling Entries, the code does not then make any entity or property state changes. (Setting normal property values on Added entities does not cause any state changes.) The code therefore disables unnecessary automatic change detection when calling down into the base SaveChanges method. The code also makes use of a try/finally block to ensure that the default setting is restored even if SaveChanges fails.

> **Tip:**
> Do not assume that your code must disable automatic change detection to perform well. This is only needed when profiling an application tracking many entities indicates that performance of change detection is an issue.

### Detecting changes and value conversions

To use snapshot change tracking with an entity type, EF Core must be able to:

- Make a snapshot of each property value when the entity is tracked
- Compare this value to the current value of the property
- Generate a hash code for the value

This is handled automatically by EF Core for types that can be directly mapped to the database. However, when a value converter is used to map a property, then that converter must specify how to perform these actions. This is achieved with a value comparer, and is described in detail in the Value Comparers documentation.
