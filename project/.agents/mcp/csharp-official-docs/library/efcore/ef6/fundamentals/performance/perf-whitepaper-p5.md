---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 5 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF4, EF5, and EF6 - EF6 (part 5 of 12)

## 3 Caching in the Entity Framework

Entity Framework has the following forms of caching built-in:

1.  Object caching – the ObjectStateManager built into an ObjectContext instance keeps track in memory of the objects that have been retrieved using that instance. This is also known as first-level cache.
2.  Query Plan Caching - reusing the generated store command when a query is executed more than once.
3.  Metadata caching - sharing the metadata for a model across different connections to the same model.

Besides the caches that EF provides out of the box, a special kind of ADO.NET data provider known as a wrapping provider can also be used to extend Entity Framework with a cache for the results retrieved from the database, also known as second-level caching.

### 3.1 Object Caching

By default when an entity is returned in the results of a query, just before EF materializes it, the ObjectContext will check if an entity with the same key has already been loaded into its ObjectStateManager. If an entity with the same keys is already present EF will include it in the results of the query. Although EF will still issue the query against the database, this behavior can bypass much of the cost of materializing the entity multiple times.

#### 3.1.1 Getting entities from the object cache using DbContext Find

Unlike a regular query, the Find method in DbSet (APIs included for the first time in EF 4.1) will perform a search in memory before even issuing the query against the database. It’s important to note that two different ObjectContext instances will have two different ObjectStateManager instances, meaning that they have separate object caches.

Find uses the primary key value to attempt to find an entity tracked by the context. If the entity is not in the context then a query will be executed and evaluated against the database, and null is returned if the entity is not found in the context or in the database. Note that Find also returns entities that have been added to the context but have not yet been saved to the database.

There is a performance consideration to be taken when using Find. Invocations to this method by default will trigger a validation of the object cache in order to detect changes that are still pending commit to the database. This process can be very expensive if there are a very large number of objects in the object cache or in a large object graph being added to the object cache, but it can also be disabled. In certain cases, you may perceive over an order of magnitude of difference in calling the Find method when you disable auto detect changes. Yet a second order of magnitude is perceived when the object actually is in the cache versus when the object has to be retrieved from the database. Here is an example graph with measurements taken using some of our microbenchmarks, expressed in milliseconds, with a load of 5000 entities:

Example of Find with auto-detect changes disabled:

```csharp
    context.Configuration.AutoDetectChangesEnabled = false;
    var product = context.Products.Find(productId);
    context.Configuration.AutoDetectChangesEnabled = true;
    ...
```

What you have to consider when using the Find method is:

1.  If the object is not in the cache the benefits of Find are negated, but the syntax is still simpler than a query by key.
2.  If auto detect changes is enabled the cost of the Find method may increase by one order of magnitude, or even more depending on the complexity of your model and the amount of entities in your object cache.

Also, keep in mind that Find only returns the entity you are looking for and it does not automatically loads its associated entities if they are not already in the object cache. If you need to retrieve associated entities, you can use a query by key with eager loading. For more information see **8.1 Lazy Loading vs. Eager Loading**.

#### 3.1.2 Performance issues when the object cache has many entities

The object cache helps to increase the overall responsiveness of Entity Framework. However, when the object cache has a very large amount of entities loaded it may affect certain operations such as Add, Remove, Find, Entry, SaveChanges and more. In particular, operations that trigger a call to DetectChanges will be negatively affected by very large object caches. DetectChanges synchronizes the object graph with the object state manager and its performance will determined directly by the size of the object graph. For more information about DetectChanges, see Tracking Changes in POCO Entities.

When using Entity Framework 6, developers are able to call AddRange and RemoveRange directly on a DbSet, instead of iterating on a collection and calling Add once per instance. The advantage of using the range methods is that the cost of DetectChanges is only paid once for the entire set of entities as opposed to once per each added entity.

### 3.2 Query Plan Caching

The first time a query is executed, it goes through the internal plan compiler to translate the conceptual query into the store command (for example, the T-SQL which is executed when run against SQL Server).  If query plan caching is enabled, the next time the query is executed the store command is retrieved directly from the query plan cache for execution, bypassing the plan compiler.

The query plan cache is shared across ObjectContext instances within the same AppDomain. You don't need to hold onto an ObjectContext instance to benefit from query plan caching.

