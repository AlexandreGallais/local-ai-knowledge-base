---
title: "Health checks in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/health-checks.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Health checks in ASP.NET Core (part 2 of 3)

## Health check options

`Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions` provide an opportunity to customize health check behavior:

* Filter health checks
* Customize the HTTP status code
* Suppress cache headers
* Customize output

### Filter health checks

By default, the health checks middleware runs all registered health checks. To run a subset of health checks, provide a function that returns a boolean to the `Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions.Predicate` option.

The following example filters the health checks so that only those tagged with `sample` run:

```csharp
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    Predicate = healthCheck => healthCheck.Tags.Contains("sample")
});
```
### Customize the HTTP status code

Use `Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions.ResultStatusCodes` to customize the mapping of health status to HTTP status codes. The following `Microsoft.AspNetCore.Http.StatusCodes` assignments are the default values used by the middleware. Change the status code values to meet your requirements:

```csharp
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    ResultStatusCodes =
    {
        [HealthStatus.Healthy] = StatusCodes.Status200OK,
        [HealthStatus.Degraded] = StatusCodes.Status200OK,
        [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable
    }
});
```
### Suppress cache headers

`Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions.AllowCachingResponses` controls whether the health checks middleware adds HTTP headers to a probe response to prevent response caching. If the value is `false` (default), the middleware sets or overrides the `Cache-Control`, `Expires`, and `Pragma` headers to prevent response caching. If the value is `true`, the middleware doesn't modify the cache headers of the response:

```csharp
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    AllowCachingResponses = true
});
```
### Customize output

To customize the output of a health checks report, set the `Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions.ResponseWriter` property to a delegate that writes the response:

```csharp
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    ResponseWriter = WriteResponse
});
```
The default delegate writes a minimal plaintext response with the string value of `HealthReport.Status`. The following custom delegate outputs a custom JSON response using `System.Text.Json`:

```csharp
private static Task WriteResponse(HttpContext context, HealthReport healthReport)
{
    context.Response.ContentType = "application/json; charset=utf-8";

    var options = new JsonWriterOptions { Indented = true };

    using var memoryStream = new MemoryStream();
    using (var jsonWriter = new Utf8JsonWriter(memoryStream, options))
    {
        jsonWriter.WriteStartObject();
        jsonWriter.WriteString("status", healthReport.Status.ToString());
        jsonWriter.WriteStartObject("results");

        foreach (var healthReportEntry in healthReport.Entries)
        {
            jsonWriter.WriteStartObject(healthReportEntry.Key);
            jsonWriter.WriteString("status",
                healthReportEntry.Value.Status.ToString());
            jsonWriter.WriteString("description",
                healthReportEntry.Value.Description);
            jsonWriter.WriteStartObject("data");

            foreach (var item in healthReportEntry.Value.Data)
            {
                jsonWriter.WritePropertyName(item.Key);

                JsonSerializer.Serialize(jsonWriter, item.Value,
                    item.Value?.GetType() ?? typeof(object));
            }

            jsonWriter.WriteEndObject();
            jsonWriter.WriteEndObject();
        }

        jsonWriter.WriteEndObject();
        jsonWriter.WriteEndObject();
    }

    return context.Response.WriteAsync(
        Encoding.UTF8.GetString(memoryStream.ToArray()));
}
```
The health checks API doesn't provide built-in support for complex JSON return formats because the format is specific to your choice of monitoring system. Customize the response in the preceding examples as needed. For more information on JSON serialization with `System.Text.Json`, see How to serialize and deserialize JSON in .NET.

## Database probe

A health check can specify a database query to run as a boolean test to indicate if the database is responding normally.

`AspNetCore.Diagnostics.HealthChecks`, a health check library for ASP.NET Core apps, includes a health check that runs against a SQL Server database. `AspNetCore.Diagnostics.HealthChecks` executes a `SELECT 1` query against the database to confirm the connection to the database is healthy.

> **Warning:**
> When checking a database connection by using a query, choose a query that returns quickly. The query approach runs the risk of overloading the database and degrading its performance. In most cases, running a test query isn't necessary. Merely making a successful connection to the database is sufficient. If you find it necessary to run a query, choose a simple SELECT query, such as `SELECT 1`.

To use this SQL Server health check, include a package reference to the `AspNetCore.HealthChecks.SqlServer` NuGet package. The following example registers the SQL Server health check:

```csharp
var conStr = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(conStr))
{
    throw new InvalidOperationException(
                       "Could not find a connection string named 'DefaultConnection'.");
}
builder.Services.AddHealthChecks()
    .AddSqlServer(conStr);
```
> **Note:**
> Microsoft doesn't maintain or support `AspNetCore.Diagnostics.HealthChecks`.

## Entity Framework Core DbContext probe

The `DbContext` check confirms that the app can communicate with the database configured for an EF Core `DbContext`. Apps that support the `DbContext` check:

* Use Entity Framework (EF) Core.
* Include a package reference to the `Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore` NuGet package.

`Microsoft.Extensions.DependencyInjection.EntityFrameworkCoreHealthChecksBuilderExtensions.AddDbContextCheck*` registers a health check for a `Microsoft.EntityFrameworkCore.DbContext`. The `DbContext` is supplied to the method as the `TContext`. An overload is available to configure the failure status, tags, and a custom test query.

By default:

* The `DbContextHealthCheck` calls EF Core's `CanConnectAsync` method. You can customize what operation is run when checking health by using `AddDbContextCheck` method overloads.
* The name of the health check is the name of the `TContext` type.

The following example registers a `DbContext` and an associated `DbContextHealthCheck`:

