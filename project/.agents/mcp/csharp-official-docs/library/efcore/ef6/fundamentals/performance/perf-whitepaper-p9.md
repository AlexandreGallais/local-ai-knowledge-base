---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 9 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF4, EF5, and EF6 - EF6 (part 9 of 12)

## 7 Design time performance considerations

### 7.1       Inheritance Strategies

Another performance consideration when using Entity Framework is the inheritance strategy you use. Entity Framework supports 3 basic types of inheritance and their combinations:

-   Table per Hierarchy (TPH) – where each inheritance set maps to a table with a discriminator column to indicate which particular type in the hierarchy is being represented in the row.
-   Table per Type (TPT) – where each type has its own table in the database; the child tables only define the columns that the parent table doesn’t contain.
-   Table per Class (TPC) – where each type has its own full table in the database; the child tables define all their fields, including those defined in parent types.

If your model uses TPT inheritance, the queries which are generated will be more complex than those that are generated with the other inheritance strategies, which may result on longer execution times on the store.  It will generally take longer to generate queries over a TPT model, and to materialize the resulting objects.

See the "Performance Considerations when using TPT (Table per Type) Inheritance in the Entity Framework" MSDN blog post: \<https://learn.microsoft.com/archive/blogs/adonet/performance-considerations-when-using-tpt-table-per-type-inheritance-in-the-entity-framework>.

#### 7.1.1       Avoiding TPT in Model First or Code First applications

When you create a model over an existing database that has a TPT schema, you don't have many options. But when creating an application using Model First or Code First, you should avoid TPT inheritance for performance concerns.

When you use Model First in the Entity Designer Wizard, you will get TPT for any inheritance in your model. If you want to switch to a TPH inheritance strategy with Model First, you can use the "Entity Designer Database Generation Power Pack" available from the Visual Studio Gallery ( \<http://visualstudiogallery.msdn.microsoft.com/df3541c3-d833-4b65-b942-989e7ec74c87/>).

When using Code First to configure the mapping of a model with inheritance, EF will use TPH by default, therefore all entities in the inheritance hierarchy will be mapped to the same table. See the "Mapping with the Fluent API" section of the "Code First in Entity Framework4.1" article in MSDN Magazine ( http://msdn.microsoft.com/magazine/hh126815.aspx) for more details.

### 7.2       Upgrading from EF4 to improve model generation time

A SQL Server-specific improvement to the algorithm that generates the store-layer (SSDL) of the model is available in Entity Framework 5 and 6, and as an update to Entity Framework 4 when Visual Studio 2010 SP1 is installed. The following test results demonstrate the improvement when generating a very big model, in this case the Navision model. See Appendix C for more details about it.

The model contains 1005 entity sets and 4227 association sets.

| Configuration                              | Breakdown of time consumed                                                                                                                                               |
|:-------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Visual Studio 2010, Entity Framework 4     | SSDL Generation: 2 hr 27 min  Mapping Generation: 1 second  CSDL Generation: 1 second  ObjectLayer Generation: 1 second  View Generation: 2 h 14 min |
| Visual Studio 2010 SP1, Entity Framework 4 | SSDL Generation: 1 second  Mapping Generation: 1 second  CSDL Generation: 1 second  ObjectLayer Generation: 1 second  View Generation: 1 hr 53 min   |
| Visual Studio 2013, Entity Framework 5     | SSDL Generation: 1 second  Mapping Generation: 1 second  CSDL Generation: 1 second  ObjectLayer Generation: 1 second  View Generation: 65 minutes    |
| Visual Studio 2013, Entity Framework 6     | SSDL Generation: 1 second  Mapping Generation: 1 second  CSDL Generation: 1 second  ObjectLayer Generation: 1 second  View Generation: 28 seconds.   |

It's worth noting that when generating the SSDL, the load is almost entirely spent on the SQL Server, while the client development machine is waiting idle for results to come back from the server. DBAs should particularly appreciate this improvement. It's also worth noting that essentially the entire cost of model generation takes place in View Generation now.

### 7.3       Splitting Large Models with Database First and Model First

As model size increases, the designer surface becomes cluttered and difficult to use. We typically consider a model with more than 300 entities to be too large to effectively use the designer. The following blog post describes several options for splitting large models: \<https://learn.microsoft.com/archive/blogs/adonet/working-with-large-models-in-entity-framework-part-2>.

The post was written for the first version of Entity Framework, but the steps still apply.

### 7.4       Performance considerations with the Entity Data Source Control

We've seen cases in multi-threaded performance and stress tests where the performance of a web application using the EntityDataSource Control deteriorates significantly. The underlying cause is that the EntityDataSource repeatedly calls MetadataWorkspace.LoadFromAssembly on the assemblies referenced by the Web application to discover the types to be used as entities.

The solution is to set the ContextTypeName of the EntityDataSource to the type name of your derived ObjectContext class. This turns off the mechanism that scans all referenced assemblies for entity types.

Setting the ContextTypeName field also prevents a functional problem where the EntityDataSource in .NET 4.0 throws a ReflectionTypeLoadException when it can't load a type from an assembly via reflection. This issue has been fixed in .NET 4.5.

### 7.5       POCO entities and change tracking proxies

Entity Framework enables you to use custom data classes together with your data model without making any modifications to the data classes themselves. This means that you can use "plain-old" CLR objects (POCO), such as existing domain objects, with your data model. These POCO data classes (also known as persistence-ignorant objects), which are mapped to entities that are defined in a data model, support most of the same query, insert, update, and delete behaviors as entity types that are generated by the Entity Data Model tools.

Entity Framework can also create proxy classes derived from your POCO types, which are used when you want to enable features such as lazy loading and automatic change tracking on POCO entities. Your POCO classes must meet certain requirements to allow Entity Framework to use proxies, as described here: http://msdn.microsoft.com/library/dd468057.aspx.

Chance tracking proxies will notify the object state manager each time any of the properties of your entities has its value changed, so Entity Framework knows the actual state of your entities all the time. This is done by adding notification events to the body of the setter methods of your properties, and having the object state manager processing such events. Note that creating a proxy entity will typically be more expensive than creating a non-proxy POCO entity due to the added set of events created by Entity Framework.

When a POCO entity does not have a change tracking proxy, changes are found by comparing the contents of your entities against a copy of a previous saved state. This deep comparison will become a lengthy process when you have many entities in your context, or when your entities have a very large amount of properties, even if none of them changed since the last comparison took place.

In summary: you’ll pay a performance hit when creating the change tracking proxy, but change tracking will help you speed up the change detection process when your entities have many properties or when you have many entities in your model. For entities with a small number of properties where the amount of entities doesn’t grow too much, having change tracking proxies may not be of much benefit.
