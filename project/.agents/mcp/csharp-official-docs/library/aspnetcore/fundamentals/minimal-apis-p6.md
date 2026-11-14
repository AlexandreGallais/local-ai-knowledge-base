---
title: "Minimal APIs quick reference (part 6 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Minimal APIs quick reference (part 6 of 7)

## Json+PipeReader deserialization in Minimal APIs

Starting in .NET 10, the following functional areas of ASP.NET Core use overloads of `System.Text.Json.JsonSerializer.DeserializeAsync*` based on PipeReader instead of Stream:

* Minimal APIs (parameter binding, read request body)
* MVC (input formatters, model)
* The `Microsoft.AspNetCore.Http.HttpRequestJsonExtensions` Extension methods to read the request body as JSON.

For most applications, a transition from Stream to PipeReader provides better performance without requiring changes in application code. But if your application has a custom converter, the converter might not handle `System.Text.Json.Utf8JsonReader.HasValueSequence` correctly. If it doesn't, the result could be errors such as `System.ArgumentOutOfRangeException` or missing data when deserializing. You have the following options for getting your converter to work without PipeReader-related errors.

### Option 1: Temporary workaround

The quick workaround is to go back to using Stream without PipeReader support. To implement this option, set the "Microsoft.AspNetCore.UseStreamBasedJsonParsing" AppContext switch to "true". We recommend that you do this only as a temporary workaround, and update your converter to support `HasValueSequence` as soon as possible. The switch might be removed in .NET 11. Its only purpose was to give developers time to get their converters updated.

### Option 2: A quick fix for `JsonConverter` implementations

For this fix, you allocate an array from the `ReadOnlySequence`. This example shows what the code would look like:

```csharp
public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    var span = reader.HasValueSequence ? reader.ValueSequence.ToArray() : reader.ValueSpan;
    // previous code
}
```

### Option 3: A more complicated but better performing fix

This fix involves setting up a separate code path for the `ReadOnlySequence` handling:

```csharp
public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    if (reader.HasValueSequence)
    {
        reader.ValueSequence;
        // ReadOnlySequence optimized path
    }
    else
    {
        reader.ValueSpan;
        // ReadOnlySpan optimized path
    }
}
```

For more information, see
* `System.Text.Json.Serialization.JsonConverter`
* github.com/dotnet/aspnetcore/pull/62895

## Validation support in Minimal APIs

For an overview of `Microsoft.Extensions.Validation` validation, including how to register services for Minimal API projects, see Validation in ASP.NET Core.

Enabling validation allows the ASP.NET Core runtime to perform validations defined on the:

* Query
* Header
* Request body

Validations are defined using attributes in the `System.ComponentModel.DataAnnotations` namespace.

When a parameter to a Minimal API endpoint is a class or record type, validation attributes are automatically applied. For example:

```csharp
public record Product(
    [Required] string Name, 
    [Range(1, 1000)] int Quantity);
```

Developers customize the behavior of the validation system by:

* Creating custom `System.ComponentModel.DataAnnotations.ValidationAttribute` implementations.
* Implementing the `System.ComponentModel.DataAnnotations.IValidatableObject` interface for complex validation logic.

If validation fails, the runtime returns a `400 - Bad Request` response with details of the validation errors.

### Disable validation for specific endpoints

Validation can be disabled for specific endpoints by using the `DisableValidation` extension method, as in the following example:

```csharp
app.MapPost("/products", 
        ([EvenNumber(ErrorMessage = "Product ID must be even")] int productId, 
        [Required] string name) => TypedResults.Ok(productId))
    .DisableValidation();
```

### Customize validation error responses using `IProblemDetailsService`

Customize error responses from Minimal API validation logic with an `Microsoft.AspNetCore.Http.IProblemDetailsService` implementation. Register this service in the app's service collection to enable more consistent and user-specific error responses.

To implement custom validation error responses:

