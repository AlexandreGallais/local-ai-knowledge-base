---
title: "User-defined function mapping - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/querying/user-defined-function-mapping.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# User-defined function mapping

EF Core allows for using user-defined SQL functions in queries. To do that, the functions need to be mapped to a CLR method during model configuration. When translating the LINQ query to SQL, the user-defined function is called instead of the CLR function it has been mapped to.

## Mapping a method to a SQL function

To illustrate how user-defined function mapping works, let's define the following entities:

```csharp
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    public int? Rating { get; set; }

    public List<Post> Posts { get; set; }
}

public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Rating { get; set; }
    public int BlogId { get; set; }

    public Blog Blog { get; set; }
    public List<Comment> Comments { get; set; }
}

public class Comment
{
    public int CommentId { get; set; }
    public string Text { get; set; }
    public int Likes { get; set; }
    public int PostId { get; set; }

    public Post Post { get; set; }
}
```

And the following model configuration:

```csharp
modelBuilder.Entity<Blog>()
    .HasMany(b => b.Posts)
    .WithOne(p => p.Blog);

modelBuilder.Entity<Post>()
    .HasMany(p => p.Comments)
    .WithOne(c => c.Post);
```

Blog can have many posts and each post can have many comments.

Next, create the user-defined function `CommentedPostCountForBlog`, which returns the count of posts with at least one comment for a given blog, based on the blog `Id`:

```sql
CREATE FUNCTION dbo.CommentedPostCountForBlog(@id int)
RETURNS int
AS
BEGIN
    RETURN (SELECT COUNT(*)
        FROM [Posts] AS [p]
        WHERE ([p].[BlogId] = @id) AND ((
            SELECT COUNT(*)
            FROM [Comments] AS [c]
            WHERE [p].[PostId] = [c].[PostId]) > 0));
END
```

To use this function in EF Core, we define the following CLR method, which we map to the user-defined function:

```csharp
public int ActivePostCountForBlog(int blogId)
    => throw new NotSupportedException();
```

The body of the CLR method is not important. The method will not be invoked client-side, unless EF Core can't translate its arguments. If the arguments can be translated, EF Core only cares about the method signature.

> **Note:**
> In the example, the method is defined on `DbContext`, but it can also be defined as a static method inside other classes.

This function definition can now be associated with a user-defined function in the model configuration:

```csharp
modelBuilder.HasDbFunction(() => ActivePostCountForBlog(default))
    .HasName("CommentedPostCountForBlog")
    .HasSchema("dbo");
```

The lambda overload of `Microsoft.EntityFrameworkCore.RelationalModelBuilderExtensions.HasDbFunction*` avoids manually looking up the `MethodInfo`. The `default` argument values are only used to identify the method; they are never sent to the database.

By default, EF Core maps the CLR method to a database function with the same name in the default schema. Use `Microsoft.EntityFrameworkCore.Metadata.Builders.DbFunctionBuilderBase.HasName*` and `Microsoft.EntityFrameworkCore.Metadata.Builders.DbFunctionBuilderBase.HasSchema*` when the name or schema differs.

Now, executing the following query:

```csharp
var query1 = from b in context.Blogs
             where context.ActivePostCountForBlog(b.BlogId) > 1
             select b;
```

Will produce this SQL:

```sql
SELECT [b].[BlogId], [b].[Rating], [b].[Url]
FROM [Blogs] AS [b]
WHERE [dbo].[CommentedPostCountForBlog]([b].[BlogId]) > 1
```

### Mapping a method to a built-in function

EF Core considers a mapped function to be user-defined by default. Some databases distinguish built-in and user-defined functions when generating SQL. For example, SQL Server requires user-defined functions to be schema-qualified, but built-in functions aren't schema-qualified.

Use `IsBuiltIn` to map a CLR method to a built-in function:

```csharp
public static int IsDate(string value)
    => throw new NotSupportedException();
```

```csharp
modelBuilder.HasDbFunction(typeof(BloggingContext).GetMethod(nameof(IsDate), [typeof(string)]))
    .HasName("ISDATE")
    .IsBuiltIn();
```

The `Microsoft.EntityFrameworkCore.DbFunctionAttribute.IsBuiltIn` property provides the same configuration when using an attribute:

```csharp
[DbFunction(Name = "ISDATE", IsBuiltIn = true)]
```

## Mapping a function using DbFunctionAttribute

