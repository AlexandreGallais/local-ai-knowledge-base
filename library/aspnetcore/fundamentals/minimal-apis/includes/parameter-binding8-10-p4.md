---
title: "parameter-binding8-10 (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/includes/parameter-binding8-10.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# parameter-binding8-10 (part 4 of 4)

## Custom Binding

There are three ways to customize parameter binding:

1. For route, query, and header binding sources, bind custom types by adding a static `TryParse` method for the type.
1. Control the binding process by implementing a `BindAsync` method on a type.
1. For advanced scenarios, implement the `Microsoft.AspNetCore.Http.IBindableFromHttpContext`1` interface to provide custom binding logic directly from the `HttpContext`.

### TryParse

`TryParse` has two APIs:

```csharp
public static bool TryParse(string value, out T result);
public static bool TryParse(string value, IFormatProvider provider, out T result);
```

The following code displays `Point: 12.3, 10.1` with the URI `/map?Point=12.3,10.1`:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// GET /map?Point=12.3,10.1
app.MapGet("/map", (Point point) => $"Point: {point.X}, {point.Y}");

app.Run();

public class Point
{
    public double X { get; set; }
    public double Y { get; set; }

    public static bool TryParse(string? value, IFormatProvider? provider,
                                out Point? point)
    {
        // Format is "(12.3,10.1)"
        var trimmedValue = value?.TrimStart('(').TrimEnd(')');
        var segments = trimmedValue?.Split(',',
                StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (segments?.Length == 2
            && double.TryParse(segments[0], out var x)
            && double.TryParse(segments[1], out var y))
        {
            point = new Point { X = x, Y = y };
            return true;
        }

        point = null;
        return false;
    }
}
```
### BindAsync

`BindAsync` has the following APIs:

```csharp
public static ValueTask<T?> BindAsync(HttpContext context, ParameterInfo parameter);
public static ValueTask<T?> BindAsync(HttpContext context);
```

The following code displays `SortBy:xyz, SortDirection:Desc, CurrentPage:99` with the URI `/products?SortBy=xyz&SortDir=Desc&Page=99`:

```csharp
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// GET /products?SortBy=xyz&SortDir=Desc&Page=99
app.MapGet("/products", (PagingData pageData) => $"SortBy:{pageData.SortBy}, " +
       $"SortDirection:{pageData.SortDirection}, CurrentPage:{pageData.CurrentPage}");

app.Run();

public class PagingData
{
    public string? SortBy { get; init; }
    public SortDirection SortDirection { get; init; }
    public int CurrentPage { get; init; } = 1;

    public static ValueTask<PagingData?> BindAsync(HttpContext context,
                                                   ParameterInfo parameter)
    {
        const string sortByKey = "sortBy";
        const string sortDirectionKey = "sortDir";
        const string currentPageKey = "page";

        Enum.TryParse<SortDirection>(context.Request.Query[sortDirectionKey],
                                     ignoreCase: true, out var sortDirection);
        int.TryParse(context.Request.Query[currentPageKey], out var page);
        page = page == 0 ? 1 : page;

        var result = new PagingData
        {
            SortBy = context.Request.Query[sortByKey],
            SortDirection = sortDirection,
            CurrentPage = page
        };

        return ValueTask.FromResult<PagingData?>(result);
    }
}

public enum SortDirection
{
    Default,
    Asc,
    Desc
}
```

### Custom parameter binding with `IBindableFromHttpContext`

ASP.NET Core provides support for custom parameter binding in Minimal APIs using the `Microsoft.AspNetCore.Http.IBindableFromHttpContext`1` interface. This interface, introduced with C# 11's static abstract members, allows you to create types that can be bound from an HTTP context directly in route handler parameters.

```csharp
public interface IBindableFromHttpContext<TSelf>
    where TSelf : class, IBindableFromHttpContext<TSelf>
{
    static abstract ValueTask<TSelf?> BindAsync(HttpContext context, ParameterInfo parameter);
}
```

By implementing the `Microsoft.AspNetCore.Http.IBindableFromHttpContext`1`, you can create custom types that handle their own binding logic from the `HttpContext`. When a route handler includes a parameter of this type, the framework automatically calls the static `BindAsync` method to create the instance:

