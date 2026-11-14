---
title: "ASP.NET Core metrics (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/metrics/overview.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core metrics

Metrics are numerical measurements reported over time. Use them to monitor the health of an app and generate alerts. For example, a web service might track how many:

* Requests it receives per second.
* Milliseconds it takes to respond.
* Responses it sends with an error.

Report these metrics to a monitoring system at regular intervals. Set up dashboards to view metrics and create alerts to notify people of problems. If the web service is intended to respond to requests within 400 ms and starts responding in 600 ms, the monitoring system can notify the operations staff that the app response is slower than normal.

The comprehensive list of all instruments together with their attributes is described in ASP.NET Core built-in metrics.

## Use metrics

Using metrics involves the following:

* **Instrumentation:** Code in .NET libraries takes measurements and associates these measurements with a metric name. .NET and ASP.NET Core include many built-in metrics.
* **Collection and storage:** A .NET app configures named metrics to be transmitted from the app for external storage and analysis. Some tools might perform configuration outside the app by using configuration files or a UI tool.
* **Visualization:** A tool that can display the metrics in a human-readable format. For example, the Aspire dashboard, Grafana, and Prometheus.
* **Alerting:** A tool that provides notifications when a metric exceeds a threshold. For example, if the average response time for a web service exceeds 400 ms, an alert can be sent to the operations staff.
* **Analysis:** A tool that can analyze the metrics over time. This tool is often a web-based dashboard that can be customized to show the most important metrics for a specific app.

Instrumented code can record numeric measurements, but to create useful metrics for monitoring, you need to aggregate, transmit, and store the measurements. The process of aggregating, transmitting, and storing data is called collection. This tutorial shows several examples of collecting and displaying metrics:

* Populating metrics in Grafana with OpenTelemetry and Prometheus.
* Viewing metrics in real time with `dotnet-counters`.

For another visualization option, see the Aspire dashboard overview.

You can also associate measurements with key-value pairs called tags that allow you to categorize data for analysis. For more information, see Multi-dimensional metrics.

## Create the starter app

Create a new ASP.NET Core app with the following command:

```dotnetcli
dotnet new web -o WebMetric
cd WebMetric
dotnet add package OpenTelemetry.Exporter.Prometheus.AspNetCore --prerelease
dotnet add package OpenTelemetry.Extensions.Hosting
```

Replace the contents of `Program.cs` with the following code:

```csharp
using OpenTelemetry.Metrics;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddPrometheusExporter();

        builder.AddMeter("Microsoft.AspNetCore.Hosting",
                         "Microsoft.AspNetCore.Server.Kestrel");
        builder.AddView("http.server.request.duration",
            new ExplicitBucketHistogramConfiguration
            {
                Boundaries = new double[] { 0, 0.005, 0.01, 0.025, 0.05,
                       0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10 }
            });
    });
var app = builder.Build();

app.MapPrometheusScrapingEndpoint();

app.MapGet("/", () => "Hello OpenTelemetry! ticks:"
                     + DateTime.Now.Ticks.ToString()[^3..]);

app.Run();
```
## View metrics with dotnet-counters

dotnet-counters is a command-line tool that can view live metrics for .NET apps on demand. It doesn't require setup, making it useful for ad-hoc investigations or verifying that metric instrumentation is working. It works with both `System.Diagnostics.Metrics` based APIs and EventCounters.

If the dotnet-counters tool isn't installed, run the following command:

```dotnetcli
dotnet tool update -g dotnet-counters
```

While the test app is running, launch dotnet-counters. The following command shows an example of `dotnet-counters` monitoring all metrics from the `Microsoft.AspNetCore.Hosting` meter.

```dotnetcli
dotnet-counters monitor -n WebMetric --counters Microsoft.AspNetCore.Hosting
```

Output similar to the following is displayed:

```dotnetcli
Press p to pause, r to resume, q to quit.
    Status: Running

[Microsoft.AspNetCore.Hosting]
    http-server-current-requests
        host=localhost,method=GET,port=5045,scheme=http                    0
    http-server-request-duration (s)
        host=localhost,method=GET,port=5045,protocol=HTTP/1.1,ro           0.001
        host=localhost,method=GET,port=5045,protocol=HTTP/1.1,ro           0.001
        host=localhost,method=GET,port=5045,protocol=HTTP/1.1,ro           0.001
        host=localhost,method=GET,port=5045,protocol=HTTP/1.1,ro           0
        host=localhost,method=GET,port=5045,protocol=HTTP/1.1,ro           0
        host=localhost,method=GET,port=5045,protocol=HTTP/1.1,ro           0
```

For more information, see dotnet-counters.

## Enrich the ASP.NET Core request metric

ASP.NET Core has many built-in metrics. The `http.server.request.duration` metric:

* Records the duration of HTTP requests on the server.
* Captures request information in tags, such as the matched route and response status code.

The `http.server.request.duration` metric supports tag enrichment by using `Microsoft.AspNetCore.Http.Features.IHttpMetricsTagsFeature`. Enrichment is when a library or app adds its own tags to a metric. This feature is useful if an app wants to add a custom categorization to dashboards or alerts built with metrics.

