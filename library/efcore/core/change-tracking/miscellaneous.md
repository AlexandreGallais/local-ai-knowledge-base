---
title: "Additional Change Tracking Features - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/miscellaneous.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Additional Change Tracking Features

This document covers miscellaneous features and scenarios involving change tracking.

> **Tip:**
> This document assumes that entity states and the basics of EF Core change tracking are understood. See Change Tracking in EF Core for more information on these topics.

> **Tip:**
> You can run and debug into all the code in this document by downloading the sample code from GitHub.

## `Add` versus `AddAsync`

Entity Framework Core (EF Core) provides async methods whenever using that method may result in a database interaction. Synchronous methods are also provided to avoid overhead when using databases that do not support high performance asynchronous access.

`Microsoft.EntityFrameworkCore.DbContext.Add*` and `Microsoft.EntityFrameworkCore.DbSet`1.Add*` do not normally access the database, since these methods inherently just start tracking entities. However, some forms of value generation _may_ access the database in order to generate a key value. The only value generator that does this and ships with EF Core is `Microsoft.EntityFrameworkCore.ValueGeneration.HiLoValueGenerator`1`. Using this generator is uncommon; it is never configured by default. This means that the vast majority of applications should use `Add`, and not `AddAsync`.

Other similar methods like `Update`, `Attach`, and `Remove` do not have async overloads because they never generate new key values, and hence never need to access the database.

## `AddRange`, `UpdateRange`, `AttachRange`, and `RemoveRange`

`Microsoft.EntityFrameworkCore.DbSet`1` and `Microsoft.EntityFrameworkCore.DbContext` provide alternate versions of `Add`, `Update`, `Attach`, and `Remove` that accept multiple instances in a single call. These methods are `Microsoft.EntityFrameworkCore.DbSet`1.AddRange*`, `Microsoft.EntityFrameworkCore.DbSet`1.UpdateRange*`, `Microsoft.EntityFrameworkCore.DbSet`1.AttachRange*`, and `Microsoft.EntityFrameworkCore.DbSet`1.RemoveRange*` respectively.

These methods are provided as a convenience. Using a "range" method has the same functionality as multiple calls to the equivalent non-range method. There is no significant performance difference between the two approaches.

> **Note:**
> This is different from EF6, where `AddRange` and `Add` both automatically called `DetectChanges`, but calling `Add` multiple times caused DetectChanges to be called multiple times instead of once. This made `AddRange` more efficient in EF6. In EF Core, neither of these methods automatically call `DetectChanges`.

## DbContext versus DbSet methods

Many methods, including `Add`, `Update`, `Attach`, and `Remove`, have implementations on both `Microsoft.EntityFrameworkCore.DbSet`1` and `Microsoft.EntityFrameworkCore.DbContext`. These methods have _exactly the same behavior_ for normal entity types. This is because the CLR type of the entity is mapped onto one and only one entity type in the EF Core model. Therefore, the CLR type fully defines where the entity fits in the model, and so the DbSet to use can be determined implicitly.

The exception to this rule is when using shared-type entity types, which are primarily used for many-to-many join entities. When using a shared-type entity type, a DbSet must first be created for the EF Core model type that is being used. Methods like `Add`, `Update`, `Attach`, and `Remove` can then be used on the DbSet without any ambiguity as to which EF Core model type is being used.

Shared-type entity types are used by default for the join entities in many-to-many relationships. A shared-type entity type can also be explicitly configured for use in a many-to-many relationship. For example, the code below configures `Dictionary<string, int>` as a join entity type:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .SharedTypeEntity<Dictionary<string, int>>(
            "PostTag",
            b =>
            {
                b.IndexerProperty<int>("TagId");
                b.IndexerProperty<int>("PostId");
            });

    modelBuilder.Entity<Post>()
        .HasMany(p => p.Tags)
        .WithMany(p => p.Posts)
        .UsingEntity<Dictionary<string, int>>(
            "PostTag",
            j => j.HasOne<Tag>().WithMany(),
            j => j.HasOne<Post>().WithMany());
}
```

Changing Foreign Keys and Navigations shows how to associate two entities by tracking a new join entity instance. The code below does this for the `Dictionary<string, int>` shared-type entity type used for the join entity:

```csharp
using var context = new BlogsContext();

var post = await context.Posts.SingleAsync(e => e.Id == 3);
var tag = await context.Tags.SingleAsync(e => e.Id == 1);

var joinEntitySet = context.Set<Dictionary<string, int>>("PostTag");
var joinEntity = new Dictionary<string, int> { ["PostId"] = post.Id, ["TagId"] = tag.Id };
joinEntitySet.Add(joinEntity);

Console.WriteLine(context.ChangeTracker.DebugView.LongView);

