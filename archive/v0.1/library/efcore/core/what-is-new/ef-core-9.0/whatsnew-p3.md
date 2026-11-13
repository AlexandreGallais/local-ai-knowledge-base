---
title: "What's New in EF Core 9 (part 3 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-9.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 9 (part 3 of 7)

## AOT and pre-compiled queries

> **Warning:**
> NativeAOT and query precompilation are highly experimental features, and are not yet suited for production use. The support described below should be viewed as infrastructure towards the final feature, which will be released in a future version. We encourage you to experiment with the current support and report on your experiences, but recommend against deploying EF NativeAOT applications in production.

EF 9.0 brings initial, experimental support for .NET NativeAOT, allowing the publishing of ahead-of-time compiled applications which make use of EF to access databases. To support LINQ queries in NativeAOT mode, EF relies on _query precompilation_: this mechanism statically identifies EF LINQ queries and generates C# _interceptors_, which contain code to execute each specific query. This can significantly cut down on your application's startup time, as the heavy lifting of processing and compiling your LINQ queries into SQL no longer happens every time your application starts up. Instead, each query's interceptor contains the finalized SQL for that query, as well as optimized code to materialize database results as .NET objects.

For example, given a program with the following EF query:

```c#
var blogs = await context.Blogs.Where(b => b.Name == "foo").ToListAsync();
```

EF will generate a C# interceptor into your project, which will take over the query execution. Instead of processing the query and translating it to SQL every time the program starts, the interceptor has the SQL embedded right into it (for SQL Server in this case), allowing your program to start up much faster:

```c#
var relationalCommandTemplate = ((IRelationalCommandTemplate)(new RelationalCommand(materializerLiftableConstantContext.CommandBuilderDependencies, "SELECT [b].[Id], [b].[Name]\nFROM [Blogs] AS [b]\nWHERE [b].[Name] = N'foo'", new IRelationalParameter[] { })));
```

In addition, the same interceptor contains code to materialize your .NET object from database results:

```c#
var instance = new Blog();
UnsafeAccessor_Blog_Id_Set(instance) = dataReader.GetInt32(0);
UnsafeAccessor_Blog_Name_Set(instance) = dataReader.GetString(1);
```

This uses another new .NET feature - unsafe accessors, to inject data from the database into your object's private fields.

If you're interested in NativeAOT and like to experiment with cutting-edge features, give this a try! Just be aware that the feature should be considered unstable, and currently has many limitations; we expect to stabilize it and make it more suitable for production usage in EF 10.

See the NativeAOT documentation page for more details.
