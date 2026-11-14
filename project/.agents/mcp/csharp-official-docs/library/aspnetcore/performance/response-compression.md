---
title: "Response compression in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/performance/response-compression.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Response compression in ASP.NET Core

Network bandwidth is a limited resource. Reducing the size of the response usually increases the responsiveness of an app, often dramatically. One way to reduce payload size is to compress the responses from an application. This article describes how to implement response compression for your apps by using response compression middleware in ASP.NET Core.

## Explore compression with HTTPS

Compressed responses over secure connections can be controlled with the `Microsoft.AspNetCore.ResponseCompression.ResponseCompressionOptions.EnableForHttps` option, which is disabled by default because of the security risk. Using compression with dynamically generated pages can expose the app to CRIME and BREACH attacks. CRIME and BREACH attacks can be mitigated in ASP.NET Core with antiforgery tokens. For more information, see Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core. For information on mitigating BREACH attacks, see Mitigations at http://www.breachattack.com/.

Even when the app disables the `EnableForHttps` property (`false`), Internet Information Services (IIS), IIS Express, and Azure App Service can apply Gzip at the IIS web server. When you review response headers, take note of the Server header value. An unexpected `content-encoding` response header value might be the result of the web server and not the ASP.NET Core app configuration.

## Determine when to use response compression middleware

Use server-based response compression technologies in IIS, Apache, or Nginx. The performance of the response compression middleware probably can't match that of the server modules. The HTTP.sys server and Kestrel server don't currently offer built-in compression support.

Use response compression middleware when the app is:

* Unable to use the following server-based compression technologies:
  * IIS dynamic caching and compression
  * Apache mod_deflate module
  * Nginx compression and decompression

* Hosting directly on:
  * HTTP.sys server
  * Kestrel server

## Explore response compression

Usually, any response not natively compressed can benefit from response compression. Responses not natively compressed typically include CSS, JavaScript, HTML, XML, and JSON. Don't compress natively compressed assets, such as PNG files. When attempting to further compress a natively compressed response, any small extra reduction in size and transmission time is likely overshadowed by the time it takes to process the compression. Don't compress files smaller than about 150 - 1,000 bytes, depending on the file's content and the efficiency of compression. The overhead of compressing small files might produce a compressed file larger than the uncompressed file.

When a client can process compressed content, the client must inform the server of its capabilities by sending the Accept-Encoding header with the request. When a server sends compressed content, it must include information in the Content-Encoding header regarding how the compressed response is encoded.

The following table shows the content encoding designations for the `Accept-Encoding` header and indicates whether the response compression middleware supports the designation.

| Designation    | Middleware    | Format | Details |
| -------------- | :-----------: | ------ | ------- |
| `br`           | Yes (default) | Brotli Compressed Data Format | RFC 7932 |
| `deflate`      | No            | DEFLATE Compressed Data Format | RFC 1951 |
| `exi`          | No            | Efficient XML Interchange (EXI) | W3C Recommendation |
| `gzip`         | Yes           | Gzip file format | RFC 1952 |
| `identity`     | Yes           | "No encoding" - the response must not be encoded | Troubleshoot response compression |
| `pack200-gzip` | No            | Network Transfer Format for Java archives | JSR 200 |
| `zstd`         | Yes (default) | Zstandard Compressed Data Format | RFC 8878 |
| `*` (asterisk) | Yes           | "Wildcard" - any available content encoding not explicitly requested | Troubleshoot response compression |

For more information, see the IANA Official Content Coding List for HTTP parameters.

The response compression middleware allows adding other compression providers for custom `Accept-Encoding` header values. For more information, see Custom Providers later in this article.

The response compression middleware is capable of reacting to quality value (qvalue, `q`) weighting when sent by the client to prioritize compression schemes. For more information, see RFC 9110: HTTP Semantics (Section 12.5.3 Accept-Encoding).

Compression algorithms are subject to a tradeoff between compression speed and the effectiveness of the compression. *Effectiveness* in this context refers to the size of the output after compression. The smallest size is achieved by the optimal compression.

The headers involved in requesting, sending, caching, and receiving compressed content are described in the following table.

| Header             | Role | Details |
| ------------------ | ---- | ------- |
| `Accept-Encoding`  | Sent from the client to the server to indicate the content encoding schemes acceptable to the client. | Accept-Encoding header |
| `Content-Encoding` | Sent from the server to the client to indicate the encoding of the content in the payload. | Content-Encoding header |
| `Content-Length`   | When compression occurs, the `Content-Length` header is removed because the body content changes when the response is compressed. | Content-Length header |
| `Content-MD5`      | When compression occurs, the `Content-MD5` header is removed because the body content is changed and the hash is no longer valid. | RFC 1864: The Content-MD5 Header Field |
| `Content-Type`     | Specifies the MIME type of the content. Every response should specify its `Content-Type` value. The response compression middleware checks this value to determine if the response should be compressed. The response compression middleware specifies a set of default MIME types that it can encode, and they can be replaced or added. | Content-Type header |
| `Vary`             | When sent by the server with a value of `Accept-Encoding` to clients and proxies, the `Vary` header indicates to the client or proxy that it should cache (vary) responses based on the value of the `Accept-Encoding` header of the request. The result of returning content with the `Vary: Accept-Encoding` header is that both compressed and uncompressed responses are cached separately. | Vary header |

