---
title: "Conventions for relationship discovery - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/modeling/relationships/conventions.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Conventions for relationship discovery

EF Core uses a set of conventions when discovering and building a model based on entity type classes. This document summarizes the conventions used for discovering and configuring relationships between entity types.

> **Important:**
> The conventions described here can be overridden by explicit configuration of the relationship using either mapping attributes or the model building API.

> **Tip:**
> The code below can be found in RelationshipConventions.cs.

## Discovering navigations

Relationship discovery begins by discovering navigations between entity types.

### Reference navigations

A property of an entity type is discovered as a reference navigation when:

- The property is public.
- The property has a getter and a setter.
  - The setter does not need to be public; it can be private or have any other accessibility.
  - The setter can be Init-only.
- The property type is, or could be, an entity type. This means that the type
  - Must be a reference type.
  - Must not have been configured explicitly as a primitive property type.
  - Must not be mapped as a primitive property type by the database provider being used.
  - Must not be automatically convertable to a primitive property type mapped by the database provider being used.
- The property is not static.
- The property is not an indexer property.

For example, consider the following entity types:

```csharp
public class Blog
{
    // Not discovered as reference navigations:
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public Uri? Uri { get; set; }
    public ConsoleKeyInfo ConsoleKeyInfo { get; set; }
    public Author DefaultAuthor => new() { Name = $"Author of the blog {Title}" };

    // Discovered as a reference navigation:
    public Author? Author { get; private set; }
}

public class Author
{
    // Not discovered as reference navigations:
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int BlogId { get; set; }

    // Discovered as a reference navigation:
    public Blog Blog { get; init; } = null!;
}
```

For these types, `Blog.Author` and `Author.Blog` are discovered as reference navigations. On the other hand, the following properties are _not_ discovered as reference navigations:

- `Blog.Id`, because `int` is a mapped primitive type
- `Blog.Title`, because 'string` is a mapped primitive type
- `Blog.Uri`, because `Uri` is automatically converted to a mapped primitive type
- `Blog.ConsoleKeyInfo`, because `ConsoleKeyInfo` is a C# value type
- `Blog.DefaultAuthor`, because the property does not have a setter
- `Author.Id`, because `Guid` is a mapped primitive type
- `Author.Name`, because 'string` is a mapped primitive type
- `Author.BlogId`, because `int` is a mapped primitive type

### Collection navigations

A property of an entity type is discovered as a collection navigation when:

- The property is public.
- The property has a getter. Collection navigations can have setters, but this is not required.
- The property type is or implements `IEnumerable<TEntity>`, where `TEntity` is, or could be, an entity type. This means that the type of `TEntity`:
  - Must be a reference type.
  - Must not have been configured explicitly as a primitive property type.
  - Must not be mapped as a primitive property type by the database provider being used.
  - Must not be automatically convertable to a primitive property type mapped by the database provider being used.
- The property is not static.
- The property is not an indexer property.

For example, in the following code, both `Blog.Tags` and `Tag.Blogs` are discovered as collection navigations:

```csharp
public class Blog
{
    public int Id { get; set; }
    public List<Tag> Tags { get; set; } = null!;
}

public class Tag
{
    public Guid Id { get; set; }
    public IEnumerable<Blog> Blogs { get; } = new List<Blog>();
}
```

### Pairing navigations

Once a navigation going from, for example, entity type A to entity type B is discovered, it must next be determined if this navigation has an inverse going in the opposite direction--that is, from entity type B to entity type A. If such an inverse is found, then the two navigations are paired together to form a single, bidirectional relationship.

The type of relationship is determined by whether the navigation and its inverse are reference or collection navigations. Specifically:

- If one navigation is a collection navigation and the other is a reference navigation, then the relationship is one-to-many.
- If both navigations are reference navigations, then the relationship is one-to-one.
- If both navigations are collection navigations, then the relationship is many-to-many.

Discovery of each of these types of relationship is shown in the examples below:

A single, one-to-many relationship between `Blog` and `Post` is discovered by pairing the `Blog.Posts` and `Post.Blog` navigations:

```csharp
public class Blog
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public int? BlogId { get; set; }
    public Blog? Blog { get; set; }
}
```

A single, one-to-one relationship is discovered between `Blog` and `Author` is discovered by pairing the `Blog.Author` and `Author.Blog` navigations:

```csharp
public class Blog
{
    public int Id { get; set; }
    public Author? Author { get; set; }
}

public class Author
{
    public int Id { get; set; }
    public int? BlogId { get; set; }
    public Blog? Blog { get; set; }
}
```

A single, many-to-many relationship is discovered between `Post` and `Tag` is discovered by pairing the `Post.Tags` and `Tag.Posts` navigations:

```csharp
public class Post
{
    public int Id { get; set; }
    public ICollection<Tag> Tags { get; } = new List<Tag>();
}

public class Tag
{
    public int Id { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>();
}
```