* Implement `Microsoft.AspNetCore.Http.IProblemDetailsService` or use the default implementation.
* Register the service in the service container.
* The validation system automatically uses the registered service to format validation error responses.

For more information on customizing validation error responses with `IProblemDetailsService`, see Create responses in Minimal API applications.

### Localizing validation messages

Validation error messages and the display names of validated parameters and properties are localized by `Microsoft.Extensions.Validation`.

Register the standard ASP.NET Core localization services together with the validation pipeline in the `Program` file:

```csharp
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.AddValidation();
```

By default, lookup keys are resolved against the resources of the type that declares the validated member. Top-level parameters on Minimal API endpoints don't have a containing type, so use `ValidationOptions.LocalizerProvider` to resolve messages for them from a shared resource file:

```csharp
builder.Services.AddValidation(options =>
{
    options.LocalizerProvider = (_, factory) => factory.Create(typeof(ValidationResources));
});
```

For the message lookup key <example-value>, custom message formatting, and loading messages from sources other than resource files, see Validation in ASP.NET Core.

## Responses

Route handlers support the following types of return values:

* `IResult` based: Includes `Task<IResult>`, `ValueTask<IResult>`, and F# `Async<IResult>`.
* `string`: Includes `Task<string>`, `ValueTask<string>`, and F# `Async<string>`.
* `T` (Any other type): Includes `Task<T>`, `ValueTask<T>`, and F# `Async<'T>`.

Return value | Behavior | Content-Type
--- | --- | ---
`IResult` | The framework calls `Microsoft.AspNetCore.Http.IResult.ExecuteAsync*`| Decided by the `IResult` implementation.
`string` | The framework writes the string directly to the response. | `text/plain`
`T` (Any other type) | The framework JSON-serializes the response. | `application/json`

For more information on route handler return values, see Create responses in Minimal API applications.

### Example return values

#### String return values

```csharp
app.MapGet("/hello", () => "Hello World");
```

#### JSON return values

```csharp
app.MapGet("/hello", () => new { Message = "Hello World" });
```

#### Return `TypedResults`

The following code returns `Microsoft.AspNetCore.Http.TypedResults`:

```csharp
app.MapGet("/hello", () => TypedResults.Ok(new Message() {  Text = "Hello World!" }));
```

Returning `TypedResults` is preferred to returning `Microsoft.AspNetCore.Http.Results`. For more information, see `TypedResults` versus `Results`.

#### `IResult` return values

```csharp
app.MapGet("/hello", () => Results.Ok(new { Message = "Hello World" }));
```

The following example uses the built-in result types to customize the response:

```csharp
app.MapGet("/api/todoitems/{id}", async (int id, TodoDb db) =>
         await db.Todos.FindAsync(id) 
         is Todo todo
         ? Results.Ok(todo) 
         : Results.NotFound())
   .Produces<Todo>(StatusCodes.Status200OK)
   .Produces(StatusCodes.Status404NotFound);
```

#### JSON

```csharp
app.MapGet("/hello", () => Results.Json(new { Message = "Hello World" }));
```

#### Custom Status Code

```csharp
app.MapGet("/405", () => Results.StatusCode(405));
```

#### Text

```csharp
app.MapGet("/text", () => Results.Text("This is some text"));
```

#### Stream

```csharp
var proxyClient = new HttpClient();
app.MapGet("/pokemon", async () => 
{
    var stream = await proxyClient.GetStreamAsync("http://contoso/pokedex.json");
    // Proxy the response as JSON
    return Results.Stream(stream, "application/json");
});
```

See Create responses in Minimal API applications for more examples.

#### Redirect

```csharp
app.MapGet("/old-path", () => Results.Redirect("/new-path"));
```

#### File

```csharp
app.MapGet("/download", () => Results.File("myfile.text"));
```

### Built-in results

Common result helpers exist in the `Microsoft.AspNetCore.Http.Results` and `Microsoft.AspNetCore.Http.TypedResults` static classes. Returning `TypedResults` is preferred to returning `Results`. For more information, see `TypedResults` versus `Results`.

