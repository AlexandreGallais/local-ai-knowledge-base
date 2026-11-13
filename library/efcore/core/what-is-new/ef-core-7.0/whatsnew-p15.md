---
title: "What's New in EF Core 7.0 (part 15 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 15 of 16)

## Model building enhancements

EF7 contains a variety of small improvements in model building.

> **Tip:**
> The code for samples in this section comes from ModelBuildingSample.cs.

### Indexes can be ascending or descending

By default, EF Core creates ascending indexes. EF7 also supports the creation of descending indexes. For example:

```csharp
modelBuilder
    .Entity<Post>()
    .HasIndex(post => post.Title)
    .IsDescending();
```

Or, using the `Index` mapping attribute:

```csharp
[Index(nameof(Title), AllDescending = true)]
public class Post
{
    public int Id { get; set; }

    [MaxLength(64)]
    public string? Title { get; set; }
}
```

This is rarely useful for indexes over a single column, since the database can use the same index for ordering in both directions. However, this is not the case for composite indexes over multiple columns where the order on each column can be important. EF Core supports this by allowing multiple columns to have different ordering defined for each column. For example:

```csharp
modelBuilder
    .Entity<Blog>()
    .HasIndex(blog => new { blog.Name, blog.Owner })
    .IsDescending(false, true);
```

Or, using a mapping attribute:

```csharp
[Index(nameof(Name), nameof(Owner), IsDescending = new[] { false, true })]
public class Blog
{
    public int Id { get; set; }

    [MaxLength(64)]
    public string? Name { get; set; }

    [MaxLength(64)]
    public string? Owner { get; set; }

    public List<Post> Posts { get; } = new();
}
```

This results in the following SQL when using SQL Server:

```sql
CREATE INDEX [IX_Blogs_Name_Owner] ON [Blogs] ([Name], [Owner] DESC);
```

Finally, multiple indexes can be created over the same ordered set of columns by giving the indexes names. For example:

```csharp
modelBuilder
    .Entity<Blog>()
    .HasIndex(blog => new { blog.Name, blog.Owner }, "IX_Blogs_Name_Owner_1")
    .IsDescending(false, true);

modelBuilder
    .Entity<Blog>()
    .HasIndex(blog => new { blog.Name, blog.Owner }, "IX_Blogs_Name_Owner_2")
    .IsDescending(true, true);
```

Or, using mapping attributes:

```csharp
[Index(nameof(Name), nameof(Owner), IsDescending = new[] { false, true }, Name = "IX_Blogs_Name_Owner_1")]
[Index(nameof(Name), nameof(Owner), IsDescending = new[] { true, true }, Name = "IX_Blogs_Name_Owner_2")]
public class Blog
{
    public int Id { get; set; }

    [MaxLength(64)]
    public string? Name { get; set; }

    [MaxLength(64)]
    public string? Owner { get; set; }

    public List<Post> Posts { get; } = new();
}
```

This generates the following SQL on SQL Server:

```sql
CREATE INDEX [IX_Blogs_Name_Owner_1] ON [Blogs] ([Name], [Owner] DESC);
CREATE INDEX [IX_Blogs_Name_Owner_2] ON [Blogs] ([Name] DESC, [Owner] DESC);
```

### Mapping attribute for composite keys

EF7 introduces a new mapping attribute (aka "data annotation") for specifying the primary key property or properties of any entity type. Unlike `System.ComponentModel.DataAnnotations.KeyAttribute`, `Microsoft.EntityFrameworkCore.PrimaryKeyAttribute` is placed on the entity type class rather than on the key property. For example:

```csharp
[PrimaryKey(nameof(PostKey))]
public class Post
{
    public int PostKey { get; set; }
}
```

This makes it a natural fit for defining composite keys:

```csharp
[PrimaryKey(nameof(PostId), nameof(CommentId))]
public class Comment
{
    public int PostId { get; set; }
    public int CommentId { get; set; }
    public string CommentText { get; set; } = null!;
}
```

Defining the index on the class also means it can be used to specify private properties or fields as keys, even though these would usually be ignored when building the EF model. For example:

```csharp
[PrimaryKey(nameof(_id))]
public class Tag
{
    private readonly int _id;
}
```

### `DeleteBehavior` mapping attribute

EF7 introduces a mapping attribute (aka "data annotation") to specify the `Microsoft.EntityFrameworkCore.DeleteBehavior` for a relationship. For example, required relationships are created with `Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade` by default. This can be changed to `Microsoft.EntityFrameworkCore.DeleteBehavior.NoAction` by default using `Microsoft.EntityFrameworkCore.DeleteBehaviorAttribute`:

```csharp
public class Post
{
    public int Id { get; set; }
    public string? Title { get; set; }

    [DeleteBehavior(DeleteBehavior.NoAction)]
    public Blog Blog { get; set; } = null!;
}
```