Instead of registering a function in `OnModelCreating`, a static method declared on the `DbContext` can be mapped directly by applying `Microsoft.EntityFrameworkCore.DbFunctionAttribute`. The attribute's `Name`, `Schema`, `IsBuiltIn`, and `IsNullable` properties configure the corresponding characteristics of the database function; these are the same characteristics configured by the `HasName`, `HasSchema`, `IsBuiltIn`, and `IsNullable` fluent API methods when using `HasDbFunction`. Attributed methods on the context are discovered and registered automatically; attributed methods on other classes must still be registered with `HasDbFunction`. Call `HasDbFunction` for an automatically registered method only when a builder is needed for additional fluent configuration, as in the store-type example below.

For example, the following method uses `DbFunctionAttribute` to map SQL Server's built-in `JSON_VALUE` function. Because `IsBuiltIn` is `true`, EF Core emits the function name without a schema.

```csharp
[DbFunction(Name = "JSON_VALUE", IsBuiltIn = true, IsNullable = true)]
public static string JsonValue(Dictionary<string, string> json, string path)
    => throw new NotSupportedException();
```

### Configuring store types

Use `Microsoft.EntityFrameworkCore.Metadata.Builders.DbFunctionBuilder.HasStoreType*` to configure a function's return store type and `Microsoft.EntityFrameworkCore.Metadata.Builders.DbFunctionParameterBuilder.HasStoreType*` to configure a parameter's store type. This is particularly useful when the CLR parameter type has no native database mapping.

In this example, `JsonEntity.Metadata` is a dictionary stored as `nvarchar(max)` through a value converter. The `json` function parameter has the same store type, while the result uses the `nvarchar(4000)` type returned by `JSON_VALUE`:

```csharp
modelBuilder.Entity<JsonEntity>()
    .Property(e => e.Metadata)
    .HasConversion(
        value => JsonSerializer.Serialize(value, (JsonSerializerOptions)null),
        value => JsonSerializer.Deserialize<Dictionary<string, string>>(value, (JsonSerializerOptions)null),
        new ValueComparer<Dictionary<string, string>>(
            (c1, c2) => c1.Count == c2.Count && !c1.Except(c2).Any(),
            c => c.Aggregate(0, (a, kvp) => a ^ HashCode.Combine(kvp.Key, kvp.Value)),
            c => c.ToDictionary(kvp => kvp.Key, kvp => kvp.Value)));

var jsonValueFunction = modelBuilder.HasDbFunction(() => JsonValue(default, default));
jsonValueFunction.HasStoreType("nvarchar(4000)");
jsonValueFunction.HasParameter("json").HasStoreType("nvarchar(max)");
```

The function can then be used with the converted property:

```csharp
var jsonQuery = context.JsonEntities.Select(e => BloggingContext.JsonValue(e.Metadata, "$.Filter"));
```

```sql
SELECT JSON_VALUE([j].[Metadata], N'$.Filter')
FROM [JsonEntities] AS [j]
```

The value converter is taken from the expression passed as the function argument. Therefore, this pattern works for a mapped property such as `JsonEntity.Metadata`, but configuring the parameter store type does not make arbitrary dictionary values translatable. To use an in-memory dictionary, serialize it and pass the resulting string to a separately mapped method whose CLR parameter is `string`.

## Mapping a method to a custom SQL

EF Core also allows a CLR method to be translated directly to a SQL expression rather than a database function. The SQL expression is provided using `Microsoft.EntityFrameworkCore.Metadata.Builders.DbFunctionBuilder.HasTranslation*` during function configuration.

In the example below, we'll create a function that computes percentage difference between two integers.

The CLR method is as follows:

```csharp
public double PercentageDifference(double first, int second)
    => throw new NotSupportedException();
```

The function definition is as follows:

```csharp
// 100 * ABS(first - second) / ((first + second) / 2)
modelBuilder.HasDbFunction(
        typeof(BloggingContext).GetMethod(nameof(PercentageDifference), [typeof(double), typeof(int)]))
    .HasTranslation(
        args =>
            new SqlBinaryExpression(
                ExpressionType.Multiply,
                new SqlConstantExpression(100, new IntTypeMapping("int", DbType.Int32)),
                new SqlBinaryExpression(
                    ExpressionType.Divide,
                    new SqlFunctionExpression(
                        "ABS",
                        [
                            new SqlBinaryExpression(
                                ExpressionType.Subtract,
                                args.First(),
                                args.Skip(1).First(),
                                args.First().Type,
                                args.First().TypeMapping)
                        ],
                        nullable: true,
                        argumentsPropagateNullability: [true, true],
                        type: args.First().Type,
                        typeMapping: args.First().TypeMapping),
                    new SqlBinaryExpression(
                        ExpressionType.Divide,
                        new SqlBinaryExpression(
                            ExpressionType.Add,
                            args.First(),
                            args.Skip(1).First(),
                            args.First().Type,
                            args.First().TypeMapping),
                        new SqlConstantExpression(2, new IntTypeMapping("int", DbType.Int32)),
                        args.First().Type,
                        args.First().TypeMapping),
                    args.First().Type,
                    args.First().TypeMapping),
                args.First().Type,
                args.First().TypeMapping));
```

