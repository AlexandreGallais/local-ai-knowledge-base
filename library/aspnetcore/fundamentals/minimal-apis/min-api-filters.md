---
title: "Filters in Minimal API apps (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/min-api-filters.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Filters in Minimal API apps

-->
-->

By Fiyaz Bin Hasan, Martin Costello, and Rick Anderson

Minimal API filters allow developers to implement business logic that supports the following tasks:

* Run code before and after the endpoint handler
* Inspect and modify parameters provided during an endpoint handler invocation
* Intercept the response behavior of an endpoint handler

Filters are helpful in many scenarios:

* Validate request parameters and body sent to an endpoint
* Log information about the request and response
* Validate a request targets a supported API version

This article describes how to use filters in your Minimal API apps, such as for validating request data sent to your app and logging the response.

## Work with filters

Filters are registered by providing a Delegate that takes a EndpointFilterInvocationContext and returns a EndpointFilterDelegate. The `EndpointFilterInvocationContext` provides access to the `HttpContext` of the request and an `Arguments` list. The list specifies the arguments passed to the handler in the order in which they appear in the declaration of the handler.

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

string ColorName(string color) => $"Color specified: {color}!";

app.MapGet("/colorSelector/{color}", ColorName)
    .AddEndpointFilter(async (invocationContext, next) =>
    {
        var color = invocationContext.GetArgument<string>(0);

        if (color == "Red")
        {
            return Results.Problem("Red not allowed!");
        }
        return await next(invocationContext);
    });

app.Run();
```

The preceding code:

* Calls the `AddEndpointFilter` extension method to add a filter to the `/colorSelector/{color}` endpoint.
* Returns the color specified, except for the value `"Red"`.
* Returns Results.Problem when the `/colorSelector/Red` is requested.
* Uses `next` as the `EndpointFilterDelegate` and `invocationContext` as the `EndpointFilterInvocationContext` to invoke the next filter in the pipeline, or the request delegate if the last filter is already invoked.

The filter runs before the endpoint handler. When multiple `AddEndpointFilter` invocations are made on a handler:

* The execution order of filter code called _before_ the call to `EndpointFilterDelegate` (`next`) is First In, First Out (FIFO).
* The execution order of filter code called _after_ the call to `EndpointFilterDelegate` (`next`) is First In, Last Out (FILO).

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () =>
    {
        app.Logger.LogInformation("             Endpoint");
        return "Test of multiple filters";
    })
    .AddEndpointFilter(async (efiContext, next) =>
    {
        app.Logger.LogInformation("Before first filter");
        var result = await next(efiContext);
        app.Logger.LogInformation("After first filter");
        return result;
    })
    .AddEndpointFilter(async (efiContext, next) =>
    {
        app.Logger.LogInformation(" Before 2nd filter");
        var result = await next(efiContext);
        app.Logger.LogInformation(" After 2nd filter");
        return result;
    })
    .AddEndpointFilter(async (efiContext, next) =>
    {
        app.Logger.LogInformation("     Before 3rd filter");
        var result = await next(efiContext);
        app.Logger.LogInformation("     After 3rd filter");
        return result;
    });

app.Run();
```

In the preceding code, the filters and endpoint log the following output:

```dotnetcli
Before first filter
    Before 2nd filter
        Before 3rd filter
            Endpoint
        After 3rd filter
    After 2nd filter
After first filter
```

The following code uses filters that implement the `IEndpointFilter` interface:

```csharp
using Filters.EndpointFilters;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () =>
    {
        app.Logger.LogInformation("Endpoint");
        return "Test of multiple filters";
    })
    .AddEndpointFilter<AEndpointFilter>()
    .AddEndpointFilter<BEndpointFilter>()
    .AddEndpointFilter<CEndpointFilter>();

app.Run();
```

In the preceding code, the logs for the filters and handlers show the run order:

```dotnetcli
AEndpointFilter Before next
BEndpointFilter Before next
CEndpointFilter Before next
      Endpoint
CEndpointFilter After next
BEndpointFilter After next
AEndpointFilter After next
```

