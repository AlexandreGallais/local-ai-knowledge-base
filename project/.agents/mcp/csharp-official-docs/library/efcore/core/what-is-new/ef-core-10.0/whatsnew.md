---
title: "What's New in EF Core 10 (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-10.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 10

EF Core 10.0 (EF10) was released in November 2025 and is a Long Term Support (LTS) release. EF10 will be supported until November 10, 2028.

> **Tip:**
> You can run and debug into the samples by downloading the sample code from GitHub. Each section below links to the source code specific to that section.

EF10 requires the .NET 10 SDK to build and requires the .NET 10 runtime to run. EF10 will not run on earlier .NET versions, and will not run on .NET Framework.

The below release notes list the major improvements in the release; the full list of issues for the release can be found here.

## Azure SQL and SQL Server

### Vector search support

EF 10 brings full support for the recently-introduced vector data type and its supporting `VECTOR_DISTANCE()` function, available on Azure SQL Database and on SQL Server 2025. The vector data type allows storing *embeddings*, which are representation of meaning that can be efficiently searched over for similarity, powering AI workloads such as semantic search and retrieval-augmented generation (RAG).

To use the `vector` data type, simply add a .NET property of type `SqlVector<float>` to your entity type:

```c#
public class Blog
{
    // ...

    [Column(TypeName = "vector(1536)")]
    public SqlVector<float> Embedding { get; set; }
}
```

Then, insert embedding data by populating the Embedding property and calling `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*` as usual:

```c#
IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator = /* Set up your preferred embedding generator */;

var embedding = await embeddingGenerator.GenerateVectorAsync("Some text to be vectorized");
context.Blogs.Add(new Blog
{
    Name = "Some blog",
    Embedding = new SqlVector<float>(embedding)
});
await context.SaveChangesAsync();
```

Finally, use the `Microsoft.EntityFrameworkCore.SqlServerDbFunctionsExtensions.VectorDistance*` function in your LINQ queries to perform similarity search for a given user query:

```c#
var sqlVector = /* some user query which we should search for similarity */;
var topSimilarBlogs = context.Blogs
    .OrderBy(b => EF.Functions.VectorDistance("cosine", b.Embedding, sqlVector))
    .Take(3)
    .ToListAsync();
```

For more information on vector search, see the documentation.

### JSON type support

EF 10 also fully supports the new json data type, also available on Azure SQL Database and on SQL Server 2025. While SQL Server has included JSON functionality for several versions, the data itself was stored in plain textual columns in the database; the new data type provides significant efficiency improvements and a safer way to store and interact with JSON.

With EF 10, if you've configured EF with `Microsoft.EntityFrameworkCore.SqlServerDbContextOptionsExtensions.UseAzureSql*` or with a compatibility level of 170 or higher (SQL Server 2025), EF automatically defaults to using the new JSON data type. For example, the following entity type has a primitive collection (Tags, an array of strings) and Details (mapped as a complex type):

```c#
public class Blog
{
    public int Id { get; set; }

    public string[] Tags { get; set; }
    public required BlogDetails Details { get; set; }
}

public class BlogDetails
{
    public string? Description { get; set; }
    public int Viewers { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().ComplexProperty(b => b.Details, b => b.ToJson());
}
```

EF 10 creates the following table for the above:

```sql
CREATE TABLE [Blogs] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Tags] json NOT NULL,
    [Details] json NOT NULL,
    CONSTRAINT [PK_Blogs] PRIMARY KEY ([Id])
);
```

LINQ querying is fully supported as well. For example, the following filters for blogs with more than 3 viewers:

```c#
var highlyViewedBlogs = await context.Blogs.Where(b => b.Details.Viewers > 3).ToListAsync();
```

This produces the following SQL, making use of the new `JSON_VALUE()` `RETURNING` clause:

```sql
SELECT [b].[Id], [b].[Name], [b].[Tags], [b].[Details]
FROM [Blogs] AS [b]
WHERE JSON_VALUE([b].[Details], '$.Viewers' RETURNING int) > 3
```

