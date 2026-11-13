---
title: "Changing Foreign Keys and Navigations - EF Core (part 5 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/relationship-changes.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Changing Foreign Keys and Navigations - EF Core (part 5 of 5)

## Many-to-many relationships

Many-to-many relationships in EF Core are implemented using a join entity. Each side of the many-to-many relationship is related to this join entity with a one-to-many relationship. This join entity can be explicitly defined and mapped, or it can be created implicitly and hidden. In both cases the underlying behavior is the same. We will look at this underlying behavior first to understand how tracking of many-to-many relationships works.

### How many-to-many relationships work

Consider this EF Core model that creates a many-to-many relationship between posts and tags using an explicitly defined join entity type:

```csharp
public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public int? BlogId { get; set; }
    public Blog Blog { get; set; }

    public IList<PostTag> PostTags { get; } = new List<PostTag>(); // Collection navigation
}

public class Tag
{
    public int Id { get; set; }
    public string Text { get; set; }

    public IList<PostTag> PostTags { get; } = new List<PostTag>(); // Collection navigation
}

public class PostTag
{
    public int PostId { get; set; } // First part of composite PK; FK to Post
    public int TagId { get; set; } // Second part of composite PK; FK to Tag

    public Post Post { get; set; } // Reference navigation
    public Tag Tag { get; set; } // Reference navigation
}
```

Notice that the `PostTag` join entity type contains two foreign key properties. In this model, for a post to be related to a tag, there must be a PostTag join entity where the `PostTag.PostId` foreign key value matches the `Post.Id` primary key value, and where the `PostTag.TagId` foreign key value matches the `Tag.Id` primary key value. For example:

```csharp
using var context = new BlogsContext();

var post = await context.Posts.SingleAsync(e => e.Id == 3);
var tag = await context.Tags.SingleAsync(e => e.Id == 1);

context.Add(new PostTag { PostId = post.Id, TagId = tag.Id });

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

Looking at the change tracker debug view after running this code shows that the post and tag are related by the new `PostTag` join entity:

```output
Post {Id: 3} Unchanged
  Id: 3 PK
  BlogId: 2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: <null>
  PostTags: [{PostId: 3, TagId: 1}]
PostTag {PostId: 3, TagId: 1} Added
  PostId: 3 PK FK
  TagId: 1 PK FK
  Post: {Id: 3}
  Tag: {Id: 1}
Tag {Id: 1} Unchanged
  Id: 1 PK
  Text: '.NET'
  PostTags: [{PostId: 3, TagId: 1}]
```

Notice that the collection navigations on `Post` and `Tag` have been fixed up, as have the reference navigations on `PostTag`. These relationships can be manipulated by navigations instead of FK values, just as in all the preceding examples. For example, the code above can be modified to add the relationship by setting the reference navigations on the join entity:

```csharp
context.Add(new PostTag { Post = post, Tag = tag });
```

This results in exactly the same change to FKs and navigations as in the previous example.

### Skip navigations

Manipulating the join table manually can be cumbersome. Many-to-many relationships can be manipulated directly using special collection navigations that "skip over" the join entity. For example, two skip navigations can be added to the model above; one from Post to Tags, and the other from Tag to Posts:

```csharp
public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public int? BlogId { get; set; }
    public Blog Blog { get; set; }

    public IList<Tag> Tags { get; } = new List<Tag>(); // Skip collection navigation
    public IList<PostTag> PostTags { get; } = new List<PostTag>(); // Collection navigation
}

public class Tag
{
    public int Id { get; set; }
    public string Text { get; set; }

    public IList<Post> Posts { get; } = new List<Post>(); // Skip collection navigation
    public IList<PostTag> PostTags { get; } = new List<PostTag>(); // Collection navigation
}

public class PostTag
{
    public int PostId { get; set; } // First part of composite PK; FK to Post
    public int TagId { get; set; } // Second part of composite PK; FK to Tag

    public Post Post { get; set; } // Reference navigation
    public Tag Tag { get; set; } // Reference navigation
}
```

This many-to-many relationship requires the following configuration to ensure the skip navigations and normal navigations are all used for the same many-to-many relationship:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(p => p.Tags)
        .WithMany(p => p.Posts)
        .UsingEntity<PostTag>(
            j => j.HasOne(t => t.Tag).WithMany(p => p.PostTags),
            j => j.HasOne(t => t.Post).WithMany(p => p.PostTags));
}
```