await context.SaveChangesAsync();
```

Notice that `Microsoft.EntityFrameworkCore.DbContext.Set``1(System.String)` is used to create a DbSet for the `PostTag` entity type. This DbSet can then be used to call `Add` with the new join entity instance.

> **Important:**
> The CLR type used for join entity types by convention may change in future releases to improve performance. Do not depend on any specific join entity type unless it has been explicitly configured as is done for `Dictionary<string, int>` in the code above.

## Property versus field access

Access to entity properties uses the backing field of the property by default. This is efficient and avoids triggering side effects from calling property getters and setters. For example, this is how lazy-loading is able to avoid triggering infinite loops. See Backing Fields for more information on configuring backing fields in the model.

Sometimes it may be desirable for EF Core to generate side-effects when it modifies property values. For example, when data binding to entities, setting a property may generate notifications to the U.I. which do not happen when setting the field directly. This can be achieved by changing the `Microsoft.EntityFrameworkCore.PropertyAccessMode` for:

- All entity types in the model using `Microsoft.EntityFrameworkCore.ModelBuilder.UsePropertyAccessMode*`
- All properties and navigations of a specific entity type using `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.UsePropertyAccessMode*`
- A specific property using `Microsoft.EntityFrameworkCore.Metadata.Builders.PropertyBuilder.UsePropertyAccessMode*`
- A specific navigation using `Microsoft.EntityFrameworkCore.Metadata.Builders.NavigationBuilder.UsePropertyAccessMode*`

Property access modes `Field` and `PreferField` will cause EF Core to access the property value through its backing field. Likewise, `Property` and `PreferProperty` will cause EF Core to access the property value through its getter and setter.

If `Field` or `Property` are used and EF Core cannot access the value through the field or property getter/setter respectively, then EF Core will throw an exception. This ensures EF Core is always using field/property access when you think it is.

On the other hand, the `PreferField` and `PreferProperty` modes will fall back to using the property or backing field respectively if it is not possible to use the preferred access. `PreferField` is the default. This means EF Core will use fields whenever it can, but will not fail if a property must be accessed through its getter or setter instead.

`FieldDuringConstruction` and `PreferFieldDuringConstruction` configure EF Core to use of backing fields _only when creating entity instances_. This allows queries to be executed without getter and setter side effects, while later property changes by EF Core will cause these side effects.

The different property access modes are summarized in the following table:

| PropertyAccessMode              | Preference | Preference creating entities | Fallback | Fallback creating entities
|:--------------------------------|------------|------------------------------|----------|---------------------------
| `Field`                         | Field      | Field                        | Throws   | Throws
| `Property`                      | Property   | Property                     | Throws   | Throws
| `PreferField`                   | Field      | Field                        | Property | Property
| `PreferProperty`                | Property   | Property                     | Field    | Field
| `FieldDuringConstruction`       | Property   | Field                        | Field    | Throws
| `PreferFieldDuringConstruction` | Property   | Field                        | Field    | Property

## Temporary values

EF Core creates temporary key values when tracking new entities that will have real key values generated by the database when SaveChanges is called. See Change Tracking in EF Core for an overview of how these temporary values are used.

### Accessing temporary values

Temporary values are stored in the change tracker and not set onto entity instances directly. However, these temporary values _are_ exposed when using the various mechanisms for Accessing Tracked Entities. For example, the following code accesses a temporary value using `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.CurrentValues*`:

```csharp
using var context = new BlogsContext();

var blog = new Blog { Name = ".NET Blog" };

context.Add(blog);

Console.WriteLine($"Blog.Id set on entity is {blog.Id}");
Console.WriteLine($"Blog.Id tracked by EF is {context.Entry(blog).Property(e => e.Id).CurrentValue}");
```

The output from this code is:

```output
Blog.Id set on entity is 0
Blog.Id tracked by EF is -2147482643
```

`Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsTemporary*` can be used to check for temporary values.

### Manipulating temporary values

It is sometimes useful to explicitly work with temporary values. For example, a collection of new entities might be created on a web client and then serialized back to the server. Foreign key values are one way to set up relationships between these entities. The following code uses this approach to associate a graph of new entities by foreign key, while still allowing real key values to be generated when SaveChanges is called.

```csharp
var blogs = new List<Blog> { new Blog { Id = -1, Name = ".NET Blog" }, new Blog { Id = -2, Name = "Visual Studio Blog" } };

var posts = new List<Post>
{
    new Post
    {
        Id = -1,
        BlogId = -1,
        Title = "Announcing the Release of EF Core 5.0",
        Content = "Announcing the release of EF Core 5.0, a full featured cross-platform..."
    },
    new Post
    {
        Id = -2,
        BlogId = -2,
        Title = "Disassembly improvements for optimized managed debugging",
        Content = "If you are focused on squeezing out the last bits of performance for your .NET service or..."
    }
};

using var context = new BlogsContext();

foreach (var blog in blogs)
{
    context.Add(blog).Property(e => e.Id).IsTemporary = true;
}

foreach (var post in posts)
{
    context.Add(post).Property(e => e.Id).IsTemporary = true;
}

Console.WriteLine(context.ChangeTracker.DebugView.LongView);

await context.SaveChangesAsync();

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

Notice that:

- Negative numbers are used as temporary key values; this is not required, but is a common convention to prevent key clashes.
- The `Post.BlogId` FK property is assigned the same negative value as the PK of the associated blog.
- The PK values are marked as temporary by setting `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsTemporary*` after each entity is tracked. This is necessary because any key value supplied by the application is assumed to be a real key value.

Looking at the change tracker debug view before calling SaveChanges shows that the PK values are marked as temporary and posts are associated with the correct blogs, including fixup of navigations:

```output
Blog {Id: -2} Added
  Id: -2 PK Temporary
  Name: 'Visual Studio Blog'
  Posts: [{Id: -2}]
Blog {Id: -1} Added
  Id: -1 PK Temporary
  Name: '.NET Blog'
  Posts: [{Id: -1}]
Post {Id: -2} Added
  Id: -2 PK Temporary
  BlogId: -2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: {Id: -2}
  Tags: []
Post {Id: -1} Added
  Id: -1 PK Temporary
  BlogId: -1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: -1}
```

After calling `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*`, these temporary values have been replaced by real values generated by the database:

```output
Blog {Id: 1} Unchanged
  Id: 1 PK
  Name: '.NET Blog'
  Posts: [{Id: 1}]
Blog {Id: 2} Unchanged
  Id: 2 PK
  Name: 'Visual Studio Blog'
  Posts: [{Id: 2}]
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
  Tags: []
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: 2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: {Id: 2}
  Tags: []
```