Once we define the function, it can be used in the query. Instead of calling database function, EF Core will translate the method body directly into SQL based on the SQL expression tree constructed from the HasTranslation. The following LINQ query:

```csharp
var query2 = from p in context.Posts
             select context.PercentageDifference(p.BlogId, 3);
```

Produces the following SQL:

```sql
SELECT 100 * (ABS(CAST([p].[BlogId] AS float) - 3) / ((CAST([p].[BlogId] AS float) + 3) / 2))
FROM [Posts] AS [p]
```

> **Caution:**
> `HasTranslation` works with the SQL expression tree, not SQL text. The translation must construct valid `Microsoft.EntityFrameworkCore.Query.SqlExpressions.SqlExpression` objects with the correct type mappings, nullability, and argument nullability propagation. Incorrect metadata can produce invalid SQL or incorrect query results, and the expression types used by a translation may be specific to a database provider. Use this low-level API only after understanding the provider's SQL expression tree; prefer a regular function mapping or an existing provider translation when possible.

## Configuring nullability of user-defined function based on its arguments

If nullability propagates from a function argument—that is, the function returns `null` whenever that argument is `null`—EF Core can generate more efficient SQL. Configure this by calling `Microsoft.EntityFrameworkCore.Metadata.Builders.DbFunctionParameterBuilder.PropagatesNullability*` for the relevant parameters. For more information about how EF Core compensates for SQL's three-valued logic, see Query null semantics.

To illustrate this, define user function `ConcatStrings`:

```sql
CREATE FUNCTION [dbo].[ConcatStrings] (@prm1 nvarchar(max), @prm2 nvarchar(max))
RETURNS nvarchar(max)
AS
BEGIN
    RETURN @prm1 + @prm2;
END
```

and two CLR methods that map to it:

```csharp
public string ConcatStrings(string prm1, string prm2)
    => throw new InvalidOperationException();

public string ConcatStringsOptimized(string prm1, string prm2)
    => throw new InvalidOperationException();
```

The model configuration (inside `OnModelCreating` method) is as follows:

```csharp
modelBuilder
    .HasDbFunction(typeof(BloggingContext).GetMethod(nameof(ConcatStrings), [typeof(string), typeof(string)]))
    .HasName("ConcatStrings");

modelBuilder.HasDbFunction(
    typeof(BloggingContext).GetMethod(nameof(ConcatStringsOptimized), [typeof(string), typeof(string)]),
    b =>
    {
        b.HasName("ConcatStrings");
        b.HasParameter("prm1").PropagatesNullability();
        b.HasParameter("prm2").PropagatesNullability();
    });
```

The first function is configured in the standard way. The second function is configured to take advantage of the nullability propagation optimization, providing more information on how the function behaves around null parameters.

When issuing the following queries:

```csharp
var query3 = context.Blogs.Where(e => context.ConcatStrings(e.Url, e.Rating.ToString()) != "https://mytravelblog.com/4");
var query4 = context.Blogs.Where(
    e => context.ConcatStringsOptimized(e.Url, e.Rating.ToString()) != "https://mytravelblog.com/4");
```

We get this SQL:

```sql
SELECT [b].[BlogId], [b].[Rating], [b].[Url]
FROM [Blogs] AS [b]
WHERE ([dbo].[ConcatStrings]([b].[Url], CONVERT(VARCHAR(11), [b].[Rating])) <> N'Lorem ipsum...') OR [dbo].[ConcatStrings]([b].[Url], CONVERT(VARCHAR(11), [b].[Rating])) IS NULL

SELECT [b].[BlogId], [b].[Rating], [b].[Url]
FROM [Blogs] AS [b]
WHERE ([dbo].[ConcatStrings]([b].[Url], CONVERT(VARCHAR(11), [b].[Rating])) <> N'Lorem ipsum...') OR ([b].[Url] IS NULL OR [b].[Rating] IS NULL)
```

The second query doesn't need to re-evaluate the function itself to test its nullability.

> **Note:**
> Only configure nullability propagation when the function can return `null` solely because one or more of the configured parameters are `null`.
