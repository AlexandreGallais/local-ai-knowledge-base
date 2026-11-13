---
title: "What's New in EF Core 9 (part 2 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-9.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 9 (part 2 of 7)

## Azure Cosmos DB for NoSQL

EF 9.0 brings substantial improvements to the EF Core provider for Azure Cosmos DB; significant parts of the provider have been rewritten to provide new functionality, allow new forms of queries, and better align the provider with Azure Cosmos DB best practices. The main high-level improvements are listed below; for a full list, see this epic issue.

> **Warning:**
> As part of the improvements going into the provider, a number of high-impact breaking changes had to be made; if you are upgrading an existing application, please read the breaking changes section carefully.

### Improvements querying with partition keys and document IDs

Each document stored in an Azure Cosmos DB database has a unique resource ID. In addition, each document can contain a "partition key" which determines the logical partitioning of data such that the database can be effectively scaled. More information on choosing partition keys can be found in _Partitioning and horizontal scaling in Azure Cosmos DB_.

In EF 9.0, the Azure Cosmos DB provider is significantly better at identifying partition key <example-value> in your LINQ queries, and extracting them out to ensure your queries are only sent to the relevant partition; this can greatly improve the performance of your queries and reduce RU charges. For example:

```csharp
var sessions = await context.Sessions
    .Where(b => b.PartitionKey == "someValue" && b.Username.StartsWith("x"))
    .ToListAsync();
```

In this query, the provider automatically recognizes the comparison on `PartitionKey`; if we examine the logs, we'll see the following:

```console
Executed ReadNext (189.8434 ms, 2.8 RU) ActivityId='8cd669ed-2ca5-4f2b-8923-338899071361', Container='test', Partition='["someValue"]', Parameters=[]
SELECT VALUE c
FROM root c
WHERE STARTSWITH(c["Username"], "x")
```

Note that the `WHERE` clause does not contain `PartitionKey`: that comparison has been "lifted" out and is used to execute the query only against the relevant partition. In previous versions, the comparison was left in the `WHERE` clause in many situations, causing the query to be executed against all partitions and resulting in increased costs and reduced performance.

In addition, if your query also provides a value for the document's ID property, and doesn't include any other query operations, the provider can apply an additional optimization:

```csharp
var somePartitionKey = "someValue";
var someId = 8;
var sessions = await context.Sessions
    .Where(b => b.PartitionKey == somePartitionKey && b.Id == someId)
    .SingleAsync();
```

The logs show the following for this query:

```console
Executed ReadItem (73 ms, 1 RU) ActivityId='13f0f8b8-d481-47f0-bf41-67f7deb008b2', Container='test', Id='8', Partition='["someValue"]'
```

Here, no SQL query is sent at all. Instead, the provider performs an extremely efficient _point read_ (`ReadItem` API), which directly fetches the document given the partition key and ID. This is the most efficient and cost-effective kind of read you can perform in Azure Cosmos DB; see the Azure Cosmos DB documentation for more information about point reads.

To learn more about querying with partition keys and point reads, see the querying documentation page.

### Hierarchical partition keys

> **Tip:**
> The code shown here comes from HierarchicalPartitionKeysSample.cs.

Azure Cosmos DB originally supported a single partition key, but has since expanded partitioning capabilities to also support subpartitioning through the specification of up to three levels of hierarchy in the partition key. EF Core 9 brings full support for hierarchical partition keys, allowing you take advantage of the better performance and cost savings associated with this feature.

Partition keys are specified using the model building API, typically in `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*`. There must be a mapped property in the entity type for each level of the partition key. For example, consider a `UserSession` entity type:

```csharp
public class UserSession
{
    // Item ID
    public Guid Id { get; set; }

    // Partition Key
    public string TenantId { get; set; } = null!;
    public Guid UserId { get; set; }
    public int SessionId { get; set; }

    // Other members
    public string Username { get; set; } = null!;
}
```

The following code specifies a three-level partition key using the `TenantId`, `UserId`, and `SessionId` properties:

```csharp
modelBuilder
    .Entity<UserSession>()
    .HasPartitionKey(e => new { e.TenantId, e.UserId, e.SessionId });
```

> **Tip:**
> This partition key <example-value> follows the example given in _Choose your hierarchical partition keys_ from the Azure Cosmos DB documentation.

