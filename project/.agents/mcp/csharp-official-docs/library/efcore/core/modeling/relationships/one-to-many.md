---
title: "One-to-many relationships - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/modeling/relationships/one-to-many.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# One-to-many relationships

One-to-many relationships are used when a single entity is associated with any number of other entities. For example, a `Blog` can have many associated `Posts`, but each `Post` is associated with only one `Blog`.

This document is structured around lots of examples. The examples start with common cases, which also introduce concepts. Later examples cover less common kinds of configuration. A good approach here is to understand the first few examples and concepts, and then go to the later examples based on your specific needs. Based on this approach, we will start with simple "required" and "optional" one-to-many relationships.

> **Tip:**
> The code for all the examples below can be found in OneToMany.cs.

## Required one-to-many

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>(); // Collection navigation containing dependents
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key <example-value>
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

A one-to-many relationship is made up from:

- One or more primary or alternate key <example-value> on the principal entity; that is the "one" end of the relationship. For example, `Blog.Id`.
- One or more foreign key <example-value> on the dependent entity; that is the "many" end of the relationship. For example, `Post.BlogId`.
- Optionally, a collection navigation on the principal entity referencing the dependent entities. For example, `Blog.Posts`.
- Optionally, a reference navigation on the dependent entity referencing the principal entity. For example, `Post.Blog`.

So, for the relationship in this example:

- The foreign key <example-value> `Post.BlogId` is not nullable. This makes the relationship "required" because every dependent (`Post`) _must be related to some principal_ (`Blog`), since its foreign key <example-value> must be set to some value.
- Both entities have navigations pointing to the related entity or entities on the other side of the relationship.

> **Note:**
> A required relationship ensures that every dependent entity must be associated with some principal entity. However, a principal entity can _always_ exist without any dependent entities. That is, a required relationship does _not_ indicate that there will always be at least one dependent entity. There is no way in the EF model, and also no standard way in a relational database, to ensure that a principal is associated with a certain number of dependents. If this is needed, then it must be implemented in application (business) logic. See _Required navigations_ for more information.

> **Tip:**
> A relationship with two navigations, one from dependent to principal, and an inverse from principal to dependents, is known as a bidirectional relationship.

This relationship is discovered by convention. That is:

- `Blog` is discovered as the principal in the relationship, and `Post` is discovered as the dependent.
- `Post.BlogId` is discovered as a foreign key of the dependent referencing the `Blog.Id` primary key of the principal. The relationship is discovered as required because `Post.BlogId` is not nullable.
- `Blog.Posts` is discovered as the collection navigation.
- `Post.Blog` is discovered as the reference navigation.

> **Important:**
> When using C# nullable reference types, the reference navigation must be nullable if the foreign key <example-value> is nullable. If the foreign key <example-value> is non-nullable, then the reference navigation may be nullable or not. In this case, `Post.BlogId` is non-nullable and `Post.Blog` is also non-nullable. The `= null!;` construct is used to mark this as intentional for the C# compiler, since EF typically sets the `Blog` instance and it cannot be null for a fully loaded relationship. See _Working with Nullable Reference Types_ for more information.

For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne(e => e.Blog)
        .HasForeignKey(e => e.BlogId)
        .IsRequired();
}
```

In the example above, configuration of the relationships starts with `HasMany` on the principal entity type (`Blog`) and then follows this with `WithOne`. As with all relationships, it is exactly equivalent to start with dependent entity type (`Post`) and use `HasOne` followed by `WithMany`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasOne(e => e.Blog)
        .WithMany(e => e.Posts)
        .HasForeignKey(e => e.BlogId)
        .IsRequired();
}
```

Neither of these options is better than the other; they both result in exactly the same configuration.

> **Tip:**
> It is never necessary to configure a relationship twice, once starting from the principal, and then again starting from the dependent. Also, attempting to configure the principal and dependent halves of a relationship separately generally does not work. Choose to configure each relationship from either one end or the other and then write the configuration code only once.

