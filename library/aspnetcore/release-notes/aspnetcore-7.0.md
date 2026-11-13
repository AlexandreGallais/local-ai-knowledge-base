---
title: "What's new in ASP.NET Core in .NET 7 (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-7.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 7

This article highlights the most significant changes in ASP.NET Core in .NET 7 with links to relevant documentation.

## Rate limiting middleware in ASP.NET Core

The `Microsoft.AspNetCore.RateLimiting` middleware provides rate limiting middleware. Apps configure rate limiting policies and then attach the policies to endpoints. For more information, see Rate limiting middleware in ASP.NET Core.

## Authentication uses single scheme as DefaultScheme

As part of the work to simplify authentication, when there's only a single authentication scheme registered, it's automatically used as the `Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme` and doesn't need to be specified. For more information, see DefaultScheme.

## MVC and Razor pages

### Support for nullable models in MVC views and Razor Pages

Nullable page or view models are supported to improve the experience when using null state checking with ASP.NET Core apps:

```csharp
@model Product?
```

### Bind with `IParsable<T>.TryParse` in MVC and API Controllers

The `System.IParsable`1.TryParse(System.String,System.IFormatProvider,`0@)` API supports binding controller action parameter values. For more information, see Bind with `IParsable<T>.TryParse`.

### Customize the cookie consent value

In ASP.NET Core versions earlier than 7, the cookie consent validation uses the cookie value `yes` to indicate consent. Now you can specify the value that represents consent. For example, you could use `true` instead of `yes`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
    options.ConsentCookieValue = "true";
});

var app = builder.Build();
```

For more information, see Customize the cookie consent value.

## API controllers

### Parameter binding with DI in API controllers

Parameter binding for API controller actions binds parameters through dependency injection when the type is configured as a service. This means it's no longer required to explicitly apply the `[FromServices]` attribute to a parameter. In the following code, both actions return the time:

```csharp
[Route("[controller]")]
[ApiController]
public class MyController : ControllerBase
{
    public ActionResult GetWithAttribute([FromServices] IDateTime dateTime) 
                                                        => Ok(dateTime.Now);

    [Route("noAttribute")]
    public ActionResult Get(IDateTime dateTime) => Ok(dateTime.Now);
}
```

In rare cases, automatic DI can break apps that have a type in DI that is also accepted in an API controllers action method. It's not common to have a type in DI and as an argument in an API controller action. To disable automatic binding of parameters, set DisableImplicitFromServicesParameters

```csharp
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<IDateTime, SystemDateTime>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.DisableImplicitFromServicesParameters = true;
});

var app = builder.Build();

app.MapControllers();

app.Run();
```

In .NET 7, types in DI are checked at app startup with `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService` to determine if an argument in an API controller action comes from DI or from the other sources.

The new mechanism to infer binding source of API Controller action parameters uses the following rules:

1. A previously specified `BindingInfo.BindingSource` is never overwritten.
1. A complex type parameter, registered in the DI container, is assigned `BindingSource.Services`.
1. A complex type parameter, not registered in the DI container, is assigned `BindingSource.Body`.
1. A parameter with a name that appears as a route value in ***any*** route template is assigned `BindingSource.Path`.
1. All other parameters are `BindingSource.Query`.

### JSON property names in validation errors

By default, when a validation error occurs, model validation produces a `Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary` with the property name as the error key. Some apps, such as single page apps, benefit from using JSON property names for validation errors generated from Web APIs. The following code configures validation to use the `SystemTextJsonValidationMetadataProvider` to use JSON property names:

```csharp
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.ModelMetadataDetailsProviders.Add(new SystemTextJsonValidationMetadataProvider());
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```
The following code configures validation to use the `NewtonsoftJsonValidationMetadataProvider` to use JSON property name when using Json.NET:

```csharp
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.ModelMetadataDetailsProviders.Add(new NewtonsoftJsonValidationMetadataProvider());
}).AddNewtonsoftJson();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```
For more information, see Use JSON property names in validation errors

## Minimal APIs

### Filters in Minimal API apps

Minimal API filters allow developers to implement business logic that supports:

* Running code before and after the route handler.
* Inspecting and modifying parameters provided during a route handler invocation.
* Intercepting the response behavior of a route handler.

Filters can be helpful in the following scenarios:

* Validating the request parameters and body that are sent to an endpoint.
* Logging information about the request and response.
* Validating that a request is targeting a supported API version.

For more information, see Filters in Minimal API apps

### Bind arrays and string values from headers and query strings

In ASP.NET 7, binding query strings to an array of primitive types, string arrays, and StringValues is supported:

```csharp
// Bind query string values to a primitive type array.
// GET  /tags?q=1&q=2&q=3
app.MapGet("/tags", (int[] q) =>
                      $"tag1: {q[0]} , tag2: {q[1]}, tag3: {q[2]}");