Notice how, starting with EF Core 9, properties of any mapped type can be used in the partition key. For `bool` and numeric types, like the `int SessionId` property, the value is used directly in the partition key. Other types, like the `Guid UserId` property, are automatically converted to strings.

When querying, EF automatically extracts the partition key <example-value> from queries and applies them to the Azure Cosmos DB query API to ensure the queries are constrained appropriately to the fewest number of partitions possible. For example, consider the following LINQ query that supplies all three partition key <example-value> in the hierarchy:

```csharp
var tenantId = "Microsoft";
var sessionId = 7;
var userId = new Guid("99A410D7-E467-4CC5-92DE-148F3FC53F4C");

var sessions = await context.Sessions
    .Where(
        e => e.TenantId == tenantId
             && e.UserId == userId
             && e.SessionId == sessionId
             && e.Username.Contains("a"))
    .ToListAsync();
```

When executing this query, EF Core will extract the values of the `tenantId`, `userId`, and `sessionId` parameters, and pass them to the Azure Cosmos DB query API as the partition key value. For example, see the logs from executing the query above:

```output
info: 6/10/2024 19:06:00.017 CosmosEventId.ExecutingSqlQuery[30100] (Microsoft.EntityFrameworkCore.Database.Command) 
      Executing SQL query for container 'UserSessionContext' in partition '["Microsoft","00aa00aa-bb11-cc22-dd33-44ee44ee44ee",7.0]' [Parameters=[]]
      SELECT c
      FROM root c
      WHERE ((c["Discriminator"] = "UserSession") AND CONTAINS(c["Username"], "a"))
```

Notice that the partition key <example-value> have been removed from the `WHERE` clause, and are instead used as the partition key for efficient execution: `["Microsoft","00aa00aa-bb11-cc22-dd33-44ee44ee44ee",7.0]`.

For more information, see the documentation on querying with partition keys.

### Significantly improved LINQ querying capabilities

In EF 9.0, the LINQ translation capabilities of the Azure Cosmos DB provider have been greatly expanded, and the provider can now execute significantly more query types. The full list of query improvements is too long to list, but here are the main highlights:

* Full support for EF's primitive collections, allowing you to perform LINQ querying on collections of e.g. ints or strings. See What's new in EF8: primitive collections for more information.
* Support for arbitrary querying over non-primitive collections.
* Lots of additional LINQ operators are now supported: indexing into collections, `Length`/`Count`, `ElementAt`, `Contains`, and many others.
* Support for aggregate operators such as `Count` and `Sum`.
* Additional function translations (see the function mappings documentation for the full list of supported translations):
  * Translations for `DateTime` and `DateTimeOffset` component members (`DateTime.Year`, `DateTimeOffset.Month`...).
  * `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.IsDefined*` and `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.CoalesceUndefined*` now allow dealing with `undefined` values.
  * `string.Contains`, `StartsWith` and `EndsWith` now support `StringComparison.OrdinalIgnoreCase`.

For the full list of querying improvements, see this issue:

### Improved modeling aligned to Azure Cosmos DB and JSON standards

EF 9.0 maps to Azure Cosmos DB documents in more natural ways for a JSON-based document database, and helps interoperate with other systems accessing your documents. Although this entails breaking changes, APIs exist which allow reverting back to the pre-9.0 behavior in all cases.

#### Simplified `id` properties without discriminators

First, previous versions of EF inserted the discriminator value into the JSON `id` property, producing documents such as the following:

```json
{
    "id": "Blog|1099",
    ...
}
```

This was done in order to allow for documents of different types (e.g. Blog and Post) and the same key value (1099) to exist within the same container partition. Starting with EF 9.0, the `id` property contains only the key value:

```json
{
    "id": 1099,
    ...
}
```

This is a more natural way to map to JSON, and makes it easier for external tools and systems to interact with EF-generated JSON documents; such external systems aren't generally aware of the EF discriminator values, which are by default derived from .NET types.

Note this is a breaking change, since EF will no longer be able to query existing documents with the old `id` format. An API has been introduced to revert to the previous behavior, see the breaking change note and the the documentation for more details.

#### Discriminator property renamed to `$type`

The default discriminator property was previously named `Discriminator`. EF 9.0 changes the default to `$type`:

```json
{
    "id": 1099,
    "$type": "Blog",
    ...
}
```

This follows the emerging standard for JSON polymorphism, allowing better interoperability with other tools. For example, .NET's System.Text.Json also supports polymorphism, using `$type` as its default discriminator property name (docs).

Note this is a breaking change, since EF will no longer be able to query existing documents with the old discriminator property name. See the breaking change note for details on how to revert to the previous naming.

### Vector similarity search (preview)

Azure Cosmos DB now offers preview support for vector similarity search. Vector search is a fundamental part of some application types, including AI, semantic search and others. Azure Cosmos DB allows you to store vectors directly in your documents alongside the rest of your data, meaning you can perform all of your queries against a single database. This can considerably simplify your architecture and remove the need for an additional, dedicated vector database solution in your stack. To learn more about Azure Cosmos DB vector search, see the documentation.

Once your Azure Cosmos DB container is properly set up, using vector search via EF is a simple matter of adding a vector property and configuring it:

```c#
public class Blog
{
    ...

    public float[] Vector { get; set; }
}

public class BloggingContext
{
    ...

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>()
            .Property(b => b.Embeddings)
            .IsVector(DistanceFunction.Cosine, dimensions: 1536);
    }
}
```

Once that's done, use the `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.VectorDistance*` function in LINQ queries to perform vector similarity search:

```c#
var blogs = await context.Blogs
    .OrderBy(s => EF.Functions.VectorDistance(s.Vector, vector))
    .Take(5)
    .ToListAsync();
```

For more information, see the documentation on vector search.

### Pagination support

The Azure Cosmos DB provider now allows for paginating through query results via _continuation tokens_, which is far more efficient and cost-effective than the traditional use of `Skip` and `Take`:

```c#
var firstPage = await context.Posts
    .OrderBy(p => p.Id)
    .ToPageAsync(pageSize: 10, continuationToken: null);

var continuationToken = firstPage.ContinuationToken;
foreach (var post in page.Values)
{
    // Display/send the posts to the user
}
```

The new `Microsoft.EntityFrameworkCore.CosmosQueryableExtensions.ToPageAsync*` operator returns a `Microsoft.EntityFrameworkCore.CosmosPage`1`, which exposes a continuation token that can be used to efficiently resume the query at a later point, fetching the next 10 items:

```c#
var nextPage = await context.Sessions.OrderBy(s => s.Id).ToPageAsync(10, continuationToken);
```

For more information, see the documentation section on pagination.

### FromSql for safer SQL querying

The Azure Cosmos DB provider has allowed SQL querying via `Microsoft.EntityFrameworkCore.CosmosQueryableExtensions.FromSqlRaw*`. However, that API can be susceptible to SQL injection attacks when user-provided data is interpolated or concatenated into the SQL. In EF 9.0, you can now use the new `Microsoft.EntityFrameworkCore.CosmosQueryableExtensions.FromSql*` method, which always integrates parameterized data as a parameter outside the SQL:

```c#
var maxAngle = 8;
_ = await context.Blogs
    .FromSql($"SELECT VALUE c FROM root c WHERE c.Angle1 <= {maxAngle}")
    .ToListAsync();
```

For more information, see the documentation section on pagination.

### Role-based access

Azure Cosmos DB for NoSQL includes a built-in role-based access control (RBAC) system. This is now supported by EF9 for all data plane operations. However, Azure Cosmos DB SDK does not support RBAC for management plane operations in Azure Cosmos DB. Use Azure Management API instead of `Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade.EnsureCreatedAsync*` with RBAC.

### Synchronous I/O is now blocked by default

Azure Cosmos DB for NoSQL does not support synchronous (blocking) APIs from application code. Previously, EF masked this by blocking for you on async calls. However, this both encourages synchronous I/O use, which is bad practice, and may cause deadlocks. Therefore, starting with EF 9, an exception is thrown when synchronous access is attempted. For example:

Synchronous I/O can still be used for now by configuring the warning level appropriately. For example, in `OnConfiguring` on your `DbContext` type:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.ConfigureWarnings(b => b.Ignore(CosmosEventId.SyncNotSupported));
```

Note, however, that we plan to fully remove sync support in EF 11, so start updating to use async methods like `ToListAsync` and `SaveChangesAsync` as soon as possible!
