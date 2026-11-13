---
title: "Health checks in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/health-checks.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Health checks in ASP.NET Core (part 3 of 3)

## Health Check Publisher

When an `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher` is added to the service container, the health check system periodically executes your health checks and calls `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher.PublishAsync*` with the result. This process is useful in a push-based health monitoring system scenario that expects each process to call the monitoring system periodically to determine health.

`Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions` let you set the:

* `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions.Delay`: The initial delay after the app starts before executing `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher` instances. The delay happens once at startup and doesn't apply to later iterations. The default value is five seconds.
* `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions.Period`: The period of `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher` execution. The default value is 30 seconds.
* `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions.Predicate`: If `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions.Predicate` is `null` (default), the health check publisher service runs all registered health checks. To run a subset of health checks, provide a function that filters the set of checks. The predicate is evaluated each period.
* `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions.Timeout`: The timeout for executing the health checks for all `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher` instances. Use `System.Threading.Timeout.InfiniteTimeSpan` to execute without a timeout. The default value is 30 seconds.

The following example shows the layout of a health publisher:

```csharp
public class SampleHealthCheckPublisher : IHealthCheckPublisher
{
    public Task PublishAsync(HealthReport report, CancellationToken <example-value>)
    {
        if (report.Status == HealthStatus.Healthy)
        {
            // ...
        }
        else
        {
            // ...
        }

        return Task.CompletedTask;
    }
}
```
The `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions` class provides properties for configuring the behavior of the health check publisher.

The following example registers a health check publisher as a singleton and configures `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions`:

```csharp
builder.Services.Configure<HealthCheckPublisherOptions>(options =>
{
    options.Delay = TimeSpan.FromSeconds(2);
    options.Predicate = healthCheck => healthCheck.Tags.Contains("sample");
});

builder.Services.AddSingleton<IHealthCheckPublisher, SampleHealthCheckPublisher>();
```
`AspNetCore.Diagnostics.HealthChecks`:

* Includes publishers for several systems, including Application Insights.
* Is ***not*** maintained or supported by Microsoft.

### Individual Healthchecks

You can set `Delay` and `Period` on each `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckRegistration` individually. Set these values when you want to run some health checks at a different rate than the period set in `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions`.

The following code sets the `Delay` and `Period` for the `SampleHealthCheck1`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks()
   .Add(new HealthCheckRegistration(
       name: "SampleHealthCheck1",
       instance: new SampleHealthCheck(),
       failureStatus: null,
       tags: null,
       timeout: default)
   {
       Delay = TimeSpan.FromSeconds(40),
       Period = TimeSpan.FromSeconds(30)
   });

var app = builder.Build();

app.MapHealthChecks("/healthz");

app.Run();
```
## Dependency Injection and Health Checks

It's possible to use dependency injection to consume an instance of a specific `Type` inside a Health Check class. Dependency injection can be useful to inject options or a global configuration to a Health Check. Using dependency injection is ***not*** a common scenario to configure Health Checks. Usually, each Health Check is quite specific to the actual test and is configured using `IHealthChecksBuilder` extension methods.

The following example shows a sample Health Check that retrieves a configuration object via dependency injection:

```csharp
public class SampleHealthCheckWithDI : IHealthCheck
{
    private readonly SampleHealthCheckWithDiConfig _config;

    public SampleHealthCheckWithDI(SampleHealthCheckWithDiConfig config)
        => _config = config;

    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken <example-value> = default)
    {
        var isHealthy = true;

        // use _config ...

        if (isHealthy)
        {
            return Task.FromResult(
                HealthCheckResult.Healthy("A healthy result."));
        }

        return Task.FromResult(
            new HealthCheckResult(
                context.Registration.FailureStatus, "An unhealthy result."));
    }
}
```
The `SampleHealthCheckWithDiConfig` and the Health check needs to be added to the service container :

```csharp
builder.Services.AddSingleton<SampleHealthCheckWithDiConfig>(new SampleHealthCheckWithDiConfig
{
    BaseUriToCheck = new Uri("https://sample.contoso.com/api/")
});
builder.Services.AddHealthChecks()
    .AddCheck<SampleHealthCheckWithDI>(
        "With Dependency Injection",
        tags: new[] { "inject" });