Note that if your EF application already uses JSON via `nvarchar` columns, these columns will be automatically changed to `json` with the first migration. You can opt out of this by manually setting the column type to `nvarchar(max)`, or configuring a compatibility level lower than 170.

### Custom default constraint names

EF 10 now allows you to specify a name for default constraints using `Microsoft.EntityFrameworkCore.RelationalPropertyBuilderExtensions.HasDefaultValueSql*`, rather than letting the database generate them:

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .Property(p => b.CreatedDate)
        .HasDefaultValueSql("GETDATE()", "DF_Post_CreatedDate");
}
```

You can also enable automatic naming by EF of all default constraints using `Microsoft.EntityFrameworkCore.SqlServerModelBuilderExtensions.UseNamedDefaultConstraints*`:

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.UseNamedDefaultConstraints();
}
```

> **Note:**
> If you have existing migrations, the next migration you add will rename every single default constraint in your model.

## Azure Cosmos DB for NoSQL

### Full-text search support

Azure Cosmos DB now offers support for full-text search. It enables efficient and effective text searches, as well as evaluating the relevance of documents to a given search query. It can be used in combination with vector search to improve the accuracy of responses in some AI scenarios.
EF Core 10 is adding support for this feature allowing for modeling the database with full-text search enabled properties and using full-text search functions inside queries targeting Azure Cosmos DB.

Here is a basic EF model configuration enabling full-text search on one of the properties:

```c#
public class Blog
{
    ...

    public string Contents { get; set; }
}

public class BloggingContext
{
    ...

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>(b =>
        {
            b.Property(x => x.Contents).EnableFullTextSearch();
            b.HasIndex(x => x.Contents).IsFullTextIndex();
        });
    }
}
```

Once the model is configured, we can use full-text search operations in queries using methods provided in `Microsoft.EntityFrameworkCore.EF.Functions*`:

```c#
var cosmosBlogs = await context.Blogs.Where(x => EF.Functions.FullTextContains(x.Contents, "cosmos")).ToListAsync();
```

The following full-text operations are currently supported: `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.FullTextContains*`, `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.FullTextContainsAll*`, `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.FullTextContainsAny*`, `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.FullTextScore*`. See the Azure Cosmos DB documentation for details: `FullTextContains`, `FullTextContainsAll`, `FullTextContainsAny`, `FullTextScore`.

For more information on Cosmos full-text search, see the documentation.

### Hybrid search

EF Core now supports `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.Rrf*` (Reciprocal Rank Fusion) function, which combines vector similarity search and full-text search (i.e. hybrid search). Here is an example query using hybrid search:

```c#
float[] myVector = /* generate vector data from text, image, etc. */
var hybrid = await context.Blogs.OrderBy(x => EF.Functions.Rrf(
        EF.Functions.FullTextScore(x.Contents, "database"), 
        EF.Functions.VectorDistance(x.Vector, myVector)))
    .Take(10)
    .ToListAsync();
```

For more information on Cosmos hybrid search, see the documentation.

### Vector similarity search exits preview

In EF9 we added experimental support for vector similarity search. In EF Core 10, vector similarity search support is no longer experimental. We have also made some improvements to the feature:

- EF Core can now generate containers with vector properties defined on owned reference entities. Containers with vector properties defined on owned collections still have to be created by other means. However, they can be used in queries.
- Model building APIs have been renamed. A vector property can now be configured using the `IsVectorProperty` method, and vector index can be configured using the `IsVectorIndex` method.

For more information on Cosmos vector search, see the documentation.

### Improved experience when evolving the model

In previous versions of EF Core, evolving the model when using Azure Cosmos DB was quite painful. Specifically, when adding a new required property to the entity, EF would no longer be able to materialize that entity. The reason was that EF expected a value for the new property (since it was required), but the document created before the change didn't contain those values. The workaround was to mark the property as optional first, manually add default values for the property, and only then change it to required.

In EF 10 we improved this experience - EF will now materialize a default value for a required property, if no data is present for it in the document, rather than throw.

## Other Cosmos improvements