See Relationships for more information on mapping many-to-many relationships.

Skip navigations look and behave like normal collection navigations. However, the way they work with foreign key values is different. Let's associate a post with a tag, but this time using a skip navigation:

```csharp
using var context = new BlogsContext();

var post = await context.Posts.SingleAsync(e => e.Id == 3);
var tag = await context.Tags.SingleAsync(e => e.Id == 1);

post.Tags.Add(tag);

context.ChangeTracker.DetectChanges();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

Notice that this code doesn't use the join entity. It instead just adds an entity to a navigation collection in the same way as would be done if this were a one-to-many relationship. The resulting debug view is essentially the same as before:

```output
Post {Id: 3} Unchanged
  Id: 3 PK
  BlogId: 2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: <null>
  PostTags: [{PostId: 3, TagId: 1}]
  Tags: [{Id: 1}]
PostTag {PostId: 3, TagId: 1} Added
  PostId: 3 PK FK
  TagId: 1 PK FK
  Post: {Id: 3}
  Tag: {Id: 1}
Tag {Id: 1} Unchanged
  Id: 1 PK
  Text: '.NET'
  PostTags: [{PostId: 3, TagId: 1}]
  Posts: [{Id: 3}]
```

Notice that an instance of the `PostTag` join entity was created automatically with FK values set to the PK values of the tag and post that are now associated. All the normal reference and collection navigations have been fixed up to match these FK values. Also, since this model contains skip navigations, these have also been fixed up. Specifically, even though we added the tag to the `Post.Tags` skip navigation, the `Tag.Posts` inverse skip navigation on the other side of this relationship has also been fixed up to contain the associated post.

It is worth noting that the underlying many-to-many relationships can still be manipulated directly even when skip navigations have been layered on top. For example, the tag and Post could be associated as we did before introducing skip navigations:

```csharp
context.Add(new PostTag { Post = post, Tag = tag });
```

Or using FK values:

```csharp
context.Add(new PostTag { PostId = post.Id, TagId = tag.Id });
```

This will still result in the skip navigations being fixed up correctly, resulting in the same debug view output as in the previous example.

### Skip navigations only

In the previous section we added skip navigations _in addition to_ fully defining the two underlying one-to-many relationships. This is useful to illustrate what happens to FK values, but is often unnecessary. Instead, the many-to-many relationship can be defined using _only skip navigations_. This is how the many-to-many relationship is defined in the model at the very top of this document. Using this model, we can again associate a Post and a Tag by adding a post to the `Tag.Posts` skip navigation (or, alternately, adding a tag to the `Post.Tags` skip navigation):

```csharp
using var context = new BlogsContext();

var post = await context.Posts.SingleAsync(e => e.Id == 3);
var tag = await context.Tags.SingleAsync(e => e.Id == 1);

post.Tags.Add(tag);

context.ChangeTracker.DetectChanges();
Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

Looking at the debug view after making this change reveals that EF Core has created an instance of `Dictionary<string, object>` to represent the join entity. This join entity contains both `PostsId` and `TagsId` foreign key properties which have been set to match the PK values of the post and tag that are associated.

```output
Post {Id: 3} Unchanged
  Id: 3 PK
  BlogId: 2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: <null>
  Tags: [{Id: 1}]
Tag {Id: 1} Unchanged
  Id: 1 PK
  Text: '.NET'
  Posts: [{Id: 3}]
PostTag (Dictionary<string, object>) {PostsId: 3, TagsId: 1} Added
  PostsId: 3 PK FK
  TagsId: 1 PK FK
```

See Relationships for more information about implicit join entities and the use of `Dictionary<string, object>` entity types.

> **Important:**
> The CLR type used for join entity types by convention may change in future releases to improve performance. Do not depend on the join type being `Dictionary<string, object>` unless this has been explicitly configured.

### Join entities with payloads

So far all the examples have used a join entity type (whether explicit or implicit) that contains only the two foreign key properties needed for the many-to-many relationship. Neither of these FK values need to be explicitly set by the application when manipulating relationships because their values come from the primary key properties of the related entities. This allows EF Core to create instances of the join entity without missing data.

#### Payloads with generated values

