---
title: "Parameter binding in Minimal API applications (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/parameter-binding.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Parameter binding in Minimal API applications (part 2 of 4)

## Special types

The following types are bound without explicit attributes:

* `Microsoft.AspNetCore.Http.HttpContext`: The context which holds all the information about the current HTTP request or response:

  ```csharp
  app.MapGet("/", (HttpContext context) => context.Response.WriteAsync("Hello World"));
  ```

* `Microsoft.AspNetCore.Http.HttpRequest` and `Microsoft.AspNetCore.Http.HttpResponse`: The HTTP request and HTTP response:

  ```csharp
  app.MapGet("/", (HttpRequest request, HttpResponse response) =>
      response.WriteAsync($"Hello World {request.Query["name"]}"));
  ```

* `System.Threading.CancellationToken`: The cancellation token <example-value> with the current HTTP request:

  ```csharp
  app.MapGet("<example-value>", async (CancellationToken <example-value>) =>
      await MakeLongRunningRequestAsync(cancellationToken));
  ```

* `System.Security.Claims.ClaimsPrincipal`: The user associated with the request, bound from `Microsoft.AspNetCore.Http.HttpContext.User`:

  ```csharp
  app.MapGet("/", (ClaimsPrincipal user) => user.Identity.Name);
  ```

### Bind the request body as a `Stream` or `PipeReader`

The request body can bind as a `Stream` or `PipeReader` to efficiently support scenarios where the user has to process data and:

* Store the data to blob storage or enqueue the data to a queue provider.
* Process the stored data with a worker process or cloud function.

For example, the data might be enqueued to Azure Queue storage or stored in Azure Blob storage.

The following code implements a background queue:

```csharp
using System.Text.Json;
using System.Threading.Channels;

namespace BackgroundQueueService;

class BackgroundQueue : BackgroundService
{
    private readonly Channel<ReadOnlyMemory<byte>> _queue;
    private readonly ILogger<BackgroundQueue> _logger;

    public BackgroundQueue(Channel<ReadOnlyMemory<byte>> queue,
                               ILogger<BackgroundQueue> logger)
    {
        _queue = queue;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        await foreach (var dataStream in _queue.Reader.ReadAllAsync(stoppingToken))
        {
            try
            {
                var person = JsonSerializer.Deserialize<Person>(dataStream.Span)!;
                _logger.LogInformation($"{person.Name} is {person.Age} " +
                                       $"years and from {person.Country}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}

class Person
{
    public string Name { get; set; } = String.Empty;
    public int Age { get; set; }
    public string Country { get; set; } = String.Empty;
}
```
The following code binds the request body to a `Stream`:

```csharp
app.MapPost("/register", async (HttpRequest req, Stream body,
                                 Channel<ReadOnlyMemory<byte>> queue) =>
{
    if (req.ContentLength is not null && req.ContentLength > maxMessageSize)
    {
        return Results.BadRequest();
    }

    // We're not above the message size and we have a content length, or
    // we're a chunked request and we're going to read up to the maxMessageSize + 1. 
    // We add one to the message size so that we can detect when a chunked request body
    // is bigger than our configured max.
    var readSize = (int?)req.ContentLength ?? (maxMessageSize + 1);

    var buffer = new byte[readSize];

    // Read at least that many bytes from the body.
    var read = await body.ReadAtLeastAsync(buffer, readSize, throwOnEndOfStream: false);

    // We read more than the max, so this is a bad request.
    if (read > maxMessageSize)
    {
        return Results.BadRequest();
    }

    // Attempt to send the buffer to the background queue.
    if (queue.Writer.TryWrite(buffer.AsMemory(0..read)))
    {
        return Results.Accepted();
    }

    // We couldn't accept the message since we're overloaded.
    return Results.StatusCode(StatusCodes.Status429TooManyRequests);
});
```
The following code shows the complete `Program.cs` file:

