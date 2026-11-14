---
title: "Code First Data Annotations - EF6 (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/code-first/data-annotations.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Code First Data Annotations - EF6 (part 2 of 2)

## DatabaseGenerated

An important database features is the ability to have computed properties. If you're mapping your Code First classes to tables that contain computed columns, you don't want Entity Framework to try to update those columns. But you do want EF to return those values from the database after you've inserted or updated data. You can use the `DatabaseGenerated` annotation to flag those properties in your class along with the `Computed` enum. Other enums are `None` and `Identity`.

```csharp
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime DateCreated { get; set; }
```

You can use database generated on byte or timestamp columns when code first is generating the database, otherwise you should only use this when pointing to existing databases because code first won't be able to determine the formula for the computed column.

You read above that by default, a key <example-value> that is an integer will become an identity key in the database. That would be the same as setting `DatabaseGenerated` to `DatabaseGeneratedOption.Identity`. If you do not want it to be an identity key, you can set the value to `DatabaseGeneratedOption.None`.

 

## Index

> **Note:**
> **EF6.1 Onwards Only** - The `Index` attribute was introduced in Entity Framework 6.1. If you are using an earlier version the information in this section does not apply.

You can create an index on one or more columns using the **IndexAttribute**. Adding the attribute to one or more properties will cause EF to create the corresponding index in the database when it creates the database, or scaffold the corresponding **CreateIndex** calls if you are using Code First Migrations.

For example, the following code will result in an index being created on the `Rating` column of the `Posts` table in the database.

```csharp
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        [Index]
        public int Rating { get; set; }
        public int BlogId { get; set; }
    }
```

By default, the index will be named **IX\_<property name>** (IX\_Rating in the above example). You can also specify a name for the index though. The following example specifies that the index should be named `PostRatingIndex`.

```csharp
    [Index("PostRatingIndex")]
    public int Rating { get; set; }
```

By default, indexes are non-unique, but you can use the `IsUnique` named parameter to specify that an index should be unique. The following example introduces a unique index on a `User`'s login name.

```csharp
    public class User
    {
        public int UserId { get; set; }

        [Index(IsUnique = true)]
        [StringLength(200)]
        public string Username { get; set; }

        public string DisplayName { get; set; }
    }
```

### Multiple-Column Indexes

Indexes that span multiple columns are specified by using the same name in multiple Index annotations for a given table. When you create multi-column indexes, you need to specify an order for the columns in the index. For example, the following code creates a multi-column index on `Rating` and `BlogId` called **IX\_BlogIdAndRating**. `BlogId` is the first column in the index and `Rating` is the second.

```csharp
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        [Index("IX_BlogIdAndRating", 2)]
        public int Rating { get; set; }
        [Index("IX_BlogIdAndRating", 1)]
        public int BlogId { get; set; }
    }
```

 

## Relationship Attributes: InverseProperty and ForeignKey

> **Note:**
> This page provides information about setting up relationships in your Code First model using Data Annotations. For general information about relationships in EF and how to access and manipulate data using relationships, see Relationships & Navigation Properties.*

Code first convention will take care of the most common relationships in your model, but there are some cases where it needs help.

Changing the name of the key <example-value> in the `Blog` class created a problem with its relationship to `Post`. 

When generating the database, code first sees the `BlogId` property in the Post class and recognizes it, by the convention that it matches a class name plus **Id**, as a foreign key to the `Blog` class. But there is no `BlogId` property in the blog class. The solution for this is to create a navigation property in the `Post` and use the `ForeignKey` DataAnnotation to help code first understand how to build the relationship between the two classes (using the `Post.BlogId` property) as well as how to specify constraints in the database.

```csharp
    public class Post
    {
            public int Id { get; set; }
            public string Title { get; set; }
            public DateTime DateCreated { get; set; }
            public string Content { get; set; }
            public int BlogId { get; set; }
            [ForeignKey("BlogId")]
            public Blog Blog { get; set; }
            public ICollection<Comment> Comments { get; set; }
    }
```

The constraint in the database shows a relationship between `InternalBlogs.PrimaryTrackingKey` and `Posts.BlogId`. 

The `InverseProperty` is used when you have multiple relationships between classes.

In the `Post` class, you may want to keep track of who wrote a blog post as well as who edited it. Here are two new navigation properties for the Post class.

```csharp
    public Person CreatedBy { get; set; }
    public Person UpdatedBy { get; set; }
```

You’ll also need to add in the `Person` class referenced by these properties. The `Person` class has navigation properties back to the `Post`, one for all of the posts written by the person and one for all of the posts updated by that person.

```csharp
    public class Person
    {
            public int Id { get; set; }
            public string Name { get; set; }
            public List<Post> PostsWritten { get; set; }
            public List<Post> PostsUpdated { get; set; }
    }
```

Code first is not able to match up the properties in the two classes on its own. The database table for `Posts` should have one foreign key for the `CreatedBy` person and one for the `UpdatedBy` person but code first will create four foreign key <example-value>: **Person\_Id**, **Person\_Id1**, **CreatedBy\_Id** and **UpdatedBy\_Id**.

To fix these problems, you can use the `InverseProperty` annotation to specify the alignment of the properties.

```csharp
    [InverseProperty("CreatedBy")]
    public List<Post> PostsWritten { get; set; }

    [InverseProperty("UpdatedBy")]
    public List<Post> PostsUpdated { get; set; }
```

Because the `PostsWritten` property in Person knows that this refers to the `Post` type, it will build the relationship to `Post.CreatedBy`. Similarly, `PostsUpdated` will be connected to `Post.UpdatedBy`. And code first will not create the extra foreign keys.

 

## Summary

DataAnnotations not only let you describe client and server side validation in your code first classes, but they also allow you to enhance and even correct the assumptions that code first will make about your classes based on its conventions. With DataAnnotations you can not only drive database schema generation, but you can also map your code first classes to a pre-existing database.

While they are very flexible, keep in mind that DataAnnotations provide only the most commonly needed configuration changes you can make on your code first classes. To configure your classes for some of the edge cases, you should look to the alternate configuration mechanism, Code First’s Fluent API .
