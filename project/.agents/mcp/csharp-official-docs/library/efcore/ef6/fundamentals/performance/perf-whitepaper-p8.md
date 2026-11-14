---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 8 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF4, EF5, and EF6 - EF6 (part 8 of 12)

## 6 Query Execution Options

Entity Framework offers several different ways to query. We'll take a look at the following options, compare the pros and cons of each, and examine their performance characteristics:

-   LINQ to Entities.
-   No Tracking LINQ to Entities.
-   Entity SQL over an ObjectQuery.
-   Entity SQL over an EntityCommand.
-   ExecuteStoreQuery.
-   SqlQuery.
-   CompiledQuery.

### 6.1       LINQ to Entities queries

```csharp
var q = context.Products.Where(p => p.Category.CategoryName == "Beverages");
```

**Pros**

-   Suitable for CUD operations.
-   Fully materialized objects.
-   Simplest to write with syntax built into the programming language.
-   Good performance.

**Cons**

-   Certain technical restrictions, such as:
    -   Patterns using DefaultIfEmpty for OUTER JOIN queries result in more complex queries than simple OUTER JOIN statements in Entity SQL.
    -   You still can’t use LIKE with general pattern matching.

### 6.2       No Tracking LINQ to Entities queries

When the context derives ObjectContext:

```csharp
context.Products.MergeOption = MergeOption.NoTracking;
var q = context.Products.Where(p => p.Category.CategoryName == "Beverages");
```

When the context derives DbContext:

```csharp
var q = context.Products.AsNoTracking()
                        .Where(p => p.Category.CategoryName == "Beverages");
```

**Pros**

-   Improved performance over regular LINQ queries.
-   Fully materialized objects.
-   Simplest to write with syntax built into the programming language.

**Cons**

-   Not suitable for CUD operations.
-   Certain technical restrictions, such as:
    -   Patterns using DefaultIfEmpty for OUTER JOIN queries result in more complex queries than simple OUTER JOIN statements in Entity SQL.
    -   You still can’t use LIKE with general pattern matching.

Note that queries that project scalar properties are not tracked even if the NoTracking is not specified. For example:

```csharp
var q = context.Products.Where(p => p.Category.CategoryName == "Beverages").Select(p => new { p.ProductName });
```

This particular query doesn’t explicitly specify being NoTracking, but since it’s not materializing a type that’s known to the object state manager then the materialized result is not tracked.

### 6.3       Entity SQL over an ObjectQuery

```csharp
ObjectQuery<Product> products = context.Products.Where("it.Category.CategoryName = 'Beverages'");
```

**Pros**

-   Suitable for CUD operations.
-   Fully materialized objects.
-   Supports query plan caching.

**Cons**

-   Involves textual query strings which are more prone to user error than query constructs built into the language.

### 6.4       Entity SQL over an Entity Command

```csharp
EntityCommand cmd = eConn.CreateCommand();
cmd.CommandText = "Select p From NorthwindEntities.Products As p Where p.Category.CategoryName = 'Beverages'";

using (EntityDataReader reader = cmd.ExecuteReader(CommandBehavior.SequentialAccess))
{
    while (reader.Read())
    {
        // manually 'materialize' the product
    }
}
```

**Pros**

-   Supports query plan caching in .NET 4.0 (plan caching is supported by all other query types in .NET 4.5).

**Cons**

-   Involves textual query strings which are more prone to user error than query constructs built into the language.
-   Not suitable for CUD operations.
-   Results are not automatically materialized, and must be read from the data reader.

### 6.5       SqlQuery and ExecuteStoreQuery

SqlQuery on Database:

```csharp
// use this to obtain entities and not track them
var q1 = context.Database.SqlQuery<Product>("select * from products");
```

SqlQuery on DbSet:

```csharp
// use this to obtain entities and have them tracked
var q2 = context.Products.SqlQuery("select * from products");
```

ExecuteStoreQuery:

```csharp
var beverages = context.ExecuteStoreQuery<Product>(
@"     SELECT        P.ProductID, P.ProductName, P.SupplierID, P.CategoryID, P.QuantityPerUnit, P.UnitPrice, P.UnitsInStock, P.UnitsOnOrder, P.ReorderLevel, P.Discontinued, P.DiscontinuedDate
       FROM            Products AS P INNER JOIN Categories AS C ON P.CategoryID = C.CategoryID
       WHERE        (C.CategoryName = 'Beverages')"
);
```

**Pros**

-   Generally fastest performance since plan compiler is bypassed.
-   Fully materialized objects.
-   Suitable for CUD operations when used from the DbSet.

**Cons**

-   Query is textual and error prone.
-   Query is tied to a specific backend by using store semantics instead of conceptual semantics.
-   When inheritance is present, handcrafted query needs to account for mapping conditions for the type requested.

### 6.6       CompiledQuery

