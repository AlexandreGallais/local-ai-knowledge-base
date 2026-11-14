---
title: "route-handlers"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis/includes/route-handlers.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# route-handlers

Route handlers are methods that execute when the route matches. Route handlers can be a lambda expression, a local function, an instance method, or a static method. Route handlers can be synchronous or asynchronous.

The following sections provide examples of different route handlers.

### Lambda expression

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/inline", () => "This is an inline lambda");

var handler = () => "This is a lambda variable";

app.MapGet("/", handler);

app.Run();
```

### Local function

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

string LocalFunction() => "This is local function";

app.MapGet("/", LocalFunction);

app.Run();
```

### Instance method

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var handler = new HelloHandler();

app.MapGet("/", handler.Hello);

app.Run();

class HelloHandler
{
    public string Hello()
    {
        return "Hello Instance method";
    }
}
```

### Static method

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", HelloHandler.Hello);

app.Run();

class HelloHandler
{
    public static string Hello()
    {
        return "Hello static method";
    }
}
```

### Endpoint defined outside of Program.cs

Minimal APIs don't have to be located in the _Program.cs_ file. For example, you can set up the structure in the _Program.cs_ file, and define the endpoint in a separate file:

**Program.cs**

```csharp
using MinAPISeparateFile;

var builder = WebApplication.CreateSlimBuilder(args);

var app = builder.Build();

TodoEndpoints.Map(app);

app.Run();
```

**TodoEndpoints.cs**

```csharp
﻿namespace MinAPISeparateFile;

public static class TodoEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("/", async context =>
        {
            // Get all todo items
            await context.Response.WriteAsJsonAsync(new { Message = "All todo items" });
        });

        app.MapGet("/{id}", async context =>
        {
            // Get one todo item
            await context.Response.WriteAsJsonAsync(new { Message = "One todo item" });
        });
    }
}
```

For more information, see the Route groups section later in this article.

### Named endpoints and link generation

You can supply a name for your endpoints to generate URLs that target the endpoint. Using a named endpoint avoids having to hard code paths in an app:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () => "Hello named route")
   .WithName("hi");

app.MapGet("/", (LinkGenerator linker) => 
        $"The link to the hello route is {linker.GetPathByName("hi", values: null)}");

app.Run();
```

The preceding code displays the message _`The link to the hello route is /hello`_ from the `/` (forward slash) endpoint.

#### Criteria for endpoint names

Endpoint names must satisfy the following criteria:

* Endpoint names are case sensitive.
* Endpoint names must be globally unique.
* Endpoint names are used as the OpenAPI operation identifier (ID) when OpenAPI support is enabled. For more information, see Generate OpenAPI documents.

### Route parameters

Route parameters can be captured as part of the route pattern definition:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/users/{userId}/books/{bookId}", 
    (int userId, int bookId) => $"The user id is {userId} and book id is {bookId}");

app.Run();
```

The preceding code returns the message _The user id is 3 and book id is 7_ from the URI `/users/3/books/7`.

The route handler can declare the parameters to capture. When a request is made to a route with parameters declared to capture, the parameters are parsed and passed to the handler. This approach makes it easy to capture the values in a type-safe way. In the preceding code, the `userId` and `bookId` parameters are both type `int`.

In the preceding code, if either route value can't be converted to an `int`, an exception is thrown. The GET request `/users/hello/books/3` throws the following exception:

```output
BadHttpRequestException: Failed to bind parameter "int userId" from "hello".
```

### Wildcard and catch all routes

The following catch all route returns _Routing to hello_ from the `/posts/hello` endpoint:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/posts/{*rest}", (string rest) => $"Routing to {rest}");

app.Run();
```

### Route constraints

Route constraints restrict the matching behavior of a route.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/todos/{id:int}", (int id) => db.Todos.Find(id));
app.MapGet("/todos/{text}", (string text) => db.Todos.Where(t => t.Text.Contains(text)));
app.MapGet("/posts/{slug:regex(^[a-z0-9_-]+$)}", (string slug) => $"Post {slug}");

app.Run();
```

The following table demonstrates the preceding route templates and their behavior.

| Route template | Example matching URI |
|---|---|
| `/todos/{id:int}` | `/todos/1` |
| `/todos/{text}` | `/todos/something` |
| `/posts/{slug:regex(^[a-z0-9_-]+$)}` | `/posts/mypost` |

For more information, see Route constraint reference in Routing in ASP.NET Core.

### Route groups

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
