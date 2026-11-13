---
title: "Advanced Performance Topics - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/performance/advanced-performance-topics.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Advanced Performance Topics - EF Core (part 2 of 3)

## Query caching and parameterization

When EF receives a LINQ query tree for execution, it must first "compile" that tree, e.g. produce SQL from it. Because this task is a heavy process, EF caches queries by the query tree shape, so that queries with the same structure reuse internally-cached compilation outputs. This caching ensures that executing the same LINQ query multiple times is very fast, even if parameter values differ.

Consider the following two queries:

```csharp
var post1 = await context.Posts.FirstOrDefaultAsync(p => p.Title == "post1");
var post2 = await context.Posts.FirstOrDefaultAsync(p => p.Title == "post2");
```

Since the expression trees contains different constants, the expression tree differs and each of these queries will be compiled separately by EF Core. In addition, each query produces a slightly different SQL command:

```sql
SELECT TOP(1) [b].[Id], [b].[Name]
FROM [Posts] AS [b]
WHERE [b].[Name] = N'post1'

SELECT TOP(1) [b].[Id], [b].[Name]
FROM [Posts] AS [b]
WHERE [b].[Name] = N'post2'
```

Because the SQL differs, your database server will likely also need to produce a query plan for both queries, rather than reusing the same plan.

A small modification to your queries can change things considerably:

```csharp
var postTitle = "post1";
var post1 = await context.Posts.FirstOrDefaultAsync(p => p.Title == postTitle);
postTitle = "post2";
var post2 = await context.Posts.FirstOrDefaultAsync(p => p.Title == postTitle);
```

Since the blog name is now *parameterized*, both queries have the same tree shape, and EF only needs to be compiled once. The SQL produced is also parameterized, allowing the database to reuse the same query plan:

```sql
SELECT TOP(1) [b].[Id], [b].[Name]
FROM [Posts] AS [b]
WHERE [b].[Name] = @__postTitle_0
```

Note that there is no need to parameterize each and every query: it's perfectly fine to have some queries with constants, and indeed, databases (and EF) can sometimes perform certain optimization around constants which aren't possible when the query is parameterized. See the section on dynamically-constructed queries for an example where proper parameterization is crucial.

> **Note:**
> EF Core's metrics report the Query Cache Hit Rate. In a normal application, this metric reaches 100% soon after program startup, once most queries have executed at least once. If this metric remains stable below 100%, that is an indication that your application may be doing something which defeats the query cache - it's a good idea to investigate that.
>
> **Tip:**
> EF Core uses `IMemoryCache` for internal caching of compiled queries and models. You can configure the cache size limit if needed - see Memory Cache Integration for more information.

> **Note:**
> How the database manages caches query plans is database-dependent. For example, SQL Server implicitly maintains an LRU query plan cache, whereas PostgreSQL does not (but prepared statements can produce a very similar end effect). Consult your database documentation for more details.

## Dynamically-constructed queries

