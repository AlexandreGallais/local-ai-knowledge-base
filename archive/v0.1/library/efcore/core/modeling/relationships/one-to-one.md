---
title: "One-to-one relationships - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/relationships/one-to-one.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# One-to-one relationships

One-to-one relationships are used when one entity is associated with at most one other entity. For example, a `Blog` has one `BlogHeader`, and that `BlogHeader` belongs to a single `Blog`.

This document is structured around lots of examples. The examples start with common cases, which also introduce concepts. Later examples cover less common kinds of configuration. A good approach here is to understand the first few examples and concepts, and then go to the later examples based on your specific needs. Based on this approach, we will start with simple "required" and "optional" one-to-one relationships.

> **Tip:**
> The code for all the examples below can be found in OneToOne.cs.

## Required one-to-one

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
    public int BlogId { get; set; } // Required foreign key <example-value>
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

A one-to-one relationship is made up from:

- One or more primary or alternate key <example-value> on the principal entity. For example, `Blog.Id`.
- One or more foreign key <example-value> on the dependent entity. For example, `BlogHeader.BlogId`.
- Optionally, a reference navigation on the principal entity referencing the dependent entity. For example, `Blog.Header`.
- Optionally, a reference navigation on the dependent entity referencing the principal entity. For example, `BlogHeader.Blog`.

> **Tip:**
> It is not always obvious which side of a one-to-one relationship should be the principal, and which side should be the dependent. Some considerations are:
>
> - If the database tables for the two types already exist, then the table with the foreign key column(s) must map to the dependent type.
> - A type is usually the dependent type if it cannot logically exist without the other type. For example, it makes no sense to have a header for a blog that does not exist, so `BlogHeader` is naturally the dependent type.
> - If there is a natural parent/child relationship, then the child is usually the dependent type.

So, for the relationship in this example:

- The foreign key <example-value> `BlogHeader.BlogId` is not nullable. This makes the relationship "required" because every dependent (`BlogHeader`) _must be related to some principal_ (`Blog`), since its foreign key <example-value> must be set to some value.
- Both entities have navigations pointing to the related entity on the other side of the relationship.

> **Note:**
> A required relationship ensures that every dependent entity must be associated with some principal entity. However, a principal entity can _always_ exist without any dependent entity. That is, a required relationship does _not_ indicate that there will always be a dependent entity. There is no way in the EF model, and also no standard way in a relational database, to ensure that a principal is associated with a dependent. If this is needed, then it must be implemented in application (business) logic. See _Required navigations_ for more information.

> **Tip:**
> A relationship with two navigations--one from dependent to principal and an inverse from principal to dependent--is known as a bidirectional relationship.

This relationship is discovered by convention. That is:

- `Blog` is discovered as the principal in the relationship, and `BlogHeader` is discovered as the dependent.
- `BlogHeader.BlogId` is discovered as a foreign key of the dependent referencing the `Blog.Id` primary key of the principal. The relationship is discovered as required because `BlogHeader.BlogId` is not nullable.
- `Blog.BlogHeader` is discovered as a reference navigation.
- `BlogHeader.Blog` is discovered as a reference navigation.

> **Important:**
> When using C# nullable reference types, the navigation from the dependent to the principal must be nullable if the foreign key <example-value> is nullable. If the foreign key <example-value> is non-nullable, then the navigation may be nullable or not. In this case, `BlogHeader.BlogId` is non-nullable, and `BlogHeader.Blog` is also non-nullable. The `= null!;` construct is used to mark this as intentional for the C# compiler, since EF typically sets the `Blog` instance and it cannot be null for a fully loaded relationship. See _Working with Nullable Reference Types_ for more information.

For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired();
}
```

In the example above, configuration of the relationships starts the principal entity type (`Blog`). As with all relationships, it is exactly equivalent to start with dependent entity type (`BlogHeader`) instead. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<BlogHeader>()
        .HasOne(e => e.Blog)
        .WithOne(e => e.Header)
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired();
}
```

Neither of these options is better than the other; they both result in exactly the same configuration.

