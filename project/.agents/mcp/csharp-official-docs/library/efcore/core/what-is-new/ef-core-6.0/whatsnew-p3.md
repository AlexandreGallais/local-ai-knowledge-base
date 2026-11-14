---
title: "What's New in EF Core 6.0 (part 3 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 3 of 11)

## Compiled models

GitHub Issue: #1906.

Compiled models can improve EF Core startup time for applications with large models. A large model typically means 100s to 1000s of entity types and relationships.

Startup time means the time to perform the first operation on a DbContext when that DbContext type is used for the first time in the application. Note that just creating a DbContext instance does not cause the EF model to be initialized. Instead, typical first operations that cause the model to be initialized include calling `DbContext.Add` or executing the first query.

Compiled models are created using the `dotnet ef` command-line tool. Ensure that you have installed the latest version of the tool before continuing.

A new `dbcontext optimize` command is used to generate the compiled model. For example:

```dotnetcli
dotnet ef dbcontext optimize
```

The `--output-dir` and `--namespace` options can be used to specify the directory and namespace into which the compiled model will be generated. For example:

```dotnetcli
PS C:\dotnet\efdocs\samples\core\Miscellaneous\CompiledModels> dotnet ef dbcontext optimize --output-dir MyCompiledModels --namespace MyCompiledModels
Build started...
Build succeeded.
Successfully generated a compiled model, to use it call 'options.UseModel(MyCompiledModels.BlogsContextModel.Instance)'. Run this command again when the model is modified.
PS C:\dotnet\efdocs\samples\core\Miscellaneous\CompiledModels>
```

The output from running this command includes a piece of code to copy-and-paste into your DbContext configuration to cause EF Core to use the compiled model. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseModel(MyCompiledModels.BlogsContextModel.Instance)
        .UseSqlite(@"Data Source=test.db");
```

### Compiled model bootstrapping

It is typically not necessary to look at the generated bootstrapping code. However, sometimes it can be useful to customize the model or its loading. The bootstrapping code looks something like this:

```csharp
[DbContext(typeof(BlogsContext))]
partial class BlogsContextModel : RuntimeModel
{
    private BlogsContextModel()
        : base(skipDetectChanges: false, modelId: Guid.NewGuid(), entityTypeCount: 0)
    {
    }

    private static BlogsContextModel _instance;
    public static IModel Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new BlogsContextModel();
                _instance.Initialize();
                _instance.Customize();
            }

            return _instance;
        }
    }

    partial void Initialize();

    partial void Customize();
}
```

This is a partial class with partial methods that can be implemented to customize the model as needed.

In addition, multiple compiled models can be generated for DbContext types that may use different models depending on some runtime configuration. These should be placed into different folders and namespaces, as shown above. Runtime information, such as the connection string, can then be examined and the correct model returned as needed. For example:

```csharp
public static class RuntimeModelCache
{
    private static readonly ConcurrentDictionary<string, IModel> _runtimeModels
        = new();

    public static IModel GetOrCreateModel(string connectionString)
        => _runtimeModels.GetOrAdd(
            connectionString, cs =>
            {
                if (cs.Contains("X"))
                {
                    return BlogsContextModel1.Instance;
                }

                if (cs.Contains("Y"))
                {
                    return BlogsContextModel2.Instance;
                }

                throw new InvalidOperationException("No appropriate compiled model found.");
            });
}
```

### Limitations

Compiled models have some limitations:

* Global query filters are not supported.
* Lazy loading and change-tracking proxies are not supported.
* Custom IModelCacheKeyFactory implementations are not supported. However, you can compile multiple models and load the appropriate one as needed.
* The model must be manually synchronized by regenerating it any time the model definition or configuration change.

Because of these limitations, you should only use compiled models if your EF Core startup time is too slow. Compiling small models is typically not worth it.

If supporting any of these features is critical to your success, then please vote for the appropriate issues linked above.

### Benchmarks

> **Tip:**
> You can try compiling a large model and running a benchmark on it by downloading the sample code from GitHub.

The model in the GitHub repo referenced above contains 449 entity types, 6390 properties, and 720 relationships. This is a moderately large model. Using BenchmarkDotNet to measure, the average time to first query is 1.02 seconds on a reasonably powerful laptop. Using compiled models brings this down to 117 milliseconds on the same hardware. An 8x to 10x improvement like this stays relatively constant as the model size increases.

> **Note:**
> See Announcing Entity Framework Core 6.0 Preview 5: Compiled Models on the .NET Blog for a more in-depth discussion of EF Core startup performance and compiled models.

## Improved performance on TechEmpower Fortunes

GitHub Issue: #23611.

We made significant improvements to query performance for EF Core 6.0. Specifically:

* EF Core 6.0 performance is now 70% faster on the industry-standard TechEmpower Fortunes benchmark, compared to 5.0.
  * This is the full-stack perf improvement, including improvements in the benchmark code, the .NET runtime, etc.
* EF Core 6.0 itself is 31% faster executing untracked queries.
* Heap allocations have been reduced by 43% when executing queries.

After these improvements, the gap between the popular "micro-ORM" Dapper and EF Core in the TechEmpower Fortunes benchmark narrowed from 55% to around a little under 5%.

> **Note:**
> See Announcing Entity Framework Core 6.0 Preview 4: Performance Edition on the .NET Blog for a detailed discussion of query performance improvements in EF Core 6.0.