```csharp
using CustomBindingExample;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/", () => "Hello, IBindableFromHttpContext example!");

app.MapGet("/custom-binding", (CustomBoundParameter param) =>
{
    return $"Value from custom binding: {param.Value}";
});

app.MapGet("/combined/{id}", (int id, CustomBoundParameter param) =>
{
    return $"ID: {id}, Custom Value: {param.Value}";
});
```
The following is an example implementation of a custom parameter that binds from an HTTP header:

```csharp
using System.Reflection;

namespace CustomBindingExample;

public class CustomBoundParameter : IBindableFromHttpContext<CustomBoundParameter>
{
    public string Value { get; init; } = default!;

    public static ValueTask<CustomBoundParameter?> BindAsync(HttpContext context, ParameterInfo parameter)
    {
        // Custom binding logic here
        // This example reads from a custom header
        var value = context.Request.Headers["X-Custom-Header"].ToString();
        
        // If no header was provided, you could fall back to a query parameter
        if (string.IsNullOrEmpty(value))
        {
            value = context.Request.Query["customValue"].ToString();
        }
        
        return ValueTask.FromResult<CustomBoundParameter?>(new CustomBoundParameter 
        {
            Value = value
        });
    }
}
```
You can also implement validation within your custom binding logic:

```csharp

using CustomBindingExample;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/", () => "Hello, IBindableFromHttpContext example!");

app.MapGet("/custom-binding", (CustomBoundParameter param) =>
{
    return $"Value from custom binding: {param.Value}";
});

app.MapGet("/combined/{id}", (int id, CustomBoundParameter param) =>
{
    return $"ID: {id}, Custom Value: {param.Value}";
});
app.MapGet("/validated", (ValidatedParameter param) =>
{
    if (string.IsNullOrEmpty(param.Value))
    {
        return Results.BadRequest("Value cannot be empty");
    }
    
    return Results.Ok($"Validated value: {param.Value}");
});

app.Run();
```
View or download the sample code (how to download)

## Binding failures

When binding fails, the framework logs a debug message and returns various status codes to the client depending on the failure mode.

|Failure mode|Nullable Parameter Type|Binding Source|Status code|
|--|--|--|--|
|`{ParameterType}.TryParse` returns `false` |yes|route/query/header|400|
|`{ParameterType}.BindAsync` returns `null` |yes|custom|400|
|`{ParameterType}.BindAsync` throws |doesn't matter|custom|500|
| Failure to deserialize JSON body |doesn't matter|body|400|
| Wrong content type (not `application/json`) |doesn't matter|body|415|

When `ThrowOnBadRequest` is `false`, endpoints that have a filter pipeline run their filters after a parameter-check failure (such as failed route, query, or header parsing, or a missing required parameter), allowing a filter to observe the `400` status code and replace the response body. Endpoint filters don't run for body-reading failures (such as malformed JSON or unsupported content types) or for binding exceptions. For more information, see Filters and parameter binding failures.

## Binding Precedence

The rules for determining a binding source from a parameter:

1. Explicit attribute defined on parameter (From* attributes) in the following order:
    1. Route values: `[FromRoute]`
    1. Query string: `[FromQuery]`
    1. Header: `[FromHeader]`
    1. Body: `[FromBody]`
    1. Form: `[FromForm]`
    1. Service: `[FromServices]`
    1. Parameter values: `[AsParameters]`