EF Core supports adding additional properties to the join entity type. This is known as giving the join entity a "payload". For example, let's add `TaggedOn` property to the `PostTag` join entity:

```csharp
public class PostTag
{
    public int PostId { get; set; } // First part of composite PK; FK to Post
    public int TagId { get; set; } // Second part of composite PK; FK to Tag

    public DateTime TaggedOn { get; set; } // Payload
}
```

This payload property will not be set when EF Core creates a join entity instance. The most common way to deal with this is to use payload properties with automatically generated values. For example, the `TaggedOn` property can be configured to use a store-generated timestamp when each new entity is inserted:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasMany(p => p.Tags)
        .WithMany(p => p.Posts)
        .UsingEntity<PostTag>(
            j => j.HasOne<Tag>().WithMany(),
            j => j.HasOne<Post>().WithMany(),
            j => j.Property(e => e.TaggedOn).HasDefaultValueSql("CURRENT_TIMESTAMP"));
}
```

A post can now be tagged in the same way as before:

```csharp
using var context = new BlogsContext();

var post = await context.Posts.SingleAsync(e => e.Id == 3);
var tag = await context.Tags.SingleAsync(e => e.Id == 1);

post.Tags.Add(tag);

await context.SaveChangesAsync();

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

Looking at the change tracker debug view after calling SaveChanges shows that the payload property has been set appropriately:

```output
Post {Id: 3} Unchanged
  Id: 3 PK
  BlogId: 2 FK
  Content: 'If you are focused on squeezing out the last bits of perform...'
  Title: 'Disassembly improvements for optimized managed debugging'
  Blog: <null>
  Tags: [{Id: 1}]
PostTag {PostId: 3, TagId: 1} Unchanged
  PostId: 3 PK FK
  TagId: 1 PK FK
  TaggedOn: '12/29/2020 8:13:21 PM'
Tag {Id: 1} Unchanged
  Id: 1 PK
  Text: '.NET'
  Posts: [{Id: 3}]
```

#### Explicitly setting payload values

Following on from the previous example, let's add a payload property that does not use an automatically generated value:

```csharp
public class PostTag
{
    public int PostId { get; set; } // First part of composite PK; FK to Post
    public int TagId { get; set; } // Second part of composite PK; FK to Tag

    public DateTime TaggedOn { get; set; } // Auto-generated payload property
    public string TaggedBy { get; set; } // Not-generated payload property
}
```

A post can now be tagged in the same way as before, and the join entity will still be created automatically. This entity can then be accessed using one of the mechanisms described in Accessing Tracked Entities. For example, the code below uses `Microsoft.EntityFrameworkCore.DbSet`1.Find*` to access the join entity instance:

```csharp
using var context = new BlogsContext();

var post = await context.Posts.SingleAsync(e => e.Id == 3);
var tag = await context.Tags.SingleAsync(e => e.Id == 1);

post.Tags.Add(tag);

context.ChangeTracker.DetectChanges();

var joinEntity = await context.Set<PostTag>().FindAsync(post.Id, tag.Id);

joinEntity.TaggedBy = "ajcvickers";

await context.SaveChangesAsync();

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

Once the join entity has been located it can be manipulated in the normal way--in this example, to set the `TaggedBy` payload property before calling SaveChanges.

> **Note:**
> Note that a call to `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges` is required here to give EF Core a chance to detect the navigation property change and create the join entity instance before `Find` is used. See Change Detection and Notifications for more information.

Alternately, the join entity can be created explicitly to associate a post with a tag. For example:

```csharp
using var context = new BlogsContext();

var post = context.Posts.SingleAsync(e => e.Id == 3);
var tag = context.Tags.SingleAsync(e => e.Id == 1);

context.Add(
    new PostTag { PostId = post.Id, TagId = tag.Id, TaggedBy = "ajcvickers" });

await context.SaveChangesAsync();

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

Finally, another way to set payload data is by either overriding `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` or using the `Microsoft.EntityFrameworkCore.DbContext.SavingChanges` event to process entities before updating the database. For example:

```csharp
public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
{
    foreach (var entityEntry in ChangeTracker.Entries<PostTag>())
    {
        if (entityEntry.State == EntityState.Added)
        {
            entityEntry.Entity.TaggedBy = "ajcvickers";
        }
    }

    return await base.SaveChangesAsync(cancellationToken);
}
```
