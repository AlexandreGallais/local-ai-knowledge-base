---
title: "Handle errors in ASP.NET Core (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/error-handling.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core (part 3 of 4)

## UseStatusCodePages

By default, an ASP.NET Core app doesn't provide a status code page for HTTP error status codes, such as *404 - Not Found*. When the app sets an HTTP 400-599 error status code that doesn't have a body, it returns the status code and an empty response body. To enable default text-only handlers for common error status codes, call `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages*` in `Program.cs`:

```csharp
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStatusCodePages();
```
Call `UseStatusCodePages` before request handling middleware. For example, call `UseStatusCodePages` before the static file middleware and the endpoints middleware.

When `UseStatusCodePages` isn't used, navigating to a URL without an endpoint returns a browser-dependent error message indicating the endpoint can't be found. When `UseStatusCodePages` is called, the browser returns the following response:

```console
Status Code: 404; Not Found
```

`UseStatusCodePages` isn't typically used in production because it returns a message that isn't useful to users.

> **Note:**
> The status code pages middleware does **not** catch exceptions. To provide a custom error handling page, use the exception handler page.

### UseStatusCodePages with format string

To customize the response content type and text, use the overload of `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages*` that takes a content type and format string:

```csharp
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// using static System.Net.Mime.MediaTypeNames;
app.UseStatusCodePages(Text.Plain, "Status Code Page: {0}");
```
In the preceding code, `{0}` is a placeholder for the error code.

`UseStatusCodePages` with a format string isn't typically used in production because it returns a message that isn't useful to users.

### UseStatusCodePages with lambda

To specify custom error-handling and response-writing code, use the overload of `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePages*` that takes a lambda expression:

```csharp
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStatusCodePages(async statusCodeContext =>
{
    // using static System.Net.Mime.MediaTypeNames;
    statusCodeContext.HttpContext.Response.ContentType = Text.Plain;

    await statusCodeContext.HttpContext.Response.WriteAsync(
        $"Status Code Page: {statusCodeContext.HttpContext.Response.StatusCode}");
});
```
`UseStatusCodePages` with a lambda isn't typically used in production because it returns a message that isn't useful to users.

### UseStatusCodePagesWithRedirects

The `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithRedirects*` extension method:

* Sends a 302 - Found status code to the client.
* Redirects the client to the error handling endpoint provided in the URL template. The error handling endpoint typically displays error information and returns HTTP 200.

```csharp
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStatusCodePagesWithRedirects("/StatusCode/{0}");
```
The URL template can include a `{0}` placeholder for the status code, as shown in the preceding code. If the URL template starts with `~` (tilde), the `~` is replaced by the app's `PathBase`. When specifying an endpoint in the app, create an MVC view or Razor page for the endpoint.

This method is commonly used when the app:

* Should redirect the client to a different endpoint, usually in cases where a different app processes the error. For web apps, the client's browser address bar reflects the redirected endpoint.
* Shouldn't preserve and return the original status code with the initial redirect response.

### UseStatusCodePagesWithReExecute

The `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*` extension method:

* Generates the response body by re-executing the request pipeline using an alternate path.
* Does not alter the status code before or after re-executing the pipeline.

The new pipeline execution may alter the response's status code, as the new pipeline has full control of the status code. If the new pipeline does not alter the status code, the original status code will be sent to the client.

```csharp
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStatusCodePagesWithReExecute("/StatusCode/{0}");
```
If an endpoint within the app is specified, create an MVC view or Razor page for the endpoint.

This method is commonly used when the app should:

* Process the request without redirecting to a different endpoint. For web apps, the client's browser address bar reflects the originally requested endpoint.
* Preserve and return the original status code with the response.

The URL template must start with `/` and may include a placeholder `{0}` for the status code. To pass the status code as a query-string parameter, pass a second argument into `UseStatusCodePagesWithReExecute`. For example:

```csharp
var app = builder.Build();  
app.UseStatusCodePagesWithReExecute("/StatusCode", "?statusCode={0}");
```
The endpoint that processes the error can get the original URL that generated the error, as shown in the following example:

```csharp
[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
public class StatusCodeModel : PageModel
{
    public int OriginalStatusCode { get; set; }

    public string? OriginalPathAndQuery { get; set; }

    public void OnGet(int statusCode)
    {
        OriginalStatusCode = statusCode;

        var statusCodeReExecuteFeature =
            HttpContext.Features.Get<IStatusCodeReExecuteFeature>();

        if (statusCodeReExecuteFeature is not null)
        {
            OriginalPathAndQuery = $"{statusCodeReExecuteFeature.OriginalPathBase}"
                                    + $"{statusCodeReExecuteFeature.OriginalPath}"
                                    + $"{statusCodeReExecuteFeature.OriginalQueryString}";

        }
    }
}
```
Similar to `UseExceptionHandler`, only the request path is modified, and the route data is cleared. Request data such as headers (including the referrer), HTTP method, and items are reused as-is on `HttpContext.Request`. Original path and query string details can be retrieved using `Microsoft.AspNetCore.Diagnostics.IStatusCodeReExecuteFeature`.