In some situations, it is necessary to dynamically construct LINQ queries rather than specifying them outright in source code. This can happen, for example, in a website which receives arbitrary query details from a client, with open-ended query operators (sorting, filtering, paging...). In principle, if done correctly, dynamically-constructed queries can be just as efficient as regular ones (although it's not possible to use the compiled query optimization with dynamic queries). In practice, however, they are frequently the source of performance issues, since it's easy to accidentally produce expression trees with shapes that differ every time.

The following example uses three techniques to construct a query's `Where` lambda expression:

1. **Expression API with constant**: Dynamically build the expression with the Expression API, using a constant node. This is a frequent mistake when dynamically building expression trees, and causes EF to recompile the query each time it's invoked with a different constant value (it also usually causes plan cache pollution at the database server).
2. **Expression API with parameter**: A better version, which substitutes the constant with a parameter. This ensures that the query is only compiled once regardless of the value provided, and the same (parameterized) SQL is generated.
3. **Simple with parameter**: A version which doesn't use the Expression API, for comparison, which creates the same tree as the method above but is much simpler. In many cases, it's possible to dynamically build your expression tree without resorting to the Expression API, which is easy to get wrong.

We add a `Where` operator to the query only if the given parameter is not null. Note that this isn't a good use case for dynamically constructing a query - but we're using it for simplicity:

### Expression API with constant

```csharp
[Benchmark]
public async Task<int> ExpressionApiWithConstant()
{
    var url = "blog" + Interlocked.Increment(ref _blogNumber);
    using var context = new BloggingContext();

    IQueryable<Blog> query = context.Blogs;

    if (_addWhereClause)
    {
        var blogParam = Expression.Parameter(typeof(Blog), "b");
        var whereLambda = Expression.Lambda<Func<Blog, bool>>(
            Expression.Equal(
                Expression.MakeMemberAccess(
                    blogParam,
                    typeof(Blog).GetMember(nameof(Blog.Url)).Single()),
                Expression.Constant(url)),
            blogParam);

        query = query.Where(whereLambda);
    }

    return await query.CountAsync();
}
```

### Expression API with parameter

```csharp
[Benchmark]
public async Task<int> ExpressionApiWithParameter()
{
    var url = "blog" + Interlocked.Increment(ref _blogNumber);
    using var context = new BloggingContext();

    IQueryable<Blog> query = context.Blogs;

    if (_addWhereClause)
    {
        var blogParam = Expression.Parameter(typeof(Blog), "b");

        // This creates a lambda expression whose body is identical to the url captured closure variable in the non-dynamic query:
        // blogs.Where(b => b.Url == url)
        // This dynamically creates an expression node which EF can properly recognize and parameterize in the database query.
        // We then extract that body and use it in our dynamically-constructed query.
        Expression<Func<string>> urlParameterLambda = () => url;
        var urlParamExpression = urlParameterLambda.Body;

        var whereLambda = Expression.Lambda<Func<Blog, bool>>(
            Expression.Equal(
                Expression.MakeMemberAccess(
                    blogParam,
                    typeof(Blog).GetMember(nameof(Blog.Url)).Single()),
                urlParamExpression),
            blogParam);

        query = query.Where(whereLambda);
    }

    return await query.CountAsync();
}
```

### Simple with parameter

```csharp
[Benchmark]
public async Task<int> SimpleWithParameter()
{
    var url = "blog" + Interlocked.Increment(ref _blogNumber);

    using var context = new BloggingContext();

    IQueryable<Blog> query = context.Blogs;

    if (_addWhereClause)
    {
        Expression<Func<Blog, bool>> whereLambda = b => b.Url == url;

        query = query.Where(whereLambda);
    }

    return await query.CountAsync();
}
```

***

Benchmarking these two techniques gives the following results:

|                     Method |       Mean |    Error |   StdDev |    Gen0 |   Gen1 | Allocated |
|--------------------------- |-----------:|---------:|---------:|--------:|-------:|----------:|
|  ExpressionApiWithConstant | 1,665.8 us | 56.99 us | 163.5 us | 15.6250 |      - | 109.92 KB |
| ExpressionApiWithParameter |   757.1 us | 35.14 us | 103.6 us | 12.6953 | 0.9766 |  54.95 KB |
|        SimpleWithParameter |   760.3 us | 37.99 us | 112.0 us | 12.6953 |      - |  55.03 KB |

Even if the sub-millisecond difference seems small, keep in mind that the constant version continuously pollutes the cache and causes other queries to be re-compiled, slowing them down as well and having a general negative impact on your overall performance. It's highly recommended to avoid constant query recompilation.

> **Note:**
> Avoid constructing queries with the expression tree API unless you really need to. Aside from the API's complexity, it's very easy to inadvertently cause significant performance issues when using them.

## Compiled models

Compiled models can improve EF Core startup time for applications with large models. A large model typically means hundreds to thousands of entity types and relationships. Startup time here is the time to perform the first operation on a `DbContext` when that `DbContext` type is used for the first time in the application. Note that just creating a `DbContext` instance does not cause the EF model to be initialized. Instead, typical first operations that cause the model to be initialized include calling `DbContext.Add` or executing the first query.

Compiled models are created using the `dotnet ef` command-line tool. Ensure that you have installed the latest version of the tool before continuing.

A new `dbcontext optimize` command is used to generate the compiled model. For example:

```dotnetcli
dotnet ef dbcontext optimize
```

The `--output-dir` and `--namespace` options can be used to specify the directory and namespace into which the compiled model will be generated. For example:

```dotnetcli
PS C:\dotnet\efdocs\samples\core\Miscellaneous\CompiledModels> dotnet ef dbcontext optimize --output-dir MyCompiledModels --namespace MyCompiledModels
Build started...
Build succeeded.
Successfully generated a compiled model, to use it call 'options.UseModel(MyCompiledModels.BlogsContextModel.Instance)'. Run this command again when the model is modified.
PS C:\dotnet\efdocs\samples\core\Miscellaneous\CompiledModels>
```

* For more information see `dotnet ef dbcontext optimize`.
* If you're more comfortable working inside Visual Studio, you can also use Optimize-DbContext

The output from running this command includes a piece of code to copy-and-paste into your `DbContext` configuration to cause EF Core to use the compiled model. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseModel(MyCompiledModels.BlogsContextModel.Instance)
        .UseSqlite(@"Data Source=test.db");
```

### Compiled model bootstrapping

It is typically not necessary to look at the generated bootstrapping code. However, sometimes it can be useful to customize the model or its loading. The bootstrapping code looks something like this:

```csharp
[DbContext(typeof(BlogsContext))]
partial class BlogsContextModel : RuntimeModel
{
    private BlogsContextModel()
        : base(skipDetectChanges: false, modelId: Guid.NewGuid(), entityTypeCount: 0)
    {
    }

    private static BlogsContextModel _instance;
    public static IModel Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new BlogsContextModel();
                _instance.Initialize();
                _instance.Customize();
            }

            return _instance;
        }
    }

    partial void Initialize();

    partial void Customize();
}
```

This is a partial class with partial methods that can be implemented to customize the model as needed.

In addition, multiple compiled models can be generated for `DbContext` types that may use different models depending on some runtime configuration. These should be placed into different folders and namespaces, as shown above. Runtime information, such as the connection string, can then be examined and the correct model returned as needed. For example:

```csharp
public static class RuntimeModelCache
{
    private static readonly ConcurrentDictionary<string, IModel> _runtimeModels
        = new();