#### 3.2.1 Some notes about Query Plan Caching

-   The query plan cache is shared for all query types: Entity SQL, LINQ to Entities, and CompiledQuery objects.
-   By default, query plan caching is enabled for Entity SQL queries, whether executed through an EntityCommand or through an ObjectQuery. It is also enabled by default for LINQ to Entities queries in Entity Framework on .NET 4.5, and in Entity Framework 6
    -   Query plan caching can be disabled by setting the EnablePlanCaching property (on EntityCommand or ObjectQuery) to false. For example:
```csharp
                    var query = from customer in context.Customer
                                where customer.CustomerId == id
                                select new
                                {
                                    customer.CustomerId,
                                    customer.Name
                                };
                    ObjectQuery oQuery = query as ObjectQuery;
                    oQuery.EnablePlanCaching = false;
```
-   For parameterized queries, changing the parameter's value will still hit the cached query. But changing a parameter's facets (for example, size, precision, or scale) will hit a different entry in the cache.
-   When using Entity SQL, the query string is part of the key. Changing the query at all will result in different cache entries, even if the queries are functionally equivalent. This includes changes to casing or whitespace.
-   When using LINQ, the query is processed to generate a part of the key. Changing the LINQ expression will therefore generate a different key.
-   Other technical limitations may apply; see Autocompiled Queries for more details.

#### 3.2.2      Cache eviction algorithm

Understanding how the internal algorithm works will help you figure out when to enable or disable query plan caching. The cleanup algorithm is as follows:

1.  Once the cache contains a set number of entries (800), we start a timer that periodically (once-per-minute) sweeps the cache.
2.  During cache sweeps, entries are removed from the cache on a LFRU (Least frequently – recently used) basis. This algorithm takes both hit count and age into account when deciding which entries are ejected.
3.  At the end of each cache sweep, the cache again contains 800 entries.

All cache entries are treated equally when determining which entries to evict. This means the store command for a CompiledQuery has the same chance of eviction as the store command for an Entity SQL query.

Note that the cache eviction timer is kicked in when there are 800 entities in the cache, but the cache is only swept 60 seconds after this timer is started. That means that for up to 60 seconds your cache may grow to be quite large.

#### 3.2.3       Test Metrics demonstrating query plan caching performance

To demonstrate the effect of query plan caching on your application's performance, we performed a test where we executed a number of Entity SQL queries against the Navision model. See the appendix for a description of the Navision model and the types of queries which were executed. In this test, we first iterate through the list of queries and execute each one once to add them to the cache (if caching is enabled). This step is untimed. Next, we sleep the main thread for over 60 seconds to allow cache sweeping to take place; finally, we iterate through the list a 2nd time to execute the cached queries. Additionally, the SQL Server plan cache is flushed before each set of queries is executed so that the times we obtain accurately reflect the benefit given by the query plan cache.

##### 3.2.3.1       Test Results

| Test                                                                   | EF5 no cache | EF5 cached | EF6 no cache | EF6 cached |
|:-----------------------------------------------------------------------|:-------------|:-----------|:-------------|:-----------|
| Enumerating all 18723 queries                                          | 124          | 125.4      | 124.3        | 125.3      |
| Avoiding sweep (just the first 800 queries, regardless of complexity)  | 41.7         | 5.5        | 40.5         | 5.4        |
| Just the AggregatingSubtotals queries (178 total - which avoids sweep) | 39.5         | 4.5        | 38.1         | 4.6        |

*All times in seconds.*

Moral - when executing lots of distinct queries (for example,  dynamically created queries), caching doesn't help and the resulting flushing of the cache can keep the queries that would benefit the most from plan caching from actually using it.

The AggregatingSubtotals queries are the most complex of the queries we tested with. As expected, the more complex the query is, the more benefit you will see from query plan caching.

Because a CompiledQuery is really a LINQ query with its plan cached, the comparison of a CompiledQuery versus the equivalent Entity SQL query should have similar results. In fact, if an app has lots of dynamic Entity SQL queries, filling the cache with queries will also effectively cause CompiledQueries to “decompile” when they are flushed from the cache. In this scenario, performance may be improved by disabling caching on the dynamic queries to prioritize the CompiledQueries. Better yet, of course, would be to rewrite the app to use parameterized queries instead of dynamic queries.
