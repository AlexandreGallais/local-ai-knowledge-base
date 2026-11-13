---
title: "Use HttpContext in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/use-http-context.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use HttpContext in ASP.NET Core

-->
-->

`Microsoft.AspNetCore.Http.HttpContext` encapsulates all information about an individual HTTP request and response. An `HttpContext` instance is initialized when an HTTP request is received. The `HttpContext` instance is accessible by middleware and app frameworks such as Blazor Web Apps, Web API controllers, Razor Pages, SignalR, gRPC, and more.

## `HttpRequest`

`Microsoft.AspNetCore.Http.HttpContext.Request` provides access to `Microsoft.AspNetCore.Http.HttpRequest`. `HttpRequest` has information about the incoming HTTP request, and it's initialized when an HTTP request is received by the server. `HttpRequest` isn't read-only, and middleware can change request values in the middleware pipeline.

Commonly used members on `HttpRequest` include:

|Property|Description|Example|
|--|--|--|--|
|`Microsoft.AspNetCore.Http.HttpRequest.Path`|The request path.|`/en/article/getstarted`|
|`Microsoft.AspNetCore.Http.HttpRequest.Method`|The request method.|`GET`|
|`Microsoft.AspNetCore.Http.HttpRequest.Headers`|A collection of request headers.|`user-agent=Edge``x-custom-header=MyValue`|
|`Microsoft.AspNetCore.Http.HttpRequest.RouteValues`|A collection of route values. The collection is set when the request is matched to a route.|`language=en``article=getstarted`|
|`Microsoft.AspNetCore.Http.HttpRequest.Query`|A collection of query values parsed from `Microsoft.AspNetCore.Http.HttpRequest.QueryString`.|`filter=hello``page=1`|
|HttpRequest.ReadFormAsync())|A method that reads the request body as a form and returns a form values collection. For information about why `ReadFormAsync` should be used to access form data, see Prefer ReadFormAsync over Request.Form.|`email=user@example.com`|
|`Microsoft.AspNetCore.Http.HttpRequest.Body`|A `System.IO.Stream` for reading the request body.|UTF-8 JSON payload|

### Get request headers

`Microsoft.AspNetCore.Http.HttpRequest.Headers` provides access to the request headers sent with the HTTP request. There are two ways to access headers using this collection:

* Provide the header name to the indexer on the header collection. The header name isn't case-sensitive. The indexer can access any header value.
* The header collection also has properties for getting and setting commonly used HTTP headers. The properties provide a fast, IntelliSense driven way to access headers.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpRequest request) =>
{
    var userAgent = request.Headers.UserAgent;
    var customHeader = request.Headers["x-custom-header"];

    return Results.Ok(new { userAgent = userAgent, customHeader = customHeader });
});

app.Run();
```

For information on efficiently handling headers that appear more than once, see A brief look at StringValues.

### Read request body

An HTTP request can include a request body. The request body is data associated with the request, such as the content of an HTML form, UTF-8 JSON payload, or a file.

`Microsoft.AspNetCore.Http.HttpRequest.Body` allows the request body to be read with `System.IO.Stream`:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/uploadstream", async (IConfiguration config, HttpContext context) =>
{
    var filePath = Path.Combine(config["StoredFilesPath"], Path.GetRandomFileName());

    await using var writeStream = File.Create(filePath);
    await context.Request.Body.CopyToAsync(writeStream);
});

app.Run();
```

`HttpRequest.Body` can be read directly or used with other APIs that accept stream.

> **Note:**
> Minimal APIs supports binding `Microsoft.AspNetCore.Http.HttpRequest.Body` directly to a `System.IO.Stream` parameter.

#### Enable request body buffering

The request body can only be read once, from beginning to end. Forward-only reading of the request body avoids the overhead of buffering the entire request body and reduces memory usage. However, in some scenarios, there's a need to read the request body multiple times. For example, middleware might need to read the request body and then rewind it so it's available for the endpoint.

The `Microsoft.AspNetCore.Http.HttpRequestRewindExtensions.EnableBuffering*` extension method enables buffering of the HTTP request body and is the recommended way to enable multiple reads. Because a request can be any size, `EnableBuffering` supports options for buffering large request bodies to disk, or rejecting them entirely.

The middleware in the following example:

* Enables multiple reads with `EnableBuffering`. It must be called before reading the request body.
* Reads the request body.
* Rewinds the request body to the start so other middleware or the endpoint can read it.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =>
{
    context.Request.EnableBuffering();
    await ReadRequestBody(context.Request.Body);
    context.Request.Body.Position = 0;
    
    await next.Invoke();
});

app.Run();
```

#### BodyReader

An alternative way to read the request body is to use the `Microsoft.AspNetCore.Http.HttpRequest.BodyReader` property. The `BodyReader` property exposes the request body as a `System.IO.Pipelines.PipeReader`. This API is from I/O pipelines, an advanced, high-performance way to read the request body.

The reader directly accesses the request body and manages memory on the caller's behalf. Unlike `HttpRequest.Body`, the reader doesn't copy request data into a buffer. However, a reader is more complicated to use than a stream and should be used with caution.

For information on how to read content from `BodyReader`, see I/O pipelines PipeReader.

## `HttpResponse`

`Microsoft.AspNetCore.Http.HttpContext.Response` provides access to `Microsoft.AspNetCore.Http.HttpResponse`. `HttpResponse` is used to set information on the HTTP response sent back to the client.

Commonly used members on `HttpResponse` include:

|Property|Description|Example|
|--|--|--|--|
|`Microsoft.AspNetCore.Http.HttpResponse.StatusCode`|The response code. Must be set before writing to the response body.|`200`|
|`Microsoft.AspNetCore.Http.HttpResponse.ContentType`|The response `content-type` header. Must be set before writing to the response body.|`application/json`|
|`Microsoft.AspNetCore.Http.HttpResponse.Headers`|A collection of response headers. Must be set before writing to the response body.|`server=Kestrel``x-custom-header=MyValue`|
|`Microsoft.AspNetCore.Http.HttpResponse.Body`|A `System.IO.Stream` for writing the response body.|Generated web page|

### Set response headers

`Microsoft.AspNetCore.Http.HttpResponse.Headers` provides access to the response headers sent with the HTTP response. There are two ways to access headers using this collection:

* Provide the header name to the indexer on the header collection. The header name isn't case-sensitive. The indexer can access any header value.
* Use the header collection properties for getting and setting commonly used HTTP headers. The properties provide a fast, IntelliSense driven way to access headers.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpResponse response) =>
{
    response.Headers.CacheControl = "no-cache";
    response.Headers["x-custom-header"] = "Custom value";

    return Results.File(File.OpenRead("helloworld.txt"));
});

app.Run();
```

An app can't modify headers after the response has started. Once the response starts, the headers are sent to the client. A response is started by flushing the response body or calling `Microsoft.AspNetCore.Http.HttpResponse.StartAsync(System.Threading.CancellationToken)`. The `Microsoft.AspNetCore.Http.HttpResponse.HasStarted` property indicates whether the response has started. An error is thrown when attempting to modify headers after the response has started:

> System.InvalidOperationException: Headers are read-only, response has already started.

> **Note:**
> Unless response buffering is enabled, all write operations (for example, `Microsoft.AspNetCore.Http.HttpResponseWritingExtensions.WriteAsync*`) flush the response body internally and mark the response as started. Response buffering is disabled by default.

### Write response body

An HTTP response can include a response body. The response body is data associated with the response, such as generated web page content, UTF-8 JSON payload, or a file.

`Microsoft.AspNetCore.Http.HttpResponse.Body` allows the response body to be written with `System.IO.Stream`:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/downloadfile", async (IConfiguration config, HttpContext context) =>
{
    var filePath = Path.Combine(config["StoredFilesPath"], "helloworld.txt");

    await using var fileStream = File.OpenRead(filePath);
    await fileStream.CopyToAsync(context.Response.Body);
});