```
## UseHealthChecks vs. MapHealthChecks

You can make health checks accessible to callers in two ways:

* `Microsoft.AspNetCore.Builder.HealthCheckApplicationBuilderExtensions.UseHealthChecks*` registers middleware for handling health checks requests in the middleware pipeline.
* `Microsoft.AspNetCore.Builder.HealthCheckEndpointRouteBuilderExtensions.MapHealthChecks*` registers a health checks endpoint. The endpoint is matched and executed along with other endpoints in the app.

By using `MapHealthChecks` instead of `UseHealthChecks`, you can use endpoint aware middleware, such as authorization, and you get greater fine-grained control over the matching policy. By using `UseHealthChecks` instead of `MapHealthChecks`, you control exactly where health checks runs in the middleware pipeline.

`Microsoft.AspNetCore.Builder.HealthCheckApplicationBuilderExtensions.UseHealthChecks*`:
* Terminates the pipeline when a request matches the health check endpoint. Short-circuiting is often desirable because it avoids unnecessary work, such as logging and other middleware.
* Is primarily used for configuring the health checks middleware in the pipeline.
* Can match any path on a port with a `null` or empty `PathString`. Allows performing a health check on any request made to the specified port.
* Source code

`Microsoft.AspNetCore.Builder.HealthCheckEndpointRouteBuilderExtensions.MapHealthChecks*` allows:
* Terminating the pipeline when a request matches the health check endpoint, by calling `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*`. For example, `app.MapHealthChecks("/healthz").ShortCircuit();`. For more information, see Short-circuit middleware after routing.
* Mapping specific routes or endpoints for health checks.
* Customization of the URL or path where the health check endpoint is accessible.
* Mapping multiple health check endpoints with different routes or configurations. Multiple endpoint support:
  * Enables separate endpoints for different types of health checks or components.
  * Is used to differentiate between different aspects of the app's health or apply specific configurations to subsets of health checks.
* Source code

## Filter health check logs

Health check probes run frequently and can generate a high volume of log messages. You can suppress or filter health check logs using the following techniques:

* Configure log levels in `appsettings.json`
* Short-circuit the middleware pipeline

### Configure log levels in `appsettings.json`

To suppress informational logs generated by health checks, set the log level for the `Microsoft.AspNetCore.Diagnostics.HealthChecks` (middleware) and `Microsoft.Extensions.Diagnostics.HealthChecks` (service) logging categories to `Warning` in `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.AspNetCore.Diagnostics.HealthChecks": "Warning",
      "Microsoft.Extensions.Diagnostics.HealthChecks": "Warning"
    }
  }
}
```

With this setting, health checks log only when a check reports a degraded or unhealthy status or the check throws an unhandled exception. To disable health check diagnostic logs completely, set both categories to `None`.

### Short-circuit the middleware pipeline

Call `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*` on the health check endpoint to prevent middleware registered after routing, such as authentication or subsequent custom middleware, from executing:

```csharp
app.MapHealthChecks("/healthz").ShortCircuit();
```

Because short-circuiting only bypasses middleware positioned after routing in the pipeline, it doesn't suppress server hosting logs (such as Kestrel or HTTP.sys request logs), middleware placed before `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*`, or health check service logging. Combine `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*` with logging category configuration to minimize probe noise. For more information, see Short-circuit middleware after routing.

## Related content

* View or download sample code (how to download)

> **Note:**
> This article was partially created with the help of artificial intelligence. Before publishing, an author reviewed and revised the content as needed. See Our principles for using AI-generated content in Microsoft Learn.
