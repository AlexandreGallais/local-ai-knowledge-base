---
title: "route-groups"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/route-groups.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# route-groups

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