This will disable cascade deletes for the Blog-Posts relationship.

### Properties mapped to different column names

Some mapping patterns result in the same CLR property being mapped to a column in each of multiple different tables. EF7 allows these columns to have different names. For example, consider a simple inheritance hierarchy:

```csharp
public abstract class Animal
{
    public int Id { get; set; }
    public string Breed { get; set; } = null!;
}

public class Cat : Animal
{
    public string? EducationalLevel { get; set; }
}

public class Dog : Animal
{
    public string? FavoriteToy { get; set; }
}
```

With the TPT inheritance mapping strategy, these types will be mapped to three tables. However, the primary key column in each table may have a different name. For example:

```sql
CREATE TABLE [Animals] (
    [Id] int NOT NULL IDENTITY,
    [Breed] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Animals] PRIMARY KEY ([Id])
);

CREATE TABLE [Cats] (
    [CatId] int NOT NULL,
    [EducationalLevel] nvarchar(max) NULL,
    CONSTRAINT [PK_Cats] PRIMARY KEY ([CatId]),
    CONSTRAINT [FK_Cats_Animals_CatId] FOREIGN KEY ([CatId]) REFERENCES [Animals] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Dogs] (
    [DogId] int NOT NULL,
    [FavoriteToy] nvarchar(max) NULL,
    CONSTRAINT [PK_Dogs] PRIMARY KEY ([DogId]),
    CONSTRAINT [FK_Dogs_Animals_DogId] FOREIGN KEY ([DogId]) REFERENCES [Animals] ([Id]) ON DELETE CASCADE
);
```

EF7 allows this mapping to be configured using a nested table builder:

```csharp
modelBuilder.Entity<Animal>().ToTable("Animals");

modelBuilder.Entity<Cat>()
    .ToTable(
        "Cats",
        tableBuilder => tableBuilder.Property(cat => cat.Id).HasColumnName("CatId"));

modelBuilder.Entity<Dog>()
    .ToTable(
        "Dogs",
        tableBuilder => tableBuilder.Property(dog => dog.Id).HasColumnName("DogId"));
```

With the TPC inheritance mapping, the `Breed` property can also be mapped to different column names in different tables. For example, consider the following TPC tables:

```sql
CREATE TABLE [Cats] (
    [CatId] int NOT NULL DEFAULT (NEXT VALUE FOR [AnimalSequence]),
    [CatBreed] nvarchar(max) NOT NULL,
    [EducationalLevel] nvarchar(max) NULL,
    CONSTRAINT [PK_Cats] PRIMARY KEY ([CatId])
);

CREATE TABLE [Dogs] (
    [DogId] int NOT NULL DEFAULT (NEXT VALUE FOR [AnimalSequence]),
    [DogBreed] nvarchar(max) NOT NULL,
    [FavoriteToy] nvarchar(max) NULL,
    CONSTRAINT [PK_Dogs] PRIMARY KEY ([DogId])
);
```

EF7 supports this table mapping:

```csharp
modelBuilder.Entity<Animal>().UseTpcMappingStrategy();

modelBuilder.Entity<Cat>()
    .ToTable(
        "Cats",
        builder =>
        {
            builder.Property(cat => cat.Id).HasColumnName("CatId");
            builder.Property(cat => cat.Breed).HasColumnName("CatBreed");
        });

modelBuilder.Entity<Dog>()
    .ToTable(
        "Dogs",
        builder =>
        {
            builder.Property(dog => dog.Id).HasColumnName("DogId");
            builder.Property(dog => dog.Breed).HasColumnName("DogBreed");
        });
```

### Unidirectional many-to-many relationships

EF7 supports many-to-many relationships where one side or the other does not have a navigation property. For example, consider `Post` and `Tag` types:

```csharp
public class Post
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public Blog Blog { get; set; } = null!;
    public List<Tag> Tags { get; } = new();
}
```

```csharp
public class Tag
{
    public int Id { get; set; }
    public string TagName { get; set; } = null!;
}
```

Notice that the `Post` type has a navigation property for a list of tags, but the `Tag` type does not have a navigation property for posts. In EF7, this can still be configured as a many-to-many relationship, allowing the same `Tag` object to be used for many different posts. For example:

```csharp
modelBuilder
    .Entity<Post>()
    .HasMany(post => post.Tags)
    .WithMany();
```

This results in mapping to the appropriate join table:

