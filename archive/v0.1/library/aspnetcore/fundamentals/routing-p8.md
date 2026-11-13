---
title: "Routing in ASP.NET Core (part 8 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core (part 8 of 10)

### Problems with route value invalidation

For related information about how required values, such as `controller` and `action`, affect route value invalidation and template default values, see the note in URL generation process.

The following code shows an example of a URL generation scheme that's not supported by routing:

```csharp
app.MapControllerRoute(
    "default",
    "{culture}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    "blog",
    "{culture}/{**slug}",
    new { controller = "Blog", action = "ReadPost" });
```
In the preceding code, the `culture` route parameter is used for localization. The desire is to have the `culture` parameter always accepted as an ambient value. However, the `culture` parameter is not accepted as an ambient value because of the way required values work:

* In the `"default"` route template, the `culture` route parameter is to the left of `controller`, so changes to `controller` won't invalidate `culture`.
* In the `"blog"` route template, the `culture` route parameter is considered to be to the right of `controller`, which appears in the required values.

## Parse URL paths with `LinkParser`

The `Microsoft.AspNetCore.Routing.LinkParser` class adds support for parsing a URL path into a set of route values. The `Microsoft.AspNetCore.Routing.LinkParserEndpointNameAddressExtensions.ParsePathByEndpointName*` method takes an endpoint name and a URL path, and returns a set of route values extracted from the URL path.

