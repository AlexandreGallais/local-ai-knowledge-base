---
title: "Handle errors in ASP.NET Core APIs (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/error-handling-api.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core APIs (part 2 of 2)

## Problem details

Problem Details are not the only response format to describe an HTTP API error, however, they are commonly used to report errors for HTTP APIs.

The problem details service implements the `Microsoft.AspNetCore.Http.IProblemDetailsService` interface, which supports creating problem details in ASP.NET Core. The `Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)` extension method on `Microsoft.Extensions.DependencyInjection.IServiceCollection` registers the default `IProblemDetailsService` implementation.

In ASP.NET Core apps, the following middleware generates problem details HTTP responses when `AddProblemDetails` is called, except when the `Accept` request HTTP header doesn't include one of the content types supported by the registered `Microsoft.AspNetCore.Http.IProblemDetailsWriter` (default: `application/json`):

* `Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware`: Generates a problem details response when a custom handler is not defined.
* `Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware`: Generates a problem details response by default.
* `Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware`: Generates a problem details response in development when the `Accept` request HTTP header doesn't include `text/html`.

#### Minimal APIs

Minimal API apps can be configured to generate problem details response for all HTTP client and server error responses that ***don't have body content yet*** by using the `AddProblemDetails` extension method.

The following code configures the app to generate problem details:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

app.MapGet("/users/{id:int}", (int id) 
    => id <= 0 ? Results.BadRequest() : Results.Ok(new User(id)));

app.MapGet("/", () => "Test by calling /users/{id:int}");

app.Run();

public record User(int Id);
```
For more information on using `AddProblemDetails`, see Problem Details

### Customize bad request handling with `RouteHandlerOptions.ThrowOnBadRequest`

When minimal API parameter binding encounters bad-request failures (such as malformed JSON or type conversion errors), error handling is controlled by `Microsoft.AspNetCore.Routing.RouteHandlerOptions.ThrowOnBadRequest*`:

* In the `Development` environment, `ThrowOnBadRequest` defaults to `true`. Bad-request binding failures throw a `Microsoft.AspNetCore.Http.BadHttpRequestException`, which flows through exception handling middleware (`UseExceptionHandler`) and invokes registered `Microsoft.AspNetCore.Diagnostics.IExceptionHandler` handlers (available in ASP.NET Core 8 and later) or custom exception handlers to produce Problem Details responses.
* In non-Development environments (such as `Production`), `ThrowOnBadRequest` defaults to `false`. Bad-request binding failures write a `400 Bad Request` status code directly without throwing an exception, bypassing custom exception handlers.

For JSON body binding, unsupported request content types throw a `Microsoft.AspNetCore.Http.BadHttpRequestException` with `StatusCode` set to `415` when `ThrowOnBadRequest` is `true` or return `415 Unsupported Media Type` directly when it is `false`. Unhandled exceptions thrown from custom `BindAsync` implementations always propagate regardless of this setting.

To ensure bad-request binding failures throw an exception and trigger your configured exception handlers across all environments, configure `ThrowOnBadRequest`:

```csharp
builder.Services.Configure<RouteHandlerOptions>(options =>
{
    options.ThrowOnBadRequest = true;
});
```

> **Important:**
> When `ThrowOnBadRequest` is enabled, binding failures throw a `Microsoft.AspNetCore.Http.BadHttpRequestException`. In ASP.NET Core 11 and later, `UseExceptionHandler` preserves `BadHttpRequestException.StatusCode` by default in problem details responses. In ASP.NET Core 10 and earlier, unhandled exceptions default to `500 Internal Server Error` unless the handler explicitly preserves `BadHttpRequestException.StatusCode` on both `HttpContext.Response.StatusCode` and the generated `Microsoft.AspNetCore.Mvc.ProblemDetails.Status`. Custom exception handlers or `Microsoft.AspNetCore.Diagnostics.IExceptionHandler` implementations (ASP.NET Core 8 and later) that override the response should still ensure `BadHttpRequestException.StatusCode` is preserved so client errors aren't reported as server failures.

### IProblemDetailsService fallback

In the following code, `httpContext.Response.WriteAsync("Fallback: An error occurred.")` returns an error if the `Microsoft.AspNetCore.Http.IProblemDetailsService` implementation isn't able to generate a `Microsoft.AspNetCore.Mvc.ProblemDetails`:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async httpContext =>
    {
        var pds = httpContext.RequestServices.GetService<IProblemDetailsService>();
        if (pds == null
            || !await pds.TryWriteAsync(new() { HttpContext = httpContext }))
        {
            // Fallback behavior
            await httpContext.Response.WriteAsync("Fallback: An error occurred.");
        }
    });
});

app.MapGet("/exception", () =>
{
    throw new InvalidOperationException("Sample Exception");
});

app.MapGet("/", () => "Test by calling /exception");

app.Run();
```
The preceding code:

* Writes an error message with the fallback code if the `problemDetailsService` is unable to write a `ProblemDetails`. For example, an endpoint where the Accept request header specifies a media type that the `DefaultProblemDetailsWriter` does not support.
* Uses the exception handler middleware.

> **Note:**
> The `DefaultProblemDetailsWriter` supports the following media types in the `Accept` request header:
>
> * `application/json`
> * `application/problem+json`
> * Wildcard types such as `*/*` and `application/*`
>
> Non-JSON media types, such as `application/xml` or `text/html`, are **not** supported and trigger the fallback behavior.