- Use ExecutionStrategy for query execution (for retrying) (#35692).

## Complex types

Complex types are used to model types which are contained within your entity types and have no identity of their own; while entity types are (usually) mapped to a database table, complex types can be mapped to columns in their container table ("table splitting"), or to a single JSON column. Complex types introduce document modeling techniques, which can bring substantial performance benefits as traditional JOINs are avoided, and can make your database modeling much simpler and more natural.

> **Tip:**
> For comprehensive documentation on complex types, see Complex types.

### Table splitting

For example, the following maps a customer's addresses as complex types:

```c#
modelBuilder.Entity<Customer>(b =>
{
    b.ComplexProperty(c => c.ShippingAddress);
    b.ComplexProperty(c => c.BillingAddress);
});
```

On relational database, this causes the addresses to be mapped to additional columns in the main `Customers` table:

```sql
CREATE TABLE [Customers] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [BillingAddress_City] nvarchar(max) NOT NULL,
    [BillingAddress_PostalCode] nvarchar(max) NOT NULL,
    [BillingAddress_Street] nvarchar(max) NOT NULL,
    [BillingAddress_StreetNumber] int NOT NULL,
    [ShippingAddress_City] nvarchar(max) NOT NULL,
    [ShippingAddress_PostalCode] nvarchar(max) NOT NULL,
    [ShippingAddress_Street] nvarchar(max) NOT NULL,
    [ShippingAddress_StreetNumber] int NOT NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([Id])
);
```

Note the difference with the default, traditional relational behavior of mapping the addresses to a separate table and using a foreign key to represent the customer/address relationship.

While the above was already possible since EF 8, EF 10 adds support for **optional** types:

```c#
public class Customer
{
    ...

    public Address ShippingAddress { get; set; }
    public Address? BillingAddress { get; set; }
}
```

Note that optional complex types currently require at least one required property to be defined on the complex type.

### JSON

EF 10 now allows mapping complex types to JSON:

```c#
modelBuilder.Entity<Customer>(b =>
{
    b.ComplexProperty(c => c.ShippingAddress, c => c.ToJson());
    b.ComplexProperty(c => c.BillingAddress, c => c.ToJson());
});
```

This causes EF to map each Address to a single JSON column in the customer table. When using the new SQL Server 2025 JSON column (see above), this causes the following table to be created:

```sql
CREATE TABLE [Customers] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [ShippingAddress] json NOT NULL,
    [BillingAddress] json NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([Id])
);
```

Unlike table splitting, JSON mapping allows collections within the mapped type. You can query and update properties inside your JSON documents just like any other non-JSON property, and perform efficient bulk updating on them via `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*` (see release note).

### Struct support

Complex types also supports mapping .NET structs instead of classes:

```c#
public struct Address
{
    public required string Street { get; set; }
    public required string City { get; set; }
    public required string ZipCode { get; set; }
}
```

This aligns well with complex types not having an identity of their own, and only being found within entity types which have an identity. However, collections of structs aren't currently supported.

### Complex and owned entity types

Both table splitting and JSON mapping have been supported before EF 10 via owned entity modeling. However, this modeling created quite a few issues stemming from the fact that owned entity types are entity types, and therefore still operate with reference semantics and an identity behind the scenes.

For example, trying to assign a customer's billing address to be the same as their shipping address fails with owned entity types, since the same entity type can't be referenced more than once:

```c#
var customer = await context.Customers.SingleAsync(c => c.Id == someId);
customer.BillingAddress = customer.ShippingAddress;
await context.SaveChangesAsync(); // ERROR
```

In contrast, since complex types have value semantics, assigning them simply copies their properties over, as expected. For the same reasons, bulk assignment of owned entity types is not supported, whereas complex types fully support `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*` in EF 10 (see release note).

Similarly, comparing a customer's shipping and billing addresses in LINQ queries does not work as expected, since entity types are compared by their identities; complex types, on the other hand, are compared by their contents, producing the expected result.

These issues - as well as various others - make complex types the better choice for modeling JSON and table splitting, and users already using owned entity types for these are advised to switch to complex types.
