---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 10 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF4, EF5, and EF6 - EF6 (part 10 of 12)

## 8 Loading Related Entities

### 8.1 Lazy Loading vs. Eager Loading

Entity Framework offers several different ways to load the entities that are related to your target entity. For example, when you query for Products, there are different ways that the related Orders will be loaded into the Object State Manager. From a performance standpoint, the biggest question to consider when loading related entities will be whether to use Lazy Loading or Eager Loading.

When using Eager Loading, the related entities are loaded along with your target entity set. You use an Include statement in your query to indicate which related entities you want to bring in.

When using Lazy Loading, your initial query only brings in the target entity set. But whenever you access a navigation property, another query is issued against the store to load the related entity.

Once an entity has been loaded, any further queries for the entity will load it directly from the Object State Manager, whether you are using lazy loading or eager loading.

### 8.2 How to choose between Lazy Loading and Eager Loading

The important thing is that you understand the difference between Lazy Loading and Eager Loading so that you can make the correct choice for your application. This will help you evaluate the tradeoff between multiple requests against the database versus a single request that may contain a large payload. It may be appropriate to use eager loading in some parts of your application and lazy loading in other parts.

As an example of what's happening under the hood, suppose you want to query for the customers who live in the UK and their order count.

**Using Eager Loading**

```csharp
using (NorthwindEntities context = new NorthwindEntities())
{
    var ukCustomers = context.Customers.Include(c => c.Orders).Where(c => c.Address.Country == "UK");
    var chosenCustomer = AskUserToPickCustomer(ukCustomers);
    Console.WriteLine("Customer Id: {0} has {1} orders", customer.CustomerID, customer.Orders.Count);
}
```

**Using Lazy Loading**

```csharp
using (NorthwindEntities context = new NorthwindEntities())
{
    context.ContextOptions.LazyLoadingEnabled = true;

    //Notice that the Include method call is missing in the query
    var ukCustomers = context.Customers.Where(c => c.Address.Country == "UK");

    var chosenCustomer = AskUserToPickCustomer(ukCustomers);
    Console.WriteLine("Customer Id: {0} has {1} orders", customer.CustomerID, customer.Orders.Count);
}
```

When using eager loading, you'll issue a single query that returns all customers and all orders. The store command looks like:

```sql
SELECT
[Project1].[C1] AS [C1],
[Project1].[CustomerID] AS [CustomerID],
[Project1].[CompanyName] AS [CompanyName],
[Project1].[ContactName] AS [ContactName],
[Project1].[ContactTitle] AS [ContactTitle],
[Project1].[Address] AS [Address],
[Project1].[City] AS [City],
[Project1].[Region] AS [Region],
[Project1].[PostalCode] AS [PostalCode],
[Project1].[Country] AS [Country],
[Project1].[Phone] AS [Phone],
[Project1].[Fax] AS [Fax],
[Project1].[C2] AS [C2],
[Project1].[OrderID] AS [OrderID],
[Project1].[CustomerID1] AS [CustomerID1],
[Project1].[EmployeeID] AS [EmployeeID],
[Project1].[OrderDate] AS [OrderDate],
[Project1].[RequiredDate] AS [RequiredDate],
[Project1].[ShippedDate] AS [ShippedDate],
[Project1].[ShipVia] AS [ShipVia],
[Project1].[Freight] AS [Freight],
[Project1].[ShipName] AS [ShipName],
[Project1].[ShipAddress] AS [ShipAddress],
[Project1].[ShipCity] AS [ShipCity],
[Project1].[ShipRegion] AS [ShipRegion],
[Project1].[ShipPostalCode] AS [ShipPostalCode],
[Project1].[ShipCountry] AS [ShipCountry]
FROM ( SELECT
      [Extent1].[CustomerID] AS [CustomerID],
       [Extent1].[CompanyName] AS [CompanyName],
       [Extent1].[ContactName] AS [ContactName],
       [Extent1].[ContactTitle] AS [ContactTitle],
       [Extent1].[Address] AS [Address],
       [Extent1].[City] AS [City],
       [Extent1].[Region] AS [Region],
       [Extent1].[PostalCode] AS [PostalCode],
       [Extent1].[Country] AS [Country],
       [Extent1].[Phone] AS [Phone],
       [Extent1].[Fax] AS [Fax],
      1 AS [C1],
       [Extent2].[OrderID] AS [OrderID],
       [Extent2].[CustomerID] AS [CustomerID1],
       [Extent2].[EmployeeID] AS [EmployeeID],
       [Extent2].[OrderDate] AS [OrderDate],
       [Extent2].[RequiredDate] AS [RequiredDate],
       [Extent2].[ShippedDate] AS [ShippedDate],
       [Extent2].[ShipVia] AS [ShipVia],
       [Extent2].[Freight] AS [Freight],
       [Extent2].[ShipName] AS [ShipName],
       [Extent2].[ShipAddress] AS [ShipAddress],
       [Extent2].[ShipCity] AS [ShipCity],
       [Extent2].[ShipRegion] AS [ShipRegion],
       [Extent2].[ShipPostalCode] AS [ShipPostalCode],
       [Extent2].[ShipCountry] AS [ShipCountry],
      CASE WHEN ([Extent2].[OrderID] IS NULL) THEN CAST(NULL AS int) ELSE 1 END AS [C2]
      FROM  [dbo].[Customers] AS [Extent1]
      LEFT OUTER JOIN [dbo].[Orders] AS [Extent2] ON [Extent1].[CustomerID] = [Extent2].[CustomerID]
      WHERE N'UK' = [Extent1].[Country]
)  AS [Project1]
ORDER BY [Project1].[CustomerID] ASC, [Project1].[C2] ASC
```

When using lazy loading, you'll issue the following query initially:

```sql
SELECT
[Extent1].[CustomerID] AS [CustomerID],
[Extent1].[CompanyName] AS [CompanyName],
[Extent1].[ContactName] AS [ContactName],
[Extent1].[ContactTitle] AS [ContactTitle],
[Extent1].[Address] AS [Address],
[Extent1].[City] AS [City],
[Extent1].[Region] AS [Region],
[Extent1].[PostalCode] AS [PostalCode],
[Extent1].[Country] AS [Country],
[Extent1].[Phone] AS [Phone],
[Extent1].[Fax] AS [Fax]
FROM [dbo].[Customers] AS [Extent1]
WHERE N'UK' = [Extent1].[Country]
```

And each time you access the Orders navigation property of a customer another query like the following is issued against the store:

```sql
exec sp_executesql N'SELECT
[Extent1].[OrderID] AS [OrderID],
[Extent1].[CustomerID] AS [CustomerID],
[Extent1].[EmployeeID] AS [EmployeeID],
[Extent1].[OrderDate] AS [OrderDate],
[Extent1].[RequiredDate] AS [RequiredDate],
[Extent1].[ShippedDate] AS [ShippedDate],
[Extent1].[ShipVia] AS [ShipVia],
[Extent1].[Freight] AS [Freight],
[Extent1].[ShipName] AS [ShipName],
[Extent1].[ShipAddress] AS [ShipAddress],
[Extent1].[ShipCity] AS [ShipCity],
[Extent1].[ShipRegion] AS [ShipRegion],
[Extent1].[ShipPostalCode] AS [ShipPostalCode],
[Extent1].[ShipCountry] AS [ShipCountry]
FROM [dbo].[Orders] AS [Extent1]
WHERE [Extent1].[CustomerID] = @EntityKeyValue1',N'@EntityKeyValue1 nchar(5)',@EntityKeyValue1=N'AROUT'
```

For more information, see the Loading Related Objects.

#### 8.2.1 Lazy Loading versus Eager Loading cheat sheet

There’s no such thing as a one-size-fits-all to choosing eager loading versus lazy loading. Try first to understand the differences between both strategies so you can do a well informed decision; also, consider if your code fits to any of the following scenarios:

