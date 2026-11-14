---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 7 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF4, EF5, and EF6 - EF6 (part 7 of 12)

## 4 Autocompiled Queries

When a query is issued against a database using Entity Framework, it must go through a series of steps before actually materializing the results; one such step is Query Compilation. Entity SQL queries were known to have good performance as they are automatically cached, so the second or third time you execute the same query it can skip the plan compiler and use the cached plan instead.

Entity Framework 5 introduced automatic caching for LINQ to Entities queries as well. In past editions of Entity Framework creating a CompiledQuery to speed your performance was a common practice, as this would make your LINQ to Entities query cacheable. Since caching is now done automatically without the use of a CompiledQuery, we call this feature “autocompiled queries”. For more information about the query plan cache and its mechanics, see Query Plan Caching.

Entity Framework detects when a query requires to be recompiled, and does so when the query is invoked even if it had been compiled before. Common conditions that cause the query to be recompiled are:

-   Changing the MergeOption associated to your query. The cached query will not be used, instead the plan compiler will run again and the newly created plan gets cached.
-   Changing the value of ContextOptions.UseCSharpNullComparisonBehavior. You get the same effect as changing the MergeOption.

Other conditions can prevent your query from using the cache. Common examples are:

-   Using IEnumerable<T>.Contains<>(T value).
-   Using functions that produce queries with constants.
-   Using the properties of a non-mapped object.
-   Linking your query to another query that requires to be recompiled.

### 4.1 Using IEnumerable<T>.Contains<T>(T value)

Entity Framework does not cache queries that invoke IEnumerable<T>.Contains<T>(T value) against an in-memory collection, since the values of the collection are considered volatile. The following example query will not be cached, so it will always be processed by the plan compiler:

```csharp
int[] ids = new int[10000];
...
using (var context = new MyContext())
{
    var query = context.MyEntities
                    .Where(entity => ids.Contains(entity.Id));

    var results = query.ToList();
    ...
}
```

Note that the size of the IEnumerable against which Contains is executed determines how fast or how slow your query is compiled. Performance can suffer significantly when using large collections such as the one shown in the example above.

Entity Framework 6 contains optimizations to the way IEnumerable<T>.Contains<T>(T value) works when queries are executed. The SQL code that is generated is much faster to produce and more readable, and in most cases it also executes faster in the server.

### 4.2 Using functions that produce queries with constants

The Skip(), Take(), Contains() and DefautIfEmpty() LINQ operators do not produce SQL queries with parameters but instead put the values passed to them as constants. Because of this, queries that might otherwise be identical end up polluting the query plan cache, both on the EF stack and on the database server, and do not get reutilized unless the same constants are used in a subsequent query execution. For example:

```csharp
var id = 10;
...
using (var context = new MyContext())
{
    var query = context.MyEntities.Select(entity => entity.Id).Contains(id);

    var results = query.ToList();
    ...
}
```

In this example, each time this query is executed with a different value for id the query will be compiled into a new plan.

In particular pay attention to the use of Skip and Take when doing paging. In EF6 these methods have a lambda overload that effectively makes the cached query plan reusable because EF can capture variables passed to these methods and translate them to SQLparameters. This also helps keep the cache cleaner since otherwise each query with a different constant for Skip and Take would get its own query plan cache entry.

Consider the following code, which is suboptimal but is only meant to exemplify this class of queries:

```csharp
var customers = context.Customers.OrderBy(c => c.LastName);
for (var i = 0; i < count; ++i)
{
    var currentCustomer = customers.Skip(i).FirstOrDefault();
    ProcessCustomer(currentCustomer);
}
```

A faster version of this same code would involve calling Skip with a lambda:

```csharp
var customers = context.Customers.OrderBy(c => c.LastName);
for (var i = 0; i < count; ++i)
{
    var currentCustomer = customers.Skip(() => i).FirstOrDefault();
    ProcessCustomer(currentCustomer);
}
```

The second snippet may run up to 11% faster because the same query plan is used every time the query is run, which saves CPU time and avoids polluting the query cache. Furthermore, because the parameter to Skip is in a closure the code might as well look like this now:

```csharp
var i = 0;
var skippyCustomers = context.Customers.OrderBy(c => c.LastName).Skip(() => i);
for (; i < count; ++i)
{
    var currentCustomer = skippyCustomers.FirstOrDefault();
    ProcessCustomer(currentCustomer);
}
```

### 4.3 Using the properties of a non-mapped object

When a query uses the properties of a non-mapped object type as a parameter then the query will not get cached. For example:

```csharp
using (var context = new MyContext())
{
    var myObject = new NonMappedType();

    var query = from entity in context.MyEntities
                where entity.Name.StartsWith(myObject.MyProperty)
                select entity;

   var results = query.ToList();
    ...
}
```

In this example, assume that class NonMappedType is not part of the Entity model. This query can easily be changed to not use a non-mapped type and instead use a local variable as the parameter to the query:

```csharp
using (var context = new MyContext())
{
    var myObject = new NonMappedType();
    var myValue = myObject.MyProperty;
    var query = from entity in context.MyEntities
                where entity.Name.StartsWith(myValue)
                select entity;

    var results = query.ToList();
    ...
}
```

In this case, the query will be able to get cached and will benefit from the query plan cache.

### 4.4 Linking to queries that require recompiling

Following the same example as above, if you have a second query that relies on a query that needs to be recompiled, your entire second query will also be recompiled. Here’s an example to illustrate this scenario:

```csharp
int[] ids = new int[10000];
...
using (var context = new MyContext())
{
    var firstQuery = from entity in context.MyEntities
                        where ids.Contains(entity.Id)
                        select entity;

    var secondQuery = from entity in context.MyEntities
                        where firstQuery.Any(otherEntity => otherEntity.Id == entity.Id)
                        select entity;

    var results = secondQuery.ToList();
    ...
}
```

The example is generic, but it illustrates how linking to firstQuery is causing secondQuery to be unable to get cached. If firstQuery had not been a query that requires recompiling, then secondQuery would have been cached.

## 5 NoTracking Queries

### 5.1 Disabling change tracking to reduce state management overhead

If you are in a read-only scenario and want to avoid the overhead of loading the objects into the ObjectStateManager, you can issue "No Tracking" queries.  Change tracking can be disabled at the query level.

Note though that by disabling change tracking you are effectively turning off the object cache. When you query for an entity, we can't skip materialization by pulling the previously-materialized query results from the ObjectStateManager. If you are repeatedly querying for the same entities on the same context, you might actually see a performance benefit from enabling change tracking.

When querying using ObjectContext, ObjectQuery and ObjectSet instances will remember a MergeOption once it is set, and queries that are composed on them will inherit the effective MergeOption of the parent query. When using DbContext, tracking can be disabled by calling the AsNoTracking() modifier on the DbSet.

#### 5.1.1 Disabling change tracking for a query when using DbContext

You can switch the mode of a query to NoTracking by chaining a call to the AsNoTracking() method in the query. Unlike ObjectQuery, the DbSet and DbQuery classes in the DbContext API don’t have a mutable property for the MergeOption.

```csharp
    var productsForCategory = from p in context.Products.AsNoTracking()
                                where p.Category.CategoryName == selectedCategory
                                select p;

```

#### 5.1.2 Disabling change tracking at the query level using ObjectContext

```csharp
    var productsForCategory = from p in context.Products
                                where p.Category.CategoryName == selectedCategory
                                select p;

    ((ObjectQuery)productsForCategory).MergeOption = MergeOption.NoTracking;
```

#### 5.1.3 Disabling change tracking for an entire entity set using ObjectContext

```csharp
    context.Products.MergeOption = MergeOption.NoTracking;

    var productsForCategory = from p in context.Products
                                where p.Category.CategoryName == selectedCategory
                                select p;
```

### 5.2 Test Metrics demonstrating the performance benefit of NoTracking queries

In this test we look at the cost of filling the ObjectStateManager by comparing Tracking to NoTracking queries for the Navision model. See the appendix for a description of the Navision model and the types of queries which were executed. In this test, we iterate through the list of queries and execute each one once. We ran two variations of the test, once with NoTracking queries and once with the default merge option of "AppendOnly". We ran each variation 3 times and take the mean value of the runs. Between the tests we clear the query cache on the SQL Server and shrink the tempdb by running the following commands:

1.  DBCC DROPCLEANBUFFERS
2.  DBCC FREEPROCCACHE
3.  DBCC SHRINKDATABASE (tempdb, 0)

Test Results, median over 3 runs:

|                        | NO TRACKING – WORKING SET | NO TRACKING – TIME | APPEND ONLY – WORKING SET | APPEND ONLY – TIME |
|:-----------------------|:--------------------------|:-------------------|:--------------------------|:-------------------|
| **Entity Framework 5** | 460361728                 | 1163536 ms         | 596545536                 | 1273042 ms         |
| **Entity Framework 6** | 647127040                 | 190228 ms          | 832798720                 | 195521 ms          |

Entity Framework 5 will have a smaller memory footprint at the end of the run than Entity Framework 6 does. The additional memory consumed by Entity Framework 6 is the result of additional memory structures and code that enable new features and better performance.

There’s also a clear difference in memory footprint when using the ObjectStateManager. Entity Framework 5 increased its footprint by 30% when keeping track of all the entities we materialized from the database. Entity Framework 6 increased its footprint by 28% when doing so.

In terms of time, Entity Framework 6 outperforms Entity Framework 5 in this test by a large margin. Entity Framework 6 completed the test in roughly 16% of the time consumed by Entity Framework 5. Additionally, Entity Framework 5 takes 9% more time to complete when the ObjectStateManager is being used. In comparison, Entity Framework 6 is using 3% more time when using the ObjectStateManager.