Filters that implement the `IEndpointFilter` interface are shown in the following example:

```csharp

namespace Filters.EndpointFilters;

public abstract class ABCEndpointFilters : IEndpointFilter
{
    protected readonly ILogger Logger;
    private readonly string _methodName;

    protected ABCEndpointFilters(ILoggerFactory loggerFactory)
    {
        Logger = loggerFactory.CreateLogger<ABCEndpointFilters>();
        _methodName = GetType().Name;
    }

    public virtual async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        Logger.LogInformation("{MethodName} Before next", _methodName);
        var result = await next(context);
        Logger.LogInformation("{MethodName} After next", _methodName);
        return result;
    }
}

class AEndpointFilter : ABCEndpointFilters
{
    public AEndpointFilter(ILoggerFactory loggerFactory) : base(loggerFactory) { }
}

class BEndpointFilter : ABCEndpointFilters
{
    public BEndpointFilter(ILoggerFactory loggerFactory) : base(loggerFactory) { }
}

class CEndpointFilter : ABCEndpointFilters
{
    public CEndpointFilter(ILoggerFactory loggerFactory) : base(loggerFactory) { }
}
```

## Validate an object with a filter

Consider a filter that validates a `Todo` object:

```csharp
app.MapPut("/todoitems/{id}", async (Todo inputTodo, int id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;
    
    await db.SaveChangesAsync();

    return Results.NoContent();
}).AddEndpointFilter(async (efiContext, next) =>
{
    var tdparam = efiContext.GetArgument<Todo>(0);

    var validationError = Utilities.IsValid(tdparam);

    if (!string.IsNullOrEmpty(validationError))
    {
        return Results.Problem(validationError);
    }
    return await next(efiContext);
});
```

In the preceding code:

* The `EndpointFilterInvocationContext` object provides access to the parameters associated with a particular request issued to the endpoint via the `GetArguments` method.
* The filter is registered by using a `delegate` that takes a `EndpointFilterInvocationContext` and returns a `EndpointFilterDelegate`.

In addition to being passed as delegates, filters can be registered by implementing the `IEndpointFilter` interface. The following code shows the preceding filter encapsulated in a class that implements `IEndpointFilter`:

```csharp
public class TodoIsValidFilter : IEndpointFilter
{
    private ILogger _logger;

    public TodoIsValidFilter(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<TodoIsValidFilter>();
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext efiContext, 
        EndpointFilterDelegate next)
    {
        var todo = efiContext.GetArgument<Todo>(0);

        var validationError = Utilities.IsValid(todo!);

        if (!string.IsNullOrEmpty(validationError))
        {
            _logger.LogWarning(validationError);
            return Results.Problem(validationError);
        }
        return await next(efiContext);
    }
}
```

Filters that implement the `IEndpointFilter` interface can resolve dependencies from Dependency Injection (DI), as shown in the previous code. Although filters can resolve dependencies from DI, filters themselves **can't** be resolved from DI.

The `ToDoIsValidFilter` is applied to the following endpoints:

```csharp
app.MapPut("/todoitems2/{id}", async (Todo inputTodo, int id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
}).AddEndpointFilter<TodoIsValidFilter>();

app.MapPost("/todoitems", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
}).AddEndpointFilter<TodoIsValidFilter>();
```

The following filter validates the `Todo` object and modifies the `Name` property:

```csharp
public class TodoIsValidUcFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext efiContext, 
        EndpointFilterDelegate next)
    {
        var todo = efiContext.GetArgument<Todo>(0);
        todo.Name = todo.Name!.ToUpper();

        var validationError = Utilities.IsValid(todo!);

        if (!string.IsNullOrEmpty(validationError))
        {
            return Results.Problem(validationError);
        }
        return await next(efiContext);
    }
}
```

## Register a filter by using an endpoint filter factory

In some scenarios, it might be necessary to cache some of the information provided in the MethodInfo in a filter. Suppose you want to verify that the handler attached to an endpoint filter has a first parameter that evaluates to a `Todo` type.