In the following example controller, the `GetProduct` action uses a route template of `api/Products/{id}` and has a `Microsoft.AspNetCore.Mvc.RouteAttribute.Name` of `GetProduct`:

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet("{id}", Name = nameof(GetProduct))]
    public IActionResult GetProduct(string id)
    {
        // ...
```
In the same controller class, the `AddRelatedProduct` action expects a URL path, `pathToRelatedProduct`, which can be provided as a query-string parameter:

```csharp
[HttpPost("{id}/Related")]
public IActionResult AddRelatedProduct(
    string id, string pathToRelatedProduct, [FromServices] LinkParser linkParser)
{
    var routeValues = linkParser.ParsePathByEndpointName(
        nameof(GetProduct), pathToRelatedProduct);
    var relatedProductId = routeValues?["id"];

    // ...
```
In the preceding example, the `AddRelatedProduct` action extracts the `id` route value from the URL path. For example, with a URL path of `/api/Products/1`, the `relatedProductId` value is set to `1`. This approach allows the API's clients to use URL paths when referring to resources, without requiring knowledge of how such a URL is structured.

## Configure endpoint metadata

The following links provide information on how to configure endpoint metadata:

* Enable Cors with endpoint routing
* IAuthorizationPolicyProvider sample using a custom `[MinimumAgeAuthorize]` attribute
* Test authentication with the [Authorize] attribute
* `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*`
* Select a scheme with an `[Authorize]` attribute
* Apply policies in MVC and Razor Pages apps
* Role-based authorization in ASP.NET Core

## Host matching in routes with RequireHost

`Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.RequireHost*` applies a constraint to the route which requires the specified host. The `RequireHost` or [Host] parameter can be a:

* Host: `www.domain.com`, matches `www.domain.com` with any port.
* Host with wildcard: `*.domain.com`, matches `www.domain.com`, `subdomain.domain.com`, or `www.subdomain.domain.com` on any port.
* Port: `*:5000`, matches port 5000 with any host.
* Host and port: `www.domain.com:5000` or `*.domain.com:5000`, matches host and port.

Multiple parameters can be specified using `RequireHost` or `[Host]`. The constraint  matches hosts valid for any of the parameters. For example, `[Host("domain.com", "*.domain.com")]` matches `domain.com`, `www.domain.com`, and `subdomain.domain.com`.

The following code uses `RequireHost` to require the specified host on the route:

```csharp
app.MapGet("/", () => "Contoso").RequireHost("contoso.com");
app.MapGet("/", () => "AdventureWorks").RequireHost("adventure-works.com");

app.MapHealthChecks("/healthz").RequireHost("*:8080");
```
The following code uses the `[Host]` attribute on the controller to require any of the specified hosts:

```csharp
[Host("contoso.com", "adventure-works.com")]
public class HostsController : Controller
{
    public IActionResult Index() =>
        View();

    [Host("example.com")]
    public IActionResult Example() =>
        View();
}
```
When the `[Host]` attribute is applied to both the controller and action method:

* The attribute on the action is used.
* The controller attribute is ignored.

> **Warning:**
  > API that relies on the Host header, such as `Microsoft.AspNetCore.Http.HttpRequest.Host` and `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.RequireHost*`, are subject to potential spoofing by clients.
>
> To prevent host and port spoofing, use one of the following approaches:
>
> * Use `Microsoft.AspNetCore.Http.HttpContext.Connection` (`Microsoft.AspNetCore.Http.ConnectionInfo.LocalPort`) where the ports are checked.
> * Employ Host filtering.

## Route groups

The `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup*` extension method helps organize groups of endpoints with a common prefix and reduces repetitive code. Use this method to customize entire groups of endpoints with a single call to methods like `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` and `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata*` that add endpoint metadata.

For example, the following code creates two similar groups of endpoints:

```csharp
app.MapGroup("/public/todos")
    .MapTodosApi()
    .WithTags("Public");

app.MapGroup("/private/todos")
    .MapTodosApi()
    .WithTags("Private")
    .AddEndpointFilterFactory(QueryPrivateTodos)
    .RequireAuthorization();

EndpointFilterDelegate QueryPrivateTodos(EndpointFilterFactoryContext factoryContext, EndpointFilterDelegate next)
{
    var dbContextIndex = -1;

    foreach (var argument in factoryContext.MethodInfo.GetParameters())
    {
        if (argument.ParameterType == typeof(TodoDb))
        {
            dbContextIndex = argument.Position;
            break;
        }
    }

    // Skip filter if the method doesn't have a TodoDb parameter.
    if (dbContextIndex < 0)
    {
        return next;
    }

    return async invocationContext =>
    {
        var dbContext = invocationContext.GetArgument<TodoDb>(dbContextIndex);
        dbContext.IsPrivate = true;

        try
        {
            return await next(invocationContext);
        }
        finally
        {
            // This should only be relevant if you're pooling or otherwise reusing the DbContext instance.
            dbContext.IsPrivate = false;
        }
    };
}
```
```csharp
public static RouteGroupBuilder MapTodosApi(this RouteGroupBuilder group)
{
    group.MapGet("/", GetAllTodos);
    group.MapGet("/{id}", GetTodo);
    group.MapPost("/", CreateTodo);
    group.MapPut("/{id}", UpdateTodo);
    group.MapDelete("/{id}", DeleteTodo);

    return group;
}
```
In this scenario, you can use a relative address for the `Location` header in the `201 Created` result:

```csharp
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace MinApiRouteGroupSample;

public static class TodoEndpoints
{
    public static RouteGroupBuilder MapTodosApi(this RouteGroupBuilder group)
    {
        group.MapGet("/", GetAllTodos);
        group.MapGet("/{id}", GetTodo);
        group.MapPost("/", CreateTodo);
        group.MapPut("/{id}", UpdateTodo);
        group.MapDelete("/{id}", DeleteTodo);

        return group;
    }

    // get all todos
    public static async Task<Ok<List<Todo>>> GetAllTodos(TodoDb database)
    {
        var todos = await database.ToListAsync();
        return TypedResults.Ok(todos);
    }

    // get todo by id
    public static async Task<Results<Ok<Todo>, NotFound>> GetTodo(int id, TodoDb database)
    {
        var todo = await database.FindAsync(id);

        if (todo is null)
            return TypedResults.NotFound();

        return TypedResults.Ok(todo);
    }

    // create todo
    public static async Task<Created<Todo>> CreateTodo(Todo todo, TodoDb database)
    {
        await database.AddAsync(todo);
        await database.SaveChangesAsync();

        return TypedResults.Created($"{todo.Id}", todo);
    }

    // update todo
    public static async Task<Results<NoContent, NotFound>> UpdateTodo(Todo todo, TodoDb database)
    {
        var existingTodo = await database.FindAsync(todo.Id);

        if (existingTodo is null)
            return TypedResults.NotFound();

        existingTodo.Title = todo.Title;
        existingTodo.Description = todo.Description;
        existingTodo.IsDone = todo.IsDone;

        await database.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    // delete todo
    public static async Task<Results<NoContent, NotFound>> DeleteTodo(int id, TodoDb database)
    {
        var todo = await database.FindAsync(id);

        if (todo is null)
            return TypedResults.NotFound();

        database.Remove(todo);
        await database.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
```
The first group of endpoints matches only requests prefixed with `/public/todos` and are accessible without any authentication. The second group of endpoints matches only requests prefixed with `/private/todos` and require authentication.

`QueryPrivateTodos` is a local function that modifies the `TodoDb` parameters of the route handler, to enable them to access and store private todo data. `QueryPrivateTodos` serves as an endpoint filter factory.

Route groups also support nested groups and complex prefix patterns with route parameters and constraints. In the following example, the route handler mapped to the `user` group can capture the `{org}` and `{group}` route parameters defined in the outer group prefixes.

The prefix can also be empty. This approach can be useful for adding endpoint metadata or filters to a group of endpoints without changing the route pattern.

```csharp
var all = app.MapGroup("").WithOpenApi();
var org = all.MapGroup("{org}");
var user = org.MapGroup("{user}");
user.MapGet("", (string org, string user) => $"{org}/{user}");
```
Adding filters or metadata to a group results in the same behavior as adding them individually to each endpoint (before adding extra filters or metadata that might exist in an inner group or specific endpoint).

```csharp
var outer = app.MapGroup("/outer");
var inner = outer.MapGroup("/inner");

inner.AddEndpointFilter((context, next) =>
{
    app.Logger.LogInformation("/inner group filter");
    return next(context);
});

outer.AddEndpointFilter((context, next) =>
{
    app.Logger.LogInformation("/outer group filter");
    return next(context);
});

inner.MapGet("/", () => "Hi!").AddEndpointFilter((context, next) =>
{
    app.Logger.LogInformation("MapGet filter");
    return next(context);
});
```
In the preceding example, the outer filter logs the incoming request before the inner filter even though the outer filter is added second. Because the filters are applied to different groups, the order that they're added relative to each other doesn't matter. The order in which filters are added matters when applied to the same group or specific endpoint.

A request to `/outer/inner/` logs the following data:

```dotnetcli
/outer group filter
/inner group filter
MapGet filter
```