// Bind to a string array.
// GET /tags2?names=john&names=jack&names=jane
app.MapGet("/tags2", (string[] names) =>
            $"tag1: {names[0]} , tag2: {names[1]}, tag3: {names[2]}");

// Bind to StringValues.
// GET /tags3?names=john&names=jack&names=jane
app.MapGet("/tags3", (StringValues names) =>
            $"tag1: {names[0]} , tag2: {names[1]}, tag3: {names[2]}");
```

Binding query strings or header values to an array of complex types is supported when the type has `TryParse` implemented. For more information, see Bind arrays and string values from headers and query strings.

For more information, see Add endpoint summary or description.

### Bind the request body as a `Stream` or `PipeReader`

The request body can bind as a `Stream` or `PipeReader` to efficiently support scenarios where the user has to process data and:

* Store the data to blob storage or enqueue the data to a queue provider.
* Process the stored data with a worker process or cloud function.

For example, the data might be enqueued to Azure Queue storage or stored in Azure Blob storage.

For more information, see Bind the request body as a `Stream` or `PipeReader`

### New Results.Stream overloads

We introduced new `Results.Stream` overloads to accommodate scenarios that need access to the underlying HTTP response stream without buffering. These overloads also improve cases where an API streams data to the HTTP response stream, like from Azure Blob Storage. The following example uses ImageSharp to return a reduced size of the specified image:

```csharp
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/process-image/{strImage}", (string strImage, HttpContext http, CancellationToken token) =>
{
    http.Response.Headers.CacheControl = $"public,max-age={TimeSpan.FromHours(24).TotalSeconds}";
    return Results.Stream(stream => ResizeImageAsync(strImage, stream, token), "image/jpeg");
});

async Task ResizeImageAsync(string strImage, Stream stream, CancellationToken token)
{
    var strPath = $"wwwroot/img/{strImage}";
    using var image = await Image.LoadAsync(strPath, token);
    int width = image.Width / 2;
    int height = image.Height / 2;
    image.Mutate(x =>x.Resize(width, height));
    await image.SaveAsync(stream, JpegFormat.Instance, cancellationToken: token);
}
```

For more information, see Stream examples

### Typed results for Minimal APIs

In .NET 6, the `Microsoft.AspNetCore.Http.IResult` interface was introduced to represent values returned from Minimal APIs that don't utilize the implicit support for JSON serializing the returned object to the HTTP response. The static Results class is used to create varying `IResult` objects that represent different types of responses. For example, setting the response status code or redirecting to another URL. The `IResult` implementing framework types returned from these methods were internal however, making it difficult to verify the specific `IResult` type being returned from methods in a unit test.

In .NET 7 the types implementing `IResult` are public, allowing for type assertions when testing. For example:

```csharp
[TestClass()]
public class WeatherApiTests
{
    [TestMethod()]
    public void MapWeatherApiTest()
    {
        var result = WeatherApi.GetAllWeathers();
        Assert.IsInstanceOfType(result, typeof(Ok<WeatherForecast[]>));
    }      
}
```

### Improved unit testability for minimal route handlers

`Microsoft.AspNetCore.Http.IResult` implementation types are now publicly available in the `Microsoft.AspNetCore.Http.HttpResults` namespace. The `IResult` implementation types can be used to unit test minimal route handlers when using named methods instead of lambdas.

The following code uses the `Ok<TValue>` class:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs._
For more information, see `IResult` implementation types.

### New HttpResult interfaces

The following interfaces in the `Microsoft.AspNetCore.Http` namespace provide a way to detect the `IResult` type at runtime, which is a common pattern in filter implementations:

* `Microsoft.AspNetCore.Http.IContentTypeHttpResult`
* `Microsoft.AspNetCore.Http.IFileHttpResult`
* `Microsoft.AspNetCore.Http.INestedHttpResult`
* `Microsoft.AspNetCore.Http.IStatusCodeHttpResult`
* `Microsoft.AspNetCore.Http.IValueHttpResult`
* `Microsoft.AspNetCore.Http.IValueHttpResult`1`