> **Important:**
> Because the request's original HTTP method is preserved during pipeline re-execution, an error occurring during an HTTP POST request re-executes the status code endpoint with the POST method. If the error-handling endpoint is constrained to GET requests (for example, an MVC controller action with `[HttpGet]`), the endpoint returns `405 Method Not Allowed`. In Razor Pages, a page without an `OnPost` handler renders the page on POST without running the `OnGet` initialization logic. Ensure status code handling endpoints accommodate the HTTP methods used by the application (for example, implementing `OnPost` alongside `OnGet` so error details are populated for POST requests), and apply `[IgnoreAntiforgeryToken]` if the error page should accept re-executed POST requests without requiring antiforgery token validation.

Since this middleware can re-execute the request pipeline:

* Middlewares need to handle reentrancy with the same request. This normally means either cleaning up their state after calling `_next` or caching their processing on the `HttpContext` to avoid redoing it. When dealing with the request body, this either means buffering or caching the results like the Form reader.
* Scoped services remain the same.

Re-execution runs routing again, followed only by the middleware registered after the status code pages middleware. Middleware registered before `UseStatusCodePagesWithReExecute` doesn't run again for the re-executed request. For example, if `Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter*` is called before `UseStatusCodePagesWithReExecute`, endpoint-specific rate limiting policies aren't applied to the re-executed endpoint. To have middleware such as the rate limiter evaluate the re-executed endpoint, call `UseStatusCodePagesWithReExecute` before `UseRouting` and register that middleware after `UseRouting`:

```csharp
app.UseStatusCodePagesWithReExecute("/StatusCode/{0}");
app.UseRouting();
app.UseRateLimiter();
```

For more information, see Rate limiting middleware in ASP.NET Core.

## Disable status code pages

To disable status code pages for an MVC controller or action method, use the [SkipStatusCodePages] attribute.

To disable status code pages for specific requests in a Razor Pages handler method or in an MVC controller, use `Microsoft.AspNetCore.Diagnostics.IStatusCodePagesFeature`:

```csharp
public void OnGet()
{
    var statusCodePagesFeature =
        HttpContext.Features.Get<IStatusCodePagesFeature>();

    if (statusCodePagesFeature is not null)
    {
        statusCodePagesFeature.Enabled = false;
    }
}
```
## Exception-handling code

Code in exception handling pages can also throw exceptions. Production error pages should be tested thoroughly and take extra care to avoid throwing exceptions of their own.

### Response headers

Once the headers for a response are sent:

* The app can't change the response's status code.
* Any exception pages or handlers can't run. The response must be completed or the connection aborted.

## Server exception handling

In addition to the exception handling logic in an app, the HTTP server implementation can handle some exceptions. If the server catches an exception before response headers are sent, the server sends a `500 - Internal Server Error` response without a response body. If the server catches an exception after response headers are sent, the server closes the connection. Requests that aren't handled by the app are handled by the server. Any exception that occurs when the server is handling the request is handled by the server's exception handling. The app's custom error pages, exception handling middleware, and filters don't affect this behavior.

## Startup exception handling

Only the hosting layer can handle exceptions that take place during app startup. The host can be configured to capture startup errors and capture detailed errors.

The hosting layer can show an error page for a captured startup error only if the error occurs after host address/port binding. If binding fails:

* The hosting layer logs a critical exception.
* The dotnet process crashes.
* No error page is displayed when the HTTP server is Kestrel.

When running on IIS (or Azure App Service) or IIS Express, a *502.5 - Process Failure* is returned by the ASP.NET Core Module if the process can't start. For more information, see Troubleshoot ASP.NET Core on Azure App Service and IIS.

## Database error page

The Database developer page exception filter `Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter*` captures database-related exceptions that can be resolved by using Entity Framework Core migrations. When these exceptions occur, an HTML response is generated with details of possible actions to resolve the issue. This page is enabled only in the `Development` environment. The following code adds the Database developer page exception filter:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddRazorPages();
```
## Exception filters

In MVC apps, exception filters can be configured globally or on a per-controller or per-action basis. In Razor Pages apps, they can be configured globally or per page model. These filters handle any unhandled exceptions that occur during the execution of a controller action or another filter. For more information, see Filters in ASP.NET Core.

Exception filters are useful for trapping exceptions that occur within MVC actions, but they're not as flexible as the built-in exception handling middleware, `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`. We recommend using `UseExceptionHandler`, unless you need to perform error handling differently based on which MVC action is chosen.

## Model state errors

For information about how to handle model state errors, see Model binding and Model validation.