    public static IModel GetOrCreateModel(string connectionString)
        => _runtimeModels.GetOrAdd(
            connectionString, cs =>
            {
                if (cs.Contains("X"))
                {
                    return BlogsContextModel1.Instance;
                }

                if (cs.Contains("Y"))
                {
                    return BlogsContextModel2.Instance;
                }

                throw new InvalidOperationException("No appropriate compiled model found.");
            });
}
```

### Limitations

Compiled models have some limitations:

* Global query filters are not supported.
* Lazy loading and change-tracking proxies are not supported.
* Value converters that reference private methods are not supported. Make referenced methods public or internal instead.
* The model must be manually synchronized by regenerating it any time the model definition or configuration change.
* Custom IModelCacheKeyFactory implementations are not supported. However, you can compile multiple models and load the appropriate one as needed.

Because of these limitations, you should only use compiled models if your EF Core startup time is too slow. Compiling small models is typically not worth it.

If supporting any of these features is critical to your success, then please vote for the appropriate issues linked above.

### Handling compilation errors due to ambiguous type references

When compiling models with types that have the same name but exist in different namespaces, the generated code may produce compilation errors due to ambiguous type references. To resolve this, you can customize the code generation to use fully-qualified type names by overriding `CSharpHelper.ShouldUseFullName` to return `true`. See Design-time services for information on how to override design-time services like `ICSharpHelper`.