app.Run();
```

`HttpResponse.Body` can be written directly or used with other APIs that write to a stream.

#### BodyWriter

An alternative way to write the response body is to use the `Microsoft.AspNetCore.Http.HttpResponse.BodyWriter` property. The `BodyWriter` property exposes the response body as a `System.IO.Pipelines.PipeWriter`. This API is from I/O pipelines, and it's an advanced, high-performance way to write the response.

The writer provides direct access to the response body and manages memory on the caller's behalf. Unlike `HttpResponse.Body`, the write doesn't copy request data into a buffer. However, a writer is more complicated to use than a stream and writer code should be thoroughly tested.

For information on how to write content to `BodyWriter`, see I/O pipelines PipeWriter.

### Set response trailers

HTTP/2 and HTTP/3 support response trailers. Trailers are headers sent with the response after the response body is complete. Because trailers are sent after the response body, trailers can be added to the response at any time.

The following code sets trailers using `Microsoft.AspNetCore.Http.ResponseTrailerExtensions.AppendTrailer*`:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpResponse response) =>
{
    // Write body
    response.WriteAsync("Hello world");

    if (response.SupportsTrailers())
    {
        response.AppendTrailer("trailername", "TrailerValue");
    }
});

app.Run();
```

## `RequestAborted`

The `Microsoft.AspNetCore.Http.HttpContext.RequestAborted` cancellation token can be used to notify that the HTTP request has been aborted by the client or server. The cancellation token <example-value> be passed to long-running tasks so they can be canceled if the request is aborted. For example, aborting a database query or HTTP request to get data to return in the response.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var httpClient = new HttpClient();
app.MapPost("/books/{bookId}", async (int bookId, HttpContext context) =>
{
    var stream = await httpClient.GetStreamAsync(
        $"http://contoso/books/{bookId}.json", context.RequestAborted);

    // Proxy the response as JSON
    return Results.Stream(stream, "application/json");
});

app.Run();
```

The `RequestAborted` cancellation token doesn't need to be used for request body read operations because reads always throw immediately when the request is aborted. The `RequestAborted` token is also usually unnecessary when writing response bodies, because writes immediately no-op when the request is aborted.

In some cases, passing the `RequestAborted` token to write operations can be a convenient way to force a write loop to exit early with an `System.OperationCanceledException`. However, it's typically better to pass the `RequestAborted` token into any asynchronous operations responsible for retrieving the response body content instead.

> **Note:**
> Minimal APIs supports binding `Microsoft.AspNetCore.Http.HttpContext.RequestAborted` directly to a `System.Threading.CancellationToken` parameter.

## `Abort()`

The `Microsoft.AspNetCore.Http.HttpContext.Abort` method can be used to abort an HTTP request from the server. Aborting the HTTP request immediately triggers the `Microsoft.AspNetCore.Http.HttpContext.RequestAborted` cancellation token and sends a notification to the client that the server has aborted the request.

The middleware in the following example:

* Adds a custom check for malicious requests.
* Aborts the HTTP request if the request is malicious.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =>
{
    if (RequestAppearsMalicious(context.Request))
    {
        // Malicious requests don't even deserve an error response (e.g. 400).
        context.Abort();
        return;
    }

    await next.Invoke();
});

app.Run();
```

## `User`

The `Microsoft.AspNetCore.Http.HttpContext.User` property is used to get or set the user, represented by `System.Security.Claims.ClaimsPrincipal`, for the request. The `System.Security.Claims.ClaimsPrincipal` is typically set by ASP.NET Core authentication.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/user/current", [Authorize] async (HttpContext context) =>
{
    var user = await GetUserAsync(context.User.Identity.Name);
    return Results.Ok(user);
});

app.Run();
```

> **Note:**
> Minimal APIs supports binding `Microsoft.AspNetCore.Http.HttpContext.User` directly to a `System.Security.Claims.ClaimsPrincipal` parameter.

## `Features`

The `Microsoft.AspNetCore.Http.HttpContext.Features` property provides access to the collection of feature interfaces for the current request. Since the feature collection is mutable even within the context of a request, middleware can be used to modify the collection and add support for additional features. Some advanced features are only available by accessing the associated interface through the feature collection.

The following example:

* Gets `Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinRequestBodyDataRateFeature` from the features collection.
* Sets `Microsoft.AspNetCore.Server.Kestrel.Core.Features.IHttpMinResponseDataRateFeature.MinDataRate` to null. This removes the minimum data rate that the request body must be sent by the client for this HTTP request.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/long-running-stream", async (HttpContext context) =>
{
    var feature = context.Features.Get<IHttpMinRequestBodyDataRateFeature>();
    if (feature != null)
    {
        feature.MinDataRate = null;
    }

    // await and read long-running stream from request body.
    await Task.Yield();
});

app.Run();
```

For more information about using request features and `HttpContext`, see Request Features in ASP.NET Core.
