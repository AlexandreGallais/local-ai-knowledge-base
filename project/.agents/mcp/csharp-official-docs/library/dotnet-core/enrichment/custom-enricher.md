---
title: "Custom log enricher"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/enrichment/custom-enricher.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom log enricher

You can easily create a custom enricher by creating a class that implements the `Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher` interface.
After the class is created, you register it with `Microsoft.Extensions.DependencyInjection.EnrichmentServiceCollectionExtensions.AddLogEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection,Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher)`.
Once registered, the logging infrastructure automatically calls the `Enrich()` method exactly once on every registered enricher for each log message produced.

## Install the package

To get started, install the 📦 Microsoft.Extensions.Telemetry.Abstractions NuGet package:

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.Telemetry.Abstractions
```

Or, if you're using .NET 10+ SDK:

```dotnetcli
dotnet package add Microsoft.Extensions.Telemetry.Abstractions 
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.Telemetry.Abstractions"
                  Version="*" /> <!-- Adjust version -->
```

---

## ILogEnricher implementation

Your custom enricher only needs to implement a single `Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher.Enrich(Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector)` method.
During enrichment, this method is called and given an `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector` instance. The enricher then calls one of the overloads of
the `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)` method to record any properties it wants.

> **Note:**
> If your custom log enricher calls `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)`,
> it is acceptable to send any type of argument to the `value` parameter as is, because it is parsed into the actual type and serialized internally
> to be sent further down the logging pipeline.

```csharp
public class CustomEnricher : ILogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector)
    {
        collector.Add("customKey", "customValue");
    }
}

```

And you register it as shown in the following code using `Microsoft.Extensions.DependencyInjection.EnrichmentServiceCollectionExtensions.AddLogEnricher``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)`:

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.Logging.EnableEnrichment();
builder.Services.AddLogEnricher<CustomEnricher>();
```

It's also possible to configure manual instantiation of custom enrichers:

```csharp
public class AnotherEnricher : ILogEnricher
{
    private readonly string _key;
    private readonly object _value;
    public CustomEnricher(string key, object value)
    {
        _key = key;
        _value = value;
    }
    public void Enrich(IEnrichmentTagCollector collector)
    {
        collector.Add(_key, _value);
    }
}
```

And you register it as shown in the following code `Microsoft.Extensions.DependencyInjection.EnrichmentServiceCollectionExtensions.AddLogEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection,Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher)`:

```csharp
var builder = Host.CreateApplicationBuilder();
builder.Logging.EnableEnrichment();
builder.Services.AddLogEnricher(new AnotherEnricher("anotherKey", "anotherValue"));
```

## Static log enrichers

.NET provides `Microsoft.Extensions.Diagnostics.Enrichment.IStaticLogEnricher` to enrich logs with immutable properties throughout the application lifecycle. Static enrichers execute once during startup initialization, delivering significant performance benefits over standard enrichers that execute for each log record. This approach is particularly advantageous in high-throughput logging scenarios, as it eliminates the overhead of redundant enrichment operations for data that remains constant throughout the service's lifetime. Although executed only once at startup, the enrichment results are attached to every single log message produced by your application.

```csharp
public class StaticEnricher : IStaticLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector)
    {
        collector.Add("app.version", "1.0.0");
        collector.Add("environment", "production");
    }
}
```

And you register it as shown in the following code `Microsoft.Extensions.DependencyInjection.EnrichmentServiceCollectionExtensions.AddStaticLogEnricher``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)`:

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.Logging.EnableEnrichment();
builder.Services.AddStaticLogEnricher<StaticEnricher>();
```