### Modifying Headers

Use the `HttpResponse` object to modify response headers:

```csharp
app.MapGet("/", (HttpContext context) => {
    // Set a custom header
    context.Response.Headers["X-Custom-Header"] = "CustomValue";

    // Set a known header
    context.Response.Headers.CacheControl = $"public,max-age=3600";

    return "Hello World";
});
```

### Customizing results

Applications can control responses by implementing a custom `Microsoft.AspNetCore.Http.IResult` type. The following code is an example of an HTML result type:

```csharp
﻿using System.Net.Mime;
using System.Text;
static class ResultsExtensions
{
    public static IResult Html(this IResultExtensions resultExtensions, string html)
    {
        ArgumentNullException.ThrowIfNull(resultExtensions);

        return new HtmlResult(html);
    }
}

class HtmlResult : IResult
{
    private readonly string _html;

    public HtmlResult(string html)
    {
        _html = html;
    }

    public Task ExecuteAsync(HttpContext httpContext)
    {
        httpContext.Response.ContentType = MediaTypeNames.Text.Html;
        httpContext.Response.ContentLength = Encoding.UTF8.GetByteCount(_html);
        return httpContext.Response.WriteAsync(_html);
    }
}
```

We recommend adding an extension method to `Microsoft.AspNetCore.Http.IResultExtensions` to make these custom results more discoverable.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/html", () => Results.Extensions.Html(@$"<!doctype html>
<html>
    <head><title>miniHTML</title></head>
    <body>
        <h1>Hello World</h1>
        <p>The time on the server is {DateTime.Now:O}</p>
    </body>
</html>"));

app.Run();
```

### Typed results

The `Microsoft.AspNetCore.Http.IResult` interface can represent values returned from Minimal APIs that don't utilize the implicit support for JSON serializing the returned object to the HTTP response. The static Results class is used to create varying `IResult` objects that represent different types of responses. For example, setting the response status code or redirecting to another URL.

The types implementing `IResult` are public, allowing for type assertions when testing. For example:

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

You can look at the return types of the corresponding methods on the static TypedResults class to find the correct public `IResult` type to cast to.

See Create responses in Minimal API applications for more examples.

## Filters

For more information, see Filters in Minimal API apps.

## Authorization

Routes can be protected using authorization policies. These can be declared via the `[Authorize]` attribute or by using the `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` method:

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebRPauth.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization(o => o.AddPolicy("AdminsOnly", 
                                  b => b.RequireClaim("admin", "true")));

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

app.UseAuthorization();

app.MapGet("/auth", [Authorize] () => "This endpoint requires authorization.");
app.MapGet("/", () => "This endpoint doesn't require authorization.");
app.MapGet("/Identity/Account/Login", () => "Sign in page at this endpoint.");

app.Run();
```

The preceding code can be written with `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*`:

```csharp
app.MapGet("/auth", () => "This endpoint requires authorization")
   .RequireAuthorization();
```

The following sample uses policy-based authorization:

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebRPauth.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization(o => o.AddPolicy("AdminsOnly", 
                                  b => b.RequireClaim("admin", "true")));

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

app.UseAuthorization();

app.MapGet("/admin", [Authorize("AdminsOnly")] () => 
                             "The /admin endpoint is for admins only.");

app.MapGet("/admin2", () => "The /admin2 endpoint is for admins only.")
   .RequireAuthorization("AdminsOnly");

app.MapGet("/", () => "This endpoint doesn't require authorization.");
app.MapGet("/Identity/Account/Login", () => "Sign in page at this endpoint.");

app.Run();
```

### Allow unauthenticated users to access an endpoint

The `[AllowAnonymous]`
allows unauthenticated users to access endpoints:

```csharp
app.MapGet("/login", [AllowAnonymous] () => "This endpoint is for all roles.");

app.MapGet("/login2", () => "This endpoint also for all roles.")
   .AllowAnonymous();
```
