---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 11 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF4, EF5, and EF6 - EF6 (part 11 of 12)

## 9 Other considerations

### 9.1      Server Garbage Collection

Some users might experience resource contention that limits the parallelism they are expecting when the Garbage Collector is not properly configured. Whenever EF is used in a multithreaded scenario, or in any application that resembles a server-side system, make sure to enable Server Garbage Collection. This is done via a simple setting in your application config file:

```xml
<?xmlversion="1.0" encoding="utf-8" ?>
<configuration>
        <runtime>
               <gcServer enabled="true" />
        </runtime>
</configuration>
```

This should decrease your thread contention and increase your throughput by up to 30% in CPU saturated scenarios. In general terms, you should always test how your application behaves using the classic Garbage Collection (which is better tuned for UI and client side scenarios) as well as the Server Garbage Collection.

### 9.2      AutoDetectChanges

As mentioned earlier, Entity Framework might show performance issues when the object cache has many entities. Certain operations, such as Add, Remove, Find, Entry and SaveChanges, trigger calls to DetectChanges which might consume a large amount of CPU based on how large the object cache has become. The reason for this is that the object cache and the object state manager try to stay as synchronized as possible on each operation performed to a context so that the produced data is guaranteed to be correct under a wide array of scenarios.

It is generally a good practice to leave Entity Framework’s automatic change detection enabled for the entire life of your application. If your scenario is being negatively affected by high CPU usage and your profiles indicate that the culprit is the call to DetectChanges, consider temporarily turning off AutoDetectChanges in the sensitive portion of your code:

```csharp
try
{
    context.Configuration.AutoDetectChangesEnabled = false;
    var product = context.Products.Find(productId);
    ...
}
finally
{
    context.Configuration.AutoDetectChangesEnabled = true;
}
```

Before turning off AutoDetectChanges, it’s good to understand that this might cause Entity Framework to lose its ability to track certain information about the changes that are taking place on the entities. If handled incorrectly, this might cause data inconsistency on your application. For more information on turning off AutoDetectChanges, read \<http://blog.oneunicorn.com/2012/03/12/secrets-of-detectchanges-part-3-switching-off-automatic-detectchanges/>.

### 9.3      Context per request

Entity Framework’s contexts are meant to be used as short-lived instances in order to provide the most optimal performance experience. Contexts are expected to be short lived and discarded, and as such have been implemented to be very lightweight and reutilize metadata whenever possible. In web scenarios it’s important to keep this in mind and not have a context for more than the duration of a single request. Similarly, in non-web scenarios, context should be discarded based on your understanding of the different levels of caching in the Entity Framework. Generally speaking, one should avoid having a context instance throughout the life of the application, as well as contexts per thread and static contexts.

### 9.4      Database null semantics

Entity Framework by default will generate SQL code that has C\# null comparison semantics. Consider the following example query:

```csharp
            int? categoryId = 7;
            int? supplierId = 8;
            decimal? unitPrice = 0;
            short? unitsInStock = 100;
            short? unitsOnOrder = 20;
            short? reorderLevel = null;

            var q = from p incontext.Products
                    where p.Category.CategoryName == "Beverages"
                          || (p.CategoryID == categoryId
                                || p.SupplierID == supplierId
                                || p.UnitPrice == unitPrice
                                || p.UnitsInStock == unitsInStock
                                || p.UnitsOnOrder == unitsOnOrder
                                || p.ReorderLevel == reorderLevel)
                    select p;

            var r = q.ToList();
```

In this example, we’re comparing a number of nullable variables against nullable properties on the entity, such as SupplierID and UnitPrice. The generated SQL for this query will ask if the parameter value is the same as the column value, or if both the parameter and the column values are null. This will hide the way the database server handles nulls and will provide a consistent C\# null experience across different database vendors. On the other hand, the generated code is a bit convoluted and may not perform well when the amount of comparisons in the where statement of the query grows to a large number.

One way to deal with this situation is by using database null semantics. Note that this might potentially behave differently to the C\# null semantics since now Entity Framework will generate simpler SQL that exposes the way the database engine handles null values. Database null semantics can be activated per-context with one single configuration line against the context configuration:

```csharp
                context.Configuration.UseDatabaseNullSemantics = true;
```

Small to medium sized queries will not display a perceptible performance improvement when using database null semantics, but the difference will become more noticeable on queries with a large number of potential null comparisons.

In the example query above, the performance difference was less than 2% in a microbenchmark running in a controlled environment.

### 9.5      Async

Entity Framework 6 introduced support of async operations when running on .NET 4.5 or later. For the most part, applications that have IO related contention will benefit the most from using asynchronous query and save operations. If your application does not suffer from IO contention, the use of async will, in the best cases, run synchronously and return the result in the same amount of time as a synchronous call, or in the worst case, simply defer execution to an asynchronous task and add extra time to the completion of your scenario.

For information on how asynchronous programming work that will help you deciding if async will improve the performance of your application, see Asynchronous Programming with Async and Await. For more information on the use of async operations on Entity Framework, see Async Query and Save.

