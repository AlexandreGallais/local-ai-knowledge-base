---
title: "One-to-one relationships - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/relationships/one-to-one.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# One-to-one relationships - EF Core (part 2 of 2)

## One-to-one without navigation to principal

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public BlogHeader? Header { get; set; } // Reference navigation to dependent
}

// Dependent (child)
public class BlogHeader
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key property
}
```

For this example, the foreign key property has been re-introduced, but the navigation on the dependent has been removed.

> **Tip:**
> A relationship with only one navigation--one from dependent to principal or one from principal to dependent, but not both--is known as a unidirectional relationship.

This relationship is discovered by convention, since the foreign key is discovered, thereby indicating the dependent side. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne()
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired();
}
```

Notice that the call to `WithOne` has no arguments. This is the way to tell EF that there is no navigation from `BlogHeader` to `Blog`.

If configuration starts from the entity with no navigation, then the type of the entity on the other end of the relationship must be explicitly specified using the generic `HasOne<>()` call. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<BlogHeader>()
        .HasOne<Blog>()
        .WithOne(e => e.Header)
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired();
}
```

## One-to-one without navigation to principal and with shadow foreign key

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public BlogHeader? Header { get; set; } // Reference navigation to dependent
}

// Dependent (child)
public class BlogHeader
{
    public int Id { get; set; }
}
```

This example combines two of the previous examples by removing both the foreign key property and the navigation on the dependent.

As before, this relationship needs some configuration to indicate the principal and dependent ends:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne()
        .HasForeignKey<BlogHeader>("BlogId")
        .IsRequired();
}
```

A more complete configuration can be used to explicitly configure the navigation and foreign key name, with an appropriate call to `IsRequired()` or `IsRequired(false)` as needed. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne()
        .HasForeignKey<BlogHeader>("BlogId")
        .IsRequired();
}
```

## One-to-one without navigation to dependent

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
}

// Dependent (child)
public class BlogHeader
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key property
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

The previous two examples had navigations from the principal to dependents, but no navigation from the dependent to principal. For the next couple of examples, the navigation on the dependent is re-introduced, while the navigation on the principal is removed instead.

By convention, EF will treat this as a one-to-many relationship. Some minimal configuration is needed to make it one-to-one:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<BlogHeader>()
        .HasOne(e => e.Blog)
        .WithOne();
}
```

Notice again that `WithOne()` is called with no arguments to indicate that there is no navigation in this direction.

For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<BlogHeader>()
        .HasOne(e => e.Blog)
        .WithOne()
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired();
}
```

If configuration starts from the entity with no navigation, then the type of the entity on the other end of the relationship must be explicitly specified using the generic `HasOne<>()` call. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne<BlogHeader>()
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired();
}
```

## One-to-one with no navigations

Occasionally, it can be useful to configure a relationship with no navigations. Such a relationship can only be manipulated by changing the foreign key value directly.

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
}

// Dependent (child)
public class BlogHeader
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key property
}
```

This relationship is not discovered by convention, since there are no navigations indicating that the two types are related. It can be configured explicitly in `OnModelCreating`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne<BlogHeader>()
        .WithOne();
}
```

With this configuration, the `BlogHeader.BlogId` property is still detected as the foreign key by convention, and the relationship is "required" because the foreign key property is not nullable. The relationship can be made "optional" by making the foreign key property nullable.

A more complete explicit configuration of this relationship is::

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne<BlogHeader>()
        .WithOne()
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired();
}
```

## One-to-one with alternate key

In all the examples so far, the foreign key property on the dependent is constrained to the primary key property on the principal. The foreign key can instead be constrained to a different property, which then becomes an alternate key for the principal entity type. For example:

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public int AlternateId { get; set; } // Alternate key as target of the BlogHeader.BlogId foreign key
    public BlogHeader? Header { get; set; } // Reference navigation to dependent
}

// Dependent (child)
public class BlogHeader
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key property
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

This relationship is not discovered by convention, since EF will always, by convention, create a relationship to the primary key. It can be configured explicitly in `OnModelCreating` using a call to `HasPrincipalKey`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasPrincipalKey<Blog>(e => e.AlternateId);
}
```

`HasPrincipalKey` can be combined with other calls to explicitly configure the navigations, foreign key properties, and required/optional nature. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasPrincipalKey<Blog>(e => e.AlternateId)
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired();
}
```

## One-to-one with composite foreign key

In all the examples so far, the primary or alternate key property of the principal consisted of a single property. Primary or alternate keys can also be formed form more than one property--these are known as "composite keys". When the principal of a relationship has a composite key, then the foreign key of the dependent must also be a composite key with the same number of properties. For example:

```csharp
// Principal (parent)
public class Blog
{
    public int Id1 { get; set; } // Composite key part 1
    public int Id2 { get; set; } // Composite key part 2
    public BlogHeader? Header { get; set; } // Reference navigation to dependent
}

// Dependent (child)
public class BlogHeader
{
    public int Id { get; set; }
    public int BlogId1 { get; set; } // Required foreign key property part 1
    public int BlogId2 { get; set; } // Required foreign key property part 2
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

This relationship is discovered by convention. However, it will only be discovered if the composite key has been configured explicitly, since composite keys are not discovered automatically. For example:

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

            nestedBuilder.HasOne(e => e.Header)
                .WithOne(e => e.Blog)
                .HasPrincipalKey<Blog>(e => new { e.Id1, e.Id2 })
                .HasForeignKey<BlogHeader>(e => new { e.BlogId1, e.BlogId2 })
                .IsRequired();
        });
}
```

> **Tip:**
> In the code above, the calls to `HasKey` and `HasOne` have been grouped together into a nested builder. Nested builders remove the need to call `Entity<>()` multiple times for the same entity type, but are functionally equivalent to calling `Entity<>()` multiple times.

## Required one-to-one without cascade delete

```csharp
// Principal (parent)
public class Blog
{
    public int Id { get; set; }
    public BlogHeader? Header { get; set; } // Reference navigation to dependent
}

// Dependent (child)
public class BlogHeader
{
    public int Id { get; set; }
    public int BlogId { get; set; } // Required foreign key property
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

By convention, required relationships are configured to cascade delete. This is because the dependent cannot exist in the database once the principal has been deleted. The database can be configured to generate an error, typically crashing the application, instead of automatically deleting dependent rows that can no longer exist. This requires some configuration:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .OnDelete(DeleteBehavior.Restrict);
}
```

## Self-referencing one-to-one

In all the previous examples, the principal entity type was different from the dependent entity type. This does not have to be the case. For example, in the types below, each `Person` is optionally related to another `Person`.

```csharp
public class Person
{
    public int Id { get; set; }

    public int? HusbandId { get; set; } // Optional foreign key property
    public Person? Husband { get; set; } // Optional reference navigation to principal
    public Person? Wife { get; set; } // Reference navigation to dependent
}
```

This relationship is discovered by convention. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Person>()
        .HasOne(e => e.Husband)
        .WithOne(e => e.Wife)
        .HasForeignKey<Person>(e => e.HusbandId)
        .IsRequired(false);
}
```

> **Note:**
> For one-to-one self referencing relationships, since the principal and dependent entity types are the same, specifying which type contains the foreign key does not clarify the dependent end. In this case, the navigation specified in `HasOne` points from dependent to principal, and the navigation specified in `WithOne` points from principal to dependent.
