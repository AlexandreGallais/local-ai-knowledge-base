---
title: "Health checks in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/health-checks.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Health checks in ASP.NET Core

By Glenn Condron and Juergen Gutsch

-->
-->

ASP.NET Core offers health checks middleware and libraries for reporting the health of app infrastructure components.

Health checks are exposed by an app as HTTP endpoints. Health check endpoints can be configured for various real-time monitoring scenarios:

* Health probes can be used by container orchestrators and load balancers to check an app's status. For example, a container orchestrator may respond to a failing health check by halting a rolling deployment or restarting a container. A load balancer might react to an unhealthy app by routing traffic away from the failing instance to a healthy instance.
* Use of memory, disk, and other physical server resources can be monitored for healthy status.
* Health checks can test an app's dependencies, such as databases and external service endpoints, to confirm availability and normal functioning.

Health checks are typically used with an external monitoring service or container orchestrator to check the status of an app. Before adding health checks to an app, decide on which monitoring system to use. The monitoring system dictates what types of health checks to create and how to configure their endpoints.

## Basic health probe

For many apps, a basic health probe configuration that reports the app's availability to process requests (*liveness*) is sufficient to discover the status of the app.

The basic configuration registers health check services and calls the health checks middleware to respond at a URL endpoint with a health response. By default, no specific health checks are registered to test any particular dependency or subsystem. The app is considered healthy if it can respond at the health endpoint URL. The default response writer writes `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus` as a plaintext response to the client. The `HealthStatus` is `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Healthy`, `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Degraded`, or `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy`.

Register health check services with `Microsoft.Extensions.DependencyInjection.HealthCheckServiceCollectionExtensions.AddHealthChecks*` in `Program.cs`. Create a health check endpoint by calling `Microsoft.AspNetCore.Builder.HealthCheckEndpointRouteBuilderExtensions.MapHealthChecks*`.

The following example creates a health check endpoint at `/healthz`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/healthz");

app.Run();
```
### Docker `HEALTHCHECK`

Docker includes a built-in `HEALTHCHECK` directive that you can use to check the status of an app that uses the basic health check configuration:

```dockerfile
HEALTHCHECK CMD curl --fail http://localhost:5000/healthz || exit 1
```

The preceding example uses `curl` to make an HTTP request to the health check endpoint at `/healthz`. `curl` isn't included in the .NET Linux container images, but you can add it by installing the required package in the Dockerfile. Containers that use images based on Alpine Linux can use the included `wget` in place of `curl`.

## Create health checks

Create health checks by implementing the `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck` interface. The `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck.CheckHealthAsync*` method returns a `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult` that indicates the health as `Healthy`, `Degraded`, or `Unhealthy`. The result is written as a plaintext response with a configurable status code. See the Health check options section. `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult` can also return optional key-value pairs.

The following example demonstrates the layout of a health check:

```csharp
public class SampleHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var isHealthy = true;

        // ...

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
The health check's logic is placed in the `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck.CheckHealthAsync*` method. The preceding example sets a dummy variable, `isHealthy`, to `true`. If the value of `isHealthy` is set to `false`, the `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckRegistration.FailureStatus` status is returned.

If `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck.CheckHealthAsync*` throws an exception during the check, a new `Microsoft.Extensions.Diagnostics.HealthChecks.HealthReportEntry` is returned with its `Microsoft.Extensions.Diagnostics.HealthChecks.HealthReportEntry.Status` set to the `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckRegistration.FailureStatus`. This status is defined by `Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck*` (see the Register health check services section) and includes the inner exception that caused the check failure. The `Microsoft.Extensions.Diagnostics.HealthChecks.HealthReportEntry.Description` is set to the exception's message.

When an endpoint runs more than one health check, the overall `Microsoft.Extensions.Diagnostics.HealthChecks.HealthReport.Status` is the worst individual result:

* If any check is `Unhealthy`, the overall status is `Unhealthy`.
* Otherwise, if any check is `Degraded`, the overall status is `Degraded`.
* Otherwise, the overall status is `Healthy`.

With the default status codes, `Degraded` returns HTTP 200, so a load balancer or orchestrator that only checks the status code still treats the app as available. To change this, see Customize the HTTP status code. To include only some checks in an endpoint, see Filter health checks.

A registration's failure status applies when a check throws an exception or returns `context.Registration.FailureStatus`. It doesn't change a result that a check returns explicitly, such as `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult.Unhealthy*`.

