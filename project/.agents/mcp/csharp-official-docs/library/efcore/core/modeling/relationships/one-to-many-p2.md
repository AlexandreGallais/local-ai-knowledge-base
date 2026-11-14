---
title: "One-to-many relationships - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/modeling/relationships/one-to-many.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# One-to-many relationships - EF Core (part 2 of 2)

## One-to-many without navigation to dependents

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key <example-value>
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

The previous two examples had navigations from the principal to dependents, but no navigation from the dependent to principal. For the next couple of examples, the navigation on the dependent is re-introduced, while the navigation on the principal is removed instead.

As before, this relationship is discovered by convention. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasOne(e => e.Blog)
        .WithMany()
        .HasForeignKey(e => e.BlogId)
        .IsRequired();
}
```

Notice again that `WithMany()` is called with no arguments to indicate that there is no navigation in this direction.

If configuration starts from the entity with no navigation, then the type of the entity on the other end of the relationship must be explicitly specified using the generic `HasMany<>()` call. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany<Post>()
        .WithOne(e => e.Blog)
        .HasForeignKey(e => e.BlogId)
        .IsRequired();
}
```

## One-to-many with no navigations

Occasionally, it can be useful to configure a relationship with no navigations. Such a relationship can only be manipulated by changing the foreign key value directly.

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key <example-value>
}
```

This relationship is not discovered by convention, since there are no navigations indicating that the two types are related. It can be configured explicitly in `OnModelCreating`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany<Post>()
        .WithOne();
}
```

With this configuration, the `Post.BlogId` property is still detected as the foreign key by convention, and the relationship is required because the foreign key <example-value> is not nullable. The relationship can be made "optional" by making the foreign key <example-value> nullable.

A more complete explicit configuration of this relationship is::

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany<Post>()
        .WithOne()
        .HasForeignKey(e => e.BlogId)
        .IsRequired();
}
```

## One-to-many with alternate key

In all the examples so far, the foreign key <example-value> on the dependent is constrained to the primary key <example-value> on the principal. The foreign key can instead be constrained to a different property, which then becomes an alternate key for the principal entity type. For example:

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public int AlternateId { get; set; } // Alternate key as target of the Post.BlogId foreign key
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

This relationship is not discovered by convention, since EF will always, by convention, create a relationship to the primary key. It can be configured explicitly in `OnModelCreating` using a call to `HasPrincipalKey`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne(e => e.Blog)
        .HasPrincipalKey(e => e.AlternateId);
}
```

`HasPrincipalKey` can be combined with other calls to explicitly configure the navigations, foreign key <example-value>, and required/optional nature. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne(e => e.Blog)
        .HasPrincipalKey(e => e.AlternateId)
        .HasForeignKey(e => e.BlogId)
        .IsRequired();
}
```

## One-to-many with composite foreign key

In all the examples so far, the primary or alternate key <example-value> of the principal consisted of a single property. Primary or alternate keys can also be formed from more than one property--these are known as "composite keys". When the principal of a relationship has a composite key, then the foreign key of the dependent must also be a composite key with the same number of properties. For example:

```csharp
// Principal (parent)
public class Blog
{
    public int Id1 { get; set; } // Composite key part 1
    public int Id2 { get; set; } // Composite key part 2
    public ICollection<Post> Posts { get; } = new List<Post>(); // Collection navigation containing dependents
}

// Dependent (child)
public class Post
{
    public int Id { get; set; }
    public int BlogId1 { get; set; } // Required foreign key <example-value> part 1
    public int BlogId2 { get; set; } // Required foreign key <example-value> part 2
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

This relationship is discovered by convention. However, the composite key <example-value> needs to be configured explicitly::

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasKey(e => new { e.Id1, e.Id2 });
}
```

> **Important:**
> A composite foreign key value is considered to be `null` if any of its property values are null. A composite foreign key with one property null and another non-null will not be considered a match for a primary or alternate key with the same values. Both will be considered `null`.

Both `HasForeignKey` and `HasPrincipalKey` can be used to explicitly specify keys with multiple properties. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>(
        nestedBuilder =>
        {
            nestedBuilder.HasKey(e => new { e.Id1, e.Id2 });

            nestedBuilder.HasMany(e => e.Posts)
                .WithOne(e => e.Blog)
                .HasPrincipalKey(e => new { e.Id1, e.Id2 })
                .HasForeignKey(e => new { e.BlogId1, e.BlogId2 })
                .IsRequired();
        });
}
```

> **Tip:**
> In the code above, the calls to `HasKey` and `HasMany` have been grouped together into a nested builder. Nested builders remove the need to call `Entity<>()` multiple times for the same entity type, but are functionally equivalent to calling `Entity<>()` multiple times.

## Required one-to-many without cascade delete

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

By convention, required relationships are configured to cascade delete; this means that when the principal is deleted, all of its dependents are deleted as well, since dependents cannot exist in the database without a principal. It's possible to configure EF to throw an exception instead of automatically deleting dependent rows that can no longer exist:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasMany(e => e.Posts)
        .WithOne(e => e.Blog)
        .OnDelete(DeleteBehavior.Restrict);
}
```

## Self-referencing one-to-many

In all the previous examples, the principal entity type was different from the dependent entity type. This does not have to be the case. For example, in the types below, each `Employee` is related to other `Employees`.

```csharp
public class Employee
{
    public int Id { get; set; }

    public int? ManagerId { get; set; } // Optional foreign key <example-value>
    public Employee? Manager { get; set; } // Optional reference navigation to principal
    public ICollection<Employee> Reports { get; } = new List<Employee>(); // Collection navigation containing dependents
}
```

This relationship is discovered by convention. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Employee>()
        .HasOne(e => e.Manager)
        .WithMany(e => e.Reports)
        .HasForeignKey(e => e.ManagerId)
        .IsRequired(false);
}
```