```csharp
app.MapPut("/todoitems/{id}", async (Todo inputTodo, int id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;
    
    await db.SaveChangesAsync();

    return Results.NoContent();
}).AddEndpointFilterFactory((filterFactoryContext, next) =>
{
    var parameters = filterFactoryContext.MethodInfo.GetParameters();
    if (parameters.Length >= 1 && parameters[0].ParameterType == typeof(Todo))
    {
        return async invocationContext =>
        {
            var todoParam = invocationContext.GetArgument<Todo>(0);

            var validationError = Utilities.IsValid(todoParam);

            if (!string.IsNullOrEmpty(validationError))
            {
                return Results.Problem(validationError);
            }
            return await next(invocationContext);
        };
    }
    return invocationContext => next(invocationContext); 
});
```

In the preceding code:

* The `EndpointFilterFactoryContext` object provides access to the MethodInfo associated with the endpoint's handler.
* The signature of the handler is examined by inspecting `MethodInfo` for the expected type signature. If the expected signature is found, the validation filter is registered onto the endpoint. This factory pattern is useful to register a filter that depends on the signature of the target endpoint handler.
* If a matching signature isn't found, a pass-through filter is registered.

## Filters and parameter binding failures

Endpoint filters can run when a parameter-check failure occurs, such as a failed route, query, or header parse, or a missing required parameter. When a filter pipeline is built for an endpoint, `ThrowOnBadRequest` is `false`, and a parameter check fails, the framework:

* Sets `HttpContext.Response.StatusCode` to `400`.
* Invokes the filter pipeline.
* Skips the route handler. The innermost step of the pipeline returns an empty result instead of calling the handler whenever the response status code is `400` or greater.

Endpoint filters don't run for body-reading failures (such as malformed JSON or unsupported media types) or when an exception is thrown during parameter binding (such as from a custom `BindAsync` method); in those cases, the framework returns or throws before invoking the filter pipeline.

A filter therefore sees the failed request and can replace the empty `400` with a response body of its own:

```csharp
app.MapGet("/products/{id}", (Guid id) => TypedResults.Ok(id))
    .AddEndpointFilter(async (context, next) =>
    {
        if (context.HttpContext.Response.StatusCode >= StatusCodes.Status400BadRequest)
        {
            return TypedResults.Problem(
                title: "The request couldn't be bound.",
                statusCode: context.HttpContext.Response.StatusCode);
        }

        return await next(context);
    });
```

Test the status code with `>=` rather than `== 400`. That's the same comparison the framework uses to decide whether to skip the handler, and a filter that runs earlier in the pipeline can set a different code.

Because parameter binding did not fully succeed, values in `Microsoft.AspNetCore.Http.EndpointFilterInvocationContext.Arguments` might only be partially bound. A filter that inspects arguments should check the status code first before relying on argument values.

## Observe binding failures in the Development environment

`Microsoft.AspNetCore.Routing.RouteHandlerOptions.ThrowOnBadRequest` controls whether the framework throws `Microsoft.AspNetCore.Http.BadHttpRequestException` in addition to writing a `Debug`-level log entry when it handles an invalid request. It defaults to the value of `Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsDevelopment*`, so it's `true` in the `Development` environment and `false` in other environments.

In the `Development` environment with the default value of `true`, the exception reaches the developer exception page before a filter can respond. Set `Microsoft.AspNetCore.Routing.RouteHandlerOptions.ThrowOnBadRequest` to `false` to receive the `400` response that the filter can observe:

```csharp
builder.Services.Configure<RouteHandlerOptions>(options =>
{
    options.ThrowOnBadRequest = false;
});
```

No change is needed in other environments, where `false` is already the default.

An endpoint whose filter factories all return `next` unchanged—so that no filter pipeline is actually built—no longer runs its route handler after a parameter-binding failure. In earlier releases, that configuration set the `400` status code and then invoked the handler anyway with unbound argument values. For more information, see Refactor param binding failure handling in RequestDelegate (`dotnet/aspnetcore` #64539). (Please don't comment on closed issues and PRs.)