Explore the features of the response compression middleware with the sample app. The sample illustrates:

* Compression of app responses by using Gzip and custom compression providers.
* How to add a MIME type to the default list of MIME types for compression.
* How to add a custom response compression provider.

## Configure the response compression middleware

The following code shows how to enable the response compression middleware for default MIME types and compression providers (Brotli, Gzip, and Zstandard):

### Notes about response compression middleware

When you work with response compression middleware, keep in mind the following points:

* Setting the `EnableForHttps` property to `true` is a security risk. For more information, see the Compression with HTTPS section earlier in this article.
* The app.UseResponseCompression method must be called ***before*** any middleware that compresses responses. For more information, see ASP.NET Core middleware > Middleware order.
* Use a tool such as Firefox Browser - Developer edition to set the `Accept-Encoding` request header and examine the response headers, size, and body.

Submit a request to the sample app without the `Accept-Encoding` header and observe that the response is uncompressed. The `Content-Encoding` header isn't in the Response Headers collection.

For example, in Firefox Developer:

1. Select the network tab.
1. Right-click the request in the Network request list and select **Edit and resend**.
1. Change the `Accept-Encoding:` value from  `gzip, deflate, br` to `none`.
1. Select **Send**.

Submit a request to the sample app with a browser by using the developer tools and observe that the response is compressed. The `Content-Encoding` and `Vary` headers are present on the response.

## Review providers

This section provides details about compression providers, including Brotli, Gzip, Zstandard, and custom providers.

### Brotli and Gzip compression providers

Use the `Microsoft.AspNetCore.ResponseCompression.BrotliCompressionProvider` class to compress responses with the RFC 7932: Brotli Compressed Data Format.

If no compression providers are explicitly added to the `Microsoft.AspNetCore.ResponseCompression.CompressionProviderCollection` class:

* By default, the Brotli, Gzip, and Zstandard compression providers are added to the array of compression providers.
* When the client supports the Zstandard compressed data format, compression defaults to Zstandard compression.
* If the client doesn't support Zstandard but supports Brotli, compression defaults to Brotli compression.
* If the client doesn't support Zstandard or Brotli, compression defaults to Gzip when the client supports Gzip compression.

When a compression provider is added, other providers aren't added. For example, if the Gzip compression provider is the only provider explicitly added, no other compression providers are added.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

The following code:

* Enables response compression for HTTPS requests.
* Adds the Brotli and Gzip response compression providers.

```csharp
using System.IO.Compression;
using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.SmallestSize;
});

var app = builder.Build();

app.UseResponseCompression();

app.MapGet("/", () => "Hello World!");

app.Run();
```

Set the compression level with the `Microsoft.AspNetCore.ResponseCompression.BrotliCompressionProviderOptions` class and `Microsoft.AspNetCore.ResponseCompression.GzipCompressionProviderOptions` class. The Brotli and Gzip compression providers default to the fastest compression level as determined by the CompressionLevel.Fastest enum. However, this approach might not produce the most efficient compression. If the most efficient compression is desired, configure the response compression middleware for optimal compression.

For values that indicate whether a compression operation emphasizes speed or compression size, see the CompressionLevel Enum.

```csharp
using System.IO.Compression;
using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.SmallestSize;
});

var app = builder.Build();

app.UseResponseCompression();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Zstandard compression provider

Use the `Microsoft.AspNetCore.ResponseCompression.ZstandardCompressionProvider` class to compress responses with the RFC 8878: Zstandard Compression for HTTP.

Set the compression quality with the `Microsoft.AspNetCore.ResponseCompression.ZstandardCompressionProviderOptions` class. The Zstandard quality level ranges from 1 to 22, where higher values produce better compression but slower speeds. The following example sets the Zstandard compression quality:

```csharp
builder.Services.Configure<ZstandardCompressionProviderOptions>(options =>
{
    options.CompressionOptions = new ZstandardCompressionOptions
    {
        Quality = 6 // 1 to 22, higher = better compression, slower
    };
});
```

### Custom providers

Create custom compression implementations with the `Microsoft.AspNetCore.ResponseCompression.ICompressionProvider` interface. The `Microsoft.AspNetCore.ResponseCompression.ICompressionProvider.EncodingName` property represents the content encoding that this `ICompressionProvider` produces. The response compression middleware uses this information to choose the provider based on the list specified in the `Accept-Encoding` header of the request.

Requests to the sample app with the `Accept-Encoding: mycustomcompression` header return a response with a `Content-Encoding: mycustomcompression` header. The client must be able to decompress the custom encoding in order for a custom compression implementation to work.

```csharp
using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCompression(options =>
{
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
    options.Providers.Add<CustomCompressionProvider>();
});

var app = builder.Build();

app.UseResponseCompression();

app.MapGet("/", () => "Hello World!");

app.Run();
```

```csharp
using Microsoft.AspNetCore.ResponseCompression;

public class CustomCompressionProvider : ICompressionProvider
{
    public string EncodingName => "mycustomcompression";
    public bool SupportsFlush => true;

    public Stream CreateStream(Stream outputStream)
    {
        // Replace with a custom compression stream wrapper.
        return outputStream;
    }
}
```

In the preceding code, the sample doesn't compress the response body. However, the sample shows where to implement a custom compression algorithm.