For more information, see IHttpResult interfaces.

### OpenAPI improvements for Minimal APIs

#### `Microsoft.AspNetCore.OpenApi` NuGet package

The `Microsoft.AspNetCore.OpenApi` package allows interactions with OpenAPI specifications for endpoints. The package acts as a link between the OpenAPI models that are defined in the `Microsoft.AspNetCore.OpenApi` package and the endpoints that are defined in Minimal APIs. The package provides an API that examines an endpoint's parameters, responses, and metadata to construct an OpenAPI annotation type that is used to describe an endpoint.

```csharp
app.MapPost("/todoitems/{id}", async (int id, Todo todo, TodoDb db) =>
{
    todo.Id = id;
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
})
.WithOpenApi();
```

#### Call `WithOpenApi` with parameters

The `WithOpenApi` method accepts a function that can be used to modify the OpenAPI annotation. For example, in the following code, a description is added to the first parameter of the endpoint:

```csharp
app.MapPost("/todo2/{id}", async (int id, Todo todo, TodoDb db) =>
{
    todo.Id = id;
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
})
.WithOpenApi(generatedOperation =>
{
    var parameter = generatedOperation.Parameters[0];
    parameter.Description = "The ID associated with the created Todo";
    return generatedOperation;
});
```

#### Provide endpoint descriptions and summaries

Minimal APIs now support annotating operations with descriptions and summaries for OpenAPI spec generation. You can call extension methods `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.WithDescription*` and `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.WithSummary*` or use attributes [EndpointDescription] and [EndpointSummary]).

For more information, see OpenAPI in Minimal API apps

### File uploads using IFormFile and IFormFileCollection

Minimal APIs now support file upload with `IFormFile` and `IFormFileCollection`. The following code uses `Microsoft.AspNetCore.Http.IFormFile` and `Microsoft.AspNetCore.Http.IFormFileCollection` to upload file:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapPost("/upload", async (IFormFile file) =>
{
    var tempFile = Path.GetTempFileName();
    app.Logger.LogInformation(tempFile);
    using var stream = File.OpenWrite(tempFile);
    await file.CopyToAsync(stream);
});

app.MapPost("/upload_many", async (IFormFileCollection myFiles) =>
{
    foreach (var file in myFiles)
    {
        var tempFile = Path.GetTempFileName();
        app.Logger.LogInformation(tempFile);
        using var stream = File.OpenWrite(tempFile);
        await file.CopyToAsync(stream);
    }
});

app.Run();
```
Authenticated file upload requests are supported using an Authorization header, a client certificate, or a cookie header.

There is no built-in support for antiforgery. However, it can be implemented using the `IAntiforgery` service.

### `[AsParameters]` attribute enables parameter binding for argument lists

The `[AsParameters]` attribute enables parameter binding for argument lists. For more information, see Parameter binding for argument lists with `[AsParameters]`.