```csharp
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder();
var app = builder.Build();

app.Use(async (context, next) =>
{
    var tagsFeature = context.Features.Get<IHttpMetricsTagsFeature>();
    if (tagsFeature != null)
    {
        var source = context.Request.Query["utm_medium"].ToString() switch
        {
            "" => "none",
            "social" => "social",
            "email" => "email",
            "organic" => "organic",
            _ => "other"
        };
        tagsFeature.Tags.Add(new KeyValuePair<string, object?>("mkt_medium", source));
    }

    await next.Invoke();
});

app.MapGet("/", () => "Hello World!");

app.Run();
```
The preceding example:

* Adds middleware to enrich the ASP.NET Core request metric.
* Gets the `Microsoft.AspNetCore.Http.Features.IHttpMetricsTagsFeature` from the `HttpContext`. The feature is present on the context only if someone is listening to the metric. Verify `IHttpMetricsTagsFeature` isn't `null` before using it.
* Adds a custom tag containing the request's marketing source to the `http.server.request.duration` metric.
  * The tag has the name `mkt_medium` and a value based on the utm_medium query string value. The `utm_medium` value is resolved to a known range of values.
  * The tag allows requests to be categorized by marketing medium type, which could be useful when analyzing web app traffic.

> **Note:**
> Follow the multi-dimensional metrics best practices when enriching with custom tags. Tags that are too numerous or have an unbound range create many tag combinations, resulting in high dimensions. Collection tools have limits on supported dimensions for a counter and might filter results to prevent excessive memory use.

## Opt out of HTTP metrics on certain endpoints and requests

Opting out of recording metrics is beneficial for endpoints frequently called by automated systems, such as health checks. Recording metrics for these requests is generally unnecessary. Unwanted telemetry uses resources to collect and store, and can distort results displayed in a telemetry dashboard.

You can exclude HTTP requests to an endpoint from metrics by adding metadata, with either the DisableHttpMetrics attribute or the DisableHttpMetrics) method:

* Add the DisableHttpMetrics attribute to the Web API controller, SignalR hub, or gRPC service.
* Call DisableHttpMetrics) when mapping endpoints in app startup:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHealthChecks();

var app = builder.Build();
app.MapHealthChecks("/healthz").DisableHttpMetrics();
app.Run();
```
Alternatively, the `Microsoft.AspNetCore.Http.Features.IHttpMetricsTagsFeature.MetricsDisabled` property was added for:

* Advanced scenarios where a request doesn't map to an endpoint.
* Dynamically disabling metrics collection for specific HTTP requests.

```csharp
// Middleware that conditionally opts-out HTTP requests.
app.Use(async (context, next) =>
{
    var metricsFeature = context.Features.Get<IHttpMetricsTagsFeature>();
    if (metricsFeature != null &&
        context.Request.Headers.ContainsKey("x-disable-metrics"))
    {
        metricsFeature.MetricsDisabled = true;
    }

    await next(context);
});
```
## Create custom metrics

You create metrics by using APIs in the `System.Diagnostics.Metrics` namespace. For information, see Create custom metrics.

### Creating metrics in ASP.NET Core apps with `IMeterFactory`

Create `System.Diagnostics.Metrics.Meter` instances in ASP.NET Core apps with `System.Diagnostics.Metrics.IMeterFactory`.

ASP.NET Core registers `System.Diagnostics.Metrics.IMeterFactory` in dependency injection (DI) by default. The meter factory integrates metrics with DI, making isolating and collecting metrics easy. `IMeterFactory` is especially useful for testing. It allows for multiple tests to run side-by-side and only collects metrics values that are recorded in a test.

To use `IMeterFactory` in an app, create a type that uses `IMeterFactory` to create the app's custom metrics:

```csharp
public class ContosoMetrics
{
    private readonly Counter<int> _productSoldCounter;

    public ContosoMetrics(IMeterFactory meterFactory)
    {
        var meter = meterFactory.Create("Contoso.Web");
        _productSoldCounter = meter.CreateCounter<int>("contoso.product.sold");
    }

    public void ProductSold(string productName, int quantity)
    {
        _productSoldCounter.Add(quantity,
            new KeyValuePair<string, object?>("contoso.product.name", productName));
    }
}
```
Register the metrics type with DI in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ContosoMetrics>();
```
Inject the metrics type and record values where needed. Because the metrics type is registered in DI it can be used with MVC controllers, Minimal APIs, or any other type that is created by DI:

```csharp
app.MapPost("/complete-sale", (SaleModel model, ContosoMetrics metrics) =>
{
    // ... business logic such as saving the sale to a database ...

    metrics.ProductSold(model.ProductName, model.QuantitySold);
});
```
To monitor the "Contoso.Web" meter, use the following dotnet-counters command.

```dotnetcli
dotnet-counters monitor -n WebMetric --counters Contoso.Web
```

Output similar to the following is displayed:

```dotnetcli
Press p to pause, r to resume, q to quit.
    Status: Running

[Contoso.Web]
    contoso.product.sold (Count / 1 sec)
        contoso.product.name=Eggs            12    
        contoso.product.name=Milk            0    
```
