---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 6 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF4, EF5, and EF6 - EF6 (part 6 of 12)

### 3.3 Using CompiledQuery to improve performance with LINQ queries

Our tests indicate that using CompiledQuery can bring a benefit of 7% over autocompiled LINQ queries; this means that you’ll spend 7% less time executing code from the Entity Framework stack; it does not mean your application will be 7% faster. Generally speaking, the cost of writing and maintaining CompiledQuery objects in EF 5.0 may not be worth the trouble when compared to the benefits. Your mileage may vary, so exercise this option if your project requires the extra push. Note that CompiledQueries are only compatible with ObjectContext-derived models, and not compatible with DbContext-derived models.

For more information on creating and invoking a CompiledQuery, see Compiled Queries (LINQ to Entities).

There are two considerations you have to take when using a CompiledQuery, namely the requirement to use static instances and the problems they have with composability. Here follows an in-depth explanation of these two considerations.

#### 3.3.1       Use static CompiledQuery instances

Since compiling a LINQ query is a time-consuming process, we don’t want to do it every time we need to fetch data from the database. CompiledQuery instances allow you to compile once and run multiple times, but you have to be careful and procure to re-use the same CompiledQuery instance every time instead of compiling it over and over again. The use of static members to store the CompiledQuery instances becomes necessary; otherwise you won’t see any benefit.

For example, suppose your page has the following method body to handle displaying the products for the selected category:

```csharp
    // Warning: this is the wrong way of using CompiledQuery
    using (NorthwindEntities context = new NorthwindEntities())
    {
        string selectedCategory = this.categoriesList.SelectedValue;

        var productsForCategory = CompiledQuery.Compile<NorthwindEntities, string, IQueryable<Product>>(
            (NorthwindEntities nwnd, string category) =>
                nwnd.Products.Where(p => p.Category.CategoryName == category)
        );

        this.productsGrid.DataSource = productsForCategory.Invoke(context, selectedCategory).ToList();
        this.productsGrid.DataBind();
    }

    this.productsGrid.Visible = true;
```

In this case, you will create a new CompiledQuery instance on the fly every time the method is called. Instead of seeing performance benefits by retrieving the store command from the query plan cache, the CompiledQuery will go through the plan compiler every time a new instance is created. In fact, you will be polluting your query plan cache with a new CompiledQuery entry every time the method is called.

Instead, you want to create a static instance of the compiled query, so you are invoking the same compiled query every time the method is called. One way to so this is by adding the CompiledQuery instance as a member of your object context.  You can then make things a little cleaner by accessing the CompiledQuery through a helper method:

```csharp
    public partial class NorthwindEntities : ObjectContext
    {
        private static readonly Func<NorthwindEntities, string, IEnumerable<Product>> productsForCategoryCQ = CompiledQuery.Compile(
            (NorthwindEntities context, string categoryName) =>
                context.Products.Where(p => p.Category.CategoryName == categoryName)
            );

        public IEnumerable<Product> GetProductsForCategory(string categoryName)
        {
            return productsForCategoryCQ.Invoke(this, categoryName).ToList();
        }
```

This helper method would be invoked as follows:

```csharp
    this.productsGrid.DataSource = context.GetProductsForCategory(selectedCategory);
```

#### 3.3.2       Composing over a CompiledQuery

The ability to compose over any LINQ query is extremely useful; to do this, you simply invoke a method after the IQueryable such as *Skip()* or *Count()*. However, doing so essentially returns a new IQueryable object. While there’s nothing to stop you technically from composing over a CompiledQuery, doing so will cause the generation of a new IQueryable object that requires passing through the plan compiler again.

Some components will make use of composed IQueryable objects to enable advanced functionality. For example, ASP.NET’s GridView can be data-bound to an IQueryable object via the SelectMethod property. The GridView will then compose over this IQueryable object to allow sorting and paging over the data model. As you can see, using a CompiledQuery for the GridView would not hit the compiled query but would generate a new autocompiled query.

One place where you may run into this is when adding progressive filters to a query. For example, suppose you had a Customers page with several drop-down lists for optional filters (for example, Country and OrdersCount). You can compose these filters over the IQueryable results of a CompiledQuery, but doing so will result in the new query going through the plan compiler every time you execute it.

```csharp
    using (NorthwindEntities context = new NorthwindEntities())
    {
        IQueryable<Customer> myCustomers = context.InvokeCustomersForEmployee();

        if (this.orderCountFilterList.SelectedItem.Value != defaultFilterText)
        {
            int orderCount = int.Parse(orderCountFilterList.SelectedValue);
            myCustomers = myCustomers.Where(c => c.Orders.Count > orderCount);
        }

        if (this.countryFilterList.SelectedItem.Value != defaultFilterText)
        {
            myCustomers = myCustomers.Where(c => c.Address.Country == countryFilterList.SelectedValue);
        }

        this.customersGrid.DataSource = myCustomers;
        this.customersGrid.DataBind();
    }
```

 To avoid this re-compilation, you can rewrite the CompiledQuery to take the possible filters into account:

