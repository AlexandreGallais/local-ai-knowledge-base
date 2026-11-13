---
title: "gRPC health checks in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/health-checks.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# gRPC health checks in ASP.NET Core

-->
-->

By James Newton-King

The gRPC health checking protocol is a standard for reporting the health of gRPC server apps.

Health checks are exposed by an app as a gRPC service. They're typically used with an external monitoring service to check the status of an app. The service can be configured for various real-time monitoring scenarios:

* Health probes can be used by container orchestrators and load balancers to check an app's status. For example, Kubernetes supports gRPC liveness, readiness and startup probes. Kubernetes can be configured to reroute traffic or restart unhealthy containers based on gRPC health check results.
* Use of memory, disk, and other physical server resources can be monitored for healthy status.
* Health checks can test an app's dependencies, such as databases and external service endpoints, to confirm availability and normal functioning.

## Set up gRPC health checks

gRPC ASP.NET Core has built-in support for gRPC health checks with the `Grpc.AspNetCore.HealthChecks` package. Results from .NET health checks are reported to callers.

To set up gRPC health checks in an app:

* Add a `Grpc.AspNetCore.HealthChecks` package reference.
* Register gRPC health checks service:
  * `AddGrpcHealthChecks` to register services that enable health checks.
  * `MapGrpcHealthChecksService` to add a health checks service endpoint.
* Add health checks by implementing `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck` or using the `Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck*` method.

```csharp
using GrpcServiceHC.Services;
using Microsoft.Extensions.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();
builder.Services.AddGrpcHealthChecks()
                .AddCheck("Sample", () => HealthCheckResult.Healthy());

var app = builder.Build();

app.MapGrpcService<GreeterService>();
app.MapGrpcHealthChecksService();

// Code removed for brevity.
```

When health checks is set up:

* The health checks service is added to the server app.
* .NET health checks registered with the app are periodically executed for health results. By default, there's a 5-second delay after app startup, and then health checks are executed every 30 seconds. Health check execution interval can be customized with `HealthCheckPublisherOptions`.
* Health results determine what the gRPC service reports:
  * `Unknown` is reported when there are no health results.
  * `NotServing` is reported when there are any health results of `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy`.
  * Otherwise, `Serving` is reported.

### Health checks service security

gRPC health checks returns health status about an app, which could be sensitive information. Care should be taken to limit access to the gRPC health checks service.

Access to the service can be controlled through standard ASP.NET Core authorization extension methods, such as `AllowAnonymous` and `RequireAuthorization`.

For example, if an app has been configured to require authorization by default, configure the gRPC health checks endpoint with `AllowAnonymous` to skip authentication and authorization.

```csharp
app.MapGrpcHealthChecksService().AllowAnonymous();
```

### Configure `Grpc.AspNetCore.HealthChecks`

By default, the gRPC health checks service uses all registered health checks to determine health status. gRPC health checks can be customized when registered to use a subset of health checks. The `MapService` method is used to map health results to service names, along with a predicate for filtering health results:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();
builder.Services.AddGrpcHealthChecks(o =>
{
    o.Services.MapService("", r => r.Tags.Contains("public"));
});

var app = builder.Build();
```
The preceding code overrides the default service (`""`) to only use health results with the "public" tag.

gRPC health checks supports the client specifying a service name argument when checking health. Multiple services are supported by providing a service name to `MapService`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();
builder.Services.AddGrpcHealthChecks(o =>
{
    o.Services.MapService("greet.Greeter", r => r.Tags.Contains("greeter"));
    o.Services.MapService("count.Counter", r => r.Tags.Contains("counter"));
});

var app = builder.Build();
```

The service name specified by the client is usually the default (`""`) or a package-qualified name of a service in your app. However, nothing prevents the client using arbitrary values to check app health.

### Configure health checks execution interval

Health checks are run immediately when `Check` is called. `Watch` is a streaming method and has a different behavior than `Check`: The long running stream reports health checks results over time by periodically executing `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher` to gather health results. By default, the publisher:

* Waits 5 seconds after app startup before running health checks.
* Runs health checks every 30 seconds.

Publisher intervals can be configured using `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions` at startup:

```csharp
builder.Services.Configure<HealthCheckPublisherOptions>(options =>
{
    options.Delay = TimeSpan.Zero;
    options.Period = TimeSpan.FromSeconds(10);
});
```

## Call gRPC health checks service

The `Grpc.HealthCheck` package includes a client for gRPC health checks:

```csharp
var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = new Health.HealthClient(channel);

var response = await client.CheckAsync(new HealthCheckRequest());
var status = response.Status;
```

There are two methods on the `Health` service:

* `Check` is a unary method for getting the current health status. Health checks are executed immediately when `Check` is called. The server returns a `NOT_FOUND` error response if the client requests an unknown service name. This can happen at app startup if health results haven't been published yet.
* `Watch` is a streaming method that reports changes in health status over time. `Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher` is periodically executed to gather health results. The server returns an `Unknown` status if the client requests an unknown service name.

The `Grpc.HealthCheck` client can be used in a client factory approach:

```csharp
builder.Services
    .AddGrpcClient<Health.HealthClient>(o =>
    {
        o.Address = new Uri("https://localhost:5001");
    });
```
In the previous example, a client factory for `Health.HealthClient` instances is registered with the dependency injection system. Then, these instances are injected into services for executing health check calls.

For more information, see gRPC client factory integration in .NET.

## Additional resources

* Health checks in ASP.NET Core
* gRPC health checking protocol
* `Grpc.AspNetCore.HealthChecks`
* `Grpc.HealthCheck`