```csharp
using System.Threading.Channels;
using BackgroundQueueService;

var builder = WebApplication.CreateBuilder(args);
// The max memory to use for the upload endpoint on this instance.
var maxMemory = 500 * 1024 * 1024;

// The max size of a single message, staying below the default LOH size of 85K.
var maxMessageSize = 80 * 1024;

// The max size of the queue based on those restrictions
var maxQueueSize = maxMemory / maxMessageSize;

// Create a channel to send data to the background queue.
builder.Services.AddSingleton<Channel<ReadOnlyMemory<byte>>>((_) =>
                     Channel.CreateBounded<ReadOnlyMemory<byte>>(maxQueueSize));

// Create a background queue service.
builder.Services.AddHostedService<BackgroundQueue>();
var app = builder.Build();

// curl --request POST 'https://localhost:<port>/register' --header 'Content-Type: application/json' --data-raw '{ "Name":"Samson", "Age": 23, "Country":"Nigeria" }'
// curl --request POST "https://localhost:<port>/register" --header "Content-Type: application/json" --data-raw "{ \"Name\":\"Samson\", \"Age\": 23, \"Country\":\"Nigeria\" }"
app.MapPost("/register", async (HttpRequest req, Stream body,
                                 Channel<ReadOnlyMemory<byte>> queue) =>
{
    if (req.ContentLength is not null && req.ContentLength > maxMessageSize)
    {
        return Results.BadRequest();
    }

    // We're not above the message size and we have a content length, or
    // we're a chunked request and we're going to read up to the maxMessageSize + 1. 
    // We add one to the message size so that we can detect when a chunked request body
    // is bigger than our configured max.
    var readSize = (int?)req.ContentLength ?? (maxMessageSize + 1);

    var buffer = new byte[readSize];

    // Read at least that many bytes from the body.
    var read = await body.ReadAtLeastAsync(buffer, readSize, throwOnEndOfStream: false);

    // We read more than the max, so this is a bad request.
    if (read > maxMessageSize)
    {
        return Results.BadRequest();
    }

    // Attempt to send the buffer to the background queue.
    if (queue.Writer.TryWrite(buffer.AsMemory(0..read)))
    {
        return Results.Accepted();
    }

    // We couldn't accept the message since we're overloaded.
    return Results.StatusCode(StatusCodes.Status429TooManyRequests);
});

app.Run();
```
* When reading data, the `Stream` is the same object as `HttpRequest.Body`.
* The request body isn't buffered by default. After the body is read, it's not rewindable. The stream can't be read multiple times.
* The `Stream` and `PipeReader` aren't usable outside of the minimal action handler as the underlying buffers will be disposed or reused.

### File uploads using IFormFile and IFormFileCollection

File uploads using `IFormFile` and `IFormFileCollection` in Minimal APIs require `multipart/form-data` encoding. The parameter name in the route handler must match the form field name in the request. Minimal APIs don't support binding the entire request body directly to an `IFormFile` parameter without form encoding.

If you need to bind the entire request body, for example, when working with JSON, binary data, or other content types, see:

- Bind the request body as a Stream or PipeReader
- Explicit Parameter Binding

The following code uses `Microsoft.AspNetCore.Http.IFormFile` and `Microsoft.AspNetCore.Http.IFormFileCollection` to upload file:

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

### Binding to forms with IFormCollection, IFormFile, and IFormFileCollection

Binding from form-based parameters using `Microsoft.AspNetCore.Http.IFormCollection`, `Microsoft.AspNetCore.Http.IFormFile`, and `Microsoft.AspNetCore.Http.IFormFileCollection` is supported. OpenAPI metadata is inferred for form parameters to support integration with Swagger UI.

The following code uploads files using inferred binding from the `IFormFile` type:

