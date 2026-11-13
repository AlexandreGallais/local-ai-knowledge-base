---
title: "SQL Queries - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/querying/sql-queries.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# SQL Queries

Entity Framework Core allows you to drop down to SQL queries when working with a relational database. SQL queries are useful if the query you want can't be expressed using LINQ, or if a LINQ query causes EF to generate inefficient SQL. SQL queries can return regular entity types or keyless entity types that are part of your model.

## Basic SQL queries

You can use `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` to begin a LINQ query based on a SQL query:

```csharp
var blogs = await context.Blogs
    .FromSql($"SELECT * FROM dbo.Blogs")
    .ToListAsync();
```

SQL queries can be used to execute a stored procedure which returns entity data:

```csharp
var blogs = await context.Blogs
    .FromSql($"EXECUTE dbo.GetMostPopularBlogs")
    .ToListAsync();
```

> **Note:**
>
> `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` can only be used directly on a `DbSet`. It cannot be composed over an arbitrary LINQ query.

## Passing parameters

> **Warning:**
> **Pay close attention to parameterization when using SQL queries**
>
> When introducing any user-provided values into a SQL query, care must be taken to avoid SQL injection attacks. SQL injection occurs when a program integrates a user-provided string value into a SQL query, and the user-provided value is crafted to terminate the string and perform another malicious SQL operation. To learn more about SQL injection, see this page.
>
> The `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` and `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlInterpolated*` methods are safe against SQL injection, and always integrate parameter data as a separate SQL parameter. However, the `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*` method can be vulnerable to SQL injection attacks, if improperly used. See below for more details.

The following example passes a single parameter to a stored procedure by including a parameter placeholder in the SQL query string and providing an additional argument:

```csharp
var user = "johndoe";

var blogs = await context.Blogs
    .FromSql($"EXECUTE dbo.GetMostPopularBlogsForUser {user}")
    .ToListAsync();
```

While this syntax may look like regular C# string interpolation, the supplied value is wrapped in a `DbParameter` and the generated parameter name inserted where the `{0}` placeholder was specified. This makes `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` safe from SQL injection attacks, and sends the value efficiently and correctly to the database.

When executing stored procedures, it can be useful to use named parameters in the SQL query string, especially when the stored procedure has optional parameters:

```csharp
var user = new SqlParameter("user", "johndoe");

var blogs = await context.Blogs
    .FromSql($"EXECUTE dbo.GetMostPopularBlogsForUser @filterByUser={user}")
    .ToListAsync();
```

If you need more control over the database parameter being sent, you can also construct a `DbParameter` and supply it as a parameter value. This allows you to set the precise database type of the parameter, or facets such as its size, precision or length:

```csharp
var user = new SqlParameter("user", "johndoe");

var blogs = await context.Blogs
    .FromSql($"EXECUTE dbo.GetMostPopularBlogsForUser {user}")
    .ToListAsync();
```

> **Note:**
>
> The parameters you pass must exactly match the stored procedure definition. Pay special attention to the ordering of the parameters, taking care to not miss or misplace any of them - or consider using named parameter notation. Also, make sure the parameter types correspond, and that their facets (size, precision, scale) are set as needed.

### Dynamic SQL and parameters

`Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` and its parameterization should be used wherever possible. However, there are certain scenarios where SQL needs to be dynamically pieced together, and database parameters cannot be used. For example, let's assume that a C# variable holds the name of the a property to be filtered by. It may be tempting to use a SQL query such as the following:

```c#
var propertyName = "User";
var propertyValue = "johndoe";

var blogs = await context.Blogs
    .FromSql($"SELECT * FROM [Blogs] WHERE {propertyName} = {propertyValue}")
    .ToListAsync();
```

This code doesn't work, since databases do not allow parameterizing column names (or any other part of the schema).

First, it's important to consider the implications of dynamically constructing a query - via SQL or otherwise. Accepting a column name from a user may allow them to choose a column that isn't indexed, making the query run extremely slowly and overload your database; or it may allow them to choose a column containing data you don't want exposed. Except for truly dynamic scenarios, it's usually better to have two queries for two column names, rather than using parameterization to collapse them into a single query.

If you've decided you do want to dynamically construct your SQL, you'll have to use `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*`, which allows interpolating variable data directly into the SQL string, instead of using a database parameter:

```csharp
var columnName = "Url";
var columnValue = new SqlParameter("columnValue", "http://SomeURL");

var blogs = await context.Blogs
    .FromSqlRaw($"SELECT * FROM [Blogs] WHERE {columnName} = @columnValue", columnValue)
    .ToListAsync();
```

In the above code, the column name is inserted directly into the SQL, using C# string interpolation. It is your responsibility to make sure this string value is safe, sanitizing it if it comes from an unsafe origin; this means detecting special characters such as semicolons, comments, and other SQL constructs, and either escaping them properly or rejecting such inputs.

On the other hand, the column value is sent via a `DbParameter`, and is therefore safe in the face of SQL injection.