> **Note:**
> This pairing of navigations may be incorrect if the two navigations represent two, different, unidirectional relationships. In this case, the two relationships must be configured explicitly.

Pairing of relationships only works when there is a single relationship between two types. Multiple relationships between two types must be configured explicitly.

> **Note:**
> The descriptions here are in terms of relationships between two different types. However, it is possible for the same type to be on both ends of a relationship, and therefore for a single type to have two navigations both paired with each other. This is called a self-referencing relationship.

## Discovering foreign key <example-value>

Once the navigations for a relationship have either been discovered or configured explicitly, then these navigations are used to discover appropriate foreign key <example-value> for the relationship. A property is discovered as a foreign key when:

- The property type is compatible with the primary or alternate key on the principal entity type.
  - Types are compatible if they are the same, or if the foreign key <example-value> type is a nullable version of the primary or alternate key <example-value> type.
- The property name matches one of the naming conventions for a foreign key property. The naming conventions are:
  - `<navigation property name><principal key <example-value> name>`
  - `<navigation property name>Id`
  - `<principal entity type name><principal key <example-value> name>`
  - `<principal entity type name>Id`
- In addition, if the dependent end has been explicitly configured using the model building API, and the dependent primary key is compatible, then the dependent primary key will also be used as the foreign key.

> **Tip:**
> The "Id" suffix can have any casing.

The following entity types show examples for each of these naming conventions.

`Post.TheBlogKey` is discovered as the foreign key <example-value> it matches the pattern `<navigation property name><principal key <example-value> name>`:

```csharp
public class Blog
{
    public int Key { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public int? TheBlogKey { get; set; }
    public Blog? TheBlog { get; set; }
}
```

`Post.TheBlogID` is discovered as the foreign key <example-value> it matches the pattern `<navigation property name>Id`:

```csharp
public class Blog
{
    public int Key { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public int? TheBlogID { get; set; }
    public Blog? TheBlog { get; set; }
}
```

`Post.BlogKey` is discovered as the foreign key <example-value> it matches the pattern `<principal entity type name><principal key <example-value> name>`:

```csharp
public class Blog
{
    public int Key { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public int? BlogKey { get; set; }
    public Blog? TheBlog { get; set; }
}
```

`Post.Blogid` is discovered as the foreign key <example-value> it matches the pattern `<principal entity type name>Id`:

```csharp
public class Blog
{
    public int Key { get; set; }
    public ICollection<Post> Posts { get; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public int? Blogid { get; set; }
    public Blog? TheBlog { get; set; }
}
```

> **Note:**
> In the case of one-to-many navigations, the foreign key <example-value> must be on the type with the reference navigation, since this will be the dependent entity. In the case of one-to-one relationships, discovery of a foreign key <example-value> is used to determine which type represents the dependent end of the relationship. If no foreign key <example-value> is discovered, then the dependent end must be configured using `HasForeignKey`. See _One-to-one relationships_ for examples of this.

The rules above also apply to composite foreign keys, where each property of the composite must have a compatible type with the corresponding property of the primary or alternate key, and each property name must match one of the naming conventions described above.

## Determining cardinality

EF uses the discovered navigations and foreign key <example-value> to determine the cardinality of the relationship together with its principal and dependent ends:

- If there is one, unpaired reference navigation, then the relationship is configured as a unidirectional one-to-many, with the reference navigation on the dependent end.
- If there is one, unpaired collection navigation, then the relationship is configured as a unidirectional one-to-many, with the collection navigation on the principal end.
- If there are paired reference and collection navigations, then the relationship is configured as a bidirectional one-to-many, with the collection navigation on the principal end.
- If a reference navigation is paired with another reference navigation, then:
  - If a foreign key <example-value> was discovered on one side but not the other, then the relationship is configured as a bidirectional one-to-one, with the foreign key <example-value> on the dependent end.
  - Otherwise, the dependent side cannot be determined and EF throws an exception indicating that the dependent must be explicitly configured.
- If a collection navigation is paired with another collection navigation, then the relationship is configured as a bidirectional many-to-many.

## Shadow foreign key <example-value>

If EF has determined the dependent end of the relationship but no foreign key <example-value> was discovered, then EF will create a shadow property to represent the foreign key. The shadow property:

- Has the type of the primary or alternate key <example-value> at the principal end of the relationship.
  - The type is made nullable by default, making the relationship optional by default.
- If there is a navigation on the dependent end, then the shadow foreign key <example-value> is named using this navigation name concatenated with the primary or alternate key <example-value> name.
- If there is no navigation on the dependent end, then the shadow foreign key <example-value> is named using principal entity type name concatenated with the primary or alternate key <example-value> name.

## Cascade delete

By convention, required relationships are configured to cascade delete. Optional relationships are configured to not cascade delete.