The following sample is similar to the preceding except that it calls the `Status Code Pages middleware`.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseStatusCodePages(statusCodeHandlerApp =>
{
    statusCodeHandlerApp.Run(async httpContext =>
    {
        var pds = httpContext.RequestServices.GetService<IProblemDetailsService>();
        if (pds == null
            || !await pds.TryWriteAsync(new() { HttpContext = httpContext }))
        {
            // Fallback behavior
            await httpContext.Response.WriteAsync("Fallback: An error occurred.");
        }
    });
});

app.MapGet("/users/{id:int}", (int id) =>
{
    return id <= 0 ? Results.BadRequest() : Results.Ok(new User(id));
});

app.MapGet("/", () => "Test by calling /users/{id:int}");

app.Run();

public record User(int Id);
```
#### Controllers

### Problem details service

ASP.NET Core supports creating Problem Details for HTTP APIs using the `Microsoft.AspNetCore.Http.IProblemDetailsService`.

The following code configures the app to generate a problem details response for all HTTP client and server error responses that ***don't have body content yet***:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs._
Consider the API controller from the preceding section, which returns `Microsoft.AspNetCore.Http.HttpResults.BadRequest` when the input is invalid:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Controllers/ValuesController.cs._
A problem details response is generated with the preceding code when any of the following conditions apply:

* An invalid input is supplied.
* The URI has no matching endpoint.
* An unhandled exception occurs.

#### Customize problem details with `CustomizeProblemDetails`

The following code uses `Microsoft.AspNetCore.Http.ProblemDetailsOptions` to set `Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs._
### Implement `ProblemDetailsFactory`

MVC uses `Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory` to produce all instances of `Microsoft.AspNetCore.Mvc.ProblemDetails` and `Microsoft.AspNetCore.Mvc.ValidationProblemDetails`. This factory is used for:

* Client error responses
* Validation failure error responses
* `Microsoft.AspNetCore.Mvc.ControllerBase.Problem*` and `Microsoft.AspNetCore.Mvc.ControllerBase.ValidationProblem*`

To customize the problem details response, register a custom implementation of `Microsoft.AspNetCore.Mvc.Infrastructure.ProblemDetailsFactory` in `Program.cs`:

```csharp
builder.Services.AddControllers();
builder.Services.AddTransient<ProblemDetailsFactory, SampleProblemDetailsFactory>();
```
### Use `ApiBehaviorOptions.ClientErrorMapping`

Use the `Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.ClientErrorMapping` property to configure the contents of the `ProblemDetails` response. For example, the following code in `Program.cs` updates the `Microsoft.AspNetCore.Mvc.ClientErrorData.Link` property for 404 responses:

```csharp
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://httpstatuses.com/404";
    });
```
---

## Additional error handling features

#### Minimal APIs

### Migration from controllers to Minimal APIs

If you're migrating from controller-based APIs to Minimal APIs:

1. **Replace action filters** with endpoint filters or middleware
2. **Replace model validation** with manual validation or custom binding
3. **Replace exception filters** with exception handling middleware
4. **Configure problem details** using `AddProblemDetails()` for consistent error responses

### When to use controller-based error handling

Consider controller-based APIs if you need:

* Complex model validation scenarios
* Centralized exception handling across multiple controllers
* Fine-grained control over error response formatting
* Integration with MVC features like filters and conventions

For detailed information about controller-based error handling, including validation errors, problem details customization, and exception filters, see the Controllers tab sections.

#### Controllers

### Validation failure error response

For web API controllers, MVC responds with a `Microsoft.AspNetCore.Mvc.ValidationProblemDetails` response type when model validation fails. MVC uses the results of `Microsoft.AspNetCore.Mvc.ApiBehaviorOptions.InvalidModelStateResponseFactory` to construct the error response for a validation failure. The following example replaces the default factory with an implementation that also supports formatting responses as XML, in `Program.cs`:

```csharp
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
            new BadRequestObjectResult(context.ModelState)
            {
                ContentTypes =
                {
                    // using static System.Net.Mime.MediaTypeNames;
                    Application.Json,
                    Application.Xml
                }
            };
    })
    .AddXmlSerializerFormatters();
```
### Use exceptions to modify the response

The contents of the response can be modified from outside of the controller using a custom exception and an action filter:

1. Create a well-known exception type named `HttpResponseException`:

```csharp
public class HttpResponseException : Exception
{
    public HttpResponseException(int statusCode, object? value = null) =>
        (StatusCode, Value) = (statusCode, value);

    public int StatusCode { get; }

    public object? Value { get; }
}
```
1. Create an action filter named `HttpResponseExceptionFilter`:

```csharp
public class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
{
    public int Order => int.MaxValue - 10;

    public void OnActionExecuting(ActionExecutingContext context) { }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Exception is HttpResponseException httpResponseException)
        {
            context.Result = new ObjectResult(httpResponseException.Value)
            {
                StatusCode = httpResponseException.StatusCode
            };

            context.ExceptionHandled = true;
        }
    }
}
```
    The preceding filter specifies an `Order` of the maximum integer value minus 10. This `Order` allows other filters to run at the end of the pipeline.

1. In `Program.cs`, add the action filter to the filters collection:

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add<HttpResponseExceptionFilter>();
});
```
### Key <example-value> for controllers

* **Automatic model validation**: Controllers automatically validate model state and return `400 Bad Request` responses for validation failures
* **Exception filters**: Use action filters and exception filters for centralized error handling
* **Built-in problem details**: Configure `ApiBehaviorOptions` for standardized error responses
* **Custom error responses**: Override `InvalidModelStateResponseFactory` for custom validation error formatting

---

## Related content

* How to Use ModelState Validation in ASP.NET Core Web API
* View or download sample code
* Hellang.Middleware.ProblemDetails
