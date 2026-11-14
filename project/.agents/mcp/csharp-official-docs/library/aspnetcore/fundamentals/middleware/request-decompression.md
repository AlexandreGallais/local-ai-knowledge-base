---
title: "Request decompression in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/middleware/request-decompression.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Request decompression in ASP.NET Core

By David Acker

Request decompression middleware:

* Enables API endpoints to accept requests with compressed content.
* Uses the `Content-Encoding` HTTP header to automatically identify and decompress requests which contain compressed content.
* Eliminates the need to write code to handle compressed requests.

When the `Content-Encoding` header value on a request matches one of the available decompression providers, the middleware:

* Uses the matching provider to wrap the `Microsoft.AspNetCore.Http.HttpRequest.Body` in an appropriate decompression stream.
* Removes the `Content-Encoding` header, indicating that the request body is no longer compressed.

Requests that don't include a `Content-Encoding` header are ignored by the request decompression middleware.

Decompression:

* Occurs when the body of the request is read. That is, decompression occurs at the endpoint on model binding. The request body isn't decompressed eagerly.

* When attempting to read the decompressed request body with invalid compressed data for the specified `Content-Encoding`, an exception is thrown. Brotli can throw `System.InvalidOperationException`: :::no-loc text="Decoder ran into invalid data."::: Deflate, GZip, and Zstandard can throw `System.IO.InvalidDataException`: :::no-loc text="The archive entry was compressed using an unsupported compression method.":::

If the middleware encounters a request with compressed content but is unable to decompress it, the request is passed to the next delegate in the pipeline. For example, a request with an unsupported `Content-Encoding` header value or multiple `Content-Encoding` header values is passed to the next delegate in the pipeline.

## Configuration

The following code uses `Microsoft.Extensions.DependencyInjection.RequestDecompressionServiceExtensions.AddRequestDecompression(Microsoft.Extensions.DependencyInjection.IServiceCollection)` and `Microsoft.AspNetCore.Builder.RequestDecompressionBuilderExtensions.UseRequestDecompression*` to enable request decompression for the default `Content-Encoding` types:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRequestDecompression();

var app = builder.Build();

app.UseRequestDecompression();

app.MapPost("/", (HttpRequest request) => Results.Stream(request.Body));

app.Run();
```

## Default decompression providers

The `Content-Encoding` header values that the request decompression middleware supports by default are listed in the following table:

| `Content-Encoding` header values | Description |
| --------- | --------- |
| `br`      | Brotli compressed data format |
| `deflate` | DEFLATE compressed data format |
| `gzip`    | Gzip file format |
| `zstd`    | Zstandard compressed data format |

## Custom decompression providers

Support for custom encodings can be added by creating custom decompression provider classes that implement `Microsoft.AspNetCore.RequestDecompression.IDecompressionProvider`:

```csharp
public class CustomDecompressionProvider : IDecompressionProvider
{
    public Stream GetDecompressionStream(Stream stream)
    {
        // Perform custom decompression logic here
        return stream;
    }
}
```

Custom decompression providers are registered with `Microsoft.AspNetCore.RequestDecompression.RequestDecompressionOptions` along with their corresponding `Content-Encoding` header values:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRequestDecompression(options =>
{
    options.DecompressionProviders.Add("custom", new CustomDecompressionProvider());
});

var app = builder.Build();

app.UseRequestDecompression();

app.MapPost("/", (HttpRequest request) => Results.Stream(request.Body));

app.Run();
```

## Request size limits

In order to protect against zip bombs or decompression bombs:

* The maximum size of the decompressed request body is limited to the request body size limit enforced by the endpoint or server.
* If the number of bytes read from the decompressed request body stream exceeds the limit, an InvalidOperationException is thrown to prevent additional bytes from being read from the stream.

In order of precedence, the maximum request size for an endpoint is set by:

1. `Microsoft.AspNetCore.Http.Metadata.IRequestSizeLimitMetadata.MaxRequestBodySize`, such as `Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute` or `Microsoft.AspNetCore.Mvc.DisableRequestSizeLimitAttribute` for MVC endpoints.
2. The global server size limit `Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.MaxRequestBodySize`. `MaxRequestBodySize` can be overridden per request with `Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature.MaxRequestBodySize`, but defaults to the limit configured for the web server implementation.

| Web server implementation | `MaxRequestBodySize` configuration |
| --------- | --------- |
| HTTP.sys | `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.MaxRequestBodySize` |
| IIS | `Microsoft.AspNetCore.Builder.IISServerOptions.MaxRequestBodySize` |
| Kestrel | `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize` |

> **Warning:**
> Disabling the request body size limit poses a security risk in regards to uncontrolled resource consumption, particularly if the request body is being buffered. Ensure that safeguards are in place to mitigate the risk of denial-of-service (DoS) attacks.

## Related content

* ASP.NET Core middleware
* Mozilla Developer Network: Content-Encoding
* Brotli Compressed Data Format
* DEFLATE Compressed Data Format Specification version 1.3
* GZIP file format specification version 4.3
* RFC 8878: Zstandard Compression for HTTP