```sql
CREATE TABLE [Tags] (
    [Id] int NOT NULL IDENTITY,
    [TagName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Tags] PRIMARY KEY ([Id])
);

CREATE TABLE [Posts] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(64) NULL,
    [BlogId] int NOT NULL,
    CONSTRAINT [PK_Posts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Posts_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id])
);

CREATE TABLE [PostTag] (
    [PostId] int NOT NULL,
    [TagsId] int NOT NULL,
    CONSTRAINT [PK_PostTag] PRIMARY KEY ([PostId], [TagsId]),
    CONSTRAINT [FK_PostTag_Posts_PostId] FOREIGN KEY ([PostId]) REFERENCES [Posts] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PostTag_Tags_TagsId] FOREIGN KEY ([TagsId]) REFERENCES [Tags] ([Id]) ON DELETE CASCADE
);
```

And the relationship can be used as a many-to-many in the normal way. For example, inserting some posts which share various tags from a common set:

```csharp
var tags = new Tag[] { new() { TagName = "Tag1" }, new() { TagName = "Tag2" }, new() { TagName = "Tag2" }, };

await context.AddRangeAsync(new Blog { Posts =
{
    new Post { Tags = { tags[0], tags[1] } },
    new Post { Tags = { tags[1], tags[0], tags[2] } },
    new Post()
} });

await context.SaveChangesAsync();
```

### Entity splitting

Entity splitting maps a single entity type to multiple tables. For example, consider a database with three tables that hold customer data:

- A `Customers` table for customer information
- A `PhoneNumbers` table for the customer's phone number
- A `Addresses` table for the customer's address

Here are definitions for these tables in SQL Server:

```sql
CREATE TABLE [Customers] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([Id])
);
    
CREATE TABLE [PhoneNumbers] (
    [CustomerId] int NOT NULL,
    [PhoneNumber] nvarchar(max) NULL,
    CONSTRAINT [PK_PhoneNumbers] PRIMARY KEY ([CustomerId]),
    CONSTRAINT [FK_PhoneNumbers_Customers_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [Customers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Addresses] (
    [CustomerId] int NOT NULL,
    [Street] nvarchar(max) NOT NULL,
    [City] nvarchar(max) NOT NULL,
    [PostCode] nvarchar(max) NULL,
    [Country] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Addresses] PRIMARY KEY ([CustomerId]),
    CONSTRAINT [FK_Addresses_Customers_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [Customers] ([Id]) ON DELETE CASCADE
);
```

Each of these tables would typically be mapped to their own entity type, with relationships between the types. However, if all three tables are always used together, then it can be more convenient to map them all to a single entity type. For example:

```csharp
public class Customer
{
    public Customer(string name, string street, string city, string? postCode, string country)
    {
        Name = name;
        Street = street;
        City = city;
        PostCode = postCode;
        Country = country;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public string? PhoneNumber { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string? PostCode { get; set; }
    public string Country { get; set; }
}
```

This is achieved in EF7 by calling `SplitToTable` for each split in the entity type. For example, the following code splits the `Customer` entity type to the `Customers`, `PhoneNumbers`, and `Addresses` tables shown above:

```csharp
modelBuilder.Entity<Customer>(
    entityBuilder =>
    {
        entityBuilder
            .ToTable("Customers")
            .SplitToTable(
                "PhoneNumbers",
                tableBuilder =>
                {
                    tableBuilder.Property(customer => customer.Id).HasColumnName("CustomerId");
                    tableBuilder.Property(customer => customer.PhoneNumber);
                })
            .SplitToTable(
                "Addresses",
                tableBuilder =>
                {
                    tableBuilder.Property(customer => customer.Id).HasColumnName("CustomerId");
                    tableBuilder.Property(customer => customer.Street);
                    tableBuilder.Property(customer => customer.City);
                    tableBuilder.Property(customer => customer.PostCode);
                    tableBuilder.Property(customer => customer.Country);
                });
    });
```

Notice also that, if necessary, different primary key column names can be specified for each of the tables.

### SQL Server UTF-8 strings

SQL Server Unicode strings as represented by the `nchar` and `nvarchar` data types are stored as UTF-16. In addition, the `char` and `varchar` data types are used to store non-Unicode strings with support for various character sets.

Starting with SQL Server 2019, the `char` and `varchar` data types can be used to instead store Unicode strings with UTF-8 encoding. The is achieved by setting one of the UTF-8 collations. For example, the following code configures a variable length SQL Server UTF-8 string for the `CommentText` column:

```csharp
modelBuilder
    .Entity<Comment>()
    .Property(comment => comment.CommentText)
    .HasColumnType("varchar(max)")
    .UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8");
```

This configuration generates the following SQL Server column definition:

```sql
CREATE TABLE [Comment] (
    [PostId] int NOT NULL,
    [CommentId] int NOT NULL,
    [CommentText] varchar(max) COLLATE LATIN1_GENERAL_100_CI_AS_SC_UTF8 NOT NULL,
    CONSTRAINT [PK_Comment] PRIMARY KEY ([PostId], [CommentId])
);
 ```