```csharp
builder.Services.AddDbContext<SampleDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHealthChecks()
    .AddDbContextCheck<SampleDbContext>();
```
## Separate readiness and liveness probes

In some hosting scenarios, use a pair of health checks to distinguish two app states:

* *Readiness* indicates if the app is running normally but isn't ready to receive requests.
* *Liveness* indicates if an app has crashed and must be restarted.

Consider the following example: An app must download a large configuration file before it's ready to process requests. You don't want to restart the app if the initial download fails because the app can retry downloading the file several times. Use a *liveness probe* to describe the liveness of the process, no other checks are run. You also want to prevent requests from being sent to the app before the configuration file download succeeds. Use a *readiness probe* to indicate a "not ready" state until the download succeeds and the app is ready to receive requests.

The following background task simulates a startup process that takes roughly 15 seconds. Once it completes, the task sets the `StartupHealthCheck.StartupCompleted` property to true:

```csharp
public class StartupBackgroundService : BackgroundService
{
    private readonly StartupHealthCheck _healthCheck;

    public StartupBackgroundService(StartupHealthCheck healthCheck)
        => _healthCheck = healthCheck;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Simulate the effect of a long-running task.
        await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);

        _healthCheck.StartupCompleted = true;
    }
}
```
The `StartupHealthCheck` reports the completion of the long-running startup task and exposes the `StartupCompleted` property that the background service sets:

```csharp
public class StartupHealthCheck : IHealthCheck
{
    private volatile bool _isReady;

    public bool StartupCompleted
    {
        get => _isReady;
        set => _isReady = value;
    }

    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        if (StartupCompleted)
        {
            return Task.FromResult(HealthCheckResult.Healthy("The startup task has completed."));
        }

        return Task.FromResult(HealthCheckResult.Unhealthy("That startup task is still running."));
    }
}
```
Register the health check with `Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck*` in `Program.cs` along with the hosted service. Because the hosted service sets the property on the health check, also register the health check in the service container as a singleton:

```csharp
builder.Services.AddHostedService<StartupBackgroundService>();
builder.Services.AddSingleton<StartupHealthCheck>();

builder.Services.AddHealthChecks()
    .AddCheck<StartupHealthCheck>(
        "Startup",
        tags: new[] { "ready" });
```
To create two different health check endpoints, call `MapHealthChecks` twice:

```csharp
app.MapHealthChecks("/healthz/ready", new HealthCheckOptions
{
    Predicate = healthCheck => healthCheck.Tags.Contains("ready")
});

app.MapHealthChecks("/healthz/live", new HealthCheckOptions
{
    Predicate = _ => false
});
```
The preceding example creates the following health check endpoints:

* `/healthz/ready` for the readiness check. The readiness check filters health checks to those tagged with `ready`.
* `/healthz/live` for the liveness check. The liveness check filters out all health checks by returning `false` in the `Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions.Predicate` delegate. For more information on filtering health checks, see Filter health checks in this article.

Before the startup task completes, the `/healthz/ready` endpoint reports an `Unhealthy` status. Once the startup task completes, this endpoint reports a `Healthy` status. The `/healthz/live` endpoint excludes all checks and reports a `Healthy` status for all calls.

### Kubernetes example

Using separate readiness and liveness checks is useful in an environment such as Kubernetes. In Kubernetes, an app might need to run time-consuming startup work before it can accept requests, such as a test of the underlying database availability. By using separate checks, the orchestrator can tell whether the app is functioning but not yet ready or if the app failed to start. For more information on readiness and liveness probes in Kubernetes, see Configure Liveness and Readiness Probes in the Kubernetes documentation.

The following example demonstrates a Kubernetes readiness probe configuration:

```yaml
spec:
  template:
  spec:
    readinessProbe:
      # an http probe
      httpGet:
        path: /healthz/ready
        port: 80
      # length of time to wait for a pod to initialize
      # after pod startup, before applying health checking
      initialDelaySeconds: 30
      timeoutSeconds: 1
    ports:
      - containerPort: 80
```

## Distribute a health check library

To distribute a health check as a library:

1. Write a health check that implements the `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck` interface as a standalone class. The class can rely on dependency injection (DI), type activation, and named options to access configuration data.

1. Write an extension method with parameters that the consuming app calls in its `Program.cs` method. Consider the following example health check, which accepts `arg1` and `arg2` as constructor parameters:

```csharp
public SampleHealthCheckWithArgs(int arg1, string arg2)
    => (_arg1, _arg2) = (arg1, arg2);
```
   The preceding signature indicates that the health check requires custom data to process the health check probe logic. The data is provided to the delegate used to create the health check instance when the health check is registered with an extension method. In the following example, the caller specifies:

   * `arg1`: An integer data point for the health check.
   * `arg2`: A string argument for the health check.
   * `name`: An optional health check name. If `null`, a default value is used.
   * `failureStatus`: An optional `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus`, which is reported for a failure status. If `null`, `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy` is used.
   * `tags`: An optional `IEnumerable<string>` collection of tags.

```csharp
public static class SampleHealthCheckBuilderExtensions
{
    private const string DefaultName = "Sample";

    public static IHealthChecksBuilder AddSampleHealthCheck(
        this IHealthChecksBuilder healthChecksBuilder,
        int arg1,
        string arg2,
        string? name = null,
        HealthStatus? failureStatus = null,
        IEnumerable<string>? tags = default)
    {
        return healthChecksBuilder.Add(
            new HealthCheckRegistration(
                name ?? DefaultName,
                _ => new SampleHealthCheckWithArgs(arg1, arg2),
                failureStatus,
                tags));
    }
}
```
