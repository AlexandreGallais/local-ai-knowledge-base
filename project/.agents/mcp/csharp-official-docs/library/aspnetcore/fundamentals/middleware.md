---
title: "ASP.NET Core middleware (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/middleware/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core middleware

Middleware is software that's assembled into an app pipeline to handle requests and responses. Each middleware:

* Chooses whether to pass the request to the next middleware in the pipeline.
* Can perform work before and after the next middleware in the pipeline.

Request delegates are used to build the request pipeline. The request delegates handle each HTTP request.

Configure request delegates by using the `Microsoft.AspNetCore.Builder.RunExtensions.Run*`, `Microsoft.AspNetCore.Builder.MapExtensions.Map*`, and `Microsoft.AspNetCore.Builder.UseExtensions.Use*` extension methods. You can specify an individual request delegate inline as an anonymous method (called inline middleware) or define it in a reusable class. These inline anonymous methods or reusable classes are called *middleware* or *middleware components*. Each middleware in the request pipeline is responsible for invoking the next middleware in the pipeline or short-circuiting the pipeline. When a middleware short-circuits, it's called a *terminal middleware* because it prevents further middleware from processing the request.

For more information about the difference between request pipelines in ASP.NET Core and ASP.NET 4.x with additional middleware samples, see Migrate HTTP modules to ASP.NET Core middleware.

## Role of middleware by app type

Server-side Blazor, Razor Pages, and MVC process browser requests on the server with middleware. The guidance in this article applies to these types of apps.

Standalone Blazor WebAssembly apps run entirely on the client and don't process requests with a middleware pipeline. The guidance in this article doesn't apply to standalone Blazor WebAssembly apps.

## Middleware code analysis

For more information about ASP.NET Core's compiler platform analyzers that inspect app code for quality, see Diagnostic Code Analysis in ASP.NET Core Apps.

## Create a middleware pipeline with `WebApplication`

The ASP.NET Core request pipeline consists of a sequence of request delegates, called one after the other. The following diagram demonstrates the concept. The thread of execution follows the black arrows.

Each delegate can perform operations before and after the next delegate. Exception-handling delegates should be called early in the pipeline, so they can catch exceptions that occur in later stages of the pipeline.

> **Note:**
> To experiment locally with the code examples in this section, create an ASP.NET Core app using the **ASP.NET Core Empty** project template. If using the .NET CLI, the template short name is `web` (`dotnet new web`).

The simplest ASP.NET Core app calls `Microsoft.AspNetCore.Builder.RunExtensions.Run*` to set up a single terminal middleware as an anonymous function request delegate to handle requests without a request pipeline.

In the following example:

* The call to `Microsoft.AspNetCore.Builder.RunExtensions.Run*` is invoked on every request and writes ":::no-loc text="Hello world!":::" to the response.
* The call to `Microsoft.AspNetCore.Builder.WebApplication.Run*` at the end of the code block runs the app and blocks the calling thread until host shutdown.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello world!");
});

app.Run();
```

Response when accessing the app in a browser at its launch URL:

> :::no-loc text="Hello world!":::

Chain multiple request delegates together with `Microsoft.AspNetCore.Builder.UseExtensions.Use*`. The `next` parameter represents the next delegate in the pipeline. You can typically perform actions both before and after the `next` delegate.

The following example demonstrates:

* Two `Microsoft.AspNetCore.Builder.UseExtensions.Use*` calls, each writing to the console:
  * Where work can be performed that can write to the response (`context.Response`, `Microsoft.AspNetCore.Http.HttpResponse`).
  * Where work can be performed that doesn't write to the response after the `next` parameter is invoked.
* A terminal request delegate with a call to `Microsoft.AspNetCore.Builder.RunExtensions.Run*` that writes ":::no-loc text="Hello world!":::" to the response.
* A final `Microsoft.AspNetCore.Builder.UseExtensions.Use*` call, which never executes because it follows the `Microsoft.AspNetCore.Builder.RunExtensions.Run*` terminal request delegate.
* A call to `Microsoft.AspNetCore.Builder.WebApplication.Run*` at the end of the code block to run the app and block the calling thread until host shutdown.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =>
{
    Console.WriteLine("Work that can write to the response. (1)");
    await next.Invoke(context);
    Console.WriteLine("Work that doesn't write to the response. (1)");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("Work that can write to the response. (2)");
    await next.Invoke(context);
    Console.WriteLine("Work that doesn't write to the response. (2)");
});

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello world!");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("This statement isn't reached. (3)");
    await next.Invoke(context);
    Console.WriteLine("This statement isn't reached. (3)");
});

app.Run();
```

In the app's console window when the app is run:

> :::no-loc text="Work that can write to the response. (1)":::
> :::no-loc text="Work that can write to the response. (2)":::
> :::no-loc text="Work that doesn't write to the response. (2)":::
> :::no-loc text="Work that doesn't write to the response. (1)":::

*Short-circuiting* the request pipeline is often desirable because it avoids unnecessary work. For example, static file middleware can act as a *terminal middleware* by processing a request for a static file and short-circuiting the rest of the pipeline. Middleware added to the pipeline before the terminal middleware still processes code after their `next.Invoke` statements. If you don't plan to call `next.Invoke` because your goal is to terminate the pipeline, use a `Run` delegate instead of calling the `Microsoft.AspNetCore.Builder.UseExtensions.Use*` extension method.

Don't call `next.Invoke` during or after the response is sent to the client. After an `Microsoft.AspNetCore.Http.HttpResponse` is started, changes result in an exception. For example, setting headers or a response status code throw an exception after the response starts. Writing to the response body after calling `next` may:

* Cause a protocol violation, such as writing more bytes to the response than the stated response's content length (`Content-Length` header value).
* Corrupt the body format, such as writing an HTML footer to a CSS file.

To determine if the response has started, check the value of `Microsoft.AspNetCore.Http.HttpResponse.HasStarted`.

For more information, see Short-circuit middleware after routing.

## `Run` delegate

A `Microsoft.AspNetCore.Builder.RunExtensions.Run*` delegate doesn't receive a `next` parameter. The first `Run` delegate always terminates the pipeline. `Run` is also a convention, and some middleware might expose `Run` methods that execute at the end of the pipeline.

Any `Microsoft.AspNetCore.Builder.UseExtensions.Use*` or `Microsoft.AspNetCore.Builder.RunExtensions.Run*` delegates after the first `Microsoft.AspNetCore.Builder.RunExtensions.Run*` delegate aren't called.

## Branch the middleware pipeline

`Microsoft.AspNetCore.Builder.MapExtensions.Map*` extensions are used as a convention to branch the request processing pipeline. `Microsoft.AspNetCore.Builder.MapExtensions.Map*` branches the request pipeline based on matches of the given request path. If the request path starts with the given path, the branch executes.

In the following example, `HandleMap1` is called for requests to `/map1`, and `HandleMap2` is called for requests to `/map2`:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/map1", HandleMap1);
app.Map("/map2", HandleMap2);

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate!");
});

app.Run();

private static void HandleMap1(IApplicationBuilder app)
{
    app.Run(async context =>
    {
        await context.Response.WriteAsync("Map 1");
    });
}

private static void HandleMap2(IApplicationBuilder app)
{
    app.Run(async context =>
    {
        await context.Response.WriteAsync("Map 2");
    });
}
```

The following table shows the requests and responses using the preceding code.

Request | Response
--- | ---
`/` | :::no-loc text="Hello from the non-Map delegate.":::
`/map1` | :::no-loc text="Map 1":::
`/map2` | :::no-loc text="Map 2":::
`/map3` | :::no-loc text="Hello from the non-Map delegate.":::

When `Microsoft.AspNetCore.Builder.MapExtensions.Map*` is used, the matched path segments are removed from `Microsoft.AspNetCore.Http.HttpRequest.Path` and appended to `Microsoft.AspNetCore.Http.HttpRequest.PathBase` for each request.

`Microsoft.AspNetCore.Builder.MapExtensions.Map*` can match multiple segments at once:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/map1/segment1", HandleMultipleSegments);

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate.");
});

app.Run();

private static void HandleMultipleSegments(IApplicationBuilder app)
{
    app.Run(async context =>
    {
        await context.Response.WriteAsync("Processing '/map1/segment1'");
    });
}
```

The following table shows the requests and responses using the preceding code.

Request | Response
--- | ---
`/` | :::no-loc text="Hello from the non-Map delegate.":::
`/map1/segment1` | :::no-loc text="Processing '/map1/segment1'":::

`Microsoft.AspNetCore.Builder.MapExtensions.Map*` supports nesting:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/level1", level1App => {
    level1App.Map("/level2a", level2AApp => {
        level2AApp.Run(async context =>
        {
            await context.Response.WriteAsync("Processing '/level1/level2a'");
        });
    });
    level1App.Map("/level2b", level2BApp => {
        level2BApp.Run(async context =>
        {
            await context.Response.WriteAsync("Processing '/level1/level2b'");
        });
    });
});

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate!");
});

app.Run();
```

The following table shows the requests and responses using the preceding code.

Request | Response
--- | ---
`/` | :::no-loc text="Hello from the non-Map delegate.":::
`/level1/level2a` | :::no-loc text="Processing '/level1/level2a'":::
`/level1/level2b` | :::no-loc text="Processing '/level1/level2b'":::

`Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen*` branches the request pipeline based on the result of the given predicate. Any predicate of type `Func<HttpContext, bool>` can be used to map requests to a new branch of the pipeline. In the following example, a predicate is used to detect the presence of a query string variable named "`branch`":

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapWhen(context => context.Request.Query.ContainsKey("branch"), HandleBranch);

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate.");
});

app.Run();

private static void HandleBranch(IApplicationBuilder app)
{
    app.Run(async context =>
    {
        var branchVer = context.Request.Query["branch"];
        await context.Response.WriteAsync($"Branch used = '{branchVer}'");
    });
}
```

The following table shows the requests and responses using the preceding code.

Request | Response
--- | ---
`/` | :::no-loc text="Hello from the non-Map delegate.":::
`/?branch=main` | :::no-loc text="Branch used = 'main'":::

`Microsoft.AspNetCore.Builder.UseWhenExtensions.UseWhen*` can branch the request pipeline based on the result of the given predicate. Unlike `Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen*`, the branch is rejoined to the main pipeline if it doesn't contain a terminal middleware:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseWhen(context => context.Request.Query.ContainsKey("branch"),
    appBuilder => HandleBranchAndRejoin(appBuilder));

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello from the non-Map delegate.");
});

app.Run();

void HandleBranchAndRejoin(IApplicationBuilder app)
{
    var logger = app.ApplicationServices.GetRequiredService<ILogger<Program>>();

    app.Use(async (context, next) =>
    {
        var branchVer = context.Request.Query["branch"];
        logger.LogInformation("Branch used = {branchVer}", branchVer.ToString());

        Console.WriteLine("Work that can write to the response.");
        await next.Invoke(context);
        Console.WriteLine("Work that doesn't write to the response.");
    });
}
```

In the preceding example, a response of ":::no-loc text="Hello from the non-Map delegate.":::" is written for all requests. If the request includes a query string variable named "`branch`," its value is logged before the main pipeline is rejoined.
