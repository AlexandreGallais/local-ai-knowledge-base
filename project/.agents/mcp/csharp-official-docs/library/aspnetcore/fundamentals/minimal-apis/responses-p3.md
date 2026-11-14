---
title: "Create responses in Minimal API applications (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis/responses.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Create responses in Minimal API applications (part 3 of 5)

### Built-in results

Common result helpers exist in the `Microsoft.AspNetCore.Http.Results` and `Microsoft.AspNetCore.Http.TypedResults` static classes. Returning `TypedResults` is preferred to returning `Results`. For more information, see `TypedResults` versus `Results`.

The following sections demonstrate the usage of the common result helpers.

#### JSON

```csharp
app.MapGet("/hello", () => Results.Json(new { Message = "Hello World" }));
```
`Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync*` is an alternative way to return JSON:

```csharp
app.MapGet("/", (HttpContext context) => context.Response.WriteAsJsonAsync
    (new { Message = "Hello World" }));
```
#### Custom Status Code

```csharp
app.MapGet("/405", () => Results.StatusCode(405));
```
#### Internal Server Error

```csharp
app.MapGet("/500", () => Results.InternalServerError("Something went wrong!"));
```
The preceding example returns a 500 status code.

#### Problem and ValidationProblem

```csharp
app.MapGet("/problem", () =>
{
    var extensions = new List<KeyValuePair<string, object?>> { new("test", "value") };
    return TypedResults.Problem("This is an error with extensions", 
                                                extensions: extensions);
});
```
#### Customize validation error responses using IProblemDetailsService

Customize error responses from Minimal API validation logic with an `Microsoft.AspNetCore.Http.IProblemDetailsService` implementation. Register this service in your application's service collection to enable more consistent and user-specific error responses. Support for Minimal API validation was introduced in ASP.NET Core in .NET 10.

To implement custom validation error responses:

* Implement `Microsoft.AspNetCore.Http.IProblemDetailsService` or use the default implementation
* Register the service in the DI container
* The validation system automatically uses the registered service to format validation error responses

The following example shows how to register and configure the `Microsoft.AspNetCore.Http.IProblemDetailsService` to customize validation error responses:

```csharp
using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
    {
        if (context.ProblemDetails.Status == 400)
        {
            context.ProblemDetails.Title = "Validation error occurred";
            context.ProblemDetails.Extensions["support"] = "Contact user@example.com";
            context.ProblemDetails.Extensions["traceId"] = Guid.NewGuid().ToString();
        }
    };
});
```
When a validation error occurs, the `Microsoft.AspNetCore.Http.IProblemDetailsService` will be used to generate the error response, including any customizations added in the `CustomizeProblemDetails` callback.

For a complete app example, see the Minimal API sample app demonstrating how to customize validation error responses using the `Microsoft.AspNetCore.Http.IProblemDetailsService` in ASP.NET Core Minimal APIs.

#### Text

```csharp
app.MapGet("/text", () => Results.Text("This is some text"));
```

#### Stream

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var proxyClient = new HttpClient();
app.MapGet("/pokemon", async () => 
{
    var stream = await proxyClient.GetStreamAsync("http://contoso/pokedex.json");
    // Proxy the response as JSON
    return Results.Stream(stream, "application/json");
});

