---
title: "Factory-based middleware activation in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/middleware/extensibility.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Factory-based middleware activation in ASP.NET Core

-->
-->

`Microsoft.AspNetCore.Http.IMiddlewareFactory`/`Microsoft.AspNetCore.Http.IMiddleware` is an extensibility point for middleware activation that offers the following benefits:

* Activation per client request (injection of scoped services)
* Strong typing of middleware

`Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware*` extension methods check if a middleware's registered type implements `Microsoft.AspNetCore.Http.IMiddleware`. If it does, the `Microsoft.AspNetCore.Http.IMiddlewareFactory` instance registered in the container is used to resolve the `Microsoft.AspNetCore.Http.IMiddleware` implementation instead of using the convention-based middleware activation logic. The middleware is registered as a scoped or transient service in the app's service container.

`Microsoft.AspNetCore.Http.IMiddleware` is activated per client request (connection), so scoped services can be injected into the middleware's constructor.

## IMiddleware

`Microsoft.AspNetCore.Http.IMiddleware` defines middleware for the app's request pipeline. The InvokeAsync(HttpContext, RequestDelegate) method handles requests and returns a `System.Threading.Tasks.Task` that represents the execution of the middleware.

Middleware activated by convention:

```csharp
public class ConventionalMiddleware
{
    private readonly RequestDelegate _next;

    public ConventionalMiddleware(RequestDelegate next)
        => _next = next;

    public async Task InvokeAsync(HttpContext context, SampleDbContext dbContext)
    {
        var keyValue = context.Request.Query["key"].ToString();

        if (!string.IsNullOrWhiteSpace(keyValue))
        {
            dbContext.Requests.Add(new Request("Conventional", keyValue));

            await dbContext.SaveChangesAsync();
        }

        await _next(context);
    }
}
```
Middleware activated by `Microsoft.AspNetCore.Http.MiddlewareFactory`:

```csharp
public class FactoryActivatedMiddleware : IMiddleware
{
    private readonly SampleDbContext _dbContext;

    public FactoryActivatedMiddleware(SampleDbContext dbContext)
        => _dbContext = dbContext;

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var keyValue = context.Request.Query["key"].ToString();

        if (!string.IsNullOrWhiteSpace(keyValue))
        {
            _dbContext.Requests.Add(new Request("Factory", keyValue));

            await _dbContext.SaveChangesAsync();
        }

        await next(context);
    }
}
```
Extensions are created for the middleware:

```csharp
public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseConventionalMiddleware(
        this IApplicationBuilder app)
        => app.UseMiddleware<ConventionalMiddleware>();

    public static IApplicationBuilder UseFactoryActivatedMiddleware(
        this IApplicationBuilder app)
        => app.UseMiddleware<FactoryActivatedMiddleware>();
}
```
It isn't possible to pass <example-value> to the factory-activated middleware with `Microsoft.AspNetCore.Builder.UseMiddlewareExtensions.UseMiddleware*`:

```csharp
public static IApplicationBuilder UseFactoryActivatedMiddleware(
    this IApplicationBuilder app, bool option)
{
    // Passing 'option' as an argument throws a NotSupportedException at runtime.
    return app.UseMiddleware<FactoryActivatedMiddleware>(option);
}
```

The factory-activated middleware is added to the built-in container in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<SampleDbContext>
    (options => options.UseInMemoryDatabase("SampleDb"));

builder.Services.AddTransient<FactoryActivatedMiddleware>();
```
Both middleware are registered in the request processing pipeline, also in `Program.cs`:

```csharp
var app = builder.Build();

app.UseConventionalMiddleware();
app.UseFactoryActivatedMiddleware();
```
## IMiddlewareFactory

`Microsoft.AspNetCore.Http.IMiddlewareFactory` provides methods to create middleware. The middleware factory implementation is registered in the container as a scoped service.

The default `Microsoft.AspNetCore.Http.IMiddlewareFactory` implementation, `Microsoft.AspNetCore.Http.MiddlewareFactory`, is found in the Microsoft.AspNetCore.Http package.

## Related content

* View or download sample code (how to download)
* ASP.NET Core middleware
* Middleware activation with a third-party container in ASP.NET Core
