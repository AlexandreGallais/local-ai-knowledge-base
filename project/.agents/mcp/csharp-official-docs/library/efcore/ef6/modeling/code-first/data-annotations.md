---
title: "Code First Data Annotations - EF6 (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/code-first/data-annotations.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Code First Data Annotations
> **Note:**
> **EF4.1 Onwards Only** - The features, APIs, etc. discussed in this page were introduced in Entity Framework 4.1. If you are using an earlier version, some or all of this information does not apply.

The content on this page is adapted from an article originally written by Julie Lerman (\<http://thedatafarm.com>).

Entity Framework Code First allows you to use your own domain classes to represent the model that EF relies on to perform querying, change tracking, and updating functions. Code First leverages a programming pattern referred to as 'convention over configuration.' Code First will assume that your classes follow the conventions of Entity Framework, and in that case, will automatically work out how to perform its job. However, if your classes do not follow those conventions, you have the ability to add configurations to your classes to provide EF with the requisite information.

Code First gives you two ways to add these configurations to your classes. One is using simple attributes called DataAnnotations, and the second is using Code First’s Fluent API, which provides you with a way to describe configurations imperatively, in code.

This article will focus on using DataAnnotations (in the System.ComponentModel.DataAnnotations namespace) to configure your classes – highlighting the most commonly needed configurations. DataAnnotations are also understood by a number of .NET applications, such as ASP.NET MVC which allows these applications to leverage the same annotations for client-side validations.

## The model

I’ll demonstrate Code First DataAnnotations with a simple pair of classes: Blog and Post.

```csharp
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string BloggerName { get; set;}
        public virtual ICollection<Post> Posts { get; set; }
    }

    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public int BlogId { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
```

As they are, the Blog and Post classes conveniently follow code first convention and require no tweaks to enable EF compatibility. However, you can also use the annotations to provide more information to EF about the classes and the database to which they map.

 

## Key

Entity Framework relies on every entity having a key value that is used for entity tracking. One convention of Code First is implicit key <example-value>; Code First will look for a property named “Id”, or a combination of class name and “Id”, such as “BlogId”. This property will map to a primary key <example-value> in the database.

The Blog and Post classes both follow this convention. What if they didn’t? What if Blog used the name *PrimaryTrackingKey* instead, or even *foo*? If code first does not find a property that matches this convention it will throw an exception because of Entity Framework’s requirement that you must have a key property. You can use the key <example-value> to specify which property is to be used as the EntityKey.

```csharp
    public class Blog
    {
        [Key]
        public int PrimaryTrackingKey { get; set; }
        public string Title { get; set; }
        public string BloggerName { get; set;}
        public virtual ICollection<Post> Posts { get; set; }
    }
```

If you are using code first’s database generation feature, the Blog table will have a primary key <example-value> named PrimaryTrackingKey, which is also defined as Identity by default.

### Composite keys

Entity Framework supports composite keys - primary keys that consist of more than one property. For example, you could have a Passport class whose primary key is a combination of PassportNumber and IssuingCountry.

```csharp
    public class Passport
    {
        [Key]
        public int PassportNumber { get; set; }
        [Key]
        public string IssuingCountry { get; set; }
        public DateTime Issued { get; set; }
        public DateTime Expires { get; set; }
    }
```

Attempting to use the above class in your EF model would result in an `InvalidOperationException`:

*Unable to determine composite primary key <example-value> for type 'Passport'. Use the ColumnAttribute or the HasKey <example-value> to specify an order for composite primary keys.*

In order to use composite keys, Entity Framework requires you to define an order for the key properties. You can do this by using the Column annotation to specify an order.

>**Note:**
> The order value is relative (rather than index based) so any values can be used. For example, 100 and 200 would be acceptable in place of 1 and 2.

```csharp
    public class Passport
    {
        [Key]
        [Column(Order=1)]
        public int PassportNumber { get; set; }
        [Key]
        [Column(Order = 2)]
        public string IssuingCountry { get; set; }
        public DateTime Issued { get; set; }
        public DateTime Expires { get; set; }
    }
```

If you have entities with composite foreign keys, then you must specify the same column ordering that you used for the corresponding primary key properties.

Only the relative ordering within the foreign key <example-value> needs to be the same, the exact values assigned to **Order** do not need to match. For example, in the following class, 3 and 4 could be used in place of 1 and 2.

```csharp
    public class PassportStamp
    {
        [Key]
        public int StampId { get; set; }
        public DateTime Stamped { get; set; }
        public string StampingCountry { get; set; }

        [ForeignKey("Passport")]
        [Column(Order = 1)]
        public int PassportNumber { get; set; }

        [ForeignKey("Passport")]
        [Column(Order = 2)]
        public string IssuingCountry { get; set; }

        public Passport Passport { get; set; }
    }
```

## Required

The `Required` annotation tells EF that a particular property is required.

Adding Required to the Title property will force EF (and MVC) to ensure that the property has data in it.

```csharp
    [Required]
    public string Title { get; set; }
```

With no additional code or markup changes in the application, an MVC application will perform client side validation, even dynamically building a message using the property and annotation names.

The Required attribute will also affect the generated database by making the mapped property non-nullable. Notice that the Title field has changed to “not null”.

>**Note:**
> In some cases it may not be possible for the column in the database to be non-nullable even though the property is required. For example, when using a TPH inheritance strategy data for multiple types is stored in a single table. If a derived type includes a required property the column cannot be made non-nullable since not all types in the hierarchy will have this property.

 

 

## MaxLength and MinLength

The `MaxLength` and `MinLength` attributes allow you to specify additional property validations, just as you did with `Required`.

Here is the BloggerName with length requirements. The example also demonstrates how to combine attributes.

```csharp
    [MaxLength(10),MinLength(5)]
    public string BloggerName { get; set; }
```

The MaxLength annotation will impact the database by setting the property’s length to 10.

MVC client-side annotation and EF 4.1 server-side annotation will both honor this validation, again dynamically building an error message: “The field BloggerName must be a string or array type with a maximum length of '10'.” That message is a little long. Many annotations let you specify an error message with the ErrorMessage attribute.

```csharp
    [MaxLength(10, ErrorMessage="BloggerName must be 10 characters or less"),MinLength(5)]
    public string BloggerName { get; set; }
```

You can also specify ErrorMessage in the Required annotation.

 

## NotMapped

Code first convention dictates that every property that is of a supported data type is represented in the database. But this isn’t always the case in your applications. For example you might have a property in the Blog class that creates a code based on the Title and BloggerName fields. That property can be created dynamically and does not need to be stored. You can mark any properties that do not map to the database with the NotMapped annotation such as this BlogCode property.

```csharp
    [NotMapped]
    public string BlogCode
    {
        get
        {
            return Title.Substring(0, 1) + ":" + BloggerName.Substring(0, 1);
        }
    }
```

 

## ComplexType

It’s not uncommon to describe your domain entities across a set of classes and then layer those classes to describe a complete entity. For example, you may add a class called BlogDetails to your model.

```csharp
    public class BlogDetails
    {
        public DateTime? DateCreated { get; set; }

        [MaxLength(250)]
        public string Description { get; set; }
    }
```

Notice that `BlogDetails` does not have any type of key property. In domain driven design, `BlogDetails` is referred to as a value object. Entity Framework refers to value objects as complex types.  Complex types cannot be tracked on their own.

However as a property in the `Blog` class, `BlogDetails` will be tracked as part of a `Blog` object. In order for code first to recognize this, you must mark the `BlogDetails` class as a `ComplexType`.

```csharp
    [ComplexType]
    public class BlogDetails
    {
        public DateTime? DateCreated { get; set; }

        [MaxLength(250)]
        public string Description { get; set; }
    }
```

Now you can add a property in the `Blog` class to represent the `BlogDetails` for that blog.

```csharp
        public BlogDetails BlogDetail { get; set; }
```

In the database, the `Blog` table will contain all of the properties of the blog including the properties contained in its `BlogDetail` property. By default, each one is preceded with the name of the complex type, "BlogDetail".

## ConcurrencyCheck

The `ConcurrencyCheck` annotation allows you to flag one or more properties to be used for concurrency checking in the database when a user edits or deletes an entity. If you've been working with the EF Designer, this aligns with setting a property's `ConcurrencyMode` to `Fixed`.

Let’s see how `ConcurrencyCheck` works by adding it to the `BloggerName` property.

```csharp
    [ConcurrencyCheck, MaxLength(10, ErrorMessage="BloggerName must be 10 characters or less"),MinLength(5)]
    public string BloggerName { get; set; }
```

When `SaveChanges` is called, because of the `ConcurrencyCheck` annotation on the `BloggerName` field, the original value of that property will be used in the update. The command will attempt to locate the correct row by filtering not only on the key value but also on the original value of `BloggerName`.  Here are the critical parts of the UPDATE command sent to the database, where you can see the command will update the row that has a `PrimaryTrackingKey` is 1 and a `BloggerName` of “Julie” which was the original value when that blog was retrieved from the database.

```sql
    where (([PrimaryTrackingKey] = @4) and ([BloggerName] = @5))
    @4=1,@5=N'Julie'
```

If someone has changed the blogger name for that blog in the meantime, this update will fail and you’ll get a **DbUpdateConcurrencyException** that you'll need to handle.

 

## TimeStamp

It's more common to use rowversion or timestamp fields for concurrency checking. But rather than using the `ConcurrencyCheck` annotation, you can use the more specific `TimeStamp` annotation as long as the type of the property is byte array. Code first will treat `Timestamp` properties the same as `ConcurrencyCheck` properties, but it will also ensure that the database field that code first generates is non-nullable. You can only have one timestamp property in a given class.

Adding the following property to the Blog class:

```csharp
    [Timestamp]
    public Byte[] TimeStamp { get; set; }
```

results in code first creating a non-nullable timestamp column in the database table.

 

## Table and Column

If you are letting Code First create the database, you may want to change the name of the tables and columns it is creating. You can also use Code First with an existing database. But it's not always the case that the names of the classes and properties in your domain match the names of the tables and columns in your database.

My class is named `Blog` and by convention, code first presumes this will map to a table named `Blogs`. If that's not the case you can specify the name of the table with the `Table` attribute. Here for example, the annotation is specifying that the table name is **InternalBlogs**.

```csharp
    [Table("InternalBlogs")]
    public class Blog
```

The `Column` annotation is a more adept in specifying the attributes of a mapped column. You can stipulate a name, data type or even the order in which a column appears in the table. Here is an example of the `Column` attribute.

```csharp
    [Column("BlogDescription", TypeName="ntext")]
    public String Description {get;set;}
```

Don’t confuse Column’s `TypeName` attribute with the DataType DataAnnotation. DataType is an annotation used for the UI and is ignored by Code First.

Here is the table after it’s been regenerated. The table name has changed to **InternalBlogs** and `Description` column from the complex type is now `BlogDescription`. Because the name was specified in the annotation, code first will not use the convention of starting the column name with the name of the complex type.
