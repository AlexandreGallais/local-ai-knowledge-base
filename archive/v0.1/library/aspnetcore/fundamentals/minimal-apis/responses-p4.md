---
title: "Create responses in Minimal API applications (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/responses.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Create responses in Minimal API applications (part 4 of 5)

## File result return values

When an API endpoint returns content other than JSON, or supports HTTP protocol features like conditional or range requests,
ASP.NET Core provides result types that handle the necessary HTTP protocol details for you.
These result types are referred to as "file results", but the functionality is useful for scenarios beyond serving files on disk.
There are file result types for both Minimal APIs and controller-based APIs, and they share a common underlying implementation and behavior.

To access this functionality, the API endpoint creates and returns a file result object - an instance of one of these file result types.
The file result object encapsulates the content to be sent, the content type, and any additional parameters like a download file name.
The result object implements a method -- `ExecuteAsync(HttpContext)` for Minimal APIs or `ExecuteResultAsync(ActionContext)` for controllers -- that the framework calls to write the response.
This method sets the `Content-Type` header and, when a file name is provided, the `Content-Disposition` header.
It also handles conditional request headers and range request headers when the appropriate parameters are set on the result object.

### File result types

In Minimal APIs, the most common and recommended way to create a file result is `TypedResults.File`, which accepts a `byte[]` or `Stream` and returns a `FileContentHttpResult` or `FileStreamHttpResult`.

Alternatives include `TypedResults.Bytes` for an explicit byte-array helper,
`TypedResults.PhysicalFile` for serving files by absolute path, or
`Results.File` / `Results.Bytes` when you only need the `IResult` interface.

ASP.NET Core also provides static files middleware that serves files relative to the web root (`wwwroot`) without requiring an explicit endpoint.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/FileEndpoints.cs._
In controller-based APIs, the `ControllerBase.File()` helper method accepts either a `byte[]` or `Stream` and returns the appropriate concrete result type (`FileContentResult`, `FileStreamResult`).

Alternatives include returning a `VirtualFileResult` for files relative to the web root, or a `PhysicalFileResult` for files by absolute path, but these are less common as the static files middleware usually handles those scenarios.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/Controllers/FilesController.cs._
### OpenAPI support for file results

File result types don't automatically contribute response metadata to the generated OpenAPI document.
To get a proper response description in the OpenAPI document, you must specify this metadata explicitly.

In Minimal APIs, use the `Produces<TResponse>()`
extension method to provide the OpenAPI metadata for the response. This metadata determines the status code, content type, and schema for the response in the OpenAPI document.
For a file result, it's important to specify the content type, such as `application/pdf`, and to use an appropriate `TResponse` to get the desired schema.
You can also specify the status code in the `Produces` extension method if it differs from the default of `200 OK`.
Common status codes are defined in the `StatusCodes` class, and common content types are defined in the `MediaTypeNames` class.
For example:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/FileEndpoints.cs._
Conceptually, `TResponse` represents the type of the response body, but the appropriate schema for a file result depends
more on the body content than the CLR type. Therefore, it may be necessary to specify a `TResponse` that doesn't match
the CLR type of the content in the file result in order to get the desired OpenAPI schema.

In particular, there are three common schemas for file results:

* **binary content**, such as PDFs, images, or videos, where the schema should be `type: string, format: binary`. The recommended `TResponse` for this case is `Stream`. The framework has special logic to map this type to the `binary` format in the OpenAPI schema. For a working example that shows the generated OpenAPI document for a binary response, see Describe binary file responses.
* **text content**, such as CSV or plain text. Here the schema should be simply `type: string` with no `format`. Use `string` as the `TResponse` for this case.
* **base64-encoded content**, where the schema should be `type: string, format: byte`. It's uncommon to base64-encode file content in an API response, but for legacy reasons this is the schema produced when the `TResponse` is `byte[]`.

The file result types themselves also map to the `type: string, format: binary` schema, so `TResponse` can match what the endpoint actually returns:

```csharp
app.MapGet("/report", () => TypedResults.File(File.OpenRead("report.pdf"), MediaTypeNames.Application.Pdf))
   .Produces<FileStreamHttpResult>(contentType: MediaTypeNames.Application.Pdf);
```

`Microsoft.AspNetCore.Http.HttpResults.FileContentHttpResult`, `Microsoft.AspNetCore.Http.HttpResults.FileStreamHttpResult`, `Microsoft.AspNetCore.Mvc.FileContentResult`, and `Microsoft.AspNetCore.Mvc.FileStreamResult` all produce the binary schema. `Stream` continues to work and remains a good choice when the result type isn't known at the point where the metadata is declared.