```csharp
    private static readonly Func<NorthwindEntities, int, int?, string, IQueryable<Customer>> customersForEmployeeWithFiltersCQ = CompiledQuery.Compile(
        (NorthwindEntities context, int empId, int? countFilter, string countryFilter) =>
            context.Customers.Where(c => c.Orders.Any(o => o.EmployeeID == empId))
            .Where(c => countFilter.HasValue == false || c.Orders.Count > countFilter)
            .Where(c => countryFilter == null || c.Address.Country == countryFilter)
        );
```

Which would be invoked in the UI like:

```csharp
    using (NorthwindEntities context = new NorthwindEntities())
    {
        int? countFilter = (this.orderCountFilterList.SelectedIndex == 0) ?
            (int?)null :
            int.Parse(this.orderCountFilterList.SelectedValue);

        string countryFilter = (this.countryFilterList.SelectedIndex == 0) ?
            null :
            this.countryFilterList.SelectedValue;

        IQueryable<Customer> myCustomers = context.InvokeCustomersForEmployeeWithFilters(
                countFilter, countryFilter);

        this.customersGrid.DataSource = myCustomers;
        this.customersGrid.DataBind();
    }
```

 A tradeoff here is the generated store command will always have the filters with the null checks, but these should be fairly simple for the database server to optimize:

```sql
...
WHERE ((0 = (CASE WHEN (@p__linq__1 IS NOT NULL) THEN cast(1 as bit) WHEN (@p__linq__1 IS NULL) THEN cast(0 as bit) END)) OR ([Project3].[C2] > @p__linq__2)) AND (@p__linq__3 IS NULL OR [Project3].[Country] = @p__linq__4)
```

### 3.4 Metadata caching

The Entity Framework also supports Metadata caching. This is essentially caching of type information and type-to-database mapping information across different connections to the same model. The Metadata cache is unique per AppDomain.

#### 3.4.1 Metadata Caching algorithm

1.  Metadata information for a model is stored in an ItemCollection for each EntityConnection.
    -   As a side note, there are different ItemCollection objects for different parts of the model. For example, StoreItemCollections contains the information about the database model; ObjectItemCollection contains information about the data model; EdmItemCollection contains information about the conceptual model.

2.  If two connections use the same connection string, they will share the same ItemCollection instance.
3.  Functionally equivalent but textually different connection strings may result in different metadata caches. We do tokenize connection strings, so simply changing the order of the tokens should result in shared metadata. But two connection strings that seem functionally the same may not be evaluated as identical after tokenization.
4.  The ItemCollection is periodically checked for use. If it is determined that a workspace has not been accessed recently, it will be marked for cleanup on the next cache sweep.
5.  Merely creating an EntityConnection will cause a metadata cache to be created (though the item collections in it will not be initialized until the connection is opened). This workspace will remain in-memory until the caching algorithm determines it is not “in use”.

The Customer Advisory Team has written a blog post that describes holding a reference to an ItemCollection in order to avoid "deprecation" when using large models: \<https://learn.microsoft.com/archive/blogs/appfabriccat/holding-a-reference-to-the-ef-metadataworkspace-for-wcf-services>.

#### 3.4.2 The relationship between Metadata Caching and Query Plan Caching

The query plan cache instance lives in the MetadataWorkspace'<example-value>'t match after tokenizing, you will have different query plan cache instances.

### 3.5 Results caching

With results caching (also known as "second-level caching"), you keep the results of queries in a local cache. When issuing a query, you first see if the results are available locally before you query against the store. While results caching isn't directly supported by Entity Framework, it's possible to add a second level cache by using a wrapping provider. An example wrapping provider with a second-level cache is Alachisoft's Entity Framework Second Level Cache based on NCache.

This implementation of second-level caching is an injected functionality that takes place after the LINQ expression has been evaluated (and funcletized) and the query execution plan is computed or retrieved from the first-level cache. The second-level cache will then store only the raw database results, so the materialization pipeline still executes afterwards.

#### 3.5.1 Additional references for results caching with the wrapping provider

-   Julie Lerman has written a "Second-Level Caching in Entity Framework and Windows Azure" MSDN article that includes how to update the sample wrapping provider to use Windows Server AppFabric caching: https://msdn.microsoft.com/magazine/hh394143.aspx
-   If you are working with Entity Framework 5, the team blog has a post that describes how to get things running with the caching provider for Entity Framework 5: \<https://learn.microsoft.com/archive/blogs/adonet/ef-caching-with-jarek-kowalskis-provider>. It also includes a T4 template to help automate adding the 2nd-level caching to your project.
