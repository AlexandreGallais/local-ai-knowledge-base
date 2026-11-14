---
title: "SQL Queries - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/querying/sql-queries.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# SQL Queries - EF Core (part 2 of 2)

## Querying unmapped types

> **Note:**
> Returning unmapped types from `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQuery*` was introduced in EF Core 8.0.

In addition to scalar types, `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQuery*` can populate instances of a mappable CLR type from the result set of a SQL query, without including that type in the EF model. The type used for the query results can contain common mapping constructs supported by EF Core, such as parameterized constructors and mapping attributes. The type used must have a property for every value in the result set, but does not need to match any table in the database. For example, given the following type:

```csharp
public class BlogPost
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateOnly PublishedOn { get; set; }
    public int BlogId { get; set; }
}
```

The type can be queried using `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQuery*` in the same way as scalar types:

```csharp
var start = new DateOnly(2022, 1, 1);
var end = new DateOnly(2023, 1, 1);
var posts = await context.Database
    .SqlQuery<BlogPost>($"SELECT * FROM Posts AS p WHERE p.PublishedOn >= {start} AND p.PublishedOn < {end}")
    .ToListAsync();
```

The type used must have a property for every value in the result set, but it doesn't need to match any table in the database - it can, for example, represent a subset of columns, or the result of a join across multiple tables.

> **Note:**
> Unmapped types used in this way don't have keys defined and cannot have relationships to other types. Types with relationships must be mapped in the model.

### Unmapped complex types

The unmapped type returned by `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQuery*` can also contain nested complex types, allowing you to group several columns from the result set into a nested value object. For example, consider an `Address` complex type that is nested within a `Customer` result type:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Address Address { get; set; }
}

[ComplexType]
public class Address
{
    public string Line1 { get; set; }
    public string City { get; set; }
    public string PostCode { get; set; }
    public string Country { get; set; }
}
```

The nested complex type properties are populated from the result set using the same column-name conventions used when mapping complex types in the model, where each nested property maps to a column named with the complex property name and the nested property name joined by an underscore (for example, `Address_City`):

```csharp
var customers = await context.Database
    .SqlQuery<Customer>(
        $"""
         SELECT [Id], [Name], [Address_Line1], [Address_City], [Address_PostCode], [Address_Country]
         FROM [Customers]
         """)
    .ToListAsync();
```

As with complex types in the model, the nested type doesn't have a key and cannot define relationships to other types.

## Executing non-querying SQL

In some scenarios, it may be necessary to execute SQL which does not return any data, typically for modifying data in the database or calling a stored procedure which doesn't return any result sets. This can be done via `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSql*`:

```csharp
using (var context = new BloggingContext())
{
    var rowsModified = context.Database.ExecuteSql($"UPDATE [Blogs] SET [Url] = NULL");
}
```

This executes the provided SQL and returns the number of rows modified. `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSql*` protects against SQL injection by using safe parameterization, just like `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*`, and `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSqlRaw*` allows for dynamic construction of SQL queries, just like `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*` does for queries.

## Limitations

There are a few limitations to be aware of when returning entity types from SQL queries:

- The SQL query must return data for all properties of the entity type.
- The column names in the result set must match the column names that properties are mapped to. Note that this behavior is different from EF6; EF6 ignored property-to-column mapping for SQL queries, and result set column names had to match those property names.
- The SQL query can't contain related data. However, in many cases you can compose on top of the query using the `Include` operator to return related data (see Including related data).