```csharp
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder();

builder.Services.AddAntiforgery();

var app = builder.Build();
app.UseAntiforgery();

string GetOrCreateFilePath(string fileName, string filesDirectory = "uploadFiles")
{
    var directoryPath = Path.Combine(app.Environment.ContentRootPath, filesDirectory);
    Directory.CreateDirectory(directoryPath);
    return Path.Combine(directoryPath, fileName);
}

async Task UploadFileWithName(IFormFile file, string fileSaveName)
{
    var filePath = GetOrCreateFilePath(fileSaveName);
    await using var fileStream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(fileStream);
}

app.MapGet("/", (HttpContext context, IAntiforgery antiforgery) =>
{
    var token = antiforgery.GetAndStoreTokens(context);
    var html = $"""
      <html>
        <body>
          <form action="/upload" method="POST" enctype="multipart/form-data">
            <input name="<example-value>" type="<example-value>" value="<example-value>"/>
            <input type="file" name="file" placeholder="Upload an image..." accept=".jpg, 
                                                                            .jpeg, .png" />
            <input type="submit" />
          </form> 
        </body>
      </html>
    """;

    return Results.Content(html, "text/html");
});

app.MapPost("/upload", async Task<Results<Ok<string>,
   BadRequest<string>>> (IFormFile file, HttpContext context, IAntiforgery antiforgery) =>
{
    var fileSaveName = Guid.NewGuid().ToString("N") + Path.GetExtension(file.FileName);
    await UploadFileWithName(file, fileSaveName);
    return TypedResults.Ok("File uploaded successfully!");
});

app.Run();
```
***Warning:*** When implementing forms, the app ***must prevent*** Cross-Site Request Forgery (XSRF/CSRF) attacks. In the preceding code, the `Microsoft.AspNetCore.Antiforgery.IAntiforgery` service is used to prevent XSRF attacks by generating and validation an antiforgery token:

```csharp
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder();

builder.Services.AddAntiforgery();

var app = builder.Build();
app.UseAntiforgery();

string GetOrCreateFilePath(string fileName, string filesDirectory = "uploadFiles")
{
    var directoryPath = Path.Combine(app.Environment.ContentRootPath, filesDirectory);
    Directory.CreateDirectory(directoryPath);
    return Path.Combine(directoryPath, fileName);
}

async Task UploadFileWithName(IFormFile file, string fileSaveName)
{
    var filePath = GetOrCreateFilePath(fileSaveName);
    await using var fileStream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(fileStream);
}

app.MapGet("/", (HttpContext context, IAntiforgery antiforgery) =>
{
    var token = antiforgery.GetAndStoreTokens(context);
    var html = $"""
      <html>
        <body>
          <form action="/upload" method="POST" enctype="multipart/form-data">
            <input name="<example-value>" type="<example-value>" value="<example-value>"/>
            <input type="file" name="file" placeholder="Upload an image..." accept=".jpg, 
                                                                            .jpeg, .png" />
            <input type="submit" />
          </form> 
        </body>
      </html>
    """;

    return Results.Content(html, "text/html");
});

app.MapPost("/upload", async Task<Results<Ok<string>,
   BadRequest<string>>> (IFormFile file, HttpContext context, IAntiforgery antiforgery) =>
{
    var fileSaveName = Guid.NewGuid().ToString("N") + Path.GetExtension(file.FileName);
    await UploadFileWithName(file, fileSaveName);
    return TypedResults.Ok("File uploaded successfully!");
});

app.Run();
```
For more information on XSRF attacks, see Antiforgery with Minimal APIs

For more information, see Form binding in Minimal APIs;

#### IFormFile collection binding behavior

The following table summarizes how different `Microsoft.AspNetCore.Http.IFormFile` collection parameter types are bound in Minimal APIs. The general guidance that the parameter name in the route handler must match the form field name applies to `Microsoft.AspNetCore.Http.IFormFile` and supported named file collections such as `System.Collections.Generic.IReadOnlyList`1`, but not to `Microsoft.AspNetCore.Http.IFormFileCollection`, which binds all uploaded files.

| Parameter type | Bound value | Honors parameter name? |
| --- | --- | --- |
| `IFormFileCollection` | All files in `HttpContext.Request.Form.Files` | No |
| `IFormFile` | The single file whose form field name matches the parameter name | Yes |
| `IReadOnlyList<IFormFile>` | All files whose form field name matches the parameter name | Yes |
| Other `IFormFile` collection types (`IEnumerable<IFormFile>`, `List<IFormFile>`, `IFormFile[]`, etc.) | Not supported — parameter is not populated | N/A |

Use `Microsoft.AspNetCore.Http.IFormFileCollection` when you need all uploaded files regardless of form field name. Use `System.Collections.Generic.IReadOnlyList`1` when you need only the files whose form field name matches the parameter name.

> **Note:**
> The `Microsoft.AspNetCore.Http.IFormFile` collection binding rules in the preceding table also apply to properties on `[AsParameters]` types and form-mapped complex types, since the form-mapping layer is shared with Blazor.