app.Run();
```

`Results.Stream` overloads allow access to the underlying HTTP response stream without buffering. The following example uses ImageSharp to return a reduced size of the specified image:

```csharp
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("<example-value>", (string strImage, HttpContext http, CancellationToken token) =>
{
    http.Response.Headers.CacheControl = $"public,max-age={TimeSpan.FromHours(24).TotalSeconds}";
    return Results.Stream(stream => ResizeImageAsync(strImage, stream, token), "<example-value>");
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

The following example streams an image from Azure Blob storage:

```csharp
app.MapGet("/stream-image/{containerName}/{blobName}", 
    async (string blobName, string containerName, CancellationToken token) =>
{
    var conStr = builder.Configuration["blogConStr"];
    BlobContainerClient blobContainerClient = new BlobContainerClient(conStr, containerName);
    BlobClient blobClient = blobContainerClient.GetBlobClient(blobName);
    return Results.Stream(await blobClient.OpenReadAsync(cancellationToken: token), "<example-value>");
});
```

The following example streams a video from an Azure Blob:

```csharp
// GET /stream-video/videos/earth.mp4
app.MapGet("/stream-video/{containerName}/{blobName}",
     async (HttpContext http, CancellationToken token, string blobName, string containerName) =>
{
    var conStr = builder.Configuration["blogConStr"];
    BlobContainerClient blobContainerClient = new BlobContainerClient(conStr, containerName);
    BlobClient blobClient = blobContainerClient.GetBlobClient(blobName);
    
    var properties = await blobClient.GetPropertiesAsync(cancellationToken: token);
    
    DateTimeOffset lastModified = properties.Value.LastModified;
    long length = properties.Value.ContentLength;
    
    long etagHash = lastModified.ToFileTime() ^ length;
    var entityTag = new EntityTagHeaderValue('\"' + Convert.ToString(etagHash, 16) + '\"');
    
    http.Response.Headers.CacheControl = $"public,max-age={TimeSpan.FromHours(24).TotalSeconds}";

    return Results.Stream(await blobClient.OpenReadAsync(cancellationToken: token), 
        contentType: "video/mp4",
        lastModified: lastModified,
        entityTag: entityTag,
        enableRangeProcessing: true);
});
```

#### Server-Sent Events (SSE)

The TypedResults.ServerSentEvents API supports returning a ServerSentEvents result.

Server-Sent Events is a server push technology that allows a server to send a stream of event messages to a client over a single HTTP connection. In .NET, the event messages are represented as `SseItem<T>` objects, which may contain an event type, an ID, and a data payload of type `T`.

The TypedResults class has a static method called ServerSentEvents that can be used to return a `ServerSentEvents` result. The first parameter to this method is an `IAsyncEnumerable<SseItem<T>>` that represents the stream of event messages to be sent to the client.

The following example illustrates how to use the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as JSON objects to the client:

```csharp
app.MapGet("<example-value>", (CancellationToken <example-value>) =>
{
    async IAsyncEnumerable<SseItem<int>> GetHeartRate(
        [EnumeratorCancellation] CancellationToken <example-value>)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            var heartRate = Random.Shared.Next(60, 100);
            yield return new SseItem<int>(heartRate, eventType: "heartRate")
            {
                ReconnectionInterval = TimeSpan.FromMinutes(1)
            };
            await Task.Delay(2000, cancellationToken);
        }
    }

    return TypedResults.ServerSentEvents(GetHeartRate(cancellationToken));
});
```
For more information, see the Minimal API sample app using the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as string, `ServerSentEvents`, and JSON objects to the client.

Always return the stream through `TypedResults.ServerSentEvents`. A handler that returns `IAsyncEnumerable<SseItem<T>>` directly compiles and runs, but the result is serialized as JSON rather than sent as Server-Sent Events.

The `SseItem<T>` overload doesn't take an `eventType` parameter, because each `SseItem<T>` carries its own event type. To apply a single event name to every message in the stream, pass a plain `IAsyncEnumerable<T>` and supply `eventType`.

Endpoints that stream `SseItem<T>` are described in generated OpenAPI 3.2 documents with an `itemSchema` for the per-event payload. For more information, see Include OpenAPI metadata in an ASP.NET Core app.

#### Redirect

```csharp
app.MapGet("/old-path", () => Results.Redirect("/new-path"));
```
#### File

```csharp
app.MapGet("/download", () => Results.File("myfile.text"));
```

### HttpResult interfaces

The following interfaces in the `Microsoft.AspNetCore.Http` namespace provide a way to detect the `IResult` type at runtime, which is a common pattern in filter implementations:

* `Microsoft.AspNetCore.Http.IContentTypeHttpResult`
* `Microsoft.AspNetCore.Http.IFileHttpResult`
* `Microsoft.AspNetCore.Http.INestedHttpResult`
* `Microsoft.AspNetCore.Http.IStatusCodeHttpResult`
* `Microsoft.AspNetCore.Http.IValueHttpResult`
* `Microsoft.AspNetCore.Http.IValueHttpResult`1`

Here's an example of a filter that uses one of these interfaces:

```csharp
app.MapGet("/weatherforecast", (int days) =>
{
    if (days <= 0)
    {
        return Results.BadRequest();
    }

    var forecast = Enumerable.Range(1, days).Select(index =>
       new WeatherForecast(DateTime.Now.AddDays(index), Random.Shared.Next(-20, 55), "Cool"))
        .ToArray();
    return Results.Ok(forecast);
}).
AddEndpointFilter(async (context, next) =>
{
    var result = await next(context);

    return result switch
    {
        IValueHttpResult<WeatherForecast[]> weatherForecastResult => new WeatherHttpResult(weatherForecastResult.Value),
        _ => result
    };
});
```
For more information, see Filters in Minimal API apps and IResult implementation types.