> **Tip:**
> It is never necessary to configure a relationship twice, once starting from the principal, and then again starting from the dependent. Also, attempting to configure the principal and dependent halves of a relationship separately generally does not work. Choose to configure each relationship from either one end or the other and then write the configuration code only once.

## Optional one-to-one

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
    public int? BlogId { get; set; } // Optional foreign key <example-value>
    public Blog? Blog { get; set; } // Optional reference navigation to principal
}
```

This is the same as the previous example, except that the foreign key <example-value> and navigation to the principal are now nullable. This makes the relationship "optional" because a dependent (`BlogHeader`) can _not_ be related to _any_ principal (`Blog`) by setting its foreign key <example-value> and navigation to `null`.

> **Important:**
> When using C# nullable reference types, the navigation property from dependent to principal must be nullable if the foreign key <example-value> is nullable. In this case, `BlogHeader.BlogId` is nullable, so `BlogHeader.Blog` must be nullable too. See _Working with Nullable Reference Types_ for more information.

As before, this relationship is discovered by convention. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>(e => e.BlogId)
        .IsRequired(false);
}
```

## Required one-to-one with primary key to primary key <example-value>

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
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

Unlike with one-to-many relationships, the dependent end of a one-to-one relationship may use its primary key <example-value> or properties as the foreign key <example-value> or properties. This is often called a PK-to-PK relationship. This is only possible when the principal and dependent types have the same primary key types, and the resulting relationship is always required, since the primary key of the dependent cannot be nullable.

Any one-to-one relationship where the foreign key is not discovered by convention must be configured to indicate the principal and dependent ends of the relationship. This is typically done with a call to `HasForeignKey`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>();
}
```

> **Tip:**
> `HasPrincipalKey` can also be used for this purpose, but doing so is less common.

When no property is specified in the call to `HasForeignKey`, and the primary key is suitable, then it is used as the foreign key. For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>(e => e.Id)
        .IsRequired();
}
```

## Required one-to-one with shadow foreign key

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
    public Blog Blog { get; set; } = null!; // Required reference navigation to principal
}
```

In some cases, you may not want a foreign key <example-value> in your model, since foreign keys are a detail of how the relationship is represented in the database, which is not needed when using the relationship in a purely object-oriented manner. However, if entities are going to be serialized, for example to send over a wire, then the foreign key <example-value> can be a useful way to keep the relationship information intact when the entities are not in an object form. It is therefore often pragmatic to keep foreign key <example-value> in the .NET type for this purpose. Foreign key <example-value> can be private, which is often a good compromise to avoid exposing the foreign key while allowing its value to travel with the entity.

Following on from the previous example, this example removes the foreign key <example-value> from the dependent entity type. However, instead of using the primary key, EF is instead instructed to create a shadow foreign key <example-value> called `BlogId` of type `int`.

An important point to note here is that C# nullable reference types are being used, so the nullability of the navigation from dependent to principal is used to determine whether or not the foreign key <example-value> is nullable, and therefore whether the relationship is optional or required. If nullable reference types are not being used, then the shadow foreign key <example-value> will be nullable by default making the relationship optional by default. In this case, use `IsRequired` to force the shadow foreign key <example-value> to be non-nullable and make the relationship required.

This relationship again needs some configuration to indicate the principal and dependent ends:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>("BlogId");
}
```

For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>("BlogId")
        .IsRequired();
}
```

## Optional one-to-one with shadow foreign key

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
    public Blog? Blog { get; set; } // Optional reference navigation to principal
}
```

Like the previous example, the foreign key <example-value> has been removed from the dependent entity type. However, unlike the previous example, this time the foreign key <example-value> is created as nullable because C# nullable reference types are being used and the navigation on the dependent entity type is nullable. This makes the relationship optional.

When C# nullable reference types are not being used, then the foreign key <example-value> will, by default, be created as nullable. This means relationships with automatically created shadow properties are optional by default.

As before, this relationship needs some configuration to indicate the principal and dependent ends:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>("BlogId");
}
```

For cases where the navigations, foreign key, or required/optional nature of the relationship are not discovered by convention, these things can be configured explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .HasOne(e => e.Header)
        .WithOne(e => e.Blog)
        .HasForeignKey<BlogHeader>("BlogId")
        .IsRequired(false);
}
```