In a controller-based app, use the `[Produces]` or the `[ProducesResponseType]` attribute:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/Controllers/FilesController.cs._
As with Minimal APIs, you should choose the `Type` parameter of the `[Produces]` and `[ProducesResponseType]` attributes
that corresponds to the desired OpenAPI schema for your file result responses:

* **binary content**: Use `FileContentResult` or `FileStreamResult` to get the `binary` format in the OpenAPI schema.
* **text content**: Use `string` to get a simple `type: string` schema.
* **base64-encoded content**: Use `byte[]` to get the `byte` format in the OpenAPI schema, though this is uncommon for file results.

### File result support for conditional requests

File results support conditional requests for cache validation. Set the `lastModified` and/or `entityTag` parameters when creating the result object, and the framework automatically inspects incoming `If-None-Match` and `If-Modified-Since` headers. If the resource hasn't changed, the framework returns `304 Not Modified` with no body — no additional code is needed.

| Parameter | Purpose |
|-----------|---------|
| `lastModified` | Sets the `Last-Modified` response header. If the client sends `If-Modified-Since` and the file hasn't changed, the framework returns `304 Not Modified` with no body. |
| `entityTag` | Sets the `ETag` response header. If the client sends `If-None-Match` with a matching ETag, the framework returns `304 Not Modified` with no body. |

> **Note:**
> Precondition checks (`If-Match`, `If-Unmodified-Since`) typically require custom logic in the endpoint to verify preconditions *before* performing their function.

The following example demonstrates how to use file results to enable cache validation for a configuration endpoint.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/FileEndpoints.cs._
This example also illustrates how to document the `304 Not Modified` response in the OpenAPI document using the `Produces` extension method, and including the `if-none-match` and `if-modified-since` headers as parameters so they're included in the OpenAPI schema for the endpoint.

A controller-based API can achieve the same behavior using the `File` helper method and the `[ProducesResponseType]` attribute:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/Controllers/FilesController.cs._
### File result support for range requests

**Range requests** allow clients to request only a portion of a file rather than the entire content. A client sends a `Range` header specifying byte offsets, and the server responds with `206 Partial Content` containing just those bytes. This enables resumable downloads, parallel chunked downloads, and efficient seeking in media players.

Range requests can also be conditional: the client sends an `If-Range` header containing an ETag or date alongside the `Range` header, and the server returns the partial content only if the resource hasn't changed. If it has changed, the server ignores the range and returns the full resource instead. `If-Range` is only evaluated when `entityTag` or `lastModified` is also set on the file result.

Set `enableRangeProcessing` to `true` to enable range processing. The following examples enable range processing for a video streaming endpoint, and document the additional response types in the OpenAPI metadata.

**Minimal API:**

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/FileEndpoints.cs._
**Controller:**

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/FileResults/10.x/Controllers/FilesController.cs._
With this configuration, the framework automatically handles the following HTTP interactions:

* **Full request**: Returns `200 OK` with the complete file.
* **Range request** (`Range: bytes=0-1023`): Returns `206 Partial Content` with the `Content-Range` header and only the requested bytes.
* **Invalid range**: Returns `416 Range Not Satisfiable`.

## Modifying Headers

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

## Customizing responses

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

Also, a custom `IResult` type can provide its own annotation by implementing the `Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider` interface. For example, the following code adds an annotation to the preceding `HtmlResult` type that describes the response produced by the endpoint.

```csharp
class HtmlResult : IResult, IEndpointMetadataProvider
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

    public static void PopulateMetadata(MethodInfo method, EndpointBuilder builder)
    {
        builder.Metadata.Add(new ProducesHtmlMetadata());
    }
}
```

The `ProducesHtmlMetadata` is an implementation of `Microsoft.AspNetCore.Http.Metadata.IProducesResponseTypeMetadata` that defines the produced response content type `text/html` and the status code `200 OK`.

```csharp
internal sealed class ProducesHtmlMetadata : IProducesResponseTypeMetadata
{
    public Type? Type => null;

    public int StatusCode => 200;

    public IEnumerable<string> ContentTypes { get; } = new[] { MediaTypeNames.Text.Html };
}
```

An alternative approach is using the `Microsoft.AspNetCore.Mvc.ProducesAttribute` to describe the produced response. The following code changes the `PopulateMetadata` method to use `ProducesAttribute`.

```csharp
public static void PopulateMetadata(MethodInfo method, EndpointBuilder builder)
{
    builder.Metadata.Add(new ProducesAttribute(MediaTypeNames.Text.Html));
}
```