### 9.6      NGEN

Entity Framework 6 does not come in the default installation of .NET framework. As such, the Entity Framework assemblies are not NGEN’d by default which means that all the Entity Framework code is subject to the same JIT’ing costs as any other MSIL assembly. This might degrade the F5 experience while developing and also the cold startup of your application in the production environments. In order to reduce the CPU and memory costs of JIT’ing it is advisable to NGEN the Entity Framework images as appropriate. For more information on how to improve the startup performance of Entity Framework 6 with NGEN, see Improving Startup Performance with NGen.

### 9.7      Code First versus EDMX

Entity Framework reasons about the impedance mismatch problem between object oriented programming and relational databases by having an in-memory representation of the conceptual model (the objects), the storage schema (the database) and a mapping between the two. This metadata is called an Entity Data Model, or EDM for short. From this EDM, Entity Framework will derive the views to roundtrip data from the objects in memory to the database and back.

When Entity Framework is used with an EDMX file that formally specifies the conceptual model, the storage schema, and the mapping, then the model loading stage only has to validate that the EDM is correct (for example, make sure that no mappings are missing), then generate the views, then validate the views and have this metadata ready for use. Only then can a query be executed or new data be saved to the data store.

The Code First approach is, at its heart, a sophisticated Entity Data Model generator. The Entity Framework has to produce an EDM from the provided code; it does so by analyzing the classes involved in the model, applying conventions and configuring the model via the Fluent API. After the EDM is built, the Entity Framework essentially behaves the same way as it would had an EDMX file been present in the project. Thus, building the model from Code First adds extra complexity that translates into a slower startup time for the Entity Framework when compared to having an EDMX. The cost is completely dependent on the size and complexity of the model that’s being built.

When choosing to use EDMX versus Code First, it’s important to know that the flexibility introduced by Code First increases the cost of building the model for the first time. If your application can withstand the cost of this first-time load then typically Code First will be the preferred way to go.

## 10 Investigating Performance

### 10.1 Using the Visual Studio Profiler

If you are having performance issues with the Entity Framework, you can use a profiler like the one built into Visual Studio to see where your application is spending its time. This is the tool we used to generate the pie charts in the “Exploring the Performance of the ADO.NET Entity Framework - Part 1” blog post ( \<https://learn.microsoft.com/archive/blogs/adonet/exploring-the-performance-of-the-ado-net-entity-framework-part-1>) that show where Entity Framework spends its time during cold and warm queries.

The "Profiling Entity Framework using the Visual Studio 2010 Profiler" blog post written by the Data and Modeling Customer Advisory Team shows a real-world example of how they used the profiler to investigate a performance problem.  \<https://learn.microsoft.com/archive/blogs/dmcat/profiling-entity-framework-using-the-visual-studio-2010-profiler>. This post was written for a windows application. If you need to profile a web application the Windows Performance Recorder (WPR) and Windows Performance Analyzer (WPA) tools may work better than working from Visual Studio. WPR and WPA are part of the Windows Performance Toolkit which is included with the Windows Assessment and Deployment Kit.

### 10.2 Application/Database profiling

Tools like the profiler built into Visual Studio tell you where your application is spending time.  Another type of profiler is available that performs dynamic analysis of your running application, either in production or pre-production depending on needs, and looks for common pitfalls and anti-patterns of database access.

Two commercially available profilers are the Entity Framework Profiler ( \<http://efprof.com>) and ORMProfiler ( \<http://ormprofiler.com>).

If your application is an MVC application using Code First, you can use StackExchange's MiniProfiler. Scott Hanselman describes this tool in his blog at: \<http://www.hanselman.com/blog/NuGetPackageOfTheWeek9ASPNETMiniProfilerFromStackExchangeRocksYourWorld.aspx>.

For more information on profiling your application's database activity, see Julie Lerman's MSDN Magazine article titled Profiling Database Activity in the Entity Framework.

### 10.3 Database logger

If you are using Entity Framework 6 also consider using the built-in logging functionality. The Database property of the context can be instructed to log its activity via a simple one-line configuration:

```csharp
    using (var context = newQueryComparison.DbC.NorthwindEntities())
    {
        context.Database.Log = Console.WriteLine;
        var q = context.Products.Where(p => p.Category.CategoryName == "Beverages");
        q.ToList();
    }
```

In this example the database activity will be logged to the console, but the Log property can be configured to call any Action<string> delegate.

If you want to enable database logging without recompiling, and you are using Entity Framework 6.1 or later, you can do so by adding an interceptor in the web.config or app.config file of your application.

```xml
  <interceptors>
    <interceptor type="System.Data.Entity.Infrastructure.Interception.DatabaseLogger, EntityFramework">
      <parameters>
        <parameter value="C:\Path\To\My\LogOutput.txt"/>
      </parameters>
    </interceptor>
  </interceptors>
```

For more information on how to add logging without recompiling go to \<http://blog.oneunicorn.com/2014/02/09/ef-6-1-turning-on-logging-without-recompiling/>.