Health checks don't run on a timer by default. They run each time the health endpoint is requested, so every probe request runs every check included in that endpoint. To run checks on a schedule, use a health check publisher.

## Register health check services

To register a health check service, call `Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck*` in `Program.cs`:

```csharp
builder.Services.AddHealthChecks()
    .AddCheck<SampleHealthCheck>("Sample");
```
The `Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck*` overload shown in the following example sets the failure status (`Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus`) to report when the health check reports a failure. If the failure status is set to `null` (default), `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy` is reported. This overload is a useful scenario for library authors, where the failure status indicated by the library is enforced by the app when a health check failure occurs if the health check implementation honors the setting.

*Tags* can be used to filter health checks. Tags are described in the Filter health checks section.

```csharp
builder.Services.AddHealthChecks()
    .AddCheck<SampleHealthCheck>(
        "Sample",
        failureStatus: HealthStatus.Degraded,
        tags: new[] { "sample" });
```
`Microsoft.Extensions.DependencyInjection.HealthChecksBuilderDelegateExtensions.AddCheck*` can also execute a lambda function. In the following example, the health check always returns a healthy result:

```csharp
builder.Services.AddHealthChecks()
    .AddCheck("Sample", () => HealthCheckResult.Healthy("A healthy result."));
```
Call `Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddTypeActivatedCheck*` to pass arguments to a health check implementation. In the following example, a type-activated health check accepts an integer and a string in its constructor:

```csharp
public class SampleHealthCheckWithArgs : IHealthCheck
{
    private readonly int _arg1;
    private readonly string _arg2;

    public SampleHealthCheckWithArgs(int arg1, string arg2)
        => (_arg1, _arg2) = (arg1, arg2);

    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        // ...

        return Task.FromResult(HealthCheckResult.Healthy("A healthy result."));
    }
}
```
To register the preceding health check, call `AddTypeActivatedCheck` with the integer and string passed as arguments:

```csharp
builder.Services.AddHealthChecks()
    .AddTypeActivatedCheck<SampleHealthCheckWithArgs>(
        "Sample",
        failureStatus: HealthStatus.Degraded,
        tags: new[] { "sample" },
        args: new object[] { 1, "Arg" });
```
## Use Health Checks Routing

In `Program.cs`, call `MapHealthChecks` on the endpoint builder with the endpoint URL or relative path:

```csharp
app.MapHealthChecks("/healthz");
```
### Require host

Call `RequireHost` to specify one or more permitted hosts for the health check endpoint. Use Unicode rather than punycode for hosts, and you can include a port. If you don't supply a collection, any host is accepted:

```csharp
app.MapHealthChecks("/healthz")
    .RequireHost("www.contoso.com:5001");
```
To restrict the health check endpoint to respond only on a specific port, specify a port in the call to `RequireHost`. Typically, use this approach in a container environment to expose a port for monitoring services:

```csharp
app.MapHealthChecks("/healthz")
    .RequireHost("*:5001");
```
> **Warning:**
  > API that relies on the Host header, such as `Microsoft.AspNetCore.Http.HttpRequest.Host` and `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.RequireHost*`, are subject to potential spoofing by clients.
>
> To prevent host and port spoofing, use one of the following approaches:
>
> * Use `Microsoft.AspNetCore.Http.HttpContext.Connection` (`Microsoft.AspNetCore.Http.ConnectionInfo.LocalPort`) where the ports are checked.
> * Employ Host filtering.

To prevent unauthorized clients from spoofing the port, call `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*`:

```csharp
app.MapHealthChecks("/healthz")
    .RequireHost("*:5001")
    .RequireAuthorization();
```
For more information, see Host matching in routes with RequireHost.

### Require authorization

Call `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` to run authorization middleware on the health check request endpoint. A `RequireAuthorization` overload accepts one or more authorization policies. If a policy isn't provided, the default authorization policy is used:

```csharp
app.MapHealthChecks("/healthz")
    .RequireAuthorization();
```
### Enable Cross-Origin Requests (CORS)

Although running health checks manually from a browser isn't a common scenario, CORS middleware can be enabled by calling `RequireCors` on the health checks endpoints. The `RequireCors` overload accepts a CORS policy builder delegate (`CorsPolicyBuilder`) or a policy name. For more information, see Enable Cross-Origin Requests (CORS) in ASP.NET Core.