> **Warning:**
>
> Be very careful when using `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*`, and always make sure values are either from a safe origin, or are properly sanitized. SQL injection attacks can have disastrous consequences for your application.

## Composing with LINQ

You can compose on top of the initial SQL query using LINQ operators; EF Core will treat your SQL as a subquery and compose over it in the database. The following example uses a SQL query that selects from a Table-Valued Function (TVF). And then composes on it using LINQ to do filtering and sorting.

```csharp
var searchTerm = "Lorem ipsum";

var blogs = await context.Blogs
    .FromSql($"SELECT * FROM dbo.SearchBlogs({searchTerm})")
    .Where(b => b.Rating > 3)
    .OrderByDescending(b => b.Rating)
    .ToListAsync();
```

The above query generates the following SQL:

```sql
SELECT [b].[BlogId], [b].[OwnerId], [b].[Rating], [b].[Url]
FROM (
    SELECT * FROM dbo.SearchBlogs(@p0)
) AS [b]
WHERE [b].[Rating] > 3
ORDER BY [b].[Rating] DESC
```

### Including related data

The `Include` operator can be used to load related data, just like with any other LINQ query:

```csharp
var searchTerm = "Lorem ipsum";

var blogs = await context.Blogs
    .FromSql($"SELECT * FROM dbo.SearchBlogs({searchTerm})")
    .Include(b => b.Posts)
    .ToListAsync();
```

Composing with LINQ requires your SQL query to be composable, since EF Core will treat the supplied SQL as a subquery. Composable SQL queries generally begin with the `SELECT` keyword, and cannot contain SQL features that aren't valid in a subquery, such as:

- A trailing semicolon
- On SQL Server, a trailing query-level hint (for example, `OPTION (HASH JOIN)`)
- On SQL Server, an `ORDER BY` clause that isn't used with `OFFSET 0` OR `TOP 100 PERCENT` in the `SELECT` clause

SQL Server doesn't allow composing over stored procedure calls, so any attempt to apply additional query operators to such a call will result in invalid SQL. Use `System.Linq.Enumerable.AsEnumerable*` or `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.AsAsyncEnumerable*` right after `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` or `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*` to make sure that EF Core doesn't try to compose over a stored procedure.

## Change tracking

Queries that use `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` or `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*` follow the exact same change tracking rules as any other LINQ query in EF Core. For example, if the query projects entity types, the results are tracked by default.

The following example uses a SQL query that selects from a Table-Valued Function (TVF), then disables change tracking with the call to `AsNoTracking`:

```csharp
var searchTerm = "Lorem ipsum";

var blogs = await context.Blogs
    .FromSql($"SELECT * FROM dbo.SearchBlogs({searchTerm})")
    .AsNoTracking()
    .ToListAsync();
```

## Querying scalar (non-entity) types

While `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` is useful for querying entities defined in your model, `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQuery*` allows you to easily query for scalar, non-entity types via SQL, without needing to drop down to lower-level data access APIs. For example, the following query fetches all the IDs from the `Blogs` table:

### SQL Server

```c#
var ids = await context.Database
    .SqlQuery<int>($"SELECT [BlogId] FROM [Blogs]")
    .ToListAsync();
```

### SQLite

```c#
var ids = await context.Database
    .SqlQuery<int>($"""
                    SELECT "BlogId" FROM "Blogs"
                    """)
    .ToListAsync();
```

### PostgreSQL

```c#
var ids = await context.Database
    .SqlQuery<int>($"""
                    SELECT "BlogId" FROM "Blogs"
                    """)
    .ToListAsync();
```

***

You can also compose LINQ operators over your SQL query. However, since your SQL becomes a subquery whose output column needs to be referenced by the SQL EF adds, you must name the output column `Value`. For example, the following query returns the IDs which are above the ID average:

### SQL Server

```c#
var overAverageIds = await context.Database
    .SqlQuery<int>($"SELECT [BlogId] AS [Value] FROM [Blogs]")
    .Where(id => id > context.Blogs.Average(b => b.BlogId))
    .ToListAsync();
```

### SQLite

```c#
var overAverageIds = await context.Database
    .SqlQuery<int>($"""
                    SELECT "BlogId" AS "Value" FROM "Blogs"
                    """)
    .Where(id => id > context.Blogs.Average(b => b.BlogId))
    .ToListAsync();
```

### PostgreSQL

```c#
var overAverageIds = await context.Database
    .SqlQuery<int>($"""
                    SELECT "BlogId" AS "Value" FROM "Blogs"
                    """)
    .Where(id => id > context.Blogs.Average(b => b.BlogId))
    .ToListAsync();
```

***

`Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQuery*` can be used with any scalar type supported by your database provider. If you'd like to use a type not supported by your database provider, you can use pre-convention configuration to define a value conversion for it.

`Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQuery*` isn't limited to scalar types. You can also project each row of the result set into an arbitrary CLR type that isn't part of your EF model, as long as the type has a property for every column in the result set. See Querying unmapped types below for more details.

`Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.SqlQueryRaw*` allows for dynamic construction of SQL queries, just like `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*` does for entity types.