## Optional one-to-many

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>(); // Collection navigation containing dependents
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
    public int? BlogId { get; set; } // Optional foreign key <example-value>
    public Blog? Blog { get; set; } // Optional reference navigation to principal
}
```

This is the same as the previous example, except that the foreign key <example-value> and navigation to the principal are now nullable. This makes the relationship "optional" because a dependent (`Post`) can exist _without_ being related to any principal (`Blog`).

> **Important:**
> When using C# nullable reference types, the reference navigation must be nullable if the foreign key <example-value> is nullable. In this case, `Post.BlogId` is nullable, so `Post.Blog` must be nullable too. See _Working with Nullable Reference Types_ for more information.

As before, this relationship is discovered by convention. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne(e => e.Blog)
        .HasForeignKey(e => e.BlogId)
        .IsRequired(false);
}
```

## Required one-to-many with shadow foreign key

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>(); // Collection navigation containing dependents
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

In some cases, you may not want a foreign key <example-value> in your model, since foreign keys are a detail of how the relationship is represented in the database, which is not needed when using the relationship in a purely object-oriented manner. However, if entities are going to be serialized, for example to send over a wire, then the foreign key <example-value> can be a useful way to keep the relationship information intact when the entities are not in an object form. It is therefore often pragmatic to keep foreign key <example-value> in the .NET type for this purpose. Foreign key <example-value> can be private, which is often a good compromise to avoid exposing the foreign key while allowing its value to travel with the entity.

Following on from the previous two examples, this example removes the foreign key <example-value> from the dependent entity type. EF therefore creates a shadow foreign key <example-value> called `BlogId` of type `int`.

An important point to note here is that C# nullable reference types are being used, so the nullability of the reference navigation is used to determine whether or not the foreign key <example-value> is nullable, and therefore whether the relationship is optional or required. If nullable reference types are not being used, then the shadow foreign key <example-value> will be nullable by default, making the relationship optional by default. In this case, use `IsRequired` to force the shadow foreign key <example-value> to be non-nullable and make the relationship required.

As before, this relationship is discovered by convention. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne(e => e.Blog)
        .HasForeignKey("BlogId")
        .IsRequired();
}
```

## Optional one-to-many with shadow foreign key

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>(); // Collection navigation containing dependents
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
    public Blog? Blog { get; set; } // Optional reference navigation to principal
}
```

Like the previous example, the foreign key <example-value> has been removed from the dependent entity type. EF therefore creates a shadow foreign key <example-value> called `BlogId` of type `int?`. Unlike the previous example, this time the foreign key <example-value> is created as nullable because C# nullable reference types are being used and the navigation on the dependent entity type is nullable. This makes the relationship optional.

When C# nullable reference types are not being used, then the foreign key <example-value> will also, by default, be created as nullable. This means relationships with automatically created shadow properties are optional by default.

As before, this relationship is discovered by convention. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne(e => e.Blog)
        .HasForeignKey("BlogId")
        .IsRequired(false);
}
```

## One-to-many without navigation to principal

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>(); // Collection navigation containing dependents
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key <example-value>
}
```

For this example, the foreign key <example-value> has been re-introduced, but the navigation on the dependent has been removed.

> **Tip:**
> A relationship with only one navigation, one from dependent to principal or one from principal to dependent(s), but not both, is known as a unidirectional relationship.

As before, this relationship is discovered by convention. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne()
        .HasForeignKey(e => e.BlogId)
        .IsRequired();
}
```

Notice that the call to `WithOne` has no arguments. This is the way to tell EF that there is no navigation from `Post` to `Blog`.

If configuration starts from the entity with no navigation, then the type of the entity on the other end of the relationship must be explicitly specified using the generic `HasOne<>()` call. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasOne<Blog>()
        .WithMany(e => e.Posts)
        .HasForeignKey(e => e.BlogId)
        .IsRequired();
}
```

## One-to-many without navigation to principal and with shadow foreign key

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>(); // Collection navigation containing dependents
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
}
```

This example combines two of the previous examples by removing both the foreign key <example-value> and the navigation on the dependent.

This relationship is discovered by convention as an optional relationship. Since there is nothing in the code that could be used to indicate that it should be required, some minimal configuration using `IsRequired` is needed to create a required relationship. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne()
        .IsRequired();
}
```

A more complete configuration can be used to explicitly configure the navigation and foreign key name, with an appropriate call to `IsRequired()` or `IsRequired(false)` as needed. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne()
        .HasForeignKey("BlogId")
        .IsRequired();
}
```