1. Special types
    1. `HttpContext`
    1. `HttpRequest` (`HttpContext.Request`)
    1. `HttpResponse` (`HttpContext.Response`)
    1. `ClaimsPrincipal` (`HttpContext.User`)
    1. `CancellationToken` (`HttpContext.RequestAborted`)
    1. `IFormCollection` (`HttpContext.Request.Form`)
    1. `IFormFileCollection` (`HttpContext.Request.Form.Files`)
    1. `IFormFile` (`HttpContext.Request.Form.Files[paramName]`))
    1. `Stream` (`HttpContext.Request.Body`)
    1. `PipeReader` (`HttpContext.Request.BodyReader`)
1. Parameter type has a valid static `BindAsync` method.
1. Parameter type is a string or has a valid static `TryParse` method.
   1. If the parameter name exists in the route template for example, `app.Map("/todo/{id}", (int id) => {});`, then it's bound from the route.
   1. Bound from the query string.
1. If the parameter type is a service provided by dependency injection, it uses that service as the source.
1. The parameter is from the body.

## Configure JSON deserialization options for body binding

The body binding source uses `System.Text.Json` for deserialization. It is ***not*** possible to change this default, but JSON serialization and deserialization options can be configured.

### Configure JSON deserialization options globally

Options that apply globally for an app can be configured by invoking `Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions*`. The following example includes public fields and formats JSON output.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options => {
    options.SerializerOptions.WriteIndented = true;
    options.SerializerOptions.IncludeFields = true;
});

var app = builder.Build();

app.MapPost("/", (Todo todo) => {
    if (todo is not null) {
        todo.Name = todo.NameField;
    }
    return todo;
});

app.Run();

class Todo {
    public string? Name { get; set; }
    public string? NameField;
    public bool IsComplete { get; set; }
}
// If the request body contains the following JSON:
//
// {"nameField":"Walk dog", "isComplete":false}
//
// The endpoint returns the following JSON:
//
// {
//    "name":"Walk dog",
//    "nameField":"Walk dog",
//    "isComplete":false
// }
```
Since the sample code configures both serialization and deserialization, it can read `NameField` and include `NameField` in the output JSON.

### Configure JSON deserialization options for an endpoint

`Microsoft.AspNetCore.Http.HttpRequestJsonExtensions.ReadFromJsonAsync*` has overloads that accept a `System.Text.Json.JsonSerializerOptions` object. The following example includes public fields and formats JSON output.

```csharp
using System.Text.Json;

var app = WebApplication.Create();

var options = new JsonSerializerOptions(JsonSerializerDefaults.Web) { 
    IncludeFields = true, 
    WriteIndented = true
};

app.MapPost("/", async (HttpContext context) => {
    if (context.Request.HasJsonContentType()) {
        var todo = await context.Request.ReadFromJsonAsync<Todo>(options);
        if (todo is not null) {
            todo.Name = todo.NameField;
        }
        return Results.Ok(todo);
    }
    else {
        return Results.BadRequest();
    }
});

app.Run();

class Todo
{
    public string? Name { get; set; }
    public string? NameField;
    public bool IsComplete { get; set; }
}
// If the request body contains the following JSON:
//
// {"nameField":"Walk dog", "isComplete":false}
//
// The endpoint returns the following JSON:
//
// {
//    "name":"Walk dog",
//    "isComplete":false
// }
```
Since the preceding code applies the customized options only to deserialization, the output JSON excludes `NameField`.

## Read the request body

Read the request body directly using a `Microsoft.AspNetCore.Http.HttpContext` or `Microsoft.AspNetCore.Http.HttpRequest` parameter:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/uploadstream", async (IConfiguration config, HttpRequest request) =>
{
    var filePath = Path.Combine(config["StoredFilesPath"], Path.GetRandomFileName());

    await using var writeStream = File.Create(filePath);
    await request.BodyReader.CopyToAsync(writeStream);
});

app.Run();
```
The preceding code:

* Accesses the request body using `Microsoft.AspNetCore.Http.HttpRequest.BodyReader`.
* Copies the request body to a local file.