```csharp
private static readonly Func<NorthwindEntities, string, IQueryable<Product>> productsForCategoryCQ = CompiledQuery.Compile(
    (NorthwindEntities context, string categoryName) =>
        context.Products.Where(p => p.Category.CategoryName == categoryName)
        );
…
var q = context.InvokeProductsForCategoryCQ("Beverages");
```

**Pros**

-   Provides up to a 7% performance improvement over regular LINQ queries.
-   Fully materialized objects.
-   Suitable for CUD operations.

**Cons**

-   Increased complexity and programming overhead.
-   The performance improvement is lost when composing on top of a compiled query.
-   Some LINQ queries can't be written as a CompiledQuery - for example, projections of anonymous types.

### 6.7       Performance Comparison of different query options

Simple microbenchmarks where the context creation was not timed were put to the test. We measured querying 5000 times for a set of non-cached entities in a controlled environment. These numbers are to be taken with a warning: they do not reflect actual numbers produced by an application, but instead they are a very accurate measurement of how much of a performance difference there is when different querying options are compared apples-to-apples, excluding the cost of creating a new context.

| EF  | Test                                 | Time (ms) | Memory   |
|:----|:-------------------------------------|:----------|:---------|
| EF5 | ObjectContext ESQL                   | 2414      | 38801408 |
| EF5 | ObjectContext Linq Query             | 2692      | 38277120 |
| EF5 | DbContext Linq Query No Tracking     | 2818      | 41840640 |
| EF5 | DbContext Linq Query                 | 2930      | 41771008 |
| EF5 | ObjectContext Linq Query No Tracking | 3013      | 38412288 |
|     |                                      |           |          |
| EF6 | ObjectContext ESQL                   | 2059      | 46039040 |
| EF6 | ObjectContext Linq Query             | 3074      | 45248512 |
| EF6 | DbContext Linq Query No Tracking     | 3125      | 47575040 |
| EF6 | DbContext Linq Query                 | 3420      | 47652864 |
| EF6 | ObjectContext Linq Query No Tracking | 3593      | 45260800 |

Microbenchmarks are very sensitive to small changes in the code. In this case, the difference between the costs of Entity Framework 5 and Entity Framework 6 are due to the addition of interception and transactional improvements. These microbenchmarks numbers, however, are an amplified vision into a very small fragment of what Entity Framework does. Real-world scenarios of warm queries should not see a performance regression when upgrading from Entity Framework 5 to Entity Framework 6.

To compare the real-world performance of the different query options, we created 5 separate test variations where we use a different query option to select all products whose category name is "Beverages". Each iteration includes the cost of creating the context, and the cost of materializing all returned entities. 10 iterations are run untimed before taking the sum of 1000 timed iterations. The results shown are the median run taken from 5 runs of each test. For more information, see Appendix B which includes the code for the test.

| EF  | Test                                        | Time (ms) | Memory   |
|:----|:--------------------------------------------|:----------|:---------|
| EF5 | ObjectContext Entity Command                | 621       | 39350272 |
| EF5 | DbContext Sql Query on Database             | 825       | 37519360 |
| EF5 | ObjectContext Store Query                   | 878       | 39460864 |
| EF5 | ObjectContext Linq Query No Tracking        | 969       | 38293504 |
| EF5 | ObjectContext Entity Sql using Object Query | 1089      | 38981632 |
| EF5 | ObjectContext Compiled Query                | 1099      | 38682624 |
| EF5 | ObjectContext Linq Query                    | 1152      | 38178816 |
| EF5 | DbContext Linq Query No Tracking            | 1208      | 41803776 |
| EF5 | DbContext Sql Query on DbSet                | 1414      | 37982208 |
| EF5 | DbContext Linq Query                        | 1574      | 41738240 |
|     |                                             |           |          |
| EF6 | ObjectContext Entity Command                | 480       | 47247360 |
| EF6 | ObjectContext Store Query                   | 493       | 46739456 |
| EF6 | DbContext Sql Query on Database             | 614       | 41607168 |
| EF6 | ObjectContext Linq Query No Tracking        | 684       | 46333952 |
| EF6 | ObjectContext Entity Sql using Object Query | 767       | 48865280 |
| EF6 | ObjectContext Compiled Query                | 788       | 48467968 |
| EF6 | DbContext Linq Query No Tracking            | 878       | 47554560 |
| EF6 | ObjectContext Linq Query                    | 953       | 47632384 |
| EF6 | DbContext Sql Query on DbSet                | 1023      | 41992192 |
| EF6 | DbContext Linq Query                        | 1290      | 47529984 |

> **Note:**
> For completeness, we included a variation where we execute an Entity SQL query on an EntityCommand. However, because results are not materialized for such queries, the comparison isn't necessarily apples-to-apples. The test includes a close approximation to materializing to try making the comparison fairer.

In this end-to-end case, Entity Framework 6 outperforms Entity Framework 5 due to performance improvements made on several parts of the stack, including a much lighter DbContext initialization and faster MetadataCollection<T> lookups.