| Scenario                                                                    | Our Suggestion                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|:----------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Do you need to access many navigation properties from the fetched entities? | **No** - Both options will probably do. However, if the payload your query is bringing is not too big, you may experience performance benefits by using Eager loading as it’ll require less network round trips to materialize your objects.   **Yes** - 	If you need to access many navigation properties from the entities, you’d do that by using multiple include statements in your query with Eager loading. The more entities you include, the bigger the payload your query will return. Once you include three or more entities into your query, consider switching to Lazy loading. |
| Do you know exactly what data will be needed at run time?                   | **No** - Lazy loading will be better for you. Otherwise, you may end up querying for data that you will not need.   **Yes** - Eager loading is probably your best bet; it will help loading entire sets faster. If your query requires fetching a very large amount of data, and this becomes too slow, then try Lazy loading instead.                                                                                                                                                                                                                                                       |
| Is your code executing far from your database? (increased network latency)  | **No** - When the network latency is not an issue, using Lazy loading may simplify your code. Remember that the topology of your application may change, so don’t take database proximity for granted.   **Yes** - When the network is a problem, only you can decide what fits better for your scenario. Typically Eager loading will be better because it requires fewer round trips.                                                                                                                                                                                                      |

#### 8.2.2       Performance concerns with multiple Includes

When we hear performance questions that involve server response time problems, the source of the issue is frequently queries with multiple Include statements. While including related entities in a query is powerful, it's important to understand what's happening under the covers.

It takes a relatively long time for a query with multiple Include statements in it to go through our internal plan compiler to produce the store command. The majority of this time is spent trying to optimize the resulting query. The generated store command will contain an Outer Join or Union for each Include, depending on your mapping. Queries like this will bring in large connected graphs from your database in a single payload, which will acerbate any bandwidth issues, especially when there is a lot of redundancy in the payload (for example, when multiple levels of Include are used to traverse associations in the one-to-many direction).

You can check for cases where your queries are returning excessively large payloads by accessing the underlying TSQL for the query by using ToTraceString and executing the store command in SQL Server Management Studio to see the payload size. In such cases you can try to reduce the number of Include statements in your query to just bring in the data you need. Or you may be able to break your query into a smaller sequence of subqueries, for example:

**Before breaking the query:**

```csharp
using (NorthwindEntities context = new NorthwindEntities())
{
    var customers = from c in context.Customers.Include(c => c.Orders)
                    where c.LastName.StartsWith(lastNameParameter)
                    select c;

    foreach (Customer customer in customers)
    {
        ...
    }
}
```

**After breaking the query:**

```csharp
using (NorthwindEntities context = new NorthwindEntities())
{
    var orders = from o in context.Orders
                 where o.Customer.LastName.StartsWith(lastNameParameter)
                 select o;

    orders.Load();

    var customers = from c in context.Customers
                    where c.LastName.StartsWith(lastNameParameter)
                    select c;

    foreach (Customer customer in customers)
    {
        ...
    }
}
```

This will work only on tracked queries, as we are making use of the ability the context has to perform identity resolution and association fixup automatically.

As with lazy loading, the tradeoff will be more queries for smaller payloads. You can also use projections of individual properties to explicitly select only the data you need from each entity, but you will not be loading entities in this case, and updates will not be supported.

#### 8.2.3 Workaround to get lazy loading of properties

Entity Framework currently doesn’t support lazy loading of scalar or complex properties. However, in cases where you have a table that includes a large object such as a BLOB, you can use table splitting to separate the large properties into a separate entity. For example, suppose you have a Product table that includes a varbinary photo column. If you don't frequently need to access this property in your queries, you can use table splitting to bring in only the parts of the entity that you normally need. The entity representing the product photo will only be loaded when you explicitly need it.

A good resource that shows how to enable table splitting is Gil Fink's "Table Splitting in Entity Framework" blog post: \<http://blogs.microsoft.co.il/blogs/gilf/archive/2009/10/13/table-splitting-in-entity-framework.aspx>.
